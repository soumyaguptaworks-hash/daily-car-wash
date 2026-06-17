import { Star } from 'lucide-react';
import B from './bits.module.css';

/* ── Claymorphic car SVG graphic ── */
export function ClayCarSVG({ width = 280, style, uid = 'car' }) {
  const p = uid;
  return (
    <svg width={width} viewBox="0 0 280 152" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <linearGradient id={`${p}-body`} x1="140" y1="66" x2="140" y2="118" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7FC9FF"/><stop offset="1" stopColor="#2A7DE0"/>
        </linearGradient>
        <linearGradient id={`${p}-roof`} x1="140" y1="16" x2="140" y2="66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#B8DDFF"/><stop offset="1" stopColor="#57B4FF"/>
        </linearGradient>
        <linearGradient id={`${p}-win`} x1="140" y1="18" x2="140" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#DAEEFF" stopOpacity="0.96"/><stop offset="1" stopColor="#A2CCFF" stopOpacity="0.84"/>
        </linearGradient>
        <linearGradient id={`${p}-tyre`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#3D4D62"/><stop offset="1" stopColor="#1C2230"/>
        </linearGradient>
        <linearGradient id={`${p}-hub`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#D6EAF8"/><stop offset="1" stopColor="#A8C4D8"/>
        </linearGradient>
        <filter id={`${p}-fshadow`} x="-20%" y="-30%" width="140%" height="170%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#1A5DC0" floodOpacity="0.32"/>
        </filter>
        <filter id={`${p}-wshadow`} x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0A1535" floodOpacity="0.28"/>
        </filter>
      </defs>

      {/* ground shadow */}
      <ellipse cx="140" cy="148" rx="108" ry="6" fill="rgba(42,125,224,0.16)"/>

      {/* rear tyre */}
      <circle cx="76" cy="118" r="24" fill={`url(#${p}-tyre)`} filter={`url(#${p}-wshadow)`}/>
      <circle cx="76" cy="118" r="15" fill={`url(#${p}-hub)`}/>
      <circle cx="76" cy="118" r="6" fill="#EAF4FF"/>
      <circle cx="76" cy="118" r="2.5" fill="#B8CCD8"/>
      <line x1="76" y1="103" x2="76" y2="133" stroke="rgba(175,200,220,0.6)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="61" y1="118" x2="91" y2="118" stroke="rgba(175,200,220,0.6)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="66" y1="107" x2="86" y2="129" stroke="rgba(175,200,220,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="86" y1="107" x2="66" y2="129" stroke="rgba(175,200,220,0.45)" strokeWidth="1.5" strokeLinecap="round"/>

      {/* front tyre */}
      <circle cx="204" cy="118" r="24" fill={`url(#${p}-tyre)`} filter={`url(#${p}-wshadow)`}/>
      <circle cx="204" cy="118" r="15" fill={`url(#${p}-hub)`}/>
      <circle cx="204" cy="118" r="6" fill="#EAF4FF"/>
      <circle cx="204" cy="118" r="2.5" fill="#B8CCD8"/>
      <line x1="204" y1="103" x2="204" y2="133" stroke="rgba(175,200,220,0.6)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="189" y1="118" x2="219" y2="118" stroke="rgba(175,200,220,0.6)" strokeWidth="2" strokeLinecap="round"/>
      <line x1="194" y1="107" x2="214" y2="129" stroke="rgba(175,200,220,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="214" y1="107" x2="194" y2="129" stroke="rgba(175,200,220,0.45)" strokeWidth="1.5" strokeLinecap="round"/>

      {/* car body */}
      <rect x="18" y="68" width="244" height="52" rx="26" fill={`url(#${p}-body)`} filter={`url(#${p}-fshadow)`}/>

      {/* roof */}
      <path d="M66,68 Q70,22 100,17 L185,17 Q212,22 216,68 Z" fill={`url(#${p}-roof)`}/>

      {/* rear window */}
      <path d="M72,65 Q76,28 102,21 L148,21 L146,65 Z" fill={`url(#${p}-win)`}/>
      {/* centre pillar */}
      <rect x="148" y="21" width="4" height="44" rx="2" fill="rgba(40,85,165,0.30)"/>
      {/* front window */}
      <path d="M154,21 L183,21 Q209,24 212,65 L154,65 Z" fill={`url(#${p}-win)`}/>

      {/* body top highlight */}
      <rect x="26" y="72" width="228" height="15" rx="9" fill="rgba(255,255,255,0.26)"/>
      {/* roof highlight */}
      <ellipse cx="140" cy="34" rx="48" ry="9" fill="rgba(255,255,255,0.28)"/>

      {/* door handle */}
      <rect x="124" y="88" width="22" height="7" rx="3.5" fill="rgba(255,255,255,0.52)"/>
      {/* door seam */}
      <line x1="150" y1="70" x2="150" y2="118" stroke="rgba(30,70,155,0.15)" strokeWidth="1.5"/>

      {/* headlight */}
      <rect x="246" y="78" width="13" height="22" rx="6.5" fill="#FFF6A5" opacity="0.92"/>
      <rect x="247" y="79" width="5" height="10" rx="2.5" fill="rgba(255,255,255,0.75)"/>

      {/* taillight */}
      <rect x="21" y="78" width="11" height="22" rx="5.5" fill="#FF8090" opacity="0.88"/>

      {/* side mirror */}
      <rect x="213" y="54" width="15" height="9" rx="4" fill="#57B4FF" opacity="0.88"/>

      {/* wheel arch shadow */}
      <ellipse cx="76"  cy="93" rx="25" ry="5" fill="rgba(15,50,130,0.14)"/>
      <ellipse cx="204" cy="93" rx="25" ry="5" fill="rgba(15,50,130,0.14)"/>

      {/* soap bubbles — car wash touch */}
      <circle cx="252" cy="28" r="9"   fill="rgba(191,224,255,0.72)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
      <circle cx="265" cy="50" r="6"   fill="rgba(191,224,255,0.60)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
      <circle cx="24"  cy="40" r="7.5" fill="rgba(191,224,255,0.68)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
      <circle cx="14"  cy="58" r="5"   fill="rgba(191,224,255,0.55)" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
    </svg>
  );
}

export const STATUS = {
  requested: { label: 'Requested', color: '#4DA3FF' },
  assigned:  { label: 'Partner assigned', color: '#4DA3FF' },
  reached:   { label: 'Reached', color: '#FFB020' },
  started:   { label: 'In progress', color: '#FFB020' },
  completed: { label: 'Completed', color: '#16B47B' },
  cancelled: { label: 'Cancelled', color: '#FF6B82' },
};

export function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.requested;
  return (
    <span className={B.badge} style={{ color: s.color, background: `${s.color}1F` }}>
      <span className={B.dot} />{s.label}
    </span>
  );
}

export function Stars({ value = 5, size = 14, showValue }) {
  return (
    <span className={B.stars}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          fill={n <= Math.round(value) ? '#FFC857' : 'none'}
          color={n <= Math.round(value) ? '#FFC857' : '#CBD9E8'}
          strokeWidth={2}
        />
      ))}
      {showValue && <span className={B.starsVal}>{value}</span>}
    </span>
  );
}

export function Empty({ icon, title, children }) {
  return (
    <div className={B.empty}>
      <div className={B.emptyIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}
