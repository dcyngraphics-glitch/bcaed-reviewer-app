import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthLayout from '../AuthLayout';

describe('AuthLayout Component', () => {
  test('renders children', () => {
    const testContent = <div data-testid="test-content">Test Content</div>;
    render(<AuthLayout>{testContent}</AuthLayout>);
    const content = screen.getByTestId('test-content');
    expect(content).toBeInTheDocument();
  });
});