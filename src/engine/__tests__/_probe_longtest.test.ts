import { describe, it } from 'vitest';
import { buildLongPaper, selectQuestions } from '../../engine/selection';
import { ALL_QUESTIONS } from '../../data/questions';
import { DRAFT_QUESTIONS } from '../../data/draftQuestions';
import { ALL_DRAFTS } from '../../data/batches';
import { toPendingQuestions } from '../../pipeline';

const live = () => ALL_QUESTIONS.filter(q => q.status === 'approved');
const doc = () => [
  ...live(),
  ...toPendingQuestions([...DRAFT_QUESTIONS, ...ALL_DRAFTS]).accepted.map(q => ({ ...q, status: 'approved' as const })),
];

describe('probe longPaper', () => {
  it('report 350 live', () => {
    const p = buildLongPaper({ pool: live(), count: 350, seed: 1 });
    console.log('LIVE 350:', p.requested, 'items:', p.items.length, 'repeats:', p.repeats.length, 'shortfall:', p.shortfall);
  });
  it('report 350 doc', () => {
    const p = buildLongPaper({ pool: doc(), count: 350, seed: 1 });
    console.log('DOC 350:', p.requested, 'items:', p.items.length, 'repeats:', p.repeats.length, 'shortfall:', p.shortfall);
  });
  it('report 450 doc', () => {
    const p = buildLongPaper({ pool: doc(), count: 450, seed: 1 });
    console.log('DOC 450:', p.requested, 'items:', p.items.length, 'repeats:', p.repeats.length, 'shortfall:', p.shortfall);
  });
  it('report selectQuestions 350 live', () => {
    const r = selectQuestions({ pool: live(), count: 350, seed: 1 });
    console.log('live selectQuestions:', r.length, 'repeats:', r.length > 0 ? r.filter((_,i,a)=>a.findIndex(x=>x.id===r[i].id) !== i).length : 0);
  });
});
