import { products, journeyKeys, drawings } from './product.js';

const $ = selector => document.querySelector(selector);
const icons = {
  cooker: '<ellipse cx="12" cy="9" rx="10" ry="5"/><path d="M2 9v6c0 7 20 7 20 0V9"/><circle cx="12" cy="17" r="2"/>',
  blender: '<path d="M6 3h12l-2 11H8L6 3Zm2 11-2 7h12l-2-7M9 1h6m3 4h3v6h-4"/><circle cx="12" cy="18" r="1"/>',
  grill: '<path d="M2 7h20v12H2zM3 10h18M12 7v3M5 4h4m6 0h4"/><circle cx="8" cy="15" r="2"/><circle cx="16" cy="15" r="2"/>',
  pitcher: '<path d="M6 6h12l-2 15H8L6 6Zm0 0L3 4h15v2m0 2h2a4 4 0 0 1-3 8M9 2h6"/>',
  oven: '<rect x="2" y="5" width="20" height="15" rx="2"/><path d="M17 5v15M5 9h9v8H5zM8 7h3M5 20v2m14-2v2"/><circle cx="19.5" cy="10" r=".8"/><circle cx="19.5" cy="15" r=".8"/>',
  first: '<path d="M12 3v5m0 8v5M3 12h5m8 0h5M5.6 5.6l3.5 3.5m5.8 5.8 3.5 3.5m0-12.8-3.5 3.5m-5.8 5.8-3.5 3.5"/>',
  everyday: '<path d="M5 6h14v14H5zM8 3v6m8-6v6M5 11h14m-10 4h2m3 0h2"/>',
  care: '<path d="m13 3-4 8 4 2 4-8-4-2ZM9 11l-6 7 5 3 5-8m-7 5 3-5m9-3 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1 .6-1.5 1-1.5 3m0 3h.01"/>',
  replay: '<path d="M4 9a8 8 0 1 1 1 9M4 3v6h6"/>',
  next: '<path d="m9 5 7 7-7 7M4 12h12"/>',
  back: '<path d="m15 5-7 7 7 7m5-7H8"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  play: '<path d="m9 5 10 7-10 7V5Z"/>',
  safety: '<path d="m12 3 10 18H2L12 3Zm0 6v5m0 3h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.info}</svg>`;
const productId=document.body.dataset.product;
const key = 'simplus-manual-v1';
let saved = {}, persistent = true;
try { saved = JSON.parse(localStorage.getItem(key) || '{}') || {}; if(typeof saved !== 'object'||Array.isArray(saved)) saved={}; localStorage.setItem(`${key}-probe`,'1');localStorage.removeItem(`${key}-probe`); } catch { saved={};persistent=false; }
const records = Object.fromEntries(Object.keys(products).map(id=>{
  const s=saved[id] || {}, journey=journeyKeys.includes(s.journey)?s.journey:'first';
  return [id,{journey,step:0,mode:s.mode==='explore'?'explore':'guide',done:Array.isArray(s.done)?s.done.filter(x=>typeof x==='string'):[]}];
}));
let selected=Object.keys(products[productId].parts)[0], model, animationFrame=0, visible=true, last=0, elapsed=0, simulation=null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const drawingModule=()=>drawings[productId];
const base=()=>({...drawingModule().initial});
let visual=base(), target=base();
const current=()=>records[productId];
const product=()=>products[productId];
const currentStep=()=>product().journeys[current().journey].steps[current().step];
const doneKey=()=>`${current().journey}/${currentStep().id}`;
const announce = text => {$('#announcement').textContent=text;};
function save() {
  if(persistent) try{localStorage.setItem(key,JSON.stringify({...JSON.parse(localStorage.getItem(key)||'{}'),[productId]:{...current(),step:undefined}}));}catch{persistent=false;}
}
function url() {
  const s=current();
  return new URLSearchParams({task:s.journey,mode:s.mode}).toString();
}
function writeRoute() {history.replaceState(null,'',`#${url()}`);save();}
function readRoute() {
  const params=new URLSearchParams(location.hash.slice(1));
  const s=current();
  s.step=0;
  if(journeyKeys.includes(params.get('task'))) s.journey=params.get('task');
  if(params.get('mode'))s.mode=params.get('mode')==='explore'?'explore':'guide';
}
function highlight() {$('#drawing').querySelectorAll('[data-part]').forEach(el=>el.classList.toggle('selected',el.dataset.part===selected));}
function focusPart(part) {
  const restoreFocus=document.activeElement?.matches('[data-select-part]');
  selected=part;drawingModule().select?.(part,target);run();current().mode='explore';renderInstruction();renderModes();renderControls();highlight();writeRoute();if(restoreFocus)document.querySelector(`[data-select-part="${part}"]`)?.focus({preventScroll:true});announce(product().parts[part].join('. '));
}
function pose(p, reset=false) {
  simulation=null;elapsed=0;
  Object.assign(target,drawingModule().pose(p,{...base(),...target},selected));
  if(reset){Object.assign(visual,base());model.render(visual);}
  run();
}
function pause() {if(animationFrame)cancelAnimationFrame(animationFrame);animationFrame=0;last=0;}
function run(){if(!animationFrame && visible && !document.hidden)animationFrame=requestAnimationFrame(tick);}
function tick(now) {
  animationFrame=0;
  const dt=last?Math.min((now-last)/1000,.05):0;last=now;
  let moving=false;
  if(simulation && (!drawingModule().armed || drawingModule().armed(simulation,visual))){
    elapsed+=dt;
    if(!drawingModule().advance(simulation,elapsed,controlContext()))simulation=null;
  }
  for(const prop of Object.keys(target)){
    if(typeof target[prop]!=='number'){visual[prop]=target[prop];continue;}
    const goal=drawingModule().goal?.(prop,target,visual)??target[prop];
    const distance=goal-visual[prop];
    visual[prop]=reduced.matches||Math.abs(distance)<.001?goal:visual[prop]+distance*(1-Math.exp(-dt/.22));
    if(Math.abs(target[prop]-visual[prop])>.001)moving=true;
  }
  model?.render(visual);
  if((moving||simulation)&&visible&&!document.hidden)animationFrame=requestAnimationFrame(tick);else last=0;
}
function status(text){const el=$('#preview-status');if(el&&el.textContent!==text)el.textContent=text;}
function renderModes(){document.querySelectorAll('[data-mode]').forEach(button=>button.setAttribute('aria-pressed',button.dataset.mode===current().mode));}
function controlContext(){return {root:$('#drawing-controls'),target,visual,step:currentStep(),mode:current().mode,selected,icon,reduced:reduced.matches,status,announce,run,refreshControls:renderControls,simulate:startSimulation,stopSimulation:()=>{simulation=null;},repose:pose,renderVisual:()=>model.render(visual)};}
function renderControls(){
  drawingModule().controls(controlContext());
  if(reduced.matches)$('#drawing-controls').insertAdjacentHTML('beforeend','<p class="static-notice">Reduced motion: actions show still poses; timed previews are shown as a static explanation.</p>');
}
function startSimulation(type){
  elapsed=0;
  simulation=drawingModule().begin(type,controlContext())?type:null;
  run();
}
function renderInstruction(){
  const s=current(),p=product(),step=currentStep(),journey=p.journeys[s.journey],done=s.done.includes(doneKey());
  const links=`<div class="instruction-links"><button class="text-button open-safety">Safety notes</button><a href="${p.manual}" target="_blank" rel="noopener">Original manual ↗</a>${s.journey==='help'?'<a href="mailto:service@simplus.online">Email Simplus ↗</a>':''}</div>`;
  if(s.mode==='explore'){
    const part=p.parts[selected];
    $('#instruction').innerHTML=`<div class="step-meta"><strong>Explore your product</strong><span>${p.model}</span></div><h2 id="instruction-title">${part[0]}</h2><p class="body-copy">${part[1]}</p><div class="part-list" role="group" aria-label="Select a product part">${Object.entries(p.parts).map(([id,part])=>`<button class="part-button" data-select-part="${id}" aria-pressed="${id===selected}">${part[0]}</button>`).join('')}</div><div class="callout note">${icon('info')}<div>Select a part in the drawing or use the buttons above. Practise its movement with the controls under the drawing.</div></div><div class="explore-actions"><button class="secondary-button" id="resume-guide">Continue ${journey.title.toLowerCase()} </button></div>${links}`;
    $('#resume-guide').onclick=()=>{s.mode='guide';render(false);announce('Guided instructions. '+step.title);};
    document.querySelectorAll('[data-select-part]').forEach(button=>button.onclick=()=>focusPart(button.dataset.selectPart));
  }else{
    const allDone=journey.steps.every(st=>s.done.includes(`${s.journey}/${st.id}`));
    $('#instruction').innerHTML=`<div class="step-meta"><strong>${journey.title}</strong><span>Step ${s.step+1} of ${journey.steps.length}</span></div><div class="progress-track" aria-label="Journey steps">${journey.steps.map((st,i)=>`<button class="${i===s.step?'current ':''}${s.done.includes(`${s.journey}/${st.id}`)?'done':''}" data-goto="${i}" ${i===s.step?'aria-current="step"':''} aria-label="Step ${i+1}: ${st.title}${s.done.includes(`${s.journey}/${st.id}`)?', confirmed':''}"></button>`).join('')}</div><h2 id="instruction-title">${step.title}</h2><p class="body-copy">${step.body}</p>${step.safety?`<div class="callout safety">${icon('safety')}<div><strong>Keep in mind</strong>${step.safety}</div></div>`:''}${step.note?`<div class="callout note">${icon('info')}<div>${step.note}</div></div>`:''}${allDone?`<p class="completion-message"><strong>${journey.title} complete.</strong> ${p.confirmationNotice}</p>`:''}<div class="confirmation"><div class="step-actions"><button class="back-button" id="back" ${s.step===0?'disabled':''}>${icon('back')}Back</button>${allDone?`<button class="done-button" id="restart-guide" aria-label="Reset ${journey.title.toLowerCase()} guide">${icon('replay')}Reset guide</button>`:`<button class="done-button" id="done" data-confirmed="${done}">${icon('check')}I have done this</button>`}</div>${allDone?'':`<p>${done?'You have confirmed this step.':'Confirm this step to continue to the next one.'}</p>`}</div><div class="step-navigation"><button id="replay-inline">${icon('replay')}Replay</button></div>${links}`;
    if(allDone)$('#restart-guide').onclick=()=>{s.done=s.done.filter(key=>!key.startsWith(s.journey+'/'));s.step=0;s.mode='guide';render(false);$('#instruction').focus({preventScroll:true});announce(journey.title+' guide reset. '+currentStep().title);};
    else $('#done').onclick=()=>{const k=doneKey();if(!s.done.includes(k))s.done.push(k);save();if(s.step<journey.steps.length-1)navigateStep(s.step+1);else{const pending=journey.steps.findIndex(st=>!s.done.includes(s.journey+'/'+st.id));if(pending>=0)navigateStep(pending);else{renderInstruction();$('#instruction').focus({preventScroll:true});announce('Journey completed. You can reset this guide. '+p.confirmationNotice);}}};
    $('#back').onclick=()=>navigateStep(s.step-1);
    $('#replay-inline').onclick=replay;
    document.querySelectorAll('[data-goto]').forEach(button=>button.onclick=()=>navigateStep(Number(button.dataset.goto)));
  }
  document.querySelectorAll('.open-safety').forEach(button=>button.onclick=openSafety);
}
function navigateStep(index){current().step=index;render(false);$('#instruction').focus({preventScroll:true});if(matchMedia('(max-width:730px)').matches)$('.workbench').scrollIntoView({block:'start',behavior:reduced.matches?'auto':'smooth'});announce(currentStep().title);}
function replay(){pose(current().mode==='guide'?currentStep().pose:'closed',true);renderControls();announce('Replaying the illustration.');}
function render(remount=true){
  const active=document.activeElement;const focusSelector=active?.dataset.journey?`[data-journey="${active.dataset.journey}"]`:null;
  pause();
  const p=product(),s=current(),step=currentStep();selected=step.focus;
  $('#product-name').textContent=p.name;$('#model').textContent=p.model;
  document.title=`${p.model} ${p.name} · Simplus guide`;
  $('#journeys').innerHTML=journeyKeys.map(id=>`<button class="journey-button" data-journey="${id}" aria-current="${id===s.journey}">${icon(id)}${p.journeys[id].title}</button>`).join('');
  document.querySelectorAll('[data-journey]').forEach(button=>button.onclick=()=>{s.journey=button.dataset.journey;s.step=0;s.mode='guide';render(false);announce(p.journeys[s.journey].title+'. '+currentStep().title);});
  if(remount){model?.destroy();$('#drawing').innerHTML=drawingModule().drawing();model=drawingModule().mount($('#drawing'));visual=base();}
  $('#figure-title').textContent=p.model+' / '+p.name;$('#figure-number').textContent='Fig. '+p.figure;
  $('#safety-manual').href=p.manual;
  pose(s.mode==='guide'?step.pose:'closed');
  renderModes();renderInstruction();renderControls();highlight();writeRoute();if(focusSelector)document.querySelector(focusSelector)?.focus({preventScroll:true});
}
function openSafety(){const p=product();$('#safety-product').textContent=`${p.name} · ${p.model}`;$('#safety-list').innerHTML=p.safety.map(text=>`<li>${text}</li>`).join('');$('#safety-dialog').showModal();}
$('#drawing').onclick=e=>{const group=e.target.closest('[data-part]');if(group)focusPart(group.dataset.part);};
document.querySelectorAll('[data-mode]').forEach(button=>button.onclick=()=>{current().mode=button.dataset.mode;render(false);announce(current().mode==='guide'?'Guided instructions.':'Explore your product. Select a part.');});
$('#replay').innerHTML=icon('replay');$('#replay').onclick=replay;
$('#safety-close').onclick=()=>$('#safety-dialog').close();
$('#safety-dialog').onclick=e=>{if(e.target===$('#safety-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}};
window.addEventListener('hashchange',()=>{readRoute();target=base();render();});
new IntersectionObserver(entries=>{visible=entries.at(-1).isIntersecting;if(visible)run();else pause();},{threshold:.05}).observe($('#drawing'));
document.addEventListener('visibilitychange',()=>document.hidden?pause():run());
reduced.addEventListener('change',()=>{simulation=null;if('running' in target)target.running=false;renderControls();run();});
readRoute();render();
