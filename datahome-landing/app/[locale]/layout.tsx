import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n/locales';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
export default async function LocaleLayout({children,params}: {children:React.ReactNode;params:Promise<{locale:string}>}) {
 const {locale} = await params;
 if (!isLocale(locale)) notFound();
 return <LocaleProvider locale={locale} messages={getDictionary(locale)}>{children}</LocaleProvider>;
}
