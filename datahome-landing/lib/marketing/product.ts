import en from '@/messages/en.json';
import fr from '@/messages/fr.json';
import es from '@/messages/es.json';
import nl from '@/messages/nl.json';
import de from '@/messages/de.json';
import pl from '@/messages/pl.json';
export const productLocales = ['en','fr','es','nl','de','pl'] as const;
export type ProductLocale = typeof productLocales[number];
export type ProductCopy = typeof en.product;
export const productCopy = {en:en.product,fr:fr.product,es:es.product,nl:nl.product,de:de.product,pl:pl.product} as Record<ProductLocale,ProductCopy>;
export function hasProductCopy(locale:string): locale is ProductLocale {return productLocales.includes(locale as ProductLocale);}
