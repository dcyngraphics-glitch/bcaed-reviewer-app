import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AuthLayout from '../AuthLayout';
import DashboardLayout from '../DashboardLayout';

describe('layout wrappers', () => {
  test('AuthLayout renders children', () => {
    render(
      <AuthLayout>
        <div data-testid="test-content">Test Content</div>
      </AuthLayout>,
    );
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  test('DashboardLayout renders children', () => {
    render(
      <DashboardLayout>
        <div data-testid="test-content">Test Content</div>
      </DashboardLayout>,
    );
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
});