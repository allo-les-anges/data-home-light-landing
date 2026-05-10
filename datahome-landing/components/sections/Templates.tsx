"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/variants"

const templates = [
  {
    name: "Riviera",
    tagline: "Luxe & bord de mer",
    market: ["Espagne", "Portugal", "France"],
    accent: "bg-sky-500",
    badge: "⭐ Populaire",
    badgeColor: "bg-white/20 text-white border-white/20",
    preview: { bg: "from-sky-800 via-blue-900 to-slate-900" },
  },
  {
    name: "Prestige",
    tagline: "Immobilier haut de gamme",
    market: ["France", "Belgique", "Suisse"],
    accent: "bg-[#1d4ed8]",
    badge: "🏆 Premium",
    badgeColor: "bg-white/20 text-white border-white/20",
    preview: { bg: "from-slate-900 to-blue-950" },
  },
  {
    name: "Urban",
    tagline: "Moderne & citadin",
    market: ["Toutes villes", "Neuf", "Investissement"],
    accent: "bg-slate-700",
    badge: "🏙️ Tendance",
    badgeColor: "bg-white/20 text-white border-white/20",
    preview: { bg: "from-zinc-900 to-slate-800" },
  },
  {
    name: "Soleil",
    tagline: "Chaud & méditerranéen",
    market: ["Andalousie", "Algarve", "Sicile"],
    accent: "bg-amber-500",
    badge: "☀️ Chaud",
    badgeColor: "bg-white/20 text-white border-white/20",
    preview: { bg: "from-orange-900 to-amber-800" },
  },
  {
    name: "Nordic",
    tagline: "Épuré & minimaliste",
    market: ["Pays nordiques", "UK", "Allemagne"],
    accent: "bg-indigo-500",
    badge: "❄️ Épuré",
    badgeColor: "bg-white/20 text-white border-white/20",
    preview: { bg: "from-indigo-900 to-violet-950" },
  },
  {
    name: "Verde",
    tagline: "Éco-responsable & nature",
    market: ["Rural", "Campagne", "Éco-habitat"],
    accent: "bg-emerald-600",
    badge: "🌿 Nature",
    badgeColor: "bg-white/20 text-white border-white/20",
    preview: { bg: "from-green-900 to-emerald-800" },
  },
]

