import { Star } from 'lucide-react';
import B from './bits.module.css';

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
