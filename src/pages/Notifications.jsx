import { Bell, UserCheck, CalendarClock, Tag, CreditCard } from 'lucide-react';
import { NOTIFICATIONS } from '../data';
import { Page, TopBar, Section, L } from '../components/layout';
import s from './app.module.css';

const ICON_MAP = {
  partner:  { Icon: UserCheck,    color: '#4DA3FF' },
  reminder: { Icon: CalendarClock, color: '#34D399' },
  offer:    { Icon: Tag,           color: '#FFC857' },
  payment:  { Icon: CreditCard,    color: '#A78BFA' },
};

export default function Notifications() {
  return (
    <Page>
      <TopBar title="Notifications" />

      <Section>
        <div className={L.col}>
          {NOTIFICATIONS.map((n) => {
            const { Icon, color } = ICON_MAP[n.type] || { Icon: Bell, color: '#4DA3FF' };
            return (
              <div
                key={n.id}
                className={s.tile}
                style={{ position: 'relative', ...(n.unread ? { borderLeft: `3px solid ${color}` } : {}) }}
              >
                <span className={s.tileIcon} style={{ background: `${color}1F`, color }}>
                  <Icon size={22} />
                </span>
                <div className={s.tileBody}>
                  <div className={s.tileTitle} style={{ fontSize: 14.5 }}>{n.title}</div>
                  <div className={s.tileSub}>{n.body}</div>
                  <div className={s.tileSub} style={{ marginTop: 4, color: '#9DB4CE' }}>{n.time}</div>
                </div>
                {n.unread && (
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: color, flexShrink: 0, marginLeft: 4 }} />
                )}
              </div>
            );
          })}
        </div>
      </Section>
    </Page>
  );
}
