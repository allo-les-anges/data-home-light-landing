import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PricingPage } from '@/components/pricing/PricingPage';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isLocale } from '@/lib/i18n/locales';
type PricingPageLocale = 'en'|'fr'|'es'|'nl'|'de'|'pl';
const pricingLocales: PricingPageLocale[] = ['en','fr','es','nl','de','pl'];
function isPricingLocale(l: string): l is PricingPageLocale { return pricingLocales.includes(l as PricingPageLocale); }
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params;
  if(!isLocale(locale))notFound();
  if(!isPricingLocale(locale))return {robots:{index:false,follow:true}};
  const copy=getDictionary(locale).pricing!;
  return {
    title:copy.metaTitle,
    description:copy.metaDescription,
    alternates:{canonical:`/${locale}/pricing`,languages:{en:'/en/pricing',fr:'/fr/pricing'}},
    openGraph:{title:copy.metaTitle,description:copy.metaDescription,url:`/${locale}/pricing`},
  };
}
export default async function Page({params}:{params:Promise<{locale:string}>}){
  const {locale}=await params;
  if(!isLocale(locale))notFound();
  const messages=getDictionary(locale);
  if(isPricingLocale(locale))return <PricingPage locale={locale} copy={messages.pricing!}/>;
  return <section className="dh-container dh-pending"><h1>{messages.navigation.pricing}</h1><h2>{messages.chrome.pending}</h2><p>{messages.chrome.pendingBody}</p><Link href={'/'+locale}>{messages.chrome.backHome} →</Link></section>;
}
