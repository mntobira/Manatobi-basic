/**
 * 単元選択画面のタブ（PARTごとのグループ）と、単元ごとの復習用音源の取り出し。
 * 高校入試5教科すべてで「第1部〜第4部」のPART単位タブにまとめることで、
 * スマホでも横スクロール最小限で全体を見渡せるようにしている。
 */
import { getPartsOfSubject } from '../data/allChapters';
import type { ListeningAudioTrack } from '../data/listeningTrackTypes';
import type { Chapter, Part, Problem } from '../types/curriculum';

export interface ChapterGroup {
  title: string;
  chapters: Chapter[];
  partId: string;
  partTitle: string;
  kicker?: string;
  label?: string;
}

function buildPartGroups(parts: Part[]): ChapterGroup[] {
  return parts.map((part, idx) => {
    // 「第1部：中1・中2 英文法の土台」→ kicker: 'PART 1', label: '中1・中2 英文法の土台'
    const stripped = part.title.replace(/^第\d+部[：:\s]*/, '').trim();
    return {
      title: stripped || part.title,
      label: stripped || part.title,
      kicker: `PART ${idx + 1}`,
      chapters: part.chapters,
      partId: part.id,
      partTitle: part.title,
    };
  });
}

const groupsBySubject = new Map<string, ChapterGroup[]>();

export function getChapterGroups(subject: string): ChapterGroup[] {
  const cached = groupsBySubject.get(subject);
  if (cached) return cached;
  const built = buildPartGroups(getPartsOfSubject(subject));
  groupsBySubject.set(subject, built);
  return built;
}

export function getGrammarPartGroups(): ChapterGroup[] {
  return getChapterGroups('english');
}

export function findGroupTitleByPartId(subject: string, partId?: string): string | undefined {
  if (!partId) return undefined;
  const groups = getChapterGroups(subject);
  return groups.find((g) => g.partId === partId)?.title;
}

export function collectAudioSets(
  chapter: Chapter,
): { id: string; title: string; readCount: 1 | 2; tracks: ListeningAudioTrack[] }[] {
  const problems: Problem[] = [
    ...(chapter?.practiceProblems || []),
    ...(chapter?.miniTest || []),
  ];
  return problems
    .filter((p) => Array.isArray(p?.audioTracks) && p.audioTracks.length > 0)
    .map((p) => ({
      id: p.id,
      title: p.category || chapter.abstractTitle,
      readCount: (p.readCount || 2) as 1 | 2,
      tracks: p.audioTracks as ListeningAudioTrack[],
    }));
}

export function splitTabTitle(title: string, index: number): { kicker: string; label: string } {
  const chapterMatch = title.match(/^(\d+章)\s*(.*)$/);
  if (chapterMatch) {
    return { kicker: chapterMatch[1], label: chapterMatch[2] || title };
  }
  return { kicker: `PART ${index + 1}`, label: title };
}
