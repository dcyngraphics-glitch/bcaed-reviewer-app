import { useMemo } from 'react';
import { SUBJECTS, TOPICS, LESSONS } from '../data/curriculum';
import { ALL_QUESTIONS } from '../data/questions';

/** Display-name maps, built once. */
const topicNames: Record<string, string> = Object.fromEntries(
  TOPICS.map((topic) => [topic.id, topic.name]),
);
const subjectNames: Record<string, string> = Object.fromEntries(
  SUBJECTS.map((subject) => [subject.id, subject.name]),
);
const lessonById = new Map(LESSONS.map((lesson) => [lesson.id, lesson]));

export interface ContentApi {
  subjects: typeof SUBJECTS;
  topics: typeof TOPICS;
  lessons: typeof LESSONS;
  questions: typeof ALL_QUESTIONS;
  topicNames: Record<string, string>;
  subjectNames: Record<string, string>;
  topicsFor: (subjectId: string) => typeof TOPICS;
  questionsFor: (filter: { subjectId?: string; topicId?: string }) => typeof ALL_QUESTIONS;
  lessonsFor: (filter: { subjectId?: string; topicId?: string }) => typeof LESSONS;
  questionCountFor: (filter: { subjectId?: string; topicId?: string }) => number;
  lessonById: (id: string) => (typeof LESSONS)[number] | undefined;
}

/**
 * Reads the content bank.
 *
 * Today this returns the bundled question bank (seed + situational +
 * additional). When an admin-editable backend
 * arrives, this is the single seam that changes — pages never import the data
 * files directly.
 */
export function useContent(): ContentApi {
  return useMemo<ContentApi>(() => {
    const questionsFor = (filter: { subjectId?: string; topicId?: string }) =>
      ALL_QUESTIONS.filter((question) => {
        if (question.status !== 'approved') return false;
        if (filter.subjectId && question.subjectId !== filter.subjectId) return false;
        if (filter.topicId && question.topicId !== filter.topicId) return false;
        return true;
      });

    const lessonsFor = (filter: { subjectId?: string; topicId?: string }) =>
      LESSONS.filter((lesson) => {
        if (filter.subjectId && lesson.subjectId !== filter.subjectId) return false;
        if (filter.topicId && lesson.topicId !== filter.topicId) return false;
        return true;
      });

    return {
      subjects: SUBJECTS,
      topics: TOPICS,
      lessons: LESSONS,
      questions: ALL_QUESTIONS,
      topicNames,
      subjectNames,
      topicsFor: (subjectId: string) => TOPICS.filter((topic) => topic.subjectId === subjectId),
      questionsFor,
      lessonsFor,
      questionCountFor: (filter) => questionsFor(filter).length,
      lessonById: (id: string) => lessonById.get(id),
    };
  }, []);
}
