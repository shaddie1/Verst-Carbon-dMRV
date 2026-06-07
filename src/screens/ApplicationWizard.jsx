/* Verst Carbon dMRV — Proponent application wizard (public, pre-auth).
   A guided multi-step workflow: an applicant supplies company details +
   logo, primary contact, project profile, documents, then submits and
   receives an application reference. Verst issues credentials on approval. */
import React from 'react';
import { Input as WInput, Select as WSelect, Checkbox as WCheck, Button as WButton, IconButton as WIconBtn, FuelBadge as WFuel, Icon as WIcon, ProponentLogo as WLogo, Badge as WBadge } from '../designSystem.jsx';
import { VC_DATA } from '../data.js';
import { Logo } from '../components/shell.jsx';

const { useState: wUse } = React;

const STEPS = [
  { key: 'org', label: 'Organisation', icon: 'building', hint: 'Legal entity & branding' },
  { key: 'contact', label: 'Primary contact', icon: 'user', hint: 'Becomes the admin user' },
  { key: 'project', label: 'Project profile', icon: 'flame', hint: 'Fuels, regions, scale' },
  { key: 'docs', label: 'Documents', icon: 'file', hint: 'Compliance & attestations' },
  { key: 'review', label: 'Review & submit', icon: 'check', hint: 'Confirm and apply' },
];

