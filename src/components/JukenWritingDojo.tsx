import React, { useMemo, useState } from 'react';
import '../styles/juken-polish.css';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  PenTool,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  PARAPHRASE_TIPS_5,
  WRITING_PATTERNS_21,
  WRITING_TASKS,
  evaluateEnglishWriting,
  type AutoCheckResult,
  type WritingTask,
} from '../data/jukenWritingData';
import { TobiraBuddy } from './TobiraBuddy';

interface JukenWritingDojoProps {
  onBack: () => void;
}

type TabKey = 'practice' | 'patterns' | 'paraphrase';

export const JukenWritingDojo: React.FC<JukenWritingDojoProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('practice');
  const [groupFilter, setGroupFilter] = useState<'all' | WritingTask['group']>('all');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(
    WRITING_TASKS.find((t) => t.group === 'pref_special')?.id ?? WRITING_TASKS[0].id,
  );
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, AutoCheckResult>>({});
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('mntb_juken_writing_done');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const filteredTasks = useMemo(
    () =>
      groupFilter === 'all'
        ? WRITING_TASKS
        : WRITING_TASKS.filter((t) => t.group === groupFilter),
    [groupFilter],
  );

  const currentTask: WritingTask =
    filteredTasks.find((t) => t.id === selectedTaskId) ?? filteredTasks[0] ?? WRITING_TASKS[0];

  const currentDraft = drafts[currentTask.id] ?? '';
  const liveStats = useMemo(() => {
    const t = currentDraft.trim();
    if (!t) return { words: 0, sentences: 0 };
    const words = t
      .replace(/[.?!,;:"()]/g, ' ')
      .split(/\s+/)
      .filter(Boolean).length;
    const strippedAbbr = t.replace(/\b(Mr|Ms|Mrs|Dr|Jr|St|a\.m|p\.m)\./gi, '$1');
    const sm = strippedAbbr.match(/[.?!]+/g);
    return { words, sentences: sm ? sm.length : 1 };
  }, [currentDraft]);

  const currentResult = results[currentTask.id];

  const handleCheck = () => {
    const res = evaluateEnglishWriting(currentDraft, currentTask);
    setResults((prev) => ({ ...prev, [currentTask.id]: res }));
    if (res.estimatedScore === 2) {
      setCompletedIds((prev) => {
        const next = { ...prev, [currentTask.id]: true };
        try {
          localStorage.setItem('mntb_juken_writing_done', JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    }
  };

  const insertPhrase = (phrase: string) => {
    setDrafts((prev) => {
      const cur = prev[currentTask.id] ?? '';
      const next = cur ? `${cur.trimEnd()} ${phrase}` : phrase;
      return { ...prev, [currentTask.id]: next };
    });
    setActiveTab('practice');
  };

  const doneCount = Object.values(completedIds).filter(Boolean).length;

  return (
    <div className="juken-screen">
      <header className="juken-header">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="juken-btn-soft inline-flex items-center gap-1.5 px-3 py-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>もどる</span>
          </button>

          <div className="flex items-center gap-2 min-w-0">
            <PenTool className="w-5 h-5 text-[#2458a6] shrink-0" />
            <h1 className="juken-title-font text-base sm:text-lg font-extrabold truncate">
              高校入試 英作文道場
            </h1>
          </div>

          <div className="juken-num text-xs font-extrabold px-3 py-1.5 rounded-full bg-[#e7eef8] text-[#1c4687] shrink-0">
            クリア {doneCount}/{WRITING_TASKS.length}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-4 space-y-4">
        {/* とびら君ワンポイント */}
        <div className="juken-card p-3.5 flex items-center justify-between gap-3">
          <TobiraBuddy
            size="sm"
            bubble="right"
            input={{ screen: 'study' }}
            line="高校入試の英作文は『難しい単語で背伸びせず、中学英語の確実な型で減点ゼロを狙う』のが満点への最短ルートだよ！"
          />
        </div>

        {/* モード切替タブ */}
        <div className="grid grid-cols-3 gap-2 bg-white p-1.5 rounded-2xl border border-[#e3d9c8] shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab('practice')}
            className={`min-h-[44px] rounded-xl text-xs sm:text-sm font-extrabold transition ${
              activeTab === 'practice'
                ? 'bg-[#2458a6] text-white shadow-sm'
                : 'text-[#4f4132] hover:bg-[#f6efe2]'
            }`}
          >
            実戦添削ドリル（{WRITING_TASKS.length}題）
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('patterns')}
            className={`min-h-[44px] rounded-xl text-xs sm:text-sm font-extrabold transition ${
              activeTab === 'patterns'
                ? 'bg-[#2458a6] text-white shadow-sm'
                : 'text-[#4f4132] hover:bg-[#f6efe2]'
            }`}
          >
            必須の型 21選
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('paraphrase')}
            className={`min-h-[44px] rounded-xl text-xs sm:text-sm font-extrabold transition ${
              activeTab === 'paraphrase'
                ? 'bg-[#2458a6] text-white shadow-sm'
                : 'text-[#4f4132] hover:bg-[#f6efe2]'
            }`}
          >
            減点ゼロ言い換え
          </button>
        </div>

        {/* タブ1：実戦添削ドリル */}
        {activeTab === 'practice' && (
          <div className="space-y-4">
            {/* カテゴリ絞り込み */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { key: 'all', label: `すべて（${WRITING_TASKS.length}）` },
                { key: 'pref_special', label: '都立3文・埼玉/大阪・神奈川型' },
                { key: 'mock_dialogue', label: '対話・Eメール補充' },
                { key: 'national_opinion', label: '全国テーマ意見英作' },
                { key: 'drill', label: '基礎ドリル' },
                { key: 'error_fix', label: '誤文訂正' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    const nextKey = cat.key as typeof groupFilter;
                    setGroupFilter(nextKey);
                    const first =
                      nextKey === 'all'
                        ? WRITING_TASKS[0]
                        : WRITING_TASKS.find((t) => t.group === nextKey);
                    if (first) setSelectedTaskId(first.id);
                  }}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap border transition ${
                    groupFilter === cat.key
                      ? 'bg-[#f29a1f] text-[#1f1405] border-[#c97808]'
                      : 'bg-white text-[#4f4132] border-[#dfd2bc] hover:bg-[#fffaf0]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* 問題カード選択 */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {filteredTasks.map((task) => {
                const selected = task.id === currentTask.id;
                const done = !!completedIds[task.id];
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => setSelectedTaskId(task.id)}
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl border text-left whitespace-nowrap flex items-center gap-1.5 transition ${
                      selected
                        ? 'bg-white border-2 border-[#2458a6] text-[#1c4687] font-extrabold shadow-sm'
                        : 'bg-white/85 border-[#dfd2bc] text-[#4f4132] font-bold hover:bg-white'
                    }`}
                  >
                    <span className="text-xs">{task.badge}</span>
                    {done && <CheckCircle2 className="w-4 h-4 text-[#1f7a4d] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* 出題＆入力パネル */}
            <section className="juken-card overflow-hidden">
              <div className="px-5 py-4 bg-[#eaf2fd] border-b border-[#cfe0f5]">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-block text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#2458a6] text-white">
                    {currentTask.badge}
                  </span>
                  {currentTask.prefTag && (
                    <span className="inline-block text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white border border-[#b9d0ef] text-[#1c4687]">
                      {currentTask.prefTag}
                    </span>
                  )}
                </div>
                <h2 className="juken-title-font mt-1.5 text-base sm:text-lg font-black text-[#1c2a39]">
                  {currentTask.title}
                </h2>
              </div>

              <div className="p-5 space-y-4">
                <div className="rounded-2xl bg-[#fffdf8] border border-[#e6dccb] p-4 text-sm leading-7 whitespace-pre-line font-medium text-[#231d16]">
                  {currentTask.context}
                </div>

                {currentTask.brokenSentence && (
                  <div className="rounded-2xl bg-[#fff2f2] border border-[#f5c2c2] p-3.5 text-sm">
                    <span className="text-xs font-extrabold text-[#b3261e] block mb-1">
                      【誤りを含む元の英文】
                    </span>
                    <p className="font-mono font-bold text-[#8c1d18] text-sm sm:text-base">
                      {currentTask.brokenSentence}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#4f4132] bg-[#f6efe2] px-3.5 py-2.5 rounded-xl border border-[#e6dccb]">
                  <span className="font-bold">【条件】{currentTask.condition}</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-extrabold text-[#1c4687]">ヒント語（タップで挿入）：</span>
                    {currentTask.hintKeywords.map((kw) => (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => insertPhrase(kw)}
                        className="px-2 py-0.5 rounded-md bg-white border border-[#c7daf4] text-[#1c4687] font-extrabold hover:bg-[#eaf2fd] transition"
                      >
                        + {kw}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 入力エリア */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <label
                      htmlFor="juken-writing-textarea"
                      className="text-xs sm:text-sm font-extrabold text-[#1c2a39]"
                    >
                      あなたの解答英文
                    </label>
                    <div className="flex items-center gap-2">
                      {currentTask.minSentences && (
                        <span className="juken-num text-xs font-extrabold px-2.5 py-1 rounded-full bg-[#e7eef8] text-[#1c4687]">
                          文数：{liveStats.sentences} 文
                        </span>
                      )}
                      <span
                        className={`juken-num text-xs font-extrabold px-2.5 py-1 rounded-full ${
                          liveStats.words >= currentTask.minWords
                            ? 'bg-[#e3f3ea] text-[#1f7a4d]'
                            : 'bg-[#fdeedb] text-[#8a4b00]'
                        }`}
                      >
                        語数：{liveStats.words} 語（目安 {currentTask.minWords} 語〜）
                      </span>
                    </div>
                  </div>
                  <textarea
                    id="juken-writing-textarea"
                    rows={4}
                    value={currentDraft}
                    onChange={(e) =>
                      setDrafts((prev) => ({ ...prev, [currentTask.id]: e.target.value }))
                    }
                    placeholder="ここに英語を入力しましょう（例：Because you can see many beautiful flowers there.）"
                    className="w-full rounded-2xl border-2 border-[#d5c8b2] focus:border-[#2458a6] focus:outline-none p-3.5 text-base font-medium bg-white text-[#1c2a39]"
                  />
                </div>

                {/* アクションボタン */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDrafts((prev) => ({ ...prev, [currentTask.id]: '' }));
                      setResults((prev) => {
                        const copy = { ...prev };
                        delete copy[currentTask.id];
                        return copy;
                      });
                    }}
                    className="juken-btn-soft inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>書き直す</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCheck}
                    className="juken-btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>減点チェック＆模範解答を見る</span>
                  </button>
                </div>

                {/* 採点フィードバック＆模範解答 */}
                {currentResult && (
                  <div className="mt-4 space-y-4 border-t border-[#ece2d0] pt-4">
                    <div className="flex items-center justify-between rounded-2xl bg-[#eaf2fd] border border-[#c7daf4] px-4 py-3">
                      <span className="text-xs sm:text-sm font-extrabold text-[#1c4687]">
                        形式・語数・頻出減点セルフチェック判定
                      </span>
                      <span className="juken-num text-lg font-black text-[#1c4687]">
                        {currentResult.estimatedScore === 2
                          ? '◎ 満点水準（減点0）'
                          : currentResult.estimatedScore === 1
                            ? '△ 部分点水準（要確認1件）'
                            : '× 要修正あり'}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {currentResult.issues.map((issue, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2 rounded-xl p-3 text-xs sm:text-sm font-bold ${
                            issue.level === 'error'
                              ? 'bg-red-50 text-red-800 border border-red-200'
                              : issue.level === 'warn'
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {issue.level === 'ok' ? (
                            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          )}
                          <span>{issue.message}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl bg-[#fffaf0] border border-[#ebd7b2] p-4 space-y-3">
                      <h3 className="text-sm font-extrabold text-[#8a4b00] flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span>満点模範解答例</span>
                      </h3>
                      <ul className="space-y-2">
                        {currentTask.modelAnswers.map((ans, idx) => (
                          <li
                            key={idx}
                            className="rounded-xl bg-white border border-[#efe2c9] px-3.5 py-2.5 text-sm font-bold text-[#1c4687]"
                          >
                            {ans}
                          </li>
                        ))}
                      </ul>

                      <div className="pt-1">
                        <p className="text-xs font-extrabold text-[#5a4a36] mb-1">
                          【採点官が見ているチェックポイント】
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#3d3222]">
                          {currentTask.rubricPoints.map((pt, idx) => (
                            <li key={idx}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* タブ2：必須の型 21選 */}
        {activeTab === 'patterns' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {WRITING_PATTERNS_21.map((item) => (
              <div
                key={item.no}
                className="juken-card p-4 flex flex-col justify-between gap-2"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-[#e7eef8] text-[#1c4687]">
                      型 #{item.no} ・ {item.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => insertPhrase(item.example)}
                      className="text-xs font-extrabold text-[#8a4b00] bg-[#fdf0db] px-2.5 py-1 rounded-lg hover:brightness-95 min-h-[32px]"
                    >
                      解答欄に挿入 →
                    </button>
                  </div>
                  <p className="mt-1.5 text-sm sm:text-base font-black text-[#1c2a39]">
                    {item.pattern}
                  </p>
                  <p className="text-xs font-bold text-[#5a6573]">{item.japanese}</p>
                  <p className="mt-2 text-xs sm:text-sm bg-[#f6efe2] border border-[#e3d9c8] rounded-xl px-3 py-2 font-bold text-[#1c4687]">
                    例：{item.example}
                  </p>
                </div>
                <p className="text-xs text-[#8a4b00] font-bold flex items-center gap-1 pt-1">
                  <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.caution}</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {/* タブ3：減点ゼロの言い換え術 */}
        {activeTab === 'paraphrase' && (
          <div className="space-y-3">
            {PARAPHRASE_TIPS_5.map((tip, idx) => (
              <div key={idx} className="juken-card p-4 sm:p-5 space-y-2">
                <div className="juken-title-font text-sm sm:text-base font-extrabold text-[#1c2a39]">
                  お題：「{tip.hardJa}」
                </div>
                <div className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-2 text-xs sm:text-sm font-bold text-red-800">
                  {tip.ngTrap}
                </div>
                <div className="rounded-xl bg-[#e3f3ea] border border-[#b4dec4] px-3.5 py-2.5 text-xs sm:text-sm font-extrabold text-[#145334]">
                  ◎ 安全満点表現：{tip.safeEn}
                </div>
                <p className="text-xs sm:text-sm text-[#4e4030] font-semibold">
                  ポイント：{tip.point}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
