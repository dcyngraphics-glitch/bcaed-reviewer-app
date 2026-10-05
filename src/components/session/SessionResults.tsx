import { motion } from 'framer-motion';
import Button from '../Button';
import Card from '../Card';
import Badge from '../Badge';
import ProgressRing from '../ProgressRing';
import { BADGES } from '../../gamification';
import type { AnswerRecord, SessionResult } from '../../engine/scoring';
import type { Question } from '../../types/content';
import { DIFFICULTY_LABELS } from '../../types/content';

export interface SessionResultsProps {
  result: SessionResult;
  answers: readonly AnswerRecord[];
  questions: readonly Question[];
  /** Badge ids unlocked by this session. */
  unlockedBadges?: readonly string[];
  /** Subject/topic display names for the breakdown. */
  topicNames?: Record<string, string>;
  subjectNames?: Record<string, string>;
  onRetake?: () => void;
  onReviewMistakes?: () => void;
  onDone: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'] as const;

function verdict(accuracy: number): { label: string; tone: string } {
  if (accuracy >= 90) return { label: 'Excellent', tone: 'text-green-700' };
  if (accuracy >= 75) return { label: 'Strong', tone: 'text-green-700' };
  if (accuracy >= 60) return { label: 'Getting there', tone: 'text-amber-700' };
  if (accuracy >= 40) return { label: 'Needs work', tone: 'text-amber-700' };
  return { label: 'Review this topic', tone: 'text-red-700' };
}

/**
 * Post-session report. Everything the plan asks for after a mock exam lives
 * here: score, correct and wrong answers, the student's pick, the right answer,
 * the explanation, subject/topic, and time information.
 */
const SessionResults = ({
  result,
  answers,
  questions,
  unlockedBadges = [],
  topicNames = {},
  subjectNames = {},
  onRetake,
  onReviewMistakes,
  onDone,
}: SessionResultsProps) => {
  const { label, tone } = verdict(result.accuracy);

  const byId = new Map(questions.map((q) => [q.id, q]));
  const answerById = new Map(answers.map((a) => [a.questionId, a]));

  // Wrong or unanswered only — a wall of correct answers is not a study aid.
  const toReview = result.mistakes
    .map((mistake) => ({ mistake, question: byId.get(mistake.questionId) }))
    .filter((entry): entry is { mistake: AnswerRecord; question: Question } => Boolean(entry.question));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Score */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <ProgressRing
            value={result.accuracy}
            size={112}
            strokeWidth={9}
            color={result.accuracy >= 75 ? 'stroke-green-600' : result.accuracy >= 50 ? 'stroke-amber-500' : 'stroke-red-600'}
            labelColor={tone}
          />

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">Session complete</h1>
            <p className={`text-lg font-semibold ${tone}`}>{label}</p>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
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
          </div>
        </div>
      </Card>

      {/* Badges unlocked */}
      {unlockedBadges.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-6 border-primary-200 bg-primary-50">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Badge unlocked</h2>
            <div className="flex flex-wrap gap-3">
              {unlockedBadges.map((id) => {
                const badge = BADGES.find((b) => b.id === id);
                if (!badge) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 shadow-sm"
                  >
                    <span className="text-2xl" aria-hidden="true">
                      {badge.icon}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{badge.name}</p>
                      <p className="text-xs text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      ) : null}

      {/* Topic breakdown */}
      {result.byTopic.length > 0 ? (
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Performance by topic</h2>
          <div className="space-y-3">
            {result.byTopic.map((topic) => (
              <div key={topic.topicId}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">
                    {topicNames[topic.topicId] ?? topic.topicId}
                  </span>
                  <span className="text-gray-500">
                    {topic.correct}/{topic.attempted} &middot; {topic.accuracy}%
                  </span>
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

          {result.bySubject.length > 0 ? (
            <div className="mt-5 pt-5 border-t border-gray-200 flex flex-wrap gap-2">
              {result.bySubject.map((subject) => (
                <Badge key={subject.subjectId} variant="outline">
                  {subjectNames[subject.subjectId] ?? subject.subjectId}: {subject.accuracy}%
                </Badge>
              ))}
            </div>
          ) : null}
        </Card>
      ) : null}

      {/* Answer review */}
      {toReview.length > 0 ? (
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Review your answers</h2>
          <p className="text-sm text-gray-500 mb-4">
            {toReview.length} item{toReview.length === 1 ? '' : 's'} to go over.
          </p>

          <ol className="space-y-5">
            {toReview.map(({ question }) => {
              const answer = answerById.get(question.id);
              const picked = answer?.chosenIndex ?? null;

              return (
                <li key={question.id} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline">{DIFFICULTY_LABELS[question.difficulty]}</Badge>
                    <Badge variant="secondary">
                      {topicNames[question.topicId] ?? question.topicId}
                    </Badge>
                  </div>

                  <p className="font-medium text-gray-900 mb-3">{question.prompt}</p>

                  <div className="space-y-2 text-sm">
                    {picked === null ? (
                      <p className="text-gray-500 italic">You left this unanswered.</p>
                    ) : (
                      <p className="text-red-700">
                        <span className="font-medium">Your answer: </span>
                        {LETTERS[picked]}. {question.options[picked]}
                      </p>
                    )}
                    <p className="text-green-700">
                      <span className="font-medium">Correct answer: </span>
                      {LETTERS[question.correctIndex]}. {question.options[question.correctIndex]}
                    </p>
                  </div>

                  <div className="mt-3 rounded-lg bg-blue-50 border-l-4 border-blue-500 p-3">
                    <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-1">
                      Explanation
                    </p>
                    <p className="text-sm text-gray-700">{question.explanation}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Card>
      ) : (
        <Card className="p-6 text-center bg-green-50 border-green-200">
          <p className="text-green-800 font-medium">
            Every answer was correct. Nothing to review.
          </p>
        </Card>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" onClick={onDone}>
          Done
        </Button>
        {onRetake ? (
          <Button variant="outline" onClick={onRetake}>
            Take another
          </Button>
        ) : null}
        {onReviewMistakes && toReview.length > 0 ? (
          <Button variant="outline" onClick={onReviewMistakes}>
            Practice these mistakes
          </Button>
        ) : null}
      </div>
    </motion.div>
  );
};

export default SessionResults;
