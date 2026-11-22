/**
 * ===================================================================
 * とびら君の「高校入試 5教科ミニ豆知識」データ
 * ===================================================================
 */

import type { SubjectKey } from './subjects';

export type TipCategory =
  | 'exam'
  | 'englishTip'
  | 'mathTip'
  | 'japaneseTip'
  | 'scienceTip'
  | 'socialTip';

export type TipSubject = SubjectKey;
export type TipSubjectScope = 'common' | TipSubject;

export interface TipCategoryMeta {
  label: string;
  emoji: string;
}

export const TIP_CATEGORIES: Record<TipCategory, TipCategoryMeta> = {
  exam: { label: '高校入試の鉄則', emoji: '🎯' },
  englishTip: { label: '英語・英作文のコツ', emoji: '🔤' },
  mathTip: { label: '数学の秒殺公式', emoji: '📐' },
  japaneseTip: { label: '国語・古典の急所', emoji: '📖' },
  scienceTip: { label: '理科4分野のポイント', emoji: '🔬' },
  socialTip: { label: '社会（地歴公）の盲点', emoji: '🌏' },
};

export const CATEGORY_SUBJECT: Record<TipCategory, TipSubjectScope> = {
  exam: 'common',
  englishTip: 'english',
  mathTip: 'math',
  japaneseTip: 'japanese',
  scienceTip: 'science',
  socialTip: 'social',
};

export interface MascotTip {
  id: string;
  category: TipCategory;
  text: string;
  subject?: TipSubjectScope;
}

export const mascotTips: MascotTip[] = [
  // 共通
  { id: 'jk_ex01', category: 'exam', subject: 'common', text: '設問の「正しいものを選べ」か「誤っているものを選べ」かには、最初に必ず線を引いてから解こう。' },
  { id: 'jk_ex02', category: 'exam', subject: 'common', text: '公立高校入試は大問1・2の小問集合で全体の半分近くが決まります。見直し時間を最後の5分必ず残そう。' },
  { id: 'jk_ex03', category: 'exam', subject: 'common', text: 'まとめプリントの「赤シートモード」で赤い枠を1回ずつタップすると、通学中や寝る前5分で暗記チェックができます。' },

  // 英語
  { id: 'jk_en01', category: 'englishTip', text: 'If it is sunny tomorrow のように「もし〜なら」の副詞節では、未来のことでも現在形を使います。' },
  { id: 'jk_en02', category: 'englishTip', text: '英作文で「楽しい」を書くとき I am fun はNG！ It is fun for me to ~ か I enjoy ~ing を使おう。' },
  { id: 'jk_en03', category: 'englishTip', text: 'look forward to ~ing の to は前置詞です。後ろは動詞の原形ではなく必ず動名詞（~ing）にしよう。' },
  { id: 'jk_en04', category: 'englishTip', text: '間接疑問文は「疑問詞＋主語＋動詞」の語順です。tell me what time the bus comes の順に並べよう。' },

  // 数学
  { id: 'jk_ma01', category: 'mathTip', text: '√(60−n) が「整数」になる自然数nを数えるときは、√0＝0 になるケースを絶対に忘れないようにしよう。' },
  { id: 'jk_ma02', category: 'mathTip', text: '関数 y＝ax² で x の変域が −3≦x≦2 のように 0 をまたぐとき、y の端の一方は必ず 0 になります。' },
  { id: 'jk_ma03', category: 'mathTip', text: '底面の半径 r、母線 l の円錐は、側面積＝πrl、展開図のおうぎ形の中心角＝360°×(r/l) で一瞬で出せます。' },
  { id: 'jk_ma04', category: 'mathTip', text: '箱ひげ図の横幅は「四分位範囲（第3四分位数−第1四分位数）」です。箱ひげ図だけでは平均値は断定できません。' },

  // 国語
  { id: 'jk_ja01', category: 'japaneseTip', text: '「走る・帰る・入る・切る・知る」は語尾が「る」でも、後ろに「ない」をつけるとア段になる五段活用です。' },
  { id: 'jk_ja02', category: 'japaneseTip', text: '「ない」の識別は「〜ぬ」に言い換えられるかで一発判定！ 言い換えられれば打消の助動詞です。' },
  { id: 'jk_ja03', category: 'japaneseTip', text: '古文の「をかし」は趣がある、「やがて」はすぐに、「ありがたし」はめったにない、という意味です。' },

  // 理科
  { id: 'jk_sc01', category: 'scienceTip', text: '有害なアンモニアを無害な尿素に変えるのは「肝臓」、尿素をこし出して尿をつくるのが「腎臓」です。' },
  { id: 'jk_sc02', category: 'scienceTip', text: '物体が完全に水中に沈んだあとは、もっと深く沈めても水圧は増えますが「浮力の大きさ」は変わりません。' },
  { id: 'jk_sc03', category: 'scienceTip', text: '金属と酸素の質量比は「銅：酸素＝4：1」「マグネシウム：酸素＝3：2」！ 酸化計算の最強の武器です。' },
  { id: 'jk_sc04', category: 'scienceTip', text: '内惑星の金星は真夜中には見えず、地球に近づくほど見かけは大きく、三日月形に細く欠けて見えます。' },

  // 社会
  { id: 'jk_so01', category: 'socialTip', text: '製造品出荷額1位で機械工業が約6割を占めるのが中京工業地帯！ 化学工業の割合が高いのは京葉・瀬戸内です。' },
  { id: 'jk_so02', category: 'socialTip', text: '不平等条約の改正は「1894年 陸奥宗光＝領事裁判権の撤廃 → 1911年 小村寿太郎＝関税自主権の回復」の順！' },
  { id: 'jk_so03', category: 'socialTip', text: '地方自治の条例制定・改廃は「有権者の1/50以上で首長へ」、解職（リコール）は「1/3以上で選挙管理委員会へ」請求します。' },
  { id: 'jk_so04', category: 'socialTip', text: '不況のとき、日本銀行は民間銀行から国債を「買い入れる（買いオペ）」ことで世の中のお金の量を増やします。' },
];

export const TIP_TOTAL = mascotTips.length;

export function tipScopeOf(tip: MascotTip): TipSubjectScope {
  return tip.subject ?? CATEGORY_SUBJECT[tip.category];
}

export function tipsForSubject(subject?: TipSubject): MascotTip[] {
  if (!subject) return mascotTips;
  return mascotTips.filter((tip) => {
    const scope = tipScopeOf(tip);
    return scope === 'common' || scope === subject;
  });
}
