/* マナトビ 高校入試 ─ フロントエンド
 *
 * 考え方（マナトビ英検の作りに合わせています）
 *   ・ホームは「軽い索引」だけを持つ。問題文は単元を開いたときだけ取りに行く。
 *   ・進捗は localStorage。オフラインでも解ける／サーバー無しでも動く。
 *   ・1画面1テーマ。同じ操作を2つ置かない。文字12px以上・タップ44px以上。
 */
'use strict'

/* ============================================================
 *  1. 小さな道具
 * ============================================================ */
const $ = (sel, root = document) => root.querySelector(sel)
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)]
const app = () => $('#app')

const esc = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

/**
 * 選択肢を入れ替えた「新しい問題オブジェクト」を返す。
 * - 元データ（S.unitCache）は変更しない
 * - 正解 index も一緒に付け替える
 * - 同じ並びが続いても不思議に思われないよう、2択のときだけ特別扱いしない
 */
function shuffleChoices(q) {
  const order = q.choices.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return {
    ...q,
    choices: order.map((i) => q.choices[i]),
    answer: order.indexOf(q.answer),
  }
}

const KEY = {
  progress: 'mntb-juken:progress:v1',
  daily: 'mntb-juken:daily:v1',
  settings: 'mntb-juken:settings:v1',
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ストレージが使えない環境ではメモリ上だけで動く */
  }
}

const todayKey = () => {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}
const dayKeyOf = (date) => {
  const p = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`
}

/* ============================================================
 *  2. 状態
 * ============================================================ */
const S = {
  catalog: null,
  progress: load(KEY.progress, {}),
  daily: load(KEY.daily, {}),
  settings: Object.assign({ name: '', goal: 12 }, load(KEY.settings, {})),
  unitCache: {},
  quiz: null,
  pendingQuizOpts: null,
  lastResult: null,
  route: { name: 'title' },
  startedAt: 0,
}

const persistProgress = () => save(KEY.progress, S.progress)
const persistDaily = () => save(KEY.daily, S.daily)
const persistSettings = () => save(KEY.settings, S.settings)

/* ============================================================
 *  3. 集計
 * ============================================================ */
const SUBJECT_LABEL = { english: '英語', math: '数学', japanese: '国語', science: '理科', social: '社会' }
const TONE_VAR = {
  blue: ['--subj-blue', '--subj-blue-soft'],
  teal: ['--subj-teal', '--subj-teal-soft'],
  rose: ['--subj-rose', '--subj-rose-soft'],
  sage: ['--subj-sage', '--subj-sage-soft'],
  gold: ['--subj-gold', '--subj-gold-soft'],
}

function toneStyle(tone) {
  const [c, soft] = TONE_VAR[tone] || TONE_VAR.blue
  return `style="--tone: var(${c}); --tone-soft: var(${soft})"`
}

function unitStats(unitId, total) {
  const p = S.progress
  let answered = 0
  let ok = 0
  for (let i = 1; i <= total; i++) {
    const rec = p[`${unitId}-${i}`]
    if (rec) {
      answered++
      if (rec.ok) ok++
    }
  }
  return { answered, ok, total, pct: total ? Math.round((answered / total) * 100) : 0 }
}

function subjectStats(subject) {
  let answered = 0
  let ok = 0
  let total = 0
  for (const u of subject.units) {
    total += u.count
    const st = unitStats(u.id, u.count)
    answered += st.answered
    ok += st.ok
  }
  return { answered, ok, total, pct: total ? Math.round((answered / total) * 100) : 0 }
}

function todayStats() {
  const d = S.daily[todayKey()]
  return d && typeof d.answered === 'number' ? d : { answered: 0, ok: 0, sec: 0 }
}

function streakDays() {
  let n = 0
  const d = new Date()
  // 今日まだ解いていなければ、昨日から数える（連続記録を途切れさせない）
  if (!(S.daily[dayKeyOf(d)] && S.daily[dayKeyOf(d)].answered > 0)) d.setDate(d.getDate() - 1)
  for (let i = 0; i < 400; i++) {
    const k = dayKeyOf(d)
    const rec = S.daily[k]
    if (rec && rec.answered > 0) {
      n++
      d.setDate(d.getDate() - 1)
    } else break
  }
  return n
}

function last7Days() {
  const out = []
  const d = new Date()
  for (let i = 6; i >= 0; i--) {
    const x = new Date(d)
    x.setDate(d.getDate() - i)
    const k = dayKeyOf(x)
    const rec = S.daily[k] || { answered: 0 }
    out.push({ key: k, label: `${x.getMonth() + 1}/${x.getDate()}`, answered: rec.answered || 0, today: i === 0 })
  }
  return out
}

function totalAnswered() {
  return Object.keys(S.progress).length
}

function totalCorrect() {
  return Object.values(S.progress).filter((r) => r && r.ok).length
}

/* ============================================================
 *  4. 共通パーツ
 * ============================================================ */
const ICON = {
  door: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><circle cx="15.5" cy="12" r="1.2" fill="currentColor" stroke="none"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>`,
  gear: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 19 8 12l7-7"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>`,
  flame: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c3.9 0 6-2.5 6-6 0-4.5-4-6.5-4.5-11-2 2-3.2 3.6-3.2 5.5 0 1.2.6 2 1.4 2.6 0 1.6-1.1 2.4-2.2 2.4-1 0-1.5-.7-1.6-1.7C6.4 13.6 6 15 6 16c0 3.5 2.1 5 6 5z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3.2 2"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4.5V11h-6.4"/></svg>`,
  target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/></svg>`,
}

