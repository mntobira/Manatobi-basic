/**
 * 模試PDFに付随する音声トラック定義（高校入試版ではPDF内に問題・解答解説を一体収録しているため空マップ）。
 */
export interface KyotsuAudioTrack {
  q: string;
  part: string;
  label: string;
  file: string;
  sec: number;
  twice: boolean;
}

export function kyotsuAudioLabel(q: string): string {
  const [a, b] = q.split('-').map(Number);
  return b ? `問${a}〜${b}` : `問${a}`;
}

export const KYOTSU_MOCK_AUDIO: Readonly<Record<string, readonly KyotsuAudioTrack[]>> = {};

export function kyotsuAudioOf(printId: string): readonly KyotsuAudioTrack[] {
  return KYOTSU_MOCK_AUDIO[printId] ?? [];
}

export function kyotsuFullAudioOf(_printId: string): string | null {
  return null;
}
