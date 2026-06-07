/* Verst Carbon dMRV — App: routing, role & proponent scope, modals, toast. */
import React from 'react';
import { Toast as AToast, Button as AButton, Badge as ABadge, Icon as AIcon, FuelBadge as AFuel, StatusDot as AStatus, EmptyState as AEmpty, Switch as ASwitch } from './designSystem.jsx';
import { VC_DATA } from './data.js';
import { TopNav, Sidebar } from './components/shell.jsx';
import { Panel, PageHeader, CategoryTag } from './components/layout.jsx';
import { LoginScreen } from './screens/Login.jsx';
import { DashboardScreen, AlertRow } from './screens/Dashboard.jsx';
import { DeviceDetailScreen, DefList } from './screens/DeviceDetail.jsx';
import { DevicesScreen } from './screens/Devices.jsx';
import { RegisterDeviceModal } from './screens/RegisterDeviceModal.jsx';
import { FuelScreen } from './screens/Fuel.jsx';
import { ReportsScreen } from './screens/Reports.jsx';
import { ProponentsScreen } from './screens/Proponents.jsx';
import { ApplicationWizard, ApplicationSubmitted } from './screens/ApplicationWizard.jsx';
import { ApplicationsScreen } from './screens/ApplicationsReview.jsx';

const { useState: aUse } = React;

function App() {
  const D = VC_DATA;
  const [authed, setAuthed] = aUse(false);
  const [role, setRole] = aUse('admin');
  const [scope, setScope] = aUse('all');
  const [route, setRoute] = aUse('dashboard');
  const [device, setDevice] = aUse(null);
  const [register, setRegister] = aUse(false);
  const [toast, setToast] = aUse(true);
  const [preAuth, setPreAuth] = aUse('login'); // 'login' | 'apply' | 'submitted'
  const [submittedApp, setSubmittedApp] = aUse(null);

  React.useEffect(() => {
    const h = (window.location.hash || '').replace('#', '');
    if (!h) return;
    const [r, rt, dv] = h.split('/');
    if (r === 'apply') { setPreAuth('apply'); return; }
    if (r === 'admin' || r === 'proponent') {
      setRole(r); setScope(r === 'admin' ? 'all' : 'sahel');
      setAuthed(true);
      if (rt) setRoute(rt);
      if (dv) setDevice(decodeURIComponent(dv));
    }
  }, []);

  function login(r) {
    setRole(r);
    setScope(r === 'admin' ? 'all' : 'sahel');
    setRoute('dashboard'); setDevice(null); setAuthed(true);
  }
  function nav(key) { setRoute(key); setDevice(null); }
  const user = role === 'admin' ? { name: 'Verst Operator', org: 'Verst Carbon', role: 'admin' } : { name: 'Amara Okeke', org: 'Sahel Clean Cooking', role: 'proponent' };
  const alertCount = D.scopeAlerts(scope).length;

  if (!authed) {
    if (preAuth === 'apply') {
      const nextRef = 'VC-APP-2026-' + String(43 + Math.floor(Math.random() * 50)).padStart(4, '0');
      return <ApplicationWizard onClose={() => setPreAuth('login')} onSubmitted={(form) => { setSubmittedApp({ ...form, id: nextRef }); setPreAuth('submitted'); }} />;
    }
    if (preAuth === 'submitted') {
      return <ApplicationSubmitted application={submittedApp} onDone={() => { setPreAuth('login'); setSubmittedApp(null); }} />;
    }
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <LoginScreen onLogin={login} onApply={() => setPreAuth('apply')} />
      </div>
    );
  }

  let screen;
  if (device) screen = <DeviceDetailScreen role={role} scope={scope} imei={device} onBack={() => setDevice(null)} />;
  else if (route === 'dashboard') screen = <DashboardScreen role={role} scope={scope} onScopeChange={setScope} onNav={nav} />;
  else if (route === 'devices') screen = <DevicesScreen role={role} scope={scope} onOpenDevice={setDevice} onRegister={() => setRegister(true)} />;
  else if (route === 'fuels') screen = <FuelScreen role={role} scope={scope} />;
  else if (route === 'reports') screen = <ReportsScreen role={role} scope={scope} />;
  else if (route === 'proponents') screen = <ProponentsScreen onScopeChange={(id) => { setScope(id); setRoute('dashboard'); }} />;
  else if (route === 'applications') screen = <ApplicationsScreen />;
  else if (route === 'alerts') screen = <AlertsScreen role={role} scope={scope} />;
  else if (route === 'households') screen = <HouseholdsScreen role={role} scope={scope} />;
  else screen = <SettingsScreen role={role} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: 'var(--surface-app)', overflow: 'hidden' }}>
      <TopNav role={role} scope={scope} onScopeChange={setScope} alertCount={alertCount} user={user} onBell={() => nav('alerts')} />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Sidebar role={role} active={device ? 'devices' : route} onNav={nav} alertCount={alertCount} />
        <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '24px 28px' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>{screen}</div>
        </main>
      </div>

      {register && <RegisterDeviceModal role={role} scope={scope} onClose={() => setRegister(false)} />}

      {toast && route === 'dashboard' && !device && (
        <div style={{ position: 'absolute', right: 24, bottom: 24, zIndex: 80 }}>
          <AToast tone="danger" title="Device offline > 72h" message={(role === 'admin' && scope === 'all' ? 'Sahel Clean Cooking · ' : '') + 'IMEI 35693…809 last seen 3 days ago · Kaolack'} action={{ label: 'View device', onClick: () => { setRoute('devices'); setToast(false); } }} onDismiss={() => setToast(false)} />
        </div>
      )}

      <RoleSwitcher role={role} onRole={(r) => login(r)} onLogout={() => setAuthed(false)} />
    </div>
  );
}

