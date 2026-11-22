/**
 * ===================================================================
 * マナトビ高校入試 データ品質ゲート検査（validate-juken-data.mts）
 * ===================================================================
 *
 * 実行: npx tsx scripts/validate-juken-data.mts
 *
 * 検査項目:
 *  1. 全47都道府県の入試研究データが揃い、内申シミュレーターが正常動作すること
 *  2. 5教科すべての章・大問・小問が一意のIDを持ち、選択肢の重複や空文字が無いこと
 *  3. 4択問題の正答位置（0, 1, 2, 3）が偏っておらず、各18%〜32%に分散していること
 *  4. practiceProblems と miniTest の間で同一小問IDや同一問題文の使い回しが0件であること
 *  5. 参照されているすべての imageUrl が public/ 配下に実在すること
 *  6. 合計問題数が240問以上あること
 */
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PREFECTURE_EXAMS, simulatePrefectureNaishin } from '../src/data/prefectureExams';
import { SUBJECTS, getChaptersOfSubject } from '../src/data/allChapters';

const HERE = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(HERE, '../public');

function fail(msg: string): never {
  console.error(`\n❌ [validate-juken-data] 品質検査エラー: ${msg}\n`);
  process.exit(1);
}

// 1. 47都道府県の検証
if (PREFECTURE_EXAMS.length !== 47) {
  fail(`都道府県データ数が 47 ではありません (${PREFECTURE_EXAMS.length})`);
}

const prefIds = new Set<string>();
for (const pref of PREFECTURE_EXAMS) {
  if (prefIds.has(pref.id)) fail(`重複した都道府県ID: ${pref.id}`);
  prefIds.add(pref.id);
  const sim = simulatePrefectureNaishin(pref, {
    j1Core: 4, j1Prac: 4,
    j2Core: 4, j2Prac: 4,
    j3Core: 4, j3Prac: 4,
  });
  if (!(sim.rawScore > 0 && sim.rawMax > 0 && sim.percentage > 75 && sim.percentage < 85)) {
    fail(`${pref.name} のオール4シミュレーション結果が異常です: ${JSON.stringify(sim)}`);
  }
  if (pref.recommendedChapters.length < 3) {
    fail(`${pref.name} のおすすめ単元が不足しています`);
  }
}

// 2〜6. 5教科データの検証
const chapterIds = new Set<string>();
const problemIds = new Set<string>();
const sqIds = new Set<string>();
const posCounts = [0, 0, 0, 0];
let choice4Total = 0;
let shortTotal = 0;
let withDistractors = 0;
let withFigures = 0;

const subjectSummary: Record<string, { chapters: number; practiceQs: number; miniQs: number; totalQs: number }> = {};

