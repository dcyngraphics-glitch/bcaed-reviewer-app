import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SessionPlayer from '../SessionPlayer';
import type { Question } from '../../../types/content';
import type { SessionMode } from '../../../engine/scoring';

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

const questions: Question[] = [
  makeQuestion({ id: 'q1', prompt: 'Question one?' }),
  makeQuestion({ id: 'q2', prompt: 'Question two?' }),
  makeQuestion({ id: 'q3', prompt: 'Question three?' }),
];

describe('SessionPlayer', () => {
  describe('rendering', () => {
    test('renders the title', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByText('Practice Session')).toBeInTheDocument();
    });

    test('renders the subtitle when provided', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          subtitle="A subtitle"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByText('A subtitle')).toBeInTheDocument();
    });

    test('renders the first question prompt', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByText('Question one?')).toBeInTheDocument();
    });

    test('renders all four answer options', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByText('Paris')).toBeInTheDocument();
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('Berlin')).toBeInTheDocument();
      expect(screen.getByText('Madrid')).toBeInTheDocument();
    });

    test('renders difficulty badge', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByText('Intermediate')).toBeInTheDocument();
    });

    test('renders subject badge', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByText('Culture and Arts Education')).toBeInTheDocument();
    });

    test('renders vignette when present', () => {
      const q = makeQuestion({ vignette: 'A scenario about teaching.' });
      render(
        <SessionPlayer
          questions={[q]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByText('A scenario about teaching.')).toBeInTheDocument();
    });

    test('shows "No questions available" for empty question list', () => {
      render(
        <SessionPlayer
          questions={[]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByText('No questions available')).toBeInTheDocument();
    });

    test('shows exit button when onExit is provided', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
          onExit={() => {}}
        />,
      );
      expect(screen.getByRole('button', { name: /exit/i })).toBeInTheDocument();
    });

    test('hides exit button when onExit is not provided', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.queryByRole('button', { name: /exit/i })).not.toBeInTheDocument();
    });
  });

  describe('navigation', () => {
    test('shows "Next" button for non-last question', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    test('shows "Finish" button for last question', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByRole('button', { name: /finish/i })).toBeInTheDocument();
    });

    test('Previous button is disabled on first question', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
    });

    test('Next advances to the next question', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      expect(screen.getByText('Question two?')).toBeInTheDocument();
    });

    test('Previous goes back to the previous question', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      fireEvent.click(screen.getByRole('button', { name: /previous/i }));
      expect(screen.getByText('Question one?')).toBeInTheDocument();
    });

    test('shows question progress', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByText(/question 1 of 3/i)).toBeInTheDocument();
    });
  });

  describe('practice mode (revealAnswers=true)', () => {
    test('locks answer after selection in practice mode', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      fireEvent.click(screen.getByText('Paris'));
      // After selecting, the button should be disabled
      const parisButton = screen.getByText('Paris').closest('button');
      expect(parisButton).toBeDisabled();
    });

    test('shows correct feedback after selecting correct answer', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      fireEvent.click(screen.getByText('Paris'));
      // The feedback section should show "Correct"
      const feedback = screen.getByText('Paris is the capital of France.').closest('.bg-success-50');
      expect(feedback).toBeInTheDocument();
      expect(feedback).toHaveClass('border-success-500');
    });

    test('shows incorrect feedback after selecting wrong answer', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      fireEvent.click(screen.getByText('London'));
      // The feedback section should show "Not quite"
      const feedback = screen.getByText('Paris is the capital of France.').closest('.bg-error-50');
      expect(feedback).toBeInTheDocument();
      expect(feedback).toHaveClass('border-error-500');
    });

    test('shows explanation after answering', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      fireEvent.click(screen.getByText('Paris'));
      expect(screen.getByText('Paris is the capital of France.')).toBeInTheDocument();
    });
  });

  describe('exam mode (revealAnswers=false)', () => {
    test('does not reveal answer after selection', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="mock"
          revealAnswers={false}
          title="Mock Exam"
          onFinish={() => {}}
        />,
      );
      fireEvent.click(screen.getByText('Paris'));
      expect(screen.queryByText('Correct')).not.toBeInTheDocument();
      expect(screen.queryByText('Not quite')).not.toBeInTheDocument();
    });

    test('allows changing answer in exam mode', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="mock"
          revealAnswers={false}
          title="Mock Exam"
          onFinish={() => {}}
        />,
      );
      fireEvent.click(screen.getByText('Paris'));
      fireEvent.click(screen.getByText('London'));
      // Should not show feedback
      expect(screen.queryByText('Correct')).not.toBeInTheDocument();
    });

    test('shows "Submit now" button in non-practice mode', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="mock"
          revealAnswers={false}
          title="Mock Exam"
          onFinish={() => {}}
        />,
      );
      expect(screen.getByRole('button', { name: /submit now/i })).toBeInTheDocument();
    });

    test('hides "Submit now" button in practice mode', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      expect(screen.queryByRole('button', { name: /submit now/i })).not.toBeInTheDocument();
    });
  });

  describe('timer', () => {
    test('shows timer when timeLimitSeconds is provided', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="mock"
          revealAnswers={false}
          title="Mock Exam"
          timeLimitSeconds={600}
          onFinish={() => {}}
        />,
      );
      expect(screen.getByText(/time left/i)).toBeInTheDocument();
    });

    test('hides timer when timeLimitSeconds is null', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          timeLimitSeconds={null}
          onFinish={() => {}}
        />,
      );
      expect(screen.queryByText(/time left/i)).not.toBeInTheDocument();
    });
  });

  describe('finish', () => {
    test('calls onFinish when Finish is clicked on last question', () => {
      const onFinish = vi.fn();
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={onFinish}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: /finish/i }));
      expect(onFinish).toHaveBeenCalledOnce();
    });

    test('calls onFinish when Submit now is clicked', () => {
      const onFinish = vi.fn();
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="mock"
          revealAnswers={false}
          title="Mock Exam"
          onFinish={onFinish}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: /submit now/i }));
      expect(onFinish).toHaveBeenCalledOnce();
    });

    test('calls onExit when Exit is clicked', () => {
      const onExit = vi.fn();
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
          onExit={onExit}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: /exit/i }));
      expect(onExit).toHaveBeenCalledOnce();
    });
  });

  describe('design tokens', () => {
    test('uses design token classes for the header title', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      const title = screen.getByText('Practice Session');
      expect(title).toHaveClass('text-foreground');
    });

    test('uses design token classes for the card', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      // The Card component should use bg-card and shadow-md
      const card = screen.getByText('Question one?').closest('.bg-card');
      expect(card).toHaveClass('shadow-md');
    });

    test('uses design token classes for progress bar', () => {
      render(
        <SessionPlayer
          questions={questions}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      // Progress bar track should use bg-muted
      const progressTrack = document.querySelector('.bg-muted');
      expect(progressTrack).toBeInTheDocument();
    });

    test('uses design token classes for correct answer feedback', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      fireEvent.click(screen.getByText('Paris'));
      // The feedback should use success design tokens. "Correct" now appears
      // twice — an inline badge on the option plus the panel heading — so anchor
      // on the explanation, which is unique, and climb to the panel.
      const feedback = screen
        .getByText('Paris is the capital of France.')
        .closest('.bg-success-50');
      expect(feedback).toHaveClass('border-success-500');
      expect(screen.getByText('Correct')).toBeInTheDocument();
    });

    test('uses design token classes for incorrect answer feedback', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      fireEvent.click(screen.getByText('London'));
      // The feedback should use error design tokens
      const feedback = screen.getByText('Not quite').closest('.bg-error-50');
      expect(feedback).toHaveClass('border-error-500');
    });

    test('uses design token classes for selected answer', () => {
      render(
        <SessionPlayer
          questions={[questions[0]]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      fireEvent.click(screen.getByText('Paris'));
      const parisButton = screen.getByText('Paris').closest('button');
      expect(parisButton).toHaveClass('border-primary-600');
      expect(parisButton).toHaveClass('bg-primary-50');
    });

    test('uses design token classes for vignette', () => {
      const q = makeQuestion({ vignette: 'A scenario about teaching.' });
      render(
        <SessionPlayer
          questions={[q]}
          mode="practice"
          revealAnswers
          title="Practice Session"
          onFinish={() => {}}
        />,
      );
      const vignette = screen.getByText('A scenario about teaching.').closest('.bg-muted');
      expect(vignette).toHaveClass('border-neutral-300');
    });
  });
});
