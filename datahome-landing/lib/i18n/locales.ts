export const locales = ['en','fr','es','de','nl','pt','ru','pl'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'en';
export const languageNames: Record<Locale,string> = {en:'English',fr:'Français',es:'Español',de:'Deutsch',nl:'Nederlands',pt:'Português',ru:'Русский',pl:'Polski'};
export const displayLocales = ['en','fr','es','nl','de','pl'] as const;
export type DisplayLocale = typeof displayLocales[number];
export function isLocale(value: string): value is Locale { return (locales as readonly string[]).includes(value); }
export function localizedPath(path: string, locale: Locale): string {
 const url = new URL(path, 'https://data-home.app');
 const segments = url.pathname.split('/').filter(Boolean);
 if (segments[0] && isLocale(segments[0])) segments.shift();
 return '/' + [locale,...segments].join('/') + url.search + url.hash;
}
