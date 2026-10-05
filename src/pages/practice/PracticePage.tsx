import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import SessionPlayer from '../../components/session/SessionPlayer';
import SessionResults from '../../components/session/SessionResults';
import { useProfile } from '../../context/ProfileContext';
import { useContent } from '../../hooks/useContent';
import { selectQuestions } from '../../engine/selection';
import { hashSeed } from '../../engine/random';
import type { AnswerRecord, SessionResult } from '../../engine/scoring';
import type { Difficulty } from '../../types/content';

const todayKey = () => new Date().toISOString().slice(0, 10);

const COUNTS = [10, 15, 20, 30] as const;

const PracticePage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { profile, submitSession, dismissRecentBadges } = useProfile();
  const { subjects, topicsFor, topicNames, subjectNames, questionCountFor, questionsFor } =
    useContent();

  const presetSubject = params.get('subject') ?? '';
  const presetTopic = params.get('topic') ?? '';

  const [subjectId, setSubjectId] = useState(presetSubject);
  const [topicId, setTopicId] = useState(presetTopic);
  const [count, setCount] = useState<number>(10);
  const [seed, setSeed] = useState(() => hashSeed(String(Date.now())));
  const [stage, setStage] = useState<'setup' | 'running' | 'results'>('setup');
  const [result, setResult] = useState<SessionResult | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);

  const available = questionCountFor({
    subjectId: subjectId || undefined,
    topicId: topicId || undefined,
  });

  // Selection is seeded, so a retry with a fresh seed draws a different paper.
  const questions = useMemo(() => {
    if (stage === 'setup') return [];
    return selectQuestions({
      pool: questionsFor({ subjectId: subjectId || undefined, topicId: topicId || undefined }),
      count: Math.min(count, available),
      seed,
      targetDifficulty: profile.targetDifficulty as Difficulty,
    });
  }, [stage, seed, count, available, subjectId, topicId, profile.targetDifficulty, questionsFor]);

  const start = useCallback(() => {
    setSeed(hashSeed(`${Date.now()}-${Math.random()}`));
    setResult(null);
    setAnswers([]);
    setStage('running');
  }, []);

  const handleFinish = useCallback(
    (sessionResult: SessionResult, sessionAnswers: AnswerRecord[]) => {
      const { unlocked: earned } = submitSession(sessionResult, {
        mode: 'practice',
        answers: sessionAnswers,
        date: todayKey(),
      });
      setResult(sessionResult);
      setAnswers(sessionAnswers);
      setUnlocked(earned);
      setStage('results');
    },
    [submitSession],
  );

  const retake = useCallback(() => {
    dismissRecentBadges();
    start();
  }, [dismissRecentBadges, start]);

  const topicOptions = subjectId ? topicsFor(subjectId) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Practice</h1>
        <p className="text-gray-600">
          Learning mode. Answers and explanations are revealed as you go.
        </p>
      </div>

      {stage === 'setup' ? (
        <>
          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Choose what to practise</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">Subject</span>
                <select
                  value={subjectId}
                  onChange={(e) => {
                    setSubjectId(e.target.value);
                    setTopicId('');
                  }}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="">All subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">Topic</span>
                <select
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                  disabled={!subjectId}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100"
                >
                  <option value="">All topics</option>
                  {topicOptions.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-5">
              <span className="block text-sm font-medium text-gray-700 mb-2">
                How many questions
              </span>
              <div className="flex flex-wrap gap-2">
                {COUNTS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setCount(option)}
                    aria-pressed={count === option}
                    className={`px-4 py-2 rounded-md text-sm font-medium border ${
                      count === option
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Badge variant="outline">{available} questions available</Badge>
              <Badge variant="secondary">
                Aiming at difficulty {profile.targetDifficulty}
              </Badge>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" onClick={start} disabled={available === 0}>
                Start practice
              </Button>
              <Button variant="outline" onClick={() => navigate('/mistakes')}>
                Practice my mistakes
              </Button>
            </div>

            {available === 0 ? (
              <p className="mt-3 text-sm text-amber-700">
                No approved questions match this selection yet.
              </p>
            ) : null}
          </Card>

          {/* Quick topic shortcuts */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Jump into a topic</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topicsFor(subjectId || 'cae').map((topic) => {
                const topicCount = questionCountFor({ topicId: topic.id });
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setSubjectId(topic.subjectId);
                      setTopicId(topic.id);
                    }}
                    className="text-left rounded-lg border border-gray-200 p-4 hover:border-primary-400 hover:bg-gray-50"
                  >
                    <p className="font-medium text-gray-900 text-sm mb-1">{topic.name}</p>
                    <p className="text-xs text-gray-500">{topicCount} questions</p>
                  </button>
                );
              })}
            </div>
          </Card>
        </>
      ) : null}

      {stage === 'running' ? (
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice session"
          subtitle={
            topicId
              ? topicNames[topicId]
              : subjectId
                ? subjectNames[subjectId]
                : 'All subjects'
          }
          onFinish={handleFinish}
          onExit={() => setStage('setup')}
        />
      ) : null}

      {stage === 'results' && result ? (
        <SessionResults
          result={result}
          answers={answers}
          questions={questions}
          unlockedBadges={unlocked}
          topicNames={topicNames}
          subjectNames={subjectNames}
          onRetake={retake}
          onDone={() => {
            dismissRecentBadges();
            navigate('/student/home');
          }}
          onReviewMistakes={() => {
            dismissRecentBadges();
            navigate('/mistakes');
          }}
        />
      ) : null}
    </div>
  );
};

export default PracticePage;
