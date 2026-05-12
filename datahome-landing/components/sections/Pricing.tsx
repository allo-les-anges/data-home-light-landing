"use client"

import { motion } from "framer-motion"
import { Check, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/variants"

const plans = [
  {
    name: "Essential",
    price: 49,
    description: "Pour lancer un site agence propre avec gestion manuelle des biens.",
    featured: false,
    features: [
      "Site agence public inclus",
      "Property Manager manuel",
      "Ajout, modification et suppression de biens",
      "Upload photos et videos",
      "Biens a vendre et biens a louer",
      "Mini CRM Leads inclus",
      "Bouton WhatsApp",
      "6 langues incluses: FR, EN, NL, ES, PL, AR",
      "Templates de base inclus",
      "Jusqu'a 500 biens manuels",
      "1 utilisateur",
    ],
    cta: "Start Essential",
    ctaHref: "#contact",
  },
  {
    name: "Pro",
    price: 99,
    description: "Le plan recommande pour les agences qui veulent automatiser et convertir.",
    featured: true,
    features: [
      "Tout Essential",
      "Property Manager avance",
      "1 flux XML inclus",
      "Biens XML illimites",
      "Generateur de landing pages",
      "Chatbot IA inclus",
      "Video hero incluse",
      "5 utilisateurs",
      "Support prioritaire",
    ],
    cta: "Start Pro",
    ctaHref: "#contact",
  },
  {
    name: "Premium",
    price: 149,
    description: "Pour les agences qui veulent un dispositif complet et evolutif.",
    featured: false,
    features: [
      "Tout Pro",
      "2 flux XML inclus",
      "Landing pages illimitees",
      "Chatbot IA avec quota superieur",
      "SEO des qu'il sera disponible",
      "Visites immersives en beta quand finalisees",
      "10 utilisateurs",
      "Accompagnement renforce",
    ],
    cta: "Talk to us",
    ctaHref: "#contact",
  },
]

const addons = [
  { name: "Flux XML supplementaire", price: "50 EUR / mois", detail: "Pour connecter un flux immobilier additionnel." },
  { name: "Chatbot IA seul", price: "39 EUR / mois", detail: "Qualification automatique et lien avec le Mini CRM." },
  { name: "Generateur de landing pages seul", price: "49 EUR / mois", detail: "Pages dediees pour biens, projets ou developpements." },
  { name: "Video hero", price: "9 EUR / mois", detail: "Remplace l'image hero par une video sur la homepage." },
  { name: "Langue supplementaire", price: "2 EUR / mois", detail: "Apres les 6 langues incluses." },
  { name: "Templates premium", price: "390-790 EUR", detail: "Achat ponctuel selon le template choisi." },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p
            variants={fadeInUp}
            custom={0}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#D769A9]"
          >
            Pricing
          </motion.p>
          <motion.h2 variants={fadeInUp} custom={1} className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Clear pricing for every agency setup
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="mx-auto max-w-2xl text-center text-lg text-[hsl(var(--muted-foreground))]"
          >
            Website, Property Manager, Mini CRM and modules are priced separately from XML feed supply, so each agency
            only pays for the workflow it actually needs.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid items-start gap-6 md:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.22, ease: "easeOut" } }}
              className={plan.featured ? "md:-mt-4" : ""}
            >
              <Card
                className={`relative overflow-hidden transition-shadow hover:shadow-xl ${
                  plan.featured
                    ? "border-[#D769A9] shadow-lg shadow-pink-500/10"
                    : "hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
                }`}
              >
                {plan.featured && (
                  <>
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#D769A9] to-[#EF4B5A]" />
                    <div className="absolute right-4 top-4">
                      <span className="rounded-full bg-gradient-to-r from-[#D769A9] to-[#EF4B5A] px-2.5 py-1 text-xs font-bold text-white">
                        Recommended
                      </span>
                    </div>
                  </>
                )}

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}EUR</span>
                      <span className="text-sm text-gray-400 dark:text-gray-500">/month</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">Excl. VAT - no long-term commitment</p>
                  </div>

                  <a
                    href={plan.ctaHref}
                    className={`block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-all ${
                      plan.featured
                        ? "bg-gradient-to-r from-[#D769A9] to-[#EF4B5A] text-white shadow-sm shadow-pink-500/20"
                        : "border border-gray-200 text-gray-700 hover:border-[#D769A9] hover:text-[#D769A9] dark:border-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {plan.cta}
                  </a>

                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-[#EF4B5A]" : "text-gray-400 dark:text-neutral-600"}`}
                          strokeWidth={2.5}
                        />
                        <span className="text-gray-600 dark:text-neutral-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-10 rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
        >
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#18A1CE]">Add-ons</p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Build your SaaS stack module by module</h3>
            </div>
            <p className="max-w-xl text-sm text-gray-500 dark:text-neutral-400">
              XML feed supply is billed separately. Immersive tours and SEO are presented as roadmap modules until fully
              available in the application.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {addons.map((addon) => (
              <div key={addon.name} className="rounded-2xl border border-gray-100 bg-white p-4 dark:border-white/10 dark:bg-black/20">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#18A1CE] to-[#D769A9] text-white">
                    <Plus className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{addon.name}</p>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{addon.price}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-neutral-400">{addon.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-sm text-[hsl(var(--muted-foreground))]"
        >
          Need a custom offer for a network, several XML suppliers or a white-label rollout?{" "}
          <a href="#contact" className="text-[#D769A9] underline-offset-2 hover:underline">
            Contact us
          </a>
          .
        </motion.p>
      </div>
    </section>
  )
}
