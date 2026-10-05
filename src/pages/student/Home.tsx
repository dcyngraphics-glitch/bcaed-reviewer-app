import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import ProgressRing from '../../components/ProgressRing';
import { useProfile } from '../../context/ProfileContext';
import { useContent } from '../../hooks/useContent';
import { taskForDate, programProgress, PHASES } from '../../program';
import { levelFromXp, classifyMastery, buildRecommendations } from '../../engine/progress';
import { BADGES, badgeById } from '../../gamification';

const todayKey = () => new Date().toISOString().slice(0, 10);

// ── Count-up hook ─────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 800): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

// ── Animated stat tile ─────────────────────────────────────────────────────

interface StatTileProps {
  label: string;
  value: number;
  suffix?: string;
  sublabel: string;
  delay?: number;
}

function StatTile({ label, value, suffix, sublabel, delay = 0 }: StatTileProps) {
  const animatedValue = useCountUp(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="p-5">
        <p className="text-sm text-neutral-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-neutral-900">
          {animatedValue}
          {suffix && <span className="text-sm font-normal text-neutral-500"> {suffix}</span>}
        </p>
        <p className="text-xs text-neutral-500 mt-1">{sublabel}</p>
      </Card>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

const StudentHome = () => {
  const navigate = useNavigate();
  const { profile, stats, week } = useProfile();
  const { topicNames, subjectNames } = useContent();

  const today = todayKey();
  const task = taskForDate(profile.startDate, today);
  const progress = programProgress(week);
  const level = levelFromXp(profile.xp);

  const mastery = classifyMastery(stats.byTopic);
  const recommendations = buildRecommendations(mastery, { topicNames });

  const startHref =
    task.kind === 'rest'
      ? '/practice'
      : task.kind === 'assessment' || task.kind === 'challenge'
        ? '/mock-exams'
        : '/practice';

  const recentSessions = [...profile.sessions].reverse().slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">
          Welcome back, {profile.name.split(' ')[0]}
        </h1>
        <p className="text-neutral-600">
          Week {week} of 12 &middot; {task.phase.name} phase
        </p>
      </div>

      {/* Today's mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        whileHover={{ scale: 1.01 }}
      >
        <Card className="p-6 border-primary-200">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-[240px]">
              <p className="text-xs uppercase tracking-wide text-primary-700 font-semibold mb-1">
                Today&apos;s mission
              </p>
              <h2 className="text-xl font-bold text-neutral-900 mb-2">{task.title}</h2>
              <p className="text-neutral-600 mb-4">{task.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {task.questionCount > 0 ? (
                  <Badge variant="outline">{task.questionCount} questions</Badge>
                ) : null}
                {task.timeLimitMinutes ? (
                  <Badge variant="outline">{task.timeLimitMinutes} minutes</Badge>
                ) : null}
                <Badge variant="secondary">Level {task.difficulty} difficulty</Badge>
                {task.required ? (
                  <Badge>Counts toward your streak</Badge>
                ) : (
                  <Badge variant="outline">Optional</Badge>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="primary" onClick={() => navigate(startHref)}>
                  {task.kind === 'rest' ? 'Study anyway' : 'Start session'}
                </Button>
                <Button variant="outline" onClick={() => navigate('/review')}>
                  Read the lesson first
                </Button>
              </div>
            </div>

            <ProgressRing
              value={progress.percent}
              size={96}
              strokeWidth={9}
              labelColor="text-primary-700"
            />
          </div>
        </Card>
      </motion.div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile
          label="Accuracy"
          value={stats.accuracy}
          suffix="%"
          sublabel={`${stats.questionsAnswered} question${stats.questionsAnswered === 1 ? '' : 's'} answered`}
          delay={0.15}
        />
        <StatTile
          label="Streak"
          value={stats.currentStreak}
          suffix={stats.currentStreak === 1 ? 'day' : 'days'}
          sublabel={`Longest: ${stats.longestStreak}`}
          delay={0.2}
        />
        <StatTile
          label={`Level ${level.level}`}
          value={profile.xp}
          suffix="XP"
          sublabel={`${level.xpIntoLevel}/${level.xpForNextLevel} to level ${level.level + 1}`}
          delay={0.25}
        />
        <StatTile
          label="Badges"
          value={profile.badges.length}
          suffix={`/ ${BADGES.length}`}
          sublabel={`${stats.mockExamsTaken} mock exam${stats.mockExamsTaken === 1 ? '' : 's'} taken`}
          delay={0.3}
        />
      </div>

      {/* XP progress bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <Card className="p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-neutral-700">Level {level.level} progress</p>
            <p className="text-xs text-neutral-500">
              {level.xpIntoLevel}/{level.xpForNextLevel} XP
            </p>
          </div>
          <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-primary-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(level.xpIntoLevel / level.xpForNextLevel) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            />
          </div>
        </Card>
      </motion.div>

      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-3">What to work on</h2>
            <ul className="space-y-3">
              {recommendations.slice(0, 3).map((recommendation) => (
                <li
                  key={recommendation.topicId}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-neutral-50 px-4 py-3"
                >
                  <p className="text-sm text-neutral-700 flex-1 min-w-[220px]">{recommendation.message}</p>
                  <Link to={`/practice?topic=${recommendation.topicId}`}>
                    <Button variant="outline" size="sm">
                      Practice this
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      ) : stats.questionsAnswered > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="p-6 bg-success-50 border-success-200">
            <p className="text-success-800 font-medium">
              No weak areas flagged. Keep drilling to raise your accuracy further.
            </p>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="p-6 bg-primary-50 border-primary-200">
            <p className="text-primary-800 font-medium">
              Complete your first session to get personalized recommendations.
            </p>
          </Card>
        </motion.div>
      )}

      {/* Subject performance */}
      {stats.bySubject.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-neutral-900">Subject performance</h2>
              <Link to="/progress" className="text-sm text-primary-700 hover:underline">
                Full progress
              </Link>
            </div>
            <div className="space-y-3">
              {stats.bySubject.map((subject) => (
                <div key={subject.subjectId}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-700">
                      {subjectNames[subject.subjectId] ?? subject.subjectId}
                    </span>
                    <span className="text-neutral-500">{subject.accuracy}%</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-2 rounded-full ${
                        subject.accuracy >= 75
                          ? 'bg-success-600'
                          : subject.accuracy >= 50
                            ? 'bg-warning-500'
                            : 'bg-error-600'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.accuracy}%` }}
                      transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      ) : null}

      {/* Recent sessions */}
      {recentSessions.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Recent sessions</h2>
            <ul className="divide-y divide-neutral-100">
              {recentSessions.map((session) => (
                <li key={session.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-800 capitalize">{session.mode}</p>
                    <p className="text-xs text-neutral-500">{session.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-neutral-900">
                      {session.correct}/{session.total}
                    </p>
                    <p className="text-xs text-neutral-500">{session.accuracy}%</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-2">Recent sessions</h2>
            <p className="text-sm text-neutral-500">
              No sessions yet. Start your first practice session to see your history here.
            </p>
          </Card>
        </motion.div>
      )}

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.55 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-neutral-900">Achievements</h2>
            <Link to="/achievements" className="text-sm text-primary-700 hover:underline">
              View all
            </Link>
          </div>

          {profile.badges.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-3xl mb-2" aria-hidden="true">🏆</p>
              <p className="text-sm text-neutral-500">
                No badges yet. Finish your first session to unlock First Step.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {profile.badges.slice(0, 8).map((id) => {
                const badge = badgeById(id);
                if (!badge) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-2"
                    title={badge.description}
                  >
                    <span className="text-xl" aria-hidden="true">
                      {badge.icon}
                    </span>
                    <span className="text-sm font-medium text-neutral-800">{badge.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </motion.div>

      {/* Phase timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-bold text-neutral-900 mb-4">Your 12-week program</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {PHASES.map((phase) => {
              const active = week >= phase.fromWeek && week <= phase.toWeek;
              const done = week > phase.toWeek;
              return (
                <div
                  key={phase.name}
                  className={`rounded-lg border-2 p-4 ${
                    active
                      ? 'border-primary-500 bg-primary-50'
                      : done
                        ? 'border-success-200 bg-success-50'
                        : 'border-neutral-200'
                  }`}
                >
                  <p className="text-xs text-neutral-500 mb-1">
                    Weeks {phase.fromWeek}&ndash;{phase.toWeek}
                  </p>
                  <p className="font-semibold text-neutral-900 mb-1">{phase.name}</p>
                  <p className="text-xs text-neutral-600">{phase.focus}</p>
                  {active ? (
                    <p className="text-xs font-medium text-primary-700 mt-2">You are here</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default StudentHome;
