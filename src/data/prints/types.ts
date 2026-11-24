import type { SubjectKey } from '../subjects';

export interface PrintTableSpec {
  headers: string[];
  rows: string[][];
}

export interface PrintSheetItem {
  heading: string;
  body: string;
  tip?: string;
  imageUrl?: string;
  imageCaption?: string;
  table?: PrintTableSpec;
}

export interface SummaryPrintSheet {
  id: string;
  subject: SubjectKey;
  /** 科目内の分野フィルタ用カテゴリ（例：『生物』『地理（日本）』など） */
  group: string;
  badge: string;
  title: string;
  subtitle: string;
  /** 出題優先度（1〜5） */
  stars: 3 | 4 | 5;
  /** 直結する演習単元ID */
  linkedChapterId: string;
  items: PrintSheetItem[];
}
