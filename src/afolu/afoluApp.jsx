/* AFOLU dMRV platform — ported (concatenated) from the mockup's ui/map/views/app.
   The view, map and UI code is verbatim; only the shell was adapted (design
   tweaks panel + global theme effect removed, back link + export added). */
/* eslint-disable */
import React from 'react';
import './afoluData.js';
import './afolu.css';

if (typeof window !== 'undefined') {
  window.React = React;
  window.LOGO_DARK = '/afolu/verst-logo-dark.png';
  window.LOGO_LIGHT = '/afolu/verst-logo-light.png';
}
// design tweaks panel is excluded; provide a minimal hook so the shell keeps working
function useTweaks(d) { const [t, setT] = React.useState(d); return [t, (k, v) => setT(s => ({ ...s, [k]: v }))]; }


// ======================= ui.jsx =======================
/* ui.jsx — shared primitives, icons, charts for the dMRV platform */
const { useState, useRef, useEffect, useMemo } = React;

/* ---------------- Icons (minimal line set) ---------------- */
const PATHS = {
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  map: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14',
  layers: 'M12 3 3 8l9 5 9-5zM3 14l9 5 9-5M3 11l9 5 9-5',
  cpu: 'M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3M6 6h12v12H6zM9 9h6v6H9z',
  calc: 'M5 3h14v18H5zM8 7h8M8 11h3M13 11h3M8 15h3M13 15h3',
  shield: 'M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6z',
  sat: 'M5 13 9 9M11 7l4-4M7 11l-4 4 5 5 4-4M13 9l2 2M3 21l3-3M18 6a3 3 0 0 0-3-3',
  doc: 'M7 3h7l4 4v14H7zM14 3v4h4M10 12h6M10 16h6',
  folder: 'M3 6h6l2 2h10v11H3z',
  spark: 'M12 3v6M12 15v6M3 12h6M15 12h6M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3',
  ring: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 3-5 6-5s6 2 6 5M17 14c2 0 4 2 4 5',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  check: 'M4 12l5 5L20 6',
  merge: 'M6 3v6a6 6 0 0 0 6 6h6M18 3v6a6 6 0 0 1-6 6M18 21l3-3-3-3',
  pulse: 'M3 12h4l2 6 4-14 2 8h6',
  bell: 'M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6zM10 21h4',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
  chevR: 'M9 6l6 6-6 6',
  chevD: 'M6 9l6 6 6-6',
  ext: 'M14 5h5v5M19 5l-8 8M11 5H5v14h14v-6',
  dl: 'M12 3v12M7 11l5 5 5-5M5 21h14',
  flag: 'M5 21V4M5 4h11l-2 4 2 4H5',
  alert: 'M12 3 2 20h20zM12 9v5M12 17h.01',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',
  filter: 'M3 5h18l-7 8v6l-4-2v-4z',
  plus: 'M12 5v14M5 12h14',
  gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.5L4.1 11a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5a7 7 0 0 0 .1-1z',
  tree: 'M12 22v-6M8 16a4 4 0 0 1-1-8 5 5 0 0 1 10 0 4 4 0 0 1-1 8z',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  flame: 'M12 3s5 4 5 9a5 5 0 0 1-10 0c0-2 1-3 1-3 1 2 2 2 2 2 1-3 2-5 2-8z',
  crosshair: 'M12 3v4M12 17v4M3 12h4M17 12h4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
  phone: 'M7 2h10v20H7zM10 5h4M11 19h2',
  upload: 'M12 21V9M7 13l5-5 5 5M5 3h14',
  link: 'M9 15l6-6M8 12l-2 2a3 3 0 0 0 4 4l2-2M16 12l2-2a3 3 0 0 0-4-4l-2 2',
  db: 'M12 3c5 0 8 1.5 8 3s-3 3-8 3-8-1.5-8-3 3-3 8-3zM4 6v12c0 1.5 3 3 8 3s8-1.5 8-3V6M4 12c0 1.5 3 3 8 3s8-1.5 8-3',
  arrowUp: 'M12 19V5M6 11l6-6 6 6',
};
function Icon({ name, size = 16, c = 'currentColor', sw = 1.6, style, fill }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'} stroke={c}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d={PATHS[name] || ''} />
    </svg>
  );
}

/* ---------------- Badges / status ---------------- */
const STATUS = {
  ok: { c: 'var(--brand)', t: 'Healthy' }, live: { c: 'var(--brand)', t: 'Live' },
  running: { c: 'var(--teal)', t: 'Running' }, queued: { c: 'var(--gold)', t: 'Queued' },
  idle: { c: 'var(--text-3)', t: 'Idle' }, standby: { c: 'var(--text-3)', t: 'Standby' },
  pending: { c: 'var(--text-3)', t: 'Pending' }, warn: { c: 'var(--warn)', t: 'Attention' },
  progress: { c: 'var(--info)', t: 'In progress' }, pass: { c: 'var(--brand)', t: 'Pass' },
};
function Dot({ s, pulse }) {
  const c = (STATUS[s] || STATUS.idle).c;
  return <span style={{ position: 'relative', width: 8, height: 8, display: 'inline-block' }}>
    <span style={{ position: 'absolute', inset: 0, borderRadius: 99, background: c }} />
    {pulse && <span style={{ position: 'absolute', inset: -3, borderRadius: 99, border: `1.5px solid ${c}`, opacity: .5, animation: 'vc-ping 1.6s ease-out infinite' }} />}
  </span>;
}
function Badge({ children, tone = 'neutral', solid }) {
  const map = {
    neutral: 'var(--text-2)', brand: 'var(--brand)', teal: 'var(--teal)',
    gold: 'var(--gold)', warn: 'var(--warn)', danger: 'var(--danger)',
    info: 'var(--info)', ai: 'var(--ai)',
  };
  const c = map[tone] || map.neutral;
  return <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600,
    padding: '2px 8px', borderRadius: 99, lineHeight: 1.5,
    color: solid ? '#08130d' : c,
    background: solid ? c : `color-mix(in srgb, ${c} 14%, transparent)`,
    border: `1px solid color-mix(in srgb, ${c} ${solid ? 0 : 28}%, transparent)`,
  }}>{children}</span>;
}
function StageChip({ stage }) {
  const tone = { Onboarding: 'neutral', Baseline: 'info', Implementation: 'teal', Monitoring: 'brand', Verification: 'gold' }[stage] || 'neutral';
  return <Badge tone={tone}>{stage}</Badge>;
}
function RiskBadge({ risk }) {
  const tone = { Low: 'brand', Medium: 'warn', High: 'danger', Pending: 'neutral' }[risk] || 'neutral';
  return <Badge tone={tone}>{risk} risk</Badge>;
}

/* ---------------- Section header ---------------- */
function PanelHead({ icon, title, right, sub }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: '1px solid var(--line)' }}>
    {icon && <span style={{ color: 'var(--brand)' }}><Icon name={icon} size={15} /></span>}
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: '.01em' }}>{title}</span>
      {sub && <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{sub}</span>}
    </div>
    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>{right}</div>
  </div>;
}

/* ---------------- KPI stat ---------------- */
function Stat({ label, value, unit, delta, tone = 'brand', spark, sub }) {
  return <div className="panel" style={{ padding: '13px 15px', display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
    <span className="lbl">{label}</span>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
      <span className="kpi-num" style={{ fontSize: 24, color: 'var(--text-1)' }}>{value}</span>
      {unit && <span className="mono" style={{ fontSize: 12, color: 'var(--text-3)' }}>{unit}</span>}
      {delta != null && <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 11.5, fontWeight: 600, color: delta >= 0 ? 'var(--brand)' : 'var(--danger)' }}>
        <Icon name="arrowUp" size={12} style={{ transform: delta >= 0 ? 'none' : 'rotate(180deg)' }} />{Math.abs(delta)}%
      </span>}
    </div>
    {spark && <Spark data={spark} tone={tone} />}
    {sub && <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{sub}</span>}
  </div>;
}

/* ---------------- Sparkline ---------------- */
function Spark({ data, tone = 'brand', h = 26 }) {
  const w = 100, max = Math.max(...data), min = Math.min(...data);
  const rng = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - ((v - min) / rng) * (h - 4) - 2]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const col = `var(--${tone})`;
  return <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" style={{ display: 'block' }}>
    <path d={`${d} L${w} ${h} L0 ${h} Z`} fill={col} opacity=".10" />
    <path d={d} fill="none" stroke={col} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
    <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="2" fill={col} />
  </svg>;
}

/* ---------------- Area chart: baseline vs project ---------------- */
function BaselineChart({ project, h = 190 }) {
  const yrs = project.series;
  const startYr = parseInt(project.creditPeriod) || 2023;
  const all = [...project.series, ...project.baselineSeries];
  const max = Math.max(...all) * 1.08, min = Math.min(...all, 0);
  const w = 520, padL = 6, padB = 22, padT = 8;
  const X = (i) => padL + (i / Math.max(1, yrs.length - 1)) * (w - padL - 8);
  const Y = (v) => padT + (1 - (v - min) / (max - min || 1)) * (h - padT - padB);
  const line = (arr) => arr.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join(' ');
  const proj = line(yrs), base = line(project.baselineSeries);
  const single = yrs.length < 2;
  return <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: 'block' }}>
    {[0, .25, .5, .75, 1].map((g, i) => {
      const yy = padT + g * (h - padT - padB);
      return <line key={i} x1={padL} x2={w - 8} y1={yy} y2={yy} stroke="var(--line)" strokeWidth="1" />;
    })}
    {!single && <>
      <path d={`${proj} L${X(yrs.length - 1)} ${Y(min)} L${X(0)} ${Y(min)} Z`} fill="var(--brand)" opacity=".12" />
      <path d={base} fill="none" stroke="var(--text-3)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
      <path d={proj} fill="none" stroke="var(--brand)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </>}
    {yrs.map((v, i) => <circle key={i} cx={X(i)} cy={Y(v)} r="2.6" fill="var(--brand)" />)}
    {yrs.map((v, i) => <text key={'t' + i} x={X(i)} y={h - 6} fontSize="9" className="mono" fill="var(--text-3)" textAnchor="middle">{startYr + i}</text>)}
  </svg>;
}

/* ---------------- Donut: carbon pools ---------------- */
function Donut({ segs, size = 132, thick = 18, center }) {
  const total = segs.reduce((s, x) => s + x.v, 0) || 1;
  const r = (size - thick) / 2, c = 2 * Math.PI * r;
  let acc = 0;
  return <div style={{ position: 'relative', width: size, height: size }}>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={thick} />
      {segs.map((s, i) => {
        const len = (s.v / total) * c;
        const el = <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.c}
          strokeWidth={thick} strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-acc}
          strokeLinecap="butt" />;
        acc += len; return el;
      })}
    </svg>
    {center && <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>{center}</div>}
  </div>;
}

