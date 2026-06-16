import { useNavigate } from 'react-router-dom';
import {
  Car, MapPin, Wallet, Bell, Star, ShieldCheck, HelpCircle,
  LogOut, ChevronRight, Crown,
} from 'lucide-react';
import { useStore } from '../store';
import { ClayButton } from '../components/ui';
import { Stars } from '../components/bits';
import { Page, TopBar, Section, L } from '../components/layout';
import s from './app.module.css';

export default function Profile() {
  const nav = useNavigate();
  const { user, activePlan, subscription, bookings, logout } = useStore();

  const completed = bookings.filter((b) => b.status === 'completed').length;

  const MENU = [
    { Icon: Car,        label: 'My vehicles',       to: '/vehicles',      color: '#4DA3FF' },
    { Icon: MapPin,     label: 'Saved addresses',   to: '/addresses',     color: '#34D399' },
    { Icon: Wallet,     label: 'Wallet & rewards',  to: '/wallet',        color: '#FFC857' },
    { Icon: Bell,       label: 'Notifications',     to: '/notifications', color: '#FF8FB1' },
    { Icon: Star,       label: 'Ratings & reviews', to: '/home',          color: '#A78BFA' },
    { Icon: ShieldCheck,label: 'Privacy & security',to: '/home',          color: '#34D399' },
    { Icon: HelpCircle, label: 'Help & support',    to: '/home',          color: '#4DA3FF' },
  ];

  return (
    <Page>
      <TopBar back={false} title="Profile" />

      {/* avatar + name */}
      <div style={{ textAlign: 'center', marginBottom: 26 }}>
        <div style={{
          width: 88, height: 88, borderRadius: 30, margin: '0 auto 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 32, color: '#fff',
          background: 'linear-gradient(150deg,#66B2FF,#2E7DE0)',
          boxShadow: '0 14px 28px rgba(46,125,224,.4), inset 3px 3px 7px rgba(255,255,255,.4)',
        }}>
          {user.initials}
        </div>
        <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 22, color: '#233A56' }}>{user.name}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#6E89A8', marginTop: 4 }}>{user.phone}</div>
        <Stars value={4.9} size={14} showValue />
      </div>

      {/* stats */}
      <div className={L.grid2} style={{ marginBottom: 26 }}>
        {[
          { val: completed,     label: 'Washes done' },
          { val: activePlan ? (activePlan.washes - subscription.washesUsed) : 0, label: 'Washes left' },
        ].map((st) => (
          <div key={st.label} className={s.statTile}>
            <div className={s.statVal}>{st.val}</div>
            <div className={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* active plan badge */}
      {activePlan && (
        <Section>
          <div className={s.tile} style={{ cursor: 'pointer' }} onClick={() => nav('/plans')}>
            <span className={s.tileIcon} style={{ background: `${activePlan.color}22`, color: activePlan.color }}>
              <Crown size={22} />
            </span>
            <div className={s.tileBody}>
              <div className={s.tileTitle}>{activePlan.name} Plan · Active</div>
              <div className={s.tileSub}>{subscription.startedDays?.join(', ')} · {subscription.slot === 'morning' ? '7–10 AM' : '4–7 PM'}</div>
            </div>
            <ChevronRight size={18} color="#9DB4CE" />
          </div>
        </Section>
      )}

      {/* menu */}
      <Section title="Account">
        <div className={L.col}>
          {MENU.map((m) => (
            <button key={m.label} className={s.menuRow} onClick={() => nav(m.to)}>
              <span className={s.menuIcon} style={{ background: `${m.color}1F`, color: m.color }}>
                <m.Icon size={20} />
              </span>
              <span className={s.menuLabel}>{m.label}</span>
              <ChevronRight size={18} color="#9DB4CE" />
            </button>
          ))}
        </div>
      </Section>

      <Section>
        <ClayButton
          full
          variant="soft"
          onClick={() => { logout(); nav('/', { replace: true }); }}
          style={{ color: '#FF6B82' }}
        >
          <LogOut size={17} /> Sign out
        </ClayButton>
      </Section>

      <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#9DB4CE', padding: '10px 0 4px' }}>
        Daily Car Wash v1.0 · Made with ♥
      </div>
    </Page>
  );
}
