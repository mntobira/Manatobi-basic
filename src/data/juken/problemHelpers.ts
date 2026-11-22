/**
 * 高校入試 5教科データ構築ヘルパー
 *
 * types/curriculum.ts の Part / Chapter / Problem / SubQuestion に完全準拠し、
 * 通常演習・小テスト・解説画面・復習ノート・1v1対戦・60秒マナラッシュの
 * すべてで美しく表示・採点できるように整形する。
 */
import type { Chapter, Part, Problem, SubQuestion } from '../../types/curriculum';

export interface QuestionSpec {
  /** 小問見出し兼問題文（これ1つで単体成立する文面にする：バトルや復習でも単体表示されるため） */
  prompt: string;
  /** 4つの選択肢（記号なし本文） */
  choices: [string, string, string, string];
  /** 正解のインデックス（0〜3） */
  answerIndex: 0 | 1 | 2 | 3;
  /** 解法の要点（1〜3行） */
  why: string;
  /** 対戦結果・一覧用の1行ポイント */
  oneLine: string;
  /** 分野スキルタグ（結果画面の分野別正答率で集計される） */
  skill?: string;
  /** 想定正答率（%） */
  rate?: number;
  /** 難易度（1〜5） */
  difficulty?: 1 | 2 | 3 | 4 | 5;
  /** ステップ解説 */
  steps?: string[];
  /** 配点（既定 2点） */
  points?: number;
}

export interface ProblemSpec {
  id: string;
  title: string;
  category: string;
  leadText: string;
  questions: QuestionSpec[];
  explanationSummary: string;
  surroundingKnowledge: string[];
  deepDiveTopics: string[];
  stepwise?: boolean;
  timeLimitSec?: number;
}

export interface ChapterSpec {
  id: string;
  abstractTitle: string;
  realTitle: string;
  questionGroup: string;
  topics: string[];
  practice: ProblemSpec[];
  miniTest?: ProblemSpec[];
}

export function buildProblem(spec: ProblemSpec): Problem {
  const subQuestions: SubQuestion[] = spec.questions.map((q, idx) => {
    const correctAnswer = q.choices[q.answerIndex];
    const steps =
      q.steps && q.steps.length > 0
        ? q.steps
        : [
            `【着眼点】${q.oneLine}`,
            `【解法】${q.why}`,
            `【正解】「${correctAnswer}」を選ぶ。`,
          ];
    return {
      id: `${spec.id}_q${idx + 1}`,
      label: `(${idx + 1}) ${q.prompt}`,
      type: 'multiple_choice',
      options: [...q.choices],
      correctAnswer,
      correctAnswerRate: q.rate ?? 68,
      examPoints: q.points ?? 2,
      skill: q.skill ?? spec.category,
      explainJa: q.why,
      oneLine: q.oneLine,
      battleTimeLimit: 20,
      detailedExplanation: {
        theme: q.skill ?? spec.category,
        type: '入試頻出パターン',
        difficulty: q.difficulty ?? 3,
        steps,
      },
    };
  });

  const combinedExplanation = [
    `【${spec.title} の攻略ポイント】`,
    spec.explanationSummary,
    '',
    ...spec.questions.map(
      (q, idx) =>
        `(${idx + 1}) 正解：${q.choices[q.answerIndex]}\n・${q.why}`,
    ),
  ].join('\n');

  return {
    id: spec.id,
    title: spec.title,
    category: spec.category,
    text: spec.leadText,
    subQuestions,
    explanation: combinedExplanation,
    surroundingKnowledge: spec.surroundingKnowledge,
    deepDiveTopics: spec.deepDiveTopics,
    stepwise: spec.stepwise ?? true,
    timeLimitSec: spec.timeLimitSec,
  };
}

export function buildChapter(spec: ChapterSpec): Chapter {
  const practiceProblems = spec.practice.map(buildProblem);
  // miniTest が省略されている場合は、各演習大問から代表小問を抜粋して確認小テストを自動編成する
  const miniTest: Problem[] =
    spec.miniTest && spec.miniTest.length > 0
      ? spec.miniTest.map(buildProblem)
      : [
          buildProblem({
            id: `${spec.id}_mini`,
            title: `${spec.abstractTitle} 実戦チェック小テスト`,
            category: spec.questionGroup,
            leadText: `「${spec.realTitle}」の入試重要ポイントを確認する実戦チェック問題です。`,
            questions: spec.practice
              .flatMap((p) => p.questions)
              .slice(0, 4),
            explanationSummary: `${spec.abstractTitle}の頻出パターンを総復習しましょう。間違えた問題は復習ノートから再挑戦できます。`,
            surroundingKnowledge: spec.practice[0]?.surroundingKnowledge ?? [],
            deepDiveTopics: spec.practice[0]?.deepDiveTopics ?? [],
          }),
        ];

  return {
    id: spec.id,
    title: spec.abstractTitle,
    abstractTitle: spec.abstractTitle,
    realTitle: spec.realTitle,
    questionGroup: spec.questionGroup,
    topics: spec.topics,
    practiceProblems,
    miniTest,
  };
}

export function countSubjectStats(parts: Part[]) {
  const chapters = parts.flatMap((p) => p.chapters);
  const practiceCount = chapters.reduce(
    (sum, ch) =>
      sum +
      ch.practiceProblems.reduce((s, pr) => s + pr.subQuestions.length, 0),
    0,
  );
  const miniCount = chapters.reduce(
    (sum, ch) =>
      sum + ch.miniTest.reduce((s, pr) => s + pr.subQuestions.length, 0),
    0,
  );
  return {
    partCount: parts.length,
    chapterCount: chapters.length,
    practiceQuestionCount: practiceCount,
    miniTestQuestionCount: miniCount,
    totalQuestionCount: practiceCount + miniCount,
  };
}