const levelLabel = { 1: '基本', 2: '標準', 3: '入試' }

function meterHtml(pct, state = '') {
  const done = pct >= 100 ? 'done' : state
  return `<div class="meter" ${done ? `data-state="${done}"` : ''} role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${Math.max(pct, pct > 0 ? 4 : 0)}%"></i></div>`
}

function ringHtml(pct) {
  const r = 54
  const c = 2 * Math.PI * r
  const off = c * (1 - Math.min(pct, 100) / 100)
  return `<div class="ring" ${pct >= 100 ? 'data-state="done"' : ''}>
    <svg viewBox="0 0 132 132" aria-hidden="true">
      <circle class="ring-bg" cx="66" cy="66" r="${r}"></circle>
      <circle class="ring-fg" cx="66" cy="66" r="${r}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"></circle>
    </svg>
    <div class="ring-value"><b>${pct}<span style="font-size:.5em">%</span></b><span>できた</span></div>
  </div>`
}

let toastTimer = null
function toast(msg) {
  const old = $('.toast')
  if (old) old.remove()
  const el = document.createElement('div')
  el.className = 'toast'
  el.setAttribute('role', 'status')
  el.textContent = msg
  document.body.appendChild(el)
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => el.remove(), 2200)
}

function navBar(active) {
  const items = [
    { key: 'home', label: 'ホーム', icon: ICON.home, href: '#/home' },
    { key: 'record', label: 'きろく', icon: ICON.chart, href: '#/record' },
    { key: 'settings', label: 'せってい', icon: ICON.gear, href: '#/settings' },
  ]
  return `<nav class="bottom-nav" aria-label="メインメニュー">
    ${items
      .map(
        (it) => `<button type="button" data-nav="${it.href}" ${active === it.key ? 'aria-current="page"' : ''}>
          ${it.icon}<span>${it.label}</span>
        </button>`
      )
      .join('')}
  </nav>`
}

function headerBack(label, href) {
  return `<div class="crumb">
    <button type="button" data-nav="${href}" aria-label="${esc(label)}へ戻る">← ${esc(label)}</button>
  </div>`
}

/* ============================================================
 *  5. 画面：タイトル
 * ============================================================ */
function renderTitle() {
  const done = totalAnswered()
  const total = S.catalog ? S.catalog.totalQuestions : 0
  app().innerHTML = `
  <main class="title-screen">
    <div class="title-rings" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="title-inner">
      <span class="title-badge">中学5教科 ・ 高校入試対策</span>
      <div class="title-logo" aria-hidden="true">${ICON.door}</div>
      <h1 class="title-name"><span>MANATOBI</span>マナトビ 高校入試</h1>
      <p class="title-sub">1単元4問・解説つき。<br>今日のぶんだけ、扉の向こうへ。</p>
      <div class="title-actions">
        <button type="button" class="btn btn-accent" data-nav="#/home">${ICON.play} はじめる</button>
        <button type="button" class="btn btn-ghost" data-nav="#/record">きろくを見る</button>
      </div>
      <p class="title-meta">${done ? `これまで ${done} / ${total} 問` : `全 ${total} 問 ・ 5教科`}<br>とびらを開くと、学習の記録がのこります</p>
    </div>
  </main>`
}

/* ============================================================
 *  6. 画面：ホーム
 * ============================================================ */
function homeGreeting() {
  const h = new Date().getHours()
  if (h < 5) return 'おそくまで、おつかれさま'
  if (h < 11) return 'おはよう'
  if (h < 17) return 'こんにちは'
  return 'こんばんは'
}

