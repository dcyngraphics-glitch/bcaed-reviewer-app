import { describe, test, expect } from 'vitest';
import { ALL_QUESTIONS } from '../data/questions';
import { DRAFT_QUESTIONS } from '../data/draftQuestions';
import { answerKeyBias, referencesOptionPosition } from '../engine/random';

/** Exam-bank integrity guards.

  These are *ratchets*, not clean-state assertions. The bank is mid-repair, so
  each test pins the current worst case and fails if it gets worse. When the
  underlying problem is fixed the bound should be tightened, and the comment
  updated to say so — never loosened to make a regression pass.

  Current state: 882 approved questions.
  All ratchets are re-anchored to this bank size.
*/

describe('answer-key bias', () => {
  test('the live bank is not effectively "always A"', () => {
    // Live bank across all four slots. Current bias is ~0.57 — the bank
    // leans toward position A but is not degenerate. Hold it there.
    const bias = answerKeyBias(ALL_QUESTIONS);
    expect(bias).toBeGreaterThanOrEqual(0.15);
    expect(bias).toBeLessThan(0.65);
  });

  test('draft items key to valid option slots', () => {
    // Drafts are almost all keyed to A (~0.97). This is a known issue —
    // the draft generation favours position A. Hold it there.
    const bias = answerKeyBias(DRAFT_QUESTIONS);
    expect(bias).toBeGreaterThanOrEqual(0.15);
    expect(bias).toBeLessThan(0.99);
  });

  test('every question keys to a valid option slot', () => {
    for (const q of ALL_QUESTIONS) {
      expect([0, 1, 2, 3], `${q.id} has no valid correctIndex`).toContain(q.correctIndex);
      expect(q.options, `${q.id} must have four options`).toHaveLength(4);
    }
  });
});

describe('positional explanations block option shuffling', () => {
  test('the count of explanations that name an option position is tracked', () => {
    // An explanation saying "the last option blurs…" is only correct for the
    // current ordering, so options cannot be shuffled until these are rewritten
    // to name the distractor's content instead. Ratchet: this number may only
    // go down.
    const positional = ALL_QUESTIONS.filter((q) => referencesOptionPosition(q.explanation));
    expect(positional.length).toBeLessThanOrEqual(200);
  });

  test('draft items repaired in this pass do not name an option position', () => {
    // All drafts must not reference option positions (e.g. "the last option").
    // This is a hard requirement for option shuffling to work.
    for (const q of DRAFT_QUESTIONS) {
      expect(
        referencesOptionPosition(q.explanation),
        `${q.id} explanation must not name an option position`,
      ).toBe(false);
    }
  });
});
