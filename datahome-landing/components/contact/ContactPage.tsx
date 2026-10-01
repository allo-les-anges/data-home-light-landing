import Link from 'next/link';
import { ContactForm, type ContactFormCopy } from './ContactForm';
import s from './ContactPage.module.css';

type ContactPageCopy = { metaTitle: string; metaDescription: string; hero: { eyebrow: string; title: string; body: string; }; topics: { eyebrow: string; title: string; body: string; items: string[]; }; privacy: string; form: ContactFormCopy; };

const privacyLabel: Record<string, string> = {fr:'Confidentialité',nl:'Privacy',de:'Datenschutz',es:'Privacidad',pl:'Prywatność'};
export function ContactPage({ locale, copy }: { locale: 'en' | 'fr' | 'es' | 'nl' | 'de' | 'pl'; copy: ContactPageCopy }) {
  return <article className={s.page}><header className={s.hero} aria-labelledby="contact-title"><p className={s.eyebrow}>{copy.hero.eyebrow}</p><h1 id="contact-title">{copy.hero.title}</h1><p>{copy.hero.body}</p></header><section className={s.body} aria-labelledby="topics-title"><div className={s.topics}><p className={s.eyebrow}>{copy.topics.eyebrow}</p><h2 id="topics-title">{copy.topics.title}</h2><p>{copy.topics.body}</p><ul>{copy.topics.items.map(item => <li key={item}>{item}</li>)}</ul></div><div><ContactForm locale={locale} copy={copy.form} /><aside className={s.privacy}><span aria-hidden="true" /><p>{copy.privacy} <Link href={`/${locale}/privacy`}>{privacyLabel[locale] ?? 'Privacy'}</Link>.</p></aside></div></section></article>;
}
