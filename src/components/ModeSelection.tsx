import React, { useEffect } from 'react';
import { BookOpen, ArrowLeft, FileText, Swords, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { labelOfSubject } from '../data/subjectLabels';
import { DEFAULT_SUBJECT, subjectDefinitionOf } from '../data/subjects';
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
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="juken-btn-soft inline-flex items-center gap-1.5 px-3.5 text-sm"
            aria-label="ホームに戻る"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            <span>ホーム</span>
          </button>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold text-white shadow-xs"
              style={{ backgroundColor: theme.accent }}
            >
              高校入試・{subjectName}
            </span>
          </div>

          {onChangeSubject ? (
            <button
              type="button"
              onClick={onChangeSubject}
              className="juken-btn-soft inline-flex items-center gap-1 px-3.5 text-xs sm:text-sm"
            >
              <span>教科をかえる</span>
            </button>
          ) : (
            <div className="w-16" aria-hidden="true" />
          )}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 pt-5 pb-8 sm:px-6">
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
            </div>
            <p className="mt-1 text-xs font-bold leading-relaxed text-[#4f5d6b] sm:text-sm">
              まずは「赤シートまとめプリント」で重要語句・公式をチェックしてから、「入試実戦問題」にチャレンジすると正答率がグッと上がるよ！
            </p>
          </div>
        </section>

        {onBattle && (
          <button
            type="button"
            onClick={onBattle}
            aria-label="オンライン対戦を開く"
            className="juken-card-interactive mb-5 flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
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

        {/* メイン2モード選択カード */}
        <div
          className={`grid gap-4 ${
            hideLearning ? 'grid-cols-1 max-w-xl mx-auto' : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {/* 1. 単元別・入試実戦演習 */}
          <section
            className="juken-card flex flex-col justify-between p-5 sm:p-6"
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
                  アウトプット（実戦力UP）
                </span>
                <span className="text-xs font-extrabold text-[#7a6a4c]">4択・解説つき</span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-xs"
                  style={{ backgroundColor: theme.accent }}
                >
                  <BookOpen size={24} aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="mode-practice-title"
                    className="juken-title-font text-xl font-extrabold text-[#1c2a39]"
                  >
                    単元別の入試実戦演習
                  </h2>
                  <p className="text-xs font-bold text-[#5a6573]">
                    公立・私立の頻出パターンを1問ずつ攻略！
                  </p>
                </div>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-[#3e4c5b]">
                {definition?.practiceDescription ??
                  '入試でよく出る重要問題を単元ごとに演習します。ひっかけ選択肢の理由までわかる丁寧な解説つき！'}
              </p>

              <ul className="mb-5 space-y-1.5 rounded-xl bg-[#faf6ed] p-3 text-xs font-bold text-[#4a3f2f]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} style={{ color: theme.accent }} className="shrink-0" />
                  <span>迷った選択肢を消せる「消去メモ」機能つき</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={15} style={{ color: theme.accent }} className="shrink-0" />
                  <span>なぜ間違いなのかまで分かる詳しい解説</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectMode('practice')}
              className="flex min-h-[52px] w-full items-center justify-between rounded-2xl px-5 py-3 text-base font-extrabold text-white transition-transform active:translate-y-0.5 cursor-pointer"
              style={{
                backgroundColor: theme.accent,
                border: `1.5px solid color-mix(in srgb, ${theme.accent} 80%, #000 20%)`,
                boxShadow: `0 4px 0 color-mix(in srgb, ${theme.accent} 70%, #000 25%)`,
                fontFamily: 'var(--mt-font-display)',
              }}
              aria-label="演習問題の単元を選ぶ"
            >
              <span>演習問題の単元を選ぶ</span>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </section>

          {/* 2. 赤シート要点まとめプリント */}
          {!hideLearning && (
            <section
              className="juken-card flex flex-col justify-between p-5 sm:p-6"
              aria-labelledby="mode-learning-title"
            >
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fde8e8] px-3 py-1 text-xs font-extrabold text-[#c23b3b]">
                    <FileText size={13} aria-hidden="true" />
                    インプット（暗記・要点整理）
                  </span>
                  <span className="text-xs font-extrabold text-[#c23b3b]">赤シートON/OFF対応</span>
                </div>

                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d94343] text-white shadow-xs">
                    <FileText size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h2
                      id="mode-learning-title"
                      className="juken-title-font text-xl font-extrabold text-[#1c2a39]"
                    >
                      赤シート要点まとめプリント
                    </h2>
                    <p className="text-xs font-bold text-[#5a6573]">
                      テスト前日・スキマ時間の総復習にぴったり！
                    </p>
                  </div>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-[#3e4c5b]">
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
                className="flex min-h-[52px] w-full items-center justify-between rounded-2xl bg-[#d94343] px-5 py-3 text-base font-extrabold text-white transition-transform active:translate-y-0.5 cursor-pointer"
                style={{
                  border: '1.5px solid #a82828',
                  boxShadow: '0 4px 0 #992222',
                  fontFamily: 'var(--mt-font-display)',
                }}
                aria-label="赤シート要点まとめプリントを開く"
              >
                <span>赤シートプリントをひらく</span>
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
