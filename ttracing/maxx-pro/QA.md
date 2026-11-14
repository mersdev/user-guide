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

## Part close-up and vertical-orbit update

All 25 steps were exercised against their assigned camera profile. Every close-up rendered visible geometry. Automatic camera selection, inline part references (without leaving the guide step), individual fittings, vertical/horizontal drag, bottom/top presets, zoom, Best part / Whole product return, and canvas keyboard controls passed. Desktop 1440px and mobile 390px had no overflow, network requests or browser errors. Native bottom views changed the actual rendered pixels with normal motion enabled.

The existing complete-journey confirmation/reset, Explore, source PDF download, keyboard ranges, fitting/pose controls, local-storage fallback, reduced-motion stillness and offscreen suspension checks also passed after the camera integration. Pure geometry checks validate finite 3D surfaces and preserve the area of concave prism caps, including the five-spoke base. The UI detector returned no findings.

Captures: `screenshots/closeup-desktop.png`, `closeup-mobile.png`, `closeup-part.png`, and `screenshots/views/` for every step. Automated camera results: `screenshots/view-qa.json`. Final review corrections are recorded in `references/REVIEW.md`.

The independent review’s single requested correction (Maxx legrest rod contrast) was resolved and verified at desktop and 390px mobile scale. The verdict pass returned ship for that fix. Maxx has dedicated `screenshots/views/legrest-{1,2}-mobile.png` captures alongside the desktop equivalents.
