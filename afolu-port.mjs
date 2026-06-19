// Ports the AFOLU dMRV Platform mockup into src/afolu/.
// data.js -> afoluData.js (verbatim, sets window.DMRV).
// ui/map/views1-3/app concatenated -> afoluApp.jsx with targeted shell transforms
// (strip the design-only tweaks panel + global theme effect, add onBack, export
// instead of createRoot). View/map/ui code is copied verbatim.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';

const SRC = 'design_handoff_afolu_dmrv/design';
const rd = (f) => readFileSync(`${SRC}/${f}`, 'utf8').replace(/\r\n/g, '\n');

mkdirSync('src/afolu', { recursive: true });
mkdirSync('public/afolu', { recursive: true });

// 1. data
writeFileSync('src/afolu/afoluData.js', '/* eslint-disable */\n' + rd('data.js'));

// 2. transform app.jsx
let app = rd('app.jsx');
// drop the global theme-application effect (CSS is fixed dark, scoped to .afolu)
app = app.replace(/\n\s*\/\/ apply tweaks to CSS[\s\S]*?\}, \[t\.dark, t\.accent, t\.font, t\.density\]\);\n/, '\n');
// App takes an onBack prop
app = app.replace('function App() {', 'function App({ onBack }) {');
// inject a "back to sectoral scopes" link above the nav
app = app.replace(
  /<nav style=\{\{ padding: '12px 14px', flex: 1,/,
  `<button onClick={onBack} className="nav-item" style={{ margin: '10px 14px 0' }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
        <span>Sectoral scopes</span>
      </button>
      <nav style={{ padding: '12px 14px', flex: 1,`
);
// remove the design-only Tweaks panel block
app = app.replace(/\n\s*\{\/\* Tweaks \*\/\}\s*\n\s*<TweaksPanel>[\s\S]*?<\/TweaksPanel>\n/, '\n');
// remove the standalone render call (we export instead)
app = app.replace("ReactDOM.createRoot(document.getElementById('root')).render(<App />);", '');

// 3. concatenate the app module
const head = `/* AFOLU dMRV platform — ported (concatenated) from the mockup's ui/map/views/app.
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

`;
const section = (label, body) => `\n// ======================= ${label} =======================\n${body.trim()}\n`;
const out = head
  + section('ui.jsx', rd('ui.jsx'))
  + section('map.jsx', rd('map.jsx'))
  + section('views1.jsx', rd('views1.jsx'))
  + section('views2.jsx', rd('views2.jsx'))
  + section('views3.jsx', rd('views3.jsx'))
  + section('app.jsx', app)
  + '\nexport { App as AfoluApp };\n';
writeFileSync('src/afolu/afoluApp.jsx', out);

// 4. logo assets
for (const f of ['verst-logo-dark.png', 'verst-logo-light.png']) {
  try { copyFileSync(`${SRC}/assets/${f}`, `public/afolu/${f}`); console.log('copied', f); } catch (e) { console.log('skip', f); }
}

console.log('Wrote src/afolu/afoluData.js, src/afolu/afoluApp.jsx (' + out.split('\n').length + ' lines)');
