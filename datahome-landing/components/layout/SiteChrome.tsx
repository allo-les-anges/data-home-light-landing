"use client"

import { usePathname } from "next/navigation"
import { CookieConsent } from "@/components/layout/CookieConsent"
import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"
import { ThemeProvider } from "@/components/providers/ThemeProvider"

export function SiteChrome({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const isCampaignPage = pathname === "/fr-be"

  return (
    <ThemeProvider>
      {!isCampaignPage && <Navbar />}
      <main>{children}</main>
      {!isCampaignPage && <Footer />}
      {!isCampaignPage && <CookieConsent />}
    </ThemeProvider>
  )
}
