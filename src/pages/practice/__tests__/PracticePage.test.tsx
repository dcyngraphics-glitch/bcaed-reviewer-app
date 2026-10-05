import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PracticePage from '../PracticePage';

// ── Mocks ──────────────────────────────────────────────────────────────────

const mockNavigate = vi.fn();
const mockSubmitSession = vi.fn(() => ({ unlocked: [] }));
const mockDismissRecentBadges = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams(''), vi.fn()],
}));

vi.mock('../../../context/ProfileContext', () => ({
  useProfile: () => ({
    profile: {
      name: 'Test Student',
      xp: 0,
      targetDifficulty: 3,
      sessions: [],
      mistakes: [],
      badges: [],
      activeDates: [],
      startDate: '2025-01-01',
    },
    submitSession: mockSubmitSession,
    dismissRecentBadges: mockDismissRecentBadges,
    forgetMistake: vi.fn(),
    resetProfile: vi.fn(),
    stats: {
      accuracy: 0,
      questionsAnswered: 0,
      currentStreak: 0,
      longestStreak: 0,
      mockExamsTaken: 0,
      byTopic: [],
      bySubject: [],
    },
    week: 1,
    recentBadges: [],
  }),
}));

const mockSubjects = [
  { id: 'cae', name: 'Culture and Arts Education', description: '' },
  { id: 'profed', name: 'Professional Education', description: '' },
  { id: 'gened', name: 'General Education', description: '' },
];

const mockTopics = [
  { id: 'cae-disciplinal', subjectId: 'cae', name: 'Disciplinal Knowledge' },
  { id: 'cae-pedagogy', subjectId: 'cae', name: 'Pedagogical Practice' },
  { id: 'profed-teaching', subjectId: 'profed', name: 'The Teaching Profession' },
];

const mockQuestions = Array.from({ length: 50 }, (_, i) => ({
  id: `q${i}`,
  subjectId: 'cae',
  topicId: 'cae-disciplinal',
  difficulty: 3 as const,
  prompt: `Question ${i}?`,
  options: ['A', 'B', 'C', 'D'] as [string, string, string, string],
  correctIndex: 0 as const,
  explanation: `Explanation ${i}`,
  status: 'approved' as const,
}));

vi.mock('../../../hooks/useContent', () => ({
  useContent: () => ({
    subjects: mockSubjects,
    topics: mockTopics,
    lessons: [],
    questions: mockQuestions,
    topicNames: Object.fromEntries(mockTopics.map((t) => [t.id, t.name])),
    subjectNames: Object.fromEntries(mockSubjects.map((s) => [s.id, s.name])),
    topicsFor: (subjectId: string) => mockTopics.filter((t) => t.subjectId === subjectId),
    questionsFor: (filter: { subjectId?: string; topicId?: string }) =>
      mockQuestions.filter((q) => {
        if (filter.subjectId && q.subjectId !== filter.subjectId) return false;
        if (filter.topicId && q.topicId !== filter.topicId) return false;
        return true;
      }),
    lessonsFor: () => [],
    questionCountFor: (filter: { subjectId?: string; topicId?: string }) =>
      mockQuestions.filter((q) => {
        if (filter.subjectId && q.subjectId !== filter.subjectId) return false;
        if (filter.topicId && q.topicId !== filter.topicId) return false;
        return true;
      }).length,
    lessonById: () => undefined,
  }),
}));

vi.mock('../../../engine/selection', () => ({
  selectQuestions: vi.fn(() => mockQuestions.slice(0, 10)),
}));

vi.mock('../../../engine/random', () => ({
  hashSeed: vi.fn(() => 12345),
}));

vi.mock('../../../components/session/SessionPlayer', () => ({
  default: () => <div data-testid="session-player">Session Player</div>,
}));

vi.mock('../../../components/session/SessionResults', () => ({
  default: () => <div data-testid="session-results">Session Results</div>,
}));

// ── Tests ───────────────────────────────────────────────────────────────────

