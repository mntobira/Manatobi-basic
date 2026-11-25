import React, { useMemo, useState } from 'react';
import '../styles/juken-polish.css';
import {
  ArrowLeft,
  ArrowRightLeft,
  Award,
  Calculator,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  Headphones,
  ListFilter,
  Map as MapIcon,
  MapPin,
  PenTool,
  Play,
  School,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  PREFECTURE_EXAMS,
  getSavedTargetPrefecture,
  saveTargetPrefecture,
  simulatePrefectureNaishin,
  type AnswerFormatType,
  type EikenPolicyType,
  type NaishinGradeInput,
  type NaishinSpanType,
  type PrefectureExamInfo,
  type RegionKey,
} from '../data/prefectureExams';
import type { SubjectKey } from '../data/subjects';
import { TobiraBuddy } from './TobiraBuddy';
import { AiPromptStudioModal } from './AiPromptStudioModal';

interface PrefectureExamGuideProps {
  onBack: () => void;
  onStartChapter: (chapterId: string, subject: SubjectKey) => void;
  onOpenWritingDojo?: () => void;
  onTargetPrefChange?: (pref: PrefectureExamInfo) => void;
}

const REGIONS: readonly ('すべて' | RegionKey)[] = [
  'すべて',
  '北海道・東北',
  '関東',
  '中部・東海・北陸',
  '近畿',
  '中国・四国',
  '九州・沖縄',
];

type GuideTab = 'karte' | 'simulator' | 'compare';
type SelectorMode = 'map' | 'list';

function shortPrefName(name: string): string {
  if (name === '北海道') return '北海道';
  return name.replace(/[都府県]$/, '');
}

const GRADE_STEPS = [3.0, 3.2, 3.4, 3.6, 3.8, 4.0, 4.2, 4.4, 4.6, 4.8, 5.0];

