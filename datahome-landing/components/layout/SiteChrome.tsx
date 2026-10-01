"use client"

import { useEffect } from "react"
import { LocaleProvider } from "@/components/providers/LocaleProvider"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale } from "@/lib/i18n/locales"
import { usePathname } from "next/navigation"
import { CookieConsent } from "@/components/layout/CookieConsent"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { ConsentAwareAnalytics } from "@/components/layout/ConsentAwareAnalytics"

export function SiteChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname() ?? "/en"
  const candidate = pathname.split("/")[1];
  const locale = isLocale(candidate) ? candidate : "en";
  useEffect(() => { document.documentElement.lang = locale }, [locale]);
  return (
    <LocaleProvider locale={locale} messages={getDictionary(locale)}><ThemeProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
      <ConsentAwareAnalytics />
    </ThemeProvider></LocaleProvider>
  )
}
