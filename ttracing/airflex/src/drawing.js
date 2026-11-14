import * as k from './vendor/iso-kit.mjs';
import * as G from './vendor/lathe.mjs';
import * as A from './vendor/audit.mjs';
import {renderPiece,posedShape,centerOf,fittingOffset} from './model.js';

// Figure geometry in illustrative world units; no hidden service components.
export function drawing(product, { lift = 0, extension = 0, recline = 0, fold = 0, width = 160, fit = null, audit = false } = {}) {
  const desk = product.kind === 'desk', mesh = product.mesh;
  const P = k.fitProjection(desk ? [[-176,-85,0],[176,95,0],[-176,-85,260],[176,95,260]] : [[-100,-85,0],[100,135,0],[-65,-65,315],[65,135,315]], 600, 500, {pad:38,azimuth:desk?60:55,elevation:desk?27:20});
  const R = A.recorder(P);
  let serial = 0;
  const at = p => k.iso(p,P);
  const item = (part, name, paths, shape, center, motion = '', inner = '') => {
    const id = `piece-${++serial}`;
    const svg = k.solidSvg(paths,{tone:part==='seat'||part==='top'?'hi':'mid',inner});
    return R.put({details:[],name:`${part}.${name}`,piece:part,at:center,svg,shapes:[R.solid(shape)],part,motion,id});
  };
  const slab = (part,name,x,y,w,d,z,h,r=1,motion='',detail=true) => {
    const plan={x,y,w,d,r};
    const inner=detail&&w>12&&d>12?k.lineSvg(k.planOutline(k.insetPlan(plan,2),z+h,P,5),{tone:'lo'}):'';
    const result=item(part,name,k.slabOf(plan,z,h,P,5,.55),A.slab(plan,z,h,{name:`${part}.${name}`,owner:part},5),[x+w/2,y+d/2,z+h/2],motion,inner);
    if(inner)result.details.push({points:k.roundedPlan(k.insetPlan(plan,2),5).map(([x,y])=>[x,y,z+h]),closed:true});return result;
  };
  const disc = (part,name,point,axis,from,to,r,motion='',ground=false) => {
    const F=G.frameAlong(point,axis);
    return item(part,name,G.disc(from,to,r,F,P,{steps:40}),A.disc(F,from,to,r,{name:`${part}.${name}`,owner:part,ground}),G.pointOf(F,(from+to)/2,0,0),motion);
  };
  const prism = (part,name,F,poly,s0,s1,motion='',inner='') => {const result=item(part,name,G.prismOf(F,poly,s0,s1,P),A.prism(F,poly,s0,s1,{name:`${part}.${name}`,owner:part}),G.pointOf(F,(s0+s1)/2,0,0),motion,inner);if(inner)result.details.push({points:poly.map(([u,v])=>G.add3(F.o,G.add3(G.mul3(F.u,u),G.mul3(F.v,v)))),closed:true});return result;};
  const screws = (part,name,points,motion='') => points.forEach(([x,y,z],i)=>disc(part,`${name}-${i+1}`,[x,y,z],[0,0,1],0,.8,1.6,motion));
  const front = (y=0) => ({o:[0,y,0],a:[0,-1,0],u:[1,0,0],v:[0,0,1]});
  const frontLine = (poly,y) => k.lineSvg(poly.map((p,i)=>`${i?'L':'M'}${at([p[0],y,p[1]]).join(' ')}`).join('')+'Z',{tone:'lo'});
  if(!desk) {
    // Base: five double-wheel casters, axle, fork and pin at each spoke.
    for(let i=0;i<5;i++){
      const a=(i*72+18)*Math.PI/180,x=Math.cos(a)*78,y=Math.sin(a)*78;
      for(const [j,s]of [[0,-10],[1,4]]){
        disc('base',`caster-${i+1}-wheel-${j+1}`,[x,y,10],[1,0,0],s,s+6,10,'',true);
        disc('base',`caster-${i+1}-hub-${j+1}`,[x,y,10],[1,0,0],s+6,s+6.6,4);
      }
      disc('base',`caster-${i+1}-axle`,[x,y,10],[1,0,0],-3.4,4,2);
      slab('base',`caster-${i+1}-fork`,x-6,y-5,12,10,20,4,2,'',false);
      disc('base',`caster-${i+1}-stem`,[x,y,0],[0,0,1],24,30,3);
    }
    const star=[];
    for(let i=0;i<5;i++)for(const [r,da] of [[82,-5],[82,5],[19,36]]){const a=(i*72+18+da)*Math.PI/180;star.push([Math.cos(a)*r,Math.sin(a)*r]);}
    item('base','five-spoke-base',k.extrude(star,30,8,P,{convex:false,bevel:.5}),A.extruded(star,30,8,{name:'base.star',owner:'base'}),[0,0,34]);
    disc('lift','lift-body',[0,0,0],[0,0,1],38,83,9);
    disc('lift','upper-seal',[0,0,0],[0,0,1],83,85,6);
    const F=G.frameAlong([0,0,0],[0,0,1]);
    const rod=G.rodOut(F,85,118,4,P,{stroke:35});
    const rodItem=item('lift','sliding-piston',rod.paths,A.disc(F,85,118+lift,4,{name:'lift.piston',owner:'lift'}),[0,0,102+lift/2],'piston');
    rodItem.svg=`<clipPath id="piston-clip"><path data-hold transform="${k.translateAlong(P,[0,0,-lift])}" d="${rod.clip}"/></clipPath><g transform="${k.translateAlong(P,[0,0,lift])}"><g clip-path="url(#piston-clip)">${rodItem.svg}</g></g>`;
    slab('mechanism','tilt-housing',-21,-20,42,40,118+lift,8,4,'upper');
    slab('mechanism','seat-mount',-32,-31,64,62,126+lift,3,3,'upper');
    disc('mechanism','tension-dial',[0,23,0],[0,0,1],112+lift,118+lift,8,'upper');
    disc('mechanism','height-lever',[21,8,122+lift],[1,0,0],0,34,2,'upper');
    slab('mechanism','lever-grip',49,3,13,10,120+lift,5,3,'upper',false);
    slab('seat','seat-shell',-50,-44,100,99,129+lift,5,8,'upper');
    slab('seat','seat-cushion',-49,-43,98,97,134+lift,14,10,'upper');
    const seamPlan={x:-45,y:-39,w:90,d:89,r:9};
    R.items.at(-1).svg+=k.lineSvg(k.planOutline(seamPlan,148+lift,P,8),{tone:'lo'});
    screws('seat','mounting-head',[[-28,-26,129+lift],[28,-26,129+lift],[-28,26,129+lift],[28,26,129+lift]],'upper');
    if(mesh){
      const z=lift;
      // The original Airflex has structural armrests joining seat and back.
      for(const s of [-1,1]){
        const armF={o:[s===1?50:-58,0,0],a:[1,0,0],u:[0,1,0],v:[0,0,1]};
        const outline=[[-43,156+z],[-43,182+z],[-28,198+z],[10,198+z],[34,184+z],[36,160+z],[24,129+z],[13,129+z],[24,166+z],[24,179+z],[7,186+z],[-25,186+z],[-34,177+z],[-34,156+z]];
        const sections=[[[-43,156],[-43,182],[-34,177],[-34,156]],[[-43,182],[-28,198],[-25,186],[-34,177]],[[-28,198],[10,198],[7,186],[-25,186]],[[10,198],[34,184],[24,179],[7,186]],[[34,184],[36,160],[24,166],[24,179]],[[36,160],[24,129],[13,129],[24,166]]];
        sections.forEach((section,i)=>prism('arms',`structural-arm-${s}-section-${i+1}`,armF,section.map(([y,h])=>[y,h+z]),0,8,'upper'));
        slab('arms',`arm-pad-${s}`,s===1?47:-72,-23,25,57,198+z,6,6,'upper');
      }
      const F=front(-43);
      prism('back','mesh-panel',F,[[-40,158+z],[40,158+z],[40,253+z],[-40,253+z]],0,2,'upper');
      // Mesh threads meet the frame at both ends.
      let lines='';
      for(let x=-36;x<=36;x+=6)lines+=k.segment([x,-42.9,158+z],[x,-42.9,253+z],P);
      for(let h=162;h<253;h+=6)lines+=k.segment([-40,-42.9,h+z],[40,-42.9,h+z],P);
      R.items.at(-1).svg+=k.lineSvg(lines,{tone:'lo'});
      for(let x=-36;x<=36;x+=6)R.items.at(-1).details.push({points:[[x,-42.9,158+z],[x,-42.9,253+z]]});
      for(let h=162;h<253;h+=6)R.items.at(-1).details.push({points:[[-40,-42.9,h+z],[40,-42.9,h+z]]});
      prism('back','left-back-frame',F,[[-48,148+z],[-40,148+z],[-40,253+z],[-48,261+z]],0,8,'upper');
      prism('back','right-back-frame',F,[[40,148+z],[48,148+z],[48,261+z],[40,253+z]],0,8,'upper');
      prism('back','lower-back-frame',F,[[-40,148+z],[40,148+z],[40,158+z],[-40,158+z]],0,8,'upper');
      prism('back','upper-back-frame',F,[[-40,253+z],[40,253+z],[48,261+z],[-48,261+z]],0,8,'upper');
      slab('back','lumbar-cross-support',-48,-54,96,3,184+z,7,1,'upper',false);
    }else{
      for(const s of[-1,1]){
        slab('arms',`arm-post-${s}`,s===1?50:-58,3,8,16,134+lift,51,2,'upper',false);
        slab('arms',`arm-pad-${s}`,s===1?43:-72,-14,29,60,185+lift,7,6,'upper');
        slab('arms',`height-release-${s}`,s===1?58:-61,7,3,8,173+lift,6,1,'upper',false);
      }
      const contour=[[-45,148+lift],[45,148+lift],[48,204+lift],[51,229+lift],[32,278+lift],[-32,278+lift],[-51,229+lift],[-48,204+lift]];
      prism('back','back-shell',front(-43),contour,0,10,'upper');
      const pad=[[-27,157+lift],[27,157+lift],[27,246+lift],[20,265+lift],[-20,265+lift],[-27,246+lift]];
      prism('back','center-upholstery',front(-39),pad,0,4,'upper',frontLine(pad,-38.9));
      for(const s of[-1,1])prism('back',`side-bolster-${s}`,front(-38),[[s*29,156+lift],[s*44,157+lift],[s*47,221+lift],[s*31,246+lift]],0,5,'upper');
      prism('pillows','head-pillow',front(-27),[[-25,244+lift],[25,244+lift],[22,266+lift],[-22,266+lift]],0,12,'upper');
      prism('pillows','lumbar-pillow',front(-24),[[-29,162+lift],[29,162+lift],[32,191+lift],[-32,191+lift]],0,14,'upper');
      for(const s of[-1,1]){
        slab('back',`side-mount-${s}`,s===1?45:-50,-43,5,16,148+lift,20,1,'upper',false);
        disc('back',`recline-cover-${s}`,[s*50,-35,157+lift],[s,0,0],0,4,11,'upper');
        slab('legrest',`rail-mount-${s}`,s*38-4,10,8,30,122+lift,7,1,'upper',false);
        const RF=G.frameAlong([s*38,0,122+lift],[0,1,0]);
        const rail=G.rodOut(RF,40,65,2,P,{stroke:55});
        const it=item('legrest',`sliding-rail-${s}`,rail.paths,A.disc(RF,40,65+extension,2,{name:`legrest.rail${s}`,owner:'legrest'}),[s*38,53+extension/2,122+lift],'rail');
        it.svg=`<clipPath id="rail-clip-${s}"><path data-hold transform="${k.translateAlong(P,[0,-extension,0])}" d="${rail.clip}"/></clipPath><g transform="${k.translateAlong(P,[0,extension,0])}"><g clip-path="url(#rail-clip-${s})">${it.svg}</g></g>`;
      }
      for(const side of[-1,1])slab('legrest',`fold-hinge-${side}`,side*38-2,65+extension,4,2,120+lift,4,.4,'legrest',false);
      slab('legrest','legrest-underplate',-40,40+extension,80,30,111+lift,3,4,'legrest');
      slab('legrest','legrest-cushion',-39,41+extension,78,28,114+lift,6,5,'legrest');
    }
  }else{
    for(const x of[-113,113]){
      for(const y of[-54,54]){
        disc('feet',`leveler-${x}-${y}`,[x,y,0],[0,0,1],0,4,7,'',true);
        disc('feet',`leveler-neck-${x}-${y}`,[x,y,0],[0,0,1],4,7,3);
      }
      slab('feet',`foot-${x}`,x-14,-70,28,140,7,8,5);
      slab('feet',`foot-rear-cap-${x}`,x-13,-70,26,6,15,1,2,'',false);
      slab('feet',`foot-front-cap-${x}`,x-13,64,26,6,15,1,2,'',false);
      slab('frame',`outer-column-${x}`,x-9,-13,18,26,15,95,1,'',false);
      const innerPlan={x:x-7,y:-11,w:14,d:22,r:1};
      const rod=slab('frame',`inner-column-${x}`,innerPlan.x,innerPlan.y,14,22,60,117,1,'column',false);
      R.solids.splice(R.solids.indexOf(rod.shapes[0]),1);
      rod.shapes=[R.solid(A.slab(innerPlan,112,65+lift,{name:`frame.visible-inner-${x}`,owner:'frame'},5))];
      const clip=k.slabOf(innerPlan,112,160,P,5).fill;
      rod.svg=`<clipPath id="column-clip-${x}"><path data-hold transform="${k.translateAlong(P,[0,0,-lift])}" d="${clip}"/></clipPath><g transform="${k.translateAlong(P,[0,0,lift])}"><g clip-path="url(#column-clip-${x})">${rod.svg}</g></g>`;
      slab('frame',`column-collar-${x}`,x-10,-14,20,28,110,2,1,'',false);
      slab('frame',`upper-mount-${x}`,x-17,-51,34,102,177+lift,5,2,'upper');
      screws('frame',`mount-${x}`,[[x-11,-42,182+lift],[x+11,-42,182+lift],[x-11,42,182+lift],[x+11,42,182+lift]],'upper');
      for(const y of[-48,39])slab('frame',`side-bracket-${x}-${y}`,x-17,y,34,9,182+lift,7,1,'upper',false);
    }
    for(const y of[-35,27]){
      slab('frame',`rail-outer-${y}`,-96,y,95,8,174+lift,8,1,'upper',false);
      slab('frame',`rail-inner-${y}`,-1,y+1,97,6,175+lift,6,1,'upper',false);
      screws('frame',`rail-lock-${y}`,[[-16,y+4,182+lift]],'upper');
    }
    slab('accessories','magnetic-lightstrip',-150,-83,300,1,192+lift,1,0,'upper',false);
    slab('top','desktop',-164,-58,328,140,189+lift,7,6,'upper');
    slab('top','rear-flippable-bar',-164,-82,328,24,189+lift,7,3,'upper');
    for(const x of[-115,115])slab('top',`bar-hinge-${x}`,x-7,-60,14,4,188+lift,1,1,'upper',false);
    slab('cables','tray',-66,-65,132,30,155+lift,6,2,'upper');
    for(const x of[-60,54])slab('cables',`tray-hanger-${x}`,x,-64,6,10,161+lift,28,1,'upper',false);
    for(let i=0;i<9;i++)slab('cables',`clip-${i+1}`,-55+i*13,-54,6,5,161+lift,1,.8,'upper',false);
    slab('controller','controller-housing',83,70,55,12,180+lift,9,2,'upper');
    const F=front(82);
    prism('controller','display-window',F,[[88,182+lift],[106,182+lift],[106,187+lift],[88,187+lift]],0,.2,'upper');
    for(const x of[113,123,133])prism('controller',`button-${x}`,F,[[x-2,182+lift],[x+2,182+lift],[x+2,187+lift],[x-2,187+lift]],0,.4,'upper');
    slab('accessories','headphone-bracket',141,45,6,19,179+lift,10,1,'upper',false);
    slab('accessories','headphone-hook',141,58,6,7,169+lift,10,1,'upper',false);
    slab('accessories','headphone-tip',141,60,6,5,169+lift,3,1,'upper',false);
    slab('accessories','cup-bracket',-155,43,6,25,180+lift,9,1,'upper',false);
    const cupF=G.frameAlong([-152,70,180+lift],[0,0,1]);
    item('accessories','cup-ring',G.ringBand(-2,0,10,12,cupF,P),A.ring(cupF,-2,0,10,12,{name:'accessories.cup-ring',owner:'accessories'}),[-152,70,179+lift],'upper');
    for(const x of[-159,159])slab('top',`edge-cap-${x}`,x-2,-56,4,136,196+lift,.5,1,'upper',false);
  }
  if(recline||fold||width!==160){for(const it of R.items){if(['piston','rail','column'].includes(it.motion))continue;const record={name:it.name,part:it.part,shape:it.shapes[0],details:it.details};const posed=posedShape(record,{recline,fold,width},product).shape;const markup=renderPiece(record,{recline,fold,width},product,P);Object.assign(it.shapes[0],posed);it.svg=markup;}}
  // The shape recorder determines true occlusion, rather than hand-tuned layer biases.
  if(fit){R.order=['fitting'];for(const it of R.items){it.move=fittingOffset({name:it.name,part:it.part,shape:it.shapes[0]},fit,1);it.ride='fitting';for(const shape of it.shapes){shape.move=it.move;shape.ride='fitting';}}}
  A.settle(R,P,{states:fit?A.uniformStates(10):[0]});
  const items=[...R.items].sort((a,b)=>a.key-b.key);
  const markup=items.map(it=>`<g id="${it.id}" data-part="${it.part}" data-motion="${it.motion}" data-piece="${it.name}">${it.svg}</g>`).join('');
  const shadow=k.haloOf({x:desk?-160:-90,y:desk?-70:-80,w:desk?320:180,d:desk?150:180,r:20},0,3,P);
  const svg=k.figureSvg({width:600,height:500,label:product.drawingLabel,body:`<path class="iso-halo" d="${shadow}"/>${markup}`});
  if(audit)A.auditOrExit(R,P,{argv:['--audit'],apart:fit?1:0,frames:fit?A.uniformStates(60):[],ground:s=>s.ground===true});
  return {svg,count:serial,P,names:items.map(i=>({part:i.part,name:i.name})),scene:items.map(i=>({id:i.id,key:i.key,move:i.move,part:i.part,name:i.name,motion:i.motion,shape:i.shapes[0],details:i.details})),parts:[...new Set(items.map(it=>it.part))]};
}
