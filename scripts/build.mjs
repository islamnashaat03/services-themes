import {build} from 'vite';
import {cp,mkdir,readFile,writeFile,readdir,stat} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';

await build({build:{outDir:'.build/client',emptyOutDir:true}});
await build({build:{ssr:'src/entry-server.tsx',outDir:'.build/server',emptyOutDir:true}});
const {themeIds,themeData,render}=await import(pathToFileURL(path.resolve('.build/server/entry-server.js')));
const client=path.resolve('.build/client');
const manifest=JSON.parse(await readFile(path.join(client,'.vite/manifest.json'),'utf8'));
const entry=Object.values(manifest).find(m=>m.isEntry);
const css=[...new Set(Object.values(manifest).flatMap(m=>m.css||[]))];
const origins=JSON.parse(await readFile('theme-origins.json','utf8'));
const esc=x=>String(x).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
function fields(value,prefix=''){
 return Object.entries(value).flatMap(([key,v])=>{
  const pointer=`${prefix}/${key}`;
  if(typeof v==='string')return [{path:pointer,type:/\.(webp|png|jpe?g)$/i.test(v)?'image':'text',default:v}];
  if(v&&typeof v==='object')return fields(v,pointer);
  return [];
 });
}
for(const id of themeIds){
 const data=themeData(id),destination=path.resolve('dist',id);
 await mkdir(destination,{recursive:true});
 await cp(path.join(client,'assets'),path.join(destination,'assets'),{recursive:true});
 await cp(path.join(client,'fonts'),path.join(destination,'fonts'),{recursive:true});
 await cp(path.join(client,'templates/media',id),path.join(destination,'templates/media',id),{recursive:true});
 await mkdir(path.join(destination,'theme-content'),{recursive:true});
 const siteManifest={schemaVersion:1,templateId:id,templateVersion:data.version,defaultLocale:'ar',locales:['ar','en'],kind:'showcase',name:data.name,industry:data.industry,capabilities:data.capabilities,futureModules:id==='medical-clinic'?['booking','payments']:[],palette:data.palette,contentFiles:{ar:'theme-content/ar.json',en:'theme-content/en.json'},editableFields:fields(data.content.ar),sections:[],attribution:{type:'authored-demo',clientProject:false,author:'Islam Nashaat'},mawqi:{status:'adapter-required',installed:false},liveOrigin:origins[id]||null};
 for(const locale of ['ar','en']){
  const markup=render(id,locale);
  if(locale==='ar')siteManifest.sections=[...markup.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map(m=>({id:m[1],enabled:true}));
  const title=data.name[locale],description=locale==='ar'?`${data.industry.ar} — تصميم استعراضي عربي يدعم الإنجليزية، قابل للتخصيص.`:`${data.industry.en} — a bilingual showcase website ready for customization.`;
  const origin=origins[id];
  const meta=origin?`<link rel="canonical" href="${esc(origin)}/${locale}/"/><link rel="alternate" hreflang="ar" href="${esc(origin)}/ar/"/><link rel="alternate" hreflang="en" href="${esc(origin)}/en/"/><link rel="alternate" hreflang="x-default" href="${esc(origin)}/"/>`:'';
  const html=`<!doctype html><html lang="${locale}" dir="${locale==='ar'?'rtl':'ltr'}" data-theme="${id}"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="${data.palette.primary}"/><title>${esc(title)}</title><meta name="description" content="${esc(description)}"/><meta name="robots" content="noindex,follow"/>${meta}<link rel="stylesheet" href="/fonts/${data.fontSheet}"/>${css.map(file=>`<link rel="stylesheet" href="/${file}"/>`).join('')}</head><body><div id="root" data-prerendered="true">${markup}</div><script type="module" src="/${entry.file}"></script></body></html>`;
  await mkdir(path.join(destination,locale),{recursive:true});await writeFile(path.join(destination,locale,'index.html'),html);
  if(locale==='ar')await writeFile(path.join(destination,'index.html'),html);
  await writeFile(path.join(destination,'theme-content',`${locale}.json`),JSON.stringify(data.content[locale],null,2)+'\n');
 }
 await writeFile(path.join(destination,'theme-manifest.json'),JSON.stringify(siteManifest,null,2)+'\n');
 await writeFile(path.join(destination,'robots.txt'),'User-agent: *\nDisallow: /\n');
 console.log(`Exported ${id}: Arabic root + /ar/ + /en/, content JSON and versioned manifest.`);
}
await writeFile('dist/catalogue.json',JSON.stringify(themeIds.map(id=>{const d=themeData(id);return{id,name:d.name,industry:d.industry,defaultLocale:'ar',locales:['ar','en'],url:origins[id]||null,version:d.version,type:'showcase'};}),null,2)+'\n');
