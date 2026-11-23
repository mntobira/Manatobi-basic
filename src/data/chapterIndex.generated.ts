/**
 * ===================================================================
 * 章インデックス（自動生成ファイル・手で編集しないこと）
 * ===================================================================
 */

export interface ChapterIndexEntry {
  id: string;
  title?: string;
  abstractTitle?: string;
  realTitle?: string;
  problemCount: number;
  subQuestionCount?: number;
  practiceSubQuestionCount?: number;
  miniTestSubQuestionCount?: number;
}

export interface SubjectIndexEntry {
  id: string;
  label: string;
  chapters: readonly ChapterIndexEntry[];
}

export const SUBJECT_INDEX: readonly SubjectIndexEntry[] = [
  {
    "id": "english",
    "label": "英語",
    "chapters": [
      {
        "id": "en1_1",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "時制・疑問詞・助動詞の鉄則",
        "abstractTitle": "時制・疑問詞・助動詞の鉄則",
        "realTitle": "一般動詞・過去形・未来表現・助動詞（must / have to / should / may）"
      },
      {
        "id": "en1_2",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "不定詞・動名詞・接続詞・比較の完全攻略",
        "abstractTitle": "不定詞・動名詞・接続詞・比較の完全攻略",
        "realTitle": "It is ... for A to ~・動名詞のみをとる動詞・if/whenの現在形・比較級と最上級"
      },
      {
        "id": "en2_1",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "受動態・現在完了形・使役/知覚構造の急所",
        "abstractTitle": "受動態・現在完了形・使役/知覚構造の急所",
        "realTitle": "by以外の受動態・現在完了3用法と現在完了進行形・make/let/help・tell/want 人 to"
      },
      {
        "id": "en2_2",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "後置修飾（分詞・関係代名詞）・間接疑問文・仮定法",
        "abstractTitle": "後置修飾（分詞・関係代名詞）・間接疑問文・仮定法",
        "realTitle": "現在分詞/過去分詞の識別・関係代名詞主格/目的格/whose・間接疑問文の語順・I wish / If I were"
      },
      {
        "id": "en3_1",
        "problemCount": 2,
        "subQuestionCount": 8,
        "practiceSubQuestionCount": 5,
        "miniTestSubQuestionCount": 3,
        "title": "英作文の必須構文21選・減点回避＆誤文訂正スキル",
        "abstractTitle": "英作文の必須構文21選・減点回避＆誤文訂正スキル",
        "realTitle": "三重県後期選抜 英作文対策プリント直結！2点満点基準・言い換え術・頻出整序"
      },
      {
        "id": "en4_1",
        "problemCount": 3,
        "subQuestionCount": 11,
        "practiceSubQuestionCount": 8,
        "miniTestSubQuestionCount": 3,
        "title": "アンケートグラフ＆案内ポスター融合読解（情報検索型）",
        "abstractTitle": "アンケートグラフ＆案内ポスター融合読解（情報検索型）",
        "realTitle": "図表の数値計算＋Eメール・掲示物の条件照合リーディング"
      },
      {
        "id": "en4_2",
        "problemCount": 2,
        "subQuestionCount": 8,
        "practiceSubQuestionCount": 5,
        "miniTestSubQuestionCount": 3,
        "title": "スピーチ・物語長文の総合読解（指示語・要旨・心情変化）",
        "abstractTitle": "スピーチ・物語長文の総合読解（指示語・要旨・心情変化）",
        "realTitle": "300語規模の本格スピーチ読解：地域課題と高校生のアイデア（全県長文対策）"
      }
    ]
  },
  {
    "id": "math",
    "label": "数学",
    "chapters": [
      {
        "id": "ma1_1",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "文字式通分・平方根の自然数n（4パターン）・二次方程式",
        "abstractTitle": "文字式通分・平方根の自然数n（4パターン）・二次方程式",
        "realTitle": "直前数学対策プリント大問1完全準拠：分数式の符号罠・√an/√(a-n)・因数分解と解の公式"
      },
      {
        "id": "ma1_2",
        "problemCount": 2,
        "subQuestionCount": 8,
        "practiceSubQuestionCount": 5,
        "miniTestSubQuestionCount": 3,
        "title": "連立方程式の文章題（全10パターン制覇：増減・速さ・食塩水・割合）",
        "abstractTitle": "連立方程式の文章題（全10パターン制覇：増減・速さ・食塩水・割合）",
        "realTitle": "直前数学対策プリント大問2直結！昨年基準の生徒数増減・食塩水濃度・池の周り・橋と列車"
      },
      {
        "id": "ma2_1",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "関数 y = ax² の変域（0またぎの罠）と変化の割合の裏ワザ",
        "abstractTitle": "関数 y = ax² の変域（0またぎの罠）と変化の割合の裏ワザ",
        "realTitle": "直前数学対策プリント頻出！0をまたぐyの変域・変化の割合 a(p+q)・制動距離"
      },
      {
        "id": "ma2_2",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "放物線と直線の交点・三角形OABの面積・面積二等分（図解演習）",
        "abstractTitle": "放物線と直線の交点・三角形OABの面積・面積二等分（図解演習）",
        "realTitle": "大問3の花形！放物線 y=ax² と直線ABの式・y軸分割による△OAB面積・中点による二等分線"
      },
      {
        "id": "ma3_1",
        "problemCount": 3,
        "subQuestionCount": 11,
        "practiceSubQuestionCount": 8,
        "miniTestSubQuestionCount": 3,
        "title": "多角形の角・円周角・平行線と面積比（平面図形の基礎〜標準）",
        "abstractTitle": "多角形の角・円周角・平行線と面積比（平面図形の基礎〜標準）",
        "realTitle": "直前数学プリント準拠：正n角形の外角公式・円周角と直径90°・相似比m:nと面積比m²:n²"
      },
      {
        "id": "ma3_2",
        "problemCount": 2,
        "subQuestionCount": 8,
        "practiceSubQuestionCount": 5,
        "miniTestSubQuestionCount": 3,
        "title": "三平方の定理・特別角と空間図形（ねじれ・円錐の最短距離・体積）",
        "abstractTitle": "三平方の定理・特別角と空間図形（ねじれ・円錐の最短距離・体積）",
        "realTitle": "1:2:√3 と 1:1:√2・ねじれの位置・円錐展開図の中心角と側面の糸・正四角錐の高さ"
      },
      {
        "id": "ma3_3",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "立体切断・空間内の相似と体積比（上位校・C問題・学校選択対策）",
        "abstractTitle": "立体切断・空間内の相似と体積比（上位校・C問題・学校選択対策）",
        "realTitle": "正四面体・直方体の断面図・高さの比と底面積比から求める三角錐の体積比"
      },
      {
        "id": "ma4_1",
        "problemCount": 3,
        "subQuestionCount": 12,
        "practiceSubQuestionCount": 9,
        "miniTestSubQuestionCount": 3,
        "title": "箱ひげ図と四分位範囲・確率（さいころ・カード・玉）の完全攻略",
        "abstractTitle": "箱ひげ図と四分位範囲・確率（さいころ・カード・玉）の完全攻略",
        "realTitle": "直前数学プリント大問1・2直結！箱ひげ図の正誤判定・2個のさいころ36通り表・標本調査"
      }
    ]
  },
  {
    "id": "japanese",
    "label": "国語",
    "chapters": [
      {
        "id": "ja1_1",
        "problemCount": 3,
        "subQuestionCount": 13,
        "practiceSubQuestionCount": 10,
        "miniTestSubQuestionCount": 3,
        "title": "同音異義語・同訓異字・四字熟語・慣用句・故事成語",
        "abstractTitle": "同音異義語・同訓異字・四字熟語・慣用句・故事成語",
        "realTitle": "入試大問1の得点源！文脈漢字識別・熟語の構成・故事成語・詩歌の表現技法"
      },
      {
        "id": "ja1_2",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "口語文法の完全攻略（品詞識別「ない・れる・ようだ」・用言活用・敬語）",
        "abstractTitle": "口語文法の完全攻略（品詞識別「ない・れる・ようだ」・用言活用・敬語）",
        "realTitle": "一発判別テストで解く「ない」の4識別・「れる/られる」4用法・尊敬語と謙譲語の罠"
      },
      {
        "id": "ja2_1",
        "problemCount": 2,
        "subQuestionCount": 8,
        "practiceSubQuestionCount": 5,
        "miniTestSubQuestionCount": 3,
        "title": "論説文・説明文の論理構造（対比・指示語・接続語・要旨記述）",
        "abstractTitle": "論説文・説明文の論理構造（対比・指示語・接続語・要旨記述）",
        "realTitle": "二項対立（AではなくB）と逆接「しかし」の後ろ・具体例の抽象化で解く本格論説演習"
      },
      {
        "id": "ja2_2",
        "problemCount": 2,
        "subQuestionCount": 8,
        "practiceSubQuestionCount": 5,
        "miniTestSubQuestionCount": 3,
        "title": "小説・物語文の心情読解（行動・情景描写・会話の間・心情変化）",
        "abstractTitle": "小説・物語文の心情読解（行動・情景描写・会話の間・心情変化）",
        "realTitle": "直接書かれない気持ちを「しぐさ・風景・象徴物」から読み解く本格小説演習"
      },
      {
        "id": "ja3_1",
        "problemCount": 3,
        "subQuestionCount": 13,
        "practiceSubQuestionCount": 10,
        "miniTestSubQuestionCount": 3,
        "title": "古文読解（歴史的仮名遣い・古語・主語補完・係り結び）と漢文訓読・条件作文",
        "abstractTitle": "古文読解（歴史的仮名遣い・古語・主語補完・係り結び）と漢文訓読・条件作文",
        "realTitle": "歴史的仮名遣い変換・重要古語20選・係り結びの法則・返り点（レ点・一二点）と資料条件作文"
      }
    ]
  },
  {
    "id": "science",
    "label": "理科",
    "chapters": [
      {
        "id": "sc1_1",
        "problemCount": 2,
        "subQuestionCount": 8,
        "practiceSubQuestionCount": 5,
        "miniTestSubQuestionCount": 3,
        "title": "植物の分類・光合成の対照実験・蒸散量計算",
        "abstractTitle": "植物の分類・光合成の対照実験・蒸散量計算",
        "realTitle": "双子葉類と単子葉類の維管束・BTB液とヨウ素液の対照実験・ワセリン蒸散計算"
      },
      {
        "id": "sc1_2",
        "problemCount": 3,
        "subQuestionCount": 14,
        "practiceSubQuestionCount": 11,
        "miniTestSubQuestionCount": 3,
        "title": "人体のしくみ（消化・循環・排出・神経）と細胞・遺伝・生態系",
        "abstractTitle": "人体のしくみ（消化・循環・排出・神経）と細胞・遺伝・生態系",
        "realTitle": "消化酵素と柔毛・肺循環と門脈・肝臓（尿素）と腎臓・反射・体細胞分裂とメンデル遺伝3:1"
      },
      {
        "id": "sc2_1",
        "problemCount": 2,
        "subQuestionCount": 8,
        "practiceSubQuestionCount": 5,
        "miniTestSubQuestionCount": 3,
        "title": "光の屈折と全反射・凸レンズの作図・音の波形・圧力と浮力",
        "abstractTitle": "光の屈折と全反射・凸レンズの作図・音の波形・圧力と浮力",
        "realTitle": "焦点距離2倍の実像・レンズ半分隠しの引っかけ・振幅と振動数・圧力 Pa＝N/m² とアルキメデスの浮力"
      },
      {
        "id": "sc2_2",
        "problemCount": 3,
        "subQuestionCount": 13,
        "practiceSubQuestionCount": 10,
        "miniTestSubQuestionCount": 3,
        "title": "電流回路（オームの法則・電力・電力量）・電流と磁界・運動と仕事",
        "abstractTitle": "電流回路（オームの法則・電力・電力量）・電流と磁界・運動と仕事",
        "realTitle": "直列・並列の合成抵抗と消費電力・フレミング左手の法則と電磁誘導・斜面運動と動滑車の仕事率"
      },
      {
        "id": "sc3_1",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "気体の性質と集め方・状態変化と蒸留・溶解度と再結晶・定比例の法則",
        "abstractTitle": "気体の性質と集め方・状態変化と蒸留・溶解度と再結晶・定比例の法則",
        "realTitle": "上方/下方/水上置換・エタノール蒸留・硝酸カリウム再結晶計算・銅:酸素＝4:1とマグネシウム＝3:2"
      },
      {
        "id": "sc3_2",
        "problemCount": 3,
        "subQuestionCount": 13,
        "practiceSubQuestionCount": 10,
        "miniTestSubQuestionCount": 3,
        "title": "電解質と電気分解・化学電池（ダニエル電池）・酸とアルカリの中和イオン",
        "abstractTitle": "電解質と電気分解・化学電池（ダニエル電池）・酸とアルカリの中和イオン",
        "realTitle": "塩化銅と塩酸の電気分解・イオン化傾向とダニエル電池の亜鉛板/銅板・中和滴定のイオン数グラフ"
      },
      {
        "id": "sc4_1",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "火山と火成岩・地震のP波/S波計算・地層と柱状図の傾き",
        "abstractTitle": "火山と火成岩・地震のP波/S波計算・地層と柱状図の傾き",
        "realTitle": "しんかんせんはかりあげ・初期微動継続時間と緊急地震速報・ボーリング柱状図と鍵層（凝灰岩）"
      },
      {
        "id": "sc4_2",
        "problemCount": 4,
        "subQuestionCount": 15,
        "practiceSubQuestionCount": 12,
        "miniTestSubQuestionCount": 3,
        "title": "気象（飽和水蒸気量と湿度・前線と低気圧）と天体（日周/年周運動・金星・月と季節）",
        "abstractTitle": "気象（飽和水蒸気量と湿度・前線と低気圧）と天体（日周/年周運動・金星・月と季節）",
        "realTitle": "露点と湿度計算・寒冷前線（積乱雲・にわか雨・北寄りの風）vs温暖前線・金星の満ち欠けと時刻"
      }
    ]
  },
  {
    "id": "social",
    "label": "社会",
    "chapters": [
      {
        "id": "so1_1",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "世界地理（地球儀と図法・時差計算・気候帯と雨温図・6州の産業と統合）",
        "abstractTitle": "世界地理（地球儀と図法・時差計算・気候帯と雨温図・6州の産業と統合）",
        "realTitle": "メルカトルと正距方位図法・経度15°＝1時間の時差計算・世界の雨温図判別・EUとASEANとUSMCA"
      },
      {
        "id": "so1_2",
        "problemCount": 3,
        "subQuestionCount": 13,
        "practiceSubQuestionCount": 10,
        "miniTestSubQuestionCount": 3,
        "title": "日本地理（地形図・6気候区の雨温図・扇状地と三角州・工業と農林水産業統計）",
        "abstractTitle": "日本地理（地形図・6気候区の雨温図・扇状地と三角州・工業と農林水産業統計）",
        "realTitle": "2万5千分の1地形図・太平洋/日本海/瀬戸内/中央高地の雨温図・中京/京葉の工業帯グラフ・促成と抑制栽培"
      },
      {
        "id": "so2_1",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "古代〜中世〜近世の歴史（律令国家・武家政権の展開・東アジア外交・江戸の改革と文化）",
        "abstractTitle": "古代〜中世〜近世の歴史（律令国家・武家政権の展開・東アジア外交・江戸の改革と文化）",
        "realTitle": "大化の改新〜墾田永年私財法・鎌倉御恩と奉公・勘合貿易・太閤検地・参勤交代と鎖国4窓口・元禄と化政文化"
      },
      {
        "id": "so2_2",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "幕末・明治維新〜立憲国家の成立〜日清・日露と条約改正〜大正デモクラシー",
        "abstractTitle": "幕末・明治維新〜立憲国家の成立〜日清・日露と条約改正〜大正デモクラシー",
        "realTitle": "不平等条約（領事裁判権と関税自主権）の改正・地租改正・大日本帝国憲法・日清日露・護憲運動と普通選挙法"
      },
      {
        "id": "so2_3",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "昭和恐慌・十五年戦争〜戦後改革（GHQ）〜冷戦と高度経済成長〜現代の世界",
        "abstractTitle": "昭和恐慌・十五年戦争〜戦後改革（GHQ）〜冷戦と高度経済成長〜現代の世界",
        "realTitle": "世界恐慌（ニューディールとブロック経済）→満州事変〜太平洋戦争→農地改革と財閥解体→サンフランシスコ平和条約〜冷戦終結"
      },
      {
        "id": "so3_1",
        "problemCount": 2,
        "subQuestionCount": 9,
        "practiceSubQuestionCount": 6,
        "miniTestSubQuestionCount": 3,
        "title": "現代社会・日本国憲法と新しい人権・国会/内閣/裁判所（三権分立）・地方自治",
        "abstractTitle": "現代社会・日本国憲法と新しい人権・国会/内閣/裁判所（三権分立）・地方自治",
        "realTitle": "憲法改正手続・生存権25条と新しい人権・衆議院の優越・議院内閣制・違憲審査権・直接請求権の提出先"
      },
      {
        "id": "so3_2",
        "problemCount": 3,
        "subQuestionCount": 13,
        "practiceSubQuestionCount": 10,
        "miniTestSubQuestionCount": 3,
        "title": "選挙（ドント式計算）と経済（市場価格・金融政策・財政と税制・社会保障）＋国際社会とSDGs",
        "abstractTitle": "選挙（ドント式計算）と経済（市場価格・金融政策・財政と税制・社会保障）＋国際社会とSDGs",
        "realTitle": "比例代表ドント式議席計算・需要供給曲線・日銀の公開市場操作と円高円安・累進課税・少子高齢化と国連安保理"
      }
    ]
  }
];

