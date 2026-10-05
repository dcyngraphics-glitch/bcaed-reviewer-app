import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, RequireAuth, RedirectIfAuthenticated } from '../auth';
import { ProfileProvider } from '../../context/ProfileContext';
import MainLayout from '../../components/layout/MainLayout';
import Login from '../../pages/auth/Login';
import StudentHome from '../../pages/student/Home';
import NotFound from '../../pages/NotFound';
import { typeInto, clickButton } from '../../test/interact';

/**
 * Mirrors AppRoutes' tree in a MemoryRouter so the routing and auth behaviour
 * can be asserted directly. A suite that only imports leaf components goes
 * green even when no protected route matches.
 */
const RoutesUnderTest = () => (
  <AuthProvider>
    <MemoryRouter initialEntries={[window.location.pathname]}>
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          element={
            <RequireAuth>
              <ProfileProvider name="Test Student" startDate="2026-10-05">
                <MainLayout />
              </ProfileProvider>
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/student/home" replace />} />
          <Route path="student/home" element={<StudentHome />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  </AuthProvider>
);

const goto = (path: string) => {
  window.history.pushState({}, '', path);
  return <RoutesUnderTest />;
};

describe('routing and auth', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('unauthenticated visitor is bounced to the login screen', () => {
    render(goto('/student/home'));
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  test('signing in reaches the dashboard', async () => {
    render(goto('/student/home'));

    await screen.findByLabelText(/your name/i);
    typeInto(screen, /your name/i, 'Juan Dela Cruz');
    await clickButton(screen, /continue/i);

    expect(await screen.findByText(/welcome back/i)).toBeInTheDocument();
    expect(window.localStorage.getItem('isAuthenticated')).toBe('true');
  });

  test('the layout route actually renders its child', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    render(goto('/student/home'));
    expect(await screen.findByText(/welcome back/i)).toBeInTheDocument();
  });

  test('renders exactly one header and footer on a protected page', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    render(goto('/student/home'));

    await screen.findByText(/welcome back/i);
    expect(screen.getAllByRole('banner')).toHaveLength(1);
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
  });

  test('signing out returns to login', async () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    render(goto('/student/home'));

    await screen.findByText(/welcome back/i);
    await clickButton(screen, /sign out/i);

    expect(await screen.findByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  test('unknown URLs show a 404, not a login bounce', () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    render(goto('/nope'));

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
