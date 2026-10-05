/**
 * The real LET paper, and the rule that decides pass or fail.
 *
 * Every number here is sourced in docs/LET-EXAM-FACTS.md — PRC Board for
 * Professional Teachers Resolution No. 11 s. 2025, the PRC–CHED Joint
 * Memorandum Circular of 10 April 2025, and the published 2026 LEPT program.
 * Do not adjust these to make a UI look nicer; they are the exam.
 */

export type SubtestId = 'gened' | 'profed' | 'cae';

export interface Subtest {
  id: SubtestId;
  /** Matches the subject ids in src/data/curriculum.ts. */
  subjectId: string;
  name: string;
  items: number;
  minutes: number;
  /** The real sitting window on exam day. */
  window: string;
  /** Share of the final rating. */
  weight: number;
  description: string;
}

/**
 * Secondary level, and Elementary-with-specialization (which includes BCAEd):
 * 450 items across three subtests on one Sunday.
 */
export const SUBTESTS: readonly Subtest[] = [
  {
    id: 'gened',
    subjectId: 'gened',
    name: 'General Education',
    items: 150,
    minutes: 120,
    window: '8:00–10:00 a.m.',
    weight: 0.2,
    description:
      'Ten areas of 15 items each: Purposive Communication, Filipino, Philippine History, Rizal, the Contemporary World, Art Appreciation, Science and Technology, Mathematics, Ethics, and Understanding the Self.',
  },
  {
    id: 'profed',
    subjectId: 'profed',
    name: 'Professional Education',
    items: 150,
    minutes: 180,
    window: '11:00 a.m.–2:00 p.m.',
    weight: 0.4,
    description:
      'Five areas: the Teaching Profession (15%), Curriculum, Methods and EdTech (30%), the Child and Adolescent Learners (20%), Assessment of Learning (15%), and Field Study and Internship (20%).',
  },
  {
    id: 'cae',
    subjectId: 'cae',
    name: 'Culture and Arts Education',
    items: 150,
    minutes: 210,
    window: '3:00–6:30 p.m.',
    weight: 0.4,
    description:
      'Your specialization. Five areas: Disciplinal Knowledge, Pedagogical Practice, Competency and Proficiency in the Creative Expressions, Professional Accountability and Responsibility, and Research and Extension.',
  },
] as const;

export const TOTAL_ITEMS = SUBTESTS.reduce((sum, subtest) => sum + subtest.items, 0);

/** A general weighted average of at least 75% is required. */
export const PASSING_AVERAGE = 75;

/** ...and no single subtest may fall below 50%. */
export const MINIMUM_SUBTEST_RATING = 50;

export function subtestById(id: string): Subtest {
  const found = SUBTESTS.find((subtest) => subtest.id === id);
  if (!found) {
    throw new Error(`Unknown subtest: ${id}`);
  }
  return found;
}

/**
 * Seconds budgeted per item. Gen Ed is the tightest paper of the day at 48
 * seconds; a flat "a minute per question" would misrepresent it badly.
 */
export function secondsPerItem(subtest: Subtest): number {
  return (subtest.minutes * 60) / subtest.items;
}

export interface SubtestRating {
  subtestId: SubtestId;
  /** 0-100. */
  score: number;
}

export interface PassingResult {
  /** Weighted average across the subtests supplied, 0-100. */
  average: number;
  passed: boolean;
  /** Subtests below the 50 floor. Any entry here is an outright fail. */
  failingSubtests: SubtestId[];
  /** How far the average is below 75; 0 when it clears. */
  averageShortfall: number;
}

/**
 * Applies the real two-part passing rule.
 *
 * Both conditions must hold: a weighted average of at least 75%, **and** no
 * subtest below 50%. The second condition is the one students underestimate —
 * an examinee can average comfortably above 75% and still fail outright.
 *
 * A partial rating set is weighted over the subtests actually supplied, so the
 * result is meaningful before all three mocks have been sat.
 */
export function passingStatus(ratings: readonly SubtestRating[]): PassingResult {
  if (ratings.length === 0) {
    return { average: 0, passed: false, failingSubtests: [], averageShortfall: PASSING_AVERAGE };
  }

  let weightedSum = 0;
  let totalWeight = 0;
  const failingSubtests: SubtestId[] = [];

  for (const rating of ratings) {
    const weight = subtestById(rating.subtestId).weight;
    weightedSum += rating.score * weight;
    totalWeight += weight;
    if (rating.score < MINIMUM_SUBTEST_RATING) {
      failingSubtests.push(rating.subtestId);
    }
  }

  const average = totalWeight > 0 ? weightedSum / totalWeight : 0;
  const averageShortfall = Math.max(0, PASSING_AVERAGE - average);

  return {
    average,
    passed: averageShortfall === 0 && failingSubtests.length === 0,
    failingSubtests,
    averageShortfall,
  };
}

/** The lowest-scoring subtest, or null when there is no data. */
export function weakestSubtest(ratings: readonly SubtestRating[]): SubtestRating | null {
  if (ratings.length === 0) return null;
  return ratings.reduce((weakest, rating) => (rating.score < weakest.score ? rating : weakest));
}

/**
 * Turns an accuracy percentage into a projected subtest rating.
 *
 * A straight pass-through today: accuracy on a subtest that mirrors the real
 * paper is the best available estimate of the score. Kept as a function so a
 * calibration curve can be added once real mock results accumulate.
 */
export function projectRating(accuracy: number, _subtest: Subtest): number {
  return Math.round(Math.min(100, Math.max(0, accuracy)));
}

/**
 * PRC's own TOS sets the difficulty mix at roughly 30% easy, 50% moderate and
 * 20% difficult.
 */
export const EXAM_DIFFICULTY_MIX = { easy: 0.3, moderate: 0.5, difficult: 0.2 } as const;

export interface DifficultyPlan {
  easy: number;
  moderate: number;
  difficult: number;
}

/**
 * Splits an item count into the official difficulty bands.
 *
 * The remainder goes to `moderate` because that is the largest band, which
 * keeps a 15-item paper (4/7/3) closer to the real proportions than dumping the
 * rounding error on the difficult band.
 */
export function difficultyPlan(count: number): DifficultyPlan {
  if (count <= 0) return { easy: 0, moderate: 0, difficult: 0 };

  const easy = Math.floor(count * EXAM_DIFFICULTY_MIX.easy);
  const difficult = Math.floor(count * EXAM_DIFFICULTY_MIX.difficult);
  const moderate = count - easy - difficult;

  return { easy, moderate, difficult };
}
