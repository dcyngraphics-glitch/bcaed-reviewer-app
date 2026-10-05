import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';
import { renderWithProviders } from '../../../test/renderWithProviders';

const renderHeader = (route = '/student/home') =>
  render(renderWithProviders(<Header />, { route }));

describe('Header Component', () => {
  test('renders the app title', () => {
    renderHeader();
    expect(screen.getByRole('heading', { level: 1, name: /bcaed reviewer/i })).toBeInTheDocument();
  });

  test('offers a sign-out control', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });

  test('the mobile drawer starts closed', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /open navigation/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByRole('navigation', { name: /main navigation/i })).toBeNull();
  });

  test('the drawer opens and exposes every destination', async () => {
    // The sidebar is hidden below md, so this drawer is the only navigation on
    // a phone — if it does not work the app is unusable on Android.
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: /open navigation/i }));

    expect(screen.getByRole('button', { name: /close navigation/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );

    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    for (const label of ['Home', 'Review', 'Practice', 'Mock Exams', 'My Mistakes', 'Progress']) {
      expect(nav).toHaveTextContent(label);
    }
  });

  test('Escape closes the drawer', async () => {
    const user = userEvent.setup();
    renderHeader();

    await user.click(screen.getByRole('button', { name: /open navigation/i }));
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('navigation', { name: /main navigation/i })).toBeNull();
  });

  test('the drawer links to real routes', async () => {
    const user = userEvent.setup();
    renderHeader();
    await user.click(screen.getByRole('button', { name: /open navigation/i }));

    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    const links = nav.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute('href')).not.toBe('#');
      expect(link.getAttribute('href')?.startsWith('/')).toBe(true);
    }
  });
});
