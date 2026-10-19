import './shared/base.css';
import './shared/theme.css';
import {LocaleContext} from './shared';
import type {Locale} from './shared';
import {themes,type ThemeId} from './registry';
export function ThemeRoot({theme,locale}:{theme:ThemeId;locale:Locale}){
 const Page=themes[theme].component;
 return <LocaleContext.Provider value={locale}><a className="theme-skip" href="#theme-content" onClick={e=>{e.preventDefault();const main=document.querySelector('main');main?.setAttribute('tabindex','-1');main?.focus();main?.scrollIntoView();}}>{locale==='ar'?'انتقل إلى المحتوى':'Skip to content'}</a><div id="theme-content"><Page locale={locale}/></div></LocaleContext.Provider>;
}