function renderHome() {
  const cat = S.catalog
  const t = todayStats()
  const goal = Math.max(S.settings.goal || 12, 1)
  const pct = Math.min(100, Math.round((t.answered / goal) * 100))
  const streak = streakDays()
  const name = S.settings.name ? `${esc(S.settings.name)}さん` : 'とびらを開こう'
  const d = new Date()
  const dateLabel = `${d.getMonth() + 1}月${d.getDate()}日（${'日月火水木金土'[d.getDay()]}）`

  const next = pickNextUnit()

  app().innerHTML = `
  <main class="screen">
    <header class="home-head">
      <div class="home-greet">
        <p class="date">${dateLabel}</p>
        <h1>${homeGreeting()}、<em>${name}</em></h1>
      </div>
      <div class="home-streak" aria-label="連続学習日数">
        <b>${streak}</b><span>日れんぞく</span>
      </div>
    </header>

    <section class="card today-card" aria-labelledby="today-title">
      <div class="today-top">
        <h2 id="today-title">今日のゴール</h2>
        <span class="today-goal">${goal}問</span>
      </div>
      <div class="goal-bar">
        <b>${t.answered}</b><span>/ ${goal} 問</span>
      </div>
      ${meterHtml(pct, '')}
      <div class="today-actions">
        ${
          next
            ? `<button type="button" class="btn btn-accent btn-block" data-start="${next.id}">${ICON.play} ${t.answered >= goal ? 'もう1単元すすむ' : '今日のぶんをはじめる'}</button>`
            : `<button type="button" class="btn btn-secondary btn-block" data-nav="#/record">きろくを見る</button>`
        }
      </div>
      ${
        t.answered >= goal
          ? `<p class="screen-lead">今日のゴール達成！ おつかれさまでした。${next ? `次は「${esc(next.name)}」があります。` : ''}</p>`
          : next
          ? `<p class="screen-lead">つぎは <b>${esc(next.subjectName)}・${esc(next.name)}</b>（${esc(next.grade)}）をすすめるのがおすすめです。</p>`
          : `<p class="screen-lead">すべての単元をやりきりました。復習で定着させましょう。</p>`
      }
    </section>

    <section aria-labelledby="subj-title">
      <h2 class="section-title" id="subj-title">5教科 <span class="count">${cat.totalQuestions}問</span></h2>
      <div class="subject-grid">
        ${cat.subjects
          .map((s) => {
            const st = subjectStats(s)
            return `<button type="button" class="subject-card" ${toneStyle(s.tone)} data-subject="${s.key}">
              <span class="subject-glyph" aria-hidden="true">${s.name[0]}</span>
              <span class="subject-body">
                <span class="name-row"><span class="name">${esc(s.name)}</span><span class="en">${esc(s.en)}</span></span>
                <span class="meta">${esc(s.tagline)}</span>
                <span class="meta-sub">${s.units.length}単元 ・ ${s.questionCount}問</span>
              </span>
              <span class="subject-progress">
                <b>${st.pct}%</b>
                <span>${st.answered}/${st.total}問</span>
                ${meterHtml(st.pct)}
              </span>
            </button>`
          })
          .join('')}
      </div>
    </section>

    <section aria-label="復習">
      <button type="button" class="quick-tile quick-tile-wide" data-review="1">
        <span class="q-icon">${ICON.refresh}</span>
        <span class="q-body"><b>まちがえた問題をもう一度</b><span>${wrongCount()}問 たまっています</span></span>
      </button>
    </section>
  </main>
  ${navBar('home')}`
}

function wrongCount() {
  return Object.values(S.progress).filter((r) => r && !r.ok).length
}

/** ホームの「つぎやる単元」＝未着手 → 正答率の低い順 */
function pickNextUnit() {
  if (!S.catalog) return null
  let best = null
  for (const s of S.catalog.subjects) {
    for (const u of s.units) {
      const st = unitStats(u.id, u.count)
      const score = st.answered === 0 ? 0 : st.ok / st.total
      if (!best || score < best.score) {
        best = { ...u, subjectName: s.name, score, answered: st.answered }
      }
    }
  }
  return best
}

/* ============================================================
 *  7. 画面：教科（単元一覧）
 * ============================================================ */
function renderSubject(key) {
  const s = S.catalog.subjects.find((x) => x.key === key)
  if (!s) return go('#/home')
  const st = subjectStats(s)

  app().innerHTML = `
  <main class="screen">
    ${headerBack('ホーム', '#/home')}
    <header>
      <p class="kicker">${esc(s.en)}</p>
      <h1 class="screen-title">${esc(s.name)}</h1>
      <p class="screen-lead">${esc(s.tagline)} ・ ${st.answered}/${st.total}問（${st.pct}%）</p>
    </header>

    <ul class="unit-list">
      ${s.units
        .map((u, i) => {
          const us = unitStats(u.id, u.count)
          const state = us.answered === 0 ? 'todo' : us.answered >= us.total ? 'done' : 'doing'
          const stateLabel = state === 'todo' ? '未着手' : state === 'done' ? '完了' : '学習中'
          return `<li>
            <button type="button" class="unit-row" ${toneStyle(s.tone)} data-start="${u.id}">
              <span class="unit-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
              <span class="unit-body">
                <span class="u-name">${esc(u.name)}</span>
                <span class="u-desc">${esc(u.description)}</span>
                <span class="u-tags">
                  <span class="badge">${esc(u.grade)}</span>
                  <span class="badge">${u.count}問</span>
                  <span class="badge" data-state="${state}">${stateLabel}</span>
                </span>
              </span>
              <span class="unit-right">
                <span class="pct">${us.pct}%</span>
                ${meterHtml(us.pct)}
              </span>
            </button>
          </li>`
        })
        .join('')}
    </ul>
  </main>
  ${navBar('home')}`
}

