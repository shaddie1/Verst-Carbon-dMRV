/* Verst Carbon dMRV — Admin: Applications review queue. Review proponent
   applications, inspect details + logo, approve to issue credentials, or
   reject. Admin-only. */
import React from 'react';
import { ProponentLogo, Badge, Button, IconButton, FuelBadge, Icon, Avatar } from '../designSystem.jsx';
import { VC_DATA } from '../data.js';
import { PageHeader } from '../components/layout.jsx';

const { useState } = React;

const STATUS_META = {
  pending: { tone: 'warning', label: 'Pending review', icon: 'clock' },
  approved: { tone: 'success', label: 'Approved', icon: 'checkCircle' },
  rejected: { tone: 'danger', label: 'Rejected', icon: 'x' },
};

function ApplicationsScreen() {
  const D = VC_DATA;
  const [apps, setApps] = useState(D.APPLICATIONS);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);
  const [credentials, setCredentials] = useState(null);

  const counts = { all: apps.length, pending: apps.filter(a => a.status === 'pending').length, approved: apps.filter(a => a.status === 'approved').length, rejected: apps.filter(a => a.status === 'rejected').length };
  const rows = filter === 'all' ? apps : apps.filter(a => a.status === filter);

  function decide(id, status, extra) {
    setApps(list => list.map(a => a.id === id ? { ...a, status, ...extra } : a));
    setOpen(o => o && o.id === id ? { ...o, status, ...extra } : o);
  }
  function approve(app) {
    const handle = (app.tradingName || app.legalName || 'proponent').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 22);
    const creds = {
      app, workspace: handle + '.verstcarbon.io',
      email: app.contactEmail,
      tempPassword: 'Vc-' + Math.random().toString(36).slice(2, 8) + '-' + Math.random().toString(36).slice(2, 5),
    };
    decide(app.id, 'approved');
    setCredentials(creds);
  }

  return (
    <div>
      <PageHeader title="Applications" sub={`${counts.pending} awaiting review · proponent access requests`}
        actions={<Button variant="secondary" iconLeft="download">Export queue</Button>} />

      <div style={{ display: 'inline-flex', gap: 2, padding: 3, background: 'var(--grey-100)', borderRadius: 'var(--radius-sm)', marginBottom: 16 }}>
        {[['all', 'All', counts.all], ['pending', 'Pending', counts.pending], ['approved', 'Approved', counts.approved], ['rejected', 'Rejected', counts.rejected]].map(([k, l, n]) => (
          <button key={k} onClick={() => setFilter(k)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: 'none', borderRadius: 'var(--radius-xs)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', fontWeight: 600, background: filter === k ? 'var(--white)' : 'transparent', color: filter === k ? 'var(--ink-900)' : 'var(--text-secondary)', boxShadow: filter === k ? 'var(--shadow-xs)' : 'none' }}>
            {l}<span style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>{n}</span>
          </button>
        ))}
      </div>

      <section style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
          <thead><tr style={{ background: 'var(--grey-050)' }}>
            {['Applicant', 'Reference', 'Country', 'Fuels', 'Submitted', 'Status', ''].map((h, i) => (
              <th key={i} style={{ textAlign: 'left', padding: '11px 16px', fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{rows.map((a, i) => {
            const m = STATUS_META[a.status];
            return (
              <tr key={a.id} onClick={() => setOpen(a)} style={{ borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--border-subtle)', cursor: 'pointer' }}>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                    <ProponentLogo name={a.legalName} src={a.logo} size={34} />
                    <div><div style={{ fontWeight: 700, color: 'var(--ink-900)' }}>{a.legalName}</div><div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>{a.contactName} · {a.contactEmail}</div></div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--font-data)', color: 'var(--text-secondary)' }}>{a.id}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{a.country}</td>
                <td style={{ padding: '12px 16px' }}><div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>{a.fuels.map(f => <FuelBadge key={f} fuel={f} short size="sm" showIcon={false} />)}</div></td>
                <td style={{ padding: '12px 16px', fontFamily: 'var(--font-data)', color: 'var(--text-secondary)' }}>{a.submitted}</td>
                <td style={{ padding: '12px 16px' }}><Badge tone={m.tone} variant="soft" icon={m.icon}>{m.label}</Badge></td>
                <td style={{ padding: '12px 16px', textAlign: 'right' }}><Icon name="chevronRight" size={16} style={{ color: 'var(--text-muted)' }} /></td>
              </tr>
            );
          })}</tbody>
        </table>
      </section>

      {open && <ApplicationDrawer app={open} onClose={() => setOpen(null)} onApprove={() => approve(open)} onReject={() => decide(open.id, 'rejected', { rejectReason: 'Rejected by reviewer.' })} />}
      {credentials && <CredentialsModal creds={credentials} onClose={() => setCredentials(null)} />}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--ink-900)', textAlign: 'right' }}>{value || '—'}</span>
    </div>
  );
}

function ApplicationDrawer({ app, onClose, onApprove, onReject }) {
  const D = VC_DATA;
  const m = STATUS_META[app.status];
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,24,20,0.42)' }} />
      <div style={{ position: 'relative', width: 480, maxWidth: '100%', height: '100%', background: 'var(--white)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', borderBottom: '1px solid var(--border-subtle)', flex: 'none' }}>
          <ProponentLogo name={app.legalName} src={app.logo} size={40} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 'var(--fs-h3)', fontWeight: 700, color: 'var(--ink-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{app.legalName}</div>
            <div style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-data)' }}>{app.id}</div>
          </div>
          <IconButton icon="x" label="Close" onClick={onClose} />
        </header>
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          <Badge tone={m.tone} variant="soft" icon={m.icon} style={{ marginBottom: 16 }}>{m.label}</Badge>
          {app.status === 'rejected' && app.rejectReason && (
            <div style={{ display: 'flex', gap: 8, padding: '10px 12px', borderRadius: 'var(--radius-md)', background: 'var(--danger-050)', marginBottom: 16, fontSize: 'var(--fs-xs)', color: 'var(--danger-600)' }}><Icon name="alert" size={15} style={{ flex: 'none', marginTop: 1 }} />{app.rejectReason}</div>
          )}
          <DrawerSection title="Organisation">
            <DetailRow label="Legal name" value={app.legalName} />
            <DetailRow label="Trading name" value={app.tradingName} />
            <DetailRow label="Registration" value={app.regNo} />
            <DetailRow label="Country" value={app.country} />
            <DetailRow label="Founded" value={app.founded} />
            <DetailRow label="Website" value={app.website} />
          </DrawerSection>
          <DrawerSection title="Primary contact">
            <DetailRow label="Name" value={app.contactName} />
            <DetailRow label="Title" value={app.contactTitle} />
            <DetailRow label="Email" value={app.contactEmail} />
            <DetailRow label="Phone" value={app.contactPhone} />
          </DrawerSection>
          <DrawerSection title="Project profile">
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>{app.fuels.map(f => <FuelBadge key={f} fuel={f} short size="sm" />)}</div>
            <DetailRow label="End-use" value={app.endUse} />
            <DetailRow label="Regions" value={app.regions} />
            <DetailRow label="Est. devices" value={app.estDevices} />
            <DetailRow label="Standard" value={app.standard} />
            <DetailRow label="Methodology" value={app.methodology} />
          </DrawerSection>
          <DrawerSection title="Documents">
            {app.docs.length ? app.docs.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <Icon name="file" size={16} style={{ color: 'var(--brand-primary)' }} /><span style={{ flex: 1, fontSize: 'var(--fs-sm)', color: 'var(--ink-900)' }}>{d}</span><Icon name="download" size={15} style={{ color: 'var(--text-muted)' }} />
              </div>
            )) : <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', padding: '8px 0' }}>No documents attached.</div>}
          </DrawerSection>
        </div>
        {app.status === 'pending' && (
          <footer style={{ display: 'flex', gap: 10, padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--grey-050)', flex: 'none' }}>
            <Button variant="danger" iconLeft="x" onClick={onReject}>Reject</Button>
            <div style={{ flex: 1 }} />
            <Button iconLeft="check" onClick={onApprove}>Approve & issue credentials</Button>
          </footer>
        )}
      </div>
    </div>
  );
}

