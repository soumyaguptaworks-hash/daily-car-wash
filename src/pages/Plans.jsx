import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Droplets, Wind, Crown, Check, X, Star, ArrowLeft, MoreHorizontal } from 'lucide-react';
import StatusBar from '../components/StatusBar';
import BottomNav from '../components/BottomNav';
import styles from './Plans.module.css';

const plans = [
  {
    id: 'basic',
    icon: <Droplets size={26} color="#3B8BFF" />,
    name: 'Basic Plan',
    price: { monthly: '₹499', quarterly: '₹1,299' },
    iconBg: '#E0F0FF', iconShadow: '#B8D8F5',
    features: [
      { ok: true,  text: 'Bucket Wash Service' },
      { ok: true,  text: '4 Days Per Week' },
      { ok: true,  text: 'Exterior Cleaning' },
      { ok: false, text: 'Interior Cleaning' },
      { ok: false, text: 'Foam Wash' },
    ],
    featured: false,
  },
  {
    id: 'medium',
    icon: <Wind size={26} color="#C8920A" />,
    name: 'Medium Plan',
    price: { monthly: '₹799', quarterly: '₹2,099' },
    iconBg: '#FFF8E0', iconShadow: '#EDE0A5',
    features: [
      { ok: true,  text: 'Advanced Exterior Clean' },
      { ok: true,  text: 'Dashboard & Glass Clean' },
      { ok: true,  text: 'Tyre Cleaning' },
      { ok: true,  text: '5 Days Per Week' },
      { ok: false, text: 'Interior Vacuum' },
    ],
    featured: false,
  },
  {
    id: 'premium',
    icon: <Crown size={26} color="#fff" />,
    name: 'Premium Plan',
    price: { monthly: '₹1,299', quarterly: '₹3,399' },
    iconBg: 'rgba(255,255,255,0.25)', iconShadow: 'rgba(0,0,0,0.1)',
    features: [
      { ok: true, text: 'Complete Premium Care' },
      { ok: true, text: 'Exterior + Interior' },
      { ok: true, text: 'Foam Wash Included' },
      { ok: true, text: 'Vacuum Cleaning' },
      { ok: true, text: 'Priority Assignment' },
    ],
    featured: true,
  },
];

export default function Plans() {
  const [billing, setBilling] = useState('monthly');
  const navigate = useNavigate();

  return (
    <div className="phone-shell">
      <StatusBar />
      <div className="page-scroll">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate('/home')}><ArrowLeft size={18} /></button>
          <h2>Subscription Plans</h2>
          <button className="menu-btn"><MoreHorizontal size={18} /></button>
        </div>

        <p className={styles.subtitle}>Pick the plan that matches<br/>your car's needs perfectly.</p>

        <div className={styles.toggle}>
          <button className={billing === 'monthly' ? styles.toggleActive : styles.toggleBtn} onClick={() => setBilling('monthly')}>Monthly</button>
          <button className={billing === 'quarterly' ? styles.toggleActive : styles.toggleBtn} onClick={() => setBilling('quarterly')}>
            Quarterly <span className={styles.saveBadge}>Save 10%</span>
          </button>
        </div>

        {plans.map(plan => (
          <div key={plan.id} className={`${styles.planCard} ${plan.featured ? styles.featured : ''}`}>
            {plan.featured && (
              <div className={styles.popularBadge}>
                <Star size={10} fill="currentColor" /> Most Popular
              </div>
            )}

            <div className={styles.planIcon} style={{ background: plan.iconBg, boxShadow: `0 5px 0 0 ${plan.iconShadow}` }}>
              {plan.icon}
            </div>
            <div className={styles.planName}>{plan.name}</div>
            <div className={styles.planPrice}>
              {plan.price[billing]} <span>/ {billing === 'monthly' ? 'month' : 'quarter'}</span>
            </div>

            <div className={styles.featureList}>
              {plan.features.map((f, i) => (
                <div key={i} className={styles.featureRow}>
                  <div className={`${styles.check} ${f.ok ? styles.checkOk : styles.checkNo} ${plan.featured ? styles.checkFeatured : ''}`}>
                    {f.ok ? <Check size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
                  </div>
                  <span style={{ opacity: f.ok ? 1 : 0.45 }}>{f.text}</span>
                </div>
              ))}
            </div>

            <button
              className={`clay-btn ${plan.featured ? 'white-ghost' : 'outline'} sm`}
              style={{ marginTop: 16, width: '100%', fontSize: 14, padding: '12px 20px', borderRadius: 16 }}
              onClick={() => navigate('/bookings')}
            >
              Choose {plan.name.split(' ')[0]}
            </button>
          </div>
        ))}
        <div style={{ height: 8 }} />
      </div>
      <BottomNav />
    </div>
  );
}
