import React, { useEffect, useMemo, useState } from 'react';
import '../styles/juken-polish.css';
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Lightbulb,
  Maximize2,
  PenTool,
  Play,
  RotateCcw,
  Sparkles,
  X,
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
 * 理科・社会（歴史）を除き、原本授業プリント準拠の強調・構造表現を有効にする判定
 * 対象：英語・数学・国語・社会（地理）・社会（公民）
 */
function isPrintEmphasisEnabled(sheet: SummaryPrintSheet): boolean {
  if (sheet.subject === 'science') return false;
  if (sheet.subject === 'social' && sheet.group.startsWith('歴史')) return false;
  return true;
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

/**
 * 原本プリント準拠のインライン強調レンダラ（英・数・国・地理・公民のみ適用）
 */
function renderRichPrintText(raw: string, enableRich: boolean): React.ReactNode {
  if (!enableRich) {
    return formatText(raw);
  }

  const enriched = raw
    .replace(/(?<![!])(※[^。\n]+)/g, '!!$1!!')
    .replace(/(?<![!])(×[^→\n)]+)/g, '!!$1!!')
    .replace(/(?<![!])(絶対に?[^、。！!\n]{1,20}(?:ない|不可|禁止)[！!]?)/g, '!!$1!!')
    .replace(/(?<![_])(【[^】]{1,18}】)/g, '__$1__')
    .replace(/(?<![_])(Step[1-9]|STEP\s*[1-9]|①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩)/g, '__$1__')
    .replace(/(?<![=])(語呂：「[^」]+」)/g, '==$1==');

  const tokenRegex = /(!![^!]+!!|==[^=]+==|__[^_]+__)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;

  while ((m = tokenRegex.exec(enriched)) !== null) {
    if (m.index > last) {
      nodes.push(<React.Fragment key={`n_${k++}`}>{formatText(enriched.slice(last, m.index))}</React.Fragment>);
    }
    const tok = m[0];
    const inner = tok.slice(2, -2);
    if (tok.startsWith('!!')) {
      nodes.push(
        <span key={`r_${k++}`} className="juken-em-red">
          {formatText(inner)}
        </span>,
      );
    } else if (tok.startsWith('==')) {
      nodes.push(
        <mark key={`m_${k++}`} className="juken-em-mark">
          {formatText(inner)}
        </mark>,
      );
    } else {
      nodes.push(
        <span key={`u_${k++}`} className="juken-em-bu">
          {formatText(inner)}
        </span>,
      );
    }
    last = tokenRegex.lastIndex;
  }

  if (last < enriched.length) {
    nodes.push(<React.Fragment key={`n_${k++}`}>{formatText(enriched.slice(last))}</React.Fragment>);
  }
  return nodes;
}

const TONE_STYLES: Record<string, { bg: string; border: string; badgeBg: string; conclBg: string; conclText: string }> = {
  blue: { bg: '#f2f7ff', border: '#93c5fd', badgeBg: '#1d4ed8', conclBg: '#dbeafe', conclText: '#1e3a8a' },
  amber: { bg: '#fffbeb', border: '#fcd34d', badgeBg: '#b45309', conclBg: '#fef3c7', conclText: '#78350f' },
  rose: { bg: '#fff5f5', border: '#fda4af', badgeBg: '#be123c', conclBg: '#ffe4e6', conclText: '#881337' },
  emerald: { bg: '#f0fdf4', border: '#86efac', badgeBg: '#15803d', conclBg: '#dcfce7', conclText: '#14532d' },
};

