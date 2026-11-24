/**
 * LR（レジェンドレア）：都道府県別 公立高校入試 5教科予想問題＆詳しい解説（全国47都道府県・全47冊）。
 * 1冊＝都道府県別の配点・内申・出題傾向ガイド＋5教科予想問題＋実戦英作文＋模範解答・詳しい解説。
 * 各都道府県教育委員会の公式過去問ではなく、公開要綱・出題傾向をもとに制作した書き下ろし予想問題です。
 */
import type { GachaPrintDef } from './gachaPrints.generated';

export const NIJI_UNIVERSITIES = [
  {
    "id": "hokkaido",
    "name": "北海道",
    "region": "北海道・東北",
    "track": ""
  },
  {
    "id": "aomori",
    "name": "青森県",
    "region": "北海道・東北",
    "track": ""
  },
  {
    "id": "iwate",
    "name": "岩手県",
    "region": "北海道・東北",
    "track": ""
  },
  {
    "id": "miyagi",
    "name": "宮城県",
    "region": "北海道・東北",
    "track": ""
  },
  {
    "id": "akita",
    "name": "秋田県",
    "region": "北海道・東北",
    "track": ""
  },
  {
    "id": "yamagata",
    "name": "山形県",
    "region": "北海道・東北",
    "track": ""
  },
  {
    "id": "fukushima",
    "name": "福島県",
    "region": "北海道・東北",
    "track": ""
  },
  {
    "id": "ibaraki",
    "name": "茨城県",
    "region": "関東",
    "track": ""
  },
  {
    "id": "tochigi",
    "name": "栃木県",
    "region": "関東",
    "track": ""
  },
  {
    "id": "gunma",
    "name": "群馬県",
    "region": "関東",
    "track": ""
  },
  {
    "id": "saitama",
    "name": "埼玉県",
    "region": "関東",
    "track": ""
  },
  {
    "id": "chiba",
    "name": "千葉県",
    "region": "関東",
    "track": ""
  },
  {
    "id": "tokyo",
    "name": "東京都",
    "region": "関東",
    "track": ""
  },
  {
    "id": "kanagawa",
    "name": "神奈川県",
    "region": "関東",
    "track": ""
  },
  {
    "id": "niigata",
    "name": "新潟県",
    "region": "中部・東海・北陸",
    "track": ""
  },
  {
    "id": "toyama",
    "name": "富山県",
    "region": "中部・東海・北陸",
    "track": ""
  },
  {
    "id": "ishikawa",
    "name": "石川県",
    "region": "中部・東海・北陸",
    "track": ""
  },
  {
    "id": "fukui",
    "name": "福井県",
    "region": "中部・東海・北陸",
    "track": ""
  },
  {
    "id": "yamanashi",
    "name": "山梨県",
    "region": "中部・東海・北陸",
    "track": ""
  },
  {
    "id": "nagano",
    "name": "長野県",
    "region": "中部・東海・北陸",
    "track": ""
  },
  {
    "id": "gifu",
    "name": "岐阜県",
    "region": "中部・東海・北陸",
    "track": ""
  },
  {
    "id": "shizuoka",
    "name": "静岡県",
    "region": "中部・東海・北陸",
    "track": ""
  },
  {
    "id": "aichi",
    "name": "愛知県",
    "region": "中部・東海・北陸",
    "track": ""
  },
  {
    "id": "mie",
    "name": "三重県",
    "region": "中部・東海・北陸",
    "track": ""
  },
  {
    "id": "shiga",
    "name": "滋賀県",
    "region": "近畿",
    "track": ""
  },
  {
    "id": "kyoto",
    "name": "京都府",
    "region": "近畿",
    "track": ""
  },
  {
    "id": "osaka",
    "name": "大阪府",
    "region": "近畿",
    "track": ""
  },
  {
    "id": "hyogo",
    "name": "兵庫県",
    "region": "近畿",
    "track": ""
  },
  {
    "id": "nara",
    "name": "奈良県",
    "region": "近畿",
    "track": ""
  },
  {
    "id": "wakayama",
    "name": "和歌山県",
    "region": "近畿",
    "track": ""
  },
  {
    "id": "tottori",
    "name": "鳥取県",
    "region": "中国・四国",
    "track": ""
  },
  {
    "id": "shimane",
    "name": "島根県",
    "region": "中国・四国",
    "track": ""
  },
  {
    "id": "okayama",
    "name": "岡山県",
    "region": "中国・四国",
    "track": ""
  },
  {
    "id": "hiroshima",
    "name": "広島県",
    "region": "中国・四国",
    "track": ""
  },
  {
    "id": "yamaguchi",
    "name": "山口県",
    "region": "中国・四国",
    "track": ""
  },
  {
    "id": "tokushima",
    "name": "徳島県",
    "region": "中国・四国",
    "track": ""
  },
  {
    "id": "kagawa",
    "name": "香川県",
    "region": "中国・四国",
    "track": ""
  },
  {
    "id": "ehime",
    "name": "愛媛県",
    "region": "中国・四国",
    "track": ""
  },
  {
    "id": "kochi",
    "name": "高知県",
    "region": "中国・四国",
    "track": ""
  },
  {
    "id": "fukuoka",
    "name": "福岡県",
    "region": "九州・沖縄",
    "track": ""
  },
  {
    "id": "saga",
    "name": "佐賀県",
    "region": "九州・沖縄",
    "track": ""
  },
  {
    "id": "nagasaki",
    "name": "長崎県",
    "region": "九州・沖縄",
    "track": ""
  },
  {
    "id": "kumamoto",
    "name": "熊本県",
    "region": "九州・沖縄",
    "track": ""
  },
  {
    "id": "oita",
    "name": "大分県",
    "region": "九州・沖縄",
    "track": ""
  },
  {
    "id": "miyazaki",
    "name": "宮崎県",
    "region": "九州・沖縄",
    "track": ""
  },
  {
    "id": "kagoshima",
    "name": "鹿児島県",
    "region": "九州・沖縄",
    "track": ""
  },
  {
    "id": "okinawa",
    "name": "沖縄県",
    "region": "九州・沖縄",
    "track": ""
  }
] as const;

