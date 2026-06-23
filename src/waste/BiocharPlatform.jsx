/* ABAP — Biochar Aggregation Platform (Waste management · dMRV).
   Ported from the "ABAP Biochar Platform" design mockup: a role-based platform
   (login + apply, superadmin/IP/site-admin desktop dashboards, farmer/transport/
   enumerator field UIs, approval modals, charts + Africa/Kenya/farm maps).
   Helpers (icons, charts, maps, badges) are ported ~verbatim; markup is JSX.
   Figures are illustrative placeholders. */
import React from 'react';
import './waste.css';

const { useState } = React;

// parse an inline CSS string into a React style object (lets the markup port faithfully)
const s = (css) => {
  const o = {};
  String(css).split(';').forEach((d) => {
    const i = d.indexOf(':'); if (i < 0) return;
    const k = d.slice(0, i).trim(); if (!k) return;
    o[k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = d.slice(i + 1).trim();
  });
  return o;
};
// generic stroke icon (path-only)
const I = ({ d, size = 16, sw = 2, vb = '0 0 24 24', fill = 'none', stroke = 'currentColor', style }) => (
  <svg width={size} height={size} viewBox={vb} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {(Array.isArray(d) ? d : [d]).map((p, i) => <path key={i} d={p} />)}
  </svg>
);
const FLAME = 'M8.5 14.5c0-3 3.5-4 3.5-8 3 2 5 5 5 8a5 5 0 0 1-10 0c0-1 .3-1.7.7-2.4';

// ---- named icon set (ported) ----
function icon(name, size) {
  const h = React.createElement;
  const sp = { width: size || 18, height: size || 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const P = (...d) => h('svg', sp, ...d.map((dd, i) => h('path', { key: i, d: dd })));
  const M = (...els) => h('svg', sp, ...els);
  switch (name) {
    case 'grid': return M(h('rect', { key: 0, x: 3, y: 3, width: 7, height: 7, rx: 1.5 }), h('rect', { key: 1, x: 14, y: 3, width: 7, height: 7, rx: 1.5 }), h('rect', { key: 2, x: 14, y: 14, width: 7, height: 7, rx: 1.5 }), h('rect', { key: 3, x: 3, y: 14, width: 7, height: 7, rx: 1.5 }));
    case 'globe': return M(h('circle', { key: 0, cx: 12, cy: 12, r: 9 }), h('path', { key: 1, d: 'M3 12h18' }), h('path', { key: 2, d: 'M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z' }));
    case 'layers': return P('M12 3l9 5-9 5-9-5 9-5z', 'M3 13l9 5 9-5', 'M3 17l9 5 9-5');
    case 'factory': return M(h('path', { key: 0, d: 'M3 21h18' }), h('path', { key: 1, d: 'M5 21V8l7-5 7 5v13' }), h('path', { key: 2, d: 'M9 21v-6h6v6' }));
    case 'truck': return M(h('path', { key: 0, d: 'M14 16V4a1 1 0 0 0-1-1H2' }), h('path', { key: 1, d: 'M14 9h4l3 3v4h-7' }), h('circle', { key: 2, cx: 6.5, cy: 16.5, r: 2.5 }), h('circle', { key: 3, cx: 16.5, cy: 16.5, r: 2.5 }));
    case 'sprout': return M(h('path', { key: 0, d: 'M12 22v-7' }), h('path', { key: 1, d: 'M12 15c-3 0-5-2-5-5 3 0 5 2 5 5z' }), h('path', { key: 2, d: 'M12 13c0-3 2-5 5-5 0 3-2 5-5 5z' }));
    case 'flask': return M(h('path', { key: 0, d: 'M9 2h6' }), h('path', { key: 1, d: 'M10 2v7L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V2' }), h('path', { key: 2, d: 'M7.5 14h9' }));
    case 'users': return M(h('path', { key: 0, d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }), h('circle', { key: 1, cx: 9, cy: 7, r: 4 }), h('path', { key: 2, d: 'M22 21v-2a4 4 0 0 0-3-3.87' }));
    case 'chart': return P('M3 3v18h18', 'M7 14l3-3 3 3 5-6');
    case 'thermometer': return P('M14 14V4a2 2 0 0 0-4 0v10a4 4 0 1 0 4 0z');
    case 'check': return M(h('rect', { key: 0, x: 3, y: 5, width: 18, height: 14, rx: 2 }), h('path', { key: 1, d: 'M8 12l3 3 5-5' }));
    case 'settings': return M(h('circle', { key: 0, cx: 12, cy: 12, r: 3 }), h('path', { key: 1, d: 'M19 12a7 7 0 0 0-.1-1.3l2-1.5-2-3.4-2.3 1a7 7 0 0 0-2.3-1.3L13.8 2h-3.6l-.3 2.5a7 7 0 0 0-2.3 1.3l-2.3-1-2 3.4 2 1.5A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.3l-2 1.5 2 3.4 2.3-1a7 7 0 0 0 2.3 1.3l.3 2.5h3.6l.3-2.5a7 7 0 0 0 2.3-1.3l2.3 1 2-3.4-2-1.5A7 7 0 0 0 19 12z' }));
    case 'store': return P('M3 9l1.5-5h15L21 9', 'M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9', 'M3 9h18');
    case 'home': return P('M3 11l9-8 9 8', 'M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10');
    case 'wallet': return M(h('path', { key: 0, d: 'M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3' }), h('path', { key: 1, d: 'M3 7v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2z' }), h('circle', { key: 2, cx: 16, cy: 13, r: 1.2 }));
    case 'list': return P('M8 6h13M8 12h13M8 18h13', 'M3 6h.01M3 12h.01M3 18h.01');
    case 'map': return P('M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z', 'M9 4v14M15 6v14');
    case 'user': return M(h('circle', { key: 0, cx: 12, cy: 8, r: 4 }), h('path', { key: 1, d: 'M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1' }));
    case 'leaf': return M(h('path', { key: 0, d: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z' }), h('path', { key: 1, d: 'M2 21c0-3 1.85-5.36 5.08-6' }));
    default: return P('M5 12h14');
  }
}

function badge(label) {
  const ok = ['Active', 'Producing', 'Verified', 'Approved', 'Collected', 'Locked', 'Online', 'Issued'];
  const info = ['Assigned', 'Onboarding', 'Reporting', 'Buyer'];
  const warn = ['Pending', 'In review', 'Maintenance', 'Awaiting', 'Seller'];
  const danger = ['Rejected', 'Offline', 'Alert', 'Flagged'];
  let t;
  if (ok.includes(label)) t = { bg: '#DFF1E5', fg: '#00682C', dot: '#008037' };
  else if (info.includes(label)) t = { bg: '#E2F2F6', fg: '#0B5A6B', dot: '#0E7490' };
  else if (warn.includes(label)) t = { bg: '#FBEFD2', fg: '#B57711', dot: '#DD9B1F' };
  else if (danger.includes(label)) t = { bg: '#FBE4E1', fg: '#9B2C20', dot: '#C0392B' };
  else t = { bg: '#EFF3EE', fg: '#36433B', dot: '#8C988F' };
  return {
    badge: { display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, padding: '4px 9px', borderRadius: '999px', whiteSpace: 'nowrap', background: t.bg, color: t.fg },
    dot: { width: '6px', height: '6px', borderRadius: '50%', flex: 'none', display: 'inline-block', background: t.dot },
  };
}

function pillBtn(kind, label, onClick) {
  const st = { admit: { bg: '#008037', fg: '#fff', bd: '#008037' }, manage: { bg: '#fff', fg: '#36433B', bd: '#BDC6BF' }, review: { bg: '#F1F8F3', fg: '#00682C', bd: '#008037' } }[kind] || { bg: '#fff', fg: '#36433B', bd: '#BDC6BF' };
  return { onClick, label, style: { height: '34px', padding: '0 13px', border: '1px solid ' + st.bd, borderRadius: '6px', background: st.bg, color: st.fg, fontFamily: 'inherit', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', flex: 'none', whiteSpace: 'nowrap' } };
}

const ROLES = {
  superadmin: { label: 'Super Admin', accent: '#008037', bg: '#DFF1E5', fg: '#00682C', user: 'Amara Okonkwo', initials: 'AO', desktop: true, tier: 'Tier 1 · Global', icon: 'globe' },
  ip: { label: 'Local IP', accent: '#0E7490', bg: '#E2F2F6', fg: '#0B5A6B', user: 'David Otieno', initials: 'DO', desktop: true, tier: 'Tier 2 · Country', icon: 'layers' },
  siteadmin: { label: 'Site Admin', accent: '#B57711', bg: '#FBEFD2', fg: '#B57711', user: 'Wanjiru Kariuki', initials: 'WK', desktop: true, tier: 'Tier 3 · Site', icon: 'factory' },
  farmer: { label: 'Farmer', accent: '#BD5230', bg: '#FBE9E1', fg: '#8F3A1F', user: 'Joseph Kamau', initials: 'JK', desktop: false, tier: 'Field · Supply', icon: 'sprout' },
  transport: { label: 'Transport', accent: '#0B5A6B', bg: '#E2F2F6', fg: '#0B5A6B', user: 'Daniel Mwangi', initials: 'DM', desktop: false, tier: 'Field · Logistics', icon: 'truck' },
  enumerator: { label: 'Enumerator', accent: '#1E9B4E', bg: '#F1F8F3', fg: '#034A24', user: 'Grace Achieng', initials: 'GA', desktop: false, tier: 'Field · Survey', icon: 'flask' },
};

function navFor(role) {
  const defs = {
    superadmin: [['Overview', 'grid'], ['Countries', 'globe'], ['Local IPs', 'users'], ['Sites', 'factory'], ['Production', 'chart'], ['Users', 'user'], ['Settings', 'settings']],
    ip: [['Overview', 'grid'], ['Sites', 'factory'], ['Site Admins', 'users'], ['Collection', 'truck'], ['Production', 'chart'], ['Users', 'user'], ['Settings', 'settings']],
    siteadmin: [['Overview', 'grid'], ['Monitoring', 'thermometer'], ['Approvals', 'check'], ['Farmers', 'sprout'], ['Transport', 'truck'], ['Enumerators', 'flask'], ['Settings', 'settings']],
  }[role] || [];
  return defs.map((d, i) => ({ label: d[0], iconEl: icon(d[1], 18), btnStyle: { display: 'flex', alignItems: 'center', gap: '11px', padding: '9px 10px', borderRadius: '6px', border: 0, cursor: 'pointer', width: '100%', textAlign: 'left', fontFamily: 'inherit', fontSize: '13.5px', fontWeight: i === 0 ? 600 : 500, background: i === 0 ? '#008037' : 'transparent', color: i === 0 ? '#fff' : '#AFC2B5' } }));
}

// ---- charts / maps (ported, React.createElement) ----
function buildBars(data, labels, color, unitK) {
  const W = 640, H = 200, padL = 38, padB = 26, padT = 10, padR = 8, n = data.length;
  const max = Math.ceil(Math.max(...data) * 1.15);
  const bw = (W - padL - padR) / n, xc = (i) => padL + i * bw + bw / 2, yv = (v) => padT + (H - padT - padB) * (1 - v / max), barW = bw * 0.5;
  const h = React.createElement, kids = [];
  for (let g = 0; g <= 4; g++) { const val = +(max / 4 * g).toFixed(0); kids.push(h('line', { key: 'g' + g, x1: padL, x2: W - padR, y1: yv(val), y2: yv(val), stroke: '#E6EBE6' })); kids.push(h('text', { key: 't' + g, x: padL - 8, y: yv(val) + 4, textAnchor: 'end', fontSize: 10, fontFamily: 'IBM Plex Mono', fill: '#8C988F' }, val + (unitK || ''))); }
  data.forEach((v, i) => { kids.push(h('rect', { key: 'b' + i, x: xc(i) - barW / 2, y: yv(v), width: barW, height: (H - padB) - yv(v), rx: 2.5, fill: color, opacity: i === n - 1 ? 1 : 0.8 })); kids.push(h('text', { key: 'x' + i, x: xc(i), y: H - 9, textAnchor: 'middle', fontSize: 10, fontFamily: 'IBM Plex Mono', fill: '#8C988F' }, labels[i])); });
  return h('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'xMidYMid meet', style: { width: '100%', display: 'block' } }, kids);
}
function miniBars(data, labels, color) {
  const W = 320, H = 120, padB = 20, padT = 6, n = data.length;
  const max = Math.max(...data) * 1.12;
  const bw = W / n, xc = (i) => i * bw + bw / 2, yv = (v) => padT + (H - padT - padB) * (1 - v / max), barW = bw * 0.46;
  const h = React.createElement, kids = [];
  data.forEach((v, i) => { kids.push(h('rect', { key: 'b' + i, x: xc(i) - barW / 2, y: yv(v), width: barW, height: (H - padB) - yv(v), rx: 3, fill: color, opacity: i === n - 1 ? 1 : 0.55 })); kids.push(h('text', { key: 'x' + i, x: xc(i), y: H - 6, textAnchor: 'middle', fontSize: 10, fontFamily: 'IBM Plex Mono', fill: '#8C988F' }, labels[i])); });
  return h('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'xMidYMid meet', style: { width: '100%', display: 'block' } }, kids);
}
function tempChart() {
  const data = [455, 470, 492, 510, 505, 488, 475, 498, 520, 535, 528, 512, 500, 486, 478, 505, 522, 540, 531, 515, 498, 488, 492, 482];
  const W = 640, H = 210, padL = 40, padB = 26, padT = 12, padR = 10, n = data.length, min = 380, max = 600;
  const xc = (i) => padL + (W - padL - padR) * (i / (n - 1)), yv = (v) => padT + (H - padT - padB) * (1 - (v - min) / (max - min));
  const h = React.createElement, kids = [];
  kids.push(h('rect', { key: 'band', x: padL, y: yv(550), width: W - padL - padR, height: yv(450) - yv(550), fill: '#DFF1E5', opacity: 0.6 }));
  kids.push(h('text', { key: 'bandt', x: W - padR - 4, y: yv(550) + 13, textAnchor: 'end', fontSize: 9.5, fontFamily: 'IBM Plex Mono', fill: '#00682C' }, 'target 450–550°C'));
  [400, 450, 500, 550, 600].forEach((v, i) => { kids.push(h('line', { key: 'g' + i, x1: padL, x2: W - padR, y1: yv(v), y2: yv(v), stroke: '#E6EBE6' })); kids.push(h('text', { key: 't' + i, x: padL - 8, y: yv(v) + 4, textAnchor: 'end', fontSize: 10, fontFamily: 'IBM Plex Mono', fill: '#8C988F' }, v)); });
  const line = data.map((v, i) => (i ? 'L' : 'M') + xc(i).toFixed(1) + ' ' + yv(v).toFixed(1)).join(' ');
  kids.push(h('path', { key: 'line', d: line, fill: 'none', stroke: '#DD9B1F', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }));
  kids.push(h('circle', { key: 'dot', cx: xc(n - 1), cy: yv(data[n - 1]), r: 4, fill: '#DD9B1F' }));
  ['00:00', '06:00', '12:00', '18:00', 'now'].forEach((lb, i) => { const x = padL + (W - padL - padR) * (i / 4); kids.push(h('text', { key: 'x' + i, x, y: H - 8, textAnchor: 'middle', fontSize: 10, fontFamily: 'IBM Plex Mono', fill: '#8C988F' }, lb)); });
  return h('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'xMidYMid meet', style: { width: '100%', display: 'block' }, role: 'img', 'aria-label': 'Reactor temperature over 24 hours' }, kids);
}
function africaMap() {
  const h = React.createElement;
  const cont = 'M150 44 C 200 24, 286 26, 322 52 C 340 64, 356 70, 372 86 C 382 96, 380 110, 366 116 C 372 130, 360 150, 342 156 C 332 196, 312 250, 286 300 C 276 320, 252 322, 244 300 C 232 262, 224 236, 204 220 C 168 210, 132 196, 120 156 C 110 122, 116 70, 150 44 Z';
  const pins = [{ code: 'NG', name: 'Nigeria', x: 178, y: 152, v: 1300, c: '#BD5230' }, { code: 'UG', name: 'Uganda', x: 298, y: 178, v: 1020, c: '#0E7490' }, { code: 'KE', name: 'Kenya', x: 330, y: 166, v: 1640, c: '#008037' }, { code: 'TZ', name: 'Tanzania', x: 314, y: 206, v: 810, c: '#DD9B1F' }, { code: 'ZW', name: 'Zimbabwe', x: 288, y: 256, v: 520, c: '#8F3A1F' }];
  const kids = [h('path', { key: 'c', d: cont, fill: '#EFF3EE', stroke: '#DCE3DD', strokeWidth: 1.5 })];
  pins.forEach((p) => {
    const r = 7 + p.v / 150;
    kids.push(h('circle', { key: p.code + 'h', cx: p.x, cy: p.y, r: r + 5, fill: p.c, opacity: 0.14 }));
    kids.push(h('circle', { key: p.code + 'd', cx: p.x, cy: p.y, r, fill: p.c, opacity: 0.9, stroke: '#fff', strokeWidth: 2 }));
    const lx = p.code === 'NG' ? p.x - 14 : p.x + r + 8, anchor = p.code === 'NG' ? 'end' : 'start';
    kids.push(h('text', { key: p.code + 'n', x: lx, y: p.y - 2, textAnchor: anchor, fontSize: 11, fontWeight: 600, fontFamily: 'IBM Plex Sans', fill: '#1C2A22' }, p.name));
    kids.push(h('text', { key: p.code + 'v', x: lx, y: p.y + 11, textAnchor: anchor, fontSize: 10, fontFamily: 'IBM Plex Mono', fill: '#6B786F' }, p.v.toLocaleString() + ' t'));
  });
  return h('svg', { viewBox: '0 0 440 340', preserveAspectRatio: 'xMidYMid meet', style: { width: '100%', display: 'block', maxHeight: '340px' }, role: 'img', 'aria-label': 'Biochar production by country across Africa' }, kids);
}
function kenyaMap() {
  const h = React.createElement;
  const shape = 'M70 70 C 120 50, 180 48, 250 60 C 300 68, 320 92, 312 130 C 306 168, 286 210, 250 244 C 214 268, 168 264, 138 240 C 110 218, 96 188, 84 156 C 72 128, 56 92, 70 70 Z';
  const sites = [{ n: 'Nakuru', x: 150, y: 150, c: '#008037' }, { n: 'Nyeri', x: 196, y: 130, c: '#008037' }, { n: 'Kisumu', x: 104, y: 128, c: '#008037' }, { n: 'Machakos', x: 208, y: 182, c: '#DD9B1F' }, { n: 'Eldoret', x: 128, y: 96, c: '#0E7490' }];
  const kids = [h('path', { key: 's', d: shape, fill: '#F1F8F3', stroke: '#BCE6CB', strokeWidth: 1.5 })];
  sites.forEach((st, i) => { kids.push(h('circle', { key: 'p' + i, cx: st.x, cy: st.y, r: 6, fill: st.c, stroke: '#fff', strokeWidth: 2 })); kids.push(h('text', { key: 't' + i, x: st.x + 10, y: st.y + 4, fontSize: 11, fontWeight: 600, fontFamily: 'IBM Plex Sans', fill: '#1C2A22' }, st.n)); });
  return h('svg', { viewBox: '0 0 360 300', preserveAspectRatio: 'xMidYMid meet', style: { width: '100%', display: 'block', maxHeight: '300px' }, role: 'img', 'aria-label': 'Biochar sites across Kenya' }, kids);
}
function farmPolygon() {
  const h = React.createElement;
  const kids = [h('rect', { key: 'bg', x: 0, y: 0, width: 360, height: 200, fill: '#F1F8F3' })];
  for (let x = 0; x <= 360; x += 30) kids.push(h('line', { key: 'vx' + x, x1: x, y1: 0, x2: x, y2: 200, stroke: '#DDEEE2', strokeWidth: 1 }));
  for (let y = 0; y <= 200; y += 30) kids.push(h('line', { key: 'hy' + y, x1: 0, y1: y, x2: 360, y2: y, stroke: '#DDEEE2', strokeWidth: 1 }));
  kids.push(h('polygon', { key: 'poly', points: '78,52 220,40 286,108 232,168 110,160 64,104', fill: 'rgba(0,128,55,0.16)', stroke: '#008037', strokeWidth: 2.5, strokeLinejoin: 'round' }));
  ['78,52', '220,40', '286,108', '232,168', '110,160', '64,104'].forEach((pt, i) => { const [x, y] = pt.split(',').map(Number); kids.push(h('circle', { key: 'v' + i, cx: x, cy: y, r: 4, fill: '#fff', stroke: '#008037', strokeWidth: 2 })); });
  [['154,96', '#DD9B1F'], ['196,128', '#0E7490'], ['120,118', '#BD5230']].forEach((st, i) => { const [x, y] = st[0].split(',').map(Number); kids.push(h('circle', { key: 's' + i, cx: x, cy: y, r: 3.5, fill: st[1] })); });
  kids.push(h('text', { key: 'lbl', x: 175, y: 108, textAnchor: 'middle', fontSize: 11, fontFamily: 'IBM Plex Mono', fill: '#00682C' }, '2.4 ha'));
  return h('svg', { viewBox: '0 0 360 200', preserveAspectRatio: 'xMidYMid meet', style: { width: '100%', display: 'block' }, role: 'img', 'aria-label': 'Locked farm boundary polygon with soil sample points' }, kids);
}
const approveModal = (title, subtitle, rows, accent, note) => ({ title, subtitle, rows, note: note || 'This action provisions the account and is recorded in the audit log.', confirm: 'Approve', secondary: 'Reject', accent: accent || '#008037', bg: '#DFF1E5', fg: '#00682C', iconName: 'check' });

// The demo signs in as these two identities for the field roles; the shared
// collection store connects them to the Site Admin's approvals queue.
const CURRENT_FARMER = 'Joseph Kamau';
const CURRENT_OP = 'Daniel Mwangi';

// Collection lifecycle: Pending → (Site Admin approves) Assigned → (Transport
// records weight) Collected → (Farmer verifies) Verified.
const SEED_COLLECTIONS = [
  { id: 'C-1042', farmer: 'Joseph Kamau', material: 'Maize cobs', qty: 120, location: 'Bahati ward · 3.2 km', status: 'Pending', assignedTo: null, recordedKg: null, when: '12 min ago' },
  { id: 'C-1041', farmer: 'Mary Wairimu', material: 'Rice husks', qty: 85, location: 'Kabatini · 5.1 km', status: 'Assigned', assignedTo: 'Daniel Mwangi', recordedKg: null, when: '40 min ago' },
  { id: 'C-1039', farmer: 'Samuel Kiptoo', material: 'Coffee pulp', qty: 200, location: 'Lanet · 7.8 km', status: 'Collected', assignedTo: 'Daniel Mwangi', recordedKg: 118, when: '1 h ago' },
  { id: 'C-1036', farmer: 'Esther Cheruiyot', material: 'Maize cobs', qty: 62, location: 'Free Area · 2.4 km', status: 'Verified', assignedTo: 'Daniel Mwangi', recordedKg: 62, when: '2 h ago' },
  { id: 'C-1001', farmer: 'Joseph Kamau', material: 'Maize cobs', qty: 140, location: 'Bahati ward · 3.2 km', status: 'Verified', assignedTo: 'Daniel Mwangi', recordedKg: 140, when: '18 Jun 2026' },
  { id: 'C-0992', farmer: 'Joseph Kamau', material: 'Rice husks', qty: 95, location: 'Bahati ward · 3.2 km', status: 'Verified', assignedTo: 'Daniel Mwangi', recordedKg: 95, when: '09 Jun 2026' },
];

function BiocharPlatform({ onBack }) {
  const [screen, setScreen] = useState('login');
  const [authTab, setAuthTab] = useState('signin');
  const [applied, setApplied] = useState(false);
  const [modal, setModal] = useState(null);
  const [collections, setCollections] = useState(SEED_COLLECTIONS);
  const [nextId, setNextId] = useState(1050);
  const goLogin = () => { setScreen('login'); setApplied(false); setAuthTab('signin'); setModal(null); };
  const openModal = (p) => setModal(p);
  const closeModal = () => setModal(null);

  // store actions — each is visible to every role because state lives here and
  // survives role switches (sign out only returns to the login screen).
  const store = {
    collections,
    addCollection: ({ material, qty, location }) => {
      setCollections((cs) => [{ id: 'C-' + nextId, farmer: CURRENT_FARMER, material, qty: Number(qty) || 0, location: location || 'Bahati ward · 3.2 km', status: 'Pending', assignedTo: null, recordedKg: null, when: 'just now' }, ...cs]);
      setNextId((n) => n + 1);
    },
    approveCollection: (id, operator = CURRENT_OP) => setCollections((cs) => cs.map((c) => (c.id === id ? { ...c, status: 'Assigned', assignedTo: operator } : c))),
    recordWeight: (id, kg) => setCollections((cs) => cs.map((c) => (c.id === id ? { ...c, status: 'Collected', recordedKg: Number(kg) || c.qty } : c))),
    verifyCollection: (id) => setCollections((cs) => cs.map((c) => (c.id === id ? { ...c, status: 'Verified' } : c))),
  };

  const role = ROLES[screen];
  const isLogin = screen === 'login';
  const isDesktop = !!role && role.desktop;

  return (
    <div className="abap" style={s('height:100%;')}>
      {isLogin && <Login onBack={onBack} authTab={authTab} setAuthTab={setAuthTab} applied={applied} setApplied={setApplied} go={setScreen} />}
      {isDesktop && <Desktop screen={screen} role={role} goLogin={goLogin} openModal={openModal} closeModal={closeModal} store={store} onBack={onBack} />}
      {!isLogin && !isDesktop && <Field screen={screen} role={role} goLogin={goLogin} openModal={openModal} store={store} />}
      {modal && <ApprovalModal key={modal.key || modal.title} modal={modal} closeModal={closeModal} />}
    </div>
  );
}

const tabStyle = (active) => s(`padding:9px 16px;border-radius:7px;border:0;cursor:pointer;font-family:inherit;font-size:13.5px;font-weight:600;background:${active ? '#fff' : 'transparent'};color:${active ? '#0E1A12' : '#6B786F'};${active ? 'box-shadow:0 1px 2px rgba(14,26,18,.12);' : ''}`);

function Login({ onBack, authTab, setAuthTab, applied, setApplied, go }) {
  const demoRoles = Object.keys(ROLES).map((k) => ({ key: k, label: ROLES[k].label, tier: ROLES[k].tier, iconEl: icon(ROLES[k].icon, 17), iconStyle: { width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', background: ROLES[k].bg, color: ROLES[k].fg } }));
  return (
    <div data-screen-label="Login" style={s('display:flex;min-height:100vh;background:#F7F9F6;')}>
      {/* brand panel */}
      <div style={s('width:46%;max-width:620px;background:#0E1A12;color:#EAF3EC;padding:48px 52px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;')}>
        <svg viewBox="0 0 620 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={s('position:absolute;inset:0;width:100%;height:100%;pointer-events:none;opacity:.16;')}><g fill="none" stroke="#D86E45" strokeWidth="1.3"><path d="M-20 560 C 160 510 320 600 480 540 S 720 500 760 560" /><path d="M-20 600 C 160 550 320 640 480 580 S 720 540 760 600" /><path d="M-20 640 C 160 590 320 680 480 620 S 720 580 760 640" /><path d="M-20 520 C 160 470 320 560 480 500 S 720 460 760 520" /></g></svg>
        <div style={s('position:relative;z-index:1;display:flex;align-items:center;gap:13px;')}>
          <span style={s('width:42px;height:42px;border-radius:11px;background:#BD5230;display:flex;align-items:center;justify-content:center;flex:none;')}><I d={FLAME} size={23} stroke="#fff" /></span>
          <div style={s('line-height:1;')}>
            <div style={s('font-weight:700;font-size:20px;color:#fff;letter-spacing:-.01em;')}>ABAP</div>
            <div style={s("font-family:'IBM Plex Mono';font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#E89272;margin-top:5px;")}>Biochar Aggregation Platform</div>
          </div>
        </div>
        <div style={s('position:relative;z-index:1;')}>
          <div style={s("font-family:'IBM Plex Mono';font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:#86D2A1;")}>Waste management · dMRV</div>
          <h1 style={s('font-size:34px;line-height:1.14;font-weight:700;color:#fff;letter-spacing:-.02em;margin:14px 0 0;max-width:430px;')}>The biochar value chain, monitored end to end</h1>
          <p style={s('font-size:14.5px;line-height:1.65;color:#AFC2B5;margin:16px 0 0;max-width:430px;')}>From farmer biomass to verified biochar — collection, pyrolysis, and marketplace across five countries, under one role-based platform.</p>
          <div style={s('display:flex;flex-direction:column;gap:13px;margin-top:30px;max-width:430px;')}>
            {[['M3 12h4l2 6 4-14 2 8h6', 'Digital MRV on every pyrolysis machine'], [null, 'Tiered access — each role admits the one beneath'], [null, 'Farmer marketplace for biochar manure']].map(([d, label], i) => (
              <div key={i} style={s('display:flex;align-items:center;gap:12px;font-size:13.5px;color:#C7D6CC;')}>
                <span style={s('width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,.06);color:#86D2A1;display:flex;align-items:center;justify-content:center;flex:none;')}>{i === 0 ? <I d={d} /> : i === 1 ? icon('users', 16) : icon('store', 16)}</span>{label}
              </div>
            ))}
          </div>
        </div>
        <div style={s("position:relative;z-index:1;font-family:'IBM Plex Mono';font-size:11px;color:#5F7468;letter-spacing:.04em;")}>KENYA · UGANDA · TANZANIA · NIGERIA · ZIMBABWE</div>
      </div>

      {/* auth panel */}
      <div style={s('flex:1;display:flex;align-items:center;justify-content:center;padding:40px 32px;')}>
        <div style={s('width:100%;max-width:430px;')}>
          {onBack && <button onClick={onBack} style={s('display:inline-flex;align-items:center;gap:6px;border:0;background:transparent;padding:0;margin-bottom:18px;cursor:pointer;font-family:inherit;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:#00682C;')}><I d="M15 18l-6-6 6-6" size={13} sw={2.4} />Sectoral scopes</button>}
          <div style={s('display:inline-flex;gap:4px;background:#EFF3EE;padding:4px;border-radius:9px;border:1px solid #E6EBE6;margin-bottom:24px;')}>
            <button onClick={() => setAuthTab('signin')} style={tabStyle(authTab === 'signin')}>Sign in</button>
            <button onClick={() => { setAuthTab('apply'); setApplied(false); }} style={tabStyle(authTab === 'apply')}>Apply to join</button>
          </div>
          {authTab === 'signin' && (
            <div>
              <h2 style={s('margin:0;font-size:22px;font-weight:600;letter-spacing:-.02em;color:#0E1A12;')}>Sign in</h2>
              <p style={s('margin:6px 0 22px;font-size:13.5px;color:#6B786F;')}>Access your role workspace.</p>
              <label style={s('display:block;font-size:12.5px;font-weight:600;color:#1C2A22;margin-bottom:6px;')}>Email</label>
              <input placeholder="you@organisation.org" style={s('width:100%;height:42px;padding:0 12px;font-family:inherit;font-size:13.5px;border:1px solid #BDC6BF;border-radius:6px;background:#fff;color:#0E1A12;outline:none;margin-bottom:14px;')} />
              <label style={s('display:block;font-size:12.5px;font-weight:600;color:#1C2A22;margin-bottom:6px;')}>Password</label>
              <input type="password" defaultValue="demo-access" style={s('width:100%;height:42px;padding:0 12px;font-family:inherit;font-size:13.5px;border:1px solid #BDC6BF;border-radius:6px;background:#fff;color:#0E1A12;outline:none;margin-bottom:20px;')} />
              <button onClick={() => go('superadmin')} style={s('width:100%;height:44px;border:0;border-radius:6px;background:#008037;color:#fff;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;')}>Sign in<I d="M5 12h14M13 6l6 6-6 6" size={16} sw={2.2} /></button>
              <div style={s('display:flex;align-items:center;gap:12px;margin:26px 0 16px;')}><span style={s('flex:1;height:1px;background:#E6EBE6;')} /><span style={s('font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#8C988F;')}>Or enter a demo workspace</span><span style={s('flex:1;height:1px;background:#E6EBE6;')} /></div>
              <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:9px;')}>
                {demoRoles.map((r) => (
                  <button key={r.key} onClick={() => go(r.key)} style={s('display:flex;align-items:center;gap:10px;padding:11px 12px;border:1px solid #DCE3DD;border-radius:8px;background:#fff;cursor:pointer;text-align:left;font-family:inherit;')}>
                    <span style={r.iconStyle}>{r.iconEl}</span>
                    <span style={s('min-width:0;')}><span style={s('display:block;font-size:13px;font-weight:600;color:#0E1A12;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;')}>{r.label}</span><span style={s("display:block;font-family:'IBM Plex Mono';font-size:9.5px;text-transform:uppercase;letter-spacing:.05em;color:#8C988F;margin-top:2px;")}>{r.tier}</span></span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {authTab === 'apply' && (applied ? (
            <div style={s('text-align:center;padding:20px 8px;')}>
              <span style={s('width:60px;height:60px;border-radius:50%;background:#DFF1E5;color:#008037;display:inline-flex;align-items:center;justify-content:center;margin-bottom:18px;')}><I d="M20 6L9 17l-5-5" size={30} sw={2.2} /></span>
              <h2 style={s('margin:0;font-size:21px;font-weight:600;color:#0E1A12;letter-spacing:-.01em;')}>Application submitted</h2>
              <p style={s('margin:10px auto 0;font-size:13.5px;line-height:1.6;color:#6B786F;max-width:330px;')}>Your account is <b style={s('color:#B57711;')}>pending Site Admin approval</b>. You'll get an SMS once approved — then you can sign in.</p>
              <div style={s('display:inline-flex;align-items:center;gap:7px;margin-top:18px;font-size:11.5px;font-weight:600;color:#B57711;background:#FBEFD2;padding:6px 12px;border-radius:999px;')}><i style={s('width:6px;height:6px;border-radius:50%;background:#DD9B1F;display:inline-block;')} />Awaiting approval</div>
              <div style={s('margin-top:24px;')}><button onClick={() => setAuthTab('signin')} style={s('height:40px;padding:0 18px;border:1px solid #BDC6BF;border-radius:6px;background:#fff;color:#1C2A22;font-family:inherit;font-size:13.5px;font-weight:600;cursor:pointer;')}>Back to sign in</button></div>
            </div>
          ) : (
            <div>
              <h2 style={s('margin:0;font-size:22px;font-weight:600;letter-spacing:-.02em;color:#0E1A12;')}>Apply to join</h2>
              <p style={s('margin:6px 0 22px;font-size:13.5px;color:#6B786F;')}>Field roles apply here, then a Site Admin reviews and approves your account.</p>
              <label style={s('display:block;font-size:12.5px;font-weight:600;color:#1C2A22;margin-bottom:6px;')}>Role</label>
              <Select options={['Farmer — supply biomass', 'Transport — collect biomass', 'Enumerator — field survey']} mb="14px" />
              <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;')}>
                <div><label style={s('display:block;font-size:12.5px;font-weight:600;color:#1C2A22;margin-bottom:6px;')}>Full name</label><input placeholder="Jane Wanjiku" style={s('width:100%;height:42px;padding:0 12px;font-family:inherit;font-size:13.5px;border:1px solid #BDC6BF;border-radius:6px;background:#fff;color:#0E1A12;outline:none;')} /></div>
                <div><label style={s('display:block;font-size:12.5px;font-weight:600;color:#1C2A22;margin-bottom:6px;')}>Phone</label><input placeholder="+254 7•• ••• •••" style={s("width:100%;height:42px;padding:0 12px;font-family:'IBM Plex Mono';font-size:13px;border:1px solid #BDC6BF;border-radius:6px;background:#fff;color:#0E1A12;outline:none;")} /></div>
              </div>
              <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:22px;')}>
                <div><label style={s('display:block;font-size:12.5px;font-weight:600;color:#1C2A22;margin-bottom:6px;')}>Country</label><Select options={['Kenya', 'Uganda', 'Tanzania', 'Nigeria', 'Zimbabwe']} /></div>
                <div><label style={s('display:block;font-size:12.5px;font-weight:600;color:#1C2A22;margin-bottom:6px;')}>Nearest site</label><Select options={['Nakuru Pyrolysis Site', 'Nyeri Biochar Hub', 'Kisumu Lakeside Site']} /></div>
              </div>
              <button onClick={() => setApplied(true)} style={s('width:100%;height:44px;border:0;border-radius:6px;background:#008037;color:#fff;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;')}>Submit application</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Select({ options, mb }) {
  return (
    <div style={s('position:relative;display:flex;align-items:center;' + (mb ? 'margin-bottom:' + mb + ';' : ''))}>
      <select style={s('width:100%;height:42px;padding:0 30px 0 12px;font-family:inherit;font-size:13.5px;border:1px solid #BDC6BF;border-radius:6px;background:#fff;color:#0E1A12;outline:none;appearance:none;cursor:pointer;')}>{options.map((o) => <option key={o}>{o}</option>)}</select>
      <I d="M6 9l6 6 6-6" size={15} stroke="#6B786F" style={s('position:absolute;right:10px;pointer-events:none;')} />
    </div>
  );
}

// shared status badge cell
const Badge = ({ status }) => { const b = badge(status); return <span style={b.badge}><i style={b.dot} />{status}</span>; };

function Th({ children, r }) { return <th style={s('text-align:' + (r ? 'right' : 'left') + ';font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#6B786F;padding:10px ' + (r ? '16px' : '18px') + ';border-bottom:1px solid #DCE3DD;background:#F7F9F6;white-space:nowrap;')}>{children}</th>; }
const Card = ({ children }) => <div style={s('background:#fff;border:1px solid #DCE3DD;border-radius:12px;box-shadow:0 1px 2px rgba(14,26,18,.04);overflow:hidden;')}>{children}</div>;
const CardHead = ({ title, sub, right }) => <div style={s('display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid #E6EBE6;gap:12px;flex-wrap:wrap;')}><div style={s('display:flex;align-items:baseline;gap:10px;')}><h2 style={s('margin:0;font-size:15px;font-weight:600;color:#0E1A12;')}>{title}</h2>{sub && <span style={s('font-size:12px;color:#6B786F;')}>{sub}</span>}</div>{right}</div>;

function Kpi({ iconBg, iconFg, iconD, delta, value, unit, label }) {
  return (
    <div style={s('background:#fff;border:1px solid #DCE3DD;border-radius:12px;padding:18px;box-shadow:0 1px 2px rgba(14,26,18,.04);')}>
      <div style={s('display:flex;align-items:center;justify-content:space-between;')}><span style={s('width:30px;height:30px;border-radius:8px;background:' + iconBg + ';color:' + iconFg + ';display:flex;align-items:center;justify-content:center;')}><I d={iconD} size={17} /></span><span style={s("font-family:'IBM Plex Mono';font-size:11px;color:#00682C;font-weight:500;")}>{delta}</span></div>
      <div style={s("font-family:'IBM Plex Sans Condensed';font-weight:700;font-size:32px;color:#0E1A12;line-height:1;margin-top:16px;font-variant-numeric:tabular-nums;")}>{value}{unit && <span style={s("font-size:14px;color:#6B786F;font-family:'IBM Plex Mono';font-weight:400;margin-left:5px;")}>{unit}</span>}</div>
      <div style={s('font-size:12.5px;color:#4E5B52;margin-top:6px;')}>{label}</div>
    </div>
  );
}

function Desktop({ screen, role, goLogin, openModal, store }) {
  const nav = navFor(screen);
  const titles = { superadmin: ['Global · all countries', 'Programme overview'], ip: ['Kenya · country programme', 'Country overview'], siteadmin: ['Nakuru Pyrolysis Site', 'Site operations'] }[screen];
  const ctx = { superadmin: { select: true, options: ['All countries', 'Kenya', 'Uganda', 'Tanzania', 'Nigeria', 'Zimbabwe'] }, ip: { static: true, label: 'Kenya · KE' }, siteadmin: { select: true, options: ['Nakuru Pyrolysis Site', 'Nyeri Biochar Hub', 'Kisumu Lakeside Site'] } }[screen];
  return (
    <div data-screen-label="Desktop role" style={s('display:flex;height:100vh;overflow:hidden;background:#F7F9F6;')}>
      {/* sidebar */}
      <aside style={s('width:248px;flex:none;background:#0E1A12;color:#C7D6CC;display:flex;flex-direction:column;padding:18px 14px;border-right:1px solid rgba(255,255,255,.06);')}>
        <div style={s('display:flex;align-items:center;gap:11px;padding:4px 8px 16px;')}>
          <span style={s('width:32px;height:32px;border-radius:9px;background:#BD5230;display:flex;align-items:center;justify-content:center;flex:none;')}><I d={FLAME} size={18} stroke="#fff" /></span>
          <div style={s('display:flex;flex-direction:column;line-height:1;')}><span style={s('font-weight:700;font-size:16px;color:#fff;letter-spacing:-.01em;')}>ABAP</span><span style={s("font-family:'IBM Plex Mono';font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:#E89272;margin-top:5px;")}>Biochar platform</span></div>
        </div>
        <button onClick={goLogin} style={s('display:flex;align-items:center;gap:8px;margin:0 6px 10px;padding:7px 10px;border:1px solid rgba(255,255,255,.10);border-radius:6px;background:rgba(255,255,255,.03);color:#AFC2B5;font-family:inherit;font-size:12px;font-weight:600;cursor:pointer;text-align:left;')}><I d="M15 18l-6-6 6-6" size={13} sw={2.4} />Switch role / sign out</button>
        <div style={s('font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#5F7468;padding:6px 10px 6px;')}>{role.label}</div>
        <nav style={s('display:flex;flex-direction:column;gap:2px;flex:1;')}>{nav.map((it, i) => <button key={i} style={it.btnStyle}><span style={s('display:flex;width:18px;height:18px;flex:none;')}>{it.iconEl}</span><span>{it.label}</span></button>)}</nav>
        <div style={s('display:flex;flex-direction:column;gap:10px;padding-top:12px;border-top:1px solid rgba(255,255,255,.07);')}>
          <div style={s('display:flex;align-items:center;gap:10px;padding:8px 10px;background:rgba(255,255,255,.04);border-radius:6px;')}><span className="ab-pulse" style={s('width:8px;height:8px;border-radius:50%;background:#4DB874;flex:none;animation:abPulse 2.2s ease-out infinite;')} /><div><div style={s('font-size:12.5px;color:#EAF3EC;font-weight:600;')}>DMRV live</div><div style={s('font-size:11px;color:#7E9286;')}>Synced 2 min ago</div></div></div>
          <div style={s('display:flex;align-items:center;gap:10px;padding:6px 8px;')}><span style={{ width: '30px', height: '30px', borderRadius: '50%', background: role.bg, color: role.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, flex: 'none' }}>{role.initials}</span><div style={s('line-height:1.3;min-width:0;')}><div style={s('font-size:13px;color:#EAF3EC;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;')}>{role.user}</div><div style={s('font-size:11px;color:#7E9286;')}>{role.label}</div></div></div>
        </div>
      </aside>

      {/* main */}
      <div style={s('flex:1;display:flex;flex-direction:column;min-width:0;')}>
        <header style={s('height:60px;flex:none;background:#fff;border-bottom:1px solid #DCE3DD;display:flex;align-items:center;justify-content:space-between;padding:0 24px;gap:16px;')}>
          <div style={s('min-width:0;')}><div style={s('font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.09em;color:#6B786F;margin-bottom:2px;')}>{titles[0]}</div><h1 style={s('margin:0;font-size:21px;font-weight:600;letter-spacing:-.02em;line-height:1.1;color:#0E1A12;')}>{titles[1]}</h1></div>
          <div style={s('display:flex;align-items:center;gap:10px;')}>
            {ctx.select && <div style={s('position:relative;display:flex;align-items:center;')}><span style={s('position:absolute;left:11px;width:8px;height:8px;border-radius:50%;background:#008037;')} /><select style={s('height:36px;width:200px;padding:0 30px 0 28px;font-family:inherit;font-size:13px;font-weight:600;border:1px solid #BDC6BF;border-radius:6px;background:#fff;color:#1C2A22;outline:none;appearance:none;cursor:pointer;')}>{ctx.options.map((o) => <option key={o}>{o}</option>)}</select><I d="M6 9l6 6 6-6" size={15} stroke="#6B786F" style={s('position:absolute;right:9px;pointer-events:none;')} /></div>}
            {ctx.static && <span style={s('display:inline-flex;align-items:center;gap:8px;height:36px;padding:0 14px;border:1px solid #BDC6BF;border-radius:6px;background:#fff;font-size:13px;font-weight:600;color:#1C2A22;')}><i style={s('width:8px;height:8px;border-radius:50%;background:#0E7490;display:inline-block;')} />{ctx.label}</span>}
            <button aria-label="Notifications" style={s('width:36px;height:36px;border:1px solid #BDC6BF;border-radius:6px;background:#fff;color:#4E5B52;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;')}><I d={['M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M13.7 21a2 2 0 0 1-3.4 0']} size={18} /><span style={s('position:absolute;top:7px;right:8px;width:7px;height:7px;border-radius:50%;background:#C0392B;border:1.5px solid #fff;')} /></button>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: '28px', padding: '0 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, background: role.bg, color: role.fg, whiteSpace: 'nowrap' }}>{role.label}</span>
            <button onClick={goLogin} style={s('height:36px;padding:0 13px;border:1px solid #BDC6BF;border-radius:6px;background:#fff;color:#4E5B52;font-family:inherit;font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;')}><I d={['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9']} size={15} />Sign out</button>
          </div>
        </header>
        <div style={s('flex:1;overflow-y:auto;padding:24px;')}>
          <div style={s('max-width:1180px;margin:0 auto;display:flex;flex-direction:column;gap:18px;')}>
            {screen === 'superadmin' && <SuperContent openModal={openModal} closeModal={() => openModal(null)} />}
            {screen === 'ip' && <IPContent openModal={openModal} closeModal={() => openModal(null)} />}
            {screen === 'siteadmin' && <SiteContent openModal={openModal} store={store} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function SuperContent({ openModal, closeModal }) {
  const flags = { KE: '#C0392B', UG: '#DD9B1F', TZ: '#0E7490', NG: '#008037', ZW: '#8F3A1F' };
  const countries = [
    { code: 'KE', name: 'Kenya', ip: 'GreenChar Kenya Ltd', sites: 14, biomass: '4,820', biochar: '1,640', status: 'Active' },
    { code: 'NG', name: 'Nigeria', ip: 'Sahel Biochar Co.', sites: 11, biomass: '3,980', biochar: '1,300', status: 'Active' },
    { code: 'UG', name: 'Uganda', ip: 'BioSoil Uganda', sites: 9, biomass: '3,110', biochar: '1,020', status: 'Active' },
    { code: 'TZ', name: 'Tanzania', ip: 'Carbon Roots TZ', sites: 7, biomass: '2,440', biochar: '810', status: 'Active' },
    { code: 'ZW', name: 'Zimbabwe', ip: 'Veld Carbon ZW', sites: 5, biomass: '1,560', biochar: '520', status: 'Onboarding' },
  ];
  const ips = [
    { code: 'GC', org: 'GreenChar Kenya Ltd', country: 'Kenya', contact: 'partners@greenchar.co.ke', status: 'Active', action: 'manage' },
    { code: 'SB', org: 'Sahel Biochar Co.', country: 'Nigeria', contact: 'ops@sahelbiochar.ng', status: 'Active', action: 'manage' },
    { code: 'VC', org: 'Veld Carbon ZW', country: 'Zimbabwe', contact: 'admin@veldcarbon.zw', status: 'Pending', action: 'admit' },
  ];
  return (
    <>
      <div style={s('display:grid;grid-template-columns:repeat(4,1fr);gap:14px;')}>
        <Kpi iconBg="#FBE9E1" iconFg="#8F3A1F" iconD={['M3 3v18h18', 'M7 14l3-3 3 3 5-6']} delta="+8.2%" value="15,910" unit="t" label="Biomass collected" />
        <Kpi iconBg="#EFF3EE" iconFg="#36433B" iconD={FLAME} delta="+11.4%" value="5,290" unit="t" label="Biochar produced" />
        <Kpi iconBg="#FBEFD2" iconFg="#B57711" iconD={['M3 21h18', 'M5 21V8l7-5 7 5v13', 'M9 21v-6h6v6']} delta="+3" value="46" label="Active sites" />
        <Kpi iconBg="#E2F2F6" iconFg="#0B5A6B" iconD={['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M22 21v-2a4 4 0 0 0-3-3.87']} delta="+260" value="4,170" label="Platform users" />
      </div>
      <div style={s('display:grid;grid-template-columns:1.42fr 1fr;gap:18px;align-items:start;')}>
        <Card><CardHead title="Production across Africa" sub="Biochar output by country" /><div style={s('padding:8px 12px 14px;')}>{africaMap()}</div></Card>
        <Card><CardHead title="Monthly biochar output" sub="All countries · t" /><div style={s('padding:14px 16px 16px;')}>{buildBars([320, 360, 395, 430, 460, 510, 540, 580, 610, 640, 690, 720], ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], '#008037', '')}</div></Card>
      </div>
      <Card>
        <CardHead title="Countries" sub="5 programmes" />
        <table style={s('width:100%;border-collapse:collapse;font-size:13px;')}>
          <thead><tr><Th>Country</Th><Th>Implementing partner</Th><Th r>Sites</Th><Th r>Biomass t</Th><Th r>Biochar t</Th><Th>Status</Th></tr></thead>
          <tbody>{countries.map((c) => (
            <tr key={c.code} style={s('border-bottom:1px solid #E6EBE6;')}>
              <td style={s('padding:13px 18px;')}><span style={s('display:inline-flex;align-items:center;gap:9px;')}><span style={s('width:22px;height:16px;border-radius:3px;background:' + flags[c.code] + ';display:inline-block;flex:none;')} /><b style={s('font-weight:600;color:#0E1A12;')}>{c.name}</b></span></td>
              <td style={s('padding:13px 16px;color:#4E5B52;')}>{c.ip}</td>
              <td style={s("padding:13px 16px;text-align:right;font-family:'IBM Plex Mono';font-size:12px;color:#1C2A22;")}>{c.sites}</td>
              <td style={s("padding:13px 16px;text-align:right;font-family:'IBM Plex Mono';font-size:12px;color:#1C2A22;")}>{c.biomass}</td>
              <td style={s("padding:13px 16px;text-align:right;font-family:'IBM Plex Mono';font-size:12px;color:#0E1A12;font-weight:500;")}>{c.biochar}</td>
              <td style={s('padding:13px 18px;')}><Badge status={c.status} /></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
      <Card>
        <CardHead title="Local Implementing Partners" sub="You admit one IP per country" />
        <div style={s('padding:6px 18px 14px;')}>{ips.map((ip) => {
          const isAdmit = ip.action === 'admit';
          const pb = pillBtn(isAdmit ? 'admit' : 'manage', isAdmit ? 'Admit IP' : 'Manage', isAdmit ? () => openModal(approveModal('Admit Implementing Partner', 'Provision country-level access for ' + ip.org, [{ k: 'Organisation', v: ip.org }, { k: 'Country', v: ip.country }, { k: 'Contact', v: ip.contact }, { k: 'Access tier', v: 'Tier 2 · Country' }], '#0E7490', 'Admitting this IP grants management of all sites and users in ' + ip.country + '.')) : closeModal);
          return (
            <div key={ip.code} style={s('display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1px solid #E6EBE6;')}>
              <span style={s("width:38px;height:38px;border-radius:9px;background:#E2F2F6;color:#0B5A6B;display:flex;align-items:center;justify-content:center;flex:none;font-family:'IBM Plex Sans Condensed';font-weight:700;font-size:14px;")}>{ip.code}</span>
              <div style={s('flex:1;min-width:0;')}><div style={s('font-size:13.5px;font-weight:600;color:#0E1A12;')}>{ip.org}</div><div style={s('font-size:12px;color:#6B786F;margin-top:2px;')}>{ip.country} · {ip.contact}</div></div>
              <Badge status={ip.status} />
              <button onClick={pb.onClick} style={pb.style}>{pb.label}</button>
            </div>
          );
        })}</div>
      </Card>
    </>
  );
}

function IPContent({ openModal, closeModal }) {
  const sites = [
    { id: 'KE-NKR-01', name: 'Nakuru Pyrolysis Site', region: 'Nakuru', machines: 3, biochar: '420', status: 'Producing' },
    { id: 'KE-KSM-03', name: 'Kisumu Lakeside Site', region: 'Kisumu', machines: 2, biochar: '310', status: 'Producing' },
    { id: 'KE-NYR-02', name: 'Nyeri Biochar Hub', region: 'Nyeri', machines: 2, biochar: '265', status: 'Producing' },
    { id: 'KE-ELD-05', name: 'Eldoret Grain Belt Site', region: 'Uasin Gishu', machines: 2, biochar: '180', status: 'Onboarding' },
    { id: 'KE-MCK-04', name: 'Machakos Dryland Site', region: 'Machakos', machines: 1, biochar: '140', status: 'Maintenance' },
  ];
  const admins = [
    { initials: 'WK', name: 'Wanjiru Kariuki', site: 'Nakuru Pyrolysis Site', status: 'Active', action: 'manage' },
    { initials: 'OO', name: 'Otieno Omondi', site: 'Kisumu Lakeside Site', status: 'Active', action: 'manage' },
    { initials: 'PN', name: 'Peter Njoroge', site: 'Eldoret Grain Belt Site', status: 'Pending', action: 'admit' },
  ];
  const enrolSite = () => openModal({ title: 'Enrol a new site', subtitle: 'Register a pyrolysis site under Kenya', rows: [{ k: 'Country', v: 'Kenya' }, { k: 'Default methodology', v: 'Verra VM0044' }, { k: 'Access tier', v: 'Tier 3 · Site' }], note: 'A site code is issued and a Site Admin can then be admitted.', confirm: 'Create site', secondary: 'Cancel', accent: '#008037', bg: '#DFF1E5', fg: '#00682C', iconName: 'factory' });
  return (
    <>
      <div style={s('display:grid;grid-template-columns:repeat(4,1fr);gap:14px;')}>
        <Kpi iconBg="#FBEFD2" iconFg="#B57711" iconD={['M3 21h18', 'M5 21V8l7-5 7 5v13', 'M9 21v-6h6v6']} delta="+1" value="5" label="Active sites · Kenya" />
        <Kpi iconBg="#FBE9E1" iconFg="#8F3A1F" iconD={['M3 3v18h18', 'M7 14l3-3 3 3 5-6']} delta="+6.4%" value="4,820" unit="t" label="Biomass collected" />
        <Kpi iconBg="#EFF3EE" iconFg="#36433B" iconD={FLAME} delta="+9.1%" value="1,640" unit="t" label="Biochar produced" />
        <Kpi iconBg="#E2F2F6" iconFg="#0B5A6B" iconD={['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M22 21v-2a4 4 0 0 0-3-3.87']} delta="+74" value="1,210" label="Users in Kenya" />
      </div>
      <div style={s('display:grid;grid-template-columns:1.3fr 1fr;gap:18px;align-items:start;')}>
        <Card><CardHead title="Sites across Kenya" sub="5 sites" /><div style={s('padding:10px 14px 14px;')}>{kenyaMap()}</div></Card>
        <Card><CardHead title="Collection volume" sub="Monthly · t" /><div style={s('padding:14px 16px 16px;')}>{buildBars([280, 310, 330, 360, 390, 420, 405, 440, 470, 460, 495, 520], ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'], '#0E7490', '')}</div></Card>
      </div>
      <Card>
        <CardHead title="Site register" right={<button onClick={enrolSite} style={s('height:34px;padding:0 13px;border:1px solid #008037;border-radius:6px;background:#F1F8F3;color:#00682C;font-family:inherit;font-size:12.5px;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;')}><I d="M12 5v14M5 12h14" size={15} sw={2.2} />Enrol site</button>} />
        <table style={s('width:100%;border-collapse:collapse;font-size:13px;')}>
          <thead><tr><Th>Site ID</Th><Th>Site</Th><Th>Region</Th><Th r>Machines</Th><Th r>Biochar t</Th><Th>Status</Th></tr></thead>
          <tbody>{sites.map((st) => (
            <tr key={st.id} style={s('border-bottom:1px solid #E6EBE6;')}>
              <td style={s("padding:13px 18px;font-family:'IBM Plex Mono';font-size:12px;color:#0E1A12;white-space:nowrap;")}>{st.id}</td>
              <td style={s('padding:13px 16px;color:#0E1A12;font-weight:500;')}>{st.name}</td>
              <td style={s('padding:13px 16px;color:#4E5B52;')}>{st.region}</td>
              <td style={s("padding:13px 16px;text-align:right;font-family:'IBM Plex Mono';font-size:12px;color:#1C2A22;")}>{st.machines}</td>
              <td style={s("padding:13px 16px;text-align:right;font-family:'IBM Plex Mono';font-size:12px;color:#0E1A12;font-weight:500;")}>{st.biochar}</td>
              <td style={s('padding:13px 18px;')}><Badge status={st.status} /></td>
            </tr>
          ))}</tbody>
        </table>
      </Card>
      <Card>
        <CardHead title="Site Admins" sub="You admit a Site Admin per site" />
        <div style={s('padding:6px 18px 14px;')}>{admins.map((a) => {
          const isAdmit = a.action === 'admit';
          const pb = pillBtn(isAdmit ? 'admit' : 'manage', isAdmit ? 'Admit' : 'Manage', isAdmit ? () => openModal(approveModal('Admit Site Admin', 'Provision site-level access for ' + a.name, [{ k: 'Name', v: a.name }, { k: 'Site', v: a.site }, { k: 'Access tier', v: 'Tier 3 · Site' }], '#B57711', 'The Site Admin can then admit farmers, transport and enumerators.')) : closeModal);
          return (
            <div key={a.initials} style={s('display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1px solid #E6EBE6;')}>
              <span style={s('width:38px;height:38px;border-radius:50%;background:#FBEFD2;color:#B57711;display:flex;align-items:center;justify-content:center;flex:none;font-size:13px;font-weight:600;')}>{a.initials}</span>
              <div style={s('flex:1;min-width:0;')}><div style={s('font-size:13.5px;font-weight:600;color:#0E1A12;')}>{a.name}</div><div style={s('font-size:12px;color:#6B786F;margin-top:2px;')}>{a.site}</div></div>
              <Badge status={a.status} />
              <button onClick={pb.onClick} style={pb.style}>{pb.label}</button>
            </div>
          );
        })}</div>
      </Card>
    </>
  );
}

function SiteContent({ openModal, store }) {
  const alerts = [
    { level: 'danger', machine: 'PYR-01', time: '08:12', msg: 'Feed auger jam cleared — 14 min downtime' },
    { level: 'warn', machine: 'PYR-03', time: '06:40', msg: 'Reactor temp dipped to 442°C, below band' },
    { level: 'ok', machine: 'PYR-02', time: '05:55', msg: 'Batch 0294 complete — 96 kg biochar' },
    { level: 'ok', machine: 'PYR-02', time: '02:30', msg: 'Telemetry sync OK · all sensors reporting' },
  ];
  const dotColor = { danger: '#C0392B', warn: '#DD9B1F', ok: '#008037' };
  // live: requests still awaiting approval, newest first
  const reqs = store.collections.filter((c) => c.status === 'Pending');
  const enrol = [
    { initials: 'FN', name: 'Faith Nyambura', enumerator: 'Grace Achieng', region: 'Bahati ward' },
    { initials: 'JM', name: 'James Mutua', enumerator: 'Grace Achieng', region: 'Lanet' },
  ];
  const users = [
    { name: 'Joseph Kamau', role: 'Farmer', phone: '+254 712 004 118', status: 'Active' },
    { name: 'Daniel Mwangi', role: 'Transport', phone: '+254 720 551 902', status: 'Active' },
    { name: 'Grace Achieng', role: 'Enumerator', phone: '+254 733 887 410', status: 'Active' },
    { name: 'Mary Wairimu', role: 'Farmer', phone: '+254 711 220 845', status: 'Active' },
    { name: 'Faith Nyambura', role: 'Farmer', phone: '+254 759 330 271', status: 'Pending' },
  ];
  const roleTone = { Farmer: '#FBE9E1|#8F3A1F', Transport: '#E2F2F6|#0B5A6B', Enumerator: '#F1F8F3|#034A24' };
  return (
    <>
      <div style={s('display:grid;grid-template-columns:repeat(4,1fr);gap:14px;')}>
        <Kpi iconBg="#FBE9E1" iconFg="#8F3A1F" iconD="M3 12h4l2 6 4-14 2 8h6" delta="today" value="1,240" unit="kg" label="Biomass in" />
        <Kpi iconBg="#EFF3EE" iconFg="#36433B" iconD={FLAME} delta="today" value="372" unit="kg" label="Biochar out" />
        <Kpi iconBg="#DFF1E5" iconFg="#008037" iconD={['M21 12a9 9 0 1 1-6.2-8.6', 'M21 4v6h-6']} delta="+1.2pt" value="30.0" unit="%" label="Conversion yield" />
        <Kpi iconBg="#FBEFD2" iconFg="#B57711" iconD={['M14 4v6a2 2 0 0 0 .6 1.4L18 15v5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-5l3.4-3.6A2 2 0 0 0 10 10V4', 'M9 4h6']} delta="normal" value="482" unit="°C" label="Reactor temp · PYR-02" />
      </div>
      <div style={s('display:grid;grid-template-columns:1.6fr 1fr;gap:18px;align-items:start;')}>
        <Card>
          <div style={s('display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid #E6EBE6;')}><div><h2 style={s('margin:0;font-size:15px;font-weight:600;color:#0E1A12;')}>DMRV — reactor temperature</h2><div style={s('font-size:12px;color:#6B786F;margin-top:2px;')}>Last 24h · machine PYR-02 · target band 450–550°C</div></div><span style={s('display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:600;color:#00682C;background:#DFF1E5;padding:4px 9px;border-radius:999px;')}><i style={s('width:6px;height:6px;border-radius:50%;background:#008037;display:inline-block;')} />Reporting</span></div>
          <div style={s('padding:14px 16px 16px;')}>{tempChart()}</div>
        </Card>
        <Card>
          <CardHead title="Alert log" sub="PYR-01 · 02 · 03" />
          <div style={s('padding:6px 18px 12px;')}>{alerts.map((a, i) => (
            <div key={i} style={s('display:flex;gap:11px;padding:12px 0;border-bottom:1px solid #E6EBE6;align-items:flex-start;')}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', marginTop: '5px', flex: 'none', background: dotColor[a.level] }} />
              <div style={s('flex:1;min-width:0;')}><div style={s('font-size:13px;color:#1C2A22;line-height:1.4;')}>{a.msg}</div><div style={s("font-family:'IBM Plex Mono';font-size:10.5px;color:#8C988F;margin-top:3px;")}>{a.machine} · {a.time}</div></div>
            </div>
          ))}</div>
        </Card>
      </div>
      <Card>
        <div style={s('display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid #E6EBE6;')}><div style={s('display:flex;align-items:baseline;gap:10px;')}><h2 style={s('margin:0;font-size:15px;font-weight:600;color:#0E1A12;')}>Approvals queue</h2><span style={s('display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:#B57711;background:#FBEFD2;padding:3px 8px;border-radius:999px;')}>{reqs.length + enrol.length} pending</span></div></div>
        <div style={s('padding:16px 18px;display:flex;flex-direction:column;gap:18px;')}>
          <div>
            <div style={s('font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:#6B786F;margin-bottom:10px;')}>Collection requests</div>
            {reqs.length === 0 && <div style={s('font-size:12.5px;color:#8C988F;padding:8px 2px 4px;')}>No collection requests awaiting approval.</div>}
            {reqs.map((r) => (
              <div key={r.id} style={s('display:flex;align-items:center;gap:14px;padding:11px 13px;border:1px solid #E6EBE6;border-radius:9px;margin-bottom:8px;')}>
                <span style={s('width:36px;height:36px;border-radius:9px;background:#FBE9E1;color:#8F3A1F;display:flex;align-items:center;justify-content:center;flex:none;')}><I d={FLAME} size={18} /></span>
                <div style={s('flex:1;min-width:0;')}><div style={s('font-size:13.5px;font-weight:600;color:#0E1A12;')}>{r.farmer} · <span style={s("font-family:'IBM Plex Mono';font-weight:500;")}>{r.material} · {r.qty} kg</span></div><div style={s('font-size:12px;color:#6B786F;margin-top:2px;')}>{r.location} · {r.when}</div></div>
                <button onClick={() => openModal({ ...approveModal('Approve & assign collection', 'Assign this collection to a transport operator', [{ k: 'Farmer', v: r.farmer }, { k: 'Material', v: r.material }, { k: 'Quantity', v: r.qty + ' kg' }, { k: 'Location', v: r.location }, { k: 'Assign to', v: CURRENT_OP }], '#008037', 'The transport operator is notified and records actual weight on collection.'), confirm: 'Approve & assign', onConfirm: () => store.approveCollection(r.id) })} style={s('height:34px;padding:0 14px;border:0;border-radius:6px;background:#008037;color:#fff;font-family:inherit;font-size:12.5px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;')}><I d="M20 6L9 17l-5-5" size={14} sw={2.4} />Approve &amp; assign</button>
              </div>
            ))}
          </div>
          <div>
            <div style={s('font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:#6B786F;margin-bottom:10px;')}>Enumerator-enrolled farmers</div>
            {enrol.map((e) => (
              <div key={e.initials} style={s('display:flex;align-items:center;gap:14px;padding:11px 13px;border:1px solid #E6EBE6;border-radius:9px;margin-bottom:8px;')}>
                <span style={s('width:36px;height:36px;border-radius:50%;background:#F1F8F3;color:#034A24;display:flex;align-items:center;justify-content:center;flex:none;font-size:12.5px;font-weight:600;')}>{e.initials}</span>
                <div style={s('flex:1;min-width:0;')}><div style={s('font-size:13.5px;font-weight:600;color:#0E1A12;')}>{e.name}</div><div style={s('font-size:12px;color:#6B786F;margin-top:2px;')}>Enrolled by {e.enumerator} · {e.region}</div></div>
                <button onClick={() => openModal(approveModal('Approve farmer', 'Confirm enrolment of a field-surveyed farmer', [{ k: 'Farmer', v: e.name }, { k: 'Enrolled by', v: e.enumerator }, { k: 'Region', v: e.region }], '#008037', 'Approving activates the farmer account and links their farm polygon.'))} style={s('height:34px;padding:0 14px;border:0;border-radius:6px;background:#008037;color:#fff;font-family:inherit;font-size:12.5px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;')}><I d="M20 6L9 17l-5-5" size={14} sw={2.4} />Approve farmer</button>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card>
        <CardHead title="Site users" sub="Farmers · transport · enumerators" />
        <table style={s('width:100%;border-collapse:collapse;font-size:13px;')}>
          <thead><tr><Th>Name</Th><Th>Role</Th><Th>Phone</Th><Th>Status</Th></tr></thead>
          <tbody>{users.map((u, i) => { const [bg, fg] = roleTone[u.role].split('|'); return (
            <tr key={i} style={s('border-bottom:1px solid #E6EBE6;')}>
              <td style={s('padding:13px 18px;color:#0E1A12;font-weight:500;')}>{u.name}</td>
              <td style={s('padding:13px 16px;')}><span style={{ display: 'inline-flex', alignItems: 'center', fontSize: '11.5px', fontWeight: 600, padding: '3px 9px', borderRadius: '6px', background: bg, color: fg }}>{u.role}</span></td>
              <td style={s("padding:13px 16px;font-family:'IBM Plex Mono';font-size:12px;color:#4E5B52;")}>{u.phone}</td>
              <td style={s('padding:13px 18px;')}><Badge status={u.status} /></td>
            </tr>
          ); })}</tbody>
        </table>
      </Card>
    </>
  );
}

const FIELD_TABS = {
  farmer: [['Home', 'home'], ['Logs', 'chart'], ['Market', 'store'], ['Profile', 'user']],
  transport: [['Tasks', 'list'], ['Map', 'map'], ['History', 'chart'], ['Profile', 'user']],
  enumerator: [['Survey', 'map'], ['Farms', 'sprout'], ['Samples', 'flask'], ['Profile', 'user']],
};

function Field({ screen, role, goLogin, openModal, store }) {
  const [tab, setTab] = useState(0);
  const defs = FIELD_TABS[screen] || [];
  return (
    <div data-screen-label="Field role" style={s('height:100vh;display:flex;flex-direction:column;background:#E7EBE6;overflow:hidden;')}>
      <div style={s('height:52px;flex:none;background:#0E1A12;display:flex;align-items:center;justify-content:space-between;padding:0 18px;')}>
        <div style={s('display:flex;align-items:center;gap:10px;')}><span style={s('width:26px;height:26px;border-radius:7px;background:#BD5230;display:flex;align-items:center;justify-content:center;')}><I d={FLAME} size={15} stroke="#fff" /></span><span style={s('font-weight:700;color:#fff;font-size:14px;')}>ABAP</span><span style={{ display: 'inline-flex', alignItems: 'center', height: '28px', padding: '0 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, background: role.bg, color: role.fg }}>{role.label}</span></div>
        <button onClick={goLogin} style={s('height:32px;padding:0 12px;border:1px solid rgba(255,255,255,.16);border-radius:6px;background:rgba(255,255,255,.05);color:#EAF3EC;font-family:inherit;font-size:12.5px;font-weight:600;display:flex;align-items:center;gap:6px;cursor:pointer;')}><I d={['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9']} size={14} />Sign out</button>
      </div>
      <div style={s('flex:1;display:flex;align-items:center;justify-content:center;overflow:auto;padding:22px;')}>
        <div style={s('width:392px;height:792px;flex:none;background:#0E1A12;border-radius:46px;padding:11px;box-shadow:0 30px 60px -20px rgba(14,26,18,.55);')}>
          <div style={s('position:relative;width:100%;height:100%;background:#F7F9F6;border-radius:36px;overflow:hidden;display:flex;flex-direction:column;')}>
            <div style={s("height:40px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 26px;font-family:'IBM Plex Mono';font-size:12px;font-weight:500;color:#0E1A12;")}>
              <span>9:41</span>
              <span style={s('display:flex;align-items:center;gap:5px;')}><svg width="16" height="11" viewBox="0 0 18 12" fill="#0E1A12"><rect x="0" y="7" width="3" height="5" rx="1" /><rect x="5" y="4" width="3" height="8" rx="1" /><rect x="10" y="1.5" width="3" height="10.5" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" opacity="0.3" /></svg><svg width="22" height="11" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3" stroke="#0E1A12" /><rect x="2" y="2" width="15" height="8" rx="1.5" fill="#0E1A12" /><rect x="21.5" y="4" width="2" height="4" rx="1" fill="#0E1A12" /></svg></span>
            </div>
            <div className="abap-phonescroll" style={s('flex:1;overflow-y:auto;')}>
              {screen === 'farmer' && <Farmer tab={tab} openModal={openModal} store={store} />}
              {screen === 'transport' && <Transport tab={tab} openModal={openModal} store={store} />}
              {screen === 'enumerator' && <Enumerator tab={tab} openModal={openModal} />}
            </div>
            <div style={s('height:64px;flex:none;background:#fff;border-top:1px solid #DCE3DD;display:flex;align-items:center;justify-content:space-around;padding:0 6px 6px;')}>
              {defs.map((d, i) => { const on = i === tab; const c = on ? role.accent : '#8C988F'; return (
                <button key={i} onClick={() => setTab(i)} style={s('display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;border:0;background:transparent;cursor:pointer;padding:6px 0;')}>
                  <span style={{ display: 'flex', color: c }}>{icon(d[1], 22)}</span>
                  <span style={{ fontSize: '10.5px', fontWeight: on ? 600 : 500, color: c }}>{d[0]}</span>
                </button>
              ); })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// shared field bits
const Avatar = ({ initials, bg, fg }) => <span style={{ width: '42px', height: '42px', borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, flex: 'none' }}>{initials}</span>;
const FieldHead = ({ over, title, initials, bg, fg }) => <div style={s('display:flex;align-items:center;justify-content:space-between;')}><div><div style={s('font-size:13px;color:#6B786F;')}>{over}</div><div style={s('font-size:21px;font-weight:700;color:#0E1A12;letter-spacing:-.01em;')}>{title}</div></div><Avatar initials={initials} bg={bg} fg={fg} /></div>;
const SectionLabel = ({ children }) => <div style={s('font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;color:#6B786F;margin:20px 2px 10px;')}>{children}</div>;
const Empty = ({ children }) => <div style={s('text-align:center;color:#8C988F;font-size:13px;padding:30px 10px;')}>{children}</div>;
function ProfileCard({ initials, bg, fg, name, role, rows }) {
  return (
    <div style={s('padding:8px 18px 20px;')}>
      <div style={s('display:flex;flex-direction:column;align-items:center;text-align:center;padding:24px 0 18px;')}>
        <span style={{ width: '72px', height: '72px', borderRadius: '50%', background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 700 }}>{initials}</span>
        <div style={s('font-size:19px;font-weight:700;color:#0E1A12;margin-top:12px;')}>{name}</div>
        <div style={s('font-size:12.5px;color:#6B786F;margin-top:3px;')}>{role}</div>
      </div>
      <div style={s('background:#fff;border:1px solid #DCE3DD;border-radius:12px;padding:4px 14px;')}>{rows.map((r, i) => (
        <div key={i} style={s('display:flex;align-items:center;justify-content:space-between;padding:12px 0;' + (i ? 'border-top:1px solid #E6EBE6;' : '') + 'gap:14px;')}><span style={s('font-size:12.5px;color:#6B786F;')}>{r[0]}</span><span style={s('font-size:13px;font-weight:600;color:#0E1A12;text-align:right;')}>{r[1]}</span></div>
      ))}</div>
    </div>
  );
}
const market = [
  { title: 'Biochar manure · 25 kg', sub: 'Nakuru Pyrolysis Site', price: 'KSh 1,250', tag: 'Buyer', iconName: 'leaf', tone: '#DFF1E5|#00682C' },
  { title: 'Raw biomass · maize', sub: 'Listed by you · 60 kg', price: 'KSh 900', tag: 'Seller', iconName: 'sprout', tone: '#FBE9E1|#8F3A1F' },
];
const MarketRow = ({ m }) => { const b = badge(m.tag); const [bg, fg] = m.tone.split('|'); return (
  <div style={s('display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #DCE3DD;border-radius:12px;padding:12px 13px;')}>
    <span style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', background: bg, color: fg }}>{icon(m.iconName, 18)}</span>
    <div style={s('flex:1;min-width:0;')}><div style={s('font-size:13.5px;font-weight:600;color:#0E1A12;')}>{m.title}</div><div style={s('font-size:11.5px;color:#6B786F;margin-top:2px;')}>{m.sub}</div></div>
    <div style={s('text-align:right;')}><div style={s("font-family:'IBM Plex Mono';font-size:13px;font-weight:600;color:#0E1A12;")}>{m.price}</div><span style={{ display: 'inline-block', marginTop: '4px', fontSize: '10px', fontWeight: 600, padding: '2px 7px', borderRadius: '999px', background: b.badge.background, color: b.badge.color }}>{m.tag}</span></div>
  </div>
); };

function Farmer({ tab, openModal, store }) {
  const mine = store.collections.filter((c) => c.farmer === CURRENT_FARMER);
  const active = mine.filter((c) => c.status !== 'Verified');
  const requestCollection = () => openModal({
    title: 'Request collection', subtitle: 'Notify the site that biomass is ready',
    rows: [{ k: 'Material', v: 'Maize cobs' }, { k: 'Pickup', v: 'Bahati ward · 3.2 km' }],
    input: { label: 'Estimated weight', value: '120', suffix: 'kg' },
    note: 'Your request goes to the Site Admin for approval, then a transport operator is assigned.',
    confirm: 'Send request', secondary: 'Cancel', accent: '#BD5230', bg: '#FBE9E1', fg: '#8F3A1F', iconName: 'truck', key: 'req',
    onConfirm: (kg) => store.addCollection({ material: 'Maize cobs', qty: kg, location: 'Bahati ward · 3.2 km' }),
  });
  const statusLine = (c) => c.status === 'Pending' ? 'Awaiting Site Admin approval'
    : c.status === 'Assigned' ? 'Assigned to ' + c.assignedTo + ' for pickup'
      : 'Collected ' + c.recordedKg + ' kg — verify the recorded weight';

  if (tab === 3) return <ProfileCard initials="JK" bg="#FBE9E1" fg="#8F3A1F" name="Joseph Kamau" role="Farmer · Bahati ward" rows={[['Phone', '+254 712 004 118'], ['Farm ID', 'F-2291'], ['Site', 'Nakuru Pyrolysis Site'], ['Polygon', 'Locked · 2.4 ha'], ['Marketplace balance', 'KSh 12,200']]} />;

  if (tab === 1) return (
    <div style={s('padding:8px 18px 20px;')}>
      <FieldHead over="Submission history" title="Logs" initials="JK" bg="#FBE9E1" fg="#8F3A1F" />
      <div style={s('background:#fff;border:1px solid #DCE3DD;border-radius:12px;padding:16px;margin-top:18px;')}>
        <div style={s('display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;')}><div style={s('font-size:14px;font-weight:600;color:#0E1A12;')}>Submission log</div><div style={s("font-family:'IBM Plex Mono';font-size:11px;color:#6B786F;")}>kg / week</div></div>
        {miniBars([45, 80, 60, 120, 95, 140], ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'], '#BD5230')}
        <div style={s('display:flex;flex-direction:column;gap:0;margin-top:8px;')}>{mine.map((c) => (
          <div key={c.id} style={s('display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-top:1px solid #E6EBE6;')}>
            <div><div style={s('font-size:13px;color:#1C2A22;font-weight:500;')}>{c.material}</div><div style={s("font-family:'IBM Plex Mono';font-size:11px;color:#8C988F;margin-top:2px;")}>{c.when}</div></div>
            <div style={s('display:flex;align-items:center;gap:9px;')}><span style={s("font-family:'IBM Plex Mono';font-size:13px;font-weight:500;color:#0E1A12;")}>{(c.recordedKg ?? c.qty)} kg</span><Badge status={c.status} /></div>
          </div>
        ))}</div>
      </div>
    </div>
  );

  if (tab === 2) return (
    <div style={s('padding:8px 18px 20px;')}>
      <FieldHead over="Biochar manure & biomass" title="Market" initials="JK" bg="#FBE9E1" fg="#8F3A1F" />
      <button onClick={() => openModal({ title: 'Request biochar manure', subtitle: 'Order finished biochar for your farm', rows: [{ k: 'Product', v: 'Biochar manure' }, { k: 'Quantity', v: '25 kg' }, { k: 'Price', v: 'KSh 1,250' }], note: 'Payment is deducted from your marketplace balance on fulfilment.', confirm: 'Place order', secondary: 'Cancel', accent: '#BD5230', bg: '#FBE9E1', fg: '#8F3A1F', iconName: 'leaf', key: 'manure' })} style={s('width:100%;height:46px;border:0;border-radius:12px;background:#BD5230;color:#fff;font-family:inherit;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:9px;cursor:pointer;margin:16px 0 6px;')}>{icon('leaf', 18)}Order biochar manure</button>
      <SectionLabel>Listings near you</SectionLabel>
      <div style={s('display:flex;flex-direction:column;gap:10px;')}>{market.map((m, i) => <MarketRow key={i} m={m} />)}</div>
    </div>
  );

  // tab 0 — Home
  return (
    <div style={s('padding:8px 18px 20px;')}>
      <FieldHead over="Habari," title="Joseph Kamau" initials="JK" bg="#FBE9E1" fg="#8F3A1F" />
      <div style={s('display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-top:18px;')}>
        <div style={s('background:#fff;border:1px solid #DCE3DD;border-radius:12px;padding:14px;')}><div style={s('font-size:11.5px;color:#6B786F;')}>Received</div><div style={s("font-family:'IBM Plex Sans Condensed';font-weight:700;font-size:22px;color:#00682C;margin-top:5px;font-variant-numeric:tabular-nums;")}>KSh 18,400</div></div>
        <div style={s('background:#fff;border:1px solid #DCE3DD;border-radius:12px;padding:14px;')}><div style={s('font-size:11.5px;color:#6B786F;')}>Spent</div><div style={s("font-family:'IBM Plex Sans Condensed';font-weight:700;font-size:22px;color:#8F3A1F;margin-top:5px;font-variant-numeric:tabular-nums;")}>KSh 6,200</div></div>
      </div>
      <div style={s('display:flex;flex-direction:column;gap:10px;margin-top:16px;')}>
        <button onClick={requestCollection} style={s('width:100%;height:52px;border:0;border-radius:12px;background:#BD5230;color:#fff;font-family:inherit;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:9px;cursor:pointer;')}>{icon('truck', 19)}Request collection</button>
        <button onClick={() => openModal({ title: 'Request biochar manure', subtitle: 'Order finished biochar for your farm', rows: [{ k: 'Product', v: 'Biochar manure' }, { k: 'Quantity', v: '25 kg' }, { k: 'Price', v: 'KSh 1,250' }], note: 'Payment is deducted from your marketplace balance on fulfilment.', confirm: 'Place order', secondary: 'Cancel', accent: '#BD5230', bg: '#FBE9E1', fg: '#8F3A1F', iconName: 'leaf', key: 'manure' })} style={s('width:100%;height:48px;border:1px solid #BDC6BF;border-radius:12px;background:#fff;color:#1C2A22;font-family:inherit;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:9px;cursor:pointer;')}><span style={s('color:#36433B;')}>{icon('sprout', 18)}</span>Request biochar manure</button>
      </div>
      <SectionLabel>Your collections</SectionLabel>
      {active.length === 0 && <Empty>No active collections. Tap “Request collection”.</Empty>}
      <div style={s('display:flex;flex-direction:column;gap:10px;')}>{active.map((c) => {
        const tone = c.status === 'Pending' ? '#FBEFD2|#F3DFB0|#B57711' : c.status === 'Assigned' ? '#E2F2F6|#CDE5EC|#0B5A6B' : '#DFF1E5|#BFE6CD|#00682C';
        const [bg, bd, fg] = tone.split('|');
        return (
          <div key={c.id} style={{ background: bg, border: '1px solid ' + bd, borderRadius: '12px', padding: '13px 14px' }}>
            <div style={s('display:flex;align-items:center;gap:11px;')}>
              <span style={{ width: '34px', height: '34px', borderRadius: '9px', background: '#fff', color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{icon('truck', 17)}</span>
              <div style={s('flex:1;min-width:0;')}><div style={s('font-size:13px;font-weight:600;color:#0E1A12;')}>{c.material} · {(c.recordedKg ?? c.qty)} kg</div><div style={{ fontSize: '11.5px', color: fg, marginTop: '2px' }}>{statusLine(c)}</div></div>
              <Badge status={c.status} />
            </div>
            {c.status === 'Collected' && <button onClick={() => store.verifyCollection(c.id)} style={s('width:100%;height:38px;border:0;border-radius:8px;background:#008037;color:#fff;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;margin-top:10px;display:flex;align-items:center;justify-content:center;gap:7px;')}><I d="M20 6L9 17l-5-5" size={15} sw={2.3} />Verify {c.recordedKg} kg</button>}
          </div>
        );
      })}</div>
    </div>
  );
}

function Transport({ tab, openModal, store }) {
  const mine = store.collections.filter((c) => c.assignedTo === CURRENT_OP);
  const assigned = mine.filter((c) => c.status === 'Assigned');
  const done = mine.filter((c) => c.status === 'Collected' || c.status === 'Verified');
  const loggedKg = done.reduce((a, c) => a + (c.recordedKg || 0), 0);
  const recordWeight = (c) => openModal({
    title: 'Record collected weight', subtitle: 'Weight reflects back to ' + c.farmer + ' for verification',
    rows: [{ k: 'Farmer', v: c.farmer }, { k: 'Location', v: c.location }, { k: 'Expected', v: c.qty + ' kg' }],
    input: { label: 'Actual weight on scale', value: String(c.qty), suffix: 'kg' },
    note: 'The farmer verifies the recorded weight before it is logged to the site intake.',
    confirm: 'Confirm weight', secondary: 'Cancel', accent: '#0B5A6B', bg: '#E2F2F6', fg: '#0B5A6B', iconName: 'truck', key: 'rec',
    onConfirm: (kg) => store.recordWeight(c.id, kg),
  });

  if (tab === 3) return <ProfileCard initials="DM" bg="#E2F2F6" fg="#0B5A6B" name="Daniel Mwangi" role="Transport · Nakuru" rows={[['Phone', '+254 720 551 902'], ['Vehicle', 'KCA 244Q · 3-tonne'], ['Site', 'Nakuru Pyrolysis Site'], ['Collections logged', String(done.length)], ['Total logged', loggedKg + ' kg']]} />;

  if (tab === 1) return (
    <div style={s('padding:8px 18px 20px;')}>
      <FieldHead over="Today's pickups" title="Map" initials="DM" bg="#E2F2F6" fg="#0B5A6B" />
      <div style={s('background:#fff;border:1px solid #DCE3DD;border-radius:12px;overflow:hidden;margin-top:18px;')}>
        <svg viewBox="0 0 360 200" preserveAspectRatio="xMidYMid meet" style={s('width:100%;display:block;')} role="img" aria-label="Pickup locations">
          <rect x="0" y="0" width="360" height="200" fill="#F1F8F3" />
          {Array.from({ length: 13 }, (_, i) => <line key={'v' + i} x1={i * 30} y1="0" x2={i * 30} y2="200" stroke="#DDEEE2" strokeWidth="1" />)}
          {Array.from({ length: 7 }, (_, i) => <line key={'h' + i} x1="0" y1={i * 30} x2="360" y2={i * 30} stroke="#DDEEE2" strokeWidth="1" />)}
          <path d="M40 170 C 120 120, 160 150, 300 40" fill="none" stroke="#0B5A6B" strokeWidth="2.5" strokeDasharray="3 6" strokeLinecap="round" />
          <circle cx="40" cy="170" r="6" fill="#0B5A6B" stroke="#fff" strokeWidth="2" />
          <text x="40" y="190" textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono" fill="#0B5A6B">site</text>
          {assigned.slice(0, 4).map((c, i) => { const x = 110 + i * 60, y = 140 - i * 30; return <g key={c.id}><circle cx={x} cy={y} r="6" fill="#BD5230" stroke="#fff" strokeWidth="2" /><text x={x} y={y - 10} textAnchor="middle" fontSize="9.5" fontFamily="IBM Plex Sans" fontWeight="600" fill="#1C2A22">{c.farmer.split(' ')[0]}</text></g>; })}
        </svg>
      </div>
      <SectionLabel>Route · {assigned.length} stops</SectionLabel>
      <div style={s('display:flex;flex-direction:column;gap:8px;')}>{assigned.length === 0 ? <Empty>No assigned pickups.</Empty> : assigned.map((c) => (
        <div key={c.id} style={s('display:flex;align-items:center;gap:11px;background:#fff;border:1px solid #DCE3DD;border-radius:10px;padding:11px 13px;')}>
          <span style={s('width:30px;height:30px;border-radius:8px;background:#FBE9E1;color:#8F3A1F;display:flex;align-items:center;justify-content:center;flex:none;')}><I d={['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z']} size={15} /></span>
          <div style={s('flex:1;min-width:0;')}><div style={s('font-size:13px;font-weight:600;color:#0E1A12;')}>{c.farmer}</div><div style={s('font-size:11.5px;color:#6B786F;margin-top:1px;')}>{c.location}</div></div>
          <span style={s("font-family:'IBM Plex Mono';font-size:12.5px;color:#0E1A12;")}>{c.qty} kg</span>
        </div>
      ))}</div>
    </div>
  );

  if (tab === 2) return (
    <div style={s('padding:8px 18px 20px;')}>
      <FieldHead over="Logged & verified" title="History" initials="DM" bg="#E2F2F6" fg="#0B5A6B" />
      <SectionLabel>{done.length} collections · {loggedKg} kg</SectionLabel>
      <div style={s('display:flex;flex-direction:column;gap:10px;')}>{done.length === 0 ? <Empty>No completed collections yet.</Empty> : done.map((c) => (
        <div key={c.id} style={s('background:#fff;border:1px solid #DCE3DD;border-radius:12px;padding:13px 14px;')}>
          <div style={s('display:flex;align-items:flex-start;justify-content:space-between;gap:10px;')}>
            <div style={s('min-width:0;')}><div style={s('font-size:14px;font-weight:600;color:#0E1A12;')}>{c.farmer}</div><div style={s('font-size:12px;color:#6B786F;margin-top:3px;')}>{c.location}</div></div>
            <Badge status={c.status} />
          </div>
          <div style={s('display:flex;align-items:center;justify-content:space-between;margin-top:11px;padding-top:11px;border-top:1px solid #E6EBE6;')}><span style={s('font-size:11px;color:#8C988F;')}>Recorded</span><span style={s("font-family:'IBM Plex Mono';font-size:14px;font-weight:600;color:#0E1A12;")}>{c.recordedKg} kg</span></div>
        </div>
      ))}</div>
    </div>
  );

  // tab 0 — Tasks
  return (
    <div style={s('padding:8px 18px 20px;')}>
      <FieldHead over="Today's tasks" title={assigned.length + ' to collect'} initials="DM" bg="#E2F2F6" fg="#0B5A6B" />
      <div style={s('display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px;margin-top:18px;')}>
        {[[String(assigned.length), 'Assigned', '#0E1A12'], [String(done.length), 'Collected', '#00682C'], [String(loggedKg), 'Logged', '#0E1A12']].map(([v, l, c], i) => (
          <div key={i} style={s('background:#fff;border:1px solid #DCE3DD;border-radius:12px;padding:12px;text-align:center;')}><div style={{ fontFamily: "'IBM Plex Sans Condensed'", fontWeight: 700, fontSize: '22px', color: c }}>{v}{i === 2 && <span style={s("font-size:11px;color:#6B786F;font-family:'IBM Plex Mono';")}> kg</span>}</div><div style={s('font-size:10.5px;color:#6B786F;margin-top:3px;')}>{l}</div></div>
        ))}
      </div>
      <SectionLabel>Assigned collections</SectionLabel>
      {assigned.length === 0 && <Empty>Nothing assigned right now. New approvals from the Site Admin appear here.</Empty>}
      <div style={s('display:flex;flex-direction:column;gap:11px;')}>{assigned.map((c) => (
        <div key={c.id} style={s('background:#fff;border:1px solid #DCE3DD;border-radius:12px;padding:14px;')}>
          <div style={s('display:flex;align-items:flex-start;justify-content:space-between;gap:10px;')}>
            <div style={s('min-width:0;')}><div style={s('font-size:14px;font-weight:600;color:#0E1A12;')}>{c.farmer}</div><div style={s('display:flex;align-items:center;gap:5px;font-size:12px;color:#6B786F;margin-top:3px;')}><I d={['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z']} size={13} style={s('flex:none;')} />{c.location}</div></div>
            <Badge status={c.status} />
          </div>
          <div style={s('display:flex;align-items:center;justify-content:space-between;margin-top:13px;padding-top:13px;border-top:1px solid #E6EBE6;')}>
            <div><div style={s('font-size:11px;color:#8C988F;')}>Expected</div><div style={s("font-family:'IBM Plex Mono';font-size:14px;font-weight:600;color:#0E1A12;margin-top:2px;")}>{c.qty} kg</div></div>
            <button onClick={() => recordWeight(c)} style={s('height:36px;padding:0 14px;border:0;border-radius:7px;background:#0B5A6B;color:#fff;font-family:inherit;font-size:12.5px;font-weight:600;cursor:pointer;flex:none;')}>Record weight</button>
          </div>
        </div>
      ))}</div>
    </div>
  );
}

function Enumerator({ tab, openModal }) {
  const farms = [
    { id: 'F-2291', name: 'Faith Nyambura', region: 'Bahati ward', ha: '2.4 ha', status: 'Verified' },
    { id: 'F-2288', name: 'Mary Wairimu', region: 'Kabatini', ha: '1.8 ha', status: 'Verified' },
    { id: 'F-2284', name: 'Samuel Kiptoo', region: 'Lanet', ha: '3.1 ha', status: 'In review' },
  ];
  const samples = [
    { farm: 'F-2291 · Kamau', ph: '6.2', n: 'Medium', status: 'Verified' },
    { farm: 'F-2288 · Wairimu', ph: '5.8', n: 'Low', status: 'In review' },
    { farm: 'F-2284 · Kiptoo', ph: '6.6', n: 'High', status: 'Verified' },
  ];
  if (tab === 3) return <ProfileCard initials="GA" bg="#F1F8F3" fg="#034A24" name="Grace Achieng" role="Enumerator · Nakuru" rows={[['Phone', '+254 733 887 410'], ['Region', 'Nakuru county'], ['Site', 'Nakuru Pyrolysis Site'], ['Farms enrolled', String(farms.length)], ['Samples taken', String(samples.length)]]} />;

  if (tab === 1) return (
    <div style={s('padding:8px 18px 20px;')}>
      <FieldHead over="Enrolled farms" title="Farms" initials="GA" bg="#F1F8F3" fg="#034A24" />
      <SectionLabel>{farms.length} farms surveyed</SectionLabel>
      <div style={s('display:flex;flex-direction:column;gap:10px;')}>{farms.map((f) => (
        <div key={f.id} style={s('display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #DCE3DD;border-radius:12px;padding:13px;')}>
          <span style={s('width:38px;height:38px;border-radius:9px;background:#F1F8F3;color:#034A24;display:flex;align-items:center;justify-content:center;flex:none;')}>{icon('sprout', 18)}</span>
          <div style={s('flex:1;min-width:0;')}><div style={s('font-size:13.5px;font-weight:600;color:#0E1A12;')}>{f.name}</div><div style={s("font-family:'IBM Plex Mono';font-size:11px;color:#6B786F;margin-top:2px;")}>{f.id} · {f.region} · {f.ha}</div></div>
          <Badge status={f.status} />
        </div>
      ))}</div>
    </div>
  );

  if (tab === 2) return (
    <div style={s('padding:8px 18px 20px;')}>
      <FieldHead over="Soil samples" title="Samples" initials="GA" bg="#F1F8F3" fg="#034A24" />
      <SectionLabel>{samples.length} samples logged</SectionLabel>
      <div style={s('display:flex;flex-direction:column;gap:10px;')}>{samples.map((sm, i) => (
        <div key={i} style={s('display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #DCE3DD;border-radius:12px;padding:13px;')}>
          <span style={s('width:38px;height:38px;border-radius:9px;background:#F1F8F3;color:#034A24;display:flex;align-items:center;justify-content:center;flex:none;')}>{icon('flask', 18)}</span>
          <div style={s('flex:1;min-width:0;')}><div style={s('font-size:13.5px;font-weight:600;color:#0E1A12;')}>{sm.farm}</div><div style={s("font-family:'IBM Plex Mono';font-size:11px;color:#6B786F;margin-top:2px;")}>pH {sm.ph} · N {sm.n}</div></div>
          <Badge status={sm.status} />
        </div>
      ))}</div>
    </div>
  );

  // tab 0 — Survey
  return (
    <div style={s('padding:8px 18px 20px;')}>
      <FieldHead over="Field survey · Nakuru" title="Grace Achieng" initials="GA" bg="#F1F8F3" fg="#034A24" />
      <div style={s('background:#fff;border:1px solid #DCE3DD;border-radius:12px;overflow:hidden;margin-top:18px;')}>
        <div style={s('display:flex;align-items:center;justify-content:space-between;padding:13px 14px;border-bottom:1px solid #E6EBE6;')}><div style={s('font-size:14px;font-weight:600;color:#0E1A12;')}>Farm boundary · F-2291</div><span style={s('display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:600;color:#00682C;background:#DFF1E5;padding:4px 8px;border-radius:999px;')}><I d={['M8 11V7a4 4 0 0 1 8 0v4']} size={11} sw={2.4} />Locked</span></div>
        {farmPolygon()}
      </div>
      <button onClick={() => openModal({ title: 'Enrol new farmer', subtitle: 'Submit a surveyed farmer for approval', rows: [{ k: 'Farmer', v: 'Faith Nyambura' }, { k: 'Farm ID', v: 'F-2291' }, { k: 'Polygon', v: 'Locked · 2.4 ha' }, { k: 'Routes to', v: 'Site Admin · Nakuru' }], note: 'Enrolment is sent to the Site Admin for approval before the account is activated.', confirm: 'Submit for approval', secondary: 'Cancel', accent: '#1E9B4E', bg: '#F1F8F3', fg: '#034A24', iconName: 'users', key: 'enrol' })} style={s('width:100%;height:50px;border:0;border-radius:12px;background:#008037;color:#fff;font-family:inherit;font-size:14.5px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:9px;cursor:pointer;margin-top:14px;')}>{icon('users', 18)}Enrol new farmer</button>
    </div>
  );
}

function ApprovalModal({ modal, closeModal }) {
  const [val, setVal] = useState(modal.input ? modal.input.value : '');
  const confirm = () => { if (modal.onConfirm) modal.onConfirm(val); closeModal(); };
  return (
    <div onClick={closeModal} style={s('position:fixed;inset:0;background:rgba(14,26,18,.45);display:flex;align-items:center;justify-content:center;z-index:60;padding:24px;')}>
      <div className="abap" onClick={(e) => e.stopPropagation()} style={s('background:#fff;border-radius:14px;box-shadow:0 16px 40px -10px rgba(14,26,18,.30);width:100%;max-width:440px;overflow:hidden;')}>
        <div style={s('padding:20px 22px 16px;border-bottom:1px solid #E6EBE6;display:flex;align-items:flex-start;justify-content:space-between;gap:14px;')}>
          <div style={s('display:flex;gap:12px;align-items:center;')}><span style={{ width: '38px', height: '38px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', background: modal.bg || '#DFF1E5', color: modal.fg || '#00682C' }}>{icon(modal.iconName || 'check', 20)}</span><div><h3 style={s('margin:0;font-size:17px;font-weight:600;color:#0E1A12;')}>{modal.title}</h3><div style={s('font-size:12.5px;color:#6B786F;margin-top:3px;')}>{modal.subtitle}</div></div></div>
          <button onClick={closeModal} aria-label="Close" style={s('width:32px;height:32px;border:0;border-radius:7px;background:#EFF3EE;color:#4E5B52;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none;')}><I d="M18 6L6 18M6 6l12 12" size={17} /></button>
        </div>
        <div style={s('padding:18px 22px;')}>
          <div style={s('background:#F7F9F6;border:1px solid #E6EBE6;border-radius:10px;padding:6px 14px;')}>{(modal.rows || []).map((row, i) => (
            <div key={i} style={s('display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid #E6EBE6;gap:14px;')}><span style={s('font-size:12.5px;color:#6B786F;')}>{row.k}</span><span style={s('font-size:13px;font-weight:600;color:#0E1A12;text-align:right;')}>{row.v}</span></div>
          ))}</div>
          {modal.input && (
            <div style={s('margin-top:14px;')}>
              <label style={s('display:block;font-size:12.5px;font-weight:600;color:#1C2A22;margin-bottom:6px;')}>{modal.input.label}</label>
              <div style={s('position:relative;display:flex;align-items:center;')}>
                <input type="number" inputMode="numeric" value={val} onChange={(e) => setVal(e.target.value)} autoFocus style={s("width:100%;height:44px;padding:0 46px 0 13px;font-family:'IBM Plex Mono';font-size:16px;font-weight:600;border:1px solid #BDC6BF;border-radius:8px;background:#fff;color:#0E1A12;outline:none;")} />
                {modal.input.suffix && <span style={s("position:absolute;right:14px;font-family:'IBM Plex Mono';font-size:13px;color:#8C988F;pointer-events:none;")}>{modal.input.suffix}</span>}
              </div>
            </div>
          )}
          {modal.note && <div style={s('display:flex;align-items:center;gap:9px;padding:11px 13px;background:#F1F8F3;border:1px solid #DFF1E5;border-radius:8px;margin-top:14px;')}><I d={['M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z', 'M9 12l2 2 4-4']} size={16} stroke="#00682C" style={s('flex:none;')} /><span style={s('font-size:12.5px;color:#1C2A22;')}>{modal.note}</span></div>}
        </div>
        <div style={s('padding:14px 22px 20px;border-top:1px solid #E6EBE6;display:flex;justify-content:flex-end;gap:10px;')}>
          <button onClick={closeModal} style={s('height:40px;padding:0 16px;border:1px solid #BDC6BF;border-radius:6px;background:#fff;color:#1C2A22;font-family:inherit;font-size:13.5px;font-weight:600;cursor:pointer;')}>{modal.secondary || 'Cancel'}</button>
          <button onClick={confirm} style={{ height: '40px', padding: '0 16px', border: 0, borderRadius: '6px', background: modal.accent || '#008037', color: '#fff', fontFamily: 'inherit', fontSize: '13.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer' }}><I d="M20 6L9 17l-5-5" size={16} sw={2.3} />{modal.confirm || 'Confirm'}</button>
        </div>
      </div>
    </div>
  );
}

export { BiocharPlatform };
