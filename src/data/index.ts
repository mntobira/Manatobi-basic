import type { CatalogSubject, Subject, SubjectKey, Unit } from './types'
import { englishUnits } from './english'
import { japaneseUnits } from './japanese'
import { mathUnits } from './math'
import { scienceUnits } from './science'
import { socialUnits } from './social'

export const SUBJECTS: Subject[] = [
  {
    key: 'english',
    name: '英語',
    en: 'ENGLISH',
    tone: 'blue',
    tagline: '文法・読解・英作文で得点を積む',
    units: englishUnits,
  },
  {
    key: 'math',
    name: '数学',
    en: 'MATHEMATICS',
    tone: 'teal',
    tagline: '計算の土台から入試の図形まで',
    units: mathUnits,
  },
  {
    key: 'japanese',
    name: '国語',
    en: 'JAPANESE',
    tone: 'rose',
    tagline: '漢字・古典・読解をまんべんなく',
    units: japaneseUnits,
  },
  {
    key: 'science',
    name: '理科',
    en: 'SCIENCE',
    tone: 'sage',
    tagline: '実験の根拠から決める1問',
    units: scienceUnits,
  },
  {
    key: 'social',
    name: '社会',
    en: 'SOCIAL STUDIES',
    tone: 'gold',
    tagline: '地理・歴史・公民を横断して',
    units: socialUnits,
  },
]

export const ALL_UNITS: Unit[] = SUBJECTS.flatMap((s) => s.units)

export function findSubject(key: string): Subject | undefined {
  return SUBJECTS.find((s) => s.key === key)
}

export function findUnit(unitId: string): Unit | undefined {
  return ALL_UNITS.find((u) => u.id === unitId)
}

export function findSubjectOfUnit(unitId: string): Subject | undefined {
  return SUBJECTS.find((s) => s.units.some((u) => u.id === unitId))
}

/** 軽い索引（問題文を含まない）。ホーム・単元一覧はこれだけを読む。 */
export function buildCatalog(): CatalogSubject[] {
  return SUBJECTS.map((s) => ({
    key: s.key,
    name: s.name,
    en: s.en,
    tone: s.tone,
    tagline: s.tagline,
    units: s.units.map((u) => ({
      id: u.id,
      subject: u.subject,
      name: u.name,
      grade: u.grade,
      description: u.description,
      count: u.questions.length,
    })),
    questionCount: s.units.reduce((n, u) => n + u.questions.length, 0),
  }))
}

export const TOTAL_QUESTIONS = ALL_UNITS.reduce((n, u) => n + u.questions.length, 0)

export const SUBJECT_KEYS: SubjectKey[] = SUBJECTS.map((s) => s.key)
