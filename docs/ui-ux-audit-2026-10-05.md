# UI/UX Audit — BCAED Reviewer

**Date:** 2026-10-05
**Subject:** `Projects/bcaed-reviewer-app` — LET review app, BCAEd (Culture and Arts Education)
**Stack:** React 19 · TypeScript · Vite 8 · react-router-dom 7 · Tailwind v4 · framer-motion 14 · Vitest 5
**Method:** live headless-Chrome measurement (12 routes × 3 viewports), real keyboard input, driven study loop, production bundle inspection, plus three parallel code audits (design tokens, core study loop, responsive/performance/motion) whose findings were re-verified before inclusion.

**No files were edited.** This is the audit only.

> **Revision note.** This report was first written from my own measurements, then extended after three subagent audits returned. Several subagent findings contradicted my numbers; each was re-measured before inclusion and the corrections are marked. Two of my original claims were wrong and are corrected below.

---

## Executive summary

This is a well-structured app built by someone who knows the exam it prepares for. The information architecture is clean, the empty states are genuinely written, and the question-authoring discipline is excellent. Ten defects are serious enough to ship-block, and four of them misreport the student's own performance — which for an exam-readiness tool is the more serious class of bug. The rest is polish.

**Overall score: 2.9 / 5** (12 criteria, evidence below). Revised down from 3.1 after the code audits surfaced data-integrity defects I had not found.

| # | Criterion | Score |
|---|---|---|
| 1 | AI collaboration readiness | N/A — no AI feature in product |
| 2 | Calm interface | 4 / 5 |
| 3 | Accessibility (WCAG 2.2 AA) | 2 / 5 |
| 4 | Mobile-first + thumb zone | 3 / 5 |
| 5 | Functional micro-interactions | 2 / 5 |
| 6 | Trust & transparency | 4 / 5 |
| 7 | Design system consistency | 2 / 5 |
| 8 | Conversion friction | 3 / 5 |
| 9 | Dark mode & theming | 1 / 5 |
| 10 | Multimodal ready | 2 / 5 |
| 11 | Liquid / generative layouts | 2 / 5 |
| 12 | Developer handoff quality | 3 / 5 |

Criterion 1 is not scored: the product contains no AI feature, and scoring "AI collaboration readiness" on an app that has none would be theatre. It becomes scoreable only if an AI feature is added, at which point the trust surface is already strong (see §6).

**Headline:** four defects misreport a student's own performance — the mock-exam results bug (B1), fabricated study time (B4), unanswered questions counted as attempted (B5), and coverage that isn't coverage (B6). For an app whose entire value is an accurate picture of exam readiness, these are worse than the visual and accessibility issues, which are serious but merely degrading.

---

## Ship blockers

### B1 — Mock exam results claim a perfect score on a failed paper (CRITICAL)

Reproduced live. Sat a 60-item mock, answered 6 questions (all wrong), submitted. The results screen reported:

```
Session complete · Review this topic
Correct 0   Wrong 6   Unanswered 54   XP earned +100
[topic breakdown showing 0/6, 0/5, 0/6, 0/1 … all 0%]
"Every answer was correct. Nothing to review."
```

The header numbers are right. The review section is a lie, and it appears *below* a topic breakdown that visibly shows every topic at 0%.

Cause — `MockExamsPage.tsx:107-108`:

```ts
const questions = useMemo(() => {
  if (stage !== 'running' || !active) return [];
  return buildMockExam({ … });
}, [stage, active, seed, questionsFor]);
```

Results render at `stage === 'results'` (`MockExamsPage.tsx:238`), so `questions` is `[]` by then. `SessionResults.tsx:53-59` builds `byId` from that empty array and filters every mistake out via `.filter(entry => Boolean(entry.question))`. `toReview` is empty, so the `:else` branch at `SessionResults.tsx:230-236` prints the false "Every answer was correct."

**Same bug, three pages.** All three use the identical guard-then-render-at-a-different-stage shape:

| Page | Guard | Results render |
|---|---|---|
| `MockExamsPage.tsx:107` | `if (stage !== 'running') return []` | `:238` |
| `MistakesPage.tsx:53-54` | `if (stage !== 'running') return []` | `:102` |
| `DiagnosticPage.tsx:33-34` | `if (stage !== 'running') return []` | — |

`PracticePage.tsx:229` is the only correct one — its `useMemo` guard is `if (stage === 'setup') return []`, which still holds the paper at results time. That asymmetry is exactly why this survived testing.

**Impact beyond the wrong label:** "Practice these mistakes" is gated on `toReview.length > 0` (`SessionResults.tsx:248`), so the button that routes a student to their mistakes is *also* silently missing on those three pages. The mock exam's entire post-exam value — learn from what you got wrong — is unavailable.

**Fix:** capture the paper into state at `start()`, or change the guard to hold the paper when `stage !== 'setup'`. One-line change per page.

### B2 — No visible focus indicator on the primary button (CRITICAL, WCAG 2.4.7)

Verified with real Tab keypresses (`Input.dispatchKeyEvent`), not programmatic focus. Every element reaches `:focus-visible`, but:

