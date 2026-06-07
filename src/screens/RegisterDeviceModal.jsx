/* Verst Carbon dMRV — Register device modal. IMEI validation, model
   filtered by fuel, proponent assignment (admin only). */
import React from 'react';
import { Input, Select, Button, IconButton, Icon, Badge } from '../designSystem.jsx';
import { VC_DATA } from '../data.js';

const { useState } = React;

function RegisterDeviceModal({ role, scope, onClose }) {
  const D = VC_DATA;
  const [imei, setImei] = useState('');
  const [fuel, setFuel] = useState('');
  const [prop, setProp] = useState(role === 'admin' ? (scope !== 'all' ? scope : '') : null);
  const fuels = role === 'admin' ? (prop ? D.fuelsFor(prop) : D.FUEL_KEYS) : D.fuelsFor(scope);
  const models = fuel ? D.MODELS[fuel] : [];
  const imeiClean = imei.replace(/\s/g, '');
  const imeiValid = imeiClean.length === 0 || /^\d{15}$/.test(imeiClean);
  const imeiError = imeiClean.length > 0 && imeiClean.length !== 15 ? 'IMEI must be exactly 15 digits' : null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,24,20,0.42)', backdropFilter: 'blur(1px)' }} />
      <div style={{ position: 'relative', width: 560, maxWidth: '100%', maxHeight: '90%', overflow: 'auto', background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 9, background: 'var(--green-050)', color: 'var(--brand-primary)' }}><Icon name="cpu" size={19} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--fs-h3)', fontWeight: 700, color: 'var(--ink-900)' }}>Register device</div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Add an IoT node and link it to a household</div>
          </div>
          <IconButton icon="x" label="Close" onClick={onClose} />
        </header>
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input label="IMEI" required iconLeft="cpu" placeholder="15-digit IMEI" value={imei} onChange={e => setImei(e.target.value)} error={imeiError} hint={!imeiError ? `${imeiClean.length}/15 digits` : null} />
            <Input label="Secure element serial" required placeholder="0x…" />
          </div>
          {role === 'admin' && (
            <Select label="Proponent" required placeholder="Assign to proponent" value={prop || ''} onChange={e => { setProp(e.target.value); setFuel(''); }} options={D.PROPONENTS.map(p => ({ value: p.id, label: p.name }))} hint="Determines which fuels and households are available" />
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Select label="Fuel type" required placeholder="Select fuel" value={fuel} onChange={e => setFuel(e.target.value)} options={fuels.map(f => ({ value: f, label: D.FUEL_LABEL[f] }))} />
            <Select label="Device model" required placeholder={fuel ? 'Select model' : 'Choose a fuel first'} disabled={!fuel} options={models.map(m => ({ value: m.id, label: m.name + ' (' + m.id + ')' }))} hint={fuel ? 'Filtered by fuel type' : null} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input label="Household linkage" iconLeft="home" placeholder="Search household ID…" />
            <Input label="Install date" type="date" defaultValue="2026-06-07" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Input label="GPS latitude" iconLeft="mapPin" placeholder="-1.2921" />
            <Input label="GPS longitude" iconLeft="mapPin" placeholder="36.8219" />
          </div>
        </div>
        <footer style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--grey-050)' }}>
          <Badge tone={imeiValid && imeiClean.length === 15 ? 'success' : 'neutral'} variant="soft" icon={imeiValid && imeiClean.length === 15 ? 'checkCircle' : 'cpu'}>
            {imeiClean.length === 15 ? 'IMEI valid' : 'Awaiting IMEI'}
          </Badge>
          <div style={{ flex: 1 }} />
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button iconLeft="plus" onClick={onClose}>Register device</Button>
        </footer>
      </div>
    </div>
  );
}


export { RegisterDeviceModal };
