# BCAED Reviewer App — Implementation Status

**Last updated:** 2026-10-05
**Repo:** `Projects/bcaed-reviewer-app`
**Verification:** `tsc -p tsconfig.json --noEmit` clean, `vitest run` 243 passing, `vite build` clean.

**Reference:** `docs/LET-EXAM-FACTS.md` (the real exam, sourced) ·
`docs/BLOCKED-NEEDS-BACKEND.md` (what needs a server and why)

---

## How this project is organised

All work lives inside `Projects/bcaed-reviewer-app`. Nothing is written outside it.

```
src/
  types/content.ts        Subject -> Topic -> Lesson -> Question model
  data/curriculum.ts      PRC TOS subject/topic tree + lesson notes
  data/seedQuestions.ts   Original question bank, each with a cited source
  engine/                 Pure logic: selection, scoring, streaks, readiness
  program/                The 12-week Mon/Tue/Thu/Fri study program
  gamification/           The 12 badges and how they are earned
  storage/                Versioned localStorage profile
  context/                ProfileProvider — one source of truth per student
  components/             Design system, layout, session player, trend chart
  pages/                  One folder per screen
  routes/                 Flat route tree + auth guards
```

---

## Where the spec actually came from

The original build plan had 25 sections. The subject and topic structure is **not
invented** — it follows the real PRC Table of Specifications:

- **PRC–CHED Joint Memorandum Circular, 10 April 2025**, aligning the LEPT with
  CMO 82 s. 2017 (BCAEd). Effective from the September 2025 LEPT.
- **PRC Board for Professional Teachers Resolution No. 11 s. 2025** (LEPT TOS).
- Secondary weighting: **General Education 20%, Professional Education 40%,
  Specialization 40%**.
- The BCAEd specialization is **Culture and Arts Education**, with five areas:
  Disciplinal Knowledge, Pedagogical Practice, Competency and Proficiency in the
  Creative Expressions, Professional Accountability and Responsibility, and
  Research and Extension.
- ProfEd areas and their weights: Teaching Profession 15%, Curriculum/Methods/
  EdTech 30%, Child and Adolescent Learners 20%, Assessment of Learning 15%,
  Field Study and Internship 20%.

Every question in the bank is original and carries the reference it was checked
against. Nothing was copied from another reviewer.

---

## Done

### Foundation
- React 19 + TypeScript + Vite + Tailwind v4, strict mode, no `any`.
- Design system: Button, Card, Badge, ProgressRing, Avatar, Toast, all tested.
- Layout: Header (sign-out + a mobile navigation drawer), Sidebar (plan's
  student nav + live mistake count), Footer, MainLayout as a real layout route
  with `<Outlet />`.
- **Mobile navigation.** The sidebar is hidden below `md`, so the Header carries
  a drawer with every destination, Escape-to-close and auto-close on navigation.
  Without it the app had no navigation at all on the Android target the plan
  names.
- **Error boundary** on the session-bearing routes (practice, mock exams,
  diagnostic). It shows the error message, says progress is safe, and offers a
  retry — instead of the blank page this app produced twice.
- Git hygiene: `node_modules` untracked (was 7,412 committed files), `.gitignore`
  in place.

### Learning engine (`src/engine`, 57 tests)
- **Seeded selection** — same seed, same paper; a retry draws a fresh set. Only
  `status: 'approved'` questions are ever selectable, so the plan's rule that
  AI-drafted questions need admin review is enforced in code, not by convention.
- **Scoring** — correct/wrong/unanswered, integer accuracy, XP with a completion
  and perfect-score bonus, mistakes list, and per-topic / per-subject rollup.
- **Streaks** — counted over scheduled study days only (Mon/Tue/Thu/Fri). A
  Wednesday or weekend off never breaks a streak; a missed scheduled day does.
  Today is forgiven until the day is over.
- **Mastery** — strong / developing / needs-review / not-enough-data. A topic is
  never judged on a single answer.
- **Readiness score** — weighted accuracy, coverage and best mock, for the
  "am I ready?" number.

### 12-week program (`src/program`, 20 tests)
- Three phases with a rising difficulty band: Foundation (1–4), Development
  (5–8), Examination Preparation (9–12).
- Full weekly plan: Monday lesson, Tuesday reinforcement, Wednesday rest,
  Thursday timed challenge, Friday assessment, weekend optional.
- `taskForDate()` answers the plan's central question — *"what should I study
  today?"* — with the question count, time limit and target difficulty.

