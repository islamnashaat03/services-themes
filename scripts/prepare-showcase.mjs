import {readFile,writeFile} from 'node:fs/promises';
const catalogue=JSON.parse(await readFile('dist/catalogue.json','utf8'));
const records=catalogue.map(theme=>({
 id:theme.id,title:theme.name,category:theme.industry,type:'showcase',clientProject:false,
 disclosure:{ar:'مشروع استعراضي من تصميم وتنفيذ إسلام نشأت',en:'Showcase project designed and built by Islam Nashaat'},
 preview:`design/preview-${theme.id}.png`,mobilePreview:`design/preview-${theme.id}-mobile.png`,
 intendedOrigin:theme.url,liveUrl:null,publishStatus:'awaiting-https-verification',
 languages:theme.locales,defaultLanguage:'ar',templateVersion:theme.version,
 package:`releases/${theme.id}.zip`,mawqiStatus:'adapter-required'
}));
await writeFile('services-work.json',JSON.stringify(records,null,2)+'\n');
