import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

// Framer's onAnimationStart signature collides with React's DOM one, so base
// the props on framer's own HTMLMotionProps rather than HTMLAttributes.
export interface ProgressRingProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Current value, in the same units as `max`. */
  value?: number;
  /** Upper bound of the scale. */
  max?: number;
  /** Rendered diameter in pixels. */
  size?: number;
  /** Stroke weight in viewBox units (viewBox is 0 0 100 100). */
  strokeWidth?: number;
  /** Static Tailwind class for the progress arc. Must be a literal, not interpolated. */
  color?: string;
  /** Static Tailwind class for the unfilled track. Must be a literal, not interpolated. */
  trackColor?: string;
  /** Static Tailwind class for the centred label. Must be a literal, not interpolated. */
  labelColor?: string;
  /** Hide the centred percentage label. */
  showLabel?: boolean;
}

const ProgressRing = ({
  value = 0,
  max = 100,
  size = 40,
  strokeWidth = 8,
  color = 'stroke-primary-600',
  trackColor = 'stroke-gray-200',
  labelColor = 'text-primary-600',
  showLabel = true,
  className = '',
  ...props
}: ProgressRingProps) => {
  // Everything below lives in one coordinate space: the 0 0 100 100 viewBox.
  // The old version derived the radius from the pixel `size`, mixing units and
  // clipping the ring for any size over 100.
  const viewBoxSize = 100;
  const radius = (viewBoxSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const safeMax = max > 0 ? max : 100;
  const clamped = Math.min(Math.max(value, 0), safeMax);
  const percent = (clamped / safeMax) * 100;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const label = `${Math.round(percent)}%`;

  return (
    <motion.div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-label={label}
      {...props}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={trackColor}
        />
        <circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          // Rotate so the arc starts at 12 o'clock.
          transform={`rotate(-90 ${viewBoxSize / 2} ${viewBoxSize / 2})`}
          className={`transition-[stroke-dashoffset] duration-500 ease-out ${color}`}
        />
      </svg>
      {showLabel && percent > 0 && (
        <div
          className={`absolute inset-0 flex items-center justify-center font-medium ${labelColor}`}
          style={{ fontSize: Math.max(10, size / 6) }}
        >
          {label}
        </div>
      )}
    </motion.div>
  );
};

export default ProgressRing;