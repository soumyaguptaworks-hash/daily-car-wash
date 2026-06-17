import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, Camera, ArrowRight } from 'lucide-react';
import { useStore } from '../store';
import { ClayButton } from '../components/ui';
import { ClayCarSVG } from '../components/bits';
import a from './auth.module.css';

const SLIDES = [
  {
    Icon: null, bg: 'linear-gradient(150deg,#DCEEFF,#BFE0FF)', fg: '#2E7DE0',
    title: 'Professional care at your doorstep',
    text: "Expert partners wash and detail your car right where it's parked — home, office or apartment.",
  },
  {
    Icon: CalendarCheck, bg: 'linear-gradient(150deg,#DCFCEB,#A7F0CC)', fg: '#16B47B',
    title: 'Subscribe & save every month',
    text: 'Flexible plans with 4-6 washes a week. Pick your days, time slots, pause anytime.',
  },
  {
    Icon: Camera, bg: 'linear-gradient(150deg,#F3ECFF,#D9C7FF)', fg: '#7C5CE0',
    title: 'Track live, verify the shine',
    text: 'Follow every step in real time and review before & after photos before you approve.',
  },
];

export default function Onboarding() {
  const nav = useNavigate();
  const { completeOnboarding } = useStore();
  const [i, setI] = useState(0);
  const last = i === SLIDES.length - 1;
  const s = SLIDES[i];

  const finish = () => { completeOnboarding(); nav('/login', { replace: true }); };

  return (
    <div className={a.full}>
      <div className={a.obTop}>
        <button className={a.skip} onClick={finish}>Skip</button>
      </div>

      <div className={a.obBody} key={i}>
        <div className={a.obArt} style={{ background: s.bg, color: s.fg }}>
          {s.Icon
            ? <s.Icon size={84} strokeWidth={1.9} />
            : <ClayCarSVG width={168} uid={`ob${i}`} />}
        </div>
        <h2 className={a.obTitle}>{s.title}</h2>
        <p className={a.obText}>{s.text}</p>
      </div>

      <div className={a.obDots}>
        {SLIDES.map((_, k) => (
          <span key={k} className={`${a.obDot} ${k === i ? a.obDotOn : ''}`} />
        ))}
      </div>

      <ClayButton full onClick={() => (last ? finish() : setI(i + 1))}>
        {last ? 'Get started' : 'Next'} <ArrowRight size={18} />
      </ClayButton>
    </div>
  );
}
