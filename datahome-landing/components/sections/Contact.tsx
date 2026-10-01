"use client";

import { ContactForm } from '@/components/contact/ContactForm';
import { useLocale } from '@/components/providers/LocaleProvider';
import en from '@/messages/en.json';
import fr from '@/messages/fr.json';

export function Contact() {
  const { locale } = useLocale();
  const copy = locale === 'fr' ? fr.contactPage : en.contactPage;
  return <section id="contact" className="bg-[#080B1D] py-24 md:py-32"><div className="dh-container grid gap-10 lg:grid-cols-[1fr_520px] lg:items-center"><div><h2 className="max-w-2xl text-4xl font-medium leading-tight tracking-[-.045em] text-white md:text-6xl">{copy.home.title}</h2><p className="mt-6 max-w-xl text-base leading-[1.85] text-slate-400">{copy.home.body}</p></div><ContactForm locale={locale === 'fr' ? 'fr' : 'en'} copy={copy.form} source="landing_contact_form" /></div></section>;
}
