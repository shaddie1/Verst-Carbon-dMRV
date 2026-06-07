/* Verst Carbon dMRV — application shell: Logo, TopNav, Sidebar.
   Reads design-system primitives from the compiled bundle namespace. */
import React from 'react';
import { Icon, IconButton, Avatar, Badge, StatusDot, ProponentLogo } from '../designSystem.jsx';
import { VC_DATA } from '../data.js';

const { useState, useRef, useEffect } = React;

function Logo({ size = 28 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, borderRadius: 7, background: 'var(--brand-primary)', color: '#fff' }}>
        <Icon name="leaf" size={Math.round(size * 0.62)} />
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.01em', color: 'var(--ink-900)' }}>Verst<span style={{ color: 'var(--brand-primary)' }}>Carbon</span></span>
      </span>
    </div>
  );
}

function ProponentSwitcher({ scope, onChange }) {
  const { PROPONENTS, proponentName } = VC_DATA;
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener('mousedown', onDoc); return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const label = scope === 'all' ? 'All proponents' : proponentName(scope);
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 34, padding: '0 10px 0 8px',
        background: open ? 'var(--surface-hover)' : 'var(--white)', border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--ink-900)',
      }}>
        {scope === 'all'
          ? <Icon name="users" size={15} style={{ color: 'var(--brand-primary)' }} />
          : <ProponentLogo name={label} src={(PROPONENTS.find(p => p.id === scope) || {}).logo} size={20} />}
        {label}
        <Icon name="chevronDown" size={15} style={{ color: 'var(--text-muted)' }} />
      </button>
      {open && (
        <div style={{ position: 'absolute', top: 40, left: 0, minWidth: 240, background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', padding: 5, zIndex: 50 }}>
          <MenuItem active={scope === 'all'} onClick={() => { onChange('all'); setOpen(false); }} icon="dashboard" label="All proponents" />
          <div style={{ height: 1, background: 'var(--border-subtle)', margin: '5px 0' }} />
          {PROPONENTS.map(p => (
            <MenuItem key={p.id} active={scope === p.id} onClick={() => { onChange(p.id); setOpen(false); }} label={p.name} sub={p.country} logo={p.name} logoSrc={p.logo} />
          ))}
        </div>
      )}
    </div>
  );
}

function MenuItem({ active, onClick, icon, label, sub, logo, logoSrc }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      display: 'flex', alignItems: 'center', gap: 9, width: '100%', padding: '7px 9px', textAlign: 'left',
      background: active ? 'var(--surface-selected)' : h ? 'var(--surface-hover)' : 'transparent', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
    }}>
      {logo ? <ProponentLogo name={logo} src={logoSrc} size={24} /> : icon && <Icon name={icon} size={15} style={{ color: active ? 'var(--brand-primary)' : 'var(--text-muted)' }} />}
      <span style={{ flex: 1 }}>
        <span style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', fontWeight: active ? 700 : 500, color: active ? 'var(--green-700)' : 'var(--ink-900)' }}>{label}</span>
        {sub && <span style={{ display: 'block', fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>{sub}</span>}
      </span>
      {active && <Icon name="check" size={14} style={{ color: 'var(--brand-primary)' }} />}
    </button>
  );
}

