# New-User Flow & Layout Revamp — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the pre-filled demo into a real empty new-user journey (explore → buy a plan or schedule a single wash) where every step works, and fix layout overlaps with the bottom nav.

**Architecture:** React + Vite SPA with a Context store persisted to `localStorage`. Change the store's initial seed to empty, gate booking/scheduling on having a car + address, add a name-capture step at login and a simulated plan-purchase confirm. Reuse existing `Empty`, `PlanSelection`, and add forms — most empty-state UI already exists.

**Tech Stack:** React 18, react-router-dom v6, CSS Modules, lucide-react. No test runner — each task verifies with `npx vite build` (must succeed) plus a concrete manual check in the browser.

## Global Constraints

- Keep the claymorphic visual style; this is flow + layout only, no restyle.
- All money/OTP/payment is simulated — no backend.
- Storage key must bump to `dcw-state-v3` so existing browsers reset to the empty seed.
- Per-task verification command: `npx vite build` from `d:/adizx/daily-car-wash` — expected `✓ built` with no errors.
- Commit after every task.

---

### Task 1: Empty initial state + storage reset

**Files:**
- Modify: `src/store.jsx` (initial state, KEY)
- Modify: `src/data.jsx` (no change to SEED_* exports; they stay for form option lists)

**Interfaces:**
- Produces: `initial` state with empty `vehicles`/`addresses`/`bookings`, `wallet: 0`, blank `user`, `subscription.planId: null`, `subscription.slot: null`, `subscription.startedDays: []`.

- [ ] **Step 1: Bump the storage key**

In `src/store.jsx` change:
```js
const KEY = 'dcw-state-v3';
```

- [ ] **Step 2: Replace the `initial` object**

Replace the current `initial` (lines ~6–35) with:
```js
const initial = {
  onboarded: false,
  loggedIn: false,
  user: { name: '', phone: '', initials: '' },
  vehicles: [],
  addresses: [],
  subscription: {
    planId: null,
    startedDays: [],
    slot: null,
    washesUsed: 0,
    paused: false,
  },
  wallet: 0,
  bookings: [],
};
```

- [ ] **Step 3: Drop now-unused imports**

In `src/store.jsx` line 2, change the import so only what's used remains:
```js
import { PLANS } from './data';
```
(Remove `SEED_USER, SEED_VEHICLES, SEED_ADDRESSES` from the import. They remain exported from `data.jsx` for the Add forms.)

- [ ] **Step 4: Build**

Run: `npx vite build`
Expected: `✓ built` with no errors.

- [ ] **Step 5: Manual check**

`npm run dev`, open the app, clear is automatic via key bump. Onboarding → login → Home shows no subscription card, Activity is empty, Vehicles/Addresses empty, Wallet ₹0.

- [ ] **Step 6: Commit**

```bash
git add src/store.jsx
git commit -m "feat: empty initial state for new-user flow (storage v3)"
```

---

### Task 2: Capture name at login

**Files:**
- Modify: `src/pages/Login.jsx`

**Interfaces:**
- Consumes: `updateUser({ name, phone })`, `login()` from store.
- Produces: after this flow, `user.name`/`user.phone`/`user.initials` are set.

- [ ] **Step 1: Add a `name` step and state**

In `src/pages/Login.jsx`, add a name state near the other hooks:
```js
const [name, setName] = useState('');
```

- [ ] **Step 2: Change OTP "Verify & continue" to advance to the name step**

Replace the OTP-step finish handler so verifying moves to the name step instead of finishing:
```js
// was: <ClayButton full onClick={finish}>
<ClayButton full onClick={() => setStep('name')}>
  <ShieldCheck size={19} /> Verify &amp; continue
</ClayButton>
```

- [ ] **Step 3: Replace `finish` to persist identity**

```js
const finish = () => {
  updateUser({ name: name.trim() || 'there', phone: phone ? `+91 ${phone}` : '' });
  login();
  nav('/home', { replace: true });
};
```
Add `updateUser` to the `useStore()` destructure: `const { login, updateUser } = useStore();`

- [ ] **Step 4: Add the name step UI**

