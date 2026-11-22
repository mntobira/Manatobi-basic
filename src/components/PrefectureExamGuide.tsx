import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  MapPin,
  Play,
  Search,
  Sparkles,
} from 'lucide-react';
import {
  PREFECTURE_EXAMS,
  getSavedTargetPrefecture,
  saveTargetPrefecture,
  type AnswerFormatType,
  type NaishinSpanType,
  type PrefectureExamInfo,
  type RegionKey,
} from '../data/prefectureExams';
import type { SubjectKey } from '../data/subjects';

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
  const [regionFilter, setRegionFilter] = useState<'すべて' | RegionKey>('すべて');
  const [formatFilter, setFormatFilter] = useState<'all' | AnswerFormatType>('all');
  const [naishinFilter, setNaishinFilter] = useState<'all' | NaishinSpanType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPrefs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PREFECTURE_EXAMS.filter((p) => {
      if (regionFilter !== 'すべて' && p.region !== regionFilter) return false;
      if (formatFilter !== 'all' && p.answerFormat !== formatFilter) return false;
      if (naishinFilter !== 'all' && p.naishinSpan !== naishinFilter) return false;
      if (
        q &&
        !p.name.toLowerCase().includes(q) &&
        !p.keyFeature.toLowerCase().includes(q) &&
        !p.customProblem.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [regionFilter, formatFilter, naishinFilter, searchQuery]);

  const activePref: PrefectureExamInfo =
    PREFECTURE_EXAMS.find((p) => p.id === selectedPrefId) ?? targetPref;

  const handleSetTarget = (pref: PrefectureExamInfo) => {
    const saved = saveTargetPrefecture(pref.id);
    setTargetPref(saved);
    onTargetPrefChange?.(saved);
  };

  return (
    <div className="min-h-screen bg-[#fcf5e9] text-[#2b241c] pb-24">
      {/* ヘッダー */}
      <header className="sticky top-0 z-30 bg-[#fcf5e9]/95 backdrop-blur-md border-b border-[#e5d8c3] px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-xl bg-white border border-[#e2d5bf] text-sm font-bold text-[#3d3328] hover:bg-[#f7efe0] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>もどる</span>
          </button>

          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#2458A6]" />
            <h1 className="text-base sm:text-lg font-extrabold">
              全国47都道府県 公立高校入試研究
            </h1>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2458A6] text-white text-xs font-extrabold">
            <MapPin className="w-3.5 h-3.5" />
            <span>志望：{targetPref.name}</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-4 space-y-4">
        {/* 全国トレンド概要バナー */}
        <section className="bg-white rounded-3xl border border-[#e3d6c1] p-4 sm:p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-extrabold text-[#2458A6] bg-[#2458A6]/10 px-2.5 py-0.5 rounded-full">
                47都道府県 完全網羅データベース
              </span>
              <h2 className="mt-1.5 text-base sm:text-lg font-extrabold text-[#231d16]">
                内申点の対象学年・マークシート導入・自校作成問題・5教科の急所を徹底比較
              </h2>
            </div>
          </div>

          {/* 検索＆フィルタ */}
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8c7b67] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="都道府県名・C問題・自校作成などで検索"
                className="w-full min-h-[44px] pl-9 pr-3 py-2 rounded-xl border border-[#dcd0ba] bg-[#fffcf7] text-sm font-medium focus:border-[#2458A6] focus:outline-none"
              />
            </div>

            <select
              aria-label="解答形式フィルタ"
              value={formatFilter}
              onChange={(e) => setFormatFilter(e.target.value as typeof formatFilter)}
              className="min-h-[44px] px-3 py-2 rounded-xl border border-[#dcd0ba] bg-[#fffcf7] text-xs sm:text-sm font-bold text-[#3f3428]"
            >
              <option value="all">解答形式：すべて（47）</option>
              <option value="マークシート中心型">マークシート中心型（東京・神奈川・愛知・兵庫など）</option>
              <option value="記述＋記号標準型">記述＋記号標準型（三重・北海道・福岡など）</option>
              <option value="記述・思考力重視型">記述・思考力重視型（大阪・埼玉・石川・広島など）</option>
            </select>

            <select
              aria-label="内申対象学年フィルタ"
              value={naishinFilter}
              onChange={(e) => setNaishinFilter(e.target.value as typeof naishinFilter)}
              className="min-h-[44px] px-3 py-2 rounded-xl border border-[#dcd0ba] bg-[#fffcf7] text-xs sm:text-sm font-bold text-[#3f3428]"
            >
              <option value="all">内申点の対象学年：すべて</option>
              <option value="中3のみ">中3のみ評価（三重・東京・愛知・静岡・福岡など）</option>
              <option value="中2〜中3">中2〜中3評価（神奈川・奈良・富山・高知）</option>
              <option value="中1〜中3">中1〜中3全学年評価（北海道・埼玉・千葉・大阪など）</option>
            </select>
          </div>

          {/* 地方タブ */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegionFilter(r)}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap border transition ${
                  regionFilter === r
                    ? 'bg-[#2458A6] text-white border-[#2458A6]'
                    : 'bg-[#faf4e8] text-[#564838] border-[#e2d6c1] hover:bg-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* 都道府県チップ一覧 */}
          <div className="mt-3 flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            {filteredPrefs.map((pref) => {
              const selected = pref.id === activePref.id;
              const isTarget = pref.id === targetPref.id;
              return (
                <button
                  key={pref.id}
                  type="button"
                  onClick={() => setSelectedPrefId(pref.id)}
                  className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold border flex items-center gap-1 transition ${
                    selected
                      ? 'bg-[#f29a1f] text-white border-[#d9820b] shadow-sm'
                      : isTarget
                        ? 'bg-[#eef4fd] text-[#1e4785] border-[#9dc0ef]'
                        : 'bg-white text-[#473b2e] border-[#e2d5bf] hover:bg-[#fffaf0]'
                  }`}
                >
                  <span>{pref.name}</span>
                  {isTarget && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
            {filteredPrefs.length === 0 && (
              <p className="text-xs text-[#7a6955] py-2">
                条件に一致する都道府県がありません。フィルタを戻してお試しください。
              </p>
            )}
          </div>
        </section>

        {/* 選択中の都道府県 詳細カルテ */}
        <section className="bg-white rounded-3xl border border-[#e3d6c1] shadow-sm overflow-hidden">
          <div className="px-5 py-5 bg-gradient-to-r from-[#eef4fc] to-[#fdf7ec] border-b border-[#e4d7c1] flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#2458A6] text-white">
                  {activePref.region}
                </span>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white border border-[#cbd9ec] text-[#2458A6]">
                  {activePref.answerFormat}
                </span>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#fff3db] border border-[#f2d194] text-[#9b5910]">
                  内申：{activePref.naishinSpan}
                </span>
              </div>
              <h2 className="mt-2 text-xl sm:text-2xl font-black text-[#1f1912]">
                {activePref.name}（{activePref.examSystemName}）
              </h2>
              <p className="mt-1 text-xs sm:text-sm font-bold text-[#524434]">
                例年本試験目安：{activePref.examMonthDay.replace('-', '月')}日ごろ
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleSetTarget(activePref)}
              className={`min-h-[46px] px-5 py-2.5 rounded-2xl text-sm font-extrabold shadow-sm flex items-center gap-2 transition ${
                targetPref.id === activePref.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#2458A6] text-white hover:brightness-105'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {targetPref.id === activePref.id
                  ? '現在の志望都道府県に設定中'
                  : `${activePref.name}を志望都道府県に設定する`}
              </span>
            </button>
          </div>

          <div className="p-5 space-y-5">
            {/* 制度スペック3枚カード */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#fffcf7] border border-[#ece0cb] p-4">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#2458A6]">
                  <Award className="w-4 h-4" />
                  <span>学力検査の配点・満点</span>
                </div>
                <p className="mt-1.5 text-sm font-extrabold text-[#241e16]">
                  {activePref.scoreSummary}
                </p>
                <p className="mt-1 text-xs text-[#655543] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>試験時間：{activePref.timePerSubject}</span>
                </p>
              </div>

              <div className="rounded-2xl bg-[#fffcf7] border border-[#ece0cb] p-4">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0E7C86]">
                  <FileCheck2 className="w-4 h-4" />
                  <span>調査書（内申点）の扱い</span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#241e16] leading-6">
                  {activePref.naishinDetail}
                </p>
              </div>

              <div className="rounded-2xl bg-[#fffcf7] border border-[#ece0cb] p-4">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#C7771E]">
                  <Sparkles className="w-4 h-4" />
                  <span>自校作成・選択問題・特色</span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#241e16] leading-6">
                  {activePref.customProblem}
                </p>
              </div>
            </div>

            {/* 総合特徴ハイライト */}
            <div className="rounded-2xl bg-[#f4f8fe] border border-[#d6e4f8] p-4">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#1e4785]">
                📌 {activePref.name}入試の最大の攻略ポイント
              </h3>
              <p className="mt-1 text-sm leading-7 font-bold text-[#253346]">
                {activePref.keyFeature}
              </p>
            </div>

            {/* 5教科別 出題傾向分析 */}
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#2b241c] mb-2.5">
                📚 5教科別 出題傾向と対策
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { key: 'english', label: '英語', color: '#2458A6', text: activePref.subjectTrends.english },
                  { key: 'math', label: '数学', color: '#0E7C86', text: activePref.subjectTrends.math },
                  { key: 'japanese', label: '国語', color: '#C24641', text: activePref.subjectTrends.japanese },
                  { key: 'science', label: '理科', color: '#2B8A57', text: activePref.subjectTrends.science },
                  { key: 'social', label: '社会', color: '#C7771E', text: activePref.subjectTrends.social },
                ].map((sub) => (
                  <div
                    key={sub.key}
                    className="rounded-2xl border border-[#eae0ce] bg-white p-3.5 flex flex-col gap-1"
                  >
                    <span
                      className="inline-block w-fit text-xs font-extrabold px-2.5 py-0.5 rounded-md text-white"
                      style={{ backgroundColor: sub.color }}
                    >
                      {sub.label}
                    </span>
                    <p className="text-xs sm:text-sm text-[#352c22] leading-6 font-medium">
                      {sub.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 直結おすすめ単元ショートカット */}
            <div className="border-t border-[#eee2ce] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-sm sm:text-base font-extrabold text-[#2b241c]">
                  🎯 {activePref.name}志望者が今すぐ解くべき最優先単元
                </h3>
                {onOpenWritingDojo && (
                  <button
                    type="button"
                    onClick={onOpenWritingDojo}
                    className="text-xs font-extrabold text-[#2458A6] underline min-h-[36px] px-2"
                  >
                    英作文道場でライティング特訓する →
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePref.recommendedChapters.map((rec) => (
                  <button
                    key={rec.chapterId}
                    type="button"
                    onClick={() => onStartChapter(rec.chapterId, rec.subject)}
                    className="text-left rounded-2xl border border-[#dfd2bc] bg-[#fffaf0] hover:bg-[#fff3dc] p-3.5 flex items-center justify-between gap-3 transition min-h-[64px]"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#33291e] leading-5">
                      {rec.reason}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#2458A6] text-white text-xs font-extrabold shrink-0">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>演習</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
