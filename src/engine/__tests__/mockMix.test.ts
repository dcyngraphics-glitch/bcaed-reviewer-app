import { describe, test, expect } from 'vitest';
import { buildMockExam } from '../selection';
import { difficultyPlan } from '../../exam';
import type { Question, Difficulty } from '../../types/content';

/**
 * Builds a synthetic pool with an exact shape, so these tests measure the
 * selection logic rather than whatever the real bank happens to contain.
 */
const makePool = (spec: {
  easySituational: number;
  easyStraight: number;
  moderateSituational: number;
  moderateStraight: number;
  difficultSituational: number;
  difficultStraight: number;
}): Question[] => {
  const pool: Question[] = [];
  let n = 0;

  const add = (count: number, difficulty: Difficulty, situational: boolean) => {
    for (let i = 0; i < count; i += 1) {
      n += 1;
      pool.push({
        id: `q${n}`,
        subjectId: 'cae',
        topicId: 'cae-disciplinal',
        difficulty,
        prompt: `Prompt ${n}`,
        options: ['A', 'B', 'C', 'D'],
        correctIndex: 0,
        explanation: 'Because.',
        status: 'approved',
        situational,
      });
    }
  };

  // easy = difficulty 1-2, moderate = 3-4, difficult = 5
  add(spec.easySituational, 2, true);
  add(spec.easyStraight, 1, false);
  add(spec.moderateSituational, 4, true);
  add(spec.moderateStraight, 3, false);
  add(spec.difficultSituational, 5, true);
  add(spec.difficultStraight, 5, false);

  return pool;
};

const bandOf = (q: Question) => (q.difficulty <= 2 ? 'easy' : q.difficulty <= 4 ? 'moderate' : 'difficult');

const countBands = (items: readonly Question[]) => {
  const out = { easy: 0, moderate: 0, difficult: 0 };
  for (const q of items) out[bandOf(q)] += 1;
  return out;
};

const countSituational = (items: readonly Question[]) => items.filter((q) => q.situational).length;

