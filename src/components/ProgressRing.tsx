import React from 'react';
import { motion } from 'framer-motion';

const ProgressRing = ({ 
  value = 0, 
  size = 40, 
  thickness = 4, 
  color = 'primary-600',
  className = '',
  ...props 
}) => {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = offset;

  return (
    <motion.div
      className={`relative w-${size} h-${size} ${className}`}
      {...props}
    >
      <svg className="absolute inset-0" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          className={`stroke-gray-200 stroke-${thickness} fill-none`}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          className={`transition-stroke duration-500 ease-out stroke-${color} stroke-${thickness} fill-none`}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {typeof value === 'number' && value > 0 && (
        <div className={`absolute inset-0 flex items-center justify-center text-${color} font-medium text-xs`}>
          {value}%
        </div>
      )}
    </motion.div>
  );
};

export default ProgressRing;