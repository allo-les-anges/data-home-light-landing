"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem, fadeInUp } from "@/lib/variants"

type VillaCard = {
  name: string
  location: string
  price: number
  image: string
  badge: string
}

const fallbackVillas: VillaCard[] = [
  {
    name: "Villa Victoria",
    location: "Ciudad Quesada, Alicante",
    price: 883_210,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/13112583/media/images/1.jpg",
    badge: "Featured",
  },
  {
    name: "Modern Sea View Villa",
    location: "Marbella, Costa del Sol",
    price: 1_245_000,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/37089450/media/images/outdoor/1.jpg",
    badge: "Sea view",
  },
  {
    name: "Golf Residence",
    location: "Benahavis, Malaga",
    price: 695_000,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/82064372/media/images/1.jpg",
    badge: "Luxury",
  },
  {
    name: "Family Villa",
    location: "Costa Calida, Murcia",
    price: 525_000,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/60846833/media/images/1.jpg",
    badge: "Prestige",
  },
  {
    name: "Design Villa",
    location: "Altea, Alicante",
    price: 1_590_000,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/25407071/media/images/outdoor/1.jpg",
    badge: "Exclusive",
  },
  {
    name: "Mediterranean Home",
    location: "Estepona, Malaga",
    price: 1_995_000,
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/70091589/media/images/outdoor/1.jpg",
    badge: "Premium",
  },
]

function parseImages(images: unknown): string[] {
  if (Array.isArray(images)) return images.filter(Boolean) as string[]
  if (typeof images !== "string" || !images.trim()) return []
  const value = images.trim()
  if (value.startsWith("{") && value.endsWith("}")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((url) => url.trim().replace(/^"|"$/g, ""))
      .filter(Boolean)
  }
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.filter(Boolean) : []
  } catch {
    return value.startsWith("http") ? [value] : []
  }
}

function numericPrice(value: unknown) {
  if (typeof value === "number") return value
  if (!value) return 0
  return Number(String(value).replace(/[^\d.]/g, "")) || 0
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price)
}

export function VillasShowcase() {
  const [remoteVillas, setRemoteVillas] = useState<VillaCard[] | null>(null)
  const villas = useMemo(() => (remoteVillas?.length ? remoteVillas : fallbackVillas), [remoteVillas])

  useEffect(() => {
    let mounted = true

    async function loadVillas() {
      try {
        const response = await fetch("/api/showcase-villas", { cache: "no-store" })
        if (!response.ok) return
        const payload = await response.json()
        const source = Array.isArray(payload?.properties) ? payload.properties : []
        const mapped = source
          .map((property: any, index: number) => {
            const image = property.image || parseImages(property.images)[0]
            return {
              name: property.titre || property.title || property.ref || `Property ${index + 1}`,
              location: [property.town || property.ville, property.province || property.region].filter(Boolean).join(", "),
              price: numericPrice(property.price || property.prix),
              image,
              badge: ["Featured", "Sea view", "Luxury", "Prestige", "Exclusive", "Premium"][index % 6],
            }
          })
          .filter((property: VillaCard) => property.image && property.price >= 500000 && property.price <= 2000000)
          .slice(0, 6)

        if (mounted && mapped.length) setRemoteVillas(mapped)
      } catch {
        if (mounted) setRemoteVillas(null)
      }
    }

    loadVillas()
    return () => {
      mounted = false
    }
  }, [])

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
            Showcases that sell
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Real listings, presented with elegance
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-lg text-gray-500 dark:text-neutral-400"
          >
            A varied selection from the villas table, from EUR 500K to EUR 2M.
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
              key={`${villa.name}-${villa.price}`}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
              className="group relative rounded-2xl overflow-hidden border border-gray-100 dark:border-white/8 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl hover:shadow-black/8 dark:hover:shadow-black/40 transition-shadow duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={villa.image}
                  alt={villa.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-gray-800 dark:text-white border border-white/40">
                    {villa.badge}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 pt-10">
                  <p className="text-xl font-bold text-white">{formatPrice(villa.price)}</p>
                </div>
              </div>

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
          Real listings from the villas table · Synced automatically
        </motion.p>
      </div>
    </section>
  )
}
