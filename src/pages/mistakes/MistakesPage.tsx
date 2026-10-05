import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import SessionPlayer from '../../components/session/SessionPlayer';
import SessionResults from '../../components/session/SessionResults';
import { useProfile } from '../../context/ProfileContext';
import { useContent } from '../../hooks/useContent';
import { shuffle } from '../../engine/random';
import { hashSeed, createRng } from '../../engine/random';
import type { AnswerRecord, SessionResult } from '../../engine/scoring';
import { DIFFICULTY_LABELS } from '../../types/content';

const todayKey = () => new Date().toISOString().slice(0, 10);

/**
 * My Mistakes — the plan's dedicated review section. Shows every question the
 * student has answered wrongly, and can build a practice session from them.
 */
const MistakesPage = () => {
  const navigate = useNavigate();
  const { profile, submitSession, forgetMistake, dismissRecentBadges } = useProfile();
  const { questions, topicNames, subjectNames } = useContent();

  const [stage, setStage] = useState<'list' | 'running' | 'results'>('list');
  const [result, setResult] = useState<SessionResult | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [seed, setSeed] = useState(() => hashSeed(String(Date.now())));

  const byId = useMemo(() => new Map(questions.map((q) => [q.id, q])), [questions]);

  // Only questions still in the bank and still awaiting an admin-approval-free
  // state are shown; a deleted question must not linger in the list.
  const mistakeQuestions = useMemo(
    () =>
      profile.mistakes
        .map((mistake) => ({ mistake, question: byId.get(mistake.questionId) }))
        .filter((entry): entry is { mistake: typeof entry.mistake; question: NonNullable<typeof entry.question> } =>
          Boolean(entry.question),
        ),
    [profile.mistakes, byId],
  );

  const startMistakePractice = useCallback(() => {
    setSeed(hashSeed(`${Date.now()}-${Math.random()}`));
    setResult(null);
    setAnswers([]);
    setStage('running');
  }, []);

  const sessionQuestions = useMemo(() => {
    if (stage !== 'running') return [];
    return shuffle(
      mistakeQuestions.map((entry) => entry.question),
      createRng(seed),
    ).slice(0, 20);
  }, [stage, mistakeQuestions, seed]);

  const handleFinish = useCallback(
    (sessionResult: SessionResult, sessionAnswers: AnswerRecord[]) => {
      const { unlocked: earned } = submitSession(sessionResult, {
        mode: 'mistakes',
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

  // Group by topic so the student can see which area is costing them marks.
  const grouped = useMemo(() => {
    const map = new Map<string, typeof mistakeQuestions>();
    for (const entry of mistakeQuestions) {
      const key = entry.question.topicId;
      map.set(key, [...(map.get(key) ?? []), entry]);
    }
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [mistakeQuestions]);

  if (stage === 'running') {
    return (
      <div className="space-y-6">
        <SessionPlayer
          questions={sessionQuestions}
          mode="mistakes"
          revealAnswers
          title="Practice your mistakes"
          subtitle="Questions you have got wrong before"
          onFinish={handleFinish}
          onExit={() => setStage('list')}
        />
      </div>
    );
  }

  if (stage === 'results' && result) {
    return (
      <SessionResults
        result={result}
        answers={answers}
        questions={sessionQuestions}
        unlockedBadges={unlocked}
        topicNames={topicNames}
        subjectNames={subjectNames}
        onRetake={() => {
          dismissRecentBadges();
          startMistakePractice();
        }}
        onDone={() => {
          dismissRecentBadges();
          setStage('list');
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Mistakes</h1>
          <p className="text-gray-600">
            Every question you have answered wrongly. A question leaves this list once you get it
            right.
          </p>
        </div>

        {mistakeQuestions.length > 0 ? (
          <Button variant="primary" onClick={startMistakePractice}>
            Practice these {Math.min(20, mistakeQuestions.length)} questions
          </Button>
        ) : null}
      </div>

      {mistakeQuestions.length === 0 ? (
        <Card className="p-8 text-center bg-green-50 border-green-200">
          <p className="text-green-800 font-medium mb-1">Nothing to review</p>
          <p className="text-sm text-green-700">
            You have not missed a question yet. Take a practice session and any mistakes will
            collect here.
          </p>
          <Button variant="outline" className="mt-5" onClick={() => navigate('/practice')}>
            Start practising
          </Button>
        </Card>
      ) : (
        <>
          <Card className="p-5">
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline">{mistakeQuestions.length} questions to review</Badge>
              <Badge variant="secondary">{grouped.length} topics affected</Badge>
            </div>
          </Card>

          {grouped.map(([topicId, entries]) => (
            <Card key={topicId} className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  {topicNames[topicId] ?? topicId}
                </h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{entries.length} missed</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/practice?topic=${topicId}`)}
                  >
                    Drill this topic
                  </Button>
                </div>
              </div>

              <ul className="space-y-4">
                {entries.map(({ mistake, question }) => (
                  <li key={question.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="outline">{DIFFICULTY_LABELS[question.difficulty]}</Badge>
                      <Badge variant="secondary">
                        {subjectNames[question.subjectId] ?? question.subjectId}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        missed {mistake.timesMissed}&times; &middot; last {mistake.missedAt}
                      </span>
                    </div>

                    <p className="font-medium text-gray-900 mb-2">{question.prompt}</p>

                    <div className="text-sm space-y-1">
                      {mistake.chosenIndex === null ? (
                        <p className="text-gray-500 italic">You left this unanswered.</p>
                      ) : (
                        <p className="text-red-700">
                          <span className="font-medium">Your answer: </span>
                          {question.options[mistake.chosenIndex]}
                        </p>
                      )}
                      <p className="text-green-700">
                        <span className="font-medium">Correct: </span>
                        {question.options[question.correctIndex]}
                      </p>
                    </div>

                    <p className="mt-2 text-sm text-gray-600">{question.explanation}</p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => forgetMistake(question.id)}
                    >
                      Remove from list
                    </Button>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default MistakesPage;
