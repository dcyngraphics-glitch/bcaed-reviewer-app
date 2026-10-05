import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import SessionPlayer from '../../components/session/SessionPlayer';
import { useProfile } from '../../context/ProfileContext';
import { useContent } from '../../hooks/useContent';
import { selectQuestions, accuracyToDifficulty } from '../../engine/selection';
import { hashSeed } from '../../engine/random';
import type { AnswerRecord, SessionResult } from '../../engine/scoring';

const todayKey = () => new Date().toISOString().slice(0, 10);

/**
 * Optional starting assessment. It samples every difficulty band so the first
 * session can place the student instead of guessing, then reports the starting
 * level and the weak areas to attack first.
 */
const DiagnosticPage = () => {
  const navigate = useNavigate();
  const { submitSession, dismissRecentBadges, profile } = useProfile();
  const { questions, topicNames, subjectNames } = useContent();

  const [stage, setStage] = useState<'intro' | 'running' | 'done'>('intro');
  const [result, setResult] = useState<SessionResult | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [seed, setSeed] = useState(() => hashSeed(String(Date.now())));

  const approved = useMemo(() => questions.filter((q) => q.status === 'approved'), [questions]);

  // A flat sample across the ladder, so the placement is not skewed easy.
  const sample = useMemo(() => {
    if (stage !== 'running') return [];
    return selectQuestions({ pool: approved, count: 20, seed });
  }, [stage, approved, seed]);

  const start = useCallback(() => {
    setSeed(hashSeed(`${Date.now()}-${Math.random()}`));
    setResult(null);
    setAnswers([]);
    setStage('running');
  }, []);

  const handleFinish = useCallback(
    (sessionResult: SessionResult, sessionAnswers: AnswerRecord[]) => {
      submitSession(sessionResult, {
        mode: 'diagnostic',
        answers: sessionAnswers,
        date: todayKey(),
      });
      setResult(sessionResult);
      setAnswers(sessionAnswers);
      setStage('done');
    },
    [submitSession],
  );

  const placedDifficulty = result ? accuracyToDifficulty(result.accuracy) : profile.targetDifficulty;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Diagnostic test</h1>
        <p className="text-gray-600">
          An optional starting assessment. It sets your difficulty level and shows where to begin.
        </p>
      </div>

      {stage === 'intro' ? (
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">What this does</h2>
          <ul className="space-y-2 text-sm text-gray-700 mb-5">
            <li>&bull; 20 questions sampled across all difficulty levels and all three subjects.</li>
            <li>&bull; Untimed. Answer at your own pace.</li>
            <li>&bull; Answers and explanations are shown as you go, so it doubles as a review.</li>
            <li>&bull; Your result sets the difficulty your practice sessions aim at.</li>
            <li>&bull; You can retake it at any time; a later score will not lower your level.</li>
          </ul>

          <div className="flex flex-wrap gap-2 mb-5">
            <Badge variant="outline">20 questions</Badge>
            <Badge variant="outline">Untimed</Badge>
            <Badge variant="secondary">Current level: {profile.targetDifficulty}</Badge>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={start} disabled={approved.length === 0}>
              Start diagnostic
            </Button>
            <Button variant="outline" onClick={() => navigate('/student/home')}>
              Skip for now
            </Button>
          </div>
        </Card>
      ) : null}

      {stage === 'running' ? (
        <SessionPlayer
          questions={sample}
          mode="diagnostic"
          revealAnswers
          title="Diagnostic test"
          subtitle="Untimed placement assessment"
          onFinish={handleFinish}
          onExit={() => setStage('intro')}
        />
      ) : null}

      {stage === 'done' && result ? (
        <>
          <Card className="p-6 border-primary-200">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Placement result</h2>
            <p className="text-gray-600 mb-4">
              You scored {result.accuracy}%. Your practice sessions will now aim at difficulty{' '}
              {placedDifficulty} of 5.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-5">
              <div>
                <p className="text-gray-500">Correct</p>
                <p className="text-lg font-semibold text-green-700">{result.correct}</p>
              </div>
              <div>
                <p className="text-gray-500">Wrong</p>
                <p className="text-lg font-semibold text-red-700">{result.wrong}</p>
              </div>
              <div>
                <p className="text-gray-500">Unanswered</p>
                <p className="text-lg font-semibold text-gray-700">{result.unanswered}</p>
              </div>
              <div>
                <p className="text-gray-500">XP earned</p>
                <p className="text-lg font-semibold text-primary-700">+{result.xpEarned}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  dismissRecentBadges();
                  navigate('/student/home');
                }}
              >
                Go to dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  dismissRecentBadges();
                  start();
                }}
              >
                Retake
              </Button>
            </div>
          </Card>

          {result.byTopic.length > 0 ? (
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Where you stand</h2>
              <div className="space-y-3">
                {[...result.byTopic]
                  .sort((a, b) => a.accuracy - b.accuracy)
                  .map((topic) => (
                    <div key={topic.topicId}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">
                          {topicNames[topic.topicId] ?? topic.topicId}
                        </span>
                        <span className="text-gray-500">{topic.accuracy}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-2 rounded-full ${
                            topic.accuracy >= 75
                              ? 'bg-green-600'
                              : topic.accuracy >= 50
                                ? 'bg-amber-500'
                                : 'bg-red-600'
                          }`}
                          style={{ width: `${topic.accuracy}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {result.bySubject.map((subject) => (
                  <Badge key={subject.subjectId} variant="outline">
                    {subjectNames[subject.subjectId] ?? subject.subjectId}: {subject.accuracy}%
                  </Badge>
                ))}
              </div>
            </Card>
          ) : null}

          {answers.length > 0 ? (
            <p className="text-sm text-gray-500">
              Every mistake from this test has been saved to My Mistakes.
            </p>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default DiagnosticPage;
