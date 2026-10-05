import { describe, test, expect, beforeEach, vi, afterEach } from 'vitest';
import {
  loadProfile,
  saveProfile,
  recordSession,
  addMistakes,
  clearMistake,
  removeMistake,
  updateStreak,
  computeStats,
  defaultProfile,
  STORAGE_KEY,
  type StudentProfile,
} from '../studentStore';
import { gradeSession, type AnswerRecord } from '../../engine/scoring';

const answer = (
  questionId: string,
  chosenIndex: number | null,
  correctIndex: number,
  extra: Partial<AnswerRecord> = {},
): AnswerRecord => ({
  questionId,
  subjectId: 'cae',
  topicId: 'cae-disciplinal',
  difficulty: 2,
  chosenIndex,
  correctIndex,
  ...extra,
});

const baseProfile = (): StudentProfile => defaultProfile({ name: 'Juan Dela Cruz', startDate: '2026-10-05' });

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('defaultProfile', () => {
  test('starts a new student at zero with no activity', () => {
    const p = baseProfile();
    expect(p).toMatchObject({
      name: 'Juan Dela Cruz',
      xp: 0,
      targetDifficulty: 1,
      sessions: [],
      mistakes: [],
      badges: [],
      activeDates: [],
    });
  });

  test('carries a schema version so stored data can be migrated', () => {
    expect(baseProfile().version).toBeGreaterThanOrEqual(1);
  });
});

describe('loadProfile / saveProfile', () => {
  test('round-trips a profile through localStorage', () => {
    const p = { ...baseProfile(), xp: 320, targetDifficulty: 3 as const };
    saveProfile(p);
    expect(loadProfile()).toEqual(p);
  });

  test('returns a fresh profile when nothing is stored', () => {
    expect(loadProfile()).toMatchObject({ xp: 0, sessions: [] });
  });

  test('survives corrupted JSON instead of throwing', () => {
    // A half-written value used to take the whole app down on boot.
    window.localStorage.setItem(STORAGE_KEY, '{ not json');
    expect(() => loadProfile()).not.toThrow();
    expect(loadProfile().xp).toBe(0);
  });

  test('survives a stored value of the wrong shape', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ xp: 'lots' }));
    expect(loadProfile().xp).toBe(0);
  });

  test('does not throw when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });
    expect(() => saveProfile(baseProfile())).not.toThrow();
  });
});

describe('recordSession', () => {
  test('adds XP and appends the session', () => {
    const result = gradeSession([answer('q1', 0, 0), answer('q2', 1, 0)], { mode: 'practice' });
    const next = recordSession(baseProfile(), result, '2026-10-05');

    expect(next.xp).toBe(result.xpEarned);
    expect(next.sessions).toHaveLength(1);
    expect(next.sessions[0]).toMatchObject({ accuracy: 50, total: 2, date: '2026-10-05' });
  });

  test('accumulates XP across sessions', () => {
    const r1 = gradeSession([answer('q1', 0, 0)], { mode: 'practice' });
    const r2 = gradeSession([answer('q2', 0, 0)], { mode: 'practice' });
    const after = recordSession(recordSession(baseProfile(), r1, '2026-10-05'), r2, '2026-10-06');
    expect(after.xp).toBe(r1.xpEarned + r2.xpEarned);
  });

  test('records the study date once even for two sessions in a day', () => {
    const r = gradeSession([answer('q1', 0, 0)], { mode: 'practice' });
    const after = recordSession(recordSession(baseProfile(), r, '2026-10-05'), r, '2026-10-05');
    expect(after.activeDates).toEqual(['2026-10-05']);
  });

  test('keeps activeDates sorted', () => {
    const r = gradeSession([answer('q1', 0, 0)], { mode: 'practice' });
    const after = recordSession(recordSession(baseProfile(), r, '2026-10-08'), r, '2026-10-05');
    expect(after.activeDates).toEqual(['2026-10-05', '2026-10-08']);
  });

  test('nudges the target difficulty one step at most', () => {
    const perfect = gradeSession([answer('q1', 0, 0), answer('q2', 0, 0)], { mode: 'practice' });
    const after = recordSession(baseProfile(), perfect, '2026-10-05');
    expect(after.targetDifficulty).toBe(2); // 1 -> 2, not straight to 5
  });

  test('does not mutate the profile it was given', () => {
    const before = baseProfile();
    const snapshot = JSON.stringify(before);
    recordSession(before, gradeSession([answer('q1', 0, 0)], { mode: 'practice' }), '2026-10-05');
    expect(JSON.stringify(before)).toBe(snapshot);
  });
});

