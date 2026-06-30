import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../store';
import { ClayButton } from '../components/ui';
import { SplashSceneSVG, ScheduleSceneSVG, TrackingSceneSVG } from '../components/illustrations';
import a from './auth.module.css';

const SLIDES = [
  {
    Scene: SplashSceneSVG,
    bg: 'linear-gradient(150deg, #DCEEFF, #BFE0FF)',
    title: 'Professional care at your doorstep',
    text: 'Expert partners wash and detail your car right where it is parked — home, office or apartment.',
  },
  {
    Scene: ScheduleSceneSVG,
    bg: 'linear-gradient(150deg, #DCFCE7, #A7F0CC)',
    title: 'Subscribe & save every month',
    text: 'Flexible plans with 4–6 washes a week. Pick your days, choose time slots, pause anytime.',
  },
  {
    Scene: TrackingSceneSVG,
    bg: 'linear-gradient(150deg, #F3ECFF, #D9C7FF)',
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
        <div className={a.obArt} style={{ background: s.bg }}>
          <s.Scene width={180} />
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
