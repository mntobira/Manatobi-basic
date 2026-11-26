import { useState } from 'react';
import { Eye, PenTool } from 'lucide-react';

/**
 * 数学・理科の解説用「補助線・面積・体積の書き込み図」切り替えコンポーネント
 *
 * ■ ご要望対応
 *   「数学に関しては、グラフとかをしっかりと前面に出してほしいのと、
 *     解説ではグラフに図が書き込まれたり、面積や体積を考えやすくできるようにして。」
 *
 * ■ 特徴
 *   - 初期状態で「✏️ 書き込み解説図（補助線・底辺・高さ・等積変形・空間断面入り）」を大きく表示
 *   - ワンタップで「元の問題図」と切り替え比較できるため、「どこに補助線を引いたか」が視覚的に一目瞭然！
 */
export interface MathAnnotatedFigureToggleProps {
  explanationImageUrl: string;
  explanationImageCaption?: string;
  originalImageUrl?: string;
  originalImageCaption?: string;
  className?: string;
}

export function MathAnnotatedFigureToggle({
  explanationImageUrl,
  explanationImageCaption,
  originalImageUrl,
  originalImageCaption,
  className = '',
}: MathAnnotatedFigureToggleProps) {
  const [showAnnotated, setShowAnnotated] = useState(true);
  const hasOriginal = Boolean(originalImageUrl && originalImageUrl !== explanationImageUrl);
  const activeSrc = showAnnotated || !hasOriginal ? explanationImageUrl : originalImageUrl!;
  const activeCaption =
    showAnnotated || !hasOriginal
      ? explanationImageCaption || '補助線・座標・面積/体積の考え方を書き込んだ解説図'
      : originalImageCaption || '問題で与えられた元の図';

  return (
    <div
      data-math-annotated-figure
      className={`rounded-2xl border-2 border-[#bfd6f6] bg-gradient-to-b from-[#f5f9ff] to-white p-3 shadow-2xs ${className}`}
    >
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1d4ed8]">
          <PenTool size={14} className="shrink-0" />
          <span>
            {showAnnotated ? '図解：補助線・面積/体積の書き込み解説' : '比較：元の問題図'}
          </span>
        </span>

        {hasOriginal && (
          <div
            className="inline-flex rounded-full border border-[#c7dcf7] bg-white p-0.5"
            role="group"
            aria-label="書き込み図と元の図を切り替え"
          >
            <button
              type="button"
              aria-pressed={showAnnotated}
              onClick={() => setShowAnnotated(true)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold transition-colors cursor-pointer ${
                showAnnotated ? 'bg-[#1d4ed8] text-white' : 'text-[#475569] hover:bg-slate-100'
              }`}
            >
              <PenTool size={11} />
              <span>書き込みON</span>
            </button>
            <button
              type="button"
              aria-pressed={!showAnnotated}
              onClick={() => setShowAnnotated(false)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-extrabold transition-colors cursor-pointer ${
                !showAnnotated ? 'bg-[#334155] text-white' : 'text-[#475569] hover:bg-slate-100'
              }`}
            >
              <Eye size={11} />
              <span>元の図</span>
            </button>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-slate-300 bg-white p-2">
        <img
          src={activeSrc}
          alt={activeCaption}
          loading="lazy"
          className="mx-auto max-h-[34dvh] sm:max-h-[42dvh] w-full object-contain"
        />
      </div>

      {activeCaption && (
        <p className="mt-1.5 text-center text-xs font-bold text-[#334155] leading-snug">
          {activeCaption}
        </p>
      )}
    </div>
  );
}