export const LearningPrintView: React.FC<LearningPrintViewProps> = ({
  subject,
  onSelectSubject,
  onStartChapter,
  onOpenWritingDojo,
  onBack,
}) => {
  // 丸暗記にならないよう、初期表示は「授業プリント理解モード（赤シートOFF）」から開始！
  const [redSheetOn, setRedSheetOn] = useState<boolean>(false);
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({});
  const [openExamples, setOpenExamples] = useState<Record<string, boolean>>({});
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [itemPage, setItemPage] = useState<number>(0);
  const [zoomImage, setZoomImage] = useState<{ src: string; caption?: string } | null>(null);
  const [masteredSheets, setMasteredSheets] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem('mntb_juken_mastered_prints');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const allSubjectSheets = useMemo(
    () => SUMMARY_PRINT_SHEETS.filter((s) => s.subject === subject),
    [subject],
  );

  const groups = useMemo(() => {
    const seen: string[] = [];
    for (const s of allSubjectSheets) {
      if (s.group && !seen.includes(s.group)) seen.push(s.group);
    }
    return seen;
  }, [allSubjectSheets]);

  const sheets = useMemo(
    () =>
      allSubjectSheets.filter((s) =>
        selectedGroup === 'all' ? true : s.group === selectedGroup,
      ),
    [allSubjectSheets, selectedGroup],
  );

  const [activeSheetId, setActiveSheetId] = useState<string>(allSubjectSheets[0]?.id ?? '');

  const activeSheet: SummaryPrintSheet | undefined =
    sheets.find((s) => s.id === activeSheetId) ?? sheets[0] ?? allSubjectSheets[0];

  useEffect(() => {
    setItemPage(0);
    setZoomImage(null);
  }, [activeSheet?.id]);

  useEffect(() => {
    if (!zoomImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomImage(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomImage]);

  const subjectDef = subjectDefinitionOf(subject) ?? SUBJECT_REGISTRY[0];
  const richEmphasis = activeSheet ? isPrintEmphasisEnabled(activeSheet) : false;

  const activeItems = activeSheet?.items ?? [];
  const safeItemIdx = Math.min(itemPage, Math.max(0, activeItems.length - 1));
  const currentItem = activeItems[safeItemIdx];

  const currentItemClozeIds = useMemo(() => {
    if (!activeSheet || !currentItem) return [];
    const ids: string[] = [];
    parseClozeSegments(currentItem.body).forEach((seg) => {
      if (seg.type === 'cloze') {
        ids.push(`${activeSheet.id}_${safeItemIdx}_${seg.key}`);
      }
    });
    return ids;
  }, [activeSheet, currentItem, safeItemIdx]);

  const revealedCount = useMemo(
    () => currentItemClozeIds.filter((id) => !!revealedKeys[id]).length,
    [currentItemClozeIds, revealedKeys],
  );

  const toggleCloze = (clozeId: string) => {
    if (!redSheetOn) return;
    setRevealedKeys((prev) => ({ ...prev, [clozeId]: !prev[clozeId] }));
  };

  const resetRevealed = () => setRevealedKeys({});

  const revealAllInCurrentCard = () => {
    const next: Record<string, boolean> = { ...revealedKeys };
    for (const id of currentItemClozeIds) next[id] = true;
    setRevealedKeys(next);
  };

  const toggleMastered = (sheetId: string) => {
    setMasteredSheets((prev) => {
      const next = { ...prev, [sheetId]: !prev[sheetId] };
      try {
        localStorage.setItem('mntb_juken_mastered_prints', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const masteredTotal = useMemo(
    () => SUMMARY_PRINT_SHEETS.filter((s) => !!masteredSheets[s.id]).length,
    [masteredSheets],
  );

  const stepPrev = () => {
    if (!activeSheet) return;
    if (safeItemIdx > 0) {
      setItemPage(safeItemIdx - 1);
      return;
    }
    const idx = sheets.findIndex((s) => s.id === activeSheet.id);
    if (idx > 0) {
      const prevSheet = sheets[idx - 1];
      setActiveSheetId(prevSheet.id);
      setItemPage(Math.max(0, prevSheet.items.length - 1));
    }
  };

  const stepNext = () => {
    if (!activeSheet) return;
    if (safeItemIdx < activeItems.length - 1) {
      setItemPage(safeItemIdx + 1);
      return;
    }
    const idx = sheets.findIndex((s) => s.id === activeSheet.id);
    if (idx >= 0 && idx < sheets.length - 1) {
      setActiveSheetId(sheets[idx + 1].id);
      setItemPage(0);
    }
  };

  return (
    <div className="juken-onescreen" data-juken-print-onescreen>
      {/* 1. 固定スリムヘッダー */}
      <header className="juken-onescreen-head">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="juken-btn-soft inline-flex items-center gap-1 px-2.5 py-1.5 text-xs sm:text-sm min-h-[38px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>もどる</span>
          </button>

          <div className="flex items-center gap-1.5 min-w-0">
            <BookOpenCheck className="w-4 h-4 shrink-0" style={{ color: subjectDef.theme.accent }} />
            <h1 className="juken-title-font text-sm sm:text-base font-extrabold truncate">
              授業＆要点プリント
            </h1>
            <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#e3f3ea] text-[#1f7a4d] shrink-0">
              {masteredTotal}/{SUMMARY_PRINT_SHEETS.length}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setRedSheetOn((v) => !v);
              resetRevealed();
            }}
            className={`inline-flex items-center gap-1 min-h-[38px] px-2.5 py-1.5 rounded-xl text-xs font-extrabold border transition shrink-0 ${
              redSheetOn
                ? 'bg-[#d93838] text-white border-[#a82222] shadow-[0_2px_0_#961c1c]'
                : 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-[0_2px_0_#172554]'
            }`}
            title="まずは理解モードで理屈と例題を読み、仕上げに赤シートでセルフテスト！"
          >
            {redSheetOn ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{redSheetOn ? '赤シート中' : '理解→赤シート'}</span>
          </button>
        </div>
      </header>

      {/* 2. コンパクト切替バー */}
      <div className="juken-onescreen-toolbar">
        <div className="max-w-4xl mx-auto space-y-1.5">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {SUBJECT_REGISTRY.map((s) => {
              const active = s.id === subject;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    onSelectSubject(s.id as SubjectKey);
                    setSelectedGroup('all');
                    const first = SUMMARY_PRINT_SHEETS.find((p) => p.subject === s.id);
                    if (first) setActiveSheetId(first.id);
                    setItemPage(0);
                    resetRevealed();
                  }}
                  style={active ? { backgroundColor: s.theme.accent, borderColor: s.theme.accent } : undefined}
                  className={`min-h-[32px] px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap border transition ${
                    active ? 'text-white shadow-sm' : 'bg-white text-[#4c4033] border-[#dfd2bc]'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}

            {groups.length > 1 &&
              groups.map((g) => {
                const on = selectedGroup === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      const nextGroup = on ? 'all' : g;
                      setSelectedGroup(nextGroup);
                      const first = allSubjectSheets.find((s) =>
                        nextGroup === 'all' ? true : s.group === nextGroup,
                      );
                      if (first) setActiveSheetId(first.id);
                      setItemPage(0);
                      resetRevealed();
                    }}
                    className={`min-h-[30px] px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold whitespace-nowrap border transition ${
                      on
                        ? 'bg-[#2c241b] text-white border-[#2c241b]'
                        : 'bg-[#fffaf0] text-[#5c4c39] border-[#e2d6c3]'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}

            {subject === 'english' && onOpenWritingDojo && (
              <button
                type="button"
                onClick={onOpenWritingDojo}
                className="ml-auto inline-flex items-center gap-1 min-h-[30px] px-2.5 py-0.5 rounded-lg bg-[#f29a1f] text-[#23180a] text-[11px] font-extrabold whitespace-nowrap shrink-0"
              >
                <PenTool className="w-3 h-3" />
                <span>英作文道場</span>
              </button>
            )}
          </div>

          {activeSheet && (
            <div className="flex items-center gap-2">
              <select
                aria-label="まとめプリントを選択"
                value={activeSheet.id}
                onChange={(e) => {
                  setActiveSheetId(e.target.value);
                  setItemPage(0);
                  resetRevealed();
                }}
                className="flex-1 min-w-0 min-h-[36px] px-2.5 py-1 rounded-xl border border-[#d8cab2] bg-white text-xs sm:text-sm font-extrabold text-[#1c2a39] truncate"
              >
                {sheets.map((s) => (
                  <option key={s.id} value={s.id}>
                    {masteredSheets[s.id] ? '✓ ' : ''}
                    {s.badge}：{s.title}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 shrink-0">
                {activeItems.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setItemPage(idx)}
                    style={
                      idx === safeItemIdx
                        ? { backgroundColor: subjectDef.theme.accent, borderColor: subjectDef.theme.accent }
                        : undefined
                    }
                    className={`w-7 h-7 rounded-lg text-xs font-black border transition ${
                      idx === safeItemIdx
                        ? 'text-white shadow-sm'
                        : 'bg-white text-[#4c4033] border-[#dfd2bc]'
                    }`}
                    aria-label={`セクション ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. メイン1画面授業プリントステージ */}
      <main className="juken-onescreen-stage">
        {activeSheet && currentItem ? (
          <div className="max-w-4xl mx-auto space-y-3">
            <article className="juken-card p-3.5 sm:p-5 space-y-3.5">
              {/* 原本プリント見出し帯 */}
              {richEmphasis ? (
                <div className="juken-print-black-banner flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[11px] font-extrabold text-[#fde047] block">
                      {activeSheet.badge}（{safeItemIdx + 1}/{activeItems.length}）｜{activeSheet.subtitle}
                    </span>
                    <h2 className="text-sm sm:text-base font-black leading-snug">
                      ■ {currentItem.heading}
                    </h2>
                  </div>
                  {redSheetOn && currentItemClozeIds.length > 0 && (
                    <button
                      type="button"
                      onClick={
                        revealedCount < currentItemClozeIds.length
                          ? revealAllInCurrentCard
                          : resetRevealed
                      }
                      className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-[#b91c1c] text-[11px] font-extrabold"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>
                        {revealedCount < currentItemClozeIds.length
                          ? `全開(${revealedCount}/${currentItemClozeIds.length})`
                          : '隠す'}
                      </span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-[#ece2d0]">
                  <div className="min-w-0">
                    <span
                      className="inline-block text-[11px] font-extrabold px-2 py-0.5 rounded-md mb-1"
                      style={{
                        backgroundColor: `${subjectDef.theme.accentSoft}88`,
                        color: subjectDef.theme.accent,
                      }}
                    >
                      {activeSheet.badge}｜セクション {safeItemIdx + 1}/{activeItems.length}
                    </span>
                    <h2 className="juken-title-font text-sm sm:text-base font-extrabold text-[#1c2a39]">
                      {currentItem.heading}
                    </h2>
                  </div>
                  {redSheetOn && currentItemClozeIds.length > 0 && (
                    <button
                      type="button"
                      onClick={
                        revealedCount < currentItemClozeIds.length
                          ? revealAllInCurrentCard
                          : resetRevealed
                      }
                      className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#fff5f5] border border-[#f2b6b6] text-[#b91c1c] text-[11px] font-extrabold"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>
                        {revealedCount < currentItemClozeIds.length
                          ? `全開(${revealedCount}/${currentItemClozeIds.length})`
                          : '隠す'}
                      </span>
                    </button>
                  )}
                </div>
              )}

              {/* なぜそうなるか（丸暗記を防ぐ理屈・本質の導入） */}
              {currentItem.whyCore && (
                <div className="flex items-start gap-2 rounded-xl border-2 border-[#bfdbfe] bg-[#eff6ff] px-3 py-2 text-xs sm:text-sm text-[#1e3a8a]">
                  <Lightbulb className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black mr-1">【丸暗記ゼロ！なぜそうなる？】</span>
                    <span className="font-bold">{formatText(currentItem.whyCore)}</span>
                  </div>
                </div>
              )}

              {/* 原本プリントそのままの因果関係・しくみ図解ボックス（flowBoxes） */}
              {currentItem.flowBoxes && currentItem.flowBoxes.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentItem.flowBoxes.map((fb, fIdx) => {
                    const st = TONE_STYLES[fb.tone ?? 'blue'] ?? TONE_STYLES.blue;
                    return (
                      <div
                        key={fIdx}
                        className="rounded-xl p-3 border-2 space-y-2"
                        style={{ backgroundColor: st.bg, borderColor: st.border }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className="text-[10.5px] font-black px-2 py-0.5 rounded text-white shrink-0"
                            style={{ backgroundColor: st.badgeBg }}
                          >
                            {fb.badge}
                          </span>
                          <strong className="text-xs sm:text-[13px] font-black text-[#111827]">
                            {formatText(fb.title)}
                          </strong>
                        </div>
                        <ol className="space-y-1 text-xs leading-relaxed text-[#1f2937] font-semibold">
                          {fb.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5">
                              <span className="font-black text-[#2563eb] shrink-0">
                                {sIdx === 0 ? '①' : '↓'}
                              </span>
                              <span>{formatText(step)}</span>
                            </li>
                          ))}
                        </ol>
                        <div
                          className="rounded-lg px-2.5 py-1.5 text-xs font-black"
                          style={{ backgroundColor: st.conclBg, color: st.conclText }}
                        >
                          ⇒ {formatText(fb.conclusion)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 講義本文（理解モードでは重要語句を太字＋マーカー下線で読みやすく表示、赤シートON時のみ隠す） */}
              <div className="text-[13.5px] sm:text-[15px] leading-7 text-[#231d16] whitespace-pre-line">
                {parseClozeSegments(currentItem.body).map((seg) => {
                  if (seg.type === 'text') {
                    return (
                      <React.Fragment key={seg.key}>
                        {renderRichPrintText(seg.content, richEmphasis)}
                      </React.Fragment>
                    );
                  }
                  const clozeId = `${activeSheet.id}_${safeItemIdx}_${seg.key}`;
                  const isHidden = redSheetOn && !revealedKeys[clozeId];
                  return (
                    <button
                      key={seg.key}
                      type="button"
                      onClick={() => toggleCloze(clozeId)}
                      className={`inline-flex items-center mx-0.5 px-2 py-0.5 rounded-lg font-extrabold align-baseline transition min-w-[3.6rem] justify-center ${
                        isHidden
                          ? 'juken-cloze-hidden'
                          : redSheetOn
                            ? 'juken-cloze-revealed'
                            : richEmphasis
                              ? 'juken-cloze-off underline decoration-2 decoration-[#d97706] underline-offset-2'
                              : 'juken-cloze-off'
                      }`}
                    >
                      <span>{formatText(seg.content)}</span>
                    </button>
                  );
                })}
              </div>

              {/* 型の整理・対比テーブル */}
              {currentItem.table && (
                <div className="juken-table-wrap">
                  <table className="juken-table">
                    <thead>
                      <tr>
                        {currentItem.table.headers.map((h, hIdx) => (
                          <th key={hIdx}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentItem.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={cIdx === 0 ? 'font-extrabold text-[#1c4687]' : ''}
                            >
                              {renderRichPrintText(cell, richEmphasis)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {currentItem.imageUrl && (
                <div className="pt-0.5 space-y-1.5">
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setZoomImage({
                          src: currentItem.imageUrl!,
                          caption: currentItem.imageCaption || currentItem.heading,
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-full border border-[#c7dcf7] bg-white px-2.5 py-1 text-[11px] font-extrabold text-[#1d4ed8] hover:bg-[#eff6ff] cursor-pointer"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>図を拡大して見る</span>
                    </button>
                  </div>
                  <QuestionFigure src={currentItem.imageUrl} caption={currentItem.imageCaption} />
                </div>
              )}

              {/* 原本プリントそのままの「例題・演習 → 考え方と解答」（丸暗記ではなく思考手順を再現） */}
              {currentItem.workedExamples && currentItem.workedExamples.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-black text-[#1e293b] flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-[#1e293b] text-[#fde047]">実践例題</span>
                    <span>プリントの演習で「解き方の筋道」をその場で確認しよう</span>
                  </div>
                  {currentItem.workedExamples.map((ex, eIdx) => {
                    const exKey = `${activeSheet.id}_${safeItemIdx}_ex${eIdx}`;
                    const isOpen = !!openExamples[exKey];
                    return (
                      <div
                        key={exKey}
                        className="rounded-xl border-2 border-[#d6c7ae] bg-[#fffdf7] overflow-hidden"
                      >
                        <div className="px-3 py-2.5 flex items-start justify-between gap-2">
                          <div className="text-xs sm:text-sm font-bold text-[#1c2a39] leading-relaxed">
                            <span className="inline-block mr-1.5 px-1.5 py-0.5 rounded bg-[#fef3c7] text-[#92400e] font-black text-[11px]">
                              {ex.label}
                            </span>
                            {formatText(ex.question)}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenExamples((prev) => ({ ...prev, [exKey]: !prev[exKey] }))
                            }
                            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1d4ed8] text-white text-[11px] font-extrabold"
                          >
                            <span>{isOpen ? '閉じる' : '考え方・解答'}</span>
                            <ChevronDown
                              className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        </div>
                        {isOpen && (
                          <div className="px-3 py-2.5 bg-[#f8fafc] border-t border-[#e2e8f0] space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
                            <p className="text-[#334155] font-semibold">
                              <strong className="text-[#1d4ed8] font-black">【考え方】</strong>{' '}
                              {formatText(ex.thinking)}
                            </p>
                            <p className="text-[#991b1b] font-black bg-[#fef2f2] px-2.5 py-1 rounded-lg border border-[#fecaca]">
                              【答】 {formatText(ex.answer)}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {currentItem.tip && (
                <div
                  className={
                    richEmphasis
                      ? 'juken-em-arrow-line text-xs sm:text-sm'
                      : 'flex items-start gap-2 rounded-xl bg-[#f6efe2] px-3 py-2 text-xs sm:text-sm font-semibold text-[#4e4030]'
                  }
                >
                  {richEmphasis ? (
                    <span>⇒ 【入試の決め手】{renderRichPrintText(currentItem.tip, true)}</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#f29a1f] shrink-0 mt-0.5" />
                      <span>{currentItem.tip}</span>
                    </>
                  )}
                </div>
              )}
            </article>
          </div>
        ) : null}
      </main>

      {/* 4. 固定フッター */}
      {activeSheet && (
        <footer className="juken-onescreen-foot">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={stepPrev}
              className="juken-btn-soft inline-flex items-center justify-center gap-1 px-3 min-h-[42px] text-xs sm:text-sm shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>前へ</span>
            </button>

            <button
              type="button"
              onClick={() => toggleMastered(activeSheet.id)}
              className={`inline-flex items-center justify-center gap-1 px-3 min-h-[42px] rounded-xl text-xs font-extrabold border transition ${
                masteredSheets[activeSheet.id]
                  ? 'bg-[#1f7a4d] text-white border-[#175e3a]'
                  : 'bg-white text-[#3d3222] border-[#dfd2bc]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span className="truncate">{masteredSheets[activeSheet.id] ? '理解済' : '理解完了'}</span>
            </button>

            <button
              type="button"
              onClick={() => onStartChapter(activeSheet.linkedChapterId, subject)}
              className="juken-btn-primary flex-1 inline-flex items-center justify-center gap-1.5 px-3 min-h-[42px] text-xs sm:text-sm truncate"
              style={{ backgroundColor: subjectDef.theme.accent, borderColor: subjectDef.theme.accent }}
            >
              <Play className="w-3.5 h-3.5 fill-current shrink-0" />
              <span className="truncate">実戦問題でアウトプット</span>
            </button>

            <button
              type="button"
              onClick={stepNext}
              className="juken-btn-soft inline-flex items-center justify-center gap-1 px-3 min-h-[42px] text-xs sm:text-sm shrink-0"
            >
              <span>次へ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      )}

      {/* 5. 図解フルスクリーン拡大モーダル */}
      {zoomImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="まとめプリント図解の拡大表示"
          className="fixed inset-0 z-[120] flex flex-col bg-slate-950/88 p-3 sm:p-6 backdrop-blur-xs"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="mx-auto flex w-full max-w-4xl flex-1 min-h-0 flex-col rounded-2xl bg-white p-3 sm:p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <span className="text-xs sm:text-sm font-extrabold text-[#1c2a39] truncate">
                {zoomImage.caption || '要点図解の拡大表示'}
              </span>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1.5 text-xs font-extrabold text-white hover:bg-slate-700 cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
                <span>閉じる</span>
              </button>
            </div>
            <div className="flex flex-1 min-h-0 items-center justify-center overflow-auto rounded-xl bg-slate-50 p-2">
              <img
                src={zoomImage.src}
                alt={zoomImage.caption || '要点図解'}
                className="max-h-[76dvh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
