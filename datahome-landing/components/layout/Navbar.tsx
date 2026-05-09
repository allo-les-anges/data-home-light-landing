"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { navContainer, navItem } from "@/lib/variants"

const navLinks = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "Tarifs", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()

  // `mounted` prevents a hydration mismatch: the theme is unknown on the server,
  // so we wait for the client to render the icon.
  const [mounted, setMounted] = useState(false)

  // Track whether the user has scrolled past the hero to switch navbar style.
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)

    // 12px threshold avoids triggering on tiny touch-device overscroll bounces.
    const onScroll = () => setIsScrolled(window.scrollY > 12)
    onScroll() // run once on mount in case the page loads mid-scroll
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
        isScrolled
          // Frosted glass effect when scrolled: semi-transparent background + blur
          ? "bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 shadow-sm shadow-black/5"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo slides in from the left on page load */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "circOut" }}
        >
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1d4ed8] text-white text-sm font-black shadow-sm shadow-blue-500/30">
              D
            </span>
            <span className="text-gray-900 dark:text-white">
              DATA<span className="text-[#1d4ed8]">home</span>
            </span>
          </Link>
        </motion.div>

        {/* Nav links stagger in one by one on mount using navContainer/navItem variants */}
        <motion.div
          className="hidden md:flex items-center gap-7"
          variants={navContainer}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((item) => (
            <motion.div key={item.href} variants={navItem}>
              <Link
                href={item.href}
                className="relative text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-150 group"
              >
                {item.label}
                {/* Animated underline grows from left on hover */}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#1d4ed8] transition-all duration-200 group-hover:w-full rounded-full" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Right side: theme toggle + CTAs, slides in from the right */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "circOut", delay: 0.15 }}
        >
          {/* Theme toggle — AnimatePresence swaps Sun/Moon with a rotation so
              the transition feels intentional rather than just blinking. */}
          {mounted && (
            <motion.button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="relative p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-150 overflow-hidden"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              {/* mode="wait" ensures the exit animation finishes before the new icon enters */}
              <AnimatePresence mode="wait" initial={false}>
                {resolvedTheme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="block"
                  >
                    <Sun className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="block"
                  >
                    <Moon className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          <Link
            href="#pricing"
            className="hidden sm:inline-flex text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 px-3 py-2"
          >
            Se connecter
          </Link>

          {/* Subtle scale feedback on the primary CTA button */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ duration: 0.15 }}>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1d4ed8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1e40af] transition-colors duration-150 shadow-sm shadow-blue-500/25"
            >
              Démarrer
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </nav>
    </header>
  )
}
