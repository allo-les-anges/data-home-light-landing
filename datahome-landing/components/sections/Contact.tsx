"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, Mail, Phone, User } from "lucide-react"

type FormStatus = { type: "idle" | "success" | "error"; message: string }

export function Contact() {
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setIsSubmitting(true)
    setStatus({ type: "idle", message: "" })

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "landing_contact_form",
          name: String(formData.get("name") || ""),
          email: String(formData.get("email") || ""),
          phone: String(formData.get("phone") || ""),
          message: String(formData.get("message") || ""),
          metadata: { page_url: window.location.href },
        }),
      })
      const payload = await response.json().catch(() => null)
      if (!response.ok) throw new Error(payload?.message || "The form could not be sent.")
      form.reset()
      setStatus({ type: "success", message: payload?.message || "Message sent. We will contact you within 24 hours." })
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "The form could not be sent." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="dh-container grid gap-10 lg:grid-cols-[1fr_520px] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[.22em] text-[#D769A9]">Contact</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-black leading-tight text-[#080B1D] md:text-6xl">Ready to launch your real estate website?</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Tell us about your agency. Gillian and Gaetan receive every request and can help you choose the right setup, modules and XML workflow.</p>
        </div>

        <form onSubmit={submitLead} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/70">
          <div className="grid gap-4">
            <Field icon={User} name="name" label="Name" placeholder="Your name" required />
            <Field icon={Mail} name="email" type="email" label="Email" placeholder="you@agency.com" required />
            <Field icon={Phone} name="phone" type="tel" label="Phone" placeholder="+32 ..." />
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Project
              <textarea name="message" rows={4} placeholder="Tell us what you need..." className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#D769A9] focus:ring-4 focus:ring-[#D769A9]/10" />
            </label>
            <button disabled={isSubmitting} className="dh-button-gradient mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-black text-white disabled:opacity-60">
              {isSubmitting ? "Sending..." : "Send my request"} <ArrowRight className="h-4 w-4" />
            </button>
            {status.message && <p className={`rounded-2xl px-4 py-3 text-sm font-bold ${status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{status.message}</p>}
          </div>
        </form>
      </div>
    </section>
  )
}

function Field({ icon: Icon, label, ...props }: any) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-700">
      {label}
      <span className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input {...props} className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#D769A9] focus:ring-4 focus:ring-[#D769A9]/10" />
      </span>
    </label>
  )
}
