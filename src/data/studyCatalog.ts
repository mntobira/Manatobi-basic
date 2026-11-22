/**
 * 学習カタログ（マナトビ 高校入試：主要5教科＋まとめプリント＋英作文道場＋47都道府県入試研究）
 */
import { getSubjectStats } from './chapterIndex.generated';
import type { SubjectKey } from './subjects';

export type StudyAction =
  | { kind: 'units'; subject: SubjectKey }
  | { kind: 'learning'; subject: SubjectKey }
  | { kind: 'writing_dojo' }
  | { kind: 'prefecture_guide' };

export type StudyIcon =
  | 'headphones'
  | 'pen'
  | 'letters'
  | 'book'
  | 'flask'
  | 'sigma'
  | 'globe'
  | 'briefcase';

export interface StudyContent {
  id: string;
  title: string;
  description: string;
  meta: string;
  icon: StudyIcon;
  primary?: boolean;
  section?: 'practice' | 'memorize' | 'spotlight';
  progressSubject?: string;
  badge?: string;
  action: StudyAction;
}

export interface StudySubject {
  id: string;
  label: string;
  description: string;
  icon: StudyIcon;
  contents: StudyContent[];
}

const en = getSubjectStats('english');
const ma = getSubjectStats('math');
const ja = getSubjectStats('japanese');
const sc = getSubjectStats('science');
const so = getSubjectStats('social');

export const STUDY_CATALOG: readonly StudySubject[] = [
  {
    id: 'english',
    label: '英語',
    description: '中1〜中3英文法・長文読解・英作文道場・赤シートまとめ',
    icon: 'letters',
    contents: [
      {
        id: 'english_units',
        title: '英語 単元別実戦演習',
        primary: true,
        icon: 'pen',
        description: '時制・不定詞・現在完了・関係代名詞・仮定法・実用文＆長文読解',
        meta: `全${en.chapters ?? 7}単元・実戦${en.questions ?? 54}問`,
        progressSubject: 'english',
        action: { kind: 'units', subject: 'english' },
      },
      {
        id: 'english_writing_dojo',
        title: '高校入試 英作文道場',
        icon: 'pen',
        badge: '目玉',
        description: '必須の型21選・言い換え術・予想問題6回分・自動減点チェッカー搭載',
        meta: '型21選＋基礎・誤文訂正・予想問題10題',
        action: { kind: 'writing_dojo' },
      },
      {
        id: 'english_prints',
        title: '英語 最終まとめプリント（赤シート）',
        icon: 'book',
        section: 'memorize',
        description: '頻出英文法の急所と英作文テンプレートを赤シートON/OFFで暗記',
        meta: '全3枚・出題優先度★★★★★',
        action: { kind: 'learning', subject: 'english' },
      },
      {
        id: 'pref_guide_en',
        title: '47都道府県 入試研究',
        icon: 'globe',
        badge: '47県',
        section: 'spotlight',
        description: '配点・内申・傾向比較',
        meta: '全47都道府県対応',
        action: { kind: 'prefecture_guide' },
      },
    ],
  },
  {
    id: 'math',
    label: '数学',
    description: '平方根4パターン・連立文章題・関数・相似・円周角・箱ひげ図',
    icon: 'sigma',
    contents: [
      {
        id: 'math_units',
        title: '数学 単元別実戦演習',
        primary: true,
        icon: 'sigma',
        description: '直前数学対策PDF完全準拠！大問1小問集合〜関数・図形・箱ひげ図・確率',
        meta: `全${ma.chapters ?? 5}単元・実戦${ma.questions ?? 40}問`,
        progressSubject: 'math',
        action: { kind: 'units', subject: 'math' },
      },
      {
        id: 'math_prints',
        title: '直前数学 まとめプリント（赤シート）',
        icon: 'book',
        section: 'memorize',
        description: '平方根の自然数n・変域の罠・円錐の秒殺公式・四分位範囲を総整理',
        meta: '全2枚・出題優先度★★★★★',
        action: { kind: 'learning', subject: 'math' },
      },
      {
        id: 'pref_guide_ma',
        title: '47都道府県 入試研究',
        icon: 'globe',
        badge: '47県',
        section: 'spotlight',
        description: '学校選択・C問題比較',
        meta: '全47都道府県対応',
        action: { kind: 'prefecture_guide' },
      },
    ],
  },
  {
    id: 'japanese',
    label: '国語',
    description: '漢字語彙・口語文法（「ない/れる」識別・敬語）・現代文・古文漢文・作文',
    icon: 'book',
    contents: [
      {
        id: 'japanese_units',
        title: '国語 単元別実戦演習',
        primary: true,
        icon: 'book',
        description: '同音異義語・四字熟語・動詞活用と助動詞識別・敬語・論説/詩歌・古文漢文',
        meta: `全${ja.chapters ?? 4}単元・実戦${ja.questions ?? 32}問`,
        progressSubject: 'japanese',
        action: { kind: 'units', subject: 'japanese' },
      },
      {
        id: 'japanese_prints',
        title: '国語 最終まとめプリント（赤シート）',
        icon: 'letters',
        section: 'memorize',
        description: '品詞識別・敬語変換・歴史的仮名遣いと重要古語・返り点・条件作文の型',
        meta: '全2枚・出題優先度★★★★★',
        action: { kind: 'learning', subject: 'japanese' },
      },
    ],
  },
  {
    id: 'science',
    label: '理科',
    description: '生物・物理・化学・地学 全35講プリント直結（実験・計算・理由記述）',
    icon: 'flask',
    contents: [
      {
        id: 'science_units',
        title: '理科4分野 単元別実戦演習',
        primary: true,
        icon: 'flask',
        description: '蒸散・対照実験・遺伝・凸レンズ・オーム電力・仕事率・再結晶・定比例・電池中和・地震・湿度・天体',
        meta: `全${sc.chapters ?? 8}単元・実戦${sc.questions ?? 50}問`,
        progressSubject: 'science',
        action: { kind: 'units', subject: 'science' },
      },
      {
        id: 'science_prints',
        title: '入試対策理科 最終プリント（赤シート）',
        icon: 'book',
        section: 'memorize',
        description: '生物①〜⑨・物理①〜⑨・化学①〜⑩・地学①〜⑦の最重要公式＆反応式',
        meta: '全4分野シート・出題優先度★★★★★',
        action: { kind: 'learning', subject: 'science' },
      },
    ],
  },
  {
    id: 'social',
    label: '社会',
    description: '世界/日本地理（地形図・統計）・歴史全時代・公民（ドント式・日銀・税）',
    icon: 'globe',
    contents: [
      {
        id: 'social_units',
        title: '社会3分野 単元別実戦演習',
        primary: true,
        icon: 'globe',
        description: '時差計算・雨温図・地形図と工業グラフ・歴史通史と年代整序・直接請求・ドント式・日銀金融政策',
        meta: `全${so.chapters ?? 6}単元・実戦${so.questions ?? 36}問`,
        progressSubject: 'social',
        action: { kind: 'units', subject: 'social' },
      },
      {
        id: 'social_prints',
        title: '最終地理・歴史・最終公民プリント（赤シート）',
        icon: 'book',
        section: 'memorize',
        description: '最終地理まとめ①〜⑭＋歴史通史＋最終公民まとめ①〜⑦の完全暗記シート',
        meta: '全3分野シート・出題優先度★★★★★',
        action: { kind: 'learning', subject: 'social' },
      },
    ],
  },
];

export function findStudySubject(id: string | null | undefined): StudySubject | undefined {
  return STUDY_CATALOG.find((s) => s.id === id);
}
