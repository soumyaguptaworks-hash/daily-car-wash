import {
  Droplets, Sparkles, ShieldCheck, SprayCan, Brush, Wind, Disc3,
  Car, Gauge, Armchair, Wand2, Layers, Crown,
} from 'lucide-react';

/* ─────────────── Subscription plans ─────────────── */
export const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    Icon: Droplets,
    color: '#4DA3FF',
    price: 999,
    washes: 16,
    perWeek: 4,
    tagline: 'Everyday exterior shine',
    features: ['Bucket wash service', '4 days / week cleaning', 'Exterior cleaning', 'Monthly validity'],
  },
  {
    id: 'medium',
    name: 'Medium',
    Icon: Sparkles,
    color: '#34D399',
    price: 1799,
    washes: 20,
    perWeek: 5,
    popular: true,
    tagline: 'Advanced care, inside & out',
    features: ['Advanced exterior cleaning', 'Dashboard + glass cleaning', 'Tyre cleaning', 'Higher wash frequency'],
  },
  {
    id: 'premium',
    name: 'Premium',
    Icon: Crown,
    color: '#A78BFA',
    price: 2999,
    washes: 26,
    perWeek: 6,
    tagline: 'Complete premium vehicle care',
    features: ['Interior + exterior cleaning', 'Vacuum + foam wash', 'Premium add-on services', 'Priority partner assignment'],
  },
];

/* ─────────────── One-time services ─────────────── */
export const SERVICE_GROUPS = [
  {
    group: 'Exterior',
    color: '#4DA3FF',
    items: [
      { id: 'normal', name: 'Normal Wash', price: 149, time: '20 min', Icon: Droplets },
      { id: 'bucket', name: 'Bucket Wash', price: 199, time: '25 min', Icon: SprayCan },
      { id: 'pressure', name: 'Pressure Wash', price: 299, time: '30 min', Icon: Wind },
      { id: 'foam', name: 'Foam Wash', price: 349, time: '35 min', Icon: Sparkles },
    ],
  },
  {
    group: 'Interior',
    color: '#A78BFA',
    items: [
      { id: 'vacuum', name: 'Vacuum Cleaning', price: 249, time: '30 min', Icon: Wind },
      { id: 'dashboard', name: 'Dashboard Clean', price: 149, time: '15 min', Icon: Gauge },
      { id: 'seat', name: 'Seat Cleaning', price: 399, time: '45 min', Icon: Armchair },
      { id: 'polish', name: 'Interior Polish', price: 499, time: '50 min', Icon: Wand2 },
    ],
  },
  {
    group: 'Combo',
    color: '#FF8FB1',
    items: [
      { id: 'inout', name: 'Interior + Exterior', price: 599, time: '1 hr', Icon: Layers },
      { id: 'deep', name: 'Deep Cleaning', price: 899, time: '1.5 hr', Icon: Brush },
      { id: 'detail', name: 'Premium Detailing', price: 1499, time: '3 hr', Icon: ShieldCheck },
    ],
  },
];

export const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) =>
  g.items.map((i) => ({ ...i, group: g.group, color: g.color })),
);

/* ─────────────── Scheduling options ─────────────── */
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const SLOTS = [
  { id: 'morning', label: 'Morning', time: '7 AM – 10 AM' },
  { id: 'evening', label: 'Evening', time: '4 PM – 7 PM' },
];
export const TIME_SLOTS = ['07:00', '08:30', '10:00', '16:00', '17:30', '19:00'];

export const VEHICLE_TYPES = ['Hatchback', 'Sedan', 'SUV', 'Luxury'];

/* ─────────────── Service tracking steps ─────────────── */
export const TRACK_STEPS = [
  { key: 'requested', label: 'Service requested', Icon: Droplets },
  { key: 'assigned', label: 'Partner assigned', Icon: ShieldCheck },
  { key: 'reached', label: 'Partner reached location', Icon: Car },
  { key: 'started', label: 'Cleaning started', Icon: SprayCan },
  { key: 'completed', label: 'Cleaning completed', Icon: Sparkles },
];

