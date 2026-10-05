import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/student/home' },
  { label: 'Subjects', to: '/subjects' },
  { label: 'Practice Tests', to: '/quiz' },
  { label: 'Progress', to: '/progress' },
  { label: 'Settings', to: '/settings' },
] as const;

const Sidebar = () => {
  return (
    <aside className="w-64 shrink-0 bg-white border-r">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <nav className="space-y-2">
          {/* Was href="#" on every item: same-page navigation, no route change,
              and it polluted the URL. NavLink gives real SPA navigation. */}
          {NAV_ITEMS.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-primary-600 text-primary-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;