/* ---------------- Ring gauge (uncertainty / risk / progress) ---------------- */
function Gauge({ pct, label, value, tone = 'teal', size = 92, sub }) {
  const thick = 9, r = (size - thick) / 2, c = 2 * Math.PI * r;
  const len = (Math.min(100, Math.max(0, pct)) / 100) * c;
  const col = `var(--${tone})`;
  return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={thick} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth={thick}
          strokeDasharray={`${len} ${c}`} strokeLinecap="round" style={{ transition: 'stroke-dasharray .6s cubic-bezier(.2,.7,.2,1)' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span className="kpi-num" style={{ fontSize: 18 }}>{value}</span>
        {sub && <span style={{ fontSize: 9, color: 'var(--text-3)' }}>{sub}</span>}
      </div>
    </div>
    {label && <span className="lbl" style={{ textAlign: 'center' }}>{label}</span>}
  </div>;
}

/* ---------------- Progress bar ---------------- */
function Bar({ pct, tone = 'brand', h = 6 }) {
  return <div style={{ height: h, background: 'var(--line)', borderRadius: 99, overflow: 'hidden' }}>
    <div style={{ height: '100%', width: pct + '%', background: `var(--${tone})`, borderRadius: 99, transition: 'width .6s cubic-bezier(.2,.7,.2,1)' }} />
  </div>;
}

/* ---------------- Mini horizontal bars ---------------- */
function HBars({ items, fmtv }) {
  const max = Math.max(...items.map(i => i.v)) || 1;
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
    {items.map((it, i) => <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 10, alignItems: 'center' }}>
      <span style={{ fontSize: 12, color: 'var(--text-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{it.label}</span>
      <div style={{ height: 7, background: 'var(--line)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: (it.v / max * 100) + '%', background: it.c || 'var(--brand)', borderRadius: 99 }} />
      </div>
      <span className="mono" style={{ fontSize: 11.5, color: 'var(--text-2)' }}>{fmtv ? fmtv(it.v) : it.v}</span>
    </div>)}
  </div>;
}

/* keyframes for ping */
(function () {
  const s = document.createElement('style');
  s.textContent = '@keyframes vc-ping{0%{transform:scale(.8);opacity:.6}100%{transform:scale(1.8);opacity:0}}';
  document.head.appendChild(s);
})();

Object.assign(window, {
  Icon, Dot, Badge, StageChip, RiskBadge, PanelHead, Stat, Spark,
  BaselineChart, Donut, Gauge, Bar, HBars, STATUS,
});

// ======================= map.jsx =======================
/* map.jsx — geospatial hero canvas: procedural AGBD raster, boundary, leakage belt,
   change-detection markers, graticule, pan/zoom. Style-switchable. */

/* ---- value noise ---- */
function hash2(x, y, s) {
  let h = x * 374761393 + y * 668265263 + s * 2147483647;
  h = (h ^ (h >> 13)) * 1274126177;
  h = h ^ (h >> 16);
  return ((h >>> 0) % 100000) / 100000;
}
function smooth(t) { return t * t * (3 - 2 * t); }
function vnoise(x, y, s) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash2(xi, yi, s), b = hash2(xi + 1, yi, s), c = hash2(xi, yi + 1, s), d = hash2(xi + 1, yi + 1, s);
  const u = smooth(xf), v = smooth(yf);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
function fbm(x, y, s) {
  let v = 0, amp = .5, f = 1;
  for (let i = 0; i < 5; i++) { v += amp * vnoise(x * f, y * f, s + i * 7); f *= 2; amp *= .5; }
  return v;
}

/* ---- boundary polygon (deterministic per project) ---- */
function makePolygon(seed, n = 26) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const r = 0.30 + 0.085 * fbm(Math.cos(a) * 1.5 + 4, Math.sin(a) * 1.5 + 4, seed) +
      0.04 * Math.sin(a * 3 + seed);
    pts.push([0.5 + r * Math.cos(a), 0.5 + r * Math.sin(a) * 0.82]);
  }
  return pts;
}
function pointInPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
    if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}
function lerp(a, b, t) { return a + (b - a) * t; }
function mix(c1, c2, t) { return [lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t)]; }
function ramp(stops, t) {
  t = Math.max(0, Math.min(1, t));
  for (let i = 0; i < stops.length - 1; i++) {
    if (t <= stops[i + 1][0]) {
      const lt = (t - stops[i][0]) / (stops[i + 1][0] - stops[i][0] || 1);
      return mix(stops[i][1], stops[i + 1][1], lt);
    }
  }
  return stops[stops.length - 1][1];
}
const RAMPS = {
  biomass: [[0, [36, 50, 22]], [.4, [94, 126, 30]], [.6, [155, 190, 46]], [.8, [79, 179, 90]], [1, [25, 211, 107]]],
  satellite: [[0, [40, 46, 34]], [.35, [54, 64, 40]], [.6, [60, 82, 48]], [.8, [47, 82, 48]], [1, [38, 64, 40]]],
  terrain: [[0, [28, 40, 33]], [.4, [52, 74, 58]], [.7, [110, 134, 110]], [1, [200, 210, 196]]],
  change: [[0, [206, 64, 64]], [.45, [120, 70, 40]], [.5, [60, 70, 60]], [.55, [50, 110, 60]], [1, [40, 200, 110]]],
  forest: [[0, [24, 32, 26]], [.49, [30, 40, 30]], [.5, [30, 120, 60]], [1, [22, 150, 74]]],
};

