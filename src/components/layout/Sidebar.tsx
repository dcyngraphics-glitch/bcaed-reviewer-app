import { NavLink } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';

interface NavItem {
  label: string;
  to: string;
  /** Optional badge, e.g. the count of questions in My Mistakes. */
  badge?: number;
}

/** Student navigation, in the order the plan lists it. */
const STUDENT_NAV = [
  { label: 'Home', to: '/student/home' },
  { label: 'Review', to: '/review' },
  { label: 'Practice', to: '/practice' },
  { label: 'Mock Exams', to: '/mock-exams' },
  { label: 'My Mistakes', to: '/mistakes' },
  { label: 'Progress', to: '/progress' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Diagnostic', to: '/diagnostic' },
  { label: 'Profile', to: '/profile' },
] as const;

/** Admin navigation. */
const ADMIN_NAV = [{ label: 'Admin', to: '/admin' }] as const;

const Sidebar = () => {
  const { profile, stats } = useProfile();

  const items: NavItem[] = [
    ...STUDENT_NAV.map((item) =>
      item.to === '/mistakes' ? { ...item, badge: profile.mistakes.length } : { ...item },
    ),
    ...ADMIN_NAV.map((item) => ({ ...item })),
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r hidden md:block">
      <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
        <nav className="space-y-1 flex-1" aria-label="Main navigation">
          {items.map(({ label, to, badge }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-600 text-primary-50' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <span>{label}</span>
              {badge && badge > 0 ? (
                <span
                  className="ml-2 rounded-full bg-red-100 text-red-700 text-xs px-2 py-0.5"
                  aria-label={`${badge} questions to review`}
                >
                  {badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        {/* Compact streak/XP strip so the sidebar is not dead space. */}
        <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 space-y-1">
          <p>
            <span className="font-semibold text-gray-700">{stats.currentStreak}</span> day streak
          </p>
          <p>
            <span className="font-semibold text-gray-700">{profile.xp}</span> XP
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;