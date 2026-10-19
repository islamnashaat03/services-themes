import {execFileSync} from 'node:child_process';
import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('.');
const credential=execFileSync('git',['credential','fill'],{input:'protocol=https\nhost=github.com\n\n',encoding:'utf8'});
const token=credential.split('\n').find(line=>line.startsWith('password='))?.slice(9);
if(!token)throw Error('GitHub authentication unavailable');
async function api(route,method='GET',body){
 const response=await fetch('https://api.github.com'+route,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
 const result=response.status===204?{}:await response.json();
 if(!response.ok)throw Error(`${method} ${route}: ${response.status} ${result.message}`);
 return result;
}
const user=await api('/user');
if(user.login!=='islamnashaat03')throw Error('Unexpected GitHub account');
const catalogue=JSON.parse(await readFile('dist/catalogue.json','utf8'));
const statePath='.deploy/github.json';
await mkdir('.deploy',{recursive:true});
let state;try{state=JSON.parse(await readFile(statePath,'utf8'));}catch{state={owner:user.login,repositories:{}};}
async function save(){await writeFile(statePath,JSON.stringify(state,null,2)+'\n');}
function git(dir,...args){return execFileSync('git',['-C',dir,...args],{encoding:'utf8',stdio:['pipe','pipe','pipe']}).trim();}
async function repo(name){
 if(state.repositories[name])return state.repositories[name];
 const created=await api('/user/repos','POST',{name,private:false,description:'Arabic-first bilingual showcase themes by Islam Nashaat'});
 state.repositories[name]={url:created.html_url,clone:created.clone_url};await save();return state.repositories[name];
}
if(process.argv.includes('--status')){
 for(const theme of catalogue){const name='showcase-'+theme.id;const p=await api(`/repos/${user.login}/${name}/pages`);textStatus(name,p);}
 process.exit(0);
}
if(process.argv.includes('--https')){
 for(const theme of catalogue){const name='showcase-'+theme.id;const p=await api(`/repos/${user.login}/${name}/pages`);if(p.https_certificate?.state==='approved')await api(`/repos/${user.login}/${name}/pages`,'PUT',{https_enforced:true});textStatus(name,await api(`/repos/${user.login}/${name}/pages`));}
 process.exit(0);
}
function textStatus(name,p){console.log(JSON.stringify({name,status:p.status,url:p.html_url,cname:p.cname,certificate:p.https_certificate?.state,https:p.https_enforced}));}
const source=await repo('services-themes');
try{await readFile('.git/HEAD');}catch{git(root,'init','-b','main');git(root,'remote','add','origin',source.clone);}
git(root,'add','.');
if(git(root,'status','--porcelain'))git(root,'commit','-m','Build three reusable Arabic and English showcase themes');
git(root,'push','-u','origin','main');console.log('SOURCE '+source.url);
for(const theme of catalogue){
 const name='showcase-'+theme.id,remote=await repo(name),dir=path.join(root,'.deploy',name);
 await mkdir(dir,{recursive:true});await cp(path.join(root,'dist',theme.id),dir,{recursive:true});
 await writeFile(path.join(dir,'.nojekyll'),'');await writeFile(path.join(dir,'CNAME'),new URL(theme.url).hostname+'\n');
 await writeFile(path.join(dir,'README.md'),`# ${theme.name.en}\n\nBilingual authored showcase. Source: ${source.url}\n\nBuild with npm ci and npm run build in the source repository, then publish dist/${theme.id}/ here.\n`);
 try{await readFile(path.join(dir,'.git/HEAD'));}catch{git(dir,'init','-b','main');git(dir,'remote','add','origin',remote.clone);}
 git(dir,'add','.');if(git(dir,'status','--porcelain'))git(dir,'commit','-m',`Publish ${theme.id} bilingual showcase`);git(dir,'push','-u','origin','main');
 let pages;try{pages=await api(`/repos/${user.login}/${name}/pages`);}catch(e){if(!String(e).includes('404'))throw e;pages=await api(`/repos/${user.login}/${name}/pages`,'POST',{source:{branch:'main',path:'/'}});}
 await api(`/repos/${user.login}/${name}/pages`,'PUT',{cname:new URL(theme.url).hostname});
 state.repositories[name].origin=theme.url;await save();console.log('PUBLISHED '+remote.url);
}