function MapHero({ project, mapStyle = 'biomass', theme = 'dark', compact, fill, overlays = {}, onPixel }) {
  const cvs = React.useRef(null);
  const wrap = React.useRef(null);
  const view = React.useRef({ scale: 1, ox: 0, oy: 0, drag: null });
  const [, force] = React.useState(0);
  const poly = React.useMemo(() => {
    let s = 0; for (const ch of project.id) s += ch.charCodeAt(0); return makePolygon(s % 997 + 11);
  }, [project.id]);
  const seed = React.useMemo(() => { let s = 0; for (const ch of project.id) s = (s * 31 + ch.charCodeAt(0)) % 9973; return s; }, [project.id]);

  const draw = React.useCallback(() => {
    const c = cvs.current; if (!c) return;
    const W = c.clientWidth, H = c.clientHeight;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    c.width = W * dpr; c.height = H * dpr;
    const ctx = c.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const void0 = '#07100b';
    ctx.fillStyle = void0; ctx.fillRect(0, 0, W, H);

    const { scale, ox, oy } = view.current;
    const size = Math.min(W, H);
    const px0 = (W - size) / 2 + ox, py0 = (H - size) / 2 + oy;
    const SX = (nx) => px0 + nx * size * scale - (scale - 1) * size / 2;
    const SY = (ny) => py0 + ny * size * scale - (scale - 1) * size / 2;
    const NX = (sx) => ((sx - px0 + (scale - 1) * size / 2) / (size * scale));
    const NY = (sy) => ((sy - py0 + (scale - 1) * size / 2) / (size * scale));

    // raster
    const stops = RAMPS[mapStyle] || RAMPS.biomass;
    const cell = compact ? 5 : 5;
    for (let sy = 0; sy < H; sy += cell) {
      for (let sx = 0; sx < W; sx += cell) {
        const nx = NX(sx + cell / 2), ny = NY(sy + cell / 2);
        if (nx < 0 || nx > 1 || ny < 0 || ny > 1) continue;
        if (!pointInPoly(nx, ny, poly)) continue;
        let v = fbm(nx * 6.5 + 1, ny * 6.5 + 1, seed);
        v = Math.pow(v, 1.15);
        // edge falloff -> sparser biomass near boundary
        const edge = Math.min(1, (0.5 - Math.max(Math.abs(nx - .5), Math.abs(ny - .5))) * 3 + .35);
        v *= 0.55 + 0.6 * edge;
        let t = v;
        if (mapStyle === 'change') { t = fbm(nx * 9 + 5, ny * 9, seed + 3); t = 0.5 + (t - 0.5) * 1.7; }
        if (mapStyle === 'forest') { t = v > .42 ? .8 + v * .2 : v * .9; }
        const col = ramp(stops, t);
        ctx.fillStyle = `rgb(${col[0] | 0},${col[1] | 0},${col[2] | 0})`;
        ctx.fillRect(sx, sy, cell, cell);
      }
    }

    // graticule
    ctx.strokeStyle = 'rgba(255,255,255,.05)';
    ctx.lineWidth = 1;
    for (let g = 0; g <= 8; g++) {
      const gx = (g / 8) * W; ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      const gy = (g / 8) * H; ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }

    const brand = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#1fa94f';
    // leakage belt (offset polygon ~ scaled out)
    if (overlays.leakage !== false) {
      ctx.save(); ctx.setLineDash([6, 5]); ctx.strokeStyle = 'rgba(47,208,187,.55)'; ctx.lineWidth = 1.4;
      ctx.beginPath();
      poly.forEach((p, i) => {
        const ex = 0.5 + (p[0] - 0.5) * 1.16, ey = 0.5 + (p[1] - 0.5) * 1.16;
        const x = SX(ex), y = SY(ey); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      });
      ctx.closePath(); ctx.stroke(); ctx.restore();
    }
    // project boundary
    ctx.beginPath();
    poly.forEach((p, i) => { const x = SX(p[0]), y = SY(p[1]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.closePath();
    ctx.lineWidth = 2; ctx.strokeStyle = brand; ctx.shadowColor = brand; ctx.shadowBlur = 10; ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(31,169,79,.05)'; ctx.fill();

    // permanent control plots (small squares)
    if (overlays.plots !== false) {
      ctx.fillStyle = 'rgba(255,255,255,.85)';
      const plotSeed = seed + 50;
      for (let i = 0; i < 14; i++) {
        const a = hash2(i, 1, plotSeed) * Math.PI * 2, rr = .08 + hash2(i, 2, plotSeed) * .34;
        const nx = 0.5 + rr * Math.cos(a), ny = 0.5 + rr * Math.sin(a) * .82;
        if (!pointInPoly(nx, ny, poly)) continue;
        const x = SX(nx), y = SY(ny);
        ctx.fillRect(x - 1.6, y - 1.6, 3.2, 3.2);
      }
    }
    // change-detection markers
    if (overlays.changes !== false && project.changes) {
      for (let i = 0; i < project.changes; i++) {
        const a = hash2(i, 9, seed) * Math.PI * 2, rr = .2 + hash2(i, 8, seed) * .25;
        const nx = 0.5 + rr * Math.cos(a), ny = 0.5 + rr * Math.sin(a) * .82;
        const x = SX(nx), y = SY(ny);
        const loss = i % 3 !== 2;
        ctx.beginPath(); ctx.arc(x, y, 6, 0, 7); ctx.strokeStyle = loss ? '#ef5b5b' : '#19d36b';
        ctx.lineWidth = 1.6; ctx.globalAlpha = .9; ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, 2, 0, 7); ctx.fillStyle = loss ? '#ef5b5b' : '#19d36b'; ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    // wildlife / ranger overlay (EarthRanger): collar tracks + sighting points
    if (overlays.wildlife) {
      const wSeed = seed + 120;
      // ranger / collar movement tracks (poly-lines)
      ctx.lineWidth = 1.4;
      for (let tk = 0; tk < 3; tk++) {
        ctx.beginPath();
        ctx.strokeStyle = tk === 0 ? 'rgba(155,124,240,.8)' : 'rgba(47,208,187,.7)';
        let nx = 0.4 + hash2(tk, 1, wSeed) * 0.2, ny = 0.4 + hash2(tk, 2, wSeed) * 0.2;
        ctx.moveTo(SX(nx), SY(ny));
        for (let s = 1; s < 12; s++) {
          nx += (hash2(tk, s + 10, wSeed) - 0.5) * 0.12;
          ny += (hash2(tk, s + 40, wSeed) - 0.5) * 0.10;
          nx = Math.max(.12, Math.min(.88, nx)); ny = Math.max(.12, Math.min(.88, ny));
          ctx.lineTo(SX(nx), SY(ny));
        }
        ctx.globalAlpha = .85; ctx.stroke(); ctx.globalAlpha = 1;
      }
      // sighting / event points
      const cats = [['#9b7cf0', 'collar'], ['#2fd0bb', 'sighting'], ['#f0a92c', 'snare'], ['#ef5b5b', 'hwc']];
      for (let i = 0; i < 22; i++) {
        const a = hash2(i, 5, wSeed) * Math.PI * 2, rr = .1 + hash2(i, 6, wSeed) * .36;
        const nx = 0.5 + rr * Math.cos(a), ny = 0.5 + rr * Math.sin(a) * .82;
        if (!pointInPoly(nx, ny, poly)) continue;
        const x = SX(nx), y = SY(ny);
        const cat = cats[i % cats.length];
        ctx.beginPath(); ctx.arc(x, y, 3.2, 0, 7); ctx.fillStyle = cat[0];
        ctx.globalAlpha = .92; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, 5.2, 0, 7); ctx.strokeStyle = cat[0]; ctx.lineWidth = 1; ctx.globalAlpha = .4; ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }, [poly, seed, mapStyle, theme, compact, overlays.leakage, overlays.plots, overlays.changes, overlays.wildlife, project.changes]);

  React.useEffect(() => {
    draw();
    const ro = new ResizeObserver(() => draw());
    if (cvs.current) ro.observe(cvs.current);
    return () => ro.disconnect();
  }, [draw]);

  // interactions
  React.useEffect(() => {
    const c = cvs.current; if (!c) return;
    const onWheel = (e) => {
      e.preventDefault();
      const v = view.current; const f = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      v.scale = Math.max(1, Math.min(6, v.scale * f));
      if (v.scale === 1) { v.ox = 0; v.oy = 0; }
      draw();
    };
    const onDown = (e) => { view.current.drag = { x: e.clientX, y: e.clientY, ox: view.current.ox, oy: view.current.oy }; };
    const onMove = (e) => {
      const d = view.current.drag; if (!d) return;
      view.current.ox = d.ox + (e.clientX - d.x); view.current.oy = d.oy + (e.clientY - d.y); draw();
    };
    const onUp = () => { view.current.drag = null; };
    c.addEventListener('wheel', onWheel, { passive: false });
    c.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => { c.removeEventListener('wheel', onWheel); c.removeEventListener('pointerdown', onDown); window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
  }, [draw]);

  const zoom = (f) => { const v = view.current; v.scale = Math.max(1, Math.min(6, v.scale * f)); if (v.scale === 1) { v.ox = 0; v.oy = 0; } draw(); force(x => x + 1); };
  const reset = () => { view.current = { scale: 1, ox: 0, oy: 0, drag: null }; draw(); force(x => x + 1); };

  const legendStops = mapStyle === 'change'
    ? [['Loss', '#ef5b5b'], ['Stable', '#566'], ['Gain', '#19d36b']]
    : mapStyle === 'forest'
      ? [['Non-forest', '#2a3a2e'], ['Forest', '#19964a']]
      : [['Low', 'rgb(36,50,22)'], ['', 'rgb(155,190,46)'], ['High', 'rgb(25,211,107)']];

  return <div ref={wrap} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: fill ? 0 : 'inherit', background: '#07100b' }}>
    <canvas ref={cvs} style={{ width: '100%', height: '100%', display: 'block', cursor: view.current.drag ? 'grabbing' : 'grab' }} />

    {/* HUD: top-left */}
    <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6, pointerEvents: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 10px', background: 'rgba(8,16,11,.74)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 7 }}>
        <Dot s="ok" pulse />
        <span className="mono" style={{ fontSize: 11, color: '#e8f0ea' }}>{project.code}</span>
        <span style={{ fontSize: 11, color: '#66796d' }}>{project.name}</span>
      </div>
      <span className="mono" style={{ fontSize: 10, color: '#66796d', paddingLeft: 2 }}>
        {project.lat.toFixed(3)}°, {project.lng.toFixed(3)}° · EPSG:4326
      </span>
    </div>

    {/* HUD: top-right legend */}
    <div style={{ position: 'absolute', top: 12, right: 12, padding: '8px 10px', background: 'rgba(8,16,11,.74)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 7, pointerEvents: 'none' }}>
      <div className="lbl" style={{ marginBottom: 6 }}>
        {mapStyle === 'biomass' ? 'AGBD · Mg ha⁻¹' : mapStyle === 'change' ? 'Δ Biomass' : mapStyle === 'forest' ? 'Forest cover' : mapStyle === 'terrain' ? 'Elevation' : 'Surface'}
      </div>
      {mapStyle === 'biomass' || mapStyle === 'satellite' || mapStyle === 'terrain'
        ? <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span className="mono" style={{ fontSize: 9, color: '#66796d' }}>0</span>
          <div style={{ width: 92, height: 8, borderRadius: 3, background: mapStyle === 'biomass' ? 'linear-gradient(90deg,rgb(36,50,22),rgb(155,190,46),rgb(25,211,107))' : mapStyle === 'terrain' ? 'linear-gradient(90deg,rgb(28,40,33),rgb(110,134,110),rgb(200,210,196))' : 'linear-gradient(90deg,rgb(40,46,34),rgb(60,82,48),rgb(38,64,40))' }} />
          <span className="mono" style={{ fontSize: 9, color: '#66796d' }}>{mapStyle === 'biomass' ? Math.round(project.agbd.hi) : '∎'}</span>
        </div>
        : <div style={{ display: 'flex', gap: 12 }}>{legendStops.map((s, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 9, height: 9, borderRadius: 2, background: s[1] }} /><span style={{ fontSize: 10, color: '#9bb0a4' }}>{s[0]}</span></div>)}</div>}
    </div>

    {/* zoom controls */}
    <div style={{ position: 'absolute', right: 12, bottom: 12, display: 'flex', flexDirection: 'column', gap: 1, borderRadius: 7, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)' }}>
      {[['plus', () => zoom(1.3)], ['chevD', () => zoom(1 / 1.3)], ['crosshair', reset]].map(([ic, fn], i) =>
        <button key={i} onClick={fn} style={{ width: 30, height: 30, border: 'none', background: 'rgba(8,16,11,.82)', backdropFilter: 'blur(8px)', color: '#e8f0ea', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
          <Icon name={ic} size={ic === 'chevD' ? 14 : 13} />
        </button>)}
    </div>

    {/* scale bar + attribution */}
    <div style={{ position: 'absolute', left: 12, bottom: 12, display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'none' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ width: 64, height: 4, borderLeft: '1.5px solid #9bb0a4', borderRight: '1.5px solid #9bb0a4', borderBottom: '1.5px solid #9bb0a4' }} />
        <span className="mono" style={{ fontSize: 9, color: '#66796d' }}>5 km</span>
      </div>
      <span className="mono" style={{ fontSize: 9, color: '#66796d' }}>Sentinel-2 · 10 m · GEE</span>
    </div>
  </div>;
}

Object.assign(window, { MapHero, ramp, RAMPS, hash2, fbm });

// ======================= views1.jsx =======================
/* views1.jsx — Portfolio, Project dashboard, Measurement Engine */
const D = window.DMRV;
const fmt = D.fmt;
const M = (n) => (n >= 1e6 ? (n / 1e6).toFixed(2) + 'M' : n >= 1e3 ? (n / 1e3).toFixed(0) + 'k' : '' + n);

function poolSegs(p) {
  return [
    { label: 'Above-ground (AGB)', v: p.pools.agb, c: 'var(--brand)' },
    { label: 'Below-ground (BGB)', v: p.pools.bgb, c: 'var(--brand-2)' },
    { label: 'Soil organic (SOC)', v: p.pools.soc, c: 'var(--gold)' },
    { label: 'Dead wood & litter', v: p.pools.dead, c: 'var(--teal)' },
  ];
}

/* ===================== PORTFOLIO ===================== */
function PortfolioView({ project, openProject, t }) {
  const [focus, setFocus] = React.useState(project.id);
  const fp = D.projects.find(p => p.id === focus) || project;
  const pf = D.portfolio;
  const byType = {};
  D.projects.forEach(p => { byType[p.type] = (byType[p.type] || 0) + p.area; });
  const typeColors = { 'REDD+': 'var(--brand)', 'ARR': 'var(--brand-2)', 'Agroforestry': 'var(--gold)', 'Blue Carbon': 'var(--teal)' };
  const typeSegs = Object.entries(byType).map(([k, v]) => ({ label: k, v, c: typeColors[k] || 'var(--text-3)' }));

  return <div className="vc-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', height: '100%', minHeight: 0 }}>
    {/* KPI strip */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 'var(--gap)' }}>
      <Stat label="Active projects" value={pf.activeProjects} sub={`${pf.countries} countries · Kenya, Uganda`} />
      <Stat label="Area under MRV" value={M(pf.totalArea)} unit="ha" sub="Across 6 AOIs" />
      <Stat label="Carbon stock" value={M(pf.totalStock)} unit="tCO₂e" spark={[18,19,20.5,22,24.3]} sub="Verified + modelled" />
      <Stat label="Annual forecast" value={M(pf.annualForecast)} unit="tCO₂e/yr" delta={8} tone="brand" />
      <Stat label="Issued to date" value={M(pf.issuedToDate)} unit="credits" sub={`Buffer pool ${M(pf.bufferPool)}`} />
      <Stat label="Avg uncertainty" value={pf.avgUncertainty} unit="%" tone="teal" sub="95% credible interval" />
    </div>

    {/* main */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', flex: 1, minHeight: 0 }}>
      {/* projects table */}
      <div className="panel" style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1.5 }}>
        <PanelHead icon="grid" title="Project portfolio" sub="Enrolled AFOLU projects across the pipeline"
          right={<><button className="vc-btn-ghost"><Icon name="filter" size={13} /> Filter</button><button className="vc-btn"><Icon name="plus" size={13} /> Enrol project</button></>} />
        <div style={{ overflow: 'auto', minHeight: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr style={{ position: 'sticky', top: 0, background: 'var(--bg-1)', zIndex: 1 }}>
                {['Project', 'Stage', 'Area', 'Carbon stock', 'Forecast/yr', 'Uncert.', 'Risk', 'Trend'].map((h, i) =>
                  <th key={i} style={{ textAlign: i > 1 ? 'right' : 'left', padding: '9px 11px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)', fontWeight: 600, fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {D.projects.map(p => <tr key={p.id} onClick={() => openProject(p.id)} onMouseEnter={() => setFocus(p.id)}
                className="vc-row" style={{ cursor: 'pointer', background: focus === p.id ? 'var(--hover)' : 'transparent' }}>
                <td style={{ padding: '9px 11px', borderBottom: '1px solid var(--line)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <Dot s={p.stage === 'Verification' ? 'queued' : p.stage === 'Onboarding' || p.stage === 'Baseline' ? 'pending' : 'ok'} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-1)', whiteSpace: 'nowrap', display: 'flex', gap: 6, alignItems: 'center' }}>{p.flag} {p.name}</div>
                      <div className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{p.code} · {p.type} · {p.methodology}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '9px 11px', borderBottom: '1px solid var(--line)' }}><StageChip stage={p.stage} /></td>
                <td style={{ padding: '9px 11px', borderBottom: '1px solid var(--line)', textAlign: 'right', whiteSpace: 'nowrap' }} className="mono">{fmt(p.area)}<span style={{ color: 'var(--text-3)' }}> ha</span></td>
                <td style={{ padding: '9px 11px', borderBottom: '1px solid var(--line)', textAlign: 'right' }} className="mono">{M(p.carbonStock)}</td>
                <td style={{ padding: '9px 11px', borderBottom: '1px solid var(--line)', textAlign: 'right' }} className="mono" >{p.creditForecast ? M(p.creditForecast) : <span style={{ color: 'var(--text-3)' }}>—</span>}</td>
                <td style={{ padding: '9px 11px', borderBottom: '1px solid var(--line)', textAlign: 'right' }}>
                  <span style={{ color: p.uncertaintyPct > 25 ? 'var(--warn)' : 'var(--text-2)' }} className="mono">±{p.uncertaintyPct}%</span>
                </td>
                <td style={{ padding: '9px 11px', borderBottom: '1px solid var(--line)', textAlign: 'right' }}><RiskBadge risk={p.risk} /></td>
                <td style={{ padding: '9px 11px', borderBottom: '1px solid var(--line)', width: 64 }}><Spark data={p.series.length > 1 ? p.series : [p.series[0], p.series[0]]} /></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* map + composition band */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(320px,1fr)', gap: 'var(--gap)', height: 286, flexShrink: 0 }}>
        <div className="panel" style={{ overflow: 'hidden', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <PanelHead icon="map" title="Regional view" sub={fp.name} right={<button className="vc-btn-ghost" onClick={() => openProject(fp.id)}>Open <Icon name="chevR" size={12} /></button>} />
          <div style={{ flex: 1, minHeight: 0 }}><MapHero project={fp} mapStyle={t.mapStyle} theme={t.dark ? 'dark' : 'light'} compact /></div>
        </div>
        <div className="panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <PanelHead icon="ring" title="Composition" sub="Area by type" />
          <div style={{ display: 'flex', gap: 16, padding: 16, alignItems: 'center', flex: 1 }}>
            <Donut segs={typeSegs} size={120} center={<><span className="kpi-num" style={{ fontSize: 17 }}>{M(pf.totalArea)}</span><span style={{ fontSize: 9, color: 'var(--text-3)' }}>ha</span></>} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {typeSegs.map((s, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <span style={{ width: 9, height: 9, borderRadius: 2, background: s.c }} />
                <span style={{ color: 'var(--text-2)', flex: 1 }}>{s.label}</span>
                <span className="mono" style={{ color: 'var(--text-3)' }}>{M(s.v)} ha</span>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

/* ===================== PROJECT DASHBOARD ===================== */
function ProjectView({ project, t }) {
  const p = project;
  return <div className="vc-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: 'var(--gap)', height: '100%', minHeight: 0 }}>
    {/* left: map + bottom strip */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', minHeight: 0 }}>
      <div className="panel" style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <PanelHead icon="map" title="Project boundary & carbon stock" sub={`${fmt(p.area)} ha · ${p.methodology} · ${p.registry}`}
          right={<><Badge tone="teal">10 km leakage belt</Badge><Badge tone="neutral">14 control plots</Badge></>} />
        <div style={{ flex: 1, minHeight: 0 }}><MapHero project={p} mapStyle={t.mapStyle} theme={t.dark ? 'dark' : 'light'} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--gap)' }}>
        <Stat label="Carbon stock" value={M(p.carbonStock)} unit="tCO₂e" />
        <Stat label="Credit forecast" value={p.creditForecast ? M(p.creditForecast) : '—'} unit="tCO₂e/yr" tone="brand" />
        <Stat label="AGBD mean" value={p.agbd.mean} unit="Mg/ha" tone="gold" sub={`CI ${p.agbd.lo}–${p.agbd.hi}`} />
        <Stat label="Baseline rate" value={p.baselineRate ? p.baselineRate + '%' : 'n/a'} unit={p.baselineRate ? '/yr loss' : ''} tone="warn" />
      </div>
    </div>

    {/* right rail */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', minHeight: 0, overflow: 'auto' }}>
      <div className="panel" style={{ padding: 15 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, display: 'flex', gap: 7, alignItems: 'center' }}>{p.flag} {p.name}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>{p.code} · {p.cycle}</div>
          </div>
          <StageChip stage={p.stage} />
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'space-around', padding: '6px 0' }}>
          <Gauge pct={100 - p.uncertaintyPct} value={'±' + p.uncertaintyPct + '%'} sub="95% CI" label="Uncertainty" tone="teal" />
          <Gauge pct={p.riskScore || 6} value={p.risk === 'Pending' ? '—' : p.riskScore} sub={p.risk} label="Risk score" tone={p.risk === 'Low' ? 'brand' : p.risk === 'Medium' ? 'warn' : 'danger'} />
          <Gauge pct={p.dossier} value={p.dossier + '%'} sub="dossier" label="VVB ready" tone="info" />
        </div>
      </div>

      <div className="panel">
        <PanelHead icon="calc" title="Carbon pools" sub="Across 4 IPCC pools" />
        <div style={{ display: 'flex', gap: 16, padding: 15, alignItems: 'center' }}>
          <Donut segs={poolSegs(p)} size={118} center={<><span className="kpi-num" style={{ fontSize: 16 }}>{M(p.carbonStock)}</span><span style={{ fontSize: 9, color: 'var(--text-3)' }}>tCO₂e</span></>} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
            {poolSegs(p).map((s, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11.5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />
              <span style={{ color: 'var(--text-2)', flex: 1 }}>{s.label}</span>
              <span className="mono" style={{ color: 'var(--text-3)' }}>{M(s.v)}</span>
            </div>)}
          </div>
        </div>
      </div>

      <div className="panel">
        <PanelHead icon="pulse" title="Baseline vs. project" sub="Dynamic baseline · control plots" />
        <div style={{ padding: '12px 14px 6px' }}><BaselineChart project={p} h={150} /></div>
        <div style={{ display: 'flex', gap: 16, padding: '0 14px 14px', fontSize: 11 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-2)' }}><span style={{ width: 14, height: 2, background: 'var(--brand)' }} /> Project</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-2)' }}><span style={{ width: 14, height: 0, borderTop: '2px dashed var(--text-3)' }} /> Baseline</span>
        </div>
      </div>

      <div className="panel">
        <PanelHead icon="sat" title="Data sources" sub={`${p.sources.length} active feeds`} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, padding: 14 }}>
          {p.sources.map((s, i) => <span key={i} style={{ fontSize: 11, padding: '4px 9px', borderRadius: 6, background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--text-2)' }} className="mono">{s}</span>)}
        </div>
      </div>
    </div>
  </div>;
}

/* ===================== MEASUREMENT ENGINE ===================== */
function MeasurementView({ project, t }) {
  const p = project;
  const [layer, setLayer] = React.useState('biomass');
  const layers = [['biomass', 'AGBD'], ['change', 'Δ Change'], ['forest', 'Forest cover'], ['terrain', 'Terrain']];
  // synthetic AGBD histogram
  const hist = React.useMemo(() => {
    const arr = []; for (let i = 0; i < 22; i++) { const x = i / 21; arr.push(Math.exp(-Math.pow((x - .5) * 2.4, 2)) * (0.7 + 0.3 * Math.sin(i + p.code.length))); } return arr;
  }, [p.code]);
  const hmax = Math.max(...hist);
  // EO vs field calibration scatter
  const scatter = React.useMemo(() => {
    const pts = []; for (let i = 0; i < 28; i++) { const x = hash2(i, 3, p.area % 900); const y = x * 0.86 + (hash2(i, 9, 7) - 0.5) * 0.22; pts.push([x, Math.max(0, Math.min(1, y))]); } return pts;
  }, [p.area]);

  return <div className="vc-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 'var(--gap)', height: '100%', minHeight: 0 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', minHeight: 0 }}>
      <div className="panel" style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <PanelHead icon="cpu" title="Measurement Engine · AGBD @ 10 m" sub="Site-specific Bayesian biomass model"
          right={<div style={{ display: 'flex', gap: 3, background: 'var(--bg-2)', padding: 3, borderRadius: 7, border: '1px solid var(--line)' }}>
            {layers.map(([k, lbl]) => <button key={k} onClick={() => setLayer(k)} style={{ border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600, padding: '4px 9px', borderRadius: 5, background: layer === k ? 'var(--brand)' : 'transparent', color: layer === k ? '#08130d' : 'var(--text-2)' }}>{lbl}</button>)}
          </div>} />
        <div style={{ flex: 1, minHeight: 0 }}><MapHero project={p} mapStyle={layer} theme={t.dark ? 'dark' : 'light'} overlays={{ changes: layer === 'change' || layer === 'biomass' }} /></div>
      </div>
      <div className="panel">
        <PanelHead icon="alert" title="Change detection" sub="Events > 2σ from expected growth trajectory" right={<Badge tone="warn">{D.changeEvents.filter(c => c.kind === 'Loss').length} loss flagged</Badge>} />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <tbody>
            {D.changeEvents.map(c => <tr key={c.id} className="vc-row">
              <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)' }}><Badge tone={c.kind === 'Loss' ? 'danger' : 'brand'}>{c.kind}</Badge></td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-1)' }}>{c.area}</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', textAlign: 'right' }} className="mono">{c.ha} ha</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', textAlign: 'right' }} className="mono"><span style={{ color: c.sigma > 3 ? 'var(--danger)' : 'var(--warn)' }}>{c.sigma}σ</span></td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)' }} className="mono">{c.source}</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)' }} className="mono">{c.date}</td>
              <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', textAlign: 'right' }}><button className="vc-btn-ghost">{c.action}</button></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>

    {/* right rail */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', minHeight: 0, overflow: 'auto' }}>
      <div className="panel" style={{ padding: 15 }}>
        <span className="lbl">AGBD distribution</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 80, margin: '12px 0 6px' }}>
          {hist.map((h, i) => <div key={i} style={{ flex: 1, height: (h / hmax * 100) + '%', background: `rgb(${ramp(RAMPS.biomass, i / 21).map(v => v | 0).join(',')})`, borderRadius: 1 }} />)}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }} className="mono"><span style={{ fontSize: 9, color: 'var(--text-3)' }}>0</span><span style={{ fontSize: 9, color: 'var(--text-3)' }}>{Math.round(p.agbd.hi)} Mg/ha</span></div>
        <hr className="hair" style={{ margin: '12px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center' }}><div className="kpi-num" style={{ fontSize: 19, color: 'var(--gold)' }}>{p.agbd.mean}</div><span className="lbl">mean</span></div>
          <div style={{ textAlign: 'center' }}><div className="kpi-num" style={{ fontSize: 19, color: 'var(--text-2)' }}>{p.agbd.lo}</div><span className="lbl">lower CI</span></div>
          <div style={{ textAlign: 'center' }}><div className="kpi-num" style={{ fontSize: 19, color: 'var(--text-2)' }}>{p.agbd.hi}</div><span className="lbl">upper CI</span></div>
        </div>
      </div>

      <div className="panel" style={{ padding: 15 }}>
        <span className="lbl">Hybrid MRV calibration</span>
        <div style={{ fontSize: 11, color: 'var(--text-3)', margin: '3px 0 10px' }}>EO-derived vs. field plot tCO₂e · R² = 0.86</div>
        <svg viewBox="0 0 200 130" width="100%" height="130" style={{ display: 'block' }}>
          <line x1="20" y1="110" x2="190" y2="110" stroke="var(--line)" /><line x1="20" y1="10" x2="20" y2="110" stroke="var(--line)" />
          <line x1="20" y1="110" x2="190" y2="14" stroke="var(--text-3)" strokeDasharray="3 3" strokeWidth="1" />
          {scatter.map((pt, i) => <circle key={i} cx={20 + pt[0] * 168} cy={110 - pt[1] * 96} r="2.6" fill="var(--teal)" opacity=".8" />)}
          <text x="105" y="126" fontSize="8" fill="var(--text-3)" textAnchor="middle" className="mono">Field plot AGB (tCO₂e)</text>
        </svg>
      </div>

      <div className="panel">
        <PanelHead icon="spark" title="Model card" sub="HabitatMapper™ · Bayesian UQ" />
        <div style={{ padding: '4px 0' }}>
          {[['Approach', 'Deep Bayesian (GP + VI)'], ['Reference', 'Field · LiDAR · GEDI L4A'], ['Predictors', 'S2 · S1 SAR · DEM'], ['UQ', '95% credible interval'], ['Validation', 'CRPS · PICP'], ['Resolution', '10 m · annual'], ['Accuracy', '> 90% forest cover']].map(([k, v], i) =>
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 14px', borderBottom: i < 6 ? '1px solid var(--line)' : 'none', fontSize: 12 }}>
              <span style={{ color: 'var(--text-3)' }}>{k}</span><span className="mono" style={{ color: 'var(--text-2)' }}>{v}</span>
            </div>)}
        </div>
      </div>
    </div>
  </div>;
}

Object.assign(window, { PortfolioView, ProjectView, MeasurementView, poolSegs, M });

// ======================= views2.jsx =======================
/* views2.jsx — Carbon Accounting, Compliance, Data Pipeline, Field companion */
const D2 = window.DMRV;
const fmt2 = D2.fmt;
const MM = window.M;

/* ---- Methodology catalog (codified logic per standard) ---- */
const METHODS = [
  { id: 'VM0048', short: 'VM0048', name: 'Reducing Emissions from Deforestation (REDD+)', registry: 'Verra VCS', tone: 'brand', status: 'Active · Phase 1' },
  { id: 'VM0047', short: 'VM0047', name: 'Afforestation, Reforestation & Revegetation (ARR)', registry: 'Verra VCS', tone: 'teal', status: 'Codified · Phase 1' },
  { id: 'VM0042', short: 'VM0042', name: 'Improved Agricultural Land Management', registry: 'Verra VCS', tone: 'gold', status: 'Phase 2' },
  { id: 'VM0007', short: 'VM0007', name: 'REDD+ Methodology Framework', registry: 'Verra VCS', tone: 'info', status: 'Phase 2' },
  { id: 'VM0033', short: 'VM0033', name: 'Tidal Wetland & Seagrass Restoration', registry: 'Verra VCS', tone: 'teal', status: 'Phase 2' },
  { id: 'VM0032', short: 'VM0032', name: 'Sustainable Grasslands (fire & grazing)', registry: 'Verra VCS', tone: 'gold', status: 'Backlog' },
  { id: 'ART-TREES', short: 'ART TREES', name: 'Jurisdictional & Nested REDD+', registry: 'ART Registry', tone: 'info', status: 'Phase 3' },
  { id: 'GS4GG', short: 'Gold Standard', name: 'GS4GG · Land Use & Forests A/R', registry: 'Gold Standard', tone: 'ai', status: 'Phase 3' },
];
function methodSteps(id, p) {
  const stk = MM(p.carbonStock) + ' tCO₂e';
  const table = {
    'VM0048': [
      ['Baseline scenario', 'Historical deforestation rate from SI Forest Cover Benchmark Map (VT0007). Refreshed dynamically each cycle.', p.baselineRate ? p.baselineRate + '%/yr loss' : 'jurisdictional rate'],
      ['Project carbon stock', 'Annual stocks across 4 pools from validated Measurement Engine outputs.', stk],
      ['Leakage', 'Activity-shifting via HabitatMapper™ leakage-belt land cover time series.', (p.leakagePct || 0) + '%'],
      ['Net additionality', 'Dynamic baseline − project − leakage, anchored on live control plots.', p.additionality],
      ['Credit forecast', 'Lower bound of 90% CI used for issuance (VM0048 §5.3).', p.creditForecast ? MM(p.creditForecast) + '/yr' : 'pending'],
    ],
    'VM0047': [
      ['Baseline', 'Pre-project carbon held constant on degraded land (zero / low baseline).', 'static baseline'],
      ['Project removals', 'AGB + BGB + SOC accumulation from planting; allometric + EO time series.', stk],
      ['Leakage', 'Activity-shifting & ecological leakage deduction.', (p.leakagePct || 4) + '%'],
      ['Additionality', 'Performance benchmark + investment / barrier analysis.', 'benchmark + barrier'],
      ['Net removals', 'GHG removals minus buffer pool; conservative lower CI applied.', 'buffer 15–20%'],
    ],
    'VM0042': [
      ['Baseline', 'Common-practice management; SOC trajectory modelled (DayCent / RothC) or measured.', 'modelled SOC'],
      ['Project SOC', 'Soil cores + remote covariates (iSDAsoil); SOC stock change to 30 cm.', 'ΔSOC tC/ha'],
      ['N₂O & CH₄', 'Fertiliser, residue & livestock emission factors (IPCC Tier 1–2).', 'emission factors'],
      ['Leakage', 'Production-displacement (yield) leakage assessment.', 'yield-based'],
      ['Net reductions', 'SOC gain + emission reductions, conservative deduction applied.', 'net tCO₂e/yr'],
    ],
    'VM0007': [
      ['Reference region', 'Historical deforestation & degradation rate across the reference region.', 'historical rate'],
      ['Baseline projection', 'Activity data × emission factors per carbon pool.', 'AD × EF'],
      ['Project monitoring', 'Forest-cover change detected via EO (Sentinel-2 + SAR).', 'EO change'],
      ['Leakage belt', 'Displacement monitoring in the defined leakage belt.', '10 km belt'],
      ['Net ERR', 'Baseline − project − leakage emission reductions & removals.', 'net ERR'],
    ],
    'VM0033': [
      ['Baseline', 'Without-project wetland loss and soil organic carbon oxidation.', 'SOC oxidation'],
      ['Project stock', 'Mangrove AGB / BGB + sediment SOC accumulation.', stk],
      ['Allochthonous adj.', 'Deduction for carbon not generated by the project.', 'autochthonous %'],
      ['Leakage', 'Displacement of degradation pressure.', 'displacement'],
      ['Net removals', 'Conservative removals including soil & biomass pools.', 'incl. soil pool'],
    ],
    'VM0032': [
      ['Baseline', 'Continued degradation under the existing fire & grazing regime.', 'degradation'],
      ['Project stock', 'AGB + SOC response to adjusted fire & grazing management.', stk],
      ['Non-CO₂', 'Fire-related CH₄ & N₂O emissions accounting.', 'fire CH₄/N₂O'],
      ['Leakage', 'Grazing-displacement assessment.', 'grazing shift'],
      ['Net reductions', 'Net SOC + biomass gain, conservative deduction.', 'net tCO₂e'],
    ],
    'ART-TREES': [
      ['Crediting baseline', 'Adjusted national / jurisdictional Forest Reference Emission Level.', 'adjusted FREL'],
      ['Activity data', 'Wall-to-wall forest-cover change from EO.', 'EO wall-to-wall'],
      ['Emission factors', 'Biomass density per forest stratum.', 'per-stratum EF'],
      ['Uncertainty', 'TREES uncertainty deduction applied to gross estimate.', 'TREES discount'],
      ['Net removals', 'Gross vs FREL with HFLD provisions.', 'vs FREL'],
    ],
    'GS4GG': [
      ['Baseline', 'Pre-project land-use carbon stock & trajectory.', 'land-use baseline'],
      ['Project removals', 'Tree growth via species-specific allometrics + EO.', stk],
      ['Leakage', 'Activity-shifting leakage deduction.', 'activity-shift'],
      ['Safeguards & SDGs', 'Co-benefit monitoring against Gold Standard SDG requirements.', '≥3 SDGs'],
      ['Net removals', 'Conservative removals with buffer contribution.', 'buffered'],
    ],
  };
  return (table[id] || table['VM0048']).map((s, i) => ({ n: i + 1, t: s[0], d: s[1], v: s[2] }));
}
function MethodPicker({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const cur = METHODS.find(m => m.id === value) || METHODS[0];
  return <div style={{ position: 'relative' }}>
    <button className="vc-btn-ghost" style={{ padding: '6px 10px' }} onClick={() => setOpen(o => !o)}>
      <Icon name="list" size={13} c="var(--brand)" />
      <span style={{ fontWeight: 600 }}>{cur.short}</span>
      <Icon name="chevD" size={12} />
    </button>
    {open && <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setOpen(false)} />
      <div className="panel" style={{ position: 'absolute', top: '112%', right: 0, width: 320, zIndex: 41, padding: 6, maxHeight: 380, overflow: 'auto' }}>
        <div className="lbl" style={{ padding: '6px 8px 4px' }}>Methodology</div>
        {METHODS.map(m => <div key={m.id} className="nav-item" style={{ borderRadius: 7, alignItems: 'flex-start' }} onClick={() => { onChange(m.id); setOpen(false); }}>
          <span style={{ marginTop: 2 }}><Icon name="calc" size={14} c={m.id === value ? 'var(--brand)' : 'var(--text-3)'} /></span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 12.5, fontWeight: 700 }}>{m.short}</span>
              <Badge tone={m.tone}>{m.status}</Badge>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2, whiteSpace: 'normal', lineHeight: 1.35 }}>{m.name} · {m.registry}</div>
          </div>
          {m.id === value && <Icon name="check" size={14} c="var(--brand)" />}
        </div>)}
      </div>
    </>}
  </div>;
}

/* ===================== CARBON ACCOUNTING ENGINE ===================== */
function AccountingView({ project, t }) {
  const p = project;
  const [method, setMethod] = React.useState('VM0048');
  const curMethod = METHODS.find(m => m.id === method) || METHODS[0];
  const startYr = parseInt(p.creditPeriod) || 2024;
  // forward forecast rows
  const rows = React.useMemo(() => {
    const base = p.creditForecast || (p.carbonStock * 0.045);
    const out = [];
    for (let i = 0; i < 6; i++) {
      const gross = base * (1 + i * 0.03);
      const leak = gross * (p.leakagePct || 5) / 100;
      const net = gross - leak;
      const lci = net * (1 - p.uncertaintyPct / 100);
      out.push({ yr: startYr + i, gross, leak, net, lci });
    }
    return out;
  }, [p]);
  const steps = methodSteps(method, p);
  return <div className="vc-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: 'var(--gap)', height: '100%', minHeight: 0 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', minHeight: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--gap)' }}>
        <Stat label="Gross removals" value={MM(rows[0].gross)} unit="tCO₂e/yr" tone="brand" />
        <Stat label="Leakage deduction" value={'−' + MM(rows[0].leak)} unit="tCO₂e" tone="warn" />
        <Stat label="Net additionality" value={MM(rows[0].net)} unit="tCO₂e/yr" tone="brand" />
        <Stat label="Issuance (lower CI)" value={MM(rows[0].lci)} unit="tCO₂e" tone="teal" sub={`conservative −${p.uncertaintyPct}%`} />
      </div>
      <div className="panel" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <PanelHead icon="pulse" title="Baseline vs. project trajectory" sub="Dynamic baseline · Bayesian CI band"
          right={<Badge tone={curMethod.tone}>{curMethod.short}</Badge>} />
        <div style={{ padding: '14px 16px 4px' }}><BaselineChart project={p} h={210} /></div>
        <div style={{ display: 'flex', gap: 18, padding: '0 16px 14px', fontSize: 11.5 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-2)' }}><span style={{ width: 14, height: 2, background: 'var(--brand)' }} /> Project scenario</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-2)' }}><span style={{ width: 14, borderTop: '2px dashed var(--text-3)' }} /> Counterfactual baseline</span>
          <span style={{ marginLeft: 'auto', color: 'var(--text-3)' }} className="mono">M tCO₂e · {startYr}–{startYr + p.series.length - 1}</span>
        </div>
      </div>
      <div className="panel">
        <PanelHead icon="calc" title="Credit forecast" sub="Forward projection with confidence bounds" right={<button className="vc-btn-ghost"><Icon name="dl" size={13} /> Export CSV</button>} />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead><tr>{['Vintage', 'Gross', 'Leakage', 'Net', 'Issuance (−CI)', ''].map((h, i) =>
            <th key={i} style={{ textAlign: i === 0 ? 'left' : i === 5 ? 'left' : 'right', padding: '8px 16px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)', fontWeight: 600, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.05em' }}>{h}</th>)}</tr></thead>
          <tbody>
            {rows.map((r, i) => <tr key={i} className="vc-row">
              <td className="mono" style={{ padding: '8px 16px', borderBottom: '1px solid var(--line)', color: 'var(--text-1)', fontWeight: 600 }}>{r.yr}</td>
              <td className="mono" style={{ padding: '8px 16px', borderBottom: '1px solid var(--line)', textAlign: 'right', color: 'var(--text-2)' }}>{fmt2(Math.round(r.gross))}</td>
              <td className="mono" style={{ padding: '8px 16px', borderBottom: '1px solid var(--line)', textAlign: 'right', color: 'var(--warn)' }}>−{fmt2(Math.round(r.leak))}</td>
              <td className="mono" style={{ padding: '8px 16px', borderBottom: '1px solid var(--line)', textAlign: 'right', color: 'var(--text-1)' }}>{fmt2(Math.round(r.net))}</td>
              <td className="mono" style={{ padding: '8px 16px', borderBottom: '1px solid var(--line)', textAlign: 'right', color: 'var(--teal)', fontWeight: 600 }}>{fmt2(Math.round(r.lci))}</td>
              <td style={{ padding: '8px 16px', borderBottom: '1px solid var(--line)', width: 90 }}><Bar pct={r.lci / rows[5].gross * 100} tone="teal" /></td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>

    {/* right rail: codified methodology logic */}
    <div className="panel" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <PanelHead icon="list" title={curMethod.short + ' computation'} sub={curMethod.name}
        right={<MethodPicker value={method} onChange={setMethod} />} />
      {p.methodology !== method && p.methodology !== method.replace('-', ' ') && <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', background: 'color-mix(in srgb, var(--gold) 12%, transparent)', borderBottom: '1px solid var(--line)' }}>
        <Icon name="alert" size={13} c="var(--gold)" />
        <span style={{ fontSize: 11, color: 'var(--text-2)' }}>Previewing <b style={{ color: 'var(--text-1)' }}>{curMethod.short}</b> logic · this project runs <b style={{ color: 'var(--text-1)' }}>{p.methodology}</b>.</span>
      </div>}
      <div style={{ overflow: 'auto', padding: '6px 0' }}>
        {steps.map((s, i) => <div key={i} style={{ display: 'flex', gap: 12, padding: '13px 16px', borderBottom: i < steps.length - 1 ? '1px solid var(--line)' : 'none' }}>
          <div style={{ width: 24, height: 24, flexShrink: 0, borderRadius: 7, background: 'var(--brand-deep)', color: 'var(--brand)', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, border: '1px solid color-mix(in srgb,var(--brand) 30%,transparent)' }} className="mono">{s.n}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap' }}>{s.t}</span>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-3)', margin: '3px 0 6px', lineHeight: 1.5 }}>{s.d}</div>
            <span className="mono" style={{ fontSize: 11.5, color: 'var(--brand)' }}>{s.v}</span>
          </div>
        </div>)}
        <div style={{ padding: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line)' }}>
            <Icon name="check" size={15} c="var(--brand)" />
            <span style={{ fontSize: 11.5, color: 'var(--text-2)' }}>All parameters logged with audit trail for VVB review.</span>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

/* ===================== COMPLIANCE ENGINE ===================== */
function statusTone(s) { return { pass: 'brand', warn: 'warn', progress: 'info', fail: 'danger' }[s] || 'neutral'; }
function ComplianceView({ project, t }) {
  const p = project;
  const risks = [
    { label: 'Permanence', pct: 84, val: 'Low', tone: 'brand' },
    { label: 'Reversal', pct: 38, val: 'Med', tone: 'warn' },
    { label: 'Leakage', pct: 90, val: 'Low', tone: 'brand' },
    { label: 'Fire', pct: 52, val: 'Watch', tone: 'warn' },
  ];
  return <div className="vc-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: 'var(--gap)', height: '100%', minHeight: 0 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', minHeight: 0 }}>
      {/* modules grid */}
      <div className="panel">
        <PanelHead icon="shield" title="Compliance modules" sub="Evidence assembly across VM0048 requirements" right={<Badge tone="info">{p.dossier}% dossier ready</Badge>} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--line)' }}>
          {D2.complianceModules.map((m, i) => <div key={i} style={{ background: 'var(--bg-1)', padding: 14, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 96 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Icon name={m.icon} size={16} c={`var(--${statusTone(m.status)})`} />
              <Dot s={m.status === 'pass' ? 'ok' : m.status} />
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3 }}>{m.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.45, marginTop: 'auto' }}>{m.note}</div>
          </div>)}
        </div>
      </div>
      {/* sign-off queue */}
      <div className="panel" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <PanelHead icon="bell" title="Human sign-off queue" sub="AI-flagged gaps awaiting reviewer clearance" right={<Badge tone="warn">{D2.signoffQueue.length} open</Badge>} />
        <div style={{ overflow: 'auto', minHeight: 0 }}>
          {D2.signoffQueue.map((q, i) => <div key={q.id} className="vc-row" style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
            <span style={{ width: 6, height: 36, borderRadius: 4, background: q.sev === 'high' ? 'var(--danger)' : q.sev === 'med' ? 'var(--warn)' : 'var(--text-3)', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>{q.id}</span>
                <Badge tone={statusTone(q.sev === 'high' ? 'warn' : 'progress')}>{q.type}</Badge>
                <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{q.clause}</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-1)', lineHeight: 1.4 }}>{q.text}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>{q.project} · flagged by {q.who} · {q.age} ago</div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <button className="vc-btn-ghost">Review</button>
              <button className="vc-btn">Sign off</button>
            </div>
          </div>)}
        </div>
      </div>
    </div>

    {/* right rail */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', minHeight: 0, overflow: 'auto' }}>
      <div className="panel" style={{ padding: 15 }}>
        <span className="lbl">Risk dashboard</span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
          {risks.map((r, i) => <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <Gauge pct={r.pct} value={r.val} tone={r.tone} size={84} sub="" />
            <span className="lbl">{r.label}</span>
          </div>)}
        </div>
      </div>
      <div className="panel">
        <PanelHead icon="spark" title="AI PDD Generator" sub="LLM auto-population" />
        <div style={{ padding: 15 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 12 }}><span style={{ color: 'var(--text-2)' }}>Sections populated</span><span className="mono" style={{ color: 'var(--ai)' }}>12 / 18</span></div>
          <Bar pct={66} tone="ai" />
          <div style={{ fontSize: 11, color: 'var(--text-3)', margin: '10px 0 12px', lineHeight: 1.5 }}>Platform-computed baseline, additionality & leakage piped to the AI PDD Generator. Prep cut from months to days.</div>
          <button className="vc-btn" style={{ width: '100%', justifyContent: 'center' }}><Icon name="ext" size={13} /> Open PDD draft</button>
        </div>
      </div>
      <div className="panel">
        <PanelHead icon="folder" title="Verification dossier" sub="VVB-ready submission package" />
        <div style={{ padding: 15 }}>
          {[['Monitoring report', 100], ['Satellite analysis', 100], ['Field survey records', 92], ['FPIC documentation', 100], ['Additionality evidence', 74], ['Methodology compliance', 62]].map(([k, v], i) =>
            <div key={i} style={{ marginBottom: 11 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 4 }}><span style={{ color: 'var(--text-2)', whiteSpace: 'nowrap' }}>{k}</span><span className="mono" style={{ color: v === 100 ? 'var(--brand)' : 'var(--text-3)' }}>{v}%</span></div>
              <Bar pct={v} tone={v === 100 ? 'brand' : 'info'} h={5} />
            </div>)}
          <button className="vc-btn" style={{ width: '100%', justifyContent: 'center', marginTop: 6 }}><Icon name="dl" size={13} /> Export dossier</button>
        </div>
      </div>
    </div>
  </div>;
}

/* ===================== DATA PIPELINE ===================== */
function PipelineView({ project, t }) {
  const pl = D2.pipeline;
  return <div className="vc-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', height: '100%', minHeight: 0 }}>
    {/* flow */}
    <div className="panel">
      <PanelHead icon="merge" title="End-to-end data flow" sub={`Last run ${pl.lastRun} · next ${pl.nextRun}`} right={<button className="vc-btn-ghost"><Icon name="gear" size={13} /> Configure</button>} />
      <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, padding: 16, overflowX: 'auto' }}>
        {pl.stages.map((s, i) => <React.Fragment key={s.key}>
          <div style={{ flex: 1, minWidth: 130, background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 9, padding: 13, display: 'flex', flexDirection: 'column', gap: 8, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Icon name={s.icon} size={16} c={`var(--${STATUS[s.status] ? statusTone2(s.status) : 'text-3'})`} />
              <Dot s={s.status} pulse={s.status === 'running'} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.4 }}>{s.detail}</div>
            <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-2)', marginTop: 'auto' }}>{s.ms}</span>
          </div>
          {i < pl.stages.length - 1 && <div style={{ display: 'flex', alignItems: 'center', padding: '0 4px', color: 'var(--text-3)' }}><Icon name="chevR" size={16} /></div>}
        </React.Fragment>)}
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 360px', gap: 'var(--gap)', flex: 1, minHeight: 0 }}>
      {/* source catalog */}
      <div className="panel" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <PanelHead icon="sat" title="Dataset register" sub={`${pl.sources.length} sources · GEE + non-GEE APIs`} right={<><Badge tone="brand">{pl.sources.filter(s => s.status === 'live').length} live</Badge><Badge tone="ai">{pl.sources.filter(s => s.nonGee).length} non-GEE</Badge></>} />
        <div style={{ overflow: 'auto', minHeight: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead><tr style={{ position: 'sticky', top: 0, background: 'var(--bg-1)' }}>{['', 'Dataset', 'Provider', 'Res.', 'Cadence', 'Cost', 'Latency'].map((h, i) =>
              <th key={i} style={{ textAlign: i > 2 && i < 6 ? 'center' : 'left', padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.05em' }}>{h}</th>)}</tr></thead>
            <tbody>
              {pl.sources.map((s, i) => <tr key={i} className="vc-row">
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', width: 20 }}><Dot s={s.status} pulse={s.status === 'live' && i < 2} /></td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-1)', fontWeight: 500 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}>{s.name}{s.nonGee && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.04em', padding: '1px 5px', borderRadius: 4, color: 'var(--ai)', background: 'color-mix(in srgb,var(--ai) 14%,transparent)', border: '1px solid color-mix(in srgb,var(--ai) 28%,transparent)' }}>API</span>}</span>
                </td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)' }}>{s.provider}</td>
                <td className="mono" style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', textAlign: 'center', color: 'var(--text-2)' }}>{s.res}</td>
                <td className="mono" style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', textAlign: 'center', color: 'var(--text-2)' }}>{s.cadence}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', textAlign: 'center' }}><Badge tone={s.cost === 'Free' ? 'brand' : s.cost === 'Fallback' ? 'neutral' : 'gold'}>{s.cost}</Badge></td>
                <td className="mono" style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', textAlign: 'right', color: 'var(--text-3)' }}>{s.latency}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      {/* right: router + cost */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', minHeight: 0, overflow: 'auto' }}>
        <div className="panel">
          <PanelHead icon="merge" title="AGBD inference router" sub="Single env-var switch" />
          <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['Active', pl.router.active, 'brand', true], ['Fallback', pl.router.fallback, 'teal', false], ['Internal ML', pl.router.internal, 'neutral', false]].map(([k, v, tone, on], i) =>
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, background: 'var(--bg-2)', border: `1px solid ${on ? 'color-mix(in srgb,var(--brand) 35%,transparent)' : 'var(--line)'}` }}>
                <Dot s={on ? 'ok' : 'idle'} pulse={on} />
                <div style={{ flex: 1, minWidth: 0 }}><div className="lbl">{k}</div><div className="mono" style={{ fontSize: 11.5, color: 'var(--text-2)', marginTop: 2 }}>{v}</div></div>
                {on && <Badge tone="brand" solid>routing</Badge>}
              </div>)}
          </div>
        </div>
        <div className="panel">
          <PanelHead icon="cpu" title="GEE & compute" sub="Phase 1 · manual trigger" />
          <div style={{ padding: 14 }}>
            <HBars items={[{ label: 'Tiles processed', v: 1240000, c: 'var(--brand)' }, { label: 'EECU-hours', v: 86, c: 'var(--teal)' }, { label: 'GCS storage GB', v: 412, c: 'var(--gold)' }, { label: 'Cloud Run reqs', v: 318, c: 'var(--info)' }]} fmtv={(v) => v >= 1e6 ? (v / 1e6).toFixed(1) + 'M' : fmt2(v)} />
            <hr className="hair" style={{ margin: '14px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 12, color: 'var(--text-2)' }}>Est. monthly infra</span>
              <span className="kpi-num" style={{ fontSize: 18, color: 'var(--text-1)' }}>$320<span style={{ fontSize: 11, color: 'var(--text-3)' }}>/mo</span></span>
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-3)', marginTop: 4 }}>GEE free tier · Google for Startups credits applied</div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
function statusTone2(s) { return { ok: 'brand', live: 'brand', running: 'teal', queued: 'gold', idle: 'text-3', standby: 'text-3' }[s] || 'text-3'; }

/* ===================== FIELD COMPANION ===================== */
function FieldView({ project, t }) {
  const subs = D2.fieldSubs;
  const synced = subs.filter(s => s.sync === 'synced').length;
  return <div className="vc-in" style={{ display: 'grid', gridTemplateColumns: '300px minmax(0,1fr)', gap: 'var(--gap)', height: '100%', minHeight: 0 }}>
    {/* phone */}
    <div className="panel" style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <PanelHead icon="phone" title="Field app" sub="Offline-first · KoboCollect" />
      <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: 16, overflow: 'auto', background: 'var(--bg-0)' }}>
        <Phone project={project} />
      </div>
    </div>

    {/* right: submissions + enumerators */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', minHeight: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--gap)' }}>
        <Stat label="Submissions today" value="18" tone="brand" />
        <Stat label="Sync queue" value={subs.length - synced} unit="pending" tone="warn" />
        <Stat label="Active enumerators" value="6" sub="3 sites" />
        <Stat label="Trees measured" value="2,140" unit="DBH+H" tone="teal" />
      </div>
      <div className="panel" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <PanelHead icon="upload" title="Recent field submissions" sub="Synced from offline devices" right={<Badge tone={subs.length - synced ? 'warn' : 'brand'}>{synced}/{subs.length} synced</Badge>} />
        <div style={{ overflow: 'auto', minHeight: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead><tr style={{ position: 'sticky', top: 0, background: 'var(--bg-1)' }}>{['', 'ID', 'Plot', 'Form', 'Enumerator', 'GPS', 'When', 'Sync'].map((h, i) =>
              <th key={i} style={{ textAlign: 'left', padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)', fontWeight: 600, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.05em' }}>{h}</th>)}</tr></thead>
            <tbody>
              {subs.map(s => <tr key={s.id} className="vc-row">
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', width: 16 }}><Icon name={s.type.includes('DBH') ? 'tree' : s.type.includes('SOC') ? 'layers' : s.type.includes('acoustic') ? 'pulse' : 'doc'} size={14} c="var(--text-3)" /></td>
                <td className="mono" style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)' }}>{s.id}</td>
                <td className="mono" style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-1)' }}>{s.plot}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-2)' }}>{s.type}{s.trees ? <span className="mono" style={{ color: 'var(--text-3)' }}> · {s.trees}</span> : ''}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-2)' }}>{s.enum}</td>
                <td className="mono" style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)', fontSize: 11 }}>{s.gps}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)' }}>{s.when}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--line)' }}>{s.sync === 'synced' ? <Badge tone="brand"><Icon name="check" size={11} /> synced</Badge> : <Badge tone="warn"><Icon name="clock" size={11} /> pending</Badge>}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>;
}

