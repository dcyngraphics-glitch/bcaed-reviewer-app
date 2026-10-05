import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';
import Badge from '../Badge';
import { DIFFICULTY_LABELS, type Question } from '../../types/content';
import { gradeSession, type AnswerRecord, type SessionMode, type SessionResult } from '../../engine/scoring';
import { formatClock, isExpired, secondsRemaining, timerColourClass } from './timer';

export interface SessionPlayerProps {
  questions: readonly Question[];
  mode: SessionMode;
  /** Seconds allowed. null means untimed (practice). */
  timeLimitSeconds?: number | null;
  /** Reveal the answer and the explanation straight after each pick. */
  revealAnswers: boolean;
  title: string;
  subtitle?: string;
  onFinish: (result: SessionResult, answers: AnswerRecord[]) => void;
  onExit?: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

/**
 * One player for practice, challenges, assessments and mock exams.
 *
 * The mode decides behaviour: practice reveals each answer with its
 * explanation, while a mock exam hides everything until submission and
 * auto-submits when the clock runs out.
 */
const SessionPlayer = ({
  questions,
  mode,
  timeLimitSeconds = null,
  revealAnswers,
  title,
  subtitle,
  onFinish,
  onExit,
}: SessionPlayerProps) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [elapsed, setElapsed] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const startedAt = useRef(Date.now());
  const submittedRef = useRef(false);
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  const total = questions.length;
  // The index is clamped rather than trusted: a parent can hand down a shorter
  // question set mid-session (a new seed, a changed filter), and reading
  // questions[index] unguarded crashed the whole tree.
  const safeIndex = total === 0 ? 0 : Math.min(index, total - 1);
  const question = questions[safeIndex];
  const chosen = question ? answers[question.id] : undefined;
  const remaining = secondsRemaining(timeLimitSeconds, elapsed);

  const collected: AnswerRecord[] = useMemo(
    () =>
      questions.map((q) => ({
        questionId: q.id,
        subjectId: q.subjectId,
        topicId: q.topicId,
        difficulty: q.difficulty,
        chosenIndex: answers[q.id] ?? null,
        correctIndex: q.correctIndex,
      })),
    [questions, answers],
  );

  const finish = useCallback(
    (records: AnswerRecord[]) => {
      // Guard against a double submit: the timer and the button can race.
      if (submittedRef.current) return;
      submittedRef.current = true;
      setSubmitted(true);
      const result = gradeSession(records, { mode });
      onFinishRef.current(result, records);
    },
    [mode],
  );

