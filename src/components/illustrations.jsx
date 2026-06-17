/* ═══════════════════════════════════════════════════════════════
   Clay Illustrations — inline SVG scenes for the car-wash app.
   All characters use the clay blue palette so they feel native
   to the design system.  viewBox 240×220 for onboarding cards.
═══════════════════════════════════════════════════════════════ */

/* ── helper: shared bubble cluster ── */
function Bubbles({ bubbles }) {
  return bubbles.map(([cx, cy, r], i) => (
    <g key={i}>
      <circle cx={cx} cy={cy} r={r} fill={`rgba(191,224,255,${0.55 + i * 0.02})`} stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" />
      <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.28} fill="rgba(255,255,255,0.72)" />
    </g>
  ));
}

/* ── shared clay-man (blue character, facing right) ──
   pivot: his feet land at (footX, footY)
   scale: 1 = ~130px tall                              */
function ClayMan({ footX = 190, footY = 196, armAngle = -30, scale = 1, sponge = true }) {
  const s = scale;
  const fx = footX, fy = footY;

  // arm direction (angle in degrees, 0=horizontal left, -30 = slightly up)
  const arm1ex = fx - 44 * s;
  const arm1ey = fy - 80 * s + Math.tan((armAngle * Math.PI) / 180) * 44 * s;

  return (
    <g>
      {/* shoes */}
      <ellipse cx={fx - 10 * s} cy={fy} rx={13 * s} ry={7 * s} fill="#14284A" />
      <ellipse cx={fx + 10 * s} cy={fy} rx={13 * s} ry={7 * s} fill="#14284A" />

      {/* legs */}
      <rect x={fx - 20 * s} y={fy - 46 * s} width={16 * s} height={48 * s} rx={8 * s}
        fill="url(#man-legs)" />
      <rect x={fx + 4 * s} y={fy - 46 * s} width={16 * s} height={48 * s} rx={8 * s}
        fill="url(#man-legs)" />

      {/* torso */}
      <rect x={fx - 26 * s} y={fy - 96 * s} width={52 * s} height={54 * s} rx={24 * s}
        fill="url(#man-body)" />
      {/* torso highlight */}
      <ellipse cx={fx} cy={fy - 82 * s} rx={16 * s} ry={9 * s} fill="rgba(255,255,255,0.28)" />

      {/* arm holding sponge */}
      <path
        d={`M ${fx - 24 * s},${fy - 76 * s} Q ${fx - 34 * s},${arm1ey + 4 * s} ${arm1ex},${arm1ey}`}
        stroke="url(#man-body)" strokeWidth={16 * s} strokeLinecap="round" fill="none"
      />
      {/* arm highlight */}
      <path
        d={`M ${fx - 24 * s},${fy - 76 * s} Q ${fx - 34 * s},${arm1ey + 4 * s} ${arm1ex},${arm1ey}`}
        stroke="rgba(255,255,255,0.22)" strokeWidth={8 * s} strokeLinecap="round" fill="none"
      />

      {/* other arm (relaxed, slightly down) */}
      <path
        d={`M ${fx + 24 * s},${fy - 76 * s} Q ${fx + 34 * s},${fy - 60 * s} ${fx + 28 * s},${fy - 50 * s}`}
        stroke="url(#man-body)" strokeWidth={14 * s} strokeLinecap="round" fill="none"
      />

      {/* sponge at end of arm */}
      {sponge && (
        <g>
          <rect x={arm1ex - 14 * s} y={arm1ey - 10 * s} width={26 * s} height={18 * s} rx={8 * s} fill="#FFD166" />
          <rect x={arm1ex - 14 * s} y={arm1ey - 10 * s} width={26 * s} height={18 * s} rx={8 * s}
            fill="none" stroke="rgba(180,120,0,0.30)" strokeWidth="1.5" />
          {/* sponge pores */}
          <circle cx={arm1ex - 5 * s} cy={arm1ey - 2 * s} r={2.5 * s} fill="rgba(180,120,0,0.22)" />
          <circle cx={arm1ex + 2 * s} cy={arm1ey - 5 * s} r={2 * s} fill="rgba(180,120,0,0.18)" />
          <circle cx={arm1ex + 4 * s} cy={arm1ey + 2 * s} r={2 * s} fill="rgba(180,120,0,0.20)" />
          {/* water drips */}
          <path d={`M ${arm1ex - 4 * s},${arm1ey + 8 * s} Q ${arm1ex - 5 * s},${arm1ey + 16 * s} ${arm1ex - 3 * s},${arm1ey + 20 * s}`}
            stroke="rgba(77,163,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d={`M ${arm1ex + 4 * s},${arm1ey + 8 * s} Q ${arm1ex + 5 * s},${arm1ey + 14 * s} ${arm1ex + 3 * s},${arm1ey + 18 * s}`}
            stroke="rgba(77,163,255,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>
      )}

      {/* head */}
      <circle cx={fx} cy={fy - 122 * s} r={28 * s} fill="url(#man-head)" />
      {/* head highlight */}
      <ellipse cx={fx - 8 * s} cy={fy - 133 * s} rx={13 * s} ry={9 * s} fill="rgba(255,255,255,0.32)" />

      {/* eyes */}
      <circle cx={fx - 9 * s} cy={fy - 122 * s} r={7 * s} fill="#fff" />
      <circle cx={fx + 9 * s} cy={fy - 122 * s} r={7 * s} fill="#fff" />
      <circle cx={fx - 8 * s} cy={fy - 121 * s} r={4 * s} fill="#1A3A6A" />
      <circle cx={fx + 10 * s} cy={fy - 121 * s} r={4 * s} fill="#1A3A6A" />
      {/* eye shine */}
      <circle cx={fx - 10 * s} cy={fy - 124 * s} r={1.5 * s} fill="#fff" />
      <circle cx={fx + 8 * s} cy={fy - 124 * s} r={1.5 * s} fill="#fff" />

      {/* smile */}
      <path d={`M ${fx - 10 * s},${fy - 109 * s} Q ${fx},${fy - 101 * s} ${fx + 10 * s},${fy - 109 * s}`}
        stroke="#1A3A6A" strokeWidth={2.5 * s} strokeLinecap="round" fill="none" />

      {/* cap */}
      <ellipse cx={fx} cy={fy - 147 * s} rx={26 * s} ry={8 * s} fill="#1A5DC0" />
      <ellipse cx={fx} cy={fy - 148 * s} rx={20 * s} ry={6 * s} fill="#2E7DE0" />
      {/* cap peak */}
      <path d={`M ${fx - 26 * s},${fy - 144 * s} Q ${fx - 34 * s},${fy - 139 * s} ${fx - 32 * s},${fy - 134 * s} Q ${fx - 22 * s},${fy - 142 * s} ${fx - 12 * s},${fy - 142 * s} Z`}
        fill="#1A5DC0" />
    </g>
  );
}