function ApplicationWizard({ onClose, onSubmitted }) {
  const D = VC_DATA;
  const [step, setStep] = wUse(0);
  const [logoSrc, setLogoSrc] = wUse(null);
  const [form, setForm] = wUse({
    legalName: '', tradingName: '', regNo: '', country: '', founded: '', website: '',
    contactName: '', contactTitle: '', contactEmail: '', contactPhone: '', role: 'manager',
    fuels: [], endUse: 'both', regions: '', estDevices: '', standard: '', methodology: '',
    docIncorp: false, docPdd: false, ackData: false, ackImmutable: false,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleFuel = (f) => setForm(s => ({ ...s, fuels: s.fuels.includes(f) ? s.fuels.filter(x => x !== f) : s.fuels.concat(f) }));

  const stepValid = [
    form.legalName && form.country,
    form.contactName && form.contactEmail && /.+@.+\..+/.test(form.contactEmail),
    form.fuels.length > 0 && form.standard,
    form.ackData && form.ackImmutable,
    true,
  ];
  const last = step === STEPS.length - 1;

  function next() { if (last) onSubmitted({ ...form, logo: logoSrc }); else setStep(s => Math.min(STEPS.length - 1, s + 1)); }
  function back() { if (step === 0) onClose(); else setStep(s => s - 1); }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: 'var(--surface-app)' }}>
      {/* top bar */}
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, height: 'var(--nav-height)', padding: '0 18px', background: 'var(--white)', borderBottom: '1px solid var(--border-subtle)', flex: 'none' }}>
        <Logo />
        <div style={{ width: 1, height: 24, background: 'var(--border-subtle)' }} />
        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-secondary)' }}>Proponent application</span>
        <div style={{ flex: 1 }} />
        <WButton variant="ghost" size="sm" iconLeft="x" onClick={onClose}>Exit</WButton>
      </header>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* stepper */}
        <aside style={{ width: 280, flex: 'none', background: 'var(--white)', borderRight: '1px solid var(--border-subtle)', padding: '24px 18px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14, paddingLeft: 6 }}>Application steps</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {STEPS.map((s, i) => {
              const done = i < step, active = i === step;
              return (
                <button key={s.key} onClick={() => i <= step && setStep(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 10px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: i <= step ? 'pointer' : 'default', textAlign: 'left', background: active ? 'var(--surface-selected)' : 'transparent' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, flex: 'none', borderRadius: 999, background: done ? 'var(--brand-primary)' : active ? 'var(--white)' : 'var(--grey-100)', border: active ? '1.5px solid var(--brand-primary)' : '1.5px solid transparent', color: done ? '#fff' : active ? 'var(--brand-primary)' : 'var(--text-muted)', fontFamily: 'var(--font-data)', fontSize: 13, fontWeight: 700 }}>
                    {done ? <WIcon name="check" size={15} strokeWidth={3} /> : i + 1}
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 'var(--fs-sm)', fontWeight: active ? 700 : 600, color: active ? 'var(--green-700)' : done ? 'var(--ink-900)' : 'var(--text-secondary)' }}>{s.label}</span>
                    <span style={{ display: 'block', fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)' }}>{s.hint}</span>
                  </span>
                </button>
              );
            })}
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--green-050)' }}>
            <WIcon name="leaf" size={16} style={{ color: 'var(--brand-primary)', marginTop: 1, flex: 'none' }} />
            <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--green-700)', lineHeight: 1.45 }}>Credentials are issued by the Verst team after your application is reviewed. You’ll receive a workspace and admin login by email.</span>
          </div>
        </aside>

        {/* form pane */}
        <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '32px 40px' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Step {step + 1} of {STEPS.length}</div>
              <h1 style={{ fontSize: 'var(--fs-h1)', fontWeight: 800, color: 'var(--ink-900)', marginTop: 4 }}>{STEPS[step].label}</h1>
            </div>

            {step === 0 && <OrgStep form={form} set={set} logoSrc={logoSrc} setLogoSrc={setLogoSrc} countries={D.COUNTRIES} />}
            {step === 1 && <ContactStep form={form} set={set} />}
            {step === 2 && <ProjectStep form={form} set={set} toggleFuel={toggleFuel} fuels={D.FUEL_KEYS} standards={D.STANDARDS} />}
            {step === 3 && <DocsStep form={form} set={set} />}
            {step === 4 && <ReviewStep form={form} logoSrc={logoSrc} setStep={setStep} fuelLabel={D.FUEL_LABEL} />}

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
              <WButton variant="secondary" iconLeft={step === 0 ? 'x' : 'chevronRight'} onClick={back} style={step !== 0 ? { transform: 'scaleX(-1)' } : null}>
                <span style={step !== 0 ? { display: 'inline-block', transform: 'scaleX(-1)' } : null}>{step === 0 ? 'Cancel' : 'Back'}</span>
              </WButton>
              <div style={{ flex: 1 }} />
              {!stepValid[step] && <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Complete required fields to continue</span>}
              <WButton iconRight={last ? null : 'chevronRight'} iconLeft={last ? 'check' : null} disabled={!stepValid[step]} onClick={next}>
                {last ? 'Submit application' : 'Continue'}
              </WButton>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Field({ children, full }) {
  return <div style={{ gridColumn: full ? '1 / -1' : 'auto' }}>{children}</div>;
}
function Grid({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>{children}</div>;
}

function OrgStep({ form, set, logoSrc, setLogoSrc, countries }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
        <div style={{ flex: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--text-body)' }}>Company logo</label>
          <image-slot id="vc-application-logo" shape="rounded" radius="14" placeholder="Drop logo" style={{ width: '96px', height: '96px' }} ref={(el) => { if (el && !el.__bound) { el.__bound = true; el.addEventListener('image-change', (e) => setLogoSrc(e.detail && e.detail.src ? e.detail.src : null)); } }}></image-slot>
          <span style={{ fontSize: 'var(--fs-2xs)', color: 'var(--text-muted)', maxWidth: 96 }}>PNG or SVG, square</span>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          <Field full><WInput label="Full legal company name" required placeholder="e.g. Savanna Stoves Cooperative" value={form.legalName} onChange={e => set('legalName', e.target.value)} /></Field>
          <Field><WInput label="Trading / brand name" placeholder="e.g. Savanna Stoves" value={form.tradingName} onChange={e => set('tradingName', e.target.value)} /></Field>
          <Field><WInput label="Company registration no." placeholder="Registration number" value={form.regNo} onChange={e => set('regNo', e.target.value)} /></Field>
        </div>
      </div>
      <Grid>
        <Field><WSelect label="Country of incorporation" required placeholder="Select country" value={form.country} onChange={e => set('country', e.target.value)} options={countries.map(c => ({ value: c, label: c }))} /></Field>
        <Field><WInput label="Year established" placeholder="e.g. 2020" value={form.founded} onChange={e => set('founded', e.target.value)} /></Field>
        <Field full><WInput label="Website" iconLeft="activity" placeholder="https://" value={form.website} onChange={e => set('website', e.target.value)} /></Field>
      </Grid>
    </div>
  );
}

function ContactStep({ form, set }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>This person becomes the proponent workspace’s first administrator once credentials are issued.</div>
      <Grid>
        <Field><WInput label="Full name" required iconLeft="user" placeholder="Primary contact" value={form.contactName} onChange={e => set('contactName', e.target.value)} /></Field>
        <Field><WInput label="Job title" placeholder="e.g. Programme Director" value={form.contactTitle} onChange={e => set('contactTitle', e.target.value)} /></Field>
        <Field><WInput label="Work email" required type="email" placeholder="name@company.org" value={form.contactEmail} onChange={e => set('contactEmail', e.target.value)} error={form.contactEmail && !/.+@.+\..+/.test(form.contactEmail) ? 'Enter a valid email' : null} hint="Becomes the login for this workspace" /></Field>
        <Field><WInput label="Phone" placeholder="+000 000 000 000" value={form.contactPhone} onChange={e => set('contactPhone', e.target.value)} /></Field>
        <Field><WSelect label="Preferred role" value={form.role} onChange={e => set('role', e.target.value)} options={[{ value: 'manager', label: 'Project manager' }, { value: 'engineer', label: 'Field engineer lead' }]} /></Field>
      </Grid>
    </div>
  );
}

