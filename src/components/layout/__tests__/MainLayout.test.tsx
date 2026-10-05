import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainLayout from '../MainLayout';

describe('MainLayout Component', () => {
  test('renders children', () => {
    const testContent = <div data-testid="test-content">Test Content</div>;
    render(<MainLayout>{testContent}</MainLayout>);
    const content = screen.getByTestId('test-content');
    expect(content).toBeInTheDocument();
  });
});