"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { MapPin } from "lucide-react"

type VillaCard = { name: string; location: string; price: number; image: string; badge: string }

const fallbackVillas: VillaCard[] = [
  { name: "Villa Victoria", location: "Ciudad Quesada, Alicante", price: 883210, image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/13112583/media/images/1.jpg", badge: "Featured" },
  { name: "Modern Sea View Villa", location: "Marbella, Costa del Sol", price: 1245000, image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/37089450/media/images/outdoor/1.jpg", badge: "Sea view" },
  { name: "Golf Residence", location: "Benahavis, Malaga", price: 695000, image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/82064372/media/images/1.jpg", badge: "Luxury" },
  { name: "Family Villa", location: "Costa Calida, Murcia", price: 525000, image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/60846833/media/images/1.jpg", badge: "Prestige" },
  { name: "Design Villa", location: "Altea, Alicante", price: 1590000, image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/25407071/media/images/outdoor/1.jpg", badge: "Exclusive" },
  { name: "Mediterranean Home", location: "Estepona, Malaga", price: 1995000, image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/70091589/media/images/outdoor/1.jpg", badge: "Premium" },
]

function parseImages(images: unknown): string[] {
  if (Array.isArray(images)) return images.filter(Boolean) as string[]
  if (typeof images !== "string" || !images.trim()) return []
  try {
    const parsed = JSON.parse(images)
    return Array.isArray(parsed) ? parsed.filter(Boolean) : []
  } catch {
    return images.startsWith("http") ? [images] : []
  }
}

function numericPrice(value: unknown) {
  if (typeof value === "number") return value
  return Number(String(value || "").replace(/[^\d.]/g, "")) || 0
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(price)
}

export function VillasShowcase() {
  const [remoteVillas, setRemoteVillas] = useState<VillaCard[] | null>(null)
  const villas = useMemo(() => (remoteVillas?.length ? remoteVillas : fallbackVillas), [remoteVillas])

  useEffect(() => {
    let mounted = true
    async function loadVillas() {
      try {
        const response = await fetch("/api/showcase-villas", { cache: "no-store" })
        if (!response.ok) return
        const payload = await response.json()
        const mapped = (Array.isArray(payload?.properties) ? payload.properties : [])
          .map((property: any, index: number) => {
            const image = property.image || parseImages(property.images)[0]
            return {
              name: property.titre_en || property.titre || property.title || property.ref || `Property ${index + 1}`,
              location: [property.town || property.ville, property.province || property.region].filter(Boolean).join(", "),
              price: numericPrice(property.price || property.prix),
              image,
              badge: ["Featured", "Sea view", "Luxury", "Prestige", "Exclusive", "Premium"][index % 6],
            }
          })
          .filter((property: VillaCard) => property.image && property.price >= 500000 && property.price <= 2000000)
          .slice(0, 6)
        if (mounted && mapped.length) setRemoteVillas(mapped)
      } catch {
        if (mounted) setRemoteVillas(null)
      }
    }
    loadVillas()
    return () => { mounted = false }
  }, [])

  return (
    <section id="showcase" className="py-24 md:py-32">
      <div className="dh-container">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[.22em] text-[#D769A9]">Showcases that sell</p>
            <h2 className="mt-4 text-4xl font-black text-[#080B1D] md:text-5xl">Real listings, presented with clarity.</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-600">A varied selection from the villas table, from EUR 500K to EUR 2M, with imagery that feels premium from the first scroll.</p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {villas.map((villa) => (
            <article key={`${villa.name}-${villa.price}`} className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/80">
              <div className="relative h-64 overflow-hidden">
                <Image src={villa.image} alt={villa.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B1D]/70 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/92 px-4 py-2 text-xs font-black uppercase tracking-[.12em] text-[#EF4B5A]">{villa.badge}</span>
                <p className="absolute bottom-4 left-4 text-2xl font-black text-white">{formatPrice(villa.price)}</p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold text-[#080B1D]">{villa.name}</h3>
                <p className="mt-3 flex items-center gap-2 text-sm text-slate-500"><MapPin className="h-4 w-4 text-[#18A1CE]" /> {villa.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
