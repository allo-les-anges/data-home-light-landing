"use client"

import Image from "next/image"
import { Marquee } from "@/components/ui/marquee"

/* ─── Partner logos ──────────────────────────────────────────────────────── */
/* Text items render as styled wordmarks; image items use the real asset.    */
const logos: Array<
  | { type: "image"; name: string; src: string; w: number; h: number }
  | { type: "text"; name: string; suffix?: string }
> = [
  { type: "image", name: "HabiHub", src: "/partner-habihub.png", w: 108, h: 32 },
  { type: "text",  name: "Inmovilla" },
  { type: "text",  name: "Witei" },
  { type: "text",  name: "HubSpot" },
  { type: "text",  name: "Zoho", suffix: "CRM" },
  { type: "text",  name: "Idealista" },
  { type: "text",  name: "SeLoger" },
  { type: "text",  name: "Rightmove" },
]

function LogoChip(logo: (typeof logos)[number]) {
  if (logo.type === "image") {
    return (
      <div className="mx-8 flex items-center justify-center">
        <Image
          src={logo.src}
          alt={logo.name}
          width={logo.w}
          height={logo.h}
          className="h-6 w-auto grayscale invert opacity-30 transition-opacity duration-200 group-hover:opacity-50"
        />
      </div>
    )
  }
  return (
    <div className="mx-8 flex items-center justify-center gap-1">
      <span
        className="text-[13px] font-semibold tracking-[-0.01em] text-white/30 transition-opacity duration-200 group-hover:opacity-[0.55]"
        style={{ fontFamily: "inherit" }}
      >
        {logo.name}
      </span>
      {logo.suffix && (
        <span className="text-[11px] font-medium text-white/25">
          {logo.suffix}
        </span>
      )}
    </div>
  )
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export function Partners() {
  return (
    <section className="py-8" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
      {/* Label */}
      <div className="dh-container mb-5">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.28)" }}>
          Intégrations &amp; partenaires
        </p>
      </div>

      {/* Marquee + edge fades */}
      <div className="group relative overflow-hidden">
        {/* Left fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28"
          style={{
            background:
              "linear-gradient(to right, #000000 0%, rgba(0,0,0,0) 100%)",
          }}
        />
        {/* Right fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28"
          style={{
            background:
              "linear-gradient(to left, #000000 0%, rgba(0,0,0,0) 100%)",
          }}
        />

        <Marquee
          pauseOnHover
          repeat={4}
          className="[--duration:35s] [--gap:0px] py-1"
        >
          {logos.map((logo) => (
            <LogoChip key={logo.name} {...logo} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}
