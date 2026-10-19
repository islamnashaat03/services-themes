import Law from './themes/law-firm/Page';
import Clinic from './themes/medical-clinic/Page';
import Portfolio from './themes/creative-portfolio/Page';
import {lawContent} from './themes/law-firm/content';
import {clinicContent} from './themes/medical-clinic/content';
import {portfolioContent} from './themes/creative-portfolio/content';
import type {ComponentType} from 'react';
import type {PageProps} from './shared';
export const themes = {
 'law-firm': {id:'law-firm',name:{ar:'كالدر ورو — محاماة',en:'Calder & Rowe — Law firm'},industry:{ar:'مكتب محاماة',en:'Law firm'},version:'1.0.0',component:Law as ComponentType<PageProps>,content:lawContent,palette:{primary:'#153343',background:'#f5f2ec',accent:'#a28753'},fontSheet:'law-firm.css',capabilities:['practice-details','team-profiles','insights','local-contact-form']},
 'medical-clinic': {id:'medical-clinic',name:{ar:'كليرويل — عيادة طبية',en:'Clearwell Clinic'},industry:{ar:'عيادة طبية',en:'Medical clinic'},version:'1.0.0',component:Clinic as ComponentType<PageProps>,content:clinicContent,palette:{primary:'#086b66',background:'#ffffff',accent:'#08736d'},fontSheet:'medical-clinic.css',capabilities:['service-selection','local-appointment-request','faqs']},
 'creative-portfolio': {id:'creative-portfolio',name:{ar:'ليان مراد — بورتفوليو',en:'Layan Murad — Portfolio'},industry:{ar:'بورتفوليو إبداعي',en:'Creative portfolio'},version:'1.0.0',component:Portfolio as ComponentType<PageProps>,content:portfolioContent,palette:{primary:'#2c36a6',background:'#ffffff',accent:'#e98450'},fontSheet:'creative-portfolio.css',capabilities:['project-filters','case-details','local-contact-form']}
};
export type ThemeId = keyof typeof themes;
export const themeIds = Object.keys(themes) as ThemeId[];
