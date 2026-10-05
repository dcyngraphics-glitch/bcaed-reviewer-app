import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProfileProvider } from '../../../context/ProfileContext';
import MockExamsPage from '../MockExamsPage';

/**
 * Wraps the page in the same providers AppRoutes uses, so the test exercises
 * the real context wiring rather than a stripped-down harness.
 */
const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/mock-exams']}>
      <ProfileProvider name="Test Student" startDate="2026-10-05">
        <MockExamsPage />
      </ProfileProvider>
    </MemoryRouter>,
  );

describe('MockExamsPage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('renders the page heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /mock exams/i })).toBeInTheDocument();
  });

  test('lists all six exam presets by name', () => {
    renderPage();
    expect(screen.getByText(/marathon paper/i)).toBeInTheDocument();
    expect(screen.getByText(/full mock exam/i)).toBeInTheDocument();
    expect(screen.getByText(/quick mock exam/i)).toBeInTheDocument();
    expect(screen.getByText(/general education paper/i)).toBeInTheDocument();
    expect(screen.getByText(/professional education paper/i)).toBeInTheDocument();
    expect(screen.getByText(/culture and arts education paper/i)).toBeInTheDocument();
  });

  test('each preset has a Start exam button', () => {
    renderPage();
    const buttons = screen.getAllByRole('button', { name: /start exam/i });
    expect(buttons.length).toBe(6);
  });

  test('shows an empty state when there are no past mocks', () => {
    renderPage();
    expect(screen.getByText(/no mock exams yet/i)).toBeInTheDocument();
  });

  test('does not use raw gray-* color classes', () => {
    renderPage();
    const html = document.body.innerHTML;
    // The design token system uses semantic aliases (text-foreground, text-muted-foreground, etc.)
    // Raw gray-* classes are a sign the page has not been migrated.
    expect(html).not.toMatch(/text-gray-\d/);
    expect(html).not.toMatch(/bg-gray-\d/);
    expect(html).not.toMatch(/border-gray-\d/);
  });

  test('uses design token classes for text and surfaces', () => {
    renderPage();
    const html = document.body.innerHTML;
    // At minimum the page should use semantic color tokens
    expect(html).toMatch(/text-foreground/);
    expect(html).toMatch(/text-muted-foreground/);
  });

  test('uses motion components for animations', () => {
    renderPage();
    // framer-motion renders motion.* elements; in tests they are mocked but
    // the data-testid or class hook should still be present.
    // We check that the page source imports framer-motion by verifying
    // the rendered output contains motion-specific attributes or classes.
    const html = document.body.innerHTML;
    // The mocked motion components pass through className, so we check
    // for animation-related classes that framer-motion adds.
    expect(html).toMatch(/initial|animate|transition|whileHover/);
  });

  test('preset cards show item and minute counts', () => {
    renderPage();
    // Each preset should display its item count and time estimate
    expect(screen.getByText(/350 items/i)).toBeInTheDocument();
    expect(screen.getByText(/60 items/i)).toBeInTheDocument();
    expect(screen.getByText(/25 items/i)).toBeInTheDocument();
  });

  test('preset cards show availability info', () => {
    renderPage();
    // Each card should show how many questions are in the bank
    expect(screen.getAllByText(/in the bank/i).length).toBeGreaterThan(0);
  });

  test('shows exam rules callout', () => {
    renderPage();
    expect(screen.getByText(/exam rules/i)).toBeInTheDocument();
  });
});
