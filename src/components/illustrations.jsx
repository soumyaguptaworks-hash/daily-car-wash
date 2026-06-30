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
   2. SCHEDULE SCENE — animated calendar + car
══════════════════════════════════════════════ */
export function ScheduleSceneSVG({ width = 240 }) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const checked = [0, 2, 4, 6];

  return (
    <svg width={width} viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sch-hdr" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#3FDC9E"/><stop offset="1" stopColor="#16B47B"/>
        </linearGradient>
        <filter id="sch-card" x="-8%" y="-8%" width="116%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#16B47B" floodOpacity="0.22"/>
        </filter>
        <filter id="sch-cf" x="-15%" y="-20%" width="130%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#16B47B" floodOpacity="0.28"/>
        </filter>
        <linearGradient id="sch-cb" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#3FDC9E"/><stop offset="1" stopColor="#16B47B"/>
        </linearGradient>
        <linearGradient id="sch-cr" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#A0F0D0"/><stop offset="1" stopColor="#3FDC9E"/>
        </linearGradient>
        <style>{`
          @keyframes sch-bob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
          @keyframes sch-pop    { 0%{transform:scale(0);opacity:0} 65%{transform:scale(1.18)} 100%{transform:scale(1);opacity:1} }
          @keyframes sch-slide  { 0%{transform:translateX(-36px);opacity:0} 100%{transform:translateX(0);opacity:1} }
          @keyframes sch-pulse  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.16);filter:drop-shadow(0 8px 20px rgba(52,211,153,.7))} }
          @keyframes sch-float  { 0%{opacity:.7;transform:translateY(0)} 100%{opacity:0;transform:translateY(-30px)} }
          @keyframes sch-wink   { 0%,100%{opacity:.85} 50%{opacity:.08} }
          .sch-card { animation: sch-bob 3.8s ease-in-out infinite; }
          .sch-c0   { transform-box:fill-box;transform-origin:center;animation:sch-pop .38s cubic-bezier(.3,1.5,.5,1) .05s both }
          .sch-c1   { transform-box:fill-box;transform-origin:center;animation:sch-pop .38s cubic-bezier(.3,1.5,.5,1) .22s both }
          .sch-c2   { transform-box:fill-box;transform-origin:center;animation:sch-pop .38s cubic-bezier(.3,1.5,.5,1) .39s both }
          .sch-c3   { transform-box:fill-box;transform-origin:center;animation:sch-pop .38s cubic-bezier(.3,1.5,.5,1) .56s both }
          .sch-c4   { transform-box:fill-box;transform-origin:center;animation:sch-pop .38s cubic-bezier(.3,1.5,.5,1) .73s both }
          .sch-c5   { transform-box:fill-box;transform-origin:center;animation:sch-pop .38s cubic-bezier(.3,1.5,.5,1) .90s both }
          .sch-c6   { transform-box:fill-box;transform-origin:center;animation:sch-pop .38s cubic-bezier(.3,1.5,.5,1) 1.07s both }
          .sch-c7   { transform-box:fill-box;transform-origin:center;animation:sch-pop .38s cubic-bezier(.3,1.5,.5,1) 1.24s both }
          .sch-car  { animation: sch-slide .55s cubic-bezier(.2,.8,.4,1) .7s both }
          .sch-bdg  { transform-box:fill-box;transform-origin:center;animation:sch-pulse 2.2s ease-in-out infinite 1.5s }
          .sch-b1   { animation: sch-float 2.1s ease-out infinite }
          .sch-b2   { animation: sch-float 2.5s ease-out infinite .55s }
          .sch-b3   { animation: sch-float 2.2s ease-out infinite 1.1s }
          .sch-b4   { animation: sch-float 2.4s ease-out infinite .85s }
          .sch-s1   { animation: sch-wink 1.5s ease-in-out infinite }
          .sch-s2   { animation: sch-wink 1.9s ease-in-out infinite .65s }
        `}</style>
      </defs>

      {/* calendar (floating bob) */}
      <g className="sch-card">
        <rect x="22" y="14" width="196" height="148" rx="24" fill="#fff" filter="url(#sch-card)"/>
        <rect x="22" y="14" width="196" height="56" rx="24" fill="url(#sch-hdr)"/>
        <rect x="22" y="42" width="196" height="28" fill="url(#sch-hdr)"/>
        <text x="120" y="36" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="600" fontSize="17" fill="rgba(255,255,255,.95)">June 2026</text>
        <circle cx="40"  cy="34" r="12" fill="rgba(255,255,255,.22)"/>
        <path d="M43,34 L37,34 M37,34 L40,31 M37,34 L40,37" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="200" cy="34" r="12" fill="rgba(255,255,255,.22)"/>
        <path d="M197,34 L203,34 M203,34 L200,31 M203,34 L200,37" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        {days.map((d, i) => (
          <text key={i} x={42+i*26} y={80} textAnchor="middle" fontFamily="Quicksand,sans-serif" fontWeight="700" fontSize="11" fill="#9DB4CE">{d}</text>
        ))}
        {/* week 1 — checkmarks pop in */}
        {[1,2,3,4,5,6,7].map((n, i) => {
          const ok = checked.includes(i);
          return (
            <g key={n}>
              {ok ? (
                <g className={`sch-c${checked.indexOf(i)}`}>
                  <rect x={30+i*26} y={86} width={22} height={22} rx={8} fill="url(#sch-hdr)" style={{filter:'drop-shadow(0 4px 8px rgba(52,211,153,.45))'}}/>
                  <path d={`M${36+i*26},97 l5,5 8-10`} stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              ) : (
                <>
                  <rect x={30+i*26} y={86} width={22} height={22} rx={8} fill="#F0FAF6"/>
                  <text x={41+i*26} y={101} textAnchor="middle" fontFamily="Quicksand,sans-serif" fontWeight="600" fontSize="12" fill="#6E89A8">{n}</text>
                </>
              )}
            </g>
          );
        })}
        {/* week 2 — second wave of pops */}
        {[8,9,10,11,12,13,14].map((n, i) => {
          const ok = checked.includes(i);
          return (
            <g key={n}>
              {ok ? (
                <g className={`sch-c${checked.indexOf(i)+4}`}>
                  <rect x={30+i*26} y={114} width={22} height={22} rx={8} fill="#DCFCE7"/>
                  <path d={`M${36+i*26},125 l5,5 8-10`} stroke="#16B47B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              ) : (
                <>
                  <rect x={30+i*26} y={114} width={22} height={22} rx={8} fill="#F8FFFE"/>
                  <text x={41+i*26} y={129} textAnchor="middle" fontFamily="Quicksand,sans-serif" fontWeight="600" fontSize="12" fill="#6E89A8">{n}</text>
                </>
              )}
            </g>
          );
        })}
        {/* week 3 */}
        {[15,16,17,18,19].map((n, i) => (
          <g key={n}>
            <rect x={30+i*26} y={142} width={22} height={22} rx={8} fill="#F8FFFE"/>
            <text x={41+i*26} y={157} textAnchor="middle" fontFamily="Quicksand,sans-serif" fontWeight="600" fontSize="12" fill="#6E89A8">{n}</text>
          </g>
        ))}
      </g>

      {/* car — slides in from left */}
      <g className="sch-car" transform="translate(52,170) scale(0.62)">
        <circle cx="30"  cy="52" r="16" fill="#2A3A50"/><circle cx="30"  cy="52" r="10" fill="#5E7A90"/><circle cx="30"  cy="52" r="4" fill="#D0E8F5"/>
        <circle cx="110" cy="52" r="16" fill="#2A3A50"/><circle cx="110" cy="52" r="10" fill="#5E7A90"/><circle cx="110" cy="52" r="4" fill="#D0E8F5"/>
        <rect x="6" y="22" width="128" height="34" rx="17" fill="url(#sch-cb)" filter="url(#sch-cf)"/>
        <path d="M26,22 Q28,0 46,0 L94,0 Q112,0 114,22 Z" fill="url(#sch-cr)"/>
        <path d="M32,20 Q34,4 48,2 L72,2 L70,20 Z" fill="rgba(215,255,240,.82)"/>
        <path d="M74,2 L92,2 Q108,4 110,20 L74,20 Z" fill="rgba(215,255,240,.82)"/>
        <rect x="14" y="26" width="112" height="10" rx="5" fill="rgba(255,255,255,.26)"/>
      </g>

      {/* badge — pulses */}
      <g className="sch-bdg">
        <circle cx="178" cy="178" r="20" fill="url(#sch-hdr)" style={{filter:'drop-shadow(0 6px 12px rgba(52,211,153,.45))'}}/>
        <path d="M168,178 l7,8 14-16" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      {/* bubbles */}
      <g className="sch-b1"><circle cx="18" cy="20" r="8" fill="rgba(191,224,255,.6)" stroke="rgba(255,255,255,.75)" strokeWidth="1.5"/><circle cx="15.6" cy="17.6" r="2.2" fill="rgba(255,255,255,.72)"/></g>
      <g className="sch-b2"><circle cx="6"  cy="44" r="5" fill="rgba(191,224,255,.6)" stroke="rgba(255,255,255,.75)" strokeWidth="1.5"/><circle cx="4.5"  cy="42.5" r="1.4" fill="rgba(255,255,255,.72)"/></g>
      <g className="sch-b3"><circle cx="224" cy="18" r="7" fill="rgba(191,224,255,.6)" stroke="rgba(255,255,255,.75)" strokeWidth="1.5"/><circle cx="221.9" cy="15.9" r="2" fill="rgba(255,255,255,.72)"/></g>
      <g className="sch-b4"><circle cx="234" cy="44" r="5" fill="rgba(191,224,255,.6)" stroke="rgba(255,255,255,.75)" strokeWidth="1.5"/><circle cx="232.5" cy="42.5" r="1.4" fill="rgba(255,255,255,.72)"/></g>

      {/* sparkles */}
      <path className="sch-s1" d="M210 148 l2-6 2 6 6 2-6 2-2 6-2-6-6-2z" fill="#FFC857" opacity=".85"/>
      <path className="sch-s2" d="M26 148 l1.5-4 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5z" fill="#FFC857" opacity=".7"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════
   3. TRACKING SCENE — animated phone + tracker
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
        <linearGradient id="trk-pg" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#F0F4FF"/><stop offset="1" stopColor="#E2EAFF"/>
        </linearGradient>
        <linearGradient id="trk-pur" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#A78BFA"/><stop offset="1" stopColor="#7C5CE0"/>
        </linearGradient>
        <linearGradient id="trk-blu" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#74BBFF"/><stop offset="1" stopColor="#2E7DE0"/>
        </linearGradient>
        <filter id="trk-pshadow" x="-10%" y="-8%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#7C5CE0" floodOpacity="0.22"/>
        </filter>
        <style>{`
          @keyframes trk-bob    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
          @keyframes trk-pop    { 0%{transform:scale(0);opacity:0} 65%{transform:scale(1.22)} 100%{transform:scale(1);opacity:1} }
          @keyframes trk-grow   { 0%{transform:scaleY(0);opacity:0} 100%{transform:scaleY(1);opacity:1} }
          @keyframes trk-ping   { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:0} }
          @keyframes trk-glow   { 0%,100%{filter:drop-shadow(0 6px 14px rgba(124,92,224,.38))} 50%{filter:drop-shadow(0 8px 22px rgba(124,92,224,.75))} }
          @keyframes trk-bdgbob { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-6px) rotate(3deg)} }
          @keyframes trk-float  { 0%{opacity:.72;transform:translateY(0)} 100%{opacity:0;transform:translateY(-32px)} }
          @keyframes trk-wink   { 0%,100%{opacity:.85} 50%{opacity:.08} }
          .trk-phone  { animation: trk-bob 3.5s ease-in-out infinite }
          .trk-d0     { transform-box:fill-box;transform-origin:center;animation:trk-pop .35s cubic-bezier(.3,1.5,.5,1) .1s  both }
          .trk-d1     { transform-box:fill-box;transform-origin:center;animation:trk-pop .35s cubic-bezier(.3,1.5,.5,1) .32s both }
          .trk-d2     { transform-box:fill-box;transform-origin:center;animation:trk-pop .35s cubic-bezier(.3,1.5,.5,1) .54s both }
          .trk-d3     { transform-box:fill-box;transform-origin:center;animation:trk-pop .35s cubic-bezier(.3,1.5,.5,1) .76s both }
          .trk-l0     { transform-box:fill-box;transform-origin:top center;animation:trk-grow .25s ease .2s  both }
          .trk-l1     { transform-box:fill-box;transform-origin:top center;animation:trk-grow .25s ease .42s both }
          .trk-l2     { transform-box:fill-box;transform-origin:top center;animation:trk-grow .25s ease .64s both }
          .trk-ping   { transform-box:fill-box;transform-origin:center;animation:trk-ping 1.4s ease-in-out infinite 1.2s }
          .trk-avatar { animation:trk-glow 2s ease-in-out infinite 0.9s }
          .trk-badge  { animation:trk-bdgbob 3s ease-in-out infinite }
          .trk-b1     { animation:trk-float 2.2s ease-out infinite }
          .trk-b2     { animation:trk-float 2.6s ease-out infinite .6s }
          .trk-b3     { animation:trk-float 2.1s ease-out infinite 1.2s }
          .trk-b4     { animation:trk-float 2.4s ease-out infinite .3s }
          .trk-s1     { animation:trk-wink 1.6s ease-in-out infinite }
          .trk-s2     { animation:trk-wink 2s   ease-in-out infinite .5s }
          .trk-s3     { animation:trk-wink 1.3s ease-in-out infinite 1s }
        `}</style>
      </defs>

      {/* phone (bobs) */}
      <g className="trk-phone">
        <rect x="52" y="10" width="136" height="186" rx="28" fill="url(#trk-pg)" filter="url(#trk-pshadow)"/>
        <rect x="60" y="28" width="120" height="160" rx="16" fill="#fff"/>
        <rect x="100" y="16" width="40" height="10" rx="5" fill="rgba(180,195,230,.45)"/>

        {/* header bar */}
        <rect x="60" y="28" width="120" height="36" rx="16" fill="url(#trk-pur)" opacity=".9"/>
        <rect x="60" y="46" width="120" height="18" fill="url(#trk-pur)" opacity=".9"/>
        <text x="120" y="50" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="600" fontSize="13" fill="#fff">Live Tracking</text>

        {/* connecting lines (grow from top) */}
        {steps.slice(0,-1).map((st, i) => (
          <g key={i} className={`trk-l${i}`}>
            <rect x="79" y={79+i*26} width="2.5" height="12" rx="1.25" fill={st.done?'#A78BFA':'#E8EEF8'}/>
          </g>
        ))}

        {/* step dots (pop in sequentially) */}
        {steps.map((st, i) => (
          <g key={i} className={`trk-d${i}`}>
            <circle cx="80" cy={72+i*26} r={7}
              fill={st.done?'url(#trk-pur)':(i===3?'url(#trk-blu)':'#E8EEF8')}
              style={st.done?{filter:'drop-shadow(0 3px 6px rgba(124,92,224,.35))'}:{}}/>
            {st.done && (
              <path d={`M${76.5},${72+i*26} l2.5,2.8 5.5-5.6`} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            )}
            <text x="94" y={75.5+i*26} fontFamily="Quicksand,sans-serif" fontWeight="700" fontSize="10" fill={st.done?'#233A56':'#9DB4CE'}>
              {st.label}
            </text>
          </g>
        ))}

        {/* online ping (pulsing ring on the active step) */}
        <circle className="trk-ping" cx="80" cy={72+3*26} r="10" fill="none" stroke="#2E7DE0" strokeWidth="2.5" opacity=".55"/>

        {/* photo strip */}
        <rect x="68" y="167" width="46" height="17" rx="7" fill="#E8F4FF"/>
        <text x="91" y="178.5" textAnchor="middle" fontFamily="Quicksand,sans-serif" fontSize="8" fontWeight="700" fill="#4DA3FF">BEFORE</text>
        <rect x="126" y="167" width="46" height="17" rx="7" fill="#E8FFF4"/>
        <text x="149" y="178.5" textAnchor="middle" fontFamily="Quicksand,sans-serif" fontSize="8" fontWeight="700" fill="#16B47B">AFTER ✓</text>
      </g>

      {/* star rating badge (bobs independently) */}
      <g className="trk-badge">
        <rect x="8" y="72" width="42" height="32" rx="12" fill="#fff" style={{filter:'drop-shadow(0 5px 12px rgba(124,92,224,.22))'}}/>
        <text x="29" y="84" textAnchor="middle" fontSize="11" fill="#FFC857">★★★★★</text>
        <text x="29" y="96" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="600" fontSize="10" fill="#7C5CE0">4.9</text>
      </g>

      {/* partner avatar (glows) */}
      <g className="trk-avatar">
        <circle cx="208" cy="90" r="22" fill="url(#trk-pur)"/>
        <text x="208" y="95" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="600" fontSize="14" fill="#fff">SK</text>
        <circle className="trk-ping" cx="222" cy="76" r="9" fill="none" stroke="#16B47B" strokeWidth="2" opacity=".5"/>
        <circle cx="222" cy="76" r="7" fill="#16B47B" style={{filter:'drop-shadow(0 3px 6px rgba(22,180,123,.4))'}}/>
        <path d="M218,76 l3,3 6-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>

      {/* bubbles */}
      <g className="trk-b1"><circle cx="18"  cy="30"  r="8"   fill="rgba(167,139,250,.5)" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><circle cx="15.6" cy="27.6" r="2.2" fill="rgba(255,255,255,.7)"/></g>
      <g className="trk-b2"><circle cx="8"   cy="54"  r="5.5" fill="rgba(167,139,250,.5)" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><circle cx="6.3"  cy="52.3" r="1.5" fill="rgba(255,255,255,.7)"/></g>
      <g className="trk-b3"><circle cx="228" cy="140" r="7"   fill="rgba(167,139,250,.5)" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><circle cx="225.9" cy="137.9" r="2" fill="rgba(255,255,255,.7)"/></g>
      <g className="trk-b4"><circle cx="232" cy="162" r="4.5" fill="rgba(167,139,250,.5)" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"/><circle cx="230.6" cy="160.6" r="1.3" fill="rgba(255,255,255,.7)"/></g>

      {/* sparkles */}
      <path className="trk-s1" d="M216 38 l2-6 2 6 6 2-6 2-2 6-2-6-6-2z" fill="#A78BFA" opacity=".85"/>
      <path className="trk-s2" d="M24 130 l1.5-4 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5z" fill="#A78BFA" opacity=".75"/>
      <path className="trk-s3" d="M28 170 l1-3 1 3 3 1-3 1-1 3-1-3-3-1z" fill="#FFC857" opacity=".8"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════
   4. HERO WASH SCENE — wider banner version
      (used in the home page hero card)
══════════════════════════════════════════════ */
export { WashSceneSVG as HomeWashSVG };

/* ══════════════════════════════════════════════
   5. SPLASH ANIMATED SCENE
      Man actively scrubbing the car with:
      – arm oscillation (CSS keyframes on <g>)
      – floating bubbles (translateY)
      – suds opacity pulse
      – sparkle twinkle
      – water drips from sponge
      Coordinates: footX=205 footY=200 scale=0.92
      Shoulder pivot: (182.92, 130.08)
══════════════════════════════════════════════ */
export function SplashSceneSVG({ width = 260 }) {
  return (
    <svg width={width} viewBox="0 0 240 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sp-body" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#74BBFF"/><stop offset="1" stopColor="#2E7DE0"/>
        </linearGradient>
        <linearGradient id="sp-head" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#A6D8FF"/><stop offset="1" stopColor="#5BABF0"/>
        </linearGradient>
        <linearGradient id="sp-legs" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#1A65C8"/><stop offset="1" stopColor="#0E4390"/>
        </linearGradient>
        <linearGradient id="sp-car" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#7FC9FF"/><stop offset="1" stopColor="#2A7DE0"/>
        </linearGradient>
        <linearGradient id="sp-roof" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#BDE0FF"/><stop offset="1" stopColor="#5BABF0"/>
        </linearGradient>
        <filter id="sp-drop" x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#1A5DC0" floodOpacity="0.22"/>
        </filter>

        {/* ── animation keyframes ── */}
        <style>{`
          @keyframes sp-scrub {
            0%,100% { transform: rotate(0deg); }
            28%     { transform: rotate(17deg); }
            72%     { transform: rotate(-12deg); }
          }
          @keyframes sp-suds {
            0%,100% { opacity: .92; }
            50%     { opacity: .48; }
          }
          @keyframes sp-bfloat {
            0%   { opacity: .72; transform: translateY(0); }
            100% { opacity: 0;   transform: translateY(-30px); }
          }
          @keyframes sp-twinkle {
            0%,100% { opacity: .85; transform: scale(1); }
            50%     { opacity: .08; transform: scale(.65); }
          }
          @keyframes sp-drip {
            0%   { opacity: 0;   transform: translateY(-2px); }
            25%  { opacity: .8; }
            100% { opacity: 0;   transform: translateY(15px); }
          }
          .sp-arm {
            transform-origin: 182.92px 130.08px;
            animation: sp-scrub 1.05s cubic-bezier(.37,0,.63,1) infinite;
          }
          .sp-suds { animation: sp-suds 1.7s ease-in-out infinite; }
          .sp-b1   { animation: sp-bfloat 2.1s ease-out infinite; }
          .sp-b2   { animation: sp-bfloat 2.4s ease-out infinite .55s; }
          .sp-b3   { animation: sp-bfloat 2.2s ease-out infinite 1.1s; }
          .sp-b4   { animation: sp-bfloat 2.6s ease-out infinite .85s; }
          .sp-b5   { animation: sp-bfloat 2.0s ease-out infinite 1.5s; }
          .sp-s1   { animation: sp-twinkle 1.4s ease-in-out infinite; }
          .sp-s2   { animation: sp-twinkle 1.8s ease-in-out infinite .7s; }
          .sp-d1   { animation: sp-drip 1.05s linear infinite; }
          .sp-d2   { animation: sp-drip 1.05s linear infinite .28s; }
        `}</style>
      </defs>

      {/* ground shadow */}
      <ellipse cx="120" cy="214" rx="115" ry="9" fill="rgba(77,163,255,0.16)"/>

      {/* ── floating bubbles ── */}
      <g className="sp-b1">
        <circle cx="22" cy="38" r="12" fill="rgba(191,224,255,.6)" stroke="rgba(255,255,255,.75)" strokeWidth="1.5"/>
        <circle cx="17.4" cy="33.4" r="3.4" fill="rgba(255,255,255,.72)"/>
      </g>
      <g className="sp-b2">
        <circle cx="8" cy="62" r="7" fill="rgba(191,224,255,.6)" stroke="rgba(255,255,255,.75)" strokeWidth="1.5"/>
        <circle cx="5.9" cy="59.9" r="2" fill="rgba(255,255,255,.72)"/>
      </g>
      <g className="sp-b3">
        <circle cx="214" cy="28" r="10" fill="rgba(191,224,255,.6)" stroke="rgba(255,255,255,.75)" strokeWidth="1.5"/>
        <circle cx="211" cy="25" r="2.8" fill="rgba(255,255,255,.72)"/>
      </g>
      <g className="sp-b4">
        <circle cx="226" cy="52" r="6" fill="rgba(191,224,255,.6)" stroke="rgba(255,255,255,.75)" strokeWidth="1.5"/>
        <circle cx="224.2" cy="50.2" r="1.7" fill="rgba(255,255,255,.72)"/>
      </g>
      <g className="sp-b5">
        <circle cx="46" cy="22" r="8" fill="rgba(191,224,255,.55)" stroke="rgba(255,255,255,.75)" strokeWidth="1.5"/>
        <circle cx="43.6" cy="19.6" r="2.2" fill="rgba(255,255,255,.72)"/>
      </g>

      {/* sparkles */}
      <path className="sp-s1" d="M42 80 l3-8 3 8 8 3-8 3-3 8-3-8-8-3z" fill="#FFC857"/>
      <path className="sp-s2" d="M198 78 l2-5 2 5 5 2-5 2-2 5-2-5-5-2z" fill="#FFC857"/>

      {/* ── car ── */}
      <ellipse cx="52"  cy="165" rx="23" ry="6" fill="rgba(20,50,130,.14)"/>
      <ellipse cx="148" cy="165" rx="23" ry="6" fill="rgba(20,50,130,.14)"/>
      {/* rear wheel */}
      <circle cx="52" cy="172" r="20" fill="#2A3A50" filter="url(#sp-drop)"/>
      <circle cx="52" cy="172" r="13" fill="#5E7A90"/>
      <circle cx="52" cy="172" r="5.5" fill="#D0E8F5"/>
      <circle cx="52" cy="172" r="2"   fill="#A8C4D8"/>
      <line x1="52" y1="159" x2="52" y2="185" stroke="rgba(180,210,230,.55)" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="39" y1="172" x2="65" y2="172" stroke="rgba(180,210,230,.55)" strokeWidth="1.8" strokeLinecap="round"/>
      {/* front wheel */}
      <circle cx="148" cy="172" r="20" fill="#2A3A50" filter="url(#sp-drop)"/>
      <circle cx="148" cy="172" r="13" fill="#5E7A90"/>
      <circle cx="148" cy="172" r="5.5" fill="#D0E8F5"/>
      <circle cx="148" cy="172" r="2"   fill="#A8C4D8"/>
      <line x1="148" y1="159" x2="148" y2="185" stroke="rgba(180,210,230,.55)" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="135" y1="172" x2="161" y2="172" stroke="rgba(180,210,230,.55)" strokeWidth="1.8" strokeLinecap="round"/>
      {/* car body */}
      <rect x="14" y="130" width="174" height="44" rx="22" fill="url(#sp-car)" filter="url(#sp-drop)"/>
      <rect x="22" y="134" width="158" height="13" rx="6.5" fill="rgba(255,255,255,.22)"/>
      {/* roof */}
      <path d="M44,130 Q48,92 72,86 L132,86 Q158,92 160,130 Z" fill="url(#sp-roof)"/>
      {/* rear window */}
      <path d="M52,126 Q56,96 76,90 L118,90 L116,126 Z" fill="rgba(215,240,255,.88)"/>
      <rect x="118" y="90" width="4" height="36" rx="2" fill="rgba(30,75,165,.22)"/>
      {/* front window */}
      <path d="M124,90 L134,90 Q156,96 156,126 L124,126 Z" fill="rgba(215,240,255,.88)"/>
      <ellipse cx="90"  cy="106" rx="14" ry="7" fill="rgba(255,255,255,.26)"/>
      <ellipse cx="140" cy="106" rx="9"  ry="5" fill="rgba(255,255,255,.22)"/>
      {/* lights */}
      <rect x="182" y="140" width="5" height="16" rx="2.5" fill="#FFF6A5" opacity=".9"/>
      <rect x="15"  y="140" width="5" height="16" rx="2.5" fill="#FF8090" opacity=".85"/>
      <rect x="157" y="100" width="13" height="8" rx="3.5" fill="#5BABF0" opacity=".85"/>

      {/* ── soap suds (pulsing) ── */}
      <g className="sp-suds">
        <ellipse cx="76"  cy="83" rx="22" ry="9"   fill="rgba(235,248,255,.92)"/>
        <ellipse cx="110" cy="78" rx="18" ry="8"   fill="rgba(235,248,255,.88)"/>
        <circle  cx="62"  cy="80" r="7"             fill="rgba(245,252,255,.94)"/>
        <circle  cx="88"  cy="73" r="8"             fill="rgba(245,252,255,.90)"/>
        <circle  cx="116" cy="76" r="6"             fill="rgba(245,252,255,.88)"/>
        <circle  cx="130" cy="71" r="7"             fill="rgba(245,252,255,.85)"/>
        <circle  cx="146" cy="78" r="5.5"           fill="rgba(245,252,255,.82)"/>
      </g>

      {/* bucket */}
      <rect x="192" y="186" width="22" height="18" rx="5" fill="#FFC857"/>
      <rect x="190" y="184" width="26" height="6"  rx="3" fill="#FFD97A"/>
      <ellipse cx="203" cy="198" rx="9" ry="2.5" fill="rgba(77,163,255,.35)"/>

      {/* ── man — static parts ── */}
      {/* shoes */}
      <ellipse cx="195.8" cy="200" rx="11.96" ry="6.44" fill="#14284A"/>
      <ellipse cx="214.2" cy="200" rx="11.96" ry="6.44" fill="#14284A"/>
      {/* legs */}
      <rect x="186.6"  y="157.68" width="14.72" height="44.16" rx="7.36" fill="url(#sp-legs)"/>
      <rect x="208.68" y="157.68" width="14.72" height="44.16" rx="7.36" fill="url(#sp-legs)"/>
      {/* torso */}
      <rect x="181.08" y="111.68" width="47.84" height="49.68" rx="22.08" fill="url(#sp-body)"/>
      <ellipse cx="205" cy="124.56" rx="14.72" ry="8.28" fill="rgba(255,255,255,.28)"/>
      {/* right arm — relaxed */}
      <path d="M 227.08,130.08 Q 236.28,144.8 230.76,154"
        stroke="url(#sp-body)" strokeWidth="12.88" strokeLinecap="round" fill="none"/>

      {/* ── animated sponge arm (pivot = shoulder 182.92,130.08) ── */}
      <g className="sp-arm">
        {/* arm strokes */}
        <path d="M 182.92,130.08 Q 173.72,122.95 164.52,119.27"
          stroke="url(#sp-body)" strokeWidth="14.72" strokeLinecap="round" fill="none"/>
        <path d="M 182.92,130.08 Q 173.72,122.95 164.52,119.27"
          stroke="rgba(255,255,255,.22)" strokeWidth="7.36" strokeLinecap="round" fill="none"/>
        {/* sponge body */}
        <rect x="151.64" y="110.07" width="23.92" height="16.56" rx="7.36" fill="#FFD166"/>
        <rect x="151.64" y="110.07" width="23.92" height="16.56" rx="7.36"
          fill="none" stroke="rgba(180,120,0,.30)" strokeWidth="1.5"/>
        {/* pores */}
        <circle cx="159.92" cy="117.43" r="2.3"  fill="rgba(180,120,0,.22)"/>
        <circle cx="166.36" cy="114.67" r="1.84" fill="rgba(180,120,0,.18)"/>
        <circle cx="168.2"  cy="121.11" r="1.84" fill="rgba(180,120,0,.20)"/>
        {/* water drips */}
        <g className="sp-d1">
          <path d="M 160.36,126.95 Q 159.44,134.63 161.28,138.47"
            stroke="rgba(77,163,255,.65)" strokeWidth="2" strokeLinecap="round" fill="none"/>
        </g>
        <g className="sp-d2">
          <path d="M 168.2,126.95 Q 169.12,132.79 167.28,136.63"
            stroke="rgba(77,163,255,.55)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        </g>
      </g>

      {/* ── head (drawn on top so arm goes behind head if needed) ── */}
      <circle cx="205" cy="87.76" r="25.76" fill="url(#sp-head)"/>
      <ellipse cx="197.64" cy="77.64" rx="11.96" ry="8.28" fill="rgba(255,255,255,.32)"/>
      {/* eyes */}
      <circle cx="196.72" cy="87.76" r="6.44" fill="#fff"/>
      <circle cx="213.28" cy="87.76" r="6.44" fill="#fff"/>
      <circle cx="197.64" cy="88.68" r="3.68" fill="#1A3A6A"/>
      <circle cx="214.2"  cy="88.68" r="3.68" fill="#1A3A6A"/>
      <circle cx="195.8"  cy="85.92" r="1.38" fill="#fff"/>
      <circle cx="212.36" cy="85.92" r="1.38" fill="#fff"/>
      {/* smile */}
      <path d="M 195.8,100.04 Q 205,107.52 214.2,100.04"
        stroke="#1A3A6A" strokeWidth="2.3" strokeLinecap="round" fill="none"/>
      {/* cap */}
      <ellipse cx="205" cy="64.76" rx="23.92" ry="7.36" fill="#1A5DC0"/>
      <ellipse cx="205" cy="63.84" rx="18.4"  ry="5.52" fill="#2E7DE0"/>
      <path d="M 181.08,67.52 Q 173.72,71.92 175.56,76.72 Q 184.76,68.56 193.96,68.56 Z" fill="#1A5DC0"/>
    </svg>
  );
}
