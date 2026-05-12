"use client"

import { FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Phone, User } from "lucide-react"
import { fadeInUp } from "@/lib/variants"

type FormStatus = {
  type: "idle" | "success" | "error"
  message: string
}

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
      if (!response.ok) {
        throw new Error(payload?.message || "The form could not be sent.")
      }

      form.reset()
      setStatus({
        type: "success",
        message: payload?.message || "Message sent. We will contact you within 24 hours.",
      })
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "The form could not be sent.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_520px] lg:items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="max-w-2xl"
          >
            <motion.p
              variants={fadeInUp}
              custom={0}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#1d4ed8]"
            >
              Contact
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              custom={1}
              className="mb-5 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl"
            >
              Ready to launch your real estate website?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-lg leading-relaxed text-[hsl(var(--muted-foreground))]"
            >
              Tell us about your agency. Gillian and Gaetan receive every request and can help you choose the right setup, modules and XML workflow.
            </motion.p>
          </motion.div>

          <motion.form
            onSubmit={submitLead}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-white/10 dark:bg-neutral-900 dark:shadow-black/30"
          >
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                Name
                <span className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    name="name"
                    required
                    minLength={2}
                    placeholder="Your name"
                    className="h-13 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#18A1CE] focus:ring-4 focus:ring-[#18A1CE]/10 dark:border-white/10 dark:bg-neutral-950 dark:text-white"
                  />
                </span>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                Email
                <span className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@agency.com"
                    className="h-13 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#18A1CE] focus:ring-4 focus:ring-[#18A1CE]/10 dark:border-white/10 dark:bg-neutral-950 dark:text-white"
                  />
                </span>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                Phone
                <span className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+32 ..."
                    className="h-13 w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#18A1CE] focus:ring-4 focus:ring-[#18A1CE]/10 dark:border-white/10 dark:bg-neutral-950 dark:text-white"
                  />
                </span>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                Project
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us what you need..."
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#18A1CE] focus:ring-4 focus:ring-[#18A1CE]/10 dark:border-white/10 dark:bg-neutral-950 dark:text-white"
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex h-13 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D769A9] to-[#EF4B5A] px-6 text-sm font-bold text-white shadow-lg shadow-[#EF4B5A]/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send my request"}
                <ArrowRight className="h-4 w-4" />
              </button>

              {status.message && (
                <p
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                    status.type === "success"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                      : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
