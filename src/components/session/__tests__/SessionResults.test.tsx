import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SessionResults from '../SessionResults';
import type { Question } from '../../../types/content';
import type { AnswerRecord, SessionResult } from '../../../engine/scoring';

const makeQuestion = (overrides: Partial<Question> = {}): Question => ({
  id: 'q1',
  subjectId: 'cae',
  topicId: 't1',
  difficulty: 3,
  prompt: 'What is the capital of France?',
  options: ['Paris', 'London', 'Berlin', 'Madrid'],
  correctIndex: 0,
  explanation: 'Paris is the capital of France.',
  status: 'approved',
  ...overrides,
});

const makeAnswer = (overrides: Partial<AnswerRecord> = {}): AnswerRecord => ({
  questionId: 'q1',
  subjectId: 'cae',
  topicId: 't1',
  difficulty: 3,
  chosenIndex: 0,
  correctIndex: 0,
  ...overrides,
});

const makeResult = (overrides: Partial<SessionResult> = {}): SessionResult => ({
  total: 4,
  correct: 3,
  wrong: 1,
  unanswered: 0,
  accuracy: 75,
  xpEarned: 45,
  perfect: false,
  mistakes: [makeAnswer({ questionId: 'q2', chosenIndex: 1, correctIndex: 0 })],
  byTopic: [{ topicId: 't1', attempted: 4, correct: 3, accuracy: 75 }],
  bySubject: [{ subjectId: 'cae', attempted: 4, correct: 3, accuracy: 75 }],
  ...overrides,
});

const questions: Question[] = [
  makeQuestion({ id: 'q1', prompt: 'Question one?' }),
  makeQuestion({ id: 'q2', prompt: 'Question two?', correctIndex: 1 }),
  makeQuestion({ id: 'q3', prompt: 'Question three?' }),
  makeQuestion({ id: 'q4', prompt: 'Question four?' }),
];

const answers: AnswerRecord[] = [
  makeAnswer({ questionId: 'q1', chosenIndex: 0, correctIndex: 0 }),
  makeAnswer({ questionId: 'q2', chosenIndex: 1, correctIndex: 1 }),
  makeAnswer({ questionId: 'q3', chosenIndex: 0, correctIndex: 0 }),
  makeAnswer({ questionId: 'q4', chosenIndex: 0, correctIndex: 0 }),
];

