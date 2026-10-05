import type { SessionResult, SessionMode, AnswerRecord, TopicPerformance } from '../engine/scoring';
import { gradeSession } from '../engine/scoring';
import { calculateStreak } from '../engine/progress';
import { nextTargetDifficulty } from '../engine/selection';
import { SCHEDULED_WEEKDAYS } from '../program';
import type { Difficulty } from '../types/content';
import type { StudentStats } from '../gamification';

export const STORAGE_KEY = 'bcaed.profile.v1';
export const PROFILE_VERSION = 1;

export interface SessionRecord {
  id: string;
  date: string;
  mode: SessionMode;
  total: number;
  correct: number;
  accuracy: number;
  xpEarned: number;
  durationSeconds: number;
  /**
   * Per-topic and per-subject counts for this session. Stored rather than
   * inferred so the mastery breakdown describes the history exactly instead of
   * being guessed back from the mistake list.
   */
  byTopic: TopicPerformance[];
  bySubject: TopicPerformance[];
}

export interface MistakeRecord extends AnswerRecord {
  /** When the question was last answered wrongly. */
  missedAt: string;
  /** How many times it has been missed. */
  timesMissed: number;
}

export interface StudentProfile {
  version: number;
  name: string;
  startDate: string;
  xp: number;
  /** Difficulty the next session should aim at. */
  targetDifficulty: Difficulty;
  sessions: SessionRecord[];
  mistakes: MistakeRecord[];
  badges: string[];
  /** ISO dates with at least one completed session. */
  activeDates: string[];
  currentStreak: number;
  longestStreak: number;
  /** Study seconds banked, for the progress page. */
  totalStudySeconds: number;
  /** Ids served on the last attempt, so a retry draws fresh questions. */
  lastServedIds: string[];
}

export interface ProfileSeed {
  name?: string;
  startDate: string;
}

export function defaultProfile({ name = 'Student', startDate }: ProfileSeed): StudentProfile {
  return {
    version: PROFILE_VERSION,
    name,
    startDate,
    xp: 0,
    targetDifficulty: 1,
    sessions: [],
    mistakes: [],
    badges: [],
    activeDates: [],
    currentStreak: 0,
    longestStreak: 0,
    totalStudySeconds: 0,
    lastServedIds: [],
  };
}

/** Every field is rebuilt, so a malformed stored value degrades to a default. */
function normalise(raw: unknown, seed: ProfileSeed): StudentProfile {
  const fallback = defaultProfile(seed);
  if (!raw || typeof raw !== 'object') return fallback;

  const value = raw as Partial<StudentProfile>;
  const num = (v: unknown, d: number) => (typeof v === 'number' && Number.isFinite(v) ? v : d);
  const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

  const difficulty = num(value.targetDifficulty, 1);

  return {
    version: PROFILE_VERSION,
    name: typeof value.name === 'string' && value.name ? value.name : fallback.name,
    startDate:
      typeof value.startDate === 'string' && value.startDate ? value.startDate : fallback.startDate,
    xp: num(value.xp, 0),
    targetDifficulty: Math.min(5, Math.max(1, Math.round(difficulty))) as Difficulty,
    sessions: arr<SessionRecord>(value.sessions).map((session) => ({
      ...session,
      byTopic: arr<TopicPerformance>((session as Partial<SessionRecord>)?.byTopic),
      bySubject: arr<TopicPerformance>((session as Partial<SessionRecord>)?.bySubject),
    })),
    mistakes: arr<MistakeRecord>(value.mistakes),
    badges: arr<string>(value.badges),
    activeDates: [...new Set(arr<string>(value.activeDates))].sort(),
    currentStreak: num(value.currentStreak, 0),
    longestStreak: num(value.longestStreak, 0),
    totalStudySeconds: num(value.totalStudySeconds, 0),
    lastServedIds: arr<string>(value.lastServedIds),
  };
}

/**
 * Reads the stored profile. Storage is treated as untrusted: private mode,
 * disabled storage and half-written JSON all fall back to a fresh profile
 * rather than taking the app down on boot.
 */
export function loadProfile(seed?: ProfileSeed): StudentProfile {
  const resolvedSeed = seed ?? { startDate: new Date().toISOString().slice(0, 10) };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile(resolvedSeed);
    return normalise(JSON.parse(raw), resolvedSeed);
  } catch {
    return defaultProfile(resolvedSeed);
  }
}

/** Persists the profile. Returns false when storage rejected the write. */
export function saveProfile(profile: StudentProfile): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return true;
  } catch {
    // Quota exceeded or storage disabled — the in-memory state still works.
    return false;
  }
}

function makeId(date: string, index: number): string {
  return `${date}#${index}`;
}

export interface RecordOptions {
  mode?: SessionMode;
  durationSeconds?: number;
  /** Every answer in the session, used to clear questions now answered right. */
  answers?: readonly AnswerRecord[];
}

/**
 * Folds a finished session into the profile: XP, history, the mistakes list,
 * the target difficulty and the study calendar. Pure — returns a new profile.
 */
