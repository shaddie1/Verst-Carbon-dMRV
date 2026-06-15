/* Cross-scope portfolio overview — aggregates the three sectoral scopes the
   platform spans, split by avoidance vs removal. Figures are sourced from each
   scope's own data so the portfolio stays consistent with the scope dashboards.
   A landscape REDD+ genuinely dwarfs the cooking/biochar pilots, so the by-scope
   comparison uses labelled, range-tolerant bars. All figures are illustrative. */
import React from 'react';
import { KpiCard, Badge, Button, Icon } from '../../designSystem.jsx';
import { PageHeader } from '../../components/layout.jsx';
import { SECTORS, WASTE_DATA, AFOLU_DATA } from '../../scopeData.js';
import { VC_DATA } from '../../data.js';

const SCOPES = SECTORS.filter(s => s.id !== 'portfolio');

// Emission reductions per scope, from each scope's own dataset (tCO₂e).
const ER = {
  energy: Math.round(VC_DATA.DEVICES.length * 13.1),
  waste: WASTE_DATA.totals().co2,
  afolu: AFOLU_DATA.totals().erTco2e,
};

const fmt = (n) => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e4 ? Math.round(n / 1e3) + 'k' : n.toLocaleString();

function PortfolioOverview({ onNav }) {
  const total = ER.energy + ER.waste + ER.afolu;
  const removal = ER.waste;
  const avoidance = ER.energy + ER.afolu;
  const max = Math.max(ER.energy, ER.waste, ER.afolu);

  return (
    <div>
      <PageHeader title="Carbon portfolio" sub="All sectoral scopes · current monitoring period · Verst Carbon"
        actions={<Button variant="secondary" iconLeft="download">Export</Button>} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}>
        <KpiCard label="Total emission reductions" value={fmt(total)} unit="tCO₂e" icon="leaf" delta="across 3 scopes" deltaDirection="flat" />
        <KpiCard label="Avoidance" value={fmt(avoidance)} unit="tCO₂e" icon="trendingDown" hint="Energy + AFOLU" />
        <KpiCard label="Removal (CDR)" value={fmt(removal)} unit="tCO₂e" icon="package" hint="Biochar — durable" />
        <KpiCard label="Sectoral scopes" value="3" icon="dashboard" hint="Energy · Waste · AFOLU" />
      </div>

      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)', marginBottom: 18 }}>
        <header style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: 'var(--fs-h3)', fontWeight: 700, color: 'var(--ink-900)' }}>Emission reductions by sectoral scope</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 2 }}>tCO₂e · current vintage · the Tsavo REDD+ landscape dominates programme-wide reductions</div>
        </header>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {SCOPES.map(s => {
            const v = ER[s.id];
            const w = Math.max(2, Math.round(v / max * 100));
            return (
              <div key={s.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: 6, background: s.color + '1a', color: s.color }}><Icon name={s.icon} size={13} /></span>
                  <span style={{ fontWeight: 600, color: 'var(--ink-900)', fontSize: 'var(--fs-sm)' }}>{s.label}</span>
                  <Badge tone={s.erKind === 'removal' ? 'neutral' : 'success'} variant="soft">{s.erKind === 'removal' ? 'Removal' : 'Avoidance'}</Badge>
                  <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-data)', fontWeight: 700, color: 'var(--ink-900)' }}>{v.toLocaleString()} <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>tCO₂e</span></span>
                </div>
                <div style={{ height: 12, borderRadius: 999, background: 'var(--grey-100)', overflow: 'hidden' }}>
                  <div style={{ width: w + '%', height: '100%', background: s.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* scope cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {SCOPES.map(s => (
          <div key={s.id} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)', padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: 10, background: s.color + '18', color: s.color, flex: 'none' }}><Icon name={s.icon} size={21} /></span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: 'var(--ink-900)' }}>{s.label}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Scope {s.scopeNo} · {s.programme}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-data)', fontSize: 28, fontWeight: 800, color: 'var(--ink-900)' }}>{fmt(ER[s.id])}</span>
              <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>tCO₂e</span>
              <span style={{ marginLeft: 'auto' }}>
                <Badge tone={s.erKind === 'removal' ? 'neutral' : 'success'} variant="soft">{s.erKind === 'removal' ? 'Removal' : 'Avoidance'}</Badge>
              </span>
            </div>
            <Button variant="secondary" fullWidth iconRight="chevronRight" onClick={() => onNav(s.home)}>Open {s.short} scope</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export { PortfolioOverview };
