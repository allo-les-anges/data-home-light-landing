import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPages";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale } from "@/lib/i18n/locales";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = getDictionary(locale).legalPage;
  if (!copy) return { robots: { index: false, follow: true } };
  return { title: copy.metaTitle, description: copy.metaDescription, alternates: { canonical: `/${locale}/legal`, languages: { en: "/en/legal", fr: "/fr/legal" } }, openGraph: { title: copy.metaTitle, description: copy.metaDescription, url: `/${locale}/legal` } };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = getDictionary(locale);
  if (messages.legalPage) return <LegalPage copy={messages.legalPage} />;
  return <section className="dh-container dh-pending"><h1>{messages.chrome.legal}</h1><h2>{messages.chrome.pending}</h2><p>{messages.chrome.legalPending}</p><Link href={`/${locale}`}>{messages.chrome.backHome} →</Link></section>;
}
