import React, { useEffect, useRef } from 'react';
import { Check, CheckCircle2, ChevronLeft, ChevronRight, Edit3, Sparkles } from 'lucide-react';
import type { AnswerGroup } from '../hooks/useQuestionDerived';
import type { Problem, SubQuestion } from '../types/curriculum';
import { formatText } from '../utils/textFormatter';
import { answerCardMarker, cleanQuestionText, splitQuestionLabel } from '../utils/questionDisplay';
import { handleInputFocusScroll } from '../utils/quizInputScroll';
import { hasSubstantialLeadMaterial } from './ProblemPane';
import { QuestionFigure } from './QuestionFigure';
import { JukenMaterialCarousel } from './JukenMaterialCarousel';

const isLongBlankHint = (hint: unknown) => {
  const t = String(hint ?? '');
  const width = [...t].reduce((w, ch) => w + (/[\u0000-\u00ff]/.test(ch) ? 0.55 : 1), 0);
  return width > 14;
};

export interface AnswerPaneProps {
  currentQuestion: Problem;
  isDesktop: boolean;
  answers: Record<string, string | string[]>;
  handleTextChange: (sqId: string, value: string) => void;
  getInputRef: (sqId: string) => (el: HTMLInputElement | HTMLTextAreaElement | null) => void;
  inputRefs: React.MutableRefObject<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>;
  listeningUnified: boolean;
  listeningMobileSplit: boolean;
  listeningMobileNoFigure: boolean;
  listeningMaterialsMobile?: boolean;
  focusedSubId: string | null;
  setFocusedSubId: (v: string | null) => void;
  mobileAnswerSubs: Array<{ sq: SubQuestion; groupName?: string }>;
  safeMobileAnsIdx: number;
  goMobileAns: (dir: -1 | 1) => void;
  setMobileAnsIdx?: (idx: number) => void;
  handleMobileCardKeyDown: (sq: SubQuestion) => (e: React.KeyboardEvent) => void;
  isLastNavSub: (sq: SubQuestion) => boolean;
  renderedAnswerGroups: AnswerGroup[];
  renderMultipleChoiceControl: (sq: SubQuestion) => React.ReactNode;
  renderSortingControl: (sq: SubQuestion) => React.ReactNode;
  questionNeedsMathPalette: boolean;
  isEnglishProse?: boolean;
  combinedHighlights?: string[];
  isProblemExpanded: boolean;
  canGoPrevious: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  accent?: string;
}

function isSubAnswered(val: string | string[] | undefined): boolean {
  if (Array.isArray(val)) return val.some((x) => String(x ?? '').trim().length > 0);
  return String(val ?? '').trim().length > 0;
}

