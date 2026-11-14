// Oblique surface model of the official nine-component diagram. World x is width,
// y is depth (rearward), z is height. All moving surfaces share this projection.
export const project = ([x,y,z]) => [88+x+.57*y, 429-.31*y-z];
const point = p => project(p).map(v=>v.toFixed(2)).join(',');
const polygon = (name, points, fill, extra='') => `<polygon data-piece="${name}" points="${points.map(point).join(' ')}" fill="${fill}" stroke="#969799" stroke-width=".8" stroke-linejoin="round" ${extra}/>`;
const frontRect = (name,x,z,w,h,fill,y=0) => polygon(name,[[x,y,z],[x+w,y,z],[x+w,y,z+h],[x,y,z+h]],fill);
const group = (name,content,extra='') => `<g data-part="${name}" ${extra}>${content}</g>`;
const line = (name, points, color='#c0c4cc', width=2) => `<polyline data-piece="${name}" points="${points.map(point).join(' ')}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round" class="iso-line"/>`;
const box = (name,x,y,z,w,d,h,tone=['#ececec','#dddddd','#fafafa']) => [
  polygon(`${name} right`,[[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]],tone[1]),
  frontRect(`${name} front`,x,z,w,h,tone[0],y),
  polygon(`${name} top`,[[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],tone[2])
].join('');
export function rack(y=0) {
  const z=126, p=[[15,y+13,z],[226,y+13,z],[226,y+140,z],[15,y+140,z],[15,y+13,z]];
  return line('rack perimeter',p,'#969799',3)+Array.from({length:10},(_,i)=>line(`rack wire ${i+1}`,[[28+i*20,y+13,z],[28+i*20,y+140,z]],'#c0c4cc',2)).join('');
}
export function tray(y=0) {
  return polygon('tray basin',[[18,y+15,70],[224,y+15,70],[224,y+142,70],[18,y+142,70]],'#c0c4cc')+
    polygon('tray back rim',[[18,y+142,70],[224,y+142,70],[224,y+142,79],[18,y+142,79]],'#dddddd')+
    polygon('tray left rim',[[18,y+15,70],[18,y+142,70],[18,y+142,79],[18,y+15,79]],'#e8e8e8')+
    polygon('tray right rim',[[224,y+15,70],[224,y+142,70],[224,y+142,79],[224,y+15,79]],'#969799')+
    frontRect('tray front rolled edge',18,70,206,8,'#dddddd',y+15)+
    [0,1].map(i=>polygon(`tray pressed channel ${i+1}`,[[45+i*43,y+27,70.2],[48+i*43,y+27,70.2],[48+i*43,y+130,70.2],[45+i*43,y+130,70.2]],'#c0c4cc')).join('');
}
export function door(open=0) {
  const angle=open*Math.PI/3;
  const p=([x,z])=>[x,-(z-52)*Math.sin(angle)-7,52+(z-52)*Math.cos(angle)];
  const face=(name,points,fill,extra='')=>polygon(name,points.map(p),fill,extra);
  const ring=(name,outer,inner,fill)=>{const loop=points=>'M'+points.map(v=>point(p(v))).join('L')+'Z';return '<path data-piece="'+name+'" d="'+loop(outer)+loop(inner)+'" fill="'+fill+'" fill-rule="evenodd" stroke="#969799" stroke-width=".8"/>';};
  return ring('door outer frame',[[0,52],[240,52],[240,231],[0,231]],[[8,60],[232,60],[232,223],[8,223]],'#c0c4cc')+
    ring('door inner frame',[[8,60],[232,60],[232,223],[8,223]],[[15,72],[225,72],[225,207],[15,207]],'#e8e8e8')+
    face('glass pane',[[15,72],[225,72],[225,207],[15,207]],'#dddddd','class="oven-glass" fill-opacity=".25"')+
    face('glass lower trim',[[15,72],[225,72],[225,78],[15,78]],'#c0c4cc')+
    face('glass reflection',[[30,85],[58,85],[151,201],[124,201]],'#ffffff','opacity=".13" stroke="none"')+
    face('handle left mount',[[67,209],[78,209],[78,228],[67,228]],'#c0c4cc')+
    face('handle right mount',[[164,209],[175,209],[175,228],[164,228]],'#c0c4cc')+
    face('handle face',[[69,211],[173,211],[173,223],[69,223]],'#dddddd')+
    face('handle highlight',[[69,223],[173,223],[170,227],[72,227]],'#f1f1f1')+
    face('door hinge left',[[10,48],[27,48],[27,55],[10,55]],'#969799')+
    face('door hinge right',[[213,48],[230,48],[230,55],[213,55]],'#969799');
}
function knob(id,x,z) {
  const [cx,cy]=project([x,-5,z]);
  return `<g class="knob-${id}"><ellipse data-piece="${id} knob depth" cx="${cx+3}" cy="${cy-2}" rx="21" ry="22" fill="#c0c4cc" stroke="#969799"/><circle data-piece="${id} bezel" cx="${cx}" cy="${cy}" r="22" fill="#e8e8e8" stroke="#c0c4cc"/><circle data-piece="${id} knob face" cx="${cx}" cy="${cy}" r="18" fill="#dddddd" stroke="#c0c4cc"/><path data-piece="${id} pointer" class="knob-pointer iso-line" data-free="end" d="M${cx} ${cy} L${cx} ${cy-16}" stroke="#666666" stroke-width="2.5" stroke-linecap="round" style="transform-origin:${cx}px ${cy}px"/><circle cx="${cx}" cy="${cy}" r="2" fill="#c0c4cc"/></g>`;
}
export function drawing() {
  const housing = [
    box('left foot',16,10,25,17,16,25,['#c0c4cc','#969799','#dddddd']),
    box('right foot',273,10,25,17,16,25,['#c0c4cc','#969799','#dddddd']),
    box('rear foot',273,137,25,17,16,25,['#c0c4cc','#969799','#dddddd']),
    frontRect('cavity back',8,57,229,174,'#666666',145),
    polygon('cavity left wall',[[5,0,55],[5,145,55],[5,145,233],[5,0,233]],'#969799'),
    polygon('cavity roof',[[5,0,233],[237,0,233],[237,145,233],[5,145,233]],'#969799'),
    polygon('cavity floor',[[5,0,53],[237,0,53],[237,145,53],[5,145,53]],'#969799'),
    ...[121,153].flatMap(z=>[line('left rack guide',[[5,0,z],[5,145,z]],'#c0c4cc',3),line('right rack guide',[[240,0,z],[240,145,z]],'#c0c4cc',3)]),
    polygon('housing right wall',[[310,0,48],[310,164,48],[310,164,245],[310,0,245]],'#dddddd'),
    polygon('housing top',[[0,0,245],[310,0,245],[310,164,245],[0,164,245]],'#ececec'),
    polygon('housing top bevel',[[0,0,239],[310,0,239],[310,0,245],[0,0,245]],'#e8e8e8'),
    ...Array.from({length:16},(_,i)=>{
      const row=Math.floor((i%8)/4), col=i%4, bank=Math.floor(i/8);
      const y=25+col*29,z=184-row*15-bank*70;
      return polygon(`vent slot ${i+1}`,[[310.2,y,z],[310.2,y+19,z],[310.2,y+19,z+6],[310.2,y,z+6]],'#969799');
    })
  ].join('');
  const front=[
    frontRect('control fascia',240,50,70,189,'#ececec'),
    frontRect('lower sill',0,44,310,10,'#dddddd'),
    frontRect('upper sill',0,232,310,7,'#e8e8e8')
  ].join('');
  const [ix,iy]=project([275,-1,72]);
  return `<svg viewBox="0 0 600 500" role="img" aria-label="DKXH005 oven with hinged glass door, wire rack, tray, temperature knob, timer and ventilation" class="product-drawing oven-drawing"><defs><filter id="oven-shadow"><feGaussianBlur stdDeviation="8"/></filter></defs><polygon class="ventilation-space" points="33.05,414.85 413.05,414.85 547,342 167,342" fill="#dddddd" opacity="0" stroke="#969799" stroke-width="1.2" stroke-dasharray="4 5"/><ellipse cx="326" cy="425" rx="202" ry="17" fill="#969799" opacity=".2" filter="url(#oven-shadow)"/>${group('housing',housing)}${group('tray',tray(),'class="tray-assembly"')}${group('rack',rack(),'class="rack-assembly"')}${group('housing',front)}${group('door',door(),'class="door-assembly"')}${group('temperature',knob('temperature',275,190))}${group('timer',knob('timer',275,117)+`<circle data-piece="indicator bezel" cx="${ix}" cy="${iy}" r="6.5" fill="#c0c4cc"/><circle data-piece="cooking indicator" class="cooking-light" cx="${ix}" cy="${iy}" r="4" fill="#767676"/>`)}${group('tray',line('tray handle loop',[[186,-10,34],[219,-10,34],[224,-27,34],[194,-27,34],[186,-10,34]],'#969799',3)+line('tray handle neck',[[186,-10,34],[178,-3,34],[169,-3,34],[169,-8,34],[180,-8,34],[186,-10,34]],'#c0c4cc',3))}</svg>`;
}
export function mount(root) {
  let previousDoor=-1,previousSlide=-1;
  return {
    render(state) {
      if(state.door!==previousDoor){root.querySelector('.door-assembly').innerHTML=door(state.door);previousDoor=state.door;}
      if(state.slide!==previousSlide){root.querySelector('.rack-assembly').innerHTML=rack(-state.slide*100);root.querySelector('.tray-assembly').innerHTML=tray(-state.slide*90);previousSlide=state.slide;}
      root.querySelector('.ventilation-space').setAttribute('opacity',state.ventilation||0);
      const pointers=root.querySelectorAll('.knob-pointer');
      pointers[0].style.transform=`rotate(${-110+(state.temperature-100)/130*220}deg)`;
      pointers[1].style.transform=`rotate(${-120+state.timer/15*100}deg)`;
      root.querySelector('.cooking-light').setAttribute('fill',state.running?'#4d61a3':'#767676');
    }, destroy() {}
  };
}

export const initial = {door:0,slide:0,temperature:230,timer:15,ventilation:0,running:false};
export function pose(name,state,selected) {return {...state,door:['open','accessories'].includes(name)?1:0,slide:name==='accessories'?1:0,ventilation:selected==='housing'?1:0,running:false};}
export function select(part,target) {target.ventilation=part==='housing'?1:0;}
export function goal(prop,target,visual) {return prop==='slide'&&target.slide>0&&visual.door<.98?0:prop==='door'&&target.door===0&&visual.slide>.01?1:target[prop];}
export function armed(type,visual) {return visual.door<=.005&&visual.slide<=.005;}
export function controls(c) {
  const {root,target,step,mode,selected,icon}=c;
  const action=mode==='guide'?step.action:selected==='timer'?'Preview the timer':selected==='rack'||selected==='tray'?'Explore the rack & tray':selected==='housing'?'Show ventilation space':selected==='temperature'?'Practise the controls':'Open the door';
  root.innerHTML=`<button class="practice-button" id="practice-action">${icon('play')}${action}</button><button class="practice-button" id="door-toggle">${target.door>.5?'Close door':'Open door'}</button><button class="practice-button" id="accessory-toggle">${target.slide>.5?'Return accessories':'Slide accessories out'}</button><label class="range-control"><span>Temperature <output id="temperature-value">${target.temperature}°C</output></span><input id="temperature" aria-label="Practise temperature control" type="range" min="100" max="230" step="10" value="${target.temperature}"></label><label class="range-control"><span>Practice timer <output id="timer-value">${target.timer?Math.round(target.timer)+' min':'OFF'}</output></span><input id="timer" aria-label="Practise timer control" type="range" min="0" max="15" step="1" value="${target.timer}"></label><p class="preview-status" id="preview-status">Practice range 0–15 min · use your oven’s real markings. Preview: 15 minutes in 8 seconds.</p>`;
  root.querySelector('#practice-action').onclick=()=>practice(c);
  root.querySelector('#door-toggle').onclick=()=>{c.stopSimulation();target.running=false;target.door=target.door>.5?0:1;if(!target.door)target.slide=0;c.refreshControls();c.run();};
  root.querySelector('#accessory-toggle').onclick=()=>{c.stopSimulation();target.running=false;target.door=1;target.slide=target.slide>.5?0:1;c.refreshControls();c.run();};
  root.querySelector('#temperature').oninput=e=>{target.temperature=Number(e.target.value);root.querySelector('#temperature-value').textContent=`${target.temperature}°C`;c.run();};
  root.querySelector('#timer').oninput=e=>{c.stopSimulation();target.timer=Number(e.target.value);target.running=target.timer>0;root.querySelector('#timer-value').textContent=target.timer?`${target.timer} min`:'OFF';c.status('Manual control practice · no real countdown is running.');c.run();};
}
function practice(c) {
  const {target,step,mode,selected}=c;
  if(mode==='explore'){
    if(selected==='timer'){c.simulate('oven');return;}
    if(selected==='rack'||selected==='tray'){target.door=1;target.slide=target.slide>.5?0:1;}
    else if(selected==='housing'){target.ventilation=1;c.refreshControls();c.status('Leave at least 4 inches (about 10 cm) on all sides. The shaded footprint is illustrative, not to scale.');c.run();return;}
    else if(selected==='temperature'){c.status('Use the temperature slider to practise selecting 100–230°C.');c.root.querySelector('#temperature').focus();return;}
    else {target.door=target.door>.5?0:1;if(!target.door)target.slide=0;}
    c.refreshControls();c.run();return;
  }
  if(['run','indicator'].includes(step.id)){c.simulate('oven');return;}
  if(step.id==='cool'){target.running=false;target.timer=0;target.door=1;target.slide=0;c.refreshControls();c.run();return;}
  c.repose(step.pose,true);
  if(step.id==='check')c.status('Leave at least 4 inches (about 10 cm) on all sides. The shaded footprint is illustrative, not to scale.');
}
export function begin(type,c) {
  Object.assign(c.target,{door:0,slide:0,temperature:230,timer:15,running:true});c.refreshControls();
  if(c.reduced){c.target.running=false;c.target.timer=0;c.refreshControls();c.status('Static preview: indicator lights during operation, then the timer reaches OFF and signals the end. A 15-minute real run is not completed here.');return false;}
  c.status('Accelerated preview · 15 minutes in 8 seconds.');return true;
}
export function advance(type,elapsed,c) {
  c.target.running=elapsed<8;c.target.timer=Math.max(0,15*(1-elapsed/8));
  c.status(elapsed<8?`Accelerated preview · ${Math.ceil(c.target.timer)} min illustrated remaining. Preview elapsed: ${Math.floor(elapsed)} seconds.`:'Preview ended · timer at OFF. Your real oven may still be hot.');
  const output=c.root.querySelector('#timer-value');if(output)output.textContent=c.target.timer?Math.ceil(c.target.timer)+' min':'OFF';
  if(elapsed>=8){c.announce('Illustrated timer ended. This does not complete a real-world task.');return false;}return true;
}
