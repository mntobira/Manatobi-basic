import React from 'react';
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Circle,
  KeyRound,
  Lightbulb,
  Target,
  XCircle,
} from 'lucide-react';
import { formatText } from '../../utils/textFormatter';
import { answerCardMarker, splitQuestionLabel } from '../../utils/questionDisplay';
import { isScriptFirstExplanation, stripScriptBox } from '../../utils/listeningExplanation';
import { ExplanationBody } from '../ExplanationBody';
import { JukenMaterialCarousel } from '../JukenMaterialCarousel';
import { MathAnnotatedFigureToggle } from '../MathAnnotatedFigureToggle';
import { QuestionFigure } from '../QuestionFigure';
import { isAttempted, pictureCellOf } from './helpers';
import type { AudioTrack, Problem, SubQuestion } from '../../types/curriculum';

const KANA_LABELS = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ'];

export interface SubQuestionCardContext {
  question: Problem;
  answers: Record<string, string>;
  isMobile: boolean;
  isPracticeMode: boolean;
  isEnglishChapter: boolean;
  listeningTracks: AudioTrack[];
  answerBoxBaseClass: string;
  explBodyBaseClass: string;
  explBodyFontClass: string;
  openExplanationBySq: Record<string, boolean>;
  openThinkingBySq: Record<string, boolean>;
  setOpenExplanationBySq: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setOpenThinkingBySq: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  sliceForSq: (sq: SubQuestion) => string;
}

/**
 * 解説本文から冗長な先頭行「【正解】…」と末尾の「【他の選択肢が誤りである理由…】」を切り離す。
 * （正解はすぐ上のカードに表示済み、誤答理由は sq.distractors があれば専用の視覚カードで描画するため）
 */
function cleanExplanationSlice(raw: string, hasStructuredDistractors: boolean): string {
  let cleaned = raw.replace(/^【正解】[^\n]*\n*/m, '').trim();
  if (hasStructuredDistractors) {
    cleaned = cleaned
      .replace(/\n*【他の選択肢が誤りである理由[^\n]*】[\s\S]*$/m, '')
      .trim();
  }
  return cleaned;
}

