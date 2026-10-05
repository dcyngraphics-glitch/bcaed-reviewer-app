# Blocked — needs a backend

Everything in the plan that **cannot** be built without a server. Recorded here so
it is not lost and not silently faked.

**Status:** none of these are started. All are waiting on one decision: which
backend.

---

## Why they are blocked

Each item below needs state that outlives a browser, or needs to be trusted by
someone other than the student. A local-only app cannot provide either.

| # | Feature | Plan stage | What it needs |
| --- | --- | --- | --- |
| 1 | Google sign-in | 1 | OAuth client + a server to verify the token |
| 2 | Student accounts + registration form | 1 | A user store |
| 3 | Admin approval / rejection of students | 1 | A user store + a role model |
| 4 | Only approved students can use the reviewer | 1 | Server-side authorisation (a client-side gate is trivially bypassed) |
| 5 | Question management (add / edit / archive) | 2 | A database; today the bank is source files |
| 6 | Subject / topic / lesson management | 2 | Same |
| 7 | Mock exam management | 2 | Same |
| 8 | Badge management | 2 | Same |
| 9 | Reviewer upload → extract → create questions | 8 | File storage + an extraction pipeline |
| 10 | AI-draft review / approval workflow | 8 | Somewhere to write `status: 'pending'` rows |
| 11 | Cohort + per-student admin analytics | 6 | Server-side aggregation |
| 12 | Cloud sync of offline activity | 7 | Somewhere to sync to |
| 13 | Longitudinal history (month over month) | 6 | Accumulated history beyond one device |

---

## What already exists on the client side

The work that *could* be done without a backend is done, so these are seams
rather than blank pages:

- **The `pending` gate is enforced in the engine.** `eligible()` in
  `src/engine/selection.ts` filters to `status === 'approved'`, so an
  AI-drafted question cannot reach practice or an exam. Nothing writes pending
  rows yet — that is item 10.
- **`src/pages/auth/Login.tsx`** is the single seam for real authentication.
  It currently captures a display name and sets a local flag. It says on the
  page that it is not a real sign-in.
- **`src/hooks/useContent.ts`** is the single seam for remote content. Every
  page reads the bank through it; swapping bundled data for fetched data is a
  change in this one file.
- **`src/storage/studentStore.ts`** is versioned and tolerates corrupt or
  missing data, so a sync layer can be added around it without a migration
  crisis.
- **Progress is private by design** — stored on the device, no leaderboard
  anywhere. That requirement is already met and does not need a server.

---

## Recommendation

**Supabase** (Postgres + Auth + Storage), which is what the original build plan
suggested:

- Google sign-in is built in.
- Row-level security gives the "only approved students can read the bank" rule
  server-side, and keeps one student's progress invisible to another.
- Storage covers the reviewer upload in item 9.
- A single dependency covers items 1–8 and 11–13.

**Suggested order:** 1–4 first (accounts and approval), because they gate
everything else. Then 5–8 (content management), then 9–10 (the upload and
review workflow), then 11–13 (analytics and sync).

---

## Not blocked — done

For contrast, so this file is not mistaken for a to-do list of everything
outstanding:

- The 12-week program, all three phases and the weekly schedule
- Practice, timed challenge, weekly assessment and mock exam modes
- Results, explanations, mistake review and "practice my mistakes"
- XP, streaks, the 12 badges, achievements
- Progress: readiness, subject and topic mastery, trend over time
- The real passing rule (average ≥ 75 **and** no subtest below 50)
- The situational question format, including the mid-choice trick
- 135 original questions with cited sources
- PWA: manifest, icons, service worker, offline banner
- Diagnostic placement test
- Admin view of bank health and coverage gaps
