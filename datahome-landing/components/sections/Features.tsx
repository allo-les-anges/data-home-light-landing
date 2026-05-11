"use client"

import { motion } from "framer-motion"
import {
  Globe,
  Link2,
  Search,
  LayoutTemplate,
  Mail,
  Bot,
  Languages,
  Video,
  Building2,
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
    title: "Site vitrine public",
    description: "Une homepage agence, des pages de biens, locations, contact et contenus légaux prêts pour la mise en ligne.",
  },
  {
    Icon: Link2,
    title: "Imports XML pilotés",
    description: "Associez les flux fournis par vos partenaires depuis AgencyDashboard et publiez les biens sur le site client.",
  },
  {
    Icon: Building2,
    title: "Property Manager",
    description: "Le client gère ses biens, ses locations, ses médias, ses vidéos et ses réglages depuis Mon Espace.",
  },
  {
    Icon: LayoutTemplate,
    title: "Templates personnalisables",
    description: "Templates gratuits et premium avec couleurs, typographies, style de vignettes, hero image ou vidéo.",
  },
  {
    Icon: Bot,
    title: "Chatbot IA",
    description: "Un assistant premium pour qualifier les visiteurs, limité à 20 requêtes par jour et par agence.",
  },
  {
    Icon: Mail,
    title: "Mini CRM Leads",
    description: "Les demandes issues du site et du chatbot arrivent dans un CRM simple, inclus dans l'offre premium.",
  },
  {
    Icon: Languages,
    title: "Langues additionnelles",
    description: "Ajoutez les langues dont votre agence a besoin, avec traduction des pages, cartes biens et détails.",
  },
  {
    Icon: Video,
    title: "Vidéo hero & visites immersives",
    description: "Modules pour mettre une vidéo en hero et ajouter des visites 360, Matterport ou liens immersifs aux biens.",
  },
  {
    Icon: Search,
    title: "SEO et domaine",
    description: "Domaine personnalisé, base SEO technique et module SEO avancé prévu pour accompagner la croissance.",
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
            Everything you need, aligné avec le produit réel
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto text-center"
          >
            DataHome couvre le workflow complet de l'agence : création du site, import des biens,
            personnalisation, leads, modules premium et accompagnement de publication.
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
