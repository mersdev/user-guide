# Verification — 14 November 2026

## Build and structure

- npm run build: generated the independent self-contained index.html.
- npm run check: passed English language, product isolation, embedded images/fonts/PDF, script syntax, source references, four journeys and 74 named Anatomy solids.
- npm run audit: 18 geometry cases passed; detailed report in references/GEOMETRY-AUDIT.txt. Fitting paths include assembled and separated positions plus 60 intermediate shares. Selected lift, folding/recline and width poses are checked where applicable.

## Browser behavior

Verified in headless Google Chrome, opening index.html directly from disk.

- All four journeys and 25 instruction steps: explicit confirmation advances; completion/reset works for each journey.
- All named part buttons and figure selection, Guide/Explore switch, replay and stoppable parts tour.
- Native range keyboard interaction and visible focus styling.
- Fitting-axis Fit/Separate controls; source-documented control demonstrations; reduced-motion still poses.
- 390px stacked layout: no horizontal overflow, direct Start guide link, task selection focuses/scrolls to instructions, illustration-return link.
- Product-local review persistence; reload starts at step 1. Blocked storage falls back to visit-only review without errors.
- Safety link opens the notes without resetting the current step.
- Original embedded PDF downloads offline. No HTTP/network requests and no uncaught browser errors.
- Animation becomes still under reduced motion and suspends offscreen.

Detailed interaction results: screenshots/browser-qa.json. Inspected desktop, mobile, assembly and applicable mechanism captures in screenshots/. Anatomy line checks reported zero floating ends in the inspected light and alternate kit-dark poses. The shipping theme is the approved white TTRacing layout.

## Source and review boundaries

The diagram is an explanatory surface schematic; it does not measure or inspect a physical product. Manufacturer discrepancies and undocumented controls remain explicit in the guide and references/SOURCES.md. Confirmations are the owner’s device-local review records, never inferred from animation.

The Impeccable detector on changed UI targets returned no findings. Independent review requested fitting/mechanism demonstrations, mobile task entry and product records; the reviewer scored the corrections resolved (ship), as recorded in references/REVIEW.md.
