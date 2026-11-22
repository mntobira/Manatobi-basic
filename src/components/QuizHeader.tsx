import { useState } from 'react';
import { ArrowLeft, Flame, Lightbulb, X } from 'lucide-react';
import { DoorMascot } from './DoorMascot';
import type { SubjectKey } from '../data/allChapters';

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
  const points = topics.filter((t) => typeof t === 'string' && t.trim()).slice(0, 8);
  const modeLabel = mode === 'mini_test' ? '小テスト' : '実戦演習';
  const badgeText = subjectLabel ? `${subjectLabel}・${modeLabel}` : modeLabel;

  return (
    <>
      <header
        data-quiz-header
        className={`flex-none px-3 pt-[calc(0.45rem+env(safe-area-inset-top,0px))] pb-2 md:px-6 md:py-3.5 border-b border-[#e4d9c5] bg-[#fffdf7] z-20 flex items-center justify-between gap-2.5 md:gap-4 ${
          !isDesktop && keyboardVisible ? 'hidden' : ''
        }`}
      >
        {/* 左：もどるボタン ＋ 科目バッジ・単元名 */}
        <div className="flex items-center text-left gap-2.5 md:gap-3.5 min-w-0 flex-1">
          <button
            type="button"
            onClick={handleExit}
            title="単元選択に戻る"
            aria-label="単元選択に戻る"
            className="inline-flex min-h-[40px] items-center justify-center gap-1 rounded-full border border-[#dfd4c0] bg-white px-3 text-xs md:text-sm font-extrabold text-[#3d3222] shadow-[0_2px_0_#e6dccb] active:translate-y-0.5 transition-all shrink-0 cursor-pointer"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span className="hidden min-[380px]:inline">もどる</span>
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-extrabold leading-4 text-white"
                style={{ backgroundColor: accent }}
              >
                {badgeText}
              </span>
              {run.combo >= 2 && (
                <span className="inline-flex items-center gap-0.5 rounded-full bg-[#fff1db] border border-[#f2c47e] px-2 py-0.5 text-[11px] font-extrabold text-[#b35300]">
                  <Flame size={12} className="fill-current" aria-hidden="true" />
                  {run.combo}連続!
                </span>
              )}
            </div>
            <h2 className="mt-0.5 text-sm md:text-lg font-extrabold text-[#1c2a39] truncate tracking-tight">
              {chapterAbstractTitle}
            </h2>
          </div>
        </div>

        {/* 右：要点ヒント ＋ 大問進捗ピル */}
        <div className="flex items-center gap-2 shrink-0">
          {points.length > 0 && (
            <button
              type="button"
              onClick={() => setPointsOpen(true)}
              data-unit-points-button
              className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full border border-[#ebd089] bg-[#fff8e3] px-3 text-xs font-extrabold text-[#8a5800] shadow-[0_2px_0_#ead69d] active:translate-y-0.5 transition-all cursor-pointer"
              aria-haspopup="dialog"
              aria-label="この単元のヒントを見る"
            >
              <Lightbulb size={15} aria-hidden="true" />
              <span>ヒント</span>
            </button>
          )}

          <div
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 shrink-0"
            style={{
              backgroundColor: `color-mix(in srgb, ${accent} 9%, #ffffff)`,
              borderColor: `color-mix(in srgb, ${accent} 26%, #e3d8c4)`,
            }}
          >
            <span className="text-[11px] font-extrabold text-[#5a6573] hidden sm:inline">セット</span>
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