Add a third branch rendered when `step === 'name'` (after the OTP branch), reusing existing classes:
```jsx
{step === 'name' && (
  <>
    <div className={a.authHead}>
      <h1 className={a.authTitle}>Almost there 🎉</h1>
      <p className={a.authText}>What should we call you?</p>
    </div>
    <label className={a.phoneField}>
      <input
        className={a.phoneInput}
        placeholder="Your name"
        value={name}
        autoFocus
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') finish(); }}
      />
    </label>
    <div style={{ flex: 1, minHeight: 24 }} />
    <ClayButton full onClick={finish}>
      Enter app <ArrowRight size={18} />
    </ClayButton>
    <p className={a.demoNote}>You can change this later in Profile</p>
  </>
)}
```
Note: change the existing `step === 'phone' ? (...) : (...)` ternary into `step === 'phone' ? (...) : step === 'otp' ? (...) : null` so the OTP branch is gated to `'otp'` and the new `name` branch renders separately. (`ArrowRight` is already imported.)

- [ ] **Step 5: Build**

Run: `npx vite build` — Expected: `✓ built`.

- [ ] **Step 6: Manual check**

Login flow: phone → Send OTP → enter OTP → Verify → name step → type name → Enter app → Home greets by first name, avatar shows initials.

- [ ] **Step 7: Commit**

```bash
git add src/pages/Login.jsx
git commit -m "feat: capture user name at login"
```

---

### Task 3: Blank-identity fallbacks (avatar + greeting)

**Files:**
- Modify: `src/pages/Home.jsx` (greeting)
- Modify: `src/pages/Profile.jsx` (avatar fallback)

**Interfaces:**
- Consumes: `user.name`, `user.initials` (may be empty if user skipped).

- [ ] **Step 1: Home greeting safe for empty name**

In `src/pages/Home.jsx`, the greeting uses `user.name.split(' ')[0]`. Replace with a safe expression:
```jsx
<div className={s.name}>{(user.name && user.name.split(' ')[0]) || 'there'} 👋</div>
```
And the header avatar button content `{user.initials}` → `{user.initials || '🙂'}`.

- [ ] **Step 2: Profile avatar fallback**

In `src/pages/Profile.jsx`, the avatar shows `{user.initials}`. Replace with:
```jsx
{user.initials || '🙂'}
```

- [ ] **Step 3: Build**

Run: `npx vite build` — Expected: `✓ built`.

- [ ] **Step 4: Manual check**

