/**
 * Badge catalogue.
 *
 * The plan lists the badges by name; each one here carries a `test` that reads
 * a single stats object, so evaluating badges is a pure function of the
 * student's record and a badge can never be awarded by accident.
 */

export interface StudentStats {
  sessionsCompleted: number;
  questionsAnswered: number;
  currentStreak: number;
  /** Streak badges latch off this, so a badge is never revoked. */
  longestStreak: number;
  perfectSessions: number;
  mockExamsTaken: number;
  bestMockScore: number;
  topicsMastered: number;
  /** Current program week, 1-12. */
  week: number;
  /** 0-100 readiness score. */
  readiness: number;
}

export type BadgeTier = 'bronze' | 'silver' | 'gold';

export interface Badge {
  id: string;
  name: string;
  description: string;
  /** Emoji stands in until an icon set is chosen. */
  icon: string;
  tier: BadgeTier;
  test: (stats: StudentStats) => boolean;
}

/** Readiness that counts as genuinely prepared for the LET. */
export const READY_THRESHOLD = 80;

/** The final quarter of the 12-week program. */
export const FINAL_STRETCH_WEEK = 9;

/** Best streak ever recorded — current or historical, whichever is higher. */
const bestStreak = (s: StudentStats) => Math.max(s.currentStreak, s.longestStreak);

export const BADGES: readonly Badge[] = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Complete your first study session.',
    icon: '👣',
    tier: 'bronze',
    test: (s) => s.sessionsCompleted >= 1,
  },
  {
    id: 'first-quiz',
    name: 'First Quiz',
    description: 'Answer your first set of practice questions.',
    icon: '📝',
    tier: 'bronze',
    test: (s) => s.questionsAnswered >= 1,
  },
  {
    id: 'streak-7',
    name: '7-Day Streak',
    description: 'Study on every scheduled day for a week.',
    icon: '🔥',
    tier: 'bronze',
    test: (s) => bestStreak(s) >= 7,
  },
  {
    id: 'streak-30',
    name: '30-Day Streak',
    description: 'Study on every scheduled day for a month.',
    icon: '🔥',
    tier: 'silver',
    test: (s) => bestStreak(s) >= 30,
  },
  {
    id: 'questions-100',
    name: '100 Questions',
    description: 'Answer 100 questions.',
    icon: '💯',
    tier: 'bronze',
    test: (s) => s.questionsAnswered >= 100,
  },
  {
    id: 'questions-500',
    name: '500 Questions',
    description: 'Answer 500 questions.',
    icon: '🏋️',
    tier: 'silver',
    test: (s) => s.questionsAnswered >= 500,
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Finish a session with every answer correct.',
    icon: '⭐',
    tier: 'silver',
    test: (s) => s.perfectSessions >= 1,
  },
  {
    id: 'subject-master',
    name: 'Subject Master',
    description: 'Reach 80% accuracy on a topic with at least three attempts.',
    icon: '🎯',
    tier: 'silver',
    test: (s) => s.topicsMastered >= 1,
  },
  {
    id: 'first-mock-exam',
    name: 'First Mock Exam',
    description: 'Sit your first timed mock examination.',
    icon: '⏱️',
    tier: 'bronze',
    test: (s) => s.mockExamsTaken >= 1,
  },
  {
    id: 'mock-exam-master',
    name: 'Mock Exam Master',
    description: 'Score 80% or better on a mock examination.',
    icon: '🏆',
    tier: 'gold',
    test: (s) => s.mockExamsTaken >= 1 && s.bestMockScore >= 80,
  },
  {
    id: 'final-stretch',
    name: 'Final Stretch',
    description: 'Reach the final quarter of the review program.',
    icon: '🚀',
    tier: 'silver',
    test: (s) => s.week >= FINAL_STRETCH_WEEK,
  },
  {
    id: 'bcaed-ready',
    name: 'BCAED Ready',
    description: `Hit ${READY_THRESHOLD}% readiness during the final stretch.`,
    icon: '🎓',
    tier: 'gold',
    test: (s) => s.week >= FINAL_STRETCH_WEEK && s.readiness >= READY_THRESHOLD,
  },
] as const;

export function badgeById(id: string): Badge | undefined {
  return BADGES.find((badge) => badge.id === id);
}

/** Ids of every badge the stats qualify for. Pure. */
export function evaluateBadges(stats: StudentStats): string[] {
  return BADGES.filter((badge) => badge.test(stats)).map((badge) => badge.id);
}

/** Ids earned now but not in `alreadyHeld` — drives the unlock animation. */
export function newlyEarnedBadges(earned: readonly string[], alreadyHeld: readonly string[]): string[] {
  const held = new Set(alreadyHeld);
  return earned.filter((id) => !held.has(id));
}
