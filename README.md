# Verst Carbon — dMRV Platform

React UI for the Verst Carbon digital Monitoring, Reporting & Verification
platform. This codebase was ported from the original single-file HTML design
mockup (`Verst Carbon dMRV Platform.html`) into an editable Vite + React project.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build
```

The app loads at the **Login** screen (prefilled demo credentials). Click sign
in to reach the Dashboard. Roles/scope, all screens, and mock data are wired up.

## Project structure

```
src/
  main.jsx          Entry point — imports styles, mounts <App/>
  App.jsx           Root: routing, role/proponent scope, modals, toast
  designSystem.jsx  UI primitives (Button, Input, Select, charts, badges, …)
  data.js           Deterministic mock data (exports VC_DATA)
  imageSlot.js      <image-slot> custom element (logo upload placeholder)
  components/
    shell.jsx       App shell — Logo, TopNav, Sidebar
    layout.jsx      Shared layout — Panel, PageHeader, FuelChips, MapPanel, …
  screens/
    Login.jsx               Dashboard.jsx        Devices.jsx
    DeviceDetail.jsx        RegisterDeviceModal.jsx
    Fuel.jsx                Reports.jsx          Proponents.jsx
    ApplicationWizard.jsx   ApplicationsReview.jsx
  styles/
    tokens.css      Brand colour/type/spacing tokens + @font-face declarations
    app.css         Root layout
public/fonts/       Raleway + Inter woff2 files (referenced by tokens.css)
```

## Public PoA landing (`/`)

`/` serves the **Kenya National Clean Cooking PoA** public site
(`src/poa/PoaLanding.jsx`) — a Kenya adaptation of Uganda's NCCCFF portal
(ugandapoa.verst.earth): same Gold Standard GS4GG multi-fuel Programme of
Activities structure, with Kenya specifics (Ministry of Energy & Petroleum as
coordinating entity, KEBS device certification, PoA-KE-2026, coverage by
county). Its dark/amber theme lives in `src/poa/poa.css`, scoped under `.poa`
so it never touches the green dMRV design tokens. "Implementing Partner Login"
and "Apply" route into the existing dMRV app (`/login`, `/apply`).

It is themed in the **Verst Carbon** brand palette (forest green `#008037`,
moss, deep-forest dark sections; white top nav). The nav/footer use the Verst
Carbon logo: drop the logo file at **`public/verst-carbon-logo.png`** and it is
picked up automatically; until then a brand-coloured `VerstCarbon` wordmark
fallback is shown.

### Stakeholder Impact Gaps (`/poa/stakeholders`)

A public stakeholder page (`src/poa/StakeholderGaps.jsx`) showing, per
implementing partner (VPA), the 5-year target vs the projected run-rate reach,
the resulting gap, and an **interactive set of support levers**. Each lever maps
to a stakeholder group (carbon buyers, county governments, NGOs/CBOs, donors);
toggling it fills the gap bar toward the target so stakeholders can see exactly
how their support closes the gap. Figures are illustrative placeholders.

Shared nav/footer/theme for all public PoA pages live in `src/poa/chrome.jsx`.

> Placeholders pending real data: footer contact details, the Implementing
> Partner directory, and all gap/target figures. Other sub-pages (Apply portal,
> Partners, Resources, LSC, Grievances) currently anchor-scroll within the
> landing; they can be built out as dedicated routes next.

## Routing

Client-side routing uses **react-router** (`BrowserRouter`). Each screen has a
real URL — `/dashboard`, `/devices`, `/devices/:imei`, `/fuels`, `/reports`,
`/proponents`, `/applications`, `/alerts`, `/households`, `/settings`, plus the
public `/login`, `/apply`, `/apply/submitted`. Unauthenticated visits to a
protected route redirect to `/login`; unknown paths redirect home.

Auth, role (`admin`/`proponent`) and proponent scope are in-memory React state
(reset on reload), not in the URL. The screen modules are unchanged — `App.jsx`
maps their existing callbacks (`onNav`, `onOpenDevice`, `onBack`, …) onto
`navigate()`.

> Deployment note: because routes use the History API, the host must serve
> `index.html` for unknown paths (SPA fallback). `vite dev`/`vite preview` do
> this automatically; on static hosts configure a catch-all rewrite to
> `/index.html`.

