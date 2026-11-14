// Surface geometry follows the five accessible assemblies in the official exploded diagram.
// No internals or service parts are represented. Each data-piece is a purposeful surface detail.
const path = (name, d, fill, extra = '') => `<path data-piece="${name}" d="${d}" fill="${fill}" ${extra}/>`;
const ellipse = (name, cx, cy, rx, ry, fill, extra = '') => `<ellipse data-piece="${name}" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
const rect = (name, x, y, w, h, r, fill, extra = '') => `<rect data-piece="${name}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
const group = (part, body, attrs = '') => `<g data-part="${part}" ${attrs}>${body}</g>`;
export function drawing() {
  const body = [
    path('handle outer', 'M366 202 C472 198 480 304 427 363 L376 419 L361 391 L407 340 C446 294 444 237 365 239Z', '#c0c4cc'),
    path('handle shade', 'M371 211 C454 211 465 294 419 351 L370 405 L376 419 L427 363 C480 304 472 198 366 202Z', '#c0c4cc'),
    path('handle highlight', 'M374 219 C447 218 454 289 414 339 L370 388 L365 372 L403 329 C433 286 431 242 372 242Z', '#ececec'),
    path('handle inner face', 'M370 242 C424 242 435 282 403 329 L365 372 L361 391 L407 340 C446 294 444 237 365 239Z', '#dddddd'),
    path('glass back wall', 'M174 178 Q273 141 378 180 L354 415 Q274 457 201 413Z', '#e8e8e8', 'opacity=".72"'),
    ellipse('base underside', 278, 417, 77, 23, '#c0c4cc'),
    ellipse('base rim', 278, 412, 78, 23, '#dddddd'),
    `<g class="water">${path('water volume', 'M187 300 Q278 331 365 299 L354 410 Q278 450 202 410Z', '#c0c4cc', 'opacity=".7"')}${ellipse('water surface', 277, 301, 87, 24, '#dddddd')}</g>`,
    path('glass front wall', 'M174 178 Q273 220 378 180 L354 415 Q274 457 201 413Z', 'url(#pitcher-glass)', 'stroke="#c0c4cc" stroke-width="1.3"'),
    path('glass left edge', 'M177 183 L204 412 Q210 420 218 421 L195 192Z', '#ffffff', 'opacity=".6"'),
    path('glass right edge', 'M369 190 L348 414 L354 411 L378 180Z', '#c0c4cc', 'opacity=".75"'),
    path('glass reflection', 'M216 233 L230 400 Q237 407 243 407 L230 239Z', '#ffffff', 'opacity=".4"'),
    path('base front bevel', 'M201 410 Q277 446 355 412 L354 419 Q276 454 202 418Z', '#c0c4cc'),
    ellipse('top glass lip', 276, 180, 102, 31, 'none', 'stroke="#c0c4cc" stroke-width="3"'),
    path('pouring spout', 'M176 171 L143 182 L178 199 L187 184Z', '#ececec', 'stroke="#c0c4cc" stroke-width="1.2"'),
    path('spout inner lip', 'M147 182 L177 179 L184 184 L177 193Z', '#c0c4cc')
  ].join('');
  const reservoir = [
    path('bucket back', 'M185 171 Q279 142 366 174 L338 248 Q280 275 216 247Z', '#dddddd'),
    path('bucket inner wall', 'M194 175 Q278 151 355 176 L333 227 Q280 248 220 226Z', '#ececec'),
    ellipse('filter seat recess', 278, 233, 39, 13, '#969799'),
    ellipse('filter seat lip', 278, 230, 40, 13, 'none', 'stroke="#c0c4cc" stroke-width="4"'),
    path('reservoir front', 'M185 171 Q274 207 366 174 L338 248 Q280 275 216 247Z', '#e8e8e8', 'opacity=".94" stroke="#c0c4cc" stroke-width="1"'),
    ellipse('reservoir rim', 276, 173, 91, 27, 'none', 'stroke="#c0c4cc" stroke-width="3"'),
    ellipse('reservoir lip highlight', 276, 170, 91, 27, 'none', 'stroke="#f5f5f7" stroke-width="2"')
  ].join('');
  const filter = [
    ellipse('filter bottom', 278, 259, 35, 11, '#c0c4cc'),
    path('filter body', 'M240 210 Q277 192 316 210 L312 254 Q278 274 244 254Z', '#dddddd', 'stroke="#c0c4cc" stroke-width="1"'),
    path('filter side shade', 'M299 216 L296 262 Q305 260 312 254 L316 210Z', '#c0c4cc'),
    path('filter body shine', 'M247 215 L251 253 L256 256 L253 217Z', '#f5f5f7'),
    ellipse('filter cap', 278, 209, 39, 14, '#e8e8e8', 'stroke="#c0c4cc" stroke-width="1"'),
    ...Array.from({length: 8}, (_, i) => rect(`filter cap slot ${i+1}`, 247+i*8, 204+Math.abs(i-3.5)*1.3, 3, 8, 1.5, '#969799')),
    path('filter grip rear', 'M268 201 L268 194 Q279 189 288 195 L288 202Z', '#c0c4cc'),
    ellipse('filter grip top', 278, 194, 10, 4, '#ececec'),
    path('filter lower seal', 'M244 248 Q278 265 312 248 L312 254 Q278 271 244 254Z', '#969799')
  ].join('');
  const lid = [
    path('lid sidewall', 'M174 146 Q275 182 377 148 L375 158 Q276 194 174 156 L144 145 L145 138Z', '#c0c4cc'),
    path('lid top', 'M145 138 L176 125 Q274 96 373 131 Q393 142 374 151 Q274 187 175 148Z', '#dddddd', 'stroke="#969799" stroke-width="1.3"'),
    path('lid front bevel', 'M145 138 L175 148 Q274 187 374 151 L375 155 Q274 192 174 153Z', '#c0c4cc'),
    ellipse('filling recess', 324, 139, 34, 12, '#c0c4cc', 'stroke="#c0c4cc" stroke-width="1.2"'),
    ellipse('filling flap', 324, 136, 31, 10, '#e8e8e8'),
    path('flap bevel', 'M293 137 Q326 151 355 136 L355 140 Q325 155 293 141Z', '#c0c4cc'),
    path('lid edge reflection', 'M180 126 Q273 101 364 130 Q273 109 183 130Z', '#f5f5f7')
  ].join('');
  const indicator = [
    path('indicator bezel', 'M213 125 L263 130 L259 146 L209 140Z', '#969799', 'stroke="#969799" stroke-width="1"'),
    path('indicator window', 'M218 128 L257 132 L254 142 L215 138Z', '#dddddd'),
    ...[0,1,2,3].map(i=>path(`indicator bar ${i+1}`,`M${220+i*8} 130 L${225+i*8} 131 L${223+i*8} 139 L${218+i*8} 138Z`, '#666666', `class="life-bar" data-bar="${i}"`)),
    ellipse('activation dot', 251, 139, 1.5, 1, '#666666', 'class="indicator-dot"'),
    path('START button', 'M210 144 L251 149 L249 154 L208 149Z', '#969799')
  ].join('');
  return `<svg viewBox="0 0 600 500" role="img" aria-label="LVSH001 pitcher with removable lid, reservoir, filter and four-bar indicator" class="product-drawing pitcher-drawing"><defs><linearGradient id="pitcher-glass" x1="0" x2="1"><stop stop-color="#ececec" stop-opacity=".8"/><stop offset=".4" stop-color="#fafafa" stop-opacity=".42"/><stop offset="1" stop-color="#dddddd" stop-opacity=".75"/></linearGradient><filter id="pitcher-shadow"><feGaussianBlur stdDeviation="8"/></filter></defs><ellipse cx="291" cy="442" rx="128" ry="16" fill="#c0c4cc" opacity=".2" filter="url(#pitcher-shadow)"/>${group('body',body)}${group('reservoir',reservoir)}${group('filter',filter,'class="filter-assembly"')}${group('lid',lid,'class="lid-assembly"')}${group('indicator',indicator,'class="indicator-assembly"')}</svg>`;
}
export function mount(root, initial) {
  let state = { lid: 0, filter: 0, water: 0, bars: 4, active: false, ...initial };
  return {
    render(next) {
      state = {...state, ...next};
      root.querySelector('.lid-assembly').setAttribute('transform', `translate(0 ${27-state.lid*100})`);
      root.querySelector('.indicator-assembly').setAttribute('transform', `translate(0 ${27-state.lid*100})`);
      root.querySelector('.filter-assembly').setAttribute('transform', `translate(0 ${-state.filter*68})`);
      root.querySelector('.water').setAttribute('opacity', state.water);
      root.querySelectorAll('.life-bar').forEach((bar,i) => bar.setAttribute('opacity', i < state.bars ? 1 : .12));
      root.querySelector('.indicator-dot').setAttribute('opacity', state.active ? (state.dot??1) : .2);
    },
    destroy() {}
  };
}

