import { motion } from 'framer-motion';
import { formatClock, secondsRemaining, timerColourClass } from './timer';

export interface TimerProps {
  /** Seconds allowed. null means untimed. */
  limitSeconds: number | null;
  /** Seconds already elapsed. */
  elapsedSeconds: number;
}

/**
 * Displays remaining time for a timed session with a progress bar.
 * Uses design tokens for all colours and Framer Motion for subtle animation.
 */
const Timer = ({ limitSeconds, elapsedSeconds }: TimerProps) => {
  const remaining = secondsRemaining(limitSeconds, elapsedSeconds);
  const isUntimed = limitSeconds === null || remaining === null;

  if (isUntimed) {
    return (
      <div className="text-right">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Time</p>
        <p className="text-lg font-semibold text-muted-foreground" aria-live="polite">
          Untimed
        </p>
      </div>
    );
  }

  const colourClass = timerColourClass(limitSeconds, elapsedSeconds);
  const progressPercent = limitSeconds > 0 ? ((limitSeconds - remaining!) / limitSeconds) * 100 : 0;

  return (
    <div className="text-right">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Time left</p>
      <motion.p
        key={remaining}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        className={`text-lg font-semibold tabular-nums ${colourClass}`}
        aria-live="polite"
      >
        {formatClock(remaining!)}
      </motion.p>
      <div className="mt-1 h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
        <motion.div
          className="h-1.5 bg-primary-600 rounded-full"
          style={{ width: `${progressPercent}%` }}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          role="progressbar"
          aria-valuenow={Math.round(progressPercent)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default Timer;
