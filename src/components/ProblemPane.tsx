import React, { useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';
import { formatText } from '../utils/textFormatter';
import {
  buildSubQuestionList,
  cleanQuestionText,
  findSubQuestionSentence,
  splitQuestionLabel,
  type InlineQuestionRows,
} from '../utils/questionDisplay';
import { getFigureNumber } from '../utils/figureNumbering';
import { stepLabelOf, type ListeningStep } from '../utils/listeningSteps';
import type { AudioTrack, Problem, SubQuestion } from '../types/curriculum';
import { QuestionFigure } from './QuestionFigure';
import { ListeningAudioPlayer } from './ListeningAudioPlayer';
import { ExplanationBody } from './ExplanationBody';
import { renderListeningMaterialPane } from './quiz/ListeningMaterialPane';

/**
 * 大問リード文・図表として独立ペインを出すべきか判定する。
 * - 図版（imageUrl）がある
 * - Markdown 表（|）がある
 * - 長文・会話文・史料（135文字超 または 3行以上）
 * - 小問ラベル側に設問本文が入っていない問題がある（安全網：情報を絶対に隠さない）
 */
export function hasSubstantialLeadMaterial(
  question: Problem | null | undefined,
  listeningUnified: boolean,
): boolean {
  if (!question) return false;
  if (listeningUnified) return true;
  if (question.imageUrl) return true;
  const cleaned = cleanQuestionText(question.text || '').trim();
  if (!cleaned) return false;
  if (cleaned.includes('|')) return true;
  const nonEmptyLines = cleaned.split('\n').filter((l) => l.trim().length > 0);
  if (cleaned.length > 135 || nonEmptyLines.length >= 3) return true;
  const subs = question.subQuestions || [];
  const allSubsSelfContained =
    subs.length > 0 &&
    subs.every((sq, idx) => splitQuestionLabel(sq.label || '', `問${idx + 1}`).body.trim().length > 0);
  return !allSubsSelfContained;
}

export interface ProblemPaneProps {
  currentQuestion: Problem;
  currentQuestionIndex: number;
  isDesktop: boolean;
  isProblemExpanded: boolean;
  setIsProblemExpanded: (v: boolean) => void;
  isProblemCollapsed: boolean;
  setIsProblemCollapsed: (v: boolean) => void;
  keyboardVisible: boolean;
  listeningUnified: boolean;
  listeningMobileSplit: boolean;
  listeningMobileNoFigure: boolean;
  listeningMaterialsMobile?: boolean;
  selectedAnswerSub?: SubQuestion | null;
  listeningSteps: ListeningStep[];
  safeStepIndex: number;
  activeStepSub: SubQuestion | null | undefined;
  listeningTracks: AudioTrack[];
  hasTrackFor: (subId: string) => boolean;
  isEnglishProse: boolean;
  questionNeedsMathPalette: boolean;
  figureNumberMap: Record<string, number>;
  combinedHighlights: string[];
  highlights: string[];
  setHighlights: (v: string[]) => void;
  handleTextSelection: () => void;
  inlineQuestionRows: InlineQuestionRows | null;
  hideRedundantSubQuestionList: boolean;
  problemScrollRef: React.RefObject<HTMLDivElement | null>;
  accent?: string;
}

export function ProblemPane({
  currentQuestion,
  currentQuestionIndex,
  isDesktop,
  isProblemExpanded,
  setIsProblemExpanded,
  isProblemCollapsed,
  setIsProblemCollapsed,
  keyboardVisible,
  listeningUnified,
  listeningMobileSplit,
  listeningMobileNoFigure,
  listeningMaterialsMobile = false,
  selectedAnswerSub,
  listeningSteps,
  safeStepIndex,
  activeStepSub,
  listeningTracks,
  hasTrackFor,
  isEnglishProse,
  questionNeedsMathPalette,
  figureNumberMap,
  combinedHighlights,
  highlights,
  setHighlights,
  handleTextSelection,
  inlineQuestionRows,
  problemScrollRef,
  accent = '#2458A6',
}: ProblemPaneProps) {
  const materialTrack = listeningTracks.find((t) => t.subId === activeStepSub?.id);

  useEffect(() => {
    const pane = problemScrollRef.current;
    if (!pane || !materialTrack?.material || isDesktop) return;
    const number = selectedAnswerSub?.id?.match(/_(\d+)$/)?.[1];
    const target = selectedAnswerSub?.optionImages?.length
      ? pane.querySelector('[data-material-graph]')
      : number && !materialTrack.material.images?.length
        ? pane.querySelector(`[data-material-blank="${number}"]`)
        : null;
    if (target) {
      const view = pane.getBoundingClientRect();
      const rect = target.getBoundingClientRect();
      if (rect.top < view.top || rect.bottom > view.bottom) {
        pane.scrollTop += rect.top - view.top - 12;
      }
    } else {
      pane.scrollTop = 0;
    }
  }, [selectedAnswerSub?.id, materialTrack?.subId, isDesktop]);

  if (listeningUnified && materialTrack?.material) {
    return renderListeningMaterialPane({
      currentQuestion,
      isDesktop,
      isProblemExpanded,
      setIsProblemExpanded,
      setIsProblemCollapsed,
      listeningMaterialsMobile,
      selectedAnswerSub,
      materialTrack: { ...materialTrack, material: materialTrack.material },
      activeStepSub: activeStepSub!,
      listeningTracks,
      problemScrollRef,
    });
  }

  const showFullReferencePane = hasSubstantialLeadMaterial(currentQuestion, listeningUnified);

  // 図表も長文も無い1文イントロ問題では、左右2分割にせず AnswerPane 側の1カラム学習デスクに統合する
  if (!showFullReferencePane) {
    return null;
  }

  // 小問ラベルに本文が無い旧形式問題だけ左ペインに設問一覧を残す（重複表示の完全排除）
  const subs = currentQuestion.subQuestions || [];
  const allSubsSelfContained =
    subs.length > 0 &&
    subs.every((sq, idx) => splitQuestionLabel(sq.label || '', `問${idx + 1}`).body.trim().length > 0);

  return (
    <div
      className={`
      lg:w-[46%] flex flex-col bg-[#fffdf8] border-b lg:border-b-0 lg:border-r border-[#e4d9c5] transition-all duration-200
      ${listeningMobileSplit && !listeningMobileNoFigure ? 'flex-1 min-h-0' : 'flex-none'}
      ${
        isDesktop
          ? 'h-full'
          : isProblemExpanded
            ? 'absolute inset-0 z-30 h-full shadow-lg bg-[#fffdf8]'
            : isProblemCollapsed
              ? 'h-auto relative z-20'
              : keyboardVisible
                ? 'max-h-[24vh] h-auto relative z-20'
                : listeningMobileNoFigure
                  ? 'h-auto max-h-[44dvh] relative z-20'
                  : listeningMobileSplit
                    ? 'relative z-20'
                    : 'max-h-[43%] h-auto relative z-20'
      }
    `}
    >
      {/* 見出しバー */}
      <div
        className={`flex items-center justify-between px-3 py-2 md:px-5 md:py-3 border-b border-[#ece2cf] bg-[#faf4e6] ${
          !isDesktop && keyboardVisible ? 'hidden' : ''
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-xs font-extrabold text-white shrink-0"
            style={{ backgroundColor: accent }}
          >
            大問 {currentQuestionIndex + 1}
          </span>
          <span className="inline-flex items-center gap-1 font-extrabold text-[#3d3222] text-xs md:text-sm truncate">
            <BookOpen size={15} style={{ color: accent }} className="shrink-0" />
            <span>{currentQuestion.imageUrl ? '問題文・図表' : '問題文・資料'}</span>
          </span>

          {highlights.length > 0 && (
            <button
              type="button"
              onClick={() => setHighlights([])}
              className="min-h-[32px] text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 rounded-full border border-amber-300 hover:bg-amber-200/70 transition-colors whitespace-nowrap cursor-pointer"
            >
              マーカー消去
            </button>
          )}
        </div>

        {!isDesktop && (
          <div className="flex items-center gap-1.5 shrink-0">
            {!isProblemExpanded && (
              <button
                type="button"
                onClick={() => setIsProblemCollapsed(!isProblemCollapsed)}
                aria-expanded={!isProblemCollapsed}
                className="inline-flex min-h-[36px] items-center gap-1 rounded-full border border-[#dfd4c0] bg-white px-2.5 text-xs font-extrabold text-[#4a3d2b] shadow-[0_1px_0_#e6dccb] whitespace-nowrap cursor-pointer"
              >
                {isProblemCollapsed ? (
                  <>
                    <span>本文・図を開く</span>
                    <ChevronDown size={13} />
                  </>
                ) : (
                  <>
                    <span>たたむ</span>
                    <ChevronUp size={13} />
                  </>
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setIsProblemExpanded(!isProblemExpanded);
                setIsProblemCollapsed(false);
              }}
              className="inline-flex min-h-[36px] items-center gap-1 rounded-full border border-[#dfd4c0] bg-white px-2.5 text-xs font-extrabold text-[#4a3d2b] shadow-[0_1px_0_#e6dccb] whitespace-nowrap cursor-pointer"
            >
              {isProblemExpanded ? (
                <>
                  <Minimize2 size={12} />
                  <span>閉じる</span>
                </>
              ) : (
                <>
                  <Maximize2 size={12} />
                  <span>大きく読む</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* 問題本文＆図表スクロール領域 */}
      <div
        ref={problemScrollRef}
        className={`${
          !isDesktop && !isProblemExpanded && isProblemCollapsed ? 'hidden' : ''
        } flex-1 min-h-0 overflow-y-auto md:p-6 text-[15px] leading-[1.85] md:text-[15.5px] md:leading-[1.9] text-[#1c2a39] break-words [overflow-wrap:anywhere] ${
          listeningMobileSplit ? 'flex flex-col px-3 pt-2 pb-3' : 'p-3.5 sm:p-5'
        } ${questionNeedsMathPalette ? 'font-math math-content' : 'font-modern'}`}
        onMouseUp={handleTextSelection}
        onTouchEnd={handleTextSelection}
        title="大事な語句をなぞると黄色マーカーを引けます"
      >
        <div
          className={`max-w-prose md:max-w-none ${
            listeningMobileSplit ? 'flex min-h-0 flex-1 flex-col' : ''
          }`}
        >
          {listeningUnified &&
            activeStepSub &&
            (() => {
              const currentStep = listeningSteps[safeStepIndex];
              const grouped = !!currentStep && currentStep.subQuestionIds.length > 1;
              const stepTrack = listeningTracks.find(
                (t: AudioTrack) => t?.subId === activeStepSub.id,
              );
              const stepMarker =
                grouped && currentStep
                  ? currentStep.label
                  : stepLabelOf(activeStepSub, safeStepIndex);
              const { body: labelBody } = splitQuestionLabel(
                activeStepSub.label || '',
                stepMarker,
              );
              const body = grouped ? String(stepTrack?.hint || '') : labelBody;
              const displayWidthOf = (t: string) =>
                [...t].reduce((w, ch) => w + (ch.charCodeAt(0) < 0x80 ? 0.5 : 1), 0);
              const inlineBody = body && displayWidthOf(body) <= 20 ? body : '';
              const blockBody = inlineBody ? '' : body;
              const stepSentence = findSubQuestionSentence(currentQuestion, activeStepSub);

              return (
                <div
                  className={
                    listeningMobileSplit ? 'flex min-h-0 flex-1 flex-col' : 'mb-4'
                  }
                >
                  <div
                    className={`flex items-center gap-2 flex-wrap ${
                      listeningMobileSplit ? 'mb-1.5' : inlineBody ? 'mb-2' : 'mb-2.5'
                    }`}
                  >
                    <span
                      className="font-extrabold text-white text-sm py-1 px-3 rounded-lg shadow-xs shrink-0"
                      style={{ backgroundColor: accent }}
                    >
                      {formatText(stepMarker)}
                    </span>
                    {listeningSteps.length > 1 && (
                      <span className="text-xs font-bold text-[#5a6573] shrink-0">
                        （全{listeningSteps.length}問中 {safeStepIndex + 1}問目）
                      </span>
                    )}
                    {inlineBody && (
                      <span className="min-w-0 text-[14px] md:text-base font-bold leading-snug text-[#1c2a39] font-modern break-words [overflow-wrap:anywhere]">
                        {formatText(inlineBody, combinedHighlights, {
                          prose: isEnglishProse,
                        })}
                      </span>
                    )}
                  </div>

                  {blockBody && (
                    <p className="text-[15px] md:text-base leading-relaxed text-[#1c2a39] font-modern break-words [overflow-wrap:anywhere] mb-3">
                      {formatText(blockBody, combinedHighlights, {
                        prose: isEnglishProse,
                      })}
                    </p>
                  )}

                  {stepSentence && (
                    <p className="mb-2.5 rounded-xl border border-[#e3d8c4] bg-white px-3.5 py-2.5 text-[16px] md:text-base font-bold leading-relaxed text-[#1c2a39] font-modern whitespace-pre-line break-words [overflow-wrap:anywhere]">
                      {formatText(stepSentence, combinedHighlights, { prose: true })}
                    </p>
                  )}

                  {hasTrackFor(activeStepSub.id) && (
                    <ListeningAudioPlayer
                      tracks={listeningTracks}
                      focusSubId={activeStepSub.id}
                      variant="inline"
                      orientation="horizontal"
                      mode="practice"
                      tone="light"
                      readCount={currentQuestion.readCount || 2}
                      playOnce={!!currentQuestion.playOnce}
                    />
                  )}

                  {activeStepSub.imageUrl && (
                    <QuestionFigure
                      src={activeStepSub.imageUrl}
                      caption={
                        listeningMobileSplit ? undefined : activeStepSub.imageCaption
                      }
                      alt={activeStepSub.imageCaption || undefined}
                      tone="light"
                      className={listeningMobileSplit ? 'mt-1' : 'mt-3'}
                      fill={listeningMobileSplit}
                      imgClassName={
                        listeningMobileSplit
                          ? ''
                          : 'max-h-[42vh] md:max-h-[52vh] object-contain'
                      }
                    />
                  )}
                </div>
              );
            })()}

          {!listeningUnified &&
            (inlineQuestionRows ? (
              <div className="flex flex-col gap-1.5">
                {inlineQuestionRows.lead && (
                  <ExplanationBody
                    text={inlineQuestionRows.lead}
                    highlights={combinedHighlights}
                  />
                )}
                <ul className="flex flex-wrap gap-x-2 gap-y-1.5">
                  {inlineQuestionRows.rows.map((row, rIdx) => (
                    <li
                      key={rIdx}
                      className="flex min-w-0 grow basis-[calc(50%-0.25rem)] items-baseline gap-1"
                    >
                      {row.marker && (
                        <span className="shrink-0 font-bold text-[#5a6573]">
                          {formatText(row.marker)}
                        </span>
                      )}
                      <span className="min-w-0">
                        {formatText(row.body, combinedHighlights)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="rounded-2xl border border-[#eae0ce] bg-white p-4 shadow-2xs">
                <ExplanationBody
                  text={cleanQuestionText(currentQuestion.text)}
                  highlights={combinedHighlights}
                  boxedSections
                />
              </div>
            ))}

          {currentQuestion.imageUrl && (
            <div className="mt-4 rounded-2xl border border-[#e3d8c4] bg-white p-3 shadow-2xs">
              <QuestionFigure
                src={currentQuestion.imageUrl}
                caption={currentQuestion.imageCaption}
                figureNumber={getFigureNumber(figureNumberMap, currentQuestion.id)}
                tone="light"
                className="mt-0"
              />
            </div>
          )}

          {/* 小問自体に本文がない形式の問題のみ設問一覧を補助表示 */}
          {!listeningUnified &&
            !allSubsSelfContained &&
            (() => {
              const sqList = buildSubQuestionList(currentQuestion);
              if (sqList.length === 0) return null;
              return (
                <div className="mt-4 pt-3 border-t border-dashed border-[#dfd4c0]">
                  <div className="text-xs font-extrabold mb-2 text-[#6b5d47]">設問一覧</div>
                  <ol className="space-y-2">
                    {sqList.map((item, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2">
                        {item.marker && (
                          <span className="shrink-0 font-bold text-xs px-2 py-0.5 rounded-md border mt-0.5 bg-white text-[#3d3222] border-[#dfd4c0]">
                            {formatText(item.marker)}
                          </span>
                        )}
                        <span className="min-w-0 leading-relaxed">
                          {formatText(item.body, combinedHighlights)}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })()}
        </div>
      </div>
    </div>
  );
}
