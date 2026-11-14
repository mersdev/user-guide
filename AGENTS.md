# Repository Guidelines

## Project Structure & Module Organization

This workspace contains five independent static product manuals under `simplus/`: `lvsh001`, `dkxh005`, `dclu001`, `lljh007`, and `dkzp001`. Each folder ships a self-contained `index.html` and has no shared runtime dependencies.

Edit each product’s `src/`: `content.js` holds instructions, `drawing.js` defines illustrations, `app.js` handles interactions, and `template.html` and `styles.css` define presentation. Logos live in `src/assets/`, evidence in `references/SOURCES.md`, and previews in `screenshots/`. Root `PRODUCT.md` and `DESIGN.md` describe existing Simplus manuals; their branding is not a default for other products. Organize new manuals under `<brand>/<model>/`.

## Build, Test, and Development Commands

Run commands inside the affected product folder:

```sh
cd simplus/lvsh001
npm run build
npm run check
```

Build regenerates `index.html` from source and embeds runtime assets. Check validates product isolation, embedded assets, script syntax, drawings, and journey references. Node.js is required; no dependency installation is needed. Open the generated `index.html` directly in a browser for local development.

## Coding Style & Naming Conventions

Use plain HTML, CSS, and JavaScript ES modules with Node standard-library build scripts. Follow adjacent formatting: two-space JavaScript block indentation and compact CSS. Use camelCase for JavaScript identifiers, lowercase model folders/keys, and kebab-case CSS classes. No formatter or linter is configured. Edit source and rebuild generated HTML.

## Testing Guidelines

Checks use `node:assert/strict`; no coverage threshold is configured. Extend `check.mjs` for new package invariants. After rebuilding, exercise every journey, confirmation/reset, Explore controls, keyboard focus, reduced motion, and the 390px layout. Verify offline use, record results in `QA.md`, and update screenshots for visible changes.

## Commit & Pull Request Guidelines

No Git history is available. Use imperative, product-scoped messages, such as `lvsh001: clarify filter preparation`. PRs should identify affected products, explain changes, link issues or evidence, report checks, and include desktop/mobile screenshots for UI changes.

## Language

Default language: English first for every new manual, unless the user requests another language. Confirmed by the user on 14 November 2026.

## Design Review Before Manual Production

Use the existing layout as a starting point: brand/product heading, journey choices, product illustration beside instructions, navigation/confirmation actions, and safety/manual links. Adapt it to each product.

Before creating a new manual, review the product, brand/logo, layout, typography, and color palette with the user. Present a concise visual direction or preview and obtain confirmation before production. Record agreed choices in that product’s `DESIGN.md`. Branding and colors are flexible; the Simplus palette applies only to its existing guides.

Keep manuals independent. Confirm language per project. Preserve source discrepancies and safety notices. Simulations never confirm physical completion; review confirmations remain device-local.
