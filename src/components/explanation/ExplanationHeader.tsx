import { ArrowLeft, CheckCircle2, Save } from 'lucide-react';
import { subjectOfChapterId } from '../../data/subjects';
import { subjectTheme } from '../../data/subjectTheme';
import type { Chapter, Problem } from '../../types/curriculum';

export interface ExplanationHeaderProps {
  chapter: Chapter;
  questions: Problem[];
  singleQuestionIndex?: number;
  reorderMobile: boolean;
  isResultView: boolean;
  savingNote: Record<string, boolean>;
  handleSaveNote: (question: Problem, index: number) => void;
  calculateScore: (question: Problem) => number;
  onBack: () => void;
  onNextQuestion?: () => void;
  isLastQuestion?: boolean;
}

export function ExplanationHeader({
  chapter,
  questions,
  singleQuestionIndex,
  reorderMobile,
  isResultView,
  savingNote,
  handleSaveNote,
  calculateScore,
  onBack,
  onNextQuestion,
  isLastQuestion,
}: ExplanationHeaderProps) {
  const subjectKey = subjectOfChapterId(chapter.id) ?? 'english';
  const theme = subjectTheme(subjectKey);

  return (
    <div
      className={`px-2.5 py-1.5 md:px-5 md:py-2.5 pt-[calc(0.35rem+env(safe-area-inset-top,0px))] md:pt-2.5 border-b z-30 flex items-center justify-between gap-2 flex-none ${
        reorderMobile ? 'flex-row' : 'flex-col md:flex-row md:items-center'
      } ${isResultView ? 'sticky top-0 backdrop-blur-md' : 'relative'} bg-[#fcf5e9]/96 border-[#e3d9c8]`}
    >
      <div
        className={`flex flex-1 min-w-0 ${
          reorderMobile
            ? 'flex-row items-center justify-between gap-1.5 w-full'
            : 'flex-col sm:flex-row sm:items-center gap-2.5 w-full md:w-auto'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-extrabold text-white shrink-0 shadow-2xs"
            style={{ backgroundColor: theme.accent }}
          >
            {theme.label}
          </span>
          <div className="min-w-0 flex items-baseline gap-2">
            <h3
              className={`juken-title-font font-extrabold tracking-tight truncate ${
                reorderMobile ? 'text-[13.5px] sm:text-base' : 'text-sm md:text-base'
              } text-[#1c2a39]`}
            >
              答え合わせ
            </h3>
            <div className="hidden sm:block text-[11px] md:text-xs font-bold text-[#665947] truncate">
              {chapter.realTitle}
            </div>
          </div>
        </div>

        <div
          className={
            reorderMobile
              ? 'flex flex-nowrap items-center justify-end gap-1.5 min-w-0 shrink-0'
              : 'contents'
          }
        >
          {singleQuestionIndex !== undefined && questions[0] && (
            <div
              className={
                reorderMobile
                  ? 'flex flex-nowrap items-center justify-end gap-1.5 min-w-0'
                  : 'flex flex-wrap items-center gap-2 sm:border-l sm:pl-4 md:pl-5 border-[#dfd4c0] w-full sm:w-auto'
              }
            >
              {!reorderMobile && (
                <div
                  aria-label="答え合わせ"
                  className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-2.5 py-0.5 text-xs font-extrabold text-emerald-700 shrink-0"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>採点完了</span>
                </div>
              )}

              <div className="juken-num inline-flex items-center rounded-full border border-[#dfd4c0] bg-white px-2.5 py-0.5 text-xs font-extrabold text-[#3d3222] shrink-0">
                大問{singleQuestionIndex + 1}
              </div>

              {!reorderMobile && (
                <div className="text-xs md:text-sm font-bold text-[#3d3222] truncate max-w-[180px] lg:max-w-[240px]">
                  {questions[0].category || '問題'}
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveNote(questions[0], singleQuestionIndex);
                }}
                aria-label={savingNote[questions[0].id] ? 'ノートに保存中' : '復習ノートに保存'}
                title={savingNote[questions[0].id] ? '保存中...' : '復習ノートに保存'}
                className={`inline-flex items-center rounded-full font-extrabold transition-colors border shrink-0 cursor-pointer ${
                  reorderMobile ? 'gap-1 text-xs px-2 py-1' : 'gap-1.5 text-xs px-3 py-1'
                } ${
                  savingNote[questions[0].id]
                    ? 'bg-gray-100 text-gray-500 border-gray-200'
                    : 'bg-white text-[#9a5700] border-[#ebd29d] hover:bg-[#fff8e8] shadow-2xs'
                }`}
                disabled={savingNote[questions[0].id]}
              >
                <Save size={13} />
                <span>{reorderMobile ? '保存' : savingNote[questions[0].id] ? '保存中...' : '復習ノートに保存'}</span>
              </button>

              {(() => {
                const scorePercentage = calculateScore(questions[0]);
                return (
                  <div
                    className={`inline-flex items-center gap-1 rounded-full bg-white border border-[#e3d9c8] px-2.5 py-0.5 shrink-0 ${
                      reorderMobile ? '' : 'ml-auto sm:ml-0'
                    }`}
                    aria-label={`正答率 ${scorePercentage}%`}
                  >
                    {!reorderMobile && (
                      <span className="font-bold text-xs text-[#6b5d47]">正答率</span>
                    )}
                    <span
                      className={`juken-num font-extrabold text-xs md:text-sm ${
                        scorePercentage >= 80
                          ? 'text-emerald-600'
                          : scorePercentage <= 40
                          ? 'text-rose-600'
                          : 'text-amber-600'
                      }`}
                    >
                      {scorePercentage}%
                    </span>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      {singleQuestionIndex !== undefined && onNextQuestion ? (
        <div className={`${reorderMobile ? 'hidden' : 'flex'} items-center gap-3 w-full md:w-auto shrink-0`}>
          <button
            type="button"
            onClick={onNextQuestion}
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-2xl px-5 py-2 text-sm font-extrabold transition-transform active:translate-y-0.5 flex-1 md:flex-none cursor-pointer"
            style={{
              backgroundColor: isLastQuestion ? '#f29a1f' : theme.accent,
              color: isLastQuestion ? '#23180a' : '#ffffff',
              border: isLastQuestion
                ? '1.5px solid #c97808'
                : `1.5px solid color-mix(in srgb, ${theme.accent} 80%, #000 20%)`,
              boxShadow: isLastQuestion
                ? '0 3px 0 #b86c05'
                : `0 3px 0 color-mix(in srgb, ${theme.accent} 70%, #000 24%)`,
              fontFamily: 'var(--mt-font-display)',
            }}
          >
            <span>{isLastQuestion ? '結果サマリーを見る！' : 'つぎの問題へ'}</span>
            <ArrowLeft size={17} className="rotate-180 stroke-[2.5]" />
          </button>
        </div>
      ) : isResultView ? null : (
        <button
          type="button"
          onClick={onBack}
          className="juken-btn-soft inline-flex items-center justify-center gap-2 px-4 py-2 text-sm w-full md:w-auto cursor-pointer"
        >
          <ArrowLeft size={17} />
          <span>単元一覧へもどる</span>
        </button>
      )}
    </div>
  );
}