function Phone({ project }) {
  return <div style={{ width: 252, height: 512, borderRadius: 30, background: '#05090a', border: '8px solid #1b2420', boxShadow: '0 24px 60px -20px rgba(0,0,0,.8)', padding: 0, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
    {/* notch */}
    <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 70, height: 5, borderRadius: 9, background: '#1b2420', zIndex: 3 }} />
    {/* status bar */}
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px 6px', fontSize: 10, color: '#cfe', position: 'relative', zIndex: 2 }} className="mono">
      <span>08:42</span><span style={{ display: 'flex', gap: 5, alignItems: 'center' }}><Icon name="alert" size={10} c="#f0a92c" /> offline · 12 queued</span>
    </div>
    <div style={{ background: 'var(--brand-deep)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 9 }}>
      <Icon name="tree" size={18} c="var(--brand)" />
      <div><div style={{ fontSize: 12.5, fontWeight: 700, color: '#eafff0' }}>Verst Field</div><div style={{ fontSize: 9.5, color: '#8fbfa0' }} className="mono">{project.code} · Plot TSE-P14</div></div>
    </div>
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 11, background: '#0b1410', height: 'calc(100% - 92px)', overflow: 'auto' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#cfe', letterSpacing: '.04em' }}>DBH & HEIGHT SURVEY</div>
      {[['Tree #', '42 of 50'], ['Species', 'Acacia tortilis'], ['DBH (cm)', '24.6'], ['Height (m)', '8.2']].map(([k, v], i) =>
        <div key={i}>
          <div style={{ fontSize: 9.5, color: '#7a9488', marginBottom: 4 }} className="mono">{k}</div>
          <div style={{ background: '#13201a', border: '1px solid rgba(255,255,255,.08)', borderRadius: 8, padding: '9px 11px', fontSize: 12.5, color: '#eafff0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className={i > 1 ? 'mono' : ''}>{v}</span>{i > 1 && <Icon name="plus" size={13} c="var(--brand)" />}
          </div>
        </div>)}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '9px 11px', background: '#13201a', border: '1px solid rgba(255,255,255,.08)', borderRadius: 8 }}>
        <Icon name="crosshair" size={14} c="var(--teal)" />
        <span className="mono" style={{ fontSize: 10.5, color: '#9fc' }}>-2.741, 38.793</span>
        <Badge tone="teal">GNSS</Badge>
      </div>
      <button style={{ marginTop: 'auto', border: 'none', borderRadius: 9, padding: '12px', background: 'var(--brand)', color: '#08130d', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>Save & next tree</button>
    </div>
  </div>;
}

Object.assign(window, { AccountingView, ComplianceView, PipelineView, FieldView });

// ======================= views3.jsx =======================
/* views3.jsx — Biodiversity & Co-benefits (EarthRanger + Earth Map / FAO) */
const D3 = window.DMRV;
const fmt3 = D3.fmt;
const MM3 = window.M;

function evtTone(sev) { return { high: 'danger', med: 'warn', info: 'teal', low: 'neutral' }[sev] || 'neutral'; }
function evtIcon(cat) {
  return { sighting: 'pulse', snare: 'alert', hwc: 'people', camera: 'crosshair', mortality: 'flag', security: 'shield', collar: 'globe' }[cat] || 'pulse';
}
const IUCN = { CR: 'danger', EN: 'warn', VU: 'gold', NT: 'info', LC: 'brand' };

function BiodiversityView({ project, t }) {
  const p = project;
  const bio = D3.biodiversity;
  const bp = bio.byProject[p.id] || bio.byProject['tsavo-east'];
  const er = bio.earthRanger;

  return <div className="vc-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: 'var(--gap)', height: '100%', minHeight: 0 }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', minHeight: 0 }}>
      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--gap)' }}>
        <Stat label="Biodiversity intactness" value={bp.intactness} unit="BII" delta={bp.intactDelta} tone="teal" sub="Earth Map · PREDICTS" />
        <Stat label="Species recorded" value={bp.species} unit="taxa" tone="brand" sub={`${bp.iucnFlagged} IUCN threatened`} />
        <Stat label="EarthRanger obs." value={MM3(bp.observations)} unit="30d" sub={`${er.activeCollars} active collars`} />
        <Stat label="Patrol coverage" value={bp.patrolCoverage} unit="%" tone="gold" sub={`${er.patrolsActive} patrols active`} />
      </div>

      {/* map with wildlife overlay */}
      <div className="panel" style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <PanelHead icon="globe" title="Wildlife & ranger activity" sub={`EarthRanger · ${er.site}`}
          right={<><Badge tone="ai">collar tracks</Badge><Badge tone="teal">sightings</Badge><Badge tone="warn">snares</Badge><Badge tone="danger">HWC</Badge></>} />
        <div style={{ flex: 1, minHeight: 0 }}><MapHero project={p} mapStyle="forest" theme={t.dark ? 'dark' : 'light'} overlays={{ wildlife: true, changes: false, plots: false, leakage: false }} /></div>
      </div>

      {/* EarthRanger event feed */}
      <div className="panel" style={{ flexShrink: 0 }}>
        <PanelHead icon="pulse" title="EarthRanger event feed" sub="Singular ranger & sensor records" right={<Badge tone="neutral">{bio.events.length} recent · {bp.events30d}/30d</Badge>} />
        <div style={{ maxHeight: 192, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <tbody>
              {bio.events.map(e => <tr key={e.id} className="vc-row">
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', width: 16 }}><Icon name={evtIcon(e.cat)} size={14} c={`var(--${evtTone(e.sev)})`} /></td>
                <td className="mono" style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)', fontSize: 11 }}>{e.id}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-1)', fontWeight: 500, whiteSpace: 'nowrap' }}>{e.type}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-2)' }}>{e.detail}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{e.who}</td>
                <td className="mono" style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)', fontSize: 11, whiteSpace: 'nowrap' }}>{e.gps}</td>
                <td style={{ padding: '9px 14px', borderBottom: '1px solid var(--line)', color: 'var(--text-3)', textAlign: 'right', whiteSpace: 'nowrap' }}>{e.when}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* right rail */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', minHeight: 0, overflow: 'auto' }}>
      {/* flagship species */}
      <div className="panel">
        <PanelHead icon="tree" title="Indicator species" sub="EarthRanger subjects + aerial census" />
        <div>
          {bio.species.map((s, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 14px', borderBottom: i < bio.species.length - 1 ? '1px solid var(--line)' : 'none' }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon name={s.icon} size={15} c="var(--brand)" /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
                <Badge tone={IUCN[s.iucn]}>{s.iucn}</Badge>
              </div>
              <div style={{ fontSize: 10.5, color: 'var(--text-3)', fontStyle: 'italic' }}>{s.sci}{s.collared ? ` · ${s.collared} collared` : ''}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 15, fontWeight: 600 }}>{fmt3(s.count)}</div>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: s.trend > 0 ? 'var(--brand)' : s.trend < 0 ? 'var(--danger)' : 'var(--text-3)' }}>{s.trend > 0 ? '▲' : s.trend < 0 ? '▼' : '—'} {Math.abs(s.trend)}%</div>
            </div>
          </div>)}
        </div>
      </div>

      {/* Earth Map / FAO habitat layers */}
      <div className="panel">
        <PanelHead icon="layers" title="Habitat & degradation" sub="Earth Map · FAO/JRC value-added" />
        <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 13 }}>
          {bio.landLayers.map((l, i) => <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
              <span style={{ fontSize: 12.5, color: 'var(--text-1)', fontWeight: 500 }}>{l.label}</span>
              <span className="mono" style={{ fontSize: 12, color: `var(--${l.tone})`, fontWeight: 600 }}>{l.val}</span>
            </div>
            <Bar pct={l.pct} tone={l.tone} h={5} />
            <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }} className="mono">{l.src}</div>
          </div>)}
        </div>
      </div>

      {/* SDG co-benefits */}
      <div className="panel">
        <PanelHead icon="check" title="Co-benefit claims" sub="Beyond carbon · CCB / SD VISta" />
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 11.5, color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 12 }}>
            Biodiversity evidence strengthens <b style={{ color: 'var(--text-1)' }}>CCB</b> / <b style={{ color: 'var(--text-1)' }}>SD VISta</b> labels and supports premium-priced credits.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {bp.sdgs.map(n => <span key={n} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 600, padding: '5px 10px', borderRadius: 7, background: 'var(--bg-2)', border: '1px solid var(--line)', color: 'var(--text-2)' }}>
              <span style={{ width: 18, height: 18, borderRadius: 4, background: 'var(--brand-deep)', color: 'var(--brand)', display: 'grid', placeItems: 'center', fontSize: 10 }} className="mono">{n}</span>
              SDG {n}
            </span>)}
          </div>
        </div>
      </div>
    </div>
  </div>;
}

