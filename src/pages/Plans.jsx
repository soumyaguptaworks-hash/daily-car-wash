import { useNavigate } from 'react-router-dom';
import { Check, Info } from 'lucide-react';
import { useStore } from '../store';
import { PLANS, inr } from '../data';
import { ClayButton } from '../components/ui';
import { Page, TopBar, Section } from '../components/layout';
import s from './app.module.css';

export default function Plans() {
  const nav = useNavigate();
  const { subscription, setSubscription } = useStore();

  const choose = (id) => { setSubscription({ planId: id }); nav('/schedule'); };

  return (
    <Page>
      <TopBar back={false} title="Subscription Plans" subtitle="Pick a plan that fits your routine" />

      <div className="col" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {PLANS.map((p) => {
          const isActive = subscription.planId === p.id;
          return (
            <div key={p.id} className={`${s.planCard} ${isActive ? s.planCardActive : ''}`}>
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
                {p.features.map((f) => (
                  <div key={f} className={s.feat}>
                    <span className={s.featCheck} style={{ background: p.color }}><Check size={14} strokeWidth={3.5} /></span>
                    {f}
                  </div>
                ))}
              </div>

              {isActive ? (
                <ClayButton full variant="soft" onClick={() => nav('/schedule')}>Manage schedule</ClayButton>
              ) : (
                <ClayButton full onClick={() => choose(p.id)}>Choose {p.name}</ClayButton>
              )}
            </div>
          );
        })}
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