export type NijiUniversityId = (typeof NIJI_UNIVERSITIES)[number]['id'];

export const OTHER_MOCK_UNIVERSITIES: readonly { id: string; name: string }[] = [];

export const NIJI_MOCK_PRINTS: readonly GachaPrintDef[] = [
  {
    "id": "print_lr_pref_hokkaido",
    "label": "北海道 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_hokkaido.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_hokkaido.webp",
    "pages": 9,
    "kb": 116
  },
  {
    "id": "print_lr_pref_aomori",
    "label": "青森県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_aomori.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_aomori.webp",
    "pages": 9,
    "kb": 112
  },
  {
    "id": "print_lr_pref_iwate",
    "label": "岩手県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_iwate.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_iwate.webp",
    "pages": 9,
    "kb": 126
  },
  {
    "id": "print_lr_pref_miyagi",
    "label": "宮城県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_miyagi.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_miyagi.webp",
    "pages": 9,
    "kb": 125
  },
  {
    "id": "print_lr_pref_akita",
    "label": "秋田県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_akita.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_akita.webp",
    "pages": 9,
    "kb": 121
  },
  {
    "id": "print_lr_pref_yamagata",
    "label": "山形県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_yamagata.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_yamagata.webp",
    "pages": 9,
    "kb": 114
  },
  {
    "id": "print_lr_pref_fukushima",
    "label": "福島県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_fukushima.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_fukushima.webp",
    "pages": 9,
    "kb": 125
  },
  {
    "id": "print_lr_pref_ibaraki",
    "label": "茨城県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_ibaraki.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_ibaraki.webp",
    "pages": 9,
    "kb": 129
  },
  {
    "id": "print_lr_pref_tochigi",
    "label": "栃木県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_tochigi.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_tochigi.webp",
    "pages": 9,
    "kb": 104
  },
  {
    "id": "print_lr_pref_gunma",
    "label": "群馬県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_gunma.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_gunma.webp",
    "pages": 9,
    "kb": 115
  },
  {
    "id": "print_lr_pref_saitama",
    "label": "埼玉県 公立高校入試 5教科予想問題＆詳しい解説（マークシート中心型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_saitama.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_saitama.webp",
    "pages": 9,
    "kb": 104
  },
  {
    "id": "print_lr_pref_chiba",
    "label": "千葉県 公立高校入試 5教科予想問題＆詳しい解説（マークシート中心型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_chiba.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_chiba.webp",
    "pages": 9,
    "kb": 115
  },
  {
    "id": "print_lr_pref_tokyo",
    "label": "東京都 公立高校入試 5教科予想問題＆詳しい解説（マークシート中心型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_tokyo.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_tokyo.webp",
    "pages": 9,
    "kb": 116
  },
  {
    "id": "print_lr_pref_kanagawa",
    "label": "神奈川県 公立高校入試 5教科予想問題＆詳しい解説（マークシート中心型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_kanagawa.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_kanagawa.webp",
    "pages": 9,
    "kb": 118
  },
  {
    "id": "print_lr_pref_niigata",
    "label": "新潟県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_niigata.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_niigata.webp",
    "pages": 9,
    "kb": 126
  },
  {
    "id": "print_lr_pref_toyama",
    "label": "富山県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_toyama.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_toyama.webp",
    "pages": 9,
    "kb": 115
  },
  {
    "id": "print_lr_pref_ishikawa",
    "label": "石川県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_ishikawa.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_ishikawa.webp",
    "pages": 9,
    "kb": 105
  },
  {
    "id": "print_lr_pref_fukui",
    "label": "福井県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_fukui.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_fukui.webp",
    "pages": 9,
    "kb": 117
  },
  {
    "id": "print_lr_pref_yamanashi",
    "label": "山梨県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_yamanashi.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_yamanashi.webp",
    "pages": 9,
    "kb": 118
  },
  {
    "id": "print_lr_pref_nagano",
    "label": "長野県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_nagano.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_nagano.webp",
    "pages": 9,
    "kb": 124
  },
  {
    "id": "print_lr_pref_gifu",
    "label": "岐阜県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_gifu.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_gifu.webp",
    "pages": 9,
    "kb": 117
  },
  {
    "id": "print_lr_pref_shizuoka",
    "label": "静岡県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_shizuoka.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_shizuoka.webp",
    "pages": 9,
    "kb": 114
  },
  {
    "id": "print_lr_pref_aichi",
    "label": "愛知県 公立高校入試 5教科予想問題＆詳しい解説（マークシート中心型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_aichi.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_aichi.webp",
    "pages": 9,
    "kb": 118
  },
  {
    "id": "print_lr_pref_mie",
    "label": "三重県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_mie.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_mie.webp",
    "pages": 9,
    "kb": 112
  },
  {
    "id": "print_lr_pref_shiga",
    "label": "滋賀県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_shiga.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_shiga.webp",
    "pages": 9,
    "kb": 115
  },
  {
    "id": "print_lr_pref_kyoto",
    "label": "京都府 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_kyoto.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_kyoto.webp",
    "pages": 9,
    "kb": 121
  },
  {
    "id": "print_lr_pref_osaka",
    "label": "大阪府 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_osaka.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_osaka.webp",
    "pages": 9,
    "kb": 125
  },
  {
    "id": "print_lr_pref_hyogo",
    "label": "兵庫県 公立高校入試 5教科予想問題＆詳しい解説（マークシート中心型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_hyogo.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_hyogo.webp",
    "pages": 9,
    "kb": 116
  },
  {
    "id": "print_lr_pref_nara",
    "label": "奈良県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_nara.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_nara.webp",
    "pages": 9,
    "kb": 112
  },
  {
    "id": "print_lr_pref_wakayama",
    "label": "和歌山県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_wakayama.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_wakayama.webp",
    "pages": 9,
    "kb": 123
  },
  {
    "id": "print_lr_pref_tottori",
    "label": "鳥取県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_tottori.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_tottori.webp",
    "pages": 9,
    "kb": 110
  },
  {
    "id": "print_lr_pref_shimane",
    "label": "島根県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_shimane.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_shimane.webp",
    "pages": 9,
    "kb": 120
  },
  {
    "id": "print_lr_pref_okayama",
    "label": "岡山県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_okayama.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_okayama.webp",
    "pages": 9,
    "kb": 126
  },
  {
    "id": "print_lr_pref_hiroshima",
    "label": "広島県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_hiroshima.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_hiroshima.webp",
    "pages": 9,
    "kb": 103
  },
  {
    "id": "print_lr_pref_yamaguchi",
    "label": "山口県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_yamaguchi.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_yamaguchi.webp",
    "pages": 9,
    "kb": 118
  },
  {
    "id": "print_lr_pref_tokushima",
    "label": "徳島県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_tokushima.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_tokushima.webp",
    "pages": 9,
    "kb": 123
  },
  {
    "id": "print_lr_pref_kagawa",
    "label": "香川県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_kagawa.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_kagawa.webp",
    "pages": 9,
    "kb": 110
  },
  {
    "id": "print_lr_pref_ehime",
    "label": "愛媛県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_ehime.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_ehime.webp",
    "pages": 9,
    "kb": 120
  },
  {
    "id": "print_lr_pref_kochi",
    "label": "高知県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_kochi.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_kochi.webp",
    "pages": 9,
    "kb": 119
  },
  {
    "id": "print_lr_pref_fukuoka",
    "label": "福岡県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_fukuoka.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_fukuoka.webp",
    "pages": 9,
    "kb": 122
  },
  {
    "id": "print_lr_pref_saga",
    "label": "佐賀県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_saga.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_saga.webp",
    "pages": 9,
    "kb": 117
  },
  {
    "id": "print_lr_pref_nagasaki",
    "label": "長崎県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_nagasaki.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_nagasaki.webp",
    "pages": 9,
    "kb": 110
  },
  {
    "id": "print_lr_pref_kumamoto",
    "label": "熊本県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_kumamoto.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_kumamoto.webp",
    "pages": 9,
    "kb": 111
  },
  {
    "id": "print_lr_pref_oita",
    "label": "大分県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_oita.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_oita.webp",
    "pages": 9,
    "kb": 116
  },
  {
    "id": "print_lr_pref_miyazaki",
    "label": "宮崎県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_miyazaki.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_miyazaki.webp",
    "pages": 9,
    "kb": 115
  },
  {
    "id": "print_lr_pref_kagoshima",
    "label": "鹿児島県 公立高校入試 5教科予想問題＆詳しい解説（記述・思考力重視型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_kagoshima.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_kagoshima.webp",
    "pages": 9,
    "kb": 112
  },
  {
    "id": "print_lr_pref_okinawa",
    "label": "沖縄県 公立高校入試 5教科予想問題＆詳しい解説（記述＋記号標準型・内申/傾向つき）",
    "subject": "juken_5subjects",
    "category": "演習プリント",
    "file": "/prints/print_lr_pref_okinawa.pdf",
    "thumb": "/prints/thumbs/print_lr_pref_okinawa.webp",
    "pages": 9,
    "kb": 111
  }
];