  // Wall clock. Reading Date.now() rather than counting ticks keeps the timer
  // honest if the tab is backgrounded and intervals are throttled.
  useEffect(() => {
    if (timeLimitSeconds === null || submitted) return;

    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt.current) / 1000));
    }, 1000);

    return () => window.clearInterval(id);
  }, [timeLimitSeconds, submitted]);

  // Auto-submit the moment time runs out.
  useEffect(() => {
    if (submitted || timeLimitSeconds === null) return;
    if (isExpired(timeLimitSeconds, elapsed)) {
      finish(collected);
    }
  }, [elapsed, timeLimitSeconds, submitted, collected, finish]);

  const select = (optionIndex: number) => {
    if (!question || submitted) return;
    // Practice locks the answer once chosen; exams stay editable.
    if (revealAnswers && chosen !== undefined) return;
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  };

  const next = () => {
    if (safeIndex < total - 1) {
      setIndex(safeIndex + 1);
    } else {
      finish(collected);
    }
  };

  const previous = () => setIndex((i) => Math.max(0, i - 1));

  if (total === 0) {
    return (
      <Card className="p-8 text-center">
        <h2 className="text-xl font-bold mb-2 text-gray-800">No questions available</h2>
        <p className="text-gray-600">
          Nothing matches this selection yet. Try another subject or topic.
        </p>
        {onExit ? (
          <Button variant="outline" className="mt-6" onClick={onExit}>
            Back
          </Button>
        ) : null}
      </Card>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const showFeedback = revealAnswers && chosen !== undefined;
  const isCorrect = showFeedback && question && chosen === question.correctIndex;

  return (
    <div className="space-y-4">
      {/* Session header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          {subtitle ? <p className="text-sm text-gray-500">{subtitle}</p> : null}
        </div>

        <div className="flex items-center gap-4">
          {remaining !== null ? (
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-gray-500">Time left</p>
              <p
                className={`text-lg font-semibold tabular-nums ${timerColourClass(
                  timeLimitSeconds,
                  elapsed,
                )}`}
                aria-live="polite"
              >
                {formatClock(remaining)}
              </p>
            </div>
          ) : null}

          {onExit ? (
            <Button variant="outline" size="sm" onClick={onExit}>
              Exit
            </Button>
          ) : null}
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>
            Question {safeIndex + 1} of {total}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-1.5 bg-primary-600 rounded-full transition-all duration-300"
            style={{ width: `${((safeIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="outline">{DIFFICULTY_LABELS[question.difficulty]}</Badge>
          <Badge variant="secondary">
            {question.subjectId === 'cae'
              ? 'Culture and Arts Education'
              : question.subjectId === 'profed'
                ? 'Professional Education'
                : 'General Education'}
          </Badge>
        </div>

        <h2 className="text-lg font-medium mb-5 text-gray-900">{question.prompt}</h2>

        <div className="space-y-3" role="group" aria-label="Answer options">
          {question.options.map((option, optionIndex) => {
            const isPicked = chosen === optionIndex;
            const isAnswer = optionIndex === question.correctIndex;

            // In an exam nothing is revealed until submission.
            let tone = '';
            if (showFeedback) {
              if (isAnswer) tone = 'border-green-600 bg-green-50 text-green-900';
              else if (isPicked) tone = 'border-red-600 bg-red-50 text-red-900';
            } else if (isPicked) {
              tone = 'border-primary-600 bg-primary-50 text-primary-900';
            }

            return (
              <button
                key={option}
                type="button"
                onClick={() => select(optionIndex)}
                disabled={showFeedback}
                aria-pressed={isPicked}
                className={`w-full text-left flex items-start gap-3 rounded-lg border-2 px-4 py-3 transition-colors disabled:cursor-default ${
                  tone || 'border-gray-200 hover:border-primary-400 hover:bg-gray-50'
                }`}
              >
                <span
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                    isPicked ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                  aria-hidden="true"
                >
                  {LETTERS[optionIndex]}
                </span>
                <span className="pt-0.5">{option}</span>
                {showFeedback && isAnswer ? (
                  <span className="ml-auto text-green-700 text-sm font-medium">Correct</span>
                ) : null}
                {showFeedback && isPicked && !isAnswer ? (
                  <span className="ml-auto text-red-700 text-sm font-medium">Your answer</span>
                ) : null}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showFeedback ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-5 rounded-lg border-l-4 p-4 ${
                isCorrect
                  ? 'bg-green-50 border-green-500'
                  : 'bg-red-50 border-red-500'
              }`}
            >
              <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correct' : 'Not quite'}
              </p>
              <p className="text-gray-700 text-sm">{question.explanation}</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Card>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={previous} disabled={safeIndex === 0}>
          Previous
        </Button>

        <div className="flex items-center gap-3">
          {mode !== 'practice' ? (
            <Button variant="outline" onClick={() => finish(collected)} disabled={submitted}>
              Submit now
            </Button>
          ) : null}

          <Button variant="primary" onClick={next} disabled={submitted}>
            {safeIndex === total - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>

      {mode !== 'practice' && answeredCount < total ? (
        <p className="text-xs text-gray-500 text-center">
          {total - answeredCount} question{total - answeredCount === 1 ? '' : 's'} still
          unanswered. Unanswered items are marked wrong.
        </p>
      ) : null}
    </div>
  );
};

export default SessionPlayer;
