import { describe, test, expect } from 'vitest';
import { BATCHES, ALL_DRAFTS } from '..';
import { DRAFT_QUESTIONS } from '../../draftQuestions';
import { summariseDrafts, toPendingQuestions, validateDraft } from '../../../pipeline';
import { ALL_QUESTIONS } from '../../questions';
import { selectQuestions, buildMockExam, buildLongPaper } from '../../../engine/selection';
import { SITUATIONAL_SHARE } from '../../../exam/composition';
import type { Question } from '../../../types/content';

/**
 * Batch drafts exist to close a measured gap, so these tests assert the gap
 * actually closes. A batch that is syntactically valid but lands on topics the
 * bank already covers well is wasted work, and the shortfall assertions below
 * are what catch that.
 */

const everything = (): Question[] => [
  ...ALL_QUESTIONS,
  ...toPendingQuestions([...DRAFT_QUESTIONS, ...ALL_DRAFTS]).accepted.map((q) => ({
    ...q,
    status: 'approved' as const,
  })),
];

describe('draft batches', () => {
  test('every batch item passes validation', () => {
    const failures = ALL_DRAFTS.map((draft) => ({
      id: draft.id,
      problems: validateDraft(draft),
    })).filter((entry) => entry.problems.length > 0);

    expect(failures).toEqual([]);
  });

  test('ids are unique across every draft, including the original file', () => {
    const ids = [...DRAFT_QUESTIONS, ...ALL_DRAFTS].map((d) => d.id);
    expect(new Set(ids).size, 'duplicate draft ids').toBe(ids.length);
  });

  test('no draft collides with a live question id', () => {
    const live = new Set(ALL_QUESTIONS.map((q) => q.id));
    for (const draft of ALL_DRAFTS) {
      expect(live.has(draft.id), `${draft.id} collides with a live question`).toBe(false);
    }
  });

  test('every batch item is a cited, situational, in-range draft', () => {
    for (const draft of ALL_DRAFTS) {
      expect(draft.draftedBy, draft.id).toBe('ai');
      expect(draft.situational, draft.id).toBe(true);
      expect(draft.vignette?.length ?? 0, draft.id).toBeGreaterThan(20);
      expect(draft.rationale?.length ?? 0, draft.id).toBeGreaterThan(10);
      expect(draft.source.length, draft.id).toBeGreaterThan(15);
      expect([2, 3, 4], draft.id).toContain(draft.difficulty);
      expect(draft.options.length, draft.id).toBe(4);
      expect(draft.correctIndex, draft.id).toBeGreaterThanOrEqual(0);
      expect(draft.correctIndex, draft.id).toBeLessThanOrEqual(3);
    }
  });

  test('the hidden-answer trick holds across the batches', () => {
    // The real exam shares the opening words of every choice so the answer
    // cannot be pattern-matched from the start. A batch that drops this trains
    // the wrong skill.
    const shared = ALL_DRAFTS.filter((draft) => {
      const openings = draft.options.map((o) =>
        o.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).slice(0, 3).join(' '),
      );
      return new Set(openings).size < draft.options.length;
    });

    expect(shared.length / ALL_DRAFTS.length).toBeGreaterThanOrEqual(0.8);
  });

  test('batches add the easy and moderate situational items the bank lacked', () => {
    const before = summariseDrafts(DRAFT_QUESTIONS);
    const after = summariseDrafts([...DRAFT_QUESTIONS, ...ALL_DRAFTS]);

    expect(after.byBand.easy).toBeGreaterThan(before.byBand.easy);
    expect(after.byBand.moderate).toBeGreaterThan(before.byBand.moderate);
    expect(after.invalid).toBe(0);
  });

  test('batches reach every GenEd topic the TOS names', () => {
    const genedTopics = [
      'gened-science',
      'gened-mathematics',
      'gened-filipino',
      'gened-communication',
      'gened-ethics',
      'gened-self',
      'gened-history',
      'gened-rizal',
      'gened-art',
      'gened-contemporary',
    ];

    const covered = new Set(
      ALL_DRAFTS.filter((d) => d.subjectId === 'gened').map((d) => d.topicId),
    );
    for (const topic of genedTopics) {
      expect(covered.has(topic), `no batch covers ${topic}`).toBe(true);
    }
  });
});

describe('drafts still cannot leak to students', () => {
  test('no draft id appears in the live bank', () => {
    const live = new Set(ALL_QUESTIONS.map((q) => q.id));
    for (const draft of ALL_DRAFTS) {
      expect(live.has(draft.id)).toBe(false);
    }
  });

  test('the selection engine never returns a draft, even merged into the pool', () => {
    const merged = everything();
    const draftIds = new Set(ALL_DRAFTS.map((d) => d.id));

    const picked = selectQuestions({ pool: merged, count: 200, seed: 1 });
    for (const q of picked) expect(draftIds.has(q.id), `${q.id} leaked`).toBe(false);

    const exam = buildMockExam({
      pool: merged,
      count: 200,
      seed: 2,
      situationalShare: SITUATIONAL_SHARE.mock,
    });
    for (const q of exam) expect(draftIds.has(q.id), `${q.id} leaked into a mock`).toBe(false);

    const paper = buildLongPaper({ pool: merged, count: 350, seed: 3 });
    for (const q of paper.items) expect(draftIds.has(q.id), `${q.id} leaked into a paper`).toBe(false);
  });
});

describe('the 350-item paper gets closer to fillable', () => {
  test('the shortfall shrinks as batches land', () => {
    const liveOnly = ALL_QUESTIONS.filter((q) => q.status === 'approved');
    const withBatches = everything();

    const before = buildLongPaper({ pool: liveOnly, count: 350, seed: 1 });
    const after = buildLongPaper({ pool: withBatches, count: 350, seed: 1 });

    expect(after.shortfall).toBeLessThan(before.shortfall);
    expect(after.items.length).toBeGreaterThan(before.items.length);
  });

  test('the easy band grows, since that was the binding constraint', () => {
    const band = (n: number) => (n <= 2 ? 'easy' : n <= 4 ? 'moderate' : 'difficult');
    const count = (pool: readonly Question[]) => {
      const t = { easy: 0, moderate: 0, difficult: 0 };
      for (const q of pool) t[band(q.difficulty)] += 1;
      return t;
    };

    const before = count(ALL_QUESTIONS.filter((q) => q.status === 'approved'));
    const after = count(everything());

    expect(after.easy - before.easy).toBeGreaterThanOrEqual(50);
  });
});
