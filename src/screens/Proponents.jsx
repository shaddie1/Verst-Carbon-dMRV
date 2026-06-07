/* Verst Carbon dMRV — Admin: Proponent management + invite-user modal. */
import React from 'react';
import { FuelBadge, Button, IconButton, Badge, Avatar, ProponentLogo, Input, Select, Icon } from '../designSystem.jsx';
import { VC_DATA } from '../data.js';
import { PageHeader } from '../components/layout.jsx';
import { Field } from './ApplicationWizard.jsx';

const { useState } = React;

function ProponentsScreen({ onScopeChange }) {
  const D = VC_DATA;
  const [invite, setInvite] = useState(false);
  return (
    <div>
      <PageHeader title="Proponents" sub="Project developers monitored by Verst Carbon"
        actions={<React.Fragment>
          <Button variant="secondary" iconLeft="download">Export</Button>
          <Button iconLeft="plus" onClick={() => setInvite(true)}>Invite user</Button>
        </React.Fragment>} />

      <section style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
          <thead><tr style={{ background: 'var(--grey-050)' }}>
            {['Proponent', 'Country', 'Assigned fuels', 'Devices', 'End-use (hh / inst)', 'Online', 'User accounts', ''].map((h, i) => (
              <th key={i} style={{ textAlign: i === 3 || i === 5 ? 'right' : 'left', padding: '11px 16px', fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {D.PROPONENTS.map((p, idx) => {
              const ds = D.DEVICES.filter(d => d.proponent === p.id);
              const online = ds.filter(d => d.status === 'online').length;
              const hh = ds.filter(d => d.category === 'household').length;
              const inst = ds.filter(d => d.category === 'institution').length;
              return (
                <ProponentRow key={p.id} p={p} count={ds.length} online={online} hh={hh} inst={inst} last={idx === D.PROPONENTS.length - 1} onScopeChange={onScopeChange} />
              );
            })}
          </tbody>
        </table>
      </section>

      {invite && <InviteUserModal onClose={() => setInvite(false)} />}
    </div>
  );
}

function ProponentRow({ p, count, online, hh, inst, last, onScopeChange }) {
  const [h, setH] = useState(false);
  const total = hh + inst || 1;
  return (
    <tr onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ borderBottom: last ? 'none' : '1px solid var(--border-subtle)', background: h ? 'var(--surface-hover)' : 'var(--white)' }}>
      <td style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <ProponentLogo name={p.name} src={p.logo} size={34} />
          <div><div style={{ fontWeight: 700, color: 'var(--ink-900)' }}>{p.name}</div><div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-data)' }}>{p.legalName || p.id}</div></div>
        </div>
      </td>
      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{p.country}</td>
      <td style={{ padding: '12px 16px' }}><div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>{p.fuels.map(f => <FuelBadge key={f} fuel={f} short size="sm" />)}</div></td>
      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, fontFamily: 'var(--font-data)', color: 'var(--ink-900)' }}>{count}</td>
      <td style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 84, flex: 'none', display: 'flex', height: 8, borderRadius: 999, overflow: 'hidden', background: 'var(--grey-100)' }}>
            <span style={{ width: (hh / total * 100) + '%', background: 'var(--grey-400)' }} />
            <span style={{ width: (inst / total * 100) + '%', background: 'var(--fuel-electric)' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--fs-2xs)', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}><span style={{ color: 'var(--ink-900)', fontWeight: 600 }}>{hh}</span> / <span style={{ color: 'var(--fuel-electric-strong)', fontWeight: 600 }}>{inst}</span></span>
        </div>
      </td>
      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'var(--font-data)' }}><span style={{ color: 'var(--success-600)', fontWeight: 600 }}>{online}</span><span style={{ color: 'var(--text-muted)' }}> / {count}</span></td>
      <td style={{ padding: '12px 16px' }}><Badge tone="neutral" icon="users">{p.users} users</Badge></td>
      <td style={{ padding: '12px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
        <Button size="sm" variant="secondary" onClick={() => onScopeChange(p.id)}>View</Button>
        <span style={{ display: 'inline-block', width: 6 }} />
        <IconButton icon="more" size="sm" label="Actions" />
      </td>
    </tr>
  );
}

function InviteUserModal({ onClose }) {
  const D = VC_DATA;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,24,20,0.42)' }} />
      <div style={{ position: 'relative', width: 460, maxWidth: '100%', background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 9, background: 'var(--green-050)', color: 'var(--brand-primary)' }}><Icon name="user" size={19} /></span>
          <div style={{ flex: 1 }}><div style={{ fontSize: 'var(--fs-h3)', fontWeight: 700 }}>Invite user</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Grant access to a proponent workspace</div></div>
          <IconButton icon="x" label="Close" onClick={onClose} />
        </header>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Email address" required iconLeft="user" placeholder="name@organisation.org" />
          <Select label="Proponent" required placeholder="Select proponent" options={D.PROPONENTS.map(p => ({ value: p.id, label: p.name }))} />
          <Select label="Role" defaultValue="manager" options={[{ value: 'manager', label: 'Project manager' }, { value: 'engineer', label: 'Field engineer' }, { value: 'viewer', label: 'Viewer (read-only)' }]} />
        </div>
        <footer style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--grey-050)' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button iconLeft="plus" onClick={onClose}>Send invite</Button>
        </footer>
      </div>
    </div>
  );
}


export { ProponentsScreen, ProponentRow, InviteUserModal };
