import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import a from './auth.module.css';

const SEEN_KEY = 'dcw-splash-seen';

export default function Splash() {
  const nav = useNavigate();
  const { onboarded, loggedIn } = useStore();
  const done = useRef(false);
  const timer = useRef(null);

  // has the intro video already been shown once (on any prior open)?
  const [seen] = useState(() => {
    try { return localStorage.getItem(SEEN_KEY) === '1'; } catch { return false; }
  });

  const goNext = () => {
    if (done.current) return;
    done.current = true;
    clearTimeout(timer.current);
    try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* ignore */ }
    if (!onboarded) nav('/onboarding', { replace: true });
    else if (!loggedIn) nav('/login', { replace: true });
    else nav('/home', { replace: true });
  };

  useEffect(() => {
    // already seen once → skip the video entirely, go straight through
    if (seen) { goNext(); return; }
    // first open → safety net in case autoplay is blocked or onEnded never fires
    timer.current = setTimeout(goNext, 8000);
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // once seen, render nothing — the effect redirects instantly
  if (seen) return null;

  // once metadata loads, cap the safety net just past the real clip length
  const onMeta = (e) => {
    const d = e.currentTarget.duration;
    if (d && isFinite(d)) {
      clearTimeout(timer.current);
      timer.current = setTimeout(goNext, d * 1000 + 1000);
    }
  };

  return (
    <div className={a.videoSplash} onClick={goNext} role="button" title="Tap to skip">
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
      <span className={a.splashSkip}>Tap to skip</span>
    </div>
  );
}
