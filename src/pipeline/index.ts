import type { Question, Difficulty } from '../types/content';
import { SUBJECTS, TOPICS } from '../data/curriculum';

/**
 * The AI-draft review pipeline (plan Stage 8).
 *
 * The plan is explicit: AI-generated questions must go through an admin
 * review/approval process before they can reach an exam. The enforcement half
 * already exists — `eligible()` in the engine only ever returns
 * `status: 'approved'` — so this module is the other half: a validated draft
 * shape, and a conversion that can only ever produce `pending`.
 *
 * Drafts live in `src/data/draftQuestions.ts`. Nothing there is visible to a
 * student until a human moves an item out of it.
 */

export type DraftedBy = 'ai' | 'human';

export interface QuestionDraft {
  id: string;
  subjectId: string;
  topicId: string;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  /** Required. The plan requires the reference for a researched question. */
  source: string;
  draftedBy: DraftedBy;
  /** Situational drafts must carry a vignette and a rationale. */
  situational?: boolean;
  vignette?: string;
  rationale?: string;
}

export interface DraftQuestion extends Question {
  draftedBy: DraftedBy;
}

const MIN_PROMPT = 20;
const MIN_EXPLANATION = 60;
const MIN_SOURCE = 12;
const MIN_VIGNETTE = 200;
const MIN_RATIONALE = 40;

const subjectIds = new Set(SUBJECTS.map((s) => s.id));
const topicById = new Map(TOPICS.map((t) => [t.id, t]));

/**
 * Checks a draft against every rule the question bank enforces, and returns all
 * the problems found rather than stopping at the first — a reviewer wants the
 * full list, not one error at a time.
 */
export function validateDraft(draft: QuestionDraft): string[] {
  const problems: string[] = [];

  if (!subjectIds.has(draft.subjectId)) {
    problems.push(`Unknown subject: ${draft.subjectId}`);
  }

  const topic = topicById.get(draft.topicId);
  if (!topic) {
    problems.push(`Unknown topic: ${draft.topicId}`);
  } else if (topic.subjectId !== draft.subjectId) {
    problems.push(
      `Topic ${draft.topicId} does not belong to subject ${draft.subjectId} (it is under ${topic.subjectId})`,
    );
  }

  if (![1, 2, 3, 4, 5].includes(draft.difficulty)) {
    problems.push(`Difficulty must be 1-5, got ${draft.difficulty}`);
  }

  if (!draft.prompt || draft.prompt.trim().length < MIN_PROMPT) {
    problems.push(`Prompt must be at least ${MIN_PROMPT} characters`);
  }

  if (!Array.isArray(draft.options) || draft.options.length !== 4) {
    problems.push(`A question needs exactly four options, got ${draft.options?.length ?? 0}`);
  } else {
    for (const option of draft.options) {
      if (!option || option.trim().length === 0) {
        problems.push('An option is empty');
      }
    }
    if (new Set(draft.options).size !== draft.options.length) {
      problems.push('Options contain duplicates');
    }
  }

  if (![0, 1, 2, 3].includes(draft.correctIndex)) {
    problems.push(`correctIndex must be 0-3, got ${draft.correctIndex}`);
  }

  if (!draft.explanation || draft.explanation.trim().length < MIN_EXPLANATION) {
    problems.push(`Explanation must be at least ${MIN_EXPLANATION} characters`);
  }

  if (!draft.source || draft.source.trim().length < MIN_SOURCE) {
    problems.push('A source reference is required for a researched question');
  }

  if (draft.situational) {
    if (!draft.vignette || draft.vignette.trim().length < MIN_VIGNETTE) {
      problems.push(
        `A situational draft needs a vignette of at least ${MIN_VIGNETTE} characters`,
      );
    }
    if (!draft.rationale || draft.rationale.trim().length < MIN_RATIONALE) {
      problems.push(`A situational draft needs a rationale of at least ${MIN_RATIONALE} characters`);
    }
  }

  return problems;
}

/**
 * Converts a draft into a question. The status is hard-coded to `pending` and
 * cannot be passed in, so no caller can accidentally publish an unreviewed
 * question into an exam.
 */
export function draftToQuestion(draft: QuestionDraft): DraftQuestion {
  return {
    id: draft.id,
    subjectId: draft.subjectId,
    topicId: draft.topicId,
    difficulty: draft.difficulty,
    prompt: draft.prompt,
    options: draft.options as [string, string, string, string],
    correctIndex: draft.correctIndex,
    explanation: draft.explanation,
    source: draft.source,
    status: 'pending',
    situational: draft.situational,
    vignette: draft.vignette,
    rationale: draft.rationale,
    draftedBy: draft.draftedBy,
  };
}

export interface DraftSummary {
  total: number;
  invalid: number;
  situational: number;
  bySubject: Record<string, number>;
  byTopic: Record<string, number>;
  byBand: { easy: number; moderate: number; difficult: number };
}

const bandOf = (difficulty: Difficulty) =>
  difficulty <= 2 ? 'easy' : difficulty <= 4 ? 'moderate' : 'difficult';

/** Counts a batch of drafts, so a reviewer can see the shape before reading them. */
export function summariseDrafts(drafts: readonly QuestionDraft[]): DraftSummary {
  const summary: DraftSummary = {
    total: drafts.length,
    invalid: 0,
    situational: 0,
    bySubject: {},
    byTopic: {},
    byBand: { easy: 0, moderate: 0, difficult: 0 },
  };

  for (const draft of drafts) {
    if (validateDraft(draft).length > 0) summary.invalid += 1;
    if (draft.situational) summary.situational += 1;
    summary.bySubject[draft.subjectId] = (summary.bySubject[draft.subjectId] ?? 0) + 1;
    summary.byTopic[draft.topicId] = (summary.byTopic[draft.topicId] ?? 0) + 1;
    summary.byBand[bandOf(draft.difficulty)] += 1;
  }

  return summary;
}

/** Groups drafts by topic, for a reviewer working through one area at a time. */
export function draftsByTopic(
  drafts: readonly QuestionDraft[],
): Record<string, QuestionDraft[]> {
  const grouped: Record<string, QuestionDraft[]> = {};
  for (const draft of drafts) {
    (grouped[draft.topicId] ??= []).push(draft);
  }
  return grouped;
}

/**
 * Turns every valid draft into a pending question and reports what was skipped.
 * An invalid draft is never silently dropped — it is returned in `rejected` so
 * the reviewer can see what failed and why.
 */
export function toPendingQuestions(drafts: readonly QuestionDraft[]): {
  accepted: DraftQuestion[];
  rejected: { draft: QuestionDraft; problems: string[] }[];
} {
  const accepted: DraftQuestion[] = [];
  const rejected: { draft: QuestionDraft; problems: string[] }[] = [];

  for (const draft of drafts) {
    const problems = validateDraft(draft);
    if (problems.length > 0) {
      rejected.push({ draft, problems });
    } else {
      accepted.push(draftToQuestion(draft));
    }
  }

  return { accepted, rejected };
}