/* ============================================================
 *  8. 画面：演習（クイズ）
 * ============================================================ */
/** 単元を開く。実際の読み込みはルーター（#/unit/:id）が1回だけ行う。 */
function openUnit(unitId, opts = {}) {
  S.pendingQuizOpts = opts
  S.quiz = null
  const target = `#/unit/${unitId}`
  if (location.hash === target) route()
  else go(target)
}

async function startQuiz(unitId, opts = {}) {
  const screen = app()
  screen.innerHTML = `<main class="screen"><div class="loading"><span class="spinner"></span><p>問題を読み込んでいます…</p></div></main>`

  let unit = S.unitCache[unitId]
  if (!unit) {
    try {
      const res = await fetch(`/api/units/${encodeURIComponent(unitId)}`)
      if (!res.ok) throw new Error(String(res.status))
      unit = await res.json()
      S.unitCache[unitId] = unit
    } catch {
      screen.innerHTML = `<main class="screen">
        <div class="empty">
          <b>問題を読み込めませんでした</b>
          <p>通信を確認して、もう一度お試しください。</p>
          <button type="button" class="btn btn-secondary" data-start="${unitId}">${ICON.refresh} 再読み込み</button>
          <button type="button" class="btn btn-ghost" data-nav="#/home">ホームへ戻る</button>
        </div></main>`
      return
    }
  }

  let questions = unit.questions.slice()
  if (opts.onlyIds && opts.onlyIds.length) {
    questions = questions.filter((q) => opts.onlyIds.includes(q.id))
  }
  // 出題のたびに選択肢を入れ替える（正解の位置で当てる癖を防ぐ）
  questions = questions.map(shuffleChoices)
  if (!questions.length) {
    toast('出題できる問題がありません')
    return go('#/home')
  }

  S.quiz = {
    unitId,
    unit,
    questions,
    index: 0,
    picked: null,
    answers: [],
    mode: opts.mode || 'normal',
    startedAt: Date.now(),
    elapsed: 0,
  }
  renderQuestion()
}

function renderQuestion() {
  const q = S.quiz
  const item = q.questions[q.index]
  const isEn = q.unit.subject === 'english'
  const total = q.questions.length
  const sec = Math.floor((Date.now() - q.startedAt) / 1000)

  app().innerHTML = `
  <main class="screen quiz-screen">
    <div class="quiz-top">
      <div class="quiz-bar">
        <button type="button" class="quiz-close" data-quit="1" aria-label="演習をやめる">✕</button>
        <div class="quiz-meta">
          <span class="unit-name">${esc(q.unit.subjectName)}・${esc(q.unit.name)}</span>
          <span class="q-count">${q.index + 1} / ${total} 問${q.mode === 'review' ? ' ・復習' : ''}</span>
        </div>
        <span class="quiz-timer" data-timer>${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}</span>
      </div>
      <div class="q-dots" aria-hidden="true">
        ${q.questions
          .map((x, i) => {
            const a = q.answers[i]
            const st = a ? (a.ok ? 'ok' : 'ng') : i === q.index ? 'cur' : ''
            return `<i data-s="${st}"></i>`
          })
          .join('')}
      </div>
    </div>

    <section class="card q-card" ${toneStyle(q.unit.tone)} aria-labelledby="q-prompt">
      <div class="q-tags">
        <span class="q-level" data-lv="${item.level}">${levelLabel[item.level] || '基本'}</span>
        <span class="badge">${esc(q.unit.grade)}</span>
      </div>
      ${item.passage ? `<div class="passage ${isEn ? 'en' : ''}">${esc(item.passage)}</div>` : ''}
      <h1 class="q-prompt ${isEn ? 'en' : ''}" id="q-prompt">${esc(item.prompt)}</h1>

      <div class="choices" role="group" aria-label="選択肢">
        ${item.choices
          .map(
            (c, i) => `<button type="button" class="choice" data-choice="${i}" ${q.picked !== null ? 'disabled' : ''}>
              <span class="mark" aria-hidden="true">${'ABCD'[i]}</span>
              <span class="text ${/[A-Za-z]/.test(c) && !/[ぁ-んァ-ヶ一-龥]/.test(c) ? 'en' : ''}">${esc(c)}</span>
            </button>`
          )
          .join('')}
      </div>

      <div data-verdict></div>
      <div class="quiz-actions" data-actions></div>
    </section>
  </main>`

  startTimer()
}

let timerId = null
function startTimer() {
  clearInterval(timerId)
  const el = $('[data-timer]')
  if (!el) return
  timerId = setInterval(() => {
    if (!S.quiz) return clearInterval(timerId)
    const sec = Math.floor((Date.now() - S.quiz.startedAt) / 1000)
    const t = $('[data-timer]')
    if (t) t.textContent = `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`
  }, 1000)
}

