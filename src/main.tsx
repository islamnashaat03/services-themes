import {createRoot,hydrateRoot} from 'react-dom/client';
import {ThemeRoot} from './ThemeRoot';
import {themes,type ThemeId} from './registry';
import {sitePath} from './shared';
const root=document.getElementById('root')!;
const q=new URLSearchParams(location.search);
const candidate=document.documentElement.dataset.theme||q.get('theme')||'creative-portfolio';
const theme:ThemeId=candidate in themes?candidate as ThemeId:'creative-portfolio';
const locale=root.dataset.prerendered==='true'?document.documentElement.lang==='en'?'en':'ar':location.pathname.startsWith('/en')||q.get('lang')==='en'?'en':'ar';
document.documentElement.lang=locale;document.documentElement.dir=locale==='ar'?'rtl':'ltr';
document.title=themes[theme].name[locale];
if(root.dataset.prerendered!=='true'){
 const fonts=document.createElement('link');fonts.rel='stylesheet';fonts.href=sitePath(`fonts/${themes[theme].fontSheet}`);document.head.append(fonts);
}
const app=<ThemeRoot theme={theme} locale={locale}/>;
if(root.dataset.prerendered==='true')hydrateRoot(root,app);else createRoot(root).render(app);
