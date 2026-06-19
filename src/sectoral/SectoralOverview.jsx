/* Kenya POA — national programme overview (the / home).
   Hero + three clickable sectoral-scope cards + carbon-credit lifecycle +
   recent activity. Ported from the updated design mockup. */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SCOPES, SCOPE_ORDER, EVENTS, LIFECYCLE } from './sectoralData.js';
import './sectoral.css';

function ScopeGlyph({ k, size = 20 }) {
  const c = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (k === 'energy') return <svg {...c}><path d="M8.5 14.5c0-3 3.5-4 3.5-8 3 2 5 5 5 8a5 5 0 0 1-10 0c0-1 .3-1.7.7-2.4" /></svg>;
  if (k === 'waste') return <svg {...c}><path d="M3 6h18" /><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /></svg>;
  return <svg {...c}><path d="M12 22v-6" /><path d="M12 16c-3.5 0-6-2.5-6-6 0-3.5 2.5-7 6-9 3.5 2 6 5.5 6 9 0 3.5-2.5 6-6 6z" /></svg>;
}

function LifeGlyph({ name }) {
  const c = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'pulse': return <svg {...c}><path d="M3 12h4l2 6 4-14 2 8h6" /></svg>;
    case 'bars': return <svg {...c}><path d="M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16" /></svg>;
    case 'shield': return <svg {...c}><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>;
    case 'cylinder': return <svg {...c}><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" /><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg>;
    default: return <svg {...c}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></svg>;
  }
}

const cond = (v, label) => (
  <div><div style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: 21, color: '#0E1A12', lineHeight: 1, letterSpacing: '-.02em' }}>{v}</div><div style={{ fontSize: 10.5, color: '#6B786F', marginTop: 5 }}>{label}</div></div>
);

