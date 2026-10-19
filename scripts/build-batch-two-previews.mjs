import {cp,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
process.chdir(fileURLToPath(new URL('../',import.meta.url)));
const ids=['real-estate','construction-company','training-center'];
for(const id of ids){
 const basePath=`/services-themes/demos/${id}/`;
 const origin=`https://islamnashaat03.github.io/services-themes/demos/${id}`;
 execFileSync(process.execPath,['scripts/build.mjs'],{env:{...process.env,THEME_BASE_PATH:basePath,THEME_ORIGIN:origin,THEME_OUTPUT_DIR:'.deploy/preview-export'},stdio:'inherit'});
 const destination=`docs/demos/${id}`;
 await cp(`.deploy/preview-export/${id}`,destination,{recursive:true});
 const manifest=JSON.parse(await readFile(`${destination}/theme-manifest.json`,'utf8'));
 manifest.liveOrigin=origin;
 await writeFile(`${destination}/theme-manifest.json`,JSON.stringify(manifest,null,2)+'\n');
 for(const locale of ['ar','en']){
  const html=await readFile(`${destination}/${locale}/index.html`,'utf8');
  if(!html.includes(`href="${basePath}${locale==='ar'?'en':'ar'}/"`))throw Error(`Incorrect language route for ${id}`);
  const resources=[...html.matchAll(/(?:src|href)="(\/services-themes\/demos\/[^"?#]+)"/g)].filter(([,url])=>/\/(assets|fonts|templates)\//.test(url));
  for(const [,url] of resources){if(!url.startsWith(basePath))throw Error(`Cross-theme asset in ${id}`);await readFile(destination+'/'+url.slice(basePath.length));}
 }
}
await writeFile('docs/.nojekyll','');
console.log('Three HTTPS fallback previews exported beneath docs/demos/.');
