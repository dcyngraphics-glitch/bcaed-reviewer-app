import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrendChart from '../TrendChart';
import type { TrendPoint, TrendSummary } from '../trend';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makePoint = (id: string, accuracy: number, mode = 'practice'): TrendPoint => ({
  id,
  date: `2026-10-${id.padStart(2, '0')}`,
  accuracy,
  mode,
  total: 10,
});

const makeSummary = (overrides: Partial<TrendSummary> = {}): TrendSummary => ({
  average: 70,
  delta: 5,
  direction: 'improving',
  first: 50,
  latest: 90,
  ...overrides,
});

// ─── Empty state ──────────────────────────────────────────────────────────────

describe('TrendChart — empty state', () => {
  test('renders a message when there are no points', () => {
    render(<TrendChart points={[]} summary={makeSummary()} />);
    expect(screen.getByText(/accuracy trend appears here/i)).toBeInTheDocument();
  });

  test('does not render an SVG when empty', () => {
    render(<TrendChart points={[]} summary={makeSummary()} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});

// ─── Rendering with data ──────────────────────────────────────────────────────

describe('TrendChart — with data', () => {
  const points = [
    makePoint('a', 50),
    makePoint('b', 60),
    makePoint('c', 70),
    makePoint('d', 80),
  ];
  const summary = makeSummary({ average: 65, delta: 30, direction: 'improving' });

  test('renders an SVG chart', () => {
    render(<TrendChart points={points} summary={summary} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('shows the average accuracy', () => {
    render(<TrendChart points={points} summary={summary} />);
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  test('shows the direction label', () => {
    render(<TrendChart points={points} summary={summary} />);
    expect(screen.getByText(/improving/i)).toBeInTheDocument();
  });

  test('shows the session count', () => {
    render(<TrendChart points={points} summary={summary} />);
    expect(screen.getByText(/4 sessions/i)).toBeInTheDocument();
  });

  test('renders a circle for each data point', () => {
    render(<TrendChart points={points} summary={summary} />);
    const circles = document.querySelectorAll('circle');
    expect(circles.length).toBe(4);
  });

  test('renders grid lines at 0, 50, and 100', () => {
    render(<TrendChart points={points} summary={summary} />);
    const gridLines = document.querySelectorAll('line');
    expect(gridLines.length).toBe(3);
  });

  test('renders the legend with all modes', () => {
    render(<TrendChart points={points} summary={summary} />);
    // Use getAllByText because SVG <title> elements also contain mode names
    expect(screen.getAllByText(/practice/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/mock/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/mistakes/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/diagnostic/i).length).toBeGreaterThan(0);
  });

  test('renders two paths (area and line)', () => {
    render(<TrendChart points={points} summary={summary} />);
    const paths = document.querySelectorAll('path');
    expect(paths.length).toBe(2);
  });
});

// ─── Design tokens ────────────────────────────────────────────────────────────

describe('TrendChart — design tokens', () => {
  const points = [makePoint('a', 50), makePoint('b', 80)];
  const summary = makeSummary();

  test('does not use gray-* classes', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const allElements = container.querySelectorAll('*');
    allElements.forEach((el) => {
      const classes = el.getAttribute('class') ?? '';
      expect(classes).not.toMatch(/gray-/);
    });
  });

  test('does not use purple-* classes', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const allElements = container.querySelectorAll('*');
    allElements.forEach((el) => {
      const classes = el.getAttribute('class') ?? '';
      expect(classes).not.toMatch(/purple-/);
    });
  });

  test('does not use amber-* classes', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const allElements = container.querySelectorAll('*');
    allElements.forEach((el) => {
      const classes = el.getAttribute('class') ?? '';
      expect(classes).not.toMatch(/amber-/);
    });
  });

  test('does not use teal-* classes', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const allElements = container.querySelectorAll('*');
    allElements.forEach((el) => {
      const classes = el.getAttribute('class') ?? '';
      expect(classes).not.toMatch(/teal-/);
    });
  });

  test('does not use green-* classes', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const allElements = container.querySelectorAll('*');
    allElements.forEach((el) => {
      const classes = el.getAttribute('class') ?? '';
      expect(classes).not.toMatch(/green-/);
    });
  });

  test('does not use red-* classes', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const allElements = container.querySelectorAll('*');
    allElements.forEach((el) => {
      const classes = el.getAttribute('class') ?? '';
      expect(classes).not.toMatch(/red-/);
    });
  });

  test('uses neutral-* tokens for grid lines', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const gridLines = container.querySelectorAll('line');
    gridLines.forEach((line) => {
      expect(line.getAttribute('class')).toMatch(/neutral-/);
    });
  });

  test('uses muted-foreground for secondary text', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const spans = container.querySelectorAll('span');
    const hasMutedForeground = Array.from(spans).some(
      (s) => s.getAttribute('class')?.includes('muted-foreground'),
    );
    expect(hasMutedForeground).toBe(true);
  });

  test('uses foreground token for the average value', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const averageText = screen.getByText('70%');
    expect(averageText.getAttribute('class')).toMatch(/foreground/);
  });

  test('uses success-* tokens for improving direction', () => {
    render(<TrendChart points={points} summary={makeSummary({ direction: 'improving' })} />);
    const improvingText = screen.getByText(/improving/i);
    expect(improvingText.getAttribute('class')).toMatch(/success-/);
  });

  test('uses error-* tokens for declining direction', () => {
    render(<TrendChart points={points} summary={makeSummary({ direction: 'declining' })} />);
    const decliningText = screen.getByText(/slipping/i);
    expect(decliningText.getAttribute('class')).toMatch(/error-/);
  });

  test('uses neutral-* tokens for steady direction', () => {
    render(<TrendChart points={points} summary={makeSummary({ direction: 'steady' })} />);
    const steadyText = screen.getByText(/steady/i);
    expect(steadyText.getAttribute('class')).toMatch(/neutral-/);
  });
});

// ─── Animations ───────────────────────────────────────────────────────────────

describe('TrendChart — animations', () => {
  const points = [makePoint('a', 50), makePoint('b', 80)];
  const summary = makeSummary();

  test('has a path for the area fill', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const paths = container.querySelectorAll('path');
    const areaPath = Array.from(paths).find(
      (p) => p.getAttribute('d')?.includes('Z'),
    );
    expect(areaPath).toBeTruthy();
  });

  test('has a path for the line', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const paths = container.querySelectorAll('path');
    const linePath = Array.from(paths).find(
      (p) => p.getAttribute('d')?.includes('M') && !p.getAttribute('d')?.includes('Z'),
    );
    expect(linePath).toBeTruthy();
  });

  test('area path has fill-primary-100 class', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const paths = container.querySelectorAll('path');
    const areaPath = Array.from(paths).find(
      (p) => p.getAttribute('d')?.includes('Z'),
    );
    expect(areaPath?.getAttribute('class')).toMatch(/fill-primary-100/);
  });

  test('line path has stroke-primary-600 class', () => {
    const { container } = render(<TrendChart points={points} summary={summary} />);
    const paths = container.querySelectorAll('path');
    const linePath = Array.from(paths).find(
      (p) => p.getAttribute('d')?.includes('M') && !p.getAttribute('d')?.includes('Z'),
    );
    expect(linePath?.getAttribute('class')).toMatch(/stroke-primary-600/);
  });
});
