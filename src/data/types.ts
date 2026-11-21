/**
 * マナトビ高校入試 ─ 問題データの型
 *
 * 設計方針（マナトビ英検 / マナトビリスニングの data 層と同じ考え方）:
 *   - 1単元＝4問。単元IDは `<subject>-<n>` で固定し、進捗キーにそのまま使う。
 *   - 正解は選択肢の index。クライアントで採点する（オフラインでも解ける）。
 *   - explanation は必ず「なぜそうなるか」を書く。point は1行の要点。
 */

export type SubjectKey = 'english' | 'math' | 'japanese' | 'science' | 'social'

export type Question = {
  id: string
  /** 問題文。\n で改行できる */
  prompt: string
  /** 長文・資料・実験の説明。無い問題は省略 */
  passage?: string
  choices: string[]
  /** choices の正解 index */
  answer: number
  explanation: string
  point?: string
  /** 1=基本 2=標準 3=入試実戦 */
  level: 1 | 2 | 3
}

export type Unit = {
  id: string
  subject: SubjectKey
  name: string
  /** 学年の目安（中1／中2／中3／入試） */
  grade: string
  description: string
  questions: Question[]
}

export type Subject = {
  key: SubjectKey
  name: string
  /** 英字の小見出し（キッカー）用 */
  en: string
  /** アクセント色。styles 側の --subj-* と対応 */
  tone: 'blue' | 'teal' | 'rose' | 'sage' | 'gold'
  /** ひとこと説明 */
  tagline: string
  units: Unit[]
}

/** /api/catalog が返す軽い索引（問題文は含めない） */
export type CatalogUnit = {
  id: string
  subject: SubjectKey
  name: string
  grade: string
  description: string
  count: number
}

export type CatalogSubject = {
  key: SubjectKey
  name: string
  en: string
  tone: Subject['tone']
  tagline: string
  units: CatalogUnit[]
  questionCount: number
}
