import { describe, test, expect } from 'vitest';
import {
  draftToQuestion,
  validateDraft,
  summariseDrafts,
  draftsByTopic,
  type QuestionDraft,
} from '..';
import { SUBJECTS, TOPICS } from '../../data/curriculum';

const validDraft = (overrides: Partial<QuestionDraft> = {}): QuestionDraft => ({
  id: 'draft-001',
  subjectId: 'cae',
  topicId: 'cae-disciplinal',
  difficulty: 2,
  prompt: 'Which of the following is the defining feature of the Tinikling dance?',
  options: ['A answer', 'B answer', 'C answer', 'D answer'],
  correctIndex: 1,
  explanation: 'Tinikling uses bamboo poles clapped on the ground while dancers step between them.',
  source: 'Philippine folk dance literature',
  draftedBy: 'ai',
  ...overrides,
});

describe('validateDraft', () => {
  test('accepts a well-formed draft', () => {
    expect(validateDraft(validDraft())).toEqual([]);
  });

  test('rejects a draft with the wrong number of options', () => {
    const problems = validateDraft(validDraft({ options: ['A', 'B', 'C'] }));
    expect(problems.join(' ')).toMatch(/four options/i);
  });

  test('rejects a correctIndex outside 0-3', () => {
    const problems = validateDraft(validDraft({ correctIndex: 7 as 0 }));
    expect(problems.join(' ')).toMatch(/correctIndex/i);
  });

  test('rejects an unknown subject or topic', () => {
    expect(validateDraft(validDraft({ subjectId: 'nope' })).join(' ')).toMatch(/subject/i);
    expect(validateDraft(validDraft({ topicId: 'nope' })).join(' ')).toMatch(/topic/i);
  });

  test('rejects a topic that belongs to a different subject', () => {
    // cae-disciplinal is a CAE topic, so pairing it with profed is a data error.
    const problems = validateDraft(validDraft({ subjectId: 'profed' }));
    expect(problems.join(' ')).toMatch(/does not belong/i);
  });

  test('rejects a missing or too-short source', () => {
    // The plan requires a tracked reference for researched questions.
    expect(validateDraft(validDraft({ source: '' })).join(' ')).toMatch(/source/i);
    expect(validateDraft(validDraft({ source: 'web' })).join(' ')).toMatch(/source/i);
  });

  test('rejects a thin explanation', () => {
    const problems = validateDraft(validDraft({ explanation: 'Because.' }));
    expect(problems.join(' ')).toMatch(/explanation/i);
  });

  test('rejects a too-short prompt', () => {
    expect(validateDraft(validDraft({ prompt: 'What?' })).join(' ')).toMatch(/prompt/i);
  });

  test('rejects duplicate options', () => {
    const problems = validateDraft(
      validDraft({ options: ['Same', 'Same', 'Third', 'Fourth'] }),
    );
    expect(problems.join(' ')).toMatch(/duplicate/i);
  });

  test('rejects a difficulty outside the 1-5 ladder', () => {
    expect(validateDraft(validDraft({ difficulty: 9 as 1 })).join(' ')).toMatch(/difficulty/i);
  });

  test('requires a vignette when the draft is marked situational', () => {
    const problems = validateDraft(validDraft({ situational: true }));
    expect(problems.join(' ')).toMatch(/vignette/i);
  });

  test('accepts a situational draft that has a vignette and rationale', () => {
    const problems = validateDraft(
      validDraft({
        situational: true,
        vignette: 'A'.repeat(220),
        rationale: 'This tests whether the student can distinguish the two awards.',
      }),
    );
    expect(problems).toEqual([]);
  });

  test('collects every problem rather than stopping at the first', () => {
    const problems = validateDraft(
      validDraft({ options: ['A'], correctIndex: 9 as 0, explanation: 'x', source: '' }),
    );
    expect(problems.length).toBeGreaterThanOrEqual(3);
  });
});

describe('draftToQuestion', () => {
  test('marks the resulting question as pending, never approved', () => {
    // The plan is explicit: AI-drafted questions must pass admin review before
    // they can appear in practice or an exam.
    const q = draftToQuestion(validDraft());
    expect(q.status).toBe('pending');
  });

  test('carries every field across', () => {
    const draft = validDraft();
    const q = draftToQuestion(draft);
    expect(q).toMatchObject({
      id: draft.id,
      subjectId: draft.subjectId,
      topicId: draft.topicId,
      difficulty: draft.difficulty,
      prompt: draft.prompt,
      correctIndex: draft.correctIndex,
      explanation: draft.explanation,
      source: draft.source,
    });
    expect(q.options).toEqual(draft.options);
  });

  test('records who drafted it', () => {
    expect(draftToQuestion(validDraft({ draftedBy: 'ai' })).draftedBy).toBe('ai');
    expect(draftToQuestion(validDraft({ draftedBy: 'human' })).draftedBy).toBe('human');
  });
});

describe('summariseDrafts', () => {
  test('counts drafts by subject, difficulty band and style', () => {
    const drafts = [
      validDraft({ id: 'a', subjectId: 'cae', topicId: 'cae-disciplinal', difficulty: 1 }),
      validDraft({ id: 'b', subjectId: 'cae', topicId: 'cae-disciplinal', difficulty: 5, situational: true, vignette: 'V'.repeat(220), rationale: 'R'.repeat(50) }),
      validDraft({ id: 'c', subjectId: 'gened', topicId: 'gened-mathematics', difficulty: 3 }),
    ];
    const s = summariseDrafts(drafts);
    expect(s.total).toBe(3);
    expect(s.bySubject.cae).toBe(2);
    expect(s.bySubject.gened).toBe(1);
    expect(s.byBand.easy).toBe(1);
    expect(s.byBand.moderate).toBe(1);
    expect(s.byBand.difficult).toBe(1);
    expect(s.situational).toBe(1);
  });

  test('handles an empty list', () => {
    const s = summariseDrafts([]);
    expect(s.total).toBe(0);
    expect(s.invalid).toBe(0);
  });

  test('reports how many drafts would fail validation', () => {
    const drafts = [
      validDraft({ id: 'ok' }),
      validDraft({ id: 'bad', source: '' }),
      validDraft({ id: 'bad2', options: ['A'] }),
    ];
    expect(summariseDrafts(drafts).invalid).toBe(2);
  });
});

describe('draftsByTopic', () => {
  test('groups drafts under their topic', () => {
    const drafts = [
      validDraft({ id: 'a', topicId: 'cae-disciplinal' }),
      validDraft({ id: 'b', topicId: 'cae-disciplinal' }),
      validDraft({ id: 'c', topicId: 'cae-pedagogy' }),
    ];
    const grouped = draftsByTopic(drafts);
    expect(grouped['cae-disciplinal']).toHaveLength(2);
    expect(grouped['cae-pedagogy']).toHaveLength(1);
  });
});

describe('curriculum wiring', () => {
  test('every topic id used in the tests exists in the curriculum', () => {
    // Guards the test fixtures themselves against drifting from the real data.
    const topicIds = new Set(TOPICS.map((t) => t.id));
    const subjectIds = new Set(SUBJECTS.map((s) => s.id));
    expect(topicIds.has('cae-disciplinal')).toBe(true);
    expect(subjectIds.has('cae')).toBe(true);
  });
});
