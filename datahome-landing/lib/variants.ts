/**
 * Shared Framer Motion animation variants.
 *
 * Defining variants in one place keeps animation logic out of components
 * and makes it easy to keep timing consistent across the whole page.
 *
 * Pattern: variants are plain objects with named states (e.g. "hidden" / "visible").
 * A parent `motion.div` declares a state; children that also use `variants`
 * automatically inherit and react to the parent's state — no extra props needed.
 */

import type { Variants } from "framer-motion"

/**
 * Fade up on enter. The `custom` prop on the motion element sets the stagger
 * index so each item delays itself relative to its neighbours.
 * Usage: <motion.div variants={fadeInUp} custom={2} initial="hidden" animate="visible">
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,   // 80 ms between each element — subtle, not slow
      duration: 0.55,
      ease: "circOut",   // fast start, smooth landing (same feel as cubic-bezier 0.22,1,0.36,1)
    },
  }),
}

/**
 * Wrapper that staggers its direct children as they enter the viewport.
 * Pair with `staggerItem` on each child.
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,  // 70 ms between each child entering
      delayChildren: 0.05,    // small pause before the first child starts
    },
  },
}

/**
 * A single card/item animated by a `staggerContainer` parent.
 * No custom index needed — the parent handles the timing.
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "circOut" },
  },
}

/**
 * Scale in from slightly smaller. Good for badges and pill elements
 * where a vertical fade-up would feel too heavy.
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "circOut" },
  },
}

/**
 * Card hover variants. Defined as named states so they can propagate
 * down to child elements (e.g. an icon inside the card).
 *
 * To use: add `initial="rest" whileHover="hover" animate="rest"` to the card.
 * Any child `motion.div` with matching variant keys will animate automatically.
 */
export const cardVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.04)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  hover: {
    y: -4,
    scale: 1.02,
    boxShadow: "0 20px 40px -8px rgb(0 0 0 / 0.12)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
}

/**
 * Icon variant used inside a card that has `cardVariants`.
 * Because variants propagate from parent to child in Framer Motion,
 * this icon will rotate and scale automatically when its parent card is hovered.
 */
export const iconVariants: Variants = {
  rest: {
    rotate: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  hover: {
    rotate: 8,
    scale: 1.15,
    transition: { duration: 0.2, ease: "easeOut" },
  },
}

// Stagger variants for Navbar links (mount-time animation, not scroll-triggered)
export const navContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

export const navItem: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "circOut" },
  },
}
