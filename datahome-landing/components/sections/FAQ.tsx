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
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-14">
          <h2 className="text-3xl font-black text-[#080B1D] md:text-4xl">Questions before launch.</h2>
          <p className="mt-4 text-base leading-[1.85] text-slate-500">The essentials about setup, XML, modules and customisation.</p>
        </div>
        <Accordion>
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`faq-${i}`} question={faq.q}>
              {faq.a}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