## Platform entry — Kenya POA Sectoral Dashboard

`/` is the **Kenya POA dMRV Sectoral Dashboard** (`src/sectoral/`), a unified
dark-sidebar platform ported from the "dMRV Sectoral Dashboard" design mockup.
It has three scope tabs — **Energy demand**, **Waste management**,
**Land use & forestry** — each with KPIs, an emissions-over-time chart,
monitoring-health bars, a VPA table and a register-project modal.

- The **Energy demand** scope embeds the clean-cooking platform we built: "Open
  clean-cooking monitoring" (or a VPA row) opens it inline at `/energy/*`
  (dashboard, devices, device detail, fuels, households, reports), reusing the
  existing screens. "← All scopes" returns to the sectoral dashboard.
- Theme tokens (`src/sectoral/sectoral.css`, IBM Plex + warm-green neutrals) are
  **scoped under `.kp`** so they apply only to the new shell + dashboard; the
  embedded clean-cooking screens keep their own (`:root`) green tokens.
- The earlier marketing landing now lives at `/welcome`; stakeholder gaps at
  `/poa/stakeholders`. The standalone `/dashboard … /waste … /afolu … /portfolio`
  scope routes from the previous iteration remain (behind login) but are no
  longer the entry.

> All sectoral figures are illustrative placeholders.

## Sectoral scopes (standalone scope screens — earlier iteration)

The dMRV platform spans three CDM/Gold-Standard **sectoral scopes**, selected via
the **ScopeSwitcher** in the TopNav (the active scope is derived from the URL):

| Scope | Path(s) | MRV model |
|---|---|---|
| Portfolio (all scopes) | `/portfolio` | cross-scope overview, avoidance vs removal |
| **Energy Demand** (03) | `/dashboard`, `/devices`, `/fuels`, … | clean cooking — metered devices (existing) |
| **Waste Management** (13) | `/waste`, `/waste/production` | biochar — feedstock→biochar mass balance, carbon **removal** |
| **Land Use & Forestry / AFOLU** (14) | `/afolu`, `/afolu/plots` | Tsavo REDD+ (KWS) — strata/plots, carbon stock, avoided deforestation |

The sidebar swaps per scope. Scope data + the sector registry live in
`src/scopeData.js`; the new screens are under `src/screens/scopes/`. The portfolio
sources its per-scope figures from each scope's own dataset (single source of truth).

> All Waste/AFOLU figures and the Tsavo framing are illustrative placeholders.
> A landscape REDD+ legitimately dwarfs the cooking/biochar pilots, so the
> portfolio comparison uses labelled, range-tolerant bars. Reports/Alerts remain
> Energy-centric for now.

## Data store

`src/store.jsx` is a small React-context store over the in-memory `VC_DATA`
mock. Today it exposes `addDevice` and a `useDevices(scope)` hook (the Devices
list and Register-device modal use it, so a newly registered device appears
immediately). This is the **seam for a real data layer**: swap the bodies of
`addDevice` / `useDevices` for API calls + async state and the screens keep
their shape. The Register-device modal (`src/screens/RegisterDeviceModal.jsx`)
is a worked example of a fully functional screen — controlled fields, IMEI
validation (15 digits + uniqueness), fuel-filtered models, and a success state.

## How it's wired

Plain ES modules — every file `import`s what it needs and `export`s its
components; there are no `window` globals. The dependency layers are:

- `designSystem.jsx` + `data.js` — leaf modules, depended on by everything.
- `components/` — shared shell + layout, built on the design system.
- `screens/` — one file per screen; each imports primitives, data, and shared
  components. A few small helpers are shared between screens (e.g. `DefList`
  from `DeviceDetail.jsx`, `Field` from `ApplicationWizard.jsx`).
- `App.jsx` — imports all screens and routes between them.

Component bodies are exactly as authored in the original mockup; the port only
changed the module wiring. Some local React-hook aliases (`dUse`, `lUse`, …) are
leftovers from the original single-scope code and can be cleaned up freely.

## History

This codebase was ported from the original single-file design mockup
(`Verst Carbon dMRV Platform.html`). `extract.mjs` unpacks that bundle into
`extracted/` (gitignored) for reference; `src/` is the source of truth.