function answerChoice(idx) {
  const q = S.quiz
  if (!q || q.picked !== null) return
  const item = q.questions[q.index]
  q.picked = idx
  const ok = idx === item.answer
  const sec = Math.floor((Date.now() - q.startedAt) / 1000)
  q.elapsed = sec

  q.answers[q.index] = {
    id: item.id,
    picked: idx,
    answer: item.answer,
    ok,
    prompt: item.prompt,
    explanation: item.explanation,
    point: item.point,
    choices: item.choices,
  }

  // 進捗：一度でも正解したら ok（間違えても記録は残す）
  const prev = S.progress[item.id] || { tries: 0, ok: false }
  S.progress[item.id] = {
    ok: prev.ok || ok,
    tries: prev.tries + 1,
    last: todayKey(),
    lastOk: ok,
  }
  persistProgress()

  // 日次ログ
  const k = todayKey()
  const d = S.daily[k] || { answered: 0, ok: 0, sec: 0 }
  d.answered += 1
  if (ok) d.ok += 1
  d.sec = (d.sec || 0) + Math.min(sec, 300)
  S.daily[k] = d
  persistDaily()

  // 選択肢の状態を描き替え
  $$('.choice').forEach((btn, i) => {
    btn.disabled = true
    if (i === item.answer) btn.dataset.state = 'correct'
    else if (i === idx) btn.dataset.state = 'wrong'
    else btn.dataset.state = 'dim'
  })

  const last = q.index === q.questions.length - 1
  $('[data-verdict]').innerHTML = `
    <div class="verdict" data-v="${ok ? 'ok' : 'ng'}">
      <div class="verdict-head">
        <span class="verdict-ico" aria-hidden="true">${ok ? '✓' : '!'}</span>
        ${ok ? '正解！' : `正解は ${'ABCD'[item.answer]} です`}
      </div>
      <p>${esc(item.explanation)}</p>
      ${item.point ? `<div class="point"><span aria-hidden="true">🔑</span><span>${esc(item.point)}</span></div>` : ''}
    </div>`
  $('[data-actions]').innerHTML = `
    <button type="button" class="btn btn-ghost" data-quit="1">やめる</button>
    <button type="button" class="btn btn-primary" data-next="1">${last ? '結果を見る' : '次の問題'}</button>`
  $('[data-next]').focus({ preventScroll: true })
}

function nextQuestion() {
  const q = S.quiz
  if (!q) return
  if (q.index + 1 >= q.questions.length) return finishQuiz()
  q.index += 1
  q.picked = null
  renderQuestion()
}

/* ============================================================
 *  9. 画面：結果
 * ============================================================ */
function finishQuiz() {
  clearInterval(timerId)
  const q = S.quiz
  const answers = q.answers.filter(Boolean)
  const ok = answers.filter((a) => a.ok).length
  const total = answers.length
  const pct = total ? Math.round((ok / total) * 100) : 0
  const sec = Math.floor((Date.now() - q.startedAt) / 1000)
  S.lastResult = {
    unitId: q.unitId,
    subjectName: q.unit.subjectName,
    unitName: q.unit.name,
    ok,
    total,
    pct,
    sec,
    answers,
    wrongIds: answers.filter((a) => !a.ok).map((a) => a.id),
  }
  S.quiz = null
  go('#/result')
}

function renderResult() {
  const r = S.lastResult
  if (!r) return go('#/home')

  const msg =
    r.pct === 100
      ? '全問正解。この単元は仕上がっています。'
      : r.pct >= 75
        ? 'よくできています。まちがえた問題だけ復習しましょう。'
        : r.pct >= 50
          ? 'あと少し。解説を読んで、もう一度やってみましょう。'
          : '解説を読んで、同じ単元をもう一度やってみましょう。'
  const m = Math.floor(r.sec / 60)
  const s = r.sec % 60

  app().innerHTML = `
  <main class="screen" data-nav="off">
    <div class="result-hero">
      ${ringHtml(r.pct)}
      <h1 class="result-title">${r.ok} / ${r.total} 問 正解</h1>
      <p class="result-note">${esc(msg)}</p>
      <p class="screen-lead">${esc(r.subjectName)}・${esc(r.unitName)}${r.total < 4 ? '（復習）' : ''}</p>
    </div>

    <div class="stat-row">
      <div class="stat"><b>${r.ok}</b><span>正解</span></div>
      <div class="stat"><b>${r.total - r.ok}</b><span>まちがい</span></div>
      <div class="stat"><b>${m}:${String(s).padStart(2, '0')}</b><span>かかった時間</span></div>
    </div>

    <section aria-labelledby="rev-title">
      <h2 class="section-title" id="rev-title">ふりかえり</h2>
      <div class="review-list">
        ${r.answers
          .map(
            (a) => `<button type="button" class="review-item" data-v="${a.ok ? 'ok' : 'ng'}" data-detail="${a.id}">
              <span class="r-ico" aria-hidden="true">${a.ok ? '✓' : '!'}</span>
              <span class="r-q">${esc(a.prompt.replace(/\n/g, ' '))}</span>
              <span class="r-go">${a.ok ? '見直す' : '解説'}</span>
            </button>`
          )
          .join('')}
      </div>
    </section>

    <div class="quiz-actions">
      ${
        r.wrongIds.length
          ? `<button type="button" class="btn btn-accent" data-review-unit="${r.unitId}">${ICON.refresh} まちがえた${r.wrongIds.length}問をもう一度</button>`
          : `<button type="button" class="btn btn-primary" data-start="${r.unitId}">${ICON.play} もう一度</button>`
      }
      <button type="button" class="btn btn-ghost" data-nav="#/home">ホームへ</button>
    </div>
    ${navBar('home')}
  </main>`
}

