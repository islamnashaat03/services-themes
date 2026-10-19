import Law from './themes/law-firm/Page';
import Clinic from './themes/medical-clinic/Page';
import Portfolio from './themes/creative-portfolio/Page';
import RealEstate from './themes/real-estate/Page';
import {realEstateContent} from './themes/real-estate/content';
import Construction from './themes/construction-company/Page';
import Training from './themes/training-center/Page';
import {constructionContent} from './themes/construction-company/content';
import {trainingContent} from './themes/training-center/content';
import {lawContent} from './themes/law-firm/content';
import {clinicContent} from './themes/medical-clinic/content';
import {portfolioContent} from './themes/creative-portfolio/content';
import type {ComponentType} from 'react';
import type {PageProps} from './shared';
export const themes = {
 'construction-company': {id:'construction-company',name:{ar:'نماء — مقاولات',en:'Namaa — Construction'},industry:{ar:'شركة مقاولات',en:'Construction company'},version:'1.0.0',component:Construction as ComponentType<PageProps>,content:constructionContent,palette:{primary:'#202c32',background:'#ffffff',accent:'#cbdc85'},fontSheet:'construction-company.css',capabilities:['project-filters','project-details','local-project-request']},
 'training-center': {id:'training-center',name:{ar:'مسار — مركز تدريب',en:'Masar — Training center'},industry:{ar:'مركز تدريب',en:'Training center'},version:'1.0.0',component:Training as ComponentType<PageProps>,content:trainingContent,palette:{primary:'#352d61',background:'#ffffff',accent:'#d9743f'},fontSheet:'training-center.css',capabilities:['program-filters','program-details','faqs','local-interest-request']},
 'real-estate': {id:'real-estate',name:{ar:'فيلدستون — عقارات',en:'Fieldstone — Real estate'},industry:{ar:'مكتب عقارات',en:'Real estate agency'},version:'1.0.0',component:RealEstate as ComponentType<PageProps>,content:realEstateContent,palette:{primary:'#30473a',background:'#f7f8f4',accent:'#b65d30'},fontSheet:'real-estate.css',capabilities:['property-filters','local-shortlist','property-details','local-viewing-request']},
 'law-firm': {id:'law-firm',name:{ar:'كالدر ورو — محاماة',en:'Calder & Rowe — Law firm'},industry:{ar:'مكتب محاماة',en:'Law firm'},version:'1.0.0',component:Law as ComponentType<PageProps>,content:lawContent,palette:{primary:'#153343',background:'#f5f2ec',accent:'#a28753'},fontSheet:'law-firm.css',capabilities:['practice-details','team-profiles','insights','local-contact-form']},
 'medical-clinic': {id:'medical-clinic',name:{ar:'كليرويل — عيادة طبية',en:'Clearwell Clinic'},industry:{ar:'عيادة طبية',en:'Medical clinic'},version:'1.0.0',component:Clinic as ComponentType<PageProps>,content:clinicContent,palette:{primary:'#086b66',background:'#ffffff',accent:'#08736d'},fontSheet:'medical-clinic.css',capabilities:['service-selection','local-appointment-request','faqs']},
 'creative-portfolio': {id:'creative-portfolio',name:{ar:'ليان مراد — بورتفوليو',en:'Layan Murad — Portfolio'},industry:{ar:'بورتفوليو إبداعي',en:'Creative portfolio'},version:'1.0.0',component:Portfolio as ComponentType<PageProps>,content:portfolioContent,palette:{primary:'#2c36a6',background:'#ffffff',accent:'#e98450'},fontSheet:'creative-portfolio.css',capabilities:['project-filters','case-details','local-contact-form']}
};
export type ThemeId = keyof typeof themes;
export const themeIds = Object.keys(themes) as ThemeId[];
