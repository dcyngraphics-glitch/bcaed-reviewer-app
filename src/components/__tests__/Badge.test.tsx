import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badge from '../Badge';

describe('Badge Component', () => {
  // ── Rendering ──────────────────────────────────────────────────────────
  test('renders children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  test('renders as a span', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge.tagName).toBe('SPAN');
  });

  // ── Variants ───────────────────────────────────────────────────────────
  test('renders with default variant', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('bg-primary-100');
    expect(badge).toHaveClass('text-primary-800');
  });

  test('renders with secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    const badge = screen.getByText('Secondary');
    expect(badge).toHaveClass('bg-secondary-100');
    expect(badge).toHaveClass('text-secondary-800');
  });

  test('renders with destructive variant', () => {
    render(<Badge variant="destructive">Error</Badge>);
    const badge = screen.getByText('Error');
    expect(badge).toHaveClass('bg-error-100');
    expect(badge).toHaveClass('text-error-800');
  });

  test('renders with outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText('Outline');
    expect(badge).toHaveClass('border-primary-500');
    expect(badge).toHaveClass('text-primary-500');
  });

  // ── Design tokens ─────────────────────────────────────────────────────
  test('uses design token border radius', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toHaveClass('rounded-full');
  });

  test('has inline-flex display', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toHaveClass('inline-flex');
  });

  test('has items-center alignment', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toHaveClass('items-center');
  });

  // ── Custom className ───────────────────────────────────────────────────
  test('merges custom className', () => {
    render(<Badge className="custom-badge">New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toHaveClass('custom-badge');
    expect(badge).toHaveClass('bg-primary-100');
  });

  // ── HTML attributes ───────────────────────────────────────────────────
  test('forwards id attribute', () => {
    render(<Badge id="my-badge">New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toHaveAttribute('id', 'my-badge');
  });

  test('forwards data-testid attribute', () => {
    render(<Badge data-testid="test-badge">New</Badge>);
    expect(screen.getByTestId('test-badge')).toBeInTheDocument();
  });

  // ── Framer Motion ─────────────────────────────────────────────────────
  test('passes initial and animate props to motion.span', () => {
    render(
      <Badge initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
        New
      </Badge>,
    );
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  test('passes exit prop', () => {
    render(<Badge exit={{ opacity: 0 }}>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });
});