window.BiodiversityView = BiodiversityView;

// ======================= app.jsx =======================
/* app.jsx — shell: sidebar, topbar, routing, tweaks, theme application */
const { useState: uS, useEffect: uE } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": true,
  "accent": "#1fa94f",
  "font": "IBM Plex Sans",
  "density": "comfortable",
  "mapStyle": "biomass"
}/*EDITMODE-END*/;

const NAV = [
  { group: 'Overview', items: [
    { key: 'portfolio', label: 'Portfolio', icon: 'grid' },
    { key: 'project', label: 'Project dashboard', icon: 'map' },
  ]},
  { group: 'Engines', items: [
    { key: 'measurement', label: 'Measurement', icon: 'cpu' },
    { key: 'accounting', label: 'Carbon accounting', icon: 'calc' },
    { key: 'compliance', label: 'Compliance', icon: 'shield' },
    { key: 'biodiversity', label: 'Biodiversity', icon: 'globe' },
  ]},
  { group: 'Operations', items: [
    { key: 'pipeline', label: 'Data pipeline', icon: 'merge' },
    { key: 'field', label: 'Field data', icon: 'phone' },
  ]},
];
const TITLES = {
  portfolio: ['Portfolio', 'All enrolled AFOLU projects'],
  project: ['Project dashboard', 'Boundary, carbon stock & status'],
  measurement: ['Measurement Engine', 'What is the carbon?'],
  accounting: ['Carbon Accounting Engine', 'What can be claimed?'],
  compliance: ['Compliance Engine', 'Will it pass VVB review?'],
  biodiversity: ['Biodiversity & Co-benefits', 'EarthRanger · Earth Map · beyond carbon'],
  pipeline: ['Data pipeline', 'GEE ingestion → engines'],
  field: ['Field data collection', 'Offline-first MRV inputs'],
};

