import React from 'react';
import { Check, RotateCcw, X } from 'lucide-react';
import type { SubQuestion } from '../types/curriculum';
import { formatText } from '../utils/textFormatter';
import { optionCircledMark } from '../utils/questionDisplay';
import { readInstantGradePref } from '../utils/quizStepState';
import './quiz-compact.css';

const KATAKANA_LABELS = ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク'];

/**
 * LaTeX コマンド（\text{...}, \sqrt{...}, \pi 等）を視覚上の文字幅に換算し、
 * スマホでも 2×2 グリッドに美しく収まる短い選択肢かを正確に判定する。
 */
function estimateOptionVisualWidth(raw: string): number {
  const s = String(raw || '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\\text\{([^}]*)\}/g, '$1')
    .replace(/\\sqrt\{([^}]*)\}/g, '√$1')
    .replace(
      /\\(?:pi|theta|alpha|beta|triangle|angle|pm|times|div|le|ge|neq|equiv|sim|parallel|perp|circ)/g,
      'X',
    )
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[$^{}_]/g, '')
    .trim();
  let width = 0;
  for (const ch of s) {
    width += ch.charCodeAt(0) <= 0x7f ? 0.56 : 1.0;
  }
  return width;
}

export interface MultipleChoiceControlProps {
  sq: SubQuestion;
  answers: Record<string, string>;
  onSelect: (sqId: string, option: string) => void;
  onInstantSubmit?: (sqId: string, option: string) => void;
  eliminated: Record<string, string[]>;
  isEliminated: (sqId: string, opt: string) => void | boolean;
  restoreOption: (sqId: string, opt: string) => void;
  strikeOptionAnimated: (sqId: string, opt: string) => void;
  beginLongPress: (sqId: string) => void;
  endLongPress: () => void;
  elimHintOpen: boolean;
  setElimHintOpen: (v: boolean) => void;
  dismissElimHint: () => void;
  listeningOptionTexts: Map<string, string[]>;
  isEnglishProse: boolean;
  justStruck: string | null;
  longPressFired: React.MutableRefObject<boolean>;
  listeningMobileNoFigure: boolean;
  listeningMobileWithFigure?: boolean;
  listeningMaterialsMobile?: boolean;
}

