import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  Produit: [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Templates", href: "#templates" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Changelog", href: "#" },
  ],
  Intégrations: [
    { label: "HabiHub", href: "#" },
    { label: "Inmovilla", href: "#" },
    { label: "Witei", href: "#" },
    { label: "Casafari", href: "#" },
  ],
  Entreprise: [
    { label: "À propos", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Partenaires", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Légal: [
    { label: "Mentions légales", href: "/legal" },
    { label: "Confidentialité", href: "/privacy" },
    { label: "CGU", href: "#" },
    { label: "Support", href: "/support" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-5 block w-fit" aria-label="DATA HOME">
              <Image
                src="/data-home-footer-logo.png"
                alt="DATA HOME"
                width={320}
                height={75}
                className="h-auto w-48 max-w-full"
                priority={false}
              />
            </Link>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-xs">
              Votre agence immobilière en ligne en 24h. Connectée aux meilleurs CRM du marché.
            </p>
            <div className="mt-4 flex gap-3">
              {["linkedin", "twitter", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[#1d4ed8] hover:border-[#1d4ed8] transition-colors"
                  aria-label={social}
                >
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[#1d4ed8] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-8 sm:flex-row">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            &copy; {new Date().getFullYear()} DATAhome. Tous droits réservés.
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Fait avec passion pour les agences immobilières
          </p>
        </div>
      </div>
    </footer>
  )
}
