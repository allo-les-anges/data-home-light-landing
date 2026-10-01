"use client";
import { createContext, useContext } from 'react';
import type { Locale } from '@/lib/i18n/locales';
import type { Dictionary } from '@/lib/i18n/dictionaries';
const Context = createContext<{locale: Locale; messages: Dictionary} | null>(null);
export function LocaleProvider({locale,messages,children}: {locale:Locale;messages:Dictionary;children:React.ReactNode}) { return <Context.Provider value={{locale,messages}}>{children}</Context.Provider>; }
export function useLocale() { const value = useContext(Context); if (!value) throw new Error('LocaleProvider is required'); return value; }
