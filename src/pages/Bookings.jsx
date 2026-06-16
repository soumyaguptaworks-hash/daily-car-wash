import { useNavigate } from 'react-router-dom';
import { CalendarClock, ChevronRight, Car } from 'lucide-react';
import { useStore } from '../store';
import { inr } from '../data';
import { StatusBadge } from '../components/bits';
import { Page, TopBar, Section, L } from '../components/layout';
import { Empty } from '../components/bits';
import s from './app.module.css';

export default function Bookings() {
  const nav = useNavigate();
  const { bookings, getVehicle } = useStore();

  const active = bookings.filter((b) => ['requested','assigned','reached','started'].includes(b.status));
  const past   = bookings.filter((b) => ['completed','cancelled'].includes(b.status));

  return (
    <Page>
      <TopBar back={false} title="Activity" subtitle="All your bookings in one place" />

      {active.length > 0 && (
        <Section title="Active">
          <div className={L.col}>
            {active.map((b) => <BookingTile key={b.id} b={b} veh={getVehicle(b.vehicleId)} onPress={() => nav(`/track/${b.id}`)} />)}
          </div>
        </Section>
      )}

      {past.length > 0 && (
        <Section title="Completed">
          <div className={L.col}>
            {past.map((b) => <BookingTile key={b.id} b={b} veh={getVehicle(b.vehicleId)} onPress={() => nav(`/track/${b.id}`)} />)}
          </div>
        </Section>
      )}

      {bookings.length === 0 && (
        <Empty icon={<CalendarClock size={34} />} title="No bookings yet">
          Book your first wash and keep your car sparkling.
        </Empty>
      )}
    </Page>
  );
}

function BookingTile({ b, veh, onPress }) {
  return (
    <div className={s.tile} onClick={onPress} role="button" style={{ cursor: 'pointer' }}>
      <span className={s.tileIcon} style={{ background: '#EAF4FF', color: '#4DA3FF' }}>
        <Car size={22} />
      </span>
      <div className={s.tileBody}>
        <div className={s.tileTitle}>{b.title}</div>
        <div className={s.tileSub}>
          {veh?.model} · {b.date} · {b.time}
        </div>
        <div style={{ marginTop: 6 }}>
          <StatusBadge status={b.status} />
        </div>
      </div>
      <div className={s.tileRight}>
        {b.price > 0 && <span className={s.tilePrice}>{inr(b.price)}</span>}
        <ChevronRight size={18} color="#9DB4CE" />
      </div>
    </div>
  );
}
