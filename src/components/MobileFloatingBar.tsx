import React from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Problem, SubQuestion } from '../types/curriculum';
import { formatText } from '../utils/textFormatter';
import { answerCardMarker } from '../utils/questionDisplay';
import { isShortAnswerType } from '../utils/quizBlanks';

export interface MobileFloatingBarProps {
  currentQuestion: Problem;
  isDesktop: boolean;
  isProblemExpanded: boolean;
  keyboardVisible: boolean;
  keyboardOffset: number;
  focusedSub: SubQuestion | null | undefined;
  focusedSubId: string | null;
  setFocusedSubId: (v: string | null) => void;
  inputNavSubs: SubQuestion[];
  focusedIndex: number;
  moveFocus: (dir: -1 | 1) => void;
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>;
  questionNeedsMathPalette: boolean;
  canGoPrevious: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  answers?: Record<string, string>;
  mobileAnswerSubs?: Array<{ sq: SubQuestion; groupName?: string }>;
  safeMobileAnsIdx?: number;
  goMobileAns?: (dir: -1 | 1) => void;
  listeningUnified?: boolean;
  accent?: string;
}

export function MobileFloatingBar({
  currentQuestion,
  isDesktop,
  isProblemExpanded,
  keyboardOffset,
  focusedSub,
  focusedSubId,
  setFocusedSubId,
  inputNavSubs,
  focusedIndex,
  moveFocus,
  inputRefs,
  questionNeedsMathPalette,
  canGoPrevious,
  handlePrevious,
  handleNext,
  answers = {},
  mobileAnswerSubs = [],
  safeMobileAnsIdx = 0,
  goMobileAns,
  listeningUnified = false,
  accent = '#2458A6',
}: MobileFloatingBarProps) {
  const hasMultiSubPager = !listeningUnified && mobileAnswerSubs.length > 1 && !!goMobileAns;
  const isAtFirstSub = safeMobileAnsIdx <= 0;
  const isAtLastSub = safeMobileAnsIdx >= mobileAnswerSubs.length - 1;
  const answeredCount = mobileAnswerSubs.filter(
    (item) => String(answers[item.sq.id] ?? '').trim().length > 0,
  ).length;
  const allSubsAnswered =
    mobileAnswerSubs.length > 0 && answeredCount === mobileAnswerSubs.length;

  // まだ最後の小問ではなく、かつ未回答が残っているときは「つぎの小問へ」を主ボタンにして押し間違い採点を防ぐ
  const primaryStepsNextSub = hasMultiSubPager && !isAtLastSub && !allSubsAnswered;

  return (
    <>
      {!isDesktop && !isProblemExpanded && !focusedSub && (
        <div className="fixed left-0 right-0 bottom-0 z-50 bg-[#fffdf7] border-t-2 border-[#e4d9c5] shadow-[0_-4px_18px_rgba(60,45,20,0.10)] px-3 pt-2.5 pb-[calc(0.6rem+env(safe-area-inset-bottom))]">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
            {/* 左ボタン：小問2問目以降なら「前の小問」、先頭なら「前の大問」 */}
            {hasMultiSubPager && !isAtFirstSub ? (
              <button
                type="button"
                onClick={() => goMobileAns!(-1)}
                aria-label="前の小問へ"
                className="inline-flex min-h-[46px] items-center justify-center gap-0.5 px-3 rounded-xl font-extrabold text-xs border-2 border-[#dfd4c0] text-[#3d3222] bg-white shadow-[0_2px_0_#e6dccb] active:translate-y-0.5 shrink-0 cursor-pointer"
              >
                <ChevronLeft size={16} className="stroke-[2.5]" aria-hidden="true" />
                <span>前の問</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                title="前の問題へ"
                aria-label="前の問題へ"
                className={`inline-flex min-h-[46px] items-center justify-center gap-0.5 px-3 rounded-xl font-extrabold text-xs border-2 shrink-0 cursor-pointer ${
                  !canGoPrevious
                    ? 'border-[#ebe4d7] text-[#c2b9aa] cursor-not-allowed bg-[#f7f3ea]'
                    : 'border-[#dfd4c0] text-[#3d3222] bg-white shadow-[0_2px_0_#e6dccb] active:translate-y-0.5'
                }`}
              >
                <ChevronLeft size={16} className="stroke-[2.5]" aria-hidden="true" />
                <span>前へ</span>
              </button>
            )}

            {/* 主ボタン：「つぎの小問へ」または「答え合わせ・解説を見る！」 */}
            {primaryStepsNextSub ? (
              <>
                <button
                  type="button"
                  onClick={() => goMobileAns!(1)}
                  className="flex flex-1 min-h-[48px] items-center justify-center gap-1.5 px-4 rounded-xl font-extrabold text-sm text-white active:translate-y-0.5 transition-all cursor-pointer"
                  style={{
                    fontFamily: 'var(--mt-font-display)',
                    backgroundColor: accent,
                    border: `1.5px solid color-mix(in srgb, ${accent} 78%, #000 22%)`,
                    boxShadow: `0 3px 0 color-mix(in srgb, ${accent} 68%, #000 25%)`,
                  }}
                >
                  <span>
                    つぎの問へ（{safeMobileAnsIdx + 2}/{mobileAnswerSubs.length}）
                  </span>
                  <ChevronRight size={17} className="stroke-[2.75]" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex min-h-[46px] items-center justify-center px-3 rounded-xl font-extrabold text-xs border-2 border-[#e3c888] bg-[#fff8e4] text-[#8a5600] shadow-[0_2px_0_#e6d099] active:translate-y-0.5 shrink-0 cursor-pointer"
                >
                  採点へ
                </button>
              </>
            ) : (
              <>
                {hasMultiSubPager && !isAtLastSub && (
                  <button
                    type="button"
                    onClick={() => goMobileAns!(1)}
                    aria-label="次の小問へ"
                    className="inline-flex min-h-[46px] items-center justify-center gap-0.5 px-3 rounded-xl font-extrabold text-xs border-2 border-[#dfd4c0] text-[#3d3222] bg-white shadow-[0_2px_0_#e6dccb] active:translate-y-0.5 shrink-0 cursor-pointer"
                  >
                    <span>次の問</span>
                    <ChevronRight size={16} className="stroke-[2.5]" aria-hidden="true" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex flex-1 min-h-[48px] items-center justify-center gap-1.5 px-4 rounded-xl font-extrabold text-sm active:translate-y-0.5 transition-all cursor-pointer"
                  style={{
                    fontFamily: 'var(--mt-font-display)',
                    backgroundColor: '#f29a1f',
                    color: '#23180a',
                    border: '1.5px solid #c47406',
                    boxShadow: '0 3px 0 #a86204',
                  }}
                >
                  <CheckCircle2 size={17} aria-hidden="true" />
                  <span>答え合わせ・解説を見る！</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 空欄ナビバー（スマホ・テキスト入力中のみ） */}
      {!isDesktop &&
        focusedSub &&
        (isShortAnswerType(focusedSub) || focusedSub.type === 'descriptive') && (
          <div
            id="floating-answer-bar"
            className="fixed left-0 right-0 z-[60] bg-[#fffdf7] border-t-2 border-[#dfd4c0] shadow-[0_-4px_20px_rgba(0,0,0,0.12)] px-3 pt-2 transition-[bottom] duration-150"
            style={{
              bottom: keyboardOffset,
              paddingBottom:
                keyboardOffset > 0 ? '0.5rem' : 'calc(0.5rem + env(safe-area-inset-bottom))',
            }}
          >
            <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
              <span
                className={`font-extrabold text-white text-[13px] px-3 py-1.5 rounded-lg truncate ${
                  questionNeedsMathPalette ? 'font-math' : ''
                }`}
                style={{ backgroundColor: accent }}
              >
                {formatText(answerCardMarker(focusedSub, focusedIndex, currentQuestion))}
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                {inputNavSubs.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => moveFocus(-1)}
                      disabled={focusedIndex <= 0}
                      aria-label="前の空欄へ"
                      className={`flex items-center justify-center gap-0.5 px-3 py-2 min-h-[2.6rem] rounded-lg text-[13px] font-extrabold border transition-colors ${
                        focusedIndex <= 0
                          ? 'border-gray-200 text-gray-300 bg-gray-50'
                          : 'border-[#dfd4c0] text-[#3d3222] bg-white active:bg-[#f5efe2]'
                      }`}
                    >
                      <ChevronLeft size={16} className="stroke-[2.5]" />
                      前へ
                    </button>
                    <span className="text-xs text-[#6b5d47] font-extrabold tabular-nums">
                      {focusedIndex + 1}/{inputNavSubs.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => moveFocus(1)}
                      disabled={focusedIndex >= inputNavSubs.length - 1}
                      aria-label="次の空欄へ"
                      className={`flex items-center justify-center gap-0.5 px-3 py-2 min-h-[2.6rem] rounded-lg text-[13px] font-extrabold border transition-colors ${
                        focusedIndex >= inputNavSubs.length - 1
                          ? 'border-gray-200 text-gray-300 bg-gray-50'
                          : 'border-[#dfd4c0] text-[#3d3222] bg-white active:bg-[#f5efe2]'
                      }`}
                    >
                      次へ
                      <ChevronRight size={16} className="stroke-[2.5]" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const el = focusedSubId ? inputRefs.current[focusedSubId] : null;
                    el?.blur();
                    setFocusedSubId(null);
                  }}
                  className="flex items-center justify-center px-4 py-2 min-h-[2.6rem] rounded-lg text-[13px] font-extrabold text-white"
                  style={{ backgroundColor: accent }}
                >
                  完了
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
