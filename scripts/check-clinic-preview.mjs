import {readFile,writeFile} from 'node:fs/promises';
const origin='https://islamnashaat03.github.io/services-themes/';
const results=[];
for(const locale of ['','ar/','en/']){
 const response=await fetch(origin+locale,{signal:AbortSignal.timeout(20000)});
 const html=await response.text();
 if(response.status!==200||!html.includes('data-theme="medical-clinic"'))throw Error('Clinic route unavailable: '+response.status+' '+locale);
 const local=await readFile('docs/'+locale+'index.html','utf8');
 if(html!==local)throw Error('Clinic HTML differs from expected preview');
 const resources=[...html.matchAll(/(?:src|href)="(\/services-themes\/(?:assets|fonts|templates)\/[^"?#]+)"/g)].map(m=>new URL(m[1],origin).href);
 for(const url of new Set(resources)){const r=await fetch(url,{signal:AbortSignal.timeout(20000)});if(r.status!==200)throw Error('Preview asset missing: '+url);}
 results.push({url:response.url,https:true,status:response.status,assets:'passed',htmlMatch:true});
}
await writeFile('.deploy/clinic-preview-check.json',JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results,null,2));