```
Button 'Start session'  focusVisible=true  ring=oklch(0.55 0.18 250) 0px 0px 0px 4px
Button 'Sign out'       focusVisible=true  ring=oklch(0.55 0.18 250) 0px 0px 0px 4px
A 'Home'                focusVisible=true  outline=auto/1px           ← visible
```

The ring colour is `--color-ring: oklch(0.55 0.18 250)` — the *same* value as `--color-primary-600` (`index.css:12,20`). So on a `bg-primary-600` button, a 4px ring in `#0072d5` sits on a `#0072d5` background:

```
ring vs primary-600 bg: 1.00
ring vs white:          4.81
```

The ring is painted; it is invisible. Every primary CTA in the app — Start session, Start practice, Start exam, Next, Finish, Done, Submit now — is unlocatable by keyboard. `Button.tsx:27` sets `focus-visible:ring-2 focus-visible:ring-ring`, and `index.css:20` defines `--color-ring` as a copy of `primary-600` rather than a focus-specific colour.

WCAG 2.4.7 Focus Visible (AA) and 2.4.11 Focus Not Obscured are the relevant criteria.

**Fix:** one token. `--color-ring` should be a focus colour that clears 3:1 against *both* `primary-600` and white — `oklch(0.25 0.16 250)` (`#001769`) gives 3.29 against the button and 15.83 against white. Same one-line class of change as the contrast fix below.

### B3 — Three primary-colour text pairings fail AA (HIGH)

Measured with a canvas-based sRGB resolve — Tailwind v4 emits `oklch()` strings, so regex-parsing the computed style gives garbage. These are real numbers from a rendered page:

| Pair | Ratio | Needed | Where |
|---|---|---|---|
| `primary-500` on white | **3.65** | 4.5 | `Badge.tsx:14` outline variant — 111 occurrences across 26 of 30 page renders. Mock-exam stat chips ("60 items", "84 minutes"), difficulty labels, subject chips, achievement tiers |
| `primary-50` on `primary-600` | **4.41** | 4.5 | `Button.tsx:34` — the label on every primary CTA, 48 occurrences |
| `gray-500` on `primary-50` | **4.44** | 4.5 | Field labels on the tinted Home card ("Weeks") |

| `secondary-600` on `secondary-50` | **3.44** | 4.5 | `Button.tsx:37` — the `secondary` variant; fails even the 3:1 large-text bar |
| `success` variant `green-600` on `green-50` | **3.37** | 4.5 | `Button.tsx:38` — fails AA at every size |
| Toast warning variant | **2.77** | 4.5 | `Toast.tsx:32-38` — worst pair in the app |
| `gray-400` on `gray-50` page bg | **2.49** | 4.5 | `ReviewPage.tsx:88`, `ProgressPage.tsx:314`, `AdminPage.tsx:193` |

The first row is the design system working against itself: `--color-primary-500: oklch(0.62 0.16 250)` (`index.css:11`) is too light to be text on white, yet `Badge.tsx:14` uses exactly that as its outline text colour.

A structural cause underlies the last four rows: every status colour pairs a `-600` background with the `-50` tint of the same hue. Tailwind's own scales pair `-600` with white. `success` and the toasts are all built on the wrong pairing, which is why they cluster at 2.77–3.44 rather than being scattered typos.

**Fixes, all one-token changes in `src/index.css`:**

| Change | Result |
|---|---|
| `--color-primary-500: oklch(0.62 0.16 250)` → `oklch(0.48 0.16 250)` | 6.36 on white, 5.84 on `primary-50` — clears AA in both contexts it actually appears in |
| primary button label `primary-50` → `text-white` (`Button.tsx:31,34`) | 4.81 on `primary-600` |
| `--color-gray-*` 500 stop one step darker | fixes the 4.44 |

Moving `primary-500` to `oklch(0.48 …)` keeps it perceptually the same hue and chroma — it reads as the same brand blue, one step deeper. This is the highest-impact single edit in the whole audit.

### B4 — "Study time" is fabricated (HIGH, data integrity)

`MockExamsPage.tsx:131` records `durationSeconds: active.minutes * 60` — the time *limit*, not the elapsed time. `SessionPlayer` knows the real elapsed value (`:44`) but never passes it out through `onFinish` (`:19`, `:74-84`).

Worse, practice, mistakes and diagnostic pass **no** `durationSeconds` at all (`PracticePage.tsx:63-67`, `MistakesPage.tsx:63-67`, `DiagnosticPage.tsx:47-51`). So `totalStudySeconds` (`studentStore.ts:188`) counts mocks only, and always at the maximum. A student who submits an 84-minute paper after 12 minutes shows 1h 24m on the Progress page and in session history.

### B5 — Unanswered questions count as "attempted", and that drives mastery (HIGH, data integrity)

`scoring.ts:65-70` increments `attempted` for every answer record including `chosenIndex === null`:

```ts
for (const answer of answers) {
  const bucket = buckets.get(key) ?? { attempted: 0, correct: 0 };
  bucket.attempted += 1;                    // ← counts skipped items
  if (answer.chosenIndex === answer.correctIndex) bucket.correct += 1;
```

