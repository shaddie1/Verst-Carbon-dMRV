/* Kenya POA — Sectoral scope dashboard (home).
   Ported from the "dMRV Sectoral Dashboard" design mockup: three scope tabs
   (Energy demand / Waste management / Land use & forestry), scope header band,
   KPI grid, emissions-over-time chart, monitoring health, VPA table and a
   register-project modal. The Energy demand scope links into the embedded
   clean-cooking monitoring platform. Figures are illustrative placeholders. */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sectoral.css';

const { useState } = React;

const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const SCOPES = {
  energy: {
    name: 'Energy demand', tagline: 'Clean cooking · EPC & institutional',
    methodology: 'Gold Standard · Metered & Measured', status: 'Crediting',
    accent: '#DD9B1F', accentBg: 'var(--warn-bg)', accentFg: 'var(--warn-fg)', sLabel: 'Smart meters',
    kpi: { r: '128,400', rd: '12.4%', c: '96,000', cd: '8,200', p: '16', pd: '3', s: '2,180', sd: '180' },
    health: { reporting: '2,065 / 2,180', reportingPct: 95, completeness: 92, verification: 78 },
    monthly: [7.8, 8.9, 9.6, 10.4, 11.2, 12.1, 11.6, 12.8, 13.9, 14.6, 15.7, 16.4],
    counties: ['Nairobi', 'Kiambu', 'Nakuru', 'Kisumu', 'Machakos', 'Uasin Gishu'],
    projects: [
      { id: 'VPA-01', name: 'NACONEK school cooking — Central', loc: 'Central Kenya', sites: '842', red: '34,200', status: 'Crediting' },
      { id: 'VPA-02', name: 'Nairobi institutional cooking', loc: 'Nairobi', sites: '610', red: '28,900', status: 'Verified' },
      { id: 'VPA-04', name: 'EPC household programme', loc: 'Nakuru', sites: '540', red: '22,400', status: 'Monitoring' },
      { id: 'VPA-07', name: 'Clean cooking for clinics', loc: 'Kisumu', sites: '280', red: '14,800', status: 'Crediting' },
      { id: 'VPA-09', name: 'Machakos boarding schools', loc: 'Machakos', sites: '320', red: '12,100', status: 'In review' },
    ],
  },
  waste: {
    name: 'Waste management', tagline: 'Composting · landfill gas · wastewater',
    methodology: 'CDM AMS-III.F · Composting', status: 'Monitoring',
    accent: '#0E7490', accentBg: 'var(--info-bg)', accentFg: 'var(--info-fg)', sLabel: 'Facilities',
    kpi: { r: '41,600', rd: '6.1%', c: '34,800', cd: '3,100', p: '9', pd: '1', s: '740', sd: '24' },
    health: { reporting: '702 / 740', reportingPct: 95, completeness: 86, verification: 71 },
    monthly: [2.6, 2.8, 2.9, 3.0, 3.2, 3.3, 3.1, 3.4, 3.6, 3.7, 3.9, 4.0],
    counties: ['Nairobi', 'Nakuru', 'Kisumu', 'Kiambu', 'Mombasa'],
    projects: [
      { id: 'VPA-03', name: 'Dandora landfill gas capture', loc: 'Nairobi', sites: '1', red: '18,600', status: 'Crediting' },
      { id: 'VPA-06', name: 'Nakuru municipal composting', loc: 'Nakuru', sites: '240', red: '9,400', status: 'Monitoring' },
      { id: 'VPA-10', name: 'Kisumu wastewater treatment', loc: 'Kisumu', sites: '12', red: '6,800', status: 'Verified' },
      { id: 'VPA-12', name: 'Thika organics composting', loc: 'Kiambu', sites: '180', red: '6,800', status: 'In review' },
    ],
  },
  land: {
    name: 'Land use & forestry', tagline: 'Afforestation · reforestation · REDD+',
    methodology: 'Verra VM0047 · ARR + REDD+', status: 'In review',
    accent: '#008037', accentBg: 'var(--brand-tint)', accentFg: 'var(--brand-strong)', sLabel: 'Hectares',
    kpi: { r: '44,800', rd: '7.8%', c: '31,600', cd: '2,900', p: '13', pd: '1', s: '1,940', sd: '6' },
    health: { reporting: '1,838 / 1,940', reportingPct: 95, completeness: 79, verification: 66 },
    monthly: [2.8, 3.0, 3.1, 3.3, 3.4, 3.6, 3.5, 3.7, 3.9, 4.0, 4.1, 4.2],
    counties: ['Narok', 'Nyeri', 'Kakamega', 'Kilifi', 'Baringo'],
    projects: [
      { id: 'VPA-05', name: 'Mau forest afforestation', loc: 'Narok', sites: '620', red: '16,200', status: 'Crediting' },
      { id: 'VPA-08', name: 'Aberdare reforestation', loc: 'Nyeri', sites: '480', red: '12,400', status: 'Monitoring' },
      { id: 'VPA-11', name: 'Kakamega REDD+ conservation', loc: 'Kakamega', sites: '540', red: '9,800', status: 'In review' },
      { id: 'VPA-15', name: 'Coastal mangrove ARR', loc: 'Kilifi', sites: '300', red: '6,400', status: 'Pending' },
    ],
  },
};

