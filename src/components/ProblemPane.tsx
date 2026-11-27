import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Maximize2, Minimize2, X, ZoomIn } from 'lucide-react';
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
import { JukenMaterialCarousel } from './JukenMaterialCarousel';

/**
 * 大問リード文・図表として独立ペインを出すべきか判定する。
 * - 複数資料カルーセル（materials）がある
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
  if (Array.isArray(question.materials) && question.materials.length > 0) return true;
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

/**
 * 図表・スライド資料がある問題で、スマホ時に大問リード文が
 * 「上の資料を読んで(1)〜(5)に答えなさい」「入試頻出の5問です」のような
 * 数値条件・数式を含まない純粋な案内文かどうかを判定する。
 * （数式 `$...$` や距離・角度・電流等の数値条件がある場合は false を返し必ず表示する）
 */
function isRedundantVisualLeadOnMobile(cleaned: string, hasMaterials: boolean): boolean {
  if (!cleaned) return true;
  if (hasMaterials && /^上の「資料/u.test(cleaned) && cleaned.length <= 80) return true;
  if (cleaned.includes('$') || cleaned.includes('|') || cleaned.includes('\n')) return false;
  if (/[0-9０-９]+\s*(?:cm|mm|m|km|g|kg|mg|L|mL|秒|分|時間|°|度|%|倍|個|本|枚|人|円|V|A|mA|Ω|W|J|N|Hz|hPa)/u.test(cleaned)) {
    return false;
  }
  if (
    cleaned.length <= 125 &&
    /(?:答えなさい|選びなさい|5問です|4問です|3問です|ステージです|制覇します|チェックしましょう)/u.test(cleaned)
  ) {
    return true;
  }
  return false;
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
  const [figureZoomOpen, setFigureZoomOpen] = useState(false);
  const materialTrack = listeningTracks.find((t) => t.subId === activeStepSub?.id);

  useEffect(() => {
    setFigureZoomOpen(false);
  }, [currentQuestion?.id]);

  useEffect(() => {
    if (!figureZoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFigureZoomOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [figureZoomOpen]);

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

  const hasMaterials = Array.isArray(currentQuestion.materials) && currentQuestion.materials.length > 0;
  const hasVisual = hasMaterials || Boolean(currentQuestion.imageUrl);
  const cleanedLead = cleanQuestionText(currentQuestion.text || '').trim();
  const hideVisualBoilerplateMobile =
    !isDesktop &&
    !isProblemExpanded &&
    hasVisual &&
    allSubsSelfContained &&
    isRedundantVisualLeadOnMobile(cleanedLead, hasMaterials);

  return (
    <div
      data-problem-pane
      className={`
      lg:w-[47%] flex flex-col bg-[#fffdf8] border-b lg:border-b-0 lg:border-r border-[#e4d9c5] transition-all duration-200
      ${listeningMobileSplit && !listeningMobileNoFigure ? 'flex-1 min-h-0' : 'flex-none'}
      ${
        isDesktop
          ? 'h-full'
          : isProblemExpanded
            ? 'absolute inset-0 z-30 h-full shadow-lg bg-[#fffdf8]'
            : isProblemCollapsed
              ? 'h-auto relative z-20'
              : keyboardVisible
                ? 'max-h-[22vh] h-auto relative z-20'
                : listeningMobileNoFigure
                  ? 'h-auto max-h-[40dvh] relative z-20'
                  : listeningMobileSplit
                    ? 'relative z-20'
                    : hasVisual
                      ? 'max-h-[34dvh] h-auto relative z-20'
                      : 'max-h-[36dvh] h-auto relative z-20'
      }
    `}
    >
      {/* 見出しバー（スマホ1画面完結のためスリム30px帯に凝縮） */}
      <div
        className={`flex items-center justify-between px-2.5 py-1 md:px-5 md:py-2.5 border-b border-[#ece2cf] bg-[#faf4e6] ${
          !isDesktop && keyboardVisible ? 'hidden' : ''
        }`}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="inline-flex items-center justify-center rounded-md px-1.5 py-0.5 text-[10.5px] md:text-xs font-extrabold text-white shrink-0"
            style={{ backgroundColor: accent }}
          >
            ステージ {currentQuestionIndex + 1}
          </span>
          <span className="inline-flex items-center gap-1 font-extrabold text-[#3d3222] text-[11.5px] md:text-sm truncate">
            <BookOpen size={13} style={{ color: accent }} className="shrink-0" />
            <span className="truncate">
              {hasMaterials
                ? `資料全${currentQuestion.materials!.length}枚`
                : currentQuestion.imageUrl
                  ? '図・グラフ'
                  : '問題文・資料'}
            </span>
          </span>

          {highlights.length > 0 && (
            <button
              type="button"
              onClick={() => setHighlights([])}
              className="min-h-[26px] text-[10.5px] font-bold text-amber-800 bg-amber-100/80 px-2 rounded-full border border-amber-300 hover:bg-amber-200/70 transition-colors whitespace-nowrap cursor-pointer"
            >
              マーカー消去
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {currentQuestion.imageUrl && !hasMaterials && (
            <button
              type="button"
              onClick={() => setFigureZoomOpen(true)}
              aria-label="図やグラフを大きく拡大して見る"
              className="inline-flex min-h-[28px] md:min-h-[32px] items-center gap-1 rounded-full border border-[#d6c9b1] bg-white px-2 md:px-2.5 text-[11px] font-extrabold text-[#3a2f20] shadow-[0_1px_0_#e6dccb] hover:bg-[#faf6ee] whitespace-nowrap cursor-pointer"
            >
              <ZoomIn size={12} />
              <span>図を拡大</span>
            </button>
          )}

          {!isDesktop && (
            <>
              {!isProblemExpanded && (
                <button
                  type="button"
                  onClick={() => setIsProblemCollapsed(!isProblemCollapsed)}
                  aria-expanded={!isProblemCollapsed}
                  className="inline-flex min-h-[28px] items-center gap-0.5 rounded-full border border-[#dfd4c0] bg-white px-2 text-[11px] font-extrabold text-[#4a3d2b] shadow-[0_1px_0_#e6dccb] whitespace-nowrap cursor-pointer"
                >
                  {isProblemCollapsed ? (
                    <>
                      <span>開く</span>
                      <ChevronDown size={12} />
                    </>
                  ) : (
                    <>
                      <span>たたむ</span>
                      <ChevronUp size={12} />
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
                className="inline-flex min-h-[28px] items-center gap-0.5 rounded-full border border-[#dfd4c0] bg-white px-2 text-[11px] font-extrabold text-[#4a3d2b] shadow-[0_1px_0_#e6dccb] whitespace-nowrap cursor-pointer"
              >
                {isProblemExpanded ? (
                  <>
                    <Minimize2 size={11} />
                    <span>閉じる</span>
                  </>
                ) : (
                  <>
                    <Maximize2 size={11} />
                    <span>全画面</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* 問題本文＆図表スクロール領域 */}
      <div
        ref={problemScrollRef}
        className={`${
          !isDesktop && !isProblemExpanded && isProblemCollapsed ? 'hidden' : ''
        } flex-1 min-h-0 overflow-y-auto md:p-5 text-[14px] leading-[1.62] md:text-[15px] md:leading-[1.82] text-[#1c2a39] break-words [overflow-wrap:anywhere] ${
          listeningMobileSplit ? 'flex flex-col px-2.5 pt-1.5 pb-2' : 'px-2.5 py-1.5 sm:p-4'
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

          {/* ★社会の複数資料カルーセル（第6問B方式・左右矢印＆1行ピル切替）を最上部に表示★ */}
          {!listeningUnified && hasMaterials && (
            <JukenMaterialCarousel
              materials={currentQuestion.materials!}
              accent={accent}
              compact={!isDesktop && !isProblemExpanded}
              className="mb-1.5"
            />
          )}

          {/* ★数学・理科・社会のグラフ・図形・実験図をスマホでもスクロールなしで前面に出す★ */}
          {!listeningUnified && !hasMaterials && currentQuestion.imageUrl && (
            <div
              onClick={() => setFigureZoomOpen(true)}
              title="タップで図を拡大表示します"
              className="mb-1.5 rounded-xl border border-[#e3d8c4] bg-white p-1.5 sm:p-2.5 shadow-2xs cursor-zoom-in"
            >
              <QuestionFigure
                src={currentQuestion.imageUrl}
                caption={
                  isDesktop || isProblemExpanded ? currentQuestion.imageCaption : undefined
                }
                figureNumber={
                  isDesktop || isProblemExpanded
                    ? getFigureNumber(figureNumberMap, currentQuestion.id)
                    : undefined
                }
                tone="light"
                className="mt-0"
                imgClassName={
                  isProblemExpanded
                    ? 'max-h-[58dvh] object-contain'
                    : 'max-h-[18.5dvh] sm:max-h-[26dvh] md:max-h-[42dvh] object-contain'
                }
              />
            </div>
          )}

          {!listeningUnified &&
            !hideVisualBoilerplateMobile &&
            (inlineQuestionRows ? (
              <div className="flex flex-col gap-1">
                {inlineQuestionRows.lead && (
                  <ExplanationBody
                    text={inlineQuestionRows.lead}
                    highlights={combinedHighlights}
                  />
                )}
                <ul className="flex flex-wrap gap-x-2 gap-y-1">
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
              cleanedLead.length > 0 && (
                <div
                  className={
                    hasVisual && !isDesktop && !isProblemExpanded
                      ? 'rounded-lg border border-[#eae0ce] bg-[#faf6ee] px-2.5 py-1.5 text-[12.5px] leading-[1.48]'
                      : 'rounded-xl sm:rounded-2xl border border-[#eae0ce] bg-white p-2.5 sm:p-4 shadow-2xs'
                  }
                >
                  <ExplanationBody
                    text={cleanedLead}
                    highlights={combinedHighlights}
                    boxedSections={!hasVisual || isDesktop || isProblemExpanded}
                  />
                </div>
              )
            ))}

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

      {/* ワンタップ全画面・図版ズームモーダル（座標・目盛り・地図・回路図の細部確認用） */}
      {figureZoomOpen && currentQuestion.imageUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="問題の図の拡大表示"
          onClick={() => setFigureZoomOpen(false)}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-slate-900/85 p-3 sm:p-6 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-2xl"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="truncate text-xs sm:text-sm font-extrabold text-[#1c2a39]">
                ステージ {currentQuestionIndex + 1}：{currentQuestion.imageCaption || currentQuestion.title || '図・グラフ'}
              </span>
              <button
                type="button"
                onClick={() => setFigureZoomOpen(false)}
                aria-label="拡大表示を閉じる"
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-800 px-3 py-1.5 text-xs font-extrabold text-white hover:bg-slate-700 cursor-pointer"
              >
                <X size={14} />
                <span>閉じる</span>
              </button>
            </div>
            <div className="overflow-auto rounded-xl border border-slate-200 bg-white p-2 max-h-[75dvh]">
              <img
                src={currentQuestion.imageUrl}
                alt={currentQuestion.imageCaption || '問題の図'}
                className="mx-auto w-full max-h-[70dvh] object-contain"
              />
            </div>
            {cleanedLead.length > 0 && (
              <p className="mt-2 text-xs sm:text-sm font-bold text-[#2b3948] leading-relaxed">
                {formatText(cleanedLead)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
