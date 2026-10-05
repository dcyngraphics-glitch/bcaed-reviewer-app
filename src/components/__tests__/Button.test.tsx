import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Button Component', () => {
  // ── Rendering ──────────────────────────────────────────────────────────
  test('renders with default variant', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary-600');
    expect(button).toHaveClass('text-primary-50');
  });

  test('renders with primary variant', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('bg-primary-600');
    expect(button).toHaveClass('text-primary-50');
  });

  test('renders with outline variant', () => {
    render(<Button variant="outline">Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('border-primary-600');
    expect(button).toHaveClass('text-primary-600');
    expect(button).not.toHaveClass('bg-primary-600');
  });

  test('renders with destructive variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toHaveClass('bg-error-600');
    expect(button).toHaveClass('text-error-50');
  });

  test('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toHaveClass('bg-secondary-600');
    expect(button).toHaveClass('text-secondary-50');
  });

  test('renders with success variant', () => {
    render(<Button variant="success">Save</Button>);
    const button = screen.getByRole('button', { name: /save/i });
    expect(button).toHaveClass('bg-success-600');
    expect(button).toHaveClass('text-success-50');
  });

  // ── Sizes ──────────────────────────────────────────────────────────────
  test('renders with sm size', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button', { name: /small/i });
    expect(button).toHaveClass('h-9');
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('text-sm');
  });

  test('renders with md size (default)', () => {
    render(<Button>Medium</Button>);
    const button = screen.getByRole('button', { name: /medium/i });
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('text-base');
  });

  test('renders with lg size', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button', { name: /large/i });
    expect(button).toHaveClass('h-11');
    expect(button).toHaveClass('px-5');
    expect(button).toHaveClass('text-lg');
  });

  // ── Interaction ────────────────────────────────────────────────────────
  test('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    button.click();
    expect(handleClick).toHaveBeenCalledOnce();
  });

  test('respects disabled state', () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeDisabled();
  });

  // ── Design tokens ─────────────────────────────────────────────────────
  test('uses design token border radius', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('rounded-lg');
  });

  test('has focus-visible ring styles', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('focus-visible:ring-2');
    expect(button).toHaveClass('focus-visible:ring-ring');
  });

  // ── Custom className ───────────────────────────────────────────────────
  test('merges custom className', () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('bg-primary-600');
  });

  // ── Type attribute ────────────────────────────────────────────────────
  test('defaults to type="button"', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveAttribute('type', 'button');
  });

  test('respects custom type', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  // ── Framer Motion props ───────────────────────────────────────────────
  test('passes whileHover prop to motion.button', () => {
    render(<Button whileHover={{ scale: 1.05 }}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('passes whileTap prop to motion.button', () => {
    render(<Button whileTap={{ scale: 0.95 }}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('passes initial and animate props', () => {
    render(
      <Button initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Click me
      </Button>,
    );
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });
});