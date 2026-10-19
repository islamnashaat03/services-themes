import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const themes=JSON.parse(await readFile('dist/catalogue.json','utf8'));
const checks=[];
for(const theme of themes){
 try{
  for(const route of ['','ar/','en/']){
   const response=await fetch(theme.url+'/'+route,{signal:AbortSignal.timeout(20000)});
   if(!response.ok)throw Error('HTTP '+response.status);
   const body=await response.text(),local=await readFile(`dist/${theme.id}/${route}index.html`,'utf8');
   const hash=value=>createHash('sha256').update(value).digest('hex');
   if(hash(body)!==hash(local))throw Error('HTML differs from release');
   if(response.headers.get('server')!=='GitHub.com')throw Error('Response is not served by GitHub Pages');
   checks.push({theme:theme.id,url:response.url,server:response.headers.get('server'),https:true,hashMatch:true});
  }
 }catch(e){checks.push({theme:theme.id,error:e.cause?.code||e.message});}
}
await writeFile('design/live-checks.json',JSON.stringify(checks,null,2)+'\n');
console.log(JSON.stringify(checks,null,2));
if(checks.length!==9||checks.some(x=>x.error))process.exitCode=1;
