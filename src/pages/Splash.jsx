import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';
import { useStore } from '../store';
import a from './auth.module.css';

export default function Splash() {
  const nav = useNavigate();
  const { onboarded, loggedIn } = useStore();

  useEffect(() => {
    const t = setTimeout(() => {
      if (!onboarded) nav('/onboarding', { replace: true });
      else if (!loggedIn) nav('/login', { replace: true });
      else nav('/home', { replace: true });
    }, 1900);
    return () => clearTimeout(t);
  }, [nav, onboarded, loggedIn]);

  return (
    <div className={`${a.full} ${a.splash}`}>
      <div className={a.splashLogo}><Car size={58} strokeWidth={2.2} /></div>
      <h1 className={a.splashName}>Daily Car Wash</h1>
      <p className={a.splashTag}>Doorstep car care, made simple</p>
      <div className={a.dots3}>
        <span className={a.loadDot} /><span className={a.loadDot} /><span className={a.loadDot} />
      </div>
    </div>
  );
}
