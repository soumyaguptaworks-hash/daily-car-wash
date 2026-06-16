import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import s from './clay.module.css';

/* tiny classnames helper */
const cx = (...a) => a.filter(Boolean).join(' ');

/* ── Kit wrapper: scopes the design tokens + font ── */
export function ClayKit({ children, className, style }) {
  return <div className={cx(s.kit, className)} style={style}>{children}</div>;
}

/* ── Card ── */
export function ClayCard({ children, tight, className, style, ...rest }) {
  return (
    <div className={cx(s.card, tight && s.cardTight, className)} style={style} {...rest}>
      {children}
    </div>
  );
}

/* ── Button ── */
export function ClayButton({ children, variant = 'primary', size, full, className, ...rest }) {
  return (
    <button
      className={cx(
        s.btn,
        variant === 'soft' && s.btnSoft,
        size === 'sm' && s.btnSm,
        size === 'lg' && s.btnLg,
        full && s.btnFull,
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ── Icon button / FAB ── */
export function ClayIconButton({ children, variant = 'primary', fab, className, ...rest }) {
  return (
    <button
      className={cx(s.iconBtn, fab && s.fab, variant === 'soft' && s.iconBtnSoft, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ── Badge ── */
export function ClayBadge({ children, color = '#4DA3FF', className }) {
  return (
    <span className={cx(s.badge, className)}>
      <span className={s.dot} style={{ background: color }} />
      {children}
    </span>
  );
}

/* ── Chip (segmented selection) ── */
export function ClayChip({ children, active, className, ...rest }) {
  return (
    <button className={cx(s.chip, active && s.chipActive, className)} {...rest}>
      {children}
    </button>
  );
}

/* ── Input field ── */
export function ClayInput({ icon, className, ...rest }) {
  return (
    <label className={cx(s.field, className)}>
      {icon}
      <input className={s.input} {...rest} />
    </label>
  );
}

/* ── Toggle ── */
export function ClayToggle({ checked, onChange }) {
  const [on, setOn] = useState(checked ?? false);
  const isOn = checked ?? on;
  return (
    <button
      role="switch"
      aria-checked={isOn}
      className={cx(s.toggle, isOn && s.toggleOn)}
      onClick={() => (onChange ? onChange(!isOn) : setOn(v => !v))}
    >
      <span className={s.knob} />
    </button>
  );
}

/* ── Checkbox ── */
export function ClayCheck({ checked, onChange }) {
  const [on, setOn] = useState(checked ?? false);
  const isOn = checked ?? on;
  return (
    <button
      role="checkbox"
      aria-checked={isOn}
      className={cx(s.check, isOn && s.checkOn)}
      onClick={() => (onChange ? onChange(!isOn) : setOn(v => !v))}
    >
      {isOn && <Check size={16} strokeWidth={3.5} />}
    </button>
  );
}

/* ── Progress ── */
export function ClayProgress({ value = 0 }) {
  return (
    <div className={s.progressTrack}>
      <div className={s.progressFill} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

/* ── Avatar ── */
export function ClayAvatar({ children, style }) {
  return <div className={s.avatar} style={style}>{children}</div>;
}

/* ── Tinted icon tile ── */
export function ClayTile({ children, color = '#4DA3FF', style }) {
  return (
    <div
      className={s.tile}
      style={{ background: `${color}22`, color, ...style }}
    >
      {children}
    </div>
  );
}

/* ── Mini calendar ── */
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export function ClayCalendar({ year, month, today, dotted = [], onSelect }) {
  // month: 0-indexed. Default to a static showcase month.
  const y = year ?? 2026;
  const m = month ?? 0;
  const [sel, setSel] = useState(today ?? 18);

  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const prevDays = new Date(y, m, 0).getDate();
  const monthName = new Date(y, m, 1).toLocaleString('en-US', { month: 'long' });

  const cells = [];
  for (let i = 0; i < first; i++) cells.push({ d: prevDays - first + 1 + i, mute: true });
  for (let d = 1; d <= days; d++) cells.push({ d, mute: false });
  while (cells.length % 7 !== 0) cells.push({ d: cells.length - (first + days) + 1, mute: true });

  return (
    <div className={s.cal}>
      <div className={s.calHead}>
        <button className={s.calNav}><ChevronLeft size={18} /></button>
        <span className={s.calTitle}>{monthName} {y}</span>
        <button className={s.calNav}><ChevronRight size={18} /></button>
      </div>
      <div className={s.calGrid}>
        {DOW.map((d, i) => <div key={i} className={s.calDow}>{d}</div>)}
        {cells.map((c, i) => (
          <button
            key={i}
            disabled={c.mute}
            onClick={() => { setSel(c.d); onSelect?.(c.d); }}
            className={cx(
              s.calCell,
              c.mute && s.calMute,
              !c.mute && c.d === sel && s.calToday,
              !c.mute && dotted.includes(c.d) && s.calDotted,
            )}
          >
            {c.d}
          </button>
        ))}
      </div>
    </div>
  );
}
