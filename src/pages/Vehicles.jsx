import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store';
import { VEHICLE_TYPES } from '../data';
import { ClayButton, ClayInput } from '../components/ui';
import { Empty } from '../components/bits';
import { Page, TopBar, Section, L } from '../components/layout';
import s from './app.module.css';

export default function Vehicles() {
  const nav = useNavigate();
  const { vehicles, addVehicle, removeVehicle } = useStore();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ brand: '', model: '', type: 'Sedan', plate: '', color: 'White' });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.brand || !form.model) return;
    addVehicle({ ...form, colorHex: '#4DA3FF' });
    setAdding(false);
    setForm({ brand: '', model: '', type: 'Sedan', plate: '', color: 'White' });
  };

  return (
    <Page>
      <TopBar title="My Vehicles" subtitle="Saved cars for doorstep service" />

      <Section>
        <div className={L.col}>
          {vehicles.map((v) => (
            <div key={v.id} className={s.tile}>
              <span className={s.tileIcon} style={{ background: `${v.colorHex}22`, color: v.colorHex }}>
                <Car size={24} />
              </span>
              <div className={s.tileBody}>
                <div className={s.tileTitle}>{v.brand} {v.model}</div>
                <div className={s.tileSub}>{v.type} · {v.plate} · {v.color}</div>
              </div>
              <button
                className={s.circleBtn}
                aria-label="Remove"
                onClick={() => removeVehicle(v.id)}
                style={{ color: '#FF6B82' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {vehicles.length === 0 && !adding && (
            <Empty icon={<Car size={32} />} title="No vehicles yet">
              Add a car to get started with doorstep service.
            </Empty>
          )}
        </div>
      </Section>

      {adding ? (
        <Section title="Add vehicle">
          <div className={L.col}>
            <div>
              <span className={L.fieldLabel}>Car brand</span>
              <ClayInput placeholder="e.g. Hyundai" value={form.brand} onChange={(e) => set('brand', e.target.value)} />
            </div>
            <div>
              <span className={L.fieldLabel}>Model name</span>
              <ClayInput placeholder="e.g. Creta" value={form.model} onChange={(e) => set('model', e.target.value)} />
            </div>
            <div>
              <span className={L.fieldLabel}>Vehicle type</span>
              <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
                {VEHICLE_TYPES.map((t) => (
                  <button
                    key={t}
                    className={`${s.dayChip} ${form.type === t ? s.dayChipOn : ''}`}
                    style={{ width: 'auto', padding: '0 18px', fontSize: 13 }}
                    onClick={() => set('type', t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className={L.fieldLabel}>Registration number</span>
              <ClayInput placeholder="e.g. KA 01 AB 1234" value={form.plate} onChange={(e) => set('plate', e.target.value)} />
            </div>
            <div className={L.row}>
              <ClayButton full onClick={save}>Save vehicle</ClayButton>
              <ClayButton full variant="soft" onClick={() => setAdding(false)}>Cancel</ClayButton>
            </div>
          </div>
        </Section>
      ) : (
        <Section>
          <ClayButton full onClick={() => setAdding(true)}>
            <Plus size={18} /> Add vehicle
          </ClayButton>
        </Section>
      )}
    </Page>
  );
}