/* ══════════════════════════════════════════════
   1. WASH SCENE — man washing car (slide 1)
══════════════════════════════════════════════ */
export function WashSceneSVG({ width = 240 }) {
  return (
    <svg width={width} viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="man-body" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#74BBFF" /><stop offset="1" stopColor="#2E7DE0" />
        </linearGradient>
        <linearGradient id="man-head" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#A6D8FF" /><stop offset="1" stopColor="#5BABF0" />
        </linearGradient>
        <linearGradient id="man-legs" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#1A65C8" /><stop offset="1" stopColor="#0E4390" />
        </linearGradient>
        <linearGradient id="ws-car-body" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#7FC9FF" /><stop offset="1" stopColor="#2A7DE0" />
        </linearGradient>
        <linearGradient id="ws-car-roof" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#BDE0FF" /><stop offset="1" stopColor="#5BABF0" />
        </linearGradient>
        <filter id="ws-drop" x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#1A5DC0" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* ground */}
      <ellipse cx="120" cy="214" rx="115" ry="9" fill="rgba(77,163,255,0.16)" />

      {/* === BUBBLES === */}
      <Bubbles bubbles={[[22, 38, 12], [8, 62, 7], [46, 22, 8], [214, 28, 10], [226, 52, 6], [205, 62, 8]]} />

      {/* sparkle stars */}
      <path d="M42 80 l3-8 3 8 8 3-8 3-3 8-3-8-8-3z" fill="#FFC857" opacity="0.85" />
      <path d="M198 78 l2-5 2 5 5 2-5 2-2 5-2-5-5-2z" fill="#FFC857" opacity="0.75" />

      {/* === CAR === */}
      {/* wheel arches shadow */}
      <ellipse cx="52" cy="165" rx="23" ry="6" fill="rgba(20,50,130,0.14)" />
      <ellipse cx="148" cy="165" rx="23" ry="6" fill="rgba(20,50,130,0.14)" />

      {/* rear wheel */}
      <circle cx="52" cy="172" r="20" fill="#2A3A50" filter="url(#ws-drop)" />
      <circle cx="52" cy="172" r="13" fill="#5E7A90" />
      <circle cx="52" cy="172" r="5.5" fill="#D0E8F5" />
      <circle cx="52" cy="172" r="2" fill="#A8C4D8" />
      <line x1="52" y1="159" x2="52" y2="185" stroke="rgba(180,210,230,0.55)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="39" y1="172" x2="65" y2="172" stroke="rgba(180,210,230,0.55)" strokeWidth="1.8" strokeLinecap="round" />

      {/* front wheel */}
      <circle cx="148" cy="172" r="20" fill="#2A3A50" filter="url(#ws-drop)" />
      <circle cx="148" cy="172" r="13" fill="#5E7A90" />
      <circle cx="148" cy="172" r="5.5" fill="#D0E8F5" />
      <circle cx="148" cy="172" r="2" fill="#A8C4D8" />
      <line x1="148" y1="159" x2="148" y2="185" stroke="rgba(180,210,230,0.55)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="135" y1="172" x2="161" y2="172" stroke="rgba(180,210,230,0.55)" strokeWidth="1.8" strokeLinecap="round" />

      {/* car body */}
      <rect x="14" y="130" width="174" height="44" rx="22" fill="url(#ws-car-body)" filter="url(#ws-drop)" />
      {/* body highlight */}
      <rect x="22" y="134" width="158" height="13" rx="6.5" fill="rgba(255,255,255,0.22)" />

      {/* roof */}
      <path d="M44,130 Q48,92 72,86 L132,86 Q158,92 160,130 Z" fill="url(#ws-car-roof)" />

      {/* rear window */}
      <path d="M52,126 Q56,96 76,90 L118,90 L116,126 Z" fill="rgba(215,240,255,0.88)" />
      {/* pillar */}
      <rect x="118" y="90" width="4" height="36" rx="2" fill="rgba(30,75,165,0.22)" />
      {/* front window */}
      <path d="M124,90 L134,90 Q156,96 156,126 L124,126 Z" fill="rgba(215,240,255,0.88)" />

      {/* window inner shine */}
      <ellipse cx="90" cy="106" rx="14" ry="7" fill="rgba(255,255,255,0.26)" />
      <ellipse cx="140" cy="106" rx="9" ry="5" fill="rgba(255,255,255,0.22)" />

      {/* headlight */}
      <rect x="182" y="140" width="5" height="16" rx="2.5" fill="#FFF6A5" opacity="0.9" />
      {/* taillight */}
      <rect x="15" y="140" width="5" height="16" rx="2.5" fill="#FF8090" opacity="0.85" />
      {/* side mirror */}
      <rect x="157" y="100" width="13" height="8" rx="3.5" fill="#5BABF0" opacity="0.85" />

      {/* === SOAP SUDS ON CAR ROOF === */}
      <ellipse cx="76" cy="83" rx="22" ry="9" fill="rgba(235,248,255,0.92)" />
      <ellipse cx="110" cy="78" rx="18" ry="8" fill="rgba(235,248,255,0.88)" />
      <circle cx="62" cy="80" r="7" fill="rgba(245,252,255,0.94)" />
      <circle cx="88" cy="73" r="8" fill="rgba(245,252,255,0.90)" />
      <circle cx="116" cy="76" r="6" fill="rgba(245,252,255,0.88)" />
      <circle cx="130" cy="71" r="7" fill="rgba(245,252,255,0.85)" />
      <circle cx="146" cy="78" r="5.5" fill="rgba(245,252,255,0.82)" />

      {/* === BUCKET === */}
      <rect x="192" y="186" width="22" height="18" rx="5" fill="#FFC857" />
      <rect x="190" y="184" width="26" height="6" rx="3" fill="#FFD97A" />
      <ellipse cx="203" cy="198" rx="9" ry="2.5" fill="rgba(77,163,255,0.35)" />

      {/* === MAN === */}
      <ClayMan footX={205} footY={200} armAngle={-10} scale={0.92} sponge={true} />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   2. SCHEDULE SCENE — calendar + car (slide 2)
══════════════════════════════════════════════ */
export function ScheduleSceneSVG({ width = 240 }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const checked = [0, 2, 4, 6]; // Mon Wed Fri Sun

  return (
    <svg width={width} viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sch-hdr" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#3FDC9E" /><stop offset="1" stopColor="#16B47B" />
        </linearGradient>
        <filter id="sch-card" x="-8%" y="-8%" width="116%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#16B47B" floodOpacity="0.22" />
        </filter>
        <filter id="sch-car" x="-15%" y="-20%" width="130%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#16B47B" floodOpacity="0.28" />
        </filter>
        <linearGradient id="sch-car-body" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#3FDC9E" /><stop offset="1" stopColor="#16B47B" />
        </linearGradient>
        <linearGradient id="sch-car-roof" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#A0F0D0" /><stop offset="1" stopColor="#3FDC9E" />
        </linearGradient>
      </defs>

      {/* === CALENDAR CARD === */}
      <rect x="22" y="14" width="196" height="148" rx="24" fill="#fff" filter="url(#sch-card)" />

      {/* card header */}
      <rect x="22" y="14" width="196" height="56" rx="24" fill="url(#sch-hdr)" />
      <rect x="22" y="42" width="196" height="28" rx="0" fill="url(#sch-hdr)" />

      {/* month text */}
      <text x="120" y="36" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="600" fontSize="17" fill="rgba(255,255,255,0.95)">June 2026</text>

      {/* nav arrows */}
      <circle cx="40" cy="34" r="12" fill="rgba(255,255,255,0.22)" />
      <path d="M43,34 L37,34 M37,34 L40,31 M37,34 L40,37" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="200" cy="34" r="12" fill="rgba(255,255,255,0.22)" />
      <path d="M197,34 L203,34 M203,34 L200,31 M203,34 L200,37" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* day of week headers */}
      {days.map((d, i) => (
        <text key={i} x={42 + i * 26} y={80} textAnchor="middle"
          fontFamily="Quicksand,sans-serif" fontWeight="700" fontSize="11" fill="#9DB4CE">
          {d}
        </text>
      ))}

      {/* week 1 */}
      {[1, 2, 3, 4, 5, 6, 7].map((n, i) => (
        <g key={n}>
          {checked.includes(i) ? (
            <>
              <rect x={30 + i * 26} y={86} width={22} height={22} rx={8}
                fill="url(#sch-hdr)"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(52,211,153,0.45))' }} />
              <path d={`M${36 + i * 26},97 l5,5 8-10`} stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : (
            <>
              <rect x={30 + i * 26} y={86} width={22} height={22} rx={8} fill="#F0FAF6" />
              <text x={41 + i * 26} y={101} textAnchor="middle"
                fontFamily="Quicksand,sans-serif" fontWeight="600" fontSize="12" fill="#6E89A8">{n}</text>
            </>
          )}
        </g>
      ))}

      {/* week 2 */}
      {[8, 9, 10, 11, 12, 13, 14].map((n, i) => (
        <g key={n}>
          {checked.includes(i) ? (
            <>
              <rect x={30 + i * 26} y={114} width={22} height={22} rx={8}
                fill="#DCFCE7" />
              <path d={`M${36 + i * 26},125 l5,5 8-10`} stroke="#16B47B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : (
            <>
              <rect x={30 + i * 26} y={114} width={22} height={22} rx={8} fill="#F8FFFE" />
              <text x={41 + i * 26} y={129} textAnchor="middle"
                fontFamily="Quicksand,sans-serif" fontWeight="600" fontSize="12" fill="#6E89A8">{n}</text>
            </>
          )}
        </g>
      ))}

      {/* week 3 — partial */}
      {[15, 16, 17, 18, 19].map((n, i) => (
        <g key={n}>
          <rect x={30 + i * 26} y={142} width={22} height={22} rx={8} fill="#F8FFFE" />
          <text x={41 + i * 26} y={157} textAnchor="middle"
            fontFamily="Quicksand,sans-serif" fontWeight="600" fontSize="12" fill="#6E89A8">{n}</text>
        </g>
      ))}

      {/* === SMALL CAR (green) below calendar === */}
      <g transform="translate(52,170) scale(0.62)">
        {/* wheels */}
        <circle cx="30" cy="52" r="16" fill="#2A3A50" />
        <circle cx="30" cy="52" r="10" fill="#5E7A90" />
        <circle cx="30" cy="52" r="4" fill="#D0E8F5" />
        <circle cx="110" cy="52" r="16" fill="#2A3A50" />
        <circle cx="110" cy="52" r="10" fill="#5E7A90" />
        <circle cx="110" cy="52" r="4" fill="#D0E8F5" />
        {/* body */}
        <rect x="6" y="22" width="128" height="34" rx="17" fill="url(#sch-car-body)" filter="url(#sch-car)" />
        {/* roof */}
        <path d="M26,22 Q28,0 46,0 L94,0 Q112,0 114,22 Z" fill="url(#sch-car-roof)" />
        {/* windows */}
        <path d="M32,20 Q34,4 48,2 L72,2 L70,20 Z" fill="rgba(215,255,240,0.82)" />
        <path d="M74,2 L92,2 Q108,4 110,20 L74,20 Z" fill="rgba(215,255,240,0.82)" />
        {/* body highlight */}
        <rect x="14" y="26" width="112" height="10" rx="5" fill="rgba(255,255,255,0.26)" />
      </g>

      {/* checkmark badge above car */}
      <circle cx="178" cy="178" r="20" fill="url(#sch-hdr)"
        style={{ filter: 'drop-shadow(0 6px 12px rgba(52,211,153,0.45))' }} />
      <path d="M168,178 l7,8 14-16" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* bubbles */}
      <Bubbles bubbles={[[18, 20, 8], [6, 44, 5], [224, 18, 7], [234, 44, 5]]} />

      {/* sparkle */}
      <path d="M210 148 l2-6 2 6 6 2-6 2-2 6-2-6-6-2z" fill="#FFC857" opacity="0.85" />
      <path d="M26 148 l1.5-4 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5z" fill="#FFC857" opacity="0.7" />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   3. TRACKING SCENE — phone + before/after (slide 3)
══════════════════════════════════════════════ */
export function TrackingSceneSVG({ width = 240 }) {
  const steps = [
    { done: true,  label: 'Partner assigned' },
    { done: true,  label: 'Reached location'  },
    { done: true,  label: 'Cleaning started'  },
    { done: false, label: 'Completed'          },
  ];

  return (
    <svg width={width} viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="trk-phone" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#F0F4FF" /><stop offset="1" stopColor="#E2EAFF" />
        </linearGradient>
        <linearGradient id="trk-step-on" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#A78BFA" /><stop offset="1" stopColor="#7C5CE0" />
        </linearGradient>
        <linearGradient id="trk-step-now" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#74BBFF" /><stop offset="1" stopColor="#2E7DE0" />
        </linearGradient>
        <filter id="trk-phone-shadow" x="-10%" y="-8%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#7C5CE0" floodOpacity="0.22" />
        </filter>
        <filter id="trk-photo" x="-12%" y="-12%" width="124%" height="124%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#7C5CE0" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* === PHONE FRAME === */}
      <rect x="52" y="10" width="136" height="186" rx="28" fill="url(#trk-phone)" filter="url(#trk-phone-shadow)" />
      {/* phone screen */}
      <rect x="60" y="28" width="120" height="160" rx="16" fill="#fff" />
      {/* notch */}
      <rect x="100" y="16" width="40" height="10" rx="5" fill="rgba(180,195,230,0.45)" />

      {/* screen header */}
      <rect x="60" y="28" width="120" height="36" rx="16" fill="url(#trk-step-on)" style={{ opacity: 0.9 }} />
      <rect x="60" y="46" width="120" height="18" rx="0" fill="url(#trk-step-on)" style={{ opacity: 0.9 }} />
      <text x="120" y="50" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="600" fontSize="13" fill="#fff">Live Tracking</text>

      {/* tracking steps */}
      {steps.map((st, i) => (
        <g key={i}>
          {/* vertical line */}
          {i < steps.length - 1 && (
            <rect x="79" y={76 + i * 34} width="2.5" height="30" rx="1.25"
              fill={st.done ? '#A78BFA' : '#E8EEF8'} />
          )}
          {/* dot */}
          <circle cx="80" cy={72 + i * 34} r={8}
            fill={st.done ? 'url(#trk-step-on)' : (i === 3 ? 'url(#trk-step-now)' : '#E8EEF8')}
            style={st.done ? { filter: 'drop-shadow(0 3px 6px rgba(124,92,224,0.35))' } : {}}
          />
          {st.done && (
            <path d={`M${76},${72 + i * 34} l3,3 6-6`} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          )}
          {/* label */}
          <text x="96" y={76 + i * 34} fontFamily="Quicksand,sans-serif" fontWeight="700" fontSize="10"
            fill={st.done ? '#233A56' : '#9DB4CE'}>
            {st.label}
          </text>
        </g>
      ))}

      {/* photo strip at bottom of screen */}
      <rect x="68" y="163" width="46" height="18" rx="7" fill="#E8F4FF" />
      <text x="91" y="175" textAnchor="middle" fontFamily="Quicksand,sans-serif" fontSize="8" fontWeight="700" fill="#4DA3FF">BEFORE</text>

      <rect x="126" y="163" width="46" height="18" rx="7" fill="#E8FFF4" />
      <text x="149" y="175" textAnchor="middle" fontFamily="Quicksand,sans-serif" fontSize="8" fontWeight="700" fill="#16B47B">AFTER ✓</text>

      {/* === FLOATING ELEMENTS === */}
      {/* star rating badge (left) */}
      <rect x="8" y="72" width="42" height="32" rx="12" fill="#fff"
        style={{ filter: 'drop-shadow(0 5px 12px rgba(124,92,224,0.22))' }} />
      <text x="29" y="84" textAnchor="middle" fontSize="11" fill="#FFC857">★★★★★</text>
      <text x="29" y="96" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="600" fontSize="10" fill="#7C5CE0">4.9</text>

      {/* partner avatar badge (right) */}
      <circle cx="208" cy="90" r="22" fill="url(#trk-step-on)"
        style={{ filter: 'drop-shadow(0 6px 14px rgba(124,92,224,0.38))' }} />
      <text x="208" y="95" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="600" fontSize="14" fill="#fff">SK</text>
      <circle cx="222" cy="76" r="7" fill="#16B47B"
        style={{ filter: 'drop-shadow(0 3px 6px rgba(22,180,123,0.4))' }} />
      <path d="M218,76 l3,3 6-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* bubbles */}
      <Bubbles bubbles={[[18, 30, 8], [8, 54, 5.5], [228, 140, 7], [232, 162, 4.5]]} />

      {/* sparkles */}
      <path d="M216 38 l2-6 2 6 6 2-6 2-2 6-2-6-6-2z" fill="#A78BFA" opacity="0.85" />
      <path d="M24 130 l1.5-4 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5z" fill="#A78BFA" opacity="0.75" />
      <path d="M28 170 l1-3 1 3 3 1-3 1-1 3-1-3-3-1z" fill="#FFC857" opacity="0.80" />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   4. HERO WASH SCENE — wider banner version
      (used in the home page hero card)
══════════════════════════════════════════════ */
export { WashSceneSVG as HomeWashSVG };
