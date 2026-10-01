import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale } from '@/lib/i18n/locales';
export function proxy(request: NextRequest) {
 const path = request.nextUrl.pathname;
 if (path === '/') { const url = request.nextUrl.clone(); url.pathname = '/' + defaultLocale; return NextResponse.redirect(url); }
 const first = path.split('/')[1];
 const headers = new Headers(request.headers);
 headers.set('x-datahome-locale', path === '/fr-be' ? 'fr' : isLocale(first) ? first : defaultLocale);
 return NextResponse.next({request:{headers}});
}
export const config = {matcher:['/((?!api|_next|.*\\.).*)']};
