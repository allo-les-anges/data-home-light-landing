"use client"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { useLocale } from "@/components/providers/LocaleProvider"
import en from "@/messages/en.json"
import fr from "@/messages/fr.json"
import es from "@/messages/es.json"
import de from "@/messages/de.json"
import nl from "@/messages/nl.json"
import pt from "@/messages/pt.json"
import ru from "@/messages/ru.json"
import pl from "@/messages/pl.json"

type HeroCopy = typeof en.hero

const heroCopyByLocale: Record<string, HeroCopy> = {
  en: en.hero, fr: fr.hero, es: es.hero, de: de.hero,
  nl: nl.hero, pt: pt.hero, ru: ru.hero, pl: pl.hero,
}

export function HeroVideo() {
  const { locale, messages } = useLocale()
  const videoRef = useRef<HTMLVideoElement>(null)
  const copy = heroCopyByLocale[locale] ?? en.hero

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause()
    }
  }, [])

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        background: "#040812",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 2.5vw, 24px)",
        overflow: "hidden",
      }}
      aria-label="Hero"
    >
      <div className="hero-frame-wrap">
        {/* Layer 1 — sharp neon pulse strip */}
        <div className="hero-neon-pulse" aria-hidden="true" />
        {/* Layer 2 — focused glow around the head */}
        <div className="hero-neon-glow-head" aria-hidden="true" />
        {/* Layer 3 — wide ambient bloom */}
        <div className="hero-neon-ambient" aria-hidden="true" />

        {/* Inner container — clips video to border-radius */}
        <div className="hero-frame-inner">
          <video
            ref={videoRef}
            src="/video/DATAhome_H1-H4_FINAL_music_1080p.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="hero-video"
          />

          {/* Dark gradient overlay */}
          <div className="hero-overlay" aria-hidden="true" />

          {/* Content */}
          <div className="hero-content">
            <h1 className="cfv3-h1">
              {copy.headline1}
              <br />
              {copy.headline2}
            </h1>
            <p
              className="cfv3-desc"
              style={{ margin: "24px auto 40px", whiteSpace: "pre-line" }}
            >
              {copy.subtitle}
            </p>
            <div className="cfv3-ctas" style={{ justifyContent: "center" }}>
              <Link
                href="https://datahome.vercel.app/register"
                className="product-primary"
              >
                {messages.chrome.trial}
              </Link>
              <a href="#film" className="cfv3-demo-link">
                {copy.demo} ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
