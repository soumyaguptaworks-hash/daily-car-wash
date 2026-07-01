import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, PauseCircle } from 'lucide-react';
import { useStore } from '../store';
import { DAYS, SLOTS, inr } from '../data';
import { ClayButton, ClayToggle } from '../components/ui';
import { Page, TopBar, Section, L } from '../components/layout';
import s from './app.module.css';

export default function Schedule() {
  const nav = useNavigate();
  const { activePlan, subscription, setSubscription, togglePause, vehicles, addresses } = useStore();
  const [days, setDays] = useState(subscription.startedDays || []);
  const [slot, setSlot] = useState(subscription.slot || 'morning');

  const notReady = vehicles.length === 0 || addresses.length === 0;

  const max = activePlan?.perWeek || 4;
  const toggleDay = (d) =>
    setDays((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : cur.length < max ? [...cur, d] : cur));

  const save = () => { if (notReady || days.length === 0) return; setSubscription({ startedDays: days, slot }); nav('/home'); };

  return (
    <Page>
      <TopBar title="Wash Schedule" subtitle={`${activePlan?.name} plan · choose up to ${max} days`} />

      <Section title="Preferred days">
        <div className={s.chipWrap}>
          {DAYS.map((d) => (
            <button
              key={d}
              className={`${s.dayChip} ${days.includes(d) ? s.dayChipOn : ''}`}
              onClick={() => toggleDay(d)}
            >
              {d}
            </button>
          ))}
        </div>
        <p className={L.tiny} style={{ marginTop: 10 }}>{days.length}/{max} days selected</p>
      </Section>

      <Section title="Preferred time slot">
        <div className={L.row}>
          {SLOTS.map((sl) => (
            <button
              key={sl.id}
              className={`${s.slotCard} ${slot === sl.id ? s.slotCardOn : ''}`}
              onClick={() => setSlot(sl.id)}
            >
              <div className={s.slotLabel}>{sl.label}</div>
              <div className={s.slotTime}>{sl.time}</div>
            </button>
          ))}
        </div>
      </Section>

      <Section title="Holiday mode">
        <div className={s.tile}>
          <span className={s.tileIcon} style={{ background: '#FFF3DC', color: '#FF9F1C' }}><PauseCircle size={22} /></span>
          <div className={s.tileBody}>
            <div className={s.tileTitle} style={{ fontSize: 14.5 }}>Pause subscription</div>
            <div className={s.tileSub}>Temporarily stop washes while you’re away</div>
          </div>
          <ClayToggle checked={subscription.paused} onChange={togglePause} />
        </div>
      </Section>

      {notReady && (
        <Section title="Before you start">
          <div className={L.col}>
            {vehicles.length === 0 && (
              <ClayButton full variant="soft" onClick={() => nav('/vehicles')}>Add your car</ClayButton>
            )}
            {addresses.length === 0 && (
              <ClayButton full variant="soft" onClick={() => nav('/addresses')}>Add an address</ClayButton>
            )}
          </div>
        </Section>
      )}

      <Section title="Summary">
        <div className={s.summary}>
          <div className={s.sumRow}>Plan <b>{activePlan?.name}</b></div>
          <div className={s.sumRow}>Washes / month <b>{activePlan?.washes}</b></div>
          <div className={s.sumRow}>Schedule <b>{days.join(', ') || '—'}</b></div>
          <div className={s.sumDivide} />
          <div className={`${s.sumRow} ${s.sumTotal}`}>Total <b>{inr(activePlan?.price || 0)}/mo</b></div>
        </div>
      </Section>

      <Section>
        <ClayButton full disabled={notReady || days.length === 0} onClick={save}><CalendarCheck size={19} /> Confirm subscription</ClayButton>
      </Section>
    </Page>
  );
}
