import{writeFileSync}from'node:fs';
import{product}from'./src/content.js';
import{drawing}from'./src/drawing.js';
 const fits=[...new Set(product.journeys[0].steps.map(s=>s.fit).filter(Boolean))];
 const scenarios=[{},...fits.map(fit=>({fit})),{lift:product.kind==='desk'?50:35}];
 if(product.kind==='chair')for(const recline of product.mesh?[10,20,31]:[20,45,65])scenarios.push({recline});
 if(product.parts.legrest)scenarios.push({extension:55},{lift:35,extension:55},{fold:45},{fold:90});
 if(product.kind==='desk')for(const width of[120,140,180])scenarios.push({width});
 const log=console.log;let report=[],failed=[];console.log=(...args)=>report.push(args.join(' '));
 for(const scenario of scenarios){report.push('\nSCENARIO '+JSON.stringify(scenario));const start=report.length;drawing(product,{...scenario,audit:true});if(report.slice(start).some(s=>s.includes('audit failed')))failed.push(scenario);}
 console.log=log;writeFileSync(new URL('references/GEOMETRY-AUDIT.txt',import.meta.url),report.join('\n')+'\n');log(JSON.stringify({product:product.id,scenarios:scenarios.length,failed}));
