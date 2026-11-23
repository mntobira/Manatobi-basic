import React, { useMemo } from 'react';
import '../styles/juken-polish.css';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Compass,
  MapPin,
  PenTool,
  Swords,
} from 'lucide-react';
import { SUBJECT_REGISTRY, type SubjectKey } from '../data/subjects';
import { getSubjectStats } from '../data/chapterIndex.generated';
import { getSavedTargetPrefecture } from '../data/prefectureExams';
import { TobiraBuddy } from './TobiraBuddy';

interface JukenSubjectSelectionProps {
  currentSubject: SubjectKey;
  onSelectSubject: (subject: SubjectKey) => void;
  onBack: () => void;
  backLabel?: string;
  onBattle?: () => void;
  onOpenPrefectureGuide?: () => void;
  onOpenWritingDojo?: () => void;
}

export const JukenSubjectSelection: React.FC<JukenSubjectSelectionProps> = ({
  currentSubject,
  onSelectSubject,
  onBack,
  backLabel = 'ホームに戻る',
  onBattle,
  onOpenPrefectureGuide,
  onOpenWritingDojo,
}) => {
  const targetPref = useMemo(() => getSavedTargetPrefecture(), []);

  return (
    <div className="juken-screen">
      <header className="juken-header">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="juken-btn-soft inline-flex items-center gap-1.5 px-3.5 py-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </button>

          <h1 className="juken-title-font text-base sm:text-lg font-extrabold text-[#1c2a39] truncate">
            教科・特別講座を選ぶ
          </h1>

          {onBattle ? (
            <button
              type="button"
              onClick={onBattle}
              className="juken-btn-primary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm shrink-0"
            >
              <Swords className="w-4 h-4" />
              <span>5教科対戦へ</span>
            </button>
          ) : (
            <span className="w-16" />
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-4 space-y-4">
        {/* とびら君＆志望都道府県クイック帯 */}
        <div className="juken-card p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <TobiraBuddy
            size="sm"
            bubble="right"
            input={{ screen: 'study' }}
            line={`現在の志望は「${targetPref.name}（${targetPref.examSystemName}）」だよ！ 5教科すべての実戦問題と赤シートプリントで合格力を鍛えよう！`}
          />
          {onOpenPrefectureGuide && (
            <button
              type="button"
              onClick={onOpenPrefectureGuide}
              className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-1.5 rounded-full bg-[#e7eef8] text-[#1c4687] border border-[#b9d0ef] text-xs font-extrabold shrink-0 self-end sm:self-center hover:bg-[#dce8f8] transition"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>志望：{targetPref.name}（変更・内申計算）</span>
            </button>
          )}
        </div>

        {/* 5教科カード一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUBJECT_REGISTRY.map((sub) => {
            const stats = getSubjectStats(sub.id as SubjectKey);
            const active = sub.id === currentSubject;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => onSelectSubject(sub.id as SubjectKey)}
                className={`juken-card-interactive text-left p-4 sm:p-5 flex flex-col justify-between gap-3 ${
                  active ? 'ring-2 ring-offset-2' : ''
                }`}
                style={
                  active
                    ? { borderColor: sub.theme.accent, ['--tw-ring-color' as string]: sub.theme.accent }
                    : undefined
                }
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="juken-title-font inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-sm font-black text-white"
                      style={{ backgroundColor: sub.theme.accent }}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{sub.label}</span>
                    </span>
                    <span className="juken-num text-xs font-extrabold text-[#5a6573]">
                      全{stats.chapters ?? 0}単元・計{stats.questions ?? 0}問（実戦{stats.practiceQuestions ?? 0}＋小テスト{stats.miniTestQuestions ?? 0}）
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm font-medium text-[#2b241c] leading-6">
                    {sub.practiceDescription}
                  </p>
                </div>

                <div
                  className="flex items-center justify-between pt-2.5 border-t border-[#efe6d6] text-xs sm:text-sm font-extrabold"
                  style={{ color: sub.theme.accent }}
                >
                  <span>実戦演習・小テスト・赤シートへ進む</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* 高校入試 特別講座（47都道府県入試研究 ＆ 英作文道場） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {onOpenPrefectureGuide && (
            <button
              type="button"
              onClick={onOpenPrefectureGuide}
              className="juken-card-interactive text-left !bg-gradient-to-br !from-[#eaf2fd] !to-white !border-[#b9d0ef] p-4 sm:p-5 flex items-center justify-between gap-3"
            >
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#1c4687] bg-white px-2.5 py-0.5 rounded-full border border-[#b9d0ef]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>日本地図・内申シミュレーター・2県比較</span>
                </span>
                <h2 className="juken-title-font mt-1.5 text-base font-black text-[#1c2a39]">
                  全国47都道府県 公立高校入試研究
                </h2>
                <p className="mt-0.5 text-xs font-medium text-[#3e4c5b]">
                  配点・内申計算式・2027改革・英検優遇・目標当日点試算
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#2458a6] shrink-0" />
            </button>
          )}

          {onOpenWritingDojo && (
            <button
              type="button"
              onClick={onOpenWritingDojo}
              className="juken-card-interactive text-left !bg-gradient-to-br !from-[#fff5e2] !to-white !border-[#efc981] p-4 sm:p-5 flex items-center justify-between gap-3"
            >
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#8a4b00] bg-white px-2.5 py-0.5 rounded-full border border-[#efc981]">
                  <PenTool className="w-3.5 h-3.5" />
                  <span>都立3文・埼玉/大阪・神奈川・対話補充</span>
                </span>
                <h2 className="juken-title-font mt-1.5 text-base font-black text-[#1c2a39]">
                  高校入試 英作文道場（全15題）
                </h2>
                <p className="mt-0.5 text-xs font-medium text-[#4e4030]">
                  必須の型21選・減点ゼロ言い換え・語数＆文法セルフ判定
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#b86c05] shrink-0" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
};
