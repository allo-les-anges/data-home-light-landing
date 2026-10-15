import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HomePage from '@/components/sections/HomePage';
import { isLocale } from '@/lib/i18n/locales';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { commercial } from '@/lib/marketing/commercial';
import { alternatesFor, homeDescription, openGraphFor } from '@/lib/seo';
export async function generateMetadata({params}: {params:Promise<{locale:string}>}): Promise<Metadata> {
 const {locale} = await params;
 if (!isLocale(locale)) notFound();
 const title = 'DATAhome — ' + getDictionary(locale).promise.replace('{hours}',String(commercial.deliveryHours));
 const description = homeDescription(locale);
 return {title, description, alternates: alternatesFor('home', locale), openGraph: openGraphFor('home', locale, title, description)};
}
export default HomePage;
