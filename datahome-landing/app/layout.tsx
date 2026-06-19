import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SiteChrome } from "@/components/layout/SiteChrome"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Data Home - Your agency online, selling in 24 hours",
  description:
    "Premium SaaS for real estate agencies: websites, templates, XML feeds, property manager, AI chatbot and lead workflows.",
  metadataBase: new URL("https://data-home.app"),
  openGraph: {
    title: "Data Home - Your agency online, selling in 24 hours",
    description: "Launch a premium real estate agency website with XML feeds, modules and dashboards.",
    url: "https://data-home.app",
    siteName: "Data Home",
    type: "website",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.variable}>
      <body className="font-sans antialiased">
        <Analytics />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  )
}