const STATUS = {
  Verified: { bg: 'var(--ok-bg)', fg: 'var(--ok-fg)', dot: 'var(--ok-solid)' },
  Crediting: { bg: 'var(--info-bg)', fg: 'var(--info-fg)', dot: 'var(--info-solid)' },
  Monitoring: { bg: 'var(--neutral-bg)', fg: 'var(--neutral-fg)', dot: 'var(--stone-400)' },
  'In review': { bg: 'var(--warn-bg)', fg: 'var(--warn-fg)', dot: 'var(--warn-solid)' },
  Pending: { bg: 'var(--surface-sunken)', fg: 'var(--text-muted)', dot: 'var(--stone-400)' },
};
const badgeStyle = (label) => {
  const t = STATUS[label] || STATUS.Pending;
  return { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, padding: '4px 9px', borderRadius: 999, whiteSpace: 'nowrap', background: t.bg, color: t.fg };
};
const dotStyle = (label) => ({ width: 6, height: 6, borderRadius: '50%', flex: 'none', display: 'inline-block', background: (STATUS[label] || STATUS.Pending).dot });

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
        return <g key={'g' + g}>
          <line x1={padL} x2={W - padR} y1={yv(val)} y2={yv(val)} stroke="var(--line-soft)" />
          <text x={padL - 8} y={yv(val) + 4} textAnchor="end" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-subtle)">{val}k</text>
        </g>;
      })}
      {data.map((v, i) => <g key={'b' + i}>
        <rect x={xc(i) - barW / 2} y={yv(v)} width={barW} height={(H - padB) - yv(v)} rx="2.5" fill={scope.accent} opacity={i === n - 1 ? 1 : 0.82} />
        <text x={xc(i)} y={H - 9} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--text-subtle)">{MONTHS[i]}</text>
      </g>)}
      <path d={area} fill="rgba(14,116,144,0.10)" />
      <path d={line} fill="none" stroke="var(--teal-600)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={cpts[n - 1][0]} cy={cpts[n - 1][1]} r="3.5" fill="var(--teal-600)" />
    </svg>
  );
}

const TABS = [
  { key: 'energy', label: 'Energy demand', dot: '#DD9B1F', accent: 'var(--warn-fg)' },
  { key: 'waste', label: 'Waste management', dot: '#0E7490', accent: 'var(--info-fg)' },
  { key: 'land', label: 'Land use & forestry', dot: '#008037', accent: 'var(--brand-strong)' },
];

function Kpi({ icon, iconBg, iconFg, delta, value, unit, label }) {
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line)', borderRadius: 12, padding: 18, boxShadow: 'var(--shadow-xs)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ width: 30, height: 30, borderRadius: 8, background: iconBg, color: iconFg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ok-fg)', display: 'inline-flex', alignItems: 'center', gap: 3, fontWeight: 500 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 14l5-5 5 5" /></svg>{delta}
        </span>
      </div>
      <div style={{ fontFamily: 'var(--font-condensed)', fontWeight: 700, fontSize: 34, letterSpacing: '-.02em', color: 'var(--text-strong)', lineHeight: 1, marginTop: 16, fontVariantNumeric: 'tabular-nums' }}>
        {value}{unit && <span style={{ fontSize: 14, color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', fontWeight: 400, marginLeft: 5 }}>{unit}</span>}
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 6 }}>{label}</div>
    </div>
  );
}

function Bar({ label, value, pct, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)', marginBottom: 7 }}>{label}<span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-strong)' }}>{value}</span></div>
      <div style={{ height: 8, borderRadius: 999, background: 'var(--line-soft)', overflow: 'hidden' }}><i style={{ display: 'block', height: '100%', width: pct + '%', background: color, borderRadius: 999 }} /></div>
    </div>
  );
}

