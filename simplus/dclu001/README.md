# DCLU001 — Induction cooker

Open `index.html` directly in a browser. This folder contains the complete product guide and can be copied or hosted on its own. No other product folder, installation or network connection is required to use it. Official manual and support links need internet access.

- `index.html`: ready-to-use page; code, styles, illustration and logo are embedded.
- `src/`: editable source for this product only.
- `build.mjs`: rebuilds this folder’s `index.html`.
- `check.mjs`: checks product isolation, embedded assets, script syntax and journey content.
- `references/`: official sources and component diagram.
- `screenshots/`: desktop/mobile previews and any existing detailed views.

To edit, change `src/content.js`, `src/drawing.js`, `src/app.js`, `src/styles.css` or `src/template.html`. With Node installed, run `npm run build` then `npm run check` from this folder. These commands have no package dependencies.

The current step resets to step 1 on reload. Explicit review confirmations remain device-local.
