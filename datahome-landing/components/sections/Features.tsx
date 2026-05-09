"use client"

import { motion } from "framer-motion"
import {
  Globe,
  Link2,
  Search,
  LayoutTemplate,
  Zap,
  BarChart3,
  Mail,
  RefreshCw,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/variants"

interface Feature {
  Icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    Icon: Globe,
    title: "Domaine personnalisé",
    description: "Votre agence sur votre-agence.com ou agence.data-home.app. Configuration DNS incluse.",
  },
  {
    Icon: Link2,
    title: "Synchronisation CRM",
    description: "Vos biens s'importent automatiquement depuis HabiHub, Inmovilla, Witei ou Casafari.",
  },
  {
    Icon: Search,
    title: "SEO technique inclus",
    description: "Balises méta, sitemap XML, schema.org immobilier, Core Web Vitals optimisés.",
  },
  {
    Icon: LayoutTemplate,
    title: "Templates premium",
    description: "6 designs conçus pour l'immobilier. Adaptatifs mobile-first, sans code à écrire.",
  },
  {
    Icon: Zap,
    title: "Livraison en 48h",
    description: "Votre site est en ligne 48h après la commande. Configuré, testé, prêt à convertir.",
  },
  {
    Icon: BarChart3,
    title: "Analytics & stats",
    description: "Tableau de bord avec visiteurs, leads, performances des annonces. Tout en un.",
  },
  {
    Icon: Mail,
    title: "Formulaires & leads",
    description: "Capture de contacts, prise de RDV, alertes immobilières. Leads directement dans votre CRM.",
  },
  {
    Icon: RefreshCw,
    title: "Mises à jour auto",
    description: "Nouvelles fonctionnalités et correctifs déployés sans action de votre part.",
  },
  {
    Icon: Users,
    title: "Support dédié",
    description: "Chat, email ou visio. Une équipe humaine qui connaît l'immobilier pour vous accompagner.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header animates as a group so all three lines feel connected */}
        <motion.div
          className="mx-auto max-w-2xl text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p
            variants={fadeInUp}
            custom={0}
            className="text-sm font-semibold uppercase tracking-[0.12em] text-[#1d4ed8] mb-3"
          >
            Fonctionnalités
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Tout ce dont votre agence a besoin
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto text-center"
          >
            Un site pro, des intégrations puissantes, zéro maintenance. Vous faites de l&apos;immobilier,
            pas du dev.
          </motion.p>
        </motion.div>

        {/* `staggerContainer` on the grid triggers children in sequence as they scroll into view */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              // Entrance animation comes from the staggerContainer parent
              variants={staggerItem}
              // Hover state is separate — it names its own "rest"/"hover" states
              // so child motion elements (the icon) can pick them up automatically.
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="group relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 cursor-default overflow-hidden"
              style={{ boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.04)" }}
            >
              {/* Faint blue tint fills the card background on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl"
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1, transition: { duration: 0.3 } },
                }}
                style={{
                  background:
                    "radial-gradient(ellipse at top left, hsl(221 83% 53% / 0.06), transparent 70%)",
                }}
              />

              {/* Icon inherits the "hover" variant from the card above — no whileHover needed here.
                  Framer Motion propagates variant names down the tree automatically. */}
              <motion.div
                className="relative mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
                variants={{
                  rest: {
                    backgroundColor: "hsl(239 84% 67% / 0.07)",
                    color: "#1d4ed8",
                    scale: 1,
                    rotate: 0,
                    transition: { duration: 0.25, ease: "easeOut" },
                  },
                  hover: {
                    backgroundColor: "#1d4ed8",
                    color: "#ffffff",
                    scale: 1.12,
                    rotate: 6,
                    transition: { duration: 0.25, ease: "easeOut" },
                  },
                }}
              >
                <feature.Icon className="h-5 w-5" />
              </motion.div>

              <h3 className="relative mb-2 font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="relative text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent bar grows from left to right on hover — a small detail
                  that makes the interaction feel more intentional than a simple shadow. */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-[#1d4ed8] rounded-full"
                variants={{
                  rest: { width: 0, transition: { duration: 0.25 } },
                  hover: { width: "100%", transition: { duration: 0.35, ease: "easeOut" } },
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