export function getChapterIndexOfSubject(
  subjectId: string | null | undefined,
): readonly ChapterIndexEntry[] {
  const entry = SUBJECT_INDEX.find((subject) => subject.id === subjectId) ?? SUBJECT_INDEX[0];
  return entry ? entry.chapters : [];
}

export interface SubjectStatsEntry {
  chapters?: number;
  questions?: number;
  practiceQuestions?: number;
  miniTestQuestions?: number;
  sections?: number;
  units?: number;
  points?: number;
  marks?: number;
}

export const SUBJECT_STATS: Readonly<Record<string, SubjectStatsEntry>> = {
  "english": {
    "sections": 4,
    "chapters": 7,
    "questions": 63,
    "practiceQuestions": 42,
    "miniTestQuestions": 21
  },
  "math": {
    "sections": 4,
    "chapters": 8,
    "questions": 75,
    "practiceQuestions": 51,
    "miniTestQuestions": 24
  },
  "japanese": {
    "sections": 3,
    "chapters": 5,
    "questions": 51,
    "practiceQuestions": 36,
    "miniTestQuestions": 15
  },
  "science": {
    "sections": 4,
    "chapters": 8,
    "questions": 89,
    "practiceQuestions": 65,
    "miniTestQuestions": 24
  },
  "social": {
    "sections": 3,
    "chapters": 7,
    "questions": 71,
    "practiceQuestions": 50,
    "miniTestQuestions": 21
  }
};

export function getSubjectStats(subjectId: string | null | undefined): SubjectStatsEntry {
  return SUBJECT_STATS[String(subjectId)] ?? {};
}
