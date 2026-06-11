/* Kenya National Clean Cooking PoA — public landing page.
   A faithful adaptation of Uganda's NCCCFF site (ugandapoa.verst.earth) for
   the Republic of Kenya, themed in Verst Carbon brand greens. Same Gold
   Standard GS4GG multi-fuel PoA structure; Kenya specifics: Ministry of
   Energy & Petroleum (MoEP) as coordinating entity, KEBS device
   certification, PoA-KE-2026, counties (not districts). Shared nav/footer/
   theme come from chrome.jsx. */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../designSystem.jsx';
import { INK, GREEN, GREEN_700, DEEP, LEAF, MUTED, SectionHead, section, PoaNav, PoaFooter } from './chrome.jsx';
import './poa.css';

const FACTS = [
  ['Coordinating & Managing Entity', 'Clean Cooking Unit · Ministry of Energy & Petroleum · Republic of Kenya'],
  ['Standard', 'Gold Standard GS4GG'],
  ['Methodologies', 'MECD v2.0 · RECH v5.0 · AWMS v2.0 · CLEAR'],
  ['Boundary', 'Republic of Kenya'],
  ['Crediting', '5-year cycles · up to 2 renewals (≤20y)'],
  ['Fuel pathways', 'Electric · LPG · Biogas · Bioethanol · Briquettes · Pellets'],
];

const METRICS = [
  ['Devices Deployed', '2'],
  ['Admitted Implementing Partners', '1'],
  ['tCO₂e Reduced', '0'],
  ['GSVERs Issued', '0'],
];

const STAGES = [
  { n: 1, icon: 'file', title: 'VPA Admission', body: 'Submit a formal VPA admission assessed against the PoA eligibility criteria, reviewed by the Clean Cooking Unit, MoEP. A Confirmation Letter and signed VPA Pack are issued on approval.' },
  { n: 2, icon: 'cpu', title: 'Register KEBS Devices', body: 'Deploy KEBS-certified devices meeting methodology performance thresholds, with unique serials and GPS coordinates. Every metered device is onboarded to the MoEP dMRV platform.' },
  { n: 3, icon: 'activity', title: 'Monitor & Report', body: 'Stream metered data (MECD) or run KPT/CCT/SUMs campaigns (RECH/CLEAR/AWMS), per the methodology applicable to your VPA.' },
  { n: 4, icon: 'checkCircle', title: 'Verify & Issue', body: 'Independent VVB validation and verification under Gold Standard GS4GG. On successful verification, GS-VERs are issued to your registry account in 5-year cycles.' },
];

const FUELS = [
  { key: 'Electric', icon: 'zap', desc: 'Metered electric pressure cookers, hotplates and induction (MECD).', color: '#2f6fed' },
  { key: 'LPG', icon: 'fuelTank', desc: 'Metered liquefied petroleum gas cooking systems (MECD).', color: '#7c5cd6' },
  { key: 'Biogas', icon: 'droplet', desc: 'Household and institutional biodigesters (MECD / RECH).', color: '#0e9a96' },
  { key: 'Bioethanol', icon: 'leaf', desc: 'Liquid bioethanol stoves and fuel supply (MECD / RECH).', color: '#0e9a96' },
  { key: 'Briquettes', icon: 'package', desc: 'Improved combustion of biomass briquettes (RECH / CLEAR).', color: '#d9821c' },
  { key: 'Pellets', icon: 'sprout', desc: 'Gasifier and forced-draft pellet stoves (RECH / CLEAR).', color: '#7e9c1a' },
];

const METHODS = [
  { code: 'MECD', ver: 'v2.0', title: 'Metered & Measured Energy Cooking Devices', body: 'Direct metering of clean cooking energy. For the electric, LPG and biogas pathways.' },
  { code: 'RECH', ver: 'v5.0', title: 'Reduced Emissions from Cooking & Heating', body: 'Survey-based quantification (KPT/CCT) for solid- and liquid-fuel pathways.' },
  { code: 'AWMS', ver: 'v2.0', title: 'Adoption of woodfuel- & biomass-saving systems', body: 'Hybrid quantification for improved-combustion biomass devices.' },
  { code: 'CLEAR', ver: '', title: 'Streamlined GS4GG clean-cooking approach', body: 'Simplified monitoring for eligible briquette and pellet pathways.' },
];