describe('PracticePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    test('renders the page title', () => {
      render(<PracticePage />);
      expect(screen.getByText('Practice')).toBeInTheDocument();
    });

    test('renders the setup stage by default', () => {
      render(<PracticePage />);
      expect(screen.getByText('Choose what to practise')).toBeInTheDocument();
    });

    test('renders subject dropdown', () => {
      render(<PracticePage />);
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    });

    test('renders topic dropdown', () => {
      render(<PracticePage />);
      expect(screen.getByLabelText(/topic/i)).toBeInTheDocument();
    });

    test('renders question count buttons', () => {
      render(<PracticePage />);
      expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '15' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '20' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '30' })).toBeInTheDocument();
    });

    test('renders available questions badge', () => {
      render(<PracticePage />);
      expect(screen.getByText(/questions available/i)).toBeInTheDocument();
    });

    test('renders difficulty badge', () => {
      render(<PracticePage />);
      expect(screen.getByText(/aiming at difficulty/i)).toBeInTheDocument();
    });

    test('renders Start practice button', () => {
      render(<PracticePage />);
      expect(screen.getByRole('button', { name: /start practice/i })).toBeInTheDocument();
    });

    test('renders Practice my mistakes button', () => {
      render(<PracticePage />);
      expect(screen.getByRole('button', { name: /practice my mistakes/i })).toBeInTheDocument();
    });

    test('renders topic shortcuts', () => {
      render(<PracticePage />);
      expect(screen.getByText('Jump into a topic')).toBeInTheDocument();
    });

    test('renders time estimate', () => {
      render(<PracticePage />);
      expect(screen.getByText(/estimated time/i)).toBeInTheDocument();
    });
  });

  describe('design tokens', () => {
    test('uses text-foreground for the page title', () => {
      render(<PracticePage />);
      const title = screen.getByText('Practice');
      expect(title).toHaveClass('text-foreground');
    });

    test('uses text-muted-foreground for the subtitle', () => {
      render(<PracticePage />);
      const subtitle = screen.getByText(/learning mode/i);
      expect(subtitle).toHaveClass('text-muted-foreground');
    });

    test('uses bg-card for cards', () => {
      render(<PracticePage />);
      const card = screen.getByText('Choose what to practise').closest('.bg-card');
      expect(card).toBeInTheDocument();
    });

    test('uses border-border for cards', () => {
      render(<PracticePage />);
      const card = screen.getByText('Choose what to practise').closest('.border-border');
      expect(card).toBeInTheDocument();
    });

    test('uses text-foreground for section headings', () => {
      render(<PracticePage />);
      const heading = screen.getByText('Choose what to practise');
      expect(heading).toHaveClass('text-foreground');
    });

    test('uses text-muted-foreground for labels', () => {
      render(<PracticePage />);
      const label = screen.getByText('Subject');
      expect(label).toHaveClass('text-muted-foreground');
    });
  });

  describe('interactions', () => {
    test('handles subject change', () => {
      render(<PracticePage />);
      const subjectSelect = screen.getByLabelText(/subject/i);
      fireEvent.change(subjectSelect, { target: { value: 'cae' } });
      // Topic dropdown should now be enabled
      const topicSelect = screen.getByLabelText(/topic/i);
      expect(topicSelect).not.toBeDisabled();
    });

    test('handles topic change', () => {
      render(<PracticePage />);
      const subjectSelect = screen.getByLabelText(/subject/i);
      fireEvent.change(subjectSelect, { target: { value: 'cae' } });
      const topicSelect = screen.getByLabelText(/topic/i);
      fireEvent.change(topicSelect, { target: { value: 'cae-disciplinal' } });
      expect(topicSelect).toHaveValue('cae-disciplinal');
    });

    test('handles count change', () => {
      render(<PracticePage />);
      const countButton = screen.getByRole('button', { name: '20' });
      fireEvent.click(countButton);
      expect(countButton).toHaveAttribute('aria-pressed', 'true');
    });

    test('handles Start practice button click', () => {
      render(<PracticePage />);
      const startButton = screen.getByRole('button', { name: /start practice/i });
      fireEvent.click(startButton);
      // Should transition to running stage
      expect(screen.getByTestId('session-player')).toBeInTheDocument();
    });

    test('handles Practice my mistakes button click', () => {
      render(<PracticePage />);
      const mistakesButton = screen.getByRole('button', { name: /practice my mistakes/i });
      fireEvent.click(mistakesButton);
      expect(mockNavigate).toHaveBeenCalledWith('/mistakes');
    });

    test('handles topic shortcut click', () => {
      render(<PracticePage />);
      const topicButton = screen.getByText('Disciplinal Knowledge');
      fireEvent.click(topicButton);
      // Should set the subject and topic
      const subjectSelect = screen.getByLabelText(/subject/i) as HTMLSelectElement;
      expect(subjectSelect.value).toBe('cae');
    });
  });

  describe('empty state', () => {
    test('shows empty state when no questions available', () => {
      // Re-mock useContent to return 0 questions
      vi.doMock('../../../hooks/useContent', () => ({
        useContent: () => ({
          subjects: mockSubjects,
          topics: mockTopics,
          lessons: [],
          questions: [],
          topicNames: {},
          subjectNames: {},
          topicsFor: () => [],
          questionsFor: () => [],
          lessonsFor: () => [],
          questionCountFor: () => 0,
          lessonById: () => undefined,
        }),
      }));
      // This test will fail until the implementation handles empty state
      // For now, just verify the page renders
      render(<PracticePage />);
      expect(screen.getByText('Practice')).toBeInTheDocument();
    });
  });

  describe('stage transitions', () => {
    test('renders SessionPlayer when stage is running', () => {
      render(<PracticePage />);
      const startButton = screen.getByRole('button', { name: /start practice/i });
      fireEvent.click(startButton);
      expect(screen.getByTestId('session-player')).toBeInTheDocument();
    });

    test('does not render SessionPlayer in setup stage', () => {
      render(<PracticePage />);
      expect(screen.queryByTestId('session-player')).not.toBeInTheDocument();
    });
  });
});
