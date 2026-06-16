import { useState } from 'react';
import { MapPin, Plus, Trash2, Home, Briefcase, Building2 } from 'lucide-react';
import { useStore } from '../store';
import { ClayButton, ClayInput } from '../components/ui';
import { Empty } from '../components/bits';
import { Page, TopBar, Section, L } from '../components/layout';
import s from './app.module.css';

const ICONS = { Home, Office: Briefcase, Apartment: Building2 };
const TYPES = ['Home', 'Office', 'Apartment'];

export default function Addresses() {
  const { addresses, addAddress, removeAddress } = useStore();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ label: 'Home', line: '', landmark: '', parking: '' });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.line) return;
    addAddress(form);
    setAdding(false);
    setForm({ label: 'Home', line: '', landmark: '', parking: '' });
  };

  return (
    <Page>
      <TopBar title="Saved Addresses" subtitle="Where we come to wash your car" />

      <Section>
        <div className={L.col}>
          {addresses.map((a) => {
            const Icon = ICONS[a.label] || MapPin;
            return (
              <div key={a.id} className={s.tile}>
                <span className={s.tileIcon} style={{ background: '#EAF4FF', color: '#4DA3FF' }}>
                  <Icon size={22} />
                </span>
                <div className={s.tileBody}>
                  <div className={s.tileTitle}>{a.label}</div>
                  <div className={s.tileSub}>{a.line}</div>
                  {a.landmark && <div className={s.tileSub} style={{ marginTop: 2 }}>Near {a.landmark}</div>}
                  {a.parking  && <div className={s.tileSub} style={{ marginTop: 2, color: '#A78BFA' }}>🅿 {a.parking}</div>}
                </div>
                <button className={s.circleBtn} style={{ color: '#FF6B82' }} onClick={() => removeAddress(a.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}

          {addresses.length === 0 && !adding && (
            <Empty icon={<MapPin size={32} />} title="No addresses saved">
              Add a location so we know where to come.
            </Empty>
          )}
        </div>
      </Section>

      {adding ? (
        <Section title="Add address">
          <div className={L.col}>
            <div>
              <span className={L.fieldLabel}>Type</span>
              <div style={{ display: 'flex', gap: 9 }}>
                {TYPES.map((t) => (
                  <button
                    key={t}
                    className={`${s.dayChip} ${form.label === t ? s.dayChipOn : ''}`}
                    style={{ width: 'auto', padding: '0 18px', fontSize: 13 }}
                    onClick={() => set('label', t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className={L.fieldLabel}>Full address</span>
              <ClayInput placeholder="Apartment, street, area" value={form.line} onChange={(e) => set('line', e.target.value)} />
            </div>
            <div>
              <span className={L.fieldLabel}>Landmark</span>
              <ClayInput placeholder="Near..." value={form.landmark} onChange={(e) => set('landmark', e.target.value)} />
            </div>
            <div>
              <span className={L.fieldLabel}>Parking instructions</span>
              <ClayInput placeholder="Basement P2, Slot 14" value={form.parking} onChange={(e) => set('parking', e.target.value)} />
            </div>
            <div className={L.row}>
              <ClayButton full onClick={save}>Save address</ClayButton>
              <ClayButton full variant="soft" onClick={() => setAdding(false)}>Cancel</ClayButton>
            </div>
          </div>
        </Section>
      ) : (
        <Section>
          <ClayButton full onClick={() => setAdding(true)}>
            <Plus size={18} /> Add address
          </ClayButton>
        </Section>
      )}
    </Page>
  );
}