function ProjectStep({ form, set, toggleFuel, fuels, standards }) {
  const D = VC_DATA;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--text-body)', marginBottom: 9 }}>Fuel types operated <span style={{ color: 'var(--danger-500)' }}>*</span></label>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
          {fuels.map(f => {
            const on = form.fuels.includes(f);
            return (
              <button key={f} onClick={() => toggleFuel(f)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 12px', borderRadius: 'var(--radius-pill)', cursor: 'pointer', background: on ? 'var(--green-tint)' : 'var(--white)', border: '1.5px solid ' + (on ? 'var(--brand-primary)' : 'var(--border-default)'), color: on ? 'var(--green-700)' : 'var(--text-body)', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', fontWeight: 600 }}>
                {on ? <WIcon name="check" size={14} strokeWidth={3} /> : <WIcon name="plus" size={14} />}
                {D.FUEL_LABEL[f]}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--text-body)', marginBottom: 9 }}>End-use focus</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['household', 'Households', 'home'], ['institution', 'Institutions', 'building'], ['both', 'Both', 'users']].map(([k, l, ic]) => (
            <button key={k} onClick={() => set('endUse', k)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: form.endUse === k ? 'var(--surface-selected)' : 'var(--white)', border: '1.5px solid ' + (form.endUse === k ? 'var(--brand-primary)' : 'var(--border-default)'), color: form.endUse === k ? 'var(--green-700)' : 'var(--text-body)', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', fontWeight: 600 }}>
              <WIcon name={ic} size={15} />{l}
            </button>
          ))}
        </div>
      </div>
      <Grid>
        <Field><WInput label="Regions of operation" iconLeft="mapPin" placeholder="e.g. Kano, Kaduna" value={form.regions} onChange={e => set('regions', e.target.value)} /></Field>
        <Field><WInput label="Estimated devices at launch" suffix="units" placeholder="e.g. 1,200" value={form.estDevices} onChange={e => set('estDevices', e.target.value)} /></Field>
        <Field><WSelect label="Carbon standard" required placeholder="Select standard" value={form.standard} onChange={e => set('standard', e.target.value)} options={standards.map(s => ({ value: s, label: s }))} /></Field>
        <Field><WSelect label="Quantification methodology" placeholder="Select method" value={form.methodology} onChange={e => set('methodology', e.target.value)} options={[{ value: 'Metered & Measured', label: 'Metered & Measured' }, { value: 'Sensor-direct metering', label: 'Sensor-direct metering' }, { value: 'Hybrid (sensor + survey)', label: 'Hybrid (sensor + survey)' }]} /></Field>
      </Grid>
    </div>
  );
}

function DocBox({ label, hint, checked, onClick }) {
  return (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '14px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', background: checked ? 'var(--green-050)' : 'var(--white)', border: '1px solid ' + (checked ? 'var(--brand-primary)' : 'var(--border-default)') }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, flex: 'none', borderRadius: 8, background: checked ? 'var(--brand-primary)' : 'var(--grey-100)', color: checked ? '#fff' : 'var(--text-muted)' }}><WIcon name={checked ? 'check' : 'download'} size={16} strokeWidth={checked ? 3 : 2} /></span>
      <span style={{ flex: 1 }}>
        <span style={{ display: 'block', fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--ink-900)' }}>{label}</span>
        <span style={{ display: 'block', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{hint}</span>
      </span>
      <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: checked ? 'var(--green-700)' : 'var(--brand-primary)' }}>{checked ? 'Attached' : 'Upload'}</span>
    </button>
  );
}

function DocsStep({ form, set }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <DocBox label="Certificate of incorporation" hint="PDF · proves the legal entity" checked={form.docIncorp} onClick={() => set('docIncorp', !form.docIncorp)} />
      <DocBox label="Project Design Document (PDD)" hint="PDF · methodology & baseline" checked={form.docPdd} onClick={() => set('docPdd', !form.docPdd)} />
      <div style={{ height: 4 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--grey-050)', border: '1px solid var(--border-subtle)' }}>
        <WCheck checked={form.ackData} onChange={e => set('ackData', e.target.checked)} label="I confirm the information provided is accurate and I am authorised to represent this organisation." />
        <WCheck checked={form.ackImmutable} onChange={e => set('ackImmutable', e.target.checked)} label="I understand that raw telemetry captured on the platform is immutable and used for carbon quantification." />
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '9px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--ink-900)', textAlign: 'right' }}>{value || '—'}</span>
    </div>
  );
}

