/**
 * ===================================================================
 * 教科の登録簿（マナトビ 高校入試：主要5教科）
 * ===================================================================
 *
 * 公立・私立高校入試の5教科（英語・数学・国語・理科・社会）を定義する。
 * すべての教科で entry: 'mode_selection' とし、
 * 「単元別の入試実戦演習」と「赤シート対応・最終まとめプリント」の2軸で学べるようにする。
 *
 * ■ このファイルは何も import しない（葉モジュール）
 */

export interface SubjectTheme {
  label: string;
  accent: string;
  accentSoft: string;
  surface: string;
  bubbleBorderClass: string;
  bubbleBgClass: string;
  bubbleShadow: string;
  chipTextClass: string;
  chipBgClass: string;
  progressBarClass: string;
}

export interface ReviewSubjectStyle {
  textClass: string;
  bgClass: string;
  borderClass: string;
  activeClass: string;
  stripeClass: string;
}

export interface SubjectDefinition {
  id: string;
  label: string;
  shortLabel: string;
  enabled: boolean;
  chapterIdPattern: RegExp;
  entry: 'chapters' | 'mode_selection';
  practiceDescription: string;
  learningDescription?: string;
  classroom?: boolean;
  theme: SubjectTheme;
  reviewStyle: ReviewSubjectStyle;
}

