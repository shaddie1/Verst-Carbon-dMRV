/* Verst Carbon dMRV — Register device modal. Controlled form with IMEI
   validation (15 digits + uniqueness), model filtered by fuel, proponent
   assignment (admin only). On submit it adds the device to the store and
   shows a confirmation; the new device then appears in the Devices list. */
import React from 'react';
import { Input, Select, Button, IconButton, Icon, Badge } from '../designSystem.jsx';
import { VC_DATA } from '../data.js';
import { useData } from '../store.jsx';

const { useState } = React;

const CATEGORIES = [
  { value: 'household', label: 'Household' },
  { value: 'institution', label: 'Institution' },
];

function RegisterDeviceModal({ role, scope, onClose }) {
  const D = VC_DATA;
  const { addDevice } = useData();

  const [imei, setImei] = useState('');
  const [serial, setSerial] = useState('');
  const [prop, setProp] = useState(role === 'admin' ? (scope !== 'all' ? scope : '') : null);
  const [fuel, setFuel] = useState('');
  const [model, setModel] = useState('');
  const [category, setCategory] = useState('');
  const [household, setHousehold] = useState('');
  const [town, setTown] = useState('');
  const [installed, setInstalled] = useState('2026-06-07');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [registered, setRegistered] = useState(null); // success view once submitted

  const fuels = role === 'admin' ? (prop ? D.fuelsFor(prop) : D.FUEL_KEYS) : D.fuelsFor(scope);
  const models = fuel ? D.MODELS[fuel] : [];

  const imeiClean = imei.replace(/\s/g, '');
  const imeiDigits = /^\d{15}$/.test(imeiClean);
  const imeiDuplicate = imeiClean.length === 15 && D.DEVICES.some(d => d.imei === imeiClean);
  const imeiError = imeiClean.length > 0 && imeiClean.length !== 15
    ? 'IMEI must be exactly 15 digits'
    : imeiDuplicate ? 'This IMEI is already registered' : null;

  const propOk = role !== 'admin' || !!prop;
  const canSubmit = imeiDigits && !imeiDuplicate && serial.trim() && propOk && fuel && model && category;

  function submit() {
    if (!canSubmit) return;
    const m = models.find(x => x.id === model);
    const device = {
      imei: imeiClean,
      proponent: role === 'admin' ? prop : scope,
      fuel,
      model: m.name,
      modelId: m.id,
      sensor: D.FUEL_SENSOR[fuel],
      category,
      site: household.trim() || 'Unassigned site',
      household: household.trim() || 'Unassigned site',
      town: town.trim() || '—',
      status: 'online',
      lastSeenMin: 0,
      battery: 100,
      teg: 80,
      signal: 4,
      installed,
      ...(lat && lng ? { lat: Number(lat), lng: Number(lng) } : {}),
    };
    addDevice(device);
    setRegistered(device);
  }

  function reset() {
    setImei(''); setSerial(''); setFuel(''); setModel(''); setCategory('');
    setHousehold(''); setTown(''); setLat(''); setLng('');
    setProp(role === 'admin' ? (scope !== 'all' ? scope : '') : null);
    setRegistered(null);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(15,24,20,0.42)', backdropFilter: 'blur(1px)' }} />
      <div style={{ position: 'relative', width: 560, maxWidth: '100%', maxHeight: '90%', overflow: 'auto', background: 'var(--white)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 9, background: 'var(--green-050)', color: 'var(--brand-primary)' }}><Icon name={registered ? 'checkCircle' : 'cpu'} size={19} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--fs-h3)', fontWeight: 700, color: 'var(--ink-900)' }}>{registered ? 'Device registered' : 'Register device'}</div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{registered ? 'The node is now monitored and listed under Devices' : 'Add an IoT node and link it to a household'}</div>
          </div>
          <IconButton icon="x" label="Close" onClick={onClose} />
        </header>

        {registered ? (
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 'var(--radius-md)', background: 'var(--success-050)', border: '1px solid var(--success-500)' }}>
              <Icon name="checkCircle" size={22} style={{ color: 'var(--success-600)', flex: 'none' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--ink-900)', fontFamily: 'var(--font-data)' }}>{D.fmtImei(registered.imei)}</div>
                <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{registered.model} · {D.FUEL_LABEL[registered.fuel]} · {D.proponentName(registered.proponent)}</div>
              </div>
              <Badge tone="success" variant="soft" icon="activity">Online</Badge>
            </div>
          </div>
        ) : (
          <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Input label="IMEI" required iconLeft="cpu" placeholder="15-digit IMEI" value={imei} onChange={e => setImei(e.target.value)} error={imeiError} hint={!imeiError ? `${imeiClean.length}/15 digits` : null} />
              <Input label="Secure element serial" required placeholder="0x…" value={serial} onChange={e => setSerial(e.target.value)} />
            </div>
            {role === 'admin' && (
              <Select label="Proponent" required placeholder="Assign to proponent" value={prop || ''} onChange={e => { setProp(e.target.value); setFuel(''); setModel(''); }} options={D.PROPONENTS.map(p => ({ value: p.id, label: p.name }))} hint="Determines which fuels and households are available" />
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Select label="Fuel type" required placeholder="Select fuel" value={fuel} onChange={e => { setFuel(e.target.value); setModel(''); }} options={fuels.map(f => ({ value: f, label: D.FUEL_LABEL[f] }))} />
              <Select label="Device model" required placeholder={fuel ? 'Select model' : 'Choose a fuel first'} disabled={!fuel} value={model} onChange={e => setModel(e.target.value)} options={models.map(m => ({ value: m.id, label: m.name + ' (' + m.id + ')' }))} hint={fuel ? 'Filtered by fuel type' : null} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Select label="End-use" required placeholder="Household or institution" value={category} onChange={e => setCategory(e.target.value)} options={CATEGORIES} />
              <Input label="Install date" type="date" value={installed} onChange={e => setInstalled(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Input label="Household / site" iconLeft="home" placeholder="Site or household ID" value={household} onChange={e => setHousehold(e.target.value)} />
              <Input label="Town / locality" iconLeft="mapPin" placeholder="e.g. Kaolack" value={town} onChange={e => setTown(e.target.value)} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Input label="GPS latitude" iconLeft="mapPin" placeholder="-1.2921" value={lat} onChange={e => setLat(e.target.value)} />
              <Input label="GPS longitude" iconLeft="mapPin" placeholder="36.8219" value={lng} onChange={e => setLng(e.target.value)} />
            </div>
          </div>
        )}

        <footer style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--grey-050)' }}>
          {registered ? (
            <React.Fragment>
              <Badge tone="success" variant="soft" icon="checkCircle">Registered</Badge>
              <div style={{ flex: 1 }} />
              <Button variant="secondary" iconLeft="plus" onClick={reset}>Register another</Button>
              <Button onClick={onClose}>Done</Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Badge tone={imeiDigits && !imeiDuplicate ? 'success' : 'neutral'} variant="soft" icon={imeiDigits && !imeiDuplicate ? 'checkCircle' : 'cpu'}>
                {imeiDigits ? (imeiDuplicate ? 'IMEI in use' : 'IMEI valid') : 'Awaiting IMEI'}
              </Badge>
              <div style={{ flex: 1 }} />
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button iconLeft="plus" disabled={!canSubmit} onClick={submit}>Register device</Button>
            </React.Fragment>
          )}
        </footer>
      </div>
    </div>
  );
}


export { RegisterDeviceModal };
