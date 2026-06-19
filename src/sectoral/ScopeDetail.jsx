/* Kenya POA — single sectoral-scope workspace (/scope/:sector).
   Scope header band, KPI grid, emissions chart (monthly bars + cumulative line),
   monitoring health, VPA table and a register-project modal. The Energy demand
   scope links into the embedded clean-cooking monitoring (/energy). */
import React from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { SCOPES, MONTHS, badgeStyle, dotStyle } from './sectoralData.js';
import './sectoral.css';

const { useState } = React;

function ScopeIcon({ k, size = 24 }) {
  const c = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (k === 'energy') return <svg {...c}><path d="M8.5 14.5c0-3 3.5-4 3.5-8 3 2 5 5 5 8a5 5 0 0 1-10 0c0-1 .3-1.7.7-2.4" /></svg>;
  if (k === 'waste') return <svg {...c}><path d="M3 6h18" /><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /></svg>;
  return <svg {...c}><path d="M12 22v-6" /><path d="M12 16c-3.5 0-6-2.5-6-6 0-3.5 2.5-7 6-9 3.5 2 6 5.5 6 9 0 3.5-2.5 6-6 6z" /></svg>;
}

function Chart({ scope }) {
  const data = scope.monthly;
  const W = 720, H = 230, padL = 40, padB = 28, padT = 12, padR = 8, n = data.length;
  const max = Math.ceil(Math.max(...data) * 1.18);
  const bw = (W - padL - padR) / n;
  const xc = (i) => padL + i * bw + bw / 2;
  const yv = (v) => padT + (H - padT - padB) * (1 - v / max);
  const barW = bw * 0.56;
  const step = max / 4;
  const cumMax = data.reduce((a, d) => a + d, 0);
  let cum = 0;
  const cpts = data.map((d, i) => { cum += d; return [xc(i), padT + (H - padT - padB) * (1 - cum / cumMax)]; });
  const line = cpts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = 'M' + padL + ' ' + (H - padB) + ' ' + cpts.map(p => 'L' + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ') + ' L' + xc(n - 1) + ' ' + (H - padB) + ' Z';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', display: 'block' }} role="img" aria-label="Emission reductions over time">
      {Array.from({ length: 5 }, (_, g) => {
        const val = +(step * g).toFixed(1);
        return <g key={g}><line x1={padL} x2={W - padR} y1={yv(val)} y2={yv(val)} stroke="#E6EBE6" /><text x={padL - 8} y={yv(val) + 4} textAnchor="end" fontSize="10" fontFamily="'IBM Plex Mono'" fill="#6B786F">{val}k</text></g>;
      })}
      {data.map((v, i) => <g key={'b' + i}>
        <rect x={xc(i) - barW / 2} y={yv(v)} width={barW} height={(H - padB) - yv(v)} rx="2.5" fill={scope.accent} opacity={i === n - 1 ? 1 : 0.82} />
        <text x={xc(i)} y={H - 9} textAnchor="middle" fontSize="10" fontFamily="'IBM Plex Mono'" fill="#6B786F">{MONTHS[i]}</text>
      </g>)}
      <path d={area} fill="rgba(14,116,144,0.10)" />
      <path d={line} fill="none" stroke="#0E7490" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={cpts[n - 1][0]} cy={cpts[n - 1][1]} r="3.5" fill="#0E7490" />
    </svg>
  );
}

function Kpi({ icon, iconBg, iconFg, delta, value, unit, label }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #DCE3DD', borderRadius: 12, padding: 18, boxShadow: '0 1px 1px rgba(14,26,18,.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ width: 30, height: 30, borderRadius: 8, background: iconBg, color: iconFg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
        </span>
        <span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 11, color: '#00682C', display: 'inline-flex', alignItems: 'center', gap: 3, fontWeight: 500 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 14l5-5 5 5" /></svg>{delta}
        </span>
      </div>
      <div style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: 34, letterSpacing: '-.02em', color: '#0E1A12', lineHeight: 1, marginTop: 16, fontVariantNumeric: 'tabular-nums' }}>
        {value}{unit && <span style={{ fontSize: 14, color: '#6B786F', fontFamily: "'IBM Plex Mono'", fontWeight: 400, marginLeft: 5 }}>{unit}</span>}
      </div>
      <div style={{ fontSize: 12.5, color: '#4E5B52', marginTop: 6 }}>{label}</div>
    </div>
  );
}

