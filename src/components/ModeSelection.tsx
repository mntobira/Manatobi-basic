import React, { useEffect } from 'react';
import {
  BookOpen,
  ArrowLeft,
  FileText,
  Swords,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { labelOfSubject } from '../data/subjectLabels';
import { DEFAULT_SUBJECT, subjectDefinitionOf } from '../data/subjects';
import { getSubjectStats } from '../data/chapterIndex.generated';
import { DoorMascot } from './DoorMascot';
import { subjectTheme } from '../data/subjectTheme';
import type { SubjectKey } from '../data/allChapters';
import '../styles/juken-polish.css';

interface ModeSelectionProps {
  onSelectMode: (mode: 'mini_test' | 'practice' | 'learning') => void;
  onBack: () => void;
  onChangeSubject?: () => void;
  subject?: SubjectKey;
  onBattle?: () => void;
}

export function ModeSelection({
  onSelectMode,
  onBack,
  subject = DEFAULT_SUBJECT,
  onBattle,
  onChangeSubject,
}: ModeSelectionProps) {
  const definition = subjectDefinitionOf(subject);
  const learningDescription = definition?.learningDescription;
  const hideLearning = !learningDescription;
  const theme = subjectTheme(subject);
  const subjectName = labelOfSubject(subject);
  const stats = getSubjectStats(subject);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="juken-screen w-full"
      style={
        {
          '--subject-accent': theme.accent,
          '--subject-soft': theme.accentSoft,
        } as React.CSSProperties
      }
    >
      {/* 上部ナビバー */}
      <header className="juken-header">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="juken-btn-soft inline-flex items-center gap-1.5 px-3.5 text-sm cursor-pointer"
            aria-label="ホームに戻る"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            <span>ホーム</span>
          </button>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center rounded-full px-3.5 py-1 text-xs font-extrabold text-white shadow-xs"
              style={{ backgroundColor: theme.accent }}
            >
              高校入試・{subjectName}
            </span>
          </div>

          {onChangeSubject ? (
            <button
              type="button"
              onClick={onChangeSubject}
              className="juken-btn-soft inline-flex items-center gap-1 px-3.5 text-xs sm:text-sm cursor-pointer"
            >
              <span>教科をかえる</span>
            </button>
          ) : (
            <div className="w-16" aria-hidden="true" />
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pt-5 pb-8 sm:px-6">
        {/* とびら君のガイドバナー */}
        <section
          className="juken-card mb-5 flex items-center gap-3.5 p-4 sm:p-5"
          style={{
            background: `linear-gradient(135deg, #ffffff 0%, ${theme.surface} 100%)`,
            borderColor: theme.accentSoft,
          }}
        >
          <div className="shrink-0">
            <DoorMascot subject={subject} showSpeech={false} size="mini" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1
                className="juken-title-font text-xl font-extrabold sm:text-2xl"
                style={{ color: theme.accent }}
              >
                {subjectName}の学習スタイルを選ぼう！
              </h1>
              {stats.chapters ? (
                <span className="juken-num inline-flex items-center rounded-full bg-white/90 border border-[#e3d9c8] px-2.5 py-0.5 text-xs font-extrabold text-[#4a3f2f]">
                  全{stats.chapters}単元・計{stats.questions ?? 0}問収録
                </span>
              ) : null}
            </div>
            <p className="mt-1 text-xs font-bold leading-relaxed text-[#4f5d6b] sm:text-sm">
              ①「赤シートまとめ」で重要語句を確認 → ②「スピード小テスト」で基礎チェック → ③「入試実戦演習」で図表・応用問題を仕上げる3ステップが最強ルート！
            </p>
          </div>
        </section>

        {onBattle && (
          <button
            type="button"
            onClick={onBattle}
            aria-label="オンライン対戦を開く"
            className="juken-card-interactive mb-5 flex w-full items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer"
          >
            <span className="flex items-center gap-3 min-w-0">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf3fc] text-[#2458a6]">
                <Swords size={20} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <strong className="block text-sm font-extrabold text-[#1c2a39]">
                  オンライン早解きバトルへ
                </strong>
                <small className="block truncate text-xs font-bold text-[#5a6573]">
                  友だちと1対1対戦・全国のライバルとレート勝負！
                </small>
              </span>
            </span>
            <ArrowRight size={18} className="shrink-0 text-[#2458a6]" aria-hidden="true" />
          </button>
        )}

        {/* 3モード選択カード */}
        <div
          className={`grid gap-4 ${
            hideLearning ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'
          }`}
        >
          {/* 1. 単元別・入試実戦演習 */}
          <section
            className="juken-card flex flex-col justify-between p-5"
            aria-labelledby="mode-practice-title"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${theme.accent} 14%, #ffffff)`,
                    color: theme.accent,
                  }}
                >
                  <Sparkles size={13} aria-hidden="true" />
                  実戦力UP（本番対策）
                </span>
                <span className="juken-num text-xs font-extrabold text-[#7a6a4c]">
                  {stats.practiceQuestions ? `${stats.practiceQuestions}問` : '図表・4択＆短答'}
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-xs"
                  style={{ backgroundColor: theme.accent }}
                >
                  <BookOpen size={22} aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="mode-practice-title"
                    className="juken-title-font text-lg sm:text-xl font-extrabold text-[#1c2a39]"
                  >
                    単元別の入試実戦演習
                  </h2>
                  <p className="text-xs font-bold text-[#5a6573]">
                    公立・私立の頻出パターンを1問ずつ攻略！
                  </p>
                </div>
              </div>

              <p className="mb-4 text-xs sm:text-sm leading-relaxed text-[#3e4c5b]">
                {definition?.practiceDescription ??
                  '入試でよく出る重要問題を単元ごとに演習します。ひっかけ選択肢の理由までわかる丁寧な解説つき！'}
              </p>

              <ul className="mb-5 space-y-1.5 rounded-xl bg-[#faf6ed] p-3 text-xs font-bold text-[#4a3f2f]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} style={{ color: theme.accent }} className="shrink-0" />
                  <span>図表・実験グラフ・読解まで本番形式で演習</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} style={{ color: theme.accent }} className="shrink-0" />
                  <span>消去メモ＆ひっかけ選択肢の理由つき解説</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectMode('practice')}
              className="flex min-h-[50px] w-full items-center justify-between rounded-2xl px-4 py-3 text-sm sm:text-base font-extrabold text-white transition-transform active:translate-y-0.5 cursor-pointer"
              style={{
                backgroundColor: theme.accent,
                border: `1.5px solid color-mix(in srgb, ${theme.accent} 80%, #000 20%)`,
                boxShadow: `0 4px 0 color-mix(in srgb, ${theme.accent} 70%, #000 25%)`,
                fontFamily: 'var(--mt-font-display)',
              }}
              aria-label="入試実戦演習の単元を選ぶ"
            >
              <span>実戦演習の単元を選ぶ</span>
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </section>

          {/* 2. 入試直前 スピード小テスト（mini_test） */}
          <section
            className="juken-card flex flex-col justify-between p-5"
            aria-labelledby="mode-minitest-title"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff3d6] px-3 py-1 text-xs font-extrabold text-[#9a5700]">
                  <Zap size={13} aria-hidden="true" />
                  スキマ時間（3分チェック）
                </span>
                <span className="juken-num text-xs font-extrabold text-[#9a5700]">
                  {stats.miniTestQuestions ? `${stats.miniTestQuestions}問` : '重要基礎チェック'}
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e38614] text-white shadow-xs">
                  <Zap size={22} aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="mode-minitest-title"
                    className="juken-title-font text-lg sm:text-xl font-extrabold text-[#1c2a39]"
                  >
                    スピード小テスト
                  </h2>
                  <p className="text-xs font-bold text-[#5a6573]">
                    落とせない1問1答・基本計算をテンポよく確認！
                  </p>
                </div>
              </div>

              <p className="mb-4 text-xs sm:text-sm leading-relaxed text-[#3e4c5b]">
                実戦問題とは別の専用チェック問題で、単元の基礎知識・重要公式・頻出ひっかけが頭に入っているかを約3分でスピード診断できます。
              </p>

              <ul className="mb-5 space-y-1.5 rounded-xl bg-[#fff8e8] p-3 text-xs font-bold text-[#5c3d0c]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="shrink-0 text-[#d97706]" />
                  <span>実戦演習と重複ゼロの専用チェック問題を収録</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="shrink-0 text-[#d97706]" />
                  <span>通学中や休み時間のウォーミングアップに最適</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectMode('mini_test')}
              className="flex min-h-[50px] w-full items-center justify-between rounded-2xl bg-[#e38614] px-4 py-3 text-sm sm:text-base font-extrabold text-white transition-transform active:translate-y-0.5 cursor-pointer"
              style={{
                border: '1.5px solid #b56506',
                boxShadow: '0 4px 0 #9e5604',
                fontFamily: 'var(--mt-font-display)',
              }}
              aria-label="スピード小テストの単元を選ぶ"
            >
              <span>スピード小テストを選ぶ</span>
              <ArrowRight size={19} aria-hidden="true" />
            </button>
          </section>

          {/* 3. 赤シート要点まとめプリント */}
          {!hideLearning && (
            <section
              className="juken-card flex flex-col justify-between p-5"
              aria-labelledby="mode-learning-title"
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fde8e8] px-3 py-1 text-xs font-extrabold text-[#c23b3b]">
                    <FileText size={13} aria-hidden="true" />
                    暗記・要点整理
                  </span>
                  <span className="text-xs font-extrabold text-[#c23b3b]">赤シートON/OFF対応</span>
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d94343] text-white shadow-xs">
                    <FileText size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <h2
                      id="mode-learning-title"
                      className="juken-title-font text-lg sm:text-xl font-extrabold text-[#1c2a39]"
                    >
                      赤シート要点まとめ
                    </h2>
                    <p className="text-xs font-bold text-[#5a6573]">
                      テスト前日・重要語句と公式の総復習に！
                    </p>
                  </div>
                </div>

                <p className="mb-4 text-xs sm:text-sm leading-relaxed text-[#3e4c5b]">
                  {learningDescription}
                </p>

                <ul className="mb-5 space-y-1.5 rounded-xl bg-[#fff5f5] p-3 text-xs font-bold text-[#612828]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="shrink-0 text-[#d94343]" />
                    <span>タップで赤シートをめくって1語ずつ暗記チェック</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="shrink-0 text-[#d94343]" />
                    <span>まぎらわしい用語の比較表＆図解つき</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onSelectMode('learning')}
                className="flex min-h-[50px] w-full items-center justify-between rounded-2xl bg-[#d94343] px-4 py-3 text-sm sm:text-base font-extrabold text-white transition-transform active:translate-y-0.5 cursor-pointer"
                style={{
                  border: '1.5px solid #a82828',
                  boxShadow: '0 4px 0 #992222',
                  fontFamily: 'var(--mt-font-display)',
                }}
                aria-label="赤シート要点まとめプリントを開く"
              >
                <span>赤シートプリントをひらく</span>
                <ArrowRight size={19} aria-hidden="true" />
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
