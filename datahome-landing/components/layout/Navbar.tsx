"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#pricing" },
  { label: "Partners", href: "#partners" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/88 shadow-[0_12px_40px_rgba(15,23,42,.08)] backdrop-blur-xl" : "bg-white/72 backdrop-blur-md"}`}>
      <nav className="dh-container flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="Data Home" className="flex items-center">
          <Image src="/dh-logo.png" alt="Data Home" width={280} height={108} className="h-11 w-auto" priority />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-[12px] font-semibold uppercase tracking-[.22em] text-slate-600 transition hover:text-[#EF4B5A]">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="https://datahome.vercel.app/demo" className="rounded-full border border-[#18A1CE] px-5 py-3 text-sm font-bold text-[#18A1CE] transition hover:bg-[#18A1CE] hover:text-white">
            Live demo
          </Link>
          <Link href="https://datahome.vercel.app/register" className="dh-button-gradient rounded-full px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5">
            Create my site
          </Link>
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm lg:hidden" aria-label="Open menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-6 py-5 shadow-2xl lg:hidden">
          <div className="grid gap-3">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                {item.label}
              </Link>
            ))}
            <Link href="https://datahome.vercel.app/demo" className="rounded-2xl border border-[#18A1CE] px-4 py-3 text-center text-sm font-bold text-[#18A1CE]">Live demo</Link>
            <Link href="https://datahome.vercel.app/register" className="dh-button-gradient rounded-2xl px-4 py-3 text-center text-sm font-bold text-white">Create my site</Link>
          </div>
        </div>
      )}
    </header>
  )
}
