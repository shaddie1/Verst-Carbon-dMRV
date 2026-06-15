/* Waste Management (Scope 13) — Biochar carbon removal dashboard.
   Carbon removed = biochar mass × carbon fraction × permanence × 44/12. */
import React from 'react';
import { KpiCard, StackedBarChart, Badge, StatusDot, Button, Icon } from '../../designSystem.jsx';
import { PageHeader, Panel } from '../../components/layout.jsx';
import { WASTE_DATA } from '../../scopeData.js';

const CHARCOAL = '#4b4f57';
const num = (n) => n.toLocaleString();

function BiocharDashboard({ onNav }) {
  const t = WASTE_DATA.totals();
  const chartData = WASTE_DATA.MONTHLY.map(m => ({ label: m.label, segments: [{ key: 'b', value: m.value, color: CHARCOAL }] }));

  // mass-balance figures for the carbon-removal panel
  const carbonInBiochar = +(t.biochar * 0.78).toFixed(0);   // tonnes C locked in biochar
  const co2e = t.co2;

  return (
    <div>
      <PageHeader title="Biochar carbon removal" sub="Waste Management · Scope 13 · feedstock → biochar mass balance (PyCCS)"
        actions={<React.Fragment>
          <Button variant="secondary" iconLeft="download">Export</Button>
          <Button iconLeft="package" onClick={() => onNav('/waste/production')}>Production log</Button>
        </React.Fragment>} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 18 }}>
        <KpiCard label="Biochar produced" value={num(t.biochar)} unit="t" icon="package" delta="6.2%" deltaDirection="up" hint="this period" />
        <KpiCard label="Feedstock processed" value={num(t.feedstock)} unit="t" icon="sprout" hint="biomass residues" />
        <KpiCard label="Carbon removed" value={num(t.co2)} unit="tCO₂e" icon="leaf" delta="durable CDR" deltaDirection="up" />
        <KpiCard label="Active facilities" value={`${t.facilitiesOnline}/${t.facilities}`} icon="cpu" hint="pyrolysis units" />
        <KpiCard label="Avg carbon yield" value={t.yieldPct} unit="%" icon="activity" hint="biochar / feedstock" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18, marginBottom: 18 }}>
        <Panel title="Monthly biochar production" sub="tonnes · current year"
          actions={<Badge tone="neutral" variant="soft">{t.batches} batches</Badge>}>
          <StackedBarChart yUnit="t" data={chartData} height={236} />
        </Panel>

        <Panel title="Carbon-removal mass balance" sub="How removals are quantified">
          <Flow label="Feedstock processed" value={`${num(t.feedstock)} t`} note="Biomass residues (shells, husks, prunings)" icon="sprout" />
          <Arrow note={`Pyrolysis · ~${t.yieldPct}% biochar yield`} />
          <Flow label="Biochar produced" value={`${num(t.biochar)} t`} note="Stable carbon matrix" icon="package" />
          <Arrow note="× 78% carbon · × 90% permanence (100-yr)" />
          <Flow label="Carbon locked" value={`${num(carbonInBiochar)} t C`} note="Durable, oxidation-resistant" icon="leaf" />
          <Arrow note="× 44/12 (C → CO₂)" />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 'var(--radius-md)', background: CHARCOAL, color: '#fff', marginTop: 4 }}>
            <span style={{ fontWeight: 700 }}>Verified removals</span>
            <span style={{ fontFamily: 'var(--font-data)', fontWeight: 800, fontSize: 20 }}>{num(co2e)} <span style={{ fontSize: 13, opacity: 0.8 }}>tCO₂e</span></span>
          </div>
        </Panel>
      </div>

      <Panel title="Facilities" sub="Pyrolysis units onboarded to the dMRV platform" pad={false}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
          <thead><tr style={{ background: 'var(--grey-050)' }}>
            {['Facility', 'County', 'Technology', 'Capacity (t/yr)', 'Status'].map((h, i) => (
              <th key={i} style={{ textAlign: i === 3 ? 'right' : 'left', padding: '11px 16px', fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{WASTE_DATA.FACILITIES.map((f, i) => (
            <tr key={f.id} style={{ borderBottom: i === WASTE_DATA.FACILITIES.length - 1 ? 'none' : '1px solid var(--border-subtle)' }}>
              <td style={{ padding: '11px 16px', fontWeight: 600, color: 'var(--ink-900)' }}>{f.name} <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontFamily: 'var(--font-data)' }}>· {f.id}</span></td>
              <td style={{ padding: '11px 16px', color: 'var(--text-secondary)' }}>{f.county}</td>
              <td style={{ padding: '11px 16px', color: 'var(--text-body)' }}>{f.tech}</td>
              <td style={{ padding: '11px 16px', textAlign: 'right', fontFamily: 'var(--font-data)', color: 'var(--text-body)' }}>{num(f.capacityTpa)}</td>
              <td style={{ padding: '11px 16px' }}><StatusDot status={f.status === 'online' ? 'online' : 'offline'} showLabel /></td>
            </tr>
          ))}</tbody>
        </table>
      </Panel>
    </div>
  );
}

function Flow({ label, value, note, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--surface-card)' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: '#ecedef', color: '#4b4f57', flex: 'none' }}><Icon name={icon} size={18} /></span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: 'var(--ink-900)' }}>{label}</div>
        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{note}</div>
      </div>
      <span style={{ fontFamily: 'var(--font-data)', fontWeight: 700, color: 'var(--ink-900)' }}>{value}</span>
    </div>
  );
}

function Arrow({ note }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0 4px 16px', color: 'var(--text-muted)' }}>
      <Icon name="chevronDown" size={14} />
      <span style={{ fontSize: 'var(--fs-2xs)' }}>{note}</span>
    </div>
  );
}

export { BiocharDashboard };