`attempted` feeds `classifyMastery` (`engine/progress.ts:126-136`) — the 3-attempt threshold and the "Needs review" bucket — and it is the denominator in the "Performance by topic" label (`SessionResults.tsx:149`). Skipping every question in a topic still registers that topic as attempted and pushes it out of "Not enough data" into a judged verdict. A student who ran out of time on the last 40 items accrues mastery credit for all of them.

### B6 — "Coverage" is not coverage, and it feeds the headline readiness number (HIGH, data integrity)

`ProgressPage.tsx:33-44` computes coverage as *topics with ≥1 attempt ÷ total topics* — the code comment admits the approximation — then labels it `Coverage` at `:87-88` under descriptive text claiming it shows "how much of the bank you have covered" (`:77`). One question in a topic marks the entire topic covered.

That number carries 25–30% weight in `readinessScore` (`engine/progress.ts:200`). And `readinessScore` is handed `stats.bestMockScore` as its `mockAverage` (`ProgressPage.tsx:42`) — a **best-of**, not an average, and `0` until the first mock. So a student with strong practice accuracy and no mocks yet sees LET readiness at 0%, which is the app's headline number on its most-visited page.

### B7 — "Practise this subject" discards the subject and forces a full page reload (MEDIUM)

`ReviewPage.tsx:141`:

```tsx
<Button variant="primary" onClick={() => window.location.assign('/practice')}>
  Practise this subject
</Button>
```

No subject is passed, and `window.location.assign` throws away the SPA — re-parsing the 531 KB bundle and dropping router history. Should be `<Link to={`/practice?subject=${subjectId}`}>`.

Related and confirmed by live test: **the `?subject`/`?topic` presets don't apply on in-app navigation.** `PracticePage.tsx:26-31` reads the params into `useState` initialisers only, with no effect on param change. Reproduced:

```
/practice                          → selects: All subjects, All topics
pushState('/practice?subject=cae') → selects: All subjects, All topics   ← no-op
full load of same URL              → selects: Culture and Arts Education ← works
```

So "Drill this topic" from `MistakesPage.tsx:172` and `Home.tsx:158` silently does nothing when the student is already on `/practice`. On mobile the shortcut card sits below the fold, so nothing appears to happen at all.

### B8 — Diagnostic copy contradicts the code, twice (MEDIUM)

- `DiagnosticPage.tsx:78` promises *"a later score will not lower your level."* But `studentStore.ts:189` applies `nextTargetDifficulty` for every mode, and `selection.ts:201-202` **decreases** the target when desired < current.
- `DiagnosticPage.tsx:59` and `:115-117` display `accuracyToDifficulty(result.accuracy)` — a direct 1–5 mapping (`selection.ts:186-192`) — as "Your practice sessions will now aim at difficulty N of 5." But `selection.ts:200-203` moves the target at most **one rung** per session. A first diagnostic scoring 95% displays "5" while the profile is actually at 2. The copy should report `profile.targetDifficulty`.

### B9 — Exam-grade state is thrown away without confirmation (HIGH)

`SessionPlayer.tsx:168-172` renders one `size="sm"` **Exit** button wired to a bare `setStage('setup')` (`PracticePage.tsx:221`, `MockExamsPage.tsx:234`). All answers, the seed and the paper are discarded with no dirty-state check, and there is no `beforeunload` guard during a live timed exam. A 30-item paper is lost to one tap. `Submit now` and `Finish` are likewise irreversible and unconfirmed — and the "N questions still unanswered" warning renders *below* the control the student just pressed (`SessionPlayer.tsx:302-307`).

### B10 — Irreversible "Clear my progress" is under-protected (MEDIUM)

`ProfilePage.tsx:106` — the button swaps to a Yes/Cancel pair with no dialog semantics (`role="dialog"` absent, no `aria-modal`), no focus move to the confirmation, and no warning that this destroys the streak, the badges and the mistake history. For an app whose value is 12 weeks of accumulated history, this is the one place a real confirmation matters.

Also on this page: `Toast.tsx` and `Avatar.tsx` are imported by nothing outside themselves, and `recentBadges` (`ProfileContext.tsx:29,68,108,115`) is written but read by no component. `DashboardLayout.tsx` and `AuthLayout.tsx` are referenced only by `__tests__/LayoutWrappers.test.tsx`. Confirmed dead — removing a mistake therefore gives no toast and no undo, because the toast system that would provide it is never rendered.

---

## Criterion detail

### 3 · Accessibility — 2/5

**Passing, genuinely:** every control has an accessible name (0 unnamed controls across 30 renders). Landmarks are correct and consistent — exactly one `main`, `nav`, `header`, `footer`, `aside` on every protected page. `aria-pressed` on answer options, `aria-expanded`/`aria-controls` on the drawer toggle, `role="group"` + `aria-label` on the answer set, `role="progressbar"` with `aria-valuenow/min/max` on `ProgressRing.tsx:55-59`, `role="img"` + descriptive `aria-label` on the trend chart, `role="status"` on the offline banner, `role="alert"` on the login error. No `img` without `alt`. Every `<button>` has an explicit `type`. Focus rings exist on links (UA `outline: auto`). Zero console errors across all runs.

