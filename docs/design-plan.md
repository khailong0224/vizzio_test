# Figma implementation plan

Source: https://www.figma.com/design/XHMFAXMSChnOrOoJTZpPLa/Links-for-Tests

The supplied two 3840 × 2160 frames control the design. The requested frontend-design and ui-ux-pro-max skills were read. The latter's city-analytics design-system search suggested glass cards and Fira typography; those suggestions are overridden by the actual reference's open city canvas, compact white typography, and bottom-aligned transparent HUD.

## Visual tokens and composition

- Canvas: `#06151e`; text: `#ffffff`; muted text: `#d5e1e6`.
- Chart blue: `#009cf4`; growth/demographic mint: `#00edbd`.
- Use the original Figma city backdrops and exported transparent brand assets.
- Use a compact sans-serif for labels and seven-segment numerals for the large statistics, matching the reference's digital display.
- At 16:9, retain the full image composition, small top HUD, broad unobstructed city view, and horizontal lower data panels. Avoid cards, sidebars, and added marketing content.

```text
population: [brands]         [compass]         [time / weather / providers]
            |                        city view                         |
            [page heading]
            [donut + legend] [early age] [school age] [higher age] [bars]

investment: [brands]         [compass]         [time / weather / providers]
            |                        city view                [controls]|
            [FDI total / delta] [four sectors + segmented bar] [economies]
            [                         scrolling stock ticker            ]
```

## Adaptation and behavior

Use responsive grid and normal-flow panels instead of shrinking a fixed-size screenshot. Reflow on narrow or short screens, maintain readable labels, and allow vertical scrolling. Data and UI labels come from editable runtime JSON. Charts are computed from those files, with accessible text equivalents. The ticker has pause and reduced-motion behavior. Scene controls adjust the local backdrop only; this exercise does not include a live 3D engine or market feed.

## Feature commits

1. Vue 3, Vite, Tailwind, TypeScript and route foundation.
2. Shared HUD and JSON-driven population dashboard.
3. JSON-driven investment dashboard and stock ticker.
4. Responsive and interaction verification, meaningful regression checks, and deliverable documentation.

All implementation work is on a feature branch created from develop; its final PR targets develop. The pre-existing workflow PR remains separate and unmerged.