function ScopeCard({ scope, onOpen }) {
  const s = scope;
  return (
    <div onClick={onOpen} role="button" tabIndex={0} className="kp-card"
      style={{ background: '#fff', border: '1px solid #DCE3DD', borderRadius: 12, boxShadow: '0 1px 2px rgba(14,26,18,.04)', borderTop: `3px solid ${s.accent}`, overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
            <span style={{ width: 38, height: 38, borderRadius: 9, background: s.accentBg, color: s.accentFg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><ScopeGlyph k={s.key} /></span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#0E1A12' }}>{s.name}</div>
              <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.06em', color: '#6B786F', marginTop: 3 }}>{s.cardSub}</div>
            </div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: s.cardStatusFg, background: s.cardStatusBg, padding: '4px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>{s.status}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, margin: '18px 0 16px' }}>
          {cond(s.kpi.r, 'tCO₂e reduced')}
          {cond(s.kpi.p, 'projects')}
          {cond(s.kpi.s, s.cardMetric)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#4E5B52', marginBottom: 6 }}>Data completeness<span style={{ fontFamily: "'IBM Plex Mono'", color: '#0E1A12' }}>{s.health.completeness}%</span></div>
        <div style={{ height: 7, borderRadius: 999, background: '#E6EBE6', overflow: 'hidden' }}><i style={{ display: 'block', height: '100%', width: s.health.completeness + '%', background: s.accent, borderRadius: 999 }} /></div>
      </div>
      <div style={{ padding: '11px 18px', borderTop: '1px solid #E6EBE6', background: '#F7F9F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: '#6B786F' }}>{s.methodologyShort}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: s.accentFg }}>Open scope<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg></span>
      </div>
    </div>
  );
}

function SectoralOverview() {
  const navigate = useNavigate();
  const open = (k) => navigate('/scope/' + k);

  return (
    <div className="kp" style={{ padding: 24 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* hero */}
        <div style={{ position: 'relative', overflow: 'hidden', background: '#0E1A12', borderRadius: 14, padding: '34px 36px', color: '#EAF3EC', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
          <svg viewBox="0 0 640 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            <g fill="none" stroke="#1E9B4E" strokeWidth="1.2" opacity="0.16">
              <path d="M-20 232 C 130 196, 250 276, 400 220 S 640 184, 700 234" />
              <path d="M-20 256 C 130 220, 250 300, 400 244 S 640 208, 700 258" />
              <path d="M-20 280 C 130 244, 250 324, 400 268 S 640 232, 700 282" />
              <path d="M-20 208 C 130 172, 250 252, 400 196 S 640 160, 700 210" />
            </g>
          </svg>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: '#86D2A1' }}>Kenya POA · National programme</div>
            <h2 style={{ fontSize: 30, lineHeight: 1.12, fontWeight: 700, color: '#fff', letterSpacing: '-.02em', margin: '12px 0 0', maxWidth: 540 }}>Monitoring carbon across three sectoral scopes</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#AFC2B5', margin: '12px 0 0', maxWidth: 520 }}>Digital MRV across clean cooking, waste and land — every tonne measured at source, independently verified, and issued under recognised carbon standards.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
              {SCOPE_ORDER.map(k => (
                <button key={k} onClick={() => open(k)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 999, border: '1px solid rgba(255,255,255,.14)', background: 'rgba(255,255,255,.05)', color: '#EAF3EC', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}>
                  <i style={{ width: 8, height: 8, borderRadius: '50%', background: SCOPES[k].accent, display: 'inline-block' }} />{SCOPES[k].name}
                </button>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', zIndex: 1, flex: 'none', width: 156, height: 156, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ position: 'absolute', width: 156, height: 156, borderRadius: '50%', border: '1px solid rgba(255,255,255,.10)' }} />
            <span style={{ position: 'absolute', width: 118, height: 118, borderRadius: '50%', border: '1px solid rgba(255,255,255,.15)' }} />
            <span style={{ width: 84, height: 84, borderRadius: '50%', background: 'rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="46" height="46" viewBox="0 0 320 320" aria-hidden="true"><g transform="translate(8,4)" stroke="#86D2A1" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M150 280A100 100 0 0 1 133 86C214 70 235 62 263 28c14 28 28 59 28 113 0 78-68 142-141 142Z" /><path d="M28 296c0-43 26-76 72-85" /></g></svg>
            </span>
          </div>
        </div>

        {/* scope cards */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 4 }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0E1A12' }}>Sectoral scopes</h2>
          <span style={{ fontSize: 12, color: '#6B786F' }}>Select a scope to open its workspace</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {SCOPE_ORDER.map(k => <ScopeCard key={k} scope={SCOPES[k]} onOpen={() => open(k)} />)}
        </div>

        {/* carbon credit lifecycle */}
        <div style={{ background: '#fff', border: '1px solid #DCE3DD', borderRadius: 12, boxShadow: '0 1px 2px rgba(14,26,18,.04)', padding: '20px 24px 26px', marginTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0E1A12' }}>Carbon credit lifecycle</h2>
            <span style={{ fontSize: 12, color: '#6B786F' }}>From metered activity to retired credit</span>
          </div>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8, marginTop: 26 }}>
            <div style={{ position: 'absolute', top: 24, left: '10%', right: '10%', height: 2, background: '#E6EBE6', zIndex: 0 }} />
            {LIFECYCLE.map((st, i) => {
              const last = i === LIFECYCLE.length - 1;
              return (
                <div key={st.label} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 11, padding: '0 6px' }}>
                  <span style={{ width: 48, height: 48, borderRadius: '50%', background: last ? '#008037' : '#DFF1E5', color: last ? '#fff' : '#008037', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #fff', boxShadow: '0 0 0 1px #DCE3DD' }}><LifeGlyph name={st.icon} /></span>
                  <div><div style={{ fontSize: 13, fontWeight: 600, color: '#0E1A12' }}>{st.label}</div><div style={{ fontSize: 11, color: '#6B786F', lineHeight: 1.4, marginTop: 3 }}>{st.desc}</div></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* recent activity */}
        <div style={{ background: '#fff', border: '1px solid #DCE3DD', borderRadius: 12, boxShadow: '0 1px 2px rgba(14,26,18,.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid #E6EBE6' }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0E1A12' }}>Recent activity</h2>
            <a style={{ fontSize: 13, color: '#00682C', fontWeight: 600, cursor: 'pointer' }}>View all</a>
          </div>
          <div style={{ padding: '4px 18px 6px' }}>
            {EVENTS.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '13px 0', borderBottom: i === EVENTS.length - 1 ? 'none' : '1px solid #E6EBE6', alignItems: 'flex-start' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', marginTop: 6, flex: 'none', background: e.dot }} />
                <div style={{ flex: 1, fontSize: 13, lineHeight: 1.45, color: '#1C2A22' }}><b style={{ color: '#0E1A12', fontWeight: 600 }}>{e.lead}</b> {e.text}</div>
                <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: '#6B786F', whiteSpace: 'nowrap', marginTop: 1 }}>{e.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { SectoralOverview };
