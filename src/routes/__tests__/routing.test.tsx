import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, RequireAuth, RedirectIfAuthenticated } from '../auth';
import MainLayout from '../../components/layout/MainLayout';
import Login from '../../pages/auth/Login';
import StudentHome from '../../pages/student/Home';
import NotFound from '../../pages/NotFound';

/**
 * Mirrors AppRoutes' tree in a MemoryRouter so we can assert the routing and
 * auth behaviour that the old suite never touched. The previous suite only
 * imported leaf components, so a completely broken app still went green.
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
              <MainLayout />
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
    // RequireAuth previously read a localStorage flag that nothing ever set,
    // so this was an infinite redirect loop.
    render(goto('/student/home'));
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('signing in reaches the dashboard', async () => {
    // The form fields are `required`, so submitting needs real input first.
    const user = userEvent.setup();
    render(goto('/student/home'));

    await user.type(screen.getByLabelText(/email address/i), 'juan@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'hunter2');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    expect(await screen.findByText(/welcome back/i)).toBeInTheDocument();
    expect(window.localStorage.getItem('isAuthenticated')).toBe('true');
  });

  test('the nested layout route actually renders its child', async () => {
    // The old tree nested <Routes> inside a pathless layout <Route>, so no
    // protected route ever matched and React Router warned at runtime.
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
    const user = userEvent.setup();
    render(goto('/student/home'));

    await screen.findByText(/welcome back/i);
    await user.click(screen.getByRole('button', { name: /sign out/i }));

    expect(await screen.findByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('unknown URLs show a 404, not a login bounce', () => {
    window.localStorage.setItem('isAuthenticated', 'true');
    render(goto('/nope'));

    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});