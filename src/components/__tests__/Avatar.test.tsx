import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from '../Avatar';

describe('Avatar Component', () => {
  test('renders img with src', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Test User" />);
    const img = screen.getByRole('img', { name: 'Test User' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  test('renders with default size', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Test User" />);
    const img = screen.getByRole('img', { name: 'Test User' });
    expect(img).toHaveClass('w-10');
    expect(img).toHaveClass('h-10');
  });

  test('renders with xs size', () => {
    render(<Avatar src="https://example.com/avatar.jpg" size="xs" alt="Test User" />);
    const img = screen.getByRole('img', { name: 'Test User' });
    expect(img).toHaveClass('w-6');
    expect(img).toHaveClass('h-6');
  });

  test('renders with sm size', () => {
    render(<Avatar src="https://example.com/avatar.jpg" size="sm" alt="Test User" />);
    const img = screen.getByRole('img', { name: 'Test User' });
    expect(img).toHaveClass('w-8');
    expect(img).toHaveClass('h-8');
  });

  test('renders with lg size', () => {
    render(<Avatar src="https://example.com/avatar.jpg" size="lg" alt="Test User" />);
    const img = screen.getByRole('img', { name: 'Test User' });
    expect(img).toHaveClass('w-12');
    expect(img).toHaveClass('h-12');
  });

  test('renders with xl size', () => {
    render(<Avatar src="https://example.com/avatar.jpg" size="xl" alt="Test User" />);
    const img = screen.getByRole('img', { name: 'Test User' });
    expect(img).toHaveClass('w-14');
    expect(img).toHaveClass('h-14');
  });

  test('uses design token border radius', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="Test User" />);
    const img = screen.getByRole('img', { name: 'Test User' });
    expect(img).toHaveClass('rounded-full');
  });

  test('applies custom className', () => {
    render(<Avatar src="https://example.com/avatar.jpg" className="border-2" alt="Test User" />);
    const img = screen.getByRole('img', { name: 'Test User' });
    expect(img).toHaveClass('border-2');
  });
});
