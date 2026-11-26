/**
 * 学習カタログ（マナトビ 高校入試 v6：全5教科 分野別ダイレクト選択＋スピード小テスト＋赤シートまとめ＋英作文道場＋47都道府県入試研究）
 *
 * ■ v6 単元UI改善
 *   これまで「理科4分野 単元別・入試実戦演習」のように1枚の巨大カードに全分野がまとめられていた構造を刷新し、
 *   スマホ1画面で迷わず直行できるよう、各科目を「分野別2×2コンパクトカード（生物・物理・化学・地学 など）」に分割。
 *   さらに各分野カードごとにリアルタイムの問題数・進捗バーを表示する。
 */
import { getPartIndexStats, getSubjectStats } from './chapterIndex.generated';
import type { SubjectKey } from './subjects';

export type StudyAction =
  | {
      kind: 'units';
      subject: SubjectKey;
      mode?: 'practice' | 'mini_test';
      /** 直接開く分野タブ（例：'sc_part1'＝生物、'sc_part2'＝物理） */
      partId?: string;
      /** 直接展開する章ID（国語の漢字 vs 口語文法など） */
      expandChapterId?: string;
    }
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
  | 'briefcase'
  | 'leaf'
  | 'zap'
  | 'compass'
  | 'scroll'
  | 'scale'
  | 'chart';

