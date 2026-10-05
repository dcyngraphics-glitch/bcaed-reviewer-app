import { describe, test, expect } from 'vitest';
import { ALL_DRAFTS } from '..';
import { DRAFT_QUESTIONS } from '../../draftQuestions';
import { summariseDrafts, toPendingQuestions, validateDraft } from '../../../pipeline';
import { ALL_QUESTIONS } from '../../questions';
import { TOPICS } from '../../curriculum';
import { selectQuestions, buildMockExam, buildLongPaper } from '../../../engine/selection';
import { SITUATIONAL_SHARE } from '../../../exam/composition';
import type { Question } from '../../../types/content';

/**
 * Batch drafts exist to close a measured gap, so these tests assert the gap
 * actually closes. A batch that is syntactically valid but lands on topics the
 * bank already covers well is wasted work, and the shortfall assertions below
 * are what catch that.
 */

const curriculumTopics = TOPICS.map((t) => t.id);

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

  test('batches reach every GenEd topic the curriculum defines', () => {
    // Read from the curriculum rather than hardcoding a list: an earlier
    // version of this test guessed `gened-art` and `gened-contemporary`, which
    // are not real topic ids, and so failed against correct content.
    const genedTopics = curriculumTopics.filter((t) => t.startsWith('gened-'));
    expect(genedTopics.length).toBe(10);

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

  test('a draft marked pending never appears, however it enters the pool', () => {
    // The point of the gate is that status, not file location, decides visibility.
    // So merge the raw drafts into the pool still carrying status 'pending' — if
    // any engine path ever stopped filtering on status, this would catch it.
    const draftsAsPending = toPendingQuestions(ALL_DRAFTS).accepted;
    expect(draftsAsPending.length).toBe(ALL_DRAFTS.length);

    const polluted = [...ALL_QUESTIONS, ...draftsAsPending];
    const draftIds = new Set(ALL_DRAFTS.map((d) => d.id));

    const picked = selectQuestions({ pool: polluted, count: 200, seed: 1 });
    for (const q of picked) expect(draftIds.has(q.id), `${q.id} leaked`).toBe(false);

    const exam = buildMockExam({
      pool: polluted,
      count: 200,
      seed: 2,
      situationalShare: SITUATIONAL_SHARE.mock,
    });
    for (const q of exam) expect(draftIds.has(q.id), `${q.id} leaked into a mock`).toBe(false);

    const paper = buildLongPaper({ pool: polluted, count: 350, seed: 3 });
    for (const q of paper.items) expect(draftIds.has(q.id), `${q.id} leaked into a paper`).toBe(false);
  });

  test('a draft only appears once it is explicitly approved', () => {
    // The other half of the gate: approval is what makes a draft usable, and it
    // has to be an explicit act rather than a side effect of being in a file.
    const draftIds = new Set(ALL_DRAFTS.map((d) => d.id));
    const exam = buildMockExam({
      pool: everything(),
      count: 350,
      seed: 5,
      situationalShare: SITUATIONAL_SHARE.mock,
    });

    const served = new Set(exam.map((q) => q.id));
    const servedDrafts = [...served].filter((id) => draftIds.has(id));
    expect(servedDrafts.length).toBeGreaterThan(0);
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
