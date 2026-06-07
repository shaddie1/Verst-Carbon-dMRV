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