describe('SessionResults', () => {
  describe('rendering', () => {
    test('renders "Session complete" heading', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('Session complete')).toBeInTheDocument();
    });

    test('renders the verdict label for strong performance', () => {
      render(
        <SessionResults
          result={makeResult({ accuracy: 75 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('Strong')).toBeInTheDocument();
    });

    test('renders the verdict label for excellent performance', () => {
      render(
        <SessionResults
          result={makeResult({ accuracy: 95 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('Excellent')).toBeInTheDocument();
    });

    test('renders the verdict label for needs work', () => {
      render(
        <SessionResults
          result={makeResult({ accuracy: 30 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('Review this topic')).toBeInTheDocument();
    });

    test('renders correct count', () => {
      render(
        <SessionResults
          result={makeResult({ correct: 3 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('renders wrong count', () => {
      render(
        <SessionResults
          result={makeResult({ wrong: 1 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    test('renders unanswered count', () => {
      render(
        <SessionResults
          result={makeResult({ unanswered: 2 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('renders XP earned', () => {
      render(
        <SessionResults
          result={makeResult({ xpEarned: 45 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('+45')).toBeInTheDocument();
    });

    test('renders ProgressRing with accuracy', () => {
      render(
        <SessionResults
          result={makeResult({ accuracy: 75 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      const ring = screen.getByRole('progressbar');
      expect(ring).toHaveAttribute('aria-valuenow', '75');
    });
  });

  describe('badges', () => {
    test('renders unlocked badges', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          unlockedBadges={['first-step']}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('First Step')).toBeInTheDocument();
      expect(screen.getByText('Complete your first study session.')).toBeInTheDocument();
    });

    test('does not render badge section when no badges unlocked', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.queryByText('Badge unlocked')).not.toBeInTheDocument();
    });
  });

  describe('topic breakdown', () => {
    test('renders topic performance', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          topicNames={{ t1: 'Topic One' }}
          onDone={() => {}}
        />,
      );
      // Topic name appears in both topic breakdown and answer review
      const topicElements = screen.getAllByText('Topic One');
      expect(topicElements.length).toBeGreaterThan(0);
    });

    test('renders topic accuracy', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      // Topic accuracy appears in both topic breakdown and subject badge
      const accuracyElements = screen.getAllByText(/75%/);
      expect(accuracyElements.length).toBeGreaterThan(0);
    });

    test('renders subject badges', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          subjectNames={{ cae: 'Culture and Arts' }}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('Culture and Arts: 75%')).toBeInTheDocument();
    });
  });

  describe('answer review', () => {
    test('renders review section for mistakes', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('Review your answers')).toBeInTheDocument();
    });

    test('renders the question prompt in review', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('Question two?')).toBeInTheDocument();
    });

    test('renders the correct answer', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText(/Correct answer:/)).toBeInTheDocument();
      // The correct answer for q2 is B. London
      const correctAnswers = screen.getAllByText(/B\. London/);
      expect(correctAnswers.length).toBeGreaterThan(0);
    });

    test('renders the user answer', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText(/Your answer:/)).toBeInTheDocument();
      // The user answer for q2 is B. London
      const userAnswers = screen.getAllByText(/B\. London/);
      expect(userAnswers.length).toBeGreaterThan(0);
    });

    test('renders explanation', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText('Paris is the capital of France.')).toBeInTheDocument();
    });

    test('renders "unanswered" for null chosenIndex', () => {
      const unansweredAnswer = makeAnswer({ questionId: 'q2', chosenIndex: null, correctIndex: 0 });
      render(
        <SessionResults
          result={makeResult({ mistakes: [unansweredAnswer] })}
          answers={[answers[0], unansweredAnswer, answers[2], answers[3]]}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText(/You left this unanswered/i)).toBeInTheDocument();
    });

    test('renders "nothing to review" when all correct', () => {
      render(
        <SessionResults
          result={makeResult({ mistakes: [], correct: 4, wrong: 0, accuracy: 100 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.getByText(/Every answer was correct/i)).toBeInTheDocument();
    });
  });

  describe('actions', () => {
    test('calls onDone when Done is clicked', () => {
      const onDone = vi.fn();
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={onDone}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: /done/i }));
      expect(onDone).toHaveBeenCalledOnce();
    });

    test('calls onRetake when Take another is clicked', () => {
      const onRetake = vi.fn();
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
          onRetake={onRetake}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: /take another/i }));
      expect(onRetake).toHaveBeenCalledOnce();
    });

    test('calls onReviewMistakes when Practice these mistakes is clicked', () => {
      const onReviewMistakes = vi.fn();
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
          onReviewMistakes={onReviewMistakes}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: /practice these mistakes/i }));
      expect(onReviewMistakes).toHaveBeenCalledOnce();
    });

    test('hides Take another when onRetake not provided', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      expect(screen.queryByRole('button', { name: /take another/i })).not.toBeInTheDocument();
    });

    test('hides Practice these mistakes when no mistakes', () => {
      render(
        <SessionResults
          result={makeResult({ mistakes: [] })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
          onReviewMistakes={() => {}}
        />,
      );
      expect(screen.queryByRole('button', { name: /practice these mistakes/i })).not.toBeInTheDocument();
    });
  });

  describe('design tokens', () => {
    test('uses design token classes for the score card', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      const heading = screen.getByText('Session complete');
      expect(heading).toHaveClass('text-gray-900');
    });

    test('uses design token classes for correct count', () => {
      render(
        <SessionResults
          result={makeResult({ correct: 3 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      const correctLabel = screen.getByText('Correct');
      expect(correctLabel).toHaveClass('text-gray-500');
    });

    test('uses design token classes for wrong count', () => {
      render(
        <SessionResults
          result={makeResult({ wrong: 1 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      const wrongLabel = screen.getByText('Wrong');
      expect(wrongLabel).toHaveClass('text-gray-500');
    });

    test('uses design token classes for XP', () => {
      render(
        <SessionResults
          result={makeResult({ xpEarned: 45 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      const xpLabel = screen.getByText('XP earned');
      expect(xpLabel).toHaveClass('text-gray-500');
    });

    test('uses design token classes for topic breakdown', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      const topicHeading = screen.getByText('Performance by topic');
      expect(topicHeading).toHaveClass('text-gray-900');
    });

    test('uses design token classes for review section', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      const reviewHeading = screen.getByText('Review your answers');
      expect(reviewHeading).toHaveClass('text-gray-900');
    });

    test('uses design token classes for explanation box', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      const explanation = screen.getByText('Paris is the capital of France.');
      const box = explanation.closest('.bg-blue-50');
      expect(box).toHaveClass('border-blue-500');
    });

    test('uses design token classes for badge card', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          unlockedBadges={['first-step']}
          onDone={() => {}}
        />,
      );
      const badgeCard = screen.getByText('First Step').closest('.bg-primary-50');
      expect(badgeCard).toHaveClass('border-primary-200');
    });

    test('uses design token classes for topic progress bar', () => {
      render(
        <SessionResults
          result={makeResult()}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      // Topic progress bar track
      const track = document.querySelector('.bg-gray-200');
      expect(track).toBeInTheDocument();
    });

    test('uses design token classes for "nothing to review" card', () => {
      render(
        <SessionResults
          result={makeResult({ mistakes: [], correct: 4, wrong: 0, accuracy: 100 })}
          answers={answers}
          questions={questions}
          onDone={() => {}}
        />,
      );
      const card = screen.getByText(/Every answer was correct/i).closest('.bg-green-50');
      expect(card).toHaveClass('border-green-200');
    });
  });
});
