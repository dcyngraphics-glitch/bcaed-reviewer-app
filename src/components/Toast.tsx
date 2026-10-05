import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export interface ToastProps {
  children?: React.ReactNode;
  variant?: ToastVariant;
  /** Milliseconds before auto-close. The timer is suspended while hovered. */
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}

const Toast = ({
  children,
  variant = 'default',
  duration = 3000,
  position = 'top-right',
  onClose,
}: ToastProps) => {
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  const variantClasses: Record<ToastVariant, string> = {
    default: 'bg-primary-600 text-primary-50',
    success: 'bg-success-600 text-success-50',
    warning: 'bg-warning-600 text-warning-50',
    error: 'bg-error-600 text-error-50',
    info: 'bg-info-600 text-info-50',
  };

  const positionClasses: Record<ToastPosition, string> = {
    'top-right': 'fixed top-4 right-4 z-50',
    'top-left': 'fixed top-4 left-4 z-50',
    'top-center': 'fixed top-4 left-1/2 -translate-x-1/2 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  // The old version tracked `hovered` but never read it, so the documented
  // "don't auto-close on hover" behaviour did not exist.
  useEffect(() => {
    if (hovered || duration <= 0) return;

    const timer = window.setTimeout(handleClose, duration);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, duration]);

  if (!visible) return null;

  return (
    <motion.div
      className={`${positionClasses[position]} flex items-center w-56 rounded-lg shadow-lg ${variantClasses[variant]} transition-all duration-300 ease-in-out`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
    >
      <div className="flex-1">{children}</div>
      <button 
        onClick={handleClose}
        className="ml-3 text-primary-50 hover:text-primary-200"
        aria-label="Close toast"
      >
        ×
      </button>
    </motion.div>
  );
};

export default Toast;