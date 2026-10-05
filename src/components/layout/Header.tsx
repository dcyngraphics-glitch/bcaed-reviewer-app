import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Button from '../Button';
import { useAuth } from '../../routes/auth';
import { useProfile } from '../../context/ProfileContext';

/**
 * Same destinations as the desktop sidebar. Kept as a separate list because the
 * two render very differently — a rail versus a drawer — and sharing one list
 * would only couple their markup.
 */
const NAV = [
  { label: 'Home', to: '/student/home' },
  { label: 'Review', to: '/review' },
  { label: 'Practice', to: '/practice' },
  { label: 'Mock Exams', to: '/mock-exams' },
  { label: 'My Mistakes', to: '/mistakes' },
  { label: 'Progress', to: '/progress' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Diagnostic', to: '/diagnostic' },
  { label: 'Profile', to: '/profile' },
  { label: 'Admin', to: '/admin' },
  { label: 'Review Queue', to: '/admin/review-queue' },
] as const;

const Header = () => {
  const { logout } = useAuth();
  const { profile } = useProfile();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  // The sidebar is hidden below md, so this drawer is the only navigation on a
  // phone. Without it the app is unusable on the Android target the plan names.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            className="md:hidden shrink-0 p-2 -ml-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none">
              {menuOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>

          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
            BCAED Reviewer
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:block text-xs text-gray-500">
            {profile.currentStreak} day streak &middot; {profile.xp} XP
          </span>
          <Button variant="outline" size="sm" onClick={logout}>
            Sign out
          </Button>
        </div>
      </div>

      {menuOpen ? (
        <div className="md:hidden border-t border-gray-200 bg-white" id="mobile-nav">
          <nav className="px-3 py-3 space-y-1" aria-label="Main navigation">
            {NAV.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md text-sm font-medium ${
                    isActive ? 'bg-primary-600 text-primary-50' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {label}
                {to === '/mistakes' && profile.mistakes.length > 0 ? (
                  <span className="ml-2 rounded-full bg-red-100 text-red-700 text-xs px-2 py-0.5">
                    {profile.mistakes.length}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
