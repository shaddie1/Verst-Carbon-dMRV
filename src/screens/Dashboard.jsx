/* Verst Carbon dMRV — Dashboard. Admin "all proponents" + scoped variant.
   Proponent role uses the same layout with no switcher. */
import React from 'react';
import { KpiCard as DKpi, StackedBarChart, Badge as DBadge, Breadcrumb as DCrumb, Button as DButton, Icon as DIcon, FuelBadge as DFuel } from '../designSystem.jsx';
import { VC_DATA } from '../data.js';
import { Panel, PageHeader, FuelChips, MapPanel } from '../components/layout.jsx';

const { useState: dUse } = React;

function fuelColor(f) {
  return { biomass: 'var(--fuel-biomass)', electric: 'var(--fuel-electric)', lpg: 'var(--fuel-lpg)', ethanol: 'var(--fuel-ethanol)', pellets: 'var(--fuel-pellets)', biogas: 'var(--fuel-biogas)', biochar: 'var(--fuel-biochar)' }[f];
}

function DashboardScreen({ role, scope, onScopeChange, onNav }) {
  const D = VC_DATA;
  const devices = D.scopeDevices(scope);
  const alerts = D.scopeAlerts(scope);
  const allFuels = D.fuelsFor(scope);
  const [fuelSel, setFuelSel] = dUse([]);
  const scoped = scope !== 'all' && role === 'admin';

  const shown = fuelSel.length ? devices.filter(d => fuelSel.includes(d.fuel)) : devices;
  const online = shown.filter(d => d.status === 'online').length;
  const offline = shown.filter(d => d.status === 'offline').length;
  const fault = shown.filter(d => d.status === 'fault').length;
  const consumption = Math.round(shown.length * 142 + 2300);
  const tco2e = Math.round(shown.length * 13.1);

  // chart: all -> per-proponent stacked by fuel; scoped -> per-fuel single bars
  let chartData, chartTitle;
  if (scope === 'all') {
    chartTitle = 'Devices by fuel type, per proponent';
    chartData = D.PROPONENTS.map(p => ({
      label: p.name.split(' ')[0],
      segments: p.fuels.map(f => ({ key: f, value: devices.filter(d => d.proponent === p.id && d.fuel === f).length, color: fuelColor(f) })).filter(s => s.value > 0),
    }));
  } else {
    chartTitle = 'Devices by fuel type';
    chartData = allFuels.map(f => ({ label: D.FUEL_LABEL[f].split(' ')[0], segments: [{ key: f, value: devices.filter(d => d.fuel === f).length, color: fuelColor(f) }] }));
  }

  return (
    <div>
      <PageHeader
        title={scoped ? D.proponentName(scope) : 'Overview'}
        sub={scoped
          ? `${devices.length} devices · ${D.fuelsFor(scope).length} fuel types · ${D.PROPONENTS.find(p => p.id === scope).country}`
          : role === 'proponent'
            ? `${D.proponentName(scope)} · current monitoring period (1–7 Jun 2026)`
            : 'All proponents · current monitoring period (1–7 Jun 2026)'}
        breadcrumb={scoped ? <DCrumb items={[{ label: 'All proponents', href: '#' }, { label: D.proponentName(scope) }]} /> : null}
        actions={<React.Fragment>
          <DButton variant="secondary" iconLeft="download">Export</DButton>
          <DButton iconLeft="file" onClick={() => onNav('reports')}>Monitoring report</DButton>
        </React.Fragment>}
      />

      {allFuels.length > 1 && (
        <div style={{ marginBottom: 18 }}>
          <FuelChips fuels={allFuels} selected={fuelSel} onToggle={(f) => setFuelSel(s => s.includes(f) ? s.filter(x => x !== f) : s.concat(f))} />
        </div>
      )}

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: scope === 'all' ? 'repeat(5,1fr)' : 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}>
        <DKpi label="Active devices" value={shown.length.toLocaleString()} icon="cpu" delta="3.2%" deltaDirection="up" hint="vs last period" />
        <DKpi label="Devices online" value={online} unit={'of ' + shown.length} icon="wifi" delta={(offline + fault) + ' down'} deltaDirection={offline + fault > 0 ? 'down' : 'flat'} />
        {scope === 'all' && <DKpi label="Proponents" value={D.PROPONENTS.length} icon="users" hint="2 onboarding" />}
        <DKpi label="Fuel consumed" value={consumption.toLocaleString()} unit="kg-eq" icon="flame" delta="4.4%" deltaDirection="up" />
        <DKpi label="Estimated emissions" value={tco2e.toLocaleString()} unit="tCO₂e" icon="leaf" delta="6.1%" deltaDirection="up" />
      </div>

      {/* Chart + map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 18, marginBottom: 18 }}>
        <Panel title={chartTitle} sub="Active devices · current monitoring period" actions={<DBadge tone="brand" variant="soft">{shown.length} devices</DBadge>}>
          <StackedBarChart yUnit="devices" data={chartData} height={236} />
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
            {allFuels.map(f => (
              <span key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: fuelColor(f) }} />{D.FUEL_LABEL[f]}
              </span>
            ))}
          </div>
        </Panel>
        <Panel title="Device deployments" sub={scope === 'all' ? 'East & West Africa' : D.PROPONENTS.find(p => p.id === scope).country} pad={false}>
          <div style={{ padding: 16 }}>
            <MapPanel devices={shown} geo={D.GEO} proponentName={D.proponentName} />
          </div>
        </Panel>
      </div>

      {/* End-use across fuels */}
      {(() => {
        const catFuels = fuelSel.length ? allFuels.filter(f => fuelSel.includes(f)) : allFuels;
        const tot = { household: shown.filter(d => d.category === 'household').length, institution: shown.filter(d => d.category === 'institution').length };
        return (
          <Panel title="End-use across fuels" sub="Household vs institutional deployments, every fuel type" style={{ marginBottom: 18 }}
            actions={<div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', fontWeight: 600 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--grey-400)' }} /><DIcon name="home" size={13} />{tot.household} households</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', fontWeight: 600 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--fuel-electric)' }} /><DIcon name="building" size={13} />{tot.institution} institutions</span>
            </div>}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 32px' }}>
              {catFuels.map(f => {
                const hh = shown.filter(d => d.fuel === f && d.category === 'household').length;
                const inst = shown.filter(d => d.fuel === f && d.category === 'institution').length;
                const total = hh + inst || 1;
                return (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 150, flex: 'none' }}><DFuel fuel={f} short /></div>
                    <div style={{ flex: 1, display: 'flex', height: 10, borderRadius: 999, overflow: 'hidden', background: 'var(--grey-100)' }}>
                      <span style={{ width: (hh / total * 100) + '%', background: 'var(--grey-400)' }} />
                      <span style={{ width: (inst / total * 100) + '%', background: 'var(--fuel-electric)' }} />
                    </div>
                    <span style={{ width: 86, flex: 'none', textAlign: 'right', fontSize: 'var(--fs-xs)', fontFamily: 'var(--font-data)', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--ink-900)', fontWeight: 600 }}>{hh}</span> hh · <span style={{ color: 'var(--fuel-electric-strong)', fontWeight: 600 }}>{inst}</span> inst
                    </span>
                  </div>
                );
              })}
            </div>
          </Panel>
        );
      })()}

      {/* Alerts feed */}
      <Panel title="Alerts" sub="Device offline > 72h · sensor anomalies · battery / TEG faults" pad={false}
        actions={<button onClick={() => onNav('alerts')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--brand-primary)' }}>View all</button>}>
        {alerts.length === 0
          ? <div style={{ padding: 28, textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>No active alerts for this proponent.</div>
          : alerts.slice(0, 5).map((a, i) => <AlertRow key={a.id} a={a} role={role} scope={scope} last={i === Math.min(4, alerts.length - 1)} proponentName={D.proponentName} />)}
      </Panel>
    </div>
  );
}

function AlertRow({ a, role, scope, last, proponentName }) {
  const [h, setH] = dUse(false);
  const icon = a.type === 'offline' ? 'wifi' : a.type === 'battery' ? 'battery' : 'activity';
  const tone = a.severity;
  const col = tone === 'danger' ? 'var(--danger-500)' : 'var(--warning-500)';
  const bg = tone === 'danger' ? 'var(--danger-050)' : 'var(--warning-050)';
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: last ? 'none' : '1px solid var(--border-subtle)', background: h ? 'var(--surface-hover)' : 'transparent' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 8, background: bg, color: col, flex: 'none' }}><DIcon name={icon} size={16} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--ink-900)' }}>{a.title}</div>
        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.detail}</div>
      </div>
      {role === 'admin' && scope === 'all' && <DBadge tone="neutral" size="sm">{proponentName(a.proponent)}</DBadge>}
      <DBadge tone={tone} size="sm" variant="soft">{a.type}</DBadge>
      <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', minWidth: 48, textAlign: 'right' }}>{a.time}</span>
    </div>
  );
}

Object.assign(window, { DashboardScreen, fuelColor });

export { fuelColor, DashboardScreen, AlertRow };
