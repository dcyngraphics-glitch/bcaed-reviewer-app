import type { Difficulty, Question } from '../types/content';
import { createRng, shuffle } from './random';

export interface SelectionFilter {
  subjectId?: string;
  topicId?: string;
  difficulty?: Difficulty[];
}

export interface SelectionOptions {
  pool: readonly Question[];
  count: number;
  /** Attempt seed — same seed, same paper; new attempt, new paper. */
  seed: number;
  filter?: SelectionFilter;
  /** Question ids to avoid, e.g. the ones just served on the previous attempt. */
  excludeIds?: string[];
  /** Where the student's ability currently sits; selection radiates outward. */
  targetDifficulty?: Difficulty;
}

const LADDER: Difficulty[] = [1, 2, 3, 4, 5];

/**
 * Only approved questions are ever selectable. The plan is explicit that
 * AI-drafted questions must pass an admin review before they can appear in
 * practice or exams.
 */
function eligible(
  pool: readonly Question[],
  filter: SelectionFilter = {},
  excludeIds: readonly string[] = [],
): Question[] {
  const excluded = new Set(excludeIds);
  return pool.filter((question) => {
    if (question.status !== 'approved') return false;
    if (excluded.has(question.id)) return false;
    if (filter.subjectId && question.subjectId !== filter.subjectId) return false;
    if (filter.topicId && question.topicId !== filter.topicId) return false;
    if (filter.difficulty && !filter.difficulty.includes(question.difficulty)) return false;
    return true;
  });
}

/** Orders difficulties by distance from the target, ties going easier-first. */
function byDistanceFrom(target: Difficulty): Difficulty[] {
  return [...LADDER].sort((a, b) => {
    const da = Math.abs(a - target);
    const db = Math.abs(b - target);
    if (da !== db) return da - db;
    return a - b;
  });
}

export function selectQuestions({
  pool,
  count,
  seed,
  filter,
  excludeIds,
  targetDifficulty,
}: SelectionOptions): Question[] {
  if (count <= 0) return [];

  const candidates = eligible(pool, filter, excludeIds);
  if (candidates.length === 0) return [];

  const rng = createRng(seed);

  // No target: a straight shuffle of the whole eligible set.
  if (!targetDifficulty) {
    return shuffle(candidates, rng).slice(0, count);
  }

  // With a target: walk difficulty bands outward from the target, shuffling
  // inside each band so repeated sessions at the same level still vary.
  const picked: Question[] = [];
  for (const level of byDistanceFrom(targetDifficulty)) {
    if (picked.length >= count) break;
    const band = shuffle(
      candidates.filter((q) => q.difficulty === level),
      rng,
    );
    picked.push(...band.slice(0, count - picked.length));
  }

  return picked;
}

/**
 * A mock exam is a fixed paper: rising difficulty, no repeats, and the hardest
 * questions land at the end so the exam ramps like the real LET.
 */
export function buildMockExam(options: Omit<SelectionOptions, 'targetDifficulty'>): Question[] {
  const { pool, count, seed, filter, excludeIds } = options;
  if (count <= 0) return [];

  const candidates = eligible(pool, filter, excludeIds);
  if (candidates.length === 0) return [];

  const rng = createRng(seed);

  // Draw fairly from each band before ordering, so the ramp is not just
  // "whatever the pool happened to be sorted by".
  const perBand = Math.max(1, Math.ceil(count / LADDER.length));
  const drawn: Question[] = [];
  for (const level of LADDER) {
    if (drawn.length >= count) break;
    const band = shuffle(
      candidates.filter((q) => q.difficulty === level),
      rng,
    );
    drawn.push(...band.slice(0, perBand));
  }

  // Top up from anything left over if some bands were thin.
  if (drawn.length < count) {
    const used = new Set(drawn.map((q) => q.id));
    const leftovers = shuffle(
      candidates.filter((q) => !used.has(q.id)),
      rng,
    );
    drawn.push(...leftovers.slice(0, count - drawn.length));
  }

  return drawn
    .slice(0, count)
    .sort((a, b) => a.difficulty - b.difficulty || a.id.localeCompare(b.id));
}

/** Maps a session's accuracy onto the difficulty the student should now face. */
export function accuracyToDifficulty(accuracy: number): Difficulty {
  if (accuracy >= 90) return 5;
  if (accuracy >= 75) return 4;
  if (accuracy >= 55) return 3;
  if (accuracy >= 35) return 2;
  return 1;
}

/**
 * Moves at most one rung per session. The plan calls for difficulty that
 * "increases naturally", so a single great session should not jump a student
 * from recall questions straight to exam-level situational items.
 */
export function nextTargetDifficulty(accuracy: number, current: Difficulty): Difficulty {
  const desired = accuracyToDifficulty(accuracy);
  if (desired > current) return Math.min(5, current + 1) as Difficulty;
  if (desired < current) return Math.max(1, current - 1) as Difficulty;
  return current;
}
