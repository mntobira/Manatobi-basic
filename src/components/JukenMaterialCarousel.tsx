import { useRef, useState } from 'react';
import type { SlideMaterial } from '../types/curriculum';
import { formatText } from '../utils/textFormatter';

/**
 * 社会・総合問題の複数資料カルーセル（マナトビリスニング 第6問B 方式）
 *
 * ■ ご要望対応
 *   「社会に関してはどうしても資料が入ると、画面がいっぱいになっちゃうから、
 *     複数の資料がある場合は、マナトビリスニングの第6問Bの問題のように
 *     資料を右左の矢印を押したら、変えれるようにしてほしい。」
 *
 * ■ 特徴
 *   - 左右の大きな矢印ボタン（‹ ／ ›、44px幅・片手親指タップ対応）
 *   - スマホ横スワイプ（dx > 48px）＆ キーボード ← / → 対応
 *   - 下部の資料ピルタブ（資料1 雨温図 ／ 資料2 統計表 …）で直接ジャンプ可能
 *   - 表のセルはタップするたびに「○ → × → 空欄」の仮メモを付けられる（第6問B直系）
 *   - 高さをスマホ1画面に収まるコンパクト枠に統一し、縦スクロールを極小化
 */
export interface JukenMaterialCarouselProps {
  materials: SlideMaterial[];
  accent?: string;
  compact?: boolean;
  className?: string;
}