/* ─────────────── Mock partner ─────────────── */
export const PARTNER = {
  name: 'Suresh Kumar',
  initials: 'SK',
  rating: 4.9,
  services: 1240,
  phone: '+91 90000 11122',
};

/* ─────────────── Mock seed data ─────────────── */
export const SEED_USER = {
  name: 'Aditya Agarwal',
  phone: '+91 98765 43210',
  email: 'aditya.agarwal@wobot.ai',
  initials: 'AA',
};

export const SEED_VEHICLES = [
  { id: 'v1', brand: 'Hyundai', model: 'Creta', type: 'SUV', plate: 'KA 01 AB 1234', color: 'White', colorHex: '#4DA3FF' },
  { id: 'v2', brand: 'Honda', model: 'City', type: 'Sedan', plate: 'KA 05 CD 5678', color: 'Silver', colorHex: '#9DB4CE' },
];

export const SEED_ADDRESSES = [
  { id: 'a1', label: 'Home', line: 'Prestige Lakeside, Tower B, Flat 1203', landmark: 'Near Central Park', parking: 'Basement P2 · Slot 14' },
  { id: 'a2', label: 'Office', line: 'Embassy Tech Village, Block C', landmark: 'Outer Ring Road', parking: 'Visitor parking, Level 1' },
];

export const NOTIFICATIONS = [
  { id: 'n1', type: 'partner', title: 'Partner assigned', body: 'Suresh is on the way for your morning wash.', time: '2m ago', unread: true },
  { id: 'n2', type: 'reminder', title: 'Upcoming wash', body: 'Your next wash is tomorrow at 8:30 AM.', time: '1h ago', unread: true },
  { id: 'n3', type: 'offer', title: 'Festival offer 🎉', body: 'Get 20% off on Premium Detailing this week.', time: '5h ago', unread: false },
  { id: 'n4', type: 'payment', title: 'Payment successful', body: '₹1,799 paid for Medium plan renewal.', time: 'Yesterday', unread: false },
];

export const OFFERS = [
  { id: 'o1', title: '20% OFF', sub: 'Premium Detailing', code: 'SHINE20', color: '#A78BFA' },
  { id: 'o2', title: 'Refer & Earn', sub: '₹100 per friend', code: 'CW-AA21', color: '#34D399' },
  { id: 'o3', title: 'Flat ₹150', sub: 'On first booking', code: 'FIRST150', color: '#FFC857' },
];

/* ── applicable coupon codes ──
   type 'pct'  → percent off (max caps the discount)
   type 'flat' → fixed amount off (min = minimum order value) */
export const COUPONS = [
  { code: 'SHINE20',  type: 'pct',  value: 20, max: 200, min: 0,   label: '20% off · up to ₹200' },
  { code: 'FIRST150', type: 'flat', value: 150,          min: 499, label: 'Flat ₹150 off · min ₹499' },
  { code: 'CW-AA21',  type: 'flat', value: 100,          min: 0,   label: '₹100 referral credit' },
  { code: 'CLEAN10',  type: 'pct',  value: 10, max: 100, min: 0,   label: '10% off your wash' },
];

/* returns { ok, discount, message } for a code against an order amount */
export function applyCoupon(rawCode, amount) {
  const code = (rawCode || '').trim().toUpperCase();
  if (!code) return { ok: false, discount: 0, message: '' };
  const c = COUPONS.find((x) => x.code === code);
  if (!c) return { ok: false, discount: 0, message: 'Invalid coupon code' };
  if (c.min && amount < c.min) {
    return { ok: false, discount: 0, message: `Minimum order ₹${c.min} required` };
  }
  let discount = c.type === 'pct' ? Math.round((amount * c.value) / 100) : c.value;
  if (c.max) discount = Math.min(discount, c.max);
  discount = Math.min(discount, amount);
  return { ok: true, discount, message: c.label };
}

export const inr = (n) => '₹' + n.toLocaleString('en-IN');