function SimulatedSite({ template, large = false }: { template: (typeof templates)[0]; large?: boolean }) {
  return (
    <div className={cn("absolute inset-0 p-4", large && "p-6")}>
      {/* Nav */}
      <div className="flex items-center justify-between mb-4">
        <div className={cn("rounded bg-white/35", large ? "h-4 w-24" : "h-2.5 w-16")} />
        <div className="flex gap-2">
          {[1, 2].map((i) => (
            <div key={i} className={cn("rounded bg-white/15", large ? "h-3 w-12" : "h-2 w-8")} />
          ))}
          <div className={cn("rounded-md", template.accent, large ? "h-6 w-20 opacity-90" : "h-4 w-12 opacity-90")} />
        </div>
      </div>

      {/* Hero text blocks */}
      <div className="mb-4">
        <div className={cn("rounded-full bg-blue-400/40 mb-2", large ? "h-3 w-20" : "h-2 w-12")} />
        <div className={cn("rounded-lg bg-white/45 mb-1.5", large ? "h-6 w-64" : "h-3 w-32")} />
        <div className={cn("rounded-lg bg-white/30 mb-4", large ? "h-6 w-48" : "h-3 w-24")} />
        <div className="flex gap-2">
          <div className={cn("rounded-lg", template.accent, large ? "h-8 w-28 opacity-90" : "h-5 w-16 opacity-90")} />
          <div className={cn("rounded-lg border border-white/25", large ? "h-8 w-24" : "h-5 w-14")} />
        </div>
      </div>

      {/* Property cards */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl bg-white/8 border border-white/8 overflow-hidden"
          >
            <div className={cn("bg-gradient-to-br from-white/12 to-white/4", large ? "h-20" : "h-12")} />
            <div className="p-1.5 space-y-1">
              <div className={cn("w-3/4 rounded bg-white/25", large ? "h-2.5" : "h-1.5")} />
              <div className={cn("w-1/2 rounded bg-white/15", large ? "h-2" : "h-1.5")} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TemplateCard({
  template,
  index,
  featured = false,
}: {
  template: (typeof templates)[0]
  index: number
  featured?: boolean
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={
        featured
          ? { scale: 1.01, transition: { duration: 0.25, ease: "easeOut" } }
          : { y: -4, scale: 1.02, boxShadow: "0 24px 48px -8px rgb(0 0 0 / 0.14)", transition: { duration: 0.22, ease: "easeOut" } }
      }
      className={cn(
        "group relative rounded-2xl overflow-hidden border border-[hsl(var(--border))] shadow-sm",
        "hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/40",
        "transition-all duration-500",
        featured ? "lg:col-span-2 lg:row-span-2" : "",
      )}
    >
      {/* Preview area — full height for featured, fixed height for others */}
      <div
        className={cn(
          "relative overflow-hidden",
          `bg-gradient-to-br ${template.preview.bg}`,
          featured ? "h-full min-h-[464px]" : "h-44",
        )}
      >
        {/* Scalable inner content */}
        <div className="absolute inset-0 scale-100 group-hover:scale-105 transition-transform duration-700 ease-out">
          <SimulatedSite template={template} large={featured} />
        </div>

        {/* Subtle inner glow */}
        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-white/5 blur-2xl pointer-events-none" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <button
            className={cn(
              "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100",
              "transition-all duration-300 delay-75",
              "bg-white text-gray-900 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg",
              "hover:bg-gray-50 active:scale-95",
            )}
          >
            Explorer le template
          </button>
        </div>

        {/* Featured: info overlay at bottom */}
        {featured && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="flex items-end justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white">{template.name}</h3>
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border", template.badgeColor)}>
                    {template.badge}
                  </span>
                </div>
                <p className="text-sm text-white/70">{template.tagline}</p>
              </div>
              <div className="flex flex-wrap justify-end gap-1.5 max-w-[180px]">
                {template.market.map((m) => (
                  <span key={m} className="text-xs bg-white/15 border border-white/15 text-white/80 px-2 py-0.5 rounded-md">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Normal cards: info section below preview */}
      {!featured && (
        <div className="p-5 bg-[hsl(var(--card))]">
          <div className="flex items-start justify-between mb-1.5">
            <h3 className="font-bold text-gray-900 dark:text-white">{template.name}</h3>
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", "bg-gray-100 dark:bg-white/8 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/8")}>
              {template.badge}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-neutral-400 mb-3">{template.tagline}</p>
          <div className="flex flex-wrap gap-1.5">
            {template.market.map((m) => (
              <span key={m} className="text-xs bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-neutral-500 px-2 py-0.5 rounded-md">
                {m}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export function Templates() {
  return (
    <section id="templates" className="py-24 md:py-32 bg-gray-50/60 dark:bg-neutral-950/60">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-2xl text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p
            variants={fadeInUp}
            custom={0}
            className="text-sm font-semibold uppercase tracking-[0.12em] text-[#1d4ed8] mb-3"
          >
            Templates
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            6 designs premium
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto text-center"
          >
            Conçus pour convertir, pensés pour chaque marché. Personnalisables à votre image.
          </motion.p>
        </motion.div>

        {/* Bento grid — stagger à l'entrée */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[220px]"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {templates.map((template, i) => (
            <TemplateCard key={template.name} template={template} index={i} featured={i === 0} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center text-sm text-[hsl(var(--muted-foreground))]"
        >
          Tous les templates incluent : responsive design, dark mode, i18n, et optimisation des images.
        </motion.p>
      </div>
    </section>
  )
}