function TopNav({ role, scope, onScopeChange, alertCount, onBell, user }) {
  const [menu, setMenu] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) { if (ref.current && !ref.current.contains(e.target)) setMenu(false); }
    document.addEventListener('mousedown', onDoc); return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 16, height: 'var(--nav-height)', padding: '0 18px',
      background: 'var(--white)', borderBottom: '1px solid var(--border-subtle)', flex: 'none', zIndex: 30,
    }}>
      <Logo />
      <div style={{ width: 1, height: 24, background: 'var(--border-subtle)' }} />
      {role === 'admin'
        ? <ProponentSwitcher scope={scope} onChange={onScopeChange} />
        : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><ProponentLogo name={user.org} size={24} /><span style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--ink-900)' }}>{user.org}</span></span>}
      <div style={{ flex: 1 }} />
      <button onClick={onBell} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
        <Icon name="bell" size={19} />
        {alertCount > 0 && <span style={{ position: 'absolute', top: 5, right: 5, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: 'var(--danger-500)', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-data)' }}>{alertCount}</span>}
      </button>
      <div ref={ref} style={{ position: 'relative' }}>
        <button onClick={() => setMenu(m => !m)} style={{ display: 'flex', alignItems: 'center', gap: 9, height: 38, padding: '0 8px 0 6px', background: menu ? 'var(--surface-hover)' : 'transparent', border: 'none', borderRadius: 'var(--radius-pill)', cursor: 'pointer' }}>
          <Avatar name={user.name} size={28} />
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.2 }}>
            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--ink-900)' }}>{user.name}</span>
            <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>{role === 'admin' ? 'Verst admin' : user.org}</span>
          </span>
          <Icon name="chevronDown" size={15} style={{ color: 'var(--text-muted)' }} />
        </button>
        {menu && (
          <div style={{ position: 'absolute', top: 44, right: 0, minWidth: 200, background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', padding: 5, zIndex: 50 }}>
            <MenuItem icon="user" label="Profile" onClick={() => setMenu(false)} />
            <MenuItem icon="settings" label="Settings" onClick={() => setMenu(false)} />
            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '5px 0' }} />
            <MenuItem icon="logout" label="Sign out" onClick={() => setMenu(false)} />
          </div>
        )}
      </div>
    </header>
  );
}

function Sidebar({ role, active, onNav, alertCount }) {
  const base = [
    { key: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { key: 'devices', label: 'Devices', icon: 'cpu' },
    { key: 'fuels', label: 'Fuels', icon: 'flame' },
    { key: 'households', label: 'Households', icon: 'home' },
    { key: 'reports', label: 'Reports', icon: 'file' },
    { key: 'alerts', label: 'Alerts', icon: 'bell', badge: alertCount },
  ];
  const adminItems = role === 'admin' ? [{ key: 'proponents', label: 'Proponents', icon: 'users' }, { key: 'applications', label: 'Applications', icon: 'inbox', badge: VC_DATA.APPLICATIONS.filter(a => a.status === 'pending').length }] : [];
  const items = base.concat(adminItems);
  return (
    <nav style={{ width: 'var(--sidebar-width)', flex: 'none', background: 'var(--white)', borderRight: '1px solid var(--border-subtle)', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map(it => <SideItem key={it.key} {...it} active={active === it.key} onClick={() => onNav(it.key)} />)}
      <div style={{ flex: 1 }} />
      <SideItem label="Settings" icon="settings" active={active === 'settings'} onClick={() => onNav('settings')} />
    </nav>
  );
}

function SideItem({ label, icon, badge, active, onClick }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      position: 'relative', display: 'flex', alignItems: 'center', gap: 10, width: '100%', height: 38, padding: '0 10px',
      background: active ? 'var(--surface-selected)' : h ? 'var(--surface-hover)' : 'transparent',
      border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textAlign: 'left',
      fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-body)', fontWeight: active ? 600 : 500,
      color: active ? 'var(--green-700)' : 'var(--text-body)',
    }}>
      {active && <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: 3, background: 'var(--brand-primary)' }} />}
      <Icon name={icon} size={18} style={{ color: active ? 'var(--brand-primary)' : 'var(--text-muted)' }} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge > 0 && <span style={{ minWidth: 18, height: 18, padding: '0 5px', borderRadius: 999, background: active ? 'var(--green-tint)' : 'var(--grey-100)', color: active ? 'var(--green-700)' : 'var(--text-secondary)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-data)' }}>{badge}</span>}
    </button>
  );
}


export { Logo, ProponentSwitcher, MenuItem, TopNav, Sidebar, SideItem };
