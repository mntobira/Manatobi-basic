// ★自動生成ファイル★ scripts/build-juken-gacha-prints.py で生成。
export type GachaPrintCategory = '出題傾向' | '演習プリント' | '単語テスト' | '完全版';

export interface GachaPrintDef {
  /** ガチャのアイテム id（ITEMS にもこの id で入る） */
  id: string;
  label: string;
  subject: string;
  category: GachaPrintCategory;
  /** public/ からの PDF パス */
  file: string;
  /** 1ページ目のサムネイル（webp） */
  thumb: string;
  pages: number;
  kb: number;
}

export const GACHA_PRINTS: readonly GachaPrintDef[] = [
  {
    "id": "print_ur_juken_en_complete",
    "label": "高校入試 英語 完全攻略バイブル（中学全英文法・長文・リスニング総整理）",
    "subject": "english",
    "category": "完全版",
    "file": "/prints/print_ur_juken_en_complete.pdf",
    "thumb": "/prints/thumbs/print_ur_juken_en_complete.webp",
    "pages": 8,
    "kb": 82
  },
  {
    "id": "print_ur_juken_ma_complete",
    "label": "高校入試 数学 完全攻略バイブル（計算・連立8型・関数・図形・スタフリ裏ワザ全集）",
    "subject": "math",
    "category": "完全版",
    "file": "/prints/print_ur_juken_ma_complete.pdf",
    "thumb": "/prints/thumbs/print_ur_juken_ma_complete.webp",
    "pages": 8,
    "kb": 74
  },
  {
    "id": "print_ur_juken_ja_complete",
    "label": "高校入試 国語 完全攻略バイブル（国文法・語彙慣用句・韻文・古文漢文・読解作文）",
    "subject": "japanese",
    "category": "完全版",
    "file": "/prints/print_ur_juken_ja_complete.pdf",
    "thumb": "/prints/thumbs/print_ur_juken_ja_complete.webp",
    "pages": 7,
    "kb": 97
  },
  {
    "id": "print_ur_juken_sc_complete",
    "label": "高校入試 理科 最終総まとめ完全版（全35講：物理・化学・生物・地学＋計算裏ワザ）",
    "subject": "science",
    "category": "完全版",
    "file": "/prints/print_ur_juken_sc_complete.pdf",
    "thumb": "/prints/thumbs/print_ur_juken_sc_complete.webp",
    "pages": 13,
    "kb": 141
  },
  {
    "id": "print_ur_juken_so_geo_complete",
    "label": "高校入試 社会【地理】完全版（世界6州・日本7地方・重要統計資料①②総整理）",
    "subject": "social",
    "category": "完全版",
    "file": "/prints/print_ur_juken_so_geo_complete.pdf",
    "thumb": "/prints/thumbs/print_ur_juken_so_geo_complete.webp",
    "pages": 8,
    "kb": 135
  },
  {
    "id": "print_ur_juken_so_hist_civ_complete",
    "label": "高校入試 社会【歴史・公民】完全版（旧石器〜現代戦後史＆憲法・三権分立・経済・国際）",
    "subject": "social",
    "category": "完全版",
    "file": "/prints/print_ur_juken_so_hist_civ_complete.pdf",
    "thumb": "/prints/thumbs/print_ur_juken_so_hist_civ_complete.webp",
    "pages": 9,
    "kb": 191
  },
  {
    "id": "print_ur_juken_writing_complete",
    "label": "高校入試 英作文 完全制覇ブック（黄金の型21＋実戦全27題・模範解答集）",
    "subject": "english",
    "category": "完全版",
    "file": "/prints/print_ur_juken_writing_complete.pdf",
    "thumb": "/prints/thumbs/print_ur_juken_writing_complete.webp",
    "pages": 4,
    "kb": 41
  },
  {
    "id": "print_ur_juken_ma_drill_all",
    "label": "高校入試 数学 頻出パターン厳選演習ブック（関数・相似三平方・確率データ完全版）",
    "subject": "math",
    "category": "完全版",
    "file": "/prints/print_ur_juken_ma_drill_all.pdf",
    "thumb": "/prints/thumbs/print_ur_juken_ma_drill_all.webp",
    "pages": 4,
    "kb": 44
  },
  {
    "id": "print_ur_juken_sc_drill_all",
    "label": "高校入試 理科 実験・観察・計算問題 完全演習ブック（全分野厳選）",
    "subject": "science",
    "category": "完全版",
    "file": "/prints/print_ur_juken_sc_drill_all.pdf",
    "thumb": "/prints/thumbs/print_ur_juken_sc_drill_all.webp",
    "pages": 4,
    "kb": 77
  },
  {
    "id": "print_ur_juken_so_drill_all",
    "label": "高校入試 社会 統計・年表・記述 完全演習ブック（地理・歴史・公民横断）",
    "subject": "social",
    "category": "完全版",
    "file": "/prints/print_ur_juken_so_drill_all.pdf",
    "thumb": "/prints/thumbs/print_ur_juken_so_drill_all.webp",
    "pages": 5,
    "kb": 85
  },
  {
    "id": "print_sr_juken_en_grammar",
    "label": "英文法 小問・整序 集中演習プリント（時制・助動詞・不定詞・動名詞）",
    "subject": "english",
    "category": "演習プリント",
    "file": "/prints/print_sr_juken_en_grammar.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_en_grammar.webp",
    "pages": 4,
    "kb": 35
  },
  {
    "id": "print_sr_juken_en_rc",
    "label": "中学3年最重要文法＆長文・対話文 読解演習プリント（分詞・関係代名詞・図表読解）",
    "subject": "english",
    "category": "演習プリント",
    "file": "/prints/print_sr_juken_en_rc.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_en_rc.webp",
    "pages": 4,
    "kb": 37
  },
  {
    "id": "print_sr_juken_en_trend",
    "label": "公立高校入試 英語リスニング・条件英作文 出題傾向＆即効対策レポート",
    "subject": "english",
    "category": "出題傾向",
    "file": "/prints/print_sr_juken_en_trend.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_en_trend.webp",
    "pages": 4,
    "kb": 52
  },
  {
    "id": "print_sr_juken_ma_algebra",
    "label": "直前数学対策 大問1・連立方程式8パターン 完全攻略プリント",
    "subject": "math",
    "category": "演習プリント",
    "file": "/prints/print_sr_juken_ma_algebra.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_ma_algebra.webp",
    "pages": 4,
    "kb": 37
  },
  {
    "id": "print_sr_juken_ma_func",
    "label": "高校入試 数学 一次関数ダイヤグラム・関数y=ax² 集中演習プリント",
    "subject": "math",
    "category": "演習プリント",
    "file": "/prints/print_sr_juken_ma_func.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_ma_func.webp",
    "pages": 4,
    "kb": 36
  },
  {
    "id": "print_sr_juken_ma_geom",
    "label": "高校入試 数学 円周角・相似・三平方・空間図形・作図 集中演習プリント",
    "subject": "math",
    "category": "演習プリント",
    "file": "/prints/print_sr_juken_ma_geom.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_ma_geom.webp",
    "pages": 4,
    "kb": 40
  },
  {
    "id": "print_sr_juken_ma_data",
    "label": "高校入試 数学 確率・箱ひげ図・標本調査 出題傾向＆即演習プリント",
    "subject": "math",
    "category": "出題傾向",
    "file": "/prints/print_sr_juken_ma_data.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_ma_data.webp",
    "pages": 4,
    "kb": 47
  },
  {
    "id": "print_sr_juken_ja_kotoba",
    "label": "高校入試 国語 漢字・同訓異字・四字熟語・国文法（品詞・敬語）演習プリント",
    "subject": "japanese",
    "category": "演習プリント",
    "file": "/prints/print_sr_juken_ja_kotoba.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_ja_kotoba.webp",
    "pages": 4,
    "kb": 67
  },
  {
    "id": "print_sr_juken_ja_reading",
    "label": "高校入試 国語 論説文・小説・韻文（短歌/俳句/詩）読解＆記述プリント",
    "subject": "japanese",
    "category": "演習プリント",
    "file": "/prints/print_sr_juken_ja_reading.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_ja_reading.webp",
    "pages": 5,
    "kb": 91
  },
  {
    "id": "print_sr_juken_ja_koten",
    "label": "高校入試 国語 古文・漢文（歴史的仮名遣い・係り結び・返り点）出題傾向＆演習",
    "subject": "japanese",
    "category": "出題傾向",
    "file": "/prints/print_sr_juken_ja_koten.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_ja_koten.webp",
    "pages": 4,
    "kb": 81
  },
  {
    "id": "print_sr_juken_sc_phys_chem",
    "label": "高校入試 理科 物理・化学（オームの法則・凸レンズ・気体・化学反応とイオン）演習プリント",
    "subject": "science",
    "category": "演習プリント",
    "file": "/prints/print_sr_juken_sc_phys_chem.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_sc_phys_chem.webp",
    "pages": 4,
    "kb": 77
  },
  {
    "id": "print_sr_juken_sc_bio_earth",
    "label": "高校入試 理科 生物・地学（光合成・遺伝・天気湿度・地震・天体金星）演習プリント",
    "subject": "science",
    "category": "演習プリント",
    "file": "/prints/print_sr_juken_sc_bio_earth.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_sc_bio_earth.webp",
    "pages": 4,
    "kb": 67
  },
  {
    "id": "print_sr_juken_so_geo",
    "label": "高校入試 社会 世界地理・日本地理・地形図と雨温図 集中演習プリント",
    "subject": "social",
    "category": "演習プリント",
    "file": "/prints/print_sr_juken_so_geo.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_so_geo.webp",
    "pages": 5,
    "kb": 82
  },
  {
    "id": "print_sr_juken_so_hist",
    "label": "高校入試 社会 日本史通史・時代並べ替え・外交文化テーマ史 演習プリント",
    "subject": "social",
    "category": "演習プリント",
    "file": "/prints/print_sr_juken_so_hist.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_so_hist.webp",
    "pages": 5,
    "kb": 118
  },
  {
    "id": "print_sr_juken_so_civics",
    "label": "高校入試 社会 公民（憲法・三権分立・地方自治・経済税制・国際連合）出題傾向＆演習",
    "subject": "social",
    "category": "出題傾向",
    "file": "/prints/print_sr_juken_so_civics.pdf",
    "thumb": "/prints/thumbs/print_sr_juken_so_civics.webp",
    "pages": 5,
    "kb": 86
  }
];
