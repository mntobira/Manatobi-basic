import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  Play,
  Sparkles,
  Star,
  PenTool,
} from 'lucide-react';
import { SUBJECT_REGISTRY, type SubjectKey, subjectDefinitionOf } from '../data/subjects';
import { SUMMARY_PRINT_SHEETS, type SummaryPrintSheet } from '../data/summaryPrintsData';
import { formatText } from '../utils/textFormatter';

interface LearningPrintViewProps {
  subject: SubjectKey;
  onSelectSubject: (subject: SubjectKey) => void;
  onStartChapter: (chapterId: string, subject: SubjectKey) => void;
  onOpenWritingDojo?: () => void;
  onBack: () => void;
}

/**
 * `{{重要語句}}` を解析して赤シート対応トークン配列に変換する
 */
function parseClozeSegments(text: string): Array<{ type: 'text' | 'cloze'; content: string; key: string }> {
  const parts: Array<{ type: 'text' | 'cloze'; content: string; key: string }> = [];
  const regex = /\{\{([^}]+)\}\}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex, match.index),
        key: `t_${idx++}`,
      });
    }
    parts.push({
      type: 'cloze',
      content: match[1],
      key: `c_${idx++}`,
    });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.slice(lastIndex),
      key: `t_${idx++}`,
    });
  }
  return parts;
}