/** 結果画面の「ふりかえり」詳細（モーダル的に下部へ差し込む） */
function showAnswerDetail(qid) {
  const r = S.lastResult
  const a = r && r.answers.find((x) => x.id === qid)
  if (!a) return
  const box = document.createElement('div')
  box.className = 'screen'
  box.style.cssText = 'position:fixed;inset:0;z-index:70;background:rgba(28,42,57,.45);display:grid;place-items:center;padding:18px;'
  box.innerHTML = `
    <div class="card" style="max-width:560px;width:100%;max-height:82dvh;overflow:auto;display:grid;gap:12px">
      <h2 class="screen-title" style="font-size:18px">${a.ok ? '正解した問題' : 'まちがえた問題'}</h2>
      <p class="q-prompt" style="font-size:15px">${esc(a.prompt)}</p>
      <ul class="choices">
        ${a.choices
          .map((c, i) => {
            const state = i === a.answer ? 'correct' : i === a.picked ? 'wrong' : 'dim'
            return `<li class="choice" data-state="${state}" style="cursor:default">
              <span class="mark">${'ABCD'[i]}</span><span class="text">${esc(c)}</span>
            </li>`
          })
          .join('')}
      </ul>
      <div class="verdict" data-v="${a.ok ? 'ok' : 'ng'}">
        <div class="verdict-head"><span class="verdict-ico">${a.ok ? '✓' : '!'}</span>${a.ok ? '正解' : `正解は ${'ABCD'[a.answer]}`}</div>
        <p>${esc(a.explanation)}</p>
      </div>
      <button type="button" class="btn btn-primary btn-block" data-close-detail="1">閉じる</button>
    </div>`
  document.body.appendChild(box)
  box.addEventListener('click', (e) => {
    if (e.target === box || e.target.closest('[data-close-detail]')) box.remove()
  })
}

/* ============================================================
 * 10. 画面：きろく
 * ============================================================ */
function renderRecord() {
  const days = last7Days()
  const max = Math.max(...days.map((d) => d.answered), S.settings.goal || 12, 1)
  const t = totalAnswered()
  const totalQ = S.catalog ? S.catalog.totalQuestions : 0
  const correct = totalCorrect()
  const acc = t ? Math.round((correct / t) * 100) : 0

  const bySubject = (S.catalog ? S.catalog.subjects : []).map((s) => {
    const st = subjectStats(s)
    return { ...s, ...st }
  })

  app().innerHTML = `
  <main class="screen">
    <header>
      <p class="kicker">STUDY LOG</p>
      <h1 class="screen-title">学習のきろく</h1>
      <p class="screen-lead">解いた問題と正答率は、この端末に保存されます。</p>
    </header>

    <div class="stat-row">
      <div class="stat"><b>${streakDays()}</b><span>日れんぞく</span></div>
      <div class="stat"><b>${t}</b><span>解いた問題</span></div>
      <div class="stat"><b>${acc}%</b><span>正答率</span></div>
    </div>

    <section class="card" aria-labelledby="week-title">
      <h2 class="section-title" id="week-title" style="margin-bottom:14px">さいきん7日 <span class="count">1日あたり</span></h2>
      ${
        days.some((d) => d.answered)
          ? `<div class="bars" aria-hidden="true">
              ${days
                .map(
                  (d) => `<div class="bar" data-today="${d.today ? 1 : 0}">
                    <i style="height:${Math.max((d.answered / max) * 100, d.answered ? 6 : 2)}%"></i>
                  </div>`
                )
                .join('')}
            </div>
            <div class="bars-labels">
              ${days.map((d) => `<span data-today="${d.today ? 1 : 0}">${d.label}</span>`).join('')}
            </div>`
          : `<div class="empty"><b>まだ記録がありません</b><p>1問解くと、ここに今日の学習が積み上がります。</p></div>`
      }
    </section>

    <section class="card" aria-labelledby="bd-title">
      <h2 class="section-title" id="bd-title" style="margin-bottom:14px">教科べつ <span class="count">${t} / ${totalQ}問</span></h2>
      <div class="breakdown">
        ${bySubject
          .map(
            (s) => `<div class="breakdown-row" ${toneStyle(s.tone)}>
              <span class="b-name">${esc(s.name)}</span>
              <span class="meter"><i style="width:${s.answered ? Math.max(s.pct, 4) : 0}%"></i></span>
              <span class="b-val">${s.answered}/${s.total}</span>
            </div>`
          )
          .join('')}
      </div>
    </section>

    <div class="quick-row">
      <button type="button" class="quick-tile" data-review="1"><span class="q-icon">${ICON.refresh}</span>まちがえた問題</button>
      <button type="button" class="quick-tile" data-nav="#/home"><span class="q-icon">${ICON.book}</span>単元をえらぶ</button>
    </div>
  </main>
  ${navBar('record')}`
}