const SDGS = [
  { n: 13, color: '#3f7e44', title: 'Climate Action', target: '13.2 — Integrate climate measures into national policies', metric: 'tCO₂e emission reductions from displacement of non-renewable biomass and adoption of cleaner cooking technologies' },
  { n: 7, color: '#fcc30b', title: 'Affordable & Clean Energy', target: '7.1 — Universal access to affordable, reliable modern energy by 2030', metric: 'Households and institutions with access to modern clean cooking; MWh of clean cooking energy delivered' },
  { n: 3, color: '#4c9f38', title: 'Good Health & Well-being', target: '3.9 — Reduce illnesses from air, water and soil pollution', metric: 'Averted Disability-Adjusted Life Years (aDALYs) from reduced household air pollution' },
  { n: 5, color: '#ff3a21', title: 'Gender Equality', target: '5.4 — Recognise unpaid care and domestic work', metric: 'Reduced time burden on women and girls from cooking and fuel collection (hours saved/household/week)' },
  { n: 15, color: '#56c02b', title: 'Life on Land', target: '15.2 — Sustainable management of forests', metric: 'Tonnes of non-renewable woody biomass saved; hectares of forest degradation averted' },
  { n: 8, color: '#a21942', title: 'Decent Work & Growth', target: '8.5 — Productive employment and decent work', metric: 'Green jobs across manufacturing, distribution, installation, maintenance and monitoring' },
];

const MODULES = [
  { icon: 'file', title: 'Resources', body: 'Policies, PoA design documents, methodologies, legal documents and templates.' },
  { icon: 'users', title: 'Stakeholder Consultations', body: 'Dates, venues, attendance, reports, photos and recordings of every LSC session.' },
  { icon: 'alert', title: 'Grievance Redress', body: 'File or track a grievance — logged, SLA-bound and resolved transparently.' },
  { icon: 'inbox', title: 'Public Registry', body: 'VPAs, admitted Implementing Partners and live emission-reduction performance.' },
];

const MONITOR = [
  ['0', 'tCO₂e Reduced'],
  ['2', 'Active Devices'],
  ['0', 'GS-VERs Issued'],
  ['1', 'Implementing Partners'],
];

const GOVERNANCE = [
  { tag: 'STEERING COMMITTEE', title: 'National Oversight & Approvals', body: 'Chaired by MoEP. Approves VPA admissions, monitors programme performance, and resolves cross-cutting policy decisions.' },
  { tag: 'TECH WORKING GROUP', title: 'Data & Digital MRV', body: 'dMRV platform standards, data quality, methodology applicability.' },
  { tag: 'TECH WORKING GROUP', title: 'Carbon Finance & Markets', body: 'Programme structuring, benefit sharing, issuance and CORSIA eligibility.' },
  { tag: 'TECH WORKING GROUP', title: 'Safeguards & Integrity', body: 'ESIA, gender, FPIC, GRM and registry crosscheck oversight.' },
];

// Placeholder VPA partners (Kenya measures coverage in counties, not districts).
const PARTNERS = [
  { letter: 'V', name: 'Verst Energies Kenya', id: 'VPN-VERST-001', fuels: ['E-Cooking'], devices: 3, counties: 3 },
  { letter: 'J', name: 'Jiko Clean Cooking', id: 'VPN-JIKO-002', fuels: ['E-Cooking', 'LPG'], devices: 0, counties: 47 },
  { letter: 'M', name: 'Mwango Energy', id: 'VPN-MWANGO-003', fuels: ['Briquettes & Pellets'], devices: 0, counties: 30 },
  { letter: 'P', name: 'Pwani Biogas', id: 'VPN-PWANI-004', fuels: ['Biogas', 'Improved Biomass'], devices: 0, counties: 12 },
  { letter: 'K', name: 'Kenya Verst Test', id: 'VPN-KENYA-005', fuels: ['E-Cooking', 'LPG'], devices: 0, counties: 47 },
];

function PoaLanding() {
  const navigate = useNavigate();
  return (
    <div className="poa">
      <PoaNav />
      <Hero navigate={navigate} />
      <ProgrammeBar />
      <Process />
      <FuelPathways />
      <Methodologies />
      <WhoCanApply navigate={navigate} />
      <Sdgs />
      <Governance />
      <Modules />
      <Monitoring navigate={navigate} />
      <Consultations />
      <Grievance />
      <Partners navigate={navigate} />
      <CtaBand navigate={navigate} />
      <PoaFooter />
    </div>
  );
}

