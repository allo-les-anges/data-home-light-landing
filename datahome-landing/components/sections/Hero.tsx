"use client"

import Link from "next/link"
import Image from "next/image"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  animate,
} from "framer-motion"
import { useEffect } from "react"
import { ease } from "@/lib/motion"

export function Hero() {
  const reduced = useReducedMotion()

  /* ── Pointer tilt (desktop only) ─────────────────────────── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.5, -1.5]), {
    stiffness: 60,
    damping: 18,
  })
  const rotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1.5, 1.5]), {
    stiffness: 60,
    damping: 18,
  })

  /* ── Ambient float — starts after entrance settles ───────── */
  const floatY = useMotionValue(0)
  useEffect(() => {
    if (reduced) return
    const timer = window.setTimeout(() => {
      const ctrl = animate(floatY, [0, -4, 0, 4, 0], {
        duration: 7,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      })
      return () => ctrl.stop()
    }, 1500)
    return () => window.clearTimeout(timer)
  }, [reduced, floatY])

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced || window.innerWidth < 1024) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      className="hero-v4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Back light — large atmospheric bloom, animated in */}
      <motion.div
        className="hero-back-light"
        aria-hidden
        initial={{ opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.7, ease, delay: 0.12 }}
      />
      {/* Secondary light — smaller, appears to come from dashboard */}
      <motion.div
        className="hero-secondary-light"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease, delay: 0.65 }}
      />

      <div className="hero-v4-inner dh-container">
        {/* ── Copy ──────────────────────────────────────────── */}
        <div className="hero-v4-copy">
          <motion.p
            className="product-status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            La plateforme SaaS pour les agences immobilières
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease, delay: 0.08 }}
          >
            Votre agence.<br />
            En ligne.<br />
            En 24 heures.
          </motion.h1>

          <motion.p
            className="product-hero-description"
            style={{ marginTop: 20, marginBottom: 36 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.16 }}
          >
            DATAhome centralise votre site, vos biens, vos leads et vos
            performances dans une seule plateforme — sans développeur,
            sans serveur, sans friction.
          </motion.p>

          <motion.div
            className="product-actions"
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.22 }}
          >
            <Link href="#contact" className="product-primary">
              Démarrer — 15 jours gratuits
            </Link>
            <Link href="#demo" className="product-demo">
              Voir la démo →
            </Link>
          </motion.div>
        </div>

        {/* ── Product object ────────────────────────────────── */}
        {/* Outer: entrance animation (opacity + y + scale) */}
        <motion.div
          initial={{ opacity: 0, y: 45, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.18 }}
        >
          {/* Perspective wrapper — required for rotateX/Y to look 3D */}
          <div style={{ perspective: "900px" }}>
            {/* Inner: ongoing float + pointer tilt */}
            <motion.div
              className="hero-product-scene"
              style={{
                y: reduced ? 0 : floatY,
                rotateX: reduced ? 0 : rotX,
                rotateY: reduced ? 0 : rotY,
              }}
            >
              {/* Edge light — left+top corner only */}
              <div className="hero-edge-light" aria-hidden />

              <div className="hero-v4-product">
                <div className="hero-v4-product-inner">
                  <Image
                    src="/screenshots/premium/cockpit-premium-night-source.png"
                    alt="Cockpit DATAhome — tableau de bord agence"
                    fill
                    sizes="(max-width: 767px) 100vw, 55vw"
                    style={{ objectFit: "cover", objectPosition: "50% 12%" }}
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
