"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/variants"

const villas = [
  {
    name: "The Hills 14",
    location: "El Herrojo, Costa del Sol",
    price: 22_000_000,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/87929424/media/images/outdoor/1.jpg",
    badge: "Coup de cœur",
  },
  {
    name: "Villa Marbella",
    location: "Marbella, Málaga",
    price: 19_500_000,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/37089450/media/images/outdoor/1.jpg",
    badge: "Vue mer",
  },
  {
    name: "Calle Bach",
    location: "Marbella, Costa del Sol",
    price: 19_000_000,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/32156547/media/images/outdoor/1.jpg",
    badge: "Luxe",
  },
  {
    name: "Villa Pueblo Nuevo",
    location: "Pueblo Nuevo, Andalousie",
    price: 12_500_000,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/70091589/media/images/outdoor/1.jpg",
    badge: "Prestige",
  },
  {
    name: "Villa Benahavís",
    location: "Benahavís, Málaga",
    price: 12_135_423,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/82064372/media/images/1.jpg",
    badge: "Exclusif",
  },
  {
    name: "Villa Alcalá 70",
    location: "Marbella, Costa del Sol",
    price: 11_500_000,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/25407071/media/images/outdoor/1.jpg",
    badge: "Premium",
  },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(price)
}

export function VillasShowcase() {
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
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
            Vos biens en vitrine
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Des propriétés d&apos;exception, présentées avec élégance
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-gray-500 dark:text-neutral-400"
          >
            Voici comment vos biens apparaîtront sur votre site DATAhome — directement depuis votre CRM.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {villas.map((villa) => (
            <motion.div
              key={villa.name}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
              className="group relative rounded-2xl overflow-hidden border border-gray-100 dark:border-white/8 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/40 transition-shadow duration-300"
            >
              {/* Photo */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={villa.image}
                  alt={villa.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-gray-800 dark:text-white border border-white/40">
                    ✦ {villa.badge}
                  </span>
                </div>
                {/* Price overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 pt-10">
                  <p className="text-xl font-bold text-white">{formatPrice(villa.price)}</p>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1">{villa.name}</h3>
                <p className="text-sm text-gray-500 dark:text-neutral-400 flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-[#1d4ed8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {villa.location}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-sm text-gray-400 dark:text-neutral-600"
        >
          Biens réels issus du catalogue HabiHub · Synchronisés automatiquement
        </motion.p>
      </div>
    </section>
  )
}
