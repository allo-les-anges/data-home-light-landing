import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Votre agence immobilière en Espagne — data-home.app",
  description:
    "Site multilingue pour agences françaises et belges actives en Espagne. Opérationnel en 24h. Essai gratuit 15 jours.",
}

const trialHref = "https://datahome.vercel.app/register"
const demoHref = "https://datahome.vercel.app/demo"

const trustIndicators = [
  "Site en français, espagnol et néerlandais",
  "Vos annonces synchronisées automatiquement",
  "Visible sur Google.fr et Google.be en 24h",
]

const features = [
  {
    title: "Votre site à votre marque",
    text: "Votre domaine, votre logo, vos couleurs. Disponible en français, espagnol, néerlandais et anglais dès le premier jour.",
  },
  {
    title: "Vos biens sans effort",
    text: "Connectez votre flux XML depuis Idealista, Kyero ou HabiHub. Vos annonces s'affichent automatiquement — sans copier-coller.",
  },
  {
    title: "Google vous trouve",
    text: "SEO optimisé dans chaque langue. Vos clients belges et français trouvent vos biens espagnols directement sur Google.",
  },
]

export default function FrBeCampaignPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#080B1D] text-white">
      <header className="dh-container flex h-20 items-center">
        <Link href="/fr-be" aria-label="data-home.app" className="inline-flex">
          <Image
            src="/images/DH_V2.png"
            alt="data-home.app"
            width={220}
            height={72}
            className="h-11 w-auto"
            priority
          />
        </Link>
      </header>

      <section className="relative">
        <div className="absolute inset-x-0 top-[-160px] h-[520px] bg-[radial-gradient(circle_at_18%_12%,rgba(24,161,206,.26),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(239,75,90,.24),transparent_34%)]" />
        <div className="dh-container relative pb-12 pt-10 sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-balance text-4xl font-black leading-[1.06] tracking-normal text-white sm:text-5xl lg:text-7xl">
              Vos clients veulent acheter en Espagne. Sont-ils sur votre site ?
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-pretty text-base leading-8 text-white/72 sm:text-lg lg:text-xl lg:leading-9">
              Les agences françaises et belges perdent chaque année des mandats au profit d'agences espagnoles locales.
              data-home.app vous donne une vitrine en Espagne, à votre marque, visible sur Google.fr et Google.be —
              opérationnelle en 24 heures.
            </p>
            <div className="mt-9 flex flex-col items-center gap-4">
              <Link
                href={trialHref}
                className="dh-button-gradient inline-flex min-h-14 w-full max-w-md items-center justify-center rounded-full px-7 py-4 text-center text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:shadow-[0_22px_56px_rgba(239,75,90,.32)] sm:w-auto sm:text-lg"
              >
                Démarrer mon essai gratuit — 15 jours
              </Link>
              <Link href={demoHref} className="text-sm font-semibold text-white/58 underline-offset-4 transition hover:text-white hover:underline">
                Voir une démo d'abord
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="dh-container pb-12 sm:pb-16">
        <div className="grid gap-3 rounded-[8px] border border-white/10 bg-white/[.04] p-4 shadow-[0_24px_90px_rgba(0,0,0,.25)] backdrop-blur md:grid-cols-3 md:p-5">
          {trustIndicators.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-[8px] border border-white/8 bg-white/[.035] px-4 py-4">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#32B55E]/15 text-sm font-black text-[#32B55E]">
                ✓
              </span>
              <p className="text-sm font-bold leading-6 text-white/82">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dh-container pb-14 sm:pb-20">
        <figure className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[.04] p-2 shadow-[0_34px_110px_rgba(0,0,0,.38)]">
            <Image
              src="/images/modules/crm_sync.png"
              alt="Dashboard data-home.app"
              width={1440}
              height={900}
              className="h-auto w-full rounded-[6px]"
              sizes="(max-width: 768px) 92vw, 980px"
              priority
            />
          </div>
          <figcaption className="mt-4 text-center text-sm font-medium text-white/50">
            Dashboard data-home.app — gérez votre site depuis un seul endroit
          </figcaption>
        </figure>
      </section>

      <section className="dh-container pb-14 sm:pb-20">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-[8px] border border-white/10 bg-white/[.055] p-6 shadow-[0_22px_70px_rgba(0,0,0,.22)]">
              <h2 className="text-xl font-black text-white">{feature.title}</h2>
              <p className="mt-4 text-sm leading-7 text-white/66">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="dh-container pb-16 sm:pb-24">
        <div className="mx-auto grid max-w-4xl gap-6 rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,rgba(24,161,206,.12),rgba(215,105,169,.10))] p-6 shadow-[0_28px_90px_rgba(0,0,0,.28)] sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
          <Image
            src="/images/Elena Rodriguez.jpeg"
            alt="Elena Rodriguez"
            width={112}
            height={112}
            className="h-20 w-20 rounded-full object-cover ring-2 ring-white/18 sm:h-24 sm:w-24"
          />
          <blockquote>
            <p className="text-xl font-bold leading-8 text-white sm:text-2xl sm:leading-9">
              “Livré en 36h, un site magnifique. Mes clients adorent la version espagnole et française.”
            </p>
            <footer className="mt-4 text-sm font-semibold text-white/58">Elena Rodriguez — Directrice, Riviera Homes</footer>
          </blockquote>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/24">
        <div className="dh-container py-14 text-center sm:py-20">
          <h2 className="text-balance text-3xl font-black leading-tight text-white sm:text-5xl">
            Prêt à ne plus perdre ces clients ?
          </h2>
          <div className="mt-8">
            <Link
              href={trialHref}
              className="dh-button-gradient inline-flex min-h-14 w-full max-w-md items-center justify-center rounded-full px-7 py-4 text-center text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:shadow-[0_22px_56px_rgba(239,75,90,.32)] sm:w-auto sm:text-lg"
            >
              Démarrer mon essai gratuit — 15 jours
            </Link>
          </div>
          <p className="mt-5 text-sm font-medium text-white/50">
            Sans carte bancaire · Annulable à tout moment · Opérationnel en 24h
          </p>
        </div>
      </section>

      <footer className="dh-container py-8 text-center text-sm font-medium text-white/45">
        Une question ? Écrivez-nous : info@data-home.app
      </footer>
    </div>
  )
}
