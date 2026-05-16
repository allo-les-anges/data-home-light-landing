"use client"

import { motion } from "framer-motion"

const destinations = ["Costa Blanca", "Costa del Sol", "Costa Calida", "Dubai", "Georgia", "Algarve"]

export function PremiumDestinations() {
  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="dh-container">
        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-[#f8fbff] via-white to-[#fff5fa] p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[.22em] text-[#18A1CE]">Premium destinations</p>
              <h2 className="mt-3 text-3xl font-black text-[#080B1D]">Sell across the markets your buyers actually search.</h2>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              {destinations.map((destination, index) => (
                <motion.span key={destination} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} animate={{ y: [0, -5, 0] }} viewport={{ once: true }} transition={{ opacity: { delay: index * .04 }, y: { delay: index * .18, duration: 5, repeat: Infinity } }} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200">
                  {destination}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
