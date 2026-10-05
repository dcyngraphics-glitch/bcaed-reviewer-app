import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AUTH_KEY = 'isAuthenticated';

export const isAuthenticated = (): boolean => {
  try {
    return window.localStorage.getItem(AUTH_KEY) === 'true';
  } catch {
    // Private-mode / disabled storage: treat as signed out rather than throwing.
    return false;
  }
};

interface AuthContextValue {
  authenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Auth state lives here rather than being read straight off localStorage during
 * render, so a sign-in or sign-out actually re-renders the guards.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated);

  const login = useCallback(() => {
    try {
      window.localStorage.setItem(AUTH_KEY, 'true');
    } catch {
      // Ignore storage failures; the in-memory state still gates the session.
    }
    setAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    try {
      window.localStorage.removeItem(AUTH_KEY);
    } catch {
      // Ignore storage failures.
    }
    setAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

/** Redirects to /login, remembering where the user was headed. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { authenticated } = useAuth();
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

/** Keeps a signed-in user off the login screen. */
export function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to="/student/home" replace />;
  }

  return <>{children}</>;
}