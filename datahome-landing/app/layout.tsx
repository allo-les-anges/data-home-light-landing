import { headers } from "next/headers"
import { isLocale } from "@/lib/i18n/locales"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { SiteChrome } from "@/components/layout/SiteChrome"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

export const metadata: Metadata = {
  title: "DATAhome — Your agency. Online. In 24 hours.",
  description:
    "Premium SaaS for real estate agencies: websites, templates, XML feeds, property manager, AI chatbot and lead workflows.",
  metadataBase: new URL("https://data-home.app"),
  openGraph: {
    title: "DATAhome — Your agency. Online. In 24 hours.",
    description: "Launch a premium real estate agency website with XML feeds, modules and dashboards.",
    url: "https://data-home.app",
    siteName: "Data Home",
    type: "website",
  },
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const candidate = (await headers()).get("x-datahome-locale") ?? "en";
  const locale = isLocale(candidate) ? candidate : "en";
  return (
    <html lang={locale} suppressHydrationWarning className={cn("dark font-sans", geist.variable)}>
      <body className="font-sans antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
