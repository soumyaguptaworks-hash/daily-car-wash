import { useNavigate } from 'react-router-dom';
import { Car, Zap, Star, Bell, ArrowRight } from 'lucide-react';
import StatusBar from '../components/StatusBar';
import styles from './Splash.module.css';

const chips = [
  { icon: <Car size={15} />,  label: 'Doorstep' },
  { icon: <Zap size={15} />,  label: 'Same Day' },
  { icon: <Star size={15} />, label: 'Pro Teams' },
  { icon: <Bell size={15} />, label: 'Reminders' },
];

export default function Splash() {
  const navigate = useNavigate();
  return (
    <div className="phone-shell" style={{ background: '#EDE8FF' }}>
      <StatusBar />
      <div className="page-scroll" style={{ display: 'flex', flexDirection: 'column' }}>

        <div className={styles.hero}>
          <div className={styles.logoPill}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <circle cx="13" cy="13" r="13" fill="#FF6B2C"/>
              <path d="M7 17 Q13 7 19 17" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <circle cx="13" cy="10" r="2.5" fill="white"/>
            </svg>
            Daily Car Wash
          </div>

          <div className={styles.blob}>
            <svg viewBox="0 0 180 120" fill="none" className={styles.carSvg}>
              <rect x="12" y="65" width="156" height="38" rx="12" fill="white" opacity=".95"/>
              <path d="M45 65 Q62 34 90 31 Q118 34 135 65Z" fill="white" opacity=".95"/>
              <path d="M60 63 Q70 40 90 37 Q110 40 120 63Z" fill="#B8E4FF" opacity=".85"/>
              <circle cx="42" cy="103" r="15" fill="#2A2A3E"/>
              <circle cx="42" cy="103" r="8" fill="rgba(255,255,255,0.25)"/>
              <circle cx="138" cy="103" r="15" fill="#2A2A3E"/>
              <circle cx="138" cy="103" r="8" fill="rgba(255,255,255,0.25)"/>
              <ellipse cx="80" cy="20" rx="4" ry="6" fill="#7DCFFF" opacity=".8"/>
              <ellipse cx="100" cy="14" rx="3.5" ry="5.5" fill="#7DCFFF" opacity=".6"/>
              <ellipse cx="118" cy="22" rx="3" ry="4.5" fill="#7DCFFF" opacity=".7"/>
              {/* Star sparkles as SVG paths instead of emoji */}
              <path d="M22 48 L23.2 51.6 L27 52.4 L24.2 55 L24.9 58.8 L22 57 L19.1 58.8 L19.8 55 L17 52.4 L20.8 51.6Z" fill="white" opacity=".8"/>
              <path d="M152 44 L152.9 46.8 L156 47.4 L153.8 49.5 L154.4 52.6 L152 51.2 L149.6 52.6 L150.2 49.5 L148 47.4 L151.1 46.8Z" fill="white" opacity=".65"/>
              <path d="M74 6 L74.7 8.1 L77 8.6 L75.3 10.1 L75.7 12.5 L74 11.4 L72.3 12.5 L72.7 10.1 L71 8.6 L73.3 8.1Z" fill="white" opacity=".55"/>
            </svg>
          </div>

          <div className={styles.dots}>
            <span className={`${styles.dot} ${styles.active}`}/>
            <span className={styles.dot}/>
            <span className={styles.dot}/>
          </div>
        </div>

        <div className={styles.copy}>
          <h1>Keep It <span>Clean,</span><br/>Keep It Fresh.</h1>
          <p>Your car, always spotless —<br/>anytime, anywhere, at your doorstep.</p>
        </div>

        <div className={styles.chips}>
          {chips.map(({ icon, label }) => (
            <div key={label} className={styles.chip}>
              {icon}{label}
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <button className="clay-btn" onClick={() => navigate('/home')}>
            Continue <ArrowRight size={17} />
          </button>
          <button className="clay-btn outline" onClick={() => navigate('/home')}>Sign In</button>
        </div>
      </div>
    </div>
  );
}
