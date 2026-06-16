import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, LayoutGrid, CalendarClock, User, Plus } from 'lucide-react';
import N from './AppShell.module.css';

const cx = (...a) => a.filter(Boolean).join(' ');

const TABS = [
  { to: '/home', label: 'Home', Icon: Home },
  { to: '/plans', label: 'Plans', Icon: LayoutGrid },
  { to: '/bookings', label: 'Activity', Icon: CalendarClock },
  { to: '/profile', label: 'Profile', Icon: User },
];

export default function AppShell() {
  const nav = useNavigate();
  return (
    <div className={N.shell}>
      <Outlet />

      <nav className={N.nav}>
        <NavLink to={TABS[0].to} className={({ isActive }) => cx(N.item, isActive && N.active)}>
          {() => <Tab t={TABS[0]} />}
        </NavLink>
        <NavLink to={TABS[1].to} className={({ isActive }) => cx(N.item, isActive && N.active)}>
          {() => <Tab t={TABS[1]} />}
        </NavLink>

        <div className={N.fabWrap}>
          <button className={N.fab} aria-label="Book a wash" onClick={() => nav('/book')}>
            <Plus size={28} strokeWidth={2.6} />
          </button>
        </div>

        <NavLink to={TABS[2].to} className={({ isActive }) => cx(N.item, isActive && N.active)}>
          {() => <Tab t={TABS[2]} />}
        </NavLink>
        <NavLink to={TABS[3].to} className={({ isActive }) => cx(N.item, isActive && N.active)}>
          {() => <Tab t={TABS[3]} />}
        </NavLink>
      </nav>
    </div>
  );
}

function Tab({ t }) {
  const { Icon } = t;
  return (
    <>
      <span className={N.iconWrap}><Icon size={21} strokeWidth={2.3} /></span>
      <span>{t.label}</span>
    </>
  );
}
