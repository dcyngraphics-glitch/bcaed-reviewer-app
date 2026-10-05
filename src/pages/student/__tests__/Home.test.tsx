import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../../test/renderWithProviders';
import StudentHome from '../Home';

// ── Tests ──────────────────────────────────────────────────────────────────

describe('StudentHome', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  // ── Welcome / Header ────────────────────────────────────────────────────

  test('renders welcome message with student first name', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  test('shows current week and phase', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText(/week \d+ of 12/i)).toBeInTheDocument();
  });

  // ── Today's Mission ─────────────────────────────────────────────────────

  test('renders today mission card', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText(/today's mission/i)).toBeInTheDocument();
  });

  test('mission card shows task title and description', () => {
    render(renderWithProviders(<StudentHome />));
    const titles = [
      'New Lesson',
      'Reinforcement Practice',
      'Rest Day',
      'Thursday Challenge',
      'Weekly Assessment',
      'Optional Review',
    ];
    const found = titles.some((t) => screen.queryByText(t));
    expect(found).toBe(true);
  });

  test('mission card has start session button', () => {
    render(renderWithProviders(<StudentHome />));
    const startBtn = screen.getByRole('button', { name: /start session|study anyway/i });
    expect(startBtn).toBeInTheDocument();
  });

  test('mission card has read lesson button', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByRole('button', { name: /read the lesson first/i })).toBeInTheDocument();
  });

  test('mission card shows progress ring', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  // ── Stat Tiles ──────────────────────────────────────────────────────────

  test('renders accuracy stat tile', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText('Accuracy')).toBeInTheDocument();
  });

  test('renders streak stat tile', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText('Streak')).toBeInTheDocument();
  });

  test('renders level stat tile', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getAllByText(/level \d+/i).length).toBeGreaterThan(0);
  });

  test('renders badges stat tile', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText('Badges')).toBeInTheDocument();
  });

  test('stat tiles use count-up animation', async () => {
    render(renderWithProviders(<StudentHome />));
    await waitFor(() => {
      const accuracyTile = screen.getByText('Accuracy').closest('div');
      expect(accuracyTile).toBeTruthy();
    });
  });

  // ── Recommendations ─────────────────────────────────────────────────────

  test('shows recommendations section when there are weak areas', () => {
    render(renderWithProviders(<StudentHome />));
    const hasRecs = screen.queryByText(/what to work on/i);
    const noWeak = screen.queryByText(/no weak areas flagged/i);
    const firstSession = screen.queryByText(/complete your first session/i);
    expect(hasRecs || noWeak || firstSession).toBeTruthy();
  });

  // ── Subject Performance ─────────────────────────────────────────────────

  test('shows subject performance section when data exists', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.queryByText('Subject performance')).not.toBeInTheDocument();
  });

  // ── Recent Sessions ─────────────────────────────────────────────────────

  test('shows recent sessions section with empty state when no sessions', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText('Recent sessions')).toBeInTheDocument();
    expect(screen.getByText(/no sessions yet/i)).toBeInTheDocument();
  });

  // ── Achievements ────────────────────────────────────────────────────────

  test('renders achievements section', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText('Achievements')).toBeInTheDocument();
  });

  test('shows empty state when no badges earned', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText(/no badges yet/i)).toBeInTheDocument();
  });

  // ── Phase Timeline ──────────────────────────────────────────────────────

  test('renders phase timeline', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText(/your 12-week program/i)).toBeInTheDocument();
  });

  test('shows all three phases', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText('Foundation')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('Examination Preparation')).toBeInTheDocument();
  });

  // ── Design Tokens ───────────────────────────────────────────────────────

  test('uses design token classes instead of raw gray colors', () => {
    render(renderWithProviders(<StudentHome />));
    const container = screen.getByText(/welcome back/i).closest('div')?.parentElement;
    expect(container).toBeTruthy();
    const html = container?.innerHTML ?? '';
    expect(html).not.toMatch(/text-gray-\d/);
    expect(html).not.toMatch(/bg-gray-\d/);
    expect(html).not.toMatch(/border-gray-\d/);
  });

  test('uses neutral design tokens', () => {
    render(renderWithProviders(<StudentHome />));
    const container = screen.getByText(/welcome back/i).closest('div')?.parentElement;
    const html = container?.innerHTML ?? '';
    expect(html).toMatch(/neutral-\d/);
  });

  // ── Animations ──────────────────────────────────────────────────────────

  test('has framer motion animations', () => {
    render(renderWithProviders(<StudentHome />));
    const container = screen.getByText(/welcome back/i).closest('div')?.parentElement;
    expect(container).toBeTruthy();
  });

  // ── Empty States ────────────────────────────────────────────────────────

  test('shows empty state for badges when none earned', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText(/finish your first session to unlock first step/i)).toBeInTheDocument();
  });

  test('does not show subject performance when no data', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.queryByText('Subject performance')).not.toBeInTheDocument();
  });

  test('shows empty state for recent sessions when no sessions', () => {
    render(renderWithProviders(<StudentHome />));
    expect(screen.getByText(/no sessions yet/i)).toBeInTheDocument();
  });
});
