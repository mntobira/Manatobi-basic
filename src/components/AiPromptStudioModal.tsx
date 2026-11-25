import React, { useState } from 'react';
import { Check, Copy, Headphones, Image as ImageIcon, Sparkles, X } from 'lucide-react';
import { AI_PROMPT_TEMPLATES, type AiPromptTemplate } from '../data/aiPromptTemplates';

interface AiPromptStudioModalProps {
  initialTab?: 'chatgpt_figure' | 'elevenlabs_v4';
  onClose: () => void;
}

export const AiPromptStudioModal: React.FC<AiPromptStudioModalProps> = ({
  initialTab = 'chatgpt_figure',
  onClose,
}) => {
  const [tab, setTab] = useState<'chatgpt_figure' | 'elevenlabs_v4'>(initialTab);
  const items = AI_PROMPT_TEMPLATES.filter((t) => t.kind === tab);
  const [selectedId, setSelectedId] = useState<string>(items[0]?.id ?? '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const current: AiPromptTemplate =
    items.find((i) => i.id === selectedId) ?? items[0] ?? AI_PROMPT_TEMPLATES[0];

  const handleCopy = async (tpl: AiPromptTemplate) => {
    try {
      await navigator.clipboard.writeText(tpl.prompt);
      setCopiedId(tpl.id);
      setTimeout(() => setCopiedId((prev) => (prev === tpl.id ? null : prev)), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-[2px] flex items-center justify-center p-2.5 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#fffdf8] border-2 border-[#d8cbb5] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90dvh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 py-3 bg-[#172554] text-white flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <h2 className="text-sm sm:text-base font-extrabold truncate">
              教材制作AIプロンプト集（ChatGPT図版 ＆ ElevenLabs v4音源）
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white shrink-0"
            aria-label="閉じる"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="px-4 pt-3 pb-2 bg-[#f6efe2] border-b border-[#e3d7c3] flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setTab('chatgpt_figure');
              const first = AI_PROMPT_TEMPLATES.find((t) => t.kind === 'chatgpt_figure');
              if (first) setSelectedId(first.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 border transition ${
              tab === 'chatgpt_figure'
                ? 'bg-[#2458a6] text-white border-[#1b4482] shadow-sm'
                : 'bg-white text-[#4b3e2e] border-[#d8cbb5]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>ChatGPT 図版・グラフ生成（7種）</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('elevenlabs_v4');
              const first = AI_PROMPT_TEMPLATES.find((t) => t.kind === 'elevenlabs_v4');
              if (first) setSelectedId(first.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 border transition ${
              tab === 'elevenlabs_v4'
                ? 'bg-[#0f766e] text-white border-[#115e59] shadow-sm'
                : 'bg-white text-[#4b3e2e] border-[#d8cbb5]'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>ElevenLabs v4 リスニング台本（5種）</span>
          </button>
          <span className="text-[11px] font-bold text-[#6b5b47] ml-auto hidden sm:inline">
            1タップでコピーしてそのまま貼り付け可能
          </span>
        </div>

        {/* Horizontal Template Chips */}
        <div className="px-4 py-2 bg-[#faf5eb] border-b border-[#e8decb] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {items.map((it, idx) => (
            <button
              key={it.id}
              type="button"
              onClick={() => setSelectedId(it.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap border transition ${
                current.id === it.id
                  ? 'bg-[#0f172a] text-white border-[#0f172a]'
                  : 'bg-white text-[#3a2f21] border-[#d8cbb5] hover:bg-[#f6efe2]'
              }`}
            >
              {idx + 1}. {it.subjectTag}
            </button>
          ))}
        </div>

        {/* Main 1-screen Card Body */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1 min-h-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 mb-1">
                {current.subjectTag}
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-[#1e293b]">
                {current.title}
              </h3>
              <p className="text-xs text-[#64748b] mt-0.5">{current.targetUse}</p>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(current)}
              className={`shrink-0 min-h-[40px] px-4 py-2 rounded-xl text-xs font-extrabold inline-flex items-center justify-center gap-1.5 shadow-sm transition ${
                copiedId === current.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#2458a6] hover:bg-[#1d4b8f] text-white'
              }`}
            >
              {copiedId === current.id ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>コピーしました！</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>プロンプトをコピー</span>
                </>
              )}
            </button>
          </div>

          <div className="rounded-xl bg-[#f8fafc] border border-[#cbd5e1] p-2.5 text-xs text-[#334155]">
            <strong className="text-[#0f172a]">推奨設定・コツ：</strong> {current.settingsNote}
          </div>

          <pre className="rounded-xl bg-[#0f172a] text-slate-100 p-3.5 text-xs leading-relaxed whitespace-pre-wrap break-words font-mono max-h-[34dvh] overflow-y-auto">
            {current.prompt}
          </pre>

          {current.answerOrCheck && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-xs font-bold text-amber-950">
              🎯 確認ポイント・模範解答：{current.answerOrCheck}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
