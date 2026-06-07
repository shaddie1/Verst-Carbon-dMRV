/* eslint-disable */
/* Verst Carbon dMRV — mock data for the UI kit.
   Deterministic so screenshots are stable. Exposed on window.VC_DATA
   plus helpers for proponent scoping. Plain JS (no JSX). */
  // ---- Fuels (mirrors the FuelBadge FUELS map) ----
  const FUEL_KEYS = ['biomass', 'electric', 'lpg', 'ethanol', 'pellets', 'biogas', 'biochar'];
  const FUEL_LABEL = {
    biomass: 'Improved biomass', electric: 'Electric', lpg: 'LPG',
    ethanol: 'Bio-ethanol', pellets: 'Briquettes / pellets', biogas: 'Biogas', biochar: 'Biochar',
  };
  const FUEL_UNIT = { biomass: 'kg', electric: 'kWh', lpg: 'kg', ethanol: 'litres', pellets: 'kg', biogas: 'm³', biochar: 'kg' };
  const FUEL_METHOD = { biomass: 'hybrid', electric: 'sensor-direct', lpg: 'sensor-direct', ethanol: 'sensor-direct', pellets: 'hybrid', biogas: 'sensor-direct', biochar: 'hybrid' };
  const FUEL_SENSOR = { biomass: 'Thermocouple', electric: 'Energy meter', lpg: 'Load cell', ethanol: 'Load cell', pellets: 'Load cell', biogas: 'Flow meter', biochar: 'Load cell' };

  // 14 device configurations across the 7 fuels
  const MODELS = {
    biomass: [{ id: 'TC-2', name: 'Thermocouple node v2' }, { id: 'TC-3', name: 'Thermocouple node v3' }],
    electric: [{ id: 'EM-1', name: 'Energy-meter node' }, { id: 'EM-2', name: 'Smart-plug meter' }],
    lpg: [{ id: 'LC-1', name: 'LPG load-cell node v1' }, { id: 'LC-2', name: 'LPG mass node' }],
    ethanol: [{ id: 'FL-1', name: 'Fuel-level sensor' }, { id: 'FL-2', name: 'Bio-ethanol node' }],
    pellets: [{ id: 'PH-1', name: 'Load-cell hopper' }, { id: 'PM-1', name: 'Pellet mass node' }],
    biogas: [{ id: 'FM-1', name: 'Flow-meter node' }, { id: 'BG-1', name: 'Biogas node' }],
    biochar: [{ id: 'PY-1', name: 'Pyrolysis-stove node' }, { id: 'BC-1', name: 'Biochar load-cell node' }],
  };

  // ---- Proponents (each scoped to a subset of fuels) ----
  const PROPONENTS = [
    { id: 'sahel', name: 'Sahel Clean Cooking', legalName: 'Sahel Clean Cooking SARL', country: 'Senegal', regNo: 'SN-2019-04471', website: 'sahelcc.org', fuels: ['biomass', 'lpg', 'ethanol'], users: 7, logo: null },
    { id: 'ecobraise', name: 'EcoBraise Ltd', legalName: 'EcoBraise Limited', country: 'Ghana', regNo: 'GH-CS-118254', website: 'ecobraise.com', fuels: ['pellets', 'biomass', 'biochar'], users: 4, logo: null },
    { id: 'brightcook', name: 'BrightCook Energy', legalName: 'BrightCook Energy Plc', country: 'Kenya', regNo: 'KE-PVT-902831', website: 'brightcook.energy', fuels: ['electric', 'biogas'], users: 6, logo: null },
    { id: 'jikobora', name: 'Jiko Bora', legalName: 'Jiko Bora Co. Ltd', country: 'Tanzania', regNo: 'TZ-2021-55190', website: 'jikobora.co.tz', fuels: ['biomass', 'biochar'], users: 3, logo: null },
    { id: 'maua', name: 'Maua Energy', legalName: 'Maua Energy Rwanda Ltd', country: 'Rwanda', regNo: 'RW-117-2020', website: 'mauaenergy.rw', fuels: ['biogas', 'ethanol'], users: 5, logo: null },
  ];

  const COUNTRIES = ['Senegal', 'Ghana', 'Kenya', 'Tanzania', 'Rwanda', 'Nigeria', 'Uganda', 'Ethiopia', 'Côte d’Ivoire', 'Malawi', 'Zambia', 'Mozambique'];
  const STANDARDS = ['Gold Standard', 'Verra (VCS)', 'CDM', 'Cercarbono'];

  // ---- Proponent applications (admin review queue) ----
  const APPLICATIONS = [
    {
      id: 'VC-APP-2026-0042', status: 'pending', submitted: '2026-06-05',
      legalName: 'Savanna Stoves Cooperative', tradingName: 'Savanna Stoves', regNo: 'NG-RC-7741920',
      country: 'Nigeria', website: 'savannastoves.ng', founded: '2020', logo: null,
      contactName: 'Ngozi Adeyemi', contactTitle: 'Programme Director', contactEmail: 'ngozi@savannastoves.ng', contactPhone: '+234 802 555 0112',
      fuels: ['biomass', 'pellets'], endUse: 'both', regions: 'Kano, Kaduna, Sokoto', estDevices: '1,200', standard: 'Gold Standard',
      methodology: 'Metered & Measured', docs: ['Certificate of incorporation', 'Project Design Document'],
    },
    {
      id: 'VC-APP-2026-0041', status: 'pending', submitted: '2026-06-04',
      legalName: 'Lake Region Biogas Ltd', tradingName: 'LakeGas', regNo: 'UG-118-2022',
      country: 'Uganda', website: 'lakegas.ug', founded: '2022', logo: null,
      contactName: 'David Okello', contactTitle: 'Founder & CEO', contactEmail: 'david@lakegas.ug', contactPhone: '+256 772 555 884',
      fuels: ['biogas'], endUse: 'institution', regions: 'Jinja, Mbale', estDevices: '420', standard: 'Verra (VCS)',
      methodology: 'Sensor-direct metering', docs: ['Certificate of incorporation'],
    },
    {
      id: 'VC-APP-2026-0039', status: 'approved', submitted: '2026-05-28',
      legalName: 'Highland Ethanol Ltd', tradingName: 'Highland', regNo: 'ET-CS-30021',
      country: 'Ethiopia', website: 'highlandethanol.et', founded: '2018', logo: null,
      contactName: 'Selam Bekele', contactTitle: 'Operations Lead', contactEmail: 'selam@highlandethanol.et', contactPhone: '+251 911 555 207',
      fuels: ['ethanol'], endUse: 'household', regions: 'Addis Ababa', estDevices: '2,800', standard: 'Gold Standard',
      methodology: 'Sensor-direct metering', docs: ['Certificate of incorporation', 'Project Design Document'],
    },
    {
      id: 'VC-APP-2026-0036', status: 'rejected', submitted: '2026-05-19',
      legalName: 'QuickCarbon Traders', tradingName: 'QuickCarbon', regNo: '—',
      country: 'Kenya', website: 'quickcarbon.io', founded: '2025', logo: null,
      contactName: 'Unverified applicant', contactTitle: 'Broker', contactEmail: 'info@quickcarbon.io', contactPhone: '+254 700 555 000',
      fuels: ['lpg'], endUse: 'household', regions: 'Unspecified', estDevices: '50', standard: 'CDM',
      methodology: '—', docs: [], rejectReason: 'Incomplete registration documents; no project design submitted.',
    },
  ];

  // ---- Geography (abstract map coordinates, 0..100 in the panel) ----
  const GEO = {
    sahel: { region: 'West Africa', x: 17, y: 38, towns: ['Dakar', 'Thiès', 'Kaolack'] },
    ecobraise: { region: 'West Africa', x: 30, y: 52, towns: ['Kumasi', 'Tamale'] },
    brightcook: { region: 'East Africa', x: 71, y: 60, towns: ['Nairobi', 'Kakamega', 'Nakuru'] },
    jikobora: { region: 'East Africa', x: 74, y: 70, towns: ['Dodoma', 'Arusha'] },
    maua: { region: 'East Africa', x: 66, y: 64, towns: ['Kigali', 'Musanze'] },
  };

  // ---- Seeded RNG ----
  function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  const rand = rng(20260607);
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];

  function imei() {
    let d = '35';
    for (let i = 0; i < 13; i++) d += Math.floor(rand() * 10);
    return d;
  }
  function fmtImei(s) { return s.slice(0, 6) + ' ' + s.slice(6, 12) + ' ' + s.slice(12); }

  // ---- End-use categories (apply across all fuels, every proponent) ----
  const INSTITUTIONS = [
    "St Mary's School", 'Riverside Clinic', 'Unity Eatery', 'Hill Secondary School',
    'Central Market Kitchen', 'Grace Academy', 'District Hospital', 'Bega Restaurant',
    'Nuru Health Centre', 'Kombo Vocational College',
  ];

  // ---- Devices ----
  const STATUSES = ['online', 'online', 'online', 'online', 'offline', 'fault'];
  const DEVICES = [];
  let hh = 100;
  PROPONENTS.forEach((p) => {
    const count = { sahel: 11, ecobraise: 8, brightcook: 9, jikobora: 7, maua: 6 }[p.id];
    for (let i = 0; i < count; i++) {
      const fuel = pick(p.fuels);
      const model = pick(MODELS[fuel]);
      const status = pick(STATUSES);
      const town = pick(GEO[p.id].towns);
      const lastSeenMin = status === 'online' ? Math.floor(rand() * 12) : status === 'offline' ? 4320 + Math.floor(rand() * 2880) : Math.floor(rand() * 240);
      const isInstitution = rand() < 0.3;
      const category = isInstitution ? 'institution' : 'household';
      const site = isInstitution ? pick(INSTITUTIONS) : 'HH-' + town.slice(0, 2).toUpperCase() + '-' + String(hh);
      hh++;
      DEVICES.push({
        imei: imei(),
        proponent: p.id,
        fuel,
        model: model.name,
        modelId: model.id,
        sensor: FUEL_SENSOR[fuel],
        category,
        site,
        household: site,
        town,
        status,
        lastSeenMin,
        battery: status === 'offline' ? Math.floor(rand() * 18) : 24 + Math.floor(rand() * 74),
        teg: 30 + Math.floor(rand() * 68),
        signal: status === 'offline' ? 0 : 1 + Math.floor(rand() * 4),
        installed: '2025-' + String(1 + Math.floor(rand() * 9)).padStart(2, '0') + '-' + String(1 + Math.floor(rand() * 27)).padStart(2, '0'),
      });
    }
  });

  // ---- Alerts feed ----
  const ALERTS = [
    { id: 1, type: 'offline', severity: 'danger', proponent: 'sahel', title: 'Device offline > 72h', detail: 'IMEI ' + fmtImei(DEVICES.find(d => d.proponent === 'sahel').imei) + ' · last seen 3d ago · Kaolack', time: '2h ago' },
    { id: 2, type: 'anomaly', severity: 'warning', proponent: 'brightcook', title: 'Sensor anomaly detected', detail: 'Energy-meter reading 4.8× baseline · Nairobi', time: '5h ago' },
    { id: 3, type: 'battery', severity: 'warning', proponent: 'jikobora', title: 'Low battery / TEG fault', detail: 'TEG output 0.2V below threshold · Arusha', time: '6h ago' },
    { id: 4, type: 'offline', severity: 'danger', proponent: 'ecobraise', title: 'Device offline > 72h', detail: 'Load-cell hopper unreachable · Tamale', time: '9h ago' },
    { id: 5, type: 'anomaly', severity: 'warning', proponent: 'maua', title: 'Flow-rate spike', detail: 'Biogas flow 3.1× rolling median · Kigali', time: '11h ago' },
    { id: 6, type: 'battery', severity: 'warning', proponent: 'sahel', title: 'Low battery', detail: 'Node at 8% · charging fault suspected · Thiès', time: '1d ago' },
  ];

  // ---- Helpers ----
  function scopeDevices(propId) { return propId && propId !== 'all' ? DEVICES.filter(d => d.proponent === propId) : DEVICES.slice(); }
  function scopeAlerts(propId) { return propId && propId !== 'all' ? ALERTS.filter(a => a.proponent === propId) : ALERTS.slice(); }
  function fuelsFor(propId) { return propId && propId !== 'all' ? (PROPONENTS.find(p => p.id === propId) || {}).fuels || [] : FUEL_KEYS.slice(); }
  function proponentName(id) { return (PROPONENTS.find(p => p.id === id) || {}).name || id; }

  // End-use breakdown: per-fuel household vs institution counts within scope
  function categoryByFuel(propId) {
    const ds = scopeDevices(propId);
    const fuels = fuelsFor(propId);
    return fuels.map(f => {
      const inF = ds.filter(d => d.fuel === f);
      return {
        fuel: f,
        household: inF.filter(d => d.category === 'household').length,
        institution: inF.filter(d => d.category === 'institution').length,
        total: inF.length,
      };
    });
  }
  function categoryTotals(propId) {
    const ds = scopeDevices(propId);
    return {
      household: ds.filter(d => d.category === 'household').length,
      institution: ds.filter(d => d.category === 'institution').length,
    };
  }

  // Telemetry series generator (24h) per sensor type
  function telemetry(kind, seed) {
    const r = rng(seed || 7);
    const hours = ['00:00','02:00','04:00','06:00','08:00','10:00','12:00','14:00','16:00','18:00','20:00','22:00'];
    if (kind === 'Thermocouple') return hours.map((x, i) => ({ x, y: [22,21,21,46,88,71,38,26,84,79,40,24][i] + Math.round(r() * 6 - 3) }));
    if (kind === 'Energy meter') return hours.map((x, i) => ({ x, y: +(0.1 + [0.1,0.1,0.1,0.4,1.6,0.9,0.3,0.2,1.4,1.1,0.5,0.1][i] + r() * 0.2).toFixed(2) }));
    if (kind === 'Flow meter') return hours.map((x, i) => ({ x, y: +([0.2,0.2,0.3,0.8,1.9,1.2,0.6,0.4,1.7,1.5,0.7,0.3][i] + r() * 0.3).toFixed(2) }));
    // load cell — fuel mass decreasing with cooking events
    let m = 14.2; return hours.map((x, i) => { m -= [0,0,0,0.6,1.4,0.4,0.1,0,1.1,0.8,0.2,0][i] * (0.8 + r() * 0.4); return { x, y: +Math.max(2, m).toFixed(1) }; });
  }

  function cookingSessions(seed) {
    const r = rng(seed || 11);
    const out = [];
    const days = ['07 Jun','06 Jun','06 Jun','05 Jun','05 Jun','04 Jun','03 Jun'];
    days.forEach((d, i) => {
      const start = 6 + Math.floor(r() * 13);
      out.push({
        id: i + 1, date: d,
        start: String(start).padStart(2, '0') + ':' + String(Math.floor(r() * 6) * 10).padStart(2, '0'),
        duration: 18 + Math.floor(r() * 90),
        fuel: +(0.3 + r() * 1.8).toFixed(2),
        peak: 74 + Math.floor(r() * 40),
      });
    });
    return out;
  }
export const VC_DATA = {
    FUEL_KEYS, FUEL_LABEL, FUEL_UNIT, FUEL_METHOD, FUEL_SENSOR, MODELS,
    PROPONENTS, GEO, DEVICES, ALERTS, APPLICATIONS, COUNTRIES, STANDARDS,
    scopeDevices, scopeAlerts, fuelsFor, proponentName, fmtImei, telemetry, cookingSessions,
    categoryByFuel, categoryTotals,
  };
