/**
 * 画面名（AppState）と学び方（AppMode）の定義と、保存値の検査（マナトビ 高校入試）
 */
export type AppState =
  | 'home'
  | 'mode_selection'
  | 'chapters'
  | 'quiz'
  | 'explanation'
  | 'intro'
  | 'study_hub'
  | 'note_detail'
  | 'onboarding'
  | 'settings'
  | 'leaderboard'
  | 'subject_selection'
  | 'teacher_dashboard'
  | 'feedback_admin'
  | 'battle'
  | 'growth'
  | 'study'
  | 'learning'
  | 'writing_dojo'
  | 'prefecture_guide';

export type AppMode = 'mini_test' | 'practice' | 'learning';

const APP_STATES = new Set<AppState>([
  'home',
  'mode_selection',
  'chapters',
  'quiz',
  'explanation',
  'intro',
  'study_hub',
  'note_detail',
  'onboarding',
  'settings',
  'leaderboard',
  'subject_selection',
  'teacher_dashboard',
  'feedback_admin',
  'battle',
  'growth',
  'study',
  'learning',
  'writing_dojo',
  'prefecture_guide',
]);

const APP_MODES = new Set<AppMode>(['mini_test', 'practice', 'learning']);

export function isAppState(value: unknown): value is AppState {
  return typeof value === 'string' && APP_STATES.has(value as AppState);
}

export function isAppMode(value: unknown): value is AppMode {
  return typeof value === 'string' && APP_MODES.has(value as AppMode);
}
