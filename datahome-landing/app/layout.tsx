import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "DATAhome — Votre agence immobilière en ligne en 48h",
  description:
    "Créez le site de votre agence immobilière en 48h. Connecté à HabiHub, Inmovilla, Witei et Casafari. Templates premium, SEO optimisé, domaine personnalisé.",
  keywords: [
    "site agence immobilière",
    "logiciel immobilier",
    "HabiHub",
    "CRM immobilier",
    "création site immobilier",
    "DATAhome",
  ],
  authors: [{ name: "DATAhome", url: "https://data-home.app" }],
  creator: "DATAhome",
  publisher: "DATAhome",
  metadataBase: new URL("https://data-home.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DATAhome — Votre agence immobilière en ligne en 48h",
    description:
      "Créez le site de votre agence immobilière en 48h. Connecté aux meilleurs CRM du marché.",
    url: "https://data-home.app",
    siteName: "DATAhome",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DATAhome — Votre agence immobilière en ligne en 48h",
    description: "Créez le site de votre agence immobilière en 48h. Connecté à HabiHub & co.",
    creator: "@datahome",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-[hsl(var(--background))] font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
