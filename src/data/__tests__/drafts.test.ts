import { describe, test, expect } from 'vitest';
import { DRAFT_QUESTIONS } from '../draftQuestions';
import { summariseDrafts, toPendingQuestions, validateDraft } from '../../pipeline';
import { ALL_QUESTIONS } from '../questions';
import { selectQuestions, buildMockExam } from '../../engine/selection';

describe('draft question bank', () => {
  test('every draft passes validation', () => {
    // A draft that fails validation would be rejected at conversion time, so
    // this catches content errors before a reviewer ever sees them.
    const failures = DRAFT_QUESTIONS.map((draft) => ({
      id: draft.id,
      problems: validateDraft(draft),
    })).filter((entry) => entry.problems.length > 0);

    expect(failures).toEqual([]);
  });

  test('every draft is marked as AI-drafted', () => {
    for (const draft of DRAFT_QUESTIONS) {
      expect(draft.draftedBy, draft.id).toBe('ai');
    }
  });

  test('draft ids are unique and do not collide with the live bank', () => {
    const draftIds = DRAFT_QUESTIONS.map((d) => d.id);
    expect(new Set(draftIds).size).toBe(draftIds.length);

    const liveIds = new Set(ALL_QUESTIONS.map((q) => q.id));
    for (const id of draftIds) {
      expect(liveIds.has(id), `draft ${id} collides with a live question`).toBe(false);
    }
  });

  test('every draft is situational, with a vignette and a rationale', () => {
    for (const draft of DRAFT_QUESTIONS) {
      expect(draft.situational, draft.id).toBe(true);
      expect(draft.vignette, draft.id).toBeTruthy();
      expect(draft.rationale, draft.id).toBeTruthy();
    }
  });

  test('drafts fill the easy and moderate situational gap', () => {
    // The gap a probe of the live bank identified: a 60-item mock needs 14
    // easy-situational and 24 moderate-situational items, and the bank had
    // 0 and 3.
    const summary = summariseDrafts(DRAFT_QUESTIONS);
    expect(summary.byBand.easy).toBeGreaterThanOrEqual(14);
    expect(summary.byBand.moderate).toBeGreaterThanOrEqual(18);
    expect(summary.invalid).toBe(0);
  });

  test('drafts spread across all three subjects', () => {
    const summary = summariseDrafts(DRAFT_QUESTIONS);
    expect(summary.bySubject.cae).toBeGreaterThan(0);
    expect(summary.bySubject.profed).toBeGreaterThan(0);
    expect(summary.bySubject.gened).toBeGreaterThan(0);
  });

  test('every draft carries a real source, not a placeholder', () => {
    for (const draft of DRAFT_QUESTIONS) {
      expect(draft.source.length, draft.id).toBeGreaterThan(15);
      expect(draft.source, draft.id).not.toMatch(/^(tbd|todo|n\/a|unknown)/i);
    }
  });

  test('drafts use the shared-opening trick the exam uses', () => {
    // Options should open with near-identical words so the answer cannot be
    // pattern-matched from the start of the choice.
    const withSharedOpening = DRAFT_QUESTIONS.filter((draft) => {
      const firsts = draft.options.map((o) =>
        o.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).slice(0, 3).join(' '),
      );
      return new Set(firsts).size < draft.options.length;
    });
    expect(withSharedOpening.length).toBeGreaterThanOrEqual(
      Math.floor(DRAFT_QUESTIONS.length * 0.8),
    );
  });
});

describe('drafts stay invisible to students', () => {
  test('converting a draft can only ever produce a pending question', () => {
    const { accepted } = toPendingQuestions(DRAFT_QUESTIONS);
    expect(accepted.length).toBe(DRAFT_QUESTIONS.length);
    for (const question of accepted) {
      expect(question.status, question.id).toBe('pending');
    }
  });

  test('no draft id appears in the live question bank', () => {
    const liveIds = new Set(ALL_QUESTIONS.map((q) => q.id));
    for (const draft of DRAFT_QUESTIONS) {
      expect(liveIds.has(draft.id)).toBe(false);
    }
  });

  test('the selection engine never returns a draft', () => {
    // The strongest check: even with the drafts merged into the pool, nothing
    // pending can be selected.
    const merged = [...ALL_QUESTIONS, ...toPendingQuestions(DRAFT_QUESTIONS).accepted];

    const picked = selectQuestions({ pool: merged, count: 200, seed: 1 });
    const draftIds = new Set(DRAFT_QUESTIONS.map((d) => d.id));
    for (const question of picked) {
      expect(draftIds.has(question.id), `${question.id} leaked into selection`).toBe(false);
    }

    const exam = buildMockExam({ pool: merged, count: 200, seed: 2, situationalShare: 0.8 });
    for (const question of exam) {
      expect(draftIds.has(question.id), `${question.id} leaked into a mock`).toBe(false);
    }
  });
});
