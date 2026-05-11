"use client"

import { motion } from "framer-motion"

const destinations = [
  { name: "Costa Blanca", color: "#EF4B5A" },
  { name: "Costa del Sol", color: "#FCC010" },
  { name: "Costa Calida", color: "#32B55E" },
  { name: "Algarve, Portugal", color: "#18A1CE" },
  { name: "Dubai", color: "#D769A9" },
  { name: "Georgia", color: "#8B5CF6" },
]

export function PremiumDestinations() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="mb-10 text-xs font-black uppercase tracking-[0.22em] text-slate-500"
        >
          Premium destinations
        </motion.p>
        <div className="flex flex-wrap justify-center gap-4">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.name}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ y: [0, -7, 0] }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                opacity: { delay: index * 0.04, duration: 0.35 },
                scale: { delay: index * 0.04, duration: 0.35 },
                y: { delay: index * 0.12, duration: 5.8, repeat: Infinity, ease: "easeInOut" },
              }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm"
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: destination.color }} />
              {destination.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