/* Guided annual-monitoring-cycle walkthrough (Use Case 2) */
const TOUR = [
  { view: 'pipeline', proj: 'tsavo-east', step: 'Ingest', title: 'New imagery lands', body: 'The latest Sentinel-2 & Sentinel-1 acquisitions for the project boundary are pulled through Google Earth Engine, cloud-masked and time-series normalised.' },
  { view: 'measurement', step: 'Measure', title: 'AGBD is re-estimated', body: 'The site-specific Bayesian model produces an updated above-ground biomass map at 10 m, with a formal 95% credible interval per pixel.' },
  { view: 'measurement', step: 'Detect change', title: 'Disturbance is flagged', body: 'Year-on-year differencing detects change >2σ from the expected growth trajectory and routes flagged patches to a field-verification queue.' },
  { view: 'measurement', step: 'Calibrate', title: 'Hybrid MRV tightens uncertainty', body: 'Field-plot DBH & height measurements calibrate the EO estimate, producing the validated tCO₂e dataset — Verst’s core differentiator.' },
  { view: 'accounting', step: 'Account', title: 'Credits are computed', body: 'VM0048 logic refreshes the dynamic baseline, computes leakage and net additionality, and issues a credit forecast at the conservative lower CI.' },
  { view: 'compliance', step: 'Comply', title: 'Gaps & risk are scanned', body: 'AI checks methodology compliance, scores permanence & reversal risk, verifies FPIC, and populates the human sign-off queue.' },
  { view: 'compliance', step: 'Report', title: 'Dossier is assembled', body: 'The verification dossier is compiled and the AI PDD Generator drafts the monitoring report — a VVB-ready package in days, not weeks.' },
];

