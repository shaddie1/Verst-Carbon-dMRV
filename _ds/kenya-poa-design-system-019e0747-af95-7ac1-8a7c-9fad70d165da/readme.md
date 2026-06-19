# Kenya POA — Design System

A design system for the **Kenya Programme of Activities (POA)** dMRV platform — the digital Monitoring, Reporting & Verification console for a national clean-cooking carbon programme, built on the **Verst Carbon** dMRV product.

> **Namespace:** components are exposed at `window.KenyaPOADesignSystem_019e07.<Name>` in card/kit HTML.

---

## 1 · Product context

**Verst Carbon** builds Africa's clean-cooking **dMRV** (digital Monitoring, Reporting & Verification) platform. Smart meters fitted to clean cookers — electric pressure cookers (EPCs) and institutional steam systems — transmit real-time cooking-event data to a software platform that computes emission reductions using the Gold Standard *Metered & Measured* methodology, manages the device fleet, and produces audit-ready monitoring reports.

A **POA (Programme of Activities)** aggregates many individual clean-cooking projects (**VPAs** — Voluntary Programme Activities / component projects) into one national carbon-credit programme. The **Kenya POA** does this for Kenya — e.g. NACONEK's transition of schools from firewood/charcoal to clean institutional cooking — issuing verified carbon credits into registries (Gold Standard).

This system covers the two surfaces the team prioritised:
- **dMRV web platform** — dashboard, device fleet, component projects.
- **Carbon registry & reporting** — credit issuance ledger, monitoring reports.

### Sources used
- **GitHub `shaddie1/Kenya-POA`** — *the target repo; empty at build time.* https://github.com/shaddie1/Kenya-POA
- **GitHub `shaddie1/Verst-Carbon-dMRV`** — the dMRV platform (single bundled HTML; the brand green `#008037` and leaf mark were extracted from it). https://github.com/shaddie1/Verst-Carbon-dMRV
- **`ugandapoa.verst.earth`** — the live Uganda POA reference (JS-rendered; not machine-fetchable at build time).
- **verst.earth** — product/marketing context (dMRV, AICCP, NACONEK POA). https://verst.earth/dmrv/

> ⚠️ The original POA platform UI could not be read directly (empty repo, compressed bundle, bot-protected live site). With the user's go-ahead, this system was **designed fresh** anchored on the one verified brand asset — the Verst green `#008037` and leaf mark — plus the clean-cooking carbon domain. Explore the repos above to refine fidelity to the real product.

---

## 2 · Content fundamentals

How the platform writes copy.

- **Voice:** precise, institutional, audit-grade. This is carbon-finance infrastructure — credibility and transparency over marketing flourish. Calm and factual.
- **Person:** product/system-facing, not chatty. Labels are **nouns and noun phrases** ("Verified reductions", "Credit issuance ledger", "Devices reporting"), not "Your devices". Second person only in guidance/empty states.
- **Casing:** **Sentence case** for everything — page titles, card titles, buttons ("Register device", "Export ledger"). Reserve UPPERCASE for short **overline labels** only (`PROGRAMME`, `VPA-01 · CENTRAL KENYA`).
- **Numbers & units:** always formatted with thousands separators (`128,400`) and explicit units (`tCO₂e`, `devices`, `tCO₂e / day`). Tabular figures everywhere. Identifiers are mono and uppercase (`VC2-8830-1147`, `KE-POA-2025-000001`, `GS11892`).
- **Domain vocabulary:** POA, VPA, dMRV, tCO₂e, vintage, crediting period, issuance, retirement, methodology, monitoring report, verification, buffer pool, EPC, smart meter, cooking event.
- **Status language:** short, consistent — *Online / Offline / Pending / In review / Verified / Crediting / Monitoring / Issued / Retired / Transferred*.
- **Tone of deltas:** neutral and quantified ("+12.4% vs last period", "37 devices flagged: no data > 72h"). No hype.
- **No emoji.** Iconography carries visual meaning, not emoji.

---

## 3 · Visual foundations

The look: a **precise, data-forward climate-monitoring console** — green as the climate signal, warm earth accents for the cooking/energy story, restrained chrome that lets dense data breathe.

