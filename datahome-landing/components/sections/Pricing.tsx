"use client"

import { Check, Plus } from "lucide-react"

const plans = [
  { name: "Site", price: 50, setup: 125, desc: "For agencies that want a professional online presence and manual property management.", features: ["Public agency website", "Property Manager", "Sales and rentals", "Mini CRM Leads", "WhatsApp button", "6 languages included", "Base templates included"] },
  { name: "Pro", price: 89, setup: 125, popular: true, desc: "For agencies that want automation, XML and stronger conversion tools.", features: ["Everything in Site", "1 XML feed included", "Advanced Property Manager", "Landing page generator", "AI chatbot included", "Video hero included", "Priority support"] },
  { name: "Premium", price: 134, setup: 125, desc: "For agencies that want the full premium stack and more room to grow.", features: ["Everything in Pro", "2 XML feeds included", "Unlimited landing pages", "Higher chatbot quota", "SEO module when available", "Immersive tours beta", "Premium onboarding support"] },
]

const addons = [
  ["Extra XML feed", "50 EUR / month"],
  ["AI chatbot", "39 EUR / month"],
  ["Landing page generator", "49 EUR / month"],
  ["Video hero", "9 EUR / month"],
  ["Extra language", "2 EUR / month"],
  ["Premium templates", "390-790 EUR one-time"],
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="dh-container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[.22em] text-[#D769A9]">Pricing</p>
          <h2 className="mt-4 text-4xl font-black text-[#080B1D] md:text-5xl">Clear SaaS pricing, XML separated.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">The website starts at 50 EUR/month. XML supply is billed separately, so every agency pays only for the workflow it needs.</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.name} className={`relative rounded-[2rem] border bg-white p-7 shadow-sm ${plan.popular ? "border-[#D769A9] shadow-2xl shadow-[#D769A9]/12" : "border-slate-200"}`}>
              {plan.popular && <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-[#D769A9] to-[#EF4B5A] px-3 py-1 text-xs font-black text-white">Most chosen</span>}
              <h3 className="text-sm font-black uppercase tracking-[.2em] text-[#18A1CE]">{plan.name}</h3>
              <p className="mt-4 min-h-[72px] text-sm leading-7 text-slate-600">{plan.desc}</p>
              <div className="mt-7 flex items-end gap-1">
                <span className="text-5xl font-black text-[#080B1D]">{plan.price}</span><span className="pb-2 text-lg font-bold text-slate-500">EUR/month</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-500">Setup fee: {plan.setup} EUR one-time</p>
              <a href="#contact" className={`mt-7 inline-flex w-full justify-center rounded-2xl px-5 py-4 text-sm font-extrabold transition ${plan.popular ? "dh-button-gradient text-white" : "border border-slate-200 text-slate-800 hover:border-[#D769A9] hover:text-[#D769A9]"}`}>Choose {plan.name}</a>
              <ul className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-slate-600"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#32B55E]" /> {feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-9 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[.22em] text-[#18A1CE]">Modules</p>
              <h3 className="mt-2 text-2xl font-black text-[#080B1D]">Build the stack module by module.</h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">Immersive tours and SEO remain roadmap modules until fully available in the SaaS.</p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {addons.map(([name, price]) => (
              <div key={name} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#18A1CE] to-[#D769A9] text-white"><Plus className="h-4 w-4" /></span><p className="font-bold text-[#080B1D]">{name}</p></div>
                <p className="text-sm font-semibold text-slate-500">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
