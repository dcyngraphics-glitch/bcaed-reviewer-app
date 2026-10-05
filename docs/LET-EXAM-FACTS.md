# LET Exam Facts (verified)

Reference notes for the BCAED Reviewer App. These are the real exam parameters the
app's exam model and mock papers are built from. Every number here is sourced.

## Sources

- PRC Board for Professional Teachers **Resolution No. 11, s. 2025** — Enhanced
  Table of Specifications for the LEPT. Applies from the March 2023 LEPT onwards
  (Board Res. No. 11 s. 2022 for the enhanced TOS).
- **PRC–CHED Joint Memorandum Circular, 10 April 2025** — aligning the LEPT with
  CMO 82 s. 2017 (BCAEd) and the other new teacher-education curricula.
- PRC 2026 LEPT examination program (published schedule).
- CHED CMO No. 82, s. 2017 — Policies, Standards and Guidelines for the BCAEd.

## Secondary level: 450 items, one Sunday

| Subtest | Items | Time | Window | Weight |
| --- | --- | --- | --- | --- |
| General Education | 150 | 2 h | 8:00–10:00 a.m. | **20%** |
| Professional Education | 150 | 3 h | 11:00 a.m.–2:00 p.m. | **40%** |
| Area of Specialization | 150 | 3.5 h | 3:00–6:30 p.m. | **40%** |

- Elementary (no specialization): Gen Ed 150 items / 40%, Prof Ed 150 items / 60%.
- Elementary **with** specialization (BECEd, BSNEd, BTLEd, BTVTEd, BPEd, BCAEd):
  same 20 / 40 / 40 split as Secondary.
- **BCAEd graduates sit the Gen Ed + Prof Ed + Culture and Arts Education
  specialization track.** Confirmed by the PRC–CHED JMC.
- All items are four-option multiple choice.
- The Mathematics specialization is 120 items, not 150. Not our track.
- No calculators at the Elementary level.

### Time per item

| Subtest | Seconds per item |
| --- | --- |
| General Education | 48 |
| Professional Education | 72 |
| Specialization | 84 |

Gen Ed is the tightest paper by a wide margin — under a minute per item. The app's
mock presets must reflect this, not a flat "1.2 minutes per question".

## The passing rule — two conditions, both required

1. **A general weighted average of at least 75%.**
2. **No rating lower than 50% in any single subtest.**

The second condition is the one students underestimate. An examinee can average
above 75% and still fail outright by scoring below 50% in one subtest. Any
readiness indicator in the app that only reports a single average is misleading.

## Professional Education: TOS areas and weights

| Area | Weight | Items |
| --- | --- | --- |
| A. The Teaching Profession (foundations; the professional teacher; Code of Ethics) | 15% | 23 |
| B. The Teacher and the School Curriculum; Methods and Strategies; Educational Technology | 30% | 45 |
| C. The Child and Adolescent Learners and Learning Principles | 20% | 30 |
| D. Assessment of Learning | 15% | 22 |
| E. Field Study and Teaching Internship (experiential learning, action research) | 20% | 30 |

- **Area B is the single biggest block at 45 items.**
- Official difficulty mix: **30% easy, 50% moderate, 20% difficult.**
- Items map to the Philippine Professional Standards for Teachers (PPST).

## General Education: 10 areas, 15 items each

Every area carries the same weight.

| Area | Items |
| --- | --- |
| Purposive Communication (English) | 15 |
| Malayuning Komunikasyon (Filipino) | 15 |
| Readings in Philippine History and Society | 15 |
| The Life and Works of Rizal | 15 |
| The Contemporary World | 15 |
| Art Appreciation | 15 |
| Science and Technology | 15 |
| Mathematics | 15 |
| Ethics | 15 |
| Understanding the Self | 15 |

## Culture and Arts Education: the five specialization areas

From the PRC CAE table of specifications, in TOS order:

1. Disciplinal Knowledge
2. Pedagogical Practice
3. Competency and Proficiency in the Creative Expressions
4. Professional Accountability and Responsibility
5. Research and Extension

## Exam-day difficulty mix

PRC's own TOS sets the difficulty mix at roughly **30% easy, 50% moderate and 20%
difficult**. The app's mock papers should mirror that rather than an even spread.

Situational items dominate the difficult band: a scenario or a definitional
vignette, then the actual question as the final sentence, with the discriminating
detail buried mid-choice rather than at the start of each option.

## How the app uses this

- `src/exam/index.ts` — the subtest table, the passing rule, the rating projection.
- Mock exam presets are sized and timed from the table above.
- The readiness indicator reports the **weakest subtest** alongside the average,
  because that is the condition that fails people.
