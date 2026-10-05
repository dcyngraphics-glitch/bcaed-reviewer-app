import type { Difficulty } from '../types/content';

/** The plan fixes the program at three months / twelve weeks. */
export const PROGRAM_WEEKS = 12;

/**
 * Monday 2026-10-05. A per-student start date would be better, but the program
 * needs a stable anchor so week numbers are reproducible in tests and in the
 * dashboard before a student record exists.
 */
export const DEFAULT_START_DATE = '2026-10-05';

export interface Phase {
  name: 'Foundation' | 'Development' | 'Examination Preparation';
  fromWeek: number;
  toWeek: number;
  focus: string;
  /** Inclusive difficulty band used when picking questions this phase. */
  difficultyBand: [Difficulty, Difficulty];
}

export const PHASES: readonly Phase[] = [
  {
    name: 'Foundation',
    fromWeek: 1,
    toWeek: 4,
    focus: 'Basic concepts, terminology and fundamental knowledge.',
    difficultyBand: [1, 2],
  },
  {
    name: 'Development',
    fromWeek: 5,
    toWeek: 8,
    focus: 'Application, comparing concepts and situational questions.',
    difficultyBand: [3, 3],
  },
  {
    name: 'Examination Preparation',
    fromWeek: 9,
    toWeek: 12,
    focus: 'Difficult mixed topics, timed assessments and mock examinations.',
    difficultyBand: [4, 5],
  },
] as const;

export type TaskKind = 'lesson' | 'reinforcement' | 'rest' | 'challenge' | 'assessment' | 'optional';

export interface DayPlan {
  /** JS day number, 0 = Sunday. */
  weekday: number;
  label: string;
  kind: TaskKind;
  /** Whether the day counts toward the streak and the weekly completion bar. */
  required: boolean;
  /** Challenge and assessment days run against the clock. */
  timed: boolean;
  summary: string;
}

export const WEEKLY_PLAN: readonly DayPlan[] = [
  {
    weekday: 0,
    label: 'Sunday',
    kind: 'optional',
    required: false,
    timed: false,
    summary: 'Optional review. Rest is allowed.',
  },
  {
    weekday: 1,
    label: 'Monday',
    kind: 'lesson',
    required: true,
    timed: false,
    summary: 'New lesson plus practice questions.',
  },
  {
    weekday: 2,
    label: 'Tuesday',
    kind: 'reinforcement',
    required: true,
    timed: false,
    summary: 'Practice and reinforcement of the week\u2019s lesson.',
  },
  {
    weekday: 3,
    label: 'Wednesday',
    kind: 'rest',
    required: false,
    timed: false,
    summary: 'Rest day. Your streak is safe.',
  },
  {
    weekday: 4,
    label: 'Thursday',
    kind: 'challenge',
    required: true,
    timed: true,
    summary: 'Challenge session with timed practice.',
  },
  {
    weekday: 5,
    label: 'Friday',
    kind: 'assessment',
    required: true,
    timed: true,
    summary: 'Weekly assessment covering the week\u2019s topics.',
  },
  {
    weekday: 6,
    label: 'Saturday',
    kind: 'optional',
    required: false,
    timed: false,
    summary: 'Optional review. Rest is allowed.',
  },
] as const;

/** Mon/Tue/Thu/Fri — the days that count toward the streak. */
export const SCHEDULED_WEEKDAYS: readonly number[] = WEEKLY_PLAN.filter((d) => d.required).map(
  (d) => d.weekday,
);

const MS_PER_DAY = 86_400_000;

function parseKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function clampWeek(week: number): number {
  return Math.min(PROGRAM_WEEKS, Math.max(1, Math.floor(week)));
}

export function phaseForWeek(week: number): Phase {
  const safe = clampWeek(week);
  return PHASES.find((p) => safe >= p.fromWeek && safe <= p.toWeek) ?? PHASES[0];
}

/** 1-based week of the program containing `date`. */
export function weekNumberForDate(startDate: string, date: string): number {
  const start = parseKey(startDate).getTime();
  const target = parseKey(date).getTime();
  const elapsedDays = Math.floor((target - start) / MS_PER_DAY);
  if (elapsedDays < 0) return 1;
  return clampWeek(Math.floor(elapsedDays / 7) + 1);
}

export interface DailyTask {
  date: string;
  week: number;
  phase: Phase;
  kind: TaskKind;
  label: string;
  title: string;
  description: string;
  questionCount: number;
  /** Minutes allowed on a timed day. */
  timeLimitMinutes: number | null;
  difficulty: Difficulty;
  required: boolean;
  timed: boolean;
}

const TITLES: Record<TaskKind, string> = {
  lesson: 'New Lesson',
  reinforcement: 'Reinforcement Practice',
  rest: 'Rest Day',
  challenge: 'Thursday Challenge',
  assessment: 'Weekly Assessment',
  optional: 'Optional Review',
};

/** Question count per required day, scaled by how far into the program we are. */
function questionCountFor(kind: TaskKind, week: number): number {
  if (kind === 'rest') return 0;

  const ramp = Math.floor((week - 1) / 3); // +1 question every three weeks

  switch (kind) {
    case 'lesson':
      return 10 + ramp;
    case 'reinforcement':
      return 12 + ramp;
    case 'challenge':
      return 15 + ramp * 2;
    case 'assessment':
      return 20 + ramp * 2;
    case 'optional':
      return 10 + ramp;
    default:
      return 10;
  }
}

function timeLimitFor(kind: TaskKind, questionCount: number): number | null {
  if (kind === 'challenge' || kind === 'assessment') {
    // ~1.2 minutes per question, rounded to a friendly number.
    return Math.round((questionCount * 1.2) / 5) * 5;
  }
  return null;
}

/** Difficulty the student should be working at on a given day. */
function difficultyForDay(phase: Phase, kind: TaskKind, week: number): Difficulty {
  const [lo, hi] = phase.difficultyBand;
  if (kind === 'challenge' || kind === 'assessment') return hi;

  // Drift upward within the band as the phase progresses.
  const span = phase.toWeek - phase.fromWeek + 1;
  const progress = (week - phase.fromWeek) / Math.max(1, span - 1);
  return Math.min(hi, Math.max(lo, Math.round(lo + progress * (hi - lo)))) as Difficulty;
}

/**
 * "What should I study today?" — the single question the plan says the student
 * must be able to answer the moment they open the app.
 */
export function taskForDate(startDate: string, date: string, _today = date): DailyTask {
  const week = weekNumberForDate(startDate, date);
  const phase = phaseForWeek(week);
  const weekday = parseKey(date).getDay();
  const day = WEEKLY_PLAN.find((d) => d.weekday === weekday) ?? WEEKLY_PLAN[1];

  const questionCount = questionCountFor(day.kind, week);

  return {
    date: toKey(parseKey(date)),
    week,
    phase,
    kind: day.kind,
    label: day.label,
    title: TITLES[day.kind],
    description: day.summary,
    questionCount,
    timeLimitMinutes: timeLimitFor(day.kind, questionCount),
    difficulty: difficultyForDay(phase, day.kind, week),
    required: day.required,
    timed: day.timed,
  };
}

export interface ProgramProgress {
  week: number;
  percent: number;
  weeksRemaining: number;
}

export function programProgress(week: number): ProgramProgress {
  const safe = clampWeek(week);
  return {
    week: safe,
    // Week 1 is the start line, so it reads 0% done rather than 8%.
    percent: Math.round(((safe - 1) / (PROGRAM_WEEKS - 1)) * 100),
    weeksRemaining: PROGRAM_WEEKS - safe,
  };
}
