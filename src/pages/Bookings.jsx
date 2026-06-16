import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check, Car, Droplets, CheckCircle2,
  MapPin, CalendarDays, Clock, CreditCard,
  Phone, MessageCircle, Star, Radio,
} from 'lucide-react';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import styles from './Bookings.module.css';

const tabs = ['Ongoing', 'Completed', 'Cancelled'];

const trackSteps = [
  { icon: <Check size={14} strokeWidth={3} />,        label: 'Service Requested', sub: 'Confirmed at 7:45 AM',   state: 'done' },
  { icon: <Check size={14} strokeWidth={3} />,        label: 'Partner Assigned',  sub: 'Ramesh K. · 4.9 stars',  state: 'done' },
  { icon: <Car   size={14} />,                        label: 'Partner En Route',  sub: 'Arrives in ~8 minutes',  state: 'active' },
  { icon: <Droplets size={14} />,                     label: 'Cleaning Started',  sub: 'Waiting…',               state: 'pending' },
  { icon: <CheckCircle2 size={14} />,                 label: 'Cleaning Complete', sub: 'Waiting…',               state: 'pending' },
];

const bcDetails = [
  { icon: <MapPin      size={14} />, label: 'Branch',  val: 'Daily Wash – Koramangala' },
  { icon: <CalendarDays size={14}/>, label: 'Date',    val: 'Fri, June 20, 2025' },
  { icon: <Clock       size={14} />, label: 'Time',    val: '8:00 AM – 9:00 AM' },
  { icon: <CreditCard  size={14} />, label: 'Payment', val: 'UPI · Paid' },
];

const completed = [
  { icon: <Droplets size={28} color="#3B9EFF" />, title: 'Basic Wash', sub: 'Jun 12 · Home Address', price: '₹299', rating: '4.9', color: 'linear-gradient(135deg,#C2E4FF,#65B4FF)' },
  { icon: <Droplets size={28} color="#9A5CFF" />, title: 'Foam Wash',  sub: 'Jun 9 · Office Parking', price: '₹499', rating: '5.0', color: 'linear-gradient(135deg,#D4BAFF,#9A5CFF)' },
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
                <div className={styles.bcImg} style={{ background: 'linear-gradient(135deg,#C2E4FF,#65B4FF)' }}>
                  <Car size={34} color="#3B9EFF" />
                </div>
                <div className={styles.bcInfo}>
                  <h4>Basic Wash</h4>
                  <p>Quick clean, perfect shine.</p>
                  <div className="star-row">
                    <Star size={11} fill="#FFB800" color="#FFB800" />
                    4.9 (150 reviews)
                  </div>
                </div>
              </div>

              <div className={styles.bcDetails}>
                {bcDetails.map(({ icon, label, val }) => (
                  <div key={label} className={styles.bcRow}>
                    <span className={styles.bcIcon}>{icon}</span>
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
              <h4 className={styles.trackTitle}>
                <Radio size={14} color="#FF3B50" /> Live Tracking
              </h4>
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
                    <Star size={11} fill="#FFB800" color="#FFB800" />
                    4.9 · 342 washes completed
                  </div>
                </div>
                <button className={styles.callBtn}><Phone size={18} color="#3B9EFF" /></button>
                <button className={styles.callBtn}><MessageCircle size={18} color="#3B9EFF" /></button>
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
                  <div className={styles.bcImg} style={{ background: b.color, width: 64, height: 64 }}>
                    {b.icon}
                  </div>
                  <div className={styles.bcInfo}>
                    <h4>{b.title}</h4>
                    <p>{b.sub}</p>
                    <div className="star-row" style={{ marginTop: 4 }}>
                      <Star size={11} fill="#FFB800" color="#FFB800" /> {b.rating}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 15, color: '#3B9EFF' }}>{b.price}</div>
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
            <div className={styles.emptyBlob}>
              <CheckCircle2 size={52} color="#fff" strokeWidth={1.5} />
            </div>
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
