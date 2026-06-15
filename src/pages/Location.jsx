import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import styles from './Location.module.css';

const saved = [
  { icon: '🏠', label: 'Home', address: '12A, 3rd Floor, HSR Layout, Bengaluru – 560102', detail: 'Near Agara Lake Gate', active: true },
  { icon: '🏢', label: 'Office', address: 'WeWork Galaxy, Residency Road, Bengaluru – 560025', detail: 'Tower B, Ground Floor' },
  { icon: '🅿️', label: 'Apartment', address: 'Salarpuria Sattva, Whitefield, Bengaluru – 560066', detail: 'Block C, Basement Parking' },
];

export default function Location() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="phone-shell">
      <StatusBar />
      <div className="page-scroll">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate('/home')}>←</button>
          <h2>My Locations</h2>
          <button className="menu-btn">⋯</button>
        </div>

        {/* Map placeholder */}
        <div className={styles.mapWrap}>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapGrid}/>
            {/* Pin */}
            <div className={styles.mapPin}>
              <div className={styles.pinDot}/>
              <div className={styles.pinRing}/>
              <div className={styles.pinShadow}/>
            </div>
            <div className={styles.mapLabel}>
              <span>📍 12A, HSR Layout</span>
            </div>
            {/* Nearby markers */}
            <div className={styles.nearbyPin} style={{ top: '30%', left: '25%' }}>🚿</div>
            <div className={styles.nearbyPin} style={{ top: '55%', right: '20%' }}>🚿</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '0 20px 6px', position: 'relative' }}>
          <svg style={{ position: 'absolute', left: 34, top: '50%', transform: 'translateY(-50%)', color: '#9090B0', width: 18, height: 18 }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input className="clay-input" style={{ paddingLeft: 44 }} placeholder="Search area or landmark…" />
        </div>

        {/* Saved addresses */}
        <div className="section-head"><h3>Saved Addresses</h3></div>
        <div className={styles.addressList}>
          {saved.map((a, i) => (
            <div key={a.label} className={`${styles.addressCard} ${selected === i ? styles.selectedCard : ''}`}
              onClick={() => setSelected(i)}>
              <div className={styles.addrIcon} style={{ background: selected === i ? '#FF6B2C' : '#F0ECFF' }}>
                <span style={{ fontSize: 20 }}>{a.icon}</span>
              </div>
              <div className={styles.addrInfo}>
                <div className={styles.addrLabel}>{a.label}</div>
                <div className={styles.addrMain}>{a.address}</div>
                <div className={styles.addrSub}>{a.detail}</div>
              </div>
              {selected === i && (
                <div className={styles.checkMark}>✓</div>
              )}
            </div>
          ))}

          {/* Add new */}
          <button className={styles.addNew}>
            <div className={styles.addIcon}>＋</div>
            <span>Add New Address</span>
          </button>
        </div>

        {/* Nearby services */}
        <div className="section-head"><h3>Nearby Services</h3><button>View Map</button></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px 8px' }}>
          {[
            { name: 'Daily Wash – HSR Layout', dist: '0.3 km', rating: '4.9', open: true },
            { name: 'Daily Wash – Koramangala', dist: '1.2 km', rating: '4.8', open: true },
            { name: 'Daily Wash – Indiranagar', dist: '2.8 km', rating: '4.7', open: false },
          ].map(s => (
            <div key={s.name} className={styles.nearbyCard}>
              <div className={styles.nearbyIcon}>🚿</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A2E' }}>{s.name}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#9090B0' }}>📍 {s.dist}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#9090B0' }}>⭐ {s.rating}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: s.open ? '#00B469' : '#FF3B50',
                    background: s.open ? '#DFFFF0' : '#FFE8EA', borderRadius: 8, padding: '2px 7px' }}>
                    {s.open ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>
              <button className="clay-btn sm">Select</button>
            </div>
          ))}
        </div>

        <div style={{ padding: '4px 20px 8px' }}>
          <button className="clay-btn" onClick={() => navigate('/bookings')}>
            📍 Confirm This Location
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
