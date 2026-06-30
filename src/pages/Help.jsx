import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare, Phone, ChevronDown, ChevronUp,
  HelpCircle, ShieldCheck, RotateCcw, CreditCard,
  CalendarClock, Star,
} from 'lucide-react';
import { ClayButton } from '../components/ui';
import { Page, TopBar, Section } from '../components/layout';
import s from './app.module.css';

const FAQS = [
  {
    Icon: CalendarClock, color: '#4DA3FF',
    q: 'Can I reschedule or skip a wash?',
    a: 'Yes — go to My Plan, find the upcoming wash you want to skip, and tap "Skip". For a permanent schedule change, tap "Change wash days & time" in the Manage section.',
  },
  {
    Icon: RotateCcw, color: '#34D399',
    q: 'How do I pause my subscription?',
    a: 'Open My Plan → Manage Subscription → toggle "Holiday mode" on. Your washes are paused and your pack validity is extended for the same number of days.',
  },
  {
    Icon: CreditCard, color: '#A78BFA',
    q: 'What happens if I miss a wash?',
    a: 'Missed washes are not refunded or rescheduled automatically. You can request a makeup wash via the Book tab or reach our support team.',
  },
  {
    Icon: Star, color: '#FFC857',
    q: 'How do I rate my wash partner?',
    a: 'After a wash is marked complete you will see a "Rate" prompt in Activity. Honest ratings help us keep only the best partners on the platform.',
  },
  {
    Icon: ShieldCheck, color: '#FF8FB1',
    q: 'Is my car safe during the wash?',
    a: 'All our partners are background-verified and trained. We use scratch-free microfibre cloths and mild, car-safe products. Any damage claims are covered under our service guarantee.',
  },
  {
    Icon: HelpCircle, color: '#4DA3FF',
    q: 'How do I upgrade or change my plan?',
    a: 'Go to My Plan → Manage Subscription → Upgrade / change plan. The new plan takes effect from your next billing cycle. No charge for downgrading mid-cycle.',
  },
];

export default function Help() {
  const nav = useNavigate();
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(prev => prev === i ? null : i);

  return (
    <Page>
      <TopBar title="Help &amp; Support" />

      {/* contact cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 6 }}>
        <button
          onClick={() => nav('/chat')}
          style={{
            border: 'none', cursor: 'pointer', borderRadius: 22, padding: '20px 16px',
            background: 'linear-gradient(140deg,#66B2FF,#2E7DE0)',
            boxShadow: '0 12px 26px rgba(46,125,224,.4)',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MessageSquare size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Fredoka,sans-serif', fontWeight: 600, fontSize: 16, color: '#fff', lineHeight: 1.2 }}>
              Chat Support
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,.8)', marginTop: 3 }}>
              Typically replies in 2 min
            </div>
          </div>
        </button>

        <a
          href="tel:+918000123456"
          style={{
            textDecoration: 'none', borderRadius: 22, padding: '20px 16px',
            background: '#fff',
            boxShadow: '8px 8px 20px rgba(120,165,210,.22),-6px -6px 14px rgba(255,255,255,.9)',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 14, background: '#EDFDF6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Phone size={22} color="#34D399" />
          </div>
          <div>
            <div style={{ fontFamily: 'Fredoka,sans-serif', fontWeight: 600, fontSize: 16, color: '#233A56', lineHeight: 1.2 }}>
              Call Us
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: '#9DB4CE', marginTop: 3 }}>
              Mon–Sat · 8 AM – 8 PM
            </div>
          </div>
        </a>
      </div>

      {/* FAQ */}
      <Section title="Frequently Asked Questions">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  background: '#fff', borderRadius: 20, overflow: 'hidden',
                  boxShadow: '6px 6px 14px rgba(120,165,210,.2),-4px -4px 10px rgba(255,255,255,.9)',
                  border: isOpen ? `1.5px solid ${faq.color}44` : '1.5px solid transparent',
                  transition: 'border-color .2s ease',
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: '100%', border: 'none', background: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12, padding: '15px 16px',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                    background: `${faq.color}18`, color: faq.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <faq.Icon size={19} />
                  </span>
                  <span style={{ flex: 1, fontFamily: 'Fredoka,sans-serif', fontWeight: 500, fontSize: 15, color: '#233A56', lineHeight: 1.3 }}>
                    {faq.q}
                  </span>
                  <span style={{ color: '#9DB4CE', flexShrink: 0 }}>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 16px 16px 66px', fontSize: 13.5, fontWeight: 600, color: '#6E89A8', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* report issue */}
      <Section>
        <div className={s.tile} style={{ background: '#FFF7F0', boxShadow: 'none', border: '1.5px solid #FFE5CC' }}>
          <div className={s.tileBody}>
            <div className={s.tileTitle} style={{ fontSize: 14.5 }}>Still need help?</div>
            <div className={s.tileSub} style={{ marginBottom: 14 }}>
              Our support team is always ready to sort things out for you.
            </div>
            <ClayButton full onClick={() => nav('/chat')}>
              <MessageSquare size={17} /> Start a conversation
            </ClayButton>
          </div>
        </div>
      </Section>

      <div style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#9DB4CE', padding: '4px 0 8px' }}>
        Daily Car Wash Support · v1.0
      </div>
    </Page>
  );
}
