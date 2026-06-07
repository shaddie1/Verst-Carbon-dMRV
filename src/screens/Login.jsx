/* Verst Carbon dMRV — Login screen. Single login; role resolved after auth. */
import React from 'react';
import { Button, Input, Icon, Checkbox } from '../designSystem.jsx';

const { useState } = React;

function LoginScreen({ onLogin, onApply }) {
  const [email, setEmail] = useState('amara@sahelcc.org');
  const [pw, setPw] = useState('••••••••••');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%', background: 'var(--white)' }}>
      {/* form side */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 88px' }}>
        <div style={{ maxWidth: 360, width: '100%', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: 'var(--brand-primary)', color: '#fff' }}>
              <Icon name="leaf" size={20} />
            </span>
            <span style={{ fontWeight: 800, fontSize: 19, letterSpacing: '-0.01em' }}>Verst<span style={{ color: 'var(--brand-primary)' }}>Carbon</span></span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink-900)' }}>Sign in</h1>
          <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 6, marginBottom: 28 }}>Digital monitoring, reporting &amp; verification for clean-cooking carbon projects.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Email" iconLeft="user" value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Password" type="password" value={pw} onChange={e => setPw(e.target.value)} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Checkbox checked label="Keep me signed in" onChange={() => {}} />
              <a href="#" style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>Forgot password?</a>
            </div>
            <Button fullWidth onClick={() => onLogin('proponent')} style={{ marginTop: 4 }}>Sign in</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20, padding: '12px 14px', borderRadius: 'var(--radius-md)', background: 'var(--green-050)' }}>
            <Icon name="leaf" size={16} style={{ color: 'var(--brand-primary)', flex: 'none' }} />
            <span style={{ flex: 1, fontSize: 'var(--fs-sm)', color: 'var(--text-body)' }}>New project developer?</span>
            <button onClick={onApply} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--brand-primary)' }}>Apply for access →</button>
          </div>
          <div style={{ marginTop: 26, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Demo — choose a role</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" size="sm" iconLeft="dashboard" onClick={() => onLogin('admin')}>Verst admin</Button>
              <Button variant="secondary" size="sm" iconLeft="user" onClick={() => onLogin('proponent')}>Proponent</Button>
            </div>
          </div>
        </div>
      </div>
      {/* brand side */}
      <div style={{ position: 'relative', background: 'linear-gradient(155deg,#063f1d 0%,#008037 58%,#589630 100%)', color: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 56 }}>
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.14 }} width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
          {Array.from({ length: 11 }).map((_, i) => <line key={i} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#fff" strokeWidth="0.15" />)}
          {Array.from({ length: 11 }).map((_, i) => <line key={'h'+i} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#fff" strokeWidth="0.15" />)}
        </svg>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 11px', borderRadius: 999, background: 'rgba(255,255,255,0.16)', fontSize: 12, fontWeight: 600, marginBottom: 22 }}>
            <span style={{ width: 7, height: 7, borderRadius: 999, background: '#a9e08a' }} />Gold Standard aligned dMRV
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.01em', maxWidth: 440 }}>Measured, not estimated.</div>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(255,255,255,0.88)', marginTop: 14, maxWidth: 420 }}>IoT telemetry from every stove — across seven fuel types and fourteen device configurations — quantified into verifiable carbon credits.</p>
          <div style={{ display: 'flex', gap: 34, marginTop: 34 }}>
            {[['1,284', 'Active devices'], ['41', 'Monitored sites'], ['4,812', 'tCO₂e this period']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 26, fontWeight: 800, fontFamily: 'var(--font-data)' }}>{n}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.78)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginScreen });

export { LoginScreen };