With a fresh state (before login completes you won't see Home). After login with a name, initials show. Temporarily verifying empty: greeting falls back to "there 👋" and "🙂" avatar without crashing.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.jsx src/pages/Profile.jsx
git commit -m "fix: safe fallbacks for empty user name/initials"
```

---

### Task 4: Booking gating — require a car + address (Book page)

**Files:**
- Modify: `src/pages/Book.jsx`

**Interfaces:**
- Consumes: `vehicles`, `addresses` from store (may be empty arrays).

- [ ] **Step 1: Compute readiness**

In `src/pages/Book.jsx`, after the store destructure add:
```js
const needsVehicle = vehicles.length === 0;
const needsAddress = addresses.length === 0;
const notReady = needsVehicle || needsAddress;
```

- [ ] **Step 2: Add an inline prompt above "Choose a service"**

Render before the service section (reuse `.planPromo`-style card or a simple tile):
```jsx
{notReady && (
  <div className={s.tile} style={{ marginBottom: 18, flexDirection: 'column', alignItems: 'stretch', gap: 12 }}>
    <div className={s.tileTitle}>Before you book</div>
    {needsVehicle && (
      <ClayButton full variant="soft" onClick={() => nav('/vehicles')}>
        <Car size={18} /> Add your car
      </ClayButton>
    )}
    {needsAddress && (
      <ClayButton full variant="soft" onClick={() => nav('/addresses')}>
        <MapPin size={18} /> Add an address
      </ClayButton>
    )}
  </div>
)}
```

- [ ] **Step 3: Disable confirm until ready**

Change the confirm button to:
```jsx
<ClayButton full disabled={notReady} onClick={confirm}>
  <CheckCircle2 size={19} /> {notReady ? 'Add car & address to book' : `Confirm booking · ${inr(total)}`}
</ClayButton>
```
Confirm that `ClayButton` forwards `disabled` (it spreads `...rest`). If not, gate by early-return in `confirm()`: `if (notReady) return;`.

- [ ] **Step 4: Build**

Run: `npx vite build` — Expected: `✓ built`.

- [ ] **Step 5: Manual check**

Fresh user with no car/address → Book shows "Add your car / Add an address", confirm disabled. Add one car + one address → prompt disappears, confirm enabled, booking lands in Activity.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Book.jsx
git commit -m "feat: gate single-wash booking on having a car + address"
```

---

### Task 5: Schedule gating — require a car + address (plan flow)

**Files:**
- Modify: `src/pages/Schedule.jsx`

**Interfaces:**
- Consumes: `vehicles`, `addresses`, `activePlan` from store.

- [ ] **Step 1: Add store fields + readiness**

In `src/pages/Schedule.jsx` destructure `vehicles, addresses` from `useStore()`, then:
```js
const notReady = vehicles.length === 0 || addresses.length === 0;
```

- [ ] **Step 2: Prompt + disable confirm**

Add before the Summary section:
```jsx
{notReady && (
  <Section title="Before you start">
    <div className={L.col}>
      {vehicles.length === 0 && (
        <ClayButton full variant="soft" onClick={() => nav('/vehicles')}>Add your car</ClayButton>
      )}
      {addresses.length === 0 && (
        <ClayButton full variant="soft" onClick={() => nav('/addresses')}>Add an address</ClayButton>
      )}
    </div>
  </Section>
)}
```
Change the confirm button to `disabled={notReady || days.length === 0}` and guard `save()` with `if (notReady || days.length === 0) return;`.

- [ ] **Step 3: Build**

Run: `npx vite build` — Expected: `✓ built`.

- [ ] **Step 4: Manual check**

Choose a plan with no car/address → Schedule shows add prompts, confirm disabled until a car + address exist and ≥1 day selected.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Schedule.jsx
git commit -m "feat: gate subscription scheduling on car + address + days"
```

---

### Task 6: Simulated plan-purchase confirm

**Files:**
- Modify: `src/pages/Plans.jsx` (the `PlanSelection` choose handler / component)

**Interfaces:**
- Consumes: `setSubscription({ planId })`, `PLANS`, `inr`.
- Produces: a confirm step before activating a plan.

- [ ] **Step 1: Add a pending-plan confirm state in `PlanSelection`**

In the `PlanSelection` component add:
```js
const [pending, setPending] = useState(null); // the plan object awaiting payment
```
Change each "Choose {plan}" button to `onClick={() => setPending(p)}` instead of calling `onChoose` directly.

- [ ] **Step 2: Add a confirm modal/card**

Render when `pending` is set (overlay or bottom card), reusing existing button/summary styles:
```jsx
{pending && (
  <div className={s.summary} style={{ marginTop: 16 }}>
    <div className={s.sumRow}>{pending.name} Plan <b>{inr(pending.price)}/mo</b></div>
    <div className={s.sumRow}>{pending.washes} washes · {pending.perWeek}/week <b></b></div>
    <div className={s.sumDivide} />
    <div className={`${s.sumRow} ${s.sumTotal}`}>Pay today <b>{inr(pending.price)}</b></div>
    <div className={L.row} style={{ marginTop: 14 }}>
      <ClayButton full onClick={() => { onChoose(pending.id); }}>Pay &amp; activate</ClayButton>
      <ClayButton full variant="soft" onClick={() => setPending(null)}>Cancel</ClayButton>
    </div>
  </div>
)}
```
(`onChoose(pending.id)` already runs `setSubscription({ planId }); nav('/schedule')`.)

- [ ] **Step 3: Build**

Run: `npx vite build` — Expected: `✓ built`.

- [ ] **Step 4: Manual check**

My Plan (no plan) → pick a plan → confirm card shows price → "Pay & activate" → goes to Schedule; "Cancel" dismisses.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Plans.jsx
git commit -m "feat: simulated pay-and-activate confirm for plan purchase"
```

---

### Task 7: Home "get started" state for non-subscribers

**Files:**
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `activePlan` (null for new user).

- [ ] **Step 1: Add a get-started CTA when no plan**

In `src/pages/Home.jsx`, where the subscription card is gated by `{activePlan && (...)}`, add an `else` branch that shows a prompt to subscribe:
```jsx
{!activePlan && (
  <Section title="Get started">
    <button className={s.planPromo} onClick={() => nav('/plans')}>
      <span className={s.planPromoIcon}><BadgePercent size={22} /></span>
      <span style={{ flex: 1, textAlign: 'left' }}>
        <span className={s.planPromoTitle}>Pick a monthly plan</span>
        <span className={s.planPromoSub}>Save up to 40% vs one-time washes — choose yours</span>
      </span>
      <span className={s.planPromoCta}>View plans <ChevronRight size={15} /></span>
    </button>
  </Section>
)}
```
Add `BadgePercent` to the lucide import in `Home.jsx`.

- [ ] **Step 2: Build**

Run: `npx vite build` — Expected: `✓ built`.

- [ ] **Step 3: Manual check**

Fresh Home shows "Get started → Pick a monthly plan". After subscribing, it's replaced by the active-subscription card.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: home get-started plan CTA for non-subscribers"
```

---

### Task 8: Layout & padding pass (bottom-nav clearance + flagged spots)

**Files:**
- Modify: `src/components/layout.module.css` (page bottom padding if needed)
- Modify: `src/pages/app.module.css` (spacing fixes as found)

**Interfaces:** none.

- [ ] **Step 1: Verify nav clearance**

The fixed nav sits at `bottom: 14px`, height ≈ 73px, FAB overhangs `-34px` → top edge ≈ 14+73 = 87px from bottom, FAB top ≈ 87+34 = 121px. `.page` bottom padding is `130px` — already clears. If any shell page scrolls content under the nav during manual testing, increase `.page` padding-bottom to `140px`.

- [ ] **Step 2: Manual audit each shell screen**

Run `npm run dev`. On Home, My Plan, Activity, Profile, Book, Schedule, Vehicles, Addresses, Wallet: confirm the last button/card is fully visible above the nav, no text is clipped, no two controls overlap, and cards aren't flush to screen edges. Record any specific offender.

- [ ] **Step 3: Apply targeted fixes**

For each offender found, adjust the specific class margin/padding. Example if Book's confirm sits too close to the nav: ensure the final `<Section>` has default bottom spacing (sections use `L.section` margin). Only change classes for real offenders — do not restyle broadly.

- [ ] **Step 4: Build**

Run: `npx vite build` — Expected: `✓ built`.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout.module.css src/pages/app.module.css
git commit -m "fix: spacing/padding pass for bottom-nav clearance"
```

---

## Self-Review

**Spec coverage:**
- Empty initial state + v3 reset → Task 1 ✓
- Login captures name → Task 2 ✓
- Blank identity fallback → Task 3 ✓
- Single wash without plan + gating → Task 4 ✓
- Plan flow purchase confirm + schedule gating → Tasks 5, 6 ✓
- Empty states per screen → already exist (Bookings/Vehicles/Addresses via `Empty`, Plans via `PlanSelection`); Home get-started → Task 7 ✓
- Layout/padding pass → Task 8 ✓
- Wallet ₹0 → Task 1 (seed) ✓; Wallet page renders balance from store, no code change needed.

**Placeholder scan:** No TBD/TODO; every code step has concrete code.

**Type consistency:** `updateUser({name,phone})`, `setSubscription({planId|startedDays|slot})`, `addBooking({...})`, `addVehicle`, `addAddress` all match store signatures in `store.jsx`. `onChoose(id)` matches `Plans.jsx` usage. `notReady` boolean used consistently in Tasks 4–5.

**Note for implementer:** Verify `ClayButton` spreads `disabled` to the underlying `<button>` (it spreads `...rest`); if a styled-disabled state is missing, the early-return guards in Tasks 4–5 still prevent the action.
