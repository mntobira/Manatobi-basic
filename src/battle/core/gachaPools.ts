/**
 * ガチャの種類（マナトビ 高校入試）：
 *   ・公立高校入試ガチャ（kyotsu） … LR＝全国公立高校入試 5教科総合予想模試（第1〜3回、第1回は無料全文試し読み可）、UR＝5教科完全版の本（10冊）、SR＝単元別・出題傾向プリント＋限定装飾
 *   ・47都道府県入試ガチャ（niji） … LR＝全国47都道府県の公立高校入試 5教科予想問題＆解説PDF（全47冊）＋必勝はちまき等の難関突破装飾
 *   ・県別ピックアップガチャ（univ）… 選んだ1都道府県の公立高校入試予想問題PDFだけがLR枠で排出される狙い撃ちガチャ（1回500マナコイン）
 *
 * このファイルは ITEMS を import しない（growthItems → ここ の循環を避けるため、ID だけ持つ）。
 */
import { NIJI_MOCK_PRINTS, NIJI_UNIVERSITIES } from '../../data/nijiMockPrints';
import { PRINT_SHELVES, UNIV_REGION, univOfPrint, type PrintShelfId } from './printShelves';

export type GachaPoolId = 'kyotsu' | 'niji' | 'univ';

export interface GachaPoolDef {
  id: GachaPoolId;
  /** バナーの見出し */
  title: string;
  /** 切替タブの短い名前 */
  short: string;
  /** LR の中身（提供割合・ピックアップの説明に使う） */
  lrName: string;
  lrNote: string;
  /** UR の目玉に優先する科目 */
  preferSubjects: readonly string[];
}

export const GACHA_POOLS: readonly GachaPoolDef[] = [
  {
    id: 'kyotsu',
    title: '公立高校入試ガチャ',
    short: '5教科総合',
    lrName: '公立高校入試 5教科総合予想模試PDF（問題＋解説）',
    lrNote: '5教科総合予想模試（LR）・完全版まとめ本（UR）・単元別プリント（SR）やとびら君の衣装が当たります！',
    preferSubjects: ['english', 'math', 'science', 'social', 'japanese'],
  },
  {
    id: 'niji',
    title: '47都道府県入試ガチャ',
    short: '47都道府県',
    lrName: '全国47都道府県別 公立高校入試予想問題PDF（全47冊）',
    lrNote: '北海道〜沖縄まで全47都道府県の配点・内申ガイド＆5教科予想問題PDF（LR）と必勝はちまき等が登場！',
    preferSubjects: ['math', 'english', 'science', 'social', 'japanese'],
  },
  {
    id: 'univ',
    title: '都道府県選択ガチャ',
    short: '県別狙い撃ち',
    lrName: '選んだ都道府県の公立高校入試予想問題PDF',
    lrNote: '志望する1都道府県を選ぶと、その都道府県の入試予想問題PDFだけがLRで出ます（1回 500マナコイン）。',
    preferSubjects: ['english', 'math', 'science', 'social', 'japanese'],
  },
];

export const DEFAULT_GACHA_POOL: GachaPoolId = 'kyotsu';

export function gachaPoolOf(id: GachaPoolId): GachaPoolDef {
  return GACHA_POOLS.find((p) => p.id === id) ?? GACHA_POOLS[0];
}

/** 都道府県別ガチャ・難関突破向けの特別装飾（公立総合ガチャには出ない） */
export const NIJI_NEW_ITEM_IDS: readonly string[] = [
  'hat_hachimaki_red', 'hat_hachimaki_navy', 'hat_hachimaki_gold',
  'aura_pencil', 'aura_pencil_gold',
  'wall_campus', 'wall_sheet', 'wall_nightdesk', 'wall_dawn',
  'frame_niji_ink', 'frame_niji_sakura', 'frame_niji_midnight',
];

/** 47都道府県別の予想問題PDF（LR）すべて */
export const UNIV_MOCK_PRINT_IDS: readonly string[] = NIJI_MOCK_PRINTS.map((p) => p.id);

/** 47都道府県入試ガチャだけで出るもの（難関装飾＋47都道府県LR予想問題） */
export const NIJI_ONLY_IDS: ReadonlySet<string> = new Set([...NIJI_NEW_ITEM_IDS, ...UNIV_MOCK_PRINT_IDS]);

