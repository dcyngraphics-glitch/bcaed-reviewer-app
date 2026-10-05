/**
 * Timer maths for timed sessions, kept out of the component so the edge cases
 * (expiry, clamping, colour thresholds) are testable without a clock.
 */

/** Seconds left, or null when the session has no time limit. */
export function secondsRemaining(limitSeconds: number | null, elapsedSeconds: number): number | null {
  if (limitSeconds === null) return null;
  return Math.max(0, Math.floor(limitSeconds - elapsedSeconds));
}

/** True the instant the clock reaches the limit, so the exam auto-submits. */
export function isExpired(limitSeconds: number | null, elapsedSeconds: number): boolean {
  if (limitSeconds === null) return false;
  return elapsedSeconds >= limitSeconds;
}

/** mm:ss under an hour, h:mm:ss above it. */
export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** Tailwind text colour for the clock, escalating as time runs out. */
export function timerColourClass(
  limitSeconds: number | null,
  elapsedSeconds: number,
): string {
  const remaining = secondsRemaining(limitSeconds, elapsedSeconds);
  if (remaining === null || limitSeconds === null || limitSeconds === 0) {
    return 'text-gray-600';
  }

  const ratio = remaining / limitSeconds;
  if (remaining <= 60) return 'text-red-600';
  if (ratio <= 0.25) return 'text-amber-600';
  return 'text-gray-600';
}
