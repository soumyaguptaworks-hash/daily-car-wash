import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import L from './layout.module.css';

const cx = (...a) => a.filter(Boolean).join(' ');

export function Page({ children, wide, className }) {
  return <div className={cx(L.page, wide && L.pageWide, className)}>{children}</div>;
}

export function TopBar({ title, subtitle, back = true, right, onBack }) {
  const nav = useNavigate();
  return (
    <header className={L.topbar}>
      {back && (
        <button className={L.back} aria-label="Back" onClick={onBack || (() => nav(-1))}>
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>
      )}
      <div className={L.titleWrap}>
        <h1 className={L.title}>{title}</h1>
        {subtitle && <p className={L.sub}>{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}

export function Section({ title, action, onAction, children }) {
  return (
    <section className={L.section}>
      {(title || action) && (
        <div className={L.sectionHead}>
          {title && <h2 className={L.sectionTitle}>{title}</h2>}
          {action && <button className={L.link} onClick={onAction}>{action}</button>}
        </div>
      )}
      {children}
    </section>
  );
}

export { L };