export const LearningPrintView: React.FC<LearningPrintViewProps> = ({
  subject,
  onSelectSubject,
  onStartChapter,
  onOpenWritingDojo,
  onBack,
}) => {
  const [redSheetOn, setRedSheetOn] = useState<boolean>(true);
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [masteredSheets, setMasteredSheets] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('mntb_juken_mastered_prints');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const sheets = useMemo(
    () => SUMMARY_PRINT_SHEETS.filter((s) => s.subject === subject),
    [subject],
  );
  const [activeSheetId, setActiveSheetId] = useState<string>(sheets[0]?.id ?? '');

  // 教科切り替え時に先頭シートを選択
  const activeSheet: SummaryPrintSheet | undefined =
    sheets.find((s) => s.id === activeSheetId) ?? sheets[0];

  const subjectDef = subjectDefinitionOf(subject) ?? SUBJECT_REGISTRY[0];

  const toggleCloze = (clozeId: string) => {
    if (!redSheetOn) return;
    setRevealedKeys((prev) => ({ ...prev, [clozeId]: !prev[clozeId] }));
  };

  const resetRevealed = () => setRevealedKeys({});

  const toggleMastered = (sheetId: string) => {
    setMasteredSheets((prev) => {
      const next = { ...prev, [sheetId]: !prev[sheetId] };
      try {
        localStorage.setItem('mntb_juken_mastered_prints', JSON.stringify(next));
      } catch {
        // ignore storage quota errors
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#fcf5e9] text-[#2b241c] pb-24">
      {/* ヘッダー */}
      <header className="sticky top-0 z-30 bg-[#fcf5e9]/95 backdrop-blur-md border-b border-[#e6dac6] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-xl bg-white border border-[#e2d5bf] text-sm font-bold text-[#3d3328] hover:bg-[#f7efe0] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>もどる</span>
          </button>

          <div className="flex items-center gap-1.5">
            <BookOpenCheck className="w-5 h-5" style={{ color: subjectDef.theme.accent }} />
            <h1 className="text-base sm:text-lg font-extrabold tracking-tight">
              入試直結 まとめプリント
            </h1>
          </div>

          <button
            type="button"
            onClick={() => {
              setRedSheetOn((v) => !v);
              resetRevealed();
            }}
            className={`inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold shadow-sm transition ${
              redSheetOn
                ? 'bg-[#d94343] text-white border border-[#b92e2e]'
                : 'bg-white text-[#6a5a48] border border-[#dfd2bc]'
            }`}
          >
            {redSheetOn ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{redSheetOn ? '赤シート ON' : '赤シート OFF'}</span>
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-4 space-y-4">
        {/* 5教科タブ */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {SUBJECT_REGISTRY.map((s) => {
            const active = s.id === subject;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  onSelectSubject(s.id);
                  const first = SUMMARY_PRINT_SHEETS.find((p) => p.subject === s.id);
                  if (first) setActiveSheetId(first.id);
                  resetRevealed();
                }}
                style={
                  active
                    ? { backgroundColor: s.theme.accent, borderColor: s.theme.accent }
                    : undefined
                }
                className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-extrabold whitespace-nowrap border transition ${
                  active
                    ? 'text-white shadow-sm'
                    : 'bg-white/90 text-[#4c4033] border-[#e2d6c1] hover:bg-white'
                }`}
              >
                {s.label}
              </button>
            );
          })}

          {subject === 'english' && onOpenWritingDojo && (
            <button
              type="button"
              onClick={onOpenWritingDojo}
              className="ml-auto inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold bg-[#f29a1f] text-white shadow-sm hover:brightness-105 whitespace-nowrap transition"
            >
              <PenTool className="w-4 h-4" />
              <span>英作文道場を開く</span>
            </button>
          )}
        </div>

        {/* プリント選択ピル */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {sheets.map((sheet) => {
            const isSelected = activeSheet?.id === sheet.id;
            const done = !!masteredSheets[sheet.id];
            return (
              <button
                key={sheet.id}
                type="button"
                onClick={() => {
                  setActiveSheetId(sheet.id);
                  resetRevealed();
                }}
                className={`text-left p-3.5 rounded-2xl border-2 transition min-h-[72px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white shadow-md'
                    : 'bg-white/65 border-[#e7dcc8] hover:bg-white'
                }`}
                style={isSelected ? { borderColor: subjectDef.theme.accent } : undefined}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-xs font-extrabold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${subjectDef.theme.accentSoft}66`,
                      color: subjectDef.theme.accent,
                    }}
                  >
                    {sheet.badge}
                  </span>
                  <div className="flex items-center gap-0.5 text-[#f29a1f]">
                    {Array.from({ length: sheet.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    {done && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-1" />}
                  </div>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm font-bold text-[#2b241c] line-clamp-2">
                  {sheet.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* 選択中のプリント本体 */}
        {activeSheet && (
          <section className="bg-white rounded-3xl border border-[#e4d7c1] shadow-sm overflow-hidden">
            <div
              className="px-5 py-4 border-b border-[#efe5d4]"
              style={{ backgroundColor: subjectDef.theme.surface }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className="text-xs font-extrabold px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: subjectDef.theme.accent,
                    color: '#fff',
                  }}
                >
                  {activeSheet.badge} ・ 出題優先度 {'★'.repeat(activeSheet.stars)}
                </span>
                {redSheetOn && (
                  <button
                    type="button"
                    onClick={resetRevealed}
                    className="text-xs font-bold text-[#b92e2e] underline hover:opacity-80 min-h-[36px] px-2"
                  >
                    すべて再び隠す
                  </button>
                )}
              </div>
              <h2 className="mt-2 text-lg sm:text-xl font-extrabold text-[#231d16]">
                {activeSheet.title}
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-[#6a5a48]">
                {activeSheet.subtitle}
                {redSheetOn ? '（赤い空欄をタップすると答えが見えます）' : ''}
              </p>
            </div>

            <div className="p-5 space-y-5">
              {activeSheet.items.map((item, itemIdx) => {
                const segments = parseClozeSegments(item.body);
                return (
                  <div
                    key={itemIdx}
                    className="rounded-2xl border border-[#eee3d1] bg-[#fffcf7] p-4 space-y-2.5"
                  >
                    <h3 className="text-sm sm:text-base font-extrabold flex items-center gap-2 text-[#2b241c]">
                      <span
                        className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-black text-white shrink-0"
                        style={{ backgroundColor: subjectDef.theme.accent }}
                      >
                        {itemIdx + 1}
                      </span>
                      <span>{item.heading}</span>
                    </h3>

                    <div className="text-sm sm:text-[15px] leading-8 text-[#332a20] whitespace-pre-line">
                      {segments.map((seg) => {
                        if (seg.type === 'text') {
                          return <React.Fragment key={seg.key}>{formatText(seg.content)}</React.Fragment>;
                        }
                        const clozeId = `${activeSheet.id}_${itemIdx}_${seg.key}`;
                        const isHidden = redSheetOn && !revealedKeys[clozeId];
                        return (
                          <button
                            key={seg.key}
                            type="button"
                            onClick={() => toggleCloze(clozeId)}
                            className={`inline-flex items-center mx-1 px-2.5 py-0.5 rounded-lg font-extrabold align-baseline transition border ${
                              isHidden
                                ? 'bg-[#e34b4b] text-transparent border-[#c93636] select-none shadow-inner min-w-[4.5rem] justify-center cursor-pointer hover:brightness-95'
                                : redSheetOn
                                  ? 'bg-[#fff0f0] text-[#c42b2b] border-[#f0b4b4] cursor-pointer'
                                  : 'bg-[#fff3db] text-[#b45309] border-[#f5d491]'
                            }`}
                            title={isHidden ? 'タップして答えを表示' : '重要語句'}
                          >
                            {formatText(seg.content)}
                          </button>
                        );
                      })}
                    </div>

                    {item.tip && (
                      <div className="mt-2 flex items-start gap-2 rounded-xl bg-[#f7f1e4] px-3 py-2 text-xs sm:text-sm text-[#5c4c3a]">
                        <Sparkles className="w-4 h-4 text-[#f29a1f] shrink-0 mt-0.5" />
                        <span>{item.tip}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* フッターアクション：暗記完了チェック ＆ 直結単元演習へジャンプ */}
            <div className="px-5 py-4 bg-[#faf3e6] border-t border-[#eadec9] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => toggleMastered(activeSheet.id)}
                className={`inline-flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl text-sm font-extrabold border transition ${
                  masteredSheets[activeSheet.id]
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-white text-[#4c4033] border-[#dcd0ba] hover:bg-[#fffaf0]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {masteredSheets[activeSheet.id]
                    ? '暗記マスター済み！'
                    : 'このプリントを暗記済みにする'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onStartChapter(activeSheet.linkedChapterId, subject)}
                style={{ backgroundColor: subjectDef.theme.accent }}
                className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl text-sm font-extrabold text-white shadow-sm hover:brightness-105 transition"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>この単元の実戦問題を解く</span>
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
