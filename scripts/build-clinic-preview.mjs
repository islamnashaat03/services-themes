import {cp,readFile,writeFile} from 'node:fs/promises';
process.env.THEME_BASE_PATH='/services-themes/';
process.env.THEME_ORIGIN='https://islamnashaat03.github.io/services-themes';
process.env.THEME_OUTPUT_DIR='.deploy/preview-export';
await import('./build.mjs');
await cp('.deploy/preview-export/medical-clinic','docs',{recursive:true});
await writeFile('docs/.nojekyll','');
const manifest=JSON.parse(await readFile('docs/theme-manifest.json','utf8'));
manifest.liveOrigin=process.env.THEME_ORIGIN;
await writeFile('docs/theme-manifest.json',JSON.stringify(manifest,null,2)+'\n');
for(const locale of ['ar','en']){
 const html=await readFile(`docs/${locale}/index.html`,'utf8');
 if(!html.includes(`href="/services-themes/${locale==='ar'?'en':'ar'}/"`)||!html.includes('src="/services-themes/templates/media/medical-clinic/'))throw Error('Missing preview base paths');
 const resources=[...html.matchAll(/(?:src|href)="(\/services-themes\/(?:assets|fonts|templates)\/[^"?#]+)"/g)];
 for(const [,resource] of resources)await readFile('docs/'+resource.slice('/services-themes/'.length));
}
console.log('Clinic preview exported and all referenced local assets verified.');
