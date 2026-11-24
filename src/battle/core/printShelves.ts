import type { GachaPrintDef } from '../../data/gachaPrints.generated';

/**
 * PDF の棚（ショップの「PDF」・マイPDF・ピックアップ一覧で地方・分野ごとに絞り込む）。
 *   ・全国総合模試（kyotsu）
 *   ・47都道府県別の公立高校入試予想問題（6地方ブロック）
 *   ・完全版の本（book）
 *   ・5教科別プリント・出題傾向
 */
export type PrintShelfId =
  | 'kyotsu'
  | 'hokkaido_tohoku'
  | 'kanto'
  | 'chubu'
  | 'kinki'
  | 'chugoku_shikoku'
  | 'kyushu_okinawa'
  | 'book'
  | 'english'
  | 'math'
  | 'japanese'
  | 'science'
  | 'social'
  | 'trend'
  | 'other';

export const PRINT_SHELVES: readonly { id: PrintShelfId; label: string }[] = [
  { id: 'kyotsu', label: '全国総合模試' },
  { id: 'hokkaido_tohoku', label: '北海道・東北' },
  { id: 'kanto', label: '関東' },
  { id: 'chubu', label: '中部・東海・北陸' },
  { id: 'kinki', label: '近畿' },
  { id: 'chugoku_shikoku', label: '中国・四国' },
  { id: 'kyushu_okinawa', label: '九州・沖縄' },
  { id: 'book', label: '完全版の本' },
  { id: 'english', label: '英語' },
  { id: 'math', label: '数学' },
  { id: 'japanese', label: '国語' },
  { id: 'science', label: '理科' },
  { id: 'social', label: '社会' },
  { id: 'trend', label: '出題傾向' },
  { id: 'other', label: 'その他' },
];

/** 47都道府県（PDF の id `print_lr_pref_<prefId>`）→ 6地方ブロックの棚 */
export const UNIV_REGION: Readonly<Record<string, PrintShelfId>> = {
  // 北海道・東北 (7)
  hokkaido: 'hokkaido_tohoku',
  aomori: 'hokkaido_tohoku',
  iwate: 'hokkaido_tohoku',
  miyagi: 'hokkaido_tohoku',
  akita: 'hokkaido_tohoku',
  yamagata: 'hokkaido_tohoku',
  fukushima: 'hokkaido_tohoku',
  // 関東 (7)
  ibaraki: 'kanto',
  tochigi: 'kanto',
  gunma: 'kanto',
  saitama: 'kanto',
  chiba: 'kanto',
  tokyo: 'kanto',
  kanagawa: 'kanto',
  // 中部・東海・北陸 (9)
  niigata: 'chubu',
  toyama: 'chubu',
  ishikawa: 'chubu',
  fukui: 'chubu',
  yamanashi: 'chubu',
  nagano: 'chubu',
  gifu: 'chubu',
  shizuoka: 'chubu',
  aichi: 'chubu',
  // 近畿 (7: 三重含む)
  mie: 'kinki',
  shiga: 'kinki',
  kyoto: 'kinki',
  osaka: 'kinki',
  hyogo: 'kinki',
  nara: 'kinki',
  wakayama: 'kinki',
  // 中国・四国 (9)
  tottori: 'chugoku_shikoku',
  shimane: 'chugoku_shikoku',
  okayama: 'chugoku_shikoku',
  hiroshima: 'chugoku_shikoku',
  yamaguchi: 'chugoku_shikoku',
  tokushima: 'chugoku_shikoku',
  kagawa: 'chugoku_shikoku',
  ehime: 'chugoku_shikoku',
  kochi: 'chugoku_shikoku',
  // 九州・沖縄 (8)
  fukuoka: 'kyushu_okinawa',
  saga: 'kyushu_okinawa',
  nagasaki: 'kyushu_okinawa',
  kumamoto: 'kyushu_okinawa',
  oita: 'kyushu_okinawa',
  miyazaki: 'kyushu_okinawa',
  kagoshima: 'kyushu_okinawa',
  okinawa: 'kyushu_okinawa',
};

/** 都道府県別の予想問題なら、その都道府県 id（例: 'mie', 'tokyo'）。それ以外は null */
export function univOfPrint(id: string): string | null {
  const m = /^print_lr_pref_([a-z]+)$/.exec(id);
  return m ? m[1] : null;
}

export function printShelfOf(p: GachaPrintDef): PrintShelfId {
  if (p.id.startsWith('print_lr_juken_mock')) return 'kyotsu';
  const pref = univOfPrint(p.id);
  if (pref) return UNIV_REGION[pref] ?? 'other';
  if (p.category === '完全版') return 'book';
  if (p.category === '出題傾向') return 'trend';
  if (p.subject.startsWith('english')) return 'english';
  if (p.subject === 'math') return 'math';
  if (p.subject === 'japanese') return 'japanese';
  if (p.subject === 'science') return 'science';
  if (p.subject === 'social') return 'social';
  return 'other';
}
