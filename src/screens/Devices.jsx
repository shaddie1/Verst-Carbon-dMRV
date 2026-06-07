/* Verst Carbon dMRV — Devices list. Filterable table; admin sees a
   Proponent column and bulk actions. Search by IMEI. */
import React from 'react';
import { FuelBadge as VFuel, StatusDot as VStatus, SignalBars as VSignal, LevelMeter as VLevel, Input as VInput, Select as VSelect, Button as VButton, IconButton as VIconBtn, Checkbox as VCheck, Badge as VBadge, Icon as VIcon, Breadcrumb as VCrumb, EmptyState as VEmpty } from '../designSystem.jsx';
import { VC_DATA } from '../data.js';
import { PageHeader, CategoryTag } from '../components/layout.jsx';

const { useState: devUse } = React;

function DevicesScreen({ role, scope, onOpenDevice, onRegister }) {
  const D = VC_DATA;
  const all = D.scopeDevices(scope);
  const fuels = D.fuelsFor(scope);
  const [q, setQ] = devUse('');
  const [fuel, setFuel] = devUse('');
  const [status, setStatus] = devUse('');
  const [cat, setCat] = devUse('');
  const [sel, setSel] = devUse([]);

  let rows = all;
  if (q) rows = rows.filter(d => d.imei.includes(q.replace(/\s/g, '')) || d.household.toLowerCase().includes(q.toLowerCase()));
  if (fuel) rows = rows.filter(d => d.fuel === fuel);
  if (status) rows = rows.filter(d => d.status === status);
  if (cat) rows = rows.filter(d => d.category === cat);

  const allSel = rows.length > 0 && sel.length === rows.length;
  const someSel = sel.length > 0 && !allSel;
  function toggleAll() { setSel(allSel ? [] : rows.map(r => r.imei)); }
  function toggle(imei) { setSel(s => s.includes(imei) ? s.filter(x => x !== imei) : s.concat(imei)); }

  const cols = role === 'admin' && scope === 'all';

  return (
    <div>
      <PageHeader
        title="Devices"
        sub={`${all.length} devices${scope === 'all' ? ' across ' + D.PROPONENTS.length + ' proponents' : ''}`}
        breadcrumb={scope !== 'all' && role === 'admin' ? <VCrumb items={[{ label: 'All proponents', href: '#' }, { label: D.proponentName(scope) }, { label: 'Devices' }]} /> : null}
        actions={<React.Fragment>
          <VButton variant="secondary" iconLeft="download">Export</VButton>
          <VButton iconLeft="plus" onClick={onRegister}>Register device</VButton>
        </React.Fragment>}
      />

      <section style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)', overflow: 'hidden' }}>
        {/* toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ width: 280 }}>
            <VInput size="sm" iconLeft="search" placeholder="Search by IMEI or site…" value={q} onChange={e => setQ(e.target.value)} />
          </div>
          <div style={{ width: 168 }}>
            <VSelect size="sm" placeholder="All fuels" value={fuel} onChange={e => setFuel(e.target.value)} options={fuels.map(f => ({ value: f, label: D.FUEL_LABEL[f] }))} />
          </div>
          <div style={{ width: 150 }}>
            <VSelect size="sm" placeholder="All statuses" value={status} onChange={e => setStatus(e.target.value)} options={[{ value: 'online', label: 'Online' }, { value: 'offline', label: 'Offline' }, { value: 'fault', label: 'Fault' }]} />
          </div>
          <div style={{ width: 168 }}>
            <VSelect size="sm" placeholder="All end-use" value={cat} onChange={e => setCat(e.target.value)} options={[{ value: 'household', label: 'Households' }, { value: 'institution', label: 'Institutions' }]} />
          </div>
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{rows.length} shown</span>
          <VIconBtn icon="filter" variant="outline" label="More filters" />
        </div>

        {/* bulk action bar */}
        {sel.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 16px', background: 'var(--green-tint)', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--green-700)' }}>{sel.length} selected</span>
            <div style={{ flex: 1 }} />
            <VButton size="sm" variant="secondary" iconLeft="download">Export selected</VButton>
            <VButton size="sm" variant="secondary" iconLeft="users">Reassign</VButton>
            <VButton size="sm" variant="danger">Decommission</VButton>
          </div>
        )}

        {/* table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-data)', fontSize: 'var(--fs-sm)' }}>
            <thead>
              <tr style={{ background: 'var(--grey-050)', textAlign: 'left' }}>
                <Th style={{ width: 38, paddingLeft: 16 }}><VCheck checked={allSel} indeterminate={someSel} onChange={toggleAll} /></Th>
                <Th>IMEI</Th>
                <Th>Model / config</Th>
                <Th>Fuel</Th>
                {cols && <Th>Proponent</Th>}
                <Th>Site</Th>
                <Th>End-use</Th>
                <Th>Status</Th>
                <Th>Last seen</Th>
                <Th>Battery</Th>
                <Th>Signal</Th>
                <Th style={{ width: 44 }}></Th>
              </tr>
            </thead>
            <tbody>
              {rows.map(d => (
                <Row key={d.imei} d={d} cols={cols} selected={sel.includes(d.imei)} onToggle={() => toggle(d.imei)} onOpen={() => onOpenDevice(d.imei)} proponentName={D.proponentName} fmtImei={D.fmtImei} />
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <VEmpty icon="search" compact title="No devices match" description="Try clearing the search or filters to see more devices." >
            <VButton size="sm" variant="secondary" onClick={() => { setQ(''); setFuel(''); setStatus(''); }}>Clear filters</VButton>
          </VEmpty>
        )}
      </section>
    </div>
  );
}

function Th({ children, style }) {
  return <th style={{ padding: '10px 12px', fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)', ...style }}>{children}</th>;
}

function Row({ d, cols, selected, onToggle, onOpen, proponentName, fmtImei }) {
  const [h, setH] = devUse(false);
  return (
    <tr onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background: selected ? 'var(--green-050)' : h ? 'var(--surface-hover)' : 'var(--white)', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer' }} onClick={onOpen}>
      <td style={{ padding: '10px 12px', paddingLeft: 16 }} onClick={e => e.stopPropagation()}><VCheck checked={selected} onChange={onToggle} /></td>
      <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--ink-900)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{fmtImei(d.imei)}</td>
      <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-body)' }}>{d.model}</span>
        <span style={{ display: 'block', fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>{d.modelId} · {d.sensor}</span>
      </td>
      <td style={{ padding: '10px 12px' }}><VFuel fuel={d.fuel} short size="sm" /></td>
      {cols && <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)', color: 'var(--text-body)' }}>{proponentName(d.proponent)}</td>}
      <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>{d.site}</td>
      <td style={{ padding: '10px 12px' }}><CategoryTag category={d.category} size="sm" /></td>
      <td style={{ padding: '10px 12px' }}><VStatus status={d.status} showLabel pulse={d.status === 'online'} /></td>
      <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: d.status === 'offline' ? 'var(--danger-600)' : 'var(--text-secondary)' }}>{window.lastSeenText(d.lastSeenMin)}</td>
      <td style={{ padding: '10px 12px' }}><VLevel value={d.battery} width={56} /></td>
      <td style={{ padding: '10px 12px' }}><VSignal level={d.signal} /></td>
      <td style={{ padding: '10px 12px' }} onClick={e => e.stopPropagation()}><VIconBtn icon="more" size="sm" label="Row actions" /></td>
    </tr>
  );
}

Object.assign(window, { DevicesScreen });

export { DevicesScreen, Th, Row };
