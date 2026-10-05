import { describe, test, expect } from 'vitest';
import {
  SUBTESTS,
  PASSING_AVERAGE,
  MINIMUM_SUBTEST_RATING,
  subtestById,
  secondsPerItem,
  passingStatus,
  projectRating,
  weakestSubtest,
  EXAM_DIFFICULTY_MIX,
  difficultyPlan,
  type SubtestRating,
} from '..';

describe('subtest structure', () => {
  test('matches the real Secondary LET paper', () => {
    // 150 items each, 450 total, on one Sunday.
    expect(SUBTESTS.map((s) => s.id)).toEqual(['gened', 'profed', 'cae']);
    for (const subtest of SUBTESTS) {
      expect(subtest.items, subtest.id).toBe(150);
    }
    expect(SUBTESTS.reduce((n, s) => n + s.items, 0)).toBe(450);
  });

  test('carries the official 20 / 40 / 40 weighting', () => {
    expect(subtestById('gened').weight).toBe(0.2);
    expect(subtestById('profed').weight).toBe(0.4);
    expect(subtestById('cae').weight).toBe(0.4);
    expect(SUBTESTS.reduce((n, s) => n + s.weight, 0)).toBeCloseTo(1, 10);
  });

  test('carries the real time windows and durations', () => {
    expect(subtestById('gened')).toMatchObject({ minutes: 120, window: '8:00–10:00 a.m.' });
    expect(subtestById('profed')).toMatchObject({ minutes: 180, window: '11:00 a.m.–2:00 p.m.' });
    expect(subtestById('cae')).toMatchObject({ minutes: 210, window: '3:00–6:30 p.m.' });
  });

  test('every subtest has a name and a description', () => {
    for (const subtest of SUBTESTS) {
      expect(subtest.name.length, subtest.id).toBeGreaterThan(3);
      expect(subtest.description.length, subtest.id).toBeGreaterThan(20);
    }
  });

  test('subtestById throws on an unknown id rather than returning undefined', () => {
    expect(() => subtestById('nope')).toThrow();
  });
});

describe('secondsPerItem', () => {
  test('is the real per-item budget, not a flat guess', () => {
    // Gen Ed is the tightest paper on the day: 150 items in 120 minutes.
    expect(secondsPerItem(subtestById('gened'))).toBe(48);
    expect(secondsPerItem(subtestById('profed'))).toBe(72);
    expect(secondsPerItem(subtestById('cae'))).toBe(84);
  });

  test('agrees with the subtest table', () => {
    for (const subtest of SUBTESTS) {
      expect(secondsPerItem(subtest)).toBe((subtest.minutes * 60) / subtest.items);
    }
  });
});

