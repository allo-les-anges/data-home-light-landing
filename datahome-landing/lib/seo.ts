import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { displayLocales, locales, type Locale } from '@/lib/i18n/locales';
import { hasProductCopy } from '@/lib/marketing/product';
import { templateCopy } from '@/lib/marketing/templates';

/**
 * Single source of truth for canonical URLs, hreflang alternates and the
 * sitemap. A page/locale pair is only exposed when real translated content
 * exists for it, so crawlers never see "coming soon" shells as alternates.
 */

export const SITE_URL = 'https://data-home.app';
export const SITE_NAME = 'Data Home';
export const DEFAULT_LOCALE: Locale = 'en';

export type PageKey =
  | 'home'
  | 'product'
  | 'templates'
  | 'pricing'
  | 'partners'
  | 'contact'
  | 'resellers'
  | 'privacy'
  | 'legal';

export const pageKeys: readonly PageKey[] = [
  'home',
  'product',
  'templates',
  'pricing',
  'partners',
  'contact',
  'resellers',
  'privacy',
  'legal',
];

type DictionaryKey = 'pricing' | 'partnersPage' | 'contactPage' | 'resellerPage' | 'privacyPage' | 'legalPage';
const hasCopy = (locale: Locale, key: DictionaryKey) => Boolean(getDictionary(locale)[key]);

// Availability is derived from the content itself, not from a second list
// that could drift out of sync with the pages.
const availability: Record<PageKey, (locale: Locale) => boolean> = {
  home: (l) => (displayLocales as readonly string[]).includes(l),
  product: (l) => hasProductCopy(l),
  templates: (l) => l in templateCopy,
  pricing: (l) => hasCopy(l, 'pricing'),
  partners: (l) => hasCopy(l, 'partnersPage'),
  contact: (l) => hasCopy(l, 'contactPage'),
  resellers: (l) => hasCopy(l, 'resellerPage'),
  privacy: (l) => hasCopy(l, 'privacyPage'),
  legal: (l) => hasCopy(l, 'legalPage'),
};

export function localesFor(page: PageKey): Locale[] {
  return locales.filter(availability[page]);
}

export function pathFor(page: PageKey, locale: Locale): string {
  return page === 'home' ? `/${locale}` : `/${locale}/${page}`;
}

/** hreflang map (relative paths) including x-default, or undefined if no translation exists. */
export function languageAlternates(page: PageKey): Record<string, string> {
  const available = localesFor(page);
  const map: Record<string, string> = Object.fromEntries(available.map((l) => [l, pathFor(page, l)]));
  if (available.includes(DEFAULT_LOCALE)) map['x-default'] = pathFor(page, DEFAULT_LOCALE);
  return map;
}

export function alternatesFor(page: PageKey, locale: Locale): NonNullable<Metadata['alternates']> {
  const canonical = pathFor(page, locale);
  if (!localesFor(page).includes(locale)) return { canonical };
  return { canonical, languages: languageAlternates(page) };
}

/**
 * Next.js replaces (does not merge) a parent's `openGraph` when a page defines
 * its own, so every field a page needs must be set here, including `url`.
 */
export function openGraphFor(page: PageKey, locale: Locale, title: string, description?: string): NonNullable<Metadata['openGraph']> {
  return { title, description, url: pathFor(page, locale), siteName: SITE_NAME, type: 'website' };
}

const homeDescriptions: Partial<Record<Locale, string>> = {
  en: 'Premium SaaS for real estate agencies: websites, templates, XML feeds, property manager, AI chatbot and lead workflows.',
  fr: 'SaaS premium pour agences immobilières : site web, templates, flux XML, gestion des biens, chatbot IA et suivi des leads.',
  es: 'SaaS premium para agencias inmobiliarias: web, plantillas, feeds XML, gestor de propiedades, chatbot con IA y gestión de leads.',
  nl: 'Premium SaaS voor vastgoedkantoren: website, templates, XML-feeds, woningbeheer, AI-chatbot en leadbeheer.',
  de: 'Premium-SaaS für Immobilienagenturen: Website, Templates, XML-Feeds, Objektverwaltung, KI-Chatbot und Lead-Workflows.',
  pl: 'Platforma SaaS dla biur nieruchomości: strona internetowa, szablony, feedy XML, zarządzanie ofertami, chatbot AI i obsługa leadów.',
};

export function homeDescription(locale: Locale): string {
  return homeDescriptions[locale] ?? homeDescriptions[DEFAULT_LOCALE]!;
}
