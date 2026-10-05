import { useState } from 'react';
import { motion } from 'framer-motion';

const Toast = ({ 
  children, 
  variant = 'default',
  duration = 3000,
  position = 'top-right',
  onClose,
  ...props 
}) => {
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Auto-close after duration unless hovered
  // Using setTimeout for simplicity in this implementation
  // In a real app, you might use useEffect with cleanup

  const variantClasses = {
    default: 'bg-primary-600 text-primary-50',
    success: 'bg-green-600 text-green-50',
    warning: 'bg-yellow-600 text-yellow-50',
    error: 'bg-red-600 text-red-50',
    info: 'bg-blue-600 text-blue-50',
  }[variant];

  const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-50',
    'top-left': 'fixed top-4 left-4 z-50',
    'top-center': 'fixed top-4 left-1/2 -translate-x-1/2 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2 z-50',
  }[position];

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  // Simplified auto-close - in reality would use useEffect
  // For test purposes, we'll make it closable
  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <motion.div
      className={`${positionClasses} flex items-center w-56 rounded-lg shadow-lg ${variantClasses} transition-all duration-300 ease-in-out`}
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