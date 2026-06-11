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

> Placeholders pending real data: footer contact details and the Implementing
> Partner directory entries. Sub-pages (Apply portal, Partners, Resources, LSC,
> Grievances) currently anchor-scroll within the landing; they can be built out
> as dedicated routes next.

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
