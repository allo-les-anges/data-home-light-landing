"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/components/providers/LocaleProvider';
import { commercial } from '@/lib/marketing/commercial';
import { pagePath } from '@/lib/i18n/navigation';
export function Footer(){const {locale,messages}=useLocale();return <footer className="dh-site-footer"><div className="dh-container"><Link href={pagePath(locale,'home')} className="dh-wordmark"><Image src="/data-home-footer-logo.png" alt="DATAhome" width={180} height={45} className="h-auto w-[160px]"/></Link><p className="dh-footer-promise">{messages.promise.replace('{hours}',String(commercial.deliveryHours))}</p><nav aria-label={messages.chrome.footerNav}>{(['product','templates','pricing','partners','resellers','contact'] as const).map(page=><Link href={pagePath(locale,page)} key={page}>{messages.navigation[page]}</Link>)}{(['faq','privacy','legal'] as const).map(page=><Link href={pagePath(locale,page)} key={page}>{messages.chrome[page]}</Link>)}<button type="button" onClick={()=>window.dispatchEvent(new Event('datahome:cookie-preferences'))}>{messages.chrome.cookies}</button></nav><p className="dh-copyright">© {new Date().getFullYear()} DATAhome. {messages.chrome.rights}</p></div></footer>}