export function JukenMaterialCarousel({
  materials,
  accent = '#0f766e',
  compact = false,
  className = '',
}: JukenMaterialCarouselProps) {
  const count = materials.length;
  const [index, setIndex] = useState(0);
  const [cellMarks, setCellMarks] = useState<Record<string, '○' | '×' | undefined>>({});
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  if (count === 0) return null;
  const safeIndex = ((index % count) + count) % count;
  const current = materials[safeIndex];

  const go = (delta: number) => {
    setIndex((prev) => (prev + delta + count) % count);
  };

  const toggleCellMark = (key: string) => {
    setCellMarks((prev) => {
      const cur = prev[key];
      const next = cur === undefined ? '○' : cur === '○' ? '×' : undefined;
      return { ...prev, [key]: next };
    });
  };

  return (
    <div
      data-juken-material-carousel
      tabIndex={0}
      onKeyDown={(e) => {
        if (count <= 1) return;
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          go(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          go(1);
        }
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (t) touchRef.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const start = touchRef.current;
        touchRef.current = null;
        const end = e.changedTouches[0];
        if (!start || !end || count <= 1) return;
        const dx = end.clientX - start.x;
        const dy = end.clientY - start.y;
        if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          go(dx < 0 ? 1 : -1);
        }
      }}
      className={`rounded-2xl border border-[#dfd4c0] bg-white p-2 sm:p-2.5 shadow-2xs select-none outline-none ${className}`}
    >
      {/* 上部：現在表示中の資料タイトル＋枚数インジケータ */}
      <div className="mb-1.5 flex items-center justify-between gap-2 px-1">
        <div className="flex min-w-0 items-center gap-1.5">
          {current.badge && (
            <span
              className="shrink-0 rounded-md px-1.5 py-0.5 text-[10.5px] font-extrabold text-white"
              style={{ backgroundColor: accent }}
            >
              {current.badge}
            </span>
          )}
          <span className="truncate text-xs sm:text-[13px] font-extrabold text-[#1c2a39]">
            {current.title}
          </span>
        </div>
        {count > 1 && (
          <span className="shrink-0 rounded-full bg-[#f5efe2] px-2 py-0.5 text-[11px] font-extrabold text-[#5b4f3d] tabular-nums">
            資料 {safeIndex + 1}/{count}
          </span>
        )}
      </div>

      {/* 中央：左右矢印（‹ ／ ›）＋ スライド本体（第6問B方式） */}
      <div className="relative flex items-stretch gap-1">
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="前の資料へ切り替え"
            data-carousel-prev
            className="flex w-9 sm:w-11 shrink-0 items-center justify-center rounded-xl border border-[#d6c9b1] bg-[#faf6ee] text-2xl font-black text-[#2C3E50] hover:bg-[#f2eadb] active:scale-95 transition-transform cursor-pointer"
          >
            ‹
          </button>
        )}

        <div
          aria-live="polite"
          aria-label={`資料 ${safeIndex + 1} / ${count}（${current.label}）`}
          className={`min-w-0 flex-1 overflow-y-auto rounded-xl border border-[#ebe2d1] bg-[#fffdf9] p-2 ${
            compact ? 'max-h-[26dvh] sm:max-h-[34dvh]' : 'max-h-[29dvh] sm:max-h-[40dvh]'
          }`}
        >
          {/* 画像・SVG 図版 */}
          {current.imageUrl && (
            <div className="flex flex-col items-center">
              <img
                src={current.imageUrl}
                alt={current.imageCaption || current.title}
                loading="lazy"
                className="mx-auto max-h-[22dvh] sm:max-h-[32dvh] w-auto max-w-full rounded border border-slate-300 bg-white object-contain"
              />
              {current.imageCaption && (
                <p className="mt-1 text-center text-[11px] font-bold text-slate-500 leading-snug">
                  {current.imageCaption}
                </p>
              )}
            </div>
          )}

          {/* 統計表・比較表（セルをタップで ○ / × メモ機能つき） */}
          {current.table && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs sm:text-[13px]">
                <thead>
                  <tr className="bg-[#f4ede0] text-[#3a2f20]">
                    {current.table.headers.map((h, hi) => (
                      <th
                        key={hi}
                        className="border border-[#dcd0ba] px-2 py-1 text-center font-extrabold whitespace-nowrap"
                      >
                        {formatText(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {current.table.rows.map((row, ri) => {
                    const rowKey = `${current.id}_r${ri}`;
                    const mark = cellMarks[rowKey];
                    return (
                      <tr
                        key={ri}
                        onClick={() => toggleCellMark(rowKey)}
                        title="タップで行に ○ / × メモを付けられます"
                        className={`cursor-pointer transition-colors ${
                          mark === '○'
                            ? 'bg-emerald-50/90'
                            : mark === '×'
                              ? 'bg-rose-50/75 opacity-75'
                              : ri % 2 === 0
                                ? 'bg-white hover:bg-[#fcf8ef]'
                                : 'bg-[#faf6ee]/60 hover:bg-[#fcf8ef]'
                        }`}
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`border border-[#e3d8c4] px-2 py-1 ${
                              ci === 0 ? 'font-extrabold text-[#1c2a39] whitespace-nowrap' : 'text-center font-bold text-[#2b3948]'
                            }`}
                          >
                            {ci === 0 && mark && (
                              <span
                                className={`mr-1 inline-block font-black ${
                                  mark === '○' ? 'text-emerald-600' : 'text-rose-600'
                                }`}
                              >
                                {mark}
                              </span>
                            )}
                            {formatText(cell)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="mt-1 text-right text-[10.5px] font-bold text-slate-400">
                💡 表の行をタップすると ○ / × の消去法メモがつけられます
              </p>
            </div>
          )}

          {/* 史料・年表・要点リスト */}
          {current.lines && current.lines.length > 0 && (
            <ul className="space-y-1 text-xs sm:text-[13.5px] font-bold leading-relaxed text-[#1c2a39]">
              {current.lines.map((line, li) => (
                <li
                  key={li}
                  className="rounded-lg border border-[#ece3d3] bg-white px-2.5 py-1.5"
                >
                  {formatText(line)}
                </li>
              ))}
            </ul>
          )}

          {current.note && (
            <p className="mt-1.5 text-[11px] font-bold text-slate-500 leading-snug">
              ※ {formatText(current.note)}
            </p>
          )}
        </div>

        {count > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="次の資料へ切り替え"
            data-carousel-next
            className="flex w-9 sm:w-11 shrink-0 items-center justify-center rounded-xl border border-[#d6c9b1] bg-[#faf6ee] text-2xl font-black text-[#2C3E50] hover:bg-[#f2eadb] active:scale-95 transition-transform cursor-pointer"
          >
            ›
          </button>
        )}
      </div>

      {/* 下部：資料1・資料2・資料3… ダイレクト切替タブ */}
      {count > 1 && (
        <div
          className="mt-1.5 flex flex-wrap items-center justify-center gap-1"
          role="tablist"
          aria-label="表示する資料を選ぶ"
        >
          {materials.map((m, i) => {
            const selected = i === safeIndex;
            return (
              <button
                key={m.id || i}
                type="button"
                role="tab"
                aria-selected={selected}
                data-carousel-dot={i}
                onClick={() => setIndex(i)}
                className={`inline-flex min-h-[32px] items-center justify-center rounded-full border px-2.5 text-[11.5px] font-extrabold transition-colors cursor-pointer ${
                  selected
                    ? 'border-[#2C3E50] bg-[#2C3E50] text-white shadow-2xs'
                    : 'border-[#dfd4c0] bg-[#faf6ee] text-[#4a3d2b] hover:bg-white'
                }`}
              >
                {m.label || `資料${i + 1}`}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
