/* Shared chrome + theme tokens for the public Kenya PoA pages
   (landing, stakeholder impact gaps, future sub-pages). Verst Carbon greens. */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../designSystem.jsx';
import './poa.css';

const { useState } = React;

export const INK = '#14181f';        // near-black text on light surfaces
export const GREEN = '#008037';      // Verst forest green (primary)
export const GREEN_700 = '#005825';
export const DEEP = '#04331a';       // deep-forest dark section background
export const LEAF = '#7faf5e';       // light moss accent on dark
export const MOSS = '#589630';
export const MUTED = '#5c615e';
export const LINE = '#e4e6e5';
export const WARN = '#e08a1e';       // gap / attention
export const WARN_SOFT = '#fbe6c6';

export const NAV = [
  { label: 'Programme', href: '/#programme' },
  { label: 'Apply', to: '/apply' },
  { label: 'Partners', href: '/#partners' },
  { label: 'Stakeholders', to: '/poa/stakeholders' },
  { label: 'Resources', href: '/#modules' },
  { label: 'Grievances', href: '/#grievance' },
];

export const section = (extra = {}) => ({ padding: '88px 0', ...extra });

/* Verst Carbon brand lockup. Uses /verst-carbon-logo.png when present;
   falls back to a brand-coloured wordmark so the chrome looks right even
   before the asset is dropped into /public. */
export function Brand({ height = 30, white = false }) {
  const [err, setErr] = useState(false);
  if (!err && !white) {
    return <img src="/verst-carbon-logo.png" alt="Verst Carbon" style={{ height, width: 'auto', display: 'block' }} onError={() => setErr(true)} />;
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: height, height, borderRadius: 8, background: GREEN, color: '#fff', flex: 'none' }}>
        <Icon name="sprout" size={Math.round(height * 0.62)} />
      </span>
      <span style={{ fontSize: Math.round(height * 0.6), fontWeight: 900, letterSpacing: '-0.01em', color: white ? '#fff' : INK }}>
        Verst<span style={{ color: white ? LEAF : GREEN }}>Carbon</span>
      </span>
    </span>
  );
}

export function SectionHead({ eyebrow, title, sub, light }) {
  return (
    <div style={{ maxWidth: 720, marginBottom: 40 }}>
      <div className="poa-eyebrow" style={light ? { color: LEAF } : null}>{eyebrow}</div>
      <h2 style={{ fontSize: 38, fontWeight: 900, marginTop: 12, color: light ? '#fff' : INK }}>{title}</h2>
      {sub && <p style={{ marginTop: 14, fontSize: 17, lineHeight: 1.55, color: light ? 'rgba(255,255,255,0.7)' : MUTED }}>{sub}</p>}
    </div>
  );
}

export function PoaNav() {
  const navigate = useNavigate();
  return (
    <header className="poa-nav">
      <div className="poa-shell" style={{ display: 'flex', alignItems: 'center', gap: 16, height: 66 }}>
        <a onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <Brand height={30} />
          <span className="poa-hide-sm" style={{ paddingLeft: 12, borderLeft: '1px solid var(--poa-line)', fontSize: 11.5, fontWeight: 700, color: 'var(--poa-muted)', lineHeight: 1.3 }}>
            Kenya National Clean Cooking PoA<br />MoEP · Gold Standard GS4GG
          </span>
        </a>
        <div style={{ flex: 1 }} />
        <nav className="poa-hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {NAV.map(n => n.to
            ? <a key={n.label} className="poa-navlink" onClick={() => navigate(n.to)} style={{ cursor: 'pointer' }}>{n.label}</a>
            : <a key={n.label} className="poa-navlink" href={n.href}>{n.label}</a>)}
        </nav>
        <button className="poa-btn poa-btn--primary" style={{ padding: '9px 16px' }} onClick={() => navigate('/login')}>
          Implementing Partner Login
        </button>
      </div>
    </header>
  );
}

export function PoaFooter() {
  const navigate = useNavigate();
  const links = ['Overview', 'Apply as Implementing Partner', 'Implementing Partner Directory', 'Stakeholder Impact Gaps', 'Resources', 'Grievance Redress', 'Public Registry'];
  return (
    <footer style={{ background: DEEP, color: '#fff', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="poa-shell" style={{ padding: '56px 24px', display: 'grid', gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr) minmax(0,1fr)', gap: 40 }}>
        <div>
          <Brand height={30} white />
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: LEAF, marginTop: 16 }}>KENYA NATIONAL</div>
          <div style={{ fontSize: 22, fontWeight: 900, marginTop: 2 }}>CLEAN COOKING POA</div>
          <p style={{ marginTop: 14, fontSize: 13.5, lineHeight: 1.6, color: 'rgba(255,255,255,0.62)', maxWidth: 360 }}>
            The National Clean Cooking Carbon Financing Framework and Multi-Fuel Programme of Activities —
            hosted by MoEP under Gold Standard GS4GG, consolidating six fuel pathways under a single
            programme boundary.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
            <span className="poa-pill" style={{ background: 'rgba(255,255,255,0.06)' }}>Gold Standard GS4GG</span>
            <span className="poa-pill" style={{ background: 'rgba(255,255,255,0.06)' }}>MECD · RECH · AWMS · CLEAR</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>PROGRAMME</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
            {links.map(l => <a key={l} className="poa-navlink" onClick={() => navigate(l === 'Stakeholder Impact Gaps' ? '/poa/stakeholders' : '/')} style={{ fontSize: 13.5, cursor: 'pointer' }}>{l}</a>)}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)' }}>COORDINATING ENTITY</div>
          <div style={{ marginTop: 14, fontSize: 13.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.72)' }}>
            Clean Cooking Unit<br />
            Ministry of Energy &amp; Petroleum<br />
            Kawi House, Popo Road, Nairobi<br />
            +254 20 310112<br />
            info@energy.go.ke
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
            Gold Standard registry — for grievances against the registered PoA, methodology or VVB: help@goldstandard.org
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="poa-shell" style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
          <span>© 2026 Republic of Kenya · Ministry of Energy &amp; Petroleum</span>
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Implementing Partner Login →</span>
        </div>
      </div>
    </footer>
  );
}
