"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionItem } from "@/components/ui/accordion"

const faqs = [
  {
    q: "Combien de temps faut-il pour avoir mon site en ligne ?",
    a: "Votre site est en ligne 24h après votre commande et la réception de vos informations d'agence (logo, couleurs, textes). Nous gérons tout : configuration, hébergement, SSL, et mise en production.",
  },
  {
    q: "Comment fonctionne la synchronisation avec mon CRM ?",
    a: "DATAhome se connecte à votre CRM (HabiHub, Inmovilla, Witei, Casafari) via API. Vos biens, photos et prix sont automatiquement importés et mis à jour en temps réel sur votre site. Aucune action manuelle nécessaire.",
  },
  {
    q: "Puis-je utiliser mon propre nom de domaine ?",
    a: "Oui, à partir du plan Gold. Nous gérons la configuration DNS pour vous. En plan Silver, votre site est disponible sur votre-agence.data-home.app avec certificat SSL inclus.",
  },
  {
    q: "Y a-t-il un engagement minimum ?",
    a: "Non. Tous nos plans sont sans engagement, résiliables à tout moment depuis votre espace client. La résiliation prend effet à la fin de la période de facturation en cours.",
  },
  {
    q: "Puis-je changer de template après la mise en ligne ?",
    a: "Oui, vous pouvez changer de template à tout moment depuis votre tableau de bord. Le changement est effectif sous 24h. Votre contenu et vos biens sont conservés.",
  },
  {
    q: "Que se passe-t-il si mon CRM n'est pas dans la liste ?",
    a: "Nous ajoutons régulièrement de nouvelles intégrations. Si votre CRM n'est pas encore supporté, contactez-nous — nous étudions chaque demande. En attendant, vous pouvez importer vos biens manuellement ou via fichier CSV.",
  },
  {
    q: "L'hébergement et la maintenance sont-ils inclus ?",
    a: "Oui, entièrement. L'hébergement haute performance, les sauvegardes quotidiennes, les mises à jour de sécurité et les nouvelles fonctionnalités sont inclus dans tous les plans, sans surcoût.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-widest text-[#1d4ed8] mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            Questions fréquentes
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-500 dark:text-gray-400"
          >
            Tout ce que vous voulez savoir avant de démarrer.
          </motion.p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-2"
        >
          <Accordion>
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} question={faq.q}>
                {faq.a}
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Vous n&apos;avez pas trouvé votre réponse ?{" "}
            <a
              href="mailto:hello@data-home.app"
              className="font-medium text-[#1d4ed8] underline-offset-2 hover:underline"
            >
              Écrivez-nous
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
