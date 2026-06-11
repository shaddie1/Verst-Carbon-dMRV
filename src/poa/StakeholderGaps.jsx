/* Kenya PoA — Stakeholder Impact Gaps.
   For each implementing partner (VPA) it shows the 5-year ambition vs what
   they are on track to reach at the current run-rate, the resulting gap, and
   an interactive set of stakeholder support levers. Toggling a lever shows how
   that support closes the gap toward the target — so stakeholders can see
   exactly where they help. Figures are illustrative placeholders. */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../designSystem.jsx';
import { INK, GREEN, GREEN_700, DEEP, LEAF, MUTED, LINE, WARN, SectionHead, section, PoaNav, PoaFooter } from './chrome.jsx';
import './poa.css';

const { useState } = React;

// Stakeholder support levers (shared metadata). Per-partner contributions live
// on each partner's `levers` map keyed by these ids.
const LEVERS = [
  { id: 'finance', label: 'Carbon pre-finance', who: 'Carbon buyers & climate funders', icon: 'trendingUp', how: 'Forward-purchase GS-VERs / provide upfront working capital to scale device distribution faster.' },
  { id: 'county', label: 'County distribution', who: 'County governments', icon: 'mapPin', how: 'Open last-mile channels — public facilities, ward networks and community barazas across counties.' },
  { id: 'demand', label: 'Awareness & demand', who: 'NGOs, CBOs & SACCOs', icon: 'users', how: 'Community mobilisation, behaviour-change campaigns and consumer financing to drive adoption.' },
  { id: 'grant', label: 'Results-based grant', who: 'Donors & DFIs', icon: 'checkCircle', how: 'Output-based subsidy that de-risks first units and reaches lower-income households.' },
];

// 5-year ambition per VPA. `target`/`projected`/`achieved` are households reached
// (the headline "scale"); `co2` in tCO₂e and `devices` are supporting metrics.
const PARTNERS = [
  {
    letter: 'V', name: 'Verst Energies Kenya', id: 'VPN-VERST-001', fuel: 'E-Cooking', counties: 12,
    target: 220000, projected: 165000, achieved: 48000,
    co2: { projected: 410000, target: 540000 }, devices: { projected: 165000, target: 220000 }, financeGapUSD: 3.2e6,
    levers: { finance: 28000, county: 16000, demand: 9000, grant: 12000 },
  },
  {
    letter: 'J', name: 'Jiko Clean Cooking', id: 'VPN-JIKO-002', fuel: 'E-Cooking · LPG', counties: 22,
    target: 300000, projected: 150000, achieved: 30000,
    co2: { projected: 360000, target: 720000 }, devices: { projected: 150000, target: 300000 }, financeGapUSD: 6.5e6,
    levers: { finance: 70000, county: 40000, demand: 25000, grant: 30000 },
  },
  {
    letter: 'M', name: 'Mwango Energy', id: 'VPN-MWANGO-003', fuel: 'Briquettes & Pellets', counties: 30,
    target: 120000, projected: 96000, achieved: 22000,
    co2: { projected: 150000, target: 190000 }, devices: { projected: 96000, target: 120000 }, financeGapUSD: 1.4e6,
    levers: { finance: 12000, county: 8000, demand: 6000, grant: 6000 },
  },
  {
    letter: 'P', name: 'Pwani Biogas', id: 'VPN-PWANI-004', fuel: 'Biogas · Improved Biomass', counties: 6,
    target: 60000, projected: 27000, achieved: 7000,
    co2: { projected: 95000, target: 210000 }, devices: { projected: 27000, target: 60000 }, financeGapUSD: 4.1e6,
    levers: { finance: 16000, county: 9000, demand: 6000, grant: 8000 },
  },
  {
    letter: 'K', name: 'Kenya Verst Test', id: 'VPN-KENYA-005', fuel: 'E-Cooking · LPG', counties: 47,
    target: 180000, projected: 178000, achieved: 60000,
    co2: { projected: 430000, target: 440000 }, devices: { projected: 178000, target: 180000 }, financeGapUSD: 0.3e6,
    levers: { finance: 4000, county: 3000, demand: 2000, grant: 2000 },
  },
];

