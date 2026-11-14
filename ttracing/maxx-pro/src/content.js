const step=(title,focus,body,extra={})=>({title,focus,body,source:'Original manual · page 2',...extra});
export const product={
  id:'maxx-pro',name:'Maxx Pro',subtitle:'Gaming chair · Assembly & everyday adjustments',kind:'chair',mesh:false,
  manual:'https://cdn.shopify.com/s/files/1/2021/9723/files/Maxx_Pro_User_Manual_-_latest.pdf?v=1784886789',
  drawingLabel:'Isometric Maxx Pro gaming chair with five double-wheel castors, gas lift, seat, backrest, armrests, multi-tilt controls, pillows and sliding legrest.',
  parts:{base:['Wheelbase & castors','Five castors fit into the underside of the five-spoke base. Check each metal connector is fully seated.'],lift:['Gas lift & cover','The gas lift fits into the centre of the base. Its upper tip seats in the socket of the multi-tilt mechanism.'],seat:['Seatbase','The seatbase carries the armrests and the mechanism beneath the cushion. Many fasteners are supplied pre-attached.'],arms:['Armrests','Install both armrests with the slanted section facing the front. The website calls these 5D armrests; this PDF does not document all five adjustment directions.'],back:['Backrest & side covers','Secure the backrest with M8 × 25 screws before using the recline lever. The manual shows backrest adjustment up to 155°.'],mechanism:['Multi-tilt controls','The mechanism includes the height lever, rocking lock and back-pressure adjustment knob. These controls have different jobs.'],pillows:['Head & lumbar pillows','Fit the supplied head and lumbar pillows as shown in the manual. Reposition them for support.'],legrest:['Pull-out legrest','Slide the legrest into its mounting slots with the curved section facing downward during installation. The illustration marks a 20 kg maximum on the legrest.']},
  safety:['Wear protective gloves and assemble on a protected, preferably carpeted surface.','Do not fully tighten bolts until the parts are aligned and assembly is complete.','Do not use the recline lever until the backrest is securely installed. Keep hands out of toggle-mechanism gaps.','Use no excessive force when adjusting the chair angle. Do not reach for the reclining mechanism when fully tilted.','Keep both feet firmly on the ground while reclining. Set the rocking lever to the lock position after reclining.','Sit with your back aligned with the backrest; do not sit on the armrests or seat edge.','The legrest illustration marks a 20 kg maximum. Do not lean forward or press down on the fully extended rest: the chair can tip forward.','Avoid direct sun. Clean gently without excessive scrubbing. Check chair parts monthly.'],
  journeys:[
    {id:'assembly',title:'Assemble your chair',steps:[
      step('Prepare the parts','seat','Lay out the chair parts on a protected, flat surface. Wear protective gloves before you start.',{checks:['Find the five castors, base, gas lift and cover.','Check the seat, backrest, arms, mechanism, side covers, pillows and legrest.','Locate the Allen key and supplied screws.'],note:'Many screws are pre-attached. Side-cover screws and any extras are packed separately.'}),
      step('Fit all five castors','base','Insert each castor’s metal connector into a hole on the underside of the wheelbase.',{checks:['Fit a castor at all five spoke ends.','Check every connector is seated before turning the base upright.'],source:'Original manual · page 2, step 1'}),
      step('Seat the gas lift','lift','Insert the gas lift into the centre of the wheelbase and place its cover over it, as shown in the manual.',{source:'Original manual · page 2, step 2'}),
      step('Fit the armrests','arms','Attach both armrests to the underside of the seatbase with the M8 × 25 screws.',{checks:['Make the slanted section face the front on both arms.','Position the screws and tighten both sides evenly once aligned.'],source:'Original manual · page 2, step 3'}),
      step('Align the backrest','back','Bring the backrest into position against the seatbase and align its mounting holes.',{safety:'Do not adjust the recline lever until the backrest is securely installed.',source:'Original manual · page 2, step 4'}),
      step('Secure the backrest','back','Position the M8 × 25 screws in each backrest mounting hole before tightening them with the Allen key.',{checks:['Check both sides are aligned.','Make sure the backrest is securely attached.'],source:'Original manual · page 2, step 5'}),
      step('Attach the side covers','back','Press the left and right side covers onto the backrest mounting areas. Align the holes and secure them with the M5 × 8 screws.',{source:'Original manual · page 2, step 6'}),
      step('Fit the multi-tilt mechanism','mechanism','Attach the mechanism to the underside of the seatbase using the M8 × 25 screws shown in the diagram.',{checks:['Align all four mounting points before tightening.','Keep hands clear of moving linkages.'],source:'Original manual · page 2, step 7'}),
      step('Join the seat to the base','lift','Align the socket under the mechanism with the upper tip of the gas lift. Lower the assembled seat onto the lift.',{source:'Original manual · page 2, step 8'}),
      step('Fit the support pillows','pillows','Position the supplied head and lumbar pillows as shown on the completed chair in the manual.',{source:'Original manual · page 2, step 8'}),
      step('Install the legrest','legrest','Loosen the two mounting screws. Align the legrest rods with the mounting slots and slide them in until fully seated.',{checks:['Keep the curved section facing downward.','Secure the mounting screws after the rods are seated.'],safety:'Do not use the extended legrest as a seat or press down on it.',source:'Original manual · page 2, step 9'}),
      step('Check before sitting','seat','Review each connection and check that all fitted screws and parts are secure before use.',{checks:['All five castors are seated.','Backrest, mechanism and armrests are secure.','Legrest is mounted correctly and retracts.'],note:'Your confirmation records your review on this device. The webpage cannot inspect the physical chair.'})
    ]},
    {id:'position',title:'Find your position',steps:[
      step('Know the different controls','mechanism','Identify the height lever, rocking lock and back-pressure knob underneath the seat before making adjustments.',{safety:'Keep your hands out of the gaps in the toggle mechanism.'}),
      step('Set the seat height','lift','Use the height-lifting lever to adjust the chair, then release it at a comfortable position.',{pose:'height',note:'The height slider under the figure demonstrates movement only; it does not show a measured chair height.'}),
      step('Adjust back pressure','mechanism','Use the back-pressure adjustment knob to change the resistance of the rocking mechanism. The manual distinguishes loose and tight settings.',{note:'Make small adjustments and check the feel. No number of turns or tension scale is specified.'}),
      step('Use the rocking lock','mechanism','Use the tilt-mechanism lever to select locked or free rocking as shown in the manual.',{safety:'Ensure the rocking lever is in the lock position after reclining.'}),
      step('Adjust the backrest','back','Use the angle-adjust lever for the backrest. The manual illustrates adjustment up to 155°.',{safety:'The backrest must already be securely installed. Keep both feet on the ground and avoid sudden or excessive force. Do not reach for the mechanism when fully tilted.',note:'Use the backrest-recline preview to explore the documented angle; the seat-height slider is a separate adjustment.'})
    ]},
    {id:'legrest',title:'Use the legrest',steps:[
      step('Check the mounting first','legrest','Confirm the rods are fully seated in the mounting slots and the two mounting screws are secure.',{safety:'The curved section faces downward during installation.'}),
      step('Slide out the legrest','legrest','Pull the legrest forward from beneath the seat.',{pose:'extended',note:'Use the slider to explore its sliding travel. The illustration does not measure the real travel distance.'}),
      step('Flip the cushion into position','legrest','Follow the pull-and-flip sequence shown in the original manual to unfold the rest for your legs.',{pose:'extended',safety:'The manual marks 20 kg maximum on the legrest. Do not lean forward or press down on the extended rest: the chair may tip.',note:'The flip preview shows a folding movement. Match the original diagram for the cushion’s exact folding orientation.'}),
      step('Fold and stow after use','legrest','Fold the cushion back and slide the legrest beneath the seat when you are finished.',{pose:'stowed',checks:['Keep fingers away from folding and sliding joints.','Check the rest is tucked back beneath the seat.']})
    ]},
    {id:'care',title:'Care & safety',steps:[
      step('Sit safely','seat','Sit with your back aligned with the backrest. Keep weight on the seat, rather than on the edge or armrests.',{safety:'Avoid sudden or excessive force when reclining.'}),
      step('Clean gently','back','Clean the chair gently and avoid excessive scrubbing. Keep it out of direct sunlight to reduce colour fading.'),
      step('Check the chair monthly','base','Inspect the chair’s parts every month and make sure they are functioning correctly.',{checks:['Review castors and base.','Check backrest, armrest and mechanism fastenings.','Review legrest mounting and movement.']}),
      step('Keep the source handy','mechanism','Use the original manual for the manufacturer’s assembly diagrams and control illustrations.',{note:'This PDF does not describe every 5D armrest adjustment. Do not infer undocumented motions or force a control. Use TTRacing’s official support for product-specific clarification.'})
    ]}
  ]
};

[null,"casters","lift","arms","back","back","covers","mechanism","seat","pillows","legrest",null].forEach((fit,i)=>{product.journeys[0].steps[i].fit=fit;});

// Each step chooses a task-specific camera; other parts retain their own best view.
product.journeys.find(j=>j.id==='assembly').steps[0].view='overview';
product.journeys.find(j=>j.id==='assembly').steps[4].view='backJoint';
product.journeys.find(j=>j.id==='assembly').steps[5].view='backJoint';
product.journeys.find(j=>j.id==='assembly').steps[6].view='backJoint';
product.journeys.find(j=>j.id==='assembly').steps[11].view='overview';
product.journeys.find(j=>j.id==='position').steps[1].view='lever';
product.journeys.find(j=>j.id==='position').steps[2].view='tension';
product.journeys.find(j=>j.id==='position').steps[3].view='lever';
product.journeys.find(j=>j.id==='care').steps[0].view='seatTop';
product.journeys.find(j=>j.id==='legrest').steps[1].view='legrestTop';
product.journeys.find(j=>j.id==='legrest').steps[2].view='legrestFold';
