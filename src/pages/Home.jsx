import { useNavigate } from 'react-router-dom';
import {
  Bell, MapPin, Search, Sparkles, CalendarClock, Car, Wallet,
  ChevronRight, Navigation,
} from 'lucide-react';
import { useStore } from '../store';
import { ALL_SERVICES, OFFERS, inr } from '../data';
import { ClayInput, ClayButton } from '../components/ui';
import { StatusBadge, ClayCarSVG } from '../components/bits';
import { Page, Section, L } from '../components/layout';
import s from './app.module.css';

export default function Home() {
  const nav = useNavigate();
  const { user, activePlan, subscription, bookings, getVehicle } = useStore();

  const remaining = activePlan ? activePlan.washes - subscription.washesUsed : 0;
  const pct = activePlan ? (subscription.washesUsed / activePlan.washes) * 100 : 0;
  const active = bookings.find((b) => ['assigned', 'reached', 'started'].includes(b.status));
  const popular = ALL_SERVICES.filter((x) => ['foam', 'inout', 'vacuum', 'detail'].includes(x.id));

  const QA = [
    { label: 'Book wash', Icon: Sparkles, color: '#4DA3FF', to: '/book' },
    { label: 'My plan', Icon: CalendarClock, color: '#34D399', to: '/plans' },
    { label: 'Vehicles', Icon: Car, color: '#A78BFA', to: '/vehicles' },
    { label: 'Wallet', Icon: Wallet, color: '#FFC857', to: '/wallet' },
  ];

  return (
    <Page>
      {/* header */}
      <div className={s.greet}>
        <button className={s.headBtn} style={{ background: 'linear-gradient(150deg,#66B2FF,#2E7DE0)', color: '#fff' }} onClick={() => nav('/profile')}>
          {user.initials}
        </button>
        <div style={{ flex: 1 }}>
          <div className={s.hi}>Good morning,</div>
          <div className={s.name}>{user.name.split(' ')[0]} 👋</div>
          <span className={s.locChip}><MapPin size={13} strokeWidth={2.6} /> Home · Prestige Lakeside</span>
        </div>
        <button className={s.headBtn} onClick={() => nav('/notifications')}>
          <Bell size={20} /><span className={s.redDot} />
        </button>
      </div>

      <ClayInput icon={<Search size={18} color="#9DB4CE" />} placeholder="Search services…" onFocus={() => nav('/book')} readOnly />

      {/* active subscription */}
      {activePlan && (
        <Section title="Your subscription" action="Manage" onAction={() => nav('/plans')}>
          <div className={s.subCard} onClick={() => nav('/plans')} role="button" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: -14, right: -14, pointerEvents: 'none', opacity: 0.20 }}>
              <ClayCarSVG width={138} uid="home-sub" />
            </div>
            <div className={s.subTop}>
              <span className={s.subPlanTag}><activePlan.Icon size={20} /> {activePlan.name} Plan</span>
              <span className={s.subPill}>{subscription.paused ? 'Paused' : 'Active'}</span>
            </div>
            <div className={s.subMeta}>
              <div>
                <div className={s.subMetaLabel}>Washes left</div>
                <div className={s.subMetaVal}>{remaining} of {activePlan.washes}</div>
              </div>
              <div>
                <div className={s.subMetaLabel}>Next wash</div>
                <div className={s.subMetaVal}>Tomorrow · 8:30 AM</div>
              </div>
            </div>
            <div className={s.subBar}><div className={s.subBarFill} style={{ width: `${100 - pct}%` }} /></div>
          </div>
        </Section>
      )}

      {/* quick actions */}
      <Section>
        <div className={s.qaGrid}>
          {QA.map((q) => (
            <button key={q.label} className={s.qaItem} onClick={() => nav(q.to)}>
              <span className={s.qaIcon} style={{ color: q.color }}><q.Icon size={24} /></span>
              <span className={s.qaLabel}>{q.label}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* live booking */}
      {active && (
        <Section title="Happening now">
          <div className={s.tile} onClick={() => nav(`/track/${active.id}`)} role="button">
            <span className={s.tileIcon} style={{ background: '#EAF4FF', color: '#4DA3FF' }}><Navigation size={22} /></span>
            <div className={s.tileBody}>
              <div className={s.tileTitle}>{active.title}</div>
              <div className={s.tileSub}>{getVehicle(active.vehicleId)?.model} · {active.time}</div>
            </div>
            <div className={s.tileRight}>
              <StatusBadge status={active.status} />
              <span style={{ color: '#9DB4CE' }}><ChevronRight size={18} /></span>
            </div>
          </div>
        </Section>
      )}

      {/* offers */}
      <Section title="Offers for you" action="See all" onAction={() => nav('/wallet')}>
        <div className={L.hscroll}>
          {OFFERS.map((o) => (
            <div key={o.id} className={s.offerCard} style={{ background: `linear-gradient(140deg, ${o.color}, ${shade(o.color)})` }}>
              <div className={s.offerTitle}>{o.title}</div>
              <div className={s.offerSub}>{o.sub}</div>
              <span className={s.offerCode}>{o.code}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* popular services */}
      <Section title="Quick book" action="All services" onAction={() => nav('/book')}>
        <div className={L.hscroll}>
          {popular.map((svc) => (
            <div key={svc.id} className={s.svcCard} onClick={() => nav('/book', { state: { serviceId: svc.id } })}>
              <span className={s.svcIcon} style={{ background: `${svc.color}1F`, color: svc.color }}><svc.Icon size={24} /></span>
              <div className={s.svcName}>{svc.name}</div>
              <div className={s.svcMeta}>{svc.time}</div>
              <div className={s.svcPrice}>{inr(svc.price)}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <ClayButton full onClick={() => nav('/book')}>Book a wash now</ClayButton>
      </Section>
    </Page>
  );
}

/* darken a hex a touch for the offer gradient */
function shade(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - 38), g = Math.max(0, ((n >> 8) & 255) - 38), b = Math.max(0, (n & 255) - 38);
  return `rgb(${r},${g},${b})`;
}
