# TTRacing airflex guide

Open `index.html` directly in a browser. It contains the page, illustrations, fonts, logo and original PDF. No server or installation is needed. This page does not link to another product manual.

Edit `src/content.js` for instructions, `src/drawing.js` and `src/model.js` for Anatomy geometry and poses, `src/app.js` for interaction, and `src/styles.css` / `src/template.html` for presentation. Rebuild with `npm run build`; validate with `npm run check`. Run `node build.mjs --audit` for the geometry audit. The vendored Anatomy kit is build-time only.

English is the default. Review confirmations are product-specific and device-local. Step position restarts at step 1 after reload; the URL can select a journey and mode. Use Reset guide to clear the current journey’s confirmations. Physical completion is never inferred by the illustration.

See DESIGN.md, QA.md and references/SOURCES.md for the approved direction, verification and source discrepancies.

Run `npm run audit` to reproduce all product geometry scenarios and update the detailed geometry report.
