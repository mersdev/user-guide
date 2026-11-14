import * as k from './vendor/iso-kit.mjs';
import * as G from './vendor/lathe.mjs';

export function rotateX(p,angle,pivot=[0,0,0]){const a=angle*Math.PI/180,c=Math.cos(a),s=Math.sin(a),y=p[1]-pivot[1],z=p[2]-pivot[2];return[p[0],pivot[1]+y*c-z*s,pivot[2]+y*s+z*c];}
export function centerOf(shape){if(shape.kind==='body')return G.pointOf(shape.F,(Math.min(...shape.poly.map(p=>p[0]))+Math.max(...shape.poly.map(p=>p[0])))/2,0,0);const mean=shape.poly.reduce((a,p)=>[a[0]+p[0]/shape.poly.length,a[1]+p[1]/shape.poly.length],[0,0]);return G.add3(shape.F.o,G.add3(G.mul3(shape.F.a,(shape.s0+shape.s1)/2),G.add3(G.mul3(shape.F.u,mean[0]),G.mul3(shape.F.v,mean[1]))));}
export function fittingOffset(item,fit,amount){const p=item.part,c=centerOf(item.shape),side=c[0]<0?-1:1,n=item.name;let delta=[0,0,0];
  if(fit==='casters'&&n.includes('caster-'))delta=[0,0,-20];
  if(fit==='lift'&&p!=='base')delta=[0,0,30];
  if(fit==='seat'&&!['base','lift'].includes(p))delta=[0,0,28];
  if(fit==='arms'&&p==='arms')delta=[side*24,0,0];
  if(fit==='back'&&['back','pillows'].includes(p))delta=[0,0,32];
  if(fit==='covers'&&n.includes('recline-cover'))delta=[side*22,0,0];
  if(fit==='pillows'&&p==='pillows')delta=[0,25,0];
  if(fit==='mechanism'&&['base','lift','mechanism'].includes(p))delta=[0,0,-26];
  if(fit==='legrest'&&p==='legrest'&&!n.includes('rail-mount'))delta=[0,30,0];
  if(fit==='feet'&&p==='feet')delta=[0,0,-18];
  if(fit==='frame'&&['top','controller','accessories','cables'].includes(p))delta=[0,0,38];
  if(fit==='brackets'&&(n.includes('side-bracket')||n.startsWith('frame.mount-')||(p==='accessories'&&!n.includes('lightstrip'))))delta=[side*25,0,0];
  if(fit==='top'&&['top','controller','accessories','cables'].includes(p))delta=[0,0,28];
  if(fit==='cables'&&p==='cables')delta=[0,0,-20];
  if(fit==='accessories'&&p==='accessories')delta=[side*24,0,0];
  if(fit==='lightstrip'&&n.includes('lightstrip'))delta=[0,-18,0];
  return delta.map(v=>v*amount);
}
export function posedShape(item,s,product){const shape=structuredClone(item.shape);const part=item.part,name=item.name;let angle=0,pivot=[0,0,0];
  if(product.kind==='chair'){
    if(product.mesh&&['seat','arms','back'].includes(part)){angle=s.recline||0;pivot=[0,-31,129];}
    if(!product.mesh&&['back','pillows'].includes(part)&&!name.includes('recline-cover')&&!name.includes('side-mount')){angle=s.recline||0;pivot=[0,-53,160];}
    if(name.includes('legrest-underplate')||name.includes('legrest-cushion')){angle=s.fold||0;pivot=[0,65,122];}
  }
  const factor=product.kind==='desk'?(s.width||160)/160:1;
  const centered=centerOf(shape);
  const rail=/frame\.rail-(outer|inner)/.test(name);const stretch=part==='top'||rail||name.includes('lightstrip');const stretchFactor=rail?(113*factor-17)/96:factor;
  const point=p=>{let q=[...p];if(factor!==1)q[0]=stretch?q[0]*stretchFactor:q[0]+centered[0]*(factor-1);return angle?rotateX(q,angle,pivot):q;};
  const direction=d=>angle?rotateX(d,angle):d;
  shape.F={...shape.F,o:point(shape.F.o),a:direction(shape.F.a),u:direction(shape.F.u),v:direction(shape.F.v)};
  if(factor!==1&&stretch){if(shape.kind==='prism')shape.poly=shape.poly.map(([u,v])=>[u*stretchFactor,v]);}
  return{shape,point};
}
export function renderPiece(item,s,product,P){const{shape,point}=posedShape(item,s,product);const paths=shape.kind==='prism'?G.prismOf(shape.F,shape.poly,shape.s0,shape.s1,P):G.lathe(shape.poly,shape.F,P,{steps:40});
  let details='';for(const line of item.details||[])details+=k.lineSvg(k.pathOf(line.points.map(p=>k.iso(point(p),P)),line.closed),{tone:'lo'});
  if(item.name==='mechanism.tension-dial'){const a=(35+(s.tensionTurn||0))*Math.PI/180;details+=k.lineSvg(k.segment([Math.sin(a)*8,23+Math.cos(a)*8,112],[Math.sin(a)*8,23+Math.cos(a)*8,118],P),{tone:'hi'});}
  return k.solidSvg(paths,{tone:item.part==='seat'||item.part==='top'?'hi':'mid',inner:details});
}
