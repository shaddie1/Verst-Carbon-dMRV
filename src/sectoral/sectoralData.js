/* Kenya POA sectoral dashboard — shared data (ported from the updated
   "dMRV Sectoral Dashboard" mockup). Illustrative placeholders. */

const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const SCOPES = {
  energy: {
    key: 'energy', name: 'Energy demand', tagline: 'Clean cooking · EPC & institutional',
    cardSub: 'Clean cooking · EPC', methodology: 'Gold Standard · Metered & Measured', methodologyShort: 'Gold Standard · Metered',
    status: 'Crediting', accent: '#DD9B1F', accentBg: '#FBEFD2', accentFg: '#B57711',
    cardStatusBg: '#DFF1E5', cardStatusFg: '#00682C',
    sLabel: 'Smart meters', cardMetric: 'smart meters',
    kpi: { r: '128,400', rd: '12.4%', c: '96,000', cd: '8,200', p: '16', pd: '3', s: '2,180', sd: '180' },
    health: { reporting: '2,065 / 2,180', reportingPct: 95, completeness: 92, verification: 78 },
    monthly: [7.8, 8.9, 9.6, 10.4, 11.2, 12.1, 11.6, 12.8, 13.9, 14.6, 15.7, 16.4],
    counties: ['Nairobi', 'Kiambu', 'Nakuru', 'Kisumu', 'Machakos', 'Uasin Gishu'],
    projects: [
      { id: 'VPA-01', name: 'NACONEK school cooking — Central', loc: 'Central Kenya', sites: '842', red: '34,200', status: 'Crediting' },
      { id: 'VPA-02', name: 'Nairobi institutional cooking', loc: 'Nairobi', sites: '610', red: '28,900', status: 'Verified' },
      { id: 'VPA-04', name: 'EPC household programme', loc: 'Nakuru', sites: '540', red: '22,400', status: 'Monitoring' },
      { id: 'VPA-07', name: 'Clean cooking for clinics', loc: 'Kisumu', sites: '280', red: '14,800', status: 'Crediting' },
      { id: 'VPA-09', name: 'Machakos boarding schools', loc: 'Machakos', sites: '320', red: '12,100', status: 'In review' },
    ],
  },
  waste: {
    key: 'waste', name: 'Waste management', tagline: 'Composting · landfill gas · wastewater',
    cardSub: 'Composting · LFG', methodology: 'CDM AMS-III.F · Composting', methodologyShort: 'CDM AMS-III.F',
    status: 'Monitoring', accent: '#0E7490', accentBg: '#E2F2F6', accentFg: '#0B5A6B',
    cardStatusBg: '#E2F2F6', cardStatusFg: '#0B5A6B',
    sLabel: 'Facilities', cardMetric: 'facilities',
    kpi: { r: '41,600', rd: '6.1%', c: '34,800', cd: '3,100', p: '9', pd: '1', s: '740', sd: '24' },
    health: { reporting: '702 / 740', reportingPct: 95, completeness: 86, verification: 71 },
    monthly: [2.6, 2.8, 2.9, 3.0, 3.2, 3.3, 3.1, 3.4, 3.6, 3.7, 3.9, 4.0],
    counties: ['Nairobi', 'Nakuru', 'Kisumu', 'Kiambu', 'Mombasa'],
    projects: [
      { id: 'VPA-03', name: 'Dandora landfill gas capture', loc: 'Nairobi', sites: '1', red: '18,600', status: 'Crediting' },
      { id: 'VPA-06', name: 'Nakuru municipal composting', loc: 'Nakuru', sites: '240', red: '9,400', status: 'Monitoring' },
      { id: 'VPA-10', name: 'Kisumu wastewater treatment', loc: 'Kisumu', sites: '12', red: '6,800', status: 'Verified' },
      { id: 'VPA-12', name: 'Thika organics composting', loc: 'Kiambu', sites: '180', red: '6,800', status: 'In review' },
    ],
  },
  land: {
    key: 'land', name: 'AFOLU', tagline: 'Agriculture, forestry & other land use · ARR + REDD+',
    cardSub: 'ARR · REDD+', methodology: 'Verra VM0047 · ARR + REDD+', methodologyShort: 'Verra VM0047',
    status: 'In review', accent: '#008037', accentBg: '#DFF1E5', accentFg: '#00682C',
    cardStatusBg: '#FBEFD2', cardStatusFg: '#B57711',
    sLabel: 'Hectares', cardMetric: 'ha-plots',
    kpi: { r: '44,800', rd: '7.8%', c: '31,600', cd: '2,900', p: '13', pd: '1', s: '1,940', sd: '6' },
    health: { reporting: '1,838 / 1,940', reportingPct: 95, completeness: 79, verification: 66 },
    monthly: [2.8, 3.0, 3.1, 3.3, 3.4, 3.6, 3.5, 3.7, 3.9, 4.0, 4.1, 4.2],
    counties: ['Narok', 'Nyeri', 'Kakamega', 'Kilifi', 'Baringo'],
    projects: [
      { id: 'VPA-05', name: 'Mau forest afforestation', loc: 'Narok', sites: '620', red: '16,200', status: 'Crediting' },
      { id: 'VPA-08', name: 'Aberdare reforestation', loc: 'Nyeri', sites: '480', red: '12,400', status: 'Monitoring' },
      { id: 'VPA-11', name: 'Kakamega REDD+ conservation', loc: 'Kakamega', sites: '540', red: '9,800', status: 'In review' },
      { id: 'VPA-15', name: 'Coastal mangrove ARR', loc: 'Kilifi', sites: '300', red: '6,400', status: 'Pending' },
    ],
  },
};

