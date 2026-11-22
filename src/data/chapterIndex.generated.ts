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
        "title": "時制・疑問詞・助動詞の鉄則",
        "abstractTitle": "時制・疑問詞・助動詞の鉄則",
        "realTitle": "一般動詞・過去形・未来表現・助動詞（must / have to / should / may）"
      },
      {
        "id": "en1_2",
        "problemCount": 2,
        "title": "不定詞・動名詞・接続詞の使い分け",
        "abstractTitle": "不定詞・動名詞・接続詞の使い分け",
        "realTitle": "to不定詞3用法・It is ... for A to ~・動名詞のみをとる動詞・when/ifの時制"
      },
      {
        "id": "en1_3",
        "problemCount": 2,
        "title": "比較・受動態・第4/第5文型",
        "abstractTitle": "比較・受動態・第4/第5文型",
        "realTitle": "原級・比較級・最上級・受動態（be＋過去分詞）・SVOO / SVOC（make A B）"
      },
      {
        "id": "en2_1",
        "problemCount": 2,
        "title": "現在完了・現在完了進行形",
        "abstractTitle": "現在完了・現在完了進行形",
        "realTitle": "継続・経験・完了の識別 / have been ~ing / 過去形との違い"
      },
      {
        "id": "en2_2",
        "problemCount": 2,
        "title": "後置修飾（分詞・関係代名詞）・間接疑問・仮定法",
        "abstractTitle": "後置修飾（分詞・関係代名詞）・間接疑問・仮定法",
        "realTitle": "現在分詞と過去分詞の後置修飾・関係代名詞（主格/目的格）・間接疑問の語順・I wish / If I were"
      },
      {
        "id": "en3_1",
        "problemCount": 2,
        "title": "減点ゼロの英作文（必須の型・誤文訂正）",
        "abstractTitle": "減点ゼロの英作文（必須の型・誤文訂正）",
        "realTitle": "三重県・全国公立「対話補充英作文」の型21選と頻出減点ミス撲滅"
      },
      {
        "id": "en3_2",
        "problemCount": 2,
        "title": "対話文・お知らせ・長文読解の実戦",
        "abstractTitle": "対話文・お知らせ・長文読解の実戦",
        "realTitle": "会話の文脈把握・ポスター/Eメールの情報整理・長文の内容一致"
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
        "title": "正負・文字式・平方根の自然数n（4パターン完全攻略）",
        "abstractTitle": "正負・文字式・平方根の自然数n（4パターン完全攻略）",
        "realTitle": "分数文字式の通分罠・平方根が整数になる最小の自然数n（積・商・和・差）・二次方程式"
      },
      {
        "id": "ma1_2",
        "problemCount": 2,
        "title": "連立方程式の文章題（全10類型マスター）",
        "abstractTitle": "連立方程式の文章題（全10類型マスター）",
        "realTitle": "代金と割引・速さ（途中変更/池の周り）・割合増減（昨年度と今年度）・食塩水濃度"
      },
      {
        "id": "ma2_1",
        "problemCount": 2,
        "title": "変域の罠・一次関数・関数 y＝ax² の融合",
        "abstractTitle": "変域の罠・一次関数・関数 y＝ax² の融合",
        "realTitle": "xが0をまたぐときのy＝ax²の変域・変化の割合の暗算公式・放物線と直線の面積二等分"
      },
      {
        "id": "ma3_1",
        "problemCount": 2,
        "title": "多角形の角・相似・円周角・三平方・空間図形",
        "abstractTitle": "多角形の角・相似・円周角・三平方・空間図形",
        "realTitle": "外角の和360°・ねじれの位置・相似比と面積比/体積比・円周角の定理・円錐展開図の中心角"
      },
      {
        "id": "ma4_1",
        "problemCount": 2,
        "title": "度数分布表・箱ひげ図・四分位範囲・確率",
        "abstractTitle": "度数分布表・箱ひげ図・四分位範囲・確率",
        "realTitle": "相対度数と累積相対度数・箱ひげ図の読み取り（25%区切り）・2個のサイコロとカードの確率"
      }
    ]
  },
  {
    "id": "japanese",
    "label": "国語",
    "chapters": [
      {
        "id": "ja1_1",
        "problemCount": 2,
        "title": "入試最頻出の同音異義語・四字熟語・慣用句",
        "abstractTitle": "入試最頻出の同音異義語・四字熟語・慣用句",
        "realTitle": "文脈による同音異義語と多義語の識別・四字熟語・身体慣用句・故事成語"
      },
      {
        "id": "ja2_1",
        "problemCount": 2,
        "title": "用言の活用・まぎらわしい語（ない・れる・ようだ）の識別・敬語",
        "abstractTitle": "用言の活用・まぎらわしい語（ない・れる・ようだ）の識別・敬語",
        "realTitle": "動詞の活用の種類・形容詞と助動詞「ない」識別・「れる/られる」4意味識別・敬語3種"
      },
      {
        "id": "ja3_1",
        "problemCount": 2,
        "title": "論説文の論理構造・表現技法・条件作文の鉄則",
        "abstractTitle": "論説文の論理構造・表現技法・条件作文の鉄則",
        "realTitle": "接続語（換言・対比・逆接）・詩歌/俳句の表現技法・資料読み取りと条件作文"
      },
      {
        "id": "ja4_1",
        "problemCount": 2,
        "title": "歴史的仮名遣い・重要古語・係り結び・漢文の返り点",
        "abstractTitle": "歴史的仮名遣い・重要古語・係り結び・漢文の返り点",
        "realTitle": "現代仮名遣いへの直し方・今と意味が違う古語（あはれ/をかし/やがて）・係り結び・返り点"
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
        "title": "植物の分類・光合成の対照実験・蒸散量計算",
        "abstractTitle": "植物の分類・光合成の対照実験・蒸散量計算",
        "realTitle": "双子葉類と単子葉類の維管束・BTB液とヨウ素液の対照実験・ワセリン蒸散計算"
      },
      {
        "id": "sc1_2",
        "problemCount": 2,
        "title": "人体のしくみ（消化・循環・排出・神経）と細胞・遺伝",
        "abstractTitle": "人体のしくみ（消化・循環・排出・神経）と細胞・遺伝",
        "realTitle": "消化酵素と柔毛・肺循環と体循環・肝臓（尿素）と腎臓・反射・体細胞分裂とメンデル遺伝3:1"
      },
      {
        "id": "sc2_1",
        "problemCount": 2,
        "title": "凸レンズ・音速と振動数・オームの法則・電力と熱量",
        "abstractTitle": "凸レンズ・音速と振動数・オームの法則・電力と熱量",
        "realTitle": "焦点距離の2倍（同じ大きさの倒立実像）・音速340m/sとHz・直列並列のオーム・電力Wと熱量J"
      },
      {
        "id": "sc2_2",
        "problemCount": 2,
        "title": "電流と磁界・水圧と浮力・運動・仕事とエネルギー",
        "abstractTitle": "電流と磁界・水圧と浮力・運動・仕事とエネルギー",
        "realTitle": "電磁誘導・水圧と浮力（アルキメデス）・慣性と作用反作用・仕事の原理と仕事率W"
      },
      {
        "id": "sc3_1",
        "problemCount": 2,
        "title": "気体の性質・溶解度と再結晶・化学反応式と定比例の法則",
        "abstractTitle": "気体の性質・溶解度と再結晶・化学反応式と定比例の法則",
        "realTitle": "アンモニア噴水実験・飽和水溶液の再結晶計算・炭酸水素ナトリウム熱分解・Cu4:1とMg3:2"
      },
      {
        "id": "sc3_2",
        "problemCount": 2,
        "title": "イオン・化学電池（ダニエル電池）・酸とアルカリの中和",
        "abstractTitle": "イオン・化学電池（ダニエル電池）・酸とアルカリの中和",
        "realTitle": "電離式・ダニエル電池の亜鉛板（−極）と銅板（＋極）・塩酸＋水酸化ナトリウムと硫酸＋水酸化バリウム"
      },
      {
        "id": "sc4_1",
        "problemCount": 2,
        "title": "地層と岩石・地震計算・気象（飽和水蒸気量と湿度・前線）",
        "abstractTitle": "地層と岩石・地震計算・気象（飽和水蒸気量と湿度・前線）",
        "realTitle": "チャートvs石灰岩・火成岩6種（しんかんせんはかりあげ）・P波S波と初期微動継続時間・湿度計算"
      },
      {
        "id": "sc4_2",
        "problemCount": 2,
        "title": "天体（太陽の南中高度・星の日周/年周運動・月と金星）",
        "abstractTitle": "天体（太陽の南中高度・星の日周/年周運動・月と金星）",
        "realTitle": "北緯35°の夏至・冬至の南中高度・星が毎日4分早く見える計算・金星の満ち欠けと大きさ"
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
        "title": "世界地理（地球儀と図法・時差計算・気候帯と衣食住・6州）",
        "abstractTitle": "世界地理（地球儀と図法・時差計算・気候帯と衣食住・6州）",
        "realTitle": "メルカトル図法と正距方位図法・経度15°＝1時間の時差計算・ケッペン気候区分・EUとUSMCA・ASEAN"
      },
      {
        "id": "so1_2",
        "problemCount": 2,
        "title": "日本地理（地形図・6気候区・四大/新工業地域・農林水産業統計）",
        "abstractTitle": "日本地理（地形図・6気候区・四大/新工業地域・農林水産業統計）",
        "realTitle": "2万5千分の1地形図の縮尺計算・太平洋側〜瀬戸内6気候区・中京/北九州/関東内陸の工業出荷額グラフ"
      },
      {
        "id": "so2_1",
        "problemCount": 2,
        "title": "古代〜近世（飛鳥・奈良・平安・鎌倉・室町・安土桃山・江戸）",
        "abstractTitle": "古代〜近世（飛鳥・奈良・平安・鎌倉・室町・安土桃山・江戸）",
        "realTitle": "大化の改新〜律令国家・承久の乱と御成敗式目・日明勘合貿易・太閤検地・江戸の三大改革"
      },
      {
        "id": "so2_2",
        "problemCount": 2,
        "title": "近現代（明治維新・条約改正・大正デモクラシー・大戦と戦後日本）",
        "abstractTitle": "近現代（明治維新・条約改正・大正デモクラシー・大戦と戦後日本）",
        "realTitle": "地租改正・不平等条約改正（陸奥宗光/小村寿太郎）・日清日露・世界恐慌・戦後民主化と冷戦終結"
      },
      {
        "id": "so3_1",
        "problemCount": 2,
        "title": "日本国憲法・新しい人権・三権分立・選挙（ドント式計算）と地方自治",
        "abstractTitle": "日本国憲法・新しい人権・三権分立・選挙（ドント式計算）と地方自治",
        "realTitle": "生存権（第25条）・知る権利/プライバシー権・衆議院の優越4項目・直接請求権の提出先・ドント式"
      },
      {
        "id": "so3_2",
        "problemCount": 2,
        "title": "経済・金融政策（日銀の公開市場操作）・円高円安・税制・国際社会",
        "abstractTitle": "経済・金融政策（日銀の公開市場操作）・円高円安・税制・国際社会",
        "realTitle": "労働三法・均衡価格・不況と好況の日銀金融政策＆財政政策・円高円安の損得計算・直接税と間接税・国連"
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
  sections?: number;
  units?: number;
  points?: number;
  marks?: number;
}

export const SUBJECT_STATS: Readonly<Record<string, SubjectStatsEntry>> = {
  "english": {
    "sections": 3,
    "chapters": 7,
    "questions": 54
  },
  "math": {
    "sections": 4,
    "chapters": 5,
    "questions": 40
  },
  "japanese": {
    "sections": 4,
    "chapters": 4,
    "questions": 32
  },
  "science": {
    "sections": 4,
    "chapters": 8,
    "questions": 50
  },
  "social": {
    "sections": 3,
    "chapters": 6,
    "questions": 36
  }
};

export function getSubjectStats(subjectId: string | null | undefined): SubjectStatsEntry {
  return SUBJECT_STATS[String(subjectId)] ?? {};
}
