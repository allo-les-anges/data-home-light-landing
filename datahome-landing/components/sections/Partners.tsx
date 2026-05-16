"use client"

import Image from "next/image"

export function Partners() {
  return (
    <section id="partners" className="bg-gradient-to-br from-white via-[#f8fbff] to-[#fff7fb] py-24">
      <div className="dh-container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[.22em] text-[#D769A9]">Partners</p>
          <h2 className="mt-4 text-4xl font-black text-[#080B1D] md:text-5xl">Useful connections for modern agencies.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">Data Home is built to connect with the real estate tools, feeds and CRM workflows agencies already use.</p>
        </div>

        <article className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 md:grid-cols-[.85fr_1.15fr]">
          <div className="grid min-h-[260px] place-items-center bg-gradient-to-br from-[#f8fbff] to-[#fff5fa] p-10">
            <Image src="/partner-habihub.png" alt="HabiHub" width={260} height={120} className="h-auto w-56" />
          </div>
          <div className="p-8 md:p-10">
            <span className="rounded-full bg-[#fff4f8] px-4 py-2 text-xs font-black uppercase tracking-[.14em] text-[#D769A9]">Feed and CRM partner</span>
            <h3 className="mt-6 text-3xl font-black text-[#080B1D]">HabiHub</h3>
            <p className="mt-4 text-base leading-8 text-slate-600">HabiHub helps real estate professionals structure their property data, client workflows and XML distribution. Data Home uses that ecosystem to help agencies publish faster and manage listings more reliably.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["XML feeds", "Agency CRM", "Property data"].map((item) => <span key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">{item}</span>)}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
