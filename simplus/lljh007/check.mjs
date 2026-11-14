import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {products,journeyKeys} from './src/content.js';
import * as drawing from './src/drawing.js';
const [[id,p]]=Object.entries(products);
assert.equal(Object.keys(products).length,1);
const html=await readFile(new URL('index.html',import.meta.url),'utf8');
assert(html.includes('data-product="'+id+'"'));
assert(!/__PRODUCT_\w+__/.test(html),'Unresolved template placeholder');
assert(!/<script[^>]+src=|<link[^>]+rel="stylesheet"/.test(html),'External runtime dependency');
for(const [,url] of html.matchAll(/<(?:img|source|video|audio|iframe)\b[^>]*\bsrc="([^"]+)"/g))assert(url.startsWith('data:'),'Non-embedded asset: '+url);
const script=html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
assert(!/\bimport\s/.test(script),'Unbundled module import');
new Function(script);
const svg=drawing.drawing();assert(!/NaN|undefined|Infinity/.test(svg));
for(const journey of journeyKeys){assert(p.journeys[journey]);for(const step of p.journeys[journey].steps)assert(p.parts[step.focus]);}
console.log(p.model+': one product, embedded assets, valid script and complete journeys');
