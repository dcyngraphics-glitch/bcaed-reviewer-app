/**
 * Canonical content model.
 *
 * The plan is explicit that the BCAED curriculum must not be hard-coded: the
 * administrator creates Subjects -> Topics -> Lessons -> Questions. Everything
 * in this app therefore keys off these ids and never off a display name.
 */

/** 1 = recall, 5 = hardest situational/analysis. Drives adaptive selection. */
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  1: 'Foundation',
  2: 'Basic',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Exam-level',
};

export interface Topic {
  id: string;
  subjectId: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
  /** Short blurb shown on the review page. */
  description: string;
}

export interface Lesson {
  id: string;
  subjectId: string;
  topicId: string;
  title: string;
  summary: string;
  /** Key points the student should take away. */
  keyPoints: string[];
}

export interface Question {
  id: string;
  subjectId: string;
  topicId: string;
  difficulty: Difficulty;
  prompt: string;
  /** Exactly four options, A/B/C/D, one correct. */
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  /**
   * Where the fact came from. Required for researched questions so the admin
   * can audit them, per the plan's "keep track of the source" rule.
   */
  source?: string;
  /** AI-drafted questions stay out of exams until an admin approves them. */
  status: 'approved' | 'pending';

  /**
   * A scenario or definitional vignette placed BEFORE the question, as the real
   * exam does. The student must read it and then apply it; the question itself
   * is the last sentence of `prompt`.
   *
   * On exam day roughly 80% of the paper is built this way: a paragraph of
   * set-up, then "Which of the following...?" or "How can the teacher...?".
   */
  vignette?: string;
  /**
   * What the item is actually testing, stated plainly. Shown in review so the
   * student learns the concept, not just the answer.
   */
  rationale?: string;
  /**
   * Marks a situational item. Drives the mock exam mix, where the plan calls for
   * a heavier share of these than the graded weekly ramp uses.
   */
  situational?: boolean;
}

export interface SubjectWithTopics extends Subject {
  topics: Topic[];
}
