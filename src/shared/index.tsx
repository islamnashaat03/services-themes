import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

export type Locale = 'en' | 'ar';
export const LocaleContext = createContext<Locale>('en');
export type PageProps = { locale: Locale };
export const t = (locale: Locale, en: string, ar: string) => locale === 'ar' ? ar : en;
export const media = (slug: string, file: string) => `/templates/media/${slug}/${file}`;
export const galleryUrl = (locale: Locale) => locale === 'ar' ? 'https://islamnashaat.com/ar/index.html' : 'https://islamnashaat.com/en.html';
export const templateUrl = (locale: Locale, _slug: string, _preview = false) => locale === 'ar' ? '/ar/' : '/en/';
export const servicesUrl = galleryUrl;
export const quoteUrl = (locale: Locale, slug?: string, name?: string) => `${servicesUrl(locale)}?${new URLSearchParams({service: slug === 'fashion-store' ? 'woocommerce-store' : 'business-website', approach: slug ? 'template' : 'custom', ...(name ? {template: name} : {})})}#contact`;

const paths: Record<string, ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></>,
  bag: <><path d="M5 7h14l1 14H4L5 7Z"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/></>,
  close: <path d="m6 6 12 12M6 18 18 6"/>,
  menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
  plus: <path d="M12 5v14M5 12h14"/>,
  minus: <path d="M5 12h14"/>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  globe: <><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></>,
  desktop: <><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></>,
  tablet: <><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M11 18h2"/></>,
  mobile: <><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></>,
  expand: <path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"/>,
  external: <><path d="M14 3h7v7M21 3 10 14"/><path d="M10 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-6"/></>,
  location: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 11h18"/></>,
  chevron: <path d="m6 9 6 6 6-6"/>,
};
export function Icon({name, size = 20, ...props}: {name: string; size?: number; className?: string}) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}

export function LanguageSwitch({locale}:{locale:Locale}) {
 return <a className="theme-language-switch" href={locale==='ar'?'/en/':'/ar/'} hrefLang={locale==='ar'?'en':'ar'} lang={locale==='ar'?'en':'ar'} aria-label={locale==='ar'?'View this website in English':'عرض الموقع بالعربية'}><Icon name="globe" size={17}/>{locale==='ar'?'English':'العربية'}</a>;
}

export function Dialog({open, onClose, title, children}: {open: boolean; onClose: () => void; title: string; children: ReactNode}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  const locale = useContext(LocaleContext);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = previousOverflow;};
  }, [open]);
  return <dialog ref={ref} className="demo-dialog" aria-labelledby={id} onCancel={() => closeRef.current()} onClick={e => {if (e.target === e.currentTarget) closeRef.current();}}>
    <div className="demo-dialog-head"><h2 id={id}>{title}</h2><button type="button" className="demo-icon-button" onClick={onClose} aria-label={t(locale, 'Close dialog', 'إغلاق النافذة')}><Icon name="close"/></button></div>
    <div className="demo-dialog-body">{children}</div>
  </dialog>;
}

export type FormField = {name: string; label: string; type?: string; options?: {value: string; label: string}[]; required?: boolean; placeholder?: string; min?: string};
export function DemoForm({locale, fields, submitLabel, onComplete}: {locale: Locale; fields: FormField[]; submitLabel?: string; onComplete?: (values: Record<string, string>) => void}) {
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const missing = fields.find(f => f.required !== false && !values[f.name]?.trim());
    if (missing) {setError(t(locale, `Enter ${missing.label.toLowerCase()}.`, `يرجى إدخال ${missing.label}.`)); return;}
    const date = fields.find(f => f.type === 'date');
    if (date && values[date.name] && values[date.name] < new Date().toLocaleDateString('en-CA')) {setError(t(locale, 'Choose today or a future date.', 'اختر اليوم أو تاريخًا قادمًا.')); return;}
    setError('');setDone(true);onComplete?.(values);
  }
  return <form className="demo-form" onSubmit={submit} onChange={() => {setDone(false);setError('');}}>
    <p className="demo-form-disclosure">{t(locale, 'Interactive demo. No information will be sent.', 'عرض تفاعلي تجريبي. لن تُرسل أي معلومات.')}</p>
    <div className="demo-form-fields">{fields.map(field => <label className="demo-field" key={field.name}><span>{field.label}{field.required === false ? t(locale,' (optional)',' (اختياري)') : ''}</span>
      {field.options ? <select name={field.name} required={field.required !== false} defaultValue=""><option value="">{t(locale,'Choose an option','اختر أحد الخيارات')}</option>{field.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select>
      : field.type === 'textarea' ? <textarea name={field.name} required={field.required !== false} placeholder={field.placeholder} rows={4}/>
      : <input name={field.name} type={field.type || 'text'} required={field.required !== false} placeholder={field.placeholder} min={field.min} autoComplete={field.type === 'email' ? 'email' : field.name === 'name' ? 'name' : 'off'}/>}
    </label>)}</div>
    {error && <p role="alert" className="demo-form-error">{error}</p>}
    <button type="submit" className="demo-button">{submitLabel || t(locale,'Prepare request','تجهيز الطلب')}<Icon name="arrow"/></button>
    <p className="demo-form-status" role="status" aria-live="polite">{done ? t(locale, 'Demo request prepared; nothing was sent.', 'تم تجهيز الطلب التجريبي؛ لم تُرسل أي معلومات.') : ''}</p>
  </form>;
}

export function Accordion({items}: {items: {title: string; content: ReactNode}[]}) {
  return <div className="demo-accordion">{items.map((item,i) => <details key={i}><summary>{item.title}<Icon name="plus" size={18}/></summary><div>{item.content}</div></details>)}</div>;
}

export function useStoredState<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {try {const saved = localStorage.getItem(`homepage-demo:v1:${key}`);if(saved) setValue(JSON.parse(saved));} catch {/* Storage can be disabled. */}setLoaded(true);}, [key]);
  useEffect(() => {if(loaded) {try {localStorage.setItem(`homepage-demo:v1:${key}`,JSON.stringify(value));} catch {/* Demo works without persistence. */}}}, [key,value,loaded]);
  return [value,setValue];
}

export function DemoFooter({locale, slug, name}: {locale: Locale; slug: string; name: string}) {
  return <div className="demo-library-footer"><span>{t(locale, 'Fictional business. Homepage demo.', 'نشاط تجاري خيالي. نموذج للصفحة الرئيسية.')}</span><nav aria-label={t(locale,'Demo navigation','تصفح النموذج')}><a href={galleryUrl(locale)}>{t(locale,'All homepage designs','كل تصاميم الصفحات')}</a><a href={quoteUrl(locale,slug,name)}>{t(locale,'Customize this design','تخصيص هذا التصميم')}</a><a href={templateUrl(locale === 'ar' ? 'en' : 'ar',slug)} lang={locale === 'ar' ? 'en' : 'ar'}>{locale === 'ar' ? 'English' : 'العربية'}</a></nav></div>;
}