/* ---- hero ---- */
function Hero({ navigate }) {
  return (
    <section className="poa-hero" id="top">
      <div className="poa-shell" style={{ padding: '92px 24px 84px', position: 'relative', zIndex: 1 }}>
        <div className="poa-eyebrow" style={{ color: LEAF }}>Republic of Kenya · MoEP</div>
        <h1 style={{ fontSize: 60, fontWeight: 900, marginTop: 18, maxWidth: 880 }}>
          National Clean Cooking <span className="poa-amber-text">Carbon Financing Framework</span>
        </h1>
        <p style={{ marginTop: 14, fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
          incorporating the Kenya National Clean Cooking Programme of Activities
        </p>
        <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6, maxWidth: 720, color: 'rgba(255,255,255,0.8)' }}>
          Kenya's sovereign, multi-fuel Programme of Activities under Gold Standard GS4GG — mobilising
          carbon finance to accelerate the transition to low-carbon clean cooking for households and
          institutions across the Republic of Kenya.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 34 }}>
          <button className="poa-btn poa-btn--primary" onClick={() => navigate('/apply')}>Apply as Implementing Partner</button>
          <a className="poa-btn poa-btn--ghost" href="#partners">View Programme Partners</a>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 30 }}>
          <span className="poa-pill"><Icon name="checkCircle" size={14} /> GS4GG · In Design Submission</span>
          <span className="poa-pill"><Icon name="flame" size={14} /> Six Fuel Pathways</span>
          <span className="poa-pill"><Icon name="clock" size={14} /> 20-year PoA duration</span>
        </div>
      </div>
    </section>
  );
}