function WalkthroughCard({ i, data, onPrev, onNext, onClose }) {
  const last = i === TOUR.length - 1;
  return <>
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, pointerEvents: 'none', background: 'radial-gradient(120% 80% at 50% 120%, color-mix(in srgb,var(--brand) 12%,transparent), transparent 60%)' }} />
    <div className="panel vc-in" style={{ position: 'fixed', left: '50%', bottom: 22, transform: 'translateX(-50%)', zIndex: 61, width: 560, maxWidth: 'calc(100vw - 40px)', padding: 0, boxShadow: '0 24px 60px -16px rgba(0,0,0,.7)', border: '1px solid var(--line-2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, background: 'var(--brand)', color: '#08130d', display: 'grid', placeItems: 'center' }}><Icon name="pulse" size={15} /></span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, letterSpacing: '.1em', color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase' }}>Annual monitoring cycle</div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>{data.step}</div>
        </div>
        <span className="mono" style={{ fontSize: 11, color: 'var(--text-3)' }}>{i + 1} / {TOUR.length}</span>
        <button className="iconbtn" style={{ width: 28, height: 28 }} onClick={onClose}><Icon name="plus" size={14} style={{ transform: 'rotate(45deg)' }} /></button>
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 5 }}>{data.title}</div>
        <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55 }}>{data.body}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px 14px' }}>
        <div style={{ display: 'flex', gap: 5, flex: 1 }}>
          {TOUR.map((_, k) => <span key={k} style={{ height: 4, flex: 1, borderRadius: 4, background: k <= i ? 'var(--brand)' : 'var(--line-2)', transition: 'background .3s' }} />)}
        </div>
        <button className="vc-btn-ghost" onClick={onPrev} disabled={i === 0} style={{ opacity: i === 0 ? .4 : 1 }}>Back</button>
        <button className="vc-btn" onClick={last ? onClose : onNext}>{last ? 'Finish' : 'Next'} {!last && <Icon name="chevR" size={13} />}</button>
      </div>
    </div>
  </>;
}

