import { describe, test, expect } from 'vitest';
import { SEED_QUESTIONS } from '../seedQuestions';
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
    const ids = SEED_QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('every question has exactly four options', () => {
    for (const q of SEED_QUESTIONS) {
      expect(q.options, q.id).toHaveLength(4);
    }
  });

  test('no option is empty or duplicated within a question', () => {
    for (const q of SEED_QUESTIONS) {
      for (const option of q.options) {
        expect(option.trim().length, q.id).toBeGreaterThan(0);
      }
      expect(new Set(q.options).size, q.id).toBe(4);
    }
  });

  test('correctIndex is a valid option index', () => {
    for (const q of SEED_QUESTIONS) {
      expect([0, 1, 2, 3], q.id).toContain(q.correctIndex);
    }
  });

  test('every question points at a real subject and topic', () => {
    const subjectIds = new Set(SUBJECTS.map((s) => s.id));
    const topicById = new Map(TOPICS.map((t) => [t.id, t]));

    for (const q of SEED_QUESTIONS) {
      expect(subjectIds.has(q.subjectId), `${q.id} subject ${q.subjectId}`).toBe(true);
      const topic = topicById.get(q.topicId);
      expect(topic, `${q.id} topic ${q.topicId}`).toBeDefined();
      // The topic must live under the same subject, or progress rolls up wrong.
      expect(q.subjectId, `${q.id} subject/topic mismatch`).toBe(topic?.subjectId);
    }
  });

  test('every question carries an explanation worth reading', () => {
    for (const q of SEED_QUESTIONS) {
      expect(q.explanation.length, q.id).toBeGreaterThan(30);
    }
  });

  test('difficulty is on the 1-5 ladder', () => {
    for (const q of SEED_QUESTIONS) {
      expect([1, 2, 3, 4, 5], q.id).toContain(q.difficulty);
    }
  });

  test('the bank is large enough for a 20-item session at every phase', () => {
    expect(SEED_QUESTIONS.length).toBeGreaterThanOrEqual(20);
  });

  test('covers all three LET subjects', () => {
    const covered = new Set(SEED_QUESTIONS.map((q) => q.subjectId));
    for (const subject of SUBJECTS) {
      expect(covered.has(subject.id), `no questions for ${subject.id}`).toBe(true);
    }
  });

  test('covers all five Culture and Arts Education areas', () => {
    const caeTopics = TOPICS.filter((t) => t.subjectId === 'cae').map((t) => t.id);
    const covered = new Set(SEED_QUESTIONS.filter((q) => q.subjectId === 'cae').map((q) => q.topicId));
    for (const topicId of caeTopics) {
      expect(covered.has(topicId), `no CAE questions for ${topicId}`).toBe(true);
    }
  });

  test('spans the whole difficulty ladder', () => {
    const levels = new Set(SEED_QUESTIONS.map((q) => q.difficulty));
    expect([...levels].sort()).toEqual([1, 2, 3, 4, 5]);
  });

  test('researched questions cite a source', () => {
    // The plan requires the reference to be tracked for researched questions.
    for (const q of SEED_QUESTIONS) {
      expect(q.source, q.id).toBeTruthy();
    }
  });

  test('every seeded question is approved', () => {
    for (const q of SEED_QUESTIONS) {
      expect(q.status, q.id).toBe('approved');
    }
  });

  test('the correct answer is not always in the same position', () => {
    // A bank where every answer is option A is not a usable bank.
    const positions = new Set(SEED_QUESTIONS.map((q) => q.correctIndex));
    expect(positions.size).toBeGreaterThan(1);
  });
});
