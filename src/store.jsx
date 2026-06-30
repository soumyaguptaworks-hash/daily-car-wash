import { createContext, useContext, useEffect, useState } from 'react';
import { SEED_USER, SEED_VEHICLES, SEED_ADDRESSES, PLANS } from './data';

const KEY = 'dcw-state-v1';

const initial = {
  onboarded: false,
  loggedIn: false,
  user: SEED_USER,
  vehicles: SEED_VEHICLES,
  addresses: SEED_ADDRESSES,
  // active subscription (null until a plan is chosen)
  subscription: {
    planId: 'medium',
    startedDays: ['Mon', 'Wed', 'Fri', 'Sun'],
    slot: 'morning',
    washesUsed: 8,
    paused: false,
  },
  wallet: 480,
  bookings: [
    {
      id: 'bk1', kind: 'subscription', title: 'Medium Plan Wash', vehicleId: 'v1',
      date: 'Tomorrow', time: '08:30 AM', address: 'Home', status: 'assigned', price: 0,
    },
    {
      id: 'bk2', kind: 'onetime', title: 'Foam Wash', vehicleId: 'v2',
      date: 'Today', time: '05:30 PM', address: 'Office', status: 'started', price: 349,
    },
    {
      id: 'bk0', kind: 'onetime', title: 'Premium Detailing', vehicleId: 'v1',
      date: '12 Jun', time: '10:00 AM', address: 'Home', status: 'completed', price: 1499, rated: true,
    },
  ],
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...initial, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return initial;
}

const Ctx = createContext(null);

export function StoreProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  const set = (patch) => setState((s) => ({ ...s, ...(typeof patch === 'function' ? patch(s) : patch) }));

  const api = {
    ...state,
    activePlan: PLANS.find((p) => p.id === state.subscription?.planId) || null,

    completeOnboarding: () => set({ onboarded: true }),
    login: () => set({ loggedIn: true, onboarded: true }),
    logout: () => set({ loggedIn: false }),

    updateUser: (patch) => set((s) => {
      const next = { ...s.user, ...patch };
      if (patch.name) {
        next.initials = patch.name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
      }
      return { user: next };
    }),
    reset: () => { localStorage.removeItem(KEY); setState(initial); },

    addVehicle: (v) => set((s) => ({ vehicles: [...s.vehicles, { ...v, id: 'v' + (s.vehicles.length + 1) + Date.now() }] })),
    removeVehicle: (id) => set((s) => ({ vehicles: s.vehicles.filter((v) => v.id !== id) })),

    addAddress: (a) => set((s) => ({ addresses: [...s.addresses, { ...a, id: 'a' + Date.now() }] })),
    removeAddress: (id) => set((s) => ({ addresses: s.addresses.filter((a) => a.id !== id) })),

    setSubscription: (sub) => set((s) => ({ subscription: { ...s.subscription, ...sub } })),
    togglePause: () => set((s) => ({ subscription: { ...s.subscription, paused: !s.subscription.paused } })),

    addBooking: (b) => set((s) => ({
      bookings: [{ id: 'bk' + Date.now(), status: 'requested', ...b }, ...s.bookings],
    })),
    cancelBooking: (id) => set((s) => ({
      bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)),
    })),

    getVehicle: (id) => state.vehicles.find((v) => v.id === id),
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
