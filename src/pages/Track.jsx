import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MessageCircle, Star, CheckCircle2, Camera } from 'lucide-react';
import { useStore } from '../store';
import { TRACK_STEPS, PARTNER, inr } from '../data';
import { ClayButton } from '../components/ui';
import { StatusBadge, Stars } from '../components/bits';
import { Page, TopBar, Section, L } from '../components/layout';
import s from './app.module.css';

const STEP_KEYS = TRACK_STEPS.map((t) => t.key);

export default function Track() {
  const { id } = useParams();
  const nav = useNavigate();
  const { bookings, getVehicle } = useStore();
  const booking = bookings.find((b) => b.id === id);

  if (!booking) return (
    <Page>
      <TopBar title="Booking not found" />
    </Page>
  );

  const veh = getVehicle(booking.vehicleId);
  const curIdx = STEP_KEYS.indexOf(booking.status);
  const done = booking.status === 'completed';
  const active = ['assigned','reached','started'].includes(booking.status);

  const PHOTO_PAIRS = [
    { label: 'Before', bg: '#F0F4F8', emoji: '🚗' },
    { label: 'After',  bg: '#E8F8F0', emoji: '✨' },
  ];

  return (
    <Page>
      <TopBar title={booking.title} subtitle={`${veh?.model || 'Vehicle'} · ${booking.date} · ${booking.time}`} />

      {/* status */}
      <div style={{ marginBottom: 6 }}>
        <StatusBadge status={booking.status} />
      </div>

      {/* tracking steps */}
      <Section title="Live tracking">
        <div className={s.track}>
          {TRACK_STEPS.map((step, i) => {
            const isDone = i < curIdx;
            const isNow  = i === curIdx;
            const isFut  = i > curIdx;
            return (
              <div key={step.key} className={s.step}>
                {i < TRACK_STEPS.length - 1 && (
                  <span className={`${s.stepLine} ${isDone ? s.stepLineDone : ''}`} />
                )}
                <span className={`${s.stepDot} ${isDone ? s.stepDotDone : ''} ${isNow ? s.stepDotNow : ''}`}>
                  <step.Icon size={20} strokeWidth={2} />
                </span>
                <div>
                  <div className={`${s.stepTitle} ${isFut ? s.stepTitleMuted : ''}`}>{step.label}</div>
                  {isDone && <div className={s.stepTime}>Completed</div>}
                  {isNow  && <div className={s.stepTime}>Right now</div>}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* partner */}
      {(active || done) && (
        <Section title="Your partner">
          <div style={{ background: '#fff', borderRadius: 22, padding: 16, boxShadow: '7px 7px 16px rgba(120,165,210,.22),-5px -5px 12px rgba(255,255,255,.9)' }}>
            <div className={s.partner}>
              <span className={s.partnerAv}>{PARTNER.initials}</span>
              <div style={{ flex: 1 }}>
                <div className={s.partnerName}>{PARTNER.name}</div>
                <div className={s.partnerMeta}>
                  <Stars value={PARTNER.rating} size={13} showValue /> · {PARTNER.services} services
                </div>
              </div>
              <button className={s.circleBtn} aria-label="Call"><Phone size={19} /></button>
              <button className={s.circleBtn} aria-label="Chat" onClick={() => nav('/chat')}><MessageCircle size={19} /></button>
            </div>
          </div>
        </Section>
      )}

      {/* before / after photos */}
      {(active || done) && (
        <Section title="Photo verification">
          <div className={s.photoGrid}>
            {PHOTO_PAIRS.map((p) => (
              <div key={p.label} className={s.photo} style={{ background: p.bg }}>
                <span style={{ fontSize: 46 }}>{p.emoji}</span>
                <span className={s.photoTag}>{p.label}</span>
              </div>
            ))}
          </div>
          {done && (
            <div style={{ marginTop: 12 }}>
              <ClayButton full variant="soft">
                <Camera size={17} /> View all photos
              </ClayButton>
            </div>
          )}
        </Section>
      )}

      {/* rate (completed, not yet rated) */}
      {done && !booking.rated && (
        <Section title="Rate this service">
          <div style={{ background: '#fff', borderRadius: 22, padding: 18, textAlign: 'center', boxShadow: '7px 7px 16px rgba(120,165,210,.22),-5px -5px 12px rgba(255,255,255,.9)' }}>
            <div style={{ marginBottom: 14 }}>
              <Stars value={5} size={32} />
            </div>
            <ClayButton full>
              <Star size={17} /> Submit rating
            </ClayButton>
          </div>
        </Section>
      )}

      {done && (
        <Section>
          <ClayButton full variant="soft" onClick={() => nav('/book')}>
            <CheckCircle2 size={17} /> Book again
          </ClayButton>
        </Section>
      )}
    </Page>
  );
}
