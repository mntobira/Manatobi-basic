/**
 * ===================================================================
 * battleRules — 高校入試5教科の対戦ルール（既定値）
 * ===================================================================
 */

import type { BattleAnswerFormat, BattleRule } from './types';

const BASE: Omit<BattleRule, 'subject'> = {
  enabled: true,
  questionCount: 8,
  timeLimitOverride: null,
  pointsCorrect: 100,
  pointsSpeedMax: 50,
  pointsStreak: 15,
  tiebreak: 'time',
  formats: ['choice4', 'choice', 'kana'],
  kanaShare: 0,
  note: '',
};

const VALID_SUBJECTS = ['english', 'math', 'japanese', 'science', 'social'] as const;

export const BATTLE_RULES: Readonly<Record<string, BattleRule>> = {
  english: {
    ...BASE,
    subject: 'english',
    questionCount: 8,
    formats: ['choice4'],
    note: '英文法・対話・英作文正誤のスピード4択勝負',
  },
  math: {
    ...BASE,
    subject: 'math',
    questionCount: 8,
    timeLimitOverride: 30,
    formats: ['choice4'],
    note: '平方根・連立・関数・図形・確率（1問30秒）',
  },
  japanese: {
    ...BASE,
    subject: 'japanese',
    questionCount: 8,
    formats: ['choice4'],
    note: '漢字語彙・品詞識別・敬語・古文漢文・表現技法',
  },
  science: {
    ...BASE,
    subject: 'science',
    questionCount: 8,
    timeLimitOverride: 25,
    formats: ['choice4'],
    note: '生物・物理・化学・地学の実験＆計算バトル',
  },
  social: {
    ...BASE,
    subject: 'social',
    questionCount: 8,
    timeLimitOverride: 25,
    formats: ['choice4'],
    note: '地理・歴史・公民の統計＆年代＆制度バトル',
  },
};

export function defaultRuleOf(subject: string): BattleRule {
  const found = BATTLE_RULES[subject];
  if (found) return found;
  return { ...BASE, subject, enabled: false, note: '' };
}

export function defaultEnabledSubjects(): string[] {
  return Object.values(BATTLE_RULES)
    .filter((r) => r.enabled)
    .map((r) => r.subject);
}

export function normalizeRule(subject: string, raw: unknown): BattleRule {
  const base = defaultRuleOf(subject);
  if (!(VALID_SUBJECTS as readonly string[]).includes(subject)) return base;
  if (!raw || typeof raw !== 'object') return base;
  const r = raw as Record<string, unknown>;

  const num = (v: unknown, fallback: number, min: number, max: number): number => {
    if (typeof v !== 'number' || !Number.isFinite(v)) return fallback;
    return Math.min(max, Math.max(min, Math.round(v)));
  };

  const formats: BattleAnswerFormat[] = Array.isArray(r.formats)
    ? (r.formats.filter(
        (f): f is BattleAnswerFormat =>
          f === 'choice4' ||
          f === 'choice' ||
          f === 'kana' ||
          f === 'word' ||
          f === 'panel',
      ) as BattleAnswerFormat[])
    : base.formats;

  const kanaShare: number =
    typeof r.kanaShare === 'number' && Number.isFinite(r.kanaShare)
      ? Math.min(1, Math.max(0, r.kanaShare))
      : base.kanaShare;

  return {
    ...(r.scoringVersion === 2 ? { scoringVersion: 2 as const } : {}),
    subject,
    enabled: typeof r.enabled === 'boolean' ? r.enabled : base.enabled,
    questionCount: num(r.questionCount, base.questionCount, 3, 20),
    timeLimitOverride:
      r.timeLimitOverride === null
        ? null
        : typeof r.timeLimitOverride === 'number'
          ? num(r.timeLimitOverride, 20, 5, 120)
          : base.timeLimitOverride,
    pointsCorrect: num(r.pointsCorrect, base.pointsCorrect, 1, 1000),
    pointsSpeedMax: num(r.pointsSpeedMax, base.pointsSpeedMax, 0, 500),
    pointsStreak: num(r.pointsStreak, base.pointsStreak, 0, 200),
    tiebreak:
      r.tiebreak === 'time' || r.tiebreak === 'sudden' || r.tiebreak === 'draw'
        ? r.tiebreak
        : base.tiebreak,
    formats: formats.length > 0 ? formats : base.formats,
    kanaShare,
    note: typeof r.note === 'string' ? r.note.slice(0, 120) : base.note,
  };
}
