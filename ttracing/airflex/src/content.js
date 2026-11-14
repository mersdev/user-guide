const step=(title,focus,body,extra={})=>({title,focus,body,source:'Original manual · page 2',...extra});
export const product={
  id:'airflex',name:'Airflex',subtitle:'Ergochair · Original model',kind:'chair',mesh:true,
  manual:'https://cdn.shopify.com/s/files/1/2021/9723/files/NEW01-TT_AIRFLEX_USER_MANUAL.pdf?v=1695181406',
  drawingLabel:'Isometric original Airflex ergonomic chair with mesh backrest, structural armrests, cushioned seat, full-tilt mechanism, gas lift and five castors.',
  parts:{base:['Wheelbase & castors','Five castors push into the underside of the five-spoke wheelbase.'],lift:['Gas lift','The lift fits in the centre of the base and connects to the socket beneath the full-tilt mechanism.'],seat:['Seatbase','The padded seatbase fastens to the structural armrests and the mechanism. Use the screw sizes indicated for each joint.'],arms:['Structural armrests','The left and right arms first attach to the backrest with M6 × 20 screws, then to the seat with M6 × 35 screws.'],back:['Mesh backrest','The original Airflex mesh backrest joins the seat through the structural armrests. This supplied model does not show a headrest.'],mechanism:['Full-tilt controls','The mechanism has a height lever, pull-to-unlock tilt control and back-pressure knob. The manual shows 121° maximum tilt.']},
  safety:['Read the manual completely and check the carton contents before assembly.','Wear protective gloves and protect the floor, preferably with a carpeted surface.','Fit screws loosely first. Step 5 calls for final tightening of all screws, including the screws from steps 3 and 4.','Sit with your back aligned with the backrest. Do not sit on the armrests or the edge of the chair.','Do not use excessive force when tilting the chair.','Avoid direct sunlight. Clean gently without excessive scrubbing. Check chair parts monthly.'],
  journeys:[
    {id:'assembly',title:'Assemble your chair',steps:[
      step('Check the carton','seat','Lay out the original Airflex parts on a protected surface. Wear protective gloves before you start.',{checks:['Find the backrest, seatbase and left and right armrests.','Check the base, five castors, gas lift and full-tilt mechanism.','Find the Allen key and three sizes of M6 screws.'],note:'The screws are packed separately in the carton. There are four each of M6 × 20, M6 × 25 and M6 × 35.'}),
      step('Fit all five castors','base','Insert each castor’s metal connector into a hole on the underside of the wheelbase.',{checks:['Fit all five castors.','Check that the connectors are seated.'],source:'Original manual · page 2, step 1'}),
      step('Install the gas lift','lift','Place the gas lift into the centre of the wheelbase as shown in the manual.',{source:'Original manual · page 2, step 2'}),
      step('Join the arms to the back','arms','Attach the left and right armrests to the sides of the backrest using the four M6 × 20 screws.',{safety:'Do not over-tighten. Leave these screws loosely fitted at this stage.',note:'The manual’s 50% marking means an intermediate fitting stage, not a measured torque.',source:'Original manual · page 2, step 3'}),
      step('Connect the arms to the seat','seat','Use the four M6 × 35 screws to attach the armrests to the bottom of the seatbase. Follow the numbered hole sequence in the original diagram.',{safety:'Keep the screws loosely fitted until all four are positioned.',note:'The original close-up labels the hole order 1st, 2nd, 3rd and 4th. Use that diagram to identify the holes on your seat.',source:'Original manual · page 2, step 4'}),
      step('Fit the mechanism and tighten','mechanism','Attach the full-tilt mechanism to the bottom of the seatbase using four M6 × 25 screws. Once everything is aligned, tighten all screws, including those from the previous two steps.',{checks:['Mechanism screws are secure.','Arm-to-back screws are secure.','Arm-to-seat screws are secure.'],note:'This is the specific final-tightening point in step 5. The general attention list also says to avoid full tightening before assembly is complete.',source:'Original manual · page 2, step 5'}),
      step('Join the two halves','lift','Align the socket beneath the mechanism with the upper tip of the gas lift, then lower the seat assembly onto it.',{source:'Original manual · page 2, step 6'}),
      step('Review the finished chair','seat','Check the fitted connections before sitting in the chair.',{checks:['All five castors are seated.','The backrest, structural arms and mechanism are secure.','The seat assembly is seated on the lift.'],note:'The webpage records your review only; it cannot inspect the physical chair.'})
    ]},
    {id:'adjust',title:'Adjust your chair',steps:[
      step('Find the height lever','mechanism','Identify the height-lifting lever under the seat before adjusting the chair.'),
      step('Choose your seat height','lift','Use the height lever to move the seat up or down, then release it at your chosen position.',{pose:'height',note:'The figure demonstrates the direction of movement. It does not show a measured height or the full physical adjustment range.'}),
      step('Set the back pressure','mechanism','Turn the back-pressure knob to adjust rocking resistance. The manual shows loose and tight settings.',{note:'No numbered tension scale or required number of turns is specified.'}),
      step('Check your seated position','back','Sit with your back fully aligned with the backrest. Use a stable position rather than sitting on the seat edge or on an armrest.')
    ]},
    {id:'controls',title:'Understand the controls',steps:[
      step('Separate height from tilt','mechanism','The mechanism’s height lever changes seat height. Its tilt control and pressure knob govern rocking; they are separate adjustments.'),
      step('Unlock the tilt','mechanism','Pull the tilt control to unlock, as shown in the manufacturer’s diagram.',{safety:'Do not use excessive force when tilting. The manual illustrates a maximum tilt angle of 121°.',note:'Use the full-tilt preview to explore the documented angle. The height control is a separate adjustment.'}),
      step('Adjust rocking resistance','mechanism','Use the back-pressure adjustment knob to choose a looser or tighter feel before using the chair’s rocking movement.'),
      step('Use the original model guidance','back','Use this supplied Airflex manual for the parts and controls on your chair.',{note:'This is the original Airflex guide. It does not add headrest or other features from newer versions.'})
    ]},
    {id:'care',title:'Care & safety',steps:[
      step('Protect the upholstery','seat','Keep the chair out of direct sunlight to help prevent colour fading.'),
      step('Clean without scrubbing','back','Clean the chair gently. Avoid excessive scrubbing of the chair surfaces.'),
      step('Inspect once a month','base','Check chair parts monthly to make sure they are functioning correctly.',{checks:['Review castors and base.','Check armrest, backrest and mechanism fastenings.','Check the chair’s controls before use.']}),
      step('Keep safe sitting habits','arms','Do not sit on an armrest or on the edge of the chair. Keep your back aligned with the backrest.',{safety:'Do not use excessive force when tilting the chair.'})
    ]}
  ]
};

[null,"casters","lift","arms","seat","mechanism","seat",null].forEach((fit,i)=>{product.journeys[0].steps[i].fit=fit;});

// Each step chooses a task-specific camera; other parts retain their own best view.
product.journeys.find(j=>j.id==='assembly').steps[0].view='overview';
product.journeys.find(j=>j.id==='assembly').steps[7].view='overview';
product.journeys.find(j=>j.id==='adjust').steps[0].view='lever';
product.journeys.find(j=>j.id==='adjust').steps[1].view='lever';
product.journeys.find(j=>j.id==='adjust').steps[2].view='tension';
product.journeys.find(j=>j.id==='controls').steps[0].view='mechanism';
product.journeys.find(j=>j.id==='controls').steps[1].view='lever';
product.journeys.find(j=>j.id==='controls').steps[2].view='tension';
product.journeys.find(j=>j.id==='care').steps[0].view='seatTop';
product.journeys.find(j=>j.id==='care').steps[3].view='arm';
