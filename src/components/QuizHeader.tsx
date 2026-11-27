import { useState } from 'react';
import { ArrowLeft, Flame, Lightbulb, X, Zap } from 'lucide-react';
import { DoorMascot } from './DoorMascot';
import type { SubjectKey } from '../data/allChapters';
import { readInstantGradePref, writeInstantGradePref } from '../utils/quizStepState';

export interface QuizHeaderProps {
  chapterAbstractTitle: string;
  mode: string;
  isDesktop: boolean;
  keyboardVisible: boolean;
  handleExit: () => void;
  run: { score: number; combo: number };
  progressPosition: number;
  progressPositionEnd?: number;
  progressTotal: number;
  topics?: string[];
  subject?: SubjectKey;
  subjectLabel?: string;
  accent?: string;
}

export function QuizHeader({
  chapterAbstractTitle,
  mode,
  isDesktop,
  keyboardVisible,
  handleExit,
  run,
  progressPosition,
  progressPositionEnd,
  progressTotal,
  topics = [],
  subject,
  subjectLabel,
  accent = '#2458A6',
}: QuizHeaderProps) {
  const [pointsOpen, setPointsOpen] = useState(false);
  const [instantGrade, setInstantGrade] = useState<boolean>(() => readInstantGradePref());
  const points = topics.filter((t) => typeof t === 'string' && t.trim()).slice(0, 8);
  const modeLabel = mode === 'mini_test' ? '小テスト' : '演習';
  const badgeText = subjectLabel || modeLabel;

  const toggleInstantGrade = () => {
    const next = !instantGrade;
    setInstantGrade(next);
    writeInstantGradePref(next);
  };

  return (
    <>
      <header
        data-quiz-header
        className={`flex-none px-2.5 pt-[calc(0.28rem+env(safe-area-inset-top,0px))] pb-1.5 md:px-5 md:py-2 border-b border-[#e4d9c5] bg-[#fffdf7] z-20 flex items-center justify-between gap-1.5 md:gap-3 ${
          !isDesktop && keyboardVisible ? 'hidden' : ''
        }`}
      >
        {/* 左：もどるボタン ＋ 科目ピル・単元タイトル（1行スリム統合） */}
        <div className="flex items-center text-left gap-1.5 md:gap-2.5 min-w-0 flex-1">
          <button
            type="button"
            onClick={handleExit}
            title="単元選択に戻る"
            aria-label="単元選択に戻る"
            className="inline-flex min-h-[34px] md:min-h-[38px] items-center justify-center gap-1 rounded-full border border-[#dfd4c0] bg-white px-2.5 md:px-3 text-xs font-extrabold text-[#3d3222] shadow-[0_1.5px_0_#e6dccb] active:translate-y-0.5 transition-all shrink-0 cursor-pointer"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            <span className="hidden sm:inline">もどる</span>
          </button>

          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] md:text-[11px] font-extrabold leading-4 text-white shrink-0"
            style={{ backgroundColor: accent }}
          >
            {badgeText}
          </span>

          <h2 className="text-[13px] sm:text-sm md:text-base font-extrabold text-[#1c2a39] truncate tracking-tight min-w-0">
            {chapterAbstractTitle}
          </h2>

          {run.combo >= 2 && (
            <span className="inline-flex items-center gap-0.5 rounded-full bg-[#fff1db] border border-[#f2c47e] px-1.5 py-0.5 text-[10.5px] font-extrabold text-[#b35300] shrink-0">
              <Flame size={11} className="fill-current" aria-hidden="true" />
              {run.combo}
            </span>
          )}
        </div>

        {/* 右：1タップ即答トグル ＋ 要点ヒント ＋ 進捗ピル */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={toggleInstantGrade}
            aria-pressed={instantGrade}
            title={
              instantGrade
                ? '1タップ即採点ON：選択肢を押すとすぐ答え合わせします（タップでOFF）'
                : '1タップ即採点OFF：ONにすると選択肢を押すだけで即答え合わせできます'
            }
            data-instant-grade-toggle
            className={`inline-flex min-h-[34px] md:min-h-[38px] items-center justify-center gap-1 rounded-full border px-2 md:px-2.5 text-[11px] font-extrabold transition-all cursor-pointer ${
              instantGrade
                ? 'border-emerald-500 bg-emerald-600 text-white shadow-[0_1.5px_0_#065f46]'
                : 'border-[#dfd4c0] bg-white text-[#5c4f3d] shadow-[0_1.5px_0_#e6dccb] hover:bg-[#faf6ee]'
            }`}
          >
            <Zap size={12} className={instantGrade ? 'fill-current' : ''} aria-hidden="true" />
            <span>{instantGrade ? '即答ON' : '即答'}</span>
          </button>

          {points.length > 0 && (
            <button
              type="button"
              onClick={() => setPointsOpen(true)}
              data-unit-points-button
              className="inline-flex min-h-[34px] md:min-h-[38px] items-center justify-center gap-1 rounded-full border border-[#ebd089] bg-[#fff8e3] px-2 md:px-2.5 text-[11px] font-extrabold text-[#8a5800] shadow-[0_1.5px_0_#ead69d] active:translate-y-0.5 transition-all cursor-pointer"
              aria-haspopup="dialog"
              aria-label="この単元のヒントを見る"
            >
              <Lightbulb size={13} aria-hidden="true" />
              <span className="hidden min-[420px]:inline">ヒント</span>
            </button>
          )}

          <div
            className="inline-flex min-h-[34px] md:min-h-[38px] items-center gap-1 rounded-full border px-2.5 shrink-0"
            style={{
              backgroundColor: `color-mix(in srgb, ${accent} 9%, #ffffff)`,
              borderColor: `color-mix(in srgb, ${accent} 26%, #e3d8c4)`,
            }}
          >
            <span
              className="font-extrabold text-xs md:text-sm tabular-nums"
              style={{ color: accent, fontFamily: 'var(--mt-font-display)' }}
            >
              {progressPosition}
              {progressPositionEnd ? `〜${progressPositionEnd}` : ''}
              <span className="mx-0.5 text-[#8a94a0]">/</span>
              {progressTotal}
            </span>
          </div>
        </div>
      </header>

      {pointsOpen && (
        <div
          className="unit-points-backdrop"
          role="presentation"
          onClick={() => setPointsOpen(false)}
        >
          <div
            className="unit-points"
            role="dialog"
            aria-modal="true"
            aria-labelledby="unit-points-title"
            data-unit-points
            onClick={(e) => e.stopPropagation()}
          >
            <header>
              <Lightbulb size={18} aria-hidden="true" />
              <h3 id="unit-points-title">この単元の攻略ポイント</h3>
              <button
                type="button"
                onClick={() => setPointsOpen(false)}
                aria-label="閉じる"
                autoFocus
              >
                <X size={18} />
              </button>
            </header>
            <div className="mb-2 flex items-center gap-2.5">
              {subject && <DoorMascot subject={subject} showSpeech={false} size="mini" />}
              <p className="unit-points-title m-0">{chapterAbstractTitle}</p>
            </div>
            <ol>
              {points.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ol>
            <p className="unit-points-note">
              迷ったら「どの公式・ルールを使う問題か」をここで思い出してから解いてみよう！詳しい解説は答え合わせで見られます。
            </p>
            <button
              type="button"
              className="unit-points-close"
              onClick={() => setPointsOpen(false)}
            >
              問題にもどる
            </button>
          </div>
        </div>
      )}
    </>
  );
}