/* Floating reviewer control to flip admin / proponent */
function RoleSwitcher({ role, onRole, onLogout }) {
  return (
    <div style={{ position: 'absolute', left: 16, bottom: 16, zIndex: 90, display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px 7px 12px', background: 'var(--ink-900)', borderRadius: 999, boxShadow: 'var(--shadow-lg)' }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>View as</span>
      {[['admin', 'Admin'], ['proponent', 'Proponent']].map(([k, l]) => (
        <button key={k} onClick={() => onRole(k)} style={{ padding: '5px 11px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, background: role === k ? 'var(--brand-primary)' : 'transparent', color: role === k ? '#fff' : 'rgba(255,255,255,0.7)' }}>{l}</button>
      ))}
      <button onClick={onLogout} title="Sign out" style={{ display: 'inline-flex', padding: 5, marginLeft: 2, borderRadius: 999, border: 'none', cursor: 'pointer', background: 'transparent', color: 'rgba(255,255,255,0.7)' }}><AIcon name="logout" size={15} /></button>
    </div>
  );
}

function RoleHint() {
  return (
    <div style={{ position: 'absolute', left: '50%', bottom: 22, transform: 'translateX(-50%)', fontSize: 12, color: 'var(--text-muted)', background: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: 999, border: '1px solid var(--border-subtle)' }}>
      Demo login — pick a role below the form. Role is normally resolved automatically after sign-in.
    </div>
  );
}

/* ---- light screens ---- */
function AlertsScreen({ role, scope }) {
  const D = VC_DATA;
  const alerts = D.scopeAlerts(scope);
  return (
    <div>
      <PageHeader title="Alerts" sub={`${alerts.length} active · device offline > 72h, sensor anomalies, battery / TEG faults`}
        actions={<AButton variant="secondary" iconLeft="check">Acknowledge all</AButton>} />
      <Panel pad={false}>
        {alerts.length === 0
          ? <AEmpty icon="checkCircle" title="All clear" description="No active alerts for this proponent right now." />
          : alerts.map((a, i) => <AlertRow key={a.id} a={a} role={role} scope={scope} last={i === alerts.length - 1} proponentName={D.proponentName} />)}
      </Panel>
    </div>
  );
}

function HouseholdsScreen({ role, scope }) {
  const D = VC_DATA;
  const [cat, setCat] = aUse('all');
  const devices = D.scopeDevices(scope);
  const map = {};
  devices.forEach(d => { (map[d.site] = map[d.site] || []).push(d); });
  let list = Object.keys(map).map(h => ({ id: h, devices: map[h], town: map[h][0].town, proponent: map[h][0].proponent, category: map[h][0].category }));
  const counts = { all: list.length, household: list.filter(x => x.category === 'household').length, institution: list.filter(x => x.category === 'institution').length };
  if (cat !== 'all') list = list.filter(x => x.category === cat);
  const cols = role === 'admin' && scope === 'all';
  return (
    <div>
      <PageHeader title="Households & institutions" sub={`${counts.household} households · ${counts.institution} institutions across all fuels`}
        actions={<AButton iconLeft="plus">Add site</AButton>} />
      <div style={{ display: 'inline-flex', gap: 2, padding: 3, background: 'var(--grey-100)', borderRadius: 'var(--radius-sm)', marginBottom: 16 }}>
        {[['all', 'All', counts.all], ['household', 'Households', counts.household], ['institution', 'Institutions', counts.institution]].map(([k, l, n]) => (
          <button key={k} onClick={() => setCat(k)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: 'none', borderRadius: 'var(--radius-xs)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', fontWeight: 600, background: cat === k ? 'var(--white)' : 'transparent', color: cat === k ? 'var(--ink-900)' : 'var(--text-secondary)', boxShadow: cat === k ? 'var(--shadow-xs)' : 'none' }}>
            {l}<span style={{ fontFamily: 'var(--font-data)', fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>{n}</span>
          </button>
        ))}
      </div>
      <section style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xs)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
          <thead><tr style={{ background: 'var(--grey-050)' }}>
            {['Site', 'End-use', 'Location', ...(cols ? ['Proponent'] : []), 'Fuels', 'Devices', 'Status'].map((h, i) => (
              <th key={i} style={{ textAlign: 'left', padding: '11px 16px', fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-subtle)' }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{list.slice(0, 14).map((hh, i) => {
            const fuels = [...new Set(hh.devices.map(d => d.fuel))];
            const online = hh.devices.every(d => d.status === 'online');
            return (
              <tr key={hh.id} style={{ borderBottom: i === Math.min(13, list.length - 1) ? 'none' : '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '11px 16px', fontWeight: 600, color: 'var(--ink-900)', fontFamily: hh.category === 'institution' ? 'var(--font-sans)' : 'var(--font-data)' }}>{hh.id}</td>
                <td style={{ padding: '11px 16px' }}><CategoryTag category={hh.category} size="sm" /></td>
                <td style={{ padding: '11px 16px', color: 'var(--text-secondary)' }}>{hh.town}</td>
                {cols && <td style={{ padding: '11px 16px', color: 'var(--text-body)' }}>{D.proponentName(hh.proponent)}</td>}
                <td style={{ padding: '11px 16px' }}><div style={{ display: 'flex', gap: 5 }}>{fuels.map(f => <AFuel key={f} fuel={f} short size="sm" showIcon={false} />)}</div></td>
                <td style={{ padding: '11px 16px', fontFamily: 'var(--font-data)', color: 'var(--text-body)' }}>{hh.devices.length}</td>
                <td style={{ padding: '11px 16px' }}><AStatus status={online ? 'online' : 'offline'} showLabel /></td>
              </tr>
            );
          })}</tbody>
        </table>
      </section>
    </div>
  );
}

function SettingsScreen({ role }) {
  return (
    <div>
      <PageHeader title="Settings" sub="Workspace preferences and alert thresholds" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Panel title="Alert thresholds">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Toggle label="Device offline > 72h" on />
            <Toggle label="Sensor anomaly detection" on />
            <Toggle label="Low battery / TEG fault" on />
            <Toggle label="Weekly digest email" />
          </div>
        </Panel>
        <Panel title="Workspace">
          <DefList items={[['Role', role === 'admin' ? 'Verst administrator' : 'Proponent — project manager'], ['Data residency', 'eu-west'], ['Units', 'Metric (kg, kWh, m³)'], ['Locale', 'English (UK)'], ['Telemetry retention', 'Immutable · indefinite']]} />
        </Panel>
      </div>
    </div>
  );
}

function Toggle({ label, on }) {
  const [v, setV] = aUse(!!on);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
      <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-body)' }}>{label}</span>
      <ASwitch checked={v} onChange={e => setV(e.target.checked)} />
    </div>
  );
}

Object.assign(window, { App, AlertsScreen, HouseholdsScreen, SettingsScreen });

export { App, RoleSwitcher, RoleHint, AlertsScreen, HouseholdsScreen, SettingsScreen, Toggle };
