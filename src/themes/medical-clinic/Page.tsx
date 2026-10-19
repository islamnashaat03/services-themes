import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Accordion, DemoFooter, Icon, LanguageSwitch, media } from '../../shared';
import type { PageProps } from '../../shared';
import { clinicContent } from './content';
import './styles.css';

const slug = 'medical-clinic';
const sections = ['clinic-services','clinic-appointments','clinic-people','clinic-location'];
function CareIcon({name, size = 28}: {name: string; size?: number}) {
  const paths: Record<string, React.ReactNode> = {
    stethoscope: <><path d="M5 3v5a5 5 0 0 0 10 0V3M3 3h4M13 3h4M10 13v3a5 5 0 0 0 10 0v-3"/><circle cx="20" cy="10" r="2"/></>,
    person: <><circle cx="12" cy="6.5" r="3.5"/><path d="M5 21v-3a7 7 0 0 1 14 0v3H5Z"/></>,
    shield: <><path d="m12 2 8 3v6c0 5-8 11-8 11S4 16 4 11V5l8-3Z"/><path d="M12 7v9M8 11.5h8"/></>,
    family: <><circle cx="12" cy="6" r="3"/><path d="M7 21v-6a5 5 0 0 1 10 0v6M4 7a2.5 2.5 0 0 0 0 5M20 7a2.5 2.5 0 0 1 0 5M4 15a4 4 0 0 0-2 3v3M20 15a4 4 0 0 1 2 3v3"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 11h18M8 15h3"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></>,
    phone: <path d="m6 3 4 4-2 3a15 15 0 0 0 6 6l3-2 4 4-2 3C10 21 3 14 3 5l3-2Z"/>,
    clipboard: <><rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 11h6M9 15h6"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.heart}</svg>;
}

export default function Page({locale,content=clinicContent}: PageProps & {content?:typeof clinicContent}) {
  const c = content[locale];
  const [menu, setMenu] = useState(false);
  const [service, setService] = useState('');
  const [appointmentType, setAppointmentType] = useState('standard');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [today, setToday] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const selectedType = c.types.items.find(item => item.id === appointmentType)!;
  useEffect(() => { setToday(new Date().toLocaleDateString('en-CA')); }, []);
  function goToForm() { document.getElementById('clinic-request')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'}); window.setTimeout(() => formRef.current?.querySelector<HTMLSelectElement>('select')?.focus({preventScroll:true}), 100); setMenu(false); }
  function chooseType(id: string) {setAppointmentType(id);setDone(false);goToForm();}
  function chooseService(id: string) {setService(id);setDone(false);goToForm();}
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget)) as Record<string,string>;
    if (values.day < new Date().toLocaleDateString('en-CA')) {setError(c.form.dateError);setDone(false);return;}
    setError('');setDone(true);
  }
  return <div className="clinic-page" dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
    <header className="clinic-header clinic-wrap"><a href="#clinic-home" className="clinic-brand"><strong>{c.brand}</strong><span>{c.tagline}</span></a><nav className={menu?'clinic-nav is-open':'clinic-nav'} id="clinic-nav" aria-label={locale==='ar'?'التصفح الرئيسي':'Main navigation'}>{c.nav.map((label,i)=><a key={label} href={`#${sections[i]}`} onClick={()=>setMenu(false)}>{label}</a>)}</nav><button className="demo-button clinic-header-cta" onClick={goToForm}>{c.cta}<Icon name="arrow" size={18}/></button><LanguageSwitch locale={locale}/><button className="demo-icon-button clinic-menu" aria-label={menu?c.close:c.menu} aria-controls="clinic-nav" aria-expanded={menu} onClick={()=>setMenu(!menu)}><Icon name={menu?'close':'menu'}/></button></header>
    <main id="clinic-home">
      <section id="clinic-hero" className="clinic-hero" aria-labelledby="clinic-title"><div className="clinic-hero-copy"><h1 id="clinic-title">{c.hero.title}</h1><p>{c.hero.text}</p></div><img className="clinic-hero-image" src={media(slug,'reception.webp')} alt={c.hero.alt} width="1536" height="1024" fetchPriority="high"/>
        <div className="clinic-booking clinic-wrap" id="clinic-request"><div className="clinic-booking-title"><h2>{c.form.title}</h2><span>{c.form.type}: <strong>{selectedType.title}</strong> <a href="#clinic-appointments">{c.form.change}</a></span></div><form ref={formRef} onSubmit={submit} onChange={()=>{setDone(false);setError('');}}>
          <label className="demo-field"><span>{c.form.service}</span><select name="service" value={service} onChange={e=>setService(e.target.value)} required><option value="">{c.form.serviceHint}</option>{c.services.items.map(item=><option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
          <label className="demo-field"><span>{c.form.day}</span><input name="day" type="date" min={today || undefined} required/></label>
          <label className="demo-field"><span>{c.form.name}</span><input name="name" autoComplete="name" placeholder={c.form.nameHint} required pattern=".*\S.*"/></label>
          <label className="demo-field"><span>{c.form.email}</span><input name="email" type="email" autoComplete="email" placeholder={c.form.emailHint} required/></label>
          <input type="hidden" name="appointmentType" value={appointmentType}/><button type="submit" className="demo-button">{c.form.submit}</button>
          <p className="clinic-form-note">{c.form.note}</p>{error&&<p className="clinic-form-error" role="alert">{error}</p>}<p className="clinic-form-status" role="status" aria-live="polite">{done?c.form.success:''}</p>
        </form></div>
      </section>

      <section id="clinic-services" className="clinic-services clinic-section" aria-labelledby="clinic-services-title"><div className="clinic-wrap"><div className="clinic-section-heading"><h2 id="clinic-services-title">{c.services.title}</h2><p>{c.services.text}</p></div><div className="clinic-service-list">{c.services.items.map(item=><button className="clinic-service" key={item.id} onClick={()=>chooseService(item.id)} aria-label={`${c.services.select}: ${item.title}`}><span className="clinic-symbol"><CareIcon name={item.icon}/></span><span><strong>{item.title}</strong><span>{item.text}</span></span></button>)}</div></div></section>

      <section id="clinic-appointments" className="clinic-types clinic-wrap clinic-section" aria-labelledby="clinic-types-title"><div><h2 id="clinic-types-title">{c.types.title}</h2><p>{c.types.text}</p></div><div className="clinic-types-list">{c.types.items.map(item=><article key={item.id} className={appointmentType===item.id?'clinic-type is-selected':'clinic-type'}><span className="clinic-type-icon"><CareIcon name={item.icon} size={25}/></span><h3>{item.title}</h3><p>{item.text}</p><ul><li><Icon name="check" size={15}/>{item.duration}</li><li><Icon name="check" size={15}/>{item.location}</li></ul><button className="demo-button" onClick={()=>chooseType(item.id)} aria-pressed={appointmentType===item.id}>{item.cta}</button></article>)}</div></section>

      <section id="clinic-people" className="clinic-people clinic-section" aria-labelledby="clinic-people-title"><div className="clinic-wrap clinic-people-grid"><div><h2 id="clinic-people-title">{c.people.title}</h2><p>{c.people.text}</p><p className="clinic-caption">{c.people.note}</p></div>{c.people.items.map(person=><figure className="clinic-person" key={person.name}><img src={media(slug,person.image)} alt={person.name} width="700" height="700" loading="lazy"/><figcaption><strong>{person.name}</strong><span>{person.role}</span><p>{person.caption}</p></figcaption></figure>)}</div></section>

      <section id="clinic-visit" className="clinic-visit clinic-wrap clinic-section" aria-labelledby="clinic-visit-title"><div className="clinic-section-heading"><h2 id="clinic-visit-title">{c.visit.title}</h2><p>{c.visit.text}</p></div><ol className="clinic-steps">{c.visit.steps.map((step,i)=><li key={step.title}><span className="clinic-step-number">{locale==='ar'?(i+1).toLocaleString('ar-EG'):i+1}</span><div><CareIcon name={step.icon} size={25}/><h3>{step.title}</h3><p>{step.text}</p></div>{i<3&&<Icon name="arrow" size={23}/>}</li>)}</ol></section>

      <section id="clinic-spaces" className="clinic-spaces clinic-section" aria-labelledby="clinic-spaces-title"><div className="clinic-wrap clinic-spaces-grid"><div><h2 id="clinic-spaces-title">{c.space.title}</h2><p>{c.space.text}</p><a className="demo-link" href="#clinic-location">{c.space.more}<Icon name="arrow" size={18}/></a></div><figure><img src={media(slug,'reception.webp')} alt={c.space.receptionAlt} width="900" height="600" loading="lazy"/><figcaption>{c.space.captions[0]}</figcaption></figure><figure><img src={media(slug,'consultation-room.webp')} alt={c.space.roomAlt} width="900" height="600" loading="lazy"/><figcaption>{c.space.captions[1]}</figcaption></figure></div></section>

      <section id="clinic-location" className="clinic-location clinic-wrap clinic-section" aria-labelledby="clinic-location-title"><div><h2 id="clinic-location-title">{c.location.title}</h2><p>{c.location.text}</p></div><div className="clinic-location-details"><div className="clinic-address"><Icon name="location" size={24}/><div><strong>{c.location.address}</strong><span>{c.location.addressNote}</span></div></div><div className="clinic-hours"><CareIcon name="clock" size={22}/><div><p className="clinic-caption">{c.location.hoursNote}</p><dl>{c.location.hours.map(row=><div key={row.day}><dt>{row.day}</dt><dd>{row.time}</dd></div>)}</dl></div></div><ul className="clinic-access">{c.location.access.map(text=><li key={text}><Icon name="check" size={16}/>{text}</li>)}</ul></div><div className="clinic-area"><div className="clinic-area-map" role="img" aria-label={c.location.mapLabel}><span className="clinic-map-park">{c.location.mapPark}</span><span className="clinic-map-road">{c.location.mapRoad}</span><span className="clinic-map-river">{c.location.mapRiver}</span><span className="clinic-map-pin"><Icon name="location" size={30}/><strong>{c.location.mapClinic}</strong></span></div><p className="clinic-caption">{c.location.mapNote}</p></div></section>

      <section id="clinic-faq" className="clinic-faq clinic-section" aria-labelledby="clinic-faq-title"><div className="clinic-wrap clinic-faq-grid"><div><h2 id="clinic-faq-title">{c.faq.title}</h2><p>{c.faq.text}</p></div><Accordion items={c.faq.items}/></div></section>
      <div className="clinic-close"><div className="clinic-wrap"><h2>{c.closeTitle}</h2><button className="demo-button" onClick={goToForm}>{c.cta}<Icon name="arrow" size={18}/></button><p>{c.closeText}</p></div></div>
    </main>
    <footer className="clinic-footer"><div className="clinic-wrap clinic-footer-main"><a className="clinic-brand" href="#clinic-home"><strong>{c.brand}</strong><span>{c.tagline}</span></a><nav aria-label={locale==='ar'?'روابط التذييل':'Footer navigation'}>{c.nav.map((label,i)=><a key={label} href={`#${sections[i]}`}>{label}</a>)}</nav><p>{c.footer}</p></div><DemoFooter locale={locale} slug={slug} name={c.brand}/></footer>
  </div>;
}
