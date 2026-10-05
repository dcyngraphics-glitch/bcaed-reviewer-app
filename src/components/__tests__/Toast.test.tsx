import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toast from '../Toast';

describe('Toast Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders children', () => {
    render(<Toast>Hello world</Toast>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  test('renders with default variant using design tokens', () => {
    render(<Toast>Default toast</Toast>);
    const toast = screen.getByText('Default toast').parentElement!;
    expect(toast).toHaveClass('bg-primary-600');
    expect(toast).toHaveClass('text-primary-50');
  });

  test('renders with success variant using design tokens', () => {
    render(<Toast variant="success">Success toast</Toast>);
    const toast = screen.getByText('Success toast').parentElement!;
    expect(toast).toHaveClass('bg-success-600');
    expect(toast).toHaveClass('text-success-50');
  });

  test('renders with warning variant using design tokens', () => {
    render(<Toast variant="warning">Warning toast</Toast>);
    const toast = screen.getByText('Warning toast').parentElement!;
    expect(toast).toHaveClass('bg-warning-600');
    expect(toast).toHaveClass('text-warning-50');
  });

  test('renders with error variant using design tokens', () => {
    render(<Toast variant="error">Error toast</Toast>);
    const toast = screen.getByText('Error toast').parentElement!;
    expect(toast).toHaveClass('bg-error-600');
    expect(toast).toHaveClass('text-error-50');
  });

  test('renders with info variant using design tokens', () => {
    render(<Toast variant="info">Info toast</Toast>);
    const toast = screen.getByText('Info toast').parentElement!;
    expect(toast).toHaveClass('bg-info-600');
    expect(toast).toHaveClass('text-info-50');
  });

  test('renders with top-right position by default', () => {
    render(<Toast>Positioned toast</Toast>);
    const toast = screen.getByText('Positioned toast').parentElement!;
    expect(toast).toHaveClass('top-4');
    expect(toast).toHaveClass('right-4');
  });

  test('renders with bottom-left position', () => {
    render(<Toast position="bottom-left">Positioned toast</Toast>);
    const toast = screen.getByText('Positioned toast').parentElement!;
    expect(toast).toHaveClass('bottom-4');
    expect(toast).toHaveClass('left-4');
  });

  test('auto-closes after duration', () => {
    const onClose = vi.fn();
    render(<Toast duration={3000} onClose={onClose}>Auto close</Toast>);
    expect(screen.getByText('Auto close')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onClose).toHaveBeenCalledOnce();
  });

  test('does not auto-close when hovered', () => {
    const onClose = vi.fn();
    render(<Toast duration={3000} onClose={onClose}>Hover toast</Toast>);
    const toast = screen.getByText('Hover toast').parentElement!;
    fireEvent.mouseEnter(toast);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  test('close button calls onClose', () => {
    const onClose = vi.fn();
    render(<Toast onClose={onClose}>Close me</Toast>);
    const closeButton = screen.getByRole('button', { name: /close toast/i });
    closeButton.click();
    expect(onClose).toHaveBeenCalledOnce();
  });

  test('uses design token border radius', () => {
    render(<Toast>Radius toast</Toast>);
    const toast = screen.getByText('Radius toast').parentElement!;
    expect(toast).toHaveClass('rounded-lg');
  });

  test('uses design token shadow', () => {
    render(<Toast>Shadow toast</Toast>);
    const toast = screen.getByText('Shadow toast').parentElement!;
    expect(toast).toHaveClass('shadow-lg');
  });
});
