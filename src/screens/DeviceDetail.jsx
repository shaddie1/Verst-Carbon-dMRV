/* Verst Carbon dMRV — Device detail. Header + tabbed sections. */
import React from 'react';
import { Tabs as TTabs, TimeSeriesChart as TChart, FuelBadge as TFuel, StatusDot as TStatus, Badge as TBadge, Button as TButton, IconButton as TIconBtn, SignalBars as TSignal, LevelMeter as TLevel, Breadcrumb as TCrumb, Icon as TIcon, Alert as TAlert } from '../designSystem.jsx';
import { VC_DATA } from '../data.js';
import { Panel, CategoryTag } from '../components/layout.jsx';

const { useState: ddUse } = React;

function DeviceDetailScreen({ role, scope, imei, onBack }) {
  const D = VC_DATA;
  const d = D.DEVICES.find(x => x.imei === imei) || D.DEVICES[0];
  const [tab, setTab] = ddUse('telemetry');
  const sessions = D.cookingSessions(d.imei.charCodeAt(8));
  const series = D.telemetry(d.sensor, d.imei.charCodeAt(6));
  const yUnit = { Thermocouple: '°C', 'Energy meter': 'kWh', 'Flow meter': 'm³/h', 'Load cell': 'kg' }[d.sensor];
  const seriesName = { Thermocouple: 'Pot temperature', 'Energy meter': 'Energy draw', 'Flow meter': 'Biogas flow', 'Load cell': 'Fuel mass' }[d.sensor];

  return (
    <div>
      <div style={{ marginBottom: 14 }}>
        <TCrumb items={[
          ...(role === 'admin' ? [{ label: scope === 'all' ? 'All proponents' : D.proponentName(scope), href: '#' }] : []),
          { label: 'Devices', href: '#' },
          { label: D.fmtImei(d.imei) },
        ]} />
      </div>

      {/* header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 18 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: 12, background: 'var(--green-050)', color: 'var(--brand-primary)', flex: 'none' }}><TIcon name="cpu" size={26} /></span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink-900)', fontFamily: 'var(--font-data)', letterSpacing: '0', whiteSpace: 'nowrap' }}>{D.fmtImei(d.imei)}</h1>
            <TFuel fuel={d.fuel} />
            <CategoryTag category={d.category} />
            <TStatus status={d.status} showLabel pulse={d.status === 'online'} />
          </div>
          <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 4 }}>{d.model} ({d.modelId}) · {d.sensor} sensor · {d.site} · {d.town}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flex: 'none' }}>
          <TButton variant="secondary" iconLeft="download">Export</TButton>
          <TButton variant="secondary" iconLeft="settings">Configure</TButton>
        </div>
      </div>

      {/* quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}>
        <MiniStat label="Battery" value={d.battery + '%'} extra={<TLevel value={d.battery} width={80} showValue={false} />} />
        <MiniStat label="TEG output" value={(0.4 + d.teg / 100 * 1.6).toFixed(1) + ' V'} extra={<TLevel value={d.teg} width={80} showValue={false} />} />
        <MiniStat label="Signal" value={['None', 'Weak', 'Fair', 'Good', 'Strong'][d.signal]} extra={<TSignal level={d.signal} />} />
        <MiniStat label="Last seen" value={window.lastSeenText(d.lastSeenMin)} extra={<span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.status === 'online' ? 'Reporting normally' : 'Awaiting telemetry'}</span>} />
      </div>

      <TTabs value={tab} onChange={setTab} style={{ marginBottom: 18 }} tabs={[
        { value: 'telemetry', label: 'Telemetry', icon: 'activity' },
        { value: 'sessions', label: 'Cooking sessions', count: sessions.length },
        { value: 'household', label: 'End-use' },
        { value: 'history', label: 'Device history' },
        { value: 'config', label: 'Configuration' },
      ]} />

      {tab === 'telemetry' && (
        <Panel title={'Telemetry — ' + seriesName.toLowerCase()} sub={`${d.sensor} node · last 24 hours`} actions={<TBadge tone="brand" variant="soft">{D.FUEL_METHOD[d.fuel] === 'sensor-direct' ? 'Sensor-direct' : 'Hybrid quantification'}</TBadge>}>
          <TChart yUnit={yUnit} series={[{ name: seriesName, color: window.fuelColor(d.fuel), data: series }]} height={250} />
        </Panel>
      )}

      {tab === 'sessions' && (
        <Panel title="Detected cooking sessions" sub="Automatically segmented from raw telemetry" pad={false}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-data)', fontSize: 'var(--fs-sm)' }}>
            <thead><tr style={{ background: 'var(--grey-050)' }}>
              {['Session', 'Date', 'Start', 'Duration', 'Fuel consumed', 'Peak ' + (yUnit === '°C' ? 'temp' : 'rate')].map((h, i) => <th key={i} style={{ textAlign: i > 1 ? 'right' : 'left', padding: '10px 16px', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>{h}</th>)}
            </tr></thead>
            <tbody>{sessions.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '10px 16px', fontWeight: 600, color: 'var(--ink-900)' }}>#{String(s.id).padStart(3, '0')}</td>
                <td style={{ padding: '10px 16px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>{s.date}</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', color: 'var(--text-body)' }}>{s.start}</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', color: 'var(--text-body)' }}>{s.duration} min</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontWeight: 600, color: 'var(--ink-900)' }}>{s.fuel} {D.FUEL_UNIT[d.fuel]}</td>
                <td style={{ padding: '10px 16px', textAlign: 'right', color: 'var(--text-secondary)' }}>{s.peak}{yUnit === '°C' ? '°C' : ''}</td>
              </tr>
            ))}</tbody>
          </table>
        </Panel>
      )}

      {tab === 'household' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Panel title={d.category === 'institution' ? 'Institution' : 'Household'}
            actions={<CategoryTag category={d.category} />}>
            <DefList items={d.category === 'institution'
              ? [['Institution', d.site], ['Type', 'School / clinic'], ['Location', d.town + ', ' + D.PROPONENTS.find(p => p.id === d.proponent).country], ['Cooks / staff', '12'], ['Meals per day', '~600'], ['Baseline fuel', 'Firewood (bulk)'], ['Enrolled', d.installed]]
              : [['Household ID', d.site], ['Location', d.town + ', ' + D.PROPONENTS.find(p => p.id === d.proponent).country], ['Members', '5'], ['Primary cook', 'Female, 34'], ['Baseline fuel', 'Three-stone fire'], ['Enrolled', d.installed]]} />
          </Panel>
          <Panel title="Linked devices">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 8, background: 'var(--green-050)', color: 'var(--brand-primary)' }}><TIcon name="cpu" size={18} /></span>
              <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontFamily: 'var(--font-data)', fontSize: 'var(--fs-sm)' }}>{D.fmtImei(d.imei)}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{d.model}</div></div>
              <TStatus status={d.status} />
            </div>
          </Panel>
        </div>
      )}

      {tab === 'history' && (
        <Panel title="Assignment & maintenance log" pad={false}>
          <Timeline items={[
            { icon: 'check', tone: 'success', title: 'Device commissioned', detail: 'Assigned to ' + d.household + ' · ' + d.town, time: d.installed },
            { icon: 'users', tone: 'brand', title: 'Proponent assigned', detail: D.proponentName(d.proponent), time: d.installed },
            { icon: 'settings', tone: 'neutral', title: 'Firmware updated to v2.4.1', detail: 'OTA · no downtime', time: '2025-11-12' },
            { icon: 'activity', tone: 'warning', title: 'Sensor recalibrated', detail: d.sensor + ' offset corrected (+0.3)', time: '2026-02-03' },
            ...(d.status !== 'online' ? [{ icon: 'wifi', tone: 'danger', title: 'Connectivity lost', detail: 'Last telemetry received', time: 'recent' }] : []),
          ]} />
        </Panel>
      )}

      {tab === 'config' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Panel title="Configuration">
            <DefList items={[['Model', d.model], ['Config ID', d.modelId], ['Sensor type', d.sensor], ['Secure element', '0x' + d.imei.slice(-6).toUpperCase()], ['Sampling interval', '60 s'], ['Reporting interval', '15 min'], ['Firmware', 'v2.4.1']]} />
          </Panel>
          <Panel title="Quantification">
            <TAlert tone="neutral" icon="file" title="Raw telemetry is immutable" style={{ marginBottom: 14 }}>Stored values are append-only and cannot be edited — only quantified.</TAlert>
            <DefList items={[['Fuel type', D.FUEL_LABEL[d.fuel]], ['Method', D.FUEL_METHOD[d.fuel] === 'sensor-direct' ? 'Sensor-direct' : 'Hybrid (sensor + survey)'], ['Reporting unit', D.FUEL_UNIT[d.fuel]], ['Standard', 'Gold Standard — Metered & Measured']]} />
          </Panel>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value, extra }) {
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px 16px', boxShadow: 'var(--shadow-xs)' }}>
      <div style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--ink-900)', fontFamily: 'var(--font-data)', margin: '4px 0 8px' }}>{value}</div>
      {extra}
    </div>
  );
}

function DefList({ items }) {
  return (
    <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
      {items.map(([k, v], i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '9px 0', borderBottom: i < items.length - (items.length % 2 === 0 ? 2 : 1) ? '1px solid var(--border-subtle)' : 'none', gridColumn: '1 / -1' }}>
          <dt style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>{k}</dt>
          <dd style={{ margin: 0, fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--ink-900)', textAlign: 'right', fontFamily: 'var(--font-sans)' }}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Timeline({ items }) {
  const toneCol = { success: 'var(--success-500)', brand: 'var(--brand-primary)', neutral: 'var(--grey-400)', warning: 'var(--warning-500)', danger: 'var(--danger-500)' };
  return (
    <div style={{ padding: '6px 16px' }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: i === items.length - 1 ? 6 : 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 999, background: '#fff', border: '1.5px solid ' + toneCol[it.tone], color: toneCol[it.tone], flex: 'none' }}><TIcon name={it.icon} size={14} /></span>
            {i < items.length - 1 && <span style={{ width: 1.5, flex: 1, minHeight: 22, background: 'var(--border-subtle)' }} />}
          </div>
          <div style={{ paddingTop: 3, paddingBottom: 14 }}>
            <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--ink-900)' }}>{it.title}</div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{it.detail} · <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-data)' }}>{it.time}</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { DeviceDetailScreen });

export { DeviceDetailScreen, MiniStat, DefList, Timeline };