function ReviewStep({ form, logoSrc, setStep, fuelLabel }) {
  const D = VC_DATA;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderRadius: 'var(--radius-md)', background: 'var(--white)', border: '1px solid var(--border-subtle)' }}>
        <WLogo name={form.legalName || 'New proponent'} src={logoSrc} size={52} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 'var(--fs-h3)', fontWeight: 700, color: 'var(--ink-900)' }}>{form.legalName || 'Company name'}</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{form.tradingName ? form.tradingName + ' · ' : ''}{form.country || 'Country'}</div>
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 240 }}>{form.fuels.map(f => <WFuel key={f} fuel={f} short size="sm" />)}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 28px' }}>
        <Section title="Organisation" onEdit={() => setStep(0)}>
          <ReviewRow label="Legal name" value={form.legalName} />
          <ReviewRow label="Registration" value={form.regNo} />
          <ReviewRow label="Country" value={form.country} />
        </Section>
        <Section title="Primary contact" onEdit={() => setStep(1)}>
          <ReviewRow label="Name" value={form.contactName} />
          <ReviewRow label="Email" value={form.contactEmail} />
          <ReviewRow label="Title" value={form.contactTitle} />
        </Section>
        <Section title="Project" onEdit={() => setStep(2)}>
          <ReviewRow label="Fuels" value={form.fuels.map(f => fuelLabel[f]).join(', ')} />
          <ReviewRow label="End-use" value={form.endUse} />
          <ReviewRow label="Standard" value={form.standard} />
          <ReviewRow label="Est. devices" value={form.estDevices} />
        </Section>
        <Section title="Documents" onEdit={() => setStep(3)}>
          <ReviewRow label="Incorporation" value={form.docIncorp ? 'Attached' : 'Not attached'} />
          <ReviewRow label="PDD" value={form.docPdd ? 'Attached' : 'Not attached'} />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, onEdit, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{title}</span>
        <button onClick={onEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--brand-primary)' }}>Edit</button>
      </div>
      {children}
    </div>
  );
}

/* Confirmation screen shown after submit */
function ApplicationSubmitted({ application, onDone }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: 'var(--surface-app)' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12, height: 'var(--nav-height)', padding: '0 18px', background: 'var(--white)', borderBottom: '1px solid var(--border-subtle)', flex: 'none' }}>
        <Logo />
      </header>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: 560, maxWidth: '100%', background: 'var(--white)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: 36, textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 999, background: 'var(--success-050)', color: 'var(--success-500)', marginBottom: 18 }}><WIcon name="checkCircle" size={30} /></span>
          <h1 style={{ fontSize: 'var(--fs-h1)', fontWeight: 800, color: 'var(--ink-900)' }}>Application submitted</h1>
          <p style={{ fontSize: 'var(--fs-body)', color: 'var(--text-secondary)', marginTop: 8, marginBottom: 22 }}>Thanks, {application.contactName || 'there'}. The Verst Carbon team will review {application.legalName || 'your application'} and issue workspace credentials by email.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 'var(--radius-md)', background: 'var(--grey-050)', border: '1px solid var(--border-subtle)', textAlign: 'left', marginBottom: 14 }}>
            <ApplicationLogoRef application={application} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 'var(--fs-2xs)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Reference</div>
              <div style={{ fontSize: 'var(--fs-h3)', fontWeight: 800, color: 'var(--ink-900)', fontFamily: 'var(--font-data)' }}>{application.id}</div>
            </div>
            <WBadge tone="warning" variant="soft" icon="clock">Pending review</WBadge>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <WButton variant="secondary" iconLeft="user" onClick={onDone}>Back to sign in</WButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationLogoRef({ application }) {
  const { ProponentLogo } = window.VerstCarbonDesignSystem_d4048d;
  return <ProponentLogo name={application.legalName || 'New proponent'} src={application.logo} size={44} />;
}

Object.assign(window, { ApplicationWizard, ApplicationSubmitted });

export { STEPS, ApplicationWizard, Field, Grid, OrgStep, ContactStep, ProjectStep, DocBox, DocsStep, ReviewRow, ReviewStep, Section, ApplicationSubmitted, ApplicationLogoRef };
