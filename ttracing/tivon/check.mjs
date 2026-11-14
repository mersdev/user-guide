import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {product} from './src/content.js';
import {drawing} from './src/drawing.js';
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
