import { useNavigate } from 'react-router-dom';
import {
  Mail, User, Smartphone, Home, Car,
  CreditCard, Bell, Gift, Star, LogOut,
  Pencil, ArrowLeft, MoreHorizontal, ChevronRight,
} from 'lucide-react';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import styles from './Profile.module.css';

const fields = [
  { icon: <Mail size={18} color="#3B9EFF" />,       label: 'Email',        value: 'alex.johnson@gmail.com' },
  { icon: <User size={18} color="#7B5CFF" />,       label: 'Username',     value: 'Alex Johnson' },
  { icon: <Smartphone size={18} color="#00B469" />, label: 'Phone Number', value: '+91 98765 43210' },
  { icon: <Home size={18} color="#3B9EFF" />,       label: 'Home Address', value: '12A, Koramangala, Bengaluru' },
];

const menuItems = [
  { icon: <Car       size={18} color="#3B9EFF" />, label: 'My Vehicles',           bg: '#D0E8FF' },
  { icon: <CreditCard size={18} color="#00B469" />, label: 'Payment Methods',      bg: '#E8FFE8' },
  { icon: <Bell      size={18} color="#3B9EFF" />, label: 'Notification Settings', bg: '#EBF5FF' },
  { icon: <Gift      size={18} color="#7B5CFF" />, label: 'Referral & Rewards',    bg: '#F0E8FF' },
  { icon: <Star      size={18} color="#C8920A" fill="#C8920A" />, label: 'Rate the App', bg: '#FFF8E0' },
];

export default function Profile() {
  const navigate = useNavigate();
  return (
    <div className="phone-shell">
      <StatusBar white />
      <div className="page-scroll">
        <div className={styles.hero}>
          <div className={styles.heroHeader}>
            <button className={styles.backWhite} onClick={() => navigate('/home')}>
              <ArrowLeft size={18} color="#fff" />
            </button>
            <span className={styles.heroTitle}>Edit Profile</span>
            <button className={styles.backWhite}>
              <MoreHorizontal size={18} color="#fff" />
            </button>
          </div>

          <div className={styles.avatarWrap}>
            <div className={styles.bigAvatar}>A</div>
            <div className={styles.editBadge}><Pencil size={13} color="#3B9EFF" /></div>
          </div>
          <div className={styles.profileName}>Alex Johnson</div>
          <div className={styles.profileSub}>Premium Member · Since Jan 2025</div>
        </div>

        <div className={styles.body}>
          <div className={styles.statsRow}>
            {[['42','Washes'],['4.9','Rating'],['₹850','Wallet']].map(([num, lbl]) => (
              <div key={lbl} className={styles.statChip}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLbl}>{lbl}</div>
              </div>
            ))}
          </div>

          {fields.map(f => (
            <div key={f.label} className={styles.fieldGroup}>
              <div className={styles.fieldLabel}>{f.label}</div>
              <div className={styles.fieldInput}>
                <span className={styles.fiIcon}>{f.icon}</span>
                <span className={styles.fiText}>{f.value}</span>
                <Pencil size={14} color="#3B9EFF" style={{ cursor: 'pointer', flexShrink: 0 }} />
              </div>
            </div>
          ))}

          <div style={{ marginBottom: 20 }}>
            <button className="clay-btn">Save My Profile</button>
          </div>

          <div className={styles.menuList}>
            {menuItems.map(m => (
              <div key={m.label} className={styles.menuRow}>
                <div className={styles.mrIcon} style={{ background: m.bg }}>{m.icon}</div>
                <span className={styles.mrText}>{m.label}</span>
                <ChevronRight size={18} color="#9090B0" />
              </div>
            ))}
            <div className={`${styles.menuRow} ${styles.danger}`} onClick={() => navigate('/')}>
              <div className={styles.mrIcon} style={{ background: '#FFE8EA' }}>
                <LogOut size={18} color="#FF3B50" />
              </div>
              <span className={styles.mrText}>Log Out</span>
              <ChevronRight size={18} color="#FF3B50" />
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
