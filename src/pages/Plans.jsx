import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Settings2, PauseCircle,
  CalendarClock, CheckCircle2, Crown, Check, Info,
} from 'lucide-react';
import { useStore } from '../store';
import { PLANS, inr } from '../data';
import { ClayButton, ClayToggle } from '../components/ui';
import { Page, TopBar, Section } from '../components/layout';
import s from './app.module.css';

/* ─── helpers ─── */
const DAY_IDX   = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const DOW       = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MON_FULL  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MON_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function buildGrid(year, month) {
  const first = new Date(year, month, 1).getDay();
  const total = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= total; d++) cells.push(d);
  return cells;
}

function getUpcoming(startedDays = [], count = 6) {
  const dow = startedDays.map(d => DAY_IDX[d]);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const result = []; const cursor = new Date(today);
  for (let attempts = 0; result.length < count && attempts < 90; attempts++) {
    if (dow.includes(cursor.getDay())) result.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return result;
}

/* ─── main component ─── */
export default function Plans() {
  const nav = useNavigate();
  const { activePlan, subscription, setSubscription, togglePause, bookings } = useStore();

  const now        = new Date();
  const nowDate    = now.getDate();
  const nowMonth   = now.getMonth();
  const nowYear    = now.getFullYear();

  const [calYear,  setCalYear]  = useState(nowYear);
  const [calMonth, setCalMonth] = useState(nowMonth);
  const [skipped,  setSkipped]  = useState([]);
  const [showPlans, setShowPlans] = useState(false);

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1); };
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1); };

  const isCurrent = calYear === nowYear && calMonth === nowMonth;

  const selDOW     = (subscription.startedDays || []).map(d => DAY_IDX[d]);
  const grid       = buildGrid(calYear, calMonth);
  const upcoming   = getUpcoming(subscription.startedDays, 6);
  const completed  = bookings.filter(b => b.status === 'completed');

  const washesLeft    = activePlan ? (activePlan.washes - (subscription.washesUsed || 0)) : 0;
  const washProgress  = activePlan ? ((subscription.washesUsed || 0) / activePlan.washes) : 0;
  const slotLabel     = subscription.slot === 'morning' ? '7–10 AM' : '4–7 PM';

  const isWash  = d => d && selDOW.includes(new Date(calYear, calMonth, d).getDay());
  const isPast  = d => isCurrent ? d < nowDate : (calYear < nowYear || calMonth < nowMonth);
  const isToday = d => isCurrent && d === nowDate;

  const fmtDate  = d => `${DAY_SHORT[d.getDay()]}, ${d.getDate()} ${MON_SHORT[d.getMonth()]}`;
  const isoDate  = d => d.toISOString().split('T')[0];
  const toggleSkip = iso => setSkipped(c => c.includes(iso) ? c.filter(x => x !== iso) : [...c, iso]);

  if (!activePlan) return <PlanSelection onChoose={id => { setSubscription({ planId: id }); nav('/schedule'); }} />;

  return (
    <Page>
      <TopBar back={false} title="My Plan" />

      {/* ── Plan hero ── */}
      <div
        className={s.subCard}
        style={{ background: `linear-gradient(140deg,${activePlan.color}CC 0%,${activePlan.color} 100%)`, marginBottom: 22 }}
      >
        <div className={s.subTop}>
          <div className={s.subPlanTag}><activePlan.Icon size={20} />{activePlan.name} Plan</div>
          <span className={s.subPill}>{inr(activePlan.price)}/mo</span>
        </div>
        <div className={s.subMeta}>
          <div>
            <div className={s.subMetaLabel}>Washes left</div>
            <div className={s.subMetaVal}>{washesLeft} / {activePlan.washes}</div>
          </div>
          <div>
            <div className={s.subMetaLabel}>Days</div>
            <div className={s.subMetaVal} style={{ fontSize: 13 }}>
              {(subscription.startedDays || []).join(' · ')}
            </div>
          </div>
          <div>
            <div className={s.subMetaLabel}>Slot</div>
            <div className={s.subMetaVal}>{slotLabel}</div>
          </div>
        </div>
        <div className={s.subBar}>
          <div className={s.subBarFill} style={{ width: `${washProgress * 100}%` }} />
        </div>
        {subscription.paused && (
          <div style={{
            marginTop: 12, display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,.22)', borderRadius: 14, padding: '9px 14px',
          }}>
            <PauseCircle size={15} />
            <span style={{ fontSize: 12.5, fontWeight: 700 }}>Holiday mode active — washes paused</span>
          </div>
        )}
      </div>

      {/* ── Wash Calendar ── */}
      <Section title="Wash Calendar">
        <div style={{
          background: '#fff', borderRadius: 24, padding: '18px 16px',
          boxShadow: '8px 8px 20px rgba(120,165,210,.22),-6px -6px 14px rgba(255,255,255,.9)',
        }}>
          {/* month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <button
              onClick={prevMonth}
              style={{ width: 34, height: 34, borderRadius: 11, border: 'none', cursor: 'pointer', background: '#F0F7FF', color: '#4DA3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronLeft size={17} />
            </button>
            <span style={{ fontFamily: 'Fredoka,sans-serif', fontWeight: 600, fontSize: 17, color: '#233A56' }}>
              {MON_FULL[calMonth]} {calYear}
            </span>
            <button
              onClick={nextMonth}
              style={{ width: 34, height: 34, borderRadius: 11, border: 'none', cursor: 'pointer', background: '#F0F7FF', color: '#4DA3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={17} />
            </button>
          </div>

          {/* DOW header */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: 6 }}>
            {DOW.map((l, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#9DB4CE', paddingBottom: 6 }}>{l}</div>
            ))}
          </div>

          {/* day grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '5px 3px' }}>
            {grid.map((d, i) => {
              if (!d) return <div key={i} />;
              const wash    = isWash(d);
              const past    = isPast(d);
              const today   = isToday(d);
              return (
                <div
                  key={i}
                  style={{
                    height: 38, borderRadius: 10, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 2, position: 'relative',
                    background: today
                      ? 'linear-gradient(150deg,#66B2FF,#2E7DE0)'
                      : wash ? (past ? '#F4F8FF' : '#EBF5FF') : 'transparent',
                    border: wash && !today ? `1.5px solid ${past ? '#D4E8FF' : '#B8D8FF'}` : 'none',
                  }}
                >
                  <span style={{
                    fontSize: 12.5, fontWeight: today ? 700 : 600,
                    color: today ? '#fff' : wash ? (past ? '#9DB4CE' : '#2E7DE0') : '#BDD0E5',
                  }}>
                    {d}
                  </span>
                  {wash && !today && (
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: past ? '#9DB4CE' : '#4DA3FF' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* legend */}
          <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
            {[
              { bg: 'linear-gradient(150deg,#66B2FF,#2E7DE0)', label: 'Today' },
              { bg: '#EBF5FF', border: '#B8D8FF',              label: 'Upcoming wash' },
              { bg: '#F4F8FF', border: '#D4E8FF',              label: 'Past wash' },
            ].map(({ bg, border, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 4, background: bg, border: border ? `1.5px solid ${border}` : 'none', flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9DB4CE' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Upcoming Washes ── */}
      <Section title="Upcoming Washes">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {upcoming.map((d, i) => {
            const iso = isoDate(d);
            const isSkipped = skipped.includes(iso);
            return (
              <div key={iso} className={s.tile} style={{ opacity: isSkipped ? .5 : 1, transition: 'opacity .2s' }}>
                <span className={s.tileIcon} style={{ background: isSkipped ? '#F5F5F5' : '#EBF5FF', color: isSkipped ? '#9DB4CE' : '#4DA3FF' }}>
                  <CalendarClock size={22} />
                </span>
                <div className={s.tileBody}>
                  <div className={s.tileTitle} style={{ textDecoration: isSkipped ? 'line-through' : 'none' }}>
                    {fmtDate(d)}
                  </div>
                  <div className={s.tileSub}>
                    {isSkipped ? 'Skipped' : `${slotLabel} · ${activePlan.name} Plan`}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  {i === 0 && !isSkipped && (
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: '#34D399', background: '#EDFDF6', padding: '4px 9px', borderRadius: 999 }}>
                      Next
                    </span>
                  )}
                  <button
                    onClick={() => toggleSkip(iso)}
                    style={{
                      fontSize: 11.5, fontWeight: 700, border: 'none', cursor: 'pointer',
                      borderRadius: 10, padding: '6px 12px',
                      background: isSkipped ? '#EBF5FF' : '#FFF3F5',
                      color: isSkipped ? '#4DA3FF' : '#FF6B82',
                    }}
                  >
                    {isSkipped ? 'Undo' : 'Skip'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ── Wash History ── */}
      <Section title="Wash History">
        {completed.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px 0', color: '#9DB4CE', fontWeight: 600, fontSize: 14 }}>
            No completed washes yet
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {completed.map(b => (
              <div key={b.id} className={s.tile}>
                <span className={s.tileIcon} style={{ background: '#EDFDF6', color: '#34D399' }}>
                  <CheckCircle2 size={22} />
                </span>
                <div className={s.tileBody}>
                  <div className={s.tileTitle}>{b.title}</div>
                  <div className={s.tileSub}>{b.date} · {b.time} · {b.address}</div>
                </div>
                {b.rated && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#FFC857', background: '#FFFBEA', padding: '4px 9px', borderRadius: 999, flexShrink: 0 }}>
                    ★ Rated
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── Manage Subscription ── */}
      <Section title="Manage Subscription">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

          <button className={s.menuRow} onClick={() => nav('/schedule')}>
            <span className={s.menuIcon} style={{ background: '#EBF5FF', color: '#4DA3FF' }}><Settings2 size={20} /></span>
            <span className={s.menuLabel}>Change wash days &amp; time</span>
            <ChevronRight size={18} color="#9DB4CE" />
          </button>

          <div className={s.tile}>
            <span className={s.tileIcon} style={{ background: '#FFF3DC', color: '#FF9F1C' }}>
              <PauseCircle size={22} />
            </span>
            <div className={s.tileBody}>
              <div className={s.tileTitle} style={{ fontSize: 14.5 }}>Holiday mode</div>
              <div className={s.tileSub}>Pause all upcoming washes while you are away</div>
            </div>
            <ClayToggle checked={subscription.paused} onChange={togglePause} />
          </div>

          <button className={s.menuRow} onClick={() => setShowPlans(v => !v)}>
            <span className={s.menuIcon} style={{ background: '#F5F0FF', color: '#A78BFA' }}><Crown size={20} /></span>
            <span className={s.menuLabel}>Upgrade / change plan</span>
            <span style={{
              transform: showPlans ? 'rotate(90deg)' : 'none',
              transition: 'transform .2s ease',
              display: 'inline-flex', color: '#9DB4CE',
            }}>
              <ChevronRight size={18} />
            </span>
          </button>

        </div>
      </Section>

      {/* ── inline plan picker ── */}
      {showPlans && (
        <Section>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PLANS.map(p => {
              const active = subscription.planId === p.id;
              return (
                <div key={p.id} className={`${s.planCard} ${active ? s.planCardActive : ''}`}>
                  {p.popular && <span className={s.planTopRibbon}>★ POPULAR</span>}
                  <div className={s.planHead}>
                    <span className={s.planIcon} style={{ background: `${p.color}1F`, color: p.color }}><p.Icon size={24} /></span>
                    <div>
                      <div className={s.planName}>{p.name}</div>
                      <div className={s.planTag}>{p.tagline}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                      <div style={{ fontFamily: 'Fredoka,sans-serif', fontWeight: 600, fontSize: 19, color: '#233A56' }}>{inr(p.price)}</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#9DB4CE' }}>/month</div>
                    </div>
                  </div>
                  <div className={s.planTag} style={{ marginBottom: 12 }}>
                    {p.washes} washes · {p.perWeek} days a week
                  </div>
                  <div style={{ margin: '0 0 14px' }}>
                    {p.features.map(f => (
                      <div key={f} className={s.feat}>
                        <span className={s.featCheck} style={{ background: p.color }}><Check size={13} strokeWidth={3.5} /></span>
                        {f}
                      </div>
                    ))}
                  </div>
                  {active ? (
                    <div style={{ textAlign: 'center', padding: '10px', fontSize: 13, fontWeight: 700, color: '#4DA3FF', background: '#EBF5FF', borderRadius: 14 }}>
                      ✓ Current plan
                    </div>
                  ) : (
                    <ClayButton full onClick={() => { setSubscription({ planId: p.id }); nav('/schedule'); }}>
                      Switch to {p.name}
                    </ClayButton>
                  )}
                </div>
              );
            })}
          </div>
        </Section>
      )}

      <div style={{ height: 12 }} />
    </Page>
  );
}

/* ─── fallback when no plan chosen ─── */
function PlanSelection({ onChoose }) {
  return (
    <Page>
      <TopBar back={false} title="My Plan" subtitle="Choose a plan to get started" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {PLANS.map(p => (
          <div key={p.id} className={s.planCard}>
            {p.popular && <span className={s.planTopRibbon}>★ POPULAR</span>}
            <div className={s.planHead}>
              <span className={s.planIcon} style={{ background: `${p.color}1F`, color: p.color }}><p.Icon size={26} /></span>
              <div>
                <div className={s.planName}>{p.name}</div>
                <div className={s.planTag}>{p.tagline}</div>
              </div>
            </div>
            <div className={s.planPriceRow}>
              <span className={s.planPrice}>{inr(p.price)}</span>
              <span className={s.planPer}>/ month</span>
            </div>
            <div className={s.planTag} style={{ marginBottom: 8 }}>{p.washes} washes · {p.perWeek} days a week</div>
            <div style={{ margin: '10px 0 18px' }}>
              {p.features.map(f => (
                <div key={f} className={s.feat}>
                  <span className={s.featCheck} style={{ background: p.color }}><Check size={14} strokeWidth={3.5} /></span>
                  {f}
                </div>
              ))}
            </div>
            <ClayButton full onClick={() => onChoose(p.id)}>Choose {p.name}</ClayButton>
          </div>
        ))}
      </div>
      <Section>
        <div className={s.tile} style={{ background: '#EAF4FF', boxShadow: 'none' }}>
          <span className={s.tileIcon} style={{ background: '#fff', color: '#4DA3FF' }}><Info size={22} /></span>
          <div className={s.tileBody}>
            <div className={s.tileTitle} style={{ fontSize: 14 }}>Pause anytime</div>
            <div className={s.tileSub}>Going on a trip? Activate holiday mode and your washes wait for you.</div>
          </div>
        </div>
      </Section>
    </Page>
  );
}
