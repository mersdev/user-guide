# TTRacing source evidence

English approved 14 November 2026. Both pages of this product’s supplied PDF were rendered and visually reviewed. Preserved source: `original-manual.pdf`. Original instructions are also embedded in index.html for offline download.

## Website / branding

- [Official installation page](https://ttracing.my/pages/installation-guide). The campaign query parameters are unnecessary for the content. Raw response: `installation.html`. The page links all three exact supplied PDFs and distinguishes original Airflex from Airflex V2.
- Served branding tokens: white `#ffffff`, near-black `#0f0f0f`, gray surfaces `#f2f2f2`/`#f5f5f5`, primary red `#f24a52`; Poppins 700 headings and Outfit 400/600 body. Button radius token 50px.
- Existing user-workspace logo: `../../logo.png`, inspected visually. Preserve rather than redrawing.
- Source review photos in `../../review/assets/` are official reference images from this page: Maxx Pro `maxxpro-obsidian-360-2.png?v=1778648866`, original Airflex `mm-aiflex-graphiteblack.png?v=1691393849`, Tivon `mm-tivon-latest.png?v=1764738061`, all under `https://cdn.shopify.com/s/files/1/2021/9723/files/`.
- Fonts in `../src/assets/` downloaded from the official site's `/cdn/fonts/poppins/` and `/cdn/fonts/outfit/` URLs in the preserved HTML. For previews only; embed these independently in final products.


## Tivon — second batch

[Supplied Tivon PDF](https://cdn.shopify.com/s/files/1/2021/9723/files/Tivon_Smart_Desk-_User_Manual_2nd_batch__compressed.pdf?v=17755506027), local `tivon.pdf`, 2 pages. Page 1 cover, page 2 instructions.

Parts A–Q include tabletop/magnetic lightstrip, left/right motorized frame supports, extendable bars, side brackets/covers, frame bases, adapter, leveling feet/castors, headphone hanger/cup holder, flippable bar, cable-organizer brackets/tray, magnetic cable organizers, lightstrip wire/remote, 4/6 mm Allen keys, cable clips and fasteners. Carton note explicitly places A & J in box 1 and B–P in box 2; it does not explicitly assign Q fasteners. Do not silently expand this claim.

Assembly steps 1–10: extendable bars align mark 1 for 1.2 m desktop, mark 2 for 1.4/1.6 m, mark 3 for 1.8 m; connect frame supports and both rails; frame feet and leveling feet/castors; brackets with heads facing inward and right controller support on right; tabletop/controller/flippable bar; cable clips/adapter connection; cable tray brackets and accessories; turn upright/magnetic cable guides; fold/hang tray; lightstrip attachment and USB power. Use the actual PDF diagrams for screw counts and sizes rather than inferring hidden quantities.

Controller: long press Up/Down for 3 seconds to move toward an endpoint; short press moves a short distance. Memory buttons 1=min, 2=max, seated icon=80 cm, standing icon=100 cm by default. Custom position save: hold desired preset 3 seconds, screen flashes. Reset: hold reset 5 seconds, release; any button interrupts and procedure must restart. Child lock: hold Up and Down together 5 seconds, display `LOC`; repeat 5 seconds to unlock; other controls disabled while locked. Do not invent minimum/maximum travel heights, speed, load limit, or automatic anti-collision behavior absent here.

Safety: indoors, gloves/protected floor, bolts initially loose, lower before moving, clear surroundings and cord travel before motion, no direct cleaning spray, dry/slightly damp cloth only, no opening electrics, keep water/humidity away, do not modify plug, switch off power before removing adapter, monthly checks. Site has a separate lightstrip PDF but it was not part of the supplied sources; do not invent remote functions from its mere presence.


## Illustration scope

The figure is a surface/assembly schematic, not a service drawing or a dimensional measurement. No hidden electronics, internal lift parts or undocumented controls are inferred. Selected assemblies correspond to manufacturer parts. Small hardware represents surface structure, not a packing count.

The self-contained runtime has no cross-product links or shared asset dependencies. Fonts are embedded from the official website, as is the existing supplied logo.
