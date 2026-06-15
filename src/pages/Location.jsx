import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, Building2, ParkingSquare, Droplets,
  MapPin, Star, Plus, Check, Search, ArrowLeft, MoreHorizontal,
} from 'lucide-react';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import styles from './Location.module.css';

const saved = [
  { icon: <Home size={20} />,          label: 'Home',      address: '12A, 3rd Floor, HSR Layout, Bengaluru – 560102', detail: 'Near Agara Lake Gate' },
  { icon: <Building2 size={20} />,     label: 'Office',    address: 'WeWork Galaxy, Residency Road, Bengaluru – 560025', detail: 'Tower B, Ground Floor' },
  { icon: <ParkingSquare size={20} />, label: 'Apartment', address: 'Salarpuria Sattva, Whitefield, Bengaluru – 560066', detail: 'Block C, Basement Parking' },
];

const nearby = [
  { name: 'Daily Wash – HSR Layout',    dist: '0.3 km', rating: '4.9', open: true },
  { name: 'Daily Wash – Koramangala',   dist: '1.2 km', rating: '4.8', open: true },
  { name: 'Daily Wash – Indiranagar',   dist: '2.8 km', rating: '4.7', open: false },
];

export default function Location() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="phone-shell">
      <StatusBar />
      <div className="page-scroll">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate('/home')}><ArrowLeft size={18} /></button>
          <h2>My Locations</h2>
          <button className="menu-btn"><MoreHorizontal size={18} /></button>
        </div>

        {/* Map placeholder */}
        <div className={styles.mapWrap}>
          <div className={styles.mapPlaceholder}>
            <div className={styles.mapGrid}/>
            <div className={styles.mapPin}>
              <div className={styles.pinDot}/>
              <div className={styles.pinRing}/>
              <div className={styles.pinShadow}/>
            </div>
            <div className={styles.mapLabel}>
              <MapPin size={12} color="#FF6B2C" /> 12A, HSR Layout
            </div>
            <div className={styles.nearbyPin} style={{ top: '30%', left: '25%' }}>
              <Droplets size={16} color="#FF6B2C" />
            </div>
            <div className={styles.nearbyPin} style={{ top: '55%', right: '20%' }}>
              <Droplets size={16} color="#FF6B2C" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '0 20px 6px', position: 'relative' }}>
          <Search style={{ position: 'absolute', left: 34, top: '50%', transform: 'translateY(-50%)' }} size={18} color="#9090B0" />
          <input className="clay-input" style={{ paddingLeft: 44 }} placeholder="Search area or landmark…" />
        </div>

        {/* Saved addresses */}
        <div className="section-head"><h3>Saved Addresses</h3></div>
        <div className={styles.addressList}>
          {saved.map((a, i) => (
            <div
              key={a.label}
              className={`${styles.addressCard} ${selected === i ? styles.selectedCard : ''}`}
              onClick={() => setSelected(i)}
            >
              <div className={styles.addrIcon} style={{
                background: selected === i ? '#FF6B2C' : '#F0ECFF',
                color: selected === i ? '#fff' : '#7B5CFF',
              }}>
                {a.icon}
              </div>
              <div className={styles.addrInfo}>
                <div className={styles.addrLabel}>{a.label}</div>
                <div className={styles.addrMain}>{a.address}</div>
                <div className={styles.addrSub}>{a.detail}</div>
              </div>
              {selected === i && (
                <div className={styles.checkMark}><Check size={13} strokeWidth={3} color="#fff" /></div>
              )}
            </div>
          ))}

          <button className={styles.addNew}>
            <div className={styles.addIcon}><Plus size={22} color="#FF6B2C" /></div>
            <span>Add New Address</span>
          </button>
        </div>

        {/* Nearby services */}
        <div className="section-head"><h3>Nearby Services</h3><button>View Map</button></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 20px 8px' }}>
          {nearby.map(s => (
            <div key={s.name} className={styles.nearbyCard}>
              <div className={styles.nearbyServiceIcon}>
                <Droplets size={24} color="#FF6B2C" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1A1A2E' }}>{s.name}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 4, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#9090B0', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <MapPin size={10} /> {s.dist}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#9090B0', display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Star size={10} fill="#FFB800" color="#FFB800" /> {s.rating}
                  </span>
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
            <MapPin size={16} /> Confirm This Location
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
