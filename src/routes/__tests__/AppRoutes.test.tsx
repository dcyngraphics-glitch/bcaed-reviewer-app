import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppRoutes from '../AppRoutes';

/**
 * End-to-end smoke test against the REAL AppRoutes component — the exact tree
 * main.tsx mounts. The previous suite never imported it, which is why a
 * completely broken app (unresolved imports, no Tailwind output) stayed green.
 */
describe('AppRoutes (real entry point)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  test('unauthenticated visit to / lands on the login screen', async () => {
    render(<AppRoutes />);

    // index route redirects into the protected tree, which bounces to /login
    expect(await screen.findByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('signing in navigates to the dashboard with chrome intact', async () => {
    const user = userEvent.setup();
    render(<AppRoutes />);

    await user.type(await screen.findByLabelText(/email address/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'hunter2');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getAllByRole('banner')).toHaveLength(1);
  });

  test('the quiz route renders questions from the data module', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/quiz');
    render(<AppRoutes />);

    expect(await screen.findByText(/question 1 of/i)).toBeInTheDocument();
  });

  test('unknown route renders the 404 page', () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/definitely-not-a-page');
    render(<AppRoutes />);

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});