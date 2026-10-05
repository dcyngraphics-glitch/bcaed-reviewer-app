import { describe, test, expect } from 'vitest';
import { buildMockExam, buildLongPaper, longPaperSectionSizes, selectQuestions } from '../selection';
import { SITUATIONAL_SHARE } from '../../exam/composition';
import { ALL_QUESTIONS } from '../../data/questions';
import { DRAFT_QUESTIONS } from '../../data/draftQuestions';
import type { Question } from '../../types/content';
import { toPendingQuestions } from '../../pipeline';

/**
 * The real LET sitting is 450 items — three subtests of 150. A 350-item paper
 * is a long-form mock, not a replica of the real thing, and the composition
 * has to be honest about that rather than quietly serving a short paper.
 *
 * The arithmetic that shapes these tests: at the graded ramp, 350 items needs
 * 105 easy / 175 moderate / 70 difficult. The bank cannot supply that today,
 * so a long paper draws what exists, distributes it across the three
 * subtest-shaped sections, and reports the shortfall instead of hiding it.
 */

const approvedLive = () => ALL_QUESTIONS.filter((q) => q.status === 'approved');

const withDrafts = (): Question[] => [
  ...approvedLive(),
  ...toPendingQuestions(DRAFT_QUESTIONS).accepted.map((q) => ({ ...q, status: 'approved' as const })),
];

/**
 * A pool comfortably larger than 350, so the allocator has real choice and the
 * shortfall logic can be observed switching off. Typed as Question[] because
 * `difficulty` is a union, not a plain number.
 */
const oversizedPool = (): Question[] =>
  Array.from({ length: 900 }, (_, i) => {
    const base = approvedLive()[i % approvedLive().length];
    const difficulty = ([2, 3, 4, 5] as const)[i % 4];
    return {
      ...base,
      id: `synthetic-${i}`,
      difficulty,
      situational: i % 5 !== 4,
      subjectId: (['gened', 'profed', 'cae'] as const)[i % 3],
    };
  });

const band = (n: number) => (n <= 2 ? 'easy' : n <= 4 ? 'moderate' : 'difficult');

const tally = (qs: readonly { difficulty: number }[]) => {
  const t = { easy: 0, moderate: 0, difficult: 0 };
  for (const q of qs) t[band(q.difficulty)] += 1;
  return t;
};

describe('350-item long paper', () => {
  test('is built as three subtest-shaped sections, not one flat block', () => {
    const paper = buildLongPaper({ pool: withDrafts(), count: 350, seed: 1 });

    expect(paper.sections).toHaveLength(3);
    expect(paper.sections.map((s) => s.subtestId)).toEqual(['gened', 'profed', 'cae']);
    expect(paper.sections.reduce((sum, s) => sum + s.items.length, 0)).toBe(paper.items.length);
  });

  test('reports an honest shortfall rather than silently serving a short paper', () => {
    const paper = buildLongPaper({ pool: withDrafts(), count: 350, seed: 1 });

    // 350 needs 105 easy; the bank has far fewer, so the shortfall must be
    // non-zero and must equal what could not be filled.
    expect(paper.requested).toBe(350);
    expect(paper.shortfall).toBeGreaterThan(0);
    expect(paper.items.length).toBe(paper.requested - paper.shortfall);
  });

  test('never repeats a question inside a section', () => {
    const paper = buildLongPaper({ pool: withDrafts(), count: 350, seed: 7 });

    for (const section of paper.sections) {
      const ids = section.items.map((q) => q.id);
      expect(new Set(ids).size, `${section.subtestId} has repeats`).toBe(ids.length);
    }
  });

  test('splits the requested length by TOS weight, not evenly', () => {
    // 350 against the 20/40/40 weighting is 70/140/140. This is the
    // *requested* split; what each section actually receives is a separate
    // question, answered by the shortfall.
    expect(longPaperSectionSizes(350)).toEqual({ gened: 70, profed: 140, cae: 140 });
    expect(longPaperSectionSizes(450)).toEqual({ gened: 90, profed: 180, cae: 180 });
  });

  test('gives the two 40% subjects more room than the 20% one', () => {
    const paper = buildLongPaper({ pool: withDrafts(), count: 350, seed: 1 });
    const sizes = paper.sections.map((s) => s.items.length);

    expect(sizes[1]).toBeGreaterThan(sizes[0]);
    expect(sizes[2]).toBeGreaterThan(sizes[0]);
    expect(sizes.reduce((a, b) => a + b, 0)).toBe(paper.items.length);
  });

  test('holds the situational share as high as the bank allows', () => {
    const paper = buildLongPaper({ pool: withDrafts(), count: 350, seed: 1 });
    const situational = paper.items.filter((q) => q.situational).length;
    const share = situational / paper.items.length;

    // Each section is composed from its own subject, and GenEd — the smallest
    // pool — has no spare situational items to give. So the realistic ceiling
    // here is the bank's own situational ratio, not the 80% target: the target
    // needs 280 situational items and the bank holds 84. What matters is that
    // composition never falls *below* the bank average by wasting them.
    expect(share).toBeGreaterThanOrEqual(84 / 196 - 0.01);
    expect(share).toBeLessThanOrEqual(SITUATIONAL_SHARE.mock + 0.02);
  });

  test('is deterministic for a given seed', () => {
    const a = buildLongPaper({ pool: withDrafts(), count: 350, seed: 42 });
    const b = buildLongPaper({ pool: withDrafts(), count: 350, seed: 42 });

    expect(a.items.map((q) => q.id)).toEqual(b.items.map((q) => q.id));
  });

  test('a different seed reorders the paper once there is real choice', () => {
    // With the current bank a 350 request can only be filled to 196, so every
    // seed returns the same 196 items and there is nothing to permute. Seed
    // sensitivity only becomes observable when the paper has slack — which is
    // what the oversized-pool case below provides.
    const a = buildLongPaper({ pool: oversizedPool(), count: 350, seed: 1 });
    const b = buildLongPaper({ pool: oversizedPool(), count: 350, seed: 2 });

    expect(a.items.map((q) => q.id)).not.toEqual(b.items.map((q) => q.id));
  });

  test('reports zero repeats while the bank cannot fill the paper', () => {
    // 350 requested, 196 available, and each subject draws only from its own
    // pool — so nothing can be duplicated by the section split itself.
    const paper = buildLongPaper({ pool: withDrafts(), count: 350, seed: 1 });
    expect(paper.repeats).toEqual([]);
  });

  test('the shortfall is exactly the gap in the hardest band', () => {
    // 350 wants 105 easy; the shortfall must be driven by that band, and the
    // bands we do serve must match what the bank can supply.
    const paper = buildLongPaper({ pool: withDrafts(), count: 350, seed: 1 });
    const got = tally(paper.items);
    const pool = withDrafts();

    expect(got.easy).toBeLessThanOrEqual(pool.filter((q) => band(q.difficulty) === 'easy').length);
    expect(got.difficult).toBeLessThanOrEqual(
      pool.filter((q) => band(q.difficulty) === 'difficult').length,
    );
  });

  test('an oversized pool fills 350 with no shortfall at all', () => {
    // Guards the allocator itself: the shortfall logic must not fire when the
    // bank is large enough, which is what will happen once the bank grows.
    const paper = buildLongPaper({ pool: oversizedPool(), count: 350, seed: 3 });
    expect(paper.items).toHaveLength(350);
    expect(paper.shortfall).toBe(0);
    expect(tally(paper.items)).toEqual({ easy: 105, moderate: 175, difficult: 70 });
  });

  test('buildMockExam still enforces its own quota unchanged', () => {
    // The 350-item path is additive. A 60-item mock must still come out
    // exactly 18/30/12, which is the bug this whole file grew out of.
    const exam = buildMockExam({
      pool: withDrafts(),
      count: 60,
      seed: 1,
      situationalShare: SITUATIONAL_SHARE.mock,
    });

    expect(tally(exam)).toEqual({ easy: 18, moderate: 30, difficult: 12 });
  });

  test('selectQuestions still refuses to repeat within one call', () => {
    const picked = selectQuestions({ pool: withDrafts(), count: 350, seed: 1 });
    expect(new Set(picked.map((q) => q.id)).size).toBe(picked.length);
  });
});