export function MultipleChoiceControl({
  sq,
  answers,
  onSelect,
  onInstantSubmit,
  eliminated,
  isEliminated,
  restoreOption,
  strikeOptionAnimated,
  beginLongPress,
  endLongPress,
  listeningOptionTexts,
  isEnglishProse,
  justStruck,
  longPressFired,
  listeningMobileWithFigure = false,
  listeningMaterialsMobile = false,
}: MultipleChoiceControlProps) {
  const handleOptionSelect = onSelect;
  const triggerSelect = (sqId: string, nextVal: string) => {
    handleOptionSelect(sqId, nextVal);
    if (nextVal && !isMultiple && onInstantSubmit && readInstantGradePref()) {
      onInstantSubmit(sqId, nextVal);
    }
  };

  const optionSet = new Set(sq.options.map((o: string) => o.trim()));
  const detectMulti = (sep: string) => {
    if (!sq.correctAnswer || !sq.correctAnswer.includes(sep)) return false;
    const toks = sq.correctAnswer
      .split(sep)
      .map((t: string) => t.trim())
      .filter(Boolean);
    return toks.length >= 2 && toks.every((t: string) => optionSet.has(t));
  };
  const multiSep = detectMulti('・')
    ? '・'
    : detectMulti('、')
      ? '、'
      : detectMulti(',')
        ? ','
        : null;
  const isMultiple = multiSep !== null;

  const graphMarksOnly = listeningMaterialsMobile && Array.isArray(sq.optionImages);
  const optionTexts: string[] | undefined = graphMarksOnly
    ? undefined
    : listeningOptionTexts.get(sq.id);
  const optionImages: string[] | undefined =
    !graphMarksOnly &&
    Array.isArray(sq.optionImages) &&
    sq.optionImages.length === sq.options.length
      ? sq.optionImages
      : undefined;

  const hasStackedFraction = sq.options.some(
    (opt) => opt.includes('\\dfrac') || opt.includes('\\frac'),
  );
  const maxVisualWidth =
    !optionImages && !optionTexts && sq.options.length === 4
      ? Math.max(...sq.options.map(estimateOptionVisualWidth))
      : 999;

  // 視覚幅 7.8 以下（和文7〜8文字・英数式13文字程度まで）ならスマホでも 2×2 グリッドで1画面に凝縮！
  const mobileCompact2Col = !hasStackedFraction && maxVisualWidth <= 7.8;
  // 視覚幅 16.5 以下ならタブレット・PC（sm以上）で 2×2 グリッド表示
  const allVeryShort = !hasStackedFraction && maxVisualWidth <= 16.5;

  const marksOnlyCompact =
    !optionImages &&
    !optionTexts &&
    sq.options.every((opt) => /^[①-⑥ア-カ]$/u.test(opt.trim()));

  return (
    <div
      data-listening-compact-options={listeningMaterialsMobile || undefined}
      data-mc-grid={mobileCompact2Col ? '2x2' : allVeryShort ? 'sm-2x2' : '1col'}
      className="flex w-full flex-col gap-1.5"
    >
      {isMultiple && (
        <p className="text-[11px] font-extrabold text-[#2458a6] bg-[#eaf2fc] border border-[#c3d9f7] rounded-lg px-2 py-0.5 w-fit">
          ※ あてはまるものをすべて選ぼう
        </p>
      )}

      <div
        className={
          optionImages
            ? 'grid grid-cols-2 gap-2 w-full'
            : marksOnlyCompact
              ? `grid gap-1.5 w-full ${listeningMobileWithFigure ? 'grid-cols-4' : 'grid-cols-2 sm:grid-cols-4'}`
              : mobileCompact2Col
                ? 'grid grid-cols-2 gap-1.5 sm:gap-2 w-full'
                : allVeryShort
                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 w-full'
                  : 'grid grid-cols-1 gap-1.5 sm:gap-2 w-full'
        }
      >
        {sq.options.map((opt: string, optIdx: number) => {
          const isSelected = isMultiple
            ? (answers[sq.id] || '')
                .split(multiSep as string)
                .map((s) => s.trim())
                .includes(opt.trim())
            : (answers[sq.id] || '') === opt;
          const struck = Boolean(isEliminated(sq.id, opt));
          const strikeAnimating = struck && justStruck === `${sq.id}\u0000${opt}`;
          const body = optionTexts?.[optIdx];
          const rawCircled = body ? '' : optionCircledMark(opt, optIdx);
          // 公立高校入試になじむ「ア・イ・ウ・エ」または既存の丸数字バッジ
          const badgeLabel = body
            ? opt
            : rawCircled
              ? KATAKANA_LABELS[optIdx] || rawCircled
              : '';

          // 図が選択肢そのものの場合
          if (optionImages) {
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={isSelected}
                aria-disabled={struck}
                onClick={() => {
                  if (struck) {
                    restoreOption(sq.id, opt);
                    return;
                  }
                  triggerSelect(sq.id, isSelected ? '' : opt);
                }}
                className={`relative flex flex-col items-stretch gap-1 rounded-xl border-2 p-1.5 shadow-xs cursor-pointer transition-all ${
                  struck
                    ? 'bg-[#f4f1ea] border-[#d5cec2] border-dashed opacity-60'
                    : isSelected
                      ? 'bg-[#eef5ff] border-[var(--quiz-accent,#2458a6)] ring-2 ring-[var(--quiz-accent,#2458a6)]/20'
                      : 'bg-white border-[#e3d8c4] hover:border-[var(--quiz-accent,#2458a6)]/60'
                }`}
              >
                <span className="flex items-center justify-between">
                  <span
                    className={`rounded-lg px-2 py-0.5 text-xs font-extrabold ${
                      isSelected
                        ? 'bg-[var(--quiz-accent,#2458a6)] text-white'
                        : 'bg-[#f5efe2] text-[#3d3222]'
                    }`}
                  >
                    {opt}
                  </span>
                  {isSelected && <Check size={16} className="text-[var(--quiz-accent,#2458a6)] stroke-[3]" />}
                </span>
                <img
                  src={optionImages[optIdx]}
                  alt={body ? `${opt} ${body}` : `選択肢${opt}の図`}
                  loading="lazy"
                  className={`w-full rounded-lg bg-white object-contain ${struck ? 'grayscale' : ''}`}
                />
              </button>
            );
          }

          // マークのみ（リスニングの①②③④横並び等）
          if (marksOnlyCompact && !body) {
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={isSelected}
                data-selected={isSelected || undefined}
                data-struck={struck || undefined}
                onClick={() => {
                  if (struck) {
                    restoreOption(sq.id, opt);
                    return;
                  }
                  triggerSelect(sq.id, isSelected ? '' : opt);
                }}
                className="juken-choice-btn justify-center text-center"
              >
                <span className="text-base font-extrabold">{formatText(opt)}</span>
                {isSelected && <Check size={16} className="stroke-[3]" style={{ color: 'var(--quiz-accent, #2458a6)' }} />}
              </button>
            );
          }

          // 標準の中学生向け4択カード（左＝解答ボタン、右＝独立した「消去メモ×」ボタンで絶対に文字と重ならない）
          return (
            <div
              key={opt}
              className={`juken-choice-row ${mobileCompact2Col ? 'juken-choice-row--compact2' : ''}`}
            >
              <button
                type="button"
                aria-pressed={isSelected}
                aria-disabled={struck}
                data-selected={isSelected || undefined}
                data-struck={struck || undefined}
                aria-label={`${badgeLabel ? `${badgeLabel} ` : ''}${body || opt}／${
                  struck ? '消去メモ中（タップで選べます）' : isSelected ? '選択中' : '未選択'
                }`}
                onPointerDown={() => beginLongPress(sq.id)}
                onPointerUp={endLongPress}
                onPointerLeave={endLongPress}
                onPointerCancel={endLongPress}
                onContextMenu={(e) => {
                  if (longPressFired.current) e.preventDefault();
                }}
                onClick={() => {
                  if (longPressFired.current) {
                    longPressFired.current = false;
                    return;
                  }
                  if (struck) {
                    restoreOption(sq.id, opt);
                  }
                  if (isMultiple) {
                    const separator = multiSep as string;
                    const current = (answers[sq.id] || '')
                      .split(separator)
                      .map((s) => s.trim())
                      .filter(Boolean);
                    const nextUnordered = isSelected
                      ? current.filter((a) => a !== opt)
                      : [...current, opt];
                    const ordered = sq.options.filter((o: string) => nextUnordered.includes(o));
                    handleOptionSelect(sq.id, ordered.join(separator));
                    return;
                  }
                  triggerSelect(sq.id, isSelected ? '' : opt);
                }}
                className={`juken-choice-btn ${strikeAnimating ? 'animate-strike-out' : ''}`}
              >
                {badgeLabel && (
                  <span className="juken-choice-mark" aria-hidden="true">
                    {isSelected ? <Check size={14} className="stroke-[3]" /> : badgeLabel}
                  </span>
                )}

                <span
                  className={`min-w-0 flex-1 text-left leading-[1.36] sm:leading-[1.45] break-words [overflow-wrap:anywhere] ${
                    struck ? 'line-through decoration-2 decoration-[#d97b6c]' : ''
                  }`}
                >
                  {body
                    ? formatText(body, [], { prose: isEnglishProse })
                    : formatText(opt, [], { prose: isEnglishProse })}
                </span>

                {isSelected && !mobileCompact2Col && (
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-extrabold text-white hidden sm:inline-block"
                    style={{ backgroundColor: 'var(--quiz-accent, #2458a6)' }}
                  >
                    選択中
                  </span>
                )}
              </button>

              {/* 右端の消去法メモボタン（本文と完全に別列なので絶対に重ならない） */}
              {!isMultiple && (
                <button
                  type="button"
                  data-struck={struck || undefined}
                  aria-label={struck ? `${badgeLabel || opt} の消去メモを戻す` : `${badgeLabel || opt} を候補から消去メモする`}
                  title={struck ? '候補に戻す' : '「これは違う」と消去メモする'}
                  onClick={() => {
                    if (struck) {
                      restoreOption(sq.id, opt);
                    } else {
                      if (isSelected) handleOptionSelect(sq.id, '');
                      strikeOptionAnimated(sq.id, opt);
                    }
                  }}
                  className="juken-elim-btn"
                >
                  {struck ? (
                    <>
                      <RotateCcw size={12} aria-hidden="true" />
                      {!mobileCompact2Col && <span className="mt-0.5 hidden sm:inline">戻す</span>}
                    </>
                  ) : (
                    <>
                      <X size={13} aria-hidden="true" />
                      {!mobileCompact2Col && <span className="mt-0.5 hidden sm:inline">消去</span>}
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {(eliminated[sq.id] || []).length > 0 && (
        <p className="text-[11.5px] font-bold text-[#7a6a4c] pl-1" aria-live="polite">
          💡 消去法メモ：{(eliminated[sq.id] || []).length}個の選択肢を除外中（「戻す」で復活できます）
        </p>
      )}
    </div>
  );
}
