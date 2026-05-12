"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

const STORAGE_KEY = "datahome_cookie_consent_v1"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = window.setTimeout(() => setVisible(true), 650)
      return () => window.clearTimeout(timer)
    }
  }, [])

  const saveChoice = (choice: "all" | "essential") => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        choice,
        acceptedAt: new Date().toISOString(),
      }),
    )
    setVisible(false)
  }

  if (!visible) return null

  return (
    <section
      aria-label="Cookie notice"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[300] w-[min(420px,calc(100vw-32px))] overflow-hidden rounded-3xl border border-black/10 bg-white/95 shadow-[0_28px_80px_rgba(26,26,26,.18)] backdrop-blur-xl md:bottom-6 md:right-6"
    >
      <div className="h-1.5 bg-gradient-to-r from-[#D769A9] to-[#EF4B5A]" />
      <div className="p-6">
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.14em] text-[#D769A9]">
          Privacy first
        </p>
        <h2 className="mb-3 text-xl font-black leading-tight text-[#1a1a1a]">
          We use cookies to improve your experience.
        </h2>
        <p className="mb-5 text-sm leading-7 text-slate-600">
          DATA-HOME uses essential cookies to keep the website secure and optional cookies to
          understand how visitors use our pages. You can accept all cookies or continue with
          essential cookies only.{" "}
          <Link href="/privacy#cookies" className="font-extrabold text-[#18A1CE]">
            Learn more
          </Link>
          .
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => saveChoice("all")}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-[#D769A9] to-[#EF4B5A] px-5 text-sm font-extrabold text-white shadow-[0_4px_16px_rgba(239,75,90,.28)] transition hover:-translate-y-0.5 hover:opacity-95"
          >
            Accept all cookies
          </button>
          <button
            type="button"
            onClick={() => saveChoice("essential")}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-extrabold text-slate-700 transition hover:-translate-y-0.5 hover:border-[#D769A9] hover:text-[#D769A9]"
          >
            Essential only
          </button>
        </div>
      </div>
    </section>
  )
}
