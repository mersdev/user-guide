# Product
<!-- impeccable:product-schema 1 -->
## Platform
web
## Stack
Static HTML/CSS/JavaScript, explicitly required by the approved plan. Local only.
## Users
Singapore and Malaysia customers setting up and using LVSH001 water filter pitchers, DKXH005 toaster ovens, DCLU001 induction cookers, LLJH007 blenders and DKZP001 grills with hot pot.
## Product Purpose
A customer-facing interactive manual. The product drawing sits beside short instructions, with exploration and guided tasks.
## Capabilities and Constraints
Four journeys per product, keyboard/touch support, independent device-local review confirmations, journey/mode URLs, original manuals and safety. The current step stays in memory and resets to step 1 on reload; it is not stored or included in the URL. Simulations never confirm physical completion. No accounts, backend, analytics, chatbot or sales content.
## Brand Commitments
The user’s 14 November revision pins the design of https://sg.simplus.online/en/products: official Singapore logo, white, gray and #4D61A3 only; match its font and control styling. Each product has one self-contained index.html in a separate folder. No cross-product tabs; one return-to-products link. “I have done this” confirms and immediately advances. All content is English. Do not reuse the chair demo.
## Evidence on Hand
Approved plan: /Users/baoren/.codex/attachments/5d3a5145-a0bb-4cb1-8a41-a8b0ff317711/approved-plan.md. Each independent `simplus/<model>/` folder includes its own editable source, build/check scripts, screenshots and official manual evidence in `references/SOURCES.md`. Pitcher preparation/reset conflict and oven model discrepancy must remain explicit.
The three Malaysia additions retain the shared visual style and link back to Malaysia products. Their control/model discrepancies are recorded in the guides and sources.
## Accessibility & Inclusion
Visible keyboard focus, keyboard alternatives for all diagram interactions, 390px layout, reduced motion and offscreen suspension.

Latest layout preference: show an in-page logo and product-name heading above the manual only. Use large Back and confirmation buttons on one row, replace confirmation with a journey-only Reset guide after completion, align safety/manual links horizontally, and omit saved-progress/copy/global-reset chrome and the pitcher bar-count slider.
