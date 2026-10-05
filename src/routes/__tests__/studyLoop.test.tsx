import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import AppRoutes from '../AppRoutes';
import { clickButton, clickElement } from '../../test/interact';

/**
 * Drives whole study loops through the real router: sign in, answer a full
 * session, and confirm the result is persisted and reflected afterwards.
 *
 * Unit tests cover the engine in isolation. This covers the wiring between the
 * engine, the store, the context and the pages — which is where a silent break
 * would actually cost the student their progress.
 */

/** Answers the current question and advances. Returns false when the session ends. */
const answerAndAdvance = (optionIndex = 0): boolean => {
  const group = screen.queryByRole('group', { name: /answer options/i });
  if (!group) return false;

  const options = within(group).getAllByRole('button');
  clickElement(options[Math.min(optionIndex, options.length - 1)]);

  const finish = screen.queryByRole('button', { name: /^finish$/i });
  if (finish) {
    clickElement(finish);
    return false;
  }

  const next = screen.queryByRole('button', { name: /^next$/i });
  if (next) {
    clickElement(next);
    return true;
  }
  return false;
};

const storedProfile = () => {
  const raw = window.localStorage.getItem('bcaed.profile.v1');
  return raw ? JSON.parse(raw) : null;
};

describe('practice loop (real router)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  test('a full session records XP, a session row and the study date', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/practice');
    render(<AppRoutes />);

    await clickButton(screen, /start practice/i);
    await screen.findByRole('group', { name: /answer options/i });

    for (let i = 0; i < 40; i += 1) {
      if (!answerAndAdvance(0)) break;
    }

    expect(await screen.findByText(/session complete/i)).toBeInTheDocument();

    const profile = storedProfile();
    expect(profile).not.toBeNull();
    expect(profile.sessions).toHaveLength(1);
    expect(profile.sessions[0].total).toBeGreaterThan(0);
    expect(profile.xp).toBeGreaterThan(0);
    expect(profile.activeDates).toHaveLength(1);
  });

  test('the dashboard reflects the recorded session after a reload', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/practice');
    const view = render(<AppRoutes />);

    await clickButton(screen, /start practice/i);
    await screen.findByRole('group', { name: /answer options/i });
    for (let i = 0; i < 40; i += 1) {
      if (!answerAndAdvance(0)) break;
    }
    await screen.findByText(/session complete/i);

    const xp = storedProfile().xp;

    // Unmount first, or two routers share one document.
    view.unmount();
    window.history.pushState({}, '', '/student/home');
    render(<AppRoutes />);

    await screen.findByRole('heading', { name: /welcome back/i });
    expect(screen.getByText(`${xp} XP`)).toBeInTheDocument();
  });

  test('wrong answers land in My Mistakes and survive a reload', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/practice');
    const view = render(<AppRoutes />);

    await clickButton(screen, /start practice/i);
    await screen.findByRole('group', { name: /answer options/i });

    // Option B is wrong for the first seeded question (its answer is A).
    answerAndAdvance(1);
    for (let i = 0; i < 40; i += 1) {
      if (!answerAndAdvance(0)) break;
    }
    await screen.findByText(/session complete/i);

    expect(storedProfile().mistakes.length).toBeGreaterThan(0);

    view.unmount();
    window.history.pushState({}, '', '/mistakes');
    render(<AppRoutes />);

    expect(await screen.findByRole('heading', { name: /my mistakes/i })).toBeInTheDocument();
    expect(screen.getByText(/questions to review/i)).toBeInTheDocument();
  });

  test('a mock exam hides the answers until submission', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/mock-exams');
    render(<AppRoutes />);

    const startButtons = await screen.findAllByRole('button', { name: /start exam/i });
    clickElement(startButtons[startButtons.length - 1]);

    await screen.findByRole('group', { name: /answer options/i });

    // Nothing may be revealed while the exam runs.
    expect(screen.queryByText(/^explanation$/i)).toBeNull();
    expect(screen.queryByText(/not quite/i)).toBeNull();

    // The clock is visible and there is an explicit submit control.
    expect(screen.getByText(/time left/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit now/i })).toBeInTheDocument();
  });

  test('a mock exam can be submitted early and is graded as a mock', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/mock-exams');
    render(<AppRoutes />);

    const startButtons = await screen.findAllByRole('button', { name: /start exam/i });
    clickElement(startButtons[startButtons.length - 1]);
    await screen.findByRole('group', { name: /answer options/i });

    answerAndAdvance(0);
    await clickButton(screen, /submit now/i);

    expect(await screen.findByText(/session complete/i)).toBeInTheDocument();

    const profile = storedProfile();
    expect(profile.sessions).toHaveLength(1);
    expect(profile.sessions[0].mode).toBe('mock');
  });

  test('the diagnostic places the student and records the attempt', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    window.history.pushState({}, '', '/diagnostic');
    render(<AppRoutes />);

    await clickButton(screen, /start diagnostic/i);
    await screen.findByRole('group', { name: /answer options/i });

    for (let i = 0; i < 40; i += 1) {
      if (!answerAndAdvance(0)) break;
    }

    expect(await screen.findByText(/placement result/i)).toBeInTheDocument();

    const profile = storedProfile();
    expect(profile.sessions.some((s: { mode: string }) => s.mode === 'diagnostic')).toBe(true);
  });
});
