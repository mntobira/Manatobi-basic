import React, { useMemo, useState } from 'react';
import '../styles/juken-polish.css';
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  PenTool,
  Play,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';
import { SUBJECT_REGISTRY, type SubjectKey, subjectDefinitionOf } from '../data/subjects';
import { SUMMARY_PRINT_SHEETS, type SummaryPrintSheet } from '../data/summaryPrintsData';
import { formatText } from '../utils/textFormatter';
import { QuestionFigure } from './QuestionFigure';

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

  const activeSheet: SummaryPrintSheet | undefined =
    sheets.find((s) => s.id === activeSheetId) ?? sheets[0];

  const subjectDef = subjectDefinitionOf(subject) ?? SUBJECT_REGISTRY[0];

  // このシート内のすべての空欄IDを集計し、開いた数（自己テスト確認数）を表示する
  const sheetClozeIds = useMemo(() => {
    if (!activeSheet) return [];
    const ids: string[] = [];
    activeSheet.items.forEach((item, itemIdx) => {
      parseClozeSegments(item.body).forEach((seg) => {
        if (seg.type === 'cloze') {
          ids.push(`${activeSheet.id}_${itemIdx}_${seg.key}`);
        }
      });
    });
    return ids;
  }, [activeSheet]);

  const revealedCount = useMemo(
    () => sheetClozeIds.filter((id) => !!revealedKeys[id]).length,
    [sheetClozeIds, revealedKeys],
  );

  const toggleCloze = (clozeId: string) => {
    if (!redSheetOn) return;
    setRevealedKeys((prev) => ({ ...prev, [clozeId]: !prev[clozeId] }));
  };

  const resetRevealed = () => setRevealedKeys({});

  const revealAllInSheet = () => {
    const next: Record<string, boolean> = { ...revealedKeys };
    for (const id of sheetClozeIds) next[id] = true;
    setRevealedKeys(next);
  };

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

  const masteredTotal = useMemo(
    () => SUMMARY_PRINT_SHEETS.filter((s) => !!masteredSheets[s.id]).length,
    [masteredSheets],
  );

  return (
    <div className="juken-screen">
      {/* 固定ヘッダー */}
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

          <div className="flex items-center gap-1.5 min-w-0">
            <BookOpenCheck className="w-5 h-5 shrink-0" style={{ color: subjectDef.theme.accent }} />
            <h1 className="juken-title-font text-base sm:text-lg font-extrabold truncate">
              入試直結 まとめプリント
            </h1>
            <span className="hidden sm:inline-block text-xs font-extrabold px-2 py-0.5 rounded-full bg-[#e3f3ea] text-[#1f7a4d]">
              読破 {masteredTotal}/{SUMMARY_PRINT_SHEETS.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setRedSheetOn((v) => !v);
              resetRevealed();
            }}
            className={`inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold border transition shrink-0 ${
              redSheetOn
                ? 'bg-[#d93838] text-white border-[#a82222] shadow-[0_3px_0_#961c1c]'
                : 'bg-white text-[#4e4132] border-[#dfd2bc] shadow-[0_2px_0_#e6dccb]'
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
                  onSelectSubject(s.id as SubjectKey);
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
                    : 'bg-white text-[#4c4033] border-[#dfd2bc] hover:bg-[#fffaf0]'
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
              className="juken-btn-accent ml-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              <PenTool className="w-4 h-4" />
              <span>英作文道場を開く</span>
            </button>
          )}
        </div>

        {/* プリント選択カード */}
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
                className={`juken-card-interactive text-left p-3.5 min-h-[78px] flex flex-col justify-between ${
                  isSelected ? 'ring-2 ring-offset-1' : 'opacity-90'
                }`}
                style={
                  isSelected
                    ? { borderColor: subjectDef.theme.accent, ['--tw-ring-color' as string]: subjectDef.theme.accent }
                    : undefined
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="text-xs font-extrabold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${subjectDef.theme.accentSoft}77`,
                      color: subjectDef.theme.accent,
                    }}
                  >
                    {sheet.badge}
                  </span>
                  <div className="flex items-center gap-0.5 text-[#f29a1f]">
                    {Array.from({ length: sheet.stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    {done && <CheckCircle2 className="w-4 h-4 text-[#1f7a4d] ml-1" />}
                  </div>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm font-extrabold text-[#1c2a39] line-clamp-2">
                  {sheet.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* 選択中のプリント本体 */}
        {activeSheet && (
          <section className="juken-card overflow-hidden">
            <div
              className="px-5 py-4 border-b border-[#e6dccb]"
              style={{ backgroundColor: subjectDef.theme.surface }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span
                  className="text-xs font-extrabold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: subjectDef.theme.accent }}
                >
                  {activeSheet.badge} ・ 出題優先度 {'★'.repeat(activeSheet.stars)}
                </span>

                {redSheetOn && sheetClozeIds.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="juken-num text-xs font-extrabold px-2.5 py-1 rounded-full bg-white border border-[#e3d9c8] text-[#3d3222]">
                      開示済み {revealedCount} / {sheetClozeIds.length} 空欄
                    </span>
                    <button
                      type="button"
                      onClick={revealedCount < sheetClozeIds.length ? revealAllInSheet : resetRevealed}
                      className="inline-flex items-center gap-1 min-h-[36px] px-2.5 py-1 rounded-lg bg-white border border-[#dfd2bc] text-xs font-extrabold text-[#b91c1c] hover:bg-[#fff5f5]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>
                        {revealedCount < sheetClozeIds.length ? 'すべて開く' : 'すべて再び隠す'}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              <h2 className="juken-title-font mt-2 text-lg sm:text-xl font-black text-[#1c2a39]">
                {activeSheet.title}
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm font-medium text-[#5a6573]">
                {activeSheet.subtitle}
                {redSheetOn ? '（赤い枠をタップすると1語ずつ答えを確認できます）' : ''}
              </p>
            </div>

            <div className="p-5 space-y-5">
              {activeSheet.items.map((item, itemIdx) => {
                const segments = parseClozeSegments(item.body);
                return (
                  <article
                    key={itemIdx}
                    className="rounded-2xl border border-[#e8decb] bg-[#fffdf8] p-4 space-y-3"
                  >
                    <h3 className="juken-title-font text-sm sm:text-base font-extrabold flex items-center gap-2 text-[#1c2a39]">
                      <span
                        className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-black text-white shrink-0"
                        style={{ backgroundColor: subjectDef.theme.accent }}
                      >
                        {itemIdx + 1}
                      </span>
                      <span>{item.heading}</span>
                    </h3>

                    <div className="text-sm sm:text-[15px] leading-8 text-[#231d16] whitespace-pre-line">
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
                            className={`inline-flex items-center mx-1 px-2.5 py-0.5 rounded-lg font-extrabold align-baseline transition min-w-[4.5rem] justify-center ${
                              isHidden
                                ? 'juken-cloze-hidden'
                                : redSheetOn
                                  ? 'juken-cloze-revealed'
                                  : 'juken-cloze-off'
                            }`}
                            title={isHidden ? 'タップして答えを表示' : 'タップして再び隠す'}
                          >
                            <span>{formatText(seg.content)}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* 比較整理表がある場合 */}
                    {item.table && (
                      <div className="juken-table-wrap mt-2">
                        <table className="juken-table">
                          <thead>
                            <tr>
                              {item.table.headers.map((h, hIdx) => (
                                <th key={hIdx}>{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {item.table.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className={cIdx === 0 ? 'font-extrabold text-[#1c4687]' : ''}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* 図版がある場合 */}
                    {item.imageUrl && (
                      <div className="pt-1">
                        <QuestionFigure src={item.imageUrl} caption={item.imageCaption} />
                      </div>
                    )}

                    {item.tip && (
                      <div className="flex items-start gap-2 rounded-xl bg-[#f6efe2] px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#4e4030]">
                        <Sparkles className="w-4 h-4 text-[#f29a1f] shrink-0 mt-0.5" />
                        <span>{item.tip}</span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>

            {/* フッターアクション：暗記マスター登録 ＆ 直結単元の実戦問題へ */}
            <div className="px-5 py-4 bg-[#f6efe2] border-t border-[#e3d9c8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => toggleMastered(activeSheet.id)}
                className={
                  masteredSheets[activeSheet.id]
                    ? 'inline-flex items-center justify-center gap-2 min-h-[46px] px-4 py-2.5 rounded-xl text-sm font-extrabold bg-[#1f7a4d] text-white shadow-sm transition'
                    : 'juken-btn-soft inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm'
                }
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {masteredSheets[activeSheet.id]
                    ? '暗記マスター済み！（タップで解除）'
                    : 'このプリントを暗記マスターにする'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onStartChapter(activeSheet.linkedChapterId, subject)}
                className="juken-btn-primary inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm"
                style={{ backgroundColor: subjectDef.theme.accent, borderColor: subjectDef.theme.accent }}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>この単元の入試実戦問題を解く</span>
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};
