import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../routes/auth';
import { ProfileProvider } from '../context/ProfileContext';

/**
 * Wraps a component in the providers every page now needs.
 *
 * Pages read the student profile from ProfileProvider and the session from
 * AuthProvider, so a bare render() throws "useProfile must be used within a
 * ProfileProvider". Use this in tests instead of repeating the nesting.
 */
export function renderWithProviders(
  ui: ReactNode,
  { route = '/' }: { route?: string } = {},
): ReactNode {
  return (
    <AuthProvider>
      <ProfileProvider name="Test Student" startDate="2026-10-05">
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}

/** Providers only, for tests that supply their own router (e.g. Routes trees). */
export function withProviders(ui: ReactNode): ReactNode {
  return (
    <AuthProvider>
      <ProfileProvider name="Test Student" startDate="2026-10-05">{ui}</ProfileProvider>
    </AuthProvider>
  );
}
