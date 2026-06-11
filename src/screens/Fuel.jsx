/* Verst Carbon dMRV — Fuel type analytics view. */
import React from 'react';
import { FuelBadge, KpiCard, TimeSeriesChart, Badge, Button, Breadcrumb, Icon } from '../designSystem.jsx';
import { VC_DATA } from '../data.js';
import { useDevices } from '../store.jsx';
import { Panel, PageHeader } from '../components/layout.jsx';
import { DefList } from './DeviceDetail.jsx';
import { fuelColor } from './Dashboard.jsx';

const { useState } = React;

function FuelScreen({ role, scope }) {
  const D = VC_DATA;
  const fuels = D.fuelsFor(scope);
  const [active, setActive] = useState(fuels[0]);
  const devices = useDevices(scope).filter(d => d.fuel === active);
  const unit = D.FUEL_UNIT[active];
  const method = D.FUEL_METHOD[active];
  const consumed = Math.round(devices.length * 38 + 240);
  const usageDays = Math.round(devices.length * 26 + 40);
  const sessions = Math.round(devices.length * 31 + 60);

  const series = D.telemetry(D.FUEL_SENSOR[active], active.charCodeAt(0)).map((p, i) => ({ x: p.x, y: Math.round(consumed / 24 + p.y * (active === 'electric' ? 30 : 8)) }));

  return (
    <div>
      <PageHeader
        title="Fuels"
        sub="Per-fuel quantification aligned to Gold Standard monitoring"
        breadcrumb={scope !== 'all' && role === 'admin' ? <Breadcrumb items={[{ label: 'All proponents', href: '#' }, { label: D.proponentName(scope) }, { label: 'Fuels' }]} /> : null}
        actions={<React.Fragment>
          <Button variant="secondary" iconLeft="download">Export CSV</Button>
          <Button iconLeft="file">Monitoring report (PDF)</Button>
        </React.Fragment>}
      />

      {/* fuel selector */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
        {fuels.map(f => (
          <button key={f} onClick={() => setActive(f)} style={{ padding: 0, background: 'none', border: 'none', cursor: 'pointer', outline: f === active ? '2px solid var(--brand-primary)' : 'none', outlineOffset: 2, borderRadius: 999, opacity: f === active ? 1 : 0.6 }}>
            <FuelBadge fuel={f} />
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}>
        <KpiCard label={'Fuel consumed'} value={consumed.toLocaleString()} unit={unit} icon="flame" delta="4.4%" deltaDirection="up" hint="this period" />
        <KpiCard label="Usage days" value={usageDays.toLocaleString()} icon="clock" delta="2.1%" deltaDirection="up" />
        <KpiCard label="Cooking sessions" value={sessions.toLocaleString()} icon="activity" delta="5.8%" deltaDirection="up" />
        <KpiCard label="Active devices" value={devices.length} icon="cpu" hint={D.FUEL_LABEL[active]} />
      </div>

      <Panel title={'Consumption — ' + D.FUEL_LABEL[active]} sub={`Aggregated ${unit} per hour · current monitoring period`} style={{ marginBottom: 18 }}
        actions={<div style={{ display: 'flex', gap: 8 }}>
          <Badge tone={method === 'sensor-direct' ? 'brand' : 'warning'} variant="soft" icon={method === 'sensor-direct' ? 'checkCircle' : 'activity'}>{method === 'sensor-direct' ? 'Sensor-direct' : 'Hybrid quantification'}</Badge>
          <Badge tone="neutral" variant="outline">{D.FUEL_SENSOR[active]}</Badge>
        </div>}>
        <TimeSeriesChart yUnit={unit + '/h'} series={[{ name: D.FUEL_LABEL[active], color: fuelColor(active), data: series }]} height={240} />
      </Panel>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Panel title="Quantification method">
          <DefList items={[
            ['Fuel type', D.FUEL_LABEL[active]],
            ['Reporting unit', unit],
            ['Method', method === 'sensor-direct' ? 'Sensor-direct metering' : 'Hybrid (sensor + survey)'],
            ['Primary sensor', D.FUEL_SENSOR[active]],
            ['Standard', 'Gold Standard — Metered & Measured'],
            ['Data integrity', 'Append-only · immutable'],
          ]} />
        </Panel>
        <Panel title="By proponent" sub={scope === 'all' ? 'Devices on this fuel' : null} pad={false}>
          {(scope === 'all' ? D.PROPONENTS.filter(p => p.fuels.includes(active)) : D.PROPONENTS.filter(p => p.id === scope)).map((p, i, arr) => {
            const c = D.DEVICES.filter(d => d.proponent === p.id && d.fuel === active).length;
            return (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: i === arr.length - 1 ? 'none' : '1px solid var(--border-subtle)' }}>
                <span style={{ flex: 1, fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--ink-900)' }}>{p.name}</span>
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{p.country}</span>
                <Badge tone="neutral">{c} devices</Badge>
              </div>
            );
          })}
        </Panel>
      </div>
    </div>
  );
}


export { FuelScreen };