// Product-specific practice behavior; shared navigation and completion live in app.js.
export const initial = {lid:0,filter:0,water:0,bars:4,active:false,dot:1};
export function pose(name,state) {return {...state,lid:['open','filter','seat'].includes(name)?1:0,filter:name==='filter'?1:0,water:name==='fill'?1:0};}
export function controls(c) {
  const {root,target,step,mode,selected,icon}=c;
  const action=mode==='guide'?step.action:selected==='indicator'?'Practise 3-second activation':selected==='filter'?(target.filter>.5?'Seat the filter':'Remove the filter'):'Lift the lid';
  root.innerHTML=`<button class="practice-button" id="practice-action">${icon('play')}${action}</button><button class="practice-button" id="filter-toggle">${target.filter>.5?'Seat filter':'Remove filter'}</button><p class="preview-status" id="preview-status"></p>`;
  root.querySelector('#practice-action').onclick=()=>practice(c);
  root.querySelector('#filter-toggle').onclick=()=>{target.lid=1;target.filter=target.filter>.5?0:1;c.refreshControls();c.run();};
}
function practice(c) {
  const {target,visual,step,mode,selected}=c;
  if(mode==='explore'){
    if(selected==='indicator'){c.simulate('activation');return;}
    if(selected==='filter'){target.lid=1;target.filter=target.filter>.5?0:1;}
    else {target.lid=target.lid>.5?0:1;if(!target.lid)target.filter=0;}
    c.refreshControls();c.run();return;
  }
  if(step.pose==='indicator'){c.simulate('activation');return;}
  if(step.pose==='fill'){target.lid=0;target.filter=0;visual.water=0;target.water=0;c.simulate('water');return;}
  if(step.pose==='seat'){target.lid=1;visual.filter=1;target.filter=0;c.renderVisual();c.run();return;}
  c.repose(step.pose,true);
}
export function begin(type,c) {
  if(type==='activation'){c.target.active=false;c.target.bars=0;c.refreshControls();}
  if(c.reduced){
    if(type==='activation'){c.target.active=true;c.target.bars=4;c.refreshControls();c.status('Static preview: after about 3 seconds on START, the dot flashes and four bars show. Your real indicator is unchanged.');}
    else{c.target.water=1;c.status('Static filtration illustration. Wait for your real reservoir to finish; no drinking readiness is confirmed.');}
    return false;
  }
  c.status(type==='activation'?'Initial activation practice · 0 of 3 seconds.':'Illustrating filtration · no real duration is implied.');return true;
}
export function advance(type,elapsed,c) {
  if(type==='water'){
    c.target.water=Math.min(1,elapsed/3);
    if(elapsed>=3){c.status('Illustration finished. It does not verify filtration or drinking readiness.');return false;}
  }else{
    c.status(elapsed<3?`Initial activation practice · ${Math.floor(elapsed)} of 3 seconds.`:'3-second practice finished · four bars and the activation dot are shown. This has not activated your real indicator.');
    if(elapsed>=3){c.target.active=true;c.target.bars=4;c.target.dot=.25+.75*(.5+.5*Math.cos((elapsed-3)*Math.PI*5));}
    if(elapsed>=4.2){c.target.dot=1;c.announce('Activation practice finished. Confirm your real indicator separately.');return false;}
  }
  return true;
}

export function goal(prop,target,visual) {return prop==='filter'&&target.filter>0&&visual.lid<.98?0:prop==='lid'&&target.lid===0&&visual.filter>.01?1:target[prop];}
