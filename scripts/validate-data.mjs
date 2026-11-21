#!/usr/bin/env node
/**
 * 問題データの健全性チェック
 *   node scripts/validate-data.mjs
 *
 * src/data/index.ts を esbuild でその場でコンパイルし、
 * 実物のオブジェクトを検査する（正規表現パースではないので誤検知しない）。
 */
import { build } from 'esbuild'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const EXPECTED_SUBJECTS = 5
const EXPECTED_UNITS_PER_SUBJECT = 5
const EXPECTED_QUESTIONS_PER_UNIT = 4
const CHOICE_COUNT = 4
const SUBJECT_KEYS = ['english', 'math', 'japanese', 'science', 'social']

const errors = []
const warnings = []
const fail = (msg) => errors.push(msg)
const warn = (msg) => warnings.push(msg)

// ---------------------------------------------------------------------------
// コンパイルして読み込む
// ---------------------------------------------------------------------------
const outdir = mkdtempSync(join(tmpdir(), 'mntb-validate-'))
let mod
try {
  await build({
    entryPoints: [join(ROOT, 'src', 'data', 'index.ts')],
    outfile: join(outdir, 'data.mjs'),
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node18',
    logLevel: 'silent',
  })
  mod = await import(pathToFileURL(join(outdir, 'data.mjs')).href)
} catch (e) {
  console.error('✗ データのコンパイルに失敗しました（TypeScript の構文エラーの可能性）')
  console.error(e.message)
  process.exit(1)
} finally {
  rmSync(outdir, { recursive: true, force: true })
}

const { SUBJECTS } = mod
if (!Array.isArray(SUBJECTS)) {
  console.error('✗ SUBJECTS がエクスポートされていません')
  process.exit(1)
}

// ---------------------------------------------------------------------------
// 検査
// ---------------------------------------------------------------------------
if (SUBJECTS.length !== EXPECTED_SUBJECTS) {
  fail(`教科数が ${SUBJECTS.length}（期待値 ${EXPECTED_SUBJECTS}）`)
}

const seenSubjectKeys = new Set()
const allIds = new Map() // id -> 出現回数
const answerTally = [0, 0, 0, 0]
const pointMissing = []
const promptMaxLen = { id: '', len: 0 }
const choiceMaxLen = { id: '', len: 0 }
let totalUnits = 0
let totalQuestions = 0
const perSubjectCounts = {}
const levelTally = { 1: 0, 2: 0, 3: 0 }

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0

for (const subject of SUBJECTS) {
  const label = `教科「${subject?.name ?? '?'}」`

  // --- 教科メタ ---
  if (!SUBJECT_KEYS.includes(subject.key)) {
    fail(`${label}: key「${subject.key}」が想定外`)
  }
  if (seenSubjectKeys.has(subject.key)) fail(`${label}: key が重複`)
  seenSubjectKeys.add(subject.key)

  for (const field of ['name', 'en', 'tagline']) {
    if (!isNonEmptyString(subject[field])) fail(`${label}: ${field} が空`)
  }
  if (!['blue', 'teal', 'rose', 'sage', 'gold'].includes(subject.tone)) {
    fail(`${label}: tone「${subject.tone}」が想定外`)
  }

  // --- 単元 ---
  if (!Array.isArray(subject.units) || subject.units.length === 0) {
    fail(`${label}: units が空`)
    continue
  }
  if (subject.units.length !== EXPECTED_UNITS_PER_SUBJECT) {
    warn(`${label}: 単元数が ${subject.units.length}（目安 ${EXPECTED_UNITS_PER_SUBJECT}）`)
  }

  perSubjectCounts[subject.key] = 0

  subject.units.forEach((unit, ui) => {
    totalUnits++
    const uLabel = `${label} 単元「${unit?.name ?? unit?.id ?? ui + 1}」`

    if (!isNonEmptyString(unit.id)) fail(`${uLabel}: id がありません`)
    if (!isNonEmptyString(unit.name)) fail(`${uLabel}: name がありません`)
    if (!isNonEmptyString(unit.grade)) fail(`${uLabel}: grade がありません`)
    if (!isNonEmptyString(unit.description)) fail(`${uLabel}: description がありません`)

    // id の形: <subject>-<連番>
    const expectedUnitId = `${subject.key}-${ui + 1}`
    if (unit.id !== expectedUnitId) {
      fail(`${uLabel}: id「${unit.id}」が連番と一致しません（期待値「${expectedUnitId}」）`)
    }
    if (unit.subject !== subject.key) {
      fail(`${uLabel}: subject「${unit.subject}」が親教科「${subject.key}」と不一致`)
    }

    // --- 問題 ---
    if (!Array.isArray(unit.questions) || unit.questions.length === 0) {
      fail(`${uLabel}: questions が空`)
      return
    }
    if (unit.questions.length !== EXPECTED_QUESTIONS_PER_UNIT) {
      warn(
        `${uLabel}: 問題数が ${unit.questions.length}（目安 ${EXPECTED_QUESTIONS_PER_UNIT}）`
      )
    }

    unit.questions.forEach((q, qi) => {
      totalQuestions++
      perSubjectCounts[subject.key]++
      const qLabel = `${uLabel} 第${qi + 1}問`

      // id
      if (!isNonEmptyString(q.id)) {
        fail(`${qLabel}: id がありません`)
      } else {
        allIds.set(q.id, (allIds.get(q.id) ?? 0) + 1)
        const expectedQid = `${unit.id}-${qi + 1}`
        if (q.id !== expectedQid) {
          warn(`${qLabel}: id「${q.id}」が連番と一致しません（期待値「${expectedQid}」）`)
        }
      }

      // prompt
      if (!isNonEmptyString(q.prompt)) {
        fail(`${qLabel}: prompt が空`)
      } else if (q.prompt.length > promptMaxLen.len) {
        promptMaxLen.id = q.id
        promptMaxLen.len = q.prompt.length
      }

      // choices
      if (!Array.isArray(q.choices)) {
        fail(`${qLabel}: choices が配列ではありません`)
        return
      }
      if (q.choices.length !== CHOICE_COUNT) {
        fail(`${qLabel}: 選択肢が ${q.choices.length} 個（期待値 ${CHOICE_COUNT}）`)
      }
      const seen = new Map()
      q.choices.forEach((c, ci) => {
        if (!isNonEmptyString(c)) {
          fail(`${qLabel}: 選択肢 ${ci + 1} が空`)
          return
        }
        if (seen.has(c)) {
          fail(`${qLabel}: 選択肢が重複「${c}」`)
        }
        seen.set(c, ci)
        if (c.length > choiceMaxLen.len) {
          choiceMaxLen.id = q.id
          choiceMaxLen.len = c.length
        }
      })

      // answer
      if (!Number.isInteger(q.answer)) {
        fail(`${qLabel}: answer が整数ではありません（${q.answer}）`)
      } else if (q.answer < 0 || q.answer >= q.choices.length) {
        fail(`${qLabel}: answer=${q.answer} が選択肢の範囲外（0〜${q.choices.length - 1}）`)
      } else if (q.answer < 4) {
        answerTally[q.answer]++
      }

      // explanation / point / level
      if (!isNonEmptyString(q.explanation)) {
        fail(`${qLabel}: explanation が空`)
      } else if (q.explanation.length < 15) {
        warn(`${qLabel}: explanation が短すぎます（${q.explanation.length}文字）`)
      }
      if (!isNonEmptyString(q.point)) {
        pointMissing.push(q.id ?? qLabel)
      }
      if (![1, 2, 3].includes(q.level)) {
        fail(`${qLabel}: level「${q.level}」が 1〜3 の範囲外`)
      } else {
        levelTally[q.level]++
      }
    })
  })
}

