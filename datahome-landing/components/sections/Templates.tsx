"use client"

import { ExternalLink } from "lucide-react"

const templates = [
  { id: "signature-mediterranean-premium", name: "Signature Mediterranean", price: "690 EUR", desc: "Cinematic Mediterranean template for high-end villas and international buyers.", image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/70091589/media/images/outdoor/1.jpg" },
  { id: "kaia-estate-premium", name: "Kaia Estate", price: "590 EUR", desc: "Architectural, minimal and editorial design for luxury agencies.", image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/32156547/media/images/outdoor/1.jpg" },
  { id: "dreams-premium", name: "Dreams", price: "490 EUR", desc: "Bright, soft and editorial Mediterranean experience for homes in the sun.", image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/13112583/media/images/outdoor/1.jpg" },
]

function previewUrl(id: string) {
  return `https://datahome.vercel.app/en/schmidt-privilege/template-preview/${id}?source=landing`
}

export function Templates() {
  return (
    <section id="templates" className="bg-white py-24 md:py-32">
      <div className="dh-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[.22em] text-[#18A1CE]">Templates</p>
          <h2 className="mt-4 text-4xl font-black text-[#080B1D] md:text-5xl">Premium templates that feel made for real estate.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">Free templates keep agencies moving fast. Premium templates add editorial rhythm, lifestyle storytelling and a higher-end visual signature.</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {templates.map((template) => (
            <article key={template.id} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8fafc] shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/80">
              <div className="relative h-[430px] bg-slate-200 p-5">
                <div className="h-full overflow-hidden rounded-2xl bg-white shadow-xl">
                  <div className="flex h-8 items-center gap-2 border-b border-slate-100 px-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#EF4B5A]" /><span className="h-2.5 w-2.5 rounded-full bg-[#FCC010]" /><span className="h-2.5 w-2.5 rounded-full bg-[#32B55E]" />
                  </div>
                  <div className="relative h-52 overflow-hidden">
                    <img src={template.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="space-y-4 p-5">
                    <span className="block h-3 w-24 rounded-full bg-[#D769A9]" />
                    <span className="block h-7 w-4/5 rounded-full bg-[#080B1D]" />
                    <span className="block h-3 w-3/5 rounded-full bg-slate-200" />
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <span className="h-20 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100" />
                      <span className="h-20 rounded-2xl bg-white shadow-sm ring-1 ring-slate-100" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-xl font-black text-[#080B1D]">{template.name}</h3>
                  <span className="rounded-full bg-[#fff4f8] px-3 py-1 text-xs font-black text-[#D769A9]">{template.price}</span>
                </div>
                <p className="min-h-[56px] text-sm leading-7 text-slate-600">{template.desc}</p>
                <a href={previewUrl(template.id)} target="_blank" rel="noopener" className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#18A1CE] px-5 py-3 text-sm font-extrabold text-[#18A1CE] transition hover:bg-[#18A1CE] hover:text-white">
                  Preview live <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}

          <article className="overflow-hidden rounded-[2rem] border border-[#D769A9]/25 bg-gradient-to-br from-white via-[#fff7fb] to-[#eefaff] p-7 shadow-sm lg:col-span-3">
            <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div className="relative min-h-[280px] overflow-hidden rounded-[1.7rem] bg-[#080B1D]">
                <img src="/hero-villa.jpg" alt="" className="h-full min-h-[280px] w-full object-cover opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080B1D]/88 to-transparent" />
                <div className="absolute bottom-8 left-8 max-w-md text-white">
                  <p className="text-xs font-black uppercase tracking-[.25em] text-white/70">Bespoke website</p>
                  <h3 className="mt-3 text-4xl font-black leading-tight">A unique digital signature for your agency.</h3>
                </div>
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[.22em] text-[#D769A9]">Custom project</p>
                <h3 className="mt-4 text-4xl font-black text-[#080B1D]">Made-to-measure website</h3>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">For agencies that need custom storytelling, advanced sections, a launch campaign or a design built around a strong existing brand.</p>
                <a href="#contact" className="dh-button-gradient mt-7 inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-extrabold text-white">Request a quote <ExternalLink className="h-4 w-4" /></a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
