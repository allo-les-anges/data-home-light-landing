"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';
import { consentStorageKey } from '@/lib/marketing/legal';
export function CookieConsent(){const {locale,messages}=useLocale();const [visible,setVisible]=useState(false);const panel=useRef<HTMLElement>(null);const trigger=useRef<HTMLElement|null>(null);
 useEffect(()=>{const open=()=>{trigger.current=document.activeElement as HTMLElement;setVisible(true);};window.addEventListener('datahome:cookie-preferences',open);let timer:number|undefined;try{if(!localStorage.getItem(consentStorageKey))timer=window.setTimeout(()=>setVisible(true),650);}catch{}return()=>{window.removeEventListener('datahome:cookie-preferences',open);window.clearTimeout(timer);};},[]);
 useEffect(()=>{if(visible&&trigger.current)panel.current?.focus();},[visible]);
 function close(){setVisible(false);trigger.current?.focus();}
 function save(choice:'all'|'essential'){try{localStorage.setItem(consentStorageKey,JSON.stringify({choice,acceptedAt:new Date().toISOString()}));}catch{}window.dispatchEvent(new CustomEvent('datahome:consent-change',{detail:{choice}}));if(choice==='essential'){window.location.reload();return;}close();}
 if(!visible)return null;
 return <section ref={panel} tabIndex={-1} role="dialog" aria-modal="false" aria-labelledby="cookie-title" className="dh-cookie-panel" onKeyDown={event=>{if(event.key==='Escape')close();}}><div className="dh-cookie-heading"><h2 id="cookie-title">{messages.chrome.cookies}</h2><button type="button" aria-label={messages.chrome.close} onClick={close}>×</button></div><p>{messages.chrome.cookieBody}</p><Link href={'/'+locale+'/privacy'}>{messages.chrome.privacy}</Link><div className="dh-cookie-actions"><button type="button" onClick={()=>save('essential')}>{messages.chrome.essential}</button><button type="button" onClick={()=>save('all')}>{messages.chrome.acceptAll}</button></div></section>;
}
