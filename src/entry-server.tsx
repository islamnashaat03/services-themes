import {renderToString} from 'react-dom/server';
import {ThemeRoot} from './ThemeRoot';
import {themes,themeIds,type ThemeId} from './registry';
import type {Locale} from './shared';
export {themeIds};
export function themeData(id:ThemeId){const {component:_,...data}=themes[id];return data;}
export function render(id:ThemeId,locale:Locale){return renderToString(<ThemeRoot theme={id} locale={locale}/>);}
