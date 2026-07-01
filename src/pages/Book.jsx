import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Car, MapPin, Plus, CheckCircle2, Ticket, X, ChevronRight, BadgePercent } from 'lucide-react';
import { useStore } from '../store';
import { SERVICE_GROUPS, ALL_SERVICES, TIME_SLOTS, PLANS, COUPONS, applyCoupon, inr } from '../data';
import { ClayButton, ClayChip, ClayCalendar } from '../components/ui';
import { Page, TopBar, Section, L } from '../components/layout';
import s from './app.module.css';

export default function Book() {
  const nav = useNavigate();
  const { state } = useLocation();
  const { vehicles, addresses, addBooking, activePlan } = useStore();
  const minPlanPrice = Math.min(...PLANS.map((p) => p.price));

  const now = new Date();
  const [cat, setCat] = useState('Exterior');
  const [svcId, setSvcId] = useState(state?.serviceId || 'foam');
  const [vehId, setVehId] = useState(vehicles[0]?.id);
  const [day, setDay] = useState(now.getDate());
  const [time, setTime] = useState('10:00');
  const [addrId, setAddrId] = useState(addresses[0]?.id);

  const svc = useMemo(() => ALL_SERVICES.find((x) => x.id === svcId), [svcId]);
  const catItems = SERVICE_GROUPS.find((g) => g.group === cat)?.items || [];

  /* ── coupon state ── */
  const price = svc?.price || 0;
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState(null); // { code, discount, message }
  const [couponErr, setCouponErr] = useState('');

  const apply = (raw) => {
    const r = applyCoupon(raw, price);
    if (r.ok) {
      setApplied({ code: raw.trim().toUpperCase(), discount: r.discount, message: r.message });
      setCode(raw.trim().toUpperCase());
      setCouponErr('');
    } else {
      setApplied(null);
      setCouponErr(r.message || 'Invalid coupon code');
    }
  };

  const removeCoupon = () => { setApplied(null); setCode(''); setCouponErr(''); };

  const discount = applied?.discount || 0;
  const total = Math.max(0, price - discount);

  const needsVehicle = vehicles.length === 0;
  const needsAddress = addresses.length === 0;
  const notReady = needsVehicle || needsAddress;

  const confirm = () => {
    if (notReady) return;
    const addr = addresses.find((a) => a.id === addrId);
    addBooking({
      kind: 'onetime', title: svc.name, vehicleId: vehId,
      date: `${day} ${now.toLocaleString('en-US', { month: 'short' })}`, time, address: addr?.label || 'Home',
      price: total, coupon: applied?.code || null, discount,
    });
    nav('/bookings');
  };

  return (
    <Page>
      <TopBar title="Book a Wash" subtitle="One-time service" />

      {/* monthly-pack promo — only for non-subscribers */}
      {!activePlan && (
        <button className={s.planPromo} onClick={() => nav('/plans')}>
          <span className={s.planPromoIcon}><BadgePercent size={22} /></span>
          <span style={{ flex: 1, textAlign: 'left' }}>
            <span className={s.planPromoTitle}>Wash more, pay less</span>
            <span className={s.planPromoSub}>Go monthly from {inr(minPlanPrice)} · save up to 40% vs one-time washes</span>
          </span>
          <span className={s.planPromoCta}>View plans <ChevronRight size={15} /></span>
        </button>
      )}

      {/* before-you-book gate */}
      {notReady && (
        <div className={s.tile} style={{ marginBottom: 18, flexDirection: 'column', alignItems: 'stretch', gap: 12 }}>
          <div className={s.tileTitle}>Before you book</div>
          {needsVehicle && (
            <ClayButton full variant="soft" onClick={() => nav('/vehicles')}>
              <Car size={18} /> Add your car
            </ClayButton>
          )}
          {needsAddress && (
            <ClayButton full variant="soft" onClick={() => nav('/addresses')}>
              <MapPin size={18} /> Add an address
            </ClayButton>
          )}
        </div>
      )}

      {/* category + service */}
      <Section title="Choose a service">
        <div className={`${L.row} ${L.wrap}`} style={{ marginBottom: 14 }}>
          {SERVICE_GROUPS.map((g) => (
            <ClayChip key={g.group} active={cat === g.group} onClick={() => setCat(g.group)}>{g.group}</ClayChip>
          ))}
        </div>
        <div className={L.grid2}>
          {catItems.map((it) => {
            const on = svcId === it.id;
            return (
              <button
                key={it.id}
                onClick={() => setSvcId(it.id)}
                className={s.planCard}
                style={{ padding: 15, textAlign: 'left', cursor: 'pointer', borderColor: on ? 'var(--c-blue)' : 'transparent' }}
              >
                <span className={s.svcIcon} style={{ background: `${svc?.color || '#4DA3FF'}1F`, color: it.color || '#4DA3FF', marginBottom: 10, width: 42, height: 42 }}>
                  <it.Icon size={21} />
                </span>
                <div className={s.svcName} style={{ fontSize: 14 }}>{it.name}</div>
                <div className={s.svcMeta}>{it.time}</div>
                <div className={s.svcPrice} style={{ fontSize: 15, marginTop: 6 }}>{inr(it.price)}</div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* vehicle */}
      <Section title="Select vehicle" action="Add" onAction={() => nav('/vehicles')}>
        <div className={`${L.row} ${L.wrap}`}>
          {vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => setVehId(v.id)}
              className={s.slotCard}
              style={{ flex: 'unset', display: 'flex', alignItems: 'center', gap: 10, ...(vehId === v.id ? { boxShadow: '0 0 0 2.5px var(--c-blue)', background: '#fff' } : {}) }}
            >
              <span style={{ color: v.colorHex }}><Car size={20} /></span>
              <span>
                <div className={s.slotLabel} style={{ fontSize: 14 }}>{v.model}</div>
                <div className={s.slotTime}>{v.plate}</div>
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* date */}
      <Section title="Pick a date">
        <div style={{ background: '#fff', borderRadius: 24, padding: 16, boxShadow: '7px 7px 16px rgba(120,165,210,.22), -5px -5px 12px rgba(255,255,255,.9)' }}>
          <ClayCalendar year={now.getFullYear()} month={now.getMonth()} today={day} onSelect={setDay} />
        </div>
      </Section>

      {/* time */}
      <Section title="Time slot">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
          {TIME_SLOTS.map((t) => (
            <button key={t} className={`${s.timeChip} ${time === t ? s.timeChipOn : ''}`} onClick={() => setTime(t)}>{t}</button>
          ))}
        </div>
      </Section>

      {/* address */}
      <Section title="Service address" action="Manage" onAction={() => nav('/addresses')}>
        <div className={L.col}>
          {addresses.map((a) => (
            <button
              key={a.id}
              onClick={() => setAddrId(a.id)}
              className={s.tile}
              style={{ textAlign: 'left', cursor: 'pointer', ...(addrId === a.id ? { boxShadow: '0 0 0 2.5px var(--c-blue), 7px 7px 16px rgba(120,165,210,.2)' } : {}) }}
            >
              <span className={s.tileIcon} style={{ background: '#EAF4FF', color: '#4DA3FF' }}><MapPin size={20} /></span>
              <div className={s.tileBody}>
                <div className={s.tileTitle} style={{ fontSize: 14.5 }}>{a.label}</div>
                <div className={s.tileSub}>{a.line}</div>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* coupon */}
      <Section title="Apply coupon">
        {applied ? (
          <div className={s.couponApplied}>
            <span className={s.couponTicket}><Ticket size={20} /></span>
            <div className={s.couponInfo}>
              <div className={s.couponCodeOn}>{applied.code} applied</div>
              <div className={s.couponSaved}>You save {inr(applied.discount)} · {applied.message}</div>
            </div>
            <button className={s.couponRemove} onClick={removeCoupon} aria-label="Remove coupon"><X size={16} /></button>
          </div>
        ) : (
          <>
            <div className={s.couponField}>
              <span className={s.couponTicket}><Ticket size={18} /></span>
              <input
                className={s.couponInput}
                placeholder="Enter coupon code"
                value={code}
                onChange={(e) => { setCode(e.target.value.toUpperCase()); setCouponErr(''); }}
                onKeyDown={(e) => { if (e.key === 'Enter') apply(code); }}
              />
              <button className={s.couponApply} onClick={() => apply(code)} disabled={!code.trim()}>Apply</button>
            </div>
            {couponErr && <div className={s.couponErr}>{couponErr}</div>}

            {/* tappable available coupons */}
            <div className={L.col} style={{ marginTop: 12, gap: 8 }}>
              {COUPONS.map((c) => (
                <button key={c.code} className={s.couponOffer} onClick={() => apply(c.code)}>
                  <span className={s.couponOfferCode}>{c.code}</span>
                  <span className={s.couponOfferLabel}>{c.label}</span>
                  <ChevronRight size={16} color="#9DB4CE" />
                </button>
              ))}
            </div>
          </>
        )}
      </Section>

      {/* summary */}
      <Section title="Summary">
        <div className={s.summary}>
          <div className={s.sumRow}>{svc?.name} <b>{inr(price)}</b></div>
          {discount > 0 && (
            <div className={s.sumRow} style={{ color: '#16B47B' }}>
              Coupon ({applied.code}) <b style={{ color: '#16B47B' }}>−{inr(discount)}</b>
            </div>
          )}
          <div className={s.sumRow}>Convenience fee <b>{inr(0)}</b></div>
          <div className={s.sumDivide} />
          <div className={`${s.sumRow} ${s.sumTotal}`}>Total <b>{inr(total)}</b></div>
        </div>
      </Section>

      <Section>
        <ClayButton full disabled={notReady} onClick={confirm}><CheckCircle2 size={19} /> {notReady ? `Add ${needsVehicle && needsAddress ? 'car & address' : needsVehicle ? 'a car' : 'an address'} to book` : `Confirm booking · ${inr(total)}`}</ClayButton>
      </Section>
    </Page>
  );
}
