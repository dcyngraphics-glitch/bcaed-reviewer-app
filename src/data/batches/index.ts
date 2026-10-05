import type { QuestionDraft } from '../../pipeline';

/**
 * Aggregated AI-drafted question batches.
 *
 * Every batch is written to `status: 'pending'` through `draftToQuestion`, and
 * the selection engine's `eligible()` only ever returns approved questions — so
 * nothing in this directory can reach a student's practice or exam until a
 * human moves it into a live bank file. See `/admin/review-queue`.
 *
 * Batches exist because the bank was measured, not assumed: a 350-item mock at
 * the PRC graded ramp needs 105 easy / 175 moderate / 70 difficult and roughly
 * 280 situational items, and the bank held 23 / 79 / 56 and 46.
 */

export { DRAFT_QUESTIONS } from '../draftQuestions';

export const BATCHES: readonly QuestionDraft[][] = [];

export const ALL_DRAFTS: readonly QuestionDraft[] = [...BATCHES].flat();