**Failing:**
- B2 above — no visible focus ring on any primary button.
- B3 above — three AA contrast failures, 163 measured instances.
- **No skip link.** `skipLink: false` on all 30 renders. A keyboard user traverses 11 sidebar links on every single page change before reaching content. WCAG 2.4.1 Bypass Blocks.
- **Answer options are 4 tab stops, not 1.** `SessionPlayer.tsx:233-242` renders options as plain `<button aria-pressed>` inside `role="group"`. Measured tab order in the player: `Open navigation → Sign out → Exit → A → B → C → D → Previous → Next`. A `role="radiogroup"` with `role="radio"` children, or roving tabindex, would make it one stop with arrow-key selection — the pattern the exam format already implies. Also no A/B/C/D or 1–4 hotkeys, no Enter-to-advance.
- **Focus is never moved on question or stage change.** `next()` (`SessionPlayer.tsx:113-119`) changes the question silently; focus stays on the Next button. After Finish, the button unmounts and focus falls to `<body>`. `<main>` (`MainLayout.tsx:20`) has no `id`/`tabIndex={-1}`, so there is no recovery target. WCAG 2.4.3 Focus Order.
- **The progress bar in the session player is not a progressbar.** `SessionPlayer.tsx:184-189` is a plain `div` with an inline `width` style — no `role`, no `aria-valuenow`. A screen reader user gets no position in a 60-question timed exam. The correct pattern already exists in `ProgressRing.tsx`.
- **The timer announces every second.** `aria-live="polite"` on `SessionPlayer.tsx:161` re-fires up to 36 minutes for an 84-minute paper. Screen-reader users get an uninterrupted stream of numbers. Should be `aria-live="off"` with announcements only at thresholds (5 min, 1 min).

### 4 · Mobile-first + thumb zone — 3/5

Correctly mobile-first: no horizontal scroll at 375px on any of 12 routes. The drawer works — verified with real touch events (`aria-expanded` false→true, 10 links at 40px each, Escape closes it, navigation closes it). Bottom-of-screen controls in the session player are in reach.

**42 distinct controls measure under 44×44**, though only **one** falls under the WCAG 2.2 AA minimum of 24×24 (2.5.8): the `View all` link at **47×20px** (`Home.tsx` achievements card). That is a genuine AA failure — a 20px-tall target on the primary mobile screen.

The 41 others are 36–40px — they pass AA, miss AAA and the 44px convention Android and iOS both use. Representative: `md` height on all Buttons (`Button.tsx:43`), 38×38 hamburger (`Header.tsx:57`), 277×39 selects (`PracticePage.tsx:100,119`), 38px count chips (`PracticePage` 10/15/20/30), 40px drawer links.

Worth noting the inconsistency: `Header.tsx:102` gives active drawer links `py-2.5` → 40px, while the desktop sidebar (`Sidebar.tsx`) uses a different vertical rhythm for the same destinations. Same nav, two sizes.

### 7 · Design system consistency — 2/5

**Sound:** zero hex, `rgb()`, or arbitrary colour values in any `.tsx`/`.ts` file — all colour flows through the `@theme` tokens or Tailwind's own scales. No inline `<style>` blocks. Verified against the production CSS.

**Weak:**
- The token layer is 12 colour variables in one `@theme` block (`index.css:8-21`). No primitive → semantic → component chain, no spacing/radius/shadow/motion tokens, no `--default-*` overrides. Everything else is Tailwind defaults. Semantic naming like `color.bg.primary` doesn't exist; components reference `bg-primary-600` directly.
- **The brand colour is specified twice and the two disagree.** `index.html:15` and `public/manifest.webmanifest` both declare `#2563eb` — that is Tailwind **v3** `blue-600`. The app's `primary-600` is `oklch(0.55 0.18 250)` = `#0072d5`. The browser chrome, the installed PWA icon, and the address bar are a different blue from every button in the app.
- `TrendChart.tsx:9-14` hardcodes a 4-colour chart palette (`primary-500`, `purple-500`, `amber-500`, `teal-500`). Three of the four are unrelated to `primary`/`secondary` and exist nowhere in the token system.
- No `primary-200`, `primary-300`, `primary-400`, or `primary-900` is declared, yet `SessionPlayer.tsx:229` uses `bg-primary-50 text-primary-900` and `:240` uses `hover:border-primary-400`. Those classes resolve to **nothing**. The picked-answer state and the option hover state are silently unstyled — a real defect, not just untidiness.

### 9 · Dark mode & theming — 1/5

There is no dark mode. `matchMedia('(prefers-color-scheme: dark)')` returns **true** on this machine and the app renders identically light — zero `dark:` variants, no `.dark` class, no `[data-theme]` selector, no toggle. On a phone set to dark, a study app used at night is a white slab at full brightness.

The OS `prefers-color-scheme` is reported as honoured only because the app simply never responds to it.

### 5 · Micro-interactions — 2/5