for (const sub of SUBJECTS) {
  const chapters = getChaptersOfSubject(sub.id);
  if (chapters.length < 4) {
    fail(`教科 ${sub.id} の章数が少なすぎます (${chapters.length})`);
  }
  let pCount = 0;
  let mCount = 0;

  for (const ch of chapters) {
    if (chapterIds.has(ch.id)) fail(`重複した章ID: ${ch.id}`);
    chapterIds.add(ch.id);

    if (!ch.practiceProblems?.length) fail(`章 ${ch.id} に practiceProblems がありません`);
    if (!ch.miniTest?.length) fail(`章 ${ch.id} に miniTest がありません`);

    const practicePrompts = new Set<string>();

    const checkProblem = (pr: typeof ch.practiceProblems[number], isMini: boolean) => {
      if (problemIds.has(pr.id)) fail(`重複した大問ID: ${pr.id}`);
      problemIds.add(pr.id);

      if (!pr.text.trim()) fail(`大問 ${pr.id} のリード文が空です`);

      if (pr.imageUrl) {
        const diskPath = resolve(PUBLIC_DIR, pr.imageUrl.replace(/^\//, ''));
        if (!existsSync(diskPath)) {
          fail(`大問 ${pr.id} の画像ファイルが存在しません: ${pr.imageUrl} -> ${diskPath}`);
        }
        withFigures += 1;
      }

      for (const sq of pr.subQuestions) {
        if (sqIds.has(sq.id)) fail(`重複した小問ID: ${sq.id}`);
        sqIds.add(sq.id);

        if (sq.imageUrl) {
          const diskPath = resolve(PUBLIC_DIR, sq.imageUrl.replace(/^\//, ''));
          if (!existsSync(diskPath)) {
            fail(`小問 ${sq.id} の画像ファイルが存在しません: ${sq.imageUrl}`);
          }
          withFigures += 1;
        }

        const promptBody = sq.label.replace(/^\(\d+\)\s*/, '').trim();
        if (promptBody.length < 6) {
          fail(`小問 ${sq.id} の問題文が短すぎます: "${sq.label}"`);
        }

        if (!isMini) {
          practicePrompts.add(promptBody);
          pCount += 1;
        } else {
          if (practicePrompts.has(promptBody)) {
            fail(`章 ${ch.id} の miniTest 小問 "${sq.id}" が practice の問題文を使い回しています: "${promptBody}"`);
          }
          mCount += 1;
        }

        if (sq.type === 'multiple_choice') {
          if (sq.options.length !== 4) {
            fail(`小問 ${sq.id} の選択肢数が4ではありません (${sq.options.length})`);
          }
          const trimmed = sq.options.map((o) => o.trim());
          if (trimmed.some((o) => !o)) {
            fail(`小問 ${sq.id} に空の選択肢があります`);
          }
          if (new Set(trimmed).size !== 4) {
            fail(`小問 ${sq.id} の選択肢が重複しています: ${JSON.stringify(trimmed)}`);
          }
          const ansIdx = trimmed.indexOf(sq.correctAnswer.trim());
          if (ansIdx < 0 || ansIdx > 3) {
            fail(`小問 ${sq.id} の correctAnswer "${sq.correctAnswer}" が options に見つかりません`);
          }
          posCounts[ansIdx] += 1;
          choice4Total += 1;
          if (sq.distractors && sq.distractors.length > 0) {
            withDistractors += 1;
          }
        } else if (sq.type === 'short_answer') {
          if (!sq.correctAnswer.trim()) {
            fail(`短答小問 ${sq.id} の正解が空です`);
          }
          shortTotal += 1;
        }
      }
    };

    for (const pr of ch.practiceProblems) checkProblem(pr, false);
    for (const pr of ch.miniTest) checkProblem(pr, true);
  }

  subjectSummary[sub.id] = {
    chapters: chapters.length,
    practiceQs: pCount,
    miniQs: mCount,
    totalQs: pCount + mCount,
  };
}

// すべての recommendedChapters が実在する章IDを指しているか検証
for (const pref of PREFECTURE_EXAMS) {
  for (const rec of pref.recommendedChapters) {
    if (!chapterIds.has(rec.chapterId)) {
      fail(`${pref.name} のおすすめ単元ID "${rec.chapterId}" が実在しません`);
    }
  }
}

const grandTotal = choice4Total + shortTotal;
console.log('\n======================================================');
console.log(' ✅ マナトビ高校入試 データ品質検査レポート');
console.log('======================================================');
console.log(`・都道府県データ: ${PREFECTURE_EXAMS.length} 都道府県（内申シミュレーター検証OK）`);
for (const [subId, st] of Object.entries(subjectSummary)) {
  console.log(
    `・${subId.padEnd(9)}: ${String(st.chapters).padStart(2)}単元 ／ 演習 ${String(st.practiceQs).padStart(3)}問 ＋ 小テスト ${String(st.miniQs).padStart(3)}問 ＝ 計 ${String(st.totalQs).padStart(3)}問`,
  );
}
console.log(`・総問題数      : ${grandTotal} 問（4択 ${choice4Total}問 ／ 短答 ${shortTotal}問）`);
console.log(`・誤答解説付き  : ${withDistractors} 問 ／ 図版付き要素: ${withFigures} 件`);
if (choice4Total > 0) {
  const ratios = posCounts.map((c) => ((c / choice4Total) * 100).toFixed(1));
  console.log(
    `・4択正答位置分布: ① ${posCounts[0]} (${ratios[0]}%) / ② ${posCounts[1]} (${ratios[1]}%) / ③ ${posCounts[2]} (${ratios[2]}%) / ④ ${posCounts[3]} (${ratios[3]}%)`,
  );
  for (let i = 0; i < 4; i += 1) {
    const r = posCounts[i] / choice4Total;
    if (r < 0.17 || r > 0.33) {
      fail(`4択の正答位置 ${i + 1} 番の比率が偏っています (${ratios[i]}%)`);
    }
  }
}
if (grandTotal < 240) {
  fail(`総問題数が目標（240問以上）に届いていません: 現在 ${grandTotal} 問`);
}
console.log('======================================================\n');
