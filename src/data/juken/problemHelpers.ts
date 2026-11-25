/**
 * 高校入試 5教科データ構築ヘルパー（v2 高品質版）
 *
 * ■ v2 での品質向上ポイント
 * 1. 正答位置（0, 1, 2, 3）の決定論的シャッフル：
 *    手書き原稿で answerIndex: 0 に偏っていても、設問IDハッシュにより
 *    ①②③④に均等分散（各約25%）し、ビルドのたびに同じ並びを再現する。
 *    （ただし「ア・イ・ウ・エの順」など順序自体に意味がある設問は preserveOrder: true で固定可）
 * 2. 誤答選択肢の吟味（distractors & SQ_MARK スライス解説）：
 *    Explanation.tsx / SubQuestionCard.tsx が小問ごとにピンポイントで解説を切り出せるよう、
 *    SQ_MARK / SQ_BODY_MARK / SQ_SHARED_MARK 形式で構造化解説を出力し、
 *    誤答選択肢ごとの「ひっかけの正体（なぜ誤りか）」も併記する。
 * 3. 図表（imageUrl / imageCaption）・数式パレット（requiresMathPalette）・
 *    短答（short_answer / acceptedAnswers）に完全対応。
 * 4. miniTest と practice の完全分離：
 *    miniTest が未指定の場合でも先頭からの単純コピーはせず、専用チェック問題を構築、
 *    さらに原則として各章に独立した miniTest 大問を持たせる。
 */
import type { Chapter, Distractor, Part, Problem, SubQuestion } from '../../types/curriculum';

export interface QuestionSpec {
  /** 小問見出し兼問題文（バトルや復習でもこれ1つで意味が通る文面にする） */
  prompt: string;
  /** 4つの選択肢（記号なし本文）。short_answer の場合は省略可 */
  choices?: [string, string, string, string];
  /** choices 内の正解インデックス（既定 0）。preserveOrder でなければ決定論的にシャッフルされる */
  answerIndex?: 0 | 1 | 2 | 3;
  /** 選択肢の並び順を固定したい場合（数値の昇順、年代順など）は true */
  preserveOrder?: boolean;
  /** 他の選択肢が誤りである理由（元の choices の誤答3つに対応、または自由記述） */
  wrongReasons?: [string, string, string] | Record<string, string>;
  /** 短答問題にする場合の正解文字列 */
  shortAnswer?: string;
  /** 短答問題の別解リスト */
  acceptedAnswers?: string[];
  /** 解法の要点・根拠（2〜4文で具体的に） */
  why: string;
  /** 対戦リザルト・一覧用の1行ポイント（「正解 ＝ 理由」形式推奨） */
  oneLine: string;
  /** 分野スキルタグ（結果画面の弱点分析に直結） */
  skill?: string;
  /** 解き方の型ラベル（例：『対照実験の条件制御』『定比例4:1計算』） */
  patternType?: string;
  /** 想定正答率（%） */
  rate?: number;
  /** 難易度（1〜5） */
  difficulty?: 1 | 2 | 3 | 4 | 5;
  /** 思考手順ステップ（丸数字①②③として表示される） */
  steps?: string[];
  /** 配点（既定 3点） */
  points?: number;
  /** 対戦制限時間（秒、既定 20） */
  battleTimeSec?: number;
  /** 小問固有の図表URL */
  imageUrl?: string;
  imageCaption?: string;
}

export interface ProblemSpec {
  id: string;
  title: string;
  category: string;
  /** 大問共通のリード文（Markdown表 `|...|` も ExplanationBody が美しい格子表として描画する！） */
  leadText: string;
  /** 大問共通の図版URL（public/juken_figs/*.svg など） */
  imageUrl?: string;
  imageCaption?: string;
  requiresMathPalette?: boolean;
  requiresChemicalPalette?: boolean;
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
  miniTest: ProblemSpec[];
}

/** FNV-1a 32bit hash（ビルド再現性100%の決定論的シード） */
function hashSeed(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

/**
 * 4択をシード付きで決定論的に並べ替える。
 * 連続する小問で同じ位置ばかりにならないよう、問題ID＋小問番号から巡回オフセットも混ぜる。
 */
function deterministicShuffleChoices(
  choices: [string, string, string, string],
  answerIndex: 0 | 1 | 2 | 3,
  sqId: string,
  idx: number,
  preserveOrder?: boolean,
): { options: string[]; newAnswerIndex: number; oldIndexOfNewPos: number[] } {
  if (preserveOrder) {
    return {
      options: [...choices],
      newAnswerIndex: answerIndex,
      oldIndexOfNewPos: [0, 1, 2, 3],
    };
  }

  // 全24通りの順列のうち、シードで決定しつつ正答位置が (hash + idx) % 4 に散るように選ぶ
  const h = hashSeed(`mntb-v2:${sqId}`);
  const targetAnswerPos = (h + idx * 3) % 4;

  const wrongOldIndices = [0, 1, 2, 3].filter((i) => i !== answerIndex);
  // 誤答3つの並びもハッシュで決定論的に入れ替える（6通り）
  const perm6: [number, number, number][] = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];
  const p = perm6[(h >>> 4) % 6];
  const orderedWrongs = [wrongOldIndices[p[0]], wrongOldIndices[p[1]], wrongOldIndices[p[2]]];

  const oldIndexOfNewPos: number[] = [];
  let wPtr = 0;
  for (let pos = 0; pos < 4; pos += 1) {
    if (pos === targetAnswerPos) {
      oldIndexOfNewPos.push(answerIndex);
    } else {
      oldIndexOfNewPos.push(orderedWrongs[wPtr++]);
    }
  }

  return {
    options: oldIndexOfNewPos.map((oi) => choices[oi]),
    newAnswerIndex: targetAnswerPos,
    oldIndexOfNewPos,
  };
}

