import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgressRing from '../ProgressRing';

describe('ProgressRing Component', () => {
  test('renders with default props', () => {
    render(<ProgressRing value={50} />);
    const ring = screen.getByRole('progressbar');
    expect(ring).toBeInTheDocument();
  });

  test('has correct aria attributes', () => {
    render(<ProgressRing value={50} max={100} />);
    const ring = screen.getByRole('progressbar');
    expect(ring).toHaveAttribute('aria-valuenow', '50');
    expect(ring).toHaveAttribute('aria-valuemin', '0');
    expect(ring).toHaveAttribute('aria-valuemax', '100');
  });

  test('renders label by default', () => {
    render(<ProgressRing value={50} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  test('hides label when showLabel is false', () => {
    render(<ProgressRing value={50} showLabel={false} />);
    expect(screen.queryByText('50%')).not.toBeInTheDocument();
  });

  test('clamps value to max', () => {
    render(<ProgressRing value={150} max={100} />);
    const ring = screen.getByRole('progressbar');
    expect(ring).toHaveAttribute('aria-valuenow', '100');
  });

  test('clamps value to 0', () => {
    render(<ProgressRing value={-10} max={100} />);
    const ring = screen.getByRole('progressbar');
    expect(ring).toHaveAttribute('aria-valuenow', '0');
  });

  test('handles zero max', () => {
    render(<ProgressRing value={50} max={0} />);
    const ring = screen.getByRole('progressbar');
    expect(ring).toHaveAttribute('aria-valuemax', '100');
  });

  test('uses custom size', () => {
    render(<ProgressRing value={50} size={80} />);
    const ring = screen.getByRole('progressbar');
    expect(ring).toHaveStyle({ width: '80px', height: '80px' });
  });

  test('uses custom color', () => {
    render(<ProgressRing value={50} color="stroke-success-600" />);
    const circle = document.querySelector('circle[stroke-linecap="round"]');
    expect(circle).toHaveClass('stroke-success-600');
  });

  test('uses custom track color', () => {
    render(<ProgressRing value={50} trackColor="stroke-neutral-300" />);
    const circles = document.querySelectorAll('circle');
    expect(circles[0]).toHaveClass('stroke-neutral-300');
  });

  test('uses custom label color', () => {
    render(<ProgressRing value={50} labelColor="text-success-600" />);
    const label = screen.getByText('50%');
    expect(label).toHaveClass('text-success-600');
  });
});
