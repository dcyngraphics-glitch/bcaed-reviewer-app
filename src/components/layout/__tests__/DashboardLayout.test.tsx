import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardLayout from '../DashboardLayout';

describe('DashboardLayout Component', () => {
  test('renders children', () => {
    const testContent = <div data-testid="test-content">Test Content</div>;
    render(<DashboardLayout>{testContent}</DashboardLayout>);
    const content = screen.getByTestId('test-content');
    expect(content).toBeInTheDocument();
  });
});