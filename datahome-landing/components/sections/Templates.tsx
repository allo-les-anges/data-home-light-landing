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
          <div className="mt-8 grid grid-cols-3 gap-3">
            {template.images.map((image) => (
              <img key={image} src={image} alt="" className="h-24 w-full rounded-2xl object-cover shadow-sm" loading="lazy" />
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
