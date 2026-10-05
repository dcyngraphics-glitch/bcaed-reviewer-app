import type { Question, Difficulty } from '../types/content';
import type { SubtestId } from '../exam';
import { difficultyPlan, EXAM_DIFFICULTY_MIX } from '../exam';

export interface MockComposition {
  /** Target number of items. */
  total: number;
  /** Share of the paper that should be situational. */
  situationalShare: number;
}

/**
 * How situational each paper type should be.
 *
 * The plan is explicit: practice keeps a graded ramp so a student meets
 * difficulty gradually, but mock exams must lean heavily situational because
 * that is what exam day actually looks like.
 */
export const SITUATIONAL_SHARE = {
  /** Practice and weekly sessions: a gentle ramp. */
  practice: 0.25,
  /** Weekly assessment: more, but still teaching. */
  assessment: 0.45,
  /** Mock exams: exam-day conditions. */
  mock: 0.8,
} as const;

/** The band a difficulty level sits in, using PRC's own 30/50/20 mix. */
export function difficultyBand(level: Difficulty): 'easy' | 'moderate' | 'difficult' {
  if (level <= 2) return 'easy';
  if (level <= 4) return 'moderate';
  return 'difficult';
}

export interface DifficultyQuota {
  easy: number;
  moderate: number;
  difficult: number;
}

export interface CompositionResult {
  /** Items to take from each difficulty band. */
  quota: DifficultyQuota;
  /** Items to take that are situational. */
  situationalTarget: number;
  /** Items to take that are not. */
  straightTarget: number;
}

/**
 * Works out how many items to draw from each difficulty band and how many of
 * them should be situational.
 *
 * The situational target is capped by what the pool can actually supply, so a
 * small bank does not silently produce a paper that misses its own spec — the
 * caller can see the shortfall instead.
 */
export function composePaper(
  pool: readonly Question[],
  composition: MockComposition,
): CompositionResult & { situationalAvailable: number } {
  const quota = difficultyPlan(composition.total);
  const situationalTarget = Math.round(composition.total * composition.situationalShare);

  // A short paper should still land at the requested total.
  const balanced: DifficultyQuota = {
    easy: quota.easy,
    moderate: quota.moderate,
    difficult: quota.difficult,
  };

  const situationalAvailable = pool.filter((q) => q.situational).length;

  return {
    quota: balanced,
    situationalTarget,
    straightTarget: composition.total - situationalTarget,
    situationalAvailable,
  };
}

/** True when the pool cannot meet the paper's spec. Surfaced, never hidden. */
export function compositionShortfall(
  pool: readonly Question[],
  composition: MockComposition,
): { itemsShort: number; situationalShort: number } {
  const { situationalTarget } = composePaper(pool, composition);
  const situationalAvailable = pool.filter((q) => q.situational).length;

  return {
    itemsShort: Math.max(0, composition.total - pool.length),
    situationalShort: Math.max(0, situationalTarget - situationalAvailable),
  };
}

/**
 * Difficulty band mix for a paper. Mirrors PRC's 30/50/20 unless the caller
 * overrides it — a short practice set is better spread evenly than forced into
 * a mix it cannot fill.
 */
export function bandMix(total: number, evenSpread = false): DifficultyQuota {
  if (!evenSpread) return difficultyPlan(total);

  const per = Math.floor(total / 3);
  return {
    easy: per,
    moderate: total - per * 2,
    difficult: per,
  };
}

export { EXAM_DIFFICULTY_MIX };
export type { SubtestId };
