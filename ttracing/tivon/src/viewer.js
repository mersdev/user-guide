import * as geometry from './model.js';

const add=(a,b)=>a.map((v,i)=>v+b[i]);
const sub=(a,b)=>a.map((v,i)=>v-b[i]);
const mul=(a,n)=>a.map(v=>v*n);
const dot=(a,b)=>a.reduce((sum,v,i)=>sum+v*b[i],0);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=a=>mul(a,1/(Math.hypot(...a)||1));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const world=(F,u,v,s)=>add(F.o,add(mul(F.u,u),add(mul(F.v,v),mul(F.a,s))));

// Ear clipping preserves concave outlines, including the five-spoke wheelbase.
export function triangulate(polygon){
  const area=polygon.reduce((a,p,i)=>{const q=polygon[(i+1)%polygon.length];return a+p[0]*q[1]-q[0]*p[1];},0);
  const order=polygon.map((_,i)=>i);if(area<0)order.reverse();
  const turn=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
  const out=[];let guard=polygon.length*polygon.length;
  while(order.length>3&&guard--){let cut=false;for(let j=0;j<order.length;j++){
    const ia=order[(j+order.length-1)%order.length],ib=order[j],ic=order[(j+1)%order.length],a=polygon[ia],b=polygon[ib],c=polygon[ic];
    if(Math.abs(turn(a,b,c))<1e-9){order.splice(j,1);cut=true;break;}if(turn(a,b,c)<0)continue;
    if(order.some(i=>i!==ia&&i!==ib&&i!==ic&&turn(a,b,polygon[i])>1e-8&&turn(b,c,polygon[i])>1e-8&&turn(c,a,polygon[i])>1e-8))continue;
    out.push([ia,ib,ic]);order.splice(j,1);cut=true;break;
  }if(!cut)throw Error('Cannot triangulate the product outline');}
  if(order.length===3)out.push([...order]);return out;
}

export function meshOf(shape){
  const triangles=[],edges=[];
  const tri=(a,b,c,normals)=>{const n=unit(cross(sub(b,a),sub(c,a)));if(Math.hypot(...cross(sub(b,a),sub(c,a)))<1e-9)return;triangles.push({points:[a,b,c],normals:normals||[n,n,n]});};
  const edge=(a,b)=>{if(Math.hypot(...sub(a,b))>1e-7)edges.push([a,b]);};
  if(shape.kind==='prism'){
    const ring=shape.poly,low=ring.map(([u,v])=>world(shape.F,u,v,shape.s0)),high=ring.map(([u,v])=>world(shape.F,u,v,shape.s1));
    for(const [a,b,c]of triangulate(ring)){tri(high[a],high[b],high[c]);tri(low[c],low[b],low[a]);}
    const signed=ring.reduce((a,p,i)=>a+p[0]*ring[(i+1)%ring.length][1]-ring[(i+1)%ring.length][0]*p[1],0);
    for(let i=0;i<ring.length;i++){const j=(i+1)%ring.length;const face=signed>0?[low[i],low[j],high[j],high[i]]:[low[j],low[i],high[i],high[j]];tri(face[0],face[1],face[2]);tri(face[0],face[2],face[3]);edge(low[i],low[j]);edge(high[i],high[j]);
      const previous=ring[(i+ring.length-1)%ring.length],a=unit([ring[i][0]-previous[0],ring[i][1]-previous[1],0]),b=unit([ring[j][0]-ring[i][0],ring[j][1]-ring[i][1],0]);if(dot(a,b)<.97)edge(low[i],high[i]);}
  }else if(shape.kind==='body'){
    const profile=shape.poly,steps=64;
    const radial=angle=>add(mul(shape.F.u,Math.cos(angle)),mul(shape.F.v,Math.sin(angle)));
    const at=(p,angle)=>add(shape.F.o,add(mul(shape.F.a,p[0]),mul(radial(angle),p[1])));
    for(let i=0;i<profile.length;i++){const a=profile[i],b=profile[(i+1)%profile.length],ds=b[0]-a[0],dr=b[1]-a[1];
      for(let j=0;j<steps;j++){const t=j/steps*Math.PI*2,u=(j+1)/steps*Math.PI*2,p=at(a,t),q=at(a,u),r=at(b,u),s=at(b,t);const n1=unit(sub(mul(radial(t),ds),mul(shape.F.a,dr))),n2=unit(sub(mul(radial(u),ds),mul(shape.F.a,dr)));tri(p,q,r,[n1,n2,n2]);tri(p,r,s,[n1,n2,n1]);if(a[1]>0)edge(p,q);}
    }
  }else throw Error(`Unsupported surface: ${shape.kind}`);
  return{triangles,edges};
}

