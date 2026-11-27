import { ArrowLeft, ChevronRight, Home, ListOrdered, Target } from 'lucide-react';
import type { ReviewNav } from './types';

/**
 * スマホの1問ごとの答え合わせ：下部固定ナビ（つぎの問題へ / 結果サマリーを見る！）。
 * 演習画面の MobileFloatingBar と同じ温かい背景＆立体ボタンデザインに統一。
 */
export function MobileAnswerNav({
  onNextQuestion,
  isLastQuestion,
}: {
  onBack?: () => void;
  onNextQuestion: () => void;
  isLastQuestion?: boolean;
}) {
  return (
    <div className="order-4 fixed left-0 right-0 bottom-0 z-50 bg-[#fcf5e9]/96 backdrop-blur-md border-t border-[#e3d9c8] shadow-[0_-4px_14px_rgba(60,40,15,0.08)] px-2.5 pt-1.5 pb-[calc(0.38rem+env(safe-area-inset-bottom))]">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onNextQuestion}
          className="flex min-h-[42px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-[14px] font-extrabold transition-transform active:translate-y-0.5 cursor-pointer"
          style={{
            backgroundColor: isLastQuestion ? '#f29a1f' : '#2458a6',
            color: isLastQuestion ? '#23180a' : '#ffffff',
            border: isLastQuestion ? '1.5px solid #c97808' : '1.5px solid #1a4482',
            boxShadow: isLastQuestion
              ? '0 2.5px 0 #b86c05, 0 5px 12px rgba(242,154,31,0.2)'
              : '0 2.5px 0 #183d75, 0 5px 12px rgba(36,88,166,0.18)',
            fontFamily: 'var(--mt-font-display)',
          }}
        >
          <span>{isLastQuestion ? '結果サマリーを見る！' : 'つぎの問題へすすむ'}</span>
          <ArrowLeft size={16} className="rotate-180 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}

/**
 * 詳しい結果の下のバー：問題・スクリプト・解説の下に、次にすることをまとめる。
 */
export function ReviewBottomBar({ reviewNav }: { reviewNav: ReviewNav }) {
  const main = reviewNav.onNext ? (
    <button type="button" className="pbb-main" data-review-next onClick={reviewNav.onNext}>
      {reviewNav.nextLabel}
      <ChevronRight size={17} aria-hidden="true" />
    </button>
  ) : reviewNav.onRetryWrong ? (
    <button type="button" className="pbb-main" onClick={reviewNav.onRetryWrong}>
      <Target size={17} aria-hidden="true" />
      {reviewNav.retryLabel}
    </button>
  ) : null;
  return (
    <>
      <div className="practice-bottom-spacer is-review" aria-hidden="true" />
      <div className="practice-bottom-bar is-review" data-review-actions>
        {main}
        <div className="pbb-sub">
          <button type="button" data-review-chapters onClick={reviewNav.onChapters}>
            <ListOrdered size={16} aria-hidden="true" />
            単元選択に戻る
          </button>
          {reviewNav.onHome && (
            <button type="button" data-review-home onClick={reviewNav.onHome}>
              <Home size={16} aria-hidden="true" />
              ホームに戻る
            </button>
          )}
        </div>
        {reviewNav.onNext && reviewNav.onRetryWrong && (
          <button type="button" className="pbb-retry" data-review-retry onClick={reviewNav.onRetryWrong}>
            <Target size={15} aria-hidden="true" />
            {reviewNav.retryLabel}
          </button>
        )}
      </div>
    </>
  );
}