function SectoralDashboard() {
  const navigate = useNavigate();
  const [sector, setSector] = useState('energy');
  const [extra, setExtra] = useState({ energy: [], waste: [], land: [] });
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', county: '', sites: '', red: '' });

  const sc = SCOPES[sector];
  const d = sc.kpi;
  const projects = sc.projects.concat(extra[sector] || []);
  const isEnergy = sector === 'energy';

  const openModal = () => { setForm({ name: '', county: sc.counties[0], sites: '', red: '' }); setModal(true); };
  const submit = () => {
    if (!form.name.trim()) return;
    const n = sc.projects.length + (extra[sector] || []).length + 1;
    const row = { id: 'VPA-' + String(n).padStart(2, '0'), name: form.name.trim(), loc: form.county || sc.counties[0], sites: (form.sites || '').trim() || '—', red: (form.red || '').trim() || '0', status: 'Pending' };
    setExtra(s => ({ ...s, [sector]: [row, ...(s[sector] || [])] }));
    setModal(false);
  };
  const canSubmit = form.name.trim().length > 0;

  return (
    <div className="kp" style={{ padding: 24 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* scope tabs */}
        <div style={{ display: 'inline-flex', gap: 4, background: 'var(--surface-hover)', padding: 4, borderRadius: 10, border: '1px solid var(--line-soft)', alignSelf: 'flex-start' }}>
          {TABS.map(t => {
            const active = t.key === sector;
            return (
              <button key={t.key} onClick={() => setSector(t.key)} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '9px 15px', borderRadius: 8, border: 0, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, whiteSpace: 'nowrap',
                background: active ? 'var(--surface-card)' : 'transparent', color: active ? t.accent : 'var(--text-muted)',
                boxShadow: active ? 'var(--shadow-sm)' : 'none',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', flex: 'none', display: 'inline-block', background: t.dot }} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* scope header band */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line)', borderTop: `3px solid ${sc.accent}`, borderRadius: 12, boxShadow: 'var(--shadow-sm)', padding: '20px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <div style={{ display: 'flex', gap: 15, alignItems: 'center', minWidth: 0 }}>
            <span style={{ width: 48, height: 48, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', background: sc.accentBg, color: sc.accentFg }}><ScopeIcon k={sector} /></span>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-.01em', color: 'var(--text-strong)' }}>{sc.name}</h2>
                <span style={badgeStyle(sc.status)}><i style={dotStyle(sc.status)} />{sc.status}</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 5, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span>{sc.tagline}</span>
                <span style={{ color: 'var(--line-strong)' }}>·</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-subtle)' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
                  {sc.methodology}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flex: 'none' }}>
            {isEnergy && (
              <button onClick={() => navigate('/energy')} style={{ height: 38, padding: '0 16px', border: 0, borderRadius: 6, background: 'var(--brand)', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l2 6 4-14 2 8h6" /></svg>
                Open clean-cooking monitoring
              </button>
            )}
            <button onClick={openModal} style={{ height: 38, padding: '0 14px', border: '1px solid var(--line-strong)', borderRadius: 6, background: 'var(--surface-card)', color: 'var(--text-body)', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              Register project
            </button>
          </div>
        </div>

        {/* KPI grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          <Kpi icon={<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z M2 21c0-3 1.85-5.36 5.08-6" />} iconBg="var(--brand-tint)" iconFg="var(--brand)" delta={d.rd} value={d.r} unit="tCO₂e" label="Verified reductions" />
          <Kpi icon={<><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" /><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></>} iconBg="var(--warn-bg)" iconFg="var(--warn-fg)" delta={d.cd} value={d.c} unit="tCO₂e" label="Credits issued" />
          <Kpi icon={<path d="M4 20V7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v11z" />} iconBg="var(--info-bg)" iconFg="var(--info-fg)" delta={d.pd} value={d.p} unit="VPAs" label="Active projects" />
          <Kpi icon={<path d="M3 12h4l2 6 4-14 2 8h6" />} iconBg="var(--clay-100)" iconFg="var(--clay-700)" delta={d.sd} value={d.s} label={sc.sLabel} />
        </div>

        {/* chart + monitoring */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.62fr 1fr', gap: 18, alignItems: 'start' }}>
          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line)', borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid var(--line-soft)' }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>Emission reductions over time</h3>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}><i style={{ width: 10, height: 10, borderRadius: 3, background: sc.accent, display: 'inline-block' }} />Monthly</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}><i style={{ width: 14, height: 3, borderRadius: 2, background: 'var(--teal-600)', display: 'inline-block' }} />Cumulative</span>
              </div>
            </div>
            <div style={{ padding: '14px 18px 16px' }}><Chart scope={sc} /></div>
          </div>

          <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line)', borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid var(--line-soft)' }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>Monitoring health</h3>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 600, color: 'var(--ok-fg)', background: 'var(--ok-bg)', padding: '4px 9px', borderRadius: 999 }}><i style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok-solid)', display: 'inline-block' }} />Healthy</span>
            </div>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Bar label="Sites reporting" value={sc.health.reporting} pct={sc.health.reportingPct} color="var(--brand)" />
              <Bar label="Crediting period elapsed" value="58%" pct={58} color="var(--teal-600)" />
              <Bar label="Data completeness" value={sc.health.completeness + '%'} pct={sc.health.completeness} color="var(--amber-500)" />
              <Bar label="Verification readiness" value={sc.health.verification + '%'} pct={sc.health.verification} color="var(--clay-500)" />
            </div>
          </div>
        </div>

        {/* projects table */}
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--line)', borderRadius: 12, boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid var(--line-soft)', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>Component projects (VPAs)</h3>
              <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{projects.length} in this scope</span>
            </div>
            <button onClick={openModal} style={{ height: 34, padding: '0 13px', border: '1px solid var(--brand)', borderRadius: 6, background: 'var(--brand-tint-2)', color: 'var(--brand-strong)', fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
              Register project
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead><tr>
              {[['VPA ID', 'l'], ['Project', 'l'], ['Location', 'l'], [sc.sLabel, 'r'], ['tCO₂e', 'r'], ['Status', 'l']].map(([h, a], i) => (
                <th key={i} style={{ textAlign: a === 'r' ? 'right' : 'left', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-subtle)', padding: '10px 16px', borderBottom: '1px solid var(--line)', background: 'var(--surface-page)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{projects.map(p => (
              <tr key={p.id} onClick={() => isEnergy && navigate('/energy/devices')} style={{ borderBottom: '1px solid var(--line-soft)', cursor: isEnergy ? 'pointer' : 'default' }}>
                <td style={{ padding: '13px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>{p.id}</td>
                <td style={{ padding: '13px 16px', color: 'var(--text-strong)', fontWeight: 500 }}>{p.name}</td>
                <td style={{ padding: '13px 16px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{p.loc}</td>
                <td style={{ padding: '13px 16px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-body)' }}>{p.sites}</td>
                <td style={{ padding: '13px 16px', textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-strong)' }}>{p.red}</td>
                <td style={{ padding: '13px 16px' }}><span style={badgeStyle(p.status)}><i style={dotStyle(p.status)} />{p.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      {/* register modal */}
      {modal && (
        <div onClick={() => setModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(14,26,18,.42)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 24 }}>
          <div className="kp" onClick={e => e.stopPropagation()} style={{ background: 'var(--surface-card)', borderRadius: 14, boxShadow: 'var(--shadow-lg)', width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid var(--line-soft)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ width: 38, height: 38, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', background: sc.accentBg, color: sc.accentFg }}><ScopeIcon k={sector} size={20} /></span>
                <div>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: 'var(--text-strong)' }}>Register project</h3>
                  <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 3 }}>New VPA under <b style={{ color: 'var(--text-body)', fontWeight: 600 }}>{sc.name}</b></div>
                </div>
              </div>
              <button onClick={() => setModal(false)} aria-label="Close" style={{ width: 32, height: 32, border: 0, borderRadius: 7, background: 'var(--surface-hover)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Field label="Project name">
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Nakuru institutional cooking" style={inp} />
              </Field>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="Location">
                  <select value={form.county} onChange={e => setForm(f => ({ ...f, county: e.target.value }))} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
                    {sc.counties.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label={sc.sLabel}>
                  <input value={form.sites} onChange={e => setForm(f => ({ ...f, sites: e.target.value }))} placeholder="0" inputMode="numeric" style={{ ...inp, fontFamily: 'var(--font-mono)' }} />
                </Field>
              </div>
              <Field label="Estimated annual reductions (tCO₂e)">
                <input value={form.red} onChange={e => setForm(f => ({ ...f, red: e.target.value }))} placeholder="0" inputMode="numeric" style={{ ...inp, fontFamily: 'var(--font-mono)' }} />
              </Field>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '11px 13px', background: 'var(--surface-inset)', border: '1px solid var(--brand-tint)', borderRadius: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
                <span style={{ fontSize: 12.5, color: 'var(--text-body)' }}>Methodology <b style={{ fontWeight: 600 }}>{sc.methodology}</b> applied automatically.</span>
              </div>
            </div>
            <div style={{ padding: '16px 22px 20px', borderTop: '1px solid var(--line-soft)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setModal(false)} style={{ height: 40, padding: '0 16px', border: '1px solid var(--line-strong)', borderRadius: 6, background: 'var(--surface-card)', color: 'var(--text-body)', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={submit} disabled={!canSubmit} style={{ height: 40, padding: '0 16px', border: 0, borderRadius: 6, background: canSubmit ? 'var(--brand)' : 'var(--stone-300)', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7, cursor: canSubmit ? 'pointer' : 'not-allowed' }}>
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

const inp = { width: '100%', height: 40, padding: '0 12px', fontFamily: 'inherit', fontSize: 13.5, border: '1px solid var(--line-strong)', borderRadius: 6, background: 'var(--surface-card)', color: 'var(--text-strong)', outline: 'none' };
function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--text-body)', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

export { SectoralDashboard };
