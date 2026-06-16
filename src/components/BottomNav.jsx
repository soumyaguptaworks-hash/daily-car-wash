import { useNavigate, useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';

const leftTabs = [
  {
    label: 'Home', path: '/home',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
  },
  {
    label: 'Plans', path: '/plans',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="3"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
];

const rightTabs = [
  {
    label: 'Location', path: '/location',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    label: 'Profile', path: '/profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const renderTab = t => {
    const active = pathname.startsWith(t.path);
    return (
      <button key={t.path} className={`nav-item${active ? ' active' : ''}`} onClick={() => navigate(t.path)}>
        <span className={active ? 'nav-icon-wrap active-wrap' : 'nav-icon-wrap'}>{t.icon}</span>
        <span className="nav-label">{t.label}</span>
      </button>
    );
  };

  return (
    <div className="bottom-nav">
      {leftTabs.map(renderTab)}
      <button className="nav-fab" onClick={() => navigate('/bookings')}>
        <Plus size={22} color="#fff" strokeWidth={2.8} />
      </button>
      {rightTabs.map(renderTab)}
    </div>
  );
}
