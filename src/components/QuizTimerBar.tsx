import { useLatest } from '../hooks/useLatest';
import React, { useEffect, useState, useRef } from 'react';
import { Clock } from 'lucide-react';

interface QuizTimerBarProps {
  /** 制限時間（秒） */
  timeLimit: number;
  /** タイマーが動作中か（解説表示中は止める） */
  running: boolean;
  /** 現在の経過秒数を上位に通知（採点用） */
  onTick?: (elapsedSec: number) => void;
  /** リセットキー: これが変わるとタイマーが0からやり直す */
  resetKey: string | number;
}

function formatSec(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m > 0) return `${m}:${r.toString().padStart(2, '0')}`;
  return `${r}秒`;
}

export function QuizTimerBar({ timeLimit, running, onTick, resetKey }: QuizTimerBarProps) {
  const [elapsed, setElapsed] = useState(0);
  const startedAtRef = useRef<number | null>(null);
  const accumulatedRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const onTickRef = useLatest(onTick);

  useEffect(() => {
    accumulatedRef.current = 0;
    startedAtRef.current = null;
    setElapsed(0);
    if (onTickRef.current) onTickRef.current(0);
  }, [resetKey, onTickRef]);

  useEffect(() => {
    if (running) {
      if (startedAtRef.current == null) startedAtRef.current = Date.now();

      intervalRef.current = window.setInterval(() => {
        if (startedAtRef.current == null) return;
        const now = Date.now();
        const e = accumulatedRef.current + (now - startedAtRef.current) / 1000;
        setElapsed(e);
        if (onTickRef.current) onTickRef.current(e);
      }, 250) as unknown as number;
    } else {
      if (startedAtRef.current != null) {
        accumulatedRef.current += (Date.now() - startedAtRef.current) / 1000;
        startedAtRef.current = null;
        setElapsed(accumulatedRef.current);
        if (onTickRef.current) onTickRef.current(accumulatedRef.current);
      }
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, resetKey, onTickRef]);

  const remaining = timeLimit - elapsed;
  const isOver = remaining < 0;
  const overSec = isOver ? Math.floor(-remaining) : 0;
  const pct = isOver ? 100 : Math.max(0, Math.min(100, (elapsed / timeLimit) * 100));

  // 中学生が焦りすぎない穏やかな色設計（超過時も赤点滅させず落ち着いたアンバー表示）
  let barColor = 'bg-emerald-500';
  let textColor = 'text-emerald-800';
  if (isOver) {
    barColor = 'bg-amber-500';
    textColor = 'text-amber-800';
  } else if (remaining < timeLimit * 0.25) {
    barColor = 'bg-amber-400';
    textColor = 'text-amber-700';
  }

  return (
    <div
      className="pointer-events-none select-none bg-[#fdf8ed]"
      aria-label={isOver ? `目安時間を${overSec}秒経過` : `目安残り${formatSec(remaining)}`}
      role="timer"
    >
      <div className="flex items-center justify-between px-3 md:px-6 py-1">
        <div className={`flex items-center gap-1.5 text-[11.5px] font-extrabold ${textColor} transition-colors`}>
          <Clock size={12} />
          {isOver ? (
            <span className="tabular-nums">
              <span>じっくり思考中</span>
              <span className="ml-1">+{formatSec(overSec)}</span>
              <span className="ml-1.5 font-bold text-[#7a6a4c] hidden sm:inline">（焦らず最後まで解こう！）</span>
            </span>
          ) : (
            <span className="tabular-nums">
              <span className="text-[#6b5d47]">目標タイム 残り</span>
              <span className="ml-1 font-extrabold">{formatSec(remaining)}</span>
              <span className="text-[#9a8c76] ml-1">/ 目安 {formatSec(timeLimit)}</span>
            </span>
          )}
        </div>
      </div>
      <div className="h-1 w-full bg-[#ede4d3] overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-200 ease-linear`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
