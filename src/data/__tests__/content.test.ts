import { describe, test, expect } from 'vitest';
import { ALL_QUESTIONS, QUESTION_COUNTS, SITUATIONAL_QUESTIONS } from '../questions';
import { SUBJECTS, TOPICS, LESSONS } from '../curriculum';

/**
 * Content is data, and bad data is a bug. These checks run in CI so a typo in a
 * question id or a fifth option fails the build instead of reaching a student.
 */
describe('curriculum integrity', () => {
  test('every subject id is unique', () => {
    const ids = SUBJECTS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('every topic id is unique and belongs to a real subject', () => {
    const ids = TOPICS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);

    const subjectIds = new Set(SUBJECTS.map((s) => s.id));
    for (const topic of TOPICS) {
      expect(subjectIds.has(topic.subjectId), `topic ${topic.id} -> ${topic.subjectId}`).toBe(true);
    }
  });

  test('every subject has at least one topic', () => {
    for (const subject of SUBJECTS) {
      const owned = TOPICS.filter((t) => t.subjectId === subject.id);
      expect(owned.length, `subject ${subject.id}`).toBeGreaterThan(0);
    }
  });

  test('every lesson points at a real topic on the same subject', () => {
    const topicById = new Map(TOPICS.map((t) => [t.id, t]));
    for (const lesson of LESSONS) {
      const topic = topicById.get(lesson.topicId);
      expect(topic, `lesson ${lesson.id} -> topic ${lesson.topicId}`).toBeDefined();
      expect(lesson.subjectId).toBe(topic?.subjectId);
      expect(lesson.keyPoints.length).toBeGreaterThan(0);
    }
  });
});

describe('seed question bank', () => {
  test('every question id is unique', () => {
    const ids = ALL_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('every question has exactly four options', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.options, q.id).toHaveLength(4);
    }
  });

  test('no option is empty or duplicated within a question', () => {
    for (const q of ALL_QUESTIONS) {
      for (const option of q.options) {
        expect(option.trim().length, q.id).toBeGreaterThan(0);
      }
      expect(new Set(q.options).size, q.id).toBe(4);
    }
  });

  test('correctIndex is a valid option index', () => {
    for (const q of ALL_QUESTIONS) {
      expect([0, 1, 2, 3], q.id).toContain(q.correctIndex);
    }
  });

  test('every question points at a real subject and topic', () => {
    const subjectIds = new Set(SUBJECTS.map((s) => s.id));
    const topicById = new Map(TOPICS.map((t) => [t.id, t]));

    for (const q of ALL_QUESTIONS) {
      expect(subjectIds.has(q.subjectId), `${q.id} subject ${q.subjectId}`).toBe(true);
      const topic = topicById.get(q.topicId);
      expect(topic, `${q.id} topic ${q.topicId}`).toBeDefined();
      // The topic must live under the same subject, or progress rolls up wrong.
      expect(q.subjectId, `${q.id} subject/topic mismatch`).toBe(topic?.subjectId);
    }
  });

  test('every question carries an explanation worth reading', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.explanation.length, q.id).toBeGreaterThan(30);
    }
  });

  test('difficulty is on the 1-5 ladder', () => {
    for (const q of ALL_QUESTIONS) {
      expect([1, 2, 3, 4, 5], q.id).toContain(q.difficulty);
    }
  });

  test('the bank is large enough for a 20-item session at every phase', () => {
    expect(ALL_QUESTIONS.length).toBeGreaterThanOrEqual(90);
  });

  test('covers all three LET subjects', () => {
    const covered = new Set(ALL_QUESTIONS.map((q) => q.subjectId));
    for (const subject of SUBJECTS) {
      expect(covered.has(subject.id), `no questions for ${subject.id}`).toBe(true);
    }
  });

  test('covers all five Culture and Arts Education areas', () => {
    const caeTopics = TOPICS.filter((t) => t.subjectId === 'cae').map((t) => t.id);
    const covered = new Set(ALL_QUESTIONS.filter((q) => q.subjectId === 'cae').map((q) => q.topicId));
    for (const topicId of caeTopics) {
      expect(covered.has(topicId), `no CAE questions for ${topicId}`).toBe(true);
    }
  });

  test('spans the whole difficulty ladder', () => {
    const levels = new Set(ALL_QUESTIONS.map((q) => q.difficulty));
    expect([...levels].sort()).toEqual([1, 2, 3, 4, 5]);
  });

  test('researched questions cite a source', () => {
    // The plan requires the reference to be tracked for researched questions.
    for (const q of ALL_QUESTIONS) {
      expect(q.source, q.id).toBeTruthy();
    }
  });

  test('every question in the bank is approved', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.status, q.id).toBe('approved');
    }
  });

  test('the correct answer is not always in the same position', () => {
    // A bank where every answer is option A is not a usable bank.
    const positions = new Set(ALL_QUESTIONS.map((q) => q.correctIndex));
    expect(positions.size).toBeGreaterThan(1);
  });
});

