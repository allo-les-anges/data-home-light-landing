"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"

const highlights = ["Agency website", "XML feeds", "Property Manager", "AI chatbot", "Mini CRM"]

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-[#18A1CE]/16 blur-3xl" />
        <div className="absolute right-[-10%] top-12 h-96 w-96 rounded-full bg-[#D769A9]/18 blur-3xl" />
      </div>

      <div className="dh-container grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D769A9]/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-[#EF4B5A] shadow-sm">
            <Sparkles className="h-4 w-4" /> Premium SaaS for real estate agencies
          </span>

          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.02] text-[#080B1D] md:text-7xl">
            Your agency online, <span className="dh-gradient-text">selling in 24h</span>.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            Launch a professional real estate website connected to XML feeds, premium templates, dashboards, leads and optional AI modules. Everything is managed from one SaaS workspace.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href="https://datahome.vercel.app/register" className="dh-button-gradient inline-flex items-center justify-center gap-3 rounded-2xl px-7 py-4 text-sm font-extrabold text-white transition hover:-translate-y-0.5">
              Start 15-day trial <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="https://datahome.vercel.app/demo" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#18A1CE]/45 bg-white px-7 py-4 text-sm font-extrabold text-[#18A1CE] transition hover:-translate-y-0.5 hover:border-[#D769A9] hover:text-[#D769A9]">
              See live demo
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <span key={item} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200/70">
                <CheckCircle2 className="h-4 w-4 text-[#32B55E]" /> {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 32, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .12, duration: .7 }} className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#18A1CE]/20 via-[#D769A9]/20 to-[#FCC010]/20 blur-2xl" />
          <div className="dh-card relative overflow-hidden rounded-[2.5rem] p-4">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#080B1D]">
              <Image src="/hero-villa.jpg" alt="Premium villa" width={1100} height={760} className="h-[420px] w-full object-cover opacity-88" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B1D]/82 via-[#080B1D]/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/92 p-5 shadow-2xl backdrop-blur">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.22em] text-[#D769A9]">Agency dashboard</p>
                    <h2 className="mt-2 text-2xl font-black text-[#080B1D]">Build, publish, convert.</h2>
                    <p className="mt-1 text-sm text-slate-500">Templates, XML, leads and modules in one flow.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold text-slate-600">
                    <span className="rounded-2xl bg-[#18A1CE]/10 px-4 py-3">2548 listings</span>
                    <span className="rounded-2xl bg-[#D769A9]/10 px-4 py-3">15-day trial</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
