/**
 * ===================================================================
 * 章インデックス（軽い索引）の生成スクリプト（マナトビ 高校入試 5教科）
 * ===================================================================
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SUBJECTS, getPartsOfSubject } from '../src/data/allChapters';
import { ENGLISH_STATS } from '../src/data/englishData';
import { MATH_STATS } from '../src/data/mathData';
import { JAPANESE_STATS } from '../src/data/japaneseData';
import { SCIENCE_STATS } from '../src/data/scienceData';
import { SOCIAL_STATS } from '../src/data/socialData';
import type { SubjectKey } from '../src/data/subjects';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '../src/data/chapterIndex.generated.ts');

interface ChapterIndexEntry {
  id: string;
  partId?: string;
  partTitle?: string;
  title?: string;
  abstractTitle?: string;
  realTitle?: string;
  problemCount: number;
  practiceProblemCount: number;
  miniTestProblemCount: number;
  subQuestionCount: number;
  practiceSubQuestionCount: number;
  miniTestSubQuestionCount: number;
}

interface SubjectIndexEntry {
  id: string;
  label: string;
  chapters: ChapterIndexEntry[];
}

interface SubjectStats {
  chapters?: number;
  questions?: number;
  practiceQuestions?: number;
  miniTestQuestions?: number;
  sections?: number;
  units?: number;
  points?: number;
  marks?: number;
}

function toIndexStats(s: {
  partCount: number;
  chapterCount: number;
  practiceQuestionCount: number;
  miniTestQuestionCount: number;
  totalQuestionCount: number;
}): SubjectStats {
  return {
    sections: s.partCount,
    chapters: s.chapterCount,
    questions: s.totalQuestionCount,
    practiceQuestions: s.practiceQuestionCount,
    miniTestQuestions: s.miniTestQuestionCount,
  };
}

function buildSubjectStats(): Record<SubjectKey, SubjectStats> {
  return {
    english: toIndexStats(ENGLISH_STATS),
    math: toIndexStats(MATH_STATS),
    japanese: toIndexStats(JAPANESE_STATS),
    science: toIndexStats(SCIENCE_STATS),
    social: toIndexStats(SOCIAL_STATS),
  };
}

function buildIndex(): SubjectIndexEntry[] {
  const index: SubjectIndexEntry[] = [];

  for (const subject of SUBJECTS) {
    const parts = getPartsOfSubject(subject.id);
    const chapters: ChapterIndexEntry[] = [];

    for (const part of parts) {
      for (const chapter of part.chapters) {
        const practiceProblemCount = chapter.practiceProblems?.length || 0;
        const miniTestProblemCount = chapter.miniTest?.length || 0;
        const practiceSubQuestionCount = (chapter.practiceProblems || []).reduce(
          (sum, p) => sum + Math.max(1, (p.subQuestions || []).length),
          0,
        );
        const miniTestSubQuestionCount = (chapter.miniTest || []).reduce(
          (sum, p) => sum + Math.max(1, (p.subQuestions || []).length),
          0,
        );
        const entry: ChapterIndexEntry = {
          id: String(chapter.id),
          partId: part.id,
          partTitle: part.title,
          problemCount: practiceProblemCount + miniTestProblemCount,
          practiceProblemCount,
          miniTestProblemCount,
          subQuestionCount: practiceSubQuestionCount + miniTestSubQuestionCount,
          practiceSubQuestionCount,
          miniTestSubQuestionCount,
        };
        if (typeof chapter.title === 'string' && chapter.title) entry.title = chapter.title;
        if (typeof chapter.abstractTitle === 'string' && chapter.abstractTitle) {
          entry.abstractTitle = chapter.abstractTitle;
        }
        if (typeof chapter.realTitle === 'string' && chapter.realTitle) {
          entry.realTitle = chapter.realTitle;
        }
        chapters.push(entry);
      }
    }

    index.push({ id: subject.id, label: subject.label, chapters });
  }

  return index;
}

const HEADER = `/**
 * ===================================================================
 * 章インデックス（自動生成ファイル・手で編集しないこと）
 * ===================================================================
 */

export interface ChapterIndexEntry {
  id: string;
  partId?: string;
  partTitle?: string;
  title?: string;
  abstractTitle?: string;
  realTitle?: string;
  problemCount: number;
  practiceProblemCount?: number;
  miniTestProblemCount?: number;
  subQuestionCount?: number;
  practiceSubQuestionCount?: number;
  miniTestSubQuestionCount?: number;
}

export interface SubjectIndexEntry {
  id: string;
  label: string;
  chapters: readonly ChapterIndexEntry[];
}

export const SUBJECT_INDEX: readonly SubjectIndexEntry[] = `;

const FOOTER = `;

export function getChapterIndexOfSubject(
  subjectId: string | null | undefined,
): readonly ChapterIndexEntry[] {
  const entry = SUBJECT_INDEX.find((subject) => subject.id === subjectId) ?? SUBJECT_INDEX[0];
  return entry ? entry.chapters : [];
}

export function getPartIndexStats(
  subjectId: string | null | undefined,
  partId: string,
  chapterId?: string,
): {
  chapters: number;
  sets: number;
  practiceQuestions: number;
  miniTestQuestions: number;
} {
  const all = getChapterIndexOfSubject(subjectId).filter(
    (ch) => ch.partId === partId && (!chapterId || ch.id === chapterId),
  );
  return {
    chapters: all.length,
    sets: all.reduce((s, c) => s + (c.practiceProblemCount ?? 0), 0),
    practiceQuestions: all.reduce((s, c) => s + (c.practiceSubQuestionCount ?? 0), 0),
    miniTestQuestions: all.reduce((s, c) => s + (c.miniTestSubQuestionCount ?? 0), 0),
  };
}
`;

const STATS_HEADER = `
export interface SubjectStatsEntry {
  chapters?: number;
  questions?: number;
  practiceQuestions?: number;
  miniTestQuestions?: number;
  sections?: number;
  units?: number;
  points?: number;
  marks?: number;
}

export const SUBJECT_STATS: Readonly<Record<string, SubjectStatsEntry>> = `;

const STATS_FOOTER = `;

export function getSubjectStats(subjectId: string | null | undefined): SubjectStatsEntry {
  return SUBJECT_STATS[String(subjectId)] ?? {};
}
`;

function main(): void {
  const index = buildIndex();
  const stats = buildSubjectStats();

  const body = JSON.stringify(index, null, 2);
  const statsBody = JSON.stringify(stats, null, 2);
  const source = `${HEADER}${body}${FOOTER}${STATS_HEADER}${statsBody}${STATS_FOOTER}`;

  writeFileSync(OUT, source, 'utf8');

  const chapters = index.reduce((sum, s) => sum + s.chapters.length, 0);
  const problems = index.reduce(
    (sum, s) => sum + s.chapters.reduce((n, c) => n + c.problemCount, 0),
    0,
  );
  const subQuestions = index.reduce(
    (sum, s) => sum + s.chapters.reduce((n, c) => n + c.subQuestionCount, 0),
    0,
  );
  console.log(`[gen:index] ${OUT}`);
  console.log(`[gen:index] 教科 ${index.length} / 章 ${chapters} / 大問 ${problems} / 小問 ${subQuestions}`);
  console.log(`[gen:index] 生成サイズ ${Buffer.byteLength(source, 'utf8').toLocaleString()} バイト`);
}

main();
