import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

/** A component that throws on demand, to exercise the boundary. */
const Boom = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) throw new Error('kaboom from a child');
  return <p>all good</p>;
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ErrorBoundary', () => {
  test('renders children when nothing throws', () => {
    render(
      <ErrorBoundary>
        <Boom shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(screen.getByText(/all good/i)).toBeInTheDocument();
  });

  test('shows a readable message instead of a blank page', () => {
    // Suppress React's own console noise for the intentional throw.
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('heading', { name: /something broke/i })).toBeInTheDocument();
    // The actual error message must be visible, or there is nothing to act on.
    expect(screen.getByText(/kaboom from a child/i)).toBeInTheDocument();
  });

  test('reassures the student that progress is safe', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByText(/has not been lost/i)).toBeInTheDocument();
  });

  test('logs the error rather than swallowing it', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    expect(spy).toHaveBeenCalled();
  });

  test('offers a recovery path', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back to dashboard/i })).toBeInTheDocument();
  });

  // ── Design token tests ──────────────────────────────────────────────────

  test('uses design token foreground class instead of hardcoded gray-900', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    const heading = screen.getByRole('heading', { name: /something broke/i });
    expect(heading).toHaveClass('text-foreground');
    expect(heading).not.toHaveClass('text-gray-900');
  });

  test('uses design token error colors for the error message text', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    const errorText = screen.getByText(/kaboom from a child/i);
    expect(errorText).toHaveClass('text-error-700');
    expect(errorText).not.toHaveClass('text-red-700');
  });

  test('uses design token error background for the error detail box', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    const errorText = screen.getByText(/kaboom from a child/i);
    expect(errorText).toHaveClass('bg-error-50');
    expect(errorText).toHaveClass('border-error-200');
    expect(errorText).not.toHaveClass('bg-red-50');
    expect(errorText).not.toHaveClass('border-red-200');
  });

  test('uses design token muted-foreground for the reassurance text', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    const reassurance = screen.getByText(/has not been lost/i);
    expect(reassurance).toHaveClass('text-muted-foreground');
    expect(reassurance).not.toHaveClass('text-gray-600');
  });

  test('uses design token background for the outer container', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    const heading = screen.getByRole('heading', { name: /something broke/i });
    let el: HTMLElement | null = heading;
    while (el && !el.classList.contains('bg-background')) {
      el = el.parentElement;
    }
    expect(el).not.toBeNull();
    expect(el!).toHaveClass('bg-background');
    expect(el!).not.toHaveClass('bg-gray-50');
  });

  test('uses Card component with design token classes', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom shouldThrow />
      </ErrorBoundary>,
    );

    const heading = screen.getByRole('heading', { name: /something broke/i });
    const card = heading.closest('.bg-card');
    expect(card).not.toBeNull();
    expect(card).toHaveClass('bg-card');
    expect(card).toHaveClass('rounded-lg');
    expect(card).toHaveClass('shadow-md');
  });
});