// --- 全体チェック ---
for (const [id, count] of allIds) {
  if (count > 1) fail(`問題 id「${id}」が ${count} 回出現（重複）`)
}
for (const key of SUBJECT_KEYS) {
  if (!seenSubjectKeys.has(key)) fail(`教科「${key}」が見つかりません`)
}

// 正解位置の偏り（4択のうち1つの位置に寄りすぎ）
const answeredTotal = answerTally.reduce((a, b) => a + b, 0)
const maxTally = Math.max(...answerTally)
const maxIdx = answerTally.indexOf(maxTally)
if (answeredTotal > 0 && maxTally / answeredTotal > 0.45) {
  warn(
    `正解の位置が偏っています（位置 ${maxIdx + 1} が ${maxTally}/${answeredTotal}）。` +
      '選択肢の並び順を見直すと、位置で当てる癖がつきにくくなります。'
  )
}
if (pointMissing.length) {
  warn(`「point」未設定が ${pointMissing.length} 問: ${pointMissing.slice(0, 8).join(', ')}${pointMissing.length > 8 ? ' …' : ''}`)
}
if (promptMaxLen.len > 180) {
  warn(`問題文が長い（${promptMaxLen.len}文字 / ${promptMaxLen.id}）。スマホ表示を確認してください。`)
}
if (choiceMaxLen.len > 90) {
  warn(`選択肢が長い（${choiceMaxLen.len}文字 / ${choiceMaxLen.id}）。折り返しを確認してください。`)
}

// ---------------------------------------------------------------------------
// レポート
// ---------------------------------------------------------------------------
console.log('── マナトビ 高校入試 / 問題データ検証 ──')
console.log(`教科数        : ${SUBJECTS.length}`)
console.log(`単元数        : ${totalUnits}`)
console.log(`問題数        : ${totalQuestions}`)
console.log(
  '教科別問題数  : ' +
    SUBJECT_KEYS.map((k) => `${k}=${perSubjectCounts[k] ?? 0}`).join(' / ')
)
console.log(
  '正解位置      : ' +
    answerTally.map((n, i) => `${i + 1}番目=${n}`).join(' / ')
)
console.log(
  `難易度        : 基本=${levelTally[1]} / 標準=${levelTally[2]} / 入試=${levelTally[3]}`
)
console.log(
  `最長          : 問題文 ${promptMaxLen.len}文字 / 選択肢 ${choiceMaxLen.len}文字`
)

if (warnings.length) {
  console.log(`\n⚠ 警告 ${warnings.length} 件`)
  for (const w of warnings) console.log('  - ' + w)
}

if (errors.length) {
  console.log(`\n✗ エラー ${errors.length} 件`)
  for (const e of errors) console.log('  - ' + e)
  process.exit(1)
}

console.log('\n✓ エラーなし')
