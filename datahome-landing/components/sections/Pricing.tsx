"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/variants"

const plans = [
  {
    name: "Silver",
    price: 50,
    description: "L'essentiel pour démarrer",
    featured: false,
    features: [
      "1 site d'agence",
      "Template standard inclus",
      "Domaine data-home.app inclus",
      "Synchronisation 1 CRM",
      "Jusqu'à 50 biens",
      "Formulaires de contact",
      "Support email",
      "Certificat SSL",
    ],
    cta: "Démarrer Silver",
    ctaHref: "#",
  },
  {
    name: "Gold",
    price: 129,
    description: "Le choix des agences qui grandissent",
    featured: true,
    features: [
      "1 site d'agence",
      "Tous les templates premium",
      "Domaine personnalisé inclus",
      "Synchronisation 3 CRM",
      "Biens illimités",
      "Formulaires + alertes email",
      "Analytics avancés",
      "Support chat prioritaire",
      "Blog intégré",
      "Mises à jour automatiques",
    ],
    cta: "Démarrer Gold",
    ctaHref: "#",
  },
  {
    name: "Platinum",
    price: 179,
    description: "Pour les réseaux et multi-agences",
    featured: false,
    features: [
      "Jusqu'à 5 sites d'agence",
      "Tous les templates premium",
      "Domaines personnalisés inclus",
      "Synchronisation CRM illimitée",
      "Biens illimités",
      "Portail propriétaires",
      "API publique",
      "Support dédié (visio)",
      "SLA 99.9% garanti",
      "Onboarding personnalisé",
    ],
    cta: "Contacter l'équipe",
    ctaHref: "#",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
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
            Tarifs
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Simple, transparent, sans surprise
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto text-center"
          >
            Tous les plans incluent l&apos;hébergement, la livraison en 48h et les mises à jour. Sans engagement.
          </motion.p>
        </motion.div>

        {/* Cards — stagger + hover */}
        <motion.div
          className="grid gap-6 md:grid-cols-3 items-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              whileHover={
                plan.featured
                  ? { y: -6, scale: 1.01, transition: { duration: 0.22, ease: "easeOut" } }
                  : { y: -4, scale: 1.02, transition: { duration: 0.22, ease: "easeOut" } }
              }
              className={plan.featured ? "md:-mt-4" : ""}
            >
              <Card
                className={`relative overflow-hidden transition-shadow hover:shadow-xl ${
                  plan.featured
                    ? "border-[#1d4ed8] shadow-lg shadow-blue-500/10 dark:shadow-blue-500/5"
                    : "hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
                }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-[#1d4ed8] to-blue-500" />
                )}

                {plan.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="rounded-full bg-[#1d4ed8] px-2.5 py-1 text-xs font-bold text-white">
                      Recommandé
                    </span>
                  </div>
                )}

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}€</span>
                      <span className="text-sm text-gray-400 dark:text-gray-500">/mois</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">HT · Sans engagement</p>
                  </div>

                  {/* CTA */}
                  <a
                    href={plan.ctaHref}
                    className={`block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-all ${
                      plan.featured
                        ? "bg-[#1d4ed8] text-white hover:bg-[#1e40af] shadow-sm shadow-blue-500/20"
                        : "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#1d4ed8] hover:text-[#1d4ed8]"
                    }`}
                  >
                    {plan.cta}
                  </a>

                  {/* Features */}
                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? "text-[#1d4ed8]" : "text-gray-400 dark:text-neutral-600"}`}
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-sm text-[hsl(var(--muted-foreground))]"
        >
          Besoin d&apos;un devis personnalisé pour un réseau ?{" "}
          <a href="#" className="text-[#1d4ed8] underline-offset-2 hover:underline">
            Contactez-nous
          </a>
        </motion.p>
      </div>
    </section>
  )
}