Motion is purposeful and restrained: 12–15 animated elements per page, only two durations (`0.15s`, `0.5s`), a `transition-all duration-300` progress bar, `AnimatePresence` on the practice feedback panel. Nothing gratuitous. `OfflineBanner.tsx:29` returns `null` when online with no enter animation — on a flaky PH mobile connection the banner pops in and out, shifting ~40px each time.

**No `prefers-reduced-motion` support anywhere.** No `@media` block in `index.css` (21 lines total), no `useReducedMotion()` call. The only hit for the string is a *test mock* (`src/test/setup.ts:55` stubs it to `false`). All 22 `motion.*` call sites run unconditionally — including the page-level `initial={{ opacity: 0, y: 16 }}` entrance on `SessionResults.tsx:62-65`, which for a motion-sensitive user reads as the content failing to appear.

Also: `ProgressRing.tsx:52` is a `motion.div` with no motion props.

### 2 · Calm interface — 4/5

Genuinely calm. Muted palette, generous whitespace, one primary action per view, no decoration. Type scale is disciplined: 12/14/16/18/20/24 — six steps, no arbitrary sizes. Body text is 16px. Hierarchy is clear without being loud.

Minor: no custom typeface. `font-family` resolves to `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto…` — the system stack, zero web fonts loaded. For a study app read in long sessions this is a defensible choice (fast, native-feeling, no FOUT) but it means the app has no typographic identity of its own.

### 6 · Trust & transparency — 4/5

The best-scoring criterion, and by design rather than accident. The app is honest about its own limits in user-facing copy:

- Login: *"Not yet a real sign-in. Accounts, Google login and administrator approval need a backend, which is not built yet."*
- Profile: *"Progress is stored on this device only. Nobody else can see your scores or your progress."*
- Achievements: *"Progress is private to you — there is no leaderboard."*
- Progress: *"Treat it as a trend, not a verdict."*
- Mock exams: the exam-rules card states plainly that unanswered items are marked wrong and the paper self-submits at zero.

No dark patterns, no fake urgency, no manipulative streaks — and the schedule page explicitly tells students Wednesday is a rest day and *"Rest days never break a streak."*

**Weak:** irreversible actions are under-protected. `ProfilePage.tsx:106` — "Clear my progress" is an inline `outline` button that swaps to a Yes/Cancel pair, with no dialog semantics (`role="dialog"` absent, no `aria-modal`), no focus move to the confirmation, and no mention that this destroys the streak, the badges, and the mistake history. For an app whose entire value is 12 weeks of accumulated history, that is the one place where a real confirmation step matters.

### 8 · Conversion friction — 3/5

Load is fast: FCP 1564ms with a **4× CPU throttle**, DOMContentLoaded 878ms, 0 long tasks, 19MB heap. No layout shift observed.

Weaknesses: `/practice` setup puts two `<select>` elements plus a 4-chip count selector plus two CTAs above the fold on mobile — a five-step decision before the first question. The topic shortcut cards sit *below* the fold, so tapping one on mobile produces no visible change until the student scrolls.

`DiagnosticPage` offers "Skip for now" alongside "Start diagnostic" — honest, but the skip is the same visual weight as starting.

### 10 · Multimodal ready — 2/5

Touch-first, and touch works. Beyond that: no keyboard shortcuts, no gesture support, no voice. The answer options are buttons, so a screen reader can traverse them — but as 4 separate stops rather than one radio group (see §3). No modality switcher, no fallback strategy because there's only one modality.

### 11 · Liquid / generative layouts — 2/5

Static, and appropriately so for an exam app. The Home stats row is a `grid-cols-2 lg:grid-cols-4` (`Home.tsx:100`) — a fixed bento, not an adaptive one. Nothing reshapes in response to behaviour. For this product that's a defensible choice, not a failure; scored low because the criterion measures capability that doesn't exist, not because it should.

### 12 · Developer handoff quality — 3/5

No `PRODUCT.md`, no `DESIGN.md`, no design tokens document, no Figma file. `STATUS.md` is genuinely good — architecture, provenance for the PRC/CHED TOS structure, a "needs a backend" table — and it is the closest thing to a handoff doc that exists.

Motion has no token table: durations and easings are hand-written per call site. Interaction specs don't exist in any form. Undeclared-token usage (`primary-900`, `primary-400` in `SessionPlayer.tsx`) means a developer following the component's intent would get different results than the running app.

---

## Performance detail

Bundle: **531 KB JS / 162 KB gzip, 30 KB CSS / 6 KB gzip — one chunk, no splitting.** Vite's own build warns about it.

`AppRoutes.tsx:4-15` statically imports all 11 pages, so the entire question bank ships before first paint. The three largest resources are data, not code:

| Resource | Transferred |
|---|---|
| `situationalQuestions.ts` | 263 KB |
| `seedQuestions.ts` | 127 KB |
| `additionalQuestions.ts` | 120 KB |

**510 KB of the 548 KB total transfer is the question bank**, parsed and held in memory on every page load including Home and Login. In dev these are separate modules; in the built bundle they are one JS file. `React.lazy` per route plus moving the bank behind a dynamic import would cut the initial payload by roughly 90%.