/* ============================================================
 * 11. 画面：せってい
 * ============================================================ */
function renderSettings() {
  const goals = [8, 12, 20, 30]
  app().innerHTML = `
  <main class="screen">
    <header>
      <p class="kicker">SETTINGS</p>
      <h1 class="screen-title">せってい</h1>
      <p class="screen-lead">名前と1日の目標を決めると、ホームの表示が変わります。</p>
    </header>

    <section class="card form-row">
      <label for="name-input">なまえ（ニックネーム）</label>
      <input id="name-input" class="input" type="text" maxlength="12" placeholder="例：はると" value="${esc(S.settings.name || '')}" autocomplete="nickname" />
      <p class="hint">ホームのあいさつにだけ使います。サーバーには送りません。</p>
    </section>

    <section class="card form-row">
      <span style="font:700 13px/1.4 var(--mt-font-body);color:var(--mt-ink-2)">1日の目標問題数</span>
      <div class="segmented" role="tablist" aria-label="1日の目標">
        ${goals
          .map(
            (g) => `<button type="button" role="tab" aria-selected="${S.settings.goal === g}" data-goal="${g}">${g}問</button>`
          )
          .join('')}
      </div>
      <p class="hint">1単元は4問。12問なら1日3単元が目安です。</p>
    </section>

    <section class="card">
      <h2 class="section-title" style="margin-bottom:6px">データ</h2>
      <div class="list-rows">
        <div class="list-row"><span class="lr-label">保存されている解答</span><span class="lr-value">${totalAnswered()} 問</span></div>
        <div class="list-row"><span class="lr-label">収録問題数</span><span class="lr-value">${S.catalog ? S.catalog.totalQuestions : 0} 問</span></div>
        <div class="list-row"><span class="lr-label">保存先</span><span class="lr-value" style="font-size:13px">この端末</span></div>
      </div>
      <button type="button" class="btn btn-ghost btn-block" style="margin-top:14px" data-reset="1">学習の記録をリセット</button>
      <p class="hint" style="margin-top:8px">記録はブラウザに保存されています。リセットすると元に戻せません。</p>
    </section>

    <section class="card card-flat" style="background:var(--mt-brand-soft);border-color:var(--mt-brand-soft)">
      <h2 class="screen-title" style="font-size:16px">マナトビ 高校入試</h2>
      <p class="screen-lead">中学5教科・${S.catalog ? S.catalog.totalUnits : 0}単元・${S.catalog ? S.catalog.totalQuestions : 0}問。<br>1単元4問、解説と要点つき。すきま時間に1単元ずつ。</p>
    </section>
  </main>
  ${navBar('settings')}`

  const nameInput = $('#name-input')
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      S.settings.name = nameInput.value.trim().slice(0, 12)
      persistSettings()
    })
  }
}

/* ============================================================
 * 12. まちがえた問題の復習
 * ============================================================ */
/** まちがえたまま残っている問題を、いちばん多い単元から順に復習する */
function startReviewAll() {
  const wrong = Object.entries(S.progress)
    .filter(([, r]) => r && !r.ok)
    .map(([id]) => id)
  if (!wrong.length) {
    toast('まちがえた問題はありません')
    return
  }

  // 単元ごとにまとめる（"-\d+$" を落とすと単元IDになる）
  const byUnit = new Map()
  for (const id of wrong) {
    const unitId = id.replace(/-\d+$/, '')
    if (!byUnit.has(unitId)) byUnit.set(unitId, [])
    byUnit.get(unitId).push(id)
  }
  const [unitId, ids] = [...byUnit.entries()].sort((a, b) => b[1].length - a[1].length)[0]
  if (byUnit.size > 1) toast(`まず「${unitIdLabel(unitId)}」の${ids.length}問から`)
  openUnit(unitId, { mode: 'review', onlyIds: ids })
}

function unitIdLabel(unitId) {
  for (const s of S.catalog ? S.catalog.subjects : []) {
    const u = s.units.find((x) => x.id === unitId)
    if (u) return u.name
  }
  return unitId
}

/* ============================================================
 * 13. ルーター
 * ============================================================ */