const k = (n) => (n >= 1000 ? +(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k' : '' + n);
const usd = (n) => '$' + (n / 1e6).toFixed(1) + 'M';
const statusOf = (ratio) => ratio >= 0.9
  ? { label: 'On track', bg: '#e8f6ec', fg: '#1f7a3d' }
  : ratio >= 0.65
    ? { label: 'Needs support', bg: '#fdf2e0', fg: '#b06f00' }
    : { label: 'Significant gap', bg: '#fdeceb', fg: '#c0392b' };

function StakeholderGaps() {
  const navigate = useNavigate();
  const agg = PARTNERS.reduce((a, p) => ({ target: a.target + p.target, projected: a.projected + p.projected }), { target: 0, projected: 0 });
  const aggGap = agg.target - agg.projected;

  return (
    <div className="poa">
      <PoaNav />

      {/* intro */}
      <section className="poa-hero">
        <div className="poa-shell" style={{ padding: '72px 24px 64px' }}>
          <div className="poa-eyebrow" style={{ color: LEAF }}>Stakeholder engagement</div>
          <h1 style={{ fontSize: 48, fontWeight: 900, marginTop: 16, maxWidth: 860 }}>
            5-year impact gaps <span className="poa-amber-text">— and how you can help</span>
          </h1>
          <p style={{ marginTop: 18, fontSize: 18, lineHeight: 1.6, maxWidth: 760, color: 'rgba(255,255,255,0.8)' }}>
            Every VPA commits to a 5-year ambition under the PoA. At today's run-rate, many fall short of
            that target. This page shows each partner's projected reach against its goal — and lets you
            see exactly how stakeholder support closes the gap. Toggle the levers on each card.
          </p>
        </div>
      </section>

      {/* programme aggregate */}
      <section style={{ background: DEEP, color: '#fff' }}>
        <div className="poa-shell" style={{ padding: '44px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20, marginBottom: 22 }}>
            {[['Combined 5-year target', k(agg.target), 'households'], ['Projected at run-rate', k(agg.projected), 'households'], ['Collective gap', k(aggGap), `${Math.round(aggGap / agg.target * 100)}% short of target`]].map(([t, v, s], i) => (
              <div key={t}>
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{t}</div>
                <div style={{ fontSize: 38, fontWeight: 900, marginTop: 6, color: i === 2 ? '#ffd9a8' : '#fff', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 16, borderRadius: 999, background: 'rgba(255,255,255,0.12)', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: `${agg.projected / agg.target * 100}%`, background: GREEN }} />
            <div style={{ flex: 1, background: 'repeating-linear-gradient(45deg, rgba(224,138,30,0.55), rgba(224,138,30,0.55) 7px, rgba(224,138,30,0.3) 7px, rgba(224,138,30,0.3) 14px)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            <span>Projected reach</span><span>Programme-wide gap to 2031 target</span>
          </div>
        </div>
      </section>

      {/* how stakeholders help */}
      <section style={section({ paddingTop: 64, paddingBottom: 28 })}>
        <div className="poa-shell">
          <SectionHead eyebrow="Who can help" title="Four ways stakeholders close the gap"
            sub="Each lever below maps to a stakeholder group. On every partner card you can switch these on to see how much of that partner's gap they would close." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px,1fr))', gap: 18 }}>
            {LEVERS.map(l => (
              <div key={l.id} className="poa-card" style={{ padding: 22 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 10, background: 'rgba(0,128,55,0.1)', color: GREEN }}><Icon name={l.icon} size={20} /></span>
                <h3 style={{ fontSize: 16, fontWeight: 800, marginTop: 12 }}>{l.label}</h3>
                <div style={{ fontSize: 12, fontWeight: 700, color: GREEN, marginTop: 2 }}>{l.who}</div>
                <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.5, color: MUTED }}>{l.how}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* per-partner gap cards */}
      <section style={section({ paddingTop: 28 })}>
        <div className="poa-shell">
          <SectionHead eyebrow="By implementing partner" title="Where each VPA stands"
            sub="The bar runs from zero to the partner's 5-year target. Green is the projected run-rate; toggle support to fill the moss segment and shrink the gap." />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {PARTNERS.map(p => <GapCard key={p.id} p={p} navigate={navigate} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(160deg, ${DEEP}, ${GREEN_700})`, color: '#fff' }}>
        <div className="poa-shell" style={{ padding: '64px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 32, fontWeight: 900 }}>Help close a gap</h2>
          <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.55, color: 'rgba(255,255,255,0.75)', maxWidth: 600, margin: '12px auto 0' }}>
            Buyers, counties, donors and community organisations can each move a partner closer to its
            5-year goal. Register your interest and the Clean Cooking Unit will connect you to a VPA.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 26 }}>
            <button className="poa-btn poa-btn--primary" onClick={() => navigate('/apply')}>Register stakeholder interest</button>
            <button className="poa-btn poa-btn--ghost" onClick={() => navigate('/')}>Back to programme</button>
          </div>
        </div>
      </section>

      <PoaFooter />
    </div>
  );
}

function GapCard({ p, navigate }) {
  const [sel, setSel] = useState({});
  const toggle = (id) => setSel(s => ({ ...s, [id]: !s[id] }));
  const support = LEVERS.reduce((sum, l) => sum + (sel[l.id] ? p.levers[l.id] : 0), 0);
  const withSupport = Math.min(p.target, p.projected + support);
  const gapRemaining = Math.max(0, p.target - withSupport);
  const met = gapRemaining === 0;
  const st = statusOf(p.projected / p.target);

  const pPro = p.projected / p.target * 100;
  const pSup = (withSupport - p.projected) / p.target * 100;
  const pGap = gapRemaining / p.target * 100;
  const pToday = p.achieved / p.target * 100;

  const Stat = ({ label, proj, tgt, fmt = k }) => {
    const short = tgt - proj;
    return (
      <div style={{ flex: 1, minWidth: 130 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTED }}>{label}</div>
        <div style={{ fontSize: 16, fontWeight: 800, marginTop: 3 }}>{fmt(proj)} <span style={{ color: MUTED, fontWeight: 600, fontSize: 13 }}>/ {fmt(tgt)}</span></div>
        <div style={{ fontSize: 11.5, color: short > 0 ? '#b06f00' : '#1f7a3d', fontWeight: 700 }}>{short > 0 ? `${fmt(short)} short` : 'on target'}</div>
      </div>
    );
  };

  return (
    <div className="poa-card" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: `1px solid ${LINE}` }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 12, background: 'rgba(0,128,55,0.1)', color: GREEN, fontWeight: 900, fontSize: 18, flex: 'none' }}>{p.letter}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 17 }}>{p.name}</div>
          <div style={{ fontSize: 12, color: MUTED, fontWeight: 700 }}>{p.id} · {p.fuel} · {p.counties} counties</div>
        </div>
        <span style={{ padding: '5px 11px', borderRadius: 999, fontSize: 12, fontWeight: 800, background: st.bg, color: st.fg }}>{st.label}</span>
      </div>

      <div style={{ padding: 22 }}>
        {/* gap bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: MUTED, marginBottom: 7 }}>
          <span>Households reached (5-year)</span>
          <span>Target {k(p.target)}</span>
        </div>
        <div style={{ position: 'relative', height: 26, borderRadius: 999, background: '#eef0ef', overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: pPro + '%', background: GREEN, transition: 'width 220ms ease' }} title="Projected at run-rate" />
          <div style={{ width: pSup + '%', background: LEAF, transition: 'width 220ms ease' }} title="With selected support" />
          <div style={{ width: pGap + '%', background: 'repeating-linear-gradient(45deg, #fbe6c6, #fbe6c6 6px, #f6d49b 6px, #f6d49b 12px)', transition: 'width 220ms ease' }} title="Remaining gap" />
          {pToday > 1 && pToday < 99 && (
            <div style={{ position: 'absolute', left: pToday + '%', top: -2, bottom: -2, width: 2, background: 'rgba(20,24,31,0.45)' }} title={`Achieved to date: ${k(p.achieved)}`} />
          )}
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 10, fontSize: 12, color: MUTED }}>
          <Legend color={GREEN} label={`Projected ${k(p.projected)}`} />
          <Legend color={LEAF} label={`With support +${k(withSupport - p.projected)}`} />
          <Legend hatch label={met ? 'Gap closed' : `Gap ${k(gapRemaining)}`} />
          <span style={{ marginLeft: 'auto', fontWeight: 800, color: met ? '#1f7a3d' : INK }}>
            {met ? '🎯 5-year target met with this support' : `${Math.round(withSupport / p.target * 100)}% of target`}
          </span>
        </div>

        {/* levers */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED, marginBottom: 10 }}>Toggle stakeholder support — see the gap close</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {LEVERS.map(l => {
              const on = !!sel[l.id];
              return (
                <button key={l.id} onClick={() => toggle(l.id)} title={`${l.who} — ${l.how}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 13px', borderRadius: 10, cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: 13, fontWeight: 700, textAlign: 'left',
                    border: `1px solid ${on ? GREEN : LINE}`,
                    background: on ? 'rgba(0,128,55,0.08)' : '#fff', color: on ? GREEN_700 : INK,
                    transition: 'all 140ms ease',
                  }}>
                  <Icon name={on ? 'checkCircle' : l.icon} size={16} style={{ color: on ? GREEN : MUTED }} />
                  <span>
                    {l.label}
                    <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: on ? GREEN : MUTED }}>+{k(p.levers[l.id])} homes · {l.who}</span>
                  </span>
                </button>
              );
            })}
            {support > 0 && (
              <button onClick={() => setSel({})} className="poa-link" style={{ border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, alignSelf: 'center' }}>Reset</button>
            )}
          </div>
        </div>

        {/* supporting metrics */}
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 20, paddingTop: 18, borderTop: `1px solid ${LINE}` }}>
          <Stat label="tCO₂e (5-yr)" proj={p.co2.projected} tgt={p.co2.target} />
          <Stat label="Devices" proj={p.devices.projected} tgt={p.devices.target} />
          <div style={{ flex: 1, minWidth: 130 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTED }}>Finance gap</div>
            <div style={{ fontSize: 16, fontWeight: 800, marginTop: 3 }}>{usd(p.financeGapUSD)}</div>
            <div style={{ fontSize: 11.5, color: MUTED, fontWeight: 700 }}>to fully fund scale-up</div>
          </div>
          <button className="poa-btn poa-btn--dark" style={{ alignSelf: 'center', padding: '10px 16px' }} onClick={() => navigate('/apply')}>Support this VPA</button>
        </div>
      </div>
    </div>
  );
}

function Legend({ color, hatch, label }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 12, height: 12, borderRadius: 3, background: hatch ? 'repeating-linear-gradient(45deg, #fbe6c6, #fbe6c6 3px, #f6d49b 3px, #f6d49b 6px)' : color }} />
      {label}
    </span>
  );
}

export { StakeholderGaps };
