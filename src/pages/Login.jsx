import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../store';
import { ClayButton } from '../components/ui';
import a from './auth.module.css';

/* ── claymorphic benefit icons ── */
const GLYPHS = {
  home: (
    <>
      <path d="M14,24 L23,15 L32,24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16,23 V31 H30 V23" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="20.5" y="25.5" width="5" height="5.5" rx="1" fill="#fff"/>
    </>
  ),
  clock: (
    <>
      <circle cx="23" cy="23" r="9.5" fill="none" stroke="#fff" strokeWidth="2.6"/>
      <path d="M23,18 V23 L26.5,25.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="20" y="10" width="6" height="3" rx="1.5" fill="#fff"/>
    </>
  ),
  money: (
    <>
      <circle cx="23" cy="23" r="10" fill="none" stroke="#fff" strokeWidth="2.4"/>
      <text x="23" y="29" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="700" fontSize="15" fill="#fff">₹</text>
    </>
  ),
  shield: (
    <>
      <path d="M23,12 L31,15.5 V23 Q31,30 23,33.5 Q15,30 15,23 V15.5 Z" fill="#fff"/>
      <path d="M19.5,23 l2.5,2.8 5-6" fill="none" stroke="#7C5CE0" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
};

function ClayBenefitIcon({ icon, from, to, shadow }) {
  return (
    <svg width={44} height={44} viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bi-${icon}`} x1="23" y1="3" x2="23" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor={from}/><stop offset="1" stopColor={to}/>
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="40" height="40" rx="14" fill={`url(#bi-${icon})`}
        style={{ filter: `drop-shadow(0 5px 9px ${shadow})` }}/>
      <rect x="8" y="7" width="30" height="12" rx="6" fill="rgba(255,255,255,.26)"/>
      {GLYPHS[icon]}
    </svg>
  );
}

const BENEFITS = [
  { icon: 'home',   from: '#74BBFF', to: '#2E7DE0', shadow: 'rgba(46,125,224,.4)',  title: 'At your doorstep', sub: 'Home, office, anywhere' },
  { icon: 'clock',  from: '#3ECFAC', to: '#10A478', shadow: 'rgba(16,164,120,.4)',  title: 'Done in 20 min',   sub: 'No queues, no waiting'  },
  { icon: 'money',  from: '#FFD25A', to: '#F5A623', shadow: 'rgba(245,166,35,.42)', title: 'From ₹999/mo',     sub: 'Flexible monthly plans' },
  { icon: 'shield', from: '#A78BFA', to: '#7C5CE0', shadow: 'rgba(124,92,224,.4)',  title: 'Vetted partners',  sub: 'Background-checked pros' },
];

export default function Login() {
  const nav = useNavigate();
  const { login, updateUser } = useStore();
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [name, setName] = useState('');
  const boxes = useRef([]);

  const setDigit = (idx, val) => {
    const d = val.replace(/\D/g, '').slice(-1);
    setOtp(o => o.map((x, k) => (k === idx ? d : x)));
    if (d && idx < 3) boxes.current[idx + 1]?.focus();
  };

  const finish = () => {
    updateUser({ name: name.trim() || 'there', phone: phone ? `+91 ${phone}` : '' });
    login();
    nav('/home', { replace: true });
  };

  return (
    <div className={a.full}>

      {/* ── header row: logo + brand + rating ── */}
      <div className={a.loginHeader}>
        <img
          src="/logo.png"
          alt="Daily Car Wash"
          style={{ width: 58, height: 58, borderRadius: 18, flexShrink: 0, objectFit: 'cover', boxShadow: '0 8px 18px rgba(46,125,224,.28)' }}
        />
        <div className={a.loginBrand}>
          <div className={a.loginBrandName}>Daily Car Wash</div>
          <span className={a.loginBrandRating}>⭐ 4.9 &nbsp;·&nbsp; 10k+ happy cars</span>
        </div>
      </div>

      {step === 'phone' ? (
        <>
          <div className={a.authHead}>
            <h1 className={a.authTitle}>Welcome 👋</h1>
            <p className={a.authText}>Enter your mobile number to continue. We'll send you a one-time password.</p>
          </div>

          <label className={a.phoneField}>
            <span className={a.cc}>+91</span>
            <input
              className={a.phoneInput}
              inputMode="numeric"
              placeholder="98765 43210"
              value={phone}
              maxLength={10}
              onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
          </label>

          {/* ── promo area (replaces empty spacer) ── */}
          <div className={a.loginPromo}>
            <div className={a.loginPromoTitle}>Why 10,000+ users love it 🤩</div>

            {/* 2×2 benefit grid */}
            <div className={a.loginBenefits}>
              {BENEFITS.map(b => (
                <div key={b.title} className={a.loginBenefitCard}>
                  <span className={a.loginBenefitEmoji}>
                    <ClayBenefitIcon icon={b.icon} from={b.from} to={b.to} shadow={b.shadow} />
                  </span>
                  <div className={a.loginBenefitTitle}>{b.title}</div>
                  <div className={a.loginBenefitSub}>{b.sub}</div>
                </div>
              ))}
            </div>

            {/* mini testimonial */}
            <div className={a.loginTesti}>
              <div className={a.loginTestiStars}>★★★★★</div>
              <p className={a.loginTestiText}>
                "Super easy to book — took me 30 seconds! My car is spotless every morning now. Honestly the best thing I subscribed to this year 🚗✨"
              </p>
              <div className={a.loginTestiBy}>— Priya M., Bengaluru · Medium Plan subscriber</div>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: 20 }} />
          <ClayButton full onClick={() => setStep('otp')}>
            Send OTP <ArrowRight size={18} />
          </ClayButton>
          <p className={a.demoNote}>Demo build · no real OTP is sent</p>
        </>
      ) : step === 'otp' ? (
        <>
          <div className={a.authHead}>
            <h1 className={a.authTitle}>Verify number 🔐</h1>
            <p className={a.authText}>
              Enter the 4-digit code sent to <b>+91 {phone || '98765 43210'}</b>
            </p>
          </div>

          <div className={a.otpRow}>
            {otp.map((v, idx) => (
              <input
                key={idx}
                ref={el => (boxes.current[idx] = el)}
                className={a.otpBox}
                inputMode="numeric"
                maxLength={1}
                value={v}
                onChange={e => setDigit(idx, e.target.value)}
                onKeyDown={e => { if (e.key === 'Backspace' && !v && idx > 0) boxes.current[idx - 1]?.focus(); }}
              />
            ))}
          </div>
          <p className={a.resend}>Didn't get it? <b>Resend in 0:24</b></p>

          {/* reassurance strip */}
          <div style={{
            marginTop: 28, background: '#EDFDF6', borderRadius: 16, padding: '13px 16px',
            border: '1.5px solid #C8F5E2',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 28 }}>🔒</span>
            <div>
              <div style={{ fontFamily: 'Fredoka,sans-serif', fontWeight: 600, fontSize: 14, color: '#233A56' }}>
                Your number is safe with us
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#6E89A8', marginTop: 3 }}>
                We never share your details. OTP expires in 5 minutes.
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: 28 }} />
          <ClayButton full onClick={() => setStep('name')}>
            <ShieldCheck size={19} /> Verify &amp; continue
          </ClayButton>
          <p className={a.demoNote}>Tap verify to enter the app</p>
        </>
      ) : null}

      {step === 'name' && (
        <>
          <div className={a.authHead}>
            <h1 className={a.authTitle}>Almost there 🎉</h1>
            <p className={a.authText}>What should we call you?</p>
          </div>
          <label className={a.phoneField}>
            <input
              className={a.phoneInput}
              placeholder="Your name"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') finish(); }}
            />
          </label>
          <div style={{ flex: 1, minHeight: 24 }} />
          <ClayButton full onClick={finish}>
            Enter app <ArrowRight size={18} />
          </ClayButton>
          <p className={a.demoNote}>You can change this later in Profile</p>
        </>
      )}
    </div>
  );
}
