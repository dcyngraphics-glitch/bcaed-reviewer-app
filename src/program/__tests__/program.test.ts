import { describe, test, expect } from 'vitest';
import {
  PHASES,
  SCHEDULED_WEEKDAYS,
  WEEKLY_PLAN,
  phaseForWeek,
  taskForDate,
  weekNumberForDate,
  programProgress,
  DEFAULT_START_DATE,
  PROGRAM_WEEKS,
} from '..';
import type { Difficulty } from '../../types/content';

describe('12-week program shape', () => {
  test('runs for 12 weeks', () => {
    expect(PROGRAM_WEEKS).toBe(12);
  });

  test('splits into Foundation, Development and Examination phases', () => {
    expect(PHASES.map((p) => p.name)).toEqual([
      'Foundation',
      'Development',
      'Examination Preparation',
    ]);
    expect(PHASES[0]).toMatchObject({ fromWeek: 1, toWeek: 4 });
    expect(PHASES[1]).toMatchObject({ fromWeek: 5, toWeek: 8 });
    expect(PHASES[2]).toMatchObject({ fromWeek: 9, toWeek: 12 });
  });

  test('difficulty rises monotonically across the three phases', () => {
    const bands: Difficulty[] = PHASES.map((p) => p.difficultyBand[0]);
    expect([...bands].sort((a, b) => a - b)).toEqual(bands);
    expect(PHASES[2].difficultyBand[1]).toBe(5);
  });

  test('phaseForWeek maps every week to exactly one phase', () => {
    for (let week = 1; week <= PROGRAM_WEEKS; week += 1) {
      expect(phaseForWeek(week)).toBeDefined();
    }
    expect(phaseForWeek(1).name).toBe('Foundation');
    expect(phaseForWeek(6).name).toBe('Development');
    expect(phaseForWeek(12).name).toBe('Examination Preparation');
  });

  test('clamps weeks outside 1..12 instead of returning undefined', () => {
    expect(phaseForWeek(0).name).toBe('Foundation');
    expect(phaseForWeek(99).name).toBe('Examination Preparation');
  });
});

describe('weekly schedule', () => {
  // Plan: study Mon/Tue/Thu/Fri; Wed is a rest day; weekend is optional.
  test('covers all seven days', () => {
    expect(WEEKLY_PLAN).toHaveLength(7);
    expect(WEEKLY_PLAN.map((d) => d.weekday)).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  test('marks Wednesday as a rest day and the weekend as optional', () => {
    const wed = WEEKLY_PLAN.find((d) => d.weekday === 3);
    expect(wed?.kind).toBe('rest');
    expect(wed?.required).toBe(false);

    for (const weekday of [6, 0]) {
      const day = WEEKLY_PLAN.find((d) => d.weekday === weekday);
      expect(day?.kind).toBe('optional');
      expect(day?.required).toBe(false);
    }
  });

  test('requires exactly Monday, Tuesday, Thursday and Friday', () => {
    const required = WEEKLY_PLAN.filter((d) => d.required).map((d) => d.weekday);
    expect(required).toEqual([1, 2, 4, 5]);
    expect(SCHEDULED_WEEKDAYS).toEqual([1, 2, 4, 5]);
  });

  test('Monday introduces a lesson, Thursday is a timed challenge, Friday assesses', () => {
    const monday = WEEKLY_PLAN.find((d) => d.weekday === 1);
    const thursday = WEEKLY_PLAN.find((d) => d.weekday === 4);
    const friday = WEEKLY_PLAN.find((d) => d.weekday === 5);

    expect(monday?.kind).toBe('lesson');
    expect(thursday?.kind).toBe('challenge');
    expect(thursday?.timed).toBe(true);
    expect(friday?.kind).toBe('assessment');
  });
});

describe('weekNumberForDate', () => {
  test('week 1 starts on the program start date', () => {
    expect(weekNumberForDate(DEFAULT_START_DATE, DEFAULT_START_DATE)).toBe(1);
  });

  test('advances every seven days', () => {
    expect(weekNumberForDate('2026-10-05', '2026-10-11')).toBe(1);
    expect(weekNumberForDate('2026-10-05', '2026-10-12')).toBe(2);
    expect(weekNumberForDate('2026-10-05', '2026-11-02')).toBe(5);
  });

  test('clamps to 1..12 before the start and after the end', () => {
    expect(weekNumberForDate('2026-10-05', '2026-01-01')).toBe(1);
    expect(weekNumberForDate('2026-10-05', '2027-06-01')).toBe(12);
  });
});

describe('taskForDate', () => {
  const START = '2026-10-05'; // a Monday

  test('names the mission after the weekday kind', () => {
    // Mon 10-05, Tue 10-06, Thu 10-08, Fri 10-09.
    expect(taskForDate(START, '2026-10-05', START).title).toMatch(/lesson/i);
    expect(taskForDate(START, '2026-10-06', START).title).toMatch(/reinforcement/i);
    expect(taskForDate(START, '2026-10-08', START).title).toMatch(/challenge/i);
    expect(taskForDate(START, '2026-10-09', START).title).toMatch(/assessment/i);
  });

  test('gives a rest day on Wednesday with nothing required', () => {
    const task = taskForDate(START, '2026-10-07', START);
    expect(task.required).toBe(false);
    expect(task.kind).toBe('rest');
    expect(task.questionCount).toBe(0);
  });

  test('carries the week number and the phase difficulty', () => {
    const early = taskForDate(START, '2026-10-05', START);
    expect(early.week).toBe(1);
    expect(early.difficulty).toBe(1);

    // Week 9 begins 2026-11-30 (a Monday) -> Examination Preparation.
    const late = taskForDate(START, '2026-11-30', START);
    expect(late.week).toBe(9);
    expect(late.difficulty).toBeGreaterThanOrEqual(4);
  });

  test('escalates the question count as the program progresses', () => {
    const week1 = taskForDate(START, '2026-10-05', START);
    const week12 = taskForDate(START, '2026-12-21', START);
    expect(week12.questionCount).toBeGreaterThan(week1.questionCount);
  });

  test('is deterministic for the same inputs', () => {
    expect(taskForDate(START, '2026-10-08', START)).toEqual(taskForDate(START, '2026-10-08', START));
  });
});

describe('programProgress', () => {
  test('is 0% before the program starts and 100% at the end', () => {
    expect(programProgress(1).percent).toBe(0);
    expect(programProgress(12).percent).toBe(100);
  });

  test('advances in even steps', () => {
    const p = [1, 2, 3, 6, 9, 12].map((w) => programProgress(w).percent);
    expect([...p].sort((a, b) => a - b)).toEqual(p);
  });

  test('clamps out-of-range weeks', () => {
    expect(programProgress(0).percent).toBe(0);
    expect(programProgress(50).percent).toBe(100);
  });
});
