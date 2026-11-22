import React, { useMemo, useState } from 'react';
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

interface JukenWritingDojoProps {
  onBack: () => void;
}

type TabKey = 'practice' | 'patterns' | 'paraphrase';

export const JukenWritingDojo: React.FC<JukenWritingDojoProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('practice');
  const [groupFilter, setGroupFilter] = useState<'all' | WritingTask['group']>('all');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(WRITING_TASKS[4]?.id ?? WRITING_TASKS[0].id);
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
  const liveWordCount = useMemo(() => {
    const t = currentDraft.trim();
    if (!t) return 0;
    return t
      .replace(/[.?!,;:"()]/g, ' ')
      .split(/\s+/)
      .filter(Boolean).length;
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

  return (
    <div className="min-h-screen bg-[#fcf5e9] text-[#2b241c] pb-24">
      <header className="sticky top-0 z-30 bg-[#fcf5e9]/95 backdrop-blur-md border-b border-[#e5d8c3] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-xl bg-white border border-[#e2d5bf] text-sm font-bold text-[#3d3328] hover:bg-[#f7efe0] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>もどる</span>
          </button>

          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-[#2458A6]" />
            <h1 className="text-base sm:text-lg font-extrabold">
              高校入試 英作文道場
            </h1>
          </div>

          <div className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-[#2458A6]/10 text-[#2458A6]">
            クリア {Object.values(completedIds).filter(Boolean).length}/{WRITING_TASKS.length}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-4 space-y-4">
        {/* モード切替タブ */}
        <div className="grid grid-cols-3 gap-2 bg-white/80 p-1.5 rounded-2xl border border-[#e3d6c1]">
          <button
            type="button"
            onClick={() => setActiveTab('practice')}
            className={`min-h-[44px] rounded-xl text-xs sm:text-sm font-extrabold transition ${
              activeTab === 'practice'
                ? 'bg-[#2458A6] text-white shadow-sm'
                : 'text-[#5b4d3d] hover:bg-[#f6eee0]'
            }`}
          >
            実戦添削ドリル
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('patterns')}
            className={`min-h-[44px] rounded-xl text-xs sm:text-sm font-extrabold transition ${
              activeTab === 'patterns'
                ? 'bg-[#2458A6] text-white shadow-sm'
                : 'text-[#5b4d3d] hover:bg-[#f6eee0]'
            }`}
          >
            必須の型 21選
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('paraphrase')}
            className={`min-h-[44px] rounded-xl text-xs sm:text-sm font-extrabold transition ${
              activeTab === 'paraphrase'
                ? 'bg-[#2458A6] text-white shadow-sm'
                : 'text-[#5b4d3d] hover:bg-[#f6eee0]'
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
                { key: 'all', label: 'すべて' },
                { key: 'mock_dialogue', label: '予想問題（対話・メール）' },
                { key: 'national_opinion', label: '意見・自由英作文' },
                { key: 'drill', label: '基礎ドリル' },
                { key: 'error_fix', label: '誤文訂正' },
              ].map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setGroupFilter(cat.key as typeof groupFilter)}
                  className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap border transition ${
                    groupFilter === cat.key
                      ? 'bg-[#f29a1f] text-white border-[#f29a1f]'
                      : 'bg-white text-[#574939] border-[#e2d6c1]'
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
                        ? 'bg-white border-2 border-[#2458A6] text-[#1c437e] font-extrabold shadow-sm'
                        : 'bg-white/70 border-[#e2d6c1] text-[#554738] font-bold hover:bg-white'
                    }`}
                  >
                    <span className="text-xs">{task.badge}</span>
                    {done && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* 出題＆入力パネル */}
            <section className="bg-white rounded-3xl border border-[#e3d6c1] shadow-sm overflow-hidden">
              <div className="px-5 py-4 bg-[#f4f8fe] border-b border-[#dce7f7]">
                <span className="inline-block text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#2458A6] text-white">
                  {currentTask.badge}
                </span>
                <h2 className="mt-1.5 text-base sm:text-lg font-extrabold text-[#1e293b]">
                  {currentTask.title}
                </h2>
              </div>

              <div className="p-5 space-y-4">
                <div className="rounded-2xl bg-[#fffcf6] border border-[#ece0cb] p-4 text-sm leading-7 whitespace-pre-line font-medium text-[#2c241b]">
                  {currentTask.context}
                </div>

                {currentTask.brokenSentence && (
                  <div className="rounded-2xl bg-[#fff2f2] border border-[#f5c2c2] p-3.5 text-sm">
                    <span className="text-xs font-extrabold text-[#c53030] block mb-1">
                      【誤りを含む元の英文】
                    </span>
                    <p className="font-mono font-bold text-[#9b2c2c]">
                      {currentTask.brokenSentence}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5d4e3d] bg-[#f8f2e7] px-3.5 py-2.5 rounded-xl">
                  <span className="font-bold">【条件】{currentTask.condition}</span>
                  <span className="font-extrabold text-[#2458A6]">
                    ヒント語：{currentTask.hintKeywords.join(' / ')}
                  </span>
                </div>

                {/* 入力エリア */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="juken-writing-textarea"
                      className="text-xs sm:text-sm font-extrabold text-[#3c3125]"
                    >
                      あなたの解答英文
                    </label>
                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                        liveWordCount >= currentTask.minWords
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      現在 {liveWordCount} 語（目安 {currentTask.minWords} 語〜）
                    </span>
                  </div>
                  <textarea
                    id="juken-writing-textarea"
                    rows={4}
                    value={currentDraft}
                    onChange={(e) =>
                      setDrafts((prev) => ({ ...prev, [currentTask.id]: e.target.value }))
                    }
                    placeholder="ここに英語を入力しましょう（例：Because you can see many beautiful flowers there.）"
                    className="w-full rounded-2xl border-2 border-[#d8cbb5] focus:border-[#2458A6] focus:outline-none p-3.5 text-base font-medium bg-white text-[#231d16]"
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
                    className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl border border-[#dfd2bc] text-xs sm:text-sm font-bold text-[#5e4f3e] hover:bg-[#faf4e8]"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>書き直す</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCheck}
                    className="inline-flex items-center gap-2 min-h-[46px] px-6 py-2.5 rounded-xl bg-[#2458A6] text-white text-sm font-extrabold shadow-sm hover:brightness-105 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>減点チェック＆模範解答を見る</span>
                  </button>
                </div>

                {/* 採点フィードバック＆模範解答 */}
                {currentResult && (
                  <div className="mt-4 space-y-4 border-t border-[#eee2cf] pt-4">
                    <div className="flex items-center justify-between rounded-2xl bg-[#f7fafc] border border-[#dce6f2] px-4 py-3">
                      <span className="text-sm font-extrabold text-[#2458A6]">
                        形式・文法セルフチェック判定（2点満点換算）
                      </span>
                      <span className="text-lg font-black text-[#2458A6]">
                        {currentResult.estimatedScore} / 2 点
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

                    <div className="rounded-2xl bg-[#fffaf0] border border-[#eedbb8] p-4 space-y-3">
                      <h3 className="text-sm font-extrabold text-[#8c5410] flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span>満点模範解答例</span>
                      </h3>
                      <ul className="space-y-2">
                        {currentTask.modelAnswers.map((ans, idx) => (
                          <li
                            key={idx}
                            className="rounded-xl bg-white border border-[#efe2c9] px-3.5 py-2.5 text-sm font-bold text-[#1e3a6d]"
                          >
                            {ans}
                          </li>
                        ))}
                      </ul>

                      <div className="pt-1">
                        <p className="text-xs font-extrabold text-[#6a563d] mb-1">
                          【採点官が見ているチェックポイント】
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#4f4132]">
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
                className="bg-white rounded-2xl border border-[#e3d6c1] p-4 flex flex-col justify-between gap-2 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-[#2458A6]/10 text-[#2458A6]">
                      型 #{item.no} ・ {item.category}
                    </span>
                    <button
                      type="button"
                      onClick={() => insertPhrase(item.example)}
                      className="text-xs font-bold text-[#f29a1f] hover:underline min-h-[32px] px-1"
                    >
                      解答欄に挿入 →
                    </button>
                  </div>
                  <p className="mt-1.5 text-sm sm:text-base font-black text-[#1d3b6c]">
                    {item.pattern}
                  </p>
                  <p className="text-xs font-bold text-[#5b4c3b]">{item.japanese}</p>
                  <p className="mt-2 text-xs sm:text-sm bg-[#f8fafd] border border-[#e2ebf6] rounded-xl px-3 py-2 font-medium text-[#27364b]">
                    例：{item.example}
                  </p>
                </div>
                <p className="text-xs text-[#b45309] font-bold flex items-center gap-1">
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
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#e3d6c1] p-4 sm:p-5 space-y-2 shadow-sm"
              >
                <div className="text-sm sm:text-base font-extrabold text-[#2b241c]">
                  お題：「{tip.hardJa}」
                </div>
                <div className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-2 text-xs sm:text-sm font-bold text-red-800">
                  {tip.ngTrap}
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 text-xs sm:text-sm font-extrabold text-emerald-900">
                  ◎ 安全満点表現：{tip.safeEn}
                </div>
                <p className="text-xs text-[#5d4e3d] font-medium">💡 {tip.point}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
