import { describe, it } from 'vitest';
import { buildLongPaper } from '../../../engine/selection';
import { ALL_QUESTIONS } from '../../questions';
import { DRAFT_QUESTIONS } from '../../draftQuestions';
import { ALL_DRAFTS } from '..';
import { toPendingQuestions } from '../../../pipeline';

const live = () => ALL_QUESTIONS.filter(q => q.status === 'approved');
const allApproved = () => [
  ...live(),
  ...toPendingQuestions([...DRAFT_QUESTIONS, ...ALL_DRAFTS]).accepted.map(q => ({ ...q, status: 'approved' as const })),
];

describe('probe', () => {
  it('live-only pool 350', () => {
    const paper = buildLongPaper({ pool: live(), count: 350, seed: 1 });
    console.log('LIVE 350: shortfall =', paper.shortfall, 'items =', paper.items.length, 'repeats =', paper.repeats.length);
  });
  it('all approved+drafts 350', () => {
    const paper = buildLongPaper({ pool: allApproved(), count: 350, seed: 1 });
    console.log('ALL 350: shortfall =', paper.shortfall, 'items =', paper.items.length, 'repeats =', paper.repeats.length);
  });
  it('all approved 450', () => {
    const paper = buildLongPaper({ pool: allApproved(), count: 450, seed: 1 });
    console.log('ALL 450: shortfall =', paper.shortfall, 'items =', paper.items.length);
  });
  it('live-only 450', () => {
    const paper = buildLongPaper({ pool: live(), count: 450, seed: 1 });
    console.log('LIVE 450: shortfall =', paper.shortfall, 'items =', paper.items.length);
  });
});
