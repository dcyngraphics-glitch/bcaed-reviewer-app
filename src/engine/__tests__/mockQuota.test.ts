import { describe, test, expect } from 'vitest';
import { buildMockExam } from '../selection';
import { SITUATIONAL_SHARE } from '../../exam/composition';
import { ALL_QUESTIONS } from '../../data/questions';
import { DRAFT_QUESTIONS } from '../../data/draftQuestions';
import { toPendingQuestions } from '../../pipeline';

/**
 * These tests exist to stop the content gap from silently reopening.
 *
 * The bug that started this work: `buildMockExam` had no notion of a global
 * situational quota, so it satisfied each band's split and then ran the pool
 * dry — a 60-item mock came out 13/60 situational against an 80% target.
 * Fixing the allocator alone was not enough, because the bank did not hold
 * enough easy and moderate situational items to fill the quota. These tests
 * pin both halves: the allocator must respect the quota, and the bank plus
 * drafts must be able to fill it.
 */

const bands = (questions: { difficulty: number }[]) => {
  const tally = { easy: 0, moderate: 0, difficult: 0 };
  for (const q of questions) {
    if (q.difficulty <= 2) tally.easy++;
    else if (q.difficulty <= 4) tally.moderate++;
    else tally.difficult++;
  }
  return tally;
};

const approvedLive = () => ALL_QUESTIONS.filter((q) => q.status === 'approved');

const withDraftsApproved = () => [
  ...approvedLive(),
  ...toPendingQuestions(DRAFT_QUESTIONS).accepted.map((q) => ({ ...q, status: 'approved' as const })),
];

describe('mock exam composition', () => {
  test('hits the difficulty quota, not just the per-band split', () => {
    const exam = buildMockExam({
      pool: withDraftsApproved(),
      count: 60,
      seed: 1,
      situationalShare: SITUATIONAL_SHARE.mock,
    });

    expect(bands(exam)).toEqual({ easy: 18, moderate: 30, difficult: 12 });
  });

  test('reaches the 80% situational target once the drafts are approved', () => {
    const exam = buildMockExam({
      pool: withDraftsApproved(),
      count: 60,
      seed: 1,
      situationalShare: SITUATIONAL_SHARE.mock,
    });

    const situational = exam.filter((q) => q.situational).length;
    expect(situational).toBe(48);
  });

  test('holds the quota across seeds, not just one lucky draw', () => {
    for (const seed of [1, 7, 42, 12345, 99999]) {
      const exam = buildMockExam({
        pool: withDraftsApproved(),
        count: 60,
        seed,
        situationalShare: SITUATIONAL_SHARE.mock,
      });
      expect(bands(exam), `seed ${seed}`).toEqual({ easy: 18, moderate: 30, difficult: 12 });
    }
  });

  test('the drafts are what close the gap, and without them the quota cannot be met', () => {
    // Documents the original defect rather than only the fix: with the live
    // bank alone, a 60-item mock is badly short of both quotas. If this test
    // ever starts passing on its own, the live bank has grown enough to stand
    // without the drafts and this file should be reconsidered.
    const exam = buildMockExam({
      pool: approvedLive(),
      count: 60,
      seed: 1,
      situationalShare: SITUATIONAL_SHARE.mock,
    });

    expect(exam.filter((q) => q.situational).length).toBeLessThan(48);
  });
});
