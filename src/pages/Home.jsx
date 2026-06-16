import { useNavigate } from 'react-router-dom';
import {
  Droplets, Wind, Sparkles, Car, Star,
  Crown, Search, ChevronRight, Clock,
} from 'lucide-react';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import styles from './Home.module.css';

const services = [
  { icon: <Droplets size={40} color="#3B9EFF" />, label: 'Basic',    price: '₹299',  rating: '4.9', color: 'linear-gradient(135deg,#C2E4FF,#65B4FF)', reviews: '120' },
  { icon: <Wind     size={40} color="#9A5CFF" />, label: 'Foam',     price: '₹499',  rating: '4.8', color: 'linear-gradient(135deg,#D4BAFF,#9A5CFF)', reviews: '98' },
  { icon: <Sparkles size={40} color="#5CC8FF" />, label: 'Interior', price: '₹699',  rating: '4.7', color: 'linear-gradient(135deg,#BAE8FF,#5CC8FF)', reviews: '76' },
  { icon: <Crown    size={40} color="#C8920A" />, label: 'Premium',  price: '₹1299', rating: '5.0', color: 'linear-gradient(135deg,#FFEEBA,#FFCC44)', reviews: '203' },
];

const quickActions = [
  { icon: <Droplets size={20} color="#3B9EFF" />, label: 'Basic',    bg: '#D0E8FF' },
  { icon: <Wind     size={20} color="#00B469" />, label: 'Foam',     bg: '#E8FFE8' },
  { icon: <Sparkles size={20} color="#3B9EFF" />, label: 'Interior', bg: '#EBF5FF' },
  { icon: <Crown    size={20} color="#C8920A" />, label: 'Premium',  bg: '#FFF8E0' },
];

const recentBookings = [
  { icon: <Droplets size={22} color="#3B9EFF" />, label: 'Basic Wash', sub: 'Jun 12 · Home Address', price: '₹299', color: 'linear-gradient(135deg,#C2E4FF,#65B4FF)' },
  { icon: <Wind     size={22} color="#9A5CFF" />, label: 'Foam Wash',  sub: 'Jun 9 · Office Parking', price: '₹499', color: 'linear-gradient(135deg,#D4BAFF,#9A5CFF)' },
];

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="phone-shell">
      <StatusBar />
      <div className="page-scroll">
        <div className={styles.header}>
          <div className={styles.greetRow}>
            <div>
              <div className={styles.greeting}>Good Morning, Alex!</div>
              <div className={styles.subGreeting}>Ready for a spotless ride today?</div>
            </div>
            <div className={styles.avatar}>A</div>
          </div>
          <div className={styles.searchWrap}>
            <Search className={styles.searchIcon} size={18} color="#9090B0" />
            <input className={`clay-input ${styles.searchInput}`} placeholder="Search service or location…" />
          </div>
        </div>

        {/* Active subscription banner */}
        <div style={{ padding: '0 20px 6px' }}>
          <div className={styles.subBanner} onClick={() => navigate('/plans')}>
            <div className={styles.subIcon}>
              <Crown size={24} color="#fff" />
            </div>
            <div className={styles.subInfo}>
              <h4>Premium Plan Active</h4>
              <p>Next wash: Tomorrow, 8 AM</p>
            </div>
            <div className={styles.subBadge}>12 left</div>
          </div>
        </div>

        {/* Quick Book */}
        <div className="section-head"><h3>Quick Book</h3></div>
        <div className={styles.quickGrid}>
          {quickActions.map(({ icon, label, bg }) => (
            <button key={label} className={styles.qaChip} onClick={() => navigate('/bookings')}>
              <div className={styles.qaIcon} style={{ background: bg }}>{icon}</div>
              {label}
            </button>
          ))}
        </div>

        {/* Recommended */}
        <div className="section-head">
          <h3>Recommended</h3>
          <button onClick={() => navigate('/bookings')}>See All</button>
        </div>
        <div className={styles.cardsRow}>
          {services.map(s => (
            <div key={s.label} className={styles.serviceCard}>
              <div className={styles.cardImg} style={{ background: s.color }}>
                <span className={styles.cardIcon}>{s.icon}</span>
                <div className={styles.ratingBadge}>
                  <Star size={10} fill="#fff" color="#fff" /> {s.rating}
                </div>
              </div>
              <div className={styles.cardBody}>
                <h4>{s.label} Wash</h4>
                <p>{s.reviews} reviews</p>
                <div className={styles.cardFooter}>
                  <span className={styles.price}>{s.price}</span>
                  <button className="clay-btn sm" onClick={() => navigate('/bookings')}>Book</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recently Used */}
        <div className="section-head">
          <h3>Recently Used</h3>
          <button><Clock size={12} style={{ marginRight: 3 }} />History</button>
        </div>
        <div className={styles.recentList}>
          {recentBookings.map(b => (
            <div key={b.label} className={styles.recentRow}>
              <div className={styles.recentIconWrap} style={{ background: b.color }}>{b.icon}</div>
              <div className={styles.recentInfo}>
                <div className={styles.recentTitle}>{b.label}</div>
                <div className={styles.recentSub}>{b.sub}</div>
              </div>
              <div className={styles.recentRight}>
                <span className={styles.recentPrice}>{b.price}</span>
                <span className="status-badge done"><span className="status-dot"/>Done</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
