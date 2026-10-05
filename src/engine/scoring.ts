import type { Difficulty } from '../types/content';

export type SessionMode = 'practice' | 'mock' | 'diagnostic' | 'mistakes';

export interface AnswerRecord {
  questionId: string;
  subjectId: string;
  topicId: string;
  difficulty: Difficulty;
  /** null when the student ran out of time or skipped. */
  chosenIndex: number | null;
  correctIndex: number;
}

export interface TopicPerformance {
  topicId: string;
  attempted: number;
  correct: number;
  accuracy: number;
}

export interface SubjectPerformance {
  subjectId: string;
  attempted: number;
  correct: number;
  accuracy: number;
}

export interface SessionResult {
  total: number;
  correct: number;
  wrong: number;
  unanswered: number;
  /** Integer percentage across the whole set, unanswered included. */
  accuracy: number;
  xpEarned: number;
  perfect: boolean;
  mistakes: AnswerRecord[];
  byTopic: TopicPerformance[];
  bySubject: SubjectPerformance[];
}

export const XP_PER_CORRECT = 10;

/** Finishing is worth something on its own; exams are worth more. */
const COMPLETION_BONUS: Record<SessionMode, number> = {
  practice: 15,
  mistakes: 20,
  diagnostic: 25,
  mock: 100,
};

const PERFECT_BONUS = 50;

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

function groupBy<T extends AnswerRecord>(
  answers: readonly AnswerRecord[],
  key: (a: AnswerRecord) => string,
  idField: 'topicId' | 'subjectId',
): T[] {
  const buckets = new Map<string, { attempted: number; correct: number }>();

  for (const answer of answers) {
    const k = key(answer);
    const bucket = buckets.get(k) ?? { attempted: 0, correct: 0 };
    bucket.attempted += 1;
    if (answer.chosenIndex === answer.correctIndex) bucket.correct += 1;
    buckets.set(k, bucket);
  }

  return [...buckets.entries()].map(([id, { attempted, correct }]) => ({
    [idField]: id,
    attempted,
    correct,
    accuracy: attempted > 0 ? round((correct / attempted) * 100) : 0,
  })) as T[];
}

/**
 * Grades one finished session. Pure: it takes the answers and returns the
 * result, so the same inputs always produce the same stored record.
 */
export function gradeSession(
  answers: readonly AnswerRecord[],
  { mode }: { mode: SessionMode },
): SessionResult {
  const total = answers.length;

  if (total === 0) {
    return {
      total: 0,
      correct: 0,
      wrong: 0,
      unanswered: 0,
      accuracy: 0,
      xpEarned: 0,
      perfect: false,
      mistakes: [],
      byTopic: [],
      bySubject: [],
    };
  }

  let correct = 0;
  let unanswered = 0;
  const mistakes: AnswerRecord[] = [];

  for (const answer of answers) {
    if (answer.chosenIndex === null) {
      unanswered += 1;
      mistakes.push(answer);
    } else if (answer.chosenIndex === answer.correctIndex) {
      correct += 1;
    } else {
      mistakes.push(answer);
    }
  }

  const wrong = total - correct - unanswered;
  const accuracy = Math.round((correct / total) * 100);
  const perfect = correct === total;

  const xpEarned =
    correct * XP_PER_CORRECT + COMPLETION_BONUS[mode] + (perfect ? PERFECT_BONUS : 0);

  return {
    total,
    correct,
    wrong,
    unanswered,
    accuracy,
    xpEarned,
    perfect,
    mistakes,
    byTopic: groupBy<TopicPerformance>(answers, (a) => a.topicId, 'topicId'),
    bySubject: groupBy<SubjectPerformance>(answers, (a) => a.subjectId, 'subjectId'),
  };
}