const SCOPE_ORDER = ['energy', 'waste', 'land'];

const EVENTS = [
  { dot: '#008037', lead: 'Monitoring report VPA-12', text: 'submitted for verification — AFOLU', time: '2h' },
  { dot: '#B57711', lead: '8,200 tCO₂e', text: 'issued — Energy demand, vintage 2025', time: '5h' },
  { dot: '#0E7490', lead: 'Methane capture dip', text: 'flagged at Dandora landfill-gas site', time: '9h' },
  { dot: '#C0392B', lead: '37 devices', text: 'flagged: no data > 72h', time: '1d' },
  { dot: '#008037', lead: 'VPA-15 onboarding', text: 'completed · 620 ha enrolled', time: '1d' },
  { dot: '#0E7490', lead: '3,100 tCO₂e', text: 'verified — composting programme', time: '2d' },
];

const LIFECYCLE = [
  { label: 'Monitor', desc: 'Meters capture activity at source', icon: 'pulse' },
  { label: 'Quantify', desc: 'Reductions computed in tCO₂e', icon: 'bars' },
  { label: 'Verify', desc: 'Independent third-party audit', icon: 'shield' },
  { label: 'Issue', desc: 'Credits issued to registry', icon: 'cylinder' },
  { label: 'Retire', desc: 'Offset claimed & retired', icon: 'leaf' },
];

const STATUS = {
  Verified: { bg: '#DFF1E5', fg: '#00682C', dot: '#008037' },
  Crediting: { bg: '#E2F2F6', fg: '#0B5A6B', dot: '#0E7490' },
  Monitoring: { bg: '#EFF3EE', fg: '#36433B', dot: '#8C988F' },
  'In review': { bg: '#FBEFD2', fg: '#B57711', dot: '#DD9B1F' },
  Pending: { bg: '#EFF3EE', fg: '#4E5B52', dot: '#8C988F' },
};
const badgeStyle = (label) => {
  const t = STATUS[label] || STATUS.Pending;
  return { display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, padding: '4px 9px', borderRadius: 999, whiteSpace: 'nowrap', background: t.bg, color: t.fg };
};
const dotStyle = (label) => ({ width: 6, height: 6, borderRadius: '50%', flex: 'none', display: 'inline-block', background: (STATUS[label] || STATUS.Pending).dot });

export { SCOPES, SCOPE_ORDER, EVENTS, LIFECYCLE, MONTHS, STATUS, badgeStyle, dotStyle };