/* ---- programme summary bar ---- */
function ProgrammeBar() {
  return (
    <section id="programme" style={{ background: DEEP, color: '#fff' }}>
      <div className="poa-shell" style={{ padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 22 }}>
          {FACTS.map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{k}</div>
              <div style={{ marginTop: 7, fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 30, paddingTop: 26, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="poa-pill" style={{ background: 'rgba(127,175,94,0.16)', borderColor: 'rgba(127,175,94,0.4)', color: LEAF }}>In Design Submission · PoA-KE-2026</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: 18, flex: 1, minWidth: 280 }}>
            {METRICS.map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{v}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>{k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- process ---- */
function Process() {
  return (
    <section style={section()}>
      <div className="poa-shell">
        <SectionHead eyebrow="Process" title="From Application to Carbon Credits"
          sub="A streamlined four-stage journey for VPA implementing partners under the Kenya Multi-Fuel Clean Cooking PoA." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 18 }}>
          {STAGES.map(s => (
            <div key={s.n} className="poa-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, borderRadius: 10, background: 'rgba(0,128,55,0.1)', color: GREEN }}><Icon name={s.icon} size={20} /></span>
                <span style={{ fontSize: 13, fontWeight: 900, color: GREEN }}>{String(s.n).padStart(2, '0')}</span>
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 800, marginTop: 16 }}>{s.title}</h3>
              <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.55, color: MUTED }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- fuel pathways ---- */
function FuelPathways() {
  return (
    <section style={section({ background: '#fff', borderTop: '1px solid var(--poa-line)', borderBottom: '1px solid var(--poa-line)' })}>
      <div className="poa-shell">
        <SectionHead eyebrow="Six fuel pathways, one PoA" title="Six Fuel Pathways, One PoA"
          sub="A single programme boundary consolidating the clean cooking technologies eligible for carbon finance in Kenya." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: 18 }}>
          {FUELS.map(f => (
            <div key={f.key} className="poa-card" style={{ padding: 24, display: 'flex', gap: 16 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 12, background: f.color + '18', color: f.color, flex: 'none' }}><Icon name={f.icon} size={24} /></span>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>{f.key}</h3>
                <p style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5, color: MUTED }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- methodologies ---- */
function Methodologies() {
  return (
    <section style={section()}>
      <div className="poa-shell">
        <SectionHead eyebrow="Four approved methodologies" title="Four Approved Methodologies"
          sub="Each VPA applies the Gold Standard GS4GG methodology appropriate to its fuel pathway and metering approach." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: 18 }}>
          {METHODS.map(m => (
            <div key={m.code} className="poa-card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: INK }}>{m.code}</span>
                {m.ver && <span style={{ fontSize: 13, fontWeight: 800, color: GREEN }}>{m.ver}</span>}
              </div>
              <div style={{ marginTop: 8, fontSize: 14, fontWeight: 800, color: INK }}>{m.title}</div>
              <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.5, color: MUTED }}>{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- who can apply ---- */
function WhoCanApply({ navigate }) {
  const points = [
    'Manufacturers, distributors and project developers deploying KEBS-certified clean cooking devices in Kenya.',
    'Operators able to meet methodology performance thresholds and per-device metering or survey requirements.',
    'Entities able to satisfy GS4GG safeguards — ESIA, gender, FPIC and grievance redress.',
    'Each application is reviewed by the CME against the PoA eligibility criteria.',
  ];
  return (
    <section style={section({ background: DEEP, color: '#fff' })} id="apply">
      <div className="poa-shell" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, alignItems: 'center' }}>
        <div>
          <SectionHead light eyebrow="Who can apply" title="Who Can Apply"
            sub="Eligibility screening · methodology applicability · technology & safety verification · baseline and monitoring plan review · safeguards screening · formal CME admission decision." />
          <button className="poa-btn poa-btn--primary" onClick={() => navigate('/apply')}>Apply as Implementing Partner</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {points.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Icon name="checkCircle" size={20} style={{ color: LEAF, flex: 'none' }} />
              <span style={{ fontSize: 14.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Official UN SDG tile from /public/sdg/sdg-<n>.png; falls back to a
   coloured number badge until the asset is added. */
function SdgIcon({ n, color }) {
  const [err, setErr] = React.useState(false);
  if (err) {
    return <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 10, background: color, color: '#fff', fontWeight: 900, fontSize: 20, flex: 'none' }}>{n}</span>;
  }
  return <img src={`/sdg/sdg-${n}.jpg`} alt={`SDG ${n}`} onError={() => setErr(true)} style={{ width: 56, height: 56, borderRadius: 8, display: 'block', flex: 'none', objectFit: 'cover' }} />;
}

/* ---- SDGs ---- */
function Sdgs() {
  return (
    <section style={section({ background: '#fff', borderTop: '1px solid var(--poa-line)', borderBottom: '1px solid var(--poa-line)' })}>
      <div className="poa-shell">
        <SectionHead eyebrow="Sustainable development" title="Six SDG Impacts"
          sub="SDG 13 (mandatory) plus five co-benefits — assessed at VPA level per the GS4GG SDG Tool." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: 18 }}>
          {SDGS.map(s => (
            <div key={s.n} className="poa-card" style={{ padding: 22, display: 'flex', gap: 16 }}>
              <SdgIcon n={s.n} color={s.color} />
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 800 }}>{s.title}</h3>
                <div style={{ marginTop: 4, fontSize: 12.5, fontWeight: 700, color: GREEN }}>{s.target}</div>
                <p style={{ marginTop: 8, fontSize: 13, lineHeight: 1.5, color: MUTED }}>{s.metric}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- governance ---- */
function Governance() {
  return (
    <section style={section()}>
      <div className="poa-shell">
        <SectionHead eyebrow="Governance" title="Programme Governance"
          sub="A Steering Committee chaired by MoEP provides national oversight; three Technical Working Groups deliver depth across data, finance, and safeguards. The Programme Management Unit operates daily." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 18 }}>
          {GOVERNANCE.map(g => (
            <div key={g.title} className="poa-card" style={{ padding: 22 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: GREEN }}>{g.tag}</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, marginTop: 10 }}>{g.title}</h3>
              <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.5, color: MUTED }}>{g.body}</p>
            </div>
          ))}
        </div>
        <div className="poa-card" style={{ padding: 22, marginTop: 18, background: '#fff' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: MUTED }}>PROGRAMME MANAGEMENT UNIT · Day-to-day delivery</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
            {['Programme Coordinator', 'dMRV Officer', 'Safeguards & Stakeholder Engagement Officer', 'Carbon Finance & Issuance Officer'].map(r => (
              <span key={r} className="poa-pill" style={{ background: '#eef3e8', borderColor: 'var(--poa-line)', color: INK }}>{r}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- modules ---- */
function Modules() {
  return (
    <section style={section({ background: DEEP, color: '#fff' })} id="modules">
      <div className="poa-shell">
        <SectionHead light eyebrow="Programme modules" title="Everything in one place"
          sub="Open access to the programme's documents, consultations, accountability channels and public carbon registry." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 18 }}>
          {MODULES.map(m => (
            <div key={m.title} style={{ padding: 22, borderRadius: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: 10, background: 'rgba(127,175,94,0.16)', color: LEAF }}><Icon name={m.icon} size={22} /></span>
              <h3 style={{ fontSize: 17, fontWeight: 800, marginTop: 14 }}>{m.title}</h3>
              <p style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.65)' }}>{m.body}</p>
              <div style={{ marginTop: 12, fontSize: 13, fontWeight: 800, color: LEAF }}>Open →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- monitoring ---- */
function Monitoring({ navigate }) {
  return (
    <section style={section()}>
      <div className="poa-shell">
        <SectionHead eyebrow="National dMRV" title="Live programme monitoring"
          sub="Digital MRV across every VPA — metered devices streaming in real time and non-metered surveys, aggregated into national clean-cooking emission reductions." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 18 }}>
          {MONITOR.map(([v, k]) => (
            <div key={k} className="poa-card" style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: INK, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
              <div style={{ marginTop: 6, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED }}>{k}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
          <button className="poa-btn poa-btn--dark" onClick={() => navigate('/login')}>Explore the public registry</button>
          <button className="poa-btn" style={{ background: '#fff', color: INK, border: '1px solid var(--poa-line)' }} onClick={() => navigate('/poa/stakeholders')}>View stakeholder impact gaps →</button>
        </div>
      </div>
    </section>
  );
}

/* ---- consultations ---- */
function Consultations() {
  return (
    <section style={section({ background: '#fff', borderTop: '1px solid var(--poa-line)' })} id="consultations">
      <div className="poa-shell" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: 40, alignItems: 'center' }}>
        <div>
          <SectionHead eyebrow="Local stakeholder consultation" title="Consultations across Kenya"
            sub="PoA-level and regional VPA sessions with a public feedback window — full schedule, attendance, reports, photos and recordings are published as each session concludes." />
          <a className="poa-btn poa-btn--dark" href="#grievance">View consultations</a>
        </div>
        <div className="poa-card" style={{ padding: 24, background: 'var(--poa-bg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon name="users" size={22} style={{ color: GREEN }} />
            <div style={{ fontWeight: 800 }}>Public feedback window</div>
          </div>
          <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.55, color: MUTED }}>
            Each Local Stakeholder Consultation publishes its minutes, attendance register and a 30-day
            feedback window — open to communities, county officials and civil society across Kenya.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---- grievance ---- */
function Grievance() {
  return (
    <section style={section({ background: DEEP, color: '#fff' })} id="grievance">
      <div className="poa-shell" style={{ maxWidth: 820 }}>
        <SectionHead light eyebrow="Grievance redress" title="Voice your concern"
          sub="Anyone affected by the programme may raise a grievance — online, anonymously, or through the Process Book, SMS/WhatsApp and hotline. Every case is logged, assigned an SLA, and resolved transparently with documented responses you can track." />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a className="poa-btn poa-btn--primary" href="#grievance">File a grievance</a>
          <a className="poa-btn poa-btn--ghost" href="#grievance">Track a case</a>
        </div>
      </div>
    </section>
  );
}

/* ---- partners ---- */
function Partners({ navigate }) {
  return (
    <section style={section()} id="partners">
      <div className="poa-shell">
        <SectionHead eyebrow="Directory · VPA" title="Implementing Partners"
          sub="Admitted proponents across Kenya. Live device counts and county coverage update as VPAs onboard." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px,1fr))', gap: 16 }}>
          {PARTNERS.map(p => (
            <div key={p.id} className="poa-card" style={{ padding: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: 12, background: 'rgba(0,128,55,0.1)', color: GREEN, fontWeight: 900, fontSize: 18, flex: 'none' }}>{p.letter}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 15 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: MUTED, fontWeight: 700 }}>{p.id}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                  {p.fuels.map(f => <span key={f} className="poa-pill" style={{ background: '#eef3e8', borderColor: 'var(--poa-line)', color: INK, fontSize: 11 }}>{f}</span>)}
                </div>
              </div>
              <div style={{ textAlign: 'right', flex: 'none' }}>
                <div style={{ fontWeight: 900, fontSize: 18 }}>{p.devices}</div>
                <div style={{ fontSize: 11, color: MUTED }}>devices</div>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>{p.counties} counties</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <button className="poa-btn poa-btn--dark" onClick={() => navigate('/poa/stakeholders')}>See each partner's 5-year impact gaps →</button>
        </div>
      </div>
    </section>
  );
}

/* ---- CTA band ---- */
function CtaBand({ navigate }) {
  return (
    <section style={{ background: `linear-gradient(160deg, ${DEEP}, ${GREEN_700})`, color: '#fff' }}>
      <div className="poa-shell" style={{ padding: '72px 24px' }}>
        <div className="poa-card" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: 36, textAlign: 'center' }}>
          <h2 style={{ fontSize: 34, fontWeight: 900 }}>Ready to join the PoA?</h2>
          <p style={{ marginTop: 12, fontSize: 16, lineHeight: 1.55, color: 'rgba(255,255,255,0.72)', maxWidth: 620, margin: '12px auto 0' }}>
            Applications are reviewed within 5 business days. Once approved, you receive your proponent
            account and can immediately start registering devices.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 26 }}>
            <button className="poa-btn poa-btn--primary" onClick={() => navigate('/apply')}>Start Application</button>
            <button className="poa-btn poa-btn--ghost" onClick={() => navigate('/login')}>Check Existing Application</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export { PoaLanding };