export const SUBJECT_REGISTRY = [
  {
    id: 'english',
    label: '英語',
    shortLabel: '英語',
    enabled: true,
    chapterIdPattern: /^en\d+_\d+$/,
    entry: 'mode_selection',
    practiceDescription:
      '中1〜中3の全英文法（不定詞・完了形・関係代名詞・仮定法）、対話応答、長文読解、英作文（整序・誤文訂正）を入試実戦形式で演習します。',
    learningDescription:
      '高校入試英文法の核心ルール・英作文の必須の型21選・減点ゼロの言い換えテクニックを赤シート暗記で総整理します。',
    theme: {
      label: '英語',
      accent: '#2458A6',
      accentSoft: '#BBD2F2',
      surface: '#F4F8FE',
      bubbleBorderClass: 'border-[#BBD2F2]/85',
      bubbleBgClass: 'bg-[#F8FBFF]/95',
      bubbleShadow: '0 10px 24px -14px rgba(36,88,166,0.55)',
      chipTextClass: 'text-[#1E4785]',
      chipBgClass: 'bg-[#BBD2F2]/40',
      progressBarClass: 'bg-[#3B73C4]',
    },
    reviewStyle: {
      textClass: 'text-[#1E4785]',
      bgClass: 'bg-[#BBD2F2]/25',
      borderClass: 'border-[#BBD2F2]',
      activeClass: 'bg-[#2458A6] text-white border-[#2458A6]',
      stripeClass: 'bg-[#2458A6]',
    },
  },
  {
    id: 'math',
    label: '数学',
    shortLabel: '数学',
    enabled: true,
    chapterIdPattern: /^ma\d+_\d+$/,
    entry: 'mode_selection',
    practiceDescription:
      '大問1小問集合（計算・平方根の自然数nの4パターン・変域・ねじれ・箱ひげ図）から連立文章題10類型・関数・相似・円周角・三平方まで網羅します。',
    learningDescription:
      '得点源になる直前数学の鉄則公式・平方根4パターン・連立方程式10パターン・空間図形＆データ分析の解法手順を赤シートで確認します。',
    theme: {
      label: '数学',
      accent: '#0E7C86',
      accentSoft: '#AEE3E8',
      surface: '#F3FBFC',
      bubbleBorderClass: 'border-[#AEE3E8]/85',
      bubbleBgClass: 'bg-[#F7FEFF]/95',
      bubbleShadow: '0 10px 24px -14px rgba(14,124,134,0.55)',
      chipTextClass: 'text-[#0B6169]',
      chipBgClass: 'bg-[#AEE3E8]/40',
      progressBarClass: 'bg-[#179CA8]',
    },
    reviewStyle: {
      textClass: 'text-[#0B6169]',
      bgClass: 'bg-[#AEE3E8]/25',
      borderClass: 'border-[#AEE3E8]',
      activeClass: 'bg-[#0E7C86] text-white border-[#0E7C86]',
      stripeClass: 'bg-[#0E7C86]',
    },
  },
  {
    id: 'japanese',
    label: '国語',
    shortLabel: '国語',
    enabled: true,
    chapterIdPattern: /^ja\d+_\d+$/,
    entry: 'mode_selection',
    practiceDescription:
      '頻出漢字・四字熟語・慣用句、口語文法（活用・助動詞・助詞識別・敬語）、論説文・文学的文章読解、古文・漢文、条件作文対策を演習します。',
    learningDescription:
      '入試必出の用言活用表・まぎらわしい助動詞/助詞の識別・重要古語＆歴史的仮名遣い・漢文返り点・記述作文の型を赤シートで暗記します。',
    theme: {
      label: '国語',
      accent: '#C24641',
      accentSoft: '#F3C3C1',
      surface: '#FDF6F6',
      bubbleBorderClass: 'border-[#F3C3C1]/85',
      bubbleBgClass: 'bg-[#FFF9F9]/95',
      bubbleShadow: '0 10px 24px -14px rgba(194,70,65,0.55)',
      chipTextClass: 'text-[#9B332F]',
      chipBgClass: 'bg-[#F3C3C1]/40',
      progressBarClass: 'bg-[#D95D58]',
    },
    reviewStyle: {
      textClass: 'text-[#9B332F]',
      bgClass: 'bg-[#F3C3C1]/25',
      borderClass: 'border-[#F3C3C1]',
      activeClass: 'bg-[#C24641] text-white border-[#C24641]',
      stripeClass: 'bg-[#C24641]',
    },
  },
  {
    id: 'science',
    label: '理科',
    shortLabel: '理科',
    enabled: true,
    chapterIdPattern: /^sc\d+_\d+$/,
    entry: 'mode_selection',
    practiceDescription:
      '生物・物理・化学・地学の全35講を完全網羅！対照実験・遺伝・オームと電力・仕事率・化学反応式と定比例・イオン・湿球露点・地震柱状図・天体を徹底演習します。',
    learningDescription:
      '入試対策理科最終プリント全35枚（生物①〜⑨・物理①〜⑨・化学①〜⑩・地学①〜⑦）と出題優先度★1〜★5・今年度予想を赤シート暗記できます。',
    theme: {
      label: '理科',
      accent: '#2B8A57',
      accentSoft: '#B6E4CB',
      surface: '#F4FBF7',
      bubbleBorderClass: 'border-[#B6E4CB]/85',
      bubbleBgClass: 'bg-[#F8FEFA]/95',
      bubbleShadow: '0 10px 24px -14px rgba(43,138,87,0.55)',
      chipTextClass: 'text-[#1F6B42]',
      chipBgClass: 'bg-[#B6E4CB]/40',
      progressBarClass: 'bg-[#3AA66C]',
    },
    reviewStyle: {
      textClass: 'text-[#1F6B42]',
      bgClass: 'bg-[#B6E4CB]/25',
      borderClass: 'border-[#B6E4CB]',
      activeClass: 'bg-[#2B8A57] text-white border-[#2B8A57]',
      stripeClass: 'bg-[#2B8A57]',
    },
  },
  {
    id: 'social',
    label: '社会',
    shortLabel: '社会',
    enabled: true,
    chapterIdPattern: /^so\d+_\d+$/,
    entry: 'mode_selection',
    practiceDescription:
      '世界地理・日本地理（地形図・気候区・工業地帯・統計資料）、歴史（古代〜近現代・外交史・文化史・年代整序）、公民（憲法・三権・ドント式・日銀金融政策・税・国際社会）を完全攻略します。',
    learningDescription:
      '最終地理まとめプリント①〜⑭＋重要資料①②、歴史全時代整理、最終公民まとめプリント①〜⑦の全重要語句・公式を赤シートで暗記できます。',
    theme: {
      label: '社会',
      accent: '#C7771E',
      accentSoft: '#F3D5AE',
      surface: '#FDF9F2',
      bubbleBorderClass: 'border-[#F3D5AE]/85',
      bubbleBgClass: 'bg-[#FFFCF6]/95',
      bubbleShadow: '0 10px 24px -14px rgba(199,119,30,0.55)',
      chipTextClass: 'text-[#9B5910]',
      chipBgClass: 'bg-[#F3D5AE]/40',
      progressBarClass: 'bg-[#DF8F32]',
    },
    reviewStyle: {
      textClass: 'text-[#9B5910]',
      bgClass: 'bg-[#F3D5AE]/25',
      borderClass: 'border-[#F3D5AE]',
      activeClass: 'bg-[#C7771E] text-white border-[#C7771E]',
      stripeClass: 'bg-[#C7771E]',
    },
  },
] as const satisfies readonly SubjectDefinition[];

export type SubjectKey = (typeof SUBJECT_REGISTRY)[number]['id'];

export const SUBJECT_IDS: readonly SubjectKey[] = SUBJECT_REGISTRY.map((s) => s.id);

export const DEFAULT_SUBJECT: SubjectKey = SUBJECT_REGISTRY[0].id;

export function isSubjectKey(value: string | null | undefined): value is SubjectKey {
  return !!value && (SUBJECT_IDS as readonly string[]).includes(value);
}

export function subjectDefinitionOf(id: string | null | undefined): SubjectDefinition | undefined {
  return SUBJECT_REGISTRY.find((s) => s.id === id);
}

export function subjectOfChapterId(chapterId: string | null | undefined): SubjectKey | null {
  const id = (chapterId || '').trim();
  if (!id) return null;
  return SUBJECT_REGISTRY.find((s) => s.chapterIdPattern.test(id))?.id ?? null;
}
