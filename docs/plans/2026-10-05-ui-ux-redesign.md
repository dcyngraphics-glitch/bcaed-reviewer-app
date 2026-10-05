# BCAEd Reviewer App — UI/UX Redesign

> **For implementer:** Use TDD throughout. Write failing test first. Watch it fail. Then implement.

**Goal:** Transform the app's UI/UX from a functional but inconsistent interface into a playful, gamified, Duolingo-inspired experience with a complete design token system, rich animations, and polished micro-interactions.

**Architecture:** Full rebuild of the design system and all components. New OKLCH color tokens, semantic tokens, spacing/typography/radii/shadow scales, and animation tokens. All components rebuilt on top of these tokens. Pages rebuilt with new components, page transitions, empty states, and loading skeletons. Framer Motion for animations (already in stack).

**Tech Stack:** React 18, Vite, Tailwind CSS v4, Framer Motion, TypeScript, Vitest

---

## Design Direction

- **Style:** Playful & gamified, Duolingo-inspired
- **Animations:** Medium — noticeable on key actions (answering, completing, earning), page transitions, animated cards
- **Scope:** Visual + minor UX fixes from audit. No new features, no new pages, no backend changes.

---

## Design Token System

### Color Tokens (OKLCH)

All colors defined in `@theme` block in `src/index.css`. OKLCH format for perceptual uniformity.

```
--color-primary-50 through --color-primary-950    (blue)
--color-secondary-50 through --color-secondary-950 (teal)
--color-success-50 through --color-success-950    (green)
--color-warning-50 through --color-warning-950    (amber)
--color-error-50 through --color-error-950        (red)
--color-info-50 through --color-info-950          (blue)
--color-neutral-50 through --color-neutral-950    (gray)
```

### Semantic Tokens

```
--color-surface        → card backgrounds
--color-background     → page background
--color-text           → primary text
--color-text-secondary → secondary text
--color-text-muted     → disabled/hint text
--color-border         → dividers, borders
```

### Spacing Tokens

```
--spacing-xs: 0.25rem
--spacing-sm: 0.5rem
--spacing-md: 1rem
--spacing-lg: 1.5rem
--spacing-xl: 2rem
--spacing-2xl: 3rem
--spacing-3xl: 4rem
```

### Typography Tokens

```
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-2xl: 1.5rem
--text-3xl: 1.875rem
--text-4xl: 2.25rem
```

### Radius Tokens

```
--radius-sm: 0.25rem
--radius-md: 0.5rem
--radius-lg: 0.75rem
--radius-xl: 1rem
--radius-2xl: 1.5rem
--radius-full: 9999px
```

### Shadow Tokens

```
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1)
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1)
```

### Animation Tokens

```
--duration-fast: 150ms
--duration-normal: 300ms
--duration-slow: 500ms
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## Component Rebuilds

### Button
- 6 variants: default, primary, outline, destructive, secondary, success
- Loading state with spinner
- Focus-visible ring
- Spring hover/tap animation
- All colors from tokens

### Card
- 3 variants: default, elevated, outlined
- Hover lift animation
- Entrance animation (fade + slide up)
- All colors from tokens

### Badge
- 5 variants: default, success, warning, error, info
- Pulse animation on earn
- All colors from tokens

### Toast
- Proper exit animation (AnimatePresence)
- `role="alert"` and `aria-live="polite"`
- Escape key handler
- Focus management
- All colors from tokens

### ProgressRing
- Animated stroke (spring)
- Count-up number animation
- Glow on milestone
- All colors from tokens

### Avatar
- Fallback initial
- Loading state
- Ring on achievement
- All colors from tokens

### ErrorBoundary
- Friendly UI with animated error icon
- Focus management
- All colors from tokens

### SessionPlayer
- Animated answer feedback (correct/wrong)
- Staggered option entrance
- Progress bar animation
- All colors from tokens

### SessionResults
- Animated score count-up
- Confetti on pass
- Staggered stat reveal
- All colors from tokens

### TrendChart
- Animated line drawing
- Hover tooltips
- Smooth transitions
- All colors from tokens

### Timer
- Animated ring
- Pulse on warning
- Smooth color transitions
- All colors from tokens

### Header
- Animated mobile menu
- Focus management
- Skip link
- All colors from tokens

### Sidebar
- Animated active indicator
- Staggered link entrance
- All colors from tokens

### All Pages
- Page transitions (AnimatePresence)
- Empty states
- Loading skeletons
- All colors from tokens

---

## Page Rebuilds

### Home
- Animated welcome message
- Stat tiles with count-up
- Animated mission card
- Empty states for new users
- Phase timeline with animations

### Practice
- Animated subject/topic selection
- Question count with time estimate
- Animated start button
- Empty states

### Mock Exams
- Animated preset cards
- Empty state for history
- Plain language (no jargon)

### Mistakes
- Animated list
- Empty state (encouraging)

### Progress
- Animated charts
- Empty states
- Clear readiness explanation

### Achievements
- Animated badge grid
- Locked badge tooltips

### Diagnostic
- Animated results
- Clear explanations

### Profile
- Edit functionality
- Reset confirmation with specifics

### Admin
- Review queue with actions
- Loading/error states

---

## Audit Fixes

| Issue | Fix |
|-------|-----|
| Missing color tokens | Complete token system |
| Broken primary-400/200 | All shades defined |
| Hardcoded colors | All use tokens |
| No semantic tokens | Full semantic layer |
| Full page reloads | React Router Link/useNavigate |
| No error boundaries | Top-level + per-page |
| Broken gamification | Fix hardcoded zeros |
| UTC date bug | Local date handling |
| Silent data loss | Error feedback + retry |
| Missing empty states | Every page gets one |
| Jargon in student UI | Plain language |
| British/American spelling | Consistent American |
| No skip link | Added to MainLayout |
| Duplicate h1 | Header uses div, page uses h1 |
| Toast accessibility | role, aria-live, escape key |
| No focus management | Focus trap, focus return |
| No loading states | Skeleton loaders |
| No confirmation dialogs | Destructive actions get confirm |

---

## Implementation Phases

### Phase 1: Design Token System
- Rewrite `src/index.css` with complete token system
- All colors, spacing, typography, radii, shadows, animation tokens

### Phase 2: Shared Components
- Rebuild all shared components on new tokens
- Button, Card, Badge, Toast, ProgressRing, Avatar, ErrorBoundary
- SessionPlayer, SessionResults, TrendChart, Timer

### Phase 3: Key Pages
- Home, Practice, Session, Results
- Full animations, empty states, loading skeletons

### Phase 4: Remaining Pages
- Review, MockExams, Mistakes, Progress, Achievements, Diagnostic, Profile, Admin

### Phase 5: Layout
- Header, Sidebar, Footer
- Page transitions, skip link, focus management

---

## Testing Strategy

- Unit tests for all components (Vitest + React Testing Library)
- Visual regression tests for key pages
- Accessibility tests (axe-core)
- Animation tests (mock framer-motion)

---

## Success Criteria

- All 53 design system issues fixed
- All 194 audit issues addressed
- Consistent token usage across all components
- Smooth animations on all key actions
- Empty states on all pages
- Loading states on all async operations
- No console errors
- All tests pass
