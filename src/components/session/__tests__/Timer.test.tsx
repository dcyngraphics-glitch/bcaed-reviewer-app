import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import Timer from '../Timer.tsx';

describe('Timer Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  test('renders with a time limit', () => {
    render(<Timer limitSeconds={600} elapsedSeconds={0} />);
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  test('renders remaining time correctly', () => {
    render(<Timer limitSeconds={600} elapsedSeconds={120} />);
    expect(screen.getByText('08:00')).toBeInTheDocument();
  });

  test('renders untimed state when limit is null', () => {
    render(<Timer limitSeconds={null} elapsedSeconds={300} />);
    expect(screen.getByText('Untimed')).toBeInTheDocument();
  });

  test('shows expired state when time is up', () => {
    render(<Timer limitSeconds={600} elapsedSeconds={600} />);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  test('uses design token text color for normal time', () => {
    render(<Timer limitSeconds={1200} elapsedSeconds={100} />);
    const timeDisplay = screen.getByText('18:20');
    expect(timeDisplay).toHaveClass('text-muted-foreground');
    expect(timeDisplay).not.toHaveClass('text-gray-600');
  });

  test('uses design token warning color in final quarter', () => {
    render(<Timer limitSeconds={1200} elapsedSeconds={950} />);
    const timeDisplay = screen.getByText('04:10');
    expect(timeDisplay).toHaveClass('text-warning-600');
    expect(timeDisplay).not.toHaveClass('text-amber-600');
  });

  test('uses design token error color in final minute', () => {
    render(<Timer limitSeconds={1200} elapsedSeconds={1155} />);
    const timeDisplay = screen.getByText('00:45');
    expect(timeDisplay).toHaveClass('text-error-600');
    expect(timeDisplay).not.toHaveClass('text-red-600');
  });

  test('uses design token muted-foreground for untimed', () => {
    render(<Timer limitSeconds={null} elapsedSeconds={600} />);
    const label = screen.getByText('Untimed');
    expect(label).toHaveClass('text-muted-foreground');
  });

  test('has aria-live attribute for accessibility', () => {
    render(<Timer limitSeconds={600} elapsedSeconds={0} />);
    const timeDisplay = screen.getByText('10:00');
    expect(timeDisplay).toHaveAttribute('aria-live', 'polite');
  });

  test('renders with motion.div for animation', () => {
    render(<Timer limitSeconds={600} elapsedSeconds={0} />);
    // The motion.div mock renders as a div — we verify the component renders
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  test('shows progress bar with correct width', () => {
    render(<Timer limitSeconds={600} elapsedSeconds={300} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  test('progress bar uses design token background', () => {
    render(<Timer limitSeconds={600} elapsedSeconds={300} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('bg-primary-600');
    expect(progressBar).not.toHaveClass('bg-blue-600');
  });

  test('progress bar track uses design token background', () => {
    render(<Timer limitSeconds={600} elapsedSeconds={300} />);
    const progressBar = screen.getByRole('progressbar');
    const track = progressBar.parentElement;
    expect(track).toHaveClass('bg-neutral-200');
    expect(track).not.toHaveClass('bg-gray-200');
  });

  test('does not render progress bar for untimed sessions', () => {
    render(<Timer limitSeconds={null} elapsedSeconds={300} />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  test('formats hours correctly when over 60 minutes', () => {
    render(<Timer limitSeconds={7200} elapsedSeconds={0} />);
    expect(screen.getByText('2:00:00')).toBeInTheDocument();
  });

  test('clamps negative elapsed to zero', () => {
    render(<Timer limitSeconds={600} elapsedSeconds={-10} />);
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });
});
