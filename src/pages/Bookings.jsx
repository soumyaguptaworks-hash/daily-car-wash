import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import styles from './Bookings.module.css';

const tabs = ['Ongoing', 'Completed', 'Cancelled'];

const trackSteps = [
  { icon: '✓', label: 'Service Requested', sub: 'Confirmed at 7:45 AM', state: 'done' },
  { icon: '✓', label: 'Partner Assigned', sub: 'Ramesh K. · ⭐ 4.9', state: 'done' },
  { icon: '🚗', label: 'Partner En Route', sub: 'Arrives in ~8 minutes', state: 'active' },
  { icon: '🫧', label: 'Cleaning Started', sub: 'Waiting…', state: 'pending' },
  { icon: '✦', label: 'Cleaning Complete', sub: 'Waiting…', state: 'pending' },
];

const completed = [
  { emoji: '🚗', title: 'Basic Wash', sub: 'Jun 12 · Home Address', price: '₹299', date: 'Jun 12', partner: 'Ramesh K.', rating: '4.9' },
  { emoji: '🫧', title: 'Foam Wash', sub: 'Jun 9 · Office Parking', price: '₹499', date: 'Jun 9', partner: 'Suresh M.', rating: '5.0' },
];

export default function Bookings() {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="phone-shell">
      <StatusBar />
      <div className="page-scroll">
        <div style={{ padding: '8px 20px 14px' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#1A1A2E' }}>My Bookings</h2>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#4A4A6A', marginTop: 4, lineHeight: 1.4 }}>
            Manage your appointments — track, reschedule, or review anytime.
          </p>
        </div>

        <div className="tab-row">
          {tabs.map((t, i) => (
            <button key={t} className={`tab-btn${tab === i ? ' active' : ''}`} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>

        {/* ── ONGOING ── */}
        {tab === 0 && (
          <>
            <div className={styles.bookingCard}>
              <div className={styles.bcTop}>
                <div className={styles.bcImg}>🚗</div>
                <div className={styles.bcInfo}>
                  <h4>Basic Wash</h4>
                  <p>Quick clean, perfect shine.</p>
                  <div className="star-row">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    4.9 (150 reviews)
                  </div>
                </div>
              </div>

              <div className={styles.bcDetails}>
                {[
                  ['📍','Branch','Daily Wash – Koramangala'],
                  ['📅','Date','Fri, June 20, 2025'],
                  ['🕐','Time','8:00 AM – 9:00 AM'],
                  ['💳','Payment','UPI ✓'],
                ].map(([icon, label, val]) => (
                  <div key={label} className={styles.bcRow}>
                    <span>{icon}</span>
                    <span className={styles.bcLabel}>{label}:</span>
                    <span className={styles.bcVal}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: '0 16px 6px' }}>
                <span className="status-badge scheduled"><span className="status-dot"/>Scheduled</span>
              </div>
              <div className={styles.bcActions}>
                <button className="clay-btn sm">Reschedule</button>
                <button className="clay-btn sm outline">Cancel</button>
              </div>
            </div>

            {/* Live track */}
            <div className={styles.trackCard}>
              <h4>🔴 Live Tracking</h4>
              {trackSteps.map((step, i) => (
                <div key={i} className={`${styles.trackStep} ${styles[step.state]}`}>
                  <div className={styles.tsLeft}>
                    <div className={styles.tsDot}>{step.icon}</div>
                    {i < trackSteps.length - 1 && <div className={styles.tsLine}/>}
                  </div>
                  <div className={styles.tsInfo}>
                    <h5>{step.label}</h5>
                    <p>{step.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner info */}
            <div className={styles.partnerCard}>
              <h4>Your Partner</h4>
              <div className={styles.partnerRow}>
                <div className={styles.partnerAvatar}>R</div>
                <div className={styles.partnerInfo}>
                  <div className={styles.partnerName}>Ramesh Kumar</div>
                  <div className="star-row" style={{ marginTop: 3 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    4.9 · 342 washes completed
                  </div>
                </div>
                <button className={styles.callBtn}>📞</button>
                <button className={styles.callBtn}>💬</button>
              </div>
            </div>
          </>
        )}

        {/* ── COMPLETED ── */}
        {tab === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 20px' }}>
            {completed.map(b => (
              <div key={b.title} className={styles.completedCard}>
                <div className={styles.bcTop}>
                  <div className={styles.bcImg} style={{ fontSize: 30 }}>{b.emoji}</div>
                  <div className={styles.bcInfo}>
                    <h4>{b.title}</h4>
                    <p>{b.sub}</p>
                    <div className="star-row" style={{ marginTop: 4 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {b.rating}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 15, color: '#FF6B2C' }}>{b.price}</div>
                    <span className="status-badge done" style={{ marginTop: 5, display: 'inline-flex' }}>
                      <span className="status-dot"/>Done
                    </span>
                  </div>
                </div>
                <div style={{ padding: '0 16px 14px', display: 'flex', gap: 8 }}>
                  <button className="clay-btn sm outline">Rate Service</button>
                  <button className="clay-btn sm">Book Again</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CANCELLED ── */}
        {tab === 2 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyBlob}>🎉</div>
            <h3>No Cancellations!</h3>
            <p>You haven't cancelled any bookings. Keep up the great streak!</p>
            <button className="clay-btn" style={{ maxWidth: 220 }} onClick={() => navigate('/home')}>
              Book a Wash
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
