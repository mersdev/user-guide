# Source intake — TTRacing

Retrieved 14 November 2026. The PDFs are image-based; both pages of each were rendered and visually reviewed, with larger renders of the instruction pages. Do not treat their sparse extracted text as a complete source. Files here preserve the supplied editions.

## Website / branding

- [Official installation page](https://ttracing.my/pages/installation-guide). The campaign query parameters are unnecessary for the content. Raw response: `installation.html`. The page links all three exact supplied PDFs and distinguishes original Airflex from Airflex V2.
- Served branding tokens: white `#ffffff`, near-black `#0f0f0f`, gray surfaces `#f2f2f2`/`#f5f5f5`, primary red `#f24a52`; Poppins 700 headings and Outfit 400/600 body. Button radius token 50px.
- Existing user-workspace logo: `../../logo.png`, inspected visually. Preserve rather than redrawing.
- Photos in `../assets/` are official reference images from this page: Maxx Pro `maxxpro-obsidian-360-2.png?v=1778648866`, original Airflex `mm-aiflex-graphiteblack.png?v=1691393849`, Tivon `mm-tivon-latest.png?v=1764738061`, all under `https://cdn.shopify.com/s/files/1/2021/9723/files/`.
- Fonts in `../assets/` downloaded from the official site's `/cdn/fonts/poppins/` and `/cdn/fonts/outfit/` URLs in the preserved HTML. For previews only; embed these independently in final products.

## Maxx Pro

[Supplied Maxx Pro PDF](https://cdn.shopify.com/s/files/1/2021/9723/files/Maxx_Pro_User_Manual_-_latest.pdf?v=1784886789), local `maxx-pro.pdf`, 2 pages. Page 1 cover, page 2 instructions.

Parts A–L: backrest, seatbase, armrests, multi-tilt mechanism, wheelbase, gas lift/cover, 5 castors, side covers, screws (16 M8×25, 4 M5×8 shown), Allen key, head/lumbar pillows, legrest. Many screws are pre-attached; side-cover screws and any extras are separate.

Page 2 assembly: 1 castors; 2 gas lift/cover; 3 armrests, slanted portion facing front; 4 align backrest; 5 backrest M8×25 screws; 6 side covers M5×8; 7 multi-tilt mechanism M8×25; 8 seat assembly onto gas lift and fit pillows; 9 legrest slide into mounting slots, curved portion downward.

Controls show back-pressure knob, tilt lock, height lever, 155° backrest adjustment, pull/flip legrest. Legrest illustration states maximum 20 kg. Keep hands away from toggle gaps; do not operate recline lever until backrest securely installed; keep feet on ground when reclining; no excessive force; do not reach reclining mechanism when fully tilted; lock rocking lever after reclining. Do not lean forward or press down on an extended legrest (tip risk). No sitting on arms/seat edge. Gentle cleaning, avoid direct sun, monthly checks.

Do not add an unverified 5D armrest control sequence: the website labels the model 5D, but this PDF's control panel does not document each armrest adjustment.

## Original Airflex

[Supplied original Airflex PDF](https://cdn.shopify.com/s/files/1/2021/9723/files/NEW01-TT_AIRFLEX_USER_MANUAL.pdf?v=1695181406), local `airflex.pdf`, 2 pages. Page 1 cover, page 2 instructions. No headrest is supplied/shown. Do not borrow Airflex V2 features.

Parts A–I: backrest, seatbase, left/right structural armrests, full-tilt mechanism, wheelbase, gas lift, 5 castors, screws (4 each M6×35 / M6×25 / M6×20), Allen key. Screws separate in carton.

Assembly: 1 castors; 2 gas lift; 3 arms to backrest using 4 M6×20 loosely (diagram 50%); 4 arms to seatbase using 4 M6×35, follow numbered hole sequence, still loosely (50%); 5 mechanism to seat using 4 M6×25 then tighten all screws, including steps 3 and 4 (100%); 6 seat assembly onto gas lift. General attention text also says do not tighten fully until complete assembly; preserve the specific step-5 instruction and explain final checks.

Controls: pull to unlock tilt, back-pressure adjustment knob, up/down height lever. Maximum tilt 121° shown. Wear gloves, protect floor, sit correctly, no sitting on arms or edge, avoid excessive tilt force/direct sun, gentle cleaning and monthly checks.

## Tivon — second batch

[Supplied Tivon PDF](https://cdn.shopify.com/s/files/1/2021/9723/files/Tivon_Smart_Desk-_User_Manual_2nd_batch__compressed.pdf?v=17755506027), local `tivon.pdf`, 2 pages. Page 1 cover, page 2 instructions.

Parts A–Q include tabletop/magnetic lightstrip, left/right motorized frame supports, extendable bars, side brackets/covers, frame bases, adapter, leveling feet/castors, headphone hanger/cup holder, flippable bar, cable-organizer brackets/tray, magnetic cable organizers, lightstrip wire/remote, 4/6 mm Allen keys, cable clips and fasteners. Carton note explicitly places A & J in box 1 and B–P in box 2; it does not explicitly assign Q fasteners. Do not silently expand this claim.

Assembly steps 1–10: extendable bars align mark 1 for 1.2 m desktop, mark 2 for 1.4/1.6 m, mark 3 for 1.8 m; connect frame supports and both rails; frame feet and leveling feet/castors; brackets with heads facing inward and right controller support on right; tabletop/controller/flippable bar; cable clips/adapter connection; cable tray brackets and accessories; turn upright/magnetic cable guides; fold/hang tray; lightstrip attachment and USB power. Use the actual PDF diagrams for screw counts and sizes rather than inferring hidden quantities.

Controller: long press Up/Down for 3 seconds to move toward an endpoint; short press moves a short distance. Memory buttons 1=min, 2=max, seated icon=80 cm, standing icon=100 cm by default. Custom position save: hold desired preset 3 seconds, screen flashes. Reset: hold reset 5 seconds, release; any button interrupts and procedure must restart. Child lock: hold Up and Down together 5 seconds, display `LOC`; repeat 5 seconds to unlock; other controls disabled while locked. Do not invent minimum/maximum travel heights, speed, load limit, or automatic anti-collision behavior absent here.

Safety: indoors, gloves/protected floor, bolts initially loose, lower before moving, clear surroundings and cord travel before motion, no direct cleaning spray, dry/slightly damp cloth only, no opening electrics, keep water/humidity away, do not modify plug, switch off power before removing adapter, monthly checks. Site has a separate lightstrip PDF but it was not part of the supplied sources; do not invent remote functions from its mere presence.

## Review artifacts

`*-preview.html` in the parent folder are independent static branding/layout proposals, not completed interactive manuals. `*-01.png`, `*-02.png` and instruction-detail renders are visual evidence. Extracted `.txt` files are incomplete because instructions are raster images.
