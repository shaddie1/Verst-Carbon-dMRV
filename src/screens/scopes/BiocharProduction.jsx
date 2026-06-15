/* Waste Management — biochar production log (the scope's key monitoring screen).
   Each batch is a mass-balance record feeding the carbon-removal total. */
import React from 'react';
import { Select, Badge, Button, Breadcrumb, EmptyState } from '../../designSystem.jsx';
import { PageHeader } from '../../components/layout.jsx';
import { WASTE_DATA } from '../../scopeData.js';

const { useState } = React;
const num = (n) => n.toLocaleString();

function BiocharProduction({ onNav }) {
  const D = WASTE_DATA;
  const [facility, setFacility] = useState('');
  const [status, setStatus] = useState('');

  let rows = D.BATCHES;
  if (facility) rows = rows.filter(b => b.facility === facility);
  if (status) rows = rows.filter(b => b.status === status);
  const removed = rows.filter(b => b.status === 'verified').reduce((s, b) => s + b.co2Removed, 0);

  return (
    <div>
      <PageHeader title="Production log"
        breadcrumb={<Breadcrumb items={[{ label: 'Biochar', href: '#' }, { label: 'Production log' }]} />}
        sub={`${D.BATCHES.length} batches · ${Math.round(removed).toLocaleString()} tCO₂e verified (filtered)`}
        actions={<Button variant="secondary" iconLeft="download">Export CSV</Button>} />

      <section style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ width: 220 }}>
            <Select size="sm" placeholder="All facilities" value={facility} onChange={e => setFacility(e.target.value)} options={D.FACILITIES.map(f => ({ value: f.id, label: f.name }))} />
          </div>
          <div style={{ width: 160 }}>
            <Select size="sm" placeholder="All statuses" value={status} onChange={e => setStatus(e.target.value)} options={[{ value: 'verified', label: 'Verified' }, { value: 'in-progress', label: 'In progress' }]} />
          </div>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{rows.length} shown</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-data)', fontSize: 'var(--fs-sm)' }}>
            <thead><tr style={{ background: 'var(--grey-050)', textAlign: 'left' }}>
              {[['Batch', 0], ['Facility', 0], ['Feedstock', 0], ['Feedstock t', 1], ['Biochar t', 1], ['C %', 1], ['Permanence', 1], ['tCO₂e removed', 1], ['Status', 0]].map(([h, r], i) => (
                <th key={i} style={{ padding: '10px 14px', textAlign: r ? 'right' : 'left', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{rows.map((b, i) => (
              <tr key={b.id} style={{ borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink-900)' }}>{b.id}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-sans)', color: 'var(--text-body)', whiteSpace: 'nowrap' }}>{b.facilityName}</td>
                <td style={{ padding: '10px 14px', fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}>{b.feedstock}</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: 'var(--text-body)' }}>{b.feedstockMass}</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, color: 'var(--ink-900)' }}>{b.biocharMass}</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: 'var(--text-secondary)' }}>{Math.round(b.carbonFraction * 100)}%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', color: 'var(--text-secondary)' }}>{Math.round(b.permanence * 100)}%</td>
                <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: 'var(--ink-900)' }}>{b.co2Removed}</td>
                <td style={{ padding: '10px 14px' }}>
                  <Badge tone={b.status === 'verified' ? 'success' : 'warning'} variant="soft" icon={b.status === 'verified' ? 'checkCircle' : 'clock'}>
                    {b.status === 'verified' ? 'Verified' : 'In progress'}
                  </Badge>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        {rows.length === 0 && <EmptyState icon="search" compact title="No batches" description="Clear the filters to see all production batches." />}
      </section>
    </div>
  );
}

export { BiocharProduction };
