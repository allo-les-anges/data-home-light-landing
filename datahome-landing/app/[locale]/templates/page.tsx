import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/locales';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { templateCopy } from '@/lib/marketing/templates';
import { ImageWheel } from '@/components/templates/ImageWheel';
const templateLocales = ['en','fr','es','nl','de','pl'] as const;
type TemplatePageLocale = typeof templateLocales[number];
function isTemplateLocale(l: string): l is TemplatePageLocale { return templateLocales.includes(l as TemplatePageLocale); }
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;if(!isLocale(locale))notFound();
 if(!isTemplateLocale(locale))return {robots:{index:false,follow:true}};
 const c=templateCopy[locale];return {title:c.metaTitle,description:c.metaDescription,alternates:{canonical:`/${locale}/templates`,languages:{en:'/en/templates',fr:'/fr/templates'}}};
}
export default async function Page({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params;if(!isLocale(locale))notFound();
 if(isTemplateLocale(locale))return <Suspense><ImageWheel locale={locale}/></Suspense>;
 const m=getDictionary(locale);return <section className="dh-container dh-pending"><h1>{m.navigation.templates}</h1><h2>{m.chrome.pending}</h2><p>{m.chrome.pendingBody}</p><Link href={'/'+locale}>{m.chrome.backHome} →</Link></section>;
}
