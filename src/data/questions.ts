import type { Question } from '../types/content';
import { SEED_QUESTIONS } from './seedQuestions';
import { SITUATIONAL_QUESTIONS } from './situationalQuestions';
import { ADDITIONAL_QUESTIONS } from './additionalQuestions';

/**
 * The whole approved question bank.
 *
 * Three files, one bank:
 *  - seedQuestions.ts        the original straight items, all difficulty bands
 *  - situationalQuestions.ts vignette-then-question items in the real exam's shape
 *  - additionalQuestions.ts  coverage for the topics that were thin
 *
 * When a backend arrives this is the single place that changes — pages read the
 * bank through `useContent`, never from these files directly.
 */
export const ALL_QUESTIONS: readonly Question[] = [
  ...SEED_QUESTIONS,
  ...SITUATIONAL_QUESTIONS,
  ...ADDITIONAL_QUESTIONS,
];

export const QUESTION_COUNTS = {
  straight: SEED_QUESTIONS.length,
  situational: SITUATIONAL_QUESTIONS.length,
  additional: ADDITIONAL_QUESTIONS.length,
  total: ALL_QUESTIONS.length,
} as const;

export { SEED_QUESTIONS, SITUATIONAL_QUESTIONS, ADDITIONAL_QUESTIONS };
