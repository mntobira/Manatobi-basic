import React from 'react';
import { ChevronDown, Headphones, RotateCcw, Play } from 'lucide-react';
import { UNIT_STATUS_LABEL, stripCircledNumber, type UnitStatus } from '../utils/unitStats';
import { STAGE_CLEAR_PERFECTS } from '../utils/stageRecords';
import './unit-card.css';

/**
 * 単元カード（中学生向け高校入試デザイン改訂版）。
 *
 * ■ レイアウト原則（重なりバグ根絶）
 *   - 上段（.unit-card-main）：カード全幅を使って「番号バッジ ＋ 単元タイトル（最大2行）＋ トピックタグ ＋ 開閉矢印」を表示。
 *   - 下段（.unit-card-footer）：CSS Grid `minmax(0, 1fr) auto` で「進捗ステータス・正答率」と「学習開始ボタン」を完全分離。
 *     どの画面幅（320px〜1920px）でも絶対にボタンと文字が重ならない構造を保証する。
 */
export interface UnitCardProps {
  /** 0 始まりの通し番号（表示は 01） */
  index: number;
  title: string;
  topics?: string[];
  questionCount: number;
  status: UnitStatus;
  /** 正答率（%）。記録が無ければ null */
  accuracy: number | null;
  hasSavedProgress: boolean;
  expanded: boolean;
  onToggle: () => void;
  onStart: () => void;
  onResume?: () => void;
  onAudio?: () => void;
  audioOpen?: boolean;
  /** 開いたときに下に出す追加の中身（問題を選ぶ・音源プレーヤーなど） */
  children?: React.ReactNode;
  accent?: string;
  /** 満点をとった回数（STAGE_CLEAR_PERFECTS 回で「達成」）。省略時は状態だけ出す */
  perfects?: number;
  /** 状態の文字を差し替える */
  progressLabel?: string;
  /** 主ボタンの文字を差し替える */
  primaryLabel?: string;
  /** 開いた中身を回の一覧だけにする */
  roundsMode?: boolean;
  /** 「演習 N 大問」の代わりに出す文字 */
  countLabel?: string;
  /** 小問の総数（「全25問」など中学生に分かりやすい問題数表示用） */
  subQuestionTotal?: number;
}

export function UnitCard({
  index,
  title,
  topics,
  questionCount,
  status,
  accuracy,
  hasSavedProgress,
  expanded,
  onToggle,
  onStart,
  onResume,
  onAudio,
  audioOpen,
  children,
  accent,
  perfects,
  progressLabel,
  primaryLabel,
  roundsMode,
  countLabel,
  subQuestionTotal,
}: UnitCardProps) {
  const ready = questionCount > 0;
  const number = String(index + 1).padStart(2, '0');
  const name = stripCircledNumber(title);
  const panelId = `unit-card-panel-${number}`;

  const statusText = !ready
    ? '準備中'
    : progressLabel
      ? progressLabel
      : status === 'done'
        ? 'マスター！'
        : status === 'doing' && perfects !== undefined
          ? `満点 ${perfects}/${STAGE_CLEAR_PERFECTS}`
          : UNIT_STATUS_LABEL[status];

  const totalLabel = subQuestionTotal && subQuestionTotal > 0 ? `全${subQuestionTotal}問` : `全${questionCount}セット`;

  return (
    <article
      className="unit-card"
      data-status={status}
      data-expanded={expanded || undefined}
      data-empty={!ready || undefined}
      style={accent ? ({ '--unit-accent': accent } as React.CSSProperties) : undefined}
    >
      {/* 上段：単元タイトル（カード横幅100%を使って読みやすく表示・詳細はタップで展開） */}
      <button
        type="button"
        className="unit-card-main"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <span className="unit-card-head">
          <span className="unit-card-num" aria-hidden="true">{number}</span>
          <span className="unit-card-title">{name}</span>
          <span className="unit-card-chev-wrap" aria-hidden="true">
            <ChevronDown size={17} className="unit-card-chev" />
          </span>
        </span>
      </button>

      {/* 下段：進捗ステータス（左）と学習開始ボタン（右）を Grid で完全分離し重なりゼロを保証 */}
      <div className="unit-card-footer">
        <div className="unit-card-meta">
          <span className="mt-status unit-card-status" data-status={status}>
            {statusText}
          </span>
          <span
            className="mt-meter unit-card-meter"
            data-status={status}
            aria-hidden="true"
          >
            <i style={{ width: `${accuracy ?? 0}%` }} />
          </span>
          <span className="unit-card-acc">
            {accuracy === null ? totalLabel : `正答率 ${accuracy}%`}
          </span>
        </div>

        {ready && (
          <button
            type="button"
            className="unit-card-primary"
            onClick={hasSavedProgress && onResume ? onResume : onStart}
          >
            <Play size={15} className="fill-current" aria-hidden="true" />
            <span>{primaryLabel ?? (hasSavedProgress && onResume ? '続きから' : '学習開始')}</span>
          </button>
        )}
      </div>

      {expanded && (
        <div className="unit-card-panel" id={panelId}>
          {!roundsMode && topics && topics.length > 0 && (
            <ul className="unit-card-topics">
              {topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          {!roundsMode && (
            <p className="unit-card-count">
              {ready
                ? countLabel ?? `実戦演習 ${questionCount} セット収録${accuracy !== null ? `（現在の正答率 ${accuracy}%）` : ''}`
                : '問題を準備中です'}
            </p>
          )}
          {ready && (onAudio || (!roundsMode && hasSavedProgress && onResume)) && (
            <div className="unit-card-secondary">
              {!roundsMode && hasSavedProgress && onResume && (
                <button type="button" onClick={onStart}>
                  <RotateCcw size={15} aria-hidden="true" />
                  最初から解き直す
                </button>
              )}
              {onAudio && (
                <button
                  type="button"
                  onClick={onAudio}
                  aria-pressed={!!audioOpen}
                  title="復習用の音源を聞く（問題を解かずに音声だけ再生）"
                >
                  <Headphones size={15} aria-hidden="true" />
                  音源
                </button>
              )}
            </div>
          )}
          {children}
        </div>
      )}
    </article>
  );
}
