export default function StatusBar({ white }) {
  return (
    <div className={`status-bar${white ? ' white' : ''}`}>
      <span>9:41</span>
      <div className="status-icons">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect x="1" y="15" width="3" height="6" rx="1"/>
          <rect x="6" y="11" width="3" height="10" rx="1"/>
          <rect x="11" y="7" width="3" height="14" rx="1"/>
          <rect x="16" y="3" width="3" height="18" rx="1" opacity=".35"/>
        </svg>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 19a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm0-4.5a6 6 0 0 1 4.24 1.76l-1.42 1.42A4 4 0 0 0 12 16.5a4 4 0 0 0-2.83 1.17L7.75 16.25A6 6 0 0 1 12 14.5zm0-4.5a9.5 9.5 0 0 1 6.72 2.78l-1.42 1.42A7.5 7.5 0 0 0 12 11.5a7.5 7.5 0 0 0-5.3 2.2L5.28 12.28A9.5 9.5 0 0 1 12 10z"/>
        </svg>
        <svg width="22" height="12" viewBox="0 0 24 13" fill="none">
          <rect x="0.5" y="0.5" width="20" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.3"/>
          <rect x="2" y="2" width="15" height="9" rx="1.5" fill="currentColor"/>
          <path d="M22 4.5v4a2 2 0 0 0 0-4z" fill="currentColor" opacity=".5"/>
        </svg>
      </div>
    </div>
  );
}
