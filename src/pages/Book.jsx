import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Car, MapPin, Plus, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store';
import { SERVICE_GROUPS, ALL_SERVICES, TIME_SLOTS, inr } from '../data';
import { ClayButton, ClayChip, ClayCalendar } from '../components/ui';
import { Page, TopBar, Section, L } from '../components/layout';
import s from './app.module.css';

export default function Book() {
  const nav = useNavigate();
  const { state } = useLocation();
  const { vehicles, addresses, addBooking } = useStore();

  const now = new Date();
  const [cat, setCat] = useState('Exterior');
  const [svcId, setSvcId] = useState(state?.serviceId || 'foam');
  const [vehId, setVehId] = useState(vehicles[0]?.id);
  const [day, setDay] = useState(now.getDate());
  const [time, setTime] = useState('10:00');
  const [addrId, setAddrId] = useState(addresses[0]?.id);

  const svc = useMemo(() => ALL_SERVICES.find((x) => x.id === svcId), [svcId]);
  const catItems = SERVICE_GROUPS.find((g) => g.group === cat)?.items || [];

  const confirm = () => {
    const addr = addresses.find((a) => a.id === addrId);
    addBooking({
      kind: 'onetime', title: svc.name, vehicleId: vehId,
      date: `${day} ${now.toLocaleString('en-US', { month: 'short' })}`, time, address: addr?.label || 'Home', price: svc.price,
    });
    nav('/bookings');
  };

  return (
    <Page>
      <TopBar title="Book a Wash" subtitle="One-time service" />

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

      {/* summary */}
      <Section title="Summary">
        <div className={s.summary}>
          <div className={s.sumRow}>{svc?.name} <b>{inr(svc?.price || 0)}</b></div>
          <div className={s.sumRow}>Convenience fee <b>{inr(0)}</b></div>
          <div className={s.sumDivide} />
          <div className={`${s.sumRow} ${s.sumTotal}`}>Total <b>{inr(svc?.price || 0)}</b></div>
        </div>
      </Section>

      <Section>
        <ClayButton full onClick={confirm}><CheckCircle2 size={19} /> Confirm booking · {inr(svc?.price || 0)}</ClayButton>
      </Section>
    </Page>
  );
}
