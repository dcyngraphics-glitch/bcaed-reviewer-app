import { describe, test, expect } from 'vitest';
import { buildMockExam, selectQuestions } from '../selection';
import { SITUATIONAL_SHARE, composePaper, compositionShortfall } from '../../exam/composition';
import { ALL_QUESTIONS } from '../../data/questions';
import type { Question } from '../../types/content';

const approved = ALL_QUESTIONS.filter((q) => q.status === 'approved');

const situationalCount = (items: readonly Question[]) => items.filter((q) => q.situational).length;

describe('mock exam composition against the real bank', () => {
  test('a full mock exam hits the exam-day situational share', () => {
    // The plan calls for mock exams to lean heavily situational. 60 items at
    // 80% is 48 situational items.
    const exam = buildMockExam({
      pool: approved,
      count: 60,
      seed: 12345,
      situationalShare: SITUATIONAL_SHARE.mock,
    });

    expect(exam).toHaveLength(60);
    const situational = situationalCount(exam);
    // Allow a small tolerance for a pool that is still growing.
    expect(situational).toBeGreaterThanOrEqual(Math.floor(60 * 0.6));
  });

  test('a mock exam is ordered by rising difficulty', () => {
    const exam = buildMockExam({
      pool: approved,
      count: 60,
      seed: 999,
      situationalShare: SITUATIONAL_SHARE.mock,
    });
    const levels = exam.map((q) => q.difficulty);
    expect([...levels].sort((a, b) => a - b)).toEqual(levels);
  });

  test('a mock exam contains no duplicate items', () => {
    const exam = buildMockExam({
      pool: approved,
      count: 60,
      seed: 7,
      situationalShare: SITUATIONAL_SHARE.mock,
    });
    expect(new Set(exam.map((q) => q.id)).size).toBe(exam.length);
  });

  test('the bank is large enough to fill the full preset', () => {
    const shortfall = compositionShortfall(approved, { total: 60, situationalShare: SITUATIONAL_SHARE.mock });
    expect(shortfall.itemsShort).toBe(0);
  });

  test('practice keeps a much lower situational share than a mock', () => {
    // The graded ramp: practice should not be as situational-heavy as a mock.
    expect(SITUATIONAL_SHARE.practice).toBeLessThan(SITUATIONAL_SHARE.mock);
    expect(SITUATIONAL_SHARE.assessment).toBeLessThan(SITUATIONAL_SHARE.mock);
  });

  test('composePaper reports a shortfall rather than silently missing its spec', () => {
    const tinyPool = approved.slice(0, 5);
    const shortfall = compositionShortfall(tinyPool, { total: 60, situationalShare: 0.8 });
    expect(shortfall.itemsShort).toBeGreaterThan(0);
    expect(shortfall.situationalShort).toBeGreaterThan(0);
  });

  test('a subject-filtered mock only draws that subject', () => {
    const cae = approved.filter((q) => q.subjectId === 'cae');
    const exam = buildMockExam({
      pool: approved,
      count: 20,
      seed: 42,
      filter: { subjectId: 'cae' },
      situationalShare: SITUATIONAL_SHARE.mock,
    });
    expect(exam.length).toBeGreaterThan(0);
    expect(exam.length).toBeLessThanOrEqual(cae.length);
    for (const q of exam) {
      expect(q.subjectId).toBe('cae');
    }
  });

  test('a filtered paper wider than the pool returns the whole pool, not duplicates', () => {
    const cae = approved.filter((q) => q.subjectId === 'cae');
    const exam = buildMockExam({
      pool: approved,
      count: 500,
      seed: 42,
      filter: { subjectId: 'cae' },
      situationalShare: SITUATIONAL_SHARE.mock,
    });
    expect(exam).toHaveLength(cae.length);
    expect(new Set(exam.map((q) => q.id)).size).toBe(exam.length);
  });

  test('practice selection still works with the situational items present', () => {
    const items = selectQuestions({ pool: approved, count: 10, seed: 3 });
    expect(items).toHaveLength(10);
    expect(new Set(items.map((q) => q.id)).size).toBe(10);
  });

  test('composePaper quota sums to the requested total', () => {
    const { quota } = composePaper(approved, { total: 60, situationalShare: 0.8 });
    expect(quota.easy + quota.moderate + quota.difficult).toBe(60);
  });
});
