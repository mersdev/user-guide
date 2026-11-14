import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {product} from './src/content.js';
import {drawing} from './src/drawing.js';
import {meshOf,bestView,triangulate} from './src/viewer.js';
const html=await readFile(new URL('index.html',import.meta.url),'utf8');
assert(html.includes(`data-product="${product.id}"`));
assert(html.includes('<html lang="en">'));
assert(!/__(?:NAME|SUBTITLE|ID|LOGO|STYLE|DRAWING|SCRIPT|ONLINE_MANUAL)__/.test(html),'Unresolved placeholder');
assert(!/<script[^>]+src=|<link[^>]+rel="stylesheet"/.test(html),'Unembedded runtime dependency');
for(const [,src]of html.matchAll(/<img[^>]+src="([^"]+)"/g))assert(src.startsWith('data:'));
assert(html.includes('data:application/pdf;base64,'),'Original manual must work offline');
const script=html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
new Function(script);
assert(!/\bimport\s/.test(script),'Runtime imports must be bundled');
assert.equal(new Set(product.journeys.map(j=>j.id)).size,4);
for(const journey of product.journeys){assert(journey.steps.length>=4);for(const step of journey.steps){assert(product.parts[step.focus],`Missing figure focus: ${step.focus}`);assert(step.source);assert(step.body);}}
const fig=drawing(product);assert(fig.count>=40&&fig.count<=80);assert(!/NaN|Infinity|undefined/.test(fig.svg));for(const part of Object.keys(product.parts))assert(fig.parts.includes(part),`Missing drawn assembly: ${part}`);
assert(!/<a[^>]+href="(?:\.\.\/|\.\/)?(?:maxx-pro|airflex|tivon)\//.test(html),'Cross-product navigation');
console.log(`${product.name}: isolated English page, embedded assets/PDF, valid script, four complete journeys, ${fig.count} named solids`);

// Free rotation uses closed 3D surfaces, including the concave wheelbase.
for(const item of fig.scene){const mesh=meshOf(item.shape);assert(mesh.triangles.length>0,item.name);for(const triangle of mesh.triangles)for(const point of [...triangle.points,...triangle.normals])assert(point.every(Number.isFinite),`Invalid 3D surface: ${item.name}`);if(item.shape.kind==='prism'){const polygon=item.shape.poly,area=indices=>Math.abs(indices.reduce((sum,i,j)=>{const a=polygon[i],b=polygon[indices[(j+1)%indices.length]];return sum+a[0]*b[1]-b[0]*a[1];},0)/2);const expected=area(polygon.map((_,i)=>i)),actual=triangulate(polygon).reduce((sum,t)=>sum+area(t),0);assert(Math.abs(actual-expected)<.001,`Cap lost its concave outline: ${item.name}`);}}
for(const journey of product.journeys)for(const step of journey.steps){const view=bestView(product,step.focus,step,step.viewDetail||0);if(step.view)assert.equal(view.key,step.view,step.title);assert(Number.isFinite(view.azimuth)&&Number.isFinite(view.elevation),step.title);assert(view.elevation>=-85&&view.elevation<=85,step.title);}
assert(bestView(product,product.kind==='desk'?'feet':'base').elevation<0,'Underside fittings need a bottom view');
console.log(`${product.name}: every step has a camera, all 3D surfaces are finite, concave outlines preserve their area`);
