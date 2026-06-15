import {
  Car, CheckCircle, CreditCard, Star, Bell,
  Gift, PartyPopper, Sparkles,
} from 'lucide-react';
import StatusBar from '../components/StatusBar';
import styles from './Notifications.module.css';

const notifs = [
  {
    icon: <Car size={20} color="#FF6B2C" />,
    title: 'Partner Assigned!', unread: true,
    body: 'Ramesh K. has been assigned for your Basic Wash today at 8 AM.',
    time: 'Just now', bg: '#FFE8D8', shadow: '#F5C9A8',
  },
  {
    icon: <CheckCircle size={20} color="#00B469" />,
    title: 'Booking Confirmed', unread: true,
    body: 'Your Basic Wash on June 20 at 8 AM is confirmed. Payment received.',
    time: '2 min ago', bg: '#E8FFE8', shadow: '#B5E5B5',
  },
  {
    icon: <CreditCard size={20} color="#3B8BFF" />,
    title: 'Payment Successful', unread: true,
    body: '₹299 paid via UPI for Basic Wash. Invoice sent to your email.',
    time: '15 min ago', bg: '#E8F0FF', shadow: '#B5C8F0',
  },
];

const oldNotifs = [
  {
    icon: <Star size={20} color="#C8920A" fill="#C8920A" />,
    title: 'Rate Your Experience', unread: false,
    body: 'How was your Foam Wash on June 14? Tap to leave a quick review.',
    time: 'Yesterday, 10:30 AM', bg: '#FFF8E0', shadow: '#EDDC9A',
  },
  {
    icon: <Bell size={20} color="#E0558A" />,
    title: 'Upcoming Wash Reminder', unread: false,
    body: 'Your next subscription wash is tomorrow at 8 AM. Keep your car ready!',
    time: 'Yesterday, 8:00 PM', bg: '#FFE8F0', shadow: '#F0B5C8',
  },
  {
    icon: <Gift size={20} color="#7B5CFF" />,
    title: 'Special Offer!', unread: false,
    body: 'Get 20% off on Premium Detailing this weekend. Use code: SHINE20.',
    time: 'Yesterday, 3:15 PM', bg: '#F0E8FF', shadow: '#C8B5F0',
  },
  {
    icon: <Sparkles size={20} color="#00A896" />,
    title: 'Subscription Renewed!', unread: false,
    body: 'Your Premium Plan has been renewed for the next month. 16 washes available.',
    time: 'Jun 13, 9:00 AM', bg: '#E0FFF8', shadow: '#A5E8D8',
  },
];

function NotifItem({ n }) {
  return (
    <div className={`${styles.notifItem} ${n.unread ? styles.unread : ''}`}>
      <div className={styles.niIcon} style={{ background: n.bg, boxShadow: `0 4px 0 0 ${n.shadow}` }}>
        {n.icon}
      </div>
      <div className={styles.niBody}>
        <h5>{n.title}</h5>
        <p>{n.body}</p>
        <div className={styles.niTime}>{n.time}</div>
      </div>
      {n.unread && <div className={styles.niDot}/>}
    </div>
  );
}

export default function Notifications() {
  return (
    <div className="phone-shell">
      <StatusBar />
      <div className="page-scroll">
        <div className={styles.header}>
          <h2>Notifications</h2>
          <button className={styles.clearBtn}>Mark all read</button>
        </div>

        <div className={styles.dateLabel}>Today · 3 New</div>
        {notifs.map(n => <NotifItem key={n.title} n={n} />)}

        <div className={styles.dateLabel}>Yesterday</div>
        {oldNotifs.slice(0, 3).map(n => <NotifItem key={n.title} n={n} />)}

        <div className={styles.dateLabel}>Jun 13</div>
        {oldNotifs.slice(3).map(n => <NotifItem key={n.title} n={n} />)}

        <div className={styles.caughtUp}>
          <div className={styles.caughtBlob}>
            <PartyPopper size={48} color="#fff" strokeWidth={1.5} />
          </div>
          <h3>All caught up!</h3>
          <p>You've seen all your notifications. Check back later for updates and offers.</p>
          <button className="clay-btn" style={{ maxWidth: 210 }}>Explore Services</button>
        </div>
      </div>
    </div>
  );
}
