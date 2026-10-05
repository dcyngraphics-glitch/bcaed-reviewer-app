import { describe, test, expect } from 'vitest';
import { formatClock, isExpired, secondsRemaining, timerColourClass } from '../timer';

describe('secondsRemaining', () => {
  test('counts down from the limit', () => {
    expect(secondsRemaining(1200, 0)).toBe(1200);
    expect(secondsRemaining(1200, 60)).toBe(1140);
  });

  test('never goes below zero', () => {
    expect(secondsRemaining(60, 90)).toBe(0);
  });

  test('treats a null limit as untimed', () => {
    expect(secondsRemaining(null, 300)).toBeNull();
  });
});

describe('isExpired', () => {
  test('is false while time remains', () => {
    expect(isExpired(600, 599)).toBe(false);
  });

  test('is true exactly at the limit', () => {
    // The exam must auto-submit the moment the clock runs out.
    expect(isExpired(600, 600)).toBe(true);
  });

  test('is true past the limit', () => {
    expect(isExpired(600, 900)).toBe(true);
  });

  test('is never true for an untimed session', () => {
    expect(isExpired(null, 100000)).toBe(false);
  });
});

describe('formatClock', () => {
  test('formats under an hour as mm:ss', () => {
    expect(formatClock(0)).toBe('00:00');
    expect(formatClock(59)).toBe('00:59');
    expect(formatClock(600)).toBe('10:00');
  });

  test('formats an hour or more as h:mm:ss', () => {
    expect(formatClock(3600)).toBe('1:00:00');
    expect(formatClock(3725)).toBe('1:02:05');
  });

  test('clamps negative input to zero', () => {
    expect(formatClock(-10)).toBe('00:00');
  });
});

describe('timerColourClass', () => {
  test('is neutral with plenty of time left', () => {
    // limit 1200s, only 100s elapsed.
    expect(timerColourClass(1200, 100)).toContain('muted-foreground');
  });

  test('warns in the final quarter', () => {
    // limit 1200s, 950s elapsed -> 250s left, inside the last quarter.
    expect(timerColourClass(1200, 950)).toContain('warning-600');
  });

  test('alerts in the final minute', () => {
    expect(timerColourClass(1200, 1155)).toContain('error-600');
  });

  test('is neutral for an untimed session', () => {
    expect(timerColourClass(null, 600)).toContain('muted-foreground');
  });
});
