import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductPage } from '@/components/product/ProductPage';
import { hasProductCopy, productCopy } from '@/lib/marketing/product';
import { isLocale } from '@/lib/i18n/locales';
import { getDictionary } from '@/lib/i18n/dictionaries';
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))notFound();if(!hasProductCopy(locale))return {robots:{index:false,follow:true}};const c=productCopy[locale];return {title:c.metaTitle,description:c.metaDescription,alternates:{canonical:'/'+locale+'/product',languages:{en:'/en/product',fr:'/fr/product'}},openGraph:{title:c.metaTitle,description:c.metaDescription,url:'/'+locale+'/product'}};}
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();if(hasProductCopy(locale))return <ProductPage locale={locale}/>;const text=getDictionary(locale).productPending;return <section className="dh-container dh-pending"><h1>{getDictionary(locale).navigation.product}</h1><p>{text.message}</p><Link href="/en/product" hrefLang="en">{text.link} →</Link></section>;}