describe('mock exam difficulty mix', () => {
  test('hits the PRC 30/50/20 band mix, not just the situational share', () => {
    // The bug: the situational branch ignored difficultyPlan entirely, so a
    // 60-item paper came out 72% difficult against a 20% spec.
    const pool = makePool({
      easySituational: 20,
      easyStraight: 20,
      moderateSituational: 40,
      moderateStraight: 40,
      difficultSituational: 20,
      difficultStraight: 20,
    });

    const exam = buildMockExam({ pool, count: 60, seed: 1, situationalShare: 0.8 });
    const spec = difficultyPlan(60);
    const actual = countBands(exam);

    expect(exam).toHaveLength(60);
    expect(actual.easy).toBe(spec.easy);
    expect(actual.moderate).toBe(spec.moderate);
    expect(actual.difficult).toBe(spec.difficult);
  });

  test('hits the situational share at the same time as the band mix', () => {
    const pool = makePool({
      easySituational: 40,
      easyStraight: 40,
      moderateSituational: 60,
      moderateStraight: 60,
      difficultSituational: 40,
      difficultStraight: 40,
    });

    const exam = buildMockExam({ pool, count: 60, seed: 2, situationalShare: 0.8 });

    expect(countSituational(exam)).toBe(48);
    expect(countBands(exam)).toEqual(difficultyPlan(60));
  });

  test('spreads situational items across every difficulty band', () => {
    // A paper that is 80% situational must not put all the situational items in
    // the hard band — exam day has easy situational items too.
    const pool = makePool({
      easySituational: 40,
      easyStraight: 40,
      moderateSituational: 60,
      moderateStraight: 60,
      difficultSituational: 40,
      difficultStraight: 40,
    });

    const exam = buildMockExam({ pool, count: 60, seed: 3, situationalShare: 0.8 });
    const situational = exam.filter((q) => q.situational);
    const bands = countBands(situational);

    expect(bands.easy).toBeGreaterThan(0);
    expect(bands.moderate).toBeGreaterThan(0);
    expect(bands.difficult).toBeGreaterThan(0);
  });

  test('respects the band mix at a lower situational share too', () => {
    const pool = makePool({
      easySituational: 40,
      easyStraight: 40,
      moderateSituational: 60,
      moderateStraight: 60,
      difficultSituational: 40,
      difficultStraight: 40,
    });

    const exam = buildMockExam({ pool, count: 30, seed: 4, situationalShare: 0.25 });

    expect(countBands(exam)).toEqual(difficultyPlan(30));
    expect(countSituational(exam)).toBe(Math.round(30 * 0.25));
  });

  test('still returns the full count when a band is short, without duplicates', () => {
    // Only two easy items exist, but the spec wants 18. The paper must still be
    // 60 items with no repeats — it just cannot be honest about the mix, and
    // that shortfall is reported separately rather than hidden.
    const pool = makePool({
      easySituational: 1,
      easyStraight: 1,
      moderateSituational: 40,
      moderateStraight: 40,
      difficultSituational: 40,
      difficultStraight: 40,
    });

    const exam = buildMockExam({ pool, count: 60, seed: 5, situationalShare: 0.8 });

    expect(exam).toHaveLength(60);
    expect(new Set(exam.map((q) => q.id)).size).toBe(60);
  });

  test('orders the paper by rising difficulty', () => {
    const pool = makePool({
      easySituational: 20,
      easyStraight: 20,
      moderateSituational: 40,
      moderateStraight: 40,
      difficultSituational: 20,
      difficultStraight: 20,
    });

    const exam = buildMockExam({ pool, count: 60, seed: 6, situationalShare: 0.8 });
    const levels = exam.map((q) => q.difficulty);
    expect([...levels].sort((a, b) => a - b)).toEqual(levels);
  });

  test('is deterministic for a given seed', () => {
    const pool = makePool({
      easySituational: 20,
      easyStraight: 20,
      moderateSituational: 40,
      moderateStraight: 40,
      difficultSituational: 20,
      difficultStraight: 20,
    });

    const a = buildMockExam({ pool, count: 40, seed: 77, situationalShare: 0.8 });
    const b = buildMockExam({ pool, count: 40, seed: 77, situationalShare: 0.8 });
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
  });

  test('a different seed produces a different paper', () => {
    const pool = makePool({
      easySituational: 20,
      easyStraight: 20,
      moderateSituational: 40,
      moderateStraight: 40,
      difficultSituational: 20,
      difficultStraight: 20,
    });

    const a = buildMockExam({ pool, count: 40, seed: 11, situationalShare: 0.8 });
    const b = buildMockExam({ pool, count: 40, seed: 22, situationalShare: 0.8 });
    expect(a.map((q) => q.id)).not.toEqual(b.map((q) => q.id));
  });

  test('without a situational share the band mix is still honoured', () => {
    const pool = makePool({
      easySituational: 20,
      easyStraight: 20,
      moderateSituational: 40,
      moderateStraight: 40,
      difficultSituational: 20,
      difficultStraight: 20,
    });

    const exam = buildMockExam({ pool, count: 60, seed: 8 });
    expect(countBands(exam)).toEqual(difficultyPlan(60));
  });

  test('handles a count of zero and an empty pool', () => {
    const pool = makePool({
      easySituational: 1,
      easyStraight: 1,
      moderateSituational: 1,
      moderateStraight: 1,
      difficultSituational: 1,
      difficultStraight: 1,
    });
    expect(buildMockExam({ pool, count: 0, seed: 1, situationalShare: 0.8 })).toEqual([]);
    expect(buildMockExam({ pool: [], count: 10, seed: 1, situationalShare: 0.8 })).toEqual([]);
  });

  test('a pool smaller than the request returns the whole pool', () => {
    const pool = makePool({
      easySituational: 2,
      easyStraight: 2,
      moderateSituational: 2,
      moderateStraight: 2,
      difficultSituational: 2,
      difficultStraight: 2,
    });

    const exam = buildMockExam({ pool, count: 100, seed: 9, situationalShare: 0.8 });
    expect(exam).toHaveLength(pool.length);
    expect(new Set(exam.map((q) => q.id)).size).toBe(pool.length);
  });

  test('never includes a question that is not approved', () => {
    const pool = makePool({
      easySituational: 5,
      easyStraight: 5,
      moderateSituational: 5,
      moderateStraight: 5,
      difficultSituational: 5,
      difficultStraight: 5,
    });
    pool[0] = { ...pool[0], status: 'pending' };

    const exam = buildMockExam({ pool, count: 20, seed: 10, situationalShare: 0.8 });
    expect(exam.map((q) => q.id)).not.toContain(pool[0].id);
  });
});
