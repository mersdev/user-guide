import {readFile,writeFile} from 'node:fs/promises';
import {product} from './src/content.js';
import * as k from './src/vendor/iso-kit.mjs';
import {drawing} from './src/drawing.js';
const here=new URL('.',import.meta.url);
const read=(name,encoding='utf8')=>readFile(new URL(name,here),encoding);
const data=async(name,type)=>`data:${type};base64,${(await read(name,null)).toString('base64')}`;
const fonts=await Promise.all([['Poppins',700,'poppins-700'],['Outfit',400,'outfit-400'],['Outfit',600,'outfit-600']].map(async([name,weight,file])=>`@font-face{font-family:${name};font-weight:${weight};font-style:normal;font-display:swap;src:url('${await data(`src/assets/${file}.woff2`,'font/woff2')}') format('woff2')}`));
const figure=drawing(product,{audit:process.argv.includes('--audit')});
const css=fonts.join('\n')+'\n'+await read('src/vendor/iso.css')+'\n'+await read('src/styles.css');
const P=figure.P,origin=kiso([0,0,0]),vz=kiso([0,0,1]),vy=kiso([0,1,0]);
function kiso(p){return k.iso(p,P);}
const vx=kiso([1,0,0]);
const vectors={x:[vx[0]-origin[0],vx[1]-origin[1]],z:[vz[0]-origin[0],vz[1]-origin[1]],y:[vy[0]-origin[0],vy[1]-origin[1]]};
function bundle(text,prelude=''){const names=[...text.matchAll(/export\s+(?:const|function)\s+(\w+)/g)].map(m=>m[1]);return '(()=>{'+prelude+text.replace(/^import[^\n]+\n/gm,'').replace(/^export /gm,'')+'\nreturn {'+names.join(',')+'};})()';}
const kit=bundle(await read('src/vendor/iso-kit.mjs'));
const lathe=bundle(await read('src/vendor/lathe.mjs'),'const {cameraOf,iso,pathOf}=k;');
const model=bundle(await read('src/model.js'));
const libraries='const k='+kit+';const G='+lathe+';const figureModel='+model+';';
const orders={fits:{},recline:{},fold:{},width:{}};
for(const fit of new Set(product.journeys[0].steps.map(s=>s.fit).filter(Boolean)))orders.fits[fit]=drawing(product,{fit}).scene.map(i=>({id:i.id,key:i.key,move:i.move}));
if(product.kind==='chair'){const max=product.mesh?31:65;for(let angle=0;angle<=max;angle+=4)orders.recline[angle]=drawing(product,{recline:angle}).scene.map(i=>i.id);orders.recline[max]=drawing(product,{recline:max}).scene.map(i=>i.id);if(product.parts.legrest)for(const fold of[0,15,30,45,60,75,90])orders.fold[fold]=drawing(product,{fold}).scene.map(i=>i.id);}
else for(const width of[120,140,160,180])orders.width[width]=drawing(product,{width}).scene.map(i=>i.id);
const script=(libraries+`const orders=${JSON.stringify(orders)};const projection=${JSON.stringify(P)};const scene=${JSON.stringify(figure.scene)};const product=${JSON.stringify(product)};const vectors=${JSON.stringify(vectors)};const pdfData=${JSON.stringify(await data('references/original-manual.pdf','application/pdf'))};\n${await read('src/app.js')}`).replace(/<\/script/gi,'<\\/script');
const html=(await read('src/template.html')).replaceAll('__NAME__',product.name).replaceAll('__SUBTITLE__',product.subtitle).replaceAll('__ID__',product.id).replace('__LOGO__',await data('src/assets/logo.png','image/png')).replace('__STYLE__',css).replace('__DRAWING__',figure.svg).replace('__SCRIPT__',()=>script).replace('__ONLINE_MANUAL__',product.manual);
await writeFile(new URL('index.html',here),html);
await writeFile(new URL('references/PARTS.md',here),'# Figure parts\n\nIllustration solids, not a packing count. Concept: '+(product.kind==='desk'?'A two-column desk whose tabletop moves with its height controller.':'A five-castor chair whose seat moves with its lift'+(product.parts.legrest?' and whose legrest slides along its support rods.':'.'))+'\n\n'+`Total: ${figure.count} purposeful solids.\n\n`+Object.entries(product.parts).map(([id,p])=>`## ${p[0]}\n\n`+figure.names.filter(i=>i.part===id).map(i=>`- ${i.name}`).join('\n')).join('\n\n')+'\n\nGeometry and shading are built with the vendored Anatomy kit. See `src/drawing.js` for named solids, their mount positions and recorded audit shapes.\n');
console.log(`${product.name}: built independent index.html; ${figure.count} solids`);
