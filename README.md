# Vizzio dashboards

Two responsive dashboard pages built with **Vue 3 (`<script setup>`), Vite, TypeScript, and Tailwind CSS**, following the [supplied Figma frames](https://www.figma.com/design/XHMFAXMSChnOrOoJTZpPLa/Links-for-Tests).

## Run

Use Node.js **22.18 or newer** and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://127.0.0.1:5173`). Use the **Population** and **Investment** tabs to switch pages:

- `/#/population` — demographic donut, school-age statistics with growth deltas, and regional distribution.
- `/#/investment` — FDI total, investment sectors, five source economies, and a scrolling stock ticker.

The root opens Population. Hash routing supports direct links and reloads on ordinary static hosting without server rewrites.

```bash
npm run build       # Type-check and build into dist/
npm run preview     # Serve the production build, normally on port 4173
npm test            # Run the regression tests
```

## Change the data

All dashboard numbers, labels, dates, weather snapshots, and stock quotes are supplied by runtime JSON files:

| File | Content |
| --- | --- |
| `public/data/population.json` | Demographic segments, three age groups and growth rates, regional values and axis limits |
| `public/data/investment.json` | FDI total/change, sector shares, source economies, stock quotes, ticker speed |
| `public/data/common.json` | Navigation, compass ticks, control labels, shared branding |

Edit a JSON file and reload the page; no component changes are needed. Requests bypass the browser data cache. The build copies these files to `dist/data/`; when serving a production build, update that deployed JSON or rebuild after editing `public/data/`. Keep numeric values as numbers, and update the regional axis limits if the data range changes.

## Structure

```text
src/
  views/                  Population and Investment route components
  components/
    layout/               Shared scene, header, and scene controls
    charts/               SVG donut and regional bar chart
    population/           Age-bracket statistics
    investment/           FDI, sectors, economies, and ticker
    shared/               Digital numerals, icons, flags, loading/error UI
  composables/            Runtime JSON loading and request cleanup
  router/                 Two hash routes and scroll restoration
  types/                  Dashboard data contracts
  styles/                 Tailwind entry and responsive visual styles
  __tests__/              Data-rendering and interaction regression tests
public/data/              Editable JSON
public/images/            Local Figma backdrops and branding
```

## Design and tradeoffs

- Original city backgrounds and brand artwork were exported from Figma and stored locally. Backgrounds use WebP; the application needs no external image or font service.
- The large 16:9 layout preserves the city view and lower information panels. Smaller and shorter viewports reflow into readable, vertically scrolling layouts.
- Labels use a system sans-serif; digital numbers, small pictograms, and flags use local SVG. These approximate the reference typography and icon details without requiring its original font files.
- The imagery is a static city view. Zoom and daylight controls affect that image; Weather shows the JSON snapshot. There is no live 3D engine, weather feed, or market API.
- The ticker pauses on hover/focus, has a pause button, stops while the page is hidden, and respects reduced motion. Reduced-motion users can scroll the static quotes manually.
- The two navigation tabs are an addition for switching between the supplied designs. Backend/authentication is outside the exercise scope.

## Verification

Seven regression tests cover JSON-driven rendering, navigation, data-error recovery, the skip link, and ticker pause/reduced-motion behavior. Both pages were inspected in Chrome at eight viewport sizes, including **3840×2160**, phone portrait, and phone landscape. See [verification evidence](docs/verification.md) and the [population](docs/screenshots/population.jpg) / [investment](docs/screenshots/investment.jpg) screenshots.

## Contribution workflow

Start each task from updated `develop` on `feature/<short-description>`. Commit completed work in focused commits, then open a PR with **base `develop`**. Do not commit task changes directly to `develop` or `main`, and do not merge a feature PR without the owner's approval. The owner creates the final **`develop` → `main`** release PR.

See [AGENTS.md](AGENTS.md) for coding-agent instructions and the [PR template](.github/pull_request_template.md) for the review checklist. These documents do not configure GitHub branch protection.
