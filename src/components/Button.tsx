import React from 'react';

const Button = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const baseClasses = 'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  
  const variantClasses = {
    default: 'bg-primary-600 text-primary-50 hover:bg-primary-700',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
    destructive: 'bg-red-600 text-red-50 hover:bg-red-700',
    secondary: 'bg-secondary-600 text-secondary-50 hover:bg-secondary-700',
  }[variant];

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-11 px-5 text-lg',
  }[size];

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;