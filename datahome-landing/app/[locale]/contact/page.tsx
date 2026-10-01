import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContactPage } from '@/components/contact/ContactPage';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale } from '@/lib/i18n/locales';
type ContactPageLocale = 'en'|'fr'|'es'|'nl'|'de'|'pl';
const contactLocales: ContactPageLocale[] = ['en','fr','es','nl','de','pl'];
function isContactLocale(l: string): l is ContactPageLocale { return contactLocales.includes(l as ContactPageLocale); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (!isContactLocale(locale)) return { robots: { index: false, follow: true } };
  const copy = getDictionary(locale).contactPage!;
  return { title: copy.metaTitle, description: copy.metaDescription, alternates: { canonical: `/${locale}/contact`, languages: { en: '/en/contact', fr: '/fr/contact' } }, openGraph: { title: copy.metaTitle, description: copy.metaDescription, url: `/${locale}/contact` } };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = getDictionary(locale);
  if (isContactLocale(locale)) return <ContactPage locale={locale} copy={messages.contactPage!} />;
  return <section className="dh-container dh-pending"><h1>{messages.navigation.contact}</h1><h2>{messages.chrome.pending}</h2><p>{messages.chrome.pendingBody}</p><Link href={'/' + locale}>{messages.chrome.backHome} →</Link></section>;
}
