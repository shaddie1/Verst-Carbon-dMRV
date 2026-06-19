/* Kenya POA dMRV — unified platform shell (dark sidebar + topbar).
   Renders the active page in a light content area via <Outlet/>. Scoped to .kp
   on the chrome only, so embedded clean-cooking screens keep their own tokens. */
import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { SCOPES } from './sectoralData.js';
import './sectoral.css';

const { useState } = React;

const NAV = [
  { group: 'Programme' },
  { key: 'dashboard', label: 'Dashboard', path: '/', icon: 'grid' },
  { key: 'scopes', label: 'Sectoral scopes', path: '/scope/energy', icon: 'layers' },
  { key: 'projects', label: 'Projects (VPAs)', path: '/energy/devices', icon: 'folder' },
  { key: 'registry', label: 'Registry', path: '/energy/reports', icon: 'registry' },
  { group: 'Operations' },
  { key: 'monitoring', label: 'Monitoring', path: '/energy', icon: 'pulse' },
  { key: 'reports', label: 'Reports', path: '/energy/reports', icon: 'doc' },
  { key: 'settings', label: 'Settings', path: '/', icon: 'gear' },
];

function NavIcon({ name }) {
  const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'grid': return <svg {...p}><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></svg>;
    case 'layers': return <svg {...p}><path d="M3 7l9-4 9 4-9 4-9-4z" /><path d="M3 12l9 4 9-4" /><path d="M3 17l9 4 9-4" /></svg>;
    case 'folder': return <svg {...p}><path d="M4 20V7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" /></svg>;
    case 'registry': return <svg {...p}><circle cx="8" cy="8" r="5" /><path d="M12.5 12.5L21 21" /><circle cx="16" cy="16" r="4" /></svg>;
    case 'pulse': return <svg {...p}><path d="M3 12h4l2 6 4-14 2 8h6" /></svg>;
    case 'doc': return <svg {...p}><path d="M14 3v5h5" /><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M8 13h8M8 17h6" /></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.81 1.17V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.6 15H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6h.09A1.65 1.65 0 0 0 11 3.09V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 16.91 5l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 21 11h.09A2 2 0 0 1 21 15z" /></svg>;
  }
}

function SideButton({ item, active, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      display: 'flex', alignItems: 'center', gap: 11, padding: '9px 10px', borderRadius: 6, border: 0, cursor: 'pointer',
      width: '100%', textAlign: 'left', fontFamily: 'inherit', fontSize: 13.5, fontWeight: active ? 600 : 500,
      background: active ? '#008037' : h ? 'rgba(255,255,255,.05)' : 'transparent',
      color: active ? '#fff' : h ? '#EAF3EC' : '#AFC2B5',
    }}>
      <NavIcon name={item.icon} /><span>{item.label}</span>
    </button>
  );
}

function SectoralShell() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // resolve the current area from the URL
  const isOverview = pathname === '/';
  const isScope = pathname.startsWith('/scope/');
  const isEnergy = pathname.startsWith('/energy');
  const scopeKey = isScope ? pathname.split('/')[2] : null;

  const activeKey = isOverview ? 'dashboard'
    : isScope ? 'scopes'
      : pathname.startsWith('/energy/devices') ? 'projects'
        : pathname.startsWith('/energy/reports') ? 'reports'
          : isEnergy ? 'monitoring' : 'dashboard';

  let eyebrow = 'Kenya POA · National programme', title = 'Sectoral scopes', back = null;
  if (isScope) { eyebrow = null; title = (SCOPES[scopeKey] || {}).name || 'Scope'; back = { label: 'All sectoral scopes', to: '/' }; }
  else if (isEnergy) { eyebrow = null; title = 'Clean-cooking monitoring'; back = { label: 'Energy demand', to: '/scope/energy' }; }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F7F9F6' }}>
      {/* sidebar */}
      <aside className="kp" style={{ width: 248, flex: 'none', background: '#0E1A12', color: '#C7D6CC', display: 'flex', flexDirection: 'column', padding: '18px 14px', borderRight: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '4px 8px 16px' }}>
          <svg width="30" height="30" viewBox="0 0 320 320" aria-hidden="true"><g transform="translate(8,4)" stroke="#fff" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M150 280A100 100 0 0 1 133 86C214 70 235 62 263 28c14 28 28 59 28 113 0 78-68 142-141 142Z" /><path d="M28 296c0-43 26-76 72-85" /></g></svg>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontWeight: 700, fontSize: 17, color: '#fff', letterSpacing: '-.01em' }}>Kenya POA</span>
            <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#86D2A1', marginTop: 5 }}>dMRV Platform</span>
          </div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {NAV.map((it, i) => it.group
            ? <div key={'g' + i} style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: '#5F7468', padding: '6px 10px 4px', marginTop: i ? 16 : 0 }}>{it.group}</div>
            : <SideButton key={it.key} item={it} active={activeKey === it.key} onClick={() => navigate(it.path)} />)}
        </nav>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'rgba(255,255,255,.04)', borderRadius: 6 }}>
            <span className="kp-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#4DB874', flex: 'none', animation: 'kpPulse 2.2s ease-out infinite' }} />
            <div>
              <div style={{ fontSize: 13, color: '#EAF3EC', fontWeight: 600 }}>4,612 / 4,860 reporting</div>
              <div style={{ fontSize: 11, color: '#7E9286' }}>Synced 4 min ago</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px' }}>
            <span style={{ width: 30, height: 30, borderRadius: '50%', background: '#0E7490', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, flex: 'none' }}>AO</span>
            <div style={{ lineHeight: 1.3, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: '#EAF3EC', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Achieng Otieno</div>
              <div style={{ fontSize: 11, color: '#7E9286' }}>Programme operator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header className="kp" style={{ height: 60, flex: 'none', background: '#fff', borderBottom: '1px solid #DCE3DD', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', gap: 18 }}>
          <div>
            {eyebrow && <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.09em', color: '#6B786F', marginBottom: 2 }}>{eyebrow}</div>}
            {back && (
              <button onClick={() => navigate(back.to)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, border: 0, background: 'transparent', padding: 0, marginBottom: 3, cursor: 'pointer', fontFamily: 'inherit', fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.07em', color: '#00682C' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                {back.label}
              </button>
            )}
            <h1 style={{ margin: 0, fontSize: 23, fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.1, color: '#0E1A12' }}>{title}</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B786F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 11 }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
              <input placeholder="Search projects, serials, sites…" style={{ height: 36, width: 230, padding: '0 12px 0 34px', fontFamily: 'inherit', fontSize: 13, border: '1px solid #BDC6BF', borderRadius: 6, background: '#F7F9F6', color: '#0E1A12', outline: 'none' }} />
            </div>
            <button aria-label="Notifications" style={{ width: 36, height: 36, border: '1px solid #BDC6BF', borderRadius: 6, background: '#fff', color: '#4E5B52', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></svg>
            </button>
            <button onClick={() => navigate('/scope/energy')} style={{ height: 36, padding: '0 14px', border: 0, borderRadius: 6, background: '#008037', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              Register project
            </button>
          </div>
        </header>
        <main style={{ flex: 1, overflowY: 'auto' }}><Outlet /></main>
      </div>
    </div>
  );
}

export { SectoralShell };
