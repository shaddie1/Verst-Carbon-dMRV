/* Verst Carbon dMRV — sectoral-scope mock data (Waste Management + AFOLU) and
   the sector registry used by the scope switcher / portfolio. Deterministic so
   screenshots are stable. All figures are illustrative placeholders. */
/* eslint-disable */

// ---- Sectoral scopes (CDM/Gold Standard) the platform spans ----
// erKind: 'avoidance' = avoided/reduced emissions; 'removal' = carbon dioxide removal.
const SECTORS = [
  { id: 'portfolio', label: 'All sectoral scopes', short: 'Portfolio', scopeNo: '', icon: 'dashboard', color: '#008037', home: '/portfolio' },
  { id: 'energy', label: 'Energy Demand', short: 'Energy', scopeNo: '03', icon: 'flame', color: '#008037', home: '/energy', erKind: 'avoidance', programme: 'Kenya Clean Cooking PoA' },
  { id: 'waste', label: 'Waste Management', short: 'Waste', scopeNo: '13', icon: 'package', color: '#4b4f57', home: '/waste', erKind: 'removal', programme: 'Biochar Carbon Removal' },
  { id: 'afolu', label: 'Land Use & Forestry (AFOLU)', short: 'AFOLU', scopeNo: '14', icon: 'sprout', color: '#1f7a3d', home: '/afolu', erKind: 'avoidance', programme: 'Tsavo REDD+ · KWS' },
];
const sectorById = (id) => SECTORS.find(s => s.id === id);

const round = (n) => Math.round(n);
const CO2_PER_C = 44 / 12; // tCO₂ per tonne of carbon

// =====================================================================
// Waste Management — Biochar (PyCCS / biochar carbon removal)
// Carbon removed = biochar mass × carbon fraction × permanence × 44/12
// =====================================================================
const BIO_FEEDSTOCKS = ['Macadamia shells', 'Coffee husks', 'Rice husks', 'Prunings', 'Sawdust'];
const BIO_FACILITIES = [
  { id: 'PYR-01', name: 'Nyeri Pyrolysis Unit', county: 'Nyeri', tech: 'Continuous pyrolysis', capacityTpa: 1200, status: 'online' },
  { id: 'PYR-02', name: 'Meru Biochar Works', county: 'Meru', tech: 'Batch kiln (Kon-Tiki)', capacityTpa: 600, status: 'online' },
  { id: 'PYR-03', name: 'Kericho Estate Unit', county: 'Kericho', tech: 'Continuous pyrolysis', capacityTpa: 900, status: 'maintenance' },
];

// Deterministic batches across the facilities.
const BIO_BATCHES = (() => {
  const out = [];
  const cFrac = 0.78;          // carbon fraction of biochar
  const perm = 0.9;            // permanence (100-yr) fraction
  const yieldF = [0.32, 0.28, 0.30, 0.34, 0.31]; // biochar / feedstock by feedstock
  let id = 1048;
  BIO_FACILITIES.forEach((f, fi) => {
    const n = f.status === 'maintenance' ? 3 : 6;
    for (let i = 0; i < n; i++) {
      const fs = BIO_FEEDSTOCKS[(fi + i) % BIO_FEEDSTOCKS.length];
      const feed = 18 + ((fi * 7 + i * 5) % 26);            // tonnes feedstock
      const y = yieldF[(fi + i) % yieldF.length];
      const biochar = +(feed * y).toFixed(1);                // tonnes biochar
      const co2 = +(biochar * cFrac * perm * CO2_PER_C).toFixed(1);
      const day = String(2 + ((i * 4 + fi) % 26)).padStart(2, '0');
      out.push({
        id: 'B-' + (id++),
        facility: f.id, facilityName: f.name,
        feedstock: fs, feedstockMass: feed,
        biocharMass: biochar, carbonFraction: cFrac, permanence: perm,
        co2Removed: co2,
        date: '2026-0' + (3 + (fi % 3)) + '-' + day,
        status: i === 0 && f.status !== 'maintenance' ? 'in-progress' : 'verified',
      });
    }
  });
  return out;
})();

