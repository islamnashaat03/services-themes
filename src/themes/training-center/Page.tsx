import {IndustrySite} from '../../shared/IndustrySite';
import type {IndustryCopy} from '../../shared/IndustrySite';
import {trainingContent} from './content';
export default function Page({locale,content}:{locale:'ar'|'en';content?:IndustryCopy}){return <IndustrySite locale={locale} slug="training-center" variant="training" c={content||trainingContent[locale]}/>;}
