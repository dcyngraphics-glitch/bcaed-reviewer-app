import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppRoutes from '../AppRoutes';
import { typeInto, clickButton } from '../../test/interact';

/**
 * End-to-end smoke tests against the REAL AppRoutes component — the exact tree
 * main.tsx mounts. A suite that only imports leaf components can stay green
 * while the app itself is blank, so this one drives the real router.
 */
describe('AppRoutes (real entry point)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  test('unauthenticated visit to / lands on the login screen', async () => {
    render(<AppRoutes />);
    expect(await screen.findByLabelText(/your name/i)).toBeInTheDocument();
  });

  test('signing in navigates to the dashboard with chrome intact', async () => {
    render(<AppRoutes />);

    await screen.findByLabelText(/your name/i);
    typeInto(screen, /your name/i, 'Juan Dela Cruz');
    await clickButton(screen, /continue/i);

    expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getAllByRole('banner')).toHaveLength(1);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('the dashboard shows the real mission for the program week', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/student/home');
    render(<AppRoutes />);

    expect(await screen.findByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    // The mission card names the weekday's task rather than a hard-coded string.
    expect(screen.getByText(/week \d+ of 12/i)).toBeInTheDocument();
  });

  test('practice shows the setup screen with a real question count', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/practice');
    render(<AppRoutes />);

    expect(await screen.findByRole('heading', { name: /^practice$/i })).toBeInTheDocument();
    expect(screen.getByText(/questions available/i)).toBeInTheDocument();
  });

  test('mock exams lists the exam presets', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/mock-exams');
    render(<AppRoutes />);

    expect(await screen.findByRole('heading', { name: /mock exams/i })).toBeInTheDocument();
    // One start button per preset.
    expect(screen.getAllByRole('button', { name: /start exam/i }).length).toBeGreaterThan(0);
  });

  test('the legacy /quiz path redirects to practice', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/quiz');
    render(<AppRoutes />);

    expect(await screen.findByRole('heading', { name: /^practice$/i })).toBeInTheDocument();
  });

  test('unknown route renders the 404 page', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/definitely-not-a-page');
    render(<AppRoutes />);

    expect(await screen.findByText(/page not found/i)).toBeInTheDocument();
  });
});
