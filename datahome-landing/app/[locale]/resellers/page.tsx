import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ResellerPage } from '@/components/resellers/ResellerPage';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale } from '@/lib/i18n/locales';

type ResellerPageLocale = 'en' | 'fr' | 'es' | 'nl';
const resellerLocales: ResellerPageLocale[] = ['en', 'fr', 'es', 'nl'];
function isResellerLocale(l: string): l is ResellerPageLocale { return resellerLocales.includes(l as ResellerPageLocale); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  if (!isResellerLocale(locale)) return { robots: { index: false, follow: true } };
  const copy = getDictionary(locale).resellerPage!;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: { canonical: `/${locale}/resellers`, languages: { en: '/en/resellers', fr: '/fr/resellers', es: '/es/resellers', nl: '/nl/resellers' } },
    openGraph: { title: copy.metaTitle, description: copy.metaDescription, url: `/${locale}/resellers` },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = getDictionary(locale);
  if (isResellerLocale(locale)) return <ResellerPage locale={locale} copy={messages.resellerPage!} />;
  return (
    <section className="dh-container dh-pending">
      <h1>{messages.navigation.resellers}</h1>
      <h2>{messages.chrome.pending}</h2>
      <p>{messages.chrome.pendingBody}</p>
      <Link href={'/' + locale}>{messages.chrome.backHome} →</Link>
    </section>
  );
}
