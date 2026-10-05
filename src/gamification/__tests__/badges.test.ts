import { describe, test, expect } from 'vitest';
import {
  BADGES,
  evaluateBadges,
  newlyEarnedBadges,
  badgeById,
  type StudentStats,
} from '..';

const emptyStats: StudentStats = {
  sessionsCompleted: 0,
  questionsAnswered: 0,
  currentStreak: 0,
  longestStreak: 0,
  perfectSessions: 0,
  mockExamsTaken: 0,
  bestMockScore: 0,
  topicsMastered: 0,
  week: 1,
  readiness: 0,
};

const stats = (overrides: Partial<StudentStats> = {}): StudentStats => ({
  ...emptyStats,
  ...overrides,
});

describe('badge catalogue', () => {
  test('has unique ids', () => {
    const ids = BADGES.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('covers every badge the plan names', () => {
    const names = BADGES.map((b) => b.name);
    for (const expected of [
      'First Step',
      'First Quiz',
      '7-Day Streak',
      '30-Day Streak',
      '100 Questions',
      '500 Questions',
      'Perfect Score',
      'Subject Master',
      'First Mock Exam',
      'Mock Exam Master',
      'Final Stretch',
      'BCAED Ready',
    ]) {
      expect(names).toContain(expected);
    }
  });

  test('every badge explains how it is earned', () => {
    for (const badge of BADGES) {
      expect(badge.description.length).toBeGreaterThan(10);
      expect(badge.icon.length).toBeGreaterThan(0);
    }
  });

  test('badgeById finds a badge and returns undefined for an unknown id', () => {
    expect(badgeById('first-step')?.name).toBe('First Step');
    expect(badgeById('nope')).toBeUndefined();
  });
});

describe('evaluateBadges', () => {
  test('a brand new student has earned nothing', () => {
    expect(evaluateBadges(emptyStats)).toEqual([]);
  });

  test('awards First Step and First Quiz after the first completed session', () => {
    const earned = evaluateBadges(stats({ sessionsCompleted: 1, questionsAnswered: 10 }));
    expect(earned).toContain('first-step');
    expect(earned).toContain('first-quiz');
    expect(earned).not.toContain('questions-100');
  });

  test('awards the streak badges on the recorded streak', () => {
    expect(evaluateBadges(stats({ currentStreak: 7 }))).toContain('streak-7');
    expect(evaluateBadges(stats({ currentStreak: 7 }))).not.toContain('streak-30');
    expect(evaluateBadges(stats({ longestStreak: 30 }))).toContain('streak-30');
  });

  test('uses the longest streak so a badge is never revoked', () => {
    // Streak badges should latch: a student who hit 30 days keeps it.
    const earned = evaluateBadges(stats({ currentStreak: 2, longestStreak: 30 }));
    expect(earned).toContain('streak-30');
  });

  test('awards the question volume badges at the thresholds', () => {
    expect(evaluateBadges(stats({ questionsAnswered: 99 }))).not.toContain('questions-100');
    expect(evaluateBadges(stats({ questionsAnswered: 100 }))).toContain('questions-100');
    expect(evaluateBadges(stats({ questionsAnswered: 500 }))).toContain('questions-500');
  });

  test('awards Perfect Score only for a flawless session', () => {
    expect(evaluateBadges(stats({ perfectSessions: 0 }))).not.toContain('perfect-score');
    expect(evaluateBadges(stats({ perfectSessions: 1 }))).toContain('perfect-score');
  });

  test('awards the mock exam badges on first attempt and on a strong score', () => {
    const first = evaluateBadges(stats({ mockExamsTaken: 1, bestMockScore: 60 }));
    expect(first).toContain('first-mock-exam');
    expect(first).not.toContain('mock-exam-master');

    const master = evaluateBadges(stats({ mockExamsTaken: 5, bestMockScore: 85 }));
    expect(master).toContain('mock-exam-master');
  });

  test('awards Subject Master only once topics are actually mastered', () => {
    expect(evaluateBadges(stats({ topicsMastered: 0 }))).not.toContain('subject-master');
    expect(evaluateBadges(stats({ topicsMastered: 1 }))).toContain('subject-master');
  });

  test('awards Final Stretch in the last quarter of the program', () => {
    expect(evaluateBadges(stats({ week: 8 }))).not.toContain('final-stretch');
    expect(evaluateBadges(stats({ week: 9 }))).toContain('final-stretch');
  });

  test('awards BCAED Ready only at high readiness in the final stretch', () => {
    expect(evaluateBadges(stats({ week: 9, readiness: 70 }))).not.toContain('bcaed-ready');
    expect(evaluateBadges(stats({ week: 9, readiness: 85 }))).toContain('bcaed-ready');
    // High readiness in week 2 is not "ready" yet.
    expect(evaluateBadges(stats({ week: 2, readiness: 90 }))).not.toContain('bcaed-ready');
  });

  test('is pure: repeated calls give the same answer and do not mutate stats', () => {
    const input = stats({ sessionsCompleted: 3, currentStreak: 7, questionsAnswered: 120 });
    const snapshot = JSON.stringify(input);
    expect(evaluateBadges(input)).toEqual(evaluateBadges(input));
    expect(JSON.stringify(input)).toBe(snapshot);
  });
});

describe('newlyEarnedBadges', () => {
  test('returns only badges not already held', () => {
    const all = evaluateBadges(stats({ sessionsCompleted: 1, questionsAnswered: 10 }));
    const fresh = newlyEarnedBadges(all, ['first-step']);
    expect(fresh).toEqual(['first-quiz']);
  });

  test('returns nothing when everything is already held', () => {
    const all = evaluateBadges(stats({ sessionsCompleted: 1, questionsAnswered: 10 }));
    expect(newlyEarnedBadges(all, all)).toEqual([]);
  });
});
