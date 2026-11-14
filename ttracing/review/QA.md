# Design preview QA

14 November 2026. Scope: source intake and static layout previews only. Final interactive manuals and Anatomy product geometry have not been produced or tested yet; visual/language approval is pending.

- Rebuilt all three previews with `node ttracing/review/build-previews.mjs`.
- Inspected both pages of all three supplied PDFs and enlarged instruction pages. They are image-based; all safety/sequence notes were read visually.
- Captured and inspected each desktop preview at 1440px and Maxx Pro mobile at 390px using the Anatomy capture script. Final files are in `screenshots/`. No horizontal overflow or console errors reported. All visible text fits, including the footer at 390px.
- Images, logo and fonts are embedded in each HTML. Each preview opens directly from disk; only the Original manual link reads a separate local PDF. No external runtime assets or scripts. No links between product previews.
- Controls are deliberately static layout specimens, with a visible preview notice. There are no simulated assembly completions or saved review confirmations.
- Impeccable detector run once on all three preview HTMLs. It reported a product-title border/padding warning in each: inspection confirmed 30px left padding beside the desktop divider and the divider removed at mobile. This is a stylesheet cascade false positive, not a visible cramped edge.
- No production geometry, interactive journeys, keyboard product controls or motion is claimed as verified. Those checks belong to production after approval.
