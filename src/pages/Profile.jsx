import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import styles from './Profile.module.css';

const fields = [
  { icon: '📧', label: 'Email',        value: 'alex.johnson@gmail.com' },
  { icon: '👤', label: 'Username',     value: 'Alex Johnson' },
  { icon: '📱', label: 'Phone Number', value: '+91 98765 43210' },
  { icon: '🏠', label: 'Home Address', value: '12A, Koramangala, Bengaluru' },
];

const menuItems = [
  { icon: '🚗', label: 'My Vehicles',         bg: '#FFE8D8' },
  { icon: '💳', label: 'Payment Methods',      bg: '#E8FFE8' },
  { icon: '🔔', label: 'Notification Settings',bg: '#E8F0FF' },
  { icon: '🎁', label: 'Referral & Rewards',   bg: '#F0E8FF' },
  { icon: '⭐', label: 'Rate the App',          bg: '#FFF8E0' },
];

export default function Profile() {
  const navigate = useNavigate();
  return (
    <div className="phone-shell">
      <StatusBar white />
      <div className="page-scroll">
        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroHeader}>
            <button className={styles.backWhite} onClick={() => navigate('/home')}>←</button>
            <span className={styles.heroTitle}>Edit Profile</span>
            <button className={styles.backWhite}>⋯</button>
          </div>

          <div className={styles.avatarWrap}>
            <div className={styles.bigAvatar}>A</div>
            <div className={styles.editBadge}>✏️</div>
          </div>
          <div className={styles.profileName}>Alex Johnson</div>
          <div className={styles.profileSub}>Premium Member · Since Jan 2025</div>
        </div>

        <div className={styles.body}>
          {/* Stats */}
          <div className={styles.statsRow}>
            {[['42','Washes'],['4.9','Rating'],['₹850','Wallet']].map(([num, lbl]) => (
              <div key={lbl} className={styles.statChip}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLbl}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Fields */}
          {fields.map(f => (
            <div key={f.label} className={styles.fieldGroup}>
              <div className={styles.fieldLabel}>{f.label}</div>
              <div className={styles.fieldInput}>
                <span className={styles.fiIcon}>{f.icon}</span>
                <span className={styles.fiText}>{f.value}</span>
                <span className={styles.fiEdit}>✏️</span>
              </div>
            </div>
          ))}

          <div style={{ marginBottom: 20 }}>
            <button className="clay-btn">Save My Profile</button>
          </div>

          {/* Menu */}
          <div className={styles.menuList}>
            {menuItems.map(m => (
              <div key={m.label} className={styles.menuRow}>
                <div className={styles.mrIcon} style={{ background: m.bg }}>{m.icon}</div>
                <span className={styles.mrText}>{m.label}</span>
                <span className={styles.mrArrow}>›</span>
              </div>
            ))}
            <div className={`${styles.menuRow} ${styles.danger}`} onClick={() => navigate('/')}>
              <div className={styles.mrIcon} style={{ background: '#FFE8EA' }}>🚪</div>
              <span className={styles.mrText}>Log Out</span>
              <span className={styles.mrArrow}>›</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