The app does not currently feel slow — 0 long tasks at 4× throttle is a good result — so this is a headroom problem on low-end Android hardware and over PH mobile data, not a present-tense failure.

---

## Top 12 fixes, ranked

| # | Fix | Impact | Effort | Why this order |
|---|---|---|---|---|
| 1 | **Fix the three results-screen bugs** (B1) — one line per page | Critical | ~15 min | A student is actively misinformed about their own exam result, and the mistakes-review path is dead on 3 of 4 session types. Nothing else matters until this is done. |
| 2 | **Stop counting unanswered as attempted** (B5) — `scoring.ts:65-70` | Critical | ~20 min | Mastery verdicts and "Performance by topic" are wrong for every student who skips questions. One guard clause. |
| 3 | **Thread real `elapsed` out of `SessionPlayer`** (B4) and drop `active.minutes * 60` | High | ~30 min | Study time is currently fabricated and over-reported. The value already exists in the component; it just isn't passed out. |
| 4 | **Fix `--color-ring`** (B2) — one token in `index.css:20` | Critical | ~5 min | Makes every primary CTA keyboard-visible. Highest ratio of relief to change in the entire audit. |
| 5 | **Darken `--color-primary-500`** (B3) | High | ~10 min | Clears 111 of the measured AA failures with a single value. Same hue, same chroma, one step deeper. |
| 6 | **White primary-button labels** (B3) | High | ~5 min | Clears the remaining ~48 on the app's most important controls. |
| 7 | **Fix coverage + readiness** (B6) | High | ~1 hr | Either compute real coverage or rename the label; stop feeding a best-of into an average slot. |
| 8 | **Confirm Exit / Submit / Finish** (B9) + `beforeunload` guard | High | ~1 hr | Prevents silent loss of a timed paper. |
| 9 | **Add a skip link + move focus on question change** | High | ~1 hr | Fixes 2.4.1 and 2.4.3 together, and is what a keyboard or screen-reader user hits first. |
| 10 | **Sync practice filters to URL params** (B7) + fix the Review CTA | Medium | ~30 min | "Drill this topic" is currently a silent no-op. Confirmed by live reproduction. |
| 11 | **Re-pair toasts / success / secondary against white** (B3) | Medium | ~20 min | Fixes a structural 2.77–3.44 cluster in one pass. |
| 12 | **Correct the diagnostic copy** (B8) | Medium | ~15 min | The page currently promises behaviour the code contradicts. |

Below those, in order: `prefers-reduced-motion` block, `bg-primary-50 text-primary-900` → declared tokens, dark mode, `role="radiogroup"` for answer options, route-level code splitting, manifest `theme-color` → `#0072d5`, 44px targets, progress-bar `role` + `aria-valuenow`, timer `aria-live` thresholds, safe-area insets, `min-h-dvh`, remove the dead `DashboardLayout`/`AuthLayout`/`Toast`/`Avatar`.

Two cheap wins worth calling out separately because they are pure deletions: `DashboardLayout.tsx` and `AuthLayout.tsx` contain the `max-w-7xl` wrapper that `MainLayout` needs for R1 below, and `Toast.tsx` is fully built but never rendered — wiring it up is how B10 and the silent-mistake-removal problem get their undo affordance for free.

---

## Corrected claims

Two things I reported in the first version of this audit were wrong, and one number was incomplete.

**Correction 1 — "buttons have no focus ring" was wrong.** My probe called `.focus()` programmatically, which does not trigger `:focus-visible` in Chrome, and then truncated the `box-shadow` string, so a fully-painted ring read as absent. Re-measured with real `Input.dispatchKeyEvent` Tab presses: the ring **is** painted on every button (`oklch(0.55 0.18 250) 0px 0px 0px 4px`).

The real defect, B2, is narrower and more interesting: `--color-ring` is byte-identical to `--color-primary-600`, so that painted ring sits on an identically-coloured button background at contrast **1.00** and is invisible. The ring exists and is useless.

**Correction 2 — the tokens are not all failing.** The token subagent reported `primary-600` on white as 10.9:1 and badge pairs at 5.4–11.5:1. Those were computed from the oklch values; my canvas-resolved measurements from the rendered page give 4.81:1 for `primary-600` on white and 3.65:1 for `primary-500` on white. I stand by the browser-measured numbers — they come from actual rendered pixels, whereas parsing oklch channels by hand skips the sRGB gamut-mapping step and overstates lightness. Where the two disagree, the browser wins.

**Correction 3 — the undeclared-token finding is broader than I reported.** I found `primary-900` and `primary-400` in `SessionPlayer.tsx`. The full set is 7 dead declarations across 5 files, because the scale is declared at 6 and 5 steps but code reaches for 200, 300, 400 and 900:

| Undefined | Sites |
|---|---|
| `border-primary-200` | `SessionResults.tsx:111`, `DiagnosticPage.tsx:112`, `Home.tsx:55` |
| `border-primary-400` | `SessionPlayer.tsx:229,240`, `PracticePage.tsx:195` |
| `text-primary-900` | `SessionPlayer.tsx:229` |
| `text-primary-200` | `Toast.tsx:81` |