export function bestView(product,part,step={},detail=0){
  const desk=product.kind==='desk';
  let key=step.view||({base:'caster',lift:'lift',seat:'seat',arms:'arm',back:'back',mechanism:'mechanism',pillows:'pillows',legrest:'legrest',feet:'foot',frame:'frame',top:'desktop',controller:'controller',cables:'cables',accessories:'accessory'})[part];
  const profiles={
    overview:{label:'Whole product',azimuth:55,elevation:25,whole:true},
    caster:{label:`Castor ${detail+1} · underside`,azimuth:55,elevation:-38,wheel:detail+1,span:82,only:['base','lift']},
    lift:{label:'Gas-lift connection · underside',azimuth:25,elevation:-25,parts:['lift','mechanism'],span:142},
    seatTop:{label:'Seat cushion · above',azimuth:55,elevation:40,parts:['seat'],only:['seat','arms','back','pillows']},
    seat:{label:'Seat mounting · underside',azimuth:55,elevation:-45,parts:['seat'],only:['seat','arms','mechanism','back','lift']},
    arm:{label:`${detail?'Left':'Right'} armrest · side`,azimuth:detail?160:20,elevation:step.fit==='arms'?-25:10,side:detail?-1:1,parts:['arms'],only:['arms','seat','back','mechanism']},
    back:{label:'Backrest · front',azimuth:55,elevation:15,parts:['back','pillows'],only:['back','pillows','seat','arms']},
    backJoint:{label:`${detail?'Left':'Right'} backrest joint · side`,azimuth:detail?155:25,elevation:-10,center:[detail?-50:50,-35,159],span:76,only:['back','seat','arms','mechanism','pillows']},
    lever:{label:'Height / tilt lever · underside',azimuth:40,elevation:-35,center:[39,8,122],span:88,only:['mechanism','seat','arms','lift']},
    tension:{label:'Back-pressure knob · underside',azimuth:80,elevation:-65,center:[0,23,115],span:66,only:['mechanism','seat','lift']},
    mechanism:{label:'Tilt mechanism · underside',azimuth:75,elevation:-55,parts:['mechanism'],span:115,only:['mechanism','seat','arms','lift']},
    pillows:{label:'Support pillows · front',azimuth:80,elevation:8,parts:['pillows'],only:['pillows','back']},
    legrestTop:{label:'Legrest cushion · above',azimuth:55,elevation:35,parts:['legrest'],only:['legrest','seat','mechanism','lift']},
    legrestFold:{label:'Cushion folding joint · side',azimuth:25,elevation:12,parts:['legrest'],only:['legrest','seat','mechanism','lift']},
    legrest:{label:'Legrest · folding joint',azimuth:35,elevation:-20,parts:['legrest'],only:['legrest','seat','mechanism','lift']},
    foot:{label:`${detail>=2?'Left':'Right'} ${detail%2?'rear':'front'} leveling foot · underside`,azimuth:detail%2?-60:55,elevation:-45,center:[detail>=2?-113:113,detail%2?-54:54,7],span:43,only:['feet','frame']},
    footBase:{label:`${detail?'Left':'Right'} frame base connection · underside`,azimuth:detail?140:40,elevation:-35,center:[detail?-113:113,0,17],span:115,only:['feet','frame']},
    brackets:{label:`${detail?'Left':'Right'} side bracket · underside`,azimuth:detail?145:35,elevation:-45,center:[detail?-113:113,0,182],span:145,only:['frame','top']},
    deskTop:{label:'Tabletop · above',azimuth:55,elevation:45,parts:['top'],only:['top','frame','accessories','controller']},
    frame:{label:'Rail alignment · top',azimuth:75,elevation:60,center:[0,-3,180],span:118,only:['frame','feet']},
    desktop:{label:'Tabletop mounting · underside',azimuth:55,elevation:-55,parts:['top','frame'],only:['top','frame','controller']},
    controller:{label:'Height controller · front',azimuth:85,elevation:-8,parts:['controller'],only:['controller','top','frame']},
    cables:{label:'Cable organizer · rear close-up',azimuth:-105,elevation:25,parts:['cables'],only:['cables','frame']},
    accessory:{label:detail===1?'Cup holder · underside':detail===2?'Lightstrip attachment · rear':'Headphone hook · underside',azimuth:detail===1?145:detail===2?-90:30,elevation:-25,accessory:detail,only:['accessories','top','frame'],span:detail===2?50:52}
  };
  if(!profiles[key])key=desk?'desktop':'seat';return{...profiles[key],key};
}