function Bar({ label, value, pct, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#4E5B52', marginBottom: 7 }}>{label}<span style={{ fontFamily: "'IBM Plex Mono'", fontSize: 12, color: '#0E1A12' }}>{value}</span></div>
      <div style={{ height: 8, borderRadius: 999, background: '#E6EBE6', overflow: 'hidden' }}><i style={{ display: 'block', height: '100%', width: pct + '%', background: color, borderRadius: 999 }} /></div>
    </div>
  );
}

const inp = { width: '100%', height: 40, padding: '0 12px', fontFamily: 'inherit', fontSize: 13.5, border: '1px solid #BDC6BF', borderRadius: 6, background: '#fff', color: '#0E1A12', outline: 'none' };
function Field({ label, children }) {
  return <div><label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: '#1C2A22', marginBottom: 6 }}>{label}</label>{children}</div>;
}

function ScopeDetail() {
  const navigate = useNavigate();
  const { sector } = useParams();
  const sc = SCOPES[sector];
  const [extra, setExtra] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', county: '', sites: '', red: '' });

  if (!sc) return <Navigate to="/" replace />;

  const d = sc.kpi;
  const projects = sc.projects.concat(extra);
  const isEnergy = sector === 'energy';
  const isAfolu = sector === 'land';
  // scopes that drill into an embedded monitoring workspace
  const monitor = isEnergy ? { label: 'Open clean-cooking monitoring', to: '/energy', rowTo: '/energy/devices' }
    : isAfolu ? { label: 'Open REDD+ monitoring', to: '/afolu', rowTo: '/afolu/plots' }
      : null;

  const openModal = () => { setForm({ name: '', county: sc.counties[0], sites: '', red: '' }); setModal(true); };
  const submit = () => {
    if (!form.name.trim()) return;
    const n = sc.projects.length + extra.length + 1;
    setExtra(e => [{ id: 'VPA-' + String(n).padStart(2, '0'), name: form.name.trim(), loc: form.county || sc.counties[0], sites: (form.sites || '').trim() || '—', red: (form.red || '').trim() || '0', status: 'Pending' }, ...e]);
    setModal(false);
  };
  const canSubmit = form.name.trim().length > 0;

  return (
    <div className="kp" style={{ padding: 24 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* scope header band */}
        <div style={{ background: '#fff', border: '1px solid #DCE3DD', borderTop: `3px solid ${sc.accent}`, borderRadius: 12, boxShadow: '0 1px 2px rgba(14,26,18,.06)', padding: '20px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <div style={{ display: 'flex', gap: 15, alignItems: 'center', minWidth: 0 }}>
            <span style={{ width: 48, height: 48, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', background: sc.accentBg, color: sc.accentFg }}><ScopeIcon k={sector} /></span>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-.01em', color: '#0E1A12' }}>{sc.name}</h2>
                <span style={badgeStyle(sc.status)}><i style={dotStyle(sc.status)} />{sc.status}</span>
              </div>
              <div style={{ fontSize: 13, color: '#4E5B52', marginTop: 5, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span>{sc.tagline}</span>
                <span style={{ color: '#BDC6BF' }}>·</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'IBM Plex Mono'", fontSize: 11.5, color: '#6B786F' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
                  {sc.methodology}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flex: 'none' }}>
            {monitor && (
              <button onClick={() => navigate(monitor.to)} style={{ height: 38, padding: '0 16px', border: 0, borderRadius: 6, background: '#008037', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l2 6 4-14 2 8h6" /></svg>
                {monitor.label}
              </button>
            )}
            <button style={{ height: 38, padding: '0 14px', border: '1px solid #BDC6BF', borderRadius: 6, background: '#fff', color: '#1C2A22', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" /></svg>
              Export scope
            </button>
            <button onClick={openModal} style={{ height: 38, padding: '0 16px', border: 0, borderRadius: 6, background: '#008037', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              Register project
            </button>
          </div>
        </div>

        {/* KPI grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          <Kpi icon={<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z M2 21c0-3 1.85-5.36 5.08-6" />} iconBg="#DFF1E5" iconFg="#008037" delta={d.rd} value={d.r} unit="tCO₂e" label="Verified reductions" />
          <Kpi icon={<><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" /><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></>} iconBg="#FBEFD2" iconFg="#B57711" delta={d.cd} value={d.c} unit="tCO₂e" label="Credits issued" />
          <Kpi icon={<path d="M4 20V7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v11z" />} iconBg="#E2F2F6" iconFg="#0B5A6B" delta={d.pd} value={d.p} unit="VPAs" label="Active projects" />
          <Kpi icon={<path d="M3 12h4l2 6 4-14 2 8h6" />} iconBg="#FBE9E1" iconFg="#8F3A1F" delta={d.sd} value={d.s} label={sc.sLabel} />
        </div>

        {/* chart + monitoring */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.62fr 1fr', gap: 18, alignItems: 'start' }}>
          <div style={{ background: '#fff', border: '1px solid #DCE3DD', borderRadius: 12, boxShadow: '0 1px 2px rgba(14,26,18,.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid #E6EBE6' }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0E1A12' }}>Emission reductions over time</h3>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#4E5B52' }}><i style={{ width: 10, height: 10, borderRadius: 3, background: sc.accent, display: 'inline-block' }} />Monthly</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#4E5B52' }}><i style={{ width: 14, height: 3, borderRadius: 2, background: '#0E7490', display: 'inline-block' }} />Cumulative</span>
              </div>
            </div>
            <div style={{ padding: '14px 18px 16px' }}><Chart scope={sc} /></div>
          </div>
          <div style={{ background: '#fff', border: '1px solid #DCE3DD', borderRadius: 12, boxShadow: '0 1px 2px rgba(14,26,18,.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid #E6EBE6' }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0E1A12' }}>Monitoring health</h3>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 600, color: '#00682C', background: '#DFF1E5', padding: '4px 9px', borderRadius: 999 }}><i style={{ width: 6, height: 6, borderRadius: '50%', background: '#008037', display: 'inline-block' }} />Healthy</span>
            </div>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Bar label="Sites reporting" value={sc.health.reporting} pct={sc.health.reportingPct} color="#008037" />
              <Bar label="Crediting period elapsed" value="58%" pct={58} color="#0E7490" />
              <Bar label="Data completeness" value={sc.health.completeness + '%'} pct={sc.health.completeness} color="#DD9B1F" />
              <Bar label="Verification readiness" value={sc.health.verification + '%'} pct={sc.health.verification} color="#D86E45" />
            </div>
          </div>
        </div>

        {/* VPA table */}
        <div style={{ background: '#fff', border: '1px solid #DCE3DD', borderRadius: 12, boxShadow: '0 1px 2px rgba(14,26,18,.06)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid #E6EBE6', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#0E1A12' }}>Component projects (VPAs)</h3>
              <span style={{ fontSize: 12, color: '#6B786F' }}>{projects.length} in this scope</span>
            </div>
            <button onClick={openModal} style={{ height: 34, padding: '0 13px', border: '1px solid #008037', borderRadius: 6, background: '#F1F8F3', color: '#00682C', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              Register project
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead><tr>
              {[['VPA ID', 'l'], ['Project', 'l'], ['Location', 'l'], [sc.sLabel, 'r'], ['tCO₂e', 'r'], ['Status', 'l']].map(([h, a], i) => (
                <th key={i} style={{ textAlign: a === 'r' ? 'right' : 'left', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: '#6B786F', padding: '10px 16px', borderBottom: '1px solid #DCE3DD', background: '#F7F9F6', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{projects.map(p => (
              <tr key={p.id} onClick={() => monitor && navigate(monitor.rowTo)} style={{ borderBottom: '1px solid #E6EBE6', cursor: monitor ? 'pointer' : 'default' }}>
                <td style={{ padding: '13px 16px', fontFamily: "'IBM Plex Mono'", fontSize: 12, color: '#0E1A12', whiteSpace: 'nowrap' }}>{p.id}</td>
                <td style={{ padding: '13px 16px', color: '#0E1A12', fontWeight: 500 }}>{p.name}</td>
                <td style={{ padding: '13px 16px', color: '#4E5B52', whiteSpace: 'nowrap' }}>{p.loc}</td>
                <td style={{ padding: '13px 16px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontFamily: "'IBM Plex Mono'", fontSize: 12, color: '#1C2A22' }}>{p.sites}</td>
                <td style={{ padding: '13px 16px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontFamily: "'IBM Plex Mono'", fontSize: 12, color: '#0E1A12' }}>{p.red}</td>
                <td style={{ padding: '13px 16px' }}><span style={badgeStyle(p.status)}><i style={dotStyle(p.status)} />{p.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      {/* register modal */}
      {modal && (
        <div onClick={() => setModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(14,26,18,.42)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 24 }}>
          <div className="kp" onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 12px 28px -8px rgba(14,26,18,.18),0 4px 10px -4px rgba(14,26,18,.08)', width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid #E6EBE6', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ width: 38, height: 38, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', background: sc.accentBg, color: sc.accentFg }}><ScopeIcon k={sector} size={20} /></span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#0E1A12' }}>Register project</h3>
                  <div style={{ fontSize: 12.5, color: '#4E5B52', marginTop: 3 }}>New VPA under <b style={{ color: '#1C2A22', fontWeight: 600 }}>{sc.name}</b></div>
                </div>
              </div>
              <button onClick={() => setModal(false)} aria-label="Close" style={{ width: 32, height: 32, border: 0, borderRadius: 7, background: '#EFF3EE', color: '#4E5B52', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field label="Project name"><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Nakuru institutional cooking" style={inp} /></Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="Location"><select value={form.county} onChange={e => setForm(f => ({ ...f, county: e.target.value }))} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>{sc.counties.map(c => <option key={c} value={c}>{c}</option>)}</select></Field>
                <Field label={sc.sLabel}><input value={form.sites} onChange={e => setForm(f => ({ ...f, sites: e.target.value }))} placeholder="0" inputMode="numeric" style={{ ...inp, fontFamily: "'IBM Plex Mono'" }} /></Field>
              </div>
              <Field label="Estimated annual reductions (tCO₂e)"><input value={form.red} onChange={e => setForm(f => ({ ...f, red: e.target.value }))} placeholder="0" inputMode="numeric" style={{ ...inp, fontFamily: "'IBM Plex Mono'" }} /></Field>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 13px', background: '#F1F8F3', border: '1px solid #DFF1E5', borderRadius: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00682C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
                <span style={{ fontSize: 12.5, color: '#1C2A22' }}>Methodology <b style={{ fontWeight: 600 }}>{sc.methodology}</b> applied automatically.</span>
              </div>
            </div>
            <div style={{ padding: '16px 22px 20px', borderTop: '1px solid #E6EBE6', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setModal(false)} style={{ height: 40, padding: '0 16px', border: '1px solid #BDC6BF', borderRadius: 6, background: '#fff', color: '#1C2A22', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={submit} disabled={!canSubmit} style={{ height: 40, padding: '0 16px', border: 0, borderRadius: 6, background: canSubmit ? '#008037' : '#BDC6BF', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, cursor: canSubmit ? 'pointer' : 'not-allowed' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
                Register project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ScopeDetail };