describe('passingStatus', () => {
  const rating = (subtestId: 'gened' | 'profed' | 'cae', score: number): SubtestRating => ({
    subtestId,
    score,
  });

  test('passes only when the average clears 75 and no subtest is under 50', () => {
    const result = passingStatus([
      rating('gened', 80),
      rating('profed', 80),
      rating('cae', 80),
    ]);
    expect(result.passed).toBe(true);
    expect(result.average).toBe(80);
    expect(result.failingSubtests).toEqual([]);
  });

  test('fails on a low average even when every subtest clears 50', () => {
    const result = passingStatus([
      rating('gened', 60),
      rating('profed', 60),
      rating('cae', 60),
    ]);
    expect(result.passed).toBe(false);
    expect(result.average).toBe(60);
    expect(result.averageShortfall).toBe(15);
  });

  test('fails on a single subtest below 50 even with a passing average', () => {
    // This is the condition students underestimate: 20/40/40 weighting means
    // one bad paper can fail you while the average still looks healthy.
    // 0.2*100 + 0.4*100 + 0.4*45 = 20 + 40 + 18 = 78, above the 75 average.
    const result = passingStatus([
      rating('gened', 100),
      rating('profed', 100),
      rating('cae', 45),
    ]);
    expect(result.average).toBeCloseTo(78, 6);
    expect(result.average).toBeGreaterThan(PASSING_AVERAGE);
    expect(result.passed).toBe(false);
    expect(result.failingSubtests).toEqual(['cae']);
  });

  test('reports every subtest below the floor, not just the first', () => {
    const result = passingStatus([
      rating('gened', 40),
      rating('profed', 45),
      rating('cae', 90),
    ]);
    expect(result.failingSubtests).toEqual(['gened', 'profed']);
  });

  test('treats exactly 50 and exactly 75 as passing', () => {
    // 0.2*50 + 0.4*100 + 0.4*75 = 10 + 40 + 30 = 80, and 50 is not below the floor.
    const result = passingStatus([
      rating('gened', 50),
      rating('profed', 100),
      rating('cae', 75),
    ]);
    expect(result.average).toBeCloseTo(80, 6);
    expect(result.failingSubtests).toEqual([]);
    expect(result.passed).toBe(true);
  });

  test('weights the average, it does not just mean the three scores', () => {
    // 20/40/40: a strong Gen Ed barely moves the average, a strong CAE moves it a lot.
    const caeHeavy = passingStatus([
      rating('gened', 50),
      rating('profed', 70),
      rating('cae', 95),
    ]);
    // 0.2*50 + 0.4*70 + 0.4*95 = 10 + 28 + 38 = 76
    expect(caeHeavy.average).toBeCloseTo(76, 6);
  });

  test('exposes the constants the rule is built from', () => {
    expect(PASSING_AVERAGE).toBe(75);
    expect(MINIMUM_SUBTEST_RATING).toBe(50);
  });

  test('handles an empty or partial rating set without dividing by zero', () => {
    const empty = passingStatus([]);
    expect(empty.average).toBe(0);
    expect(empty.passed).toBe(false);
    expect(Number.isFinite(empty.average)).toBe(true);

    // A partial set is weighted over what is present, not over all three.
    const partial = passingStatus([rating('profed', 80)]);
    expect(partial.average).toBe(80);
  });
});

describe('weakestSubtest', () => {
  test('finds the lowest-scoring subtest', () => {
    const weakest = weakestSubtest([
      { subtestId: 'gened', score: 88 },
      { subtestId: 'profed', score: 62 },
      { subtestId: 'cae', score: 79 },
    ]);
    expect(weakest?.subtestId).toBe('profed');
  });

  test('returns null for no data', () => {
    expect(weakestSubtest([])).toBeNull();
  });
});

describe('projectRating', () => {
  test('projects a subtest score from accuracy on that subtest', () => {
    expect(projectRating(80, subtestById('cae'))).toBe(80);
  });

  test('clamps to 0-100', () => {
    expect(projectRating(-10, subtestById('gened'))).toBe(0);
    expect(projectRating(140, subtestById('gened'))).toBe(100);
  });

  test('rounds to a whole number', () => {
    expect(Number.isInteger(projectRating(72.6, subtestById('profed')))).toBe(true);
  });
});

describe('difficulty mix', () => {
  test('mirrors the PRC TOS mix of 30 / 50 / 20', () => {
    expect(EXAM_DIFFICULTY_MIX).toEqual({ easy: 0.3, moderate: 0.5, difficult: 0.2 });
  });

  test('difficultyPlan splits an item count into the official bands', () => {
    const plan = difficultyPlan(150);
    expect(plan).toEqual({ easy: 45, moderate: 75, difficult: 30 });
    expect(plan.easy + plan.moderate + plan.difficult).toBe(150);
  });

  test('a shorter paper still sums to the requested count', () => {
    for (const count of [10, 15, 20, 30, 60]) {
      const plan = difficultyPlan(count);
      expect(plan.easy + plan.moderate + plan.difficult, `count ${count}`).toBe(count);
    }
  });

  test('difficultyPlan handles zero', () => {
    expect(difficultyPlan(0)).toEqual({ easy: 0, moderate: 0, difficult: 0 });
  });
});
