import { useCallback, useMemo, useState } from 'react';
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

/**
 * Presets mirror the real LET paper shape: 150 items at a little over a minute
 * each. Shorter presets exist so a student can sit one in a single sitting.
 */
/**
 * Presets are sized from the real exam table: a subtest is 150 items in a fixed
 * window, so a per-item budget is derived rather than guessed. Gen Ed is the
 * tightest paper of the day at 48 seconds per item.
 */
const presetFrom = (
  id: string,
  name: string,
  subtestId: 'gened' | 'profed' | 'cae' | null,
  items: number,
  description: string,
): ExamPreset => {
  const subtest = subtestId ? SUBTESTS.find((s) => s.id === subtestId) : undefined;
  // Use the real subtest budget when we have one; otherwise the Specialization
  // budget, which is the most generous paper of the day.
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
    'Marathon paper — 350 items',
    null,
    350,
    'The long sit: three subtest-shaped sections sized by TOS weight (70 Gen Ed, 140 Prof Ed, 140 Specialization). The real exam is 450 items across a whole day — this is the longest single paper we can hold, not a replica of the day.',
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
    'Your specialization — 40% of the Secondary rating.',
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
      // Mock exams lean heavily situational: that is what exam day looks like.
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mock exams</h1>
        <p className="text-gray-600">
          Timed, randomised and graded like the real thing. Answers stay hidden until you submit.
        </p>
      </div>

      {stage === 'setup' ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {PRESETS.map((preset) => {
              const available = questionsFor({ subjectId: preset.subjectId }).length;
              // A preset can promise more items than the bank can supply. Saying
              // "350 items" on a card when only 158 exist would be a lie the
              // student discovers mid-exam, so the shortfall is shown here.
              const short = preset.items > available;
              return (
                <Card key={preset.id} className="p-5 flex flex-col">
                  <h2 className="font-bold text-gray-900 mb-1">{preset.name}</h2>
                  <p className="text-sm text-gray-600 mb-3 flex-1">{preset.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">{preset.items} items</Badge>
                    <Badge variant="outline">{preset.minutes} minutes</Badge>
                    <Badge variant={short ? 'destructive' : 'secondary'}>
                      {short ? `only ${available} available` : `${available} in the bank`}
                    </Badge>
                  </div>

                  {short ? (
                    <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded p-2 mb-3">
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
              );
            })}
          </div>

          <Card className="p-5 bg-amber-50 border-amber-200">
            <p className="text-sm text-amber-900">
              <strong>Exam rules.</strong> Answers are not revealed while the exam runs. Unanswered
              items are marked wrong. The exam submits itself automatically when the clock reaches
              zero. Each attempt draws a fresh set of questions.
            </p>
          </Card>

          {pastMocks.length > 0 ? (
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your mock exam history</h2>
              <ul className="divide-y divide-gray-100">
                {pastMocks.map((session) => (
                  <li key={session.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{session.date}</p>
                      <p className="text-xs text-gray-500">
                        {session.total} items &middot; +{session.xpEarned} XP
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-semibold ${
                          session.accuracy >= 75
                            ? 'text-green-700'
                            : session.accuracy >= 50
                              ? 'text-amber-700'
                              : 'text-red-700'
                        }`}
                      >
                        {session.accuracy}%
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.correct}/{session.total}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </>
      ) : null}

      {stage === 'running' && active ? (
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
      ) : null}

      {stage === 'results' && result ? (
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
      ) : null}
    </div>
  );
};

export default MockExamsPage;
