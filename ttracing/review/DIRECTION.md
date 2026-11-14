# TTRacing manual direction — approved

This records the pre-production source intake and design review, approved by the user on 14 November 2026. Production manuals now live in the three separate product folders. The repository's `AGENTS.md` requires visual and language confirmation before production.

## Proposed deliverables

- `ttracing/maxx-pro/index.html` — Maxx Pro, latest supplied PDF, 5D-armrest version listed on the installation page.
- `ttracing/airflex/index.html` — original Airflex, not Airflex V2.
- `ttracing/tivon/index.html` — Tivon Smart Standing Desk, supplied second-batch PDF.

Each product gets independent source, build/check scripts, embedded fonts/logo/drawings, original source evidence, screenshots and QA notes. Each built page works directly from disk without shared runtime assets. No product selector, cross-product navigation or combined manual landing page. Existing Simplus guides remain untouched.

## Visual proposal

Read/Operate surface: help an owner assemble and use a physical product while keeping the current instruction visible. Keep the existing Simplus composition: in-page logo and product title; journey choices; product figure beside short instructions; large Back and confirmation actions; safety/original-manual links. Stack at 390px.

Use the supplied `ttracing/logo.png`, a white canvas, pale gray figure surface, black text, TTRacing red `#f24a52` for primary action/selection accents. Dark ink on red for accessible ordinary-size button text. Headings Poppins 700; body Outfit 400/600. These fonts and color tokens are taken from the official TTRacing installation page, retrieved 14 November 2026. No Simplus blue or borrowed Simplus branding. No storefront banners, sales copy, shopping carts or menus in the manuals.

Preview HTMLs use official product photos to review the layout and branding. They are explicitly marked static previews. Photos are not being presented as completed Anatomy figures.

## Anatomy scope

Three Figure-scale illustrations, each aiming for 40–80 purposeful solid parts. These are illustration geometry counts, not claims about the number of supplied components. Use the Anatomy ESM kit with build-time geometry; inline finished SVG and runtime into each independent HTML. Monochrome four-tone shading and one active part; title, hint and live readout outside the drawing. No leader arrows or floating labels.

The actual product explains the task: assemblies move along their fitting axes during assembly; selected mechanisms demonstrate their documented movement. Animated demonstrations never confirm physical assembly. Explicit customer confirmation advances the guide; any saved review confirmations remain specific to the product and local device.

- Maxx Pro: casters seat into the wheelbase; gas lift seats in the base; chair assemblies fit together; legrest slides and flips; height/tilt controls are demonstrated within sourced limits.
- Airflex: casters and gas lift assemble; left/right structural arms connect the backrest and seat; mechanism seats on the lift; tilt lock, height and back-pressure adjustment are explored.
- Tivon: numbered frame-rail alignment is selected by tabletop width, frame/tabletop assembly is shown, and controller practice changes the desk pose. Do not invent minimum/maximum height or a travel speed from the provided PDF.

Before production geometry, write a 40–80 part list for each product. Verify kit geometry/painter order, line ends, desktop/390px views, close-ups, keyboard, reduced motion and offline operation. Distinguish manufacturer procedure from illustrative motion.

## Proposed journeys

| Product | Journeys |
| --- | --- |
| Maxx Pro | Assemble your chair; Find your position; Use the legrest; Care & safety |
| Airflex | Assemble your chair; Adjust your chair; Understand the controls; Care & safety |
| Tivon | Assemble your desk; Set your height; Memory & child lock; Reset & care |

Proposed language: English, following the supplied manuals and existing guides. Needs user confirmation. Record accepted direction in each product's `DESIGN.md` after approval.
