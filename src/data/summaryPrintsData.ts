/**
 * ===================================================================
 * マナトビ高校入試 最終まとめプリント 完全網羅版（全46シート・赤シート暗記＋比較表＋図解）
 * ===================================================================
 *
 * 送付5大プリント（理科最終プリント全35講、最終地理まとめプリント①〜⑭＋重要資料①②、
 * 最終公民まとめプリント①〜⑦、英語英作文対策プリント、直前数学対策PDF）
 * および YouTube『スタフリ | STUDY FREAK』5教科総復習・裏ワザ・歴史通史・国語全分野を完全収録。
 */

import type { SubjectKey } from './subjects';
import type { PrintTableSpec, PrintSheetItem, SummaryPrintSheet } from './prints/types';
import { ENGLISH_PRINT_SHEETS } from './prints/printsEnglish';
import { MATH_PRINT_SHEETS } from './prints/printsMath';
import { JAPANESE_PRINT_SHEETS } from './prints/printsJapanese';
import { SCIENCE_PRINT_SHEETS } from './prints/printsScience';
import { SOCIAL_PRINT_SHEETS } from './prints/printsSocial';

export type { PrintTableSpec, PrintSheetItem, SummaryPrintSheet };

export const SUMMARY_PRINT_SHEETS: readonly SummaryPrintSheet[] = [
  ...ENGLISH_PRINT_SHEETS,
  ...MATH_PRINT_SHEETS,
  ...JAPANESE_PRINT_SHEETS,
  ...SCIENCE_PRINT_SHEETS,
  ...SOCIAL_PRINT_SHEETS,
];

export function getPrintsBySubject(subject: SubjectKey): SummaryPrintSheet[] {
  return SUMMARY_PRINT_SHEETS.filter((p) => p.subject === subject);
}
