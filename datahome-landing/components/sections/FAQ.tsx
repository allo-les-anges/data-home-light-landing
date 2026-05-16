"use client"

import { Accordion, AccordionItem } from "@/components/ui/accordion"

const faqs = [
  { q: "How fast can an agency website go live?", a: "The standard workflow is built for launch within 24 hours once the agency details, logo, colors and media are ready." },
  { q: "Is XML included in the base price?", a: "No. The website starts separately, and XML feed supply is priced separately so agencies only pay for the feeds they need." },
  { q: "Can agencies manage properties manually?", a: "Yes. The Property Manager lets agencies create sales and rental listings, upload images and videos, and edit content from their workspace." },
  { q: "Can I use my own domain?", a: "Yes. Custom domain configuration is part of the workflow, with DNS instructions generated for the client." },
  { q: "Are premium templates mandatory?", a: "No. Base templates are included. Premium templates are optional one-time upgrades for agencies that want stronger visual differentiation." },
]

export function FAQ() {
  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-black uppercase tracking-[.22em] text-[#18A1CE]">FAQ</p>
          <h2 className="mt-4 text-4xl font-black text-[#080B1D]">Questions before launch.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">The essentials about setup, XML, modules and customization.</p>
        </div>
        <div className="rounded-[2rem] border border-slate-200 bg-white px-6 py-3 shadow-sm">
          <Accordion>
            {faqs.map((faq, i) => <AccordionItem key={faq.q} value={`faq-${i}`} question={faq.q}>{faq.a}</AccordionItem>)}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
