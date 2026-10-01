import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PartnersPage } from '@/components/partners/PartnersPage';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale } from '@/lib/i18n/locales';
type PartnersPageLocale = 'en'|'fr'|'es'|'nl'|'de'|'pl';
const partnersLocales: PartnersPageLocale[] = ['en','fr','es','nl','de','pl'];
function isPartnersLocale(l: string): l is PartnersPageLocale { return partnersLocales.includes(l as PartnersPageLocale); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (!isPartnersLocale(locale)) return { robots: { index: false, follow: true } };
  const copy = getDictionary(locale).partnersPage!;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: `/${locale}/partners`, languages: { en: '/en/partners', fr: '/fr/partners' } },
    openGraph: { title: copy.metaTitle, description: copy.metaDescription, url: `/${locale}/partners` },
  };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = getDictionary(locale);
  if (isPartnersLocale(locale)) return <PartnersPage locale={locale} copy={messages.partnersPage!} />;
  return <section className="dh-container dh-pending"><h1>{messages.navigation.partners}</h1><h2>{messages.chrome.pending}</h2><p>{messages.chrome.pendingBody}</p><Link href={'/' + locale}>{messages.chrome.backHome} →</Link></section>;
}