function transformed(item,s,product,fit){
  const {shape,point}=geometry.posedShape(item,s,product),type=item.motion;
  if(type==='piston'||type==='rail'){
    const extra=type==='piston'?s.lift:s.extension,top=Math.max(...shape.poly.map(p=>p[0]));shape.poly=shape.poly.map(([a,r])=>[a===top?a+extra:a,r]);
  }
  if(type==='column')shape.s1+=s.lift;
  const offset=geometry.fittingOffset(item,fit,s.fitAmount);
  if(['upper','rail','legrest'].includes(type))offset[2]+=s.lift;
  if(type==='legrest')offset[1]+=s.extension;
  shape.F.o=add(shape.F.o,offset);
  return{shape,point:p=>add(point(p),offset)};
}

export function mountViewer(root,{scene,product,onSelect,onInteract,reduced}){
  const host=document.createElement('div');host.className='part-inspector';host.innerHTML='<canvas class="part-canvas" tabindex="0" role="img" aria-label="Interactive product close-up. Drag or use arrow keys to turn; plus and minus zoom."></canvas><svg class="orbit-fallback" viewBox="0 0 600 450" tabindex="0" role="img" aria-label="Rotatable product close-up"></svg>';
  root.append(host);const canvas=host.querySelector('canvas'),fallback=host.querySelector('svg');
  const controls=document.createElement('div');controls.className='view-controls';controls.innerHTML='<p class="view-caption" id="view-caption"></p><p class="view-hint">Drag up/down or sideways to turn. Arrow keys also turn the view.</p><div class="view-buttons"><button data-camera="best">Best part view</button><button data-camera="whole">Whole product</button><button data-camera="front">Front</button><button data-camera="back">Back</button><button data-camera="top">Top</button><button data-camera="bottom">Bottom</button></div><div class="view-sliders"><label for="view-tilt">Look up / down<output id="view-tilt-output"></output><input id="view-tilt" type="range" min="-85" max="85" value="25" aria-label="Vertical viewing angle"></label><label for="view-zoom">Zoom<output id="view-zoom-output"></output><input id="view-zoom" type="range" min="50" max="400" value="100" aria-label="Close-up zoom"></label></div><div class="detail-views" role="group" aria-label="Inspect individual fittings"></div>';
  root.after(controls);const caption=controls.querySelector('#view-caption');
  let gl=null,program,buffer,locations;
  try{gl=canvas.getContext('webgl2',{antialias:true,alpha:false,preserveDrawingBuffer:true});if(gl){
    const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
    const vertex=`#version 300 es
      in vec3 aPosition;in vec3 aNormal;in float aId;in float aSelected;
      uniform vec3 uCenter;uniform vec3 uRight;uniform vec3 uUp;uniform vec3 uEye;uniform vec2 uSpan;uniform bool uLine;
      out vec3 vNormal;flat out float vId;out float vSelected;
      void main(){vec3 p=aPosition-uCenter;gl_Position=vec4(dot(p,uRight)/uSpan.x,dot(p,uUp)/uSpan.y,-dot(p,uEye)/1000.,1.);if(uLine)gl_Position.z-=.00015;vNormal=aNormal;vId=aId;vSelected=aSelected;}`;
    const fragment=`#version 300 es
      precision highp float;in vec3 vNormal;flat in float vId;in float vSelected;uniform bool uPick;uniform bool uLine;uniform vec3 uLight;out vec4 color;
      void main(){if(uPick){color=vec4(vId/255.,0.,0.,1.);return;}if(uLine){color=vec4(vec3(mix(.40,.16,min(vSelected,1.))),1.);return;}float light=clamp(dot(normalize(vNormal),uLight)*.5+.5,0.,.9999);float tone=floor(light*4.)/3.;float paper=vSelected>1.5?.38+tone*.20:.67+tone*.25+vSelected*.055;color=vec4(vec3(paper),1.);}`;
    program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);locations={};for(const name of['uCenter','uRight','uUp','uEye','uSpan','uLight','uPick','uLine'])locations[name]=gl.getUniformLocation(program,name);for(const[name,size,offset]of[['aPosition',3,0],['aNormal',3,12],['aId',1,24],['aSelected',1,28]]){const p=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(p);gl.vertexAttribPointer(p,size,gl.FLOAT,false,32,offset);}gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);
  }}catch{gl=null;}
  canvas.hidden=!gl;fallback.hidden=!!gl;host.dataset.renderer=gl?'webgl':'svg';
  let meshes=[],lastState='',state={lift:0,extension:0,recline:0,fold:0,width:160,fitAmount:0,tensionTurn:0},selected=Object.keys(product.parts)[0],fit=null,profile=bestView(product,selected),step={},detail=0,zoom=1,visible=true,frame=0,last=0,gesture=null,angleLabel='',activePreset='best';
  let camera={azimuth:55,elevation:25,center:[0,0,130],span:430},goal={...camera,center:[...camera.center]},triCount=0,lineCount=0,drawn=[];
  const sourceCenter=item=>geometry.centerOf(item.shape);
  function inScope(mesh){const item=mesh.item,c=sourceCenter(item);if(profile.whole)return true;if(profile.wheel)return item.name.includes(`caster-${profile.wheel}-`);if(profile.key==='accessory')return profile.accessory===1?item.name.includes('cup-'):profile.accessory===2?item.name.includes('lightstrip'):item.name.includes('headphone-');return(!profile.parts||profile.parts.includes(item.part))&&(!profile.side||Math.sign(c[0])===profile.side);}
  function isShown(mesh){return!profile.only||profile.only.includes(mesh.item.part);}
  function focusBounds(){const scoped=meshes.filter(inScope);const points=scoped.flatMap(m=>m.mesh.triangles.flatMap(t=>t.points));if(!points.length)return;
    let center,span;
    if(profile.wheel){const a=(18+(profile.wheel-1)*72)*Math.PI/180;center=[Math.cos(a)*78,Math.sin(a)*78,fit==='casters'?7:17];span=profile.span;}
    else if(profile.center){center=[...profile.center];if(product.kind==='desk'){if(profile.key!=='foot'&&profile.key!=='footBase')center[2]+=state.lift;if(['foot','footBase','brackets'].includes(profile.key))center[0]*=state.width/160;}else center[2]+=state.lift;span=profile.span;}
    else{const low=[Infinity,Infinity,Infinity],high=[-Infinity,-Infinity,-Infinity];for(const p of points)for(let i=0;i<3;i++){low[i]=Math.min(low[i],p[i]);high[i]=Math.max(high[i],p[i]);}center=low.map((v,i)=>(v+high[i])/2);let radius=0;for(const p of points)radius=Math.max(radius,Math.hypot(...sub(p,center))); span=profile.span||Math.max(36,radius*2.5);}
    if(profile.key==='accessory'&&profile.accessory===2){center=[-140*state.width/160,-83-(fit==='lightstrip'?18*state.fitAmount:0),192+state.lift];span=50;}
    goal.center=center;goal.span=span/zoom;
  }
  function cameraBasis(){const a=camera.azimuth*Math.PI/180,e=camera.elevation*Math.PI/180;return{right:[Math.sin(a),-Math.cos(a),0],up:[-Math.cos(a)*Math.sin(e),-Math.sin(a)*Math.sin(e),Math.cos(e)],eye:[Math.cos(a)*Math.cos(e),Math.sin(a)*Math.cos(e),Math.sin(e)]};}
  function syncControls(){controls.querySelector('#view-tilt').value=String(Math.round(goal.elevation));controls.querySelector('#view-tilt-output').textContent=goal.elevation< -8?'Underneath':goal.elevation>45?'Above':'Side / front';controls.querySelector('#view-zoom').value=String(Math.round(zoom*100));controls.querySelector('#view-zoom-output').textContent=Math.round(zoom*100)+'%';controls.querySelector('.view-hint').textContent=(profile.key==='frame'?'Tabletop hidden to reveal both rail joints. ':profile.key==='cables'?'Tabletop hidden to reveal the wiring area. ':'')+'Drag up/down or sideways to turn. Arrow keys also turn the view.';caption.textContent=angleLabel?profile.label.split(' · ')[0]+' · '+angleLabel:profile.label;for(const b of controls.querySelectorAll('[data-camera]'))b.setAttribute('aria-pressed',String(b.dataset.camera===activePreset));host.dataset.view=profile.key;host.dataset.focusedPart=selected;host.dataset.elevation=String(Math.round(goal.elevation));host.dataset.zoom=String(Math.round(zoom*100));}
  function upload(){drawn=meshes.filter(isShown);if(!gl)return;const solid=[],lines=[];for(const m of drawn){const active=m.item.name.includes('sliding-rail')?2:m.item.part===selected?1:0;for(const t of m.mesh.triangles)for(let i=0;i<3;i++)solid.push(...t.points[i],...t.normals[i],m.index,active);for(const edge of m.mesh.edges)for(const p of edge)lines.push(...p,0,0,1,m.index,active);for(const detail of m.details)for(let i=1;i<detail.length;i++)for(const p of[detail[i-1],detail[i]])lines.push(...p,0,0,1,m.index,active);}triCount=solid.length/8;lineCount=lines.length/8;gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([...solid,...lines]),gl.DYNAMIC_DRAW);}
  function draw(pick=false){if(!visible||document.hidden)return;const box=host.getBoundingClientRect(),width=Math.max(1,box.width),height=Math.max(1,box.height),basis=cameraBasis(),span=camera.span/2,aspect=width/height;
    if(gl){const ratio=Math.min(devicePixelRatio||1,1.5);if(canvas.width!==Math.round(width*ratio)||canvas.height!==Math.round(height*ratio)){canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);}gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(pick?0:245/255,pick?0:245/255,pick?0:245/255,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(program);gl.uniform3fv(locations.uCenter,camera.center);gl.uniform3fv(locations.uRight,basis.right);gl.uniform3fv(locations.uUp,basis.up);gl.uniform3fv(locations.uEye,basis.eye);gl.uniform2f(locations.uSpan,span*aspect,span);gl.uniform3fv(locations.uLight,unit(add(basis.eye,add(mul(basis.up,.65),mul(basis.right,-.4)))));gl.uniform1i(locations.uPick,pick?1:0);gl.uniform1i(locations.uLine,0);gl.drawArrays(gl.TRIANGLES,0,triCount);if(!pick){gl.uniform1i(locations.uLine,1);gl.drawArrays(gl.LINES,triCount,lineCount);}}
    else{const project=p=>[300+dot(sub(p,camera.center),basis.right)/(span*aspect)*300,225-dot(sub(p,camera.center),basis.up)/span*225];const light=unit(add(basis.eye,mul(basis.up,.65)));const faces=[];for(const m of drawn){for(const t of m.mesh.triangles){if(dot(t.normals.reduce((a,n)=>add(a,n),[0,0,0]),basis.eye)<=0)continue;const d=t.points.reduce((a,p)=>a+dot(p,basis.eye)/3,0),tone=.67+Math.floor(clamp(dot(t.normals[0],light)*.5+.5,0,.999)*4)/3*.25+(m.item.part===selected?.055:0),color=Math.round((m.item.name.includes('sliding-rail')?.38+(tone-.67-(m.item.part===selected?.055:0))/.25*.20:tone)*255);faces.push({d,svg:`<path data-object="${m.index}" d="${t.points.map((p,i)=>(i?'L':'M')+project(p).map(v=>v.toFixed(2)).join(' ')).join('')}Z" fill="rgb(${color},${color},${color})"/>`});}for(const line of [...m.mesh.edges,...m.details]){faces.push({d:line.reduce((a,p)=>a+dot(p,basis.eye)/line.length,0)+.1,svg:`<path d="${line.map((p,i)=>(i?'L':'M')+project(p).map(v=>v.toFixed(2)).join(' ')).join('')}" stroke="#555" stroke-width=".7" fill="none"/>`});}}fallback.innerHTML=faces.sort((a,b)=>a.d-b.d).map(f=>f.svg).join('');}
  }
  function tick(now){frame=0;const dt=last?Math.min((now-last)/1000,.05):.016;last=now;let moving=false;const follow=(a,b)=>{if(reduced.matches||Math.abs(a-b)<.01)return b;moving=true;return a+(b-a)*(1-Math.exp(-dt/.16));};camera.azimuth=follow(camera.azimuth,goal.azimuth);camera.elevation=follow(camera.elevation,goal.elevation);camera.span=follow(camera.span,goal.span);camera.center=camera.center.map((v,i)=>follow(v,goal.center[i]));draw();if(moving&&visible&&!document.hidden)frame=requestAnimationFrame(tick);else last=0;}
  function kick(){if(!visible||document.hidden)return;if(reduced.matches){camera={...goal,center:[...goal.center]};draw();return;}if(!frame)frame=requestAnimationFrame(tick);}
  function rebuild(s,context={}){state={...state,...s};fit=context.fit??null;selected=context.selected||selected;const signature=[state.lift,state.extension,state.recline,state.fold,state.width,state.fitAmount,state.tensionTurn,context.chosenWidth,fit,selected].join('/');if(signature===lastState)return;lastState=signature;
    meshes=scene.map((item,index)=>{const posed=transformed(item,state,product,fit),mesh=meshOf(posed.shape),details=(item.details||[]).map(d=>{const points=d.points.map(posed.point);if(d.closed)points.push(points[0]);return points;});if(item.name==='mechanism.tension-dial'){const a=(35+(state.tensionTurn||0))*Math.PI/180;details.push([[Math.sin(a)*8,23+Math.cos(a)*8,112],[Math.sin(a)*8,23+Math.cos(a)*8,118]].map(posed.point));}if(item.marker){const p=posed.point(item.marker.point),width=context.chosenWidth||state.width,number=width===120?'1':width===180?'3':'2';const glyphs={'1':[[0,-2],[0,2]],'2':[[-1,2],[1,2],[1,0],[-1,0],[-1,-2],[1,-2]],'3':[[-1,2],[1,2],[1,0],[-1,0],[1,0],[1,-2],[-1,-2]]};const shape=item.marker.type==='number'?glyphs[number]:[[2,-1],[0,-1],[0,-2],[-2,0],[0,2],[0,1],[2,1]];details.push(shape.map(([x,y])=>add(p,[x,item.marker.type==='number'?-y:y,.1])));}return{item,index:index+1,mesh,details};});upload();focusBounds();syncControls();kick();}
  function details(){const group=controls.querySelector('.detail-views');let labels=[];if(profile.key==='caster')labels=['Castor 1','Castor 2','Castor 3','Castor 4','Castor 5'];if(profile.key==='arm'||profile.key==='backJoint')labels=['Right side','Left side'];if(profile.key==='foot')labels=['Right front','Right rear','Left front','Left rear'];if(['footBase','brackets'].includes(profile.key))labels=['Right side','Left side'];if(profile.key==='accessory')labels=['Headphone hook','Cup holder','Lightstrip'];group.innerHTML=labels.map((name,i)=>`<button data-detail="${i}" aria-pressed="${i===detail}">${name}</button>`).join('');for(const b of group.querySelectorAll('button'))b.onclick=()=>{onInteract();detail=Number(b.dataset.detail);focus(selected,step,false);};}
  function focus(part,nextStep={},resetDetail=true){selected=part;step=nextStep;if(resetDetail)detail=nextStep.viewDetail||0;profile=bestView(product,part,nextStep,detail);zoom=1;angleLabel='';activePreset='best';goal.azimuth=profile.azimuth;goal.elevation=profile.elevation;focusBounds();upload();details();syncControls();if(reduced.matches||!visible)camera={...goal,center:[...goal.center]};kick();}
  function manual(){onInteract();}
  for(const button of controls.querySelectorAll('[data-camera]'))button.onclick=()=>{manual();const name=button.dataset.camera;activePreset=name;angleLabel='';if(name==='best'){focus(selected,step,false);return;}if(name==='whole'){profile=bestView(product,selected,{view:'overview'});zoom=1;goal.azimuth=profile.azimuth;goal.elevation=profile.elevation;focusBounds();upload();details();}const angles={front:[90,10],back:[-90,10],top:[55,85],bottom:[55,-70]};if(angles[name]){angleLabel=name.charAt(0).toUpperCase()+name.slice(1)+' view';goal.azimuth=angles[name][0];goal.elevation=angles[name][1];}syncControls();kick();};
  controls.querySelector('#view-tilt').oninput=e=>{manual();activePreset='';angleLabel='Custom view';goal.elevation=Number(e.target.value);syncControls();kick();};controls.querySelector('#view-zoom').oninput=e=>{manual();zoom=Number(e.target.value)/100;focusBounds();syncControls();kick();};
  const surface=gl?canvas:fallback;
  surface.addEventListener('pointerdown',event=>{if(event.button!==0)return;manual();surface.setPointerCapture(event.pointerId);gesture={x:event.clientX,y:event.clientY,a:goal.azimuth,e:goal.elevation,object:Number(event.target.dataset.object),moved:false};});
  surface.addEventListener('pointermove',event=>{if(!gesture)return;const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;if(Math.hypot(dx,dy)>4)gesture.moved=true;if(!gesture.moved)return;activePreset='';angleLabel='Custom view';goal.azimuth=gesture.a-dx*.5;goal.elevation=clamp(gesture.e+dy*.45,-85,85);syncControls();kick();});
  surface.addEventListener('pointerup',event=>{if(!gesture)return;const click=!gesture.moved,object=gesture.object;gesture=null;if(!click)return;let found;if(gl){const r=canvas.getBoundingClientRect(),pixel=new Uint8Array(4);draw(true);gl.readPixels(Math.floor((event.clientX-r.left)/r.width*canvas.width),Math.floor((r.bottom-event.clientY)/r.height*canvas.height),1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);found=meshes[pixel[0]-1];draw();}else found=meshes[object-1];if(found)onSelect(found.item.part);});
  surface.addEventListener('pointercancel',()=>{gesture=null;});surface.addEventListener('wheel',event=>{event.preventDefault();manual();zoom=clamp(zoom*Math.exp(-event.deltaY*.0015),.5,4);focusBounds();syncControls();kick();},{passive:false});
  surface.addEventListener('keydown',event=>{if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','+','-','=','Home'].includes(event.key))return;event.preventDefault();manual();if(event.key==='Home'){focus(selected,step,false);return;}if(event.key.startsWith('Arrow')){activePreset='';angleLabel='Custom view';}if(event.key==='ArrowLeft')goal.azimuth-=10;if(event.key==='ArrowRight')goal.azimuth+=10;if(event.key==='ArrowUp')goal.elevation=clamp(goal.elevation-10,-85,85);if(event.key==='ArrowDown')goal.elevation=clamp(goal.elevation+10,-85,85);if(['+','='].includes(event.key))zoom=clamp(zoom*1.2,.5,4);if(event.key==='-')zoom=clamp(zoom/1.2,.5,4);focusBounds();syncControls();kick();});
  new ResizeObserver(()=>{focusBounds();kick();}).observe(host);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible&&frame){cancelAnimationFrame(frame);frame=0;last=0;}if(visible)kick();}).observe(host);document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;last=0;}else kick();});
  root.classList.add('has-inspector');rebuild(state,{selected});focus(selected,{view:'overview'});
  return{update:rebuild,focus,destroy(){if(frame)cancelAnimationFrame(frame);host.remove();controls.remove();}};
}
