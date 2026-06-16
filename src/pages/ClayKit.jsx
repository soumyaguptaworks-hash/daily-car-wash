import {
  Search, Bell, Rocket, Plus, ArrowRight, Sparkles, Briefcase,
  BookOpen, Dumbbell, Coffee, Palette, Calendar as CalIcon, Sun,
} from 'lucide-react';
import {
  ClayKit, ClayCard, ClayButton, ClayIconButton, ClayBadge, ClayChip,
  ClayInput, ClayToggle, ClayCheck, ClayProgress, ClayAvatar, ClayTile,
  ClayCalendar,
} from '../components/ui';
import s from './ClayKit.module.css';

export default function ClayKitShowcase() {
  return (
    <ClayKit>
      <div className={s.stage}>
        <div className={s.wrap}>

          {/* ── top bar ── */}
          <header className={s.topbar}>
            <div className={s.brand}>
              <ClayAvatar>C</ClayAvatar>
              <div>
                <div className={s.brandTitle}>Clay UI</div>
                <div className={s.brandSub}>Claymorphism component kit</div>
              </div>
            </div>
            <div className={s.row}>
              <ClayIconButton variant="soft" aria-label="search"><Search size={20} /></ClayIconButton>
              <ClayIconButton aria-label="notifications"><Bell size={20} /></ClayIconButton>
            </div>
          </header>

          {/* ── hero ── */}
          <section className={s.hero}>
            <span className={s.heroEyebrow}>Soft · Puffy · Tactile</span>
            <h1 className={s.heroTitle}>Plan and manage<br />your day, <em>beautifully</em></h1>
            <p className={s.heroText}>
              A self-contained claymorphism design system — squishy clay surfaces,
              soft double shadows, and rounded everything.
            </p>
            <div className={s.row} style={{ justifyContent: 'center', marginTop: 26 }}>
              <ClayButton size="lg">Get started <ArrowRight size={18} /></ClayButton>
              <ClayButton size="lg" variant="soft">Components</ClayButton>
            </div>
          </section>

          {/* ── recreated reference screens ── */}
          <section className={s.screens}>

            {/* SCREEN 1 — calendar + activities */}
            <div className={s.phone}>
              <ClayCard>
                <div className={s.spread} style={{ marginBottom: 16 }}>
                  <div className={s.row}>
                    <ClayAvatar style={{ width: 44, height: 44, fontSize: 17, borderRadius: 16 }}>P</ClayAvatar>
                    <div>
                      <div className={s.itemTitle}>Peter Parker</div>
                      <div className={s.itemSub}>Good morning ☀️</div>
                    </div>
                  </div>
                  <ClayIconButton variant="soft" style={{ width: 40, height: 40 }}><Bell size={17} /></ClayIconButton>
                </div>
                <ClayInput icon={<Search size={18} color="#9DB4CE" />} placeholder="Search tasks…" />
              </ClayCard>

              <ClayCard tight>
                <ClayCalendar today={18} dotted={[6, 14, 22, 27]} />
              </ClayCard>

              <ClayCard tight>
                <div className={s.spread} style={{ marginBottom: 14 }}>
                  <span className={s.demoTitle} style={{ margin: 0 }}>Activities</span>
                  <span className={s.muted}>See all</span>
                </div>
                <Item tile={<Briefcase size={20} />} color="#4DA3FF" title="Work" sub="3 tasks · 9:00 AM" />
                <Item tile={<BookOpen size={20} />} color="#A78BFA" title="Learn" sub="1 task · 1:00 PM" />
                <Item tile={<Dumbbell size={20} />} color="#34D399" title="Fitness" sub="2 tasks · 6:00 PM" />
              </ClayCard>
            </div>

            {/* SCREEN 2 — hero CTA card */}
            <div className={s.phone}>
              <ClayCard style={{ textAlign: 'center', paddingTop: 34, paddingBottom: 30 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22 }}>
                  <ClayTile color="#4DA3FF" style={{ width: 132, height: 132, borderRadius: 40 }}>
                    <Rocket size={62} />
                  </ClayTile>
                </div>
                <h2 className={`${s.heroTitle}`} style={{ fontSize: 26 }}>Plan and manage<br />your day</h2>
                <p className={s.heroText} style={{ fontSize: 14, marginTop: 12, marginBottom: 24 }}>
                  Come and track daily tasks on your smartphone.
                </p>
                <ClayButton full>Get started <ArrowRight size={18} /></ClayButton>
              </ClayCard>

              <ClayCard tight>
                <div className={s.spread}>
                  <div className={s.row}>
                    <ClayTile color="#FFC857"><Sparkles size={20} /></ClayTile>
                    <div>
                      <div className={s.itemTitle}>You're doing great!</div>
                      <div className={s.itemSub}>5 of 8 tasks done today</div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 16 }}><ClayProgress value={62} /></div>
              </ClayCard>
            </div>

            {/* SCREEN 3 — plans timeline */}
            <div className={s.phone}>
              <ClayCard tight>
                <div className={s.spread} style={{ marginBottom: 16 }}>
                  <div>
                    <div className={s.muted}>Tuesday</div>
                    <div className={s.statBig}>18 <span style={{ fontSize: 16 }}>Jan</span></div>
                  </div>
                  <ClayIconButton fab aria-label="add"><Plus size={26} /></ClayIconButton>
                </div>
                <div className={s.col}>
                  <div className={s.tlBlock} style={{ background: 'linear-gradient(150deg,#66B2FF,#2E7DE0)' }}>
                    <div className={s.tlTime}>09:00 — 10:30</div>Team standup
                  </div>
                  <div className={s.tlBlock} style={{ background: 'linear-gradient(150deg,#34D399,#16B47B)' }}>
                    <div className={s.tlTime}>11:00 — 12:00</div>Design review
                  </div>
                  <div className={s.tlBlock} style={{ background: 'linear-gradient(150deg,#FF8FB1,#F2638C)' }}>
                    <div className={s.tlTime}>14:00 — 15:30</div>Dev app improvements
                  </div>
                </div>
              </ClayCard>

              <ClayCard tight>
                <div className={s.spread} style={{ marginBottom: 14 }}>
                  <span className={s.demoTitle} style={{ margin: 0 }}>Today plans</span>
                  <span className={s.muted}>See all</span>
                </div>
                <ItemCheck tile={<Coffee size={20} />} color="#FFC857" title="Morning coffee ritual" sub="Personal" done />
                <ItemCheck tile={<Palette size={20} />} color="#A78BFA" title="Sketch new concepts" sub="Design" />
                <ItemCheck tile={<Sun size={20} />} color="#4DA3FF" title="Evening walk" sub="Health" />
              </ClayCard>
            </div>
          </section>

          {/* ── component gallery ── */}
          <span className={s.sectionLabel}>The kit</span>
          <h2 className={s.sectionTitle}>Every component, squishy</h2>

          <section className={s.gallery}>
            {/* buttons */}
            <ClayCard>
              <div className={s.demoTitle}>Buttons</div>
              <div className={s.col}>
                <div className={s.row}>
                  <ClayButton>Primary</ClayButton>
                  <ClayButton variant="soft">Soft</ClayButton>
                </div>
                <div className={s.row}>
                  <ClayButton size="sm">Small</ClayButton>
                  <ClayButton size="sm" variant="soft">Small</ClayButton>
                  <ClayIconButton aria-label="add"><Plus size={20} /></ClayIconButton>
                  <ClayIconButton variant="soft" aria-label="cal"><CalIcon size={18} /></ClayIconButton>
                </div>
              </div>
            </ClayCard>

            {/* inputs */}
            <ClayCard>
              <div className={s.demoTitle}>Inputs</div>
              <div className={s.col}>
                <ClayInput icon={<Search size={18} color="#9DB4CE" />} placeholder="Search…" />
                <ClayInput placeholder="Your name" />
              </div>
            </ClayCard>

            {/* toggles & checks */}
            <ClayCard>
              <div className={s.demoTitle}>Toggles & checks</div>
              <div className={s.col}>
                <div className={s.spread}><span className={s.muted}>Notifications</span><ClayToggle checked /></div>
                <div className={s.spread}><span className={s.muted}>Dark mode</span><ClayToggle /></div>
                <div className={s.row}>
                  <ClayCheck checked /><ClayCheck /><span className={s.muted}>Mark complete</span>
                </div>
              </div>
            </ClayCard>

            {/* badges & chips */}
            <ClayCard>
              <div className={s.demoTitle}>Badges & chips</div>
              <div className={s.col}>
                <div className={s.row}>
                  <ClayBadge color="#34D399">Done</ClayBadge>
                  <ClayBadge color="#4DA3FF">Scheduled</ClayBadge>
                  <ClayBadge color="#FF8FB1">Urgent</ClayBadge>
                </div>
                <div className={s.row}>
                  <ClayChip active>Today</ClayChip>
                  <ClayChip>Week</ClayChip>
                  <ClayChip>Month</ClayChip>
                </div>
              </div>
            </ClayCard>

            {/* progress */}
            <ClayCard>
              <div className={s.demoTitle}>Progress</div>
              <div className={s.col} style={{ gap: 18 }}>
                <div><div className={s.spread} style={{ marginBottom: 8 }}><span className={s.muted}>Daily goal</span><span className={s.muted}>62%</span></div><ClayProgress value={62} /></div>
                <div><div className={s.spread} style={{ marginBottom: 8 }}><span className={s.muted}>Weekly</span><span className={s.muted}>85%</span></div><ClayProgress value={85} /></div>
              </div>
            </ClayCard>

            {/* tiles & avatars */}
            <ClayCard>
              <div className={s.demoTitle}>Tiles & avatars</div>
              <div className={s.row}>
                <ClayTile color="#4DA3FF"><Briefcase size={20} /></ClayTile>
                <ClayTile color="#34D399"><Dumbbell size={20} /></ClayTile>
                <ClayTile color="#FFC857"><Coffee size={20} /></ClayTile>
                <ClayTile color="#A78BFA"><Palette size={20} /></ClayTile>
                <ClayAvatar>A</ClayAvatar>
              </div>
            </ClayCard>
          </section>

          <footer className={s.footer}>Built with React + lucide-react · pure CSS claymorphism</footer>
        </div>
      </div>
    </ClayKit>
  );
}

/* ── local helpers ── */
function Item({ tile, color, title, sub }) {
  return (
    <div className={s.listItem}>
      <ClayTile color={color}>{tile}</ClayTile>
      <div className={s.itemBody}>
        <div className={s.itemTitle}>{title}</div>
        <div className={s.itemSub}>{sub}</div>
      </div>
    </div>
  );
}

function ItemCheck({ tile, color, title, sub, done }) {
  return (
    <div className={s.listItem}>
      <ClayTile color={color}>{tile}</ClayTile>
      <div className={s.itemBody}>
        <div className={s.itemTitle}>{title}</div>
        <div className={s.itemSub}>{sub}</div>
      </div>
      <ClayCheck checked={done} />
    </div>
  );
}