- **Color.** Anchored on **Verst green `#008037`** (`--brand`). A full green ramp (50→900) plus three accent hues: **terracotta** (cooking / energy / earth), **teal** (secondary data series, info), and **ochre/amber** (warning, energy). A **brick red** handles danger (and nods to the Kenyan flag). Neutrals are a **warm green-black "stone" ramp**, never cold blue-grey. Semantic tokens (`--ok/-warn/-danger/-info`) and a 6-color categorical series drive status and charts.
- **Type.** The **IBM Plex** superfamily — engineered, scientific, audit-appropriate, and not over-used. *Plex Sans* for UI/body; *Plex Sans Condensed* for big tabular metrics and display numbers (instrument-panel feel); *Plex Mono* for IDs, serials, coordinates, and credit serial ranges. UI text floors at 13–14px.
- **Backgrounds.** Flat and quiet: a faint green-tinted off-white page (`--surface-page #F7F9F6`), white cards, a near-black green chrome sidebar (`#0E1A12`). **No photographic hero imagery, no decorative gradients** — the only gradient is a subtle chart area-fill. Data is the texture.
- **Cards.** White surface, **1px `--line` border + low `--shadow-sm`** (cards lean on the border, not heavy elevation), `--radius-lg` (12px) corners. Headers are a titled row with an optional right-aligned action, divided by a soft hairline.
- **Corner radii.** Moderate and institutional — 6px inputs/buttons, 8–12px cards, **pills** only for status badges and progress tracks.
- **Shadows.** Low and cool-neutral (green-black tint). Five steps from `--shadow-xs` (hairline lift) to `--shadow-pop` (menus). Dialogs use `--shadow-lg`.
- **Borders & dividers.** Hairlines do most of the structural work: `--line` for card/table edges, `--line-soft` for inner row dividers.
- **Motion.** Functional, quick (`--dur 180ms`, ease-out). Hovers shift background/border; buttons depress 0.5px on `:active`; progress fills and tab underlines transition. The only ambient loop is the **"live" sidebar status pulse** (a gentle ring on the online dot) — and it respects `prefers-reduced-motion`. No bounces, no slides.
- **Hover / press states.** Buttons darken to the next green step on hover; secondary/ghost fill with `--surface-hover`. Focus is a **3px green ring** (`--shadow-focus`). Table rows tint to `--surface-page` on hover.
- **Transparency & blur.** Used sparingly — translucent white overlays inside the dark sidebar (`rgba(255,255,255,0.04–0.06)`) for nested surfaces. No glassmorphism.
- **Data visualization.** Brand green for primary/categorical bars, teal for cumulative lines, the categorical series palette for multi-series. Tabular mono numerals, hairline gridlines, mono axis labels. Charts are drawn with clean SVG — never faked with images.
- **Layout.** Fixed 248px sidebar + 60px top bar; content scrolls in a max-1180px column. 4px spacing grid. KPI tiles in a 4-up grid; primary/secondary content in a ~1.6 : 1 two-column split.

---

## 4 · Iconography

- **System:** **Lucide-style** line icons — 24px viewBox, ~1.75–2px stroke, round caps/joins. This matches the rounded stroke of the brand leaf mark. Icons are defined inline as SVG (`kit-ui.jsx` carries the kit's set: `dashboard, device, cooker, project, registry, report, monitor, settings, leaf, flame, coins, search, bell, filter, download, plus, refresh, signal, shield, pin, clock, external, chevron…`).
- **Why inline, not a font:** the platform uses crisp single-color stroke SVGs sized per context; `currentColor` lets them inherit text/state color. For production, pull the matching glyphs from **[Lucide](https://lucide.dev)** (CDN or `lucide-react`) — the names above map 1:1.
- **Domain glyphs:** *leaf* (reductions/climate), *flame* (cooking activity), *coins* (credits/issuance), *shield+check* (verification/methodology), *device* (smart meter), *signal* (connectivity).
- **No emoji, no multicolor icons, no filled/duotone mixing.** One stroke weight, one color per icon.
- **Logo / brand mark:** the **leaf/sprout** mark (`assets/logo-mark.svg`, `logo-mark-white.svg`) — extracted from the dMRV platform bundle. Green on light, white on brand/chrome. Pair with the "Kenya POA / dMRV Platform" wordmark (see `guidelines/brand-lockup.card.html`).

---

## 5 · Index / manifest

**Root**
- `styles.css` — the single entry point consumers link (imports fonts + tokens + component CSS).
- `readme.md` — this guide. · `SKILL.md` — Agent-Skill wrapper.

**`tokens/`** — `fonts.css` (IBM Plex via Google Fonts CDN), `colors.css`, `typography.css`, `spacing.css`.

**`assets/`** — `logo-mark.svg`, `logo-mark-white.svg`.

**`components/`** (14 components, `window.KenyaPOADesignSystem_019e07.*`)
- `core/` — **Button, IconButton, Badge, Tag, Avatar**
- `forms/` — **Input, Select, Checkbox, Switch**
- `data/` — **MetricCard, Card, ProgressBar**
- `navigation/` — **Tabs**
- `feedback/` — **Tooltip**
- `components.css` — class-based styling for all of the above (shipped via `styles.css`).

**`guidelines/`** — foundation specimen cards (Colors ×5, Type ×4, Spacing ×3, Brand ×2) shown in the Design System tab.

**`ui_kits/dmrv-platform/`** — interactive 4-screen recreation (Dashboard · Devices · Projects · Registry). See its `README.md`.

**Starting points:** `Button` (Core), `MetricCard` (Data), and the full **dMRV Platform** app shell.

---

## 6 · Substitutions & caveats
- **Fonts are CDN-loaded** (IBM Plex via Google Fonts) — no binaries are self-hosted. Supply TTF/WOFF2 files to self-host and the `@font-face` rules will be picked up by the compiler.
- **Icons** are Lucide-style approximations drawn inline; swap for official Lucide in production.
- The **whole visual language is a fresh design** anchored on `#008037` + the leaf mark + the clean-cooking domain — it is *not* a pixel copy of the live Uganda/Kenya POA platform (which was inaccessible at build time). Treat it as a strong, on-brand starting point and refine against the real product.
