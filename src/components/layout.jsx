/* Verst Carbon dMRV — shared layout parts used across screens. */
import React from 'react';
import { FuelBadge, Icon, Button } from '../designSystem.jsx';

const { useState } = React;

function Panel({ title, sub, actions, children, pad = true, style = {} }) {
  return (
    <section style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)', ...style }}>
      {(title || actions) && (
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {title && <div style={{ fontSize: 'var(--fs-h3)', fontWeight: 700, color: 'var(--ink-900)' }}>{title}</div>}
            {sub && <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 1 }}>{sub}</div>}
          </div>
          {actions}
        </header>
      )}
      <div style={{ padding: pad ? 16 : 0 }}>{children}</div>
    </section>
  );
}

function PageHeader({ title, sub, breadcrumb, actions }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 18 }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {breadcrumb}
        <h1 style={{ fontSize: 'var(--fs-h1)', fontWeight: 800, color: 'var(--ink-900)', marginTop: breadcrumb ? 8 : 0 }}>{title}</h1>
        {sub && <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>{sub}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8, flex: 'none' }}>{actions}</div>}
    </div>
  );
}

function FuelChips({ fuels, selected, onToggle }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {fuels.map(f => {
        const on = selected.includes(f);
        return (
          <button key={f} onClick={() => onToggle(f)} style={{
            padding: 0, background: 'none', border: 'none', cursor: 'pointer',
            opacity: selected.length === 0 || on ? 1 : 0.42, transition: 'opacity var(--dur-fast)',
            outline: on ? '2px solid var(--brand-primary)' : 'none', outlineOffset: 1, borderRadius: 999,
          }}>
            <FuelBadge fuel={f} />
          </button>
        );
      })}
    </div>
  );
}

function MapPanel({ devices, geo, proponentName }) {
  // cluster device counts by proponent location
  const clusters = {};
  devices.forEach(d => { clusters[d.proponent] = (clusters[d.proponent] || 0) + 1; });
  const offline = {};
  devices.filter(d => d.status !== 'online').forEach(d => { offline[d.proponent] = (offline[d.proponent] || 0) + 1; });
  const keys = Object.keys(clusters);
  return (
    <div style={{ position: 'relative', height: 300, borderRadius: 'var(--radius-sm)', background: 'linear-gradient(180deg,#f4f8f3,#eef3ee)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
      {/* faint graticule */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} preserveAspectRatio="none" viewBox="0 0 100 100">
        {[20,40,60,80].map(x => <line key={'v'+x} x1={x} y1="0" x2={x} y2="100" stroke="#cfe0cc" strokeWidth="0.2" />)}
        {[25,50,75].map(y => <line key={'h'+y} x1="0" y1={y} x2="100" y2={y} stroke="#cfe0cc" strokeWidth="0.2" />)}
      </svg>
      <span style={{ position: 'absolute', left: 14, top: 12, fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>West Africa</span>
      <span style={{ position: 'absolute', right: 14, top: 12, fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>East Africa</span>
      {keys.map(k => {
        const g = geo[k]; if (!g) return null;
        const total = clusters[k]; const off = offline[k] || 0;
        const r = 12 + Math.min(22, total);
        return (
          <div key={k} style={{ position: 'absolute', left: g.x + '%', top: g.y + '%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: r, height: r, borderRadius: 999, background: 'rgba(0,128,55,0.14)', border: '1.5px solid var(--brand-primary)' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--green-700)', fontFamily: 'var(--font-data)' }}>{total}</span>
              {off > 0 && <span style={{ position: 'absolute', top: -3, right: -3, width: 9, height: 9, borderRadius: 999, background: 'var(--danger-500)', border: '1.5px solid #fff' }} />}
            </span>
            <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-700)', whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.7)', padding: '0 4px', borderRadius: 3 }}>{proponentName(k)}</span>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 14, bottom: 12, display: 'flex', gap: 14, fontSize: 10, color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.75)', padding: '4px 8px', borderRadius: 6 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 999, background: 'rgba(0,128,55,0.2)', border: '1.5px solid var(--brand-primary)' }} />Deployment cluster</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 999, background: 'var(--danger-500)' }} />Has offline devices</span>
      </div>
    </div>
  );
}

function lastSeenText(min) {
  if (min < 60) return min + 'm ago';
  if (min < 1440) return Math.floor(min / 60) + 'h ago';
  return Math.floor(min / 1440) + 'd ago';
}

function CategoryTag({ category, size = 'md' }) {
  const inst = category === 'institution';
  const small = size === 'sm';
  const fg = inst ? 'var(--fuel-electric-strong)' : 'var(--ink-700)';
  const bg = inst ? 'var(--fuel-electric-soft)' : 'var(--grey-100)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: small ? 4 : 5, height: small ? 18 : 22, padding: small ? '0 8px' : '0 9px', background: bg, color: fg, borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-sans)', fontSize: small ? 'var(--fs-2xs)' : 'var(--fs-xs)', fontWeight: 600, lineHeight: 1, whiteSpace: 'nowrap' }}>
      <Icon name={inst ? 'building' : 'home'} size={small ? 11 : 12} />
      {inst ? 'Institution' : 'Household'}
    </span>
  );
}


export { Panel, PageHeader, FuelChips, MapPanel, lastSeenText, CategoryTag };
