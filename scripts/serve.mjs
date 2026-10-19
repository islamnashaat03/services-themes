import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const ids=['law-firm','medical-clinic','creative-portfolio','real-estate','construction-company','training-center'];
const basePort=Number(process.env.THEME_PREVIEW_PORT||4191);
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.woff2':'font/woff2','.svg':'image/svg+xml','.txt':'text/plain'};
for(let i=0;i<ids.length;i++){
 const id=ids[i],root=path.resolve('dist',id),port=basePort+i;
 createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let file=path.resolve(root,`.${decodeURIComponent(url.pathname)}`);if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}if((await stat(file)).isDirectory())file=path.join(file,'index.html');res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(await readFile(file));}catch{res.writeHead(404);res.end('Not found');}}).listen(port,'127.0.0.1',()=>console.log(`${id}: http://127.0.0.1:${port}/`));
}
