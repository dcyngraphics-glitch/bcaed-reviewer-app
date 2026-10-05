import type { SessionRecord } from '../../storage/studentStore';

export interface TrendPoint {
  id: string;
  date: string;
  accuracy: number;
  mode: string;
  total: number;
}

/**
 * Turns session history into a chronological trend.
 *
 * Sessions are stored newest-last, but the chart reads left to right, so this
 * sorts by date then by insertion order within a day. Pure, so it can be
 * asserted without rendering.
 */
export function buildTrend(sessions: readonly SessionRecord[]): TrendPoint[] {
  return sessions
    .map((session, index) => ({ session, index }))
    .sort((a, b) => {
      if (a.session.date !== b.session.date) return a.session.date < b.session.date ? -1 : 1;
      return a.index - b.index;
    })
    .map(({ session }) => ({
      id: session.id,
      date: session.date,
      accuracy: session.accuracy,
      mode: session.mode,
      total: session.total,
    }));
}

export interface TrendSummary {
  /** Mean accuracy across all sessions, 0-100. */
  average: number;
  /** Mean accuracy of the most recent half minus the older half. */
  delta: number;
  direction: 'improving' | 'declining' | 'steady';
  first: number | null;
  latest: number | null;
}

/** How much movement counts as real rather than noise. */
const STEADY_BAND = 3;

export function summariseTrend(points: readonly TrendPoint[]): TrendSummary {
  if (points.length === 0) {
    return { average: 0, delta: 0, direction: 'steady', first: null, latest: null };
  }

  const average = Math.round(
    points.reduce((sum, point) => sum + point.accuracy, 0) / points.length,
  );

  const first = points[0].accuracy;
  const latest = points[points.length - 1].accuracy;

  // Compare halves rather than endpoints: a single bad day should not read as a
  // decline, and a single good one should not read as an improvement.
  let delta = 0;
  if (points.length >= 4) {
    const mid = Math.floor(points.length / 2);
    const older = points.slice(0, mid);
    const recent = points.slice(mid);
    const mean = (xs: readonly TrendPoint[]) =>
      xs.reduce((sum, p) => sum + p.accuracy, 0) / xs.length;
    delta = Math.round(mean(recent) - mean(older));
  } else {
    delta = latest - first;
  }

  const direction = delta > STEADY_BAND ? 'improving' : delta < -STEADY_BAND ? 'declining' : 'steady';

  return { average, delta, direction, first, latest };
}
