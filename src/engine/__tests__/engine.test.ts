import { describe, test, expect } from 'vitest';
import { createRng, shuffle, hashSeed } from '../random';
import {
  selectQuestions,
  buildMockExam,
  nextTargetDifficulty,
  accuracyToDifficulty,
} from '../selection';
import { gradeSession, XP_PER_CORRECT, type AnswerRecord } from '../scoring';
import {
  calculateStreak,
  levelFromXp,
  classifyMastery,
  buildRecommendations,
  readinessScore,
} from '../progress';
import type { Question, Difficulty } from '../../types/content';

const q = (
  id: string,
  difficulty: Difficulty,
  subjectId = 's1',
  topicId = 't1',
  status: 'approved' | 'pending' = 'approved',
): Question => ({
  id,
  subjectId,
  topicId,
  difficulty,
  prompt: `Prompt ${id}`,
  options: ['A', 'B', 'C', 'D'],
  correctIndex: 0,
  explanation: `Explanation ${id}`,
  status,
});

const pool: Question[] = [
  q('q1', 1),
  q('q2', 1),
  q('q3', 2),
  q('q4', 2),
  q('q5', 3, 's1', 't2'),
  q('q6', 3, 's2', 't3'),
  q('q7', 4, 's2', 't3'),
  q('q8', 5, 's2', 't3'),
  q('q10', 5, 's2', 't3'),
  q('q9', 1, 's1', 't1', 'pending'),
];

