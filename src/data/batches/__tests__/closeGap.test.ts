import { describe, test, expect } from 'vitest';
import { buildLongPaper } from '../../../engine/selection';
import { ALL_QUESTIONS } from '../../questions';
import { DRAFT_QUESTIONS } from '../../draftQuestions';
import { ALL_DRAFTS } from '..';
import { toPendingQuestions } from '../../../pipeline';
import type { Question } from '../../../types/content';

/**
 * The last content gap, now closed.
 *
 * A 350-item paper's ProfEd and CAE sections each want 140 items. The binding
 * constraint turned out to be the EASY band, not the total: a 140-item section
 * has a 42-item easy quota, and both subjects were short of it.
 *
 * When this file was first written the shortfall was 73 (ProfEd) and 56 (CAE).
 * It then narrowed to 48/31, then 24/8, and is now 0/0.
 */

const live = (): Question[] => ALL_QUESTIONS.filter((q) => q.status === 'approved');

const allApproved = (): Question[] => [
  ...live(),
  ...toPendingQuestions([...DRAFT_QUESTIONS, ...ALL_DRAFTS]).accepted.map((q) => ({
    ...q,
    status: 'approved' as const,
  })),
];

const section = (pool: readonly Question[], id: 'gened' | 'profed' | 'cae') =>
  buildLongPaper({ pool, count: 350, seed: 1 }).sections.find((s) => s.subtestId === id)!;

describe('closing the 350-item paper', () => {
  test('ProfEd reaches its full 140-item section', () => {
    expect(section(allApproved(), 'profed').shortfall).toBe(0);
  });

  test('CAE reaches its full 140-item section', () => {
    expect(section(allApproved(), 'cae').shortfall).toBe(0);
  });

  test('GenEd stays full', () => {
    expect(section(allApproved(), 'gened').shortfall).toBe(0);
  });

  test('the 350-item paper is now fillable with no repeats', () => {
    const paper = buildLongPaper({ pool: allApproved(), count: 350, seed: 1 });

    expect(paper.shortfall).toBe(0);
    expect(paper.items).toHaveLength(350);
    expect(paper.repeats).toEqual([]);
  });

  test('the 450-item real exam is 67 items short, and reports it', () => {
    // The real sitting is 450 items. The bank holds 383 usable items, so a
    // 450-item paper cannot be filled without repetition. Pinned as a number so
    // the next content batch has a measured target: 67 more items would make the
    // real exam length reachable.
    const paper = buildLongPaper({ pool: allApproved(), count: 450, seed: 1 });

    expect(paper.shortfall).toBe(67);
    expect(paper.items).toHaveLength(383);
    expect(paper.items.length).toBe(paper.requested - paper.shortfall);
  });

  test('the live bank alone still cannot fill it, so drafts are not silently promoted', () => {
    const paper = buildLongPaper({ pool: live(), count: 350, seed: 1 });
    expect(paper.shortfall).toBeGreaterThan(0);
  });
});