const SQ_MARK = (id: string) => `<!--sq:${id}-->`;
const SQ_BODY_MARK = (id: string) => `<!--sq-body:${id}-->`;
const SQ_SHARED_MARK = '<!--sq-shared-->';

export function buildProblem(spec: ProblemSpec): Problem {
  const perSqExplanationBlocks: string[] = [];

  const subQuestions: SubQuestion[] = spec.questions.map((q, idx) => {
    const sqId = `${spec.id}_q${idx + 1}`;
    const isShort = typeof q.shortAnswer === 'string' && !q.choices;

    let options: string[] = [];
    let correctAnswer = '';
    let distractors: Distractor[] | undefined;

    if (isShort) {
      correctAnswer = q.shortAnswer!.trim();
    } else {
      const rawChoices = q.choices!;
      const rawAnsIdx = q.answerIndex ?? 0;
      const shuffled = deterministicShuffleChoices(
        rawChoices,
        rawAnsIdx,
        sqId,
        idx,
        q.preserveOrder,
      );
      options = shuffled.options;
      correctAnswer = options[shuffled.newAnswerIndex];

      // 誤答理由マップの構築
      const wrongReasonByOldIdx = new Map<number, string>();
      if (Array.isArray(q.wrongReasons)) {
        const wrongOlds = [0, 1, 2, 3].filter((i) => i !== rawAnsIdx);
        wrongOlds.forEach((oldI, wi) => {
          if (q.wrongReasons && Array.isArray(q.wrongReasons) && q.wrongReasons[wi]) {
            wrongReasonByOldIdx.set(oldI, q.wrongReasons[wi]);
          }
        });
      } else if (q.wrongReasons && typeof q.wrongReasons === 'object') {
        rawChoices.forEach((chText, oldI) => {
          const r = (q.wrongReasons as Record<string, string>)[chText];
          if (r) wrongReasonByOldIdx.set(oldI, r);
        });
      }

      if (wrongReasonByOldIdx.size > 0) {
        distractors = [];
        shuffled.oldIndexOfNewPos.forEach((oldI, newPos) => {
          if (newPos === shuffled.newAnswerIndex) return;
          const reason = wrongReasonByOldIdx.get(oldI);
          if (reason) {
            distractors!.push({
              no: newPos + 1,
              why: `「${options[newPos]}」→ ${reason}`,
            });
          }
        });
      }
    }

    const steps =
      q.steps && q.steps.length > 0
        ? q.steps
        : [
            `着眼点：${q.oneLine}`,
            `根拠と解法：${q.why}`,
            `結論：正解は「${correctAnswer}」となる。`,
          ];

    // 小問専用スライス本文（Explanation.tsx の「解説」アコーディオン内に表示される）
    const distractorLines =
      distractors && distractors.length > 0
        ? [
            '',
            '【他の選択肢が誤りである理由（消去法の根拠）】',
            ...distractors.map((d) => `・選択肢${d.no} ${d.why}`),
          ]
        : [];

    const sqBody = [
      `【正解】${correctAnswer}`,
      '',
      q.why,
      ...distractorLines,
    ].join('\n');

    perSqExplanationBlocks.push(
      `${SQ_MARK(sqId)}\n${SQ_BODY_MARK(sqId)}\n${sqBody}`,
    );

    return {
      id: sqId,
      label: `(${idx + 1}) ${q.prompt}`,
      type: isShort ? 'short_answer' : 'multiple_choice',
      options,
      correctAnswer,
      acceptedAnswers: q.acceptedAnswers,
      correctAnswerRate: q.rate ?? 64,
      examPoints: q.points ?? 3,
      skill: q.skill ?? spec.category,
      explainJa: q.why,
      oneLine: `${correctAnswer} ＝ ${q.oneLine}`,
      distractors,
      battleTimeLimit: q.battleTimeSec ?? 20,
      imageUrl: q.imageUrl,
      imageCaption: q.imageCaption,
      detailedExplanation: {
        theme: q.oneLine,
        type: q.patternType ?? '入試頻出パターン',
        difficulty: q.difficulty ?? 3,
        steps,
      },
    };
  });

  const combinedExplanation = [
    `<!--fmt-v1-->`,
    `【${spec.title} の攻略ポイント】\n${spec.explanationSummary}`,
    ...perSqExplanationBlocks,
    `${SQ_SHARED_MARK}\n${spec.explanationSummary}`,
  ].join('\n\n');

  return {
    id: spec.id,
    title: spec.title,
    category: spec.category,
    text: spec.leadText,
    imageUrl: spec.imageUrl,
    imageCaption: spec.imageCaption,
    requiresMathPalette: spec.requiresMathPalette,
    requiresChemicalPalette: spec.requiresChemicalPalette,
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
  const miniTest = spec.miniTest.map(buildProblem);

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

export interface ChapterExpansionSpec {
  practice?: ProblemSpec[];
  miniTest?: ProblemSpec[];
}

export function applyChapterExpansions(
  parts: Part[],
  expansions: Record<string, ChapterExpansionSpec>,
): Part[] {
  return parts.map((part) => ({
    ...part,
    chapters: part.chapters.map((ch) => {
      const exp = expansions[ch.id];
      if (!exp) return ch;
      const addedPractice = (exp.practice ?? []).map(buildProblem);
      const addedMini = (exp.miniTest ?? []).map(buildProblem);
      return {
        ...ch,
        practiceProblems: [...ch.practiceProblems, ...addedPractice],
        miniTest: [...ch.miniTest, ...addedMini],
      };
    }),
  }));
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