Verified: `primary-200`, `primary-400`, `primary-900` appear **zero** times in the compiled CSS. The two hero-card borders on Home and Diagnostic are among them. The worst case is `SessionPlayer.tsx:229` — the *selected answer* state, where `text-primary-900` silently falls back to inherited `text-gray-900`, making a picked option's text indistinguishable from an unpicked one inside a tinted box. Selection state is the single most important affordance in an exam UI.

## Additional findings from the code audits

Beyond B4–B10, verified and worth recording:

- **Coverage approximation is documented in a comment** (`ProgressPage.tsx:36-38`: *"Sessions store counts, not ids, so approximate coverage by topic reach"*) and then presented to the student as a real metric. The honesty gap is in the label, not the logic.
- **Synchronous full-profile `JSON.stringify` on every state change**, undebounced (`ProfileContext.tsx:77-79` → `studentStore.ts:132`). Grows unbounded over 12 weeks, runs on the main thread.
- **Unbounded list rendering**: `MistakesPage.tsx:161-223` renders every mistake in full with prompt + both answers + explanation; `ProgressPage.tsx:280` the whole session history; `SessionResults.tsx:189-227` every wrong answer. A struggling student reaches 100+ items with no cap or virtualization.
- **O(N×M) filtering in render**: `useContent.ts:38-44` re-filters all questions per call, and `questionCountFor` is invoked inside `.map()` loops (`PracticePage.tsx:186`, `MockExamsPage.tsx:122`) — a full filter plus array allocation per topic, per render. Nothing memoises the results.
- **The 1 Hz timer re-renders the whole session player** (`SessionPlayer.tsx:88-96`) — 2160 full-tree renders across a 36-minute mock, re-mapping every option button each tick.
- **The offline claim is false on first load.** `sw.js:21-29` precaches only the shell and icons; `/assets/` is cache-first (`sw.js:79-92`), so the 531 KB JS is not cached until a *second* visit. A student who installs the PWA and immediately loses signal gets the shell with no JavaScript. Meanwhile `OfflineBanner.tsx:36-37` asserts "Lessons and questions you have already opened still work."
- **No safe-area insets anywhere** — `index.html:6` sets `viewport-fit=cover`, `manifest.webmanifest:7` sets `display: standalone`, and there are zero occurrences of `safe-area` or `env(safe-area-*)` in `src/`, `public/`, or `index.html`. On a notched device the `sticky` header (`Header.tsx:48`) renders under the status bar.
- **`min-h-screen` in 6 places** (`MainLayout.tsx:15`, `Login.tsx:51`, `NotFound.tsx:6`, `ErrorBoundary.tsx:44`, `AuthLayout.tsx:5`, `DashboardLayout.tsx:5`). On Android Chrome `100vh` exceeds the visible viewport by the URL-bar height, so the footer sits permanently below the fold.
- **Contradictory scroll model**: `MainLayout.tsx:15` (`min-h-screen flex flex-col`) → `:18` → `:20` (`overflow-y-auto`). The parent has no fixed height, so the inner scroller never becomes a scroll container — it is dead code that reads as intentional.
- **Main content is unconstrained while header and footer are not.** Verified by measurement: at 1920px, header and footer inner boxes stop at 1280px while page content runs to 1616px — a visible edge misalignment on every page at ≥lg. `DashboardLayout.tsx:6` already contains the correct `max-w-7xl` wrapper and is unused.
- **The practice feedback panel animates in and cuts out.** `SessionPlayer.tsx:263-280` — the `AnimatePresence` child has `initial`/`animate` but **no `exit`**, so removal is instantaneous while arrival takes ~0.3s. Confirmed at runtime: the panel carries `opacity: 1; transform: none` and no `exit` transition. It also has no `role="status"`, so the explanation — the entire learning value of practice mode — is invisible to screen readers.
- **`whileHover` on the mobile target**: `Home.tsx:54` wraps the "Today's mission" card (which contains two buttons) in `whileHover={{ scale: 1.01 }}`. `whileHover` cannot fire on touch, so on the stated Philippine-Android target it is dead motion budget that also shifts hit targets mid-gesture.
- **Four durations, no easing, no tokens**: `0.4s` ×3, `0.5s` ×2, `0.8s`, plus CSS `300ms`. The three bare `{ duration: 0.4 }` objects specify no easing, so page entrances inherit framer's default `easeInOut` where deceleration is correct. No `spring` anywhere despite framer-motion being a dependency.
- **12 concurrent entrance animations on Achievements** (`AchievementsPage.tsx:43-47`) — the stagger itself is well-tuned, but 12 simultaneous opacity+transform animations exceeds what a mid-range Android handles gracefully.
- **`TrendChart` line draws over pre-placed markers** (`TrendChart.tsx:115-132`): `pathLength` animates 0→1 over 0.8s while the `<circle>` markers render at full size at t=0, so the line visibly grows *into* existing dots. Tooltips are SVG `<title>` — hover-only, no keyboard path, `r={4}` touch targets. "Improvement over time" is blank for 800ms on every visit.
- **Chart colours fail non-text contrast**: `fill-amber-500` 2.15:1 and `fill-teal-500` 2.49:1 against white, below the 3:1 SC 1.4.11 bar; `fill-gray-400` axis labels 2.54:1 at 11px.
- **Verdict text and ring colour disagree at 40–59%**: `SessionResults.tsx:31` grades that band "Needs work" in `text-amber-700`, while `:74` paints the ring red below 50. Same card, adjacent elements, opposite signals.
- **The 0% readiness ring renders no number.** `ProgressRing.tsx:88` gates the label on `percent > 0` while `aria-label` still says "0%" — a blank circle with a number only in the accessibility tree, on a student's first visit.
- **"Counts toward your streak" is not always true.** `Home.tsx:73` attaches the badge to `task.required`, but `updateStreak` (`studentStore.ts:226-233`) is purely date-based — any session on a scheduled day counts.
- **Today's Mission discards its own parameters.** `Home.tsx:64-77` shows `task.questionCount` and `task.timeLimitMinutes`, then `:28-33` sends the student to `/mock-exams` to pick a preset from scratch.
- **Sessions between midnight and 08:00 Manila are filed under the previous day.** Five call sites use `new Date().toISOString().slice(0,10)` (UTC) — `PracticePage.tsx:15`, `MockExamsPage.tsx:16`, `MistakesPage.tsx:15`, `DiagnosticPage.tsx:13`, `ProfileContext.tsx:42` — while `engine/progress.ts:11-15` deliberately parses *local* midnight. Streaks and program week are computed from these mixed keys.
- **Silent count downgrade**: `PracticePage.tsx:48` does `Math.min(count, available)`, so choosing 30 with 12 available silently runs a 12-question session; the only signal is a badge the student must cross-reference by hand.
- **Dead dependencies**: `autoprefixer` and `postcss` are devDependencies with no `postcss.config.*` or `tailwind.config.*` anywhere — Tailwind v4 runs through the Vite plugin.