function App({ onBack }) {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [nav, setNav] = uS('portfolio');
  const [pid, setPid] = uS(window.DMRV.activeProjectId);
  const [pmenu, setPmenu] = uS(false);
  const [tour, setTour] = uS(-1);
  const project = window.DMRV.projects.find(p => p.id === pid);

  uE(() => { if (tour >= 0) { const s = TOUR[tour]; setNav(s.view); if (s.proj) setPid(s.proj); } }, [tour]);

  const openProject = (id) => { setPid(id); setNav('project'); };
  const View = { portfolio: PortfolioView, project: ProjectView, measurement: MeasurementView, accounting: AccountingView, compliance: ComplianceView, biodiversity: BiodiversityView, pipeline: PipelineView, field: FieldView }[nav];
  const logo = t.dark ? (window.LOGO_DARK || 'assets/verst-logo-dark.png') : (window.LOGO_LIGHT || 'assets/verst-logo-light.png');

  return <div style={{ display: 'flex', height: '100vh', background: 'var(--bg-0)' }}>
    {/* sidebar */}
    <aside style={{ width: 234, flexShrink: 0, background: 'var(--bg-1)', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 16px 14px', borderBottom: '1px solid var(--line)' }}>
        <img src={logo} alt="Verst Carbon" style={{ height: 30, objectFit: 'contain', objectPosition: 'left' }} onError={(e) => { e.target.style.display = 'none'; }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
          <span style={{ fontSize: 10.5, letterSpacing: '.14em', color: 'var(--text-3)', fontWeight: 600 }}>AFOLU dMRV PLATFORM</span>
        </div>
      </div>
      <button onClick={onBack} className="nav-item" style={{ margin: '10px 14px 0' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        <span>Sectoral scopes</span>
      </button>
      <nav style={{ padding: '12px 14px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {NAV.map(sec => <div key={sec.group}>
          <div className="lbl" style={{ padding: '0 4px 7px' }}>{sec.group}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sec.items.map(it => <div key={it.key} className={'nav-item' + (nav === it.key ? ' active' : '')} onClick={() => setNav(it.key)}>
              <Icon name={it.icon} size={16} c={nav === it.key ? 'var(--brand)' : 'currentColor'} />
              <span>{it.label}</span>
            </div>)}
          </div>
        </div>)}
      </nav>
      <div style={{ padding: 14, borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line)' }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--brand-deep)', color: 'var(--brand)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12 }}>KK</span>
          <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12, fontWeight: 600 }}>Kevin Kiptoo</div><div style={{ fontSize: 10.5, color: 'var(--text-3)' }}>Carbon Project Lead</div></div>
          <Icon name="gear" size={14} c="var(--text-3)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '0 2px' }}>
          <Dot s="ok" pulse /><span style={{ fontSize: 10.5, color: 'var(--text-3)' }}>Phase 1 · MVP · all systems live</span>
        </div>
      </div>
    </aside>

    {/* main */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      {/* topbar */}
      <header style={{ height: 60, flexShrink: 0, borderBottom: '1px solid var(--line)', background: 'var(--bg-1)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 var(--pad)' }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-.01em', whiteSpace: 'nowrap' }}>{TITLES[nav][0]}</div>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{TITLES[nav][1]}</div>
        </div>

        {/* project switcher */}
        {nav !== 'portfolio' && nav !== 'pipeline' && <div style={{ position: 'relative' }}>
          <button className="vc-btn-ghost" style={{ padding: '7px 11px' }} onClick={() => setPmenu(v => !v)}>
            <span style={{ fontSize: 13 }}>{project.flag}</span>
            <span style={{ fontWeight: 600 }}>{project.name}</span>
            <span className="mono" style={{ fontSize: 10.5, color: 'var(--text-3)' }}>{project.code}</span>
            <Icon name="chevD" size={13} />
          </button>
          {pmenu && <>
            <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setPmenu(false)} />
            <div className="panel" style={{ position: 'absolute', top: '110%', left: 0, width: 280, zIndex: 41, padding: 6, maxHeight: 360, overflow: 'auto' }}>
              {window.DMRV.projects.map(p => <div key={p.id} className="nav-item" style={{ borderRadius: 7 }} onClick={() => { setPid(p.id); setPmenu(false); }}>
                <span>{p.flag}</span>
                <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12.5, fontWeight: 600 }}>{p.name}</div><div className="mono" style={{ fontSize: 10, color: 'var(--text-3)' }}>{p.code} · {p.stage}</div></div>
                {p.id === pid && <Icon name="check" size={14} c="var(--brand)" />}
              </div>)}
            </div>
          </>}
        </div>}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="vc-btn-ghost" onClick={() => setTour(0)} style={{ padding: '7px 11px' }}><Icon name="pulse" size={14} c="var(--brand)" /> Monitoring cycle</button>
          <div style={{ position: 'relative', width: 220 }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', pointerEvents: 'none' }}><Icon name="search" size={14} /></span>
            <input className="topsearch" placeholder="Search projects, plots, datasets…" />
          </div>
          <button className="iconbtn" onClick={() => setTweak('dark', !t.dark)} title="Toggle theme">
            <Icon name={t.dark ? 'spark' : 'globe'} size={15} />
          </button>
          <button className="iconbtn" style={{ position: 'relative' }} title="Alerts">
            <Icon name="bell" size={15} />
            <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: 99, background: 'var(--warn)', border: '1.5px solid var(--bg-2)' }} />
          </button>
        </div>
      </header>

      {/* content */}
      <main style={{ flex: 1, minHeight: 0, padding: 'var(--pad)', overflow: 'auto' }}>
        <View project={project} openProject={openProject} t={t} />
      </main>
    </div>

    {tour >= 0 && <WalkthroughCard i={tour} data={TOUR[tour]} onPrev={() => setTour(x => Math.max(0, x - 1))} onNext={() => setTour(x => Math.min(TOUR.length - 1, x + 1))} onClose={() => setTour(-1)} />}
  </div>;
}

export { App as AfoluApp };
