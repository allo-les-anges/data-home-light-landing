"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem, scaleIn } from "@/lib/variants"

const mockupVillas = [
  {
    name: "The Hills 14",
    location: "Costa del Sol",
    price: "22 M€",
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/87929424/media/images/outdoor/1.jpg",
  },
  {
    name: "Villa Marbella",
    location: "Marbella",
    price: "19,5 M€",
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/37089450/media/images/outdoor/1.jpg",
  },
  {
    name: "Calle Bach",
    location: "Marbella",
    price: "19 M€",
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/32156547/media/images/outdoor/1.jpg",
  },
]

const partners = [
  { name: "HabiHub", abbr: "HH" },
  { name: "Inmovilla", abbr: "IN" },
  { name: "Witei", abbr: "WT" },
  { name: "Inmoweb", abbr: "IW" },
  { name: "Casafari", abbr: "CF" },
]

const floatingBadges = [
  {
    icon: "✓",
    text: "SEO optimisé",
    color: "bg-white dark:bg-neutral-900 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300",
    position: "-left-10 top-14",
    floatDelay: 0,
  },
  {
    icon: "⚡",
    text: "24h de livraison",
    color: "bg-white dark:bg-neutral-900 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300",
    position: "-right-10 top-28",
    floatDelay: 0.8,
  },
  {
    icon: "🔗",
    text: "Connecté CRM",
    color: "bg-white dark:bg-neutral-900 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300",
    position: "-left-6 bottom-16",
    floatDelay: 1.6,
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/70 via-white to-white dark:from-blue-950/15 dark:via-[#0a0a0a] dark:to-[#0a0a0a]" />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-100/50 dark:bg-blue-900/8 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow badge */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-200/80 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/50 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Nouveau — Connecté à HabiHub &amp; Inmovilla
          </motion.div>

          {/* H1 */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-3xl text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1.08]"
          >
            Votre agence immobilière{" "}
            <span className="text-[#1d4ed8]">en ligne en 24h</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-lg text-lg text-gray-500 dark:text-neutral-400 leading-relaxed"
          >
            Site professionnel, domaine personnalisé, connecté à votre CRM.
            Tout est géré pour vous — vous vous concentrez sur la vente.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1d4ed8] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-[#1e40af] hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              Créer mon site
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="#templates"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200"
            >
              Voir les templates
            </Link>
          </motion.div>

          {/* Micro-copy */}
          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 text-xs text-gray-400 dark:text-neutral-600"
          >
            Aucune carte requise · Livraison garantie en 24h · Résiliable à tout moment
          </motion.p>
        </div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 52 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          {/* Floating badges */}
          {floatingBadges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { delay: 0.7 + badge.floatDelay * 0.3, duration: 0.4 },
                scale: { delay: 0.7 + badge.floatDelay * 0.3, duration: 0.4 },
                y: {
                  delay: badge.floatDelay,
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className={`absolute z-10 hidden md:flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold shadow-lg ${badge.color} ${badge.position}`}
            >
              <span className="text-sm">{badge.icon}</span>
              {badge.text}
            </motion.div>
          ))}

          {/* Browser chrome */}
          <div className="rounded-2xl overflow-hidden ring-1 ring-black/8 dark:ring-white/8 shadow-2xl shadow-black/20 dark:shadow-black/60 bg-gradient-to-b from-white/5 to-transparent">
            {/* Title bar */}
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-neutral-900 border-b border-gray-100 dark:border-white/5 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <div className="h-3 w-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 flex items-center gap-2 mx-4">
                <div className="flex-1 max-w-sm mx-auto rounded-md bg-white dark:bg-neutral-800 border border-gray-200 dark:border-white/8 px-3 py-1.5 text-xs text-gray-400 dark:text-neutral-500 flex items-center gap-2">
                  <svg className="h-3 w-3 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  agence-riviera.data-home.app
                </div>
              </div>
            </div>

            {/* Site preview */}
            <div className="relative min-h-[340px] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-8 py-12">
              {/* Subtle grid inside preview */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Glow */}
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

              {/* Simulated nav */}
              <div className="relative flex items-center justify-between mb-10">
                <div className="h-5 w-28 rounded bg-white/30 backdrop-blur-sm" />
                <div className="flex gap-3">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-3 w-10 rounded bg-white/15" />
                  ))}
                  <div className="h-6 w-20 rounded-lg bg-[#1d4ed8]" />
                </div>
              </div>

              {/* Simulated hero */}
              <div className="relative mb-8 max-w-sm">
                <div className="h-2.5 w-16 rounded-full bg-blue-400/50 mb-4" />
                <div className="h-7 w-72 rounded-lg bg-white/45 mb-2.5" />
                <div className="h-7 w-52 rounded-lg bg-white/30 mb-5" />
                <div className="h-2.5 w-64 rounded bg-white/18 mb-1.5" />
                <div className="h-2.5 w-52 rounded bg-white/15 mb-6" />
                <div className="flex gap-3">
                  <div className="h-9 w-32 rounded-xl bg-[#1d4ed8] shadow-lg shadow-blue-500/30" />
                  <div className="h-9 w-28 rounded-xl border border-white/25" />
                </div>
              </div>

              {/* Property cards with real villa photos */}
              <div className="relative grid grid-cols-3 gap-3">
                {mockupVillas.map((villa) => (
                  <div key={villa.name} className="rounded-xl bg-white/8 backdrop-blur-sm border border-white/8 overflow-hidden">
                    <div className="relative h-20 overflow-hidden">
                      <Image
                        src={villa.image}
                        alt={villa.name}
                        fill
                        sizes="160px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                    <div className="p-2.5 space-y-1.5">
                      <div className="h-2.5 w-3/4 rounded bg-white/30 text-[8px] text-white/60 flex items-center px-1 truncate">
                        {villa.name}
                      </div>
                      <div className="h-2 w-1/2 rounded bg-white/18" />
                      <div className="h-3 w-2/3 rounded-full bg-blue-400/45 text-[7px] text-white/80 flex items-center px-1.5">
                        {villa.price}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subtle bottom glow under the mockup */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-24 w-3/4 bg-blue-500/10 blur-2xl rounded-full -z-10" />
        </motion.div>

        {/* Partners strip — stagger */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-5"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p
            variants={staggerItem}
            className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400 dark:text-neutral-600"
          >
            Compatible avec
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            variants={staggerContainer}
          >
            {partners.map((p) => (
              <motion.div
                key={p.name}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -2, transition: { duration: 0.15 } }}
                className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-white/8 bg-white dark:bg-white/3 px-4 py-2 shadow-sm cursor-default"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1d4ed8]/10 text-[10px] font-bold text-[#1d4ed8]">
                  {p.abbr}
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-neutral-400">{p.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
