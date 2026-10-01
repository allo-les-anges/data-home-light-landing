"use client";
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { primaryPages, pagePath } from '@/lib/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
export function Navbar(){
 const {locale,messages}=useLocale(); const pathname=(usePathname() ?? '/en'); const [open,setOpen]=useState(false); const button=useRef<HTMLButtonElement>(null);
 useEffect(()=>{if(!open)return; const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);button.current?.focus();}};document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape);},[open]);
 const links=primaryPages.map(page=>{const href=pagePath(locale,page);const active=page==='home'?pathname===href:pathname===href||pathname.startsWith(href+'/');return <Link key={page} href={href} aria-current={active?'page':undefined} onClick={()=>setOpen(false)}>{messages.navigation[page]}</Link>});
 const trial=<Link className="dh-trial" href="https://datahome.vercel.app/register">{messages.chrome.trial}</Link>;
 return <header className="dh-site-header"><nav className="dh-container dh-nav" aria-label={messages.chrome.mainNav}><Link className="dh-wordmark" href={pagePath(locale,'home')} aria-label="DATAhome"><Image src="/data-home-footer-logo.png" alt="DATAhome" width={180} height={45} className="h-auto w-[160px]"/></Link><div className="dh-desktop-links">{links}</div><div className="dh-desktop-actions"><LanguageSwitcher/>{trial}</div><button ref={button} className="dh-menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?messages.chrome.closeMenu:messages.chrome.openMenu} onClick={()=>setOpen(!open)}>{open?<X size={22}/>:<Menu size={22}/>}</button></nav><div id="mobile-navigation" className="dh-mobile-navigation" hidden={!open}><nav aria-label={messages.chrome.mainNav}>{links}<LanguageSwitcher onChange={()=>setOpen(false)}/>{trial}</nav></div></header>;
}
