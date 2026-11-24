# Dashboard verification

## Requirements and evidence

| Brief requirement | Implementation and evidence |
| --- | --- |
| Vue 3, script setup, Vite, Tailwind | Vue single-file components use `<script setup lang="ts">`; Vite uses the Vue and Tailwind plugins; production build type-checks with vue-tsc. |
| Two separate pages | Hash routes `/population` and `/investment`; visible navigation links exercised in Chrome and regression tests. |
| Population charts and statistics | Demographic SVG donut, three age-stat components, regional bars and accessible table; reviewed against the Figma frame at 3840×2160. |
| Investment statistics and ticker | FDI total/change, four sectors and a computed segmented bar, five flagged economies, animated ticker; reviewed at 3840×2160. |
| JSON data separation | Runtime fetches of `public/data/*.json`; changed age value from 1.8 to 7.3 and FDI total from 96 to 143, reloaded in Chrome, and observed the updated accessible numeric values. Original JSON restored and confirmed unchanged with Git. |
| Visual fidelity | Original Figma backdrops and brand assets; transparent bottom HUD, digital numerals, white labels, reference chart colors, and aligned investment headings. See desktop screenshots and the documented font/icon approximations. |
| Other aspect ratios | Both routes checked at all eight sizes below. No document horizontal overflow, overflowing headings, panel overlap, or scene-control/panel overlap detected. Desktop and phone screenshots were visually inspected. |
| Run/navigation/data/tradeoffs README | Root README documents npm commands, both URLs, JSON locations, structure, and implementation tradeoffs. |
| Incremental commits | Separate foundation, population, investment, and verification/documentation commits on a feature branch created from develop. Final PR targets develop. |

## Responsive checks

Each row was checked on **both** routes using the real Chrome preview and DOM geometry.

| Viewport | Context | Result |
| --- | --- | --- |
| 375×812 | Phone portrait | Pass; panels reflow and vertically scroll |
| 768×1024 | Tablet portrait | Pass |
| 1024×768 | Tablet/small desktop | Pass |
| 1440×900 | Desktop 16:10 | Pass |
| 1920×1080 | Desktop 16:9 | Pass |
| 3840×2160 | Original Figma canvas | Pass; full-size visual review |
| 2560×1080 | Ultrawide | Pass |
| 844×390 | Phone landscape | Pass; vertical scrolling |

The intentionally clipped, moving stock track is contained within its ticker viewport; it does not create document overflow. The regional axis and labels remain visible after reflow.

## Data and interaction checks

- Both JSON endpoints and the development HTML returned HTTP 200.
- The production build passes TypeScript and Vite compilation.
- The built `dist/` site was served with `npm run preview`. Both routes were opened in Chrome, the restored values 1.8 and 96 rendered correctly, branding loaded, and the production JSON endpoints returned their expected values. The static build contains only the five optimized image assets, rather than raw Figma export files.
- Seven Vitest tests pass, covering changed JSON values and chart geometry, route switching, HTTP/malformed-JSON recovery, keyboard skip-link focus, ticker pause/resume, duplicate quote accessibility, and reduced-motion listener cleanup.
- The ticker was observed in Chrome with `animation-play-state: running`; its transform advanced between observations. Clicking Pause changed its pressed state and paused the animation; Resume restored the manual state.
- Zoom changed the backdrop transform from `scale(1)` to `scale(1.25)`; Reset restored it.
- The daylight slider accepted the keyboard Home command and changed the backdrop to `brightness(0.5)`; Reset returned it to `brightness(1)`.
- Weather opened the JSON weather snapshot and closed again through its button.
- In the production build, Tab focused the visible skip link and Enter moved focus to the dashboard main region while preserving `#/investment`.
- Reduced-motion behavior is covered with a mocked media preference in the component test, plus the CSS media rule. The operating system's motion preference was not changed for testing.
- No application-origin console errors or warnings were observed; unrelated browser-extension messages were excluded.
- The npm dependency audit reported **zero vulnerabilities** after removing unused tooling.

## Practical limits

Typography and small pictograms are approximations, described in the README. This is a recreation of the supplied visual dashboards with editable sample JSON, not live demographic, investment, stock-market, weather, or 3D data. No cross-browser claim is made beyond Chrome, as specified in the brief.