export interface StudyContent {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  meta: string;
  icon: StudyIcon;
  primary?: boolean;
  /** 'domains' はスマホでも2列コンパクトグリッドで1画面表示する分野別カード */
  section?: 'domains' | 'practice' | 'memorize' | 'spotlight';
  /** 'subject' または 'subject:partId' または 'subject:partId:chapterId' */
  progressSubject?: string;
  badge?: string;
  accentColor?: string;
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

const enP1 = getPartIndexStats('english', 'en_part1');
const enP2 = getPartIndexStats('english', 'en_part2');
const enP3 = getPartIndexStats('english', 'en_part3');
const enP4 = getPartIndexStats('english', 'en_part4');

const maP1 = getPartIndexStats('math', 'ma_part1');
const maP2 = getPartIndexStats('math', 'ma_part2');
const maP3 = getPartIndexStats('math', 'ma_part3');
const maP4 = getPartIndexStats('math', 'ma_part4');

const jaKanji = getPartIndexStats('japanese', 'ja_part1', 'ja1_1');
const jaGrammar = getPartIndexStats('japanese', 'ja_part1', 'ja1_2');
const jaP1All = getPartIndexStats('japanese', 'ja_part1');
const jaP2 = getPartIndexStats('japanese', 'ja_part2');
const jaP3 = getPartIndexStats('japanese', 'ja_part3');

const scBio = getPartIndexStats('science', 'sc_part1');
const scPhy = getPartIndexStats('science', 'sc_part2');
const scChe = getPartIndexStats('science', 'sc_part3');
const scEar = getPartIndexStats('science', 'sc_part4');

const soGeo = getPartIndexStats('social', 'so_part1');
const soHis = getPartIndexStats('social', 'so_part2');
const soCiv = getPartIndexStats('social', 'so_part3');

function fmtDomainMeta(st: { chapters: number; sets: number; practiceQuestions: number }): string {
  return `${st.sets}回・${st.practiceQuestions}問`;
}

export const STUDY_CATALOG: readonly StudySubject[] = [
  {
    id: 'english',
    label: '英語',
    description: '文法ステージ別4択・整序対話・資料長文・英作文道場・赤シート',
    icon: 'letters',
    contents: [
      {
        id: 'english_part1',
        title: '中1・2 基礎英文法',
        description: '時制・疑問詞・助動詞・不定詞・動名詞・比較・文型',
        meta: fmtDomainMeta(enP1),
        icon: 'letters',
        section: 'domains',
        badge: '★基礎〜',
        accentColor: '#2563eb',
        progressSubject: 'english:en_part1',
        action: { kind: 'units', subject: 'english', mode: 'practice', partId: 'en_part1' },
      },
      {
        id: 'english_part2',
        title: '中3 重要英文法',
        description: '受動態・現在完了・分詞・関係代名詞・間接疑問・仮定法',
        meta: fmtDomainMeta(enP2),
        icon: 'pen',
        section: 'domains',
        badge: '★★頻出',
        accentColor: '#1d4ed8',
        progressSubject: 'english:en_part2',
        action: { kind: 'units', subject: 'english', mode: 'practice', partId: 'en_part2' },
      },
      {
        id: 'english_part3',
        title: '整序・対話・英作構文',
        description: '語順整序・対話応答・誤文訂正・リスニング計算対話',
        meta: fmtDomainMeta(enP3),
        icon: 'headphones',
        section: 'domains',
        badge: '★★実戦',
        accentColor: '#0284c7',
        progressSubject: 'english:en_part3',
        action: { kind: 'units', subject: 'english', mode: 'practice', partId: 'en_part3' },
      },
      {
        id: 'english_part4',
        title: 'グラフ＆長文読解',
        description: 'ポスター・統計グラフ情報検索・スピーチ物語読解',
        meta: fmtDomainMeta(enP4),
        icon: 'book',
        section: 'domains',
        badge: '★★★長文',
        accentColor: '#4338ca',
        progressSubject: 'english:en_part4',
        action: { kind: 'units', subject: 'english', mode: 'practice', partId: 'en_part4' },
      },
      {
        id: 'english_writing_dojo',
        title: '高校入試 英作文道場',
        icon: 'pen',
        primary: true,
        badge: '目玉',
        description: '必須の型21選・言い換え術・直前模試27題・自動減点チェッカー',
        meta: '型21選＋実戦英作文27題',
        action: { kind: 'writing_dojo' },
      },
      {
        id: 'english_minitest',
        title: '英語 3分スピード小テスト',
        icon: 'zap',
        badge: '即答確認',
        description: '英文法の急所・対話・整序の必須ポイントをテンポよく点検',
        meta: `全${en.chapters ?? 9}単元・小テスト${en.miniTestQuestions ?? 54}問`,
        action: { kind: 'units', subject: 'english', mode: 'mini_test' },
      },
      {
        id: 'english_prints',
        title: '英語 最終まとめプリント（赤シート）',
        icon: 'book',
        section: 'memorize',
        description: '中学英文法すべて・不規則動詞・英作文テンプレートを1画面赤シート暗記',
        meta: '全7枚・優先度★★★★★',
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
    description: '数と式・関数グラフ・平面空間図形（補助線書き込み解説つき）・確率データ',
    icon: 'sigma',
    contents: [
      {
        id: 'math_part1',
        title: '数と式・文章題',
        description: '分数式・平方根nの4型・二次方程式・連立文章題・規則性',
        meta: fmtDomainMeta(maP1),
        icon: 'sigma',
        section: 'domains',
        badge: '大問1・2',
        accentColor: '#0284c7',
        progressSubject: 'math:ma_part1',
        action: { kind: 'units', subject: 'math', mode: 'practice', partId: 'ma_part1' },
      },
      {
        id: 'math_part2',
        title: '関数・グラフ融合',
        description: '一次関数・y=ax²の変域と変化の割合・面積二等分＆等積変形',
        meta: fmtDomainMeta(maP2),
        icon: 'chart',
        section: 'domains',
        badge: 'グラフ図解',
        accentColor: '#2563eb',
        progressSubject: 'math:ma_part2',
        action: { kind: 'units', subject: 'math', mode: 'practice', partId: 'ma_part2' },
      },
      {
        id: 'math_part3',
        title: '平面・空間図形',
        description: '円周角・相似面積比・三平方・円錐最短ひも・立方体切断体積',
        meta: fmtDomainMeta(maP3),
        icon: 'compass',
        section: 'domains',
        badge: '書き込み解説',
        accentColor: '#0f766e',
        progressSubject: 'math:ma_part3',
        action: { kind: 'units', subject: 'math', mode: 'practice', partId: 'ma_part3' },
      },
      {
        id: 'math_part4',
        title: '確率・箱ひげ図',
        description: '箱ひげ図とヒストグラム照合・サイコロ＆カード確率・標本調査',
        meta: fmtDomainMeta(maP4),
        icon: 'chart',
        section: 'domains',
        badge: '得点源',
        accentColor: '#4f46e5',
        progressSubject: 'math:ma_part4',
        action: { kind: 'units', subject: 'math', mode: 'practice', partId: 'ma_part4' },
      },
      {
        id: 'math_minitest',
        title: '数学 3分スピード小テスト（計算・鉄則）',
        icon: 'zap',
        badge: 'ミス撲滅',
        description: '符号ミス・変域・平方根・角度・確率の基本を3分でスピード点検',
        meta: `全${ma.chapters ?? 11}単元・小テスト${ma.miniTestQuestions ?? 55}問`,
        action: { kind: 'units', subject: 'math', mode: 'mini_test' },
      },
      {
        id: 'math_prints',
        title: '直前数学 まとめプリント（赤シート）',
        icon: 'book',
        section: 'memorize',
        description: '直前数学対策PDF全ページ網羅＋連立8型・関数交点公式・円錐裏ワザ',
        meta: '全7枚・優先度★★★★★',
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
    description: '漢字熟語・口語文法（活用/品詞識別/敬語）徹底特訓・古文漢文・要点読解',
    icon: 'book',
    contents: [
      {
        id: 'japanese_kanji_vocab',
        title: '漢字・熟語・語彙',
        description: '同音異義・同訓異字・二字熟語の構成・四字熟語・故事成語・慣用句',
        meta: fmtDomainMeta(jaKanji.practiceQuestions > 0 ? jaKanji : jaP1All),
        icon: 'pen',
        section: 'domains',
        badge: '徹底網羅',
        accentColor: '#c2410c',
        progressSubject: 'japanese:ja_part1:ja1_1',
        action: { kind: 'units', subject: 'japanese', mode: 'practice', partId: 'ja_part1', expandChapterId: 'ja1_1' },
      },
      {
        id: 'japanese_grammar',
        title: '口語文法・敬語',
        description: '動詞活用形/活用の種類・「ない/れる/だ/に/で」識別・尊敬謙譲丁寧語',
        meta: fmtDomainMeta(jaGrammar.practiceQuestions > 0 ? jaGrammar : jaP1All),
        icon: 'letters',
        section: 'domains',
        badge: '超頻出',
        accentColor: '#b91c1c',
        progressSubject: 'japanese:ja_part1:ja1_2',
        action: { kind: 'units', subject: 'japanese', mode: 'practice', partId: 'ja_part1', expandChapterId: 'ja1_2' },
      },
      {
        id: 'japanese_koten',
        title: '古文・漢文・韻文',
        description: '歴史的仮名遣い・重要古語・係り結び・漢文返り点（レ点/一二点）・俳句短歌',
        meta: fmtDomainMeta(jaP3),
        icon: 'scroll',
        section: 'domains',
        badge: '得点源',
        accentColor: '#9a3412',
        progressSubject: 'japanese:ja_part3',
        action: { kind: 'units', subject: 'japanese', mode: 'practice', partId: 'ja_part3' },
      },
      {
        id: 'japanese_modern',
        title: '現代文・条件作文の型',
        description: '接続詞・指示語・要旨把握・心情変化・資料読み取り条件作文の鉄則',
        meta: fmtDomainMeta(jaP2),
        icon: 'book',
        section: 'domains',
        badge: '解法パターン',
        accentColor: '#7c2d12',
        progressSubject: 'japanese:ja_part2',
        action: { kind: 'units', subject: 'japanese', mode: 'practice', partId: 'ja_part2' },
      },
      {
        id: 'japanese_minitest',
        title: '国語 3分スピード小テスト（漢字・文法・古語）',
        icon: 'zap',
        badge: '暗記確認',
        description: '落とせない頻出漢字・助詞助動詞識別・敬語・返り点を短時間で即答チェック',
        meta: `全${ja.chapters ?? 8}単元・小テスト${ja.miniTestQuestions ?? 40}問`,
        action: { kind: 'units', subject: 'japanese', mode: 'mini_test' },
      },
      {
        id: 'japanese_prints',
        title: '国語 最終まとめプリント（赤シート）',
        icon: 'letters',
        section: 'memorize',
        description: '品詞識別・活用表・敬語変換・熟語構成・短歌俳句・歴史的仮名遣い・返り点',
        meta: '全6枚・優先度★★★★★',
        action: { kind: 'learning', subject: 'japanese' },
      },
    ],
  },
  {
    id: 'science',
    label: '理科',
    description: '生物・物理・化学・地学の4分野を個別選択（最終プリント全35講 完全網羅）',
    icon: 'flask',
    contents: [
      {
        id: 'science_bio',
        title: '生物分野',
        description: '顕微鏡＆スケッチ・光合成蒸散・消化循環排出・細胞分裂とメンデル遺伝',
        meta: fmtDomainMeta(scBio),
        icon: 'leaf',
        section: 'domains',
        badge: '植物・人体・遺伝',
        accentColor: '#15803d',
        progressSubject: 'science:sc_part1',
        action: { kind: 'units', subject: 'science', mode: 'practice', partId: 'sc_part1' },
      },
      {
        id: 'science_phy',
        title: '物理分野',
        description: '光の屈折凸レンズ・音・圧力と浮力・オーム電力・電磁誘導・運動と仕事',
        meta: fmtDomainMeta(scPhy),
        icon: 'zap',
        section: 'domains',
        badge: '光・電気・力',
        accentColor: '#0369a1',
        progressSubject: 'science:sc_part2',
        action: { kind: 'units', subject: 'science', mode: 'practice', partId: 'sc_part2' },
      },
      {
        id: 'science_che',
        title: '化学分野',
        description: '気体発生・溶解度と蒸留・化学変化と質量比(4:1/3:2)・イオン電池と中和',
        meta: fmtDomainMeta(scChe),
        icon: 'flask',
        section: 'domains',
        badge: '気体・質量・イオン',
        accentColor: '#7e22ce',
        progressSubject: 'science:sc_part3',
        action: { kind: 'units', subject: 'science', mode: 'practice', partId: 'sc_part3' },
      },
      {
        id: 'science_ear',
        title: '地学分野',
        description: '火成岩・地震計算・地層柱状図・湿度と前線天気・日周年周と金星月',
        meta: fmtDomainMeta(scEar),
        icon: 'globe',
        section: 'domains',
        badge: '大地・気象・天体',
        accentColor: '#b45309',
        progressSubject: 'science:sc_part4',
        action: { kind: 'units', subject: 'science', mode: 'practice', partId: 'sc_part4' },
      },
      {
        id: 'science_minitest',
        title: '理科 3分スピード小テスト（一問一答・公式）',
        icon: 'pen',
        badge: '4分野横断',
        description: '実験操作の理由・試薬の色変化・化学反応式・物理地学の計算公式を即答確認',
        meta: `全${sc.chapters ?? 12}単元・小テスト${sc.miniTestQuestions ?? 60}問`,
        action: { kind: 'units', subject: 'science', mode: 'mini_test' },
      },
      {
        id: 'science_prints',
        title: '入試対策理科 最終プリント（赤シート全35講）',
        icon: 'book',
        section: 'memorize',
        description: '送付プリント全35講（生物・物理・化学・地学）＋実験理由＆計算裏ワザ完全収録',
        meta: '全12枚（全35講）・★★★★★',
        action: { kind: 'learning', subject: 'science' },
      },
    ],
  },
  {
    id: 'social',
    label: '社会',
    description: '地理・歴史・公民の3分野選択（左右矢印スライド資料＋記述文4択演習対応）',
    icon: 'globe',
    contents: [
      {
        id: 'social_geo',
        title: '地理分野',
        description: '時差計算・雨温図・世界6州・日本の農工貿易統計・地形図の読み取り',
        meta: fmtDomainMeta(soGeo),
        icon: 'globe',
        section: 'domains',
        badge: '地図・雨温図・統計',
        accentColor: '#0f766e',
        progressSubject: 'social:so_part1',
        action: { kind: 'units', subject: 'social', mode: 'practice', partId: 'so_part1' },
      },
      {
        id: 'social_his',
        title: '歴史分野',
        description: '古代〜現代の政治外交・文化史・史料読み取り・時代横断の年代整序',
        meta: fmtDomainMeta(soHis),
        icon: 'scroll',
        section: 'domains',
        badge: '通史・史料・整序',
        accentColor: '#9a3412',
        progressSubject: 'social:so_part2',
        action: { kind: 'units', subject: 'social', mode: 'practice', partId: 'so_part2' },
      },
      {
        id: 'social_civ',
        title: '公民分野',
        description: '日本国憲法と人権・国会内閣裁判所・ドント式・需要供給と日銀金融・国際',
        meta: fmtDomainMeta(soCiv),
        icon: 'scale',
        section: 'domains',
        badge: '憲法・政治・経済',
        accentColor: '#1d4ed8',
        progressSubject: 'social:so_part3',
        action: { kind: 'units', subject: 'social', mode: 'practice', partId: 'so_part3' },
      },
      {
        id: 'social_minitest',
        title: '社会 3分スピード小テスト（重要用語・制度）',
        icon: 'zap',
        badge: '3分野横断',
        description: '地理の統計特徴・歴史の人物条約・公民の憲法選挙経済をテンポよく確認',
        meta: `全${so.chapters ?? 10}単元・小テスト${so.miniTestQuestions ?? 50}問`,
        action: { kind: 'units', subject: 'social', mode: 'mini_test' },
      },
      {
        id: 'social_prints',
        title: '最終地理・歴史・最終公民プリント（赤シート）',
        icon: 'book',
        section: 'memorize',
        description: '最終地理全14講＋統計資料・歴史通史・最終公民全7講を1画面赤シート暗記',
        meta: '全14枚・優先度★★★★★',
        action: { kind: 'learning', subject: 'social' },
      },
    ],
  },
];

export function findStudySubject(id: string | null | undefined): StudySubject | undefined {
  return STUDY_CATALOG.find((s) => s.id === id);
}
