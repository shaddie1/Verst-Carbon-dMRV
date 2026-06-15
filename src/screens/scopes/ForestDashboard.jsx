/* Land Use & Forestry / AFOLU (Scope 14) — Tsavo REDD+ dashboard (partner KWS).
   Avoided deforestation: baseline (expected loss) vs project (protected). */
import React from 'react';
import { KpiCard, StackedBarChart, TimeSeriesChart, Badge, Button, Icon } from '../../designSystem.jsx';
import { PageHeader, Panel } from '../../components/layout.jsx';
import { AFOLU_DATA } from '../../scopeData.js';

const FOREST = '#1f7a3d';
const num = (n) => n.toLocaleString();

function ForestDashboard({ onNav }) {
  const { PROJECT, STRATA, COVER } = AFOLU_DATA;
  const t = AFOLU_DATA.totals();

  const coverSeries = [
    { name: 'Project (protected)', color: FOREST, data: COVER.map(c => ({ x: c.label, y: c.project })) },
    { name: 'Baseline (expected loss)', color: '#b4b4b4', data: COVER.map(c => ({ x: c.label, y: c.baseline })) },
  ];
  const stockData = STRATA.map(s => ({ label: s.name.split(' ')[0], segments: [{ key: s.name, value: Math.round(s.areaHa * s.densityTcHa / 1000), color: s.color }] }));

  return (
    <div>
      <PageHeader title={PROJECT.name} sub={`${PROJECT.landscape} · ${PROJECT.partner} · ${PROJECT.methodology}`}
        actions={<React.Fragment>
          <Button variant="secondary" iconLeft="download">Export</Button>
          <Button iconLeft="mapPin" onClick={() => onNav('/afolu/plots')}>Strata & plots</Button>
        </React.Fragment>} />

      {/* project summary strip */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, padding: '14px 18px', marginBottom: 18, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)' }}>
        {[['Project area', num(PROJECT.areaHa) + ' ha'], ['Crediting period', PROJECT.crediting], ['Methodology', PROJECT.methodology], ['Partner', PROJECT.partner]].map(([k, v]) => (
          <div key={k}>
            <div style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{k}</div>
            <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--ink-900)', marginTop: 3 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 18 }}>
        <KpiCard label="Forest cover" value={num(t.forestCoverHa)} unit="ha" icon="sprout" delta={t.coverPct + '% of area'} deltaDirection="flat" />
        <KpiCard label="Avoided deforestation" value={num(t.avoidedHa)} unit="ha" icon="leaf" delta="vs baseline" deltaDirection="up" />
        <KpiCard label="Carbon stock" value={num(Math.round(t.carbonStockTc / 1e6)) + 'M'} unit="tC" icon="package" hint="above + below ground" />
        <KpiCard label="Emission reductions" value={num(Math.round(t.erTco2e / 1000)) + 'k'} unit="tCO₂e" icon="trendingDown" delta="avoidance" deltaDirection="up" />
        <KpiCard label="Sample plots" value={t.plots} icon="mapPin" hint={`${t.strata} strata`} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
        <Panel title="Forest cover — baseline vs project" sub="hectares · remote sensing (forest-cover change)"
          actions={<Badge tone="success" variant="soft">Deforestation averted</Badge>}>
          <TimeSeriesChart yUnit="ha" series={coverSeries} height={236} area={false} />
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
            {coverSeries.map(s => (
              <span key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>
                <span style={{ width: 14, height: 3, borderRadius: 2, background: s.color }} />{s.name}
              </span>
            ))}
          </div>
        </Panel>

        <Panel title="Carbon stock by stratum" sub="thousand tonnes C (area × density)">
          <StackedBarChart yUnit="kt C" data={stockData} height={236} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
            {STRATA.map(s => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-xs)' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, flex: 'none' }} />
                <span style={{ flex: 1, color: 'var(--text-body)' }}>{s.name}</span>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-data)' }}>{num(s.areaHa)} ha · {s.densityTcHa} tC/ha</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

export { ForestDashboard };
