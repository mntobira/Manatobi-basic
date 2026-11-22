/**
 * ===================================================================
 * 章インデックス（軽い索引）の生成スクリプト（マナトビ 高校入試 5教科）
 * ===================================================================
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SUBJECTS, getChaptersOfSubject } from '../src/data/allChapters';
import { getEnglishStats } from '../src/data/englishData';
import { getMathStats } from '../src/data/mathData';
import { getJapaneseStats } from '../src/data/japaneseData';
import { getScienceStats } from '../src/data/scienceData';
import { getSocialStats } from '../src/data/socialData';
import type { SubjectKey } from '../src/data/subjects';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '../src/data/chapterIndex.generated.ts');

interface ChapterIndexEntry {
  id: string;
  title?: string;
  abstractTitle?: string;
  realTitle?: string;
  problemCount: number;
}

interface SubjectIndexEntry {
  id: string;
  label: string;
  chapters: ChapterIndexEntry[];
}

interface SubjectStats {
  chapters?: number;
  questions?: number;
  sections?: number;
  units?: number;
  points?: number;
  marks?: number;
}

function toIndexStats(s: {
  partCount: number;
  chapterCount: number;
  totalQuestionCount: number;
}): SubjectStats {
  return {
    sections: s.partCount,
    chapters: s.chapterCount,
    questions: s.totalQuestionCount,
  };
}

function buildSubjectStats(): Record<SubjectKey, SubjectStats> {
  return {
    english: toIndexStats(getEnglishStats()),
    math: toIndexStats(getMathStats()),
    japanese: toIndexStats(getJapaneseStats()),
    science: toIndexStats(getScienceStats()),
    social: toIndexStats(getSocialStats()),
  };
}

function buildIndex(): SubjectIndexEntry[] {
  const index: SubjectIndexEntry[] = [];

  for (const subject of SUBJECTS) {
    const chapters = getChaptersOfSubject(subject.id).map((chapter) => {
      const entry: ChapterIndexEntry = {
        id: String(chapter.id),
        problemCount:
          (chapter.miniTest?.length || 0) + (chapter.practiceProblems?.length || 0),
      };
      if (typeof chapter.title === 'string' && chapter.title) entry.title = chapter.title;
      if (typeof chapter.abstractTitle === 'string' && chapter.abstractTitle) {
        entry.abstractTitle = chapter.abstractTitle;
      }
      if (typeof chapter.realTitle === 'string' && chapter.realTitle) {
        entry.realTitle = chapter.realTitle;
      }
      return entry;
    });

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
  title?: string;
  abstractTitle?: string;
  realTitle?: string;
  problemCount: number;
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
`;

const STATS_HEADER = `
export interface SubjectStatsEntry {
  chapters?: number;
  questions?: number;
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
  console.log(`[gen:index] ${OUT}`);
  console.log(`[gen:index] 教科 ${index.length} / 章 ${chapters} / 大問 ${problems}`);
  console.log(`[gen:index] 生成サイズ ${Buffer.byteLength(source, 'utf8').toLocaleString()} バイト`);
}

main();