describe('mistakes list', () => {
  test('adds a wrong answer to My Mistakes', () => {
    const after = addMistakes(baseProfile(), [
      answer('q3', 2, 0, { topicId: 'cae-pedagogy' }),
    ]);
    expect(after.mistakes).toHaveLength(1);
    expect(after.mistakes[0]).toMatchObject({ questionId: 'q3', chosenIndex: 2, correctIndex: 0 });
  });

  test('records an unanswered question too', () => {
    const after = addMistakes(baseProfile(), [answer('q4', null, 1)]);
    expect(after.mistakes[0].chosenIndex).toBeNull();
  });

  test('does not duplicate a question already in the list', () => {
    const once = addMistakes(baseProfile(), [answer('q3', 2, 0)]);
    const twice = addMistakes(once, [answer('q3', 3, 0)]);
    expect(twice.mistakes).toHaveLength(1);
  });

  test('updates the stored answer when the same question is missed again', () => {
    const once = addMistakes(baseProfile(), [answer('q3', 2, 0)]);
    const twice = addMistakes(once, [answer('q3', 3, 0)]);
    expect(twice.mistakes[0].chosenIndex).toBe(3);
  });

  test('clearMistake removes a question once it is answered correctly', () => {
    const withMistake = addMistakes(baseProfile(), [answer('q3', 2, 0)]);
    const cleared = clearMistake(withMistake, 'q3');
    expect(cleared.mistakes).toHaveLength(0);
  });

  test('removeMistake deletes an entry outright', () => {
    const withMistake = addMistakes(baseProfile(), [answer('q3', 2, 0), answer('q5', 1, 0)]);
    expect(removeMistake(withMistake, 'q3').mistakes.map((m) => m.questionId)).toEqual(['q5']);
  });
});

describe('updateStreak', () => {
  test('stores the current and longest streak on the profile', () => {
    const p = { ...baseProfile(), activeDates: ['2026-10-05', '2026-10-06'] };
    const after = updateStreak(p, '2026-10-06');
    expect(after.currentStreak).toBe(2);
    expect(after.longestStreak).toBe(2);
  });

  test('never lowers the longest streak', () => {
    const p = { ...baseProfile(), activeDates: [], currentStreak: 0, longestStreak: 12 };
    expect(updateStreak(p, '2026-10-20').longestStreak).toBe(12);
  });
});

describe('computeStats', () => {
  test('totals questions answered across every session', () => {
    const r1 = gradeSession([answer('q1', 0, 0), answer('q2', 1, 0)], { mode: 'practice' });
    const r2 = gradeSession([answer('q3', 0, 0)], { mode: 'mock' });
    let p = recordSession(baseProfile(), r1, '2026-10-05');
    p = recordSession(p, r2, '2026-10-06', { mode: 'mock' });

    const stats = computeStats(p, { week: 3, readiness: 40, topicsMastered: 1 });
    expect(stats.questionsAnswered).toBe(3);
    expect(stats.sessionsCompleted).toBe(2);
    expect(stats.mockExamsTaken).toBe(1);
    expect(stats.week).toBe(3);
  });

  test('reports overall accuracy as an integer', () => {
    const r = gradeSession([answer('q1', 0, 0), answer('q2', 1, 0)], { mode: 'practice' });
    const p = recordSession(baseProfile(), r, '2026-10-05');
    expect(computeStats(p, { week: 1, readiness: 0, topicsMastered: 0 }).accuracy).toBe(50);
  });

  test('counts perfect sessions', () => {
    const perfect = gradeSession([answer('q1', 0, 0)], { mode: 'practice' });
    const p = recordSession(baseProfile(), perfect, '2026-10-05');
    expect(computeStats(p, { week: 1, readiness: 0, topicsMastered: 0 }).perfectSessions).toBe(1);
  });

  test('reports the best mock exam score', () => {
    const low = gradeSession([answer('q1', 1, 0)], { mode: 'mock' });
    const high = gradeSession([answer('q1', 0, 0), answer('q2', 0, 0)], { mode: 'mock' });
    let p = recordSession(baseProfile(), low, '2026-10-05', { mode: 'mock' });
    p = recordSession(p, high, '2026-10-06', { mode: 'mock' });
    expect(computeStats(p, { week: 1, readiness: 0, topicsMastered: 0 }).bestMockScore).toBe(100);
  });

  test('is zeroed for a student with no sessions', () => {
    const stats = computeStats(baseProfile(), { week: 1, readiness: 0, topicsMastered: 0 });
    expect(stats).toMatchObject({ sessionsCompleted: 0, questionsAnswered: 0, accuracy: 0 });
  });

  test('aggregates per-topic performance for the mastery breakdown', () => {
    const r = gradeSession([
      answer('q1', 0, 0, { topicId: 't1' }),
      answer('q2', 1, 0, { topicId: 't1' }),
      answer('q3', 0, 0, { topicId: 't2' }),
    ], { mode: 'practice' });
    const p = recordSession(baseProfile(), r, '2026-10-05');
    const stats = computeStats(p, { week: 1, readiness: 0, topicsMastered: 0 });

    const t1 = stats.byTopic.find((t) => t.topicId === 't1');
    expect(t1).toMatchObject({ attempted: 2, correct: 1, accuracy: 50 });
  });
});
