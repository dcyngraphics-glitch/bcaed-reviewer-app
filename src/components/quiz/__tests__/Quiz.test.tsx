import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Quiz from '../Quiz';
import type { QuizQuestion } from '../../../data/quizQuestions';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Pick the first option',
    options: ['First', 'Second', 'Third', 'Fourth'],
    correctAnswer: 0,
    explanation: 'Because it is first.',
  },
  {
    id: 2,
    question: 'Pick the second option',
    options: ['Alpha', 'Beta', 'Gamma', 'Delta'],
    correctAnswer: 1,
    explanation: 'Because it is second.',
  },
];

describe('Quiz', () => {
  test('renders an empty state instead of crashing on an empty set', () => {
    // The old version indexed questions[0] unguarded and divided by
    // questions.length, producing a crash and a NaN% accuracy label.
    render(<Quiz questions={[]} />);
    expect(screen.getByText(/no questions available/i)).toBeInTheDocument();
  });

  test('allows selecting option index 0', async () => {
    // The old guard was `!selectedAnswer`, and index 0 is falsy, so the very
    // first option could never be chosen or scored.
    const user = userEvent.setup();
    render(<Quiz questions={questions} />);

    await user.click(screen.getByRole('button', { name: 'First' }));
    expect(screen.getByText('Because it is first.')).toBeInTheDocument();
  });

  test('locks options after an answer is chosen', () => {
    render(<Quiz questions={questions} />);

    fireEvent.click(screen.getByRole('button', { name: 'Second' }));

    for (const option of ['First', 'Second', 'Third', 'Fourth']) {
      expect(screen.getByRole('button', { name: option })).toBeDisabled();
    }
  });

  test('scores a correct answer and shows a positive result', async () => {
    const user = userEvent.setup();
    render(<Quiz questions={questions} />);

    await user.click(screen.getByRole('button', { name: 'First' }));
    expect(screen.getByRole('button', { name: 'First' })).toHaveClass('bg-green-600');

    await user.click(screen.getByRole('button', { name: /next question/i }));
    await user.click(screen.getByRole('button', { name: 'Beta' }));
    await user.click(screen.getByRole('button', { name: /finish quiz/i }));

    expect(screen.getByText(/you scored 2 out of 2/i)).toBeInTheDocument();
    expect(screen.getByText('100% Accuracy')).toBeInTheDocument();
  });

  test('marks a wrong answer and does not score it', async () => {
    const user = userEvent.setup();
    render(<Quiz questions={questions} />);

    await user.click(screen.getByRole('button', { name: 'Third' }));
    expect(screen.getByRole('button', { name: 'Third' })).toHaveClass('bg-red-600');

    await user.click(screen.getByRole('button', { name: /next question/i }));
    await user.click(screen.getByRole('button', { name: 'Alpha' }));
    await user.click(screen.getByRole('button', { name: /finish quiz/i }));

    expect(screen.getByText(/you scored 0 out of 2/i)).toBeInTheDocument();
    expect(screen.getByText('0% Accuracy')).toBeInTheDocument();
  });

  test('exposes a working forward action on the first question', () => {
    // "Skip Question" was rendered only when !showExplanation and disabled on
    // selectedAnswer === null, so it was permanently unclickable.
    render(<Quiz questions={questions} />);
    expect(screen.getByRole('button', { name: /next question/i })).toBeEnabled();
    expect(screen.queryByRole('button', { name: /skip question/i })).toBeNull();
  });

  test('restarts cleanly', async () => {
    const user = userEvent.setup();
    render(<Quiz questions={questions} />);

    await user.click(screen.getByRole('button', { name: 'First' }));
    await user.click(screen.getByRole('button', { name: /next question/i }));
    await user.click(screen.getByRole('button', { name: 'Beta' }));
    await user.click(screen.getByRole('button', { name: /finish quiz/i }));

    await user.click(screen.getByRole('button', { name: /retake quiz/i }));
    expect(screen.getByText(/question 1 of 2/i)).toBeInTheDocument();
  });
});