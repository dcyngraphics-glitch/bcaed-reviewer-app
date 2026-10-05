import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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

/** Roughly 45 seconds a question, rounded to a friendly number of minutes. */
const estimateMinutes = (count: number) => Math.max(1, Math.round((count * 45) / 60));

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

  // Shortcuts span every subject when none is picked — never a silent fallback
  // to one subject, which used to show CAE topics under an "All topics" label.
  const shortcutTopics = subjectId
    ? topicsFor(subjectId)
    : subjects.flatMap((subject) => topicsFor(subject.id));

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground">Practice</h1>
        <p className="text-muted-foreground">
          Learning mode. Answers and explanations are revealed as you go.
        </p>
      </motion.div>

      {stage === 'setup' ? (
        <>
          <Card>
            <h2 className="text-lg font-bold text-foreground mb-4">Choose what to practise</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="block text-sm font-medium text-muted-foreground mb-1">Subject</span>
                <select
                  value={subjectId}
                  onChange={(e) => {
                    setSubjectId(e.target.value);
                    setTopicId('');
                  }}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                <span className="block text-sm font-medium text-muted-foreground mb-1">Topic</span>
                <select
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                  disabled={!subjectId}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground disabled:bg-muted disabled:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            {!subjectId ? (
              <p className="mt-2 text-xs text-muted-foreground">
                Pick a subject first to narrow the topic list down.
              </p>
            ) : null}

            <div className="mt-5">
              <span className="block text-sm font-medium text-muted-foreground mb-2">
                How many questions
              </span>
              <div className="flex flex-wrap gap-2">
                {COUNTS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setCount(option)}
                    aria-pressed={count === option}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      count === option
                        ? 'bg-primary-600 text-primary-50 border-primary-600'
                        : 'border-border text-foreground hover:bg-muted'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Estimated time: about {estimateMinutes(count)} minute
                {estimateMinutes(count) === 1 ? '' : 's'}
              </p>
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
              <p className="mt-3 text-sm text-warning-700">
                No approved questions match this selection yet. Try a different subject or topic.
              </p>
            ) : null}
          </Card>

          {/* Quick topic shortcuts */}
          <Card>
            <h2 className="text-lg font-bold text-foreground mb-4">Jump into a topic</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {shortcutTopics.map((topic) => {
                const topicCount = questionCountFor({ topicId: topic.id });
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setSubjectId(topic.subjectId);
                      setTopicId(topic.id);
                    }}
                    className="text-left rounded-xl border border-border p-4 transition-colors hover:border-primary-400 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <p className="font-medium text-foreground text-sm mb-1">{topic.name}</p>
                    <p className="text-xs text-muted-foreground">{topicCount} questions</p>
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