export function AnswerPane({
  currentQuestion,
  isDesktop,
  answers,
  handleTextChange,
  inputRefs,
  listeningUnified,
  listeningMobileSplit,
  listeningMobileNoFigure,
  listeningMaterialsMobile = false,
  focusedSubId,
  setFocusedSubId,
  mobileAnswerSubs,
  safeMobileAnsIdx,
  goMobileAns,
  setMobileAnsIdx,
  handleMobileCardKeyDown,
  isLastNavSub,
  renderedAnswerGroups,
  renderMultipleChoiceControl,
  renderSortingControl,
  questionNeedsMathPalette,
  isEnglishProse = false,
  combinedHighlights = [],
  isProblemExpanded,
  canGoPrevious,
  handlePrevious,
  handleNext,
  accent = '#2458A6',
}: AnswerPaneProps) {
  const answerScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listeningMaterialsMobile && answerScrollRef.current) {
      answerScrollRef.current.scrollTop = 0;
    }
  }, [listeningMaterialsMobile, safeMobileAnsIdx, currentQuestion.id]);

  // 小問が切り替わったらスマホの解答スクロール位置を先頭へ戻す
  useEffect(() => {
    if (!isDesktop && answerScrollRef.current) {
      answerScrollRef.current.scrollTop = 0;
    }
  }, [isDesktop, safeMobileAnsIdx, currentQuestion.id]);

  const hasSeparateLeadPane = hasSubstantialLeadMaterial(currentQuestion, listeningUnified);
  const shortIntroText = !hasSeparateLeadPane
    ? cleanQuestionText(currentQuestion.text || '').trim()
    : '';

  const allSubs = currentQuestion.subQuestions || [];
  const answeredCount = allSubs.filter((sq) => isSubAnswered(answers[sq.id])).length;
  const allAnswered = allSubs.length > 0 && answeredCount === allSubs.length;

  // いま画面に出ている設問（1問ずつモードでは1問、一括モードでは全小問）の回答状況
  const visibleSubs = renderedAnswerGroups.flatMap((g) => g.items);
  const visibleAnsweredCount = visibleSubs.filter((sq) => isSubAnswered(answers[sq.id])).length;
  const visibleAllAnswered = visibleSubs.length > 0 && visibleAnsweredCount === visibleSubs.length;

  return (
    <div
      ref={answerScrollRef}
      data-listening-answer-pane={listeningMaterialsMobile || undefined}
      className={`${
        hasSeparateLeadPane ? 'lg:w-[54%]' : 'w-full'
      } min-h-0 overflow-y-auto bg-[#fcf5e9] ${
        listeningMobileSplit ? 'px-2.5' : 'px-3.5 sm:px-5'
      } md:px-7 md:py-6 ${
        listeningMaterialsMobile
          ? 'flex-[0_1_auto] max-h-[58%] pt-0 overscroll-contain'
          : listeningMobileNoFigure
            ? 'flex-1 flex flex-col justify-end pt-2'
            : listeningMobileSplit
              ? 'flex-none pt-2'
              : 'flex-1 pt-3'
      } ${
        listeningMaterialsMobile
          ? 'pb-2'
          : isDesktop
            ? 'pb-10'
            : listeningMobileSplit
              ? 'pb-[calc(4.75rem+env(safe-area-inset-bottom))]'
              : 'pb-[calc(6.5rem+env(safe-area-inset-bottom))]'
      } relative ${
        !isDesktop && isProblemExpanded
          ? 'hidden'
          : listeningMobileNoFigure
            ? 'z-10'
            : 'block z-10'
      }`}
    >
      <div
        className={`${
          hasSeparateLeadPane ? 'max-w-2xl' : 'max-w-3xl'
        } mx-auto ${listeningMobileSplit ? 'space-y-2.5' : 'space-y-3.5 md:space-y-5'} ${
          listeningMobileNoFigure ? 'flex min-h-0 flex-1 flex-col' : ''
        }`}
      >
        {/* 1文イントロ問題（図表・長文なし）のテーマバナー */}
        {shortIntroText && !listeningUnified && (
          <div
            className="flex items-start gap-2.5 rounded-2xl border px-3.5 py-2.5 text-xs md:text-sm font-bold leading-relaxed text-[#3d3222] bg-[#fffdf7]"
            style={{
              borderColor: `color-mix(in srgb, ${accent} 28%, #e3d8c4)`,
            }}
          >
            <Sparkles
              size={16}
              style={{ color: accent }}
              className="shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1">{formatText(shortIntroText)}</span>
          </div>
        )}

        {/* 小問ステップピルバー（(1)(2)(3)... タップで直接切り替え・回答状況が一目瞭然） */}
        {!listeningUnified && allSubs.length > 1 && (
          <div className="sticky top-0 z-20 -mx-1 px-1 py-1.5 bg-[#fcf5e9]/95 backdrop-blur-xs">
            <div className="flex items-center justify-between gap-2 mb-1.5 px-1">
              <span className="text-xs font-extrabold text-[#4a3d2b]">
                {isDesktop
                  ? '上から順に解いていこう！'
                  : `小問をタップで切り替え（いま ${safeMobileAnsIdx + 1} / ${mobileAnswerSubs.length} 問目）`}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11.5px] font-extrabold tabular-nums ${
                  allAnswered
                    ? 'bg-[#e3f3ea] text-[#1f7a4d]'
                    : 'bg-[#fffdf6] border border-[#e3d8c4] text-[#5a6573]'
                }`}
              >
                {allAnswered && <CheckCircle2 size={13} />}
                <span>
                  回答ずみ {answeredCount} / {allSubs.length}
                </span>
              </span>
            </div>

            <div className="juken-step-bar" role="tablist" aria-label="小問の切り替え">
              {allSubs.map((sq, idx) => {
                const marker = answerCardMarker(sq, idx, currentQuestion);
                const answered = isSubAnswered(answers[sq.id]);
                const active = !isDesktop && safeMobileAnsIdx === idx;
                return (
                  <button
                    key={sq.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    data-active={active || undefined}
                    data-answered={answered || undefined}
                    onClick={() => {
                      if (!isDesktop && setMobileAnsIdx) {
                        setMobileAnsIdx(idx);
                      } else {
                        document
                          .getElementById(`ans-sq-card-${sq.id}`)
                          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="juken-step-pill"
                  >
                    {answered && <Check size={13} className="stroke-[3]" aria-hidden="true" />}
                    <span>{formatText(marker)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* リスニング資料つきモバイル用ナビ */}
        {listeningMaterialsMobile && (
          <nav
            aria-label="小問の切り替え"
            className="sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-[#e3d8c4] bg-[#fcf5e9] py-1"
          >
            <span className="flex min-w-0 items-baseline gap-1.5 text-xs font-bold text-[#3d3222]">
              {(() => {
                const cur = mobileAnswerSubs[safeMobileAnsIdx]?.sq;
                const idx = cur ? (currentQuestion?.subQuestions || []).indexOf(cur) : -1;
                const marker = cur
                  ? answerCardMarker(cur, idx < 0 ? safeMobileAnsIdx : idx, currentQuestion)
                  : '';
                return (
                  <>
                    {marker && (
                      <span
                        className="shrink-0 rounded-md px-2 py-0.5 text-[12px] text-white"
                        style={{ backgroundColor: accent }}
                      >
                        {formatText(marker)}
                      </span>
                    )}
                    {cur?.blankHint && !isLongBlankHint(cur.blankHint) && (
                      <span className="min-w-0 truncate text-[12px] text-[#1c2a39] font-modern">
                        {formatText(String(cur.blankHint), [], { prose: true })}
                      </span>
                    )}
                    <span className="shrink-0 tabular-nums text-[#5a6573]">
                      {safeMobileAnsIdx + 1}/{mobileAnswerSubs.length}
                    </span>
                  </>
                );
              })()}
            </span>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                aria-label="前の解答欄へ"
                disabled={safeMobileAnsIdx === 0}
                onClick={() => goMobileAns(-1)}
                className="min-h-10 min-w-10 rounded-lg border border-[#dfd4c0] bg-white px-2.5 text-xs font-extrabold disabled:opacity-35"
              >
                前の小問
              </button>
              <button
                type="button"
                aria-label="次の解答欄へ"
                disabled={safeMobileAnsIdx >= mobileAnswerSubs.length - 1}
                onClick={() => goMobileAns(1)}
                className="min-h-10 min-w-10 rounded-lg border border-[#dfd4c0] bg-white px-2.5 text-xs font-extrabold disabled:opacity-35"
              >
                次の小問
              </button>
            </div>
          </nav>
        )}

        {listeningMaterialsMobile &&
          (() => {
            const hint = mobileAnswerSubs[safeMobileAnsIdx]?.sq?.blankHint;
            if (!hint || !isLongBlankHint(hint)) return null;
            return (
              <p
                data-answer-prompt
                className="mb-1 mt-1 px-0.5 text-sm font-bold leading-snug text-[#1c2a39] font-modern"
              >
                {formatText(String(hint), [], { prose: true })}
              </p>
            );
          })()}

        {/* 設問カード群（設問本文＋選択肢が1枚のカードに収まり視線移動ゼロ） */}
        <div className={isDesktop ? 'space-y-4' : 'space-y-3'}>
          {renderedAnswerGroups.map((g: AnswerGroup, gIdx: number) => {
            if (g.type === 'group') {
              return (
                <div
                  key={`group-${gIdx}`}
                  className="juken-sq-card flex flex-col gap-4"
                >
                  <span className="font-extrabold text-[#1c2a39] text-sm text-left bg-[#faf4e6] border border-[#e5dac6] py-2.5 px-4 rounded-xl leading-relaxed w-full block">
                    {formatText(g.groupName)}
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 gap-2.5 sm:gap-3 w-full">
                    {g.items.map((sq: SubQuestion) => {
                      const isFocusedBlank = focusedSubId === sq.id;
                      return (
                        <div
                          key={sq.id}
                          className={`flex flex-col gap-1.5 min-w-[50px] p-2.5 sm:p-2 border rounded-xl transition-colors ${
                            isFocusedBlank
                              ? 'bg-[#eaf2fc] border-[#2458a6] ring-2 ring-[#2458a6]/25'
                              : 'bg-[#faf7f0] border-[#e3d8c4]'
                          }`}
                        >
                          <span className="font-extrabold text-[#5a6573] text-[13px] sm:text-xs text-center border-b border-[#e5dac6] pb-1.5 sm:pb-1 select-none">
                            {sq.label}
                          </span>
                          {isDesktop ? (
                            <input
                              type="text"
                              value={(answers[sq.id] as string) || ''}
                              onChange={(e) => handleTextChange(sq.id, e.target.value)}
                              onFocus={(e) => {
                                setFocusedSubId(sq.id);
                                handleInputFocusScroll(e);
                              }}
                              placeholder="..."
                              className="w-full py-1 text-center text-sm font-bold text-[#1c2a39] border-none outline-none focus:ring-0 leading-none bg-transparent"
                            />
                          ) : (
                            <input
                              ref={(el) => {
                                inputRefs.current[sq.id] = el;
                              }}
                              id={`ans-card-${sq.id}`}
                              type="text"
                              value={(answers[sq.id] as string) || ''}
                              onChange={(e) => handleTextChange(sq.id, e.target.value)}
                              onFocus={(e) => {
                                setFocusedSubId(sq.id);
                                handleInputFocusScroll(e);
                              }}
                              onKeyDown={handleMobileCardKeyDown(sq)}
                              enterKeyHint={isLastNavSub(sq) ? 'done' : 'next'}
                              placeholder="解答"
                              aria-label={`${sq.label} の解答を入力`}
                              className={`w-full min-h-[3rem] px-2 py-1.5 text-center text-[16px] font-bold text-[#1c2a39] leading-snug rounded-lg border outline-none transition-colors ${
                                isFocusedBlank
                                  ? 'bg-white border-[#2458a6] ring-2 ring-[#2458a6]/25'
                                  : 'bg-white border-[#dfd4c0]'
                              }`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const sq = g.items[0];
            const sqAllIndex = (currentQuestion?.subQuestions || []).indexOf(sq);
            const sqMarker = answerCardMarker(
              sq,
              sqAllIndex < 0 ? gIdx : sqAllIndex,
              currentQuestion,
            );
            const { body: sqPromptBody } = splitQuestionLabel(
              sq.label || '',
              sqMarker,
            );
            const answered = isSubAnswered(answers[sq.id]);

            return (
              <section
                id={`ans-sq-card-${sq.id}`}
                key={sq.id}
                data-answered={answered || undefined}
                className={`juken-sq-card flex flex-col gap-3.5 ${
                  listeningMaterialsMobile
                    ? 'p-2.5'
                    : listeningMobileNoFigure
                      ? 'min-h-0 flex-1 max-h-full px-3 py-3'
                      : listeningMobileSplit
                        ? 'px-3 py-3.5'
                        : 'p-4 sm:p-5'
                }`}
              >
                {/* カード見出し：問番号バッジ ＋ 回答ステータス */}
                {!listeningUnified && (
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="inline-flex items-center justify-center rounded-xl px-3 py-1 text-xs md:text-sm font-extrabold text-white shadow-2xs"
                      style={{
                        backgroundColor: accent,
                        fontFamily: 'var(--mt-font-display)',
                      }}
                    >
                      {formatText(sqMarker)}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11.5px] font-extrabold ${
                        answered
                          ? 'bg-[#e3f3ea] text-[#1f7a4d]'
                          : 'bg-[#f6efe2] text-[#7a6a4c]'
                      }`}
                    >
                      {answered ? (
                        <>
                          <Check size={12} className="stroke-[3]" />
                          <span>選択ずみ</span>
                        </>
                      ) : sq.type === 'multiple_choice' ? (
                        <span>ア〜エから1つ選ぼう</span>
                      ) : (
                        <span>答えを入力しよう</span>
                      )}
                    </span>
                  </div>
                )}

                {/* 設問本文をカード内に直接表示（左右や上下の別枠を探し回るストレスをゼロにする） */}
                {!listeningUnified && sqPromptBody.trim().length > 0 && (
                  <div
                    className={`rounded-xl bg-[#faf6ee] border border-[#ede3d1] px-3 py-2.5 text-[15px] md:text-[16px] font-bold leading-[1.68] text-[#1c2a39] break-words [overflow-wrap:anywhere] ${
                      questionNeedsMathPalette ? 'font-math math-content' : 'font-modern'
                    }`}
                  >
                    {formatText(sqPromptBody, combinedHighlights, {
                      prose: isEnglishProse,
                    })}
                  </div>
                )}

                {/* ★v6：小問固有の複数資料カルーセル（社会など）またはグラフ・図形（数学など）を前面表示★ */}
                {!listeningUnified && Array.isArray(sq.materials) && sq.materials.length > 0 && (
                  <JukenMaterialCarousel
                    materials={sq.materials}
                    accent={accent}
                    compact={!isDesktop}
                  />
                )}
                {!listeningUnified &&
                  (!sq.materials || sq.materials.length === 0) &&
                  sq.imageUrl && (
                    <div className="rounded-xl border border-[#e3d8c4] bg-white p-2 shadow-2xs">
                      <QuestionFigure
                        src={sq.imageUrl}
                        caption={sq.imageCaption}
                        tone="light"
                        className="mt-0"
                        imgClassName="max-h-[26dvh] md:max-h-[38dvh] object-contain"
                      />
                    </div>
                  )}

                {/* リスニング複数欄見出し */}
                {listeningUnified &&
                  !listeningMaterialsMobile &&
                  (renderedAnswerGroups.length > 1 || mobileAnswerSubs.length > 1) && (
                    <span className="flex items-baseline gap-2 text-[13px] font-bold text-[#1c2a39]">
                      <span
                        className="shrink-0 rounded-md px-2 py-0.5 text-[12px] text-white"
                        style={{ backgroundColor: accent }}
                      >
                        {formatText(sqMarker)}
                      </span>
                      {sq.blankHint && (
                        <span className="min-w-0 text-[#4f5d6b] font-modern break-words [overflow-wrap:anywhere]">
                          {formatText(String(sq.blankHint), [], { prose: true })}
                        </span>
                      )}
                    </span>
                  )}

                {/* 解答コントロール（4択 / 並べ替え / 記述 / 短答） */}
                <div
                  className={`flex flex-col w-full min-w-0 ${
                    listeningMobileNoFigure ? 'min-h-0 flex-1' : ''
                  }`}
                >
                  {sq.type === 'multiple_choice' ? (
                    renderMultipleChoiceControl(sq)
                  ) : sq.type === 'sorting' ? (
                    renderSortingControl(sq)
                  ) : sq.type === 'descriptive' ? (
                    <div className="flex-grow flex flex-col gap-2 w-full">
                      <div className="relative w-full">
                        <Edit3 className="absolute left-3.5 top-3.5 text-[#8c7e68]" size={16} />
                        <textarea
                          ref={(el) => {
                            inputRefs.current[sq.id] = el;
                          }}
                          id={!isDesktop ? `ans-card-${sq.id}` : undefined}
                          value={(answers[sq.id] as string) || ''}
                          onChange={(e) => handleTextChange(sq.id, e.target.value)}
                          onFocus={(e) => {
                            setFocusedSubId(sq.id);
                            handleInputFocusScroll(e);
                          }}
                          placeholder="ここに答えを書こう（改行OK）"
                          rows={3}
                          className="w-full pl-10 pr-4 py-3 text-[16px] md:text-[15px] rounded-xl border-2 border-[#dfd4c0] focus:ring-2 focus:ring-[#2458a6]/25 focus:border-[#2458a6] outline-none transition-all font-modern resize-none bg-[#fffdf9] focus:bg-white leading-relaxed"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-grow flex flex-col gap-2 w-full">
                      <div className="relative w-full">
                        <Edit3
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7e68]"
                          size={16}
                        />
                        <input
                          ref={(el) => {
                            inputRefs.current[sq.id] = el;
                          }}
                          id={!isDesktop ? `ans-card-${sq.id}` : undefined}
                          type="text"
                          value={(answers[sq.id] as string) || ''}
                          onChange={(e) => handleTextChange(sq.id, e.target.value)}
                          onFocus={(e) => {
                            setFocusedSubId(sq.id);
                            handleInputFocusScroll(e);
                          }}
                          onKeyDown={!isDesktop ? handleMobileCardKeyDown(sq) : undefined}
                          enterKeyHint={!isDesktop ? (isLastNavSub(sq) ? 'done' : 'next') : undefined}
                          placeholder="ここに答えを入力しよう"
                          className="w-full pl-10 pr-4 py-3 min-h-[3.25rem] text-[16px] md:text-[15px] rounded-xl border-2 border-[#dfd4c0] focus:ring-2 focus:ring-[#2458a6]/25 focus:border-[#2458a6] outline-none transition-all font-modern bg-[#fffdf9] focus:bg-white leading-relaxed"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        {/* PC版・下部アクションバー */}
        {isDesktop && (
          <div className="pt-4 border-t border-[#e3d8c4] flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              title="前のセットへ（←キー）"
              aria-label="前のセットへ"
              className={`inline-flex min-h-[48px] items-center justify-center gap-1.5 px-4 rounded-2xl font-extrabold text-sm transition-all border-2 shrink-0 cursor-pointer ${
                !canGoPrevious
                  ? 'border-[#e6dfd2] text-[#b8afa0] cursor-not-allowed bg-[#f7f2e8]'
                  : 'border-[#dfd4c0] text-[#3d3222] hover:bg-white bg-[#fffdf7] shadow-[0_2px_0_#e6dccb]'
              }`}
            >
              <ChevronLeft size={18} className="stroke-[2.5]" aria-hidden="true" />
              <span>前の大問</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold text-[#6b5d47] hidden sm:inline">
                {visibleAllAnswered
                  ? '選択バッチリ！採点しよう'
                  : visibleSubs.length > 1
                    ? `${visibleAnsweredCount}/${visibleSubs.length} 問回答中`
                    : '選択肢を選んで採点しよう'}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 px-7 min-h-[52px] rounded-2xl font-extrabold text-base transition-all cursor-pointer active:translate-y-0.5"
                style={{
                  fontFamily: 'var(--mt-font-display)',
                  backgroundColor: visibleAllAnswered ? '#f29a1f' : accent,
                  color: visibleAllAnswered ? '#23180a' : '#ffffff',
                  border: visibleAllAnswered
                    ? '2px solid #c47406'
                    : `2px solid color-mix(in srgb, ${accent} 78%, #000 22%)`,
                  boxShadow: visibleAllAnswered
                    ? '0 4px 0 #a86204, 0 8px 18px rgba(242,154,31,0.24)'
                    : `0 4px 0 color-mix(in srgb, ${accent} 68%, #000 26%)`,
                }}
              >
                <CheckCircle2 size={19} aria-hidden="true" />
                <span>答え合わせ・解説を見る！</span>
                <ChevronRight size={18} className="stroke-[2.75]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
