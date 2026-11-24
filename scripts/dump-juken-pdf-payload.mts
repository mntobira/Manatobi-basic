/**
 * Build JSON payload for generating all Juken Gacha PDFs:
 *  - 47 Prefectures from PREFECTURE_EXAMS
 *  - All 52 Chapters & 486 Questions across English / Math / Japanese / Science / Social
 *  - All 46 Summary Print Sheets across 5 subjects
 *  - All 27 English Writing Tasks
 */
import fs from 'node:fs';
import { PREFECTURE_EXAMS } from '../src/data/prefectureExams';
import { englishData } from '../src/data/englishData';
import { mathData } from '../src/data/mathData';
import { japaneseData } from '../src/data/japaneseData';
import { scienceData } from '../src/data/scienceData';
import { socialData } from '../src/data/socialData';
import { SUMMARY_PRINT_SHEETS } from '../src/data/summaryPrintsData';
import { WRITING_TASKS } from '../src/data/jukenWritingData';
import type { Part } from '../src/types/curriculum';

function flattenSubject(subject: string, parts: Part[]) {
  const chapters = parts.flatMap((part) =>
    part.chapters.map((ch) => ({
      id: ch.id,
      partTitle: part.title,
      title: ch.realTitle || ch.abstractTitle,
      abstractTitle: ch.abstractTitle,
      topics: ch.topics ?? [],
      questions: [
        ...(ch.practiceProblems ?? []),
        ...(ch.miniTest ?? []),
      ].flatMap((prob) =>
        (prob.subQuestions ?? []).map((sq) => ({
          id: sq.id,
          probTitle: prob.title || prob.category,
          category: prob.category,
          leadText: prob.text,
          prompt: sq.label,
          type: sq.type,
          options: sq.options ?? [],
          optionTexts: sq.optionTexts ?? [],
          correctAnswer: sq.correctAnswer,
          explanation: sq.explainJa || sq.explanation || prob.explanation || '',
          oneLine: sq.oneLine || '',
          skill: sq.skill ?? '',
          rate: sq.correctAnswerRate ?? 70,
        })),
      ),
    })),
  );
  return { subject, chapters };
}

const payload = {
  prefectures: PREFECTURE_EXAMS,
  subjects: {
    english: flattenSubject('english', englishData),
    math: flattenSubject('math', mathData),
    japanese: flattenSubject('japanese', japaneseData),
    science: flattenSubject('science', scienceData),
    social: flattenSubject('social', socialData),
  },
  summarySheets: SUMMARY_PRINT_SHEETS,
  writingTasks: WRITING_TASKS,
};

fs.mkdirSync('/tmp/juken_pdf_build', { recursive: true });
fs.writeFileSync('/tmp/juken_pdf_build/payload.json', JSON.stringify(payload, null, 2), 'utf8');
console.log(
  'Dumped payload:',
  PREFECTURE_EXAMS.length,
  'prefectures,',
  SUMMARY_PRINT_SHEETS.length,
  'sheets,',
  WRITING_TASKS.length,
  'writing tasks',
);
