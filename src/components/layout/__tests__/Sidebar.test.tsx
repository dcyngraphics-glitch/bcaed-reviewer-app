import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { renderWithProviders } from '../../../test/renderWithProviders';

// Sidebar uses NavLink and reads the student profile, so it needs a router and
// the profile provider.
const renderSidebar = (route = '/') => render(renderWithProviders(<Sidebar />, { route }));

describe('Sidebar Component', () => {
  test('renders every student navigation item', () => {
    renderSidebar();
    for (const label of [
      'Home',
      'Review',
      'Practice',
      'Mock Exams',
      'My Mistakes',
      'Progress',
      'Achievements',
      'Profile',
    ]) {
      expect(screen.getByRole('link', { name: new RegExp(label, 'i') })).toBeInTheDocument();
    }
  });

  test('links to real routes, not "#"', () => {
    renderSidebar();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute('href')).not.toBe('#');
    }
  });

  test('marks the active route', () => {
    renderSidebar('/student/home');
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('aria-current', 'page');
  });

  test('exposes the admin entry', () => {
    renderSidebar();
    expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument();
  });
});
