"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/variants"

const template = {
  id: "signature-mediterranean-premium",
  name: "Signature Mediterranean",
  price: "790 EUR",
  tagline: "Cinematic premium template for Mediterranean villas and international buyers.",
  markets: ["Costa Blanca", "Costa del Sol", "International buyers"],
  images: [
    "https://medianewbuild.com/file/hh-media-bucket/developments_v2/70091589/media/images/outdoor/1.jpg",
    "https://medianewbuild.com/file/hh-media-bucket/developments_v2/13112583/media/images/outdoor/1.jpg",
    "https://medianewbuild.com/file/hh-media-bucket/developments_v2/13112583/media/images/outdoor/2.jpg",
  ],
}

function previewUrl() {
  return `https://datahome.vercel.app/en/schmidt-privilege/template-preview/${template.id}?source=landing`
}

function SignaturePreview() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f1ea] shadow-2xl shadow-black/10">
      <div className="flex h-16 items-center justify-between border-b border-[#e8ded2] bg-[#f7f1ea] px-6">
        <div className="flex items-center gap-3">
          <span className="h-7 w-16 rounded-full bg-[#14231f]" />
          <span className="h-2 w-20 rounded-full bg-[#14231f]/70" />
        </div>
        <div className="hidden items-center gap-5 md:flex">
          <span className="h-2 w-14 rounded-full bg-[#14231f]/45" />
          <span className="h-2 w-14 rounded-full bg-[#14231f]/45" />
          <span className="h-2 w-14 rounded-full bg-[#14231f]/45" />
          <span className="h-8 w-24 rounded-full bg-[#A77B4F]" />
        </div>
      </div>
      <div className="grid min-h-[430px] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[260px] overflow-hidden">
          <img src={template.images[0]} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          <div className="absolute left-8 top-8 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-900">
            Premium
          </div>
          <div className="absolute bottom-8 left-8 max-w-sm text-white">
            <p className="mb-3 text-xs uppercase tracking-[0.32em] text-white/75">Mediterranean signature</p>
            <h3 className="font-serif text-4xl leading-tight">Designed for villas that deserve silence, space and emotion.</h3>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-[#fbf7f0] p-8">
          <div>
            <span className="mb-6 block h-1 w-16 rounded-full bg-[#c8a96a]" />
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#9f7a3f]">Paid premium template</p>
            <h3 className="mb-4 font-serif text-4xl leading-tight text-neutral-950">{template.name}</h3>
            <p className="max-w-md text-sm leading-7 text-neutral-600">{template.tagline}</p>
          </div>
          <div className="mt-7 grid grid-cols-4 gap-px overflow-hidden rounded-2xl border border-[#d9cbbb] bg-[#d9cbbb]">
            {["Listings", "Markets", "Team", "Languages"].map((label, index) => (
              <div key={label} className="bg-white/70 p-3">
                <span className="mb-2 block h-4 w-5 rounded-full bg-[#14231f]" />
                <span className="block h-1.5 w-full rounded-full bg-[#7c8b86]/45" />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={previewUrl()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1f2937]"
            >
              Preview template <ExternalLink className="h-4 w-4" />
            </a>
            <span className="rounded-full border border-[#c8a96a]/40 px-4 py-2 text-sm font-semibold text-neutral-800">{template.price}</span>
          </div>
        </div>
      </div>
      <div className="grid gap-4 border-t border-[#e8ded2] bg-[#f7f1ea] p-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid overflow-hidden rounded-[1.5rem] border border-[#d9cbbb] bg-white shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
          <img src={template.images[1]} alt="" className="h-44 w-full object-cover lg:h-full" loading="lazy" />
          <div className="p-6">
            <span className="mb-4 block h-2 w-28 rounded-full bg-[#A77B4F]" />
            <span className="mb-3 block h-5 w-48 rounded-full bg-[#14231f]" />
            <span className="mb-6 block h-2 w-32 rounded-full bg-[#7c8b86]/45" />
            <div className="grid grid-cols-3 gap-2 border-y border-[#efe5d8] py-4">
              <span className="h-2 rounded-full bg-[#A77B4F]" />
              <span className="h-2 rounded-full bg-[#A77B4F]" />
              <span className="h-2 rounded-full bg-[#A77B4F]" />
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          {template.images.slice(1).map((image) => (
            <div key={image} className="flex items-center gap-3 rounded-2xl border border-[#e5d9ca] bg-white p-3 shadow-sm">
              <img src={image} alt="" className="h-16 w-20 rounded-xl object-cover" loading="lazy" />
              <div className="flex-1">
                <span className="mb-2 block h-3 w-28 rounded-full bg-[#14231f]" />
                <span className="block h-2 w-16 rounded-full bg-[#7c8b86]/45" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Templates() {
  return (
    <section id="templates" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div className="mx-auto mb-14 max-w-2xl text-center" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
          <motion.p variants={fadeInUp} custom={0} className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#D769A9]">
            Premium template
          </motion.p>
          <motion.h2 variants={fadeInUp} custom={1} className="mb-4 text-4xl font-bold text-gray-950">
            Signature Mediterranean
          </motion.h2>
          <motion.p variants={fadeInUp} custom={2} className="mx-auto max-w-2xl text-lg leading-8 text-gray-600">
            Keep the free base templates in the app, and sell one clear premium upgrade with a much more editorial, emotional and high-end real estate experience.
          </motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
          <motion.div variants={staggerItem}>
            <SignaturePreview />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
