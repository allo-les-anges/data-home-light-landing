import type { Transition, Variants } from "framer-motion"

/* ─────────────────────────────────────────────────────────────
   DATAHOME MOTION TOKENS
   Single source of truth — import from here, never inline.
───────────────────────────────────────────────────────────── */

/** The only easing allowed on the site */
export const ease = [0.22, 1, 0.36, 1] as const

/* Preset transitions ─────────────────────────────────────── */

export const t = {
  /** Generic element reveal: 600ms */
  reveal: { duration: 0.6, ease } satisfies Transition,
  /** Slower reveal for hero / large blocks: 800ms */
  revealSlow: { duration: 0.8, ease } satisfies Transition,
  /** Card hover: 200ms */
  hover: { duration: 0.2, ease } satisfies Transition,
  /** Stagger child offset inside a grid: 80ms */
  stagger: { staggerChildren: 0.08 } satisfies Transition,
  /** Stagger child offset inside a tighter list: 50ms */
  staggerTight: { staggerChildren: 0.05 } satisfies Transition,
  /** Animated counter: 1400ms */
  counter: { duration: 1.4, ease } satisfies Transition,
}

/* Reveal variants (for use with <Reveal>) ────────────────── */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
}

/** Apply to the container; children inherit stagger */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: t.stagger },
}