function bioTotals() {
  const verified = BIO_BATCHES.filter(b => b.status === 'verified');
  const feedstock = round(BIO_BATCHES.reduce((s, b) => s + b.feedstockMass, 0));
  const biochar = +BIO_BATCHES.reduce((s, b) => s + b.biocharMass, 0).toFixed(1);
  const co2 = round(verified.reduce((s, b) => s + b.co2Removed, 0));
  const yieldPct = Math.round(biochar / feedstock * 100);
  const facilitiesOnline = BIO_FACILITIES.filter(f => f.status === 'online').length;
  return { feedstock, biochar, co2, yieldPct, facilities: BIO_FACILITIES.length, facilitiesOnline, batches: BIO_BATCHES.length };
}

// Monthly biochar production (tonnes) for the dashboard chart.
const BIO_MONTHLY = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => ({
  label: m, value: round(38 + i * 9 + (i % 2 ? 6 : 0)),
}));

const WASTE_DATA = {
  FACILITIES: BIO_FACILITIES,
  BATCHES: BIO_BATCHES,
  MONTHLY: BIO_MONTHLY,
  totals: bioTotals,
  CO2_PER_C,
};

// =====================================================================
// AFOLU — Tsavo REDD+ (avoided deforestation), partner KWS
// =====================================================================
const AFOLU_PROJECT = {
  name: 'Tsavo REDD+',
  partner: 'Kenya Wildlife Service (KWS)',
  landscape: 'Tsavo Conservation Area',
  areaHa: 421000,
  vintage: '2026',
  methodology: 'VM0048 · REDD (Avoided Unplanned Deforestation)',
  crediting: '2025–2034 (10-yr)',
};

const AFOLU_STRATA = [
  { name: 'Riverine forest', type: 'Closed-canopy', areaHa: 38000, densityTcHa: 165, color: '#1f7a3d' },
  { name: 'Acacia–Commiphora woodland', type: 'Open woodland', areaHa: 214000, densityTcHa: 64, color: '#589630' },
  { name: 'Bushland & thicket', type: 'Shrubland', areaHa: 132000, densityTcHa: 33, color: '#7faf5e' },
  { name: 'Wooded grassland', type: 'Sparse', areaHa: 37000, densityTcHa: 14, color: '#c7dcb5' },
];

const AFOLU_PLOTS = (() => {
  const out = [];
  let id = 1;
  AFOLU_STRATA.forEach((st, si) => {
    const n = [6, 8, 6, 4][si];
    for (let i = 0; i < n; i++) {
      const measured = round(st.densityTcHa * (0.85 + ((si + i) % 5) * 0.06));
      out.push({
        id: 'P-' + String(id++).padStart(3, '0'),
        stratum: st.name,
        lat: -(2.6 + ((si * 7 + i) % 18) / 20).toFixed(3) * 1,
        lng: +(38.2 + ((si * 5 + i) % 16) / 20).toFixed(3),
        measuredTcHa: measured,
        lastVisit: '2026-0' + (2 + (i % 4)) + '-' + String(5 + ((si + i) % 22)).padStart(2, '0'),
        status: (si + i) % 7 === 0 ? 'due' : 'measured',
      });
    }
  });
  return out;
})();

// Forest cover (ha) — baseline (counterfactual loss) vs project (protected).
const AFOLU_COVER = ['2025', '2026', '2027', '2028', '2029', '2030'].map((y, i) => ({
  label: y,
  baseline: round(360000 - i * 7200),   // expected loss without the project
  project: round(360000 - i * 900),     // observed under protection
}));

function afoluTotals() {
  const carbonStockTc = round(AFOLU_STRATA.reduce((s, st) => s + st.areaHa * st.densityTcHa, 0));
  const forestCoverHa = round(AFOLU_STRATA.reduce((s, st) => s + st.areaHa, 0));
  const last = AFOLU_COVER[AFOLU_COVER.length - 1];
  const avoidedHa = round(last.project - last.baseline);     // ha deforestation avoided to date
  const erTco2e = round(avoidedHa * 78 * CO2_PER_C / 1);      // ~78 tC/ha avg lost biomass → tCO₂e
  const coverPct = Math.round(forestCoverHa / AFOLU_PROJECT.areaHa * 100);
  return {
    carbonStockTc, forestCoverHa, coverPct,
    avoidedHa, erTco2e,
    plots: AFOLU_PLOTS.length, strata: AFOLU_STRATA.length,
  };
}

const AFOLU_DATA = {
  PROJECT: AFOLU_PROJECT,
  STRATA: AFOLU_STRATA,
  PLOTS: AFOLU_PLOTS,
  COVER: AFOLU_COVER,
  totals: afoluTotals,
};

export { SECTORS, sectorById, WASTE_DATA, AFOLU_DATA };
