/* AFOLU — strata & sample plots (the scope's key monitoring screen).
   Field plots ground-truth the carbon density used in stock estimation. */
import React from 'react';
import { Select, Badge, StatusDot, Button, Breadcrumb } from '../../designSystem.jsx';
import { PageHeader } from '../../components/layout.jsx';
import { AFOLU_DATA } from '../../scopeData.js';

const { useState } = React;
const num = (n) => n.toLocaleString();

function ForestPlots() {
  const { STRATA, PLOTS } = AFOLU_DATA;
  const [stratum, setStratum] = useState('');
  const rows = stratum ? PLOTS.filter(p => p.stratum === stratum) : PLOTS;
  const due = PLOTS.filter(p => p.status === 'due').length;

  return (
    <div>
      <PageHeader title="Strata & sample plots"
        breadcrumb={<Breadcrumb items={[{ label: 'Tsavo REDD+', href: '#' }, { label: 'Strata & plots' }]} />}
        sub={`${STRATA.length} strata · ${PLOTS.length} permanent sample plots · ${due} due for re-measurement`}
        actions={<Button variant="secondary" iconLeft="plus">Add plot</Button>} />

      {/* strata summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 14, marginBottom: 18 }}>
        {STRATA.map(s => (
          <div key={s.name} style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: s.color, flex: 'none' }} />
              <span style={{ fontWeight: 700, color: 'var(--ink-900)', fontSize: 'var(--fs-sm)' }}>{s.name}</span>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
              <div><div style={{ fontFamily: 'var(--font-data)', fontWeight: 800, fontSize: 18 }}>{num(s.areaHa)}</div><div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>hectares</div></div>
              <div><div style={{ fontFamily: 'var(--font-data)', fontWeight: 800, fontSize: 18 }}>{s.densityTcHa}</div><div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>tC / ha</div></div>
            </div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginTop: 8 }}>{s.type}</div>
          </div>
        ))}
      </div>

      <section style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ width: 260 }}>
            <Select size="sm" placeholder="All strata" value={stratum} onChange={e => setStratum(e.target.value)} options={STRATA.map(s => ({ value: s.name, label: s.name }))} />
          </div>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{rows.length} plots</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-data)', fontSize: 'var(--fs-sm)' }}>
            <thead><tr style={{ background: 'var(--grey-050)', textAlign: 'left' }}>
              {[['Plot', 0], ['Stratum', 0], ['Coordinates', 0], ['Measured tC/ha', 1], ['Last visit', 0], ['Status', 0]].map(([h, r], i) => (
                <th key={i} style={{ padding: '10px 14px', textAlign: r ? 'right' : 'left', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{rows.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink-900)' }}>{p.id}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-sans)', color: 'var(--text-body)' }}>{p.stratum}</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{p.lat.toFixed(3)}, {p.lng.toFixed(3)}</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, color: 'var(--ink-900)' }}>{p.measuredTcHa}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}>{p.lastVisit}</td>
                <td style={{ padding: '10px 14px' }}>
                  <Badge tone={p.status === 'measured' ? 'success' : 'warning'} variant="soft" icon={p.status === 'measured' ? 'checkCircle' : 'clock'}>
                    {p.status === 'measured' ? 'Measured' : 'Due'}
                  </Badge>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export { ForestPlots };