/** 47都道府県ガチャ・県別選択ガチャでも共通で出る完全版UR・単元SR・人気装飾 */
export const NIJI_SHARED_IDS: readonly string[] = [
  // UR（完全版の本：全10冊）
  'print_ur_juken_en_complete',
  'print_ur_juken_ma_complete',
  'print_ur_juken_ja_complete',
  'print_ur_juken_sc_complete',
  'print_ur_juken_so_geo_complete',
  'print_ur_juken_so_hist_civ_complete',
  'print_ur_juken_writing_complete',
  'print_ur_juken_ma_drill_all',
  'print_ur_juken_sc_drill_all',
  'print_ur_juken_so_drill_all',
  // SR（5教科 単元・出題傾向プリント）
  'print_sr_juken_en_grammar',
  'print_sr_juken_en_rc',
  'print_sr_juken_en_trend',
  'print_sr_juken_ma_algebra',
  'print_sr_juken_ma_func',
  'print_sr_juken_ma_geom',
  'print_sr_juken_ma_data',
  'print_sr_juken_ja_kotoba',
  'print_sr_juken_ja_reading',
  'print_sr_juken_ja_koten',
  'print_sr_juken_sc_phys_chem',
  'print_sr_juken_sc_bio_earth',
  'print_sr_juken_so_geo',
  'print_sr_juken_so_hist',
  'print_sr_juken_so_civics',
  // 装飾（勉強・受験モードの雰囲気のもの）
  'pose_studying', 'pose_thinking', 'pose_trophy', 'frame_prism',
  'hat_graduation', 'hat_beanie_navy', 'hat_wizard',
  'glasses_round', 'glasses_square', 'glasses_monocle', 'glasses_star',
  'cheek_blush', 'cheek_sticker',
  'aura_abc', 'aura_formula', 'aura_flame', 'aura_stars',
  'wall_grid', 'wall_lined', 'wall_library', 'wall_english', 'wall_chalk', 'wall_night',
];

/** 都道府県選択ガチャで選べる47都道府県 */
export interface SelectableUniversity {
  id: string;
  name: string;
  track: string;
  label: string;
  region: PrintShelfId;
  regionLabel: string;
  printIds: readonly string[];
}

const REGION_ORDER: readonly PrintShelfId[] = [
  'hokkaido_tohoku',
  'kanto',
  'chubu',
  'kinki',
  'chugoku_shikoku',
  'kyushu_okinawa',
];

function buildSelectablePrefectures(): readonly SelectableUniversity[] {
  const byId = new Map<string, string[]>();
  for (const printId of UNIV_MOCK_PRINT_IDS) {
    const key = univOfPrint(printId);
    if (!key) continue;
    const list = byId.get(key) ?? [];
    list.push(printId);
    byId.set(key, list);
  }
  const raw: SelectableUniversity[] = [];
  for (const u of NIJI_UNIVERSITIES) {
    const printIds = byId.get(u.id);
    if (!printIds?.length) continue;
    const region = UNIV_REGION[u.id] ?? 'other';
    const regionLabel = PRINT_SHELVES.find((s) => s.id === region)?.label ?? u.region;
    raw.push({
      id: u.id,
      name: u.name,
      track: '5教科予想問題＋内申・傾向解説',
      label: u.name,
      region,
      regionLabel,
      printIds,
    });
  }
  return raw.sort((a, b) => {
    const ra = REGION_ORDER.indexOf(a.region);
    const rb = REGION_ORDER.indexOf(b.region);
    const oa = ra === -1 ? 99 : ra;
    const ob = rb === -1 ? 99 : rb;
    return oa - ob;
  });
}

export const SELECTABLE_UNIVERSITIES: readonly SelectableUniversity[] = buildSelectablePrefectures();
export const DEFAULT_GACHA_UNIV_ID: string =
  SELECTABLE_UNIVERSITIES.find((u) => u.id === 'tokyo')?.id ?? SELECTABLE_UNIVERSITIES[0]?.id ?? 'tokyo';

export function selectableUniversityOf(univId?: string | null): SelectableUniversity {
  return SELECTABLE_UNIVERSITIES.find((u) => u.id === univId) ?? SELECTABLE_UNIVERSITIES[0];
}

export function normalizeGachaUnivId(univId?: string | null): string {
  return selectableUniversityOf(univId).id;
}

const UNIV_MOCK_SET: ReadonlySet<string> = new Set(UNIV_MOCK_PRINT_IDS);

/** そのアイテムがガチャの種類 pool に入るか（ガチャで出る物かどうかの判定は呼び出し側） */
export function inGachaPool(id: string, pool: GachaPoolId, univId?: string): boolean {
  if (pool === 'univ') {
    const targetPref = normalizeGachaUnivId(univId);
    if (UNIV_MOCK_SET.has(id)) return univOfPrint(id) === targetPref;
    return NIJI_NEW_ITEM_IDS.includes(id) || NIJI_SHARED_IDS.includes(id);
  }
  if (pool === 'niji') return NIJI_ONLY_IDS.has(id) || NIJI_SHARED_IDS.includes(id);
  return !NIJI_ONLY_IDS.has(id);
}
