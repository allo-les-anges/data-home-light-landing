"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { displayLocales, languageNames, isLocale, localizedPath } from '@/lib/i18n/locales';
export function LanguageSwitcher({onChange}: {onChange?:()=>void}) {
 const {locale,messages} = useLocale(); const router=useRouter(); const pathname=(usePathname() ?? '/en');
 return <label className="dh-language"><span className="sr-only">{messages.chrome.language}</span><select value={locale} onChange={event=>{const next=event.target.value;if(isLocale(next)){router.push(localizedPath(pathname+window.location.search+window.location.hash,next));onChange?.();}}}>{displayLocales.map(code=><option key={code} value={code} lang={code}>{languageNames[code]}</option>)}</select></label>;
}