export function nijiUniversityOf(id: string): (typeof NIJI_UNIVERSITIES)[number] | undefined {
  const m = id.match(/^print_lr_pref_([a-z]+)$/);
  return m ? NIJI_UNIVERSITIES.find((u) => u.id === m[1]) : undefined;
}

export function mockUniversityOf(id: string): { id: string; name: string } | undefined {
  return nijiUniversityOf(id);
}

export function nijiDisclaimerFor(prefName: string): string {
  return `${prefName}教育委員会の公式過去問ではありません。公開要綱・出題傾向を分析して制作したオリジナル予想問題です。`;
}

export const NIJI_DISCLAIMER = '全国47都道府県の教育委員会が公表する入学者選抜要綱・出題傾向を分析して制作した書き下ろし予想問題であり、各都道府県の公式過去問ではありません。';

export const LEVEL_JUKEN_PRINT: GachaPrintDef = {
  "id": "print_level_juken_howto",
  "label": "公立高校入試 5教科 時間配分＆ケアレスミス撲滅ガイド（Lv.15到達特典）",
  "subject": "english",
  "category": "出題傾向",
  "file": "/prints/print_level_juken_howto.pdf",
  "thumb": "/prints/thumbs/print_level_juken_howto.webp",
  "pages": 4,
  "kb": 71
};
