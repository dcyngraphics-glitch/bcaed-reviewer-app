import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-50 border-r">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <nav className="space-y-2">
          <a href="#" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            Dashboard
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            Subjects
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            Practice Tests
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            Progress
          </a>
          <a href="#" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            Settings
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;