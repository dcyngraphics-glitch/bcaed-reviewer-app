import { motion, type HTMLMotionProps } from 'framer-motion';

export type ButtonVariant =
  | 'default'
  | 'primary'
  | 'outline'
  | 'destructive'
  | 'secondary'
  | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-primary-600 text-primary-50 hover:bg-primary-700',
  primary: 'bg-primary-600 text-primary-50 hover:bg-primary-700',
  outline: 'border border-primary-600 text-primary-600 hover:bg-primary-50',
  destructive: 'bg-error-600 text-error-50 hover:bg-error-700',
  secondary: 'bg-secondary-600 text-secondary-50 hover:bg-secondary-700',
  success: 'bg-success-600 text-success-50 hover:bg-success-700',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-11 px-5 text-lg',
};

const Button = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
    'disabled:pointer-events-none disabled:opacity-50';

  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;