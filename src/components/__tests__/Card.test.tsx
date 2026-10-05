import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../Card';

describe('Card Component', () => {
  // ── Rendering ──────────────────────────────────────────────────────────
  test('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('renders as a div', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card.tagName).toBe('DIV');
  });

  // ── Design tokens ─────────────────────────────────────────────────────
  test('uses design token background color', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toHaveClass('bg-card');
  });

  test('uses design token border radius', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toHaveClass('rounded-lg');
  });

  test('uses design token shadow', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toHaveClass('shadow-md');
  });

  test('uses design token border color', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toHaveClass('border-border');
  });

  // ── Custom className ───────────────────────────────────────────────────
  test('merges custom className', () => {
    render(<Card className="custom-card">Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toHaveClass('custom-card');
    expect(card).toHaveClass('bg-card');
  });

  // ── Framer Motion ─────────────────────────────────────────────────────
  test('passes initial and animate props to motion.div', () => {
    render(
      <Card initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        Card content
      </Card>,
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('passes whileHover prop', () => {
    render(<Card whileHover={{ y: -4 }}>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('passes exit prop', () => {
    render(<Card exit={{ opacity: 0 }}>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  // ── HTML attributes ───────────────────────────────────────────────────
  test('forwards id attribute', () => {
    render(<Card id="my-card">Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toHaveAttribute('id', 'my-card');
  });

  test('forwards data-testid attribute', () => {
    render(<Card data-testid="test-card">Card content</Card>);
    expect(screen.getByTestId('test-card')).toBeInTheDocument();
  });

  // ── Padding variants ──────────────────────────────────────────────────
  test('applies default padding', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toHaveClass('p-6');
  });

  test('applies no padding when padding="none"', () => {
    render(<Card padding="none">Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).not.toHaveClass('p-6');
    expect(card).not.toHaveClass('p-4');
  });

  test('applies sm padding', () => {
    render(<Card padding="sm">Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toHaveClass('p-4');
  });

  test('applies lg padding', () => {
    render(<Card padding="lg">Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toHaveClass('p-8');
  });
});
