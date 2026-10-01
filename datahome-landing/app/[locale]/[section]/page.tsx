import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isLocale } from '@/lib/i18n/locales';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { pendingPages } from '@/lib/i18n/navigation';
// Phase 2 route shells only. Replace in the dedicated content phases.
export const metadata = {robots:{index:false,follow:true}};
export default async function PendingPage({params}: {params:Promise<{locale:string;section:string}>}) {
 const {locale,section}=await params;if(!isLocale(locale)||!(pendingPages as readonly string[]).includes(section))notFound();
 const m=getDictionary(locale);const name=section in m.navigation?m.navigation[section as keyof typeof m.navigation]:m.chrome[section as 'faq'|'privacy'|'legal'];
 return <section className="dh-container dh-pending"><h1>{name}</h1><h2>{m.chrome.pending}</h2><p>{section==='privacy'||section==='legal'?m.chrome.legalPending:m.chrome.pendingBody}</p><Link href={'/'+locale}>{m.chrome.backHome} →</Link></section>;
}
