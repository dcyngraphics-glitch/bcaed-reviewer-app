import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'outline'
  | 'destructive'
  | 'secondary'
  | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
    'disabled:pointer-events-none disabled:opacity-50';

  const variantClasses: Record<ButtonVariant, string> = {
    default: 'bg-primary-600 text-primary-50 hover:bg-primary-700',
    // Every caller passes "primary"; it used to resolve to undefined and
    // rendered the literal string "undefined" in className.
    primary: 'bg-primary-600 text-primary-50 hover:bg-primary-700',
    outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
    destructive: 'bg-red-600 text-red-50 hover:bg-red-700',
    secondary: 'bg-secondary-600 text-secondary-50 hover:bg-secondary-700',
    success: 'bg-green-600 text-green-50 hover:bg-green-700',
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-11 px-5 text-lg',
  };

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;