import {IndustrySite} from '../../shared/IndustrySite';
import type {IndustryCopy} from '../../shared/IndustrySite';
import {constructionContent} from './content';
export default function Page({locale,content}:{locale:'ar'|'en';content?:IndustryCopy}){return <IndustrySite locale={locale} slug="construction-company" variant="construction" c={content||constructionContent[locale]}/>;}
