import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell, MapPin, Search, Sparkles, CalendarClock, Car, Wallet,
  ChevronRight, Navigation, ArrowRight,
} from 'lucide-react';
import { useStore } from '../store';
import { ALL_SERVICES, OFFERS, inr } from '../data';
import { ClayInput, ClayButton } from '../components/ui';
import { StatusBadge, ClayCarSVG } from '../components/bits';
import { Page, Section, L } from '../components/layout';
import s from './app.module.css';

/* ─── per-slide hero graphics ─── */
function HeroCarGraphic() {
  return <ClayCarSVG width={162} uid="home-h0" />;
}

function HeroLocationGraphic() {
  return (
    <svg width={150} viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hloc-bulb" x1="75" y1="14" x2="75" y2="118" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5FE6C0"/><stop offset="1" stopColor="#0E9E6E"/>
        </linearGradient>
        <linearGradient id="hloc-in" x1="75" y1="30" x2="75" y2="84" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0C8A60"/><stop offset="1" stopColor="#0A6E4C"/>
        </linearGradient>
        <linearGradient id="hloc-bdg" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#5FE6C0"/><stop offset="1" stopColor="#0E9E6E"/>
        </linearGradient>
        <filter id="hloc-sh" x="-40%" y="-25%" width="180%" height="160%">
          <feDropShadow dx="0" dy="9" stdDeviation="9" floodColor="#066B49" floodOpacity="0.4"/>
        </filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="75" cy="122" rx="22" ry="6" fill="rgba(6,90,60,.22)"/>

      {/* pin teardrop */}
      <path d="M75,118 C75,118 30,76 30,46 C30,21 50,1 75,1 C100,1 120,21 120,46 C120,76 75,118 75,118Z"
        fill="url(#hloc-bulb)" filter="url(#hloc-sh)"/>
      {/* glossy highlight on bulb */}
      <path d="M52,22 Q62,9 80,9 Q66,12 58,27 Q54,25 52,22Z" fill="rgba(255,255,255,.5)"/>
      {/* inner well */}
      <circle cx="75" cy="46" r="29" fill="url(#hloc-in)"/>
      <circle cx="75" cy="46" r="29" fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="2"/>

      {/* house — roof */}
      <path d="M59,48 L75,32 L91,48 Z" fill="#fff"/>
      {/* house body */}
      <rect x="62" y="47" width="26" height="18" rx="3" fill="#EAFFF6"/>
      {/* door */}
      <rect x="71" y="54" width="8" height="11" rx="2.5" fill="#0E9E6E"/>
      {/* windows */}
      <rect x="64" y="50" width="6" height="5" rx="1.5" fill="#0E9E6E"/>
      <rect x="80" y="50" width="6" height="5" rx="1.5" fill="#0E9E6E"/>

      {/* tick badge */}
      <circle cx="114" cy="18" r="16" fill="#fff" style={{filter:'drop-shadow(0 5px 10px rgba(6,90,60,.4))'}}/>
      <circle cx="114" cy="18" r="11.5" fill="url(#hloc-bdg)"/>
      <path d="M108,18 l4,5 8.5-9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function HeroSavingsGraphic() {
  const Coin = ({ y, big }) => (
    <g>
      {/* side / thickness */}
      <ellipse cx="62" cy={y + 9} rx="40" ry="11" fill="url(#hsav-sid)"/>
      <rect x="22" y={y} width="80" height="9" fill="url(#hsav-sid)"/>
      {/* top face */}
      <ellipse cx="62" cy={y} rx="40" ry="11" fill="url(#hsav-top)"
        style={big ? { filter: 'drop-shadow(0 -2px 9px rgba(255,200,40,.5))' } : undefined}/>
      <ellipse cx="62" cy={y} rx="40" ry="11" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="1.4"/>
      {/* rupee */}
      <text x="62" y={y + 5} textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="700"
        fontSize={big ? 15 : 12} fill={big ? '#fff' : 'rgba(255,255,255,.7)'}>₹</text>
      {/* rim gloss on top coin */}
      {big && <ellipse cx="48" cy={y - 3} rx="11" ry="3.5" fill="rgba(255,255,255,.45)" transform={`rotate(-16 48 ${y - 3})`}/>}
    </g>
  );
  return (
    <svg width={150} viewBox="0 0 150 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hsav-top" x1="62" y1="-11" x2="62" y2="11" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE57A"/><stop offset="1" stopColor="#FFB52E"/>
        </linearGradient>
        <linearGradient id="hsav-sid" x1="62" y1="0" x2="62" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E08C00"/><stop offset="1" stopColor="#A85E00"/>
        </linearGradient>
        <linearGradient id="hsav-bdg" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FFFFFF"/><stop offset="1" stopColor="#F0EBFF"/>
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="62" cy="120" rx="42" ry="8" fill="rgba(90,55,0,.2)"/>

      {/* coin stack (bottom → top) */}
      <Coin y={104} />
      <Coin y={80} />
      <Coin y={56} big />

      {/* % badge */}
      <circle cx="115" cy="26" r="21" fill="url(#hsav-bdg)" style={{filter:'drop-shadow(0 6px 12px rgba(124,92,224,.5))'}}/>
      <text x="115" y="32" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="600" fontSize="15" fill="#7C5CE0">40%</text>
    </svg>
  );
}

/* ─── hero slides ─── */
const SLIDES = [
  {
    title: 'Your ride,\nalways spotless.',
    sub:   'Professional doorstep car wash',
    cta:   'Book now',
    to:    '/book',
    bg:    'linear-gradient(140deg,#66B2FF 0%,#3D8FF0 55%,#2E7DE0 100%)',
    shadow:'0 16px 34px rgba(46,125,224,.42),inset 3px 3px 7px rgba(255,255,255,.28),inset -5px -7px 14px rgba(20,80,170,.35)',
    pills: null,
    Graphic: HeroCarGraphic,
  },
  {
    title: 'We come\nto you.',
    sub:   'No queues, no driving — washed right where you park.',
    cta:   'Book a wash',
    to:    '/book',
    bg:    'linear-gradient(140deg,#3ECFAC 0%,#18BE8C 55%,#10A478 100%)',
    shadow:'0 16px 34px rgba(16,164,120,.42),inset 3px 3px 7px rgba(255,255,255,.28),inset -5px -7px 14px rgba(0,80,50,.3)',
    pills: null,
    Graphic: HeroLocationGraphic,
  },
  {
    title: 'Save more\nevery month.',
    sub:   'Plans from ₹999 · up to 6 washes a week.',
    cta:   'View plans',
    to:    '/plans',
    bg:    'linear-gradient(140deg,#B39DFB 0%,#8E72F5 55%,#7C5CE0 100%)',
    shadow:'0 16px 34px rgba(124,92,224,.42),inset 3px 3px 7px rgba(255,255,255,.28),inset -5px -7px 14px rgba(60,0,160,.35)',
    pills: null,
    Graphic: HeroSavingsGraphic,
  },
];

export default function Home() {
  const nav = useNavigate();
  const { user, activePlan, subscription, bookings, getVehicle } = useStore();

  const remaining = activePlan ? activePlan.washes - subscription.washesUsed : 0;
  const pct       = activePlan ? (subscription.washesUsed / activePlan.washes) * 100 : 0;
  const active    = bookings.find(b => ['assigned', 'reached', 'started'].includes(b.status));
  const popular   = ALL_SERVICES.filter(x => ['foam', 'inout', 'vacuum', 'detail'].includes(x.id));

  const QA = [
    { label: 'Book wash', Icon: Sparkles,     color: '#4DA3FF', to: '/book'     },
    { label: 'My plan',   Icon: CalendarClock, color: '#34D399', to: '/plans'    },
    { label: 'Vehicles',  Icon: Car,           color: '#A78BFA', to: '/vehicles' },
    { label: 'Wallet',    Icon: Wallet,         color: '#FFC857', to: '/wallet'  },
  ];

  /* ── slideshow state ── */
  const [slide, setSlide]     = useState(0);
  const [visible, setVisible] = useState(true);
  const slideRef              = useRef(0);
  const touchX                = useRef(null);

  const go = (n) => {
    const next = ((n % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setVisible(false);
    setTimeout(() => { slideRef.current = next; setSlide(next); setVisible(true); }, 220);
  };

  useEffect(() => {
    const id = setInterval(() => go(slideRef.current + 1), 4000);
    return () => clearInterval(id);
  }, []);

  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 38) go(slideRef.current + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  const sl = SLIDES[slide];

  return (
    <Page>
      {/* header */}
      <div className={s.greet}>
        <button
          className={s.headBtn}
          style={{ background: 'linear-gradient(150deg,#66B2FF,#2E7DE0)', color: '#fff' }}
          onClick={() => nav('/profile')}
        >
          {user.initials || '🙂'}
        </button>
        <div style={{ flex: 1 }}>
          <div className={s.hi}>Good morning,</div>
          <div className={s.name}>{(user.name && user.name.split(' ')[0]) || 'there'} 👋</div>
          <span className={s.locChip}><MapPin size={13} strokeWidth={2.6} /> Home · Prestige Lakeside</span>
        </div>
        <button className={s.headBtn} onClick={() => nav('/notifications')}>
          <Bell size={20} /><span className={s.redDot} />
        </button>
      </div>

      <ClayInput
        icon={<Search size={18} color="#9DB4CE" />}
        placeholder="Search services…"
        onFocus={() => nav('/book')}
        readOnly
      />

      {/* ── hero slideshow ── */}
      <Section>
        <div
          className={s.heroBanner}
          style={{ background: sl.bg, boxShadow: sl.shadow }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* text content — fades on slide change */}
          <div
            className={s.heroText}
            style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.22s ease' }}
          >
            <div className={s.heroTitle} style={{ whiteSpace: 'pre-line' }}>{sl.title}</div>
            <div className={s.heroSub}>{sl.sub}</div>

            {sl.pills && (
              <div className={s.heroPills}>
                {sl.pills.map(p => (
                  <span key={p} style={{
                    fontSize: 10.5, fontWeight: 700, color: '#fff',
                    background: 'rgba(255,255,255,.22)', padding: '4px 9px',
                    borderRadius: 999, backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                  }}>{p}</span>
                ))}
              </div>
            )}

            <button className={s.heroBtn} onClick={() => nav(sl.to)}>
              {sl.cta} <ArrowRight size={12} />
            </button>
          </div>

          {/* per-slide graphic */}
          <div className={s.heroCar}>
            <sl.Graphic />
          </div>

          {/* dot indicators */}
          <div className={s.heroDots}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`${s.heroDot} ${i === slide ? s.heroDotActive : ''}`}
                style={{ width: i === slide ? 20 : 7 }}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Section>

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
          {QA.map(q => (
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
          {OFFERS.map(o => (
            <div key={o.id} className={s.offerCard} style={{ background: `linear-gradient(140deg,${o.color},${shade(o.color)})` }}>
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
          {popular.map(svc => (
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

function shade(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - 38), g = Math.max(0, ((n >> 8) & 255) - 38), b = Math.max(0, (n & 255) - 38);
  return `rgb(${r},${g},${b})`;
}