function DrawerSection({ title, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>{title}</div>
      {children}
    </div>
  );
}

function CredField({ label, value, mono }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--white)', border: '1px solid var(--border-subtle)' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
        <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--ink-900)', fontFamily: mono ? 'var(--font-data)' : 'var(--font-sans)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
      </div>
      <Icon name="file" size={15} style={{ color: 'var(--text-muted)', flex: 'none' }} />
    </div>
  );
}

function CredentialsModal({ creds, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,24,20,0.5)' }} />
      <div style={{ position: 'relative', width: 480, maxWidth: '100%', background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '24px 24px 20px', textAlign: 'center', borderBottom: '1px solid var(--border-subtle)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 999, background: 'var(--success-050)', color: 'var(--success-500)', marginBottom: 12 }}><Icon name="checkCircle" size={26} /></span>
          <h2 style={{ fontSize: 'var(--fs-h2)', fontWeight: 800, color: 'var(--ink-900)' }}>Credentials issued</h2>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 6 }}>{creds.app.legalName} has been approved. Share these with {creds.app.contactName}.</p>
        </div>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--grey-050)' }}>
          <CredField label="Workspace" value={creds.workspace} mono />
          <CredField label="Admin login" value={creds.email} mono />
          <CredField label="Temporary password" value={creds.tempPassword} mono />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderTop: '1px solid var(--border-subtle)' }}>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', flex: 1 }}>An invite email with a reset link is sent automatically.</span>
          <Button variant="secondary" onClick={onClose}>Done</Button>
          <Button iconLeft="bell" onClick={onClose}>Send invite</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ApplicationsScreen });

export { STATUS_META, ApplicationsScreen, DetailRow, ApplicationDrawer, DrawerSection, CredField, CredentialsModal };
