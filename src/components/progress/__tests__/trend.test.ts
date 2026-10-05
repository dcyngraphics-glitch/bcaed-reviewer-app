import { describe, test, expect } from 'vitest';
import { buildTrend, summariseTrend, type TrendPoint } from '../trend';
import type { SessionRecord } from '../../../storage/studentStore';

const session = (id: string, date: string, accuracy: number, mode = 'practice'): SessionRecord => ({
  id,
  date,
  mode: mode as SessionRecord['mode'],
  total: 10,
  correct: Math.round(accuracy / 10),
  accuracy,
  xpEarned: 50,
  durationSeconds: 120,
  byTopic: [],
  bySubject: [],
});

const point = (date: string, accuracy: number): TrendPoint => ({
  id: date,
  date,
  accuracy,
  mode: 'practice',
  total: 10,
});

describe('buildTrend', () => {
  test('orders sessions oldest first regardless of storage order', () => {
    const trend = buildTrend([
      session('c', '2026-10-09', 80),
      session('a', '2026-10-05', 50),
      session('b', '2026-10-07', 65),
    ]);
    expect(trend.map((p) => p.date)).toEqual(['2026-10-05', '2026-10-07', '2026-10-09']);
  });

  test('keeps two sessions on the same day in insertion order', () => {
    const trend = buildTrend([
      session('first', '2026-10-05', 40),
      session('second', '2026-10-05', 90),
    ]);
    expect(trend.map((p) => p.id)).toEqual(['first', 'second']);
  });

  test('returns an empty array for no sessions', () => {
    expect(buildTrend([])).toEqual([]);
  });

  test('carries the mode and item count through for labelling', () => {
    const trend = buildTrend([session('a', '2026-10-05', 70, 'mock')]);
    expect(trend[0]).toMatchObject({ mode: 'mock', total: 10, accuracy: 70 });
  });
});

describe('summariseTrend', () => {
  test('handles no data without dividing by zero', () => {
    expect(summariseTrend([])).toEqual({
      average: 0,
      delta: 0,
      direction: 'steady',
      first: null,
      latest: null,
    });
  });

  test('reports the mean accuracy', () => {
    const s = summariseTrend([point('a', 50), point('b', 70), point('c', 90)]);
    expect(s.average).toBe(70);
  });

  test('reports first and latest', () => {
    const s = summariseTrend([point('a', 40), point('b', 90)]);
    expect(s.first).toBe(40);
    expect(s.latest).toBe(90);
  });

  test('calls a clear rise improving', () => {
    const s = summariseTrend([
      point('a', 40),
      point('b', 45),
      point('c', 80),
      point('d', 85),
    ]);
    expect(s.direction).toBe('improving');
    expect(s.delta).toBeGreaterThan(3);
  });

  test('calls a clear fall declining', () => {
    const s = summariseTrend([
      point('a', 85),
      point('b', 80),
      point('c', 45),
      point('d', 40),
    ]);
    expect(s.direction).toBe('declining');
  });

  test('treats small movement as steady', () => {
    const s = summariseTrend([
      point('a', 70),
      point('b', 72),
      point('c', 71),
      point('d', 72),
    ]);
    expect(s.direction).toBe('steady');
  });

  test('a single dip inside a longer improving run still reads as improving', () => {
    // The dip sits in the older half, so it does not outweigh real progress.
    const s = summariseTrend([
      point('a', 80),
      point('b', 82),
      point('c', 84),
      point('d', 40),
      point('e', 84),
      point('f', 86),
      point('g', 88),
      point('h', 90),
    ]);
    expect(s.direction).toBe('improving');
  });

  test('a dip in the recent half does read as a decline', () => {
    // This is the honest signal: recent performance really is worse.
    const s = summariseTrend([
      point('a', 80),
      point('b', 82),
      point('c', 84),
      point('d', 40),
    ]);
    expect(s.direction).toBe('declining');
  });

  test('with fewer than four sessions it falls back to first vs latest', () => {
    const s = summariseTrend([point('a', 90), point('b', 40)]);
    expect(s.direction).toBe('declining');
    expect(s.delta).toBe(-50);
  });
});
