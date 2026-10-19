import { useState } from 'react';
import { Accordion, DemoFooter, DemoForm, Dialog, Icon, LanguageSwitch, media } from '../../shared';
import type { PageProps } from '../../shared';
import { lawContent } from './content';
import './styles.css';

const slug = 'law-firm';
const sectionIds = ['law-practice', 'law-approach', 'law-people', 'law-insights', 'law-contact'];

export default function Page({ locale, content = lawContent }: PageProps & {content?:typeof lawContent}) {
  const c = content[locale];
  const [menu, setMenu] = useState(false);
  const [practice, setPractice] = useState<string | null>(null);
  const [consultation, setConsultation] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState('');
  const [profile, setProfile] = useState<number | null>(null);
  const [insight, setInsight] = useState<number | null>(null);
  const activePractice = c.practice.items.find(item => item.id === practice);
  function request(id = '') { setSelectedPractice(id); setConsultation(true); setMenu(false); }
  return <div className="law-page" dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
    <header className="law-header law-wrap">
      <a className="law-brand" href="#law-home">{c.brand}</a>
      <nav className={menu ? 'law-nav is-open' : 'law-nav'} id="law-nav" aria-label={locale === 'ar' ? 'التصفح الرئيسي' : 'Main navigation'}>
        {c.nav.map((label, i) => <a key={label} href={`#${sectionIds[i]}`} onClick={() => setMenu(false)}>{label}</a>)}
      </nav>
      <button className="demo-button law-header-cta" onClick={() => request()}>{c.cta}</button>
      <LanguageSwitch locale={locale}/>
      <button className="law-menu demo-icon-button" aria-label={menu ? c.close : c.menu} aria-controls="law-nav" aria-expanded={menu} onClick={() => setMenu(!menu)}><Icon name={menu ? 'close' : 'menu'} /></button>
    </header>

    <main id="law-home">
      <section id="law-hero" className="law-hero" aria-labelledby="law-title">
        <div className="law-hero-copy"><h1 id="law-title">{c.hero.title}</h1><span className="law-rule"/><p>{c.hero.text}</p><button className="demo-button" onClick={() => request()}>{c.cta}<Icon name="arrow" size={18}/></button></div>
        <img className="law-hero-image" src={media(slug, 'columns.webp')} alt={c.hero.alt} width="1200" height="1600" fetchPriority="high"/>
        <aside className="law-hero-aside"><div>{c.hero.aside.map(line => <span key={line}>{line}</span>)}</div><span className="law-rule"/><span className="law-aside-brand">{c.brand}</span></aside>
      </section>

      <section id="law-practice" className="law-practice law-wrap law-section" aria-labelledby="law-practice-title">
        <div className="law-section-heading"><div><h2 id="law-practice-title">{c.practice.title}</h2><span className="law-rule"/></div><p>{c.practice.intro}</p></div>
        <div className="law-practice-list">{c.practice.items.map(item => <button key={item.id} onClick={() => setPractice(practice === item.id ? null : item.id)} aria-expanded={practice === item.id} aria-controls="law-practice-detail"><span>{item.title}</span><Icon name={practice === item.id ? 'minus' : 'arrow'} size={18}/></button>)}</div>
        {activePractice && <div className="law-practice-detail" id="law-practice-detail"><div><h3>{activePractice.title}</h3><p>{activePractice.text}</p></div><ul>{activePractice.topics.map(topic => <li key={topic}>{topic}</li>)}</ul><button className="demo-link" onClick={() => request(activePractice.id)}>{c.practice.select}<Icon name="arrow" size={18}/></button></div>}
      </section>

      <section id="law-approach" className="law-approach" aria-labelledby="law-approach-title"><img src={media(slug, 'workplace.webp')} alt={c.approach.alt} width="1600" height="1067" loading="lazy"/><div><h2 id="law-approach-title">{c.approach.title}</h2><span className="law-rule"/>{c.approach.paragraphs.map(text => <p key={text}>{text}</p>)}</div></section>

      <section id="law-people" className="law-people law-wrap law-section" aria-labelledby="law-people-title"><div className="law-people-intro"><h2 id="law-people-title">{c.people.title}</h2><span className="law-rule"/><p>{c.people.intro}</p></div>{c.people.items.map((person, i) => <article className="law-person" key={person.name}><img src={media(slug, person.image)} alt={person.name} width="640" height="800" loading="lazy"/><div><h3>{person.name}</h3><p className="law-person-role">{person.role}</p><span className="law-rule"/><p>{person.intro}</p><button className="demo-link" onClick={() => setProfile(i)}>{c.people.more}<Icon name="arrow" size={16}/></button></div></article>)}</section>

      <section id="law-process" className="law-process" aria-labelledby="law-process-title"><div className="law-wrap law-process-grid"><div><h2 id="law-process-title">{c.process.title}</h2><span className="law-rule"/><p>{c.process.intro}</p></div><ol>{c.process.steps.map((step, i) => <li key={step.title}><span className="law-step-number">{String(i + 1).padStart(2, '0')}</span><span className="law-rule"/><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol></div></section>

      <section id="law-insights" className="law-insights law-wrap law-section" aria-labelledby="law-insights-title"><div><h2 id="law-insights-title">{c.insights.title}</h2><span className="law-rule"/><p>{c.insights.intro}</p></div>{c.insights.items.map((item, i) => <article key={item.title}><button className="law-insight-image" onClick={() => setInsight(i)} aria-label={item.title}><img src={media(slug, item.image)} alt="" width="700" height="400" loading="lazy"/></button><p className="law-insight-category">{item.category}</p><h3>{item.title}</h3><p>{item.text}</p><button className="demo-link" onClick={() => setInsight(i)}>{c.insights.read}<Icon name="arrow" size={16}/></button></article>)}</section>

      <section id="law-faq" className="law-faq law-wrap law-section" aria-labelledby="law-faq-title"><div><h2 id="law-faq-title">{c.faq.title}</h2><span className="law-rule"/><p>{c.faq.intro}</p></div><Accordion items={c.faq.items}/></section>

      <section id="law-contact" className="law-contact" aria-labelledby="law-contact-title"><img src={media(slug, 'workplace.webp')} alt={c.contact.alt} width="1600" height="1067" loading="lazy"/><div><h2 id="law-contact-title">{c.contact.title}</h2><span className="law-rule"/><p>{c.contact.text}</p><button className="demo-button" onClick={() => request()}>{c.cta}<Icon name="arrow" size={18}/></button></div></section>
    </main>

    <footer className="law-footer"><div className="law-wrap law-footer-top"><a className="law-brand" href="#law-home">{c.brand}</a><nav aria-label={locale === 'ar' ? 'روابط التذييل' : 'Footer navigation'}>{c.nav.map((label, i) => <a key={label} href={`#${sectionIds[i]}`}>{label}</a>)}</nav></div><div className="law-wrap law-footer-bottom"><span>{c.copyright}</span><span>{c.footer}</span></div><DemoFooter locale={locale} slug={slug} name={c.brand}/></footer>

    <Dialog open={consultation} onClose={() => setConsultation(false)} title={c.form.title}><p className="law-dialog-note">{c.form.note}</p><label className="demo-field law-practice-field"><span>{c.form.practice}</span><select value={selectedPractice} onChange={e => setSelectedPractice(e.target.value)}><option value="">{c.form.general}</option>{c.practice.items.map(item => <option value={item.id} key={item.id}>{item.title}</option>)}</select></label><DemoForm key={locale} locale={locale} fields={[{name:'name', label:c.form.name},{name:'email',label:c.form.email,type:'email'}]} submitLabel={c.form.submit}/></Dialog>
    <Dialog open={profile !== null} onClose={() => setProfile(null)} title={profile === null ? '' : c.people.items[profile].name}>{profile !== null && <><img className="law-profile-portrait" src={media(slug, c.people.items[profile].image)} alt={c.people.items[profile].name}/><p>{c.people.items[profile].detail}</p><p className="law-dialog-note">{c.people.note}</p></>}</Dialog>
    <Dialog open={insight !== null} onClose={() => setInsight(null)} title={insight === null ? '' : c.insights.items[insight].title}>{insight !== null && <><img src={media(slug, c.insights.items[insight].image)} alt=""/>{c.insights.items[insight].body.map(text => <p className="law-dialog-paragraph" key={text}>{text}</p>)}<p className="law-dialog-note">{c.insights.note}</p></>}</Dialog>
  </div>;
}