### Gamification (`src/gamification`, 17 tests)
- All 12 badges the plan names, each evaluated as a pure function of the
  student's stats. Streak badges latch off the longest streak, so a badge is
  never revoked.
- No leaderboard anywhere. Progress is device-local.

### Content
- Subject → Topic → Lesson → Question model, admin-editable by design.
- 11 written lessons with key points.
- **135 original multiple-choice questions** spanning all three subjects, every
  TOS topic, and all five difficulty levels. A content-integrity test suite fails
  the build on a fifth option, a bad index, a subject/topic mismatch, a missing
  source or a missing explanation.
- **46 situational items** in the real exam's shape: a vignette, then the
  question as the final sentence, with the discriminating detail buried
  mid-choice so the opening cannot be pattern-matched. See
  `docs/LET-EXAM-FACTS.md`.

### Screens
- **Home** — week, phase, today's mission, accuracy, streak, XP/level, badges,
  recommendations, subject performance, recent sessions, phase timeline.
- **Review** — subject → topic → lesson library with collapsible key points.
- **Practice** — subject/topic/count picker, adaptive difficulty, answers and
  explanations revealed as you go.
- **Mock Exams** — four presets, timed, answers hidden, auto-submit on expiry,
  exam history.
- **My Mistakes** — every missed question grouped by topic, plus a practice
  session built from them. A question leaves the list once answered correctly.
- **Progress** — readiness ring, headline numbers, streaks, subject and topic
  mastery, recommendations, improvement-over-time chart, full session history.
- **Achievements** — the badge set with earned/locked state.
- **Diagnostic** — optional 20-question placement test that sets the starting
  difficulty.
- **Profile** — account, study schedule, data controls, sign out.
- **Admin** — question bank health: approved/pending counts, difficulty spread,
  coverage gaps, full topic table.

### PWA
- `manifest.webmanifest` — standalone, theme colour, maskable icon, shortcuts
  straight into Practice / Mock exams / My Mistakes.
- Icons generated from the brand colour; verified by decoding the pixels back.
- `sw.js` — network-first navigations with a cached shell fallback, cache-first
  hashed assets, stale-while-revalidate for the rest.
- Registered only in a production build so dev HMR is never poisoned.
- `OfflineBanner` tells the student their progress is safe without a connection.

---

## Not done — needs a backend

These are listed so nothing looks finished when it is not. Full detail, including
what each one needs and the recommended order, is in
`docs/BLOCKED-NEEDS-BACKEND.md`.

| Feature | Why it is blocked |
| --- | --- |
| Google sign-in | Needs an OAuth client and a server to verify tokens |
| Student accounts, pending approval | Needs a user store and an admin role |
| Admin CRUD on questions/topics/lessons | Needs a database; today the bank is a source file |
| Reviewer upload → extract → create questions | Needs file storage and the extraction pipeline |
| AI-draft review workflow | The `status: 'pending'` gate exists and is enforced, but nothing writes pending rows yet |
| Cohort and per-student analytics | Needs a server-side store |
| Cloud sync of offline activity | The local-first store is in place; there is nowhere to sync to |

**Suggested next step:** Supabase (Postgres + Auth + Storage) fits the plan's own
recommendation and covers Google login, approval, the question bank and sync in
one dependency. `src/hooks/useContent.ts` is the single seam where bundled
content would be swapped for fetched content, and `src/pages/auth/Login.tsx` is
the single seam for real authentication.

---

## Known limitations

- **Test interaction quirks.** Two happy-dom behaviours fail silently and are
  both worked around in `src/test/interact.ts`: `userEvent.type` drops
  characters on controlled inputs (use `typeInto`), and native
  `element.click()` never reaches a React `onClick` (use `clickElement`).
  A test that clicks via `.click()` can pass while asserting nothing.
- **Bundle size.** One 528 kB chunk (161 kB gzipped). Fine for a PWA on a
  decent connection; code-splitting the admin and mock-exam routes is the easy
  win when it matters.
- **Topic coverage is uneven.** Some topics have two questions, some six. The
  admin page flags every topic below three so the gap is visible rather than
  hidden.
- **Coverage on the progress page is topic-reach, not question-reach**, because
  sessions store per-topic counts rather than every question id.
- **The error boundary does not catch event-handler or async errors.** React
  boundaries only catch render-time throws; a failure inside an `onClick` or a
  promise still needs its own handling.

---

## Commands

```bash
npm run dev        # dev server on :5173
npm run build      # production build
npm run preview    # serve the built output
npm test           # vitest run
npm run typecheck  # tsc --noEmit on both configs
```
