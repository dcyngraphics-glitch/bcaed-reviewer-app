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

import BATCH_SCIENCE from './batchScience';
import BATCH_MATH from './batchMath';
import BATCH_MATH_2 from './batchMath2';
import BATCH_GENED from './batchGened';
import BATCH_WORLD from './batchWorld';
import BATCH_PROFED_1 from './batchProfEd1';
import BATCH_PROFED_2 from './batchProfEd2';
import BATCH_CAE from './batchCAE';
import BATCH_PROFED_3 from './batchProfEd3';
import BATCH_CAE_2 from './batchCAE2';
import BATCH_PROFED_4 from './batchProfEd4';
import BATCH_CAE_3 from './batchCAE3';

export {
  BATCH_SCIENCE,
  BATCH_MATH,
  BATCH_MATH_2,
  BATCH_GENED,
  BATCH_WORLD,
  BATCH_PROFED_1,
  BATCH_PROFED_2,
  BATCH_CAE,
  BATCH_PROFED_3,
  BATCH_CAE_2,
  BATCH_PROFED_4,
  BATCH_CAE_3,
};

export const BATCHES: readonly (readonly QuestionDraft[])[] = [
  BATCH_SCIENCE,
  BATCH_MATH,
  BATCH_MATH_2,
  BATCH_GENED,
  BATCH_WORLD,
  BATCH_PROFED_1,
  BATCH_PROFED_2,
  BATCH_CAE,
  BATCH_PROFED_3,
  BATCH_CAE_2,
  BATCH_PROFED_4,
  BATCH_CAE_3,
];

export const ALL_DRAFTS: readonly QuestionDraft[] = [...BATCHES].flat();
