import {cp,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
process.chdir(fileURLToPath(new URL('../',import.meta.url)));
const ids=['real-estate','construction-company','training-center'];
for(const id of ids){
 process.env.THEME_BASE_PATH=`/services-themes/demos/${id}/`;
 process.env.THEME_ORIGIN=`https://islamnashaat03.github.io/services-themes/demos/${id}`;
 process.env.THEME_OUTPUT_DIR='.deploy/preview-export';
 await import(`./build.mjs?preview=${id}`);
 const destination=`docs/demos/${id}`;
 await cp(`.deploy/preview-export/${id}`,destination,{recursive:true});
 const manifest=JSON.parse(await readFile(`${destination}/theme-manifest.json`,'utf8'));
 manifest.liveOrigin=process.env.THEME_ORIGIN;
 await writeFile(`${destination}/theme-manifest.json`,JSON.stringify(manifest,null,2)+'\n');
}
await writeFile('docs/.nojekyll','');
console.log('Three HTTPS fallback previews exported beneath docs/demos/.');