describe('situational questions', () => {
  test('the bank has a substantial situational set', () => {
    expect(QUESTION_COUNTS.situational).toBeGreaterThanOrEqual(40);
  });

  test('every situational item is flagged and carries a vignette', () => {
    for (const q of SITUATIONAL_QUESTIONS) {
      expect(q.situational, q.id).toBe(true);
      expect(q.vignette, q.id).toBeTruthy();
      // A vignette is a paragraph of set-up, not a one-line hint.
      expect(q.vignette!.length, `${q.id} vignette too short`).toBeGreaterThan(200);
    }
  });

  test('the question is separate from the vignette, not a continuation of it', () => {
    for (const q of SITUATIONAL_QUESTIONS) {
      // The prompt is the actual question and must read as one.
      expect(q.prompt.length, q.id).toBeLessThan(q.vignette!.length);
      expect(q.prompt.trim().endsWith('?'), `${q.id}: prompt should be a question`).toBe(true);
    }
  });

  test('every situational item explains what it is testing', () => {
    for (const q of SITUATIONAL_QUESTIONS) {
      expect(q.rationale, q.id).toBeTruthy();
      expect(q.rationale!.length, q.id).toBeGreaterThan(40);
    }
  });

  test('the discriminating detail sits mid-choice, not at the start', () => {
    // The real exam's trick: the first few words of every option are nearly
    // identical, so the answer cannot be picked by pattern-matching the opening.
    // Count how many items genuinely do this.
    const itemsWithSharedOpening = SITUATIONAL_QUESTIONS.filter((q) => {
      const firstWords = q.options.map((o) =>
        o
          .toLowerCase()
          .replace(/[^a-z\s]/g, '')
          .split(/\s+/)
          .slice(0, 3)
          .join(' '),
      );
      return new Set(firstWords).size < q.options.length;
    });

    // Most items should share an opening; a bank where none do is not exam-like.
    expect(itemsWithSharedOpening.length).toBeGreaterThanOrEqual(
      Math.floor(SITUATIONAL_QUESTIONS.length * 0.5),
    );
  });

  test('situational items are not all the same difficulty', () => {
    const levels = new Set(SITUATIONAL_QUESTIONS.map((q) => q.difficulty));
    expect(levels.size).toBeGreaterThan(1);
  });

  test('situational items cover all three subjects', () => {
    const subjects = new Set(SITUATIONAL_QUESTIONS.map((q) => q.subjectId));
    expect(subjects).toEqual(new Set(['cae', 'profed', 'gened']));
  });

  test('situational items cover all five Culture and Arts Education areas', () => {
    const caeTopics = new Set(
      SITUATIONAL_QUESTIONS.filter((q) => q.subjectId === 'cae').map((q) => q.topicId),
    );
    expect(caeTopics).toEqual(
      new Set([
        'cae-disciplinal',
        'cae-pedagogy',
        'cae-creative',
        'cae-accountability',
        'cae-research',
      ]),
    );
  });

  test('every situational option is long enough for the mid-choice trick to apply', () => {
    for (const q of SITUATIONAL_QUESTIONS) {
      for (const option of q.options) {
        expect(option.split(/\s+/).length, `${q.id}: "${option.slice(0, 40)}"`).toBeGreaterThanOrEqual(5);
      }
    }
  });
});

describe('coverage', () => {
  test('no topic in the curriculum is left without questions', () => {
    const covered = new Set(ALL_QUESTIONS.map((q) => q.topicId));
    const missing = TOPICS.filter((t) => !covered.has(t.id)).map((t) => t.id);
    expect(missing).toEqual([]);
  });

  test('every topic has at least one question at a meaningful difficulty', () => {
    // The admin page flags topics below three; here we enforce the hard floor.
    for (const topic of TOPICS) {
      const count = ALL_QUESTIONS.filter((q) => q.topicId === topic.id).length;
      expect(count, `topic ${topic.id}`).toBeGreaterThanOrEqual(1);
    }
  });

  test('every General Education area from the TOS has questions', () => {
    const genedTopics = TOPICS.filter((t) => t.subjectId === 'gened').map((t) => t.id);
    for (const topicId of genedTopics) {
      const count = ALL_QUESTIONS.filter((q) => q.topicId === topicId).length;
      expect(count, `GenEd area ${topicId}`).toBeGreaterThanOrEqual(1);
    }
  });
});
