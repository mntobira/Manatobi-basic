import React, { useEffect, useMemo, useRef, useState } from 'react';
import { type SubjectKey } from '../data/allChapters';
import { ChevronRight, ArrowLeft, X, BookOpen, Zap, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DoorMascot } from './DoorMascot';
import { subjectTheme } from '../data/subjectTheme';
import { ListeningAudioPlayer } from './ListeningAudioPlayer';
import type { Chapter, Problem } from '../types/curriculum';
import { buildListeningRounds } from '../utils/listeningRounds';
import { problemKey, readSolvedMap } from '../utils/progress';
import {
  quizAnswersKey,
  quizExplKey,
  quizIndexKey,
  quizRunKey,
} from '../utils/quizStorageKeys';
import { auth } from '../firebase';
import { buildUnitSections } from '../data/unitSections';
import { UnitCard } from './UnitCard';
import { ListeningTechniqueCard } from './ListeningTechniqueCard';
import './unit-select.css';
import { accuracyOf, readUnitStats } from '../utils/unitStats';
import { isStageCleared, readStageRecords, stageKey } from '../utils/stageRecords';
import { safeGetItem, safeParseJson } from '../utils/safeLocalStorage';
import { getChapterGroups, collectAudioSets, splitTabTitle } from '../utils/chapterGroups';

export type DifficultyFilter = 0 | 1 | 2 | 3;

function inferProblemDifficulty(p: Problem): 1 | 2 | 3 {
  if (p.difficultyLevel === 1 || p.difficultyLevel === 2 || p.difficultyLevel === 3) {
    return p.difficultyLevel;
  }
  const subs = p.subQuestions || [];
  if (subs.length === 0) return 2;
  const avgRate = subs.reduce((s, sq) => s + (sq.correctAnswerRate ?? 64), 0) / subs.length;
  return avgRate >= 72 ? 1 : avgRate >= 58 ? 2 : 3;
}

const DIFF_META: Record<1 | 2 | 3, { label: string; short: string; color: string; bg: string }> = {
  1: { label: '★基礎', short: '★基礎', color: '#15803d', bg: '#dcfce7' },
  2: { label: '★★標準', short: '★★標準', color: '#b45309', bg: '#fef3c7' },
  3: { label: '★★★実戦', short: '★★★実戦', color: '#b91c1c', bg: '#fee2e2' },
};

interface ChapterSelectionProps {
  mode: 'mini_test' | 'practice';
  onChangeMode?: (mode: 'mini_test' | 'practice') => void;
  onSelectChapter: (
    id: string,
    questionIndex?: number,
    resume?: boolean,
    range?: { startIndex: number; endIndex: number } | null,
  ) => void;
  onBack: () => void;
  onChangeSubject?: () => void;
  /** 分野タブの title または partId（例：'sc_part1'） */
  rememberedGroup?: string;
  /** 初期展開する章ID（例：国語の 'ja1_1' 漢字 vs 'ja1_2' 口語文法） */
  initialExpandChapterId?: string | null;
  onGroupChange?: (group: string) => void;
  backLabel?: string;
  subject?: SubjectKey;
}

