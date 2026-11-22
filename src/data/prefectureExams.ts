/**
 * ===================================================================
 * 全国47都道府県 公立高校入試研究データベース（2026・2027年度対応 深掘り版）
 * ===================================================================
 *
 * 各教育委員会公表の令和8〜9年度（2026〜2027年春）入学者選抜要綱・実施要項に基づき、
 * ・学力検査の配点・試験時間・リスニング比重
 * ・解答形式（マークシート中心 / 記述＋記号標準 / 記述・思考力重視）
 * ・内申点（調査書）の正確な換算式パラメータ（中1・中2・中3重み、実技4教科倍率、換算満点）
 * ・当日点：内申点の標準比率・合格目安ライン（トップ校／上位校／中堅校）
 * ・英語外部検定（英検みなし得点・ESAT-J・特色選抜出願要件）の扱い
 * ・自校作成問題 / 学校選択問題 / A・B・C問題 / 特色検査の実施校名
 * ・2026〜2027年度の最新制度変更トピック
 * ・5教科の出題傾向・時間配分とマナトビ内直結単元
 * を網羅した研究データ。
 */

import type { SubjectKey } from './subjects';

export type RegionKey =
  | '北海道・東北'
  | '関東'
  | '中部・東海・北陸'
  | '近畿'
  | '中国・四国'
  | '九州・沖縄';

export type AnswerFormatType = '記述＋記号標準型' | 'マークシート中心型' | '記述・思考力重視型';
export type NaishinSpanType = '中1〜中3' | '中2〜中3' | '中3のみ';
export type EikenPolicyType =
  | 'みなし得点・換算あり'
  | '独自スピーキング加算'
  | '一部高校・特色選抜で加点・要件'
  | '調査書特記・高校裁量'
  | '県共通の加点規定なし';

/**
 * 内申点シミュレーター用の計算式パラメータ
 * 各学年の基礎点 = (主要5教科平均 × 5 × coreMult) + (実技4教科平均 × 4 × pracMult)
 * 素換算点 = j1Base × w1 + j2Base × w2 + j3Base × w3
 * ※ scaledMax が指定されている場合（例：東京 65点→300点換算、神奈川 135点→100点換算）は線形換算値も算出
 */
export interface NaishinFormulaSpec {
  w1: number;
  w2: number;
  w3: number;
  /** 主要5教科の係数（通常1、兵庫は4など） */
  coreMult: number;
  /** 実技4教科の係数（通常1、東京・宮城・京都は2、沖縄1.5、兵庫7.5など） */
  pracMult: number;
  /** 式の満点（素換算満点） */
  rawMax: number;
  /** 総合得点合算時の換算満点（例：東京300、埼玉300、神奈川100、大阪270など。未指定なら rawMax） */
  scaledMax?: number;
  /** 当日学力検査の満点（総合シミュレーション用：500, 250, 300, 450, 200, 110, 350 等） */
  examMax: number;
  /** 総合判定時の学力検査換算満点（例：東京700、大阪630、愛知220、既定は examMax） */
  examScaledMax?: number;
  /** 加算枠（東京ESAT-J 20点、兵庫第一志望加算25点など） */
  extraBonusMax?: number;
  extraBonusLabel?: string;
  /** 代表的な「当日点：内申点」比率ラベル */
  typicalRatioLabel: string;
  /** 計算式のわかりやすい1行説明 */
  formulaLabel: string;
}

export interface PrefectureExamInfo {
  code: number;
  id: string;
  name: string;
  shortName: string;
  region: RegionKey;
  /** 日本地図タイル上の座標 (col: 0..11, row: 0..8) */
  mapPos: [col: number, row: number];
  /** 次回一般選抜（令和9年度・2027年春）の学力検査日 MM-DD */
  examMonthDay: string;
  /** 合格発表日 MM-DD */
  resultMonthDay: string;
  examSystemName: string;
  scoreSummary: string;
  timePerSubject: string;
  /** 英語リスニングの配点・時間詳細 */
  listeningDetail: string;
  answerFormat: AnswerFormatType;
  naishinSpan: NaishinSpanType;
  naishinDetail: string;
  naishinFormula: NaishinFormulaSpec;
  eikenPolicyType: EikenPolicyType;
  eikenDetail: string;
  customProblem: string;
  /** 独自問題・上位進学校の代表校例 */
  representativeSchools: string;
  /** 2026〜2027年度の制度変更・注目ポイント */
  recentReform: string;
  keyFeature: string;
  subjectTrends: {
    english: string;
    math: string;
    japanese: string;
    science: string;
    social: string;
  };
  /** この都道府県で最優先すべきマナトビ内おすすめ単元ID */
  recommendedChapters: { chapterId: string; subject: SubjectKey; reason: string }[];
}

type RawPrefEntry = Omit<PrefectureExamInfo, 'recommendedChapters'> & {
  recommendedChapters?: PrefectureExamInfo['recommendedChapters'];
};

function buildRecommendedChapters(
  pref: Omit<PrefectureExamInfo, 'recommendedChapters'>,
): PrefectureExamInfo['recommendedChapters'] {
  if (pref.id === 'mie') {
    return [
      { chapterId: 'en3_1', subject: 'english', reason: '三重県後期 大問3の対話補充・条件英作文（2点×複数問・減点方式）に完全準拠！' },
      { chapterId: 'ma1_1', subject: 'math', reason: '大問1で毎年狙われる「平方根が自然数になるnの4パターン」と変域・箱ひげ図！' },
      { chapterId: 'sc3_1', subject: 'science', reason: '大問8構成（各分野2題）で必出の酸化銅4:1定比例・再結晶・イオン中和！' },
      { chapterId: 'so3_2', subject: 'social', reason: '三重県公民の定番：直接請求権の署名先・ドント式・日銀の公開市場操作！' },
    ];
  }
  if (pref.id === 'tokyo') {
    return [
      { chapterId: 'ma4_1', subject: 'math', reason: '都立大問1（46点分）で必出の作図・箱ひげ図・確率をノーミス完答！' },
      { chapterId: 'en4_2', subject: 'english', reason: '都立大問3・4の対話・Eメール長文と3文英作文の論理構成を突破！' },
      { chapterId: 'ja1_2', subject: 'japanese', reason: '都立名物「漢字読み10点＋書き10点」と200字意見作文の型を固める！' },
      { chapterId: 'so2_3', subject: 'social', reason: '複数統計クロス読み取り＆近現代史の年代整序マーク完答対策！' },
    ];
  }
  if (pref.id === 'kanagawa') {
    return [
      { chapterId: 'en2_2', subject: 'english', reason: '神奈川名物の文整序（並べ替え）と図表融合長文を高速で仕留める！' },
      { chapterId: 'ma2_2', subject: 'math', reason: '大問3・4で差がつく関数y=ax²と面積比・空間図形の最短距離！' },
      { chapterId: 'sc2_2', subject: 'science', reason: '全国屈指の精密完答マーク！電流・磁界・仕事率の計算を完璧に！' },
      { chapterId: 'so2_2', subject: 'social', reason: '神奈川の難関「歴史年代の完全並べ替え」と統計資料の消去法！' },
    ];
  }
  if (pref.id === 'saitama') {
    return [
      { chapterId: 'ma3_2', subject: 'math', reason: '2027マーク化対応＆学校選択問題で勝敗を分ける円・相似・三平方計量！' },
      { chapterId: 'en3_1', subject: 'english', reason: '学校選択問題の40〜50語英作文で減点されない論理構成と語彙言い換え！' },
      { chapterId: 'sc1_2', subject: 'science', reason: '長い会話リード文から実験条件を読み取る遺伝・酵素・光合成考察！' },
      { chapterId: 'so1_2', subject: 'social', reason: '地形図読図・雨温図・農業工業統計の正誤判定をスピード攻略！' },
    ];
  }
  if (pref.id === 'osaka') {
    return [
      { chapterId: 'en4_2', subject: 'english', reason: '大阪B・C問題の長文速読＆オールイングリッシュ設問・エッセイ対策！' },
      { chapterId: 'ma3_3', subject: 'math', reason: '文理学科C問題でも頻出の空間図形切断・体積比と関数融合問題！' },
      { chapterId: 'ja2_1', subject: 'japanese', reason: '硬質な論説文の論理構造把握と古文の主語特定トレーニング！' },
      { chapterId: 'sc3_2', subject: 'science', reason: '40分90点満点の時間勝負！化学電池・イオン数の変化グラフを即断！' },
    ];
  }
  if (pref.id === 'aichi') {
    return [
      { chapterId: 'ma2_2', subject: 'math', reason: '45分・22点満点フルマーク！関数と図形の計量を迷わず解き切る！' },
      { chapterId: 'sc3_2', subject: 'science', reason: '組み合わせ完答マークが中心！中和・イオン・電流実験の精密理解！' },
      { chapterId: 'so1_2', subject: 'social', reason: '中京工業地帯の統計比較・複数資料の正誤完答マークを完全攻略！' },
      { chapterId: 'en4_1', subject: 'english', reason: '筆記45分で対話・グラフ付き長文を処理する情報検索リーディング！' },
    ];
  }
  if (pref.id === 'fukuoka' || pref.id === 'hokkaido') {
    return [
      { chapterId: 'ma3_3', subject: 'math', reason: 'トップ校も共通問題！空間図形・関数の記述と計量で1点も落とさない！' },
      { chapterId: 'en3_1', subject: 'english', reason: '配点が高い意見英作文で満点を狙う2理由構成テンプレート！' },
      { chapterId: 'sc4_2', subject: 'science', reason: '全分野均等出題！湿度の計算・地震P波S波・金星の見え方を完全制覇！' },
      { chapterId: 'ja3_1', subject: 'japanese', reason: '資料読み取り型の条件作文と古文の心情・主語把握で高得点確保！' },
    ];
  }
  if (pref.answerFormat === 'マークシート中心型') {
    return [
      { chapterId: 'ma4_1', subject: 'math', reason: 'マークシート入試で必出の箱ひげ図・四分位範囲の正誤完答対策！' },
      { chapterId: 'en2_2', subject: 'english', reason: '空所補充・語順整序マークで差がつく関係代名詞・分詞・間接疑問！' },
      { chapterId: 'sc3_2', subject: 'science', reason: '完答式マークで狙われるダニエル電池・電気分解・中和イオン変化！' },
      { chapterId: 'so1_2', subject: 'social', reason: '地形図・雨温図・工業統計グラフのクロス読み取り演習！' },
    ];
  }
  if (pref.answerFormat === '記述・思考力重視型') {
    return [
      { chapterId: 'ja2_1', subject: 'japanese', reason: '記述大国で差がつく論説文の対比要約・理由説明の核心トレーニング！' },
      { chapterId: 'ma3_1', subject: 'math', reason: '部分点まで満点を取り切る合同・相似証明と関数の記述問題！' },
      { chapterId: 'sc1_1', subject: 'science', reason: '「対照実験を用意する理由」など定番の科学記述テンプレート習得！' },
      { chapterId: 'so3_1', subject: 'social', reason: '指定語句を使って説明する憲法・国会・経済の短文論述対策！' },
    ];
  }
  return [
    { chapterId: 'en3_1', subject: 'english', reason: '合否を分ける条件・テーマ英作文で減点ゼロを守る必須構文21選！' },
    { chapterId: 'ma2_1', subject: 'math', reason: '全県頻出！連立方程式文章題と関数 y=ax² の変域・変化の割合！' },
    { chapterId: 'sc2_1', subject: 'science', reason: '凸レンズの作図・オームの法則・電力量計算の鉄板パターン攻略！' },
    { chapterId: 'so2_1', subject: 'social', reason: '古代〜近現代の重要史料・外交貿易史・年代整序を総整理！' },
  ];
}