## What is genuinely good

Not everything here needs fixing, and the following should survive any redesign:

- **Question authoring.** Situational vignettes with the question as the final sentence, four options opening with identical words so the discriminator sits mid-sentence, every item carrying its own reference. Distractor logic is real — "true but irrelevant" plus "plausible half-answer for skimmers."
- **Empty states.** *"You have not missed a question yet. Take a practice session and any mistakes will collect here."* Every empty state on every page is written, not templated.
- **Error handling.** `ErrorBoundary` on all four session-bearing routes, `session-player` index clamping (`SessionPlayer.tsx:56`), double-submit guard (`submittedRef`), wall-clock timer that survives tab backgrounding, localStorage writes wrapped in try/catch throughout.
- **Seed-determinism.** Practice retries draw a fresh paper via a re-seeded `useMemo`; exam composition is reproducible from a seed.
- **Colour discipline.** Zero hex, `rgb()`, or arbitrary colour values in any `.tsx`/`.ts` file across 47 source files. Every colour comes through `@theme` tokens or Tailwind's own scales. No inline `<style>` blocks. The 11 inline `style` attributes that exist are all `width: ${percent}%` progress fills and SVG geometry — correct use for runtime-computed values.
- **Non-colour redundancy in answer feedback.** Correct/incorrect is carried by the words "Correct" / "Your answer" (`SessionPlayer.tsx:252-257`), not by colour alone — which is exactly why B3's failures are repairable without redesign.
- **Timer maths is clean and isolated** (`timer.ts:7-29`), wall-clock based, with escalation thresholds readable in the token itself.
- **Honest about being unfinished.** Login says the backend does not exist; Profile says data is device-local; the schedule page says rest days never break a streak.
- **Test suite.** 182 tests passing, `tsc` clean, `vite build` clean.

---

## Verification notes

Measured, not assumed:

- Contrast via canvas `getImageData` sRGB resolve (Tailwind v4 emits `oklch()`, which regex-parsing misreads — my first pass produced false failures and was discarded).
- Focus via real `Input.dispatchKeyEvent` Tab presses. My first pass used programmatic `.focus()`, which does not trigger `:focus-visible` in Chrome, and also truncated the `box-shadow` string, producing a false "no focus ring anywhere" reading. Both were re-measured before reporting.
- Drawer behaviour via real `Input.dispatchMouseEvent` — a synthetic `.click()` did not toggle it, so the first result was also discarded.
- 12 routes × 375/768/1440, plus the driven study loop (practice → answer → feedback, mock exam → 6 wrong answers → submit).
- `vision_analyze` was unavailable (Solar Pro 4 free period ended), so no findings rest on visual impression. Screenshots are at `AppData\Local/Temp/bcaed-audit/shots/`.

**Unverified:** no physical Android or iOS device was used. Touch-target measurements come from a headless Chrome with touch emulation at 375×812. Real-device results may differ.

**Disagreement between sources:** where a subagent's hand-computed oklch contrast conflicted with my browser-measured value, the browser value is reported and the conflict is recorded in *Corrected claims*. Hand-parsing oklch skips sRGB gamut mapping and overstates lightness.
