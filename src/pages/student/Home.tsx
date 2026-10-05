import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {profile.name.split(' ')[0]}
        </h1>
        <p className="text-gray-600">
          Week {week} of 12 &middot; {task.phase.name} phase
        </p>
      </div>

      {/* Today's mission — the one question the app must answer on open. */}
      <motion.div whileHover={{ scale: 1.01 }}>
        <Card className="p-6 border-primary-200">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex-1 min-w-[240px]">
              <p className="text-xs uppercase tracking-wide text-primary-700 font-semibold mb-1">
                {task.label}
              </p>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h2>
              <p className="text-gray-600 mb-4">{task.description}</p>

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
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Accuracy</p>
          <p className="text-2xl font-bold text-gray-900">{stats.accuracy}%</p>
          <p className="text-xs text-gray-500 mt-1">
            {stats.questionsAnswered} question{stats.questionsAnswered === 1 ? '' : 's'} answered
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Streak</p>
          <p className="text-2xl font-bold text-gray-900">
            {stats.currentStreak}
            <span className="text-sm font-normal text-gray-500">
              {' '}
              day{stats.currentStreak === 1 ? '' : 's'}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">Longest: {stats.longestStreak}</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Level {level.level}</p>
          <p className="text-2xl font-bold text-gray-900">{profile.xp} XP</p>
          <div className="mt-2 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-primary-600 rounded-full"
              style={{ width: `${(level.xpIntoLevel / level.xpForNextLevel) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {level.xpIntoLevel}/{level.xpForNextLevel} to level {level.level + 1}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Badges</p>
          <p className="text-2xl font-bold text-gray-900">
            {profile.badges.length}
            <span className="text-sm font-normal text-gray-500"> / {BADGES.length}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {stats.mockExamsTaken} mock exam{stats.mockExamsTaken === 1 ? '' : 's'} taken
          </p>
        </Card>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">What to work on</h2>
          <ul className="space-y-3">
            {recommendations.slice(0, 3).map((recommendation) => (
              <li
                key={recommendation.topicId}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-50 px-4 py-3"
              >
                <p className="text-sm text-gray-700 flex-1 min-w-[220px]">{recommendation.message}</p>
                <Link to={`/practice?topic=${recommendation.topicId}`}>
                  <Button variant="outline" size="sm">
                    Practice this
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ) : stats.questionsAnswered > 0 ? (
        <Card className="p-6 bg-green-50 border-green-200">
          <p className="text-green-800 font-medium">
            No weak areas flagged. Keep drilling to raise your accuracy further.
          </p>
        </Card>
      ) : null}

      {/* Subject performance */}
      {stats.bySubject.length > 0 ? (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Subject performance</h2>
            <Link to="/progress" className="text-sm text-primary-700 hover:underline">
              Full progress
            </Link>
          </div>
          <div className="space-y-3">
            {stats.bySubject.map((subject) => (
              <div key={subject.subjectId}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">
                    {subjectNames[subject.subjectId] ?? subject.subjectId}
                  </span>
                  <span className="text-gray-500">{subject.accuracy}%</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${
                      subject.accuracy >= 75
                        ? 'bg-green-600'
                        : subject.accuracy >= 50
                          ? 'bg-amber-500'
                          : 'bg-red-600'
                    }`}
                    style={{ width: `${subject.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : null}

      {/* Recent sessions */}
      {recentSessions.length > 0 ? (
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent sessions</h2>
          <ul className="divide-y divide-gray-100">
            {recentSessions.map((session) => (
              <li key={session.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 capitalize">{session.mode}</p>
                  <p className="text-xs text-gray-500">{session.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {session.correct}/{session.total}
                  </p>
                  <p className="text-xs text-gray-500">{session.accuracy}%</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {/* Badges */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Achievements</h2>
          <Link to="/achievements" className="text-sm text-primary-700 hover:underline">
            View all
          </Link>
        </div>

        {profile.badges.length === 0 ? (
          <p className="text-sm text-gray-500">
            No badges yet. Finish your first session to unlock First Step.
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {profile.badges.slice(0, 8).map((id) => {
              const badge = badgeById(id);
              if (!badge) return null;
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2"
                  title={badge.description}
                >
                  <span className="text-xl" aria-hidden="true">
                    {badge.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-800">{badge.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Phase timeline */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Your 12-week program</h2>
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
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200'
                }`}
              >
                <p className="text-xs text-gray-500 mb-1">
                  Weeks {phase.fromWeek}&ndash;{phase.toWeek}
                </p>
                <p className="font-semibold text-gray-900 mb-1">{phase.name}</p>
                <p className="text-xs text-gray-600">{phase.focus}</p>
                {active ? (
                  <p className="text-xs font-medium text-primary-700 mt-2">You are here</p>
                ) : null}
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
};

export default StudentHome;