const RAW_ENTRIES: readonly RawPrefEntry[] = [
  // ==================== 北海道・東北 ====================
  {
    code: 1, id: 'hokkaido', name: '北海道', shortName: '北海道', region: '北海道・東北', mapPos: [10, 0],
    examMonthDay: '03-03', resultMonthDay: '03-16', examSystemName: '一般入学者選抜',
    scoreSummary: '500点満点（各100点×5教科 ※学校別傾斜配点あり）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・25〜30点（大問1：イラスト・対話・モノローグ応答）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '（中1素内申×2）＋（中2素内申×2）＋（中3素内申×3）＝315点満点を20点刻みでA〜Mの13段階ランクに区分。',
    naishinFormula: {
      w1: 2, w2: 2, w3: 3, coreMult: 1, pracMult: 1, rawMax: 315, examMax: 500,
      typicalRatioLabel: '第1枠 5:5 → 当日重視枠 7:3 → 内申重視枠',
      formulaLabel: '中1×2 ＋ 中2×2 ＋ 中3×3 ＝ 315点満点（Aランク296〜315点）',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '調査書の「資格・検定」欄に記載され、推薦入学者選抜や第3枠（個人調査書重視枠）で各高校の基準により評価。',
    customProblem: '全道共通問題（2022年度に学校裁量問題を廃止し思考力型の共通問題へ一本化＋一部進学校で英数理等の傾斜配点）',
    representativeSchools: '札幌南・札幌北・札幌西・札幌東・旭川東・函館中部',
    recentReform: '裁量問題廃止後の全道統一問題が定着。上位校向けに各教科終盤に発展的な思考・記述設問が配置される二層構造。',
    keyFeature: '名物「内申ランク（A〜Mランク）」制度！中1の成績が2倍で315点満点に入るため早期からの評定管理と、札幌東西南北を狙うなら高難度の終盤記述対策が不可欠。',
    subjectTrends: {
      english: '大問4〜5構成。図表・Webページ融合の実用文読解と25語前後の意見英作文が毎年出題。',
      math: '大問1小問集合の配点が高く、大問4関数・大問5平面/空間図形の証明と計量でトップ層の差がつく。',
      japanese: '漢字語句＋小説＋論説＋古文＋複数資料を読み比べる条件付き表現問題（記述）が定番。',
      science: '物理・化学・生物・地学4分野均等＋小問集合。実験データのグラフ化・理由記述・計算がバランスよく出る。',
      social: '世界/日本地理の地図統計、歴史の史料と時代整序、公民の経済・地方自治を組み合わせた融合大問が特徴。',
    },
  },
  {
    code: 2, id: 'aomori', name: '青森県', shortName: '青森', region: '北海道・東北', mapPos: [9, 1],
    examMonthDay: '03-04', resultMonthDay: '03-12', examSystemName: '県立高校入学者選抜',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '各50分（英語のみ55分）',
    listeningDetail: '約15分・約30点（英語が55分間のため放送問題が丁寧に出題）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3（45）＝135点満点（全学年均等評価）。全受検生に面接を実施する高校が多い。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 500,
      typicalRatioLabel: '当日500点 ： 内申135点（概ね7:3〜6:4基準）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '調査書の「資格・特技」欄に記入。特色ある入学者選抜の参考資料として活用。',
    customProblem: '全校共通問題',
    representativeSchools: '青森・弘前・八戸・青森東',
    recentReform: '前期・後期の区分ではなく一本化選抜が定着。英語のみ55分試験でリスニングと英作文の比重が高い。',
    keyFeature: '英語が55分試験！標準レベルの良問が多く、上位校（青森・弘前・八戸）では420〜450点以上の高得点勝負になりやすい。',
    subjectTrends: {
      english: '55分間でリスニング30点前後＋対話文・長文読解＋条件英作文。速読と正確な文法力が直結。',
      math: '大問5構成。計算・確率・一次/二次関数・円と相似証明の王道パターンをミスなく取り切る勝負。',
      japanese: '放送による聞き取り問題または話し合い資料＋現代文2題＋古文＋150〜200字程度の条件作文。',
      science: '4分野各1〜2題。実験操作の注意点、化学反応式、オーム・湿度・圧力などの基本計算が頻出。',
      social: '青森や東北関連の導入から広がる日本地理統計、歴史の並び替え、公民の三権分立・経済が頻出。',
    },
  },
  {
    code: 3, id: 'iwate', name: '岩手県', shortName: '岩手', region: '北海道・東北', mapPos: [10, 2],
    examMonthDay: '03-04', resultMonthDay: '03-15', examSystemName: '一般入学者選抜',
    scoreSummary: '500点満点（各100点×5）→ 学力・調査書とも1000点満点スケール換算',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約24点（対話応答・内容一致）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1×2（90）＋中2×3（135）＋中3×5（225）＝450点に特別活動等を加え500点満点化！学年が上がるほど急増する2:3:5傾斜。',
    naishinFormula: {
      w1: 2, w2: 3, w3: 5, coreMult: 1, pracMult: 1, rawMax: 450, scaledMax: 500, examMax: 500,
      typicalRatioLabel: 'A選考5:5 ／ B選考7:3（当日重視） ／ C選考3:7',
      formulaLabel: '中1×2 ＋ 中2×3 ＋ 中3×5 ＝ 450点（＋特活等で500点満点）',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '県共通の点数加算規定はなし（特色入学者選抜での自己PR材料として活用可）。',
    customProblem: '全校共通問題',
    representativeSchools: '盛岡第一・盛岡第三・一関第一・花巻北',
    recentReform: 'A選考（5:5）・B選考（学力重視）・C選考（調査書重視）の比率組み合わせで多角的に選抜。',
    keyFeature: '全国でも珍しい「中1：中2：中3＝2：3：5」傾斜内申！中3の評定1つが5倍で効き、さらにB選考で当日逆転も狙える。',
    subjectTrends: {
      english: '対話文・スピーチ長文の比重が大きく、イラストやテーマに対する英作文が出題される。',
      math: '小問集合の配点が高く、関数グラフ上の面積・動点、円の相似証明で実力差が出る。',
      japanese: '漢字・文法知識＋小説・論説の字数記述＋古文＋200字前後の条件作文。',
      science: '大問8前後で全分野を網羅。対照実験の理由記述・グラフ作図・計算が丁寧に出題。',
      social: '複数の地図・統計グラフを読み合わせて短文で説明させる思考力記述が多い。',
    },
  },
  {
    code: 4, id: 'miyagi', name: '宮城県', shortName: '宮城', region: '北海道・東北', mapPos: [10, 3],
    examMonthDay: '03-03', resultMonthDay: '03-15', examSystemName: '第一次募集（一般選抜）',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約25点（大問1：イラスト・対話・短い英文の聞き取り）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1〜中3すべて【主要5教科×1＋実技4教科×2＝65点】×3学年＝195点満点！中1の実技から2倍換算。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 2, rawMax: 195, examMax: 500,
      typicalRatioLabel: '共通選抜 当日7:内申3（上位校）／ 6:4 ／ 5:5＋特色選抜',
      formulaLabel: '（5教科×1 ＋ 実技4教科×2）× 3学年 ＝ 195点満点',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '調査書に記載され、特色選抜の審査資料（配点枠内）として各高校の方針に基づき評価。',
    customProblem: '全校共通問題',
    representativeSchools: '仙台第二・仙台第一・仙台第三・宮城第一・仙台二華',
    recentReform: '前期・後期一本化後の「共通選抜＋特色選抜」方式が定着。進学校は共通7:3・特色でも学力比重が高い。',
    keyFeature: '中1から実技4教科がすべて2倍（195点満点）！一方で仙台二高・一高などトップ層は当日7：内申3の共通選抜で高い記述力が試される。',
    subjectTrends: {
      english: '長文2題＋対話文＋テーマ英作文。注釈を活用しながら長い英文を読み解く持久力が必要。',
      math: '大問4構成で1問の配点が大きい！一次関数と二次関数の融合、円周角と相似証明が合否の分水嶺。',
      japanese: '漢字・語句・書写（行書の特徴）＋小説・論説＋古文＋資料読解型の条件作文。',
      science: '大問4題（物化生地各1題）に凝縮され、1つの実験を深く掘り下げる考察・計算問題が多い。',
      social: '資料の数が非常に多く、統計・地図・史料を関連づけて読み解く情報処理力が試される。',
    },
  },
  {
    code: 5, id: 'akita', name: '秋田県', shortName: '秋田', region: '北海道・東北', mapPos: [9, 2],
    examMonthDay: '03-04', resultMonthDay: '03-12', examSystemName: '一般選抜',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '国・数・英 各60分 ／ 理・社 各50分',
    listeningDetail: '約13分・約25点（60分試験の中で放送問題＋長文・英作）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1・中2・中3の9教科5段階評定を活用（中3重視換算や特別活動評価を含む総合判定）。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 180, examMax: 500,
      typicalRatioLabel: '当日点 ： 内申点 ＝ 7:3 〜 5:5（高校別）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3×2（90）＝ 180点目安',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '調査書・活動報告書に記入可能。特色選抜等で参考資料として活用。',
    customProblem: '全校共通問題（国・数・英が60分試験！）',
    representativeSchools: '秋田・秋田南・横手・大館鳳鳴',
    recentReform: '全国学力調査トップクラスを反映し、国数英60分の重厚な記述・思考力問題が出題される。',
    keyFeature: '国語・数学・英語がたっぷり60分！単なる暗記では太刀打ちできない「思考過程を書かせる」全国屈指の良問県。',
    subjectTrends: {
      english: '60分試験。スピーチ・対話長文の精読と、自分の立場・理由を明確に書く自由英作文が重視される。',
      math: '60分試験。途中の求め方や証明の記述配点が高く、規則性・関数・空間図形の応用が本格的。',
      japanese: '60分試験。現代文の要約・理由記述、古文の読解、グラフや資料を踏まえた条件作文が充実。',
      science: '仮説→実験→考察のプロセスを問う探究型問題と、定量的な計算問題がバランスよく出る。',
      social: '複数の統計表や歴史史料から背景・因果関係を言語化する短文論述が頻出。',
    },
  },
  {
    code: 6, id: 'yamagata', name: '山形県', shortName: '山形', region: '北海道・東北', mapPos: [9, 3],
    examMonthDay: '03-07', resultMonthDay: '03-17', examSystemName: '一般入学者選抜',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約25点（対話応答・モノローグ内容把握）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3×2（90）＝180点満点（中3評定が2倍換算！）。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 180, examMax: 500,
      typicalRatioLabel: '学力：内申 ＝ 5:5 ／ 6:4 ／ 7:3（高校別枠）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3×2（90）＝ 180点満点',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '調査書の特記事項欄に記入可能。推薦・特色選抜の参考資料。',
    customProblem: '全校共通問題',
    representativeSchools: '山形東・山形南・山形西・鶴岡南・米沢興譲館',
    recentReform: '日曜実施（3月7日頃）が多い伝統日程。5教科すべてで論理的記述を重視する出題が継続。',
    keyFeature: '中3内申が2倍（180点満点）＆全教科で「なぜそうなるか」を筋道立てて説明する記述力勝負！',
    subjectTrends: {
      english: '長文のテーマが深く、本文内容を踏まえて自分の考えを英語で書く意見英作文が定着。',
      math: '証明問題や途中の計算過程を書かせる設問が多く、関数と円・三平方の融合問題で差がつく。',
      japanese: '論説・小説とも字数指定の記述が多く、古文読解と条件作文の時間配分が重要。',
      science: '化学反応式・イオンモデル・物理グラフ作図・理由記述が満遍なく課される骨太な構成。',
      social: '地理・歴史・公民の分野横断問題や、統計資料の変化理由を問う記述が頻出。',
    },
  },
  {
    code: 7, id: 'fukushima', name: '福島県', shortName: '福島', region: '北海道・東北', mapPos: [10, 4],
    examMonthDay: '03-03', resultMonthDay: '03-15', examSystemName: '前期選抜（一般＋特色）',
    scoreSummary: '250点満点（各50点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・12〜15点（50点満点中の約25〜30%）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1〜中3の【主要5教科×1＋実技4教科×2＝65点】×3学年＝195点満点！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 2, rawMax: 195, examMax: 250,
      typicalRatioLabel: '当日250点 ： 内申195点（概ね1:1〜高校別換算）',
      formulaLabel: '（5教科×1 ＋ 実技4教科×2）× 3学年 ＝ 195点満点',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '調査書に記載、特色選抜の志願理由・審査で学校ごとに評価。',
    customProblem: '全校共通問題（高校・学科により特定教科の傾斜配点あり）',
    representativeSchools: '安積・福島・磐城・会津・橘',
    recentReform: 'Ⅰ期・Ⅱ期を統合した「前期選抜（一般選抜＋特色選抜）」に一本化。1教科50点満点で1点の重みが極大。',
    keyFeature: '50点×5＝250点満点に対し、内申は実技2倍の195点満点！中1からの副教科評定と、本番1点・2点を削り出す正確さが合否を決める。',
    subjectTrends: {
      english: '大問5構成。リスニング・対話補充・短文英作文・長文2題を50分で手際よく処理する。',
      math: '大問1・2の基本小問で確実に半分以上を取り、関数・空間図形の標準〜発展問題へ挑む。',
      japanese: '漢字・文法・古文・漢文の基礎配点が手厚く、現代文記述と条件作文でまとめる。',
      science: '大問8構成（各分野2題）で広く出題。苦手単元を作らない網羅学習が最大の武器。',
      social: '世界/日本地理・歴史（古代〜近現代）・公民が大問ごとに明快に分かれ、統計・年表が頻出。',
    },
  },

  // ==================== 関東 ====================
  {
    code: 8, id: 'ibaraki', name: '茨城県', shortName: '茨城', region: '関東', mapPos: [10, 5],
    examMonthDay: '02-25', resultMonthDay: '03-11', examSystemName: '共通選抜',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約13分・25〜30点（放送による対話・説明文の聞き取り）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3（45）＝135点満点。A群（学力・内申ともに基準内）→B群（学力重視枠・内申重視枠）の2段階選抜！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 500,
      typicalRatioLabel: 'A群共通 → B群（当日重視最大8:2 ／ 内申重視）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '調査書の諸活動欄に記載、特色選抜実施校で評価対象となる場合あり。',
    customProblem: '全校共通問題（水戸一・土浦一・竹園などは中高一貫併設化が進行）',
    representativeSchools: '水戸第一・土浦第一・竹園・竜ヶ崎第一・日立第一',
    recentReform: '2月下旬実施の早期日程。全国学力調査・共通テストを意識した会話リード・資料横断型の問題が定着。',
    keyFeature: 'B群の「学力重視選抜」があるため内申に不安があっても当日高得点で逆転合格が可能！情報量の多い新傾向問題への慣れが鍵。',
    subjectTrends: {
      english: 'プレゼンスライドやグラフを見ながら解く読解と、自分の考えを書く英作文が融合。',
      math: '小問・箱ひげ図の読み取り・動点や規則性の会話型問題・空間図形計量が特徴。',
      japanese: '生徒の話し合いやスライド資料と本文を結びつける実用的な読解・条件記述が目立つ。',
      science: '実験の振り返り会話から仮説や誤差要因を考えさせる思考力問題が増加。',
      social: '複数のグラフ・地図・カード資料を組み合わせた分野横断型の出題が多い。',
    },
  },
  {
    code: 9, id: 'tochigi', name: '栃木県', shortName: '栃木', region: '関東', mapPos: [9, 4],
    examMonthDay: '02-24', resultMonthDay: '03-12', examSystemName: '一般選抜',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約13分・約25点（質問選択・内容一致）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3（45）＝135点満点。高校ごとに当日点：内申点＝9:1、8:2、7:3、5:5などを設定！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 500,
      typicalRatioLabel: '上位校 当日9:内申1 ／ 標準校 7:3〜6:4',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一般選抜での一律加点規定なし（特色選抜での自己PRに活用）。',
    customProblem: '全校共通問題',
    representativeSchools: '宇都宮・宇都宮女子・栃木・大田原・石橋',
    recentReform: '2027年度（令和9年度）より一般選抜が2月下旬（2月24日頃）へ前倒し実施！早期の過去問仕上げが必須に。',
    keyFeature: '宇都宮高・宇女高などトップ校はなんと【当日点9：内申点1】！完全実力主義の本番勝負で、骨太な記述・応用問題が並ぶ。',
    subjectTrends: {
      english: '長文の総語数が多く、30語前後のまとまった自由英作文で論理性と文法正確性が問われる。',
      math: '大問5〜6構成。規則性の探究問題、証明、関数と図形の融合が重厚で時間配分が重要。',
      japanese: '漢字・書写・文法から古典、現代文の深い記述、200字超の意見作文まで総合力が試される。',
      science: '実験結果の数値処理・グラフ考察・理由記述のレベルが高く、上位校でも差がつく。',
      social: '用語知識だけでなく背景や理由を説明する短文記述が多く、本質理解が求められる。',
    },
  },
  {
    code: 10, id: 'gunma', name: '群馬県', shortName: '群馬', region: '関東', mapPos: [8, 4],
    examMonthDay: '02-16', resultMonthDay: '03-03', examSystemName: '入学者選抜（一本化・2日間）',
    scoreSummary: '500点満点（各100点×5 ※高校別傾斜あり）',
    timePerSubject: '国語45分 ／ 数・英・理・社 各50分（英語はリスニング別枠あり）',
    listeningDetail: '約15分・約25〜30点（2日目等に実施される聞き取り検査）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1〜中3の評定（高校により学年比重・実技比重を設定）＋面接等を高校別の総合比率で合算。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 180, examMax: 500,
      typicalRatioLabel: '高校別に学力（50〜80%）：調査書：面接を設定',
      formulaLabel: '中1〜中3評定（中3を2倍等にする高校多数・135〜180点基準）',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '調査書に記載でき、各高校の選抜基準により評価材料となる。',
    customProblem: '全校共通問題（2024年度より前期・後期を一本化）',
    representativeSchools: '前橋・前橋女子・高崎・高崎女子・太田',
    recentReform: '一本化新制度に加え、2月16日・17日と全国最速タイの時期に2日間日程で実施！',
    keyFeature: '全国最速クラス（2月中旬）の2日間入試！丁寧な誘導付きの思考力・記述問題が多く、国語は45分のため時間管理が鍵。',
    subjectTrends: {
      english: '対話補充と自由英作文の双方が出題され、複数の資料を読み取る実用長文も必出。',
      math: '会話文による誘導付きの活用問題・証明・関数融合が洗練されており読解力が要る。',
      japanese: '45分試験！現代文・古文融合や条件付き作文を時間切れなく書き切るスピードが命。',
      science: '日常現象と理科の法則を結びつける探究型大問と基本計算がバランスよく出る。',
      social: '世界・日本・歴史・公民を横断するテーマ史や複数グラフ記述が特徴。',
    },
  },
  {
    code: 11, id: 'saitama', name: '埼玉県', shortName: '埼玉', region: '関東', mapPos: [9, 5],
    examMonthDay: '02-25', resultMonthDay: '03-05', examSystemName: '共通選抜・特色選抜',
    scoreSummary: '500点満点（各100点×5）＋面接点',
    timePerSubject: '各50分',
    listeningDetail: '約13分・約28点（共通・学校選択ともリスニング共通）',
    answerFormat: 'マークシート中心型', naishinSpan: '中1〜中3',
    naishinDetail: '中1:中2:中3の比率を高校が【1:1:1（135点）／1:1:2（180点）／1:1:3（225点）】から選択し、200〜400点に換算！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 180, scaledMax: 300, examMax: 500,
      extraBonusMax: 60, extraBonusLabel: '面接点（My Voice等）',
      typicalRatioLabel: '1次 500:200〜300 ＋ 面接30〜60点（高校別）',
      formulaLabel: '中1:中2:中3＝1:1:2（180点 ※1:1:1や1:1:3の高校もあり）→換算',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '2027年度新制度より調査書の検定結果そのものへの一律加点枠は廃止され、面接（My Voice・自己評価資料）で学習過程を評価。',
    customProblem: '浦和・大宮など上位約22校は数学・英語で高難度の【学校選択問題】を実施！',
    representativeSchools: '県立浦和・浦和第一女子・大宮・春日部・川越・川越女子・市立浦和',
    recentReform: '【2027年度大改革】①全教科マークシート導入（約9割マーク・1割記述）、②国語作文廃止、③全受検生に面接「My Voice」＆自己評価資料導入、④調査書が評定中心へ変更！',
    keyFeature: '2027年度から全国屈指の大改革（マークシート9割化＋全員面接My Voice＋国語作文廃止）！ただし上位22校の「学校選択問題（数・英）」の難度は健在！',
    subjectTrends: {
      english: 'マーク化で情報処理速度がさらに重要に。学校選択問題は長文が長く40〜50語規模の英作文が残る。',
      math: '共通は基本〜標準マーク中心。学校選択問題は円・三平方・空間図形・関数の難問で記述も一部残存。',
      japanese: '2027年度より条件作文が廃止され、小説・論説・古典・実用資料の精密な読解選択が中心へ。',
      science: '会話形式の長いリード文と複数実験データのクロス読み取り完答マークが合否を分ける。',
      social: '地形図・雨温図・統計表・年代整序など、曖昧な記憶を許さない組み合わせマークが中心。',
    },
  },
  {
    code: 12, id: 'chiba', name: '千葉県', shortName: '千葉', region: '関東', mapPos: [10, 6],
    examMonthDay: '02-16', resultMonthDay: '03-02', examSystemName: '一般入学者選抜（2日間）',
    scoreSummary: '500点満点（各100点×5）＋内申（135×係数K）＋学校設定検査',
    timePerSubject: '国・数・理・社 各50分 ／ 英語のみ60分！',
    listeningDetail: '約13分・約27点（2026年度より原則1回読み放送へ変更！）',
    answerFormat: 'マークシート中心型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3（45）＝135点満点に高校別の係数K（進学校はK=0.5等で当日重視、標準はK=1）を乗じる。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 500,
      extraBonusMax: 20, extraBonusLabel: '学校設定検査（面接・自己表現等）',
      typicalRatioLabel: '学力500点 ： 内申135×K（進学校K=0.5なら67.5点で約88:12！）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点 × 係数K',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一般選抜の県共通加点規定なし（学校設定検査の自己表現等で言及可能）。',
    customProblem: '全校共通問題（思考力を問う記述＋マークシート併用）',
    representativeSchools: '県立千葉・県立船橋・東葛飾・佐倉・千葉東・薬園台',
    recentReform: '2026年度よりマークシート解答用紙を導入しつつ記述も残すハイブリッド形式へ移行＆英語リスニング1回放送化！',
    keyFeature: '2月16日・17日の早期2日間入試！英語は60分＆リスニング1回放送、国語にも放送聞き取り検査あり。トップ校は内申係数0.5で圧倒的当日点勝負！',
    subjectTrends: {
      english: '60分試験・リスニング1回読み！語彙・対話・イラスト英作文・長文3題と分量が多く集中力が鍵。',
      math: '小問集合・作図（手順考察含む）・関数y=ax²・円周角と相似・規則性の構成で高難度小問が混じる。',
      japanese: '放送による聞き取り検査＋漢字語彙＋論説・小説・古文＋資料を使った条件付き作文。',
      science: '大問9前後と小刻みに全単元から出題されるため、未習・苦手単元があると直撃する。',
      social: '世界・日本地理の地図統計、歴史の史料・並び替え、公民の経済・国際分野が満遍なく出る。',
    },
  },
  {
    code: 13, id: 'tokyo', name: '東京都', shortName: '東京', region: '関東', mapPos: [9, 6],
    examMonthDay: '02-21', resultMonthDay: '03-01', examSystemName: '第一次募集（都立一般）',
    scoreSummary: '学力700点換算＋換算内申300点＋ESAT-J 20点 ＝ 1020点満点',
    timePerSubject: '各50分',
    listeningDetail: '約10分・20点（自校作成校もリスニングは都立共通音源を使用）',
    answerFormat: 'マークシート中心型', naishinSpan: '中3のみ',
    naishinDetail: '【中3のみ】主要5教科×1（25点）＋実技4教科×2（40点）＝65点満点を300点満点に換算（オール4で換算52＝240点）！',
    naishinFormula: {
      w1: 0, w2: 0, w3: 1, coreMult: 1, pracMult: 2, rawMax: 65, scaledMax: 300,
      examMax: 500, examScaledMax: 700, extraBonusMax: 20, extraBonusLabel: 'ESAT-J（英語スピーキング）',
      typicalRatioLabel: '学力700点 ： 換算内申300点（7:3） ＋ ESAT-J 20点',
      formulaLabel: '中3のみ［5教科×1 ＋ 実技4教科×2 ＝ 65点］÷ 65 × 300',
    },
    eikenPolicyType: '独自スピーキング加算',
    eikenDetail: '英検加点はないが、全員受験の中学校英語スピーキングテスト【ESAT-J】がA=20点〜F=0点の6段階で総合点に直結加算！',
    customProblem: '進学指導重点校7校（日比谷・西・国立・戸山・青山・立川・八王子東）＋進学重視型単位制等で国・数・英が【自校作成問題】！',
    representativeSchools: '日比谷・西・国立・戸山・青山・立川・八王子東・新宿・国分寺・国際',
    recentReform: 'マークシート中心（記述は英作・数学証明/作図・国語200字作文など要所に配置）＋ESAT-J 20点加算が完全定着。',
    keyFeature: '中3成績のみ＆実技4教科が2倍（実技の「5」1つが約9.2点相当）＋ESAT-J 20点加算！7:3の1020点満点スケールで明確に計算できる。',
    subjectTrends: {
      english: '共通はマーク＋Eメール返信3文英作文（12点）。自校作成校は超長文読解と40〜60語級の本格自由英作文。',
      math: '共通は大問1だけで46点（作図含む）！大問3関数・大問4平面証明・大問5空間図形。自校作成は記述難問。',
      japanese: '漢字の読み10点＋書き10点＝20点が確実な得点源！小説・論説・古典融合と200字意見作文。',
      science: '全校共通。実験結果の表・グラフを組み合わせた「完答マーク（4点）」が多く精密な理解が必須。',
      social: '全校共通。白地図・複数統計・歴史年表・公民条文をクロスさせる完答マークと短文記述が名物。',
    },
  },
  {
    code: 14, id: 'kanagawa', name: '神奈川県', shortName: '神奈川', region: '関東', mapPos: [8, 6],
    examMonthDay: '02-16', resultMonthDay: '02-26', examSystemName: '共通選抜',
    scoreSummary: '学力500点＋内申（135点→100点換算）→ S1値（f:g比率）＋特色検査',
    timePerSubject: '各50分',
    listeningDetail: '約10分・21点（問1：対話応答・内容一致）',
    answerFormat: 'マークシート中心型', naishinSpan: '中2〜中3',
    naishinDetail: '中2の9教科（45点）＋中3の9教科×2（90点）＝135点満点を100点満点に換算し、学力（100点換算）と高校別比率f:g（例 7:3, 6:4, 5:5）で合算！',
    naishinFormula: {
      w1: 0, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 135, scaledMax: 100,
      examMax: 500, examScaledMax: 100, extraBonusMax: 50, extraBonusLabel: '特色検査（重点校等・最大50換算）',
      typicalRatioLabel: '第1次選考（90%）学力f：内申g（進学校は7:3や6:4＋特色検査）／第2次（10%）学力:主体性',
      formulaLabel: '中2（45）＋ 中3×2（90）＝ 135点満点（÷135×100でS1値算出）',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '県共通の英検加点規定はなし。',
    customProblem: '5教科は全校共通マークシートだが、学力向上進学重点校・エントリー校計18校等で教科横断型の【特色検査】を実施！',
    representativeSchools: '横浜翠嵐・湘南・柏陽・厚木・川和・希望ケ丘・光陵・多摩',
    recentReform: '2024年度に全員面接が廃止され第2次選考は学力＋主体性評価へ移行。さらに【2027年度より進学重点校等18校の特色検査にもマークシート方式を導入】！',
    keyFeature: '全国最速（2月16日）＆全問マークシート形式ながら、選択肢の紛らわしさ・情報処理難度は全国トップクラス！翠嵐・湘南志望は特色検査対策も必須。',
    subjectTrends: {
      english: '語彙・文法・名物「語順整序」・図表読解・長文対話まで全問マーク。速読と文構造把握が生命線。',
      math: '大問3の関数・円周角、大問4の確率、大問6の空間図形（曲面上の最短距離・体積比）がハイレベル。',
      japanese: '漢字・文法・敬語・古文・和歌/俳句・論説・小説・資料読解まで、二択まで絞らせてから深い選択肢が並ぶ。',
      science: '「XとYの組み合わせ」完答マークが大半を占め、計算力と正確な原理理解がないと得点が伸びない。',
      social: '名物「歴史4事象の完全年代整序」や複数統計クロス読み取りなど、共通テスト並みの精密さ。',
    },
  },

  // ==================== 中部・東海・北陸 ====================
  {
    code: 15, id: 'niigata', name: '新潟県', shortName: '新潟', region: '中部・東海・北陸', mapPos: [8, 3],
    examMonthDay: '02-25', resultMonthDay: '03-08', examSystemName: '一般選抜',
    scoreSummary: '500点満点→1000点満点総合スケール換算（＋一部学校独自検査）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約25〜30点',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3（45）＝135点満点。学力検査と調査書を各1000点換算し、高校別の比率（7:3、6:4、5:5等）で合算！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, scaledMax: 300,
      examMax: 500, examScaledMax: 700,
      typicalRatioLabel: '進学校 学力7：内申3（700:300） ／ 標準校 6:4・5:5',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '一部高校・特色選抜で加点・要件',
    eikenDetail: '国際フロンティア高校など一部高校の学校設定枠で英検等の資格加点（最大150点枠等）を実施。',
    customProblem: '全校共通問題（新潟・長岡など一部上位校で翌日等に学校独自検査・筆答検査を実施する場合あり）',
    representativeSchools: '新潟・新潟南・長岡・高田・三条',
    recentReform: '2月下旬（2月25日頃）へと日程が前倒しされ、標準〜発展の記述良問が安定した大問構成で出題。',
    keyFeature: '新潟高・長岡高など進学校は当日7：内申3の1000点換算！素直で質の高い問題が多く、過去問研究と記述演習が直結する。',
    subjectTrends: {
      english: 'リスニング＋対話文・スピーチ長文＋条件英作文のバランス型。',
      math: '小問集合・規則性や動点・関数・平面/空間図形の証明と計量が毎年安定して出題。',
      japanese: '漢字語彙・文法・小説・論説・古文・条件作文の王道構成。',
      science: '大問4題（物化生地各1題）で実験観察の手順・計算・理由記述が丁寧に出る。',
      social: '世界地理・日本地理・歴史・公民が大問ごとに整理され統計読み取りと短文記述が中心。',
    },
  },
  {
    code: 16, id: 'toyama', name: '富山県', shortName: '富山', region: '中部・東海・北陸', mapPos: [7, 4],
    examMonthDay: '03-09', resultMonthDay: '03-18', examSystemName: '一般入学者選抜（2日間）',
    scoreSummary: '200点満点（各40点×5教科）',
    timePerSubject: '国・数 各50分 ／ 英・理・社 各45分',
    listeningDetail: '約10分・約10点（40点満点中・45分試験内）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中2〜中3',
    naishinDetail: '中2の9教科（45点）＋中3の9教科×2（90点）＝135点＋特別活動等15点＝150点満点！',
    naishinFormula: {
      w1: 0, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 135, scaledMax: 150, examMax: 200,
      typicalRatioLabel: '当日200点 ： 内申150点（約4:3の拮抗バランス）',
      formulaLabel: '中2（45）＋ 中3×2（90）＝ 135点（＋特活15点で150点満点）',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '県共通の英検加点規定はなし。',
    customProblem: '全校共通問題',
    representativeSchools: '富山中部・富山・高岡・魚津・砺波',
    recentReform: '1教科40点満点（5教科200点）×内申150点という全国でもコンパクトな配点体系を維持。',
    keyFeature: '1教科40点満点＆英理社45分！中1の成績は入らず「中2＋中3×2」で決まるため、中2からの巻き返しとスピード処理力が鍵。',
    subjectTrends: {
      english: '45分間でリスニング・対話・長文・条件英作文をこなすため速読即解が必須。',
      math: '50分で大問6〜7題を解く構成。小問から関数・円・空間図形まで手際よく進める。',
      japanese: '言葉のきまり・古文・現代文2題・条件付き記述が凝縮。',
      science: '45分で大問8前後（各分野2題）を解くスピード勝負。基本計算と実験知識の即答力が重要。',
      social: '45分で地図・統計・年表を処理する問題量多めの構成。',
    },
  },
  {
    code: 17, id: 'ishikawa', name: '石川県', shortName: '石川', region: '中部・東海・北陸', mapPos: [6, 3],
    examMonthDay: '03-09', resultMonthDay: '03-17', examSystemName: '一般入学（2日間）',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約25点（3部構成の聞き取り）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3（45）＝135点満点を調査書として活用し、学力検査500点と総合判定。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 500,
      typicalRatioLabel: '進学校は当日500点の比重が極めて高い実力勝負',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一般入学での一律加点規定なし。',
    customProblem: '全校共通問題（全国屈指の高難度記述問題！）',
    representativeSchools: '金沢泉丘・金沢二水・金沢桜丘・小松・七尾',
    recentReform: '5教科合計の平均点が250〜270点前後になることも多い全国屈指の「記述・思考力難関県」。',
    keyFeature: '公立共通問題としては全国トップクラスの記述量と難度！部分点を積み上げる「白紙にしない記述力」が合否を決める。',
    subjectTrends: {
      english: '長文2題＋対話文に加え、まとまった語数で自分の考えを書く自由英作文の比重が高い。',
      math: 'コンパス作図・本格的な合同相似証明・二次関数・空間図形の体積と時間配分がシビア。',
      japanese: '現代文の字数指定記述が重く、古文読解＋200字前後の条件作文まで書く量が非常に多い。',
      science: '実験の原理説明記述・化学計算・物理計算ともに難度が高く本質理解が試される。',
      social: '「資料から読み取れることを〜の語を使って書け」という本格論述が全大問に配置される。',
    },
  },
  {
    code: 18, id: 'fukui', name: '福井県', shortName: '福井', region: '中部・東海・北陸', mapPos: [6, 4],
    examMonthDay: '02-18', resultMonthDay: '03-03', examSystemName: '一般入学者選抜（2日間）',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '国・数・理・社 各50分 ／ 英語60分',
    listeningDetail: '約15分・約25〜30点（60分試験内で充実した放送問題）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1〜中3の評定合計135点（中3成績を重視する高校方針とも照合）。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 500,
      typicalRatioLabel: '学力検査500点中心＋調査書135点総合判定',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '一部高校・特色選抜で加点・要件',
    eikenDetail: '高志高校（探究創造科）など一部高校の特色選抜で英検2級以上等を出願資格要件に設定！',
    customProblem: '全校共通問題（英語60分！）',
    representativeSchools: '藤島・高志・武生・若狭',
    recentReform: '2月18日・19日と北陸では突出して早い2月中旬実施！英語60分間で思考力・発信力を重視。',
    keyFeature: '全国学力トップ県・福井ならではの記述と思考力の良問揃い！2月中旬実施のため冬休み前の完成が必須。',
    subjectTrends: {
      english: '60分試験。長文の論理展開把握と自由英作文での表現力がしっかり問われる。',
      math: '証明・作図・規則性・空間図形の思考力問題が充実しており記述配点も高い。',
      japanese: '複数テクストや資料を比較統合する現代文記述と古典・意見作文。',
      science: '実験観察の条件制御や考察記述が多く、用語暗記だけでは解けない構成。',
      social: '統計グラフ・地図・史料を複数組み合わせた理由説明記述が頻出。',
    },
  },
  {
    code: 19, id: 'yamanashi', name: '山梨県', shortName: '山梨', region: '中部・東海・北陸', mapPos: [8, 5],
    examMonthDay: '03-03', resultMonthDay: '03-11', examSystemName: '後期募集',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '各50分（2027年度より英語も45分→50分へ拡大！）',
    listeningDetail: '約12分・30点（県がリスニング比重30%を明記！）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1〜中3の評定合計135点満点（高校により中3比重を高める換算あり）。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 500,
      typicalRatioLabel: '学力検査 ： 調査書 ＝ 5:5 〜 7:3（高校別）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '調査書の特記事項欄に記入可能（前期募集等で参考資料）。',
    customProblem: '全校共通問題',
    representativeSchools: '甲府南・甲府第一・甲府西・甲府東・吉田',
    recentReform: '2027年度入試より英語の試験時間が45分→50分に延長！リスニング30点満点の比重が大きい。',
    keyFeature: '英語リスニングが30点満点（30%）と高配点！全体的に基礎〜標準の良問が多く、ケアレスミス防止が高得点の鍵。',
    subjectTrends: {
      english: '50分化で長文と英作文の思考時間が確保しやすくなった一方、リスニング30点の取りこぼしは厳禁。',
      math: '大問1・2の基本小問で確実に得点し、関数・円と相似・空間図形で差をつける。',
      japanese: '漢字・文法・古典・現代文2題・条件作文のバランスのとれた出題。',
      science: '4分野各2題前後で定番実験の操作理由・計算が素直に出題される。',
      social: '盆地気候・果樹農業をはじめ地理統計・歴史通史・公民の基礎〜標準記述。',
    },
  },
  {
    code: 20, id: 'nagano', name: '長野県', shortName: '長野', region: '中部・東海・北陸', mapPos: [7, 5],
    examMonthDay: '03-09', resultMonthDay: '03-18', examSystemName: '後期選抜',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約25〜30点',
    answerFormat: '記述＋記号標準型', naishinSpan: '中3のみ',
    naishinDetail: '原則【中3のみ】9教科5段階＝45点満点！中1・中2の評定に関わらず中3の頑張りで勝負できる。',
    naishinFormula: {
      w1: 0, w2: 0, w3: 1, coreMult: 1, pracMult: 1, rawMax: 45, examMax: 500,
      typicalRatioLabel: '進学校 当日7:内申3 ／ 標準校 5:5（相関図方式併用）',
      formulaLabel: '中3のみ 9教科×5段階 ＝ 45点満点',
    },
    eikenPolicyType: '一部高校・特色選抜で加点・要件',
    eikenDetail: '長野西（国際教養）など一部高校の前期選抜で英語資格の取得を考慮。',
    customProblem: '全校共通問題',
    representativeSchools: '長野・松本深志・上田・諏訪清陵・伊那北',
    recentReform: '2025〜2027年度にかけて前期・後期制から再編議論が進む中、探究型・対話型の出題スタイルが深化。',
    keyFeature: '内申は【中3の45点満点】が中心！生徒のディスカッションや探究レポートを題材にした思考力問題が全教科で目立つ。',
    subjectTrends: {
      english: 'スピーチ・対話・資料読解と、自分の考えを英語で表現する条件英作文が中心。',
      math: '日常の事象や規則性を会話形式で数学的に考察させる大問が名物。',
      japanese: '話し合いやメモ資料と連動した読解記述・古典・条件作文。',
      science: '探究の過程（課題設定→対照実験→考察）を丁寧に追う問題構成。',
      social: '地図・複数統計グラフから地域的特色や背景を言語化する問題が頻出。',
    },
  },
  {
    code: 21, id: 'gifu', name: '岐阜県', shortName: '岐阜', region: '中部・東海・北陸', mapPos: [6, 5],
    examMonthDay: '03-03', resultMonthDay: '03-12', examSystemName: '第一次選抜',
    scoreSummary: '500点満点（各100点×5教科）＋独自検査',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約25点',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3×2（90）＝180点満点（中3が2倍！）。当日点と内申点を高校別比率（7:3〜8:2が多い）で換算！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 180, examMax: 500,
      typicalRatioLabel: '上位校 当日8:内申2 または 7:3 ／ 標準校 6:4・5:5',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3×2（90）＝ 180点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '県共通の加点規定はなし。',
    customProblem: '全校共通問題（特色化選抜・独自検査で面接や小論文等を課す高校あり）',
    representativeSchools: '岐阜・岐阜北・大垣北・多治見北・関',
    recentReform: 'Web出願導入と並行し、岐阜高などトップ進学校は当日8：内申2の圧倒的本番重視比率を採用。',
    keyFeature: '中3内申2倍（180点満点）かつ進学校は当日7:3〜8:2の本番重視！基礎〜発展まで非常にバランスの良い良問が揃う。',
    subjectTrends: {
      english: 'リスニング＋ポスター/メール資料読解＋物語・説明長文＋条件英作文。',
      math: '小問集合・確率/データ・関数・証明・空間図形と王道ながら終盤の難度が高い。',
      japanese: '漢字・文法・小説・論説・古文・条件付き表現問題（作文）。',
      science: '4分野均等出題で実験の理由記述と計算問題がバランスよく配置される。',
      social: '地形図・統計資料の読み取りと歴史・公民の因果関係記述が重視される。',
    },
  },
  {
    code: 22, id: 'shizuoka', name: '静岡県', shortName: '静岡', region: '中部・東海・北陸', mapPos: [7, 6],
    examMonthDay: '03-03', resultMonthDay: '03-12', examSystemName: '一般選抜',
    scoreSummary: '250点満点（各50点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・12〜14点（50点満点中）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中3のみ',
    naishinDetail: '【中3のみ】9教科5段階＝45点満点！第1段階は内申点中心で定員の大多数枠を絞り、最終段階は学力検査点重視で選抜する独自の段階選抜！',
    naishinFormula: {
      w1: 0, w2: 0, w3: 1, coreMult: 1, pracMult: 1, rawMax: 45, examMax: 250,
      typicalRatioLabel: '第1段階：内申45点足切り枠 → 共通枠・学力重視枠（250点勝負）',
      formulaLabel: '中3のみ 9教科×5段階 ＝ 45点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '県共通の加点規定はなし（学校裁量枠での自己PR等に活用）。',
    customProblem: '全校共通問題（全国でも数学・理科・英語の難度が高いことで有名！）',
    representativeSchools: '静岡・浜松北・沼津東・富士・清水東・藤枝東',
    recentReform: '50点×5＝250点満点の中で記述・思考力問題の比率が高く、上位校でも満点が出にくい実力識別型の良問。',
    keyFeature: 'まず「中3内申45点」の第1段階ラインに乗せることが大前提！その上で数学・理科・英語のハイレベルな記述・計算を攻略する二段構え。',
    subjectTrends: {
      english: '対話・長文の内容理解に加え、まとまった語数の自由英作文の配点比率が高い！',
      math: 'コンパス作図・証明・二次関数と円の融合など、250点満点県の中でも屈指の難度。',
      japanese: '現代文2題＋古文＋条件作文を50分でこなすため読解と記述のスピードが重要。',
      science: '対照実験の条件制御や化学・物理計算の難度が高く、丸暗記が通用しない。',
      social: '白地図・統計・年表と結びつけた短文記述が多く、正確な用語と背景理解が必要。',
    },
  },
  {
    code: 23, id: 'aichi', name: '愛知県', shortName: '愛知', region: '中部・東海・北陸', mapPos: [6, 6],
    examMonthDay: '02-24', resultMonthDay: '03-08', examSystemName: '一般選抜（A・Bグループ2校併願可）',
    scoreSummary: '学力110点（各22点×5）×2＝220点 ＋ 内申90点（Ⅰ〜Ⅴ型）',
    timePerSubject: '各45分（英語は聞き取り約10分＋筆記45分）',
    listeningDetail: '約10分・5〜6点（22点満点中）',
    answerFormat: 'マークシート中心型', naishinSpan: '中3のみ',
    naishinDetail: '【中3のみ】9教科5段階×2倍＝90点満点！高校ごとにⅠ型（内申90＋学力110）〜Ⅲ型（内申90＋学力110×1.5）〜Ⅴ型（内申90＋学力110×2＝310点満点）を選択！',
    naishinFormula: {
      w1: 0, w2: 0, w3: 2, coreMult: 1, pracMult: 1, rawMax: 90,
      examMax: 110, examScaledMax: 220,
      typicalRatioLabel: '進学校（Ⅴ型）当日220点 ： 内申90点 ≒ 7:3 ／ Ⅲ型 165:90 ／ Ⅰ型 110:90',
      formulaLabel: '中3のみ 9教科×5段階 × 2 ＝ 90点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一般選抜での一律加点規定なし（推薦選抜等の面接資料として活用）。',
    customProblem: '全国唯一の「公立A・Bグループ2校受験（学力検査は1回に統合）」＆【全問マークシート方式】！',
    representativeSchools: '旭丘・明和・岡崎・一宮・刈谷・時習館・向陽・菊里',
    recentReform: '2023年度より学力検査が1回に一本化＆完全マークシート化！1教科22点満点（×2倍で1問2〜4点相当）のため1マークの重みが極大。',
    keyFeature: '公立高校を最大2校併願できる神制度！ただし45分・22点満点のフルマークシートで「完答マーク」が連発するため、曖昧な知識では0点になる。',
    subjectTrends: {
      english: '筆記45分で対話・グラフ長文・整序マークを高速処理。語彙と文構造の瞬発力が鍵。',
      math: '45分・22点満点！小問を秒速で片付け、関数・円・空間図形の計量マークに時間を残す。',
      japanese: '漢字語句＋論説・小説・古文・漢文書き下し知識まで全問マーク。消去法の精度が命。',
      science: '「実験条件と結果の組み合わせ」完答マークだらけ！数値計算と対照実験の理解が必須。',
      social: '中京工業地帯・農業統計、歴史の時期判定、公民の複数正誤完答マークが名物。',
    },
  },
  {
    code: 24, id: 'mie', name: '三重県', shortName: '三重', region: '中部・東海・北陸', mapPos: [5, 6],
    examMonthDay: '03-09', resultMonthDay: '03-16', examSystemName: '後期選抜（一般選抜）',
    scoreSummary: '250点満点（各50点×5教科）',
    timePerSubject: '各45分！',
    listeningDetail: '約12分・12点前後（50点満点中・大問1）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中3のみ',
    naishinDetail: '原則【中3のみ】9教科5段階＝45点満点！第1段階（内申・当日ともに上位）→第2段階（当日点重視で定員の大部分を決定）→第3段階の3段階選抜！',
    naishinFormula: {
      w1: 0, w2: 0, w3: 1, coreMult: 1, pracMult: 1, rawMax: 45, examMax: 250,
      typicalRatioLabel: '第1段階（内申＋学力上位）→ 第2段階（当日250点重視！津・四日市等は本番勝負）',
      formulaLabel: '中3のみ 9教科×5段階 ＝ 45点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '後期選抜での県共通加点規定なし（前期選抜の自己PR・面接で活用）。',
    customProblem: '全校共通問題（四日市・津・伊勢・桑名・松阪などトップ校も共通250点満点で競う！）',
    representativeSchools: '四日市・津・伊勢・桑名・津西・四日市南・松阪・上野',
    recentReform: 'Web出願導入が進む一方、各教科45分・50点満点のスピード＆記述ハイブリッド型を堅持。四日市・津などは215〜230/250点の高得点争い！',
    keyFeature: '【本アプリの対策プリント完全準拠！】1教科わずか45分・50点満点（計250点）！内申は中3の45点のみで、第2段階の学力重視枠により当日の得点力で大逆転も可能！',
    subjectTrends: {
      english: '45分で大問5題！大問1リスニング→大問2対話→【大問3：対話補充＆テーマ英作文（1問2点の減点採点）】→大問4資料/メール→大問5長文！',
      math: '45分で大問5題！【大問1：計算・平方根自然数n・変域・ねじれ・箱ひげ図】【大問2：連立文章題・確率】で手堅く稼ぎ、大問3関数・大問4〜5円と相似証明へ！',
      japanese: '45分で漢字・文法・語彙＋小説＋論説＋古文＋資料読み取り条件作文（160〜200字）を解き切る時間配分が最大の鍵！',
      science: '【大問8構成（生物2・物理2・化学2・地学2）】！蒸散・遺伝・凸レンズ・オーム電力量・仕事率・定比例・イオン中和・湿度・地震・金星がサイクル出題！',
      social: '世界地理（図法・時差・雨温図）＋日本地理（地形図・工業農業統計）＋歴史（古代〜戦後・年代整序）＋公民（憲法・直接請求・ドント式・日銀金融政策）！',
    },
  },

  // ==================== 近畿 ====================
  {
    code: 25, id: 'shiga', name: '滋賀県', shortName: '滋賀', region: '近畿', mapPos: [5, 5],
    examMonthDay: '03-03', resultMonthDay: '03-11', examSystemName: '一般選抜',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約24〜28点',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3×2（90）＝180点満点（1:1:2型など高校設定）。一般選抜は当日7：内申3が主流！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 180, examMax: 500,
      typicalRatioLabel: '学力検査 ： 調査書 ＝ 7:3（一部 6:4・8:2）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3×2（90）＝ 180点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一般選抜での県共通加点規定なし。',
    customProblem: '一般選抜は全校共通問題（2月の特色選抜では記述・総合問題・小論文を実施）',
    representativeSchools: '膳所・彦根東・石山・守山・草津東',
    recentReform: '会話文や探究ノート形式の長いリード文から条件を整理させる全国屈指の思考力型出題が定着。',
    keyFeature: '問題冊子のページ数・文字数が非常に多く、条件整理力と記述力が問われる！膳所・彦根東志望なら特色選抜対策も相乗効果大。',
    subjectTrends: {
      english: '実用資料＋長文読解に加え、まとまった語数の英作文で発信力が問われる。',
      math: '身近な事象（料金プラン・図形デザイン等）を関数や方程式で解く活用問題が名物。',
      japanese: '現代文・古文ともに記述量が多く、複数資料を踏まえた条件作文も課される。',
      science: '生徒と先生の会話から実験計画や誤差を考察する探究型問題が多い。',
      social: '琵琶湖・近畿圏の地理歴史を含め、複数統計から根拠を挙げて書く論述が頻出。',
    },
  },
  {
    code: 26, id: 'kyoto', name: '京都府', shortName: '京都', region: '近畿', mapPos: [4, 4],
    examMonthDay: '03-08', resultMonthDay: '03-17', examSystemName: '中期選抜（一般選抜 ※前期は2/18）',
    scoreSummary: '中期選抜：学力200点（各40点×5）＋内申195点 ＝ 395点満点',
    timePerSubject: '中期：各40分（英語は筆記40分＋リスニング約10分）',
    listeningDetail: '約10分・8〜10点（40点満点中・別枠10分実施）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1〜中3すべて【主要5教科×1＋実技4教科×2＝65点】×3学年＝195点満点！中期選抜では学力200点：内申195点でほぼ1：1！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 2, rawMax: 195, examMax: 200,
      typicalRatioLabel: '中期選抜 当日200点 ： 内申195点（ほぼ 1 ： 1！）',
      formulaLabel: '（5教科×1 ＋ 実技4教科×2）× 3学年 ＝ 195点満点',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '活動実績報告書に資格を記入でき、前期選抜のA方式・B方式等で評価対象。',
    customProblem: '中期選抜（普通科）は全校共通問題 ／ 堀川・嵯峨野・西京などの専門学科（2月前期）は超難関の【自校作成問題】！',
    representativeSchools: '堀川・西京・嵯峨野・洛北・山城・桃山・南陽',
    recentReform: '前期選抜（2月18日頃・共通3教科または専門学科独自問題）と中期選抜（3月上旬・5教科各40分）の二段階構造。',
    keyFeature: '普通科本命の「中期選抜」は1教科40分・40点満点の超短時間決戦＆中1からの実技2倍内申（195点）が当日点（200点）とほぼ同等の重み！',
    subjectTrends: {
      english: '中期は筆記40分！長文・対話・語順整序を迷わず処理するテンポが命。専門学科は超長文記述。',
      math: '40分で小問・確率・関数・平面/空間図形を解き切るスピードと完答精度が問われる。',
      japanese: '40分で現代文と古文（和歌含む）を読み切るため、文法・敬語・主語把握の瞬発力が武器。',
      science: '4分野均等出題で組み合わせ完答選択と基本〜標準計算が中心。',
      social: '歴史都市京都らしく文化史・史料・地理統計・公民が洗練された選択肢で出題。',
    },
  },
  {
    code: 27, id: 'osaka', name: '大阪府', shortName: '大阪', region: '近畿', mapPos: [4, 6],
    examMonthDay: '03-10', resultMonthDay: '03-18', examSystemName: '一般入学者選抜',
    scoreSummary: '学力450点（各90点×5）＋内申450点 → タイプⅠ〜Ⅴで900点満点換算',
    timePerSubject: '国語45〜50分・数学45〜60分・英語55分・理社各40分（A/B/C問題による）',
    listeningDetail: 'B問題は15分・約20点、C問題は15分・約30点（高速・高難度！）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45×2＝90）＋中2（45×2＝90）＋中3（45×6＝270）＝450点満点（比率1:1:3）！タイプⅠ（進学校）は学力×1.4（630点）＋内申×0.6（270点）＝900点満点！',
    naishinFormula: {
      w1: 2, w2: 2, w3: 6, coreMult: 1, pracMult: 1, rawMax: 450, scaledMax: 270,
      examMax: 450, examScaledMax: 630,
      typicalRatioLabel: 'タイプⅠ 当日630:内申270（7:3）／ Ⅱ 540:360（6:4）／ Ⅲ 450:450（5:5）',
      formulaLabel: '中1×2（90）＋ 中2×2（90）＋ 中3×6（270）＝ 450点満点（1:1:3）',
    },
    eikenPolicyType: 'みなし得点・換算あり',
    eikenDetail: '【全国で唯一の府共通みなし得点制度】英検2級＝80%（72/90点）、英検準1級以上＝100%（90/90点）を保証し当日点と比較して高い方を採用！（TOEFL iBT / IELTS対応）',
    customProblem: '国・数・英は高校ごとに【A問題（基礎）・B問題（標準）・C問題（発展）】を選択！文理学科10校等のC問題は公立全国最高峰の難度！',
    representativeSchools: '北野・天王寺・三国丘・茨木・大手前・高津・四條畷・生野・豊中・岸和田',
    recentReform: '中1・中2も入る1:1:3内申（450点満点）と英検2級80%読み替えが令和9年度も継続！文理学科志望者の英検2級取得率は極めて高い。',
    keyFeature: '大阪の2大特徴は「国数英A・B・Cの3段階問題」と「英検2級＝80%・準1級＝100%のみなし得点保証」！理社は全校共通40分（90点満点）で超高配点！',
    subjectTrends: {
      english: 'C問題は本文も設問もオールイングリッシュ＋本格エッセイ！英検2級（72点保証）が文理学科の必須切符。',
      math: 'C問題は60分で難関私立級の空間図形・平面証明・整数/関数が出題。B問題も記述証明が鍵。',
      japanese: 'C問題は硬質な評論文の要約・記述＋古文＋300字近い小論文型作文で高度な論理力を要求。',
      science: '全校共通40分・90点満点！C問題受験生は理社で80/90点以上を確実に稼ぐのが合格の鉄則。',
      social: '全校共通40分・90点満点！テンポよく統計・歴史整序・公民制度を処理するスピードが重要。',
    },
  },
  {
    code: 28, id: 'hyogo', name: '兵庫県', shortName: '兵庫', region: '近畿', mapPos: [3, 5],
    examMonthDay: '03-11', resultMonthDay: '03-18', examSystemName: '一般選抜（複数志願選抜）',
    scoreSummary: '学力250点（各50点×5）＋内申250点 ＝ 500点満点（＋第一志望加算20〜25点）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・12点（100点素点中24点→50点換算で12点）',
    answerFormat: 'マークシート中心型', naishinSpan: '中3のみ',
    naishinDetail: '【中3のみ】主要5教科×4倍（100点）＋実技4教科×7.5倍（150点）＝250点満点！なんと内申の60%を実技4教科が占める全国最大の副教科重視換算！',
    naishinFormula: {
      w1: 0, w2: 0, w3: 1, coreMult: 4, pracMult: 7.5, rawMax: 250,
      examMax: 250, extraBonusMax: 25, extraBonusLabel: '第一志望加算点（学区により20〜25点）',
      typicalRatioLabel: '当日250点（素点500÷2） ： 内申250点 ＝ 5 ： 5（＋第一志望加算）',
      formulaLabel: '中3のみ［主要5教科×4 ＋ 実技4教科×7.5］＝ 250点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一般選抜での県共通加点規定なし（推薦入試等の調査書・面接で活用）。',
    customProblem: '一般選抜は全校共通問題（2月の推薦入試では専門学科・コースで適性検査・小論文を実施）',
    representativeSchools: '神戸・長田・兵庫・星陵・姫路西・加古川東・宝塚北・市立西宮',
    recentReform: '全国で最も遅い3月11日頃の学力検査。複数志願選抜（第2志望まで出願可・第1志望に20〜25点加算）の戦略性が極めて高い。',
    keyFeature: '実技4教科の評定1が「7.5点」（主要教科の約2倍）に化ける衝撃の250点内申！しかも当日の共通問題（マーク＋短答）は全国屈指の高難度・低平均点！',
    subjectTrends: {
      english: '英作文の出題が少なく、代わりに複数図表＋長文の情報統合リーディングが極めてハイレベル。',
      math: 'マーク＋数値記入形式。関数・確率・円と三平方の融合問題が重く、時間内に解き切るのが至難。',
      japanese: '条件作文がなく、漢字語彙・論説・小説・古文・漢文まで精緻な読解マークで実力を測る。',
      science: '完答式の組み合わせマークと計算問題が多く、平均点が50点（25/50点）前後になる年も珍しくない。',
      social: '地形図・複数統計・歴史史料を細かく照合させる正誤完答マークで差がつく。',
    },
  },
  {
    code: 29, id: 'nara', name: '奈良県', shortName: '奈良', region: '近畿', mapPos: [5, 7],
    examMonthDay: '03-10', resultMonthDay: '03-17', examSystemName: '一般選抜',
    scoreSummary: '250点満点（各50点×5 ※上位校で傾斜配点あり）＋内申135点',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約12点（50点満点中）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中2〜中3',
    naishinDetail: '中2の9教科（45点）＋中3の9教科×2（90点）＝135点満点！中1の評定は入らない。',
    naishinFormula: {
      w1: 0, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 250,
      typicalRatioLabel: '学力250点（奈良・畝傍・郡山は数英1.5倍等で300点化） ： 内申135点',
      formulaLabel: '中2（45）＋ 中3×2（90）＝ 135点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一般選抜での一律加点規定なし。',
    customProblem: '全校共通問題（奈良・畝傍・郡山など上位校は数・英・国に傾斜配点を設定）',
    representativeSchools: '奈良・畝傍・郡山・平城/国際・高田・橿原',
    recentReform: '特色選抜（2月下旬）と一般選抜（3月中旬）の2日程。上位進学校は英・数の傾斜配点で本番逆転力を重視。',
    keyFeature: '内申は「中2＋中3×2＝135点」！奈良・畝傍・郡山を目指すなら傾斜配点がかかる数学・英語での高得点が絶対条件。',
    subjectTrends: {
      english: '長文読解と自分の意見をまとめる自由英作文が出題され、速読と記述の両輪が必要。',
      math: '小問集合・関数・証明・空間図形とも良質な標準〜応用問題が揃う。',
      japanese: '現代文・古文に加え、表現・話し合いに関する問題と条件作文が出題。',
      science: '4分野均等出題で実験考察記述と計算がバランスよく問われる。',
      social: '古代史・文化財を含む歴史史料や地理・公民の統計記述が充実。',
    },
  },
  {
    code: 30, id: 'wakayama', name: '和歌山県', shortName: '和歌山', region: '近畿', mapPos: [4, 7],
    examMonthDay: '03-10', resultMonthDay: '03-18', examSystemName: '一般選抜',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約24点',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1〜中3の学習記録（特に中3評定および実技含む全体）と特別活動を点数化し学力500点と合算。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 180, examMax: 500,
      typicalRatioLabel: '当日500点重視（進学校は学力比重高め）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3×2（90）＝ 180点目安',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '県共通の加点規定なし。',
    customProblem: '全校共通問題',
    representativeSchools: '桐蔭・向陽・星林・海南・田辺',
    recentReform: '素直な標準問題が多く、基礎の徹底がそのまま得点に反映される王道入試。',
    keyFeature: '500点満点の王道入試！奇問・難問が少なく、教科書〜入試標準パターンを完璧に仕上げれば8割超えが狙える。',
    subjectTrends: {
      english: 'リスニング・対話・長文・条件英作文のオーソドックスな構成。',
      math: '大問1の計算・小問集合の配点が高く、ここを満点通過して関数・図形へ進むのが鉄則。',
      japanese: '漢字・文法・現代文2題・古文・条件作文の基本セット。',
      science: '化学反応式・イオン・オーム・植物・天体など頻出実験を網羅的に出題。',
      social: '雨温図・農業工業統計・歴史通史・公民の基本重要事項を幅広く問う。',
    },
  },

  // ==================== 中国・四国 ====================
  {
    code: 31, id: 'tottori', name: '鳥取県', shortName: '鳥取', region: '中国・四国', mapPos: [3, 4],
    examMonthDay: '03-04', resultMonthDay: '03-15', examSystemName: '一般入学者選抜',
    scoreSummary: '250点満点（各50点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約12点（50点満点中）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中3のみ',
    naishinDetail: '一般選抜の評定換算は【中3中心】（中1・中2参考、実技倍率設定パターンあり）で高校別に学力：調査書＝7:3〜5:5。',
    naishinFormula: {
      w1: 0, w2: 0, w3: 1, coreMult: 1, pracMult: 1, rawMax: 45, examMax: 250,
      typicalRatioLabel: '進学校 当日7：内申3 ／ 標準校 6:4・5:5',
      formulaLabel: '中3中心 9教科×5段階 ＝ 45点基準',
    },
    eikenPolicyType: '一部高校・特色選抜で加点・要件',
    eikenDetail: '鳥取西高校の特色選抜で英検準2級以上を出願要件の一つにするなど、特色選抜での活用が活発！',
    customProblem: '全校共通問題',
    representativeSchools: '鳥取西・米子東・鳥取東・倉吉東',
    recentReform: '50点×5＝250点満点＋全受検生面接（一部簡略化あり）。特色選抜での英語検定活用が注目。',
    keyFeature: '250点満点の標準良問型！米子東・鳥取西など上位校は当日7:3比率で1点の取りこぼしも許されない高得点勝負。',
    subjectTrends: {
      english: '対話文・スピーチ長文と条件英作文がバランスよく出題。',
      math: '小問集合・方程式・関数・証明の定番パターンを確実に仕留める力が必要。',
      japanese: '現代文2題＋古文＋200字程度の条件作文。',
      science: '4分野均等出題で実験観察の基礎理由記述と計算が中心。',
      social: '地理統計・歴史年表・公民制度の標準問題と短文記述。',
    },
  },
  {
    code: 32, id: 'shimane', name: '島根県', shortName: '島根', region: '中国・四国', mapPos: [2, 4],
    examMonthDay: '03-03', resultMonthDay: '03-15', examSystemName: '一般選抜',
    scoreSummary: '250点満点（各50点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約12点（50点満点中）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3×2（90）＝180点満点（または実技倍率加算式）で総合判定。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 180, examMax: 250,
      typicalRatioLabel: '学力250点と調査書点を段階・比率併用で選抜',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3×2（90）＝ 180点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '県共通の加点規定なし。',
    customProblem: '全校共通問題',
    representativeSchools: '松江北・松江南・松江東・出雲・浜田',
    recentReform: '250点満点の中に会話文・資料読解を介した思考力問題を各教科に配置。',
    keyFeature: '50点×5＝250点満点＆中3評定2倍！基礎知識＋グラフ・資料の読み取り記述で着実に得点を積み上げる。',
    subjectTrends: {
      english: 'リスニング＋対話・長文＋自分の考えを英語で書く英作文。',
      math: '小問集合・確率・関数・図形証明と計量のバランス構成。',
      japanese: '漢字・文法・小説・論説・古文・条件作文。',
      science: '実験の表・グラフからの数値読み取り計算と理由記述。',
      social: '地図・統計読み取りと歴史・公民の短文記述。',
    },
  },
  {
    code: 33, id: 'okayama', name: '岡山県', shortName: '岡山', region: '中国・四国', mapPos: [3, 5],
    examMonthDay: '03-09', resultMonthDay: '03-17', examSystemName: '一般入学者選抜',
    scoreSummary: '350点満点（各70点×5教科）＋内申200点',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約18〜20点（70点満点中）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45点）＋中2（45点）＋中3【主要5教科×2（50点）＋実技4教科×3（60点）＝110点】＝200点満点！中3実技が3倍！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 0, coreMult: 1, pracMult: 1, rawMax: 200, examMax: 350,
      typicalRatioLabel: '当日350点 ： 内申200点（高校別倍率換算あり）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（5教科×2＋実技4教科×3＝110）＝ 200点満点',
    },
    eikenPolicyType: '一部高校・特色選抜で加点・要件',
    eikenDetail: '2月の特別入学者選抜で英検3級〜2級以上を出願要件や評価項目にする高校・学科が多数！',
    customProblem: '全校共通問題（ただし県立トップの【岡山朝日高校のみ国・数・英で自校作成問題】を実施！）',
    representativeSchools: '岡山朝日・岡山操山・岡山芳泉・岡山一宮・倉敷青陵・津山',
    recentReform: '1教科70点×5＝350点満点という全国唯一の配点！中3実技3倍の200点内申と全受検生面接が特徴。',
    keyFeature: '全国唯一の「70点×5＝350点満点」＆中3実技が3倍になる200点内申！さらに岡山朝日高校志望者は独自の記述難問対策が必須。',
    subjectTrends: {
      english: '共通は対話・長文・条件英作文の良問。岡山朝日は本格的な長文和訳・英作文が出題。',
      math: '共通は小問・関数・円と相似・空間図形。岡山朝日は高難度の証明・図形計量。',
      japanese: '現代文・古文・資料を用いた表現問題（条件作文）。',
      science: '全校共通70点満点！会話形式で実験を振り返る考察記述と計算が頻出。',
      social: '全校共通70点満点！瀬戸内・中国地方を含む統計資料と結びつけた短文記述が多い。',
    },
  },
  {
    code: 34, id: 'hiroshima', name: '広島県', shortName: '広島', region: '中国・四国', mapPos: [2, 5],
    examMonthDay: '02-24', resultMonthDay: '03-08', examSystemName: '一次選抜（一本化）',
    scoreSummary: '学力250点（各50点×5）＋内申225点＋自己表現',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約12点（50点満点中）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3×3（135）＝225点満点！中1:中2:中3＝1:1:3で中3成績がなんと3倍！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 3, coreMult: 1, pracMult: 1, rawMax: 225, examMax: 250,
      extraBonusMax: 50, extraBonusLabel: '自己表現（カード記入＋口頭発表）',
      typicalRatioLabel: '基本 学力6 ： 内申2 ： 自己表現2（高校により比率変更可）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3×3（135）＝ 225点満点（1:1:3）',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一律加点はないが、全員実施の「自己表現」で英語学習や検定挑戦のプロセスをアピール可能。',
    customProblem: '全校共通問題＋全受検生にプレゼン型の【自己表現】を実施！',
    representativeSchools: '基町・舟入・安古市・福山誠之館・呉三津田・東広島（県立広島）',
    recentReform: '2月下旬実施！「学力6：調査書2：自己表現2」を基本とする先進的入試で、問題自体も全国屈指の思考力・記述型！',
    keyFeature: '中3内申が3倍（1:1:3）になるため中3での猛チャージが効く！さらに全教科で「複数資料から根拠を挙げて論述する」新傾向問題が名物。',
    subjectTrends: {
      english: 'グラフ・表を読み取ってまとまった語数で自分の意見を書くライティング配点が高い！',
      math: '会話リードの活用問題・証明・関数融合が多く、問題文を読み解く力が必要。',
      japanese: '複数テクスト・資料を比較統合して書く表現問題と古典・現代文記述。',
      science: '対照実験の計画立案や考察記述の比重が非常に高い探究型構成。',
      social: '複数の統計・史料から「なぜそう言えるか」を説明する本格論述が頻出。',
    },
  },
  {
    code: 35, id: 'yamaguchi', name: '山口県', shortName: '山口', region: '中国・四国', mapPos: [1, 5],
    examMonthDay: '03-09', resultMonthDay: '03-16', examSystemName: '第一次募集',
    scoreSummary: '250点満点（各50点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約12〜14点（50点満点中）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3（45）＝135点満点。第1段階（内申・当日とも上位）→第2段階（当日重視等）で選抜。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 250,
      typicalRatioLabel: '第1段階共通 → 第2段階（進学校は学力250点重視）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '一部高校・特色選抜で加点・要件',
    eikenDetail: '西京高校・防府西高校など一部高校の推薦・特色選抜で英検3級以上等を出願要件に設定。',
    customProblem: '全校共通問題（一部進学校で追加問題・傾斜配点の実績あり）',
    representativeSchools: '山口・徳山・宇部・下関西・岩国・防府',
    recentReform: '50点×5＝250点満点で大問数が多く、情報処理スピードと思考記述のバランスを重視。',
    keyFeature: '250点満点ながら大問数が多め（理科9大問前後など）！50分間で全単元を手際よく解き切る演習量がものを言う。',
    subjectTrends: {
      english: 'リスニング＋対話・スピーチ長文＋自由英作文のバランス構成。',
      math: '小問・データ活用（箱ひげ図）・作図・関数・証明が漏れなく出題。',
      japanese: '現代文・古文・漢文・条件作文まで幅広く問われるため時間管理が重要。',
      science: '小問＋4分野各2題で全学年の単元が網羅的に出題される。',
      social: '幕末明治維新をはじめとする歴史史料・地理統計・公民記述が充実。',
    },
  },
  {
    code: 36, id: 'tokushima', name: '徳島県', shortName: '徳島', region: '中国・四国', mapPos: [4, 8],
    examMonthDay: '03-03', resultMonthDay: '03-13', examSystemName: '一般選抜',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '国・数・英 各50分 ／ 理・社 各45分',
    listeningDetail: '約12分・約25点',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1〜中3の評定合計135点と特別活動等を総合評価（育成型選抜との2本立て）。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 500,
      typicalRatioLabel: '学力500点と調査書135点の相関・段階選抜',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '活動記録の「各種資格」欄に記入でき、育成型選抜等で評価。',
    customProblem: '全校共通問題',
    representativeSchools: '城東・城南・城ノ内・徳島北・富岡西',
    recentReform: '理科・社会が45分試験！基礎〜標準の記述と計算をテンポよく処理する構成。',
    keyFeature: '500点満点で素直な良問が多い一方、理社は45分試験のため見直し時間を含めたスピード配分が鍵！',
    subjectTrends: {
      english: '対話文・長文読解と条件英作文で基礎文法の運用力を測る。',
      math: '小問集合・方程式文章題・関数・円と相似証明の定番構成。',
      japanese: '漢字・表現知識・現代文・古文・条件作文。',
      science: '45分で実験グラフ作成・計算・理由記述を処理する実戦力が必要。',
      social: '45分で地形図・雨温図・統計資料と歴史・公民記述を解き切る。',
    },
  },
  {
    code: 37, id: 'kagawa', name: '香川県', shortName: '香川', region: '中国・四国', mapPos: [3, 7],
    examMonthDay: '03-09', resultMonthDay: '03-18', examSystemName: '一般選抜',
    scoreSummary: '学力250点（各50点×5）＋内申220点 ＝ 470点満点',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約12点（50点満点中）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1・中2【5教科×1＋実技4教科×2＝65点×2学年＝130点】＋中3【9教科×2＝90点】＝220点満点！独自の220点換算式！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1.5, rawMax: 220, examMax: 250,
      typicalRatioLabel: '当日250点 ： 内申220点（ほぼ1:1に近い総合勝負！）',
      formulaLabel: '中1・中2（5教科×1＋実技×2＝各65）＋ 中3（9教科×2＝90）＝ 220点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一般選抜での一律加点規定なし。',
    customProblem: '全校共通問題',
    representativeSchools: '高松・丸亀・高松第一・観音寺第一・三木',
    recentReform: '中1・中2の実技2倍＋中3全教科2倍＝220点というユニークな内申式と、骨太な250点学力検査の組み合わせ。',
    keyFeature: '中1・中2は実技2倍、中3は全9教科2倍で計220点！高松高・丸亀高を狙うなら内申200点超え＋骨太な記述・計算対策が必須。',
    subjectTrends: {
      english: 'リスニング・対話補充・長文・自由英作文と隙のない総合型。',
      math: 'コンパス作図・証明・二次関数と図形の融合問題が手応え十分。',
      japanese: '現代文・古文・漢文書き下し・条件作文まで網羅的に問われる。',
      science: '化学の定比例/イオン・物理の力学/電流・地学の天体など計算問題が充実。',
      social: '瀬戸内の気候農業をはじめ地理統計・歴史年代整序・公民記述が良質。',
    },
  },
  {
    code: 38, id: 'ehime', name: '愛媛県', shortName: '愛媛', region: '中国・四国', mapPos: [2, 7],
    examMonthDay: '03-04', resultMonthDay: '03-18', examSystemName: '一般入学者選抜（2日間）',
    scoreSummary: '250点満点（各50点×5教科）',
    timePerSubject: '国・英 各60分 ／ 数・理・社 各50分',
    listeningDetail: '約13分・約12〜15点（英語60分試験内）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3（45）＝135点満点。第1選抜（調査書上位層対象に学力等）→第2選抜（全員対象に学力重視7:3等）の2段階方式！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 250,
      typicalRatioLabel: '第1選抜（内申上位枠）→ 第2選抜（当日点重視）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '一部高校・特色選抜で加点・要件',
    eikenDetail: '特色入学者選抜で英検3級〜2級以上を出願資格要件とする高校が多く、西条（国際文理）では2級以上で英語小論文満点扱いも！',
    customProblem: '全校共通問題（国語・英語が60分試験！）',
    representativeSchools: '松山東・松山南・今治西・新居浜西・宇和島東',
    recentReform: '従来の推薦を刷新した「特色入学者選抜」で英検等の資格要件活用が拡大！一般は国・英60分の2日間日程。',
    keyFeature: '国語と英語がたっぷり60分！標準的な良問が多く、松山東などトップ校は225/250点（9割）近い超高得点争いになる。',
    subjectTrends: {
      english: '60分試験。リスニング・対話・長文・条件英作文を丁寧に見直して満点近くを狙う勝負。',
      math: '50分で小問・方程式・関数・円と相似証明をミスなく完答する正確さが鍵。',
      japanese: '60分試験。漢字・文法・現代文2題・古文・200字作文までじっくり取り組める。',
      science: '4分野から基本実験と定番計算が素直に出題されるため9割突破を目指したい。',
      social: '地図・統計・年表と政治経済の重要事項・短文記述を穴なく固める。',
    },
  },
  {
    code: 39, id: 'kochi', name: '高知県', shortName: '高知', region: '中国・四国', mapPos: [2, 8],
    examMonthDay: '03-03', resultMonthDay: '03-12', examSystemName: 'A日程（一般選抜）',
    scoreSummary: '250点満点（各50点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約12点（50点満点中）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中2〜中3',
    naishinDetail: '中2の9教科（45点）＋中3の9教科×2（90点）＝135点満点を中心に面接等と総合評価。',
    naishinFormula: {
      w1: 0, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 250,
      typicalRatioLabel: '学力250点 ＋ 調査書135点 ＋ 面接',
      formulaLabel: '中2（45）＋ 中3×2（90）＝ 135点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '県共通の加点規定なし。',
    customProblem: '全校共通問題',
    representativeSchools: '高知追手前・高知小津・高知丸の内・中村',
    recentReform: '私立中学・高校が多い県情勢の中、公立A日程は基礎〜標準の良問で着実な学力を測る。',
    keyFeature: '50点×5＝250点満点＆中2・中3評価！教科書〜標準問題を中心に基礎を徹底すれば大きく得点が伸びる。',
    subjectTrends: {
      english: '対話文・スピーチ長文読解と短文英作文の基礎固めが直結。',
      math: '大問1計算・小問集合の配点が高く、関数・図形の基本パターンが中心。',
      japanese: '漢字・語句・現代文・古文・条件作文のオーソドックス構成。',
      science: '植物・化学変化・電流・気象など入試定番単元の実験問題が中心。',
      social: '促成栽培など日本地理統計・歴史通史・公民基礎を幅広く出題。',
    },
  },

  // ==================== 九州・沖縄 ====================
  {
    code: 40, id: 'fukuoka', name: '福岡県', shortName: '福岡', region: '九州・沖縄', mapPos: [1, 6],
    examMonthDay: '03-09', resultMonthDay: '03-18', examSystemName: '一般入学者選抜',
    scoreSummary: '300点満点（各60点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約15点（60点満点中）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中3のみ',
    naishinDetail: '【中3のみ】9教科5段階＝45点満点！第13学区までの学区制が残り、修猷館・福岡・筑紫丘の御三家も共通問題300点満点で激突！',
    naishinFormula: {
      w1: 0, w2: 0, w3: 1, coreMult: 1, pracMult: 1, rawMax: 45, examMax: 300,
      typicalRatioLabel: '中3内申45点×当日300点の相関選抜（後半枠は当日点重視）',
      formulaLabel: '中3のみ 9教科×5段階 ＝ 45点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一般選抜での一律加点規定なし（特色化選抜での出願資格・自己PRに活用）。',
    customProblem: '全校共通問題（御三家含む全校が同じ300点満点問題を解く！）',
    representativeSchools: '修猷館・福岡・筑紫丘・小倉・東筑・明善・春日・宗像',
    recentReform: '特色化選抜の拡充が進む一方、一般入試は伝統の「60点×5＝300点満点＆中3内申45点」を堅持。',
    keyFeature: '修猷館・福岡・筑紫丘などの全国級トップ校も共通300点満点！中3内申40〜45を確保した上で、270/300点（9割）を目指す精密機械のような完成度が求められる。',
    subjectTrends: {
      english: '大問4構成。長文読解に加え、30〜40語規模で自分の意見と理由を書く自由英作文（10〜12点相当）が超重要！',
      math: '大問6構成！小問集合・規則性/文字式証明・一次関数活用・二次関数・平面証明・空間図形計量が毎年美しく並ぶ。',
      japanese: '漢字語彙＋論説＋小説＋古文＋グラフや資料を読み取って書く条件作文（160〜200字）。',
      science: '【大問8構成（生物2・化学2・物理2・地学2）】！三重県と同じく4分野8単元から漏れなく出題されるため穴を作れない！',
      social: '世界/日本地理・歴史・公民とも地図・統計・史料に基づく短文記述が豊富。',
    },
  },
  {
    code: 41, id: 'saga', name: '佐賀県', shortName: '佐賀', region: '九州・沖縄', mapPos: [0, 6],
    examMonthDay: '03-02', resultMonthDay: '03-10', examSystemName: '一般選抜（2日間）',
    scoreSummary: '250点満点（各50点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約12〜14点（50点満点中）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3×2（90）＝180点満点（中3が2倍換算！）。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 180, examMax: 250,
      typicalRatioLabel: '学力250点と調査書180点（高校別枠で当日重視・内申重視併用）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3×2（90）＝ 180点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一般選抜での県共通加点規定なし。',
    customProblem: '全校共通問題',
    representativeSchools: '佐賀西・致遠館・唐津東・武雄・鳥栖',
    recentReform: '3月2日・3日と九州では最も早い3月初旬の2日間日程。基礎〜標準の丁寧な記述・計算問題が中心。',
    keyFeature: '50点×5＝250点満点＆中3内申2倍！努力が素直に点数へ結びつく王道問題が多く、過去問反復の効果が絶大。',
    subjectTrends: {
      english: 'リスニング・対話・長文・条件英作文の標準構成。',
      math: '小問集合・連立文章題・関数・コンパス作図・証明がバランスよく出る。',
      japanese: '漢字・文法・現代文2題・古文・条件作文。',
      science: '4分野各2題（計8大問前後）で実験観察の理由記述と計算が出題。',
      social: '地理統計・歴史の流れ・公民の政治経済が素直に出題される。',
    },
  },
  {
    code: 42, id: 'nagasaki', name: '長崎県', shortName: '長崎', region: '九州・沖縄', mapPos: [0, 7],
    examMonthDay: '02-16', resultMonthDay: '03-04', examSystemName: '一般選抜（新制度・2日間）',
    scoreSummary: '500点満点（各100点×5 ※高校別傾斜あり）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約25点',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3（45）＝135点満点。学力検査・調査書・面接の比率を高校ごとに設定！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 500,
      typicalRatioLabel: '進学校 学力7〜8 ： 調査書・面接2〜3',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '県共通の加点規定なし（特別選抜等の自己PRで活用）。',
    customProblem: '全校共通問題',
    representativeSchools: '長崎西・長崎北陽台・長崎東・佐世保北・諫早',
    recentReform: '入試再編により【2月16日・17日と九州で唯一2月中旬に早期化】！首都圏と同じ最速スケジュールで仕上げる必要がある。',
    keyFeature: '九州で突出して早い2月16日実施！資料読解・会話リードなど思考力を問う新傾向問題が充実している。',
    subjectTrends: {
      english: '図表付き実用文・長文読解と、自分の考えを書く自由英作文。',
      math: '会話形式の活用問題・関数・空間図形と論理的な証明記述。',
      japanese: '実用資料・現代文・古典・条件作文の総合力構成。',
      science: '探究プロセスに沿った実験考察記述と計算問題。',
      social: '長崎ゆかりの外交・貿易史をはじめ複数資料を読み解く記述が頻出。',
    },
  },
  {
    code: 43, id: 'kumamoto', name: '熊本県', shortName: '熊本', region: '九州・沖縄', mapPos: [1, 7],
    examMonthDay: '03-04', resultMonthDay: '03-12', examSystemName: '後期選抜（2日間）',
    scoreSummary: '250点満点（各50点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約12〜13点（50点満点中）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3×2（90）＝180点満点！第1選考（学力・内申ともに順位内）→第2選考（当日250点順または補正合算）！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 180, examMax: 250,
      typicalRatioLabel: '第1選考（両方上位）→ 第2選考（学力検査重視枠あり）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3×2（90）＝ 180点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '後期選抜での県共通加点規定なし。',
    customProblem: '全校共通問題（九州屈指の高難度問題！）',
    representativeSchools: '熊本・済々黌・第二・第一・八代',
    recentReform: '250点満点ながら全国でも難度が高い思考力入試として知られ、熊本高・済々黌志望者でも数学・理科で激戦となる。',
    keyFeature: '九州最難関クラスの共通問題！50点満点の中に思考力を揺さぶる長文・関数・図形・実験考察が詰まっている。',
    subjectTrends: {
      english: '総語数が多く、グラフ読み取り対話と自由英作文のレベルが高い。',
      math: '規則性・二次関数・円と三平方・空間図形の応用問題がハイレベルで時間配分が鍵。',
      japanese: '現代文・古文・漢文・条件作文まで深い読解力と記述力を要求。',
      science: '実験データの数値処理・計算・考察記述ともに手応えが強い良問揃い。',
      social: '複数資料を関連づける短文論述と年代整序で実力差がはっきり出る。',
    },
  },
  {
    code: 44, id: 'oita', name: '大分県', shortName: '大分', region: '九州・沖縄', mapPos: [2, 6],
    examMonthDay: '03-03', resultMonthDay: '03-12', examSystemName: '第一次入学者選抜',
    scoreSummary: '300点満点（各60点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約15点（60点満点中）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3×2（90）＝180点（高校により実技倍率や当日：内申＝8:2、7:3を設定）！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 2, coreMult: 1, pracMult: 1, rawMax: 180, examMax: 300,
      typicalRatioLabel: '上位校 当日8：内申2 または 7：3（本番得点重視！）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3×2（90）＝ 180点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '県共通の加点規定なし。',
    customProblem: '全校共通問題',
    representativeSchools: '大分上野丘・大分舞鶴・大分豊府・中津南・日田',
    recentReform: '福岡と同じ60点×5＝300点満点！大分上野丘・舞鶴など上位校は当日点8:2〜7:3で本番の実力を強く重視。',
    keyFeature: '60点×5＝300点満点＆進学校は当日8：内申2！記述・活用問題の比率が高く、実戦演習量がそのまま勝敗を決める。',
    subjectTrends: {
      english: 'リスニング＋対話・長文＋条件英作文で速読力と英作表現力が必要。',
      math: '小問・関数・作図・図形証明・空間図形まで総合力を試す本格構成。',
      japanese: '漢字・文法・現代文・古典・資料条件作文のバランス出題。',
      science: '4分野均等で対照実験の理由記述・化学計算・物理グラフが頻出。',
      social: '地形図・統計グラフ・歴史年表・公民記述がバランスよく出る。',
    },
  },
  {
    code: 45, id: 'miyazaki', name: '宮崎県', shortName: '宮崎', region: '九州・沖縄', mapPos: [1, 8],
    examMonthDay: '03-03', resultMonthDay: '03-17', examSystemName: '一般入学者選抜（2日間）',
    scoreSummary: '500点満点（各100点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約25点',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1（45）＋中2（45）＋中3（45）＝135点満点と特別活動・面接を総合評価（推薦選抜を刷新した新制度と併用）。',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1, rawMax: 135, examMax: 500,
      typicalRatioLabel: '学力500点 ： 調査書135点（進学校は学力比重高め）',
      formulaLabel: '中1（45）＋ 中2（45）＋ 中3（45）＝ 135点満点',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '調査書の「資格・特技等」欄に級を記入可能。',
    customProblem: '全校共通問題',
    representativeSchools: '宮崎西・宮崎大宮・都城泉ヶ丘・延岡',
    recentReform: '500点満点の2日間日程。基礎〜標準レベルの良問が多く、高得点での安定感が求められる。',
    keyFeature: '500点満点の王道入試！基本・標準問題を落とさず、終盤の関数・図形・英作文・科学計算で着実に差をつける。',
    subjectTrends: {
      english: 'リスニング・対話・長文読解と条件英作文の基本セット。',
      math: '小問集合・方程式・関数・証明・空間図形の王道パターン。',
      japanese: '現代文・古文・漢文・条件作文まで丁寧に出題。',
      science: '実験観察の基本操作・用語・定番計算が素直に出題される。',
      social: '促成栽培・畜産をはじめとする地理統計・歴史・公民の基本〜標準。',
    },
  },
  {
    code: 46, id: 'kagoshima', name: '鹿児島県', shortName: '鹿児島', region: '九州・沖縄', mapPos: [0, 8],
    examMonthDay: '03-03', resultMonthDay: '03-12', examSystemName: '一般入学者選抜（2日間）',
    scoreSummary: '450点満点（各90点×5教科）',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約20〜24点（90点満点中）',
    answerFormat: '記述・思考力重視型', naishinSpan: '中3のみ',
    naishinDetail: '一般選抜の合否判定に使われる換算内申は【中3のみ】主要5教科×2倍（50点）＋実技4教科×20倍（400点）＝450点満点（※基礎計算上、実技比重が極めて大きい独自式）！',
    naishinFormula: {
      w1: 0, w2: 0, w3: 1, coreMult: 2, pracMult: 20, rawMax: 450, examMax: 450,
      typicalRatioLabel: '学力450点と調査書換算点を総合判定（上位校は学力重視）',
      formulaLabel: '中3のみ［主要5教科×2（50）＋ 実技4教科×20（400）］＝ 450点満点',
    },
    eikenPolicyType: '県共通の加点規定なし',
    eikenDetail: '一般選抜での県共通加点規定なし。',
    customProblem: '全校共通問題',
    representativeSchools: '鶴丸・甲南・鹿児島中央・武岡台・加治木',
    recentReform: '1教科90点×5＝450点満点という独自配点！調査書換算では実技4教科が20倍される独自ルールに要注意。',
    keyFeature: '90点×5＝450点満点！鶴丸・甲南を狙う層は記述・思考力問題での高得点に加え、中3実技4教科の評定確保が極めて重要。',
    subjectTrends: {
      english: '長文読解＋まとまった語数の英作文が出題され記述配点が高め。',
      math: '小問・規則性・関数・円・空間図形の応用で思考力が試される。',
      japanese: '現代文・古文・漢文・200字前後の条件作文まで重厚な構成。',
      science: '4分野大問で実験の理由記述と計算がしっかり問われる。',
      social: '薩摩・明治維新史をはじめ地理・歴史・公民の短文論述が多い。',
    },
  },
  {
    code: 47, id: 'okinawa', name: '沖縄県', shortName: '沖縄', region: '九州・沖縄', mapPos: [0, 9],
    examMonthDay: '03-03', resultMonthDay: '03-17', examSystemName: '一般入学者選抜（2日間）',
    scoreSummary: '300点満点（各60点×5教科）＋内申165点',
    timePerSubject: '各50分',
    listeningDetail: '約12分・約15点（60点満点中）',
    answerFormat: '記述＋記号標準型', naishinSpan: '中1〜中3',
    naishinDetail: '中1〜中3すべて【主要5教科×1（25点）＋実技4教科×1.5（30点）＝55点】×3学年＝165点満点！実技1.5倍！',
    naishinFormula: {
      w1: 1, w2: 1, w3: 1, coreMult: 1, pracMult: 1.5, rawMax: 165, examMax: 300,
      typicalRatioLabel: '標準 学力5：内申5 ／ 進学校 学力7：内申3 または 6：4',
      formulaLabel: '（5教科×1 ＋ 実技4教科×1.5 ＝ 55点）× 3学年 ＝ 165点満点',
    },
    eikenPolicyType: '調査書特記・高校裁量',
    eikenDetail: '調査書に英検等の級を記入でき、実績評価や面接で活用。',
    customProblem: '全校共通問題（高校別に学力：内申比率を5:5〜7:3で設定）',
    representativeSchools: '球陽・那覇国際・開邦・首里・那覇・向陽',
    recentReform: '2024年度に推薦と一般を再編した新制度（特色選抜＋一般選抜）へ移行。60点×5＝300点満点×内申165点。',
    keyFeature: '60点×5＝300点満点＆中1から実技4教科1.5倍（165点満点）！基礎〜標準問題を確実に固めることで大きく飛躍できる。',
    subjectTrends: {
      english: 'リスニング＋対話・長文＋条件英作文の素直な構成。',
      math: '大問1・2の基本計算・小問配点が高く、ここを取り切って関数・図形へ挑む。',
      japanese: '漢字・文法知識・現代文・古文・条件作文。',
      science: '観察実験・化学反応式・オームや湿度などの定番計算が頻出。',
      social: '琉球王国・沖縄戦後史を含め地理統計・歴史・公民が幅広く出る。',
    },
  },
];

export const PREFECTURE_EXAMS: readonly PrefectureExamInfo[] = RAW_ENTRIES.map((entry) => ({
  ...entry,
  recommendedChapters: entry.recommendedChapters ?? buildRecommendedChapters(entry),
}));

/**
 * 通知表の評定（1〜5、小数可）から指定都道府県の換算内申点と得点率・目標当日点を算出する純関数
 */
export interface GradeInput {
  /** 中1 主要5教科の平均評定 (1.0〜5.0) */
  j1Core: number;
  /** 中1 実技4教科の平均評定 (1.0〜5.0) */
  j1Prac: number;
  /** 中2 主要5教科の平均評定 (1.0〜5.0) */
  j2Core: number;
  /** 中2 実技4教科の平均評定 (1.0〜5.0) */
  j2Prac: number;
  /** 中3 主要5教科の平均評定 (1.0〜5.0) */
  j3Core: number;
  /** 中3 実技4教科の平均評定 (1.0〜5.0) */
  j3Prac: number;
}

export interface NaishinSimResult {
  rawScore: number;
  rawMax: number;
  scaledScore: number;
  scaledMax: number;
  percentage: number;
  /** 北海道ランク等の特別表記があれば返す */
  specialBadge?: string;
  /** 志望レベル別に必要な当日学力検査の目安得点（examMax満点中） */
  targetExamScores: {
    tier: 'トップ進学校（偏差値66+）' | '上位進学校（偏差値60前後）' | '中堅人気校（偏差値52前後）';
    requiredScore: number;
    examMax: number;
    perSubjectAvg: number;
  }[];
}

export function simulatePrefectureNaishin(pref: PrefectureExamInfo, g: GradeInput): NaishinSimResult {
  const f = pref.naishinFormula;
  let rawScore = 0;

  // 岡山・香川など学年ごとに実技倍率が異なる特殊ケースも正確に計算
  if (pref.id === 'okayama') {
    const j1 = g.j1Core * 5 + g.j1Prac * 4;
    const j2 = g.j2Core * 5 + g.j2Prac * 4;
    const j3 = g.j3Core * 5 * 2 + g.j3Prac * 4 * 3;
    rawScore = Math.round((j1 + j2 + j3) * 10) / 10;
  } else if (pref.id === 'kagawa') {
    const j1 = g.j1Core * 5 * 1 + g.j1Prac * 4 * 2;
    const j2 = g.j2Core * 5 * 1 + g.j2Prac * 4 * 2;
    const j3 = (g.j3Core * 5 + g.j3Prac * 4) * 2;
    rawScore = Math.round((j1 + j2 + j3) * 10) / 10;
  } else {
    const baseOf = (core: number, prac: number) =>
      core * 5 * f.coreMult + prac * 4 * f.pracMult;
    const raw =
      baseOf(g.j1Core, g.j1Prac) * f.w1 +
      baseOf(g.j2Core, g.j2Prac) * f.w2 +
      baseOf(g.j3Core, g.j3Prac) * f.w3;
    rawScore = Math.round(raw * 10) / 10;
  }

  rawScore = Math.min(f.rawMax, Math.max(0, rawScore));
  const percentage = f.rawMax > 0 ? Math.round((rawScore / f.rawMax) * 1000) / 10 : 0;
  const scaledMax = f.scaledMax ?? f.rawMax;
  const scaledScore =
    f.scaledMax && f.rawMax > 0
      ? Math.floor((rawScore / f.rawMax) * f.scaledMax)
      : rawScore;

  let specialBadge: string | undefined;
  if (pref.id === 'hokkaido') {
    const ranks = [
      [296, 'Aランク'], [276, 'Bランク'], [256, 'Cランク'], [236, 'Dランク'],
      [216, 'Eランク'], [196, 'Fランク'], [176, 'Gランク'], [156, 'Hランク'],
      [136, 'Iランク'], [116, 'Jランク'], [96, 'Kランク'], [76, 'Lランク'], [0, 'Mランク'],
    ] as const;
    const found = ranks.find(([min]) => rawScore >= min);
    specialBadge = found ? `北海道 ${found[1]}（${Math.round(rawScore)}/315）` : undefined;
  } else if (pref.id === 'tokyo') {
    specialBadge = `換算内申 ${Math.round(rawScore)}/65 → 総合換算 ${scaledScore}/300点`;
  } else if (pref.id === 'hyogo') {
    specialBadge = `兵庫内申 ${rawScore}/250点（実技4教科分：${Math.round(g.j3Prac * 4 * 7.5 * 10) / 10}/150点）`;
  } else if (pref.id === 'osaka') {
    specialBadge = `大阪タイプⅠ内申 ${Math.round(rawScore * 0.6)}/270点（素換算 ${Math.round(rawScore)}/450点）`;
  }

  // 総合目標率（トップ86%・上位76%・中堅64%）に対し、内申の貯金/ビハインドを加味した必要当日点を逆算
  // 総合スコア = 0.7 * 当日率 + 0.3 * 内申率（兵庫・京都など1:1県は 0.52 : 0.48 で補正）
  const isHalfNaishin = pref.id === 'hyogo' || pref.id === 'kyoto' || pref.id === 'kagawa' || pref.id === 'fukushima';
  const wExam = isHalfNaishin ? 0.55 : 0.7;
  const wNai = 1 - wExam;
  const naiRate = percentage / 100;

  const tiers: {
    tier: 'トップ進学校（偏差値66+）' | '上位進学校（偏差値60前後）' | '中堅人気校（偏差値52前後）';
    targetTotalRate: number;
  }[] = [
    { tier: 'トップ進学校（偏差値66+）', targetTotalRate: 0.86 },
    { tier: '上位進学校（偏差値60前後）', targetTotalRate: 0.75 },
    { tier: '中堅人気校（偏差値52前後）', targetTotalRate: 0.63 },
  ];

  const targetExamScores = tiers.map(({ tier, targetTotalRate }) => {
    const neededExamRate = Math.min(0.98, Math.max(0.35, (targetTotalRate - wNai * naiRate) / wExam));
    const requiredScore = Math.round(neededExamRate * f.examMax);
    const perSubjectAvg = Math.round((requiredScore / 5) * 10) / 10;
    return {
      tier,
      requiredScore,
      examMax: f.examMax,
      perSubjectAvg,
    };
  });

  return {
    rawScore,
    rawMax: f.rawMax,
    scaledScore,
    scaledMax,
    percentage,
    specialBadge,
    targetExamScores,
  };
}

export const TARGET_PREF_STORAGE_KEY = 'mntb_juken_target_pref';

/** 既定の志望県は送付プリント準拠の三重県（'mie'） */
export function getSavedTargetPrefecture(): PrefectureExamInfo {
  try {
    const savedId = localStorage.getItem(TARGET_PREF_STORAGE_KEY);
    if (savedId) {
      const found = PREFECTURE_EXAMS.find((p) => p.id === savedId);
      if (found) return found;
    }
  } catch {
    // ignore
  }
  return PREFECTURE_EXAMS.find((p) => p.id === 'mie') ?? PREFECTURE_EXAMS[12];
}

export function saveTargetPrefecture(prefId: string): PrefectureExamInfo {
  const found = PREFECTURE_EXAMS.find((p) => p.id === prefId) ?? PREFECTURE_EXAMS[23];
  try {
    localStorage.setItem(TARGET_PREF_STORAGE_KEY, found.id);
  } catch {
    // ignore
  }
  return found;
}
