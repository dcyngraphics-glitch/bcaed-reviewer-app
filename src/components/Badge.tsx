import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const variantClasses = {
    default: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    destructive: 'bg-red-100 text-red-800',
    outline: 'border border-primary-500 text-primary-500',
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;