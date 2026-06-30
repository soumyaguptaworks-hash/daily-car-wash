import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import a from './auth.module.css';

export default function Splash() {
  const nav = useNavigate();
  const { onboarded, loggedIn } = useStore();
  const done = useRef(false);
  const timer = useRef(null);

  const goNext = () => {
    if (done.current) return;
    done.current = true;
    clearTimeout(timer.current);
    if (!onboarded) nav('/onboarding', { replace: true });
    else if (!loggedIn) nav('/login', { replace: true });
    else nav('/home', { replace: true });
  };

  // backstop only until we know the real duration (covers blocked autoplay)
  useEffect(() => {
    timer.current = setTimeout(goNext, 12000);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // once metadata loads, set the backstop just past the full clip length
  const onMeta = (e) => {
    const d = e.currentTarget.duration;
    if (d && isFinite(d)) {
      clearTimeout(timer.current);
      timer.current = setTimeout(goNext, d * 1000 + 1000);
    }
  };

  return (
    <div className={a.videoSplash}>
      <video
        className={a.splashVideo}
        src="/splash-video.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={onMeta}
        onEnded={goNext}
        onError={goNext}
      />
    </div>
  );
}
