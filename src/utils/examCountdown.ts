/**
 * 公立高校入試（志望都道府県連動）までの残り日数を計算するユーティリティ
 *
 * 生徒が「47都道府県 入試研究」で設定した志望県（既定：三重県後期選抜 3月10日）の
 * 次回本試験日を自動計算し、ホーム画面のカウントダウンに表示する。
 */
import { getSavedTargetPrefecture } from '../data/prefectureExams';

export const EXAM_DATE = new Date(2027, 2, 10); // 既定基準：2027年3月10日（令和9年度 三重県後期選抜目安）
export const EXAM_DATE_LABEL = '公立高校入試 本試験';
export const SECOND_EXAM_DATE = new Date(2027, 1, 4); // 前期選抜・推薦入試目安
export const SECOND_EXAM_DATE_LABEL = '前期・推薦選抜';

const DAY_MS = 1000 * 60 * 60 * 24;

export function daysUntil(target: Date, from: Date = new Date()): number {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  return Math.max(0, Math.ceil((end.getTime() - start.getTime()) / DAY_MS));
}

export function getTargetExamDate(from: Date = new Date()): {
  date: Date;
  prefName: string;
  systemName: string;
  dateLabel: string;
} {
  const pref = getSavedTargetPrefecture();
  const [mmStr, ddStr] = pref.examMonthDay.split('-');
  const monthIdx = Math.max(0, (parseInt(mmStr, 10) || 3) - 1);
  const day = parseInt(ddStr, 10) || 10;

  let year = from.getFullYear();
  let candidate = new Date(year, monthIdx, day);
  const todayStart = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  if (candidate.getTime() < todayStart.getTime()) {
    year += 1;
    candidate = new Date(year, monthIdx, day);
  }
  return {
    date: candidate,
    prefName: pref.name,
    systemName: pref.examSystemName,
    dateLabel: `${year}年${monthIdx + 1}月${day}日頃`,
  };
}

/** 今日から志望都道府県の公立高校入試（本試験）までの残り日数を返す */
export function getDaysUntilExam(from: Date = new Date()): number {
  const { date } = getTargetExamDate(from);
  return daysUntil(date, from);
}

export function getDaysUntilSecondExam(from: Date = new Date()): number {
  return daysUntil(SECOND_EXAM_DATE, from);
}
