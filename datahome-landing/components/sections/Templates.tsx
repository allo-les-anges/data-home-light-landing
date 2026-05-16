"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/variants"

const templates = [
  {
    id: "kaia-estate-premium",
    name: "Kaia Estate",
    price: "590 EUR",
    tagline: "Architectural, minimal and editorial premium template for high-end agencies.",
    accent: "#B5864E",
    dark: "#11100E",
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/32156547/media/images/outdoor/1.jpg",
  },
  {
    id: "signature-mediterranean-premium",
    name: "Signature Mediterranean",
    price: "690 EUR",
    tagline: "Cinematic premium template for Mediterranean villas and international buyers.",
    accent: "#A77B4F",
    dark: "#14231f",
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/70091589/media/images/outdoor/1.jpg",
  },
  {
    id: "dreams-premium",
    name: "Dreams",
    price: "490 EUR",
    tagline: "Bright, soft and editorial template for Mediterranean agencies selling homes in the sun.",
    accent: "#C8A76A",
    dark: "#1d1b18",
    image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/13112583/media/images/outdoor/1.jpg",
  },
]

function previewUrl(id: string) {
  return `https://datahome.vercel.app/en/schmidt-privilege/template-preview/${id}?source=landing`
}

function SignaturePreview({ template }: { template: (typeof templates)[number] }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f7f1ea] shadow-2xl shadow-black/10">
      <div className="flex h-16 items-center justify-between border-b border-[#e8ded2] bg-[#f7f1ea] px-6">
        <div className="flex items-center gap-3">
          <span className="h-7 w-16 rounded-full" style={{ backgroundColor: template.dark }} />
          <span className="h-2 w-20 rounded-full" style={{ backgroundColor: `${template.dark}99` }} />
        </div>
        <div className="hidden items-center gap-5 md:flex">
          <span className="h-2 w-14 rounded-full bg-[#14231f]/45" />
          <span className="h-2 w-14 rounded-full bg-[#14231f]/45" />
          <span className="h-2 w-14 rounded-full bg-[#14231f]/45" />
          <span className="h-8 w-24 rounded-full" style={{ backgroundColor: template.accent }} />
        </div>
      </div>
      <div className="grid min-h-[430px] grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[260px] overflow-hidden">
          <img src={template.image} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          <div className="absolute left-8 top-8 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-900">
            Premium
          </div>
          <div className="absolute bottom-8 left-8 max-w-sm text-white">
            <p className="mb-3 text-xs uppercase tracking-[0.32em] text-white/75">Mediterranean signature</p>
            <h3 className="font-serif text-4xl leading-tight">Designed for homes that deserve silence, space and emotion.</h3>
          </div>
        </div>
        <div className="flex flex-col justify-between bg-[#fbf7f0] p-8">
          <div>
            <span className="mb-6 block h-1 w-16 rounded-full" style={{ backgroundColor: template.accent }} />
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
              href={previewUrl(template.id)}
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
          <img src={template.image} alt="" className="h-44 w-full object-cover lg:h-full" loading="lazy" />
          <div className="p-6">
            <span className="mb-4 block h-2 w-28 rounded-full" style={{ backgroundColor: template.accent }} />
            <span className="mb-3 block h-5 w-48 rounded-full bg-[#14231f]" />
            <span className="mb-6 block h-2 w-32 rounded-full bg-[#7c8b86]/45" />
            <div className="grid grid-cols-3 gap-2 border-y border-[#efe5d8] py-4">
              <span className="h-2 rounded-full" style={{ backgroundColor: template.accent }} />
              <span className="h-2 rounded-full" style={{ backgroundColor: template.accent }} />
              <span className="h-2 rounded-full" style={{ backgroundColor: template.accent }} />
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          {[
            "https://medianewbuild.com/file/hh-media-bucket/developments_v2/13112583/media/images/outdoor/1.jpg",
            "https://medianewbuild.com/file/hh-media-bucket/developments_v2/13112583/media/images/outdoor/2.jpg",
          ].map((image) => (
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
            Premium website templates
          </motion.h2>
          <motion.p variants={fadeInUp} custom={2} className="mx-auto max-w-2xl text-lg leading-8 text-gray-600">
            Keep the free base templates in the app, and offer premium upgrades with more editorial, emotional and high-end real estate experiences.
          </motion.p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
          <div className="grid gap-8">
            {templates.map((template) => (
              <motion.div key={template.id} variants={staggerItem}>
                <SignaturePreview template={template} />
              </motion.div>
            ))}
            <motion.div variants={staggerItem}>
              <div className="overflow-hidden rounded-[2rem] border border-[#D769A9]/25 bg-gradient-to-br from-white via-[#fff7fb] to-[#eefaff] shadow-2xl shadow-black/10">
                <div className="grid min-h-[360px] grid-cols-1 lg:grid-cols-[0.92fr_1.08fr]">
                  <div className="relative min-h-[260px] overflow-hidden bg-[#111827]">
                    <img
                      src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&h=900&fit=crop"
                      alt=""
                      className="h-full w-full object-cover opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
                    <div className="absolute left-8 top-8 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-900">
                      Bespoke
                    </div>
                    <div className="absolute bottom-8 left-8 max-w-md text-white">
                      <p className="mb-3 text-xs uppercase tracking-[0.32em] text-white/75">Made-to-measure website</p>
                      <h3 className="font-serif text-4xl leading-tight">A custom website for agencies that need a unique digital signature.</h3>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-8">
                    <div>
                      <span className="mb-6 block h-1 w-16 rounded-full bg-gradient-to-r from-[#D769A9] to-[#EF4B5A]" />
                      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#D769A9]">Custom project</p>
                      <h3 className="mb-4 font-serif text-4xl leading-tight text-neutral-950">Site sur mesure</h3>
                      <p className="max-w-md text-sm leading-7 text-neutral-600">
                        For agencies that want a fully tailored visual identity, specific pages, advanced storytelling or a premium launch experience.
                      </p>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-neutral-700">
                      {["Unique UX/UI", "Premium art direction", "Custom sections", "Launch support"].map((item) => (
                        <div key={item} className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3">
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D769A9] to-[#EF4B5A] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#D769A9]/25 transition hover:-translate-y-0.5"
                      >
                        Demander un devis <ExternalLink className="h-4 w-4" />
                      </a>
                      <span className="rounded-full border border-[#D769A9]/30 px-4 py-2 text-sm font-semibold text-neutral-800">On request</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
