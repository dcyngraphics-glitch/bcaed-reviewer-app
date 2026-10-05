import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../../routes/auth';
import Header from '../Header';

const renderHeader = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </MemoryRouter>,
  );

describe('Header Component', () => {
  test('renders header text', () => {
    renderHeader();
    expect(
      screen.getByRole('heading', { level: 1, name: /bcaed reviewer app/i }),
    ).toBeInTheDocument();
  });

  test('offers a sign-out control', () => {
    // There was no way to clear auth state anywhere in the app.
    renderHeader();
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });
});