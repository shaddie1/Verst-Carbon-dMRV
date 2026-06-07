/* Verst Carbon dMRV — Reports. Monitoring period selector, Gold
   Standard parameter summary, export, audit-trail note. */
import React from 'react';
import { Select, Button, Badge, Alert, Breadcrumb, Icon, FuelBadge } from '../designSystem.jsx';
import { VC_DATA } from '../data.js';
import { Panel, PageHeader } from '../components/layout.jsx';

const { useState } = React;

function ReportsScreen({ role, scope }) {
  const D = VC_DATA;
  const fuels = D.fuelsFor(scope);
  const devices = D.scopeDevices(scope);

  const rows = fuels.map(f => {
    const ds = devices.filter(d => d.fuel === f);
    const consumed = Math.round(ds.length * 38 + 240);
    return {
      fuel: f,
      devices: ds.length,
      deviceDays: ds.length * 30,
      consumed,
      unit: D.FUEL_UNIT[f],
      usageRate: (1.2 + (f.charCodeAt(0) % 9) / 10).toFixed(2),
      method: D.FUEL_METHOD[f],
      tco2e: Math.round(consumed * 0.31),
    };
  });
  const totalCo2 = rows.reduce((a, r) => a + r.tco2e, 0);

  return (
    <div>
      <PageHeader
        title="Reports"
        sub="Monitoring report aligned to Gold Standard Metered &amp; Measured methodology"
        breadcrumb={scope !== 'all' && role === 'admin' ? <Breadcrumb items={[{ label: 'All proponents', href: '#' }, { label: D.proponentName(scope) }, { label: 'Reports' }]} /> : null}
        actions={<React.Fragment>
          <Button variant="secondary" iconLeft="download">Export CSV</Button>
          <Button iconLeft="file">Generate PDF</Button>
        </React.Fragment>}
      />

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
        <div style={{ width: 220 }}>
          <Select label="Monitoring period" defaultValue="2026-06" options={[{ value: '2026-06', label: '1 – 7 June 2026 (current)' }, { value: '2026-05', label: 'May 2026' }, { value: '2026-q1', label: 'Q1 2026' }]} />
        </div>
        <div style={{ width: 200 }}>
          <Select label="Methodology" defaultValue="gs" options={[{ value: 'gs', label: 'Gold Standard — M&M' }, { value: 'cdm', label: 'CDM AMS-II.G' }]} />
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Estimated emissions reductions</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--green-700)', fontFamily: 'var(--font-data)' }}>{totalCo2.toLocaleString()} <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>tCO₂e</span></div>
        </div>
      </div>

      <Panel title="Parameter summary" sub="Per fuel type · current monitoring period" pad={false} style={{ marginBottom: 18 }}
        actions={<Badge tone="brand" variant="soft" icon="checkCircle">Verified telemetry</Badge>}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-data)', fontSize: 'var(--fs-sm)' }}>
          <thead><tr style={{ background: 'var(--grey-050)' }}>
            {['Fuel type', 'Devices', 'Device-days', 'Fuel consumed', 'Usage rate', 'Method', 'tCO₂e'].map((h, i) => (
              <th key={i} style={{ textAlign: i === 0 ? 'left' : 'right', padding: '11px 16px', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.fuel} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '11px 16px' }}><FuelBadge fuel={r.fuel} size="sm" /></td>
                <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text-body)' }}>{r.devices}</td>
                <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text-body)' }}>{r.deviceDays.toLocaleString()}</td>
                <td style={{ padding: '11px 16px', textAlign: 'right', fontWeight: 600, color: 'var(--ink-900)' }}>{r.consumed.toLocaleString()} {r.unit}</td>
                <td style={{ padding: '11px 16px', textAlign: 'right', color: 'var(--text-body)' }}>{r.usageRate} {r.unit}/day</td>
                <td style={{ padding: '11px 16px', textAlign: 'right' }}><Badge size="sm" tone={r.method === 'sensor-direct' ? 'brand' : 'warning'} variant="soft">{r.method === 'sensor-direct' ? 'Sensor-direct' : 'Hybrid'}</Badge></td>
                <td style={{ padding: '11px 16px', textAlign: 'right', fontWeight: 700, color: 'var(--green-700)' }}>{r.tco2e.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr style={{ background: 'var(--grey-050)' }}>
            <td style={{ padding: '11px 16px', fontWeight: 700, fontFamily: 'var(--font-sans)', color: 'var(--ink-900)' }}>Total</td>
            <td style={{ padding: '11px 16px', textAlign: 'right', fontWeight: 700 }}>{rows.reduce((a, r) => a + r.devices, 0)}</td>
            <td style={{ padding: '11px 16px', textAlign: 'right', fontWeight: 700 }}>{rows.reduce((a, r) => a + r.deviceDays, 0).toLocaleString()}</td>
            <td colSpan={3}></td>
            <td style={{ padding: '11px 16px', textAlign: 'right', fontWeight: 800, color: 'var(--green-700)' }}>{totalCo2.toLocaleString()}</td>
          </tr></tfoot>
        </table>
      </Panel>

      <Alert tone="neutral" icon="file" title="Audit trail">
        Raw telemetry is immutable and append-only. This report reflects quantified values derived from sealed device readings; the underlying measurements cannot be altered after capture. Export hash recorded on generation.
      </Alert>
    </div>
  );
}


export { ReportsScreen };