export function renderSubQuestionCard(ctx: SubQuestionCardContext, sq: SubQuestion, isCorrect: boolean) {
  const {
    question,
    answers,
    isMobile,
    isPracticeMode,
    isEnglishChapter,
    listeningTracks,
    answerBoxBaseClass,
    explBodyBaseClass,
    explBodyFontClass,
    openExplanationBySq,
    openThinkingBySq,
    setOpenExplanationBySq,
    setOpenThinkingBySq,
    sliceForSq,
  } = ctx;

  const attempted = isAttempted(answers[sq.id]);
  const isUnanswered = !attempted;
  const singleFocusMode = (question?.subQuestions || []).length <= 1;
  // 1問ずつ答え合わせするときはスマホでも最初から解説を開き、タップの手間をゼロにする
  const explanationOpen = openExplanationBySq[sq.id] ?? (!isMobile || singleFocusMode);
  const thinkingOpen = openThinkingBySq[sq.id] ?? !isMobile;

  const sqSliceRaw = sliceForSq(sq);
  const isScriptFirst = isScriptFirstExplanation(sqSliceRaw);
  const sqSliceStripped = listeningTracks.length > 0 ? stripScriptBox(sqSliceRaw) : sqSliceRaw;
  const hasDistractorCards = Array.isArray(sq.distractors) && sq.distractors.length > 0;
  const sqSlice = cleanExplanationSlice(sqSliceStripped, hasDistractorCards);

  const sqIndex = (question?.subQuestions || []).indexOf(sq);
  const displayLabel = answerCardMarker(sq, sqIndex < 0 ? 0 : sqIndex, question);
  const { body: sqPromptBody } = splitQuestionLabel(sq.label || '', displayLabel);

  const userOptionIdx = Array.isArray(sq.options)
    ? sq.options.indexOf(String(answers[sq.id] ?? ''))
    : -1;
  const correctOptionIdx = Array.isArray(sq.options)
    ? sq.options.indexOf(String(sq.correctAnswer ?? ''))
    : -1;

  const hasThinking = Boolean(
    sq.detailedExplanation?.theme || sq.detailedExplanation?.steps?.length,
  );

  const thinkingBody = hasThinking ? (
    <div className="border-t border-amber-200/80 bg-[#fffaf0] p-4 md:p-5 space-y-4">
      {sq.detailedExplanation?.theme && (
        <div className="rounded-xl border border-amber-200 bg-white p-3.5 shadow-2xs">
          <h5 className="text-xs font-extrabold mb-1 flex items-center gap-1.5 text-[#9a5700]">
            <Lightbulb size={15} />
            <span>答えの核心（入試で使える1行ルール）</span>
          </h5>
          <p className="font-extrabold text-sm md:text-[15px] leading-relaxed text-[#1c2a39]">
            {formatText(sq.detailedExplanation.theme, [], { prose: isEnglishChapter })}
          </p>
        </div>
      )}

      {!isScriptFirst && isPracticeMode && sq.detailedExplanation?.steps && sq.detailedExplanation.steps.length > 0 && (
        <div>
          <h5 className="text-xs font-extrabold mb-2.5 flex items-center gap-1.5 text-emerald-800">
            <Target size={15} />
            <span>正解までの3ステップ</span>
          </h5>
          <ol className="list-none space-y-2">
            {sq.detailedExplanation.steps.map((step: string, idx: number) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 rounded-xl bg-white/90 border border-[#ebe2d1] px-3 py-2"
              >
                <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm leading-relaxed min-w-0 text-[#262019]">
                  {formatText(step, [], { prose: isEnglishChapter })}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  ) : null;

  return (
    <div
      id={`sq-${sq.id}`}
      key={sq.id}
      className={`rounded-2xl border-2 overflow-hidden bg-white shadow-[0_3px_0_#e6dccb] ${
        isCorrect
          ? 'border-emerald-400'
          : isUnanswered
          ? 'border-[#dfd4c0]'
          : 'border-rose-300'
      }`}
    >
      {/* 上段：正誤バナー ＋ 設問文 ＋ あなたの解答 / 正解（短答・短選択肢はスマホでも左右2列に凝縮） */}
      <div
        className={`p-2.5 md:p-3.5 space-y-2 ${answerBoxBaseClass} ${
          isCorrect
            ? 'bg-emerald-50/80'
            : isUnanswered
            ? 'bg-[#faf6ee]'
            : 'bg-rose-50/75'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="font-extrabold text-xs px-2.5 py-0.5 rounded-lg border text-[#1c2a39] bg-white border-[#dfd4c0] shadow-2xs">
              {formatText(displayLabel)}
            </div>
            {isUnanswered ? (
              <div className="flex items-center gap-1 font-extrabold text-[13px] text-[#6b5d47]">
                <Circle size={15} />
                <span>未回答 — 解き方をつかもう！</span>
              </div>
            ) : (
              <div
                className={`flex items-center gap-1 font-extrabold text-[13px] sm:text-sm ${
                  isCorrect ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                <span>
                  {isCorrect ? '大正解！バッチリ！' : '惜しい！ここで覚えよう！'}
                </span>
              </div>
            )}
          </div>
          {sq.skill && (
            <span className="inline-flex items-center rounded-full bg-white/90 border border-[#dfd4c0] px-2 py-0.5 text-[10.5px] font-extrabold text-[#5a6573]">
              {sq.skill}
            </span>
          )}
        </div>

        {/* 設問文をカード内にも表示（左右を見比べなくても何の問いかすぐ分かる） */}
        {listeningTracks.length === 0 && sqPromptBody.trim().length > 0 && (
          <div className="rounded-xl bg-white/95 border border-[#e6dccb] px-2.5 py-1.5 sm:px-3 sm:py-2 text-[13.5px] sm:text-sm font-bold leading-snug text-[#1c2a39] break-words [overflow-wrap:anywhere]">
            {formatText(sqPromptBody, [], { prose: isEnglishChapter })}
          </div>
        )}

        <div
          className={`grid gap-2 ${
            String(answers[sq.id] || '').length <= 22 && String(sq.correctAnswer || '').length <= 22
              ? 'grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2'
          }`}
        >
          <div>
            <div className="text-[11px] font-extrabold mb-0.5 text-[#5c4f3d]">あなたの解答</div>
            <div
              className={`font-bold text-[13px] sm:text-sm p-2 sm:p-2.5 rounded-xl border break-words whitespace-pre-wrap flex items-start gap-1.5 ${
                isCorrect
                  ? 'bg-white border-emerald-300 text-emerald-800'
                  : isUnanswered
                  ? 'bg-white border-[#e3d9c8] text-gray-400'
                  : 'bg-white border-rose-200 text-rose-700'
              }`}
            >
              {userOptionIdx >= 0 && KANA_LABELS[userOptionIdx] && (
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px] font-extrabold ${
                    isCorrect
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-100 text-rose-700 border border-rose-200'
                  }`}
                >
                  {KANA_LABELS[userOptionIdx]}
                </span>
              )}
              <span className={!isCorrect && !isUnanswered ? 'line-through opacity-85' : ''}>
                {formatText(answers[sq.id] || '未解答', [], { prose: isEnglishChapter })}
              </span>
              {(() => {
                const pic = pictureCellOf(sq, userOptionIdx, sq.options?.length ?? 0);
                return pic ? (
                  <span
                    className="lx-answer-pic"
                    role="img"
                    aria-label="あなたが選んだイラスト"
                    style={pic}
                  />
                ) : null;
              })()}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-extrabold mb-0.5 text-emerald-800">正解</div>
            <div className="font-bold text-[13px] sm:text-sm p-2 sm:p-2.5 rounded-xl border-2 border-emerald-300 bg-white text-emerald-800 break-words flex items-start gap-1.5">
              {correctOptionIdx >= 0 && KANA_LABELS[correctOptionIdx] && (
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-600 text-[11px] font-extrabold text-white">
                  {KANA_LABELS[correctOptionIdx]}
                </span>
              )}
              <span>{formatText(sq.correctAnswer, [], { prose: isEnglishChapter })}</span>
              {(() => {
                const pic = pictureCellOf(sq, correctOptionIdx, sq.options?.length ?? 0);
                return pic ? (
                  <span
                    className="lx-answer-pic"
                    role="img"
                    aria-label="正解のイラスト"
                    style={pic}
                  />
                ) : null;
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* 下段：解説 ＆ ひっかけ選択肢の理由カード ＆ 思考手順 */}
      <div className="border-t border-[#e8dfd0] p-3 space-y-2.5 bg-white">
        <button
          type="button"
          onClick={() =>
            setOpenExplanationBySq((prev) => ({ ...prev, [sq.id]: !explanationOpen }))
          }
          aria-expanded={explanationOpen}
          className="w-full flex items-center justify-between gap-3 rounded-xl border border-[#c7dcf7] bg-[#f2f7fe] px-3.5 py-2.5 text-left font-extrabold text-[#1d4b8f] hover:bg-[#e7f1fd] transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2 text-sm">
            <BookOpen size={16} />
            <span>くわしい解説・ひっかけ選択肢のワケ</span>
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform ${explanationOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {explanationOpen && (
          <div className={`space-y-3 ${explBodyBaseClass}`}>
            {/* ★v6：数学の補助線・面積/体積書き込み解説図（元の問題図とワンタップ切替比較可能）★ */}
            {(sq.explanationImageUrl || question.explanationImageUrl) ? (
              <MathAnnotatedFigureToggle
                explanationImageUrl={(sq.explanationImageUrl || question.explanationImageUrl)!}
                explanationImageCaption={sq.explanationImageCaption || question.explanationImageCaption}
                originalImageUrl={sq.imageUrl || question.imageUrl}
                originalImageCaption={sq.imageCaption || question.imageCaption}
              />
            ) : sq.imageUrl ? (
              <div className="rounded-xl border border-[#e3d8c4] bg-white p-2.5">
                <QuestionFigure
                  src={sq.imageUrl}
                  caption={sq.imageCaption}
                  tone="light"
                  className="mt-0"
                  imgClassName="max-h-[30dvh] object-contain"
                />
              </div>
            ) : null}

            {/* ★v6：小問または大問の複数資料カルーセル（スマホ1問解説でもその場で左右矢印確認）★ */}
            {((Array.isArray(sq.materials) && sq.materials.length > 0) ||
              (isMobile && Array.isArray(question.materials) && question.materials.length > 0)) && (
              <JukenMaterialCarousel
                materials={
                  Array.isArray(sq.materials) && sq.materials.length > 0
                    ? sq.materials
                    : question.materials!
                }
                compact
              />
            )}

            {/* メインの解法解説 */}
            <div className="rounded-xl border border-[#dce8f8] bg-[#f8fbff] p-3.5 md:p-4">
              {sqSlice ? (
                <ExplanationBody
                  text={sqSlice}
                  tone="light"
                  prose={isEnglishChapter}
                  className={`${explBodyFontClass} text-[#1c2a39]`}
                />
              ) : (
                <p className="text-xs text-gray-500">
                  この小問の解説は下の「答えの核心・正解までの3ステップ」にまとめています。
                </p>
              )}
            </div>

            {/* 構造化された「ひっかけ選択肢の理由（消去法の根拠）」カード */}
            {hasDistractorCards && (
              <div className="rounded-xl border border-[#eadfce] bg-[#fcf9f3] p-3.5 space-y-2">
                <div className="text-xs font-extrabold text-[#6b4f2a] flex items-center gap-1.5">
                  <XCircle size={14} className="text-rose-500 shrink-0" />
                  <span>他の選択肢が×になる理由（消去法の根拠）</span>
                </div>
                <ul className="space-y-1.5">
                  {sq.distractors!.map((d) => {
                    const optIdx = d.no - 1;
                    const kana = KANA_LABELS[optIdx] ?? String(d.no);
                    const isUserPickedWrong = !isCorrect && !isUnanswered && userOptionIdx === optIdx;
                    return (
                      <li
                        key={d.no}
                        className={`flex items-start gap-2 rounded-lg border px-2.5 py-2 text-xs sm:text-[13px] leading-relaxed ${
                          isUserPickedWrong
                            ? 'border-rose-300 bg-rose-50/90 text-[#3b1818]'
                            : 'border-[#ebe2d3] bg-white text-[#332b21]'
                        }`}
                      >
                        <span
                          className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px] font-extrabold ${
                            isUserPickedWrong
                              ? 'bg-rose-600 text-white'
                              : 'bg-[#efe8da] text-[#5c4f3d]'
                          }`}
                        >
                          {kana}
                        </span>
                        <div className="min-w-0 flex-1">
                          {isUserPickedWrong && (
                            <span className="mr-1.5 inline-block rounded bg-rose-600 px-1.5 py-0.2 text-[10px] font-extrabold text-white">
                              あなたが選んだ選択肢
                            </span>
                          )}
                          <span>{formatText(d.why, [], { prose: isEnglishChapter })}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setOpenThinkingBySq((prev) => ({ ...prev, [sq.id]: !thinkingOpen }))}
          aria-expanded={thinkingOpen}
          className="w-full flex items-center justify-between gap-3 rounded-xl border border-[#edd5a1] bg-[#fff8e8] px-3.5 py-2.5 text-left font-extrabold text-[#8a4f06] hover:bg-[#fff2d4] transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2 text-sm">
            <KeyRound size={16} />
            <span>答えの核心・正解までの3ステップ</span>
          </span>
          <ChevronDown
            size={18}
            className={`transition-transform ${thinkingOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {thinkingOpen &&
          (thinkingBody || (
            <div className="border-t p-3 text-xs text-gray-500">
              詳しい解説は上の枠にまとめています。
            </div>
          ))}
      </div>

      {sq.partialCreditCriteria && (
        <div className="border-t text-xs p-3 flex items-start gap-2 bg-amber-50 text-amber-800 border-amber-200">
          <AlertCircle className="shrink-0 mt-0.5 w-4 h-4" />
          <span className="leading-relaxed">{formatText(sq.partialCreditCriteria)}</span>
        </div>
      )}
    </div>
  );
}
