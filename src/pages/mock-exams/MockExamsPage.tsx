import { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import SessionPlayer from '../../components/session/SessionPlayer';
import SessionResults from '../../components/session/SessionResults';
import { useProfile } from '../../context/ProfileContext';
import { useContent } from '../../hooks/useContent';
import { buildMockExam } from '../../engine/selection';
import { SITUATIONAL_SHARE } from '../../exam/composition';
import { SUBTESTS, secondsPerItem } from '../../exam';
import { hashSeed } from '../../engine/random';
import type { AnswerRecord, SessionResult } from '../../engine/scoring';

const todayKey = () => new Date().toISOString().slice(0, 10);

interface ExamPreset {
  id: string;
  name: string;
  items: number;
  minutes: number;
  subjectId?: string;
  description: string;
}

const presetFrom = (
  id: string,
  name: string,
  subtestId: 'gened' | 'profed' | 'cae' | null,
  items: number,
  description: string,
): ExamPreset => {
  const subtest = subtestId ? SUBTESTS.find((s) => s.id === subtestId) : undefined;
  const perItem = subtest ? secondsPerItem(subtest) : secondsPerItem(SUBTESTS[2]);
  return {
    id,
    name,
    items,
    minutes: Math.round((items * perItem) / 60),
    subjectId: subtestId ?? undefined,
    description,
  };
};

const PRESETS: ExamPreset[] = [
  presetFrom(
    'marathon',
    'Marathon paper',
    null,
    350,
    'The long sit: three sections sized by subject weight. The real exam is 450 items across a whole day.',
  ),
  presetFrom(
    'full',
    'Full mock exam',
    null,
    60,
    'All three subjects, rising difficulty, at exam-day pacing. The closest thing to the real paper.',
  ),
  presetFrom(
    'quick',
    'Quick mock exam',
    null,
    25,
    'A short paper when you have twenty minutes to spare.',
  ),
  presetFrom(
    'gened',
    'General Education paper',
    'gened',
    40,
    'The tightest paper of the day: 48 seconds per item on the real thing.',
  ),
  presetFrom(
    'profed',
    'Professional Education paper',
    'profed',
    40,
    'Teaching profession, methods, learners, assessment and field study.',
  ),
  presetFrom(
    'cae',
    'Culture and Arts Education paper',
    'cae',
    40,
    'Your specialization. 40% of the Secondary rating.',
  ),
];

const MockExamsPage = () => {
  const navigate = useNavigate();
  const { submitSession, dismissRecentBadges, profile } = useProfile();
  const { questionsFor, topicNames, subjectNames } = useContent();

  const [stage, setStage] = useState<'setup' | 'running' | 'results'>('setup');
  const [active, setActive] = useState<ExamPreset | null>(null);
  const [seed, setSeed] = useState(() => hashSeed(String(Date.now())));
  const [result, setResult] = useState<SessionResult | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);

  const questions = useMemo(() => {
    if (stage !== 'running' || !active) return [];
    return buildMockExam({
      pool: questionsFor({ subjectId: active.subjectId }),
      count: active.items,
      seed,
      situationalShare: SITUATIONAL_SHARE.mock,
    });
  }, [stage, active, seed, questionsFor]);

  const start = useCallback((preset: ExamPreset) => {
    setActive(preset);
    setSeed(hashSeed(`${Date.now()}-${Math.random()}`));
    setResult(null);
    setAnswers([]);
    setStage('running');
  }, []);

  const handleFinish = useCallback(
    (sessionResult: SessionResult, sessionAnswers: AnswerRecord[]) => {
      const { unlocked: earned } = submitSession(sessionResult, {
        mode: 'mock',
        answers: sessionAnswers,
        durationSeconds: active ? active.minutes * 60 : 0,
        date: todayKey(),
      });
      setResult(sessionResult);
      setAnswers(sessionAnswers);
      setUnlocked(earned);
      setStage('results');
    },
    [submitSession, active],
  );

  const pastMocks = [...profile.sessions].filter((s) => s.mode === 'mock').reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mock exams</h1>
        <p className="text-muted-foreground">
          Timed, randomised and graded like the real thing. Answers stay hidden until you submit.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {stage === 'setup' ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {PRESETS.map((preset, index) => {
                const available = questionsFor({ subjectId: preset.subjectId }).length;
                const short = preset.items > available;
                return (
                  <motion.div
                    key={preset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-5 flex flex-col h-full">
                      <h2 className="font-bold text-foreground mb-1">{preset.name}</h2>
                      <p className="text-sm text-muted-foreground mb-3 flex-1">{preset.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">{preset.items} items</Badge>
                        <Badge variant="outline">{preset.minutes} minutes</Badge>
                        <Badge variant={short ? 'destructive' : 'secondary'}>
                          {short ? `only ${available} available` : `${available} in the bank`}
                        </Badge>
                      </div>

                      {short ? (
                        <p className="text-xs text-warning-800 bg-warning-50 border border-warning-200 rounded p-2 mb-3">
                          Your bank holds {available} approved questions, so this paper will be
                          shorter than {preset.items}. Every item you have will be used. Clear the
                          backlog in the draft review queue to grow it.
                        </p>
                      ) : null}

                      <Button
                        variant="primary"
                        onClick={() => start(preset)}
                        disabled={available === 0}
                      >
                        Start exam
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <Card className="p-5 bg-warning-50 border-warning-200">
              <p className="text-sm text-warning-900">
                <strong>Exam rules.</strong> Answers are not revealed while the exam runs. Unanswered
                items are marked wrong. The exam submits itself automatically when the clock reaches
                zero. Each attempt draws a fresh set of questions.
              </p>
            </Card>

            {pastMocks.length > 0 ? (
              <Card className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-4">Your mock exam history</h2>
                <ul className="divide-y divide-border">
                  {pastMocks.map((session) => (
                    <li key={session.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{session.date}</p>
                        <p className="text-xs text-muted-foreground">
                          {session.total} items &middot; +{session.xpEarned} XP
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-semibold ${
                            session.accuracy >= 75
                              ? 'text-success-700'
                              : session.accuracy >= 50
                                ? 'text-warning-700'
                                : 'text-error-700'
                          }`}
                        >
                          {session.accuracy}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.correct}/{session.total}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  No mock exams yet. Your results will appear here after your first attempt.
                </p>
              </Card>
            )}
          </motion.div>
        ) : null}

        {stage === 'running' && active ? (
          <motion.div
            key="running"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SessionPlayer
              questions={questions}
              mode="mock"
              timeLimitSeconds={active.minutes * 60}
              revealAnswers={false}
              title={active.name}
              subtitle="Answers are hidden until you submit"
              onFinish={handleFinish}
              onExit={() => setStage('setup')}
            />
          </motion.div>
        ) : null}

        {stage === 'results' && result ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SessionResults
              result={result}
              answers={answers}
              questions={questions}
              unlockedBadges={unlocked}
              topicNames={topicNames}
              subjectNames={subjectNames}
              onRetake={() => {
                dismissRecentBadges();
                if (active) start(active);
              }}
              onDone={() => {
                dismissRecentBadges();
                navigate('/student/home');
              }}
              onReviewMistakes={() => {
                dismissRecentBadges();
                navigate('/mistakes');
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default MockExamsPage;
