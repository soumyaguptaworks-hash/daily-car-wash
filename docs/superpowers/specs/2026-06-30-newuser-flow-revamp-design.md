# Daily Car Wash — New-User Flow & Layout Revamp

**Date:** 2026-06-30
**Type:** Flow + layout revamp (no visual redesign)

## Goal

Make the app behave like a real, empty new-user experience instead of a pre-filled demo. The user enters an empty app, explores, then either buys a monthly plan or schedules a single wash — and every step actually works end to end. Also fix layout/overlap/padding issues so controls never collide with the bottom nav.

## Non-goals

- No visual restyle — keep the claymorphic look, splash video, onboarding slides, coupon feature, SVG animations.
- No backend/payments — "purchase" and "OTP" stay simulated.

## 1. Initial state (store)

Bump storage key `dcw-state-v2` → `dcw-state-v3` so existing browsers reset to the fresh empty seed.

New `initial` state:

| Field | Was | Now |
|---|---|---|
| `vehicles` | SEED_VEHICLES (2) | `[]` |
| `addresses` | SEED_ADDRESSES (2) | `[]` |
| `bookings` | 3 seeded | `[]` |
| `subscription.planId` | `null` (already) | `null` |
| `subscription.startedDays` | pre-filled | `[]` |
| `subscription.slot` | `'morning'` | `null` |
| `subscription.washesUsed` | 0 | `0` |
| `wallet` | 480 | `0` |
| `user` | full SEED_USER | `{ name: '', phone: '', initials: '' }` |

`SEED_VEHICLES` / `SEED_ADDRESSES` stay in `data.jsx` (still referenced by Add forms for type options) but are no longer used as initial state.

## 2. Auth captures identity

`Login.jsx`: after OTP, add one field — "What should we call you?" (name). On finish:
`updateUser({ name, phone })` then `login()`. `updateUser` already derives `initials` from name.

Avatar fallback: when `initials` is empty, render a `User` glyph instead of blank.

## 3. Flows

### A. Plan flow (subscription)
1. Home or My Plan → **Choose a plan** (plan picker — already exists in `Plans.jsx`).
2. Tap a plan → confirm purchase screen/section (simulated "Pay ₹X") → `setSubscription({ planId })`.
3. → `Schedule.jsx`: pick wash days (≤ perWeek) + time slot → `setSubscription({ startedDays, slot })` → plan Active.
4. My Plan now shows the dashboard; Home shows the active-subscription card.

### B. Single wash (no plan required)
1. Book → service, car, date, time, address, optional coupon → `addBooking({ kind:'onetime', ... })` → Activity.
2. Tap booking → Track live status.
3. Non-subscriber promo banner (already built) upsells a plan.

### C. Gating (no dead ends)
Booking (`Book.jsx`) and scheduling (`Schedule.jsx`) need **≥1 vehicle and ≥1 address**:
- If `vehicles.length === 0`: show inline prompt "Add your car to continue" + button → `/vehicles`.
- If `addresses.length === 0`: show inline prompt "Add an address" + button → `/addresses`.
- Confirm button disabled until both exist and a selection is made.

## 4. Empty states (per screen)

Each list/dashboard renders a friendly empty card with a CTA when its data is empty:

- **Home:** no plan → "Get started — pick a plan" CTA + browse services + quick actions. Active-booking ("Happening now") and subscription cards only render when data exists. Greeting uses first name.
- **My Plan (`Plans.jsx`):** no plan → plan picker (explore + choose). With plan → existing dashboard.
- **Activity (`Bookings.jsx`):** empty → "No washes yet → Book your first / Choose a plan".
- **Vehicles:** empty → "Add your first car".
- **Addresses:** empty → "Add your first address".
- **Wallet:** balance ₹0 + offers still listed.
- **Profile:** stats show 0; "Add your name" prompt if name empty.

Reusable `EmptyState` component (icon, title, subtitle, CTA button) in `components/`.

## 5. Layout & spacing pass

- **Bottom-nav clearance:** the fixed bottom nav + center ＋ FAB overlap page content. Ensure the page/scroll container has enough `padding-bottom` (≈ nav height + FAB overhang, ~96–110px) on all shell pages so the last element/button is never covered. Verify in `AppShell` / `Page` / `layout`.
- **Home:** hero banner fixed height (done); verify quick-action grid, section spacing.
- **Book:** spacing between promo, sections, summary, confirm button.
- **Plans / Profile:** card and button spacing flagged by user.
- General: no clipped text, no buttons flush against screen edges.

## 6. Store API additions

- Reuse existing: `addVehicle`, `addAddress`, `setSubscription`, `addBooking`, `updateUser`, `cancelBooking`.
- Add `hasEssentials` helper (derived: `vehicles.length>0 && addresses.length>0`) — optional convenience for gating.
- No removals.

## 7. Migration

- Key bump to `v3` is the migration: old persisted state is ignored, fresh empty seed loads.
- Existing `reset()` action remains for manual reset.

## 8. Acceptance

A brand-new visitor can: install/open → onboarding → login (phone+name) → land on empty Home → either (a) choose+pay a plan → schedule days → see Active plan, or (b) add a car + address → book a single wash → see it in Activity → track it. No screen shows pre-filled data, and no control is hidden behind the bottom nav.