export function recordSession(
  profile: StudentProfile,
  result: SessionResult,
  date: string,
  options: RecordOptions = {},
): StudentProfile {
  const mode = options.mode ?? 'practice';

  const record: SessionRecord = {
    id: `${date}#${profile.sessions.length}`,
    date,
    mode,
    total: result.total,
    correct: result.correct,
    accuracy: result.accuracy,
    xpEarned: result.xpEarned,
    durationSeconds: options.durationSeconds ?? 0,
    byTopic: result.byTopic,
    bySubject: result.bySubject,
  };

  // A question leaves My Mistakes only once it has been answered correctly, so
  // getting it wrong again on a retry keeps it in the list.
  const answeredCorrectly = new Set(
    (options.answers ?? [])
      .filter((a) => a.chosenIndex !== null && a.chosenIndex === a.correctIndex)
      .map((a) => a.questionId),
  );

  const keptMistakes = profile.mistakes.filter((m) => !answeredCorrectly.has(m.questionId));

  const next: StudentProfile = {
    ...profile,
    xp: profile.xp + result.xpEarned,
    sessions: [...profile.sessions, record],
    mistakes: addMistakes({ ...profile, mistakes: keptMistakes }, result.mistakes, date).mistakes,
    activeDates: [...new Set([...profile.activeDates, date])].sort(),
    totalStudySeconds: profile.totalStudySeconds + (options.durationSeconds ?? 0),
    targetDifficulty: nextTargetDifficulty(result.accuracy, profile.targetDifficulty),
  };

  return updateStreak(next, date);
}

/** Adds or refreshes entries in My Mistakes. Pure. */
export function addMistakes(
  profile: StudentProfile,
  mistakes: readonly AnswerRecord[],
  date = new Date().toISOString().slice(0, 10),
): StudentProfile {
  if (mistakes.length === 0) return profile;

  const byId = new Map(profile.mistakes.map((m) => [m.questionId, m]));

  for (const mistake of mistakes) {
    const existing = byId.get(mistake.questionId);
    byId.set(mistake.questionId, {
      ...mistake,
      missedAt: date,
      timesMissed: (existing?.timesMissed ?? 0) + 1,
    });
  }

  return { ...profile, mistakes: [...byId.values()] };
}

/** Drops a question from My Mistakes once it has been answered correctly. */
export function clearMistake(profile: StudentProfile, questionId: string): StudentProfile {
  return { ...profile, mistakes: profile.mistakes.filter((m) => m.questionId !== questionId) };
}

/** Deletes a mistake entry outright, at the student's request. */
export const removeMistake = clearMistake;

/** Recomputes the streak from the study calendar and latches the longest. */
export function updateStreak(profile: StudentProfile, today: string): StudentProfile {
  const { current, longest } = calculateStreak(profile.activeDates, today, SCHEDULED_WEEKDAYS);
  return {
    ...profile,
    currentStreak: current,
    longestStreak: Math.max(profile.longestStreak, longest, current),
  };
}

export interface StatsContext {
  week: number;
  readiness: number;
  topicsMastered: number;
}

export type FullStats = StudentStats & {
  accuracy: number;
  byTopic: TopicPerformance[];
  bySubject: TopicPerformance[];
  studyMinutes: number;
};

function sumPerformance(records: readonly TopicPerformance[]): TopicPerformance[] {
  const buckets = new Map<string, { attempted: number; correct: number }>();

  for (const record of records) {
    const bucket = buckets.get(record.topicId) ?? { attempted: 0, correct: 0 };
    bucket.attempted += record.attempted;
    bucket.correct += record.correct;
    buckets.set(record.topicId, bucket);
  }

  return [...buckets.entries()].map(([topicId, { attempted, correct }]) => ({
    topicId,
    attempted,
    correct,
    accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
  }));
}

/** Rolls the whole session history up into the numbers the dashboard shows. */
export function computeStats(profile: StudentProfile, context: StatsContext): FullStats {
  const totals = profile.sessions.reduce(
    (acc, session) => {
      acc.questions += session.total;
      acc.correct += session.correct;
      if (session.accuracy === 100) acc.perfect += 1;
      return acc;
    },
    { questions: 0, correct: 0, perfect: 0 },
  );

  const mocks = profile.sessions.filter((s) => s.mode === 'mock');

  return {
    sessionsCompleted: profile.sessions.length,
    questionsAnswered: totals.questions,
    currentStreak: profile.currentStreak,
    longestStreak: profile.longestStreak,
    perfectSessions: totals.perfect,
    mockExamsTaken: mocks.length,
    bestMockScore: mocks.reduce((best, s) => Math.max(best, s.accuracy), 0),
    topicsMastered: context.topicsMastered,
    week: context.week,
    readiness: context.readiness,
    accuracy: totals.questions > 0 ? Math.round((totals.correct / totals.questions) * 100) : 0,
    byTopic: sumPerformance(profile.sessions.flatMap((s) => s.byTopic)),
    bySubject: sumPerformance(profile.sessions.flatMap((s) => s.bySubject)),
    studyMinutes: Math.round(profile.totalStudySeconds / 60),
  };
}

/** Grades and records in one step, for callers that do not need the parts. */
export function gradeAndRecord(
  profile: StudentProfile,
  answers: readonly AnswerRecord[],
  date: string,
  options: RecordOptions = {},
): { profile: StudentProfile; result: SessionResult } {
  const result = gradeSession(answers, { mode: options.mode ?? 'practice' });
  return { profile: recordSession(profile, result, date, { ...options, answers }), result };
}
