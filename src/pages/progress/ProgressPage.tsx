import { useMemo } from 'react';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import ProgressRing from '../../components/ProgressRing';
import TrendChart from '../../components/progress/TrendChart';
import { buildTrend, summariseTrend } from '../../components/progress/trend';
import { useProfile } from '../../context/ProfileContext';
import { useContent } from '../../hooks/useContent';
import {
  classifyMastery,
  levelFromXp,
  readinessScore,
  buildRecommendations,
} from '../../engine/progress';
import { programProgress } from '../../program';

const ProgressPage = () => {
  const { profile, stats, week } = useProfile();
  const { topicNames, subjectNames, questions } = useContent();

  const level = levelFromXp(profile.xp);
  const mastery = classifyMastery(stats.byTopic);
  const progress = programProgress(week);

  // Coverage: how much of the approved bank the student has actually seen.
  const coverage = useMemo(() => {
    const seen = new Set<string>();
    for (const session of profile.sessions) {
      for (const topic of session.byTopic) {
        // Sessions store counts, not ids, so approximate coverage by topic
        // reach: a topic with any attempts is partially covered.
        if (topic.attempted > 0) seen.add(topic.topicId);
      }
    }
    const totalTopics = new Set(questions.map((q) => q.topicId)).size;
    return totalTopics > 0 ? seen.size / totalTopics : 0;
  }, [profile.sessions, questions]);

  const readiness = readinessScore({
    accuracy: stats.accuracy,
    coverage,
    mockAverage: stats.bestMockScore,
  });

  const recommendations = buildRecommendations(mastery, { topicNames });

  const trendPoints = useMemo(() => buildTrend(profile.sessions), [profile.sessions]);
  const trendSummary = useMemo(() => summariseTrend(trendPoints), [trendPoints]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Progress</h1>
        <p className="text-gray-600">Everything the app knows about your preparation.</p>
      </div>

      {/* Readiness */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-6">
          <ProgressRing
            value={readiness}
            size={128}
            strokeWidth={10}
            color={
              readiness >= 75
                ? 'stroke-green-600'
                : readiness >= 50
                  ? 'stroke-amber-500'
                  : 'stroke-red-600'
            }
            labelColor="text-gray-900"
          />

          <div className="flex-1 min-w-[240px]">
            <h2 className="text-lg font-bold text-gray-900 mb-1">LET readiness</h2>
            <p className="text-sm text-gray-600 mb-4">
              A weighted view of your accuracy, how much of the bank you have covered, and your
              best mock exam. Treat it as a trend, not a verdict.
            </p>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Accuracy</p>
                <p className="font-semibold text-gray-900">{stats.accuracy}%</p>
              </div>
              <div>
                <p className="text-gray-500">Coverage</p>
                <p className="font-semibold text-gray-900">{Math.round(coverage * 100)}%</p>
              </div>
              <div>
                <p className="text-gray-500">Best mock</p>
                <p className="font-semibold text-gray-900">{stats.bestMockScore}%</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Headline numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Questions answered</p>
          <p className="text-2xl font-bold text-gray-900">{stats.questionsAnswered}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Sessions completed</p>
          <p className="text-2xl font-bold text-gray-900">{stats.sessionsCompleted}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Study time</p>
          <p className="text-2xl font-bold text-gray-900">{stats.studyMinutes}m</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-gray-500 mb-1">Program week</p>
          <p className="text-2xl font-bold text-gray-900">{progress.week}/12</p>
        </Card>
      </div>

      {/* Streaks and XP */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Streaks and XP</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">Current streak</p>
            <p className="text-xl font-bold text-gray-900">{stats.currentStreak} days</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Longest streak</p>
            <p className="text-xl font-bold text-gray-900">{stats.longestStreak} days</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">XP / level</p>
            <p className="text-xl font-bold text-gray-900">
              {profile.xp} &middot; L{level.level}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Study days are Monday, Tuesday, Thursday and Friday. Wednesday and the weekend are rest
          days and never break a streak.
        </p>
      </Card>

      {/* Subject performance */}
      {stats.bySubject.length > 0 ? (
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Subject performance</h2>
          <div className="space-y-3">
            {stats.bySubject.map((subject) => (
              <div key={subject.subjectId}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">
                    {subjectNames[subject.subjectId] ?? subject.subjectId}
                  </span>
                  <span className="text-gray-500">
                    {subject.correct}/{subject.attempted} &middot; {subject.accuracy}%
                  </span>
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

      {/* Topic mastery */}
      {stats.byTopic.length > 0 ? (
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Topic mastery</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-green-700 mb-2">
                Strong ({mastery.strong.length})
              </p>
              {mastery.strong.length === 0 ? (
                <p className="text-sm text-gray-500">None yet.</p>
              ) : (
                <ul className="space-y-1">
                  {mastery.strong.map((topic) => (
                    <li key={topic.topicId} className="text-sm text-gray-700">
                      {topicNames[topic.topicId] ?? topic.topicId} &middot; {topic.accuracy}%
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-amber-700 mb-2">
                Developing ({mastery.developing.length})
              </p>
              {mastery.developing.length === 0 ? (
                <p className="text-sm text-gray-500">None yet.</p>
              ) : (
                <ul className="space-y-1">
                  {mastery.developing.map((topic) => (
                    <li key={topic.topicId} className="text-sm text-gray-700">
                      {topicNames[topic.topicId] ?? topic.topicId} &middot; {topic.accuracy}%
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-red-700 mb-2">
                Needs review ({mastery.needsReview.length})
              </p>
              {mastery.needsReview.length === 0 ? (
                <p className="text-sm text-gray-500">None yet.</p>
              ) : (
                <ul className="space-y-1">
                  {mastery.needsReview.map((topic) => (
                    <li key={topic.topicId} className="text-sm text-gray-700">
                      {topicNames[topic.topicId] ?? topic.topicId} &middot; {topic.accuracy}%
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">
                Not enough data ({mastery.insufficient.length})
              </p>
              {mastery.insufficient.length === 0 ? (
                <p className="text-sm text-gray-500">None yet.</p>
              ) : (
                <ul className="space-y-1">
                  {mastery.insufficient.map((topic) => (
                    <li key={topic.topicId} className="text-sm text-gray-500">
                      {topicNames[topic.topicId] ?? topic.topicId} &middot; {topic.attempted}{' '}
                      attempt{topic.attempted === 1 ? '' : 's'}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Card>
      ) : null}

      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Recommended next</h2>
          <ul className="space-y-2">
            {recommendations.map((recommendation) => (
              <li key={recommendation.topicId} className="text-sm text-gray-700">
                {recommendation.message}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {/* Improvement over time */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Improvement over time</h2>
        <TrendChart points={trendPoints} summary={trendSummary} />
      </Card>

      {/* Session history */}
      {profile.sessions.length > 0 ? (
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Session history</h2>
          <ul className="divide-y divide-gray-100">
            {[...profile.sessions].reverse().map((session) => (
              <li key={session.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-800 capitalize">{session.mode}</p>
                  <p className="text-xs text-gray-500">
                    {session.date}
                    {session.durationSeconds > 0
                      ? ` \u00b7 ${Math.round(session.durationSeconds / 60)} min`
                      : ''}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      session.accuracy >= 75
                        ? 'default'
                        : session.accuracy >= 50
                          ? 'secondary'
                          : 'destructive'
                    }
                  >
                    {session.accuracy}%
                  </Badge>
                  <span className="text-sm text-gray-600 w-16 text-right">
                    {session.correct}/{session.total}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      ) : (
        <Card className="p-8 text-center">
          <p className="text-gray-600">
            No sessions yet. Your progress will appear here after your first practice run.
          </p>
        </Card>
      )}
    </div>
  );
};

export default ProgressPage;