function parseRoute(hash) {
  const h = (hash || '#/home').replace(/^#\/?/, '')
  const parts = h.split('/').filter(Boolean)
  if (!parts.length) return { name: 'title' }
  if (parts[0] === 'home') return { name: 'home' }
  if (parts[0] === 'subject' && parts[1]) return { name: 'subject', key: parts[1] }
  if (parts[0] === 'unit' && parts[1]) return { name: 'unit', unitId: parts[1] }
  if (parts[0] === 'result') return { name: 'result' }
  if (parts[0] === 'record') return { name: 'record' }
  if (parts[0] === 'settings') return { name: 'settings' }
  return { name: 'home' }
}

function go(hash, opts = {}) {
  if (location.hash === hash) {
    route()
  } else if (opts.replace) {
    location.replace(hash)
    route()
  } else {
    location.hash = hash
  }
}

function route() {
  clearInterval(timerId)
  const r = parseRoute(location.hash)
  S.route = r
  window.scrollTo(0, 0)

  switch (r.name) {
    case 'title':
      return renderTitle()
    case 'home':
      return renderHome()
    case 'subject':
      return renderSubject(r.key)
    case 'unit': {
      if (S.quiz && S.quiz.unitId === r.unitId) return renderQuestion()
      const opts = S.pendingQuizOpts || {}
      S.pendingQuizOpts = null
      return startQuiz(r.unitId, opts)
    }
    case 'result':
      return renderResult()
    case 'record':
      return renderRecord()
    case 'settings':
      return renderSettings()
    default:
      return renderHome()
  }
}

/* ============================================================
 * 14. イベント（1か所で受ける）
 * ============================================================ */
document.addEventListener('click', (e) => {
  const nav = e.target.closest('[data-nav]')
  if (nav) {
    e.preventDefault()
    if (S.quiz) S.quiz = null
    go(nav.dataset.nav)
    return
  }

  const subj = e.target.closest('[data-subject]')
  if (subj) {
    go(`#/subject/${subj.dataset.subject}`)
    return
  }

  const start = e.target.closest('[data-start]')
  if (start) {
    openUnit(start.dataset.start)
    return
  }

  const reviewUnit = e.target.closest('[data-review-unit]')
  if (reviewUnit && S.lastResult) {
    openUnit(reviewUnit.dataset.reviewUnit, { mode: 'review', onlyIds: S.lastResult.wrongIds })
    return
  }

  const reviewAll = e.target.closest('[data-review]')
  if (reviewAll) {
    startReviewAll()
    return
  }

  const choice = e.target.closest('[data-choice]')
  if (choice) {
    answerChoice(Number(choice.dataset.choice))
    return
  }

  const next = e.target.closest('[data-next]')
  if (next) {
    nextQuestion()
    return
  }

  const quit = e.target.closest('[data-quit]')
  if (quit) {
    const answered = S.quiz ? S.quiz.answers.filter(Boolean).length : 0
    if (!answered || window.confirm('ここまでの解答は記録されています。演習をやめますか？')) {
      S.quiz = null
      clearInterval(timerId)
      go('#/home')
    }
    return
  }

  const detail = e.target.closest('[data-detail]')
  if (detail) {
    showAnswerDetail(detail.dataset.detail)
    return
  }

  const goal = e.target.closest('[data-goal]')
  if (goal) {
    S.settings.goal = Number(goal.dataset.goal)
    persistSettings()
    renderSettings()
    toast(`${S.settings.goal}問／日に設定しました`)
    return
  }

  const reset = e.target.closest('[data-reset]')
  if (reset) {
    if (window.confirm('学習の記録をすべて消します。よろしいですか？')) {
      S.progress = {}
      S.daily = {}
      persistProgress()
      persistDaily()
      renderSettings()
      toast('記録をリセットしました')
    }
  }
})

document.addEventListener('keydown', (e) => {
  if (!S.quiz || S.quiz.picked !== null) return
  const map = { 1: 0, 2: 1, 3: 2, 4: 3, a: 0, b: 1, c: 2, d: 3 }
  const i = map[e.key.toLowerCase()]
  if (i != null) answerChoice(i)
})

window.addEventListener('hashchange', route)

/* ============================================================
 * 15. 起動
 * ============================================================ */
async function boot() {
  try {
    const res = await fetch('/api/catalog')
    if (!res.ok) throw new Error(String(res.status))
    S.catalog = await res.json()
  } catch {
    app().innerHTML = `<main class="screen"><div class="empty">
      <b>アプリを読み込めませんでした</b>
      <p>通信環境を確認して、再読み込みしてください。</p>
      <button type="button" class="btn btn-secondary" onclick="location.reload()">再読み込み</button>
    </div></main>`
    return
  }

  document.title = 'マナトビ 高校入試 ─ 中学5教科'

  // 記録画面から開いたときにタイトルを挟まない
  if (!location.hash) {
    location.replace('#/')
  }
  route()
}

boot()
