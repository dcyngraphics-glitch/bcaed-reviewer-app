import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../../routes/auth';
import Sidebar from '../Sidebar';

// Sidebar now uses NavLink, so it needs a router context.
const renderSidebar = (initialEntries = ['/']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        <Sidebar />
      </AuthProvider>
    </MemoryRouter>,
  );

describe('Sidebar Component', () => {
  test('renders sidebar links', () => {
    renderSidebar();
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /subjects/i })).toBeInTheDocument();
  });

  test('links to real routes, not "#"', () => {
    renderSidebar();
    // The old markup used href="#" on every item: same-page navigation with no
    // route change, which also polluted the URL.
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute('href')).not.toBe('#');
    }
  });

  test('marks the active route', () => {
    renderSidebar(['/student/home']);
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});