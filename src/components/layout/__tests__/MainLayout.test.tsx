import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../MainLayout';
import { renderWithProviders } from '../../../test/renderWithProviders';

// MainLayout renders <Outlet />, so it must be exercised as a layout route
// inside a router. The old test passed children directly, which can no longer
// reach the component.
const renderLayout = () =>
  render(
    renderWithProviders(
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<div data-testid="test-content">Test Content</div>} />
        </Route>
      </Routes>,
    ),
  );

describe('MainLayout Component', () => {
  test('renders the outlet content', () => {
    renderLayout();
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  test('renders exactly one header and one footer', () => {
    renderLayout();
    expect(screen.getAllByRole('banner')).toHaveLength(1);
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
  });

  test('renders the sidebar navigation', () => {
    renderLayout();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });
});
