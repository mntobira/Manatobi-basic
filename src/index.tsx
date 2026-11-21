import { Hono } from 'hono'
import { cors } from 'hono/cors'
import {
  SUBJECTS,
  ALL_UNITS,
  TOTAL_QUESTIONS,
  buildCatalog,
  findSubject,
  findUnit,
} from './data'

/**
 * マナトビ 高校入試 ─ API
 *
 *   画面（public/static/app.js）は「軽い索引」だけを持ち、
 *   問題文が必要になったときだけ /api/units/:unitId を取りに行きます。
 *   ホームを開いた瞬間に全問題を読み込まないので、単元が増えても起動は軽いままです。
 *
 *   GET /api/catalog          教科・単元の索引（問題文なし）
 *   GET /api/units/:unitId    1単元ぶんの問題（解説つき）
 *   GET /api/subjects/:key    1教科ぶんの索引
 *   GET /api/health           稼働確認
 */
const app = new Hono()

app.use('/api/*', cors())

app.get('/api/health', (c) =>
  c.json({
    ok: true,
    app: 'mntb-juken',
    subjects: SUBJECTS.length,
    units: ALL_UNITS.length,
    questions: TOTAL_QUESTIONS,
    at: new Date().toISOString(),
  })
)

app.get('/api/catalog', (c) => {
  const catalog = buildCatalog()
  return c.json(
    {
      app: 'mntb-juken',
      title: 'マナトビ 高校入試',
      totalQuestions: TOTAL_QUESTIONS,
      totalUnits: ALL_UNITS.length,
      subjects: catalog,
    },
    200,
    { 'Cache-Control': 'public, max-age=300' }
  )
})

app.get('/api/subjects/:key', (c) => {
  const subject = findSubject(c.req.param('key'))
  if (!subject) return c.json({ error: 'subject not found' }, 404)
  const catalog = buildCatalog().find((s) => s.key === subject.key)!
  return c.json(catalog, 200, { 'Cache-Control': 'public, max-age=300' })
})

app.get('/api/units/:unitId', (c) => {
  const unit = findUnit(c.req.param('unitId'))
  if (!unit) return c.json({ error: 'unit not found' }, 404)
  const subject = SUBJECTS.find((s) => s.key === unit.subject)!
  return c.json(
    {
      id: unit.id,
      subject: unit.subject,
      subjectName: subject.name,
      tone: subject.tone,
      name: unit.name,
      grade: unit.grade,
      description: unit.description,
      questions: unit.questions.map((q) => ({
        id: q.id,
        prompt: q.prompt,
        passage: q.passage ?? null,
        choices: q.choices,
        answer: q.answer,
        explanation: q.explanation,
        point: q.point ?? null,
        level: q.level,
      })),
    },
    200,
    { 'Cache-Control': 'public, max-age=600' }
  )
})

app.get('/api/units', (c) => {
  const subjectKey = c.req.query('subject')
  const list = subjectKey ? ALL_UNITS.filter((u) => u.subject === subjectKey) : ALL_UNITS
  return c.json(
    list.map((u) => ({ id: u.id, name: u.name, subject: u.subject, grade: u.grade, count: u.questions.length })),
    200,
    { 'Cache-Control': 'public, max-age=300' }
  )
})

app.get('/', (c) =>
  c.html(`<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="theme-color" content="#2458a6" />
  <meta name="description" content="中学5教科を入試レベルまで。1単元4問・解説つきで、今日のぶんだけ進める高校入試対策アプリ。" />
  <title>マナトビ 高校入試 ─ 中学5教科</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500;700;800&family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/static/app.css" />
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%232458a6'/%3E%3Cpath d='M18 44V22l14 11 14-11v22' fill='none' stroke='%23fff' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" />
</head>
<body>
  <div id="app">
    <div class="loading"><span class="spinner"></span><p>読み込み中…</p></div>
  </div>
  <noscript>
    <div class="screen">
      <div class="card"><h1 class="screen-title">JavaScript を有効にしてください</h1>
      <p class="screen-lead">このアプリは問題を解くために JavaScript を使います。</p></div>
    </div>
  </noscript>
  <script src="/static/app.js" defer></script>
</body>
</html>`)
)

export default app
