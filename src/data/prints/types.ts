import type { SubjectKey } from '../subjects';

export interface PrintTableSpec {
  headers: string[];
  rows: string[][];
}

/** 原本プリントの「しくみ・因果関係・2択対比」を図解枠としてそのまま表現するボックス */
export interface PrintFlowBox {
  badge: string;
  title: string;
  /** 矢印（→ / ↓）つきの因果・手順ステップ */
  steps: string[];
  /** 右端・結論の強調まとめ（例：『輸出＝円安有利！』） */
  conclusion: string;
  tone?: 'blue' | 'amber' | 'rose' | 'emerald';
}

/** 原本プリントの「演習1〜・基礎ドリル（まず自分で考えてから考え方＋解答を開く）」 */
export interface PrintWorkedExample {
  label: string;
  question: string;
  thinking: string;
  answer: string;
}

export interface PrintSheetItem {
  heading: string;
  /** 単なる丸暗記にしないための「なぜそうなるか（本質・理屈の1行導入）」 */
  whyCore?: string;
  body: string;
  tip?: string;
  imageUrl?: string;
  imageCaption?: string;
  table?: PrintTableSpec;
  flowBoxes?: PrintFlowBox[];
  workedExamples?: PrintWorkedExample[];
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
