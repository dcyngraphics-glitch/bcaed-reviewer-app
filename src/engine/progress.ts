import type { TopicPerformance } from './scoring';

/** XP needed per level. Also used by the dashboard ring. */
export const XP_PER_LEVEL = 500;

export interface StreakResult {
  current: number;
  longest: number;
}

/** Local-midnight parse. Date.parse('2026-10-05') is UTC and shifts the weekday. */
function parseKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/**
 * Streak over *scheduled* study days only.
 *
 * The plan puts study on Mon/Tue/Thu/Fri and says students "should not be
 * punished for taking rest days", so a Wednesday or weekend with no activity
 * must not reset the run. A missed scheduled day does.
 *
 * Today is also forgiven: the streak is not considered broken until the
 * current study day has actually passed.
 *
 * @param activeDates ISO `YYYY-MM-DD` dates with at least one completed session
 * @param today ISO `YYYY-MM-DD`
 * @param scheduledWeekdays JS day numbers (0 = Sunday)
 */
export function calculateStreak(
  activeDates: readonly string[],
  today: string,
  scheduledWeekdays: readonly number[],
): StreakResult {
  if (activeDates.length === 0) return { current: 0, longest: 0 };

  const active = new Set(activeDates.map((d) => toKey(parseKey(d))));
  const todayKey = toKey(parseKey(today));
  const scheduled = new Set(scheduledWeekdays);

  const earliest = activeDates
    .map((d) => parseKey(d).getTime())
    .reduce((a, b) => Math.min(a, b));

  // Every scheduled date in range, oldest first.
  const scheduledDays: string[] = [];
  for (let cursor = new Date(earliest); toKey(cursor) <= todayKey; cursor = addDays(cursor, 1)) {
    if (scheduled.has(cursor.getDay())) scheduledDays.push(toKey(cursor));
  }

  // Longest run: scan forward, a missed scheduled day resets the counter.
  let longest = 0;
  let run = 0;
  for (const day of scheduledDays) {
    if (active.has(day)) {
      run += 1;
      longest = Math.max(longest, run);
    } else if (day !== todayKey) {
      run = 0;
    }
  }

  // Current run: walk backward. Today is forgiven when it has no activity yet.
  let current = 0;
  for (let i = scheduledDays.length - 1; i >= 0; i -= 1) {
    const day = scheduledDays[i];
    if (active.has(day)) {
      current += 1;
    } else if (day !== todayKey) {
      break;
    }
  }

  return { current, longest: Math.max(longest, current) };
}

export interface LevelProgress {
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
}

export function levelFromXp(xp: number): LevelProgress {
  const safeXp = Math.max(0, Math.floor(xp));
  return {
    level: Math.floor(safeXp / XP_PER_LEVEL) + 1,
    xpIntoLevel: safeXp % XP_PER_LEVEL,
    xpForNextLevel: XP_PER_LEVEL,
  };
}

export interface MasteryBreakdown {
  strong: TopicPerformance[];
  developing: TopicPerformance[];
  needsReview: TopicPerformance[];
  /** Too few attempts to judge — one lucky answer is not mastery. */
  insufficient: TopicPerformance[];
}

const MIN_ATTEMPTS_FOR_JUDGEMENT = 3;
const STRONG_AT = 80;
const DEVELOPING_AT = 60;

export function classifyMastery(performance: readonly TopicPerformance[]): MasteryBreakdown {
  const breakdown: MasteryBreakdown = {
    strong: [],
    developing: [],
    needsReview: [],
    insufficient: [],
  };

  for (const topic of performance) {
    if (topic.attempted < MIN_ATTEMPTS_FOR_JUDGEMENT) {
      breakdown.insufficient.push(topic);
    } else if (topic.accuracy >= STRONG_AT) {
      breakdown.strong.push(topic);
    } else if (topic.accuracy >= DEVELOPING_AT) {
      breakdown.developing.push(topic);
    } else {
      breakdown.needsReview.push(topic);
    }
  }

  return breakdown;
}

export interface Recommendation {
  topicId: string;
  message: string;
  /** Suggested difficulty for the follow-up session. */
  difficulty: 1 | 2 | 3;
}

export interface RecommendationContext {
  topicNames: Record<string, string>;
  subjectNames?: Record<string, string>;
}

/**
 * Turns the mastery breakdown into study advice, weakest topic first. Returns
 * an empty list when there is nothing to fix, so the UI can celebrate instead
 * of inventing busywork.
 */
export function buildRecommendations(
  mastery: MasteryBreakdown,
  { topicNames }: RecommendationContext,
): Recommendation[] {
  const name = (topicId: string) => topicNames[topicId] ?? topicId;

  const weakestFirst = [...mastery.needsReview].sort((a, b) => a.accuracy - b.accuracy);
  const nextUp = [...mastery.developing].sort((a, b) => a.accuracy - b.accuracy);

  return [
    ...weakestFirst.map((topic) => ({
      topicId: topic.topicId,
      message: `${name(topic.topicId)} is your weakest area at ${topic.accuracy}% — review it before moving on.`,
      difficulty: 1 as const,
    })),
    ...nextUp.map((topic) => ({
      topicId: topic.topicId,
      message: `You are at ${topic.accuracy}% on ${name(topic.topicId)}. A focused session should push it over 80%.`,
      difficulty: 2 as const,
    })),
  ];
}

export interface ReadinessInput {
  /** Overall accuracy, 0-100. */
  accuracy: number;
  /** Share of the question bank the student has attempted, 0-1. */
  coverage: number;
  /** Mean mock exam score, 0-100. */
  mockAverage: number;
}

/**
 * A single "am I ready for the LET?" number. Accuracy is weighted highest
 * because it is the closest proxy for exam performance; coverage guards
 * against a student who only ever drills one easy subject.
 */
export function readinessScore({ accuracy, coverage, mockAverage }: ReadinessInput): number {
  const clampedAccuracy = Math.min(100, Math.max(0, accuracy));
  const clampedCoverage = Math.min(1, Math.max(0, coverage));
  const clampedMock = Math.min(100, Math.max(0, mockAverage));

  const score = clampedAccuracy * 0.45 + clampedCoverage * 100 * 0.25 + clampedMock * 0.3;
  return Math.round(Math.min(100, Math.max(0, score)));
}