export const PrefectureExamGuide: React.FC<PrefectureExamGuideProps> = ({
  onBack,
  onStartChapter,
  onOpenWritingDojo,
  onTargetPrefChange,
}) => {
  const [targetPref, setTargetPref] = useState<PrefectureExamInfo>(() =>
    getSavedTargetPrefecture(),
  );
  const [selectedPrefId, setSelectedPrefId] = useState<string>(() => targetPref.id);
  const [comparePrefId, setComparePrefId] = useState<string>(() =>
    targetPref.id === 'tokyo' ? 'kanagawa' : 'tokyo',
  );
  const [guideTab, setGuideTab] = useState<GuideTab>('karte');
  const [selectorMode, setSelectorMode] = useState<SelectorMode>('map');
  const [selectorOpen, setSelectorOpen] = useState<boolean>(false);
  const [showPromptStudio, setShowPromptStudio] = useState<boolean>(false);
  const [regionFilter, setRegionFilter] = useState<'すべて' | RegionKey>('すべて');
  const [formatFilter, setFormatFilter] = useState<'all' | AnswerFormatType>('all');
  const [naishinFilter, setNaishinFilter] = useState<'all' | NaishinSpanType>('all');
  const [eikenFilter, setEikenFilter] = useState<'all' | EikenPolicyType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 内申シミュレーター入力状態（ローカル保存対応）
  const [grades, setGrades] = useState<NaishinGradeInput>(() => {
    try {
      const raw = localStorage.getItem('mntb_juken_naishin_grades');
      if (raw) return JSON.parse(raw) as NaishinGradeInput;
    } catch {
      // ignore
    }
    return {
      j1Core: 3.8,
      j1Prac: 3.8,
      j2Core: 4.0,
      j2Prac: 4.0,
      j3Core: 4.2,
      j3Prac: 4.0,
    };
  });

  const updateGrade = (key: keyof NaishinGradeInput, val: number) => {
    setGrades((prev) => {
      const next = { ...prev, [key]: val };
      try {
        localStorage.setItem('mntb_juken_naishin_grades', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const applyPresetGrade = (v: number) => {
    const next: NaishinGradeInput = {
      j1Core: v,
      j1Prac: v,
      j2Core: v,
      j2Prac: v,
      j3Core: v,
      j3Prac: v,
    };
    setGrades(next);
    try {
      localStorage.setItem('mntb_juken_naishin_grades', JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const filteredPrefIds = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const set = new Set<string>();
    for (const p of PREFECTURE_EXAMS) {
      if (regionFilter !== 'すべて' && p.region !== regionFilter) continue;
      if (formatFilter !== 'all' && p.answerFormat !== formatFilter) continue;
      if (naishinFilter !== 'all' && p.naishinSpan !== naishinFilter) continue;
      if (eikenFilter !== 'all' && p.eikenPolicyType !== eikenFilter) continue;
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.keyFeature.toLowerCase().includes(q) &&
        !p.customProblem.toLowerCase().includes(q) &&
        !p.representativeSchools.toLowerCase().includes(q) &&
        !(p.recentReform ?? '').toLowerCase().includes(q)
      ) {
        continue;
      }
      set.add(p.id);
    }
    return set;
  }, [regionFilter, formatFilter, naishinFilter, eikenFilter, searchQuery]);

  const filteredPrefs = useMemo(
    () => PREFECTURE_EXAMS.filter((p) => filteredPrefIds.has(p.id)),
    [filteredPrefIds],
  );

  const activePref: PrefectureExamInfo =
    PREFECTURE_EXAMS.find((p) => p.id === selectedPrefId) ?? targetPref;

  const comparePref: PrefectureExamInfo =
    PREFECTURE_EXAMS.find((p) => p.id === comparePrefId) ??
    PREFECTURE_EXAMS.find((p) => p.id !== activePref.id) ??
    activePref;

  const simResult = useMemo(
    () => simulatePrefectureNaishin(activePref, grades),
    [activePref, grades],
  );

  const compareSimResult = useMemo(
    () => simulatePrefectureNaishin(comparePref, grades),
    [comparePref, grades],
  );

  const handleSetTarget = (pref: PrefectureExamInfo) => {
    const saved = saveTargetPrefecture(pref.id);
    setTargetPref(saved);
    onTargetPrefChange?.(saved);
  };

  const nf = activePref.naishinFormula;
  const usesJ1 = nf.w1 > 0;
  const usesJ2 = nf.w2 > 0;

  return (
    <div className="juken-screen">
      {/* 固定ヘッダー */}
      <header className="juken-header">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="juken-btn-soft inline-flex items-center gap-1.5 px-3 py-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>もどる</span>
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <Compass className="w-5 h-5 text-[#2458a6] shrink-0" />
            <h1 className="juken-title-font text-base sm:text-lg font-extrabold truncate">
              全国47都道府県 公立高校入試研究
            </h1>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowPromptStudio(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#0f766e] text-white text-xs font-extrabold hover:opacity-95 transition"
              title="ChatGPT図版＆ElevenLabs v4リスニング台本プロンプト集"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI図版・音源プロンプト</span>
              <span className="sm:hidden">AI図版</span>
            </button>
            <div className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#2458a6] text-white text-xs font-extrabold">
              <MapPin className="w-3.5 h-3.5" />
              <span>志望：{targetPref.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-4 space-y-4">
        {/* 1画面コンパクト都道府県切替バー ＋ 開閉式セレクター */}
        <section className="juken-card p-3 sm:p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-extrabold text-[#6b5b47] shrink-0">表示中の都道府県：</span>
              <select
                aria-label="都道府県クイック選択"
                value={activePref.id}
                onChange={(e) => setSelectedPrefId(e.target.value)}
                className="min-h-[38px] px-3 py-1.5 rounded-xl border-2 border-[#2458a6] bg-[#fffdf8] text-xs sm:text-sm font-extrabold text-[#163c78]"
              >
                {PREFECTURE_EXAMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}（{p.answerFormat}・内申{p.naishinSpan}）
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setSelectorMode('map');
                  setSelectorOpen((prev) => (selectorMode === 'map' ? !prev : true));
                }}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1 border transition ${
                  selectorOpen && selectorMode === 'map'
                    ? 'bg-[#2458a6] text-white border-[#1b4482]'
                    : 'bg-[#f6efe2] text-[#4b3e2e] border-[#dfd3be]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>{selectorOpen && selectorMode === 'map' ? '地図を閉じる' : '日本地図から探す'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectorMode('list');
                  setSelectorOpen((prev) => (selectorMode === 'list' ? !prev : true));
                }}
                className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1 border transition ${
                  selectorOpen && selectorMode === 'list'
                    ? 'bg-[#2458a6] text-white border-[#1b4482]'
                    : 'bg-[#f6efe2] text-[#4b3e2e] border-[#dfd3be]'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>{selectorOpen && selectorMode === 'list' ? '絞込を閉じる' : '条件で絞り込む'}</span>
              </button>
            </div>
          </div>

          {selectorOpen && (
            <div className="pt-2 border-t border-[#ece2d0] space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-[#7a6a4c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="県名・高校名・C問題・英検で検索"
                className="w-full min-h-[44px] pl-9 pr-3 py-2 rounded-xl border border-[#d8cbb5] bg-[#fffdf8] text-xs sm:text-sm font-bold focus:border-[#2458a6] focus:outline-none"
              />
            </div>

            <select
              aria-label="解答形式フィルタ"
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value as typeof formatFilter)}
              className="min-h-[44px] px-3 py-2 rounded-xl border border-[#d8cbb5] bg-[#fffdf8] text-xs sm:text-sm font-bold text-[#3a2f21]"
            >
              <option value="all">解答形式：すべて（47）</option>
              <option value="マークシート中心型">マークシート中心型（東京・神奈川・埼玉27〜・愛知・兵庫等）</option>
              <option value="記述＋記号標準型">記述＋記号標準型（千葉・北海道・福岡・三重等）</option>
              <option value="記述・思考力重視型">記述・思考力重視型（大阪・京都・宮城・石川・広島等）</option>
            </select>

            <select
              aria-label="内申対象学年フィルタ"
              value={naishinFilter}
              onChange={(e) => setNaishinFilter(e.target.value as typeof naishinFilter)}
              className="min-h-[44px] px-3 py-2 rounded-xl border border-[#d8cbb5] bg-[#fffdf8] text-xs sm:text-sm font-bold text-[#3a2f21]"
            >
              <option value="all">内申の対象学年：すべて</option>
              <option value="中3のみ">中3のみ評価（東京・愛知・静岡・福岡・三重等）</option>
              <option value="中2〜中3">中2〜中3評価（神奈川・富山・奈良・高知）</option>
              <option value="中1〜中3">中1〜中3全学年（北海道・埼玉・千葉・大阪・兵庫等）</option>
            </select>

            <select
              aria-label="英検優遇制度フィルタ"
              value={eikenFilter}
              onChange={(e) => setEikenFilter(e.target.value as typeof eikenFilter)}
              className="min-h-[44px] px-3 py-2 rounded-xl border border-[#d8cbb5] bg-[#fffdf8] text-xs sm:text-sm font-bold text-[#3a2f21]"
            >
              <option value="all">英語外部検定（英検等）：すべて</option>
              <option value="得点換算・みなし満点型">得点換算保証あり（大阪・埼玉・福井・鳥取・岡山）</option>
              <option value="加算点型">加点制度あり（千葉一部・ESAT-J東京等）</option>
              <option value="調査書・特別枠評価型">調査書・推薦枠評価（神奈川・愛知・兵庫・福岡等）</option>
            </select>
          </div>

          {/* 地方タブ */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegionFilter(r)}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap border transition ${
                  regionFilter === r
                    ? 'bg-[#2458a6] text-white border-[#2458a6]'
                    : 'bg-[#f6efe2] text-[#4c4031] border-[#dfd3be] hover:bg-white'
                }`}
              >
                {r}
              </button>
            ))}
            <span className="ml-auto text-xs font-extrabold text-[#6b5b47] whitespace-nowrap pl-2">
              該当 {filteredPrefs.length} / 47
            </span>
          </div>

          {/* 日本地図タイル表示 */}
          {selectorMode === 'map' ? (
            <div className="space-y-1.5">
              <div className="japan-tile-scroll">
                <div className="japan-tile-grid" role="listbox" aria-label="47都道府県日本地図セレクター">
                  {PREFECTURE_EXAMS.map((pref) => {
                    const [col, row] = pref.mapPos;
                    const isSelected = pref.id === activePref.id;
                    const isTarget = pref.id === targetPref.id;
                    const isDimmed = !filteredPrefIds.has(pref.id);
                    return (
                      <button
                        key={pref.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        data-selected={isSelected || undefined}
                        data-target={(!isSelected && isTarget) || undefined}
                        data-dimmed={isDimmed || undefined}
                        style={{ gridColumn: col, gridRow: row }}
                        onClick={() => setSelectedPrefId(pref.id)}
                        className="japan-tile-cell"
                        title={`${pref.name}（${pref.examSystemName}・内申${pref.naishinSpan}）`}
                      >
                        <span>{shortPrefName(pref.name)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6a5b48]">
                <span>※地図の都道府県タイルをタップすると下の詳細カルテ・内申計算式が即座に切り替わります（スマホは横スクロール可）。</span>
                <span className="inline-flex items-center gap-3 font-bold">
                  <span className="inline-flex items-center gap-1"><i className="inline-block w-3 h-3 rounded bg-[#f29a1f] border border-[#b86c05]" />選択中</span>
                  <span className="inline-flex items-center gap-1"><i className="inline-block w-3 h-3 rounded bg-[#e7f0fd] border border-[#2458a6]" />志望県</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5 max-h-52 overflow-y-auto pr-1">
              {filteredPrefs.map((pref) => {
                const selected = pref.id === activePref.id;
                const isTarget = pref.id === targetPref.id;
                return (
                  <button
                    key={pref.id}
                    type="button"
                    onClick={() => setSelectedPrefId(pref.id)}
                    className={`min-h-[42px] px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold border flex items-center gap-1 transition ${
                      selected
                        ? 'bg-[#f29a1f] text-[#1f1405] border-[#b86c05] shadow-sm'
                        : isTarget
                          ? 'bg-[#e7f0fd] text-[#163c78] border-[#2458a6]'
                          : 'bg-white text-[#3f3427] border-[#dfd3be] hover:bg-[#fffaf0]'
                    }`}
                  >
                    <span>{pref.name}</span>
                    {isTarget && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
              {filteredPrefs.length === 0 && (
                <p className="text-xs font-bold text-[#7a6955] py-2">
                  条件に一致する都道府県がありません。検索条件をリセットしてください。
                </p>
              )}
            </div>
          )}
            </div>
          )}
        </section>

        {/* 3機能サブタブ：詳細カルテ ／ 内申＆当日点シミュレーター ／ 2都道府県徹底比較 */}
        <div className="grid grid-cols-3 gap-2 bg-white p-1.5 rounded-2xl border border-[#e3d9c8] shadow-sm">
          <button
            type="button"
            onClick={() => setGuideTab('karte')}
            className={`min-h-[44px] px-2 rounded-xl text-xs sm:text-sm font-extrabold inline-flex items-center justify-center gap-1.5 transition ${
              guideTab === 'karte'
                ? 'bg-[#2458a6] text-white shadow-sm'
                : 'text-[#4f4132] hover:bg-[#f6efe2]'
            }`}
          >
            <FileCheck2 className="w-4 h-4 shrink-0" />
            <span>入試詳細カルテ</span>
          </button>
          <button
            type="button"
            onClick={() => setGuideTab('simulator')}
            className={`min-h-[44px] px-2 rounded-xl text-xs sm:text-sm font-extrabold inline-flex items-center justify-center gap-1.5 transition ${
              guideTab === 'simulator'
                ? 'bg-[#2458a6] text-white shadow-sm'
                : 'text-[#4f4132] hover:bg-[#f6efe2]'
            }`}
          >
            <Calculator className="w-4 h-4 shrink-0" />
            <span>内申＆当日点計算</span>
          </button>
          <button
            type="button"
            onClick={() => setGuideTab('compare')}
            className={`min-h-[44px] px-2 rounded-xl text-xs sm:text-sm font-extrabold inline-flex items-center justify-center gap-1.5 transition ${
              guideTab === 'compare'
                ? 'bg-[#2458a6] text-white shadow-sm'
                : 'text-[#4f4132] hover:bg-[#f6efe2]'
            }`}
          >
            <ArrowRightLeft className="w-4 h-4 shrink-0" />
            <span>2都道府県比較</span>
          </button>
        </div>

        {/* ==================== タブ1：詳細カルテ ==================== */}
        {guideTab === 'karte' && (
          <section className="juken-card overflow-hidden">
            {/* カルテヘッダー */}
            <div className="px-5 py-5 bg-gradient-to-r from-[#eaf2fd] via-[#f7fafe] to-[#fdf6e8] border-b border-[#e3d9c8] flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#2458a6] text-white">
                    {activePref.region}
                  </span>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white border border-[#b9d0ef] text-[#1c4687]">
                    {activePref.answerFormat}
                  </span>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#fff3db] border border-[#efc981] text-[#8a4b00]">
                    内申：{activePref.naishinSpan}（{nf.typicalRatioLabel}）
                  </span>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#eef7f1] border border-[#b4dec4] text-[#1f7a4d]">
                    英検：{activePref.eikenPolicyType}
                  </span>
                </div>

                <h2 className="juken-title-font text-xl sm:text-2xl font-black text-[#1c2a39]">
                  {activePref.name}（{activePref.examSystemName}）
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-bold text-[#4a3e2f]">
                  <span>
                    2027春 本試験目安：
                    <strong className="juken-num text-[#1c4687] ml-1">
                      {activePref.examMonthDay.replace('-', '月')}日ごろ
                    </strong>
                  </span>
                  <span>
                    合格発表目安：
                    <strong className="juken-num ml-1">
                      {activePref.resultMonthDay.replace('-', '月')}日ごろ
                    </strong>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSetTarget(activePref)}
                className={
                  targetPref.id === activePref.id
                    ? 'min-h-[46px] px-5 py-2.5 rounded-2xl bg-[#1f7a4d] text-white text-sm font-extrabold shadow-sm inline-flex items-center gap-2'
                    : 'juken-btn-accent px-5 py-2.5 text-sm inline-flex items-center gap-2'
                }
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {targetPref.id === activePref.id
                    ? '志望都道府県に設定中（ホーム連動）'
                    : `${activePref.name}を志望都道府県に設定`}
                </span>
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* 2026-2027 最新入試改革アラート */}
              {activePref.recentReform && (
                <div className="rounded-2xl bg-gradient-to-r from-[#fff6e5] to-[#fffdf7] border-2 border-[#f29a1f] p-4 flex items-start gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-[#f29a1f] text-[#23180a] text-xs font-black shrink-0 mt-0.5">
                    最新改革注目
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-[#3a2a14] leading-6">
                    {activePref.recentReform}
                  </p>
                </div>
              )}

              {/* 制度スペック4枚グリッド */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#fffdf8] border border-[#e6dccb] p-4">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#2458a6]">
                    <Award className="w-4 h-4" />
                    <span>学力検査の満点・試験時間</span>
                  </div>
                  <p className="mt-1.5 text-sm sm:text-base font-extrabold text-[#1c2a39]">
                    {activePref.scoreScale}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#5a6573] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{activePref.timePerSubject}</span>
                  </p>
                </div>

                <div className="rounded-2xl bg-[#fffdf8] border border-[#e6dccb] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#8a4b00]">
                      <Calculator className="w-4 h-4" />
                      <span>調査書（内申点）の算出式</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGuideTab('simulator')}
                      className="text-xs font-extrabold text-[#2458a6] underline"
                    >
                      自分の成績で計算 →
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-extrabold text-[#262019] leading-6">
                    {nf.formulaLabel}
                  </p>
                  <p className="mt-1 text-xs text-[#5a6573] leading-5">
                    {activePref.naishinDetail}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#fffdf8] border border-[#e6dccb] p-4">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1f7a4d]">
                    <Sparkles className="w-4 h-4" />
                    <span>自校作成・学校選択問題 ／ 英語外部検定</span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#1c2a39] leading-6">
                    【問題区分】{activePref.customProblem}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#3e4c5b] leading-5">
                    【英検・外部検定】{activePref.eikenDetail}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#fffdf8] border border-[#e6dccb] p-4">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#6d28d9]">
                    <Headphones className="w-4 h-4" />
                    <span>英語リスニング仕様 ＆ 代表的な公立進学校</span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#1c2a39] leading-6">
                    【リスニング】{activePref.listeningDetail}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#3e4c5b] leading-5 flex items-start gap-1">
                    <School className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#6d28d9]" />
                    <span>代表校：{activePref.representativeSchools}</span>
                  </p>
                </div>
              </div>

              {/* 全体特徴＆合格戦略ボックス */}
              <div className="rounded-2xl bg-[#f4f8fe] border border-[#c7daf4] p-4">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#1c4687] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>{activePref.name}入試の全体特徴・得点戦略</span>
                </h3>
                <p className="mt-1.5 text-sm leading-7 font-medium text-[#1c2a39]">
                  {activePref.keyFeature}
                </p>
              </div>

              {/* 5教科別の出題傾向と対策 */}
              <div>
                <h3 className="juken-title-font text-base sm:text-lg font-extrabold text-[#1c2a39] mb-2.5">
                  {activePref.name}の5教科別 出題傾向と必勝ポイント
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { key: 'english', label: '英語', color: '#2458A6', tip: activePref.subjectTips.english },
                    { key: 'math', label: '数学', color: '#0E7C86', tip: activePref.subjectTips.math },
                    { key: 'japanese', label: '国語', color: '#B5495B', tip: activePref.subjectTips.japanese },
                    { key: 'science', label: '理科', color: '#2A7B4C', tip: activePref.subjectTips.science },
                    { key: 'social', label: '社会', color: '#B86B19', tip: activePref.subjectTips.social },
                  ].map((s) => (
                    <div
                      key={s.key}
                      className="rounded-2xl border border-[#e6dccb] bg-white p-3.5 flex items-start gap-3"
                    >
                      <span
                        className="px-2.5 py-1 rounded-lg text-xs font-black text-white shrink-0 mt-0.5"
                        style={{ backgroundColor: s.color }}
                      >
                        {s.label}
                      </span>
                      <p className="text-xs sm:text-sm leading-6 text-[#2b241c] font-medium">
                        {s.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 直結おすすめ単元へ1タップ遷移 */}
              <div className="pt-2 border-t border-[#ece2d0]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <h3 className="juken-title-font text-sm sm:text-base font-extrabold text-[#1c2a39]">
                    {activePref.name}対策として今すぐ解くべき最優先単元
                  </h3>
                  {onOpenWritingDojo && (
                    <button
                      type="button"
                      onClick={onOpenWritingDojo}
                      className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#fdf0db] border border-[#f29a1f] text-xs font-extrabold text-[#8a4b00] hover:bg-[#ffe8c2] transition"
                    >
                      <PenTool className="w-3.5 h-3.5" />
                      <span>都道府県別 英作文道場へ →</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activePref.recommendedChapters.map((rec, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onStartChapter(rec.chapterId, rec.subject)}
                      className="juken-card-interactive text-left p-3.5 flex items-center justify-between gap-2"
                    >
                      <span className="text-xs sm:text-sm font-extrabold text-[#1c4687]">
                        {rec.label}
                      </span>
                      <span className="w-8 h-8 rounded-full bg-[#2458a6] text-white inline-flex items-center justify-center shrink-0">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==================== タブ2：内申＆当日点シミュレーター ==================== */}
        {guideTab === 'simulator' && (
          <section className="juken-card p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ece2d0] pb-4">
              <div>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#2458a6]/10 text-[#2458a6]">
                  47都道府県 独自換算式エンジン搭載
                </span>
                <h2 className="juken-title-font mt-1 text-lg sm:text-xl font-black text-[#1c2a39]">
                  {activePref.name}の内申点自動換算 ＆ 志望レベル別・目標当日点シミュレーター
                </h2>
                <p className="text-xs sm:text-sm text-[#5a6573] mt-0.5">
                  算出ルール：{nf.formulaLabel}
                </p>
              </div>

              {/* ワンタップ成績プリセット */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-[#6b5b47]">一括セット：</span>
                {[
                  { label: 'オール3', val: 3.0 },
                  { label: '平均3.5', val: 3.6 },
                  { label: 'オール4', val: 4.0 },
                  { label: '平均4.5', val: 4.6 },
                  { label: 'オール5', val: 5.0 },
                ].map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyPresetGrade(p.val)}
                    className="min-h-[38px] px-2.5 py-1 rounded-xl bg-[#f6efe2] hover:bg-[#eadec8] border border-[#dfd2bc] text-xs font-extrabold text-[#3d3222] transition"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 学年・5教科/実技4教科の平均評定セレクター */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  gradeLabel: '中学1年（9教科）',
                  active: usesJ1,
                  weightNote: usesJ1 ? `倍率 ×${nf.w1}` : `${activePref.name}では原則算入なし`,
                  coreKey: 'j1Core' as const,
                  pracKey: 'j1Prac' as const,
                },
                {
                  gradeLabel: '中学2年（9教科）',
                  active: usesJ2,
                  weightNote: usesJ2 ? `倍率 ×${nf.w2}` : `${activePref.name}では原則算入なし`,
                  coreKey: 'j2Core' as const,
                  pracKey: 'j2Prac' as const,
                },
                {
                  gradeLabel: '中学3年（9教科）',
                  active: true,
                  weightNote: `倍率 ×${nf.w3}${nf.pracMult !== 1 ? `（実技×${nf.pracMult}倍！）` : nf.coreMult !== 1 ? `（5教科×${nf.coreMult}倍！）` : ''}`,
                  coreKey: 'j3Core' as const,
                  pracKey: 'j3Prac' as const,
                },
              ].map((g) => (
                <div
                  key={g.gradeLabel}
                  className={`rounded-2xl border p-4 space-y-3 ${
                    g.active
                      ? 'bg-[#fffdf8] border-[#d8cbb5]'
                      : 'bg-[#f4f1ea] border-[#e2dacb] opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-extrabold text-[#1c2a39]">{g.gradeLabel}</span>
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                        g.active ? 'bg-[#e7eef8] text-[#1c4687]' : 'bg-[#e5e0d5] text-[#5a6573]'
                      }`}
                    >
                      {g.weightNote}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4e4132] mb-1">
                      主要5教科（英数国理社）平均評定：
                      <strong className="juken-num text-sm text-[#2458a6] ml-1">
                        {grades[g.coreKey].toFixed(1)}
                      </strong>
                    </label>
                    <select
                      value={grades[g.coreKey]}
                      disabled={!g.active}
                      onChange={(e) => updateGrade(g.coreKey, Number(e.target.value))}
                      className="w-full min-h-[42px] px-3 rounded-xl border border-[#d5c8b2] bg-white text-sm font-bold"
                    >
                      {GRADE_STEPS.map((st) => (
                        <option key={st} value={st}>
                          5教科平均 {st.toFixed(1)}（合計 {Math.round(st * 5)} / 25）
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#4e4132] mb-1">
                      実技4教科（音美保技）平均評定：
                      <strong className="juken-num text-sm text-[#b35c00] ml-1">
                        {grades[g.pracKey].toFixed(1)}
                      </strong>
                    </label>
                    <select
                      value={grades[g.pracKey]}
                      disabled={!g.active}
                      onChange={(e) => updateGrade(g.pracKey, Number(e.target.value))}
                      className="w-full min-h-[42px] px-3 rounded-xl border border-[#d5c8b2] bg-white text-sm font-bold"
                    >
                      {GRADE_STEPS.map((st) => (
                        <option key={st} value={st}>
                          実技4教科平均 {st.toFixed(1)}（合計 {Math.round(st * 4)} / 20）
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* 算出結果ビッグカード */}
            <div className="rounded-3xl bg-gradient-to-br from-[#1e4687] to-[#2458a6] text-white p-5 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#cfe0f8]">
                    {activePref.name} 調査書（内申点）換算結果
                  </span>
                  <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                    <span className="juken-num text-3xl sm:text-4xl font-black">
                      {simResult.rawScore}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#dbeafe]">
                      / {simResult.rawMax} 点満点（得点率 {simResult.percentage}%）
                    </span>
                    {simResult.hokkaidoRank && (
                      <span className="px-3 py-1 rounded-full bg-[#f29a1f] text-[#1f1405] text-xs sm:text-sm font-black">
                        北海道：{simResult.hokkaidoRank}
                      </span>
                    )}
                  </div>
                  {nf.scaledMax !== nf.rawMax && (
                    <p className="mt-1 text-xs sm:text-sm font-bold text-[#e0edff]">
                      総合選抜換算：<strong>{simResult.scaledScore}</strong> / {nf.scaledMax} 点（＋当日学力検査 {nf.examScaledMax} 点
                      {nf.extraBonusMax && nf.extraBonusLabel ? ` ＋ ${nf.extraBonusLabel} ${nf.extraBonusMax} 点` : ''}）
                    </p>
                  )}
                </div>

                <div className="sm:text-right bg-white/12 rounded-2xl px-4 py-3 border border-white/20">
                  <span className="text-xs font-bold text-[#dbeafe] block">一般的な内申：当日点比率</span>
                  <strong className="juken-num text-base sm:text-lg font-black">
                    {nf.typicalRatioLabel}
                  </strong>
                </div>
              </div>

              {/* プログレスバー */}
              <div className="mt-4 h-3 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#f29a1f] transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(5, simResult.percentage))}%` }}
                />
              </div>
            </div>

            {/* 志望レベル別 当日目標点カード */}
            <div>
              <h3 className="juken-title-font text-base font-extrabold text-[#1c2a39] mb-2.5">
                この内申点で合格圏に入るための「当日5教科合計・目標ライン目安」
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {simResult.targetTiers.map((tier) => (
                  <div
                    key={tier.tierLabel}
                    className="rounded-2xl border border-[#e3d9c8] bg-[#fffdf8] p-4 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-extrabold text-[#5a6573] block">
                        {tier.tierLabel}
                      </span>
                      <p className="mt-2 flex items-baseline gap-1.5">
                        <span className="juken-num text-2xl font-black text-[#1c4687]">
                          {tier.requiredExamScore}
                        </span>
                        <span className="text-xs font-bold text-[#5a6573]">
                          / {tier.examMax} 点以上（{tier.requiredExamPct}%）
                        </span>
                      </p>
                    </div>
                    <p className="mt-2 pt-2 border-t border-[#efe6d6] text-xs font-bold text-[#7a6a4c]">
                      1教科あたり平均 約 {Math.round(tier.requiredExamScore / 5)} 点ペース
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-[#6a5b48]">
                ※各高校・学科の選択比率（当日重視枠・特色検査・面接加算・英検みなし得点など）により前後します。{activePref.name}の代表校：{activePref.representativeSchools}
              </p>
            </div>
          </section>
        )}

        {/* ==================== タブ3：2都道府県 徹底比較 ==================== */}
        {guideTab === 'compare' && (
          <section className="juken-card p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ece2d0] pb-4">
              <div>
                <h2 className="juken-title-font text-lg font-black text-[#1c2a39]">
                  隣接県・転居・併願検討にも使える「2都道府県 入試制度徹底比較」
                </h2>
                <p className="text-xs text-[#5a6573]">
                  同じ成績（中3・5教科平均 {grades.j3Core.toFixed(1)}／実技 {grades.j3Prac.toFixed(1)}）での内申得点率も同時比較します。
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <select
                  aria-label="比較する都道府県1"
                  value={activePref.id}
                  onChange={(e) => setSelectedPrefId(e.target.value)}
                  className="min-h-[42px] px-3 rounded-xl border-2 border-[#f29a1f] bg-[#fffaf0] text-xs sm:text-sm font-extrabold text-[#1c2a39]"
                >
                  {PREFECTURE_EXAMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      ① {p.name}
                    </option>
                  ))}
                </select>
                <span className="text-xs font-black text-[#7a6a4c]">VS</span>
                <select
                  aria-label="比較する都道府県2"
                  value={comparePref.id}
                  onChange={(e) => setComparePrefId(e.target.value)}
                  className="min-h-[42px] px-3 rounded-xl border-2 border-[#2458a6] bg-[#f4f8fe] text-xs sm:text-sm font-extrabold text-[#1c2a39]"
                >
                  {PREFECTURE_EXAMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      ② {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="juken-table-wrap">
              <table className="juken-table">
                <thead>
                  <tr>
                    <th className="w-36">比較項目</th>
                    <th className="w-[42%] !bg-[#fff6e5] !text-[#6e3b00]">
                      ① {activePref.name}（{activePref.examSystemName}）
                    </th>
                    <th className="w-[42%] !bg-[#eaf2fd] !text-[#163c78]">
                      ② {comparePref.name}（{comparePref.examSystemName}）
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-extrabold">本試験・発表目安</td>
                    <td>本試験 {activePref.examMonthDay.replace('-', '月')}日 ／ 発表 {activePref.resultMonthDay.replace('-', '月')}日</td>
                    <td>本試験 {comparePref.examMonthDay.replace('-', '月')}日 ／ 発表 {comparePref.resultMonthDay.replace('-', '月')}日</td>
                  </tr>
                  <tr>
                    <td className="font-extrabold">内申の対象学年</td>
                    <td><strong>{activePref.naishinSpan}</strong>（{activePref.naishinFormula.typicalRatioLabel}）</td>
                    <td><strong>{comparePref.naishinSpan}</strong>（{comparePref.naishinFormula.typicalRatioLabel}）</td>
                  </tr>
                  <tr>
                    <td className="font-extrabold">内申の計算式</td>
                    <td>{activePref.naishinFormula.formulaLabel}</td>
                    <td>{comparePref.naishinFormula.formulaLabel}</td>
                  </tr>
                  <tr>
                    <td className="font-extrabold">現在の入力内申換算</td>
                    <td>
                      <strong className="juken-num text-[#b35c00]">
                        {simResult.rawScore} / {simResult.rawMax} 点（{simResult.percentage}%）
                      </strong>
                    </td>
                    <td>
                      <strong className="juken-num text-[#1c4687]">
                        {compareSimResult.rawScore} / {compareSimResult.rawMax} 点（{compareSimResult.percentage}%）
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-extrabold">学力検査の配点・時間</td>
                    <td>{activePref.scoreScale}（{activePref.timePerSubject}）</td>
                    <td>{comparePref.scoreScale}（{comparePref.timePerSubject}）</td>
                  </tr>
                  <tr>
                    <td className="font-extrabold">解答形式タイプ</td>
                    <td>{activePref.answerFormat}</td>
                    <td>{comparePref.answerFormat}</td>
                  </tr>
                  <tr>
                    <td className="font-extrabold">自校作成・選択問題</td>
                    <td>{activePref.customProblem}</td>
                    <td>{comparePref.customProblem}</td>
                  </tr>
                  <tr>
                    <td className="font-extrabold">英検等の外部検定優遇</td>
                    <td><strong>【{activePref.eikenPolicyType}】</strong> {activePref.eikenDetail}</td>
                    <td><strong>【{comparePref.eikenPolicyType}】</strong> {comparePref.eikenDetail}</td>
                  </tr>
                  <tr>
                    <td className="font-extrabold">英語リスニング</td>
                    <td>{activePref.listeningDetail}</td>
                    <td>{comparePref.listeningDetail}</td>
                  </tr>
                  <tr>
                    <td className="font-extrabold">代表的公立進学校</td>
                    <td>{activePref.representativeSchools}</td>
                    <td>{comparePref.representativeSchools}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
      {showPromptStudio && (
        <AiPromptStudioModal
          initialTab="chatgpt_figure"
          onClose={() => setShowPromptStudio(false)}
        />
      )}
    </div>
  );
};
