import { useState } from 'react';
import { Send } from 'lucide-react';
import { PARTNER } from '../data';
import { ClayInput } from '../components/ui';
import { Page, TopBar, L } from '../components/layout';
import s from './app.module.css';

const INITIAL = [
  { from: 'partner', text: 'Hello! I am on my way to your location. Should arrive in 10 minutes.' },
  { from: 'me',      text: 'Great, the car is in Basement P2 Slot 14.' },
  { from: 'partner', text: 'Got it, thank you! I will start as soon as I arrive.' },
];

export default function Chat() {
  const [msgs, setMsgs] = useState(INITIAL);
  const [text, setText] = useState('');

  const send = () => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: 'me', text: text.trim() }]);
    setText('');
  };

  return (
    <Page style={{ display: 'flex', flexDirection: 'column', paddingBottom: 90 }}>
      <TopBar title={PARTNER.name} subtitle="Service partner · online" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map((m, i) => {
          const mine = m.from === 'me';
          return (
            <div key={i} style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '11px 16px', borderRadius: mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: mine ? 'linear-gradient(150deg,#66B2FF,#2E7DE0)' : '#fff',
                color: mine ? '#fff' : '#233A56',
                boxShadow: mine
                  ? '0 8px 18px rgba(46,125,224,.35)'
                  : '6px 6px 14px rgba(120,165,210,.2),-4px -4px 10px rgba(255,255,255,.9)',
                fontFamily: 'Quicksand,sans-serif', fontWeight: 600, fontSize: 14, lineHeight: 1.5,
              }}>
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'fixed', bottom: 14, left: 0, right: 0, maxWidth: 480, margin: '0 auto', padding: '0 14px' }}>
        <div className={L.row} style={{ background: '#fff', borderRadius: 22, padding: '8px 8px 8px 16px', boxShadow: '0 10px 26px rgba(90,140,190,.28)' }}>
          <input
            style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontFamily: 'Quicksand,sans-serif', fontWeight: 600, fontSize: 15, color: '#233A56' }}
            placeholder="Type a message…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button
            onClick={send}
            style={{ width: 44, height: 44, borderRadius: 15, border: 'none', cursor: 'pointer', background: 'linear-gradient(150deg,#66B2FF,#2E7DE0)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 14px rgba(46,125,224,.4)', flexShrink: 0 }}
          >
            <Send size={19} />
          </button>
        </div>
      </div>
    </Page>
  );
}
