"use client"

import { motion } from "framer-motion"
import { Bot, Building2, Eye, FileText, Globe2, Landmark, Languages, LayoutTemplate, Link2, Mail, Search, Share2, TrendingUp, Video, Workflow } from "lucide-react"

const modules = [
  { icon: Globe2, title: "Public website", text: "A polished agency website with sales, rentals, contact, legal pages and responsive layouts." },
  { icon: Link2, title: "XML feed workflow", text: "Connect HabiHub XML feeds from the agency dashboard while keeping client onboarding simple." },
  { icon: Building2, title: "Property Manager", text: "Agencies can add sales and rentals, photos, videos and property details from their workspace." },
  { icon: LayoutTemplate, title: "Premium templates", text: "Free and paid templates with editable colors, typography, hero media, cards and footer copy." },
  { icon: Bot, title: "AI chatbot", text: "Qualifies visitors, proposes properties and sends structured leads to the Mini CRM." },
  { icon: TrendingUp, title: "Mini CRM", text: "Every lead — from the chatbot, the contact form or a converted visitor — organized in one simple pipeline." },
  { icon: Workflow, title: "Landing page generator", text: "Dedicated pages for properties and developments, ready for targeted campaigns." },
  { icon: Languages, title: "Multilingual websites", text: "Core languages included, with extra languages available when agencies need more markets." },
  { icon: Video, title: "Video hero & immersive tours", text: "MP4 hero videos and immersive-tour modules for more emotional property discovery." },
  { icon: Search, title: "SEO IA", text: "AI-optimized titles, meta descriptions and property content to help every listing rank higher." },
  { icon: Share2, title: "Social Hub", text: "AI-drafted posts for Facebook, Instagram and LinkedIn, scheduled and published from one dashboard." },
  { icon: Eye, title: "Visitor Tracking", text: "Spot the anonymous visitors browsing your listings and convert the engaged ones into a lead in one click." },
  { icon: Landmark, title: "Cadastre & Compliance Passport", text: "Live Spanish Catastro lookup with surface and land use, plus an autonomous legal PGOU search for peace of mind." },
  { icon: Mail, title: "Newsletter", text: "Send curated property updates to your subscriber list straight from the agency dashboard." },
  { icon: FileText, title: "Custom Pages", text: "Publish free-form content — legal notices, buying guides, local market insights — under your own site." },
]

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="dh-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[.22em] text-[#D769A9]">Everything you need</p>
          <h2 className="mt-4 text-4xl font-black text-[#080B1D] md:text-5xl">Built around the real Data Home workflow.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">From onboarding to XML imports, from property cards to lead capture, the landing page reflects what the SaaS actually does.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module, index) => (
            <motion.article key={module.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * .035 }} className="group rounded-[1.7rem] border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/80">
              <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-[#18A1CE] to-[#D769A9] text-white shadow-lg shadow-[#D769A9]/20">
                <module.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-extrabold text-[#080B1D]">{module.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{module.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
