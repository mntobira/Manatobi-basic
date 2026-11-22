import React from 'react';
import { ArrowLeft, BookOpen, Compass, PenTool, Swords, ChevronRight } from 'lucide-react';
import { SUBJECT_REGISTRY, type SubjectKey } from '../data/subjects';
import { getSubjectStats } from '../data/chapterIndex.generated';

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
  return (
    <div className="min-h-screen bg-[#fcf5e9] text-[#2b241c] pb-24 px-4 pt-4">
      <div className="max-w-4xl mx-auto space-y-5">
        <header className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl bg-white border border-[#e2d5bf] text-sm font-bold text-[#3d3328] hover:bg-[#f7efe0] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </button>

          <h1 className="text-lg sm:text-xl font-extrabold text-[#231d16]">
            教科・特別講座を選ぶ
          </h1>

          {onBattle ? (
            <button
              type="button"
              onClick={onBattle}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl bg-[#2458A6] text-white text-xs sm:text-sm font-extrabold shadow-sm hover:brightness-105 transition"
            >
              <Swords className="w-4 h-4" />
              <span>5教科対戦へ</span>
            </button>
          ) : (
            <span className="w-16" />
          )}
        </header>

        {/* 5教科カード一覧 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUBJECT_REGISTRY.map((sub) => {
            const stats = getSubjectStats(sub.id);
            const active = sub.id === currentSubject;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => onSelectSubject(sub.id)}
                className={`text-left rounded-3xl border-2 p-4 sm:p-5 bg-white shadow-sm hover:shadow-md transition flex flex-col justify-between gap-3 ${
                  active ? 'ring-2 ring-offset-2 ring-[#2458A6]' : 'border-[#e4d7c1]'
                }`}
                style={active ? { borderColor: sub.theme.accent } : undefined}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-black text-white"
                      style={{ backgroundColor: sub.theme.accent }}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{sub.label}</span>
                    </span>
                    <span className="text-xs font-extrabold text-[#6b5b49]">
                      全{stats.chapters ?? 0}単元・実戦{stats.questions ?? 0}問＋赤シート
                    </span>
                  </div>
                  <p className="mt-2.5 text-xs sm:text-sm font-medium text-[#3d3327] leading-6">
                    {sub.practiceDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#f0e6d5] text-xs font-extrabold" style={{ color: sub.theme.accent }}>
                  <span>演習問題・まとめプリントへ進む</span>
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
              className="text-left rounded-3xl border-2 border-[#c8dbf6] bg-gradient-to-br from-[#eef5ff] to-white p-4 sm:p-5 shadow-sm hover:shadow-md transition flex items-center justify-between gap-3"
            >
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#2458A6] bg-white px-2.5 py-0.5 rounded-full border border-[#c8dbf6]">
                  <Compass className="w-3.5 h-3.5" />
                  <span>全国47都道府県 完全収録</span>
                </span>
                <h2 className="mt-1.5 text-base font-black text-[#1d365d]">
                  都道府県別 公立高校入試研究
                </h2>
                <p className="mt-0.5 text-xs text-[#4b5d78]">
                  配点・内申学年・マークシート・自校作成/C問題・志望県設定
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#2458A6] shrink-0" />
            </button>
          )}

          {onOpenWritingDojo && (
            <button
              type="button"
              onClick={onOpenWritingDojo}
              className="text-left rounded-3xl border-2 border-[#f4d4a4] bg-gradient-to-br from-[#fff7ea] to-white p-4 sm:p-5 shadow-sm hover:shadow-md transition flex items-center justify-between gap-3"
            >
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#b45309] bg-white px-2.5 py-0.5 rounded-full border border-[#f4d4a4]">
                  <PenTool className="w-3.5 h-3.5" />
                  <span>自動減点チェッカー搭載</span>
                </span>
                <h2 className="mt-1.5 text-base font-black text-[#693805]">
                  高校入試 英作文道場
                </h2>
                <p className="mt-0.5 text-xs text-[#7c5832]">
                  必須の型21選・言い換え術・予想問題6回分・語数＆文法判定
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#d97706] shrink-0" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
