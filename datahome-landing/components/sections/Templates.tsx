"use client"

import { ExternalLink } from "lucide-react"

const templates = [
  { id: "kaia-estate-premium", name: "Kaia Estate", price: "590 EUR", desc: "Architectural, minimal and editorial design for luxury agencies.", image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/32156547/media/images/outdoor/1.jpg" },
  { id: "dreams-premium", name: "Dreams", price: "490 EUR", desc: "Bright, soft and editorial Mediterranean experience for homes in the sun.", image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/13112583/media/images/outdoor/1.jpg" },
]

function previewUrl(id: string) {
  return `https://datahome.vercel.app/en/schmidt-privilege/template-preview/${id}?source=landing`
}

export function Templates() {
  return (
    <section id="templates" className="py-24 md:py-32">
      <div className="dh-container">
        <div className="mb-14 max-w-2xl">
          <h2 className="text-3xl font-black text-[#080B1D] md:text-4xl">Premium templates that feel made for real estate.</h2>
          <p className="mt-5 text-base leading-[1.85] text-slate-500">
            Free templates get agencies live fast. Premium templates add editorial rhythm, lifestyle storytelling and a stronger visual signature.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {templates.map((template) => (
            <article
              key={template.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-black text-[#080B1D]">{template.name}</h3>
                  <span className="shrink-0 text-sm font-semibold text-slate-400">{template.price}</span>
                </div>
                <p className="text-sm leading-[1.85] text-slate-600">{template.desc}</p>
                <a
                  href={previewUrl(template.id)}
                  target="_blank"
                  rel="noopener"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#18A1CE] underline-offset-4 transition-colors duration-150 [@media(hover:hover)]:hover:underline"
                >
                  Preview live <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}

          {/* Made-to-measure — bespoke project */}
          <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white lg:col-span-3">
            <div className="grid gap-0 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch">
              <div className="relative min-h-[260px] overflow-hidden">
                <img src="/hero-villa.jpg" alt="" className="h-full min-h-[260px] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080B1D]/85 to-[#080B1D]/20" />
                <div className="absolute bottom-8 left-8 max-w-xs text-white">
                  <h3 className="text-3xl font-black leading-tight">A unique digital signature for your agency.</h3>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-black text-[#080B1D]">Made-to-measure website</h3>
                <p className="mt-4 max-w-lg text-base leading-[1.85] text-slate-600">For agencies that need custom storytelling, advanced sections, a launch campaign or a design built around a strong existing brand.</p>
                <a
                  href="#contact"
                  className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#18A1CE] px-6 py-3.5 text-sm font-extrabold text-white transition-transform duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:-translate-y-0.5"
                >
                  Request a quote
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
