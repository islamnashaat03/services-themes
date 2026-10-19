import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import https from 'node:https';
import http from 'node:http';
import {Resolver} from 'node:dns/promises';
const resolver=new Resolver();resolver.setServers(['1.1.1.1']);
async function publicRequest(url){
 const parsed=new URL(url),addresses=await resolver.resolve4(parsed.hostname);
 return new Promise((resolve,reject)=>{
  const req=(parsed.protocol==='https:'?https:http).get(url,{lookup:(_host,options,cb)=>options.all?cb(null,[{address:addresses[0],family:4}]):cb(null,addresses[0],4)},response=>{
   const chunks=[];response.on('data',chunk=>chunks.push(chunk));response.on('end',()=>resolve({ok:response.statusCode===200,status:response.statusCode,url,headers:{get:name=>response.headers[name]},text:async()=>Buffer.concat(chunks).toString('utf8')}));
  });req.setTimeout(20000,()=>req.destroy(Error('Timed out')));req.on('error',reject);
 });
}
const themes=JSON.parse(await readFile('dist/catalogue.json','utf8'));
const checks=[];
for(const theme of themes){
 try{
  for(const route of ['','ar/','en/']){
   const url=(process.argv.includes('--http')?theme.url.replace('https:','http:'):theme.url)+'/'+route;
   const response=process.argv.includes('--public-dns')?await publicRequest(url):await fetch(url,{signal:AbortSignal.timeout(20000)});
   if(!response.ok)throw Error('HTTP '+response.status);
   const body=await response.text(),local=await readFile(`dist/${theme.id}/${route}index.html`,'utf8');
   const hash=value=>createHash('sha256').update(value).digest('hex');
   if(hash(body)!==hash(local))throw Error('HTML differs from release');
   if(response.headers.get('server')!=='GitHub.com')throw Error('Response is not served by GitHub Pages');
   checks.push({theme:theme.id,url:response.url,server:response.headers.get('server'),https:response.url.startsWith('https:'),hashMatch:true});
  }
 }catch(e){checks.push({theme:theme.id,error:e.cause?.code||e.code||e.message});}
}
await writeFile(process.argv.includes('--http')?'design/live-http-checks.json':'design/live-checks.json',JSON.stringify(checks,null,2)+'\n');
console.log(JSON.stringify(checks,null,2));
if(checks.length!==9||checks.some(x=>x.error))process.exitCode=1;
