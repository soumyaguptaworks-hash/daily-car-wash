import { useNavigate } from 'react-router-dom';
import { Wallet as WalletIcon, Gift, Users, Tag, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useStore } from '../store';
import { OFFERS, inr } from '../data';
import { ClayButton } from '../components/ui';
import { Page, TopBar, Section, L } from '../components/layout';
import s from './app.module.css';

const TXNS = [
  { id: 't1', label: 'Cashback — Medium Plan',    amount: +80,  date: '14 Jun', type: 'credit' },
  { id: 't2', label: 'Foam Wash payment',          amount: -349, date: '12 Jun', type: 'debit'  },
  { id: 't3', label: 'Referral reward',            amount: +100, date: '10 Jun', type: 'credit' },
  { id: 't4', label: 'Premium Detailing payment',  amount: -1499,date: '8 Jun',  type: 'debit'  },
  { id: 't5', label: 'First-booking promo credit', amount: +150, date: '5 Jun',  type: 'credit' },
];

export default function Wallet() {
  const { wallet } = useStore();
  const nav = useNavigate();

  return (
    <Page>
      <TopBar title="Wallet & Rewards" />

      {/* balance card */}
      <div className={s.subCard} style={{ marginBottom: 6 }}>
        <div className={s.subTop}>
          <span className={s.subPlanTag}><WalletIcon size={19} /> DCW Wallet</span>
          <span className={s.subPill}>Active</span>
        </div>
        <div style={{ marginTop: 18 }}>
          <div className={s.subMetaLabel}>Available balance</div>
          <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 36, marginTop: 4 }}>
            {inr(wallet)}
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <ClayButton variant="soft" style={{ background: 'rgba(255,255,255,.25)', color: '#fff', boxShadow: 'none' }}>
            Add money
          </ClayButton>
        </div>
      </div>

      {/* quick actions */}
      <Section>
        <div className={L.grid2}>
          {[
            { Icon: Gift,  label: 'Redeem code', color: '#A78BFA', to: '/home' },
            { Icon: Users, label: 'Refer & earn', color: '#34D399', to: '/home' },
          ].map((it) => (
            <button key={it.label} className={s.tile} style={{ flexDirection: 'column', alignItems: 'flex-start', cursor: 'pointer', gap: 10 }} onClick={() => nav(it.to)}>
              <span className={s.tileIcon} style={{ background: `${it.color}1F`, color: it.color }}>
                <it.Icon size={22} />
              </span>
              <span className={s.tileTitle} style={{ fontSize: 14 }}>{it.label}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* offers */}
      <Section title="Available offers">
        <div className={L.col}>
          {OFFERS.map((o) => (
            <div key={o.id} className={s.tile}>
              <span className={s.tileIcon} style={{ background: `${o.color}1F`, color: o.color }}><Tag size={22} /></span>
              <div className={s.tileBody}>
                <div className={s.tileTitle}>{o.title} · {o.sub}</div>
                <div className={s.tileSub}>Code: <b style={{ color: o.color }}>{o.code}</b></div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* transactions */}
      <Section title="Transactions">
        <div className={L.col}>
          {TXNS.map((t) => (
            <div key={t.id} className={s.tile}>
              <span className={s.tileIcon} style={{
                background: t.type === 'credit' ? '#E8F8F0' : '#FFF0F3',
                color: t.type === 'credit' ? '#16B47B' : '#FF6B82',
              }}>
                {t.type === 'credit' ? <ArrowDownLeft size={22} /> : <ArrowUpRight size={22} />}
              </span>
              <div className={s.tileBody}>
                <div className={s.tileTitle} style={{ fontSize: 14 }}>{t.label}</div>
                <div className={s.tileSub}>{t.date}</div>
              </div>
              <span className={s.tilePrice} style={{ color: t.type === 'credit' ? '#16B47B' : '#FF6B82' }}>
                {t.type === 'credit' ? '+' : ''}{inr(t.amount)}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </Page>
  );
}
