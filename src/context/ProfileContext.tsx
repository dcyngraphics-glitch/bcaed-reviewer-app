import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  loadProfile,
  saveProfile,
  recordSession,
  clearMistake,
  type StudentProfile,
  type RecordOptions,
} from '../storage/studentStore';
import type { SessionResult } from '../engine/scoring';
import { evaluateBadges, newlyEarnedBadges } from '../gamification';
import { weekNumberForDate } from '../program';
import { computeStats, type FullStats } from '../storage/studentStore';

interface ProfileContextValue {
  profile: StudentProfile;
  stats: FullStats;
  week: number;
  /** Badges unlocked by the most recent session, for the unlock animation. */
  recentBadges: string[];
  /** Records a finished session and returns the badges it unlocked. */
  submitSession: (
    result: SessionResult,
    options: RecordOptions & { date?: string },
  ) => { unlocked: string[] };
  dismissRecentBadges: () => void;
  forgetMistake: (questionId: string) => void;
  resetProfile: (name?: string) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

const today = () => new Date().toISOString().slice(0, 10);

/** Name captured on the sign-in screen, before a profile exists. */
function pendingName(): string | undefined {
  try {
    return window.localStorage.getItem('bcaed.pendingName') ?? undefined;
  } catch {
    return undefined;
  }
}

export function ProfileProvider({
  children,
  name,
  startDate,
}: {
  children: ReactNode;
  name?: string;
  startDate?: string;
}) {
  const seedDate = startDate ?? today();
  const seedName = name ?? pendingName();

  const [profile, setProfile] = useState<StudentProfile>(() =>
    loadProfile({ name: seedName, startDate: seedDate }),
  );
  const [recentBadges, setRecentBadges] = useState<string[]>([]);

  // Keep the latest profile in a ref so submitSession can read it without
  // being re-created (and re-rendering every consumer) on each change.
  const profileRef = useRef(profile);
  profileRef.current = profile;

  // Persist on every change. A failed write is non-fatal: the in-memory state
  // is still correct for this session.
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const submitSession = useCallback(
    (result: SessionResult, options: RecordOptions & { date?: string } = {}) => {
      const date = options.date ?? today();
      const current = profileRef.current;

      const next = recordSession(current, result, date, options);

      const earned = evaluateBadges({
        sessionsCompleted: next.sessions.length,
        questionsAnswered: next.sessions.reduce((sum, s) => sum + s.total, 0),
        currentStreak: next.currentStreak,
        longestStreak: next.longestStreak,
        perfectSessions: next.sessions.filter((s) => s.accuracy === 100).length,
        mockExamsTaken: next.sessions.filter((s) => s.mode === 'mock').length,
        bestMockScore: next.sessions
          .filter((s) => s.mode === 'mock')
          .reduce((best, s) => Math.max(best, s.accuracy), 0),
        topicsMastered: 0,
        week: weekNumberForDate(next.startDate, date),
        readiness: 0,
      });

      const unlocked = newlyEarnedBadges(earned, next.badges);

      const withBadges: StudentProfile = { ...next, badges: earned };
      profileRef.current = withBadges;
      setProfile(withBadges);
      setRecentBadges(unlocked);

      return { unlocked };
    },
    [],
  );

  const dismissRecentBadges = useCallback(() => setRecentBadges([]), []);

  const forgetMistake = useCallback((questionId: string) => {
    setProfile((current) => clearMistake(current, questionId));
  }, []);

  const resetProfile = useCallback(
    (newName?: string) => {
      const fresh = loadProfile({ name: newName ?? name, startDate: seedDate });
      // loadProfile returns whatever is stored, so clear it first.
      try {
        window.localStorage.removeItem('bcaed.profile.v1');
      } catch {
        // Ignore storage failures.
      }
      const blank = { ...fresh, xp: 0, sessions: [], mistakes: [], badges: [], activeDates: [] };
      profileRef.current = blank;
      setProfile(blank);
    },
    [name, seedDate],
  );

  const week = useMemo(
    () => weekNumberForDate(profile.startDate, today()),
    [profile.startDate],
  );

  const stats = useMemo(() => {
    const base = computeStats(profile, { week, readiness: 0, topicsMastered: 0 });
    return base;
  }, [profile, week]);

  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      stats,
      week,
      recentBadges,
      submitSession,
      dismissRecentBadges,
      forgetMistake,
      resetProfile,
    }),
    [
      profile,
      stats,
      week,
      recentBadges,
      submitSession,
      dismissRecentBadges,
      forgetMistake,
      resetProfile,
    ],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return ctx;
}
