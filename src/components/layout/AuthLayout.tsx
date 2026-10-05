import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6 p-4 bg-white rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;