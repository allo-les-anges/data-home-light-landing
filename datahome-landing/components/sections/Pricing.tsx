"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { plans, optionalModules, commercial } from '@/lib/marketing/commercial';
const modules = optionalModules.map(module => ({name: module.name, price: module.monthlyEur + (module.unit === 'language/month' ? ' EUR/lang/mo' : ' EUR/mo')}));
export function Pricing() {
  return (
    <section id="pricing" className="border-t border-slate-100 py-24 md:py-32">
      <div className="dh-container">

        {/* Section header */}
        <div className="mb-14 max-w-xl">
          <h2 className="text-3xl font-black leading-tight text-[#080B1D] md:text-4xl">
            Three plans.<br />One workspace.
          </h2>
          <p className="mt-5 text-sm leading-[1.9] text-slate-500">
            Every plan includes the full DATAhome workspace. Optional modules let each agency extend precisely what it needs — XML is always a separate service.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
              className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white p-7 ${
                plan.highlighted
                  ? "border-[#18A1CE]/35 shadow-lg shadow-[#18A1CE]/8"
                  : "border-slate-200"
              }`}
            >
              {plan.highlighted && (
                <div
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#18A1CE]/40 via-[#18A1CE] to-[#18A1CE]/40"
                  aria-hidden
                />
              )}

              {/* Plan header */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[11px] font-bold uppercase tracking-[.24em] text-[#18A1CE]">
                    {plan.name}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-[1.75] text-slate-500">{plan.tagline}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black tabular-nums text-[#080B1D]">{plan.price}</span>
                <span className="text-base font-semibold text-slate-400">EUR/mo</span>
              </div>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[.16em] text-slate-400">
                Up to {plan.users} {plan.users === 1 ? "user" : "users"}
              </p>

              {/* CTA */}
              <Link
                href={`https://datahome.vercel.app/register?plan=${plan.name.toLowerCase()}`}
                className={`mt-7 inline-flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-extrabold transition-[transform,background-color] duration-150 ease-out active:scale-[0.97] [@media(hover:hover)]:hover:-translate-y-0.5 ${
                  plan.highlighted
                    ? "bg-[#18A1CE] text-white"
                    : "bg-slate-100 text-[#080B1D] [@media(hover:hover)]:hover:bg-slate-200"
                }`}
              >
                Choose {plan.name}
              </Link>

              {/* Feature list */}
              <ul className="mt-7 grow space-y-3 border-t border-slate-100 pt-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#18A1CE]" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Setup fee — shown once */}
        <p className="mt-8 text-center text-sm text-slate-500">
          <span className="font-semibold text-[#080B1D]">Setup & onboarding:</span>{" "}
          {commercial.setupEur} EUR one-time per new customer — initial configuration, domain setup, and deployment.
        </p>

        {/* Optional modules */}
        <div className="mt-20 border-t border-slate-100 pt-16">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-2xl font-black leading-tight text-[#080B1D]">
                Extend precisely what you need.
              </h3>
            </div>
            <p className="max-w-xs text-sm leading-[1.85] text-slate-500">
              Modules included in Pro and Premium can also be purchased independently on the Essential plan.
            </p>
          </div>

          <div className="grid gap-x-12 sm:grid-cols-2">
            {modules.map((mod, i) => (
              <div
                key={mod.name}
                className={`flex items-baseline justify-between gap-4 py-3.5 text-sm ${
                  i < modules.length - 2 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="font-medium text-[#080B1D]">{mod.name}</span>
                <span className="shrink-0 font-semibold tabular-nums text-slate-400">{mod.price}</span>
              </div>
            ))}
          </div>

          {/* XML — always separate */}
          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 px-6 py-4">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-[#080B1D]">XML feed — {commercial.xmlPerFeedMonthlyEur} EUR/feed/month.</span>{" "}
              Separate service. XML feeds are not included in DATAhome subscription plans.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
