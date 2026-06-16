import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../store';
import { ClayButton } from '../components/ui';
import a from './auth.module.css';

export default function Login() {
  const nav = useNavigate();
  const { login } = useStore();
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const boxes = useRef([]);

  const setDigit = (idx, val) => {
    const d = val.replace(/\D/g, '').slice(-1);
    setOtp((o) => o.map((x, k) => (k === idx ? d : x)));
    if (d && idx < 3) boxes.current[idx + 1]?.focus();
  };

  const finish = () => { login(); nav('/home', { replace: true }); };

  return (
    <div className={a.full}>
      <div className={a.splashLogo} style={{ width: 76, height: 76, borderRadius: 26, marginBottom: 22 }}>
        <Car size={36} strokeWidth={2.2} />
      </div>

      {step === 'phone' ? (
        <>
          <div className={a.authHead}>
            <h1 className={a.authTitle}>Welcome 👋</h1>
            <p className={a.authText}>Enter your mobile number to continue. We’ll send you a one-time password.</p>
          </div>

          <label className={a.phoneField}>
            <span className={a.cc}>+91</span>
            <input
              className={a.phoneInput}
              inputMode="numeric"
              placeholder="98765 43210"
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
          </label>

          <div className={a.spacer} />
          <ClayButton full onClick={() => setStep('otp')}>
            Send OTP <ArrowRight size={18} />
          </ClayButton>
          <p className={a.demoNote}>Demo build · no real OTP is sent</p>
        </>
      ) : (
        <>
          <div className={a.authHead}>
            <h1 className={a.authTitle}>Verify number</h1>
            <p className={a.authText}>Enter the 4-digit code sent to <b>+91 {phone || '98765 43210'}</b></p>
          </div>

          <div className={a.otpRow}>
            {otp.map((v, idx) => (
              <input
                key={idx}
                ref={(el) => (boxes.current[idx] = el)}
                className={a.otpBox}
                inputMode="numeric"
                maxLength={1}
                value={v}
                onChange={(e) => setDigit(idx, e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Backspace' && !v && idx > 0) boxes.current[idx - 1]?.focus(); }}
              />
            ))}
          </div>
          <p className={a.resend}>Didn’t get it? <b>Resend in 0:24</b></p>

          <div className={a.spacer} />
          <ClayButton full onClick={finish}>
            <ShieldCheck size={19} /> Verify &amp; continue
          </ClayButton>
          <p className={a.demoNote}>Tap verify to enter the app</p>
        </>
      )}
    </div>
  );
}