describe('random', () => {
  test('createRng is deterministic for a given seed', () => {
    const a = createRng(42);
    const b = createRng(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  test('createRng stays in [0, 1)', () => {
    const rng = createRng(7);
    for (let i = 0; i < 200; i += 1) {
      const v = rng();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  test('shuffle permutes without losing or duplicating items', () => {
    const input = ['a', 'b', 'c', 'd', 'e'];
    const out = shuffle(input, createRng(1));
    expect(out).toHaveLength(5);
    expect([...out].sort()).toEqual([...input].sort());
    expect(input).toEqual(['a', 'b', 'c', 'd', 'e']); // input untouched
  });

  test('hashSeed is stable and varies by input', () => {
    expect(hashSeed('attempt-1')).toBe(hashSeed('attempt-1'));
    expect(hashSeed('attempt-1')).not.toBe(hashSeed('attempt-2'));
  });
});

describe('selectQuestions', () => {
  test('never serves a question that is awaiting admin approval', () => {
    // Plan rule: AI-generated questions must not reach official exams before review.
    const picked = selectQuestions({ pool, count: 20, seed: 1 });
    expect(picked.map((x) => x.id)).not.toContain('q9');
  });

  test('returns unique questions only', () => {
    const picked = selectQuestions({ pool, count: 8, seed: 3 });
    expect(new Set(picked.map((x) => x.id)).size).toBe(picked.length);
  });

  test('caps at the pool size rather than duplicating', () => {
    const picked = selectQuestions({ pool, count: 50, seed: 5 });
    expect(picked).toHaveLength(9); // 10 in the pool minus the pending one
  });

  test('is deterministic for the same seed', () => {
    const a = selectQuestions({ pool, count: 4, seed: 99 });
    const b = selectQuestions({ pool, count: 4, seed: 99 });
    expect(a.map((x) => x.id)).toEqual(b.map((x) => x.id));
  });

  test('a different attempt seed yields a different question set or order', () => {
    // Plan: "A student taking the same quiz again should normally receive
    // different questions."
    const a = selectQuestions({ pool, count: 4, seed: 11 });
    const b = selectQuestions({ pool, count: 4, seed: 22 });
    expect(a.map((x) => x.id)).not.toEqual(b.map((x) => x.id));
  });

  test('honours the exclude list so a retry does not repeat just-seen items', () => {
    const first = selectQuestions({ pool, count: 3, seed: 8 });
    const second = selectQuestions({
      pool,
      count: 3,
      seed: 8,
      excludeIds: first.map((x) => x.id),
    });
    for (const item of second) {
      expect(first.map((x) => x.id)).not.toContain(item.id);
    }
  });

  test('filters by subject and by topic', () => {
    const bySubject = selectQuestions({ pool, count: 10, seed: 1, filter: { subjectId: 's2' } });
    expect(bySubject.every((x) => x.subjectId === 's2')).toBe(true);

    const byTopic = selectQuestions({ pool, count: 10, seed: 1, filter: { topicId: 't2' } });
    expect(byTopic.map((x) => x.id)).toEqual(['q5']);
  });

  test('filters by difficulty', () => {
    const hard = selectQuestions({ pool, count: 10, seed: 1, filter: { difficulty: [4, 5] } });
    expect(hard.every((x) => x.difficulty >= 4)).toBe(true);
  });

  test('prefers questions at the target difficulty', () => {
    const picked = selectQuestions({ pool, count: 2, seed: 4, targetDifficulty: 5 });
    expect(picked.every((x) => x.difficulty === 5)).toBe(true);
  });

  test('widens outward when the target difficulty is too thin', () => {
    // Only one difficulty-5 item exists, so a 3-question set has to reach
    // to the neighbouring levels instead of returning short.
    const picked = selectQuestions({ pool, count: 3, seed: 4, targetDifficulty: 5 });
    expect(picked).toHaveLength(3);
    expect(picked[0].difficulty).toBe(5);
  });

  test('returns an empty array for an empty pool', () => {
    expect(selectQuestions({ pool: [], count: 5, seed: 1 })).toEqual([]);
  });
});

describe('buildMockExam', () => {
  test('draws a requested number of questions in rising difficulty order', () => {
    const exam = buildMockExam({ pool, count: 6, seed: 2 });
    expect(exam).toHaveLength(6);
    const levels = exam.map((x) => x.difficulty);
    expect([...levels].sort((a, b) => a - b)).toEqual(levels);
  });

  test('excludes pending questions', () => {
    const exam = buildMockExam({ pool, count: 20, seed: 2 });
    expect(exam.map((x) => x.id)).not.toContain('q9');
  });
});

describe('accuracyToDifficulty / nextTargetDifficulty', () => {
  test('maps accuracy bands onto a difficulty ladder', () => {
    expect(accuracyToDifficulty(0)).toBe(1);
    expect(accuracyToDifficulty(40)).toBe(2);
    expect(accuracyToDifficulty(60)).toBe(3);
    expect(accuracyToDifficulty(80)).toBe(4);
    expect(accuracyToDifficulty(95)).toBe(5);
  });

  test('moves at most one step per session so the ramp stays gradual', () => {
    expect(nextTargetDifficulty(95, 2)).toBe(3);
    expect(nextTargetDifficulty(10, 4)).toBe(3);
    expect(nextTargetDifficulty(70, 3)).toBe(3);
  });

  test('clamps to the 1..5 ladder', () => {
    expect(nextTargetDifficulty(100, 5)).toBe(5);
    expect(nextTargetDifficulty(0, 1)).toBe(1);
  });
});

describe('gradeSession', () => {
  const answers: AnswerRecord[] = [
    { questionId: 'q1', subjectId: 's1', topicId: 't1', difficulty: 1, chosenIndex: 0, correctIndex: 0 },
    { questionId: 'q3', subjectId: 's1', topicId: 't1', difficulty: 2, chosenIndex: 3, correctIndex: 0 },
    { questionId: 'q6', subjectId: 's2', topicId: 't3', difficulty: 3, chosenIndex: null, correctIndex: 1 },
  ];

  test('counts correct, wrong and unanswered separately', () => {
    const r = gradeSession(answers, { mode: 'practice' });
    expect(r.total).toBe(3);
    expect(r.correct).toBe(1);
    expect(r.wrong).toBe(1);
    expect(r.unanswered).toBe(1);
  });

  test('computes integer accuracy over the whole set', () => {
    expect(gradeSession(answers, { mode: 'practice' }).accuracy).toBe(33);
  });

  test('awards XP per correct answer plus a completion bonus', () => {
    const practice = gradeSession(answers, { mode: 'practice' });
    expect(practice.xpEarned).toBeGreaterThanOrEqual(XP_PER_CORRECT);
    // A mock exam is timed and higher-stakes, so it pays a larger bonus.
    const mock = gradeSession(answers, { mode: 'mock' });
    expect(mock.xpEarned).toBeGreaterThan(practice.xpEarned);
  });

  test('awards nothing for an empty session', () => {
    const r = gradeSession([], { mode: 'practice' });
    expect(r.accuracy).toBe(0);
    expect(r.xpEarned).toBe(0);
    expect(r.total).toBe(0);
  });

  test('collects the mistakes for the My Mistakes list', () => {
    const r = gradeSession(answers, { mode: 'practice' });
    expect(r.mistakes.map((m) => m.questionId)).toEqual(['q3', 'q6']);
  });

  test('breaks performance down by topic and by subject', () => {
    const r = gradeSession(answers, { mode: 'practice' });
    const t1 = r.byTopic.find((t) => t.topicId === 't1');
    expect(t1).toMatchObject({ attempted: 2, correct: 1 });
    expect(t1?.accuracy).toBe(50);

    const s2 = r.bySubject.find((s) => s.subjectId === 's2');
    expect(s2).toMatchObject({ attempted: 1, correct: 0 });
  });

  test('flags a perfect score', () => {
    const perfect = gradeSession([answers[0]], { mode: 'practice' });
    expect(perfect.accuracy).toBe(100);
    expect(perfect.perfect).toBe(true);
  });
});

describe('calculateStreak', () => {
  // Plan: study days are Mon/Tue/Thu/Fri. Wednesday and the weekend are rest
  // days and "students should not be punished for taking rest days".
  const SCHEDULED = [1, 2, 4, 5];

  test('counts consecutive scheduled study days', () => {
    // 2026-10-05 is a Monday, 10-06 Tue, 10-08 Thu, 10-09 Fri.
    const r = calculateStreak(['2026-10-05', '2026-10-06', '2026-10-08', '2026-10-09'], '2026-10-09', SCHEDULED);
    expect(r.current).toBe(4);
  });

  test('a missed rest day does not break the streak', () => {
    // 10-07 is a Wednesday: no activity, streak survives.
    const r = calculateStreak(['2026-10-05', '2026-10-06', '2026-10-08'], '2026-10-08', SCHEDULED);
    expect(r.current).toBe(3);
  });

  test('a missed scheduled study day does break the streak', () => {
    // Mon 10-05 and Tue 10-06 active, Thu 10-08 missed. Checking on Fri 10-09
    // (not the forgiven "today"), the run ended on Tuesday.
    const r = calculateStreak(['2026-10-05', '2026-10-06'], '2026-10-09', SCHEDULED);
    expect(r.current).toBe(0);
    expect(r.longest).toBe(2);
  });

  test('a streak is not lost until the current study day is over', () => {
    // Today (Thu 10-08) has no activity yet, but yesterday's run still stands.
    const r = calculateStreak(['2026-10-06'], '2026-10-08', SCHEDULED);
    expect(r.current).toBe(1);
  });

  test('reports the longest streak as well as the current one', () => {
    // Scheduled days: Mon 09-28, Tue 09-29, Thu 10-01, Fri 10-02, Mon 10-05.
    // The active days are exactly those, so the run is unbroken throughout.
    const r = calculateStreak(
      ['2026-09-28', '2026-09-29', '2026-10-01', '2026-10-02', '2026-10-05'],
      '2026-10-05',
      SCHEDULED,
    );
    expect(r.longest).toBe(5);
    expect(r.current).toBe(5);
  });

  test('an earlier run is kept as the longest after the current one breaks', () => {
    // Mon 09-28, Tue 09-29, Thu 10-01 active; Fri 10-02 missed; Mon 10-05 active.
    const r = calculateStreak(['2026-09-28', '2026-09-29', '2026-10-01', '2026-10-05'], '2026-10-05', SCHEDULED);
    expect(r.current).toBe(1);
    expect(r.longest).toBe(3);
  });

  test('handles no activity at all', () => {
    expect(calculateStreak([], '2026-10-05', SCHEDULED)).toEqual({ current: 0, longest: 0 });
  });
});

describe('levelFromXp', () => {
  test('starts at level 1', () => {
    expect(levelFromXp(0)).toMatchObject({ level: 1, xpIntoLevel: 0, xpForNextLevel: 500 });
  });

  test('rolls over every 500 XP', () => {
    expect(levelFromXp(500)).toMatchObject({ level: 2, xpIntoLevel: 0 });
    expect(levelFromXp(750)).toMatchObject({ level: 2, xpIntoLevel: 250 });
  });

  test('never reports negative XP progress', () => {
    expect(levelFromXp(-50).level).toBe(1);
  });
});

describe('classifyMastery', () => {
  const perf = [
    { topicId: 't1', attempted: 10, correct: 9, accuracy: 90 },
    { topicId: 't2', attempted: 10, correct: 7, accuracy: 70 },
    { topicId: 't3', attempted: 10, correct: 4, accuracy: 40 },
    { topicId: 't4', attempted: 1, correct: 0, accuracy: 0 },
  ];

  test('separates strong, developing and needs-review topics', () => {
    const m = classifyMastery(perf);
    expect(m.strong.map((x) => x.topicId)).toContain('t1');
    expect(m.needsReview.map((x) => x.topicId)).toContain('t3');
    expect(m.developing.map((x) => x.topicId)).toContain('t2');
  });

  test('will not judge a topic on a single answer', () => {
    const m = classifyMastery(perf);
    expect(m.insufficient.map((x) => x.topicId)).toEqual(['t4']);
    expect(m.needsReview.map((x) => x.topicId)).not.toContain('t4');
  });
});

describe('buildRecommendations', () => {
  test('recommends the weakest topics first', () => {
    const recs = buildRecommendations(
      classifyMastery([
        { topicId: 't3', attempted: 10, correct: 3, accuracy: 30 },
        { topicId: 't2', attempted: 10, correct: 6, accuracy: 60 },
      ]),
      { topicNames: { t3: 'Philippine Folk Dance', t2: 'Elements of Art' } },
    );
    expect(recs[0].topicId).toBe('t3');
    expect(recs[0].message).toMatch(/Philippine Folk Dance/);
  });

  test('returns nothing to fix when every topic is strong', () => {
    const recs = buildRecommendations(
      classifyMastery([{ topicId: 't1', attempted: 10, correct: 10, accuracy: 100 }]),
      { topicNames: { t1: 'Music Theory' } },
    );
    expect(recs).toEqual([]);
  });
});

describe('readinessScore', () => {
  test('is a 0-100 integer', () => {
    const s = readinessScore({ accuracy: 80, coverage: 0.5, mockAverage: 70 });
    expect(Number.isInteger(s)).toBe(true);
    expect(s).toBeGreaterThanOrEqual(0);
    expect(s).toBeLessThanOrEqual(100);
  });

  test('rises with accuracy, coverage and mock performance', () => {
    const low = readinessScore({ accuracy: 40, coverage: 0.1, mockAverage: 40 });
    const high = readinessScore({ accuracy: 95, coverage: 1, mockAverage: 95 });
    expect(high).toBeGreaterThan(low);
  });

  test('is 0 for a student with no data', () => {
    expect(readinessScore({ accuracy: 0, coverage: 0, mockAverage: 0 })).toBe(0);
  });
});