export function ChapterSelection({
  mode,
  onChangeMode,
  onSelectChapter,
  onBack,
  subject = 'english',
  rememberedGroup,
  initialExpandChapterId,
  onGroupChange,
  backLabel = '戻る',
}: ChapterSelectionProps) {
  const isListening = false;
  const isToeic = false;
  const isRounds = false;
  // ★v6：「まなとび英文法」方式（1回＝約5問のステージ完結型）を全5教科に標準適用★
  const isStageMode = true;
  const theme = subjectTheme(subject);

  const groups = useMemo(() => {
    return getChapterGroups(subject);
  }, [subject]);

  const resolveGroupTitle = (rem?: string) => {
    if (!rem) return groups[0]?.title || '';
    const found = groups.find((g) => g.partId === rem || g.title === rem);
    return found ? found.title : groups[0]?.title || '';
  };

  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(initialExpandChapterId ?? null);
  const [openAudioSetId, setOpenAudioSetId] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>(0);
  const [activeGroupTitle, setActiveGroupTitle] = useState(() => resolveGroupTitle(rememberedGroup));
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [solvedMap] = useState(() => readSolvedMap(auth.currentUser?.uid || 'guest'));
  const [stageRecords] = useState(() => readStageRecords(auth.currentUser?.uid || 'guest'));
  const [unitStats] = useState(() => readUnitStats(auth.currentUser?.uid || 'guest'));

  // 分野または rememberedGroup が切り替わったときは該当タブを開く
  useEffect(() => {
    setActiveGroupTitle(resolveGroupTitle(rememberedGroup));
    setExpandedChapterId(initialExpandChapterId ?? null);
    setOpenAudioSetId(null);
  }, [groups, rememberedGroup, initialExpandChapterId]);

  useEffect(() => {
    tabRefs.current[activeGroupTitle]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeGroupTitle]);

  const activeGroup = groups.find((group) => group.title === activeGroupTitle) || groups[0];
  const toeicTabs = isToeic && groups.length > 1;

  const chapterNumberById = useMemo(() => {
    const m = new Map<string, number>();
    groups.flatMap((g) => g.chapters).forEach((c, i) => m.set(c.id, i));
    return m;
  }, [groups]);

  const unitSections = useMemo(
    () =>
      buildUnitSections<Chapter>(
        subject,
        activeGroup?.chapters ?? [],
        (c) => (mode === 'mini_test' ? c.miniTest || [] : c.practiceProblems || []).length,
      ),
    [subject, activeGroup, mode],
  );
  const orderedChapters = useMemo(() => unitSections.flatMap((sec) => sec.chapters), [unitSections]);
  const unitSectionByChapter = useMemo(() => {
    const m = new Map<string, (typeof unitSections)[number]>();
    for (const sec of unitSections) for (const c of sec.chapters) m.set(c.id, sec);
    return m;
  }, [unitSections]);

  // 選択中の分野内の難易度別ステージ数
  const diffCounts = useMemo(() => {
    const counts = { 0: 0, 1: 0, 2: 0, 3: 0 };
    for (const ch of orderedChapters) {
      const qs = mode === 'mini_test' ? ch.miniTest || [] : ch.practiceProblems || [];
      for (const q of qs) {
        const d = inferProblemDifficulty(q);
        counts[0] += 1;
        counts[d] += 1;
      }
    }
    return counts;
  }, [orderedChapters, mode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mtb-page chapter-route flex h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom))] min-h-0 w-full flex-col overflow-hidden p-2.5 pb-[calc(5.5rem+env(safe-area-inset-bottom))] sm:p-5 sm:pb-[calc(5.75rem+env(safe-area-inset-bottom))] md:p-6 md:pb-[calc(5.75rem+env(safe-area-inset-bottom))] relative">
      {/* ★コンパクト見出し（スマホ1画面で単元カードが最大限見える高さ）★ */}
      <header className="chapter-route-heading unit-head shrink-0">
        <button type="button" onClick={onBack} className="unit-head-back cursor-pointer" aria-label={`${backLabel}へ戻る`}>
          <ArrowLeft size={18} aria-hidden="true" />
          <span>{backLabel}</span>
        </button>
        <div className="unit-head-title">
          <h2 style={{ color: theme.accent }}>{`高校入試・${theme.label}`}</h2>
          <p>
            {mode === 'mini_test'
              ? 'スピード小テスト（1セット約2分・即答チェック）'
              : '1回5問前後のステージ制（タップで回・難易度を選択）'}
          </p>
        </div>
        {onChangeMode ? (
          <div className="inline-flex items-center rounded-xl border border-[#dfd4c0] bg-white/95 p-0.5 shadow-2xs shrink-0" role="group" aria-label="出題モード切り替え">
            <button
              type="button"
              onClick={() => onChangeMode('practice')}
              aria-pressed={mode === 'practice'}
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] sm:text-xs font-extrabold transition-colors cursor-pointer ${
                mode === 'practice' ? 'text-white shadow-2xs' : 'text-[#5a6573] hover:bg-[#f7f2e8]'
              }`}
              style={mode === 'practice' ? { backgroundColor: theme.accent } : undefined}
            >
              <BookOpen size={12} aria-hidden="true" />
              <span>実戦</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeMode('mini_test')}
              aria-pressed={mode === 'mini_test'}
              className={`inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[11px] sm:text-xs font-extrabold transition-colors cursor-pointer ${
                mode === 'mini_test' ? 'bg-[#e38614] text-white shadow-2xs' : 'text-[#5a6573] hover:bg-[#f7f2e8]'
              }`}
            >
              <Zap size={12} aria-hidden="true" />
              <span>小テスト</span>
            </button>
          </div>
        ) : (
          <DoorMascot subject={subject} showSpeech={false} size="mini" className="unit-head-mascot w-auto" />
        )}
      </header>

      <div className="chapter-workspace flex min-h-0 flex-1 flex-col">
        {/* 分野タブ（スマホでも1行コンパクトピルで高さを節約） */}
        {(!isToeic || toeicTabs) && (
          <div className="chapter-index mb-1.5 shrink-0" data-few-tabs={groups.length <= 4 || undefined}>
            <div
              role="tablist"
              aria-label="分野を選択"
              className="flex touch-pan-x snap-x snap-mandatory gap-1.5 overflow-x-auto overscroll-x-contain px-0.5 pb-1 [scrollbar-width:none] sm:grid sm:grid-cols-4 sm:overflow-x-visible"
            >
              {groups.map((group, index) => {
                const isActive = group.title === activeGroup?.title;
                const shortLabel = (group.label || group.title)
                  .replace(/（.*?）/g, '')
                  .replace(/^中1・中2\s*/, '中1・2 ')
                  .trim();

                return (
                  <button
                    key={group.partId || group.title}
                    ref={(element) => {
                      tabRefs.current[group.title] = element;
                    }}
                    id={`chapter-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="chapter-tab-panel"
                    onClick={() => {
                      setActiveGroupTitle(group.title);
                      onGroupChange?.(group.partId || group.title);
                      setExpandedChapterId(null);
                      setOpenAudioSetId(null);
                      document.getElementById('chapter-tab-panel')?.scrollTo({ top: 0 });
                    }}
                    className={`chapter-compact-tab flex min-h-[42px] shrink-0 snap-center flex-col justify-center rounded-xl border px-2.5 py-1.5 text-left transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#e3c77f] bg-[#fffdf5] text-[#2c2216] shadow-xs'
                        : 'border-slate-200 bg-white/75 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <span className="block text-[10.5px] font-extrabold leading-none" style={{ color: theme.accent }}>
                      {group.kicker ? `${group.kicker}（${group.chapters.length}章）` : splitTabTitle(group.title, index).kicker}
                    </span>
                    <span className="mt-0.5 block text-xs font-extrabold leading-tight truncate">
                      {shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ★v6新搭載：難易度フィルターバー（すべて ／ ★基礎 ／ ★★標準 ／ ★★★実戦）★ */}
        <div className="juken-diff-bar mb-1.5 shrink-0" role="group" aria-label="難易度で絞り込む">
          <span className="juken-diff-label">
            <SlidersHorizontal size={12} aria-hidden="true" />
            <span>難易度</span>
          </span>
          {([
            { key: 0 as DifficultyFilter, text: `すべて(${diffCounts[0]})` },
            { key: 1 as DifficultyFilter, text: `★基礎(${diffCounts[1]})` },
            { key: 2 as DifficultyFilter, text: `★★標準(${diffCounts[2]})` },
            { key: 3 as DifficultyFilter, text: `★★★実戦(${diffCounts[3]})` },
          ]).map((item) => {
            const active = difficultyFilter === item.key;
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={active}
                disabled={item.key !== 0 && diffCounts[item.key as 1 | 2 | 3] === 0}
                onClick={() => setDifficultyFilter(item.key)}
                className="juken-diff-pill"
                data-active={active || undefined}
                data-tier={item.key}
              >
                {item.text}
              </button>
            );
          })}
        </div>

        {activeGroup && (
          <section
            id="chapter-tab-panel"
            role="tabpanel"
            aria-labelledby={`chapter-tab-${groups.indexOf(activeGroup)}`}
            tabIndex={0}
            className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain rounded-2xl border border-slate-200/80 bg-white/35 p-2.5 pb-6 sm:p-4 sm:pb-6 [-webkit-overflow-scrolling:touch] [scrollbar-gutter:stable]"
          >
            <div className="mb-2 flex items-center justify-between gap-2 border-b border-slate-200/70 pb-2">
              <p className="text-xs font-extrabold truncate" style={{ color: theme.accent }}>
                {activeGroup.partTitle}
              </p>
              <span className="shrink-0 text-[11px] font-bold text-slate-500">
                1ステージ完結
              </span>
            </div>

            {isRounds ? (
              <div className="space-y-4" data-listening-rounds>
                {activeGroup.chapters.map((chapter) => {
                  const questions = mode === 'mini_test' ? chapter.miniTest || [] : chapter.practiceProblems || [];
                  const rounds = buildListeningRounds(questions);
                  return (
                    <div key={chapter.id}>
                      {isListening && <ListeningTechniqueCard chapterId={chapter.id} />}
                      <div className="round-grid grid grid-cols-1 gap-1.5 min-[420px]:grid-cols-2">
                        {rounds.map((round) => (
                          <button
                            key={round.questionId}
                            type="button"
                            onClick={() =>
                              onSelectChapter(chapter.id, round.index, false, {
                                startIndex: round.index,
                                endIndex: round.index,
                              })
                            }
                            className="round-card rounded-xl border p-2 text-left"
                          >
                            {round.roundLabel}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="chapter-route-list unit-card-list">
                {orderedChapters.map((chapter, routeIndex) => {
                  const allQuestions = mode === 'mini_test' ? chapter.miniTest || [] : chapter.practiceProblems || [];
                  // 難易度フィルターに合致するインデックス一覧
                  const matchingIndices = allQuestions
                    .map((q, idx) => ({ q, idx, diff: inferProblemDifficulty(q) }))
                    .filter((entry) => difficultyFilter === 0 || entry.diff === difficultyFilter);

                  if (difficultyFilter !== 0 && matchingIndices.length === 0) {
                    return null;
                  }

                  const hasQuestions = matchingIndices.length > 0;
                  const savedIndex = Math.max(
                    0,
                    Math.min(
                      allQuestions.length - 1,
                      parseInt(safeGetItem(quizIndexKey(chapter.id, mode)) || '0', 10) || 0,
                    ),
                  );
                  const hasSavedProgress =
                    hasQuestions &&
                    (savedIndex > 0 ||
                      safeGetItem(quizExplKey(chapter.id, mode)) === 'true' ||
                      !!safeGetItem(quizRunKey(chapter.id, mode)) ||
                      Object.keys(safeParseJson<object>(safeGetItem(quizAnswersKey(chapter.id, mode)), {}) ?? {})
                        .length > 0);

                  const audioSets = collectAudioSets(chapter);
                  const solvedCount = allQuestions.filter((q) => solvedMap[problemKey(chapter.id, q.id)]).length;
                  const stat = unitStats[chapter.id];

                  // ★まなとび英文法方式：1セット（約5問）＝1ステージ★
                  const roundCleared = allQuestions.map((q) =>
                    isStageCleared(stageRecords[stageKey(chapter.id, q.id)]),
                  );
                  const clearedRounds = matchingIndices.filter((e) => roundCleared[e.idx]).length;
                  const firstUnclearedMatch =
                    matchingIndices.find((e) => !roundCleared[e.idx])?.idx ?? matchingIndices[0]?.idx ?? 0;
                  const roundTried = matchingIndices.some((e) => !!stageRecords[stageKey(chapter.id, e.q.id)]);

                  const stageTarget =
                    hasSavedProgress && matchingIndices.some((e) => e.idx === savedIndex)
                      ? savedIndex
                      : firstUnclearedMatch;

                  const status =
                    matchingIndices.length > 0 && clearedRounds === matchingIndices.length
                      ? 'done'
                      : solvedCount > 0 || hasSavedProgress || !!stat || roundTried
                        ? 'doing'
                        : 'todo';

                  const section = unitSectionByChapter.get(chapter.id);
                  const prevSection =
                    routeIndex > 0 ? unitSectionByChapter.get(orderedChapters[routeIndex - 1].id) : undefined;
                  const stageHeading =
                    section?.label && section !== prevSection ? (
                      <h4 className="math-stage-heading col-span-full" data-stage={section.key?.split(':')[1] ?? section.key ?? ''}>
                        <span>{section.label}</span>
                        <small>{section.chapters.length}単元</small>
                      </h4>
                    ) : null;

                  const expanded = expandedChapterId === chapter.id;
                  const subQuestionTotal = matchingIndices.reduce(
                    (sum, e) => sum + Math.max(1, (e.q.subQuestions || []).length),
                    0,
                  );

                  const targetDiff = allQuestions[stageTarget]
                    ? DIFF_META[inferProblemDifficulty(allQuestions[stageTarget])].short
                    : '';

                  return (
                    <React.Fragment key={chapter.id}>
                      {stageHeading}
                      <div data-unit-id={chapter.id}>
                        <UnitCard
                          index={chapterNumberById.get(chapter.id) ?? routeIndex}
                          title={chapter.abstractTitle}
                          topics={chapter.topics}
                          questionCount={matchingIndices.length}
                          subQuestionTotal={subQuestionTotal}
                          status={status}
                          accuracy={accuracyOf(stat)}
                          perfects={undefined}
                          progressLabel={
                            hasQuestions
                              ? `達成 ${clearedRounds}/${matchingIndices.length}回`
                              : undefined
                          }
                          hasSavedProgress={hasSavedProgress}
                          expanded={expanded}
                          accent={theme.accent}
                          primaryLabel={
                            isStageMode && hasQuestions
                              ? hasSavedProgress && stageTarget === savedIndex
                                ? `第${stageTarget + 1}回の続き`
                                : clearedRounds === matchingIndices.length
                                  ? `第${stageTarget + 1}回を復習`
                                  : `第${stageTarget + 1}回を始める (${targetDiff})`
                              : undefined
                          }
                          roundsMode={isStageMode && hasQuestions}
                          onToggle={() => setExpandedChapterId(expanded ? null : chapter.id)}
                          onStart={() =>
                            onSelectChapter(chapter.id, stageTarget, false, {
                              startIndex: stageTarget,
                              endIndex: stageTarget,
                            })
                          }
                          onResume={() =>
                            onSelectChapter(chapter.id, stageTarget, false, {
                              startIndex: stageTarget,
                              endIndex: stageTarget,
                            })
                          }
                          onAudio={
                            audioSets.length > 0
                              ? () => setOpenAudioSetId(openAudioSetId === audioSets[0].id ? null : audioSets[0].id)
                              : undefined
                          }
                          audioOpen={audioSets.length > 0 && openAudioSetId === audioSets[0].id}
                        >
                          {isStageMode && hasQuestions && (
                            <div className="grammar-rounds" data-grammar-rounds>
                              {chapter.topics && chapter.topics.length > 0 && (
                                <div className="juken-unit-topics">
                                  {chapter.topics.slice(0, 4).map((t) => (
                                    <span key={t} className="juken-unit-topic-chip">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <p className="grammar-rounds-head">
                                <span>
                                  全{matchingIndices.length}ステージ（計{subQuestionTotal}問）
                                </span>
                                <span
                                  className="grammar-rounds-meter"
                                  aria-label={`達成 ${clearedRounds}/${matchingIndices.length}ステージ`}
                                >
                                  {matchingIndices.map((entry) => (
                                    <i
                                      key={entry.q.id}
                                      data-on={roundCleared[entry.idx] || undefined}
                                      data-next={entry.idx === stageTarget || undefined}
                                    />
                                  ))}
                                </span>
                                <b>
                                  達成 {clearedRounds}/{matchingIndices.length}
                                </b>
                              </p>
                              <ol className="grammar-rounds-list">
                                {matchingIndices.map(({ q: question, idx: questionIndex, diff }) => {
                                  const rec = stageRecords[stageKey(chapter.id, question.id)];
                                  const cleared = roundCleared[questionIndex];
                                  const isNext = questionIndex === stageTarget;
                                  const state = cleared ? 'done' : rec ? 'doing' : 'todo';
                                  const rawLabel = String(question.title || question.category || '').replace(
                                    /^第\d+回\s*/,
                                    '',
                                  );
                                  const sqCount = Math.max(1, (question.subQuestions || []).length);
                                  const dMeta = DIFF_META[diff];
                                  return (
                                    <li key={question.id}>
                                      <button
                                        type="button"
                                        className="grammar-round"
                                        data-round={questionIndex}
                                        data-state={state}
                                        data-next={isNext || undefined}
                                        data-cleared={cleared || undefined}
                                        aria-label={`第${questionIndex + 1}回 ${rawLabel}（${dMeta.label}・${sqCount}問）を始める`}
                                        onClick={() =>
                                          onSelectChapter(chapter.id, questionIndex, false, {
                                            startIndex: questionIndex,
                                            endIndex: questionIndex,
                                          })
                                        }
                                      >
                                        <span className="grammar-round-no" aria-hidden="true">
                                          {questionIndex + 1}
                                        </span>
                                        <span className="grammar-round-body">
                                          <span className="juken-stage-badges">
                                            {isNext && (
                                              <em className="grammar-round-next">
                                                {hasSavedProgress && stageTarget === savedIndex ? 'つづき' : 'つぎ'}
                                              </em>
                                            )}
                                            <span
                                              className="juken-stage-diff"
                                              style={{ color: dMeta.color, backgroundColor: dMeta.bg }}
                                            >
                                              {dMeta.label}
                                            </span>
                                            <span className="juken-stage-qcount">{sqCount}問</span>
                                          </span>
                                          <span className="grammar-round-title">
                                            {rawLabel || `ステージ ${questionIndex + 1}`}
                                          </span>
                                        </span>
                                        <span className="grammar-round-state">
                                          {cleared ? (
                                            <span className="unit-round-done">達成</span>
                                          ) : rec ? (
                                            <span className="grammar-round-best">最高 {rec.b}%</span>
                                          ) : (
                                            <span className="grammar-round-todo">挑戦</span>
                                          )}
                                        </span>
                                        <ChevronRight size={16} aria-hidden="true" />
                                      </button>
                                    </li>
                                  );
                                })}
                              </ol>
                            </div>
                          )}
                        </UnitCard>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            <AnimatePresence initial={false}>
              {(() => {
                const sets = activeGroup.chapters.flatMap((c) => collectAudioSets(c));
                const target = sets.find((s) => s.id === openAudioSetId);
                if (!target) return null;
                return (
                  <motion.div
                    key={target.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3">
                      <div className="mb-1.5 flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-[#2F7C74]">復習用音源 ／ {target.title}</p>
                        <button
                          type="button"
                          onClick={() => setOpenAudioSetId(null)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50 cursor-pointer"
                        >
                          <X size={11} />
                          閉じる
                        </button>
                      </div>
                      <ListeningAudioPlayer
                        tracks={target.tracks}
                        mode="review"
                        tone="light"
                        readCount={target.readCount}
                        title="復習用の音源を聞く（問題を解かずに音声だけ再生）"
                      />
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </section>
        )}
      </div>
    </div>
  );
}
