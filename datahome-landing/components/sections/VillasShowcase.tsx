"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { MapPin } from "lucide-react"

type VillaCard = { name: string; location: string; price: number; image: string }

const fallbackVillas: VillaCard[] = [
  { name: "Villa Victoria", location: "Ciudad Quesada, Alicante", price: 883210, image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/13112583/media/images/1.jpg" },
  { name: "Modern Sea View Villa", location: "Marbella, Costa del Sol", price: 1245000, image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/37089450/media/images/outdoor/1.jpg" },
  { name: "Golf Residence", location: "Benahavis, Malaga", price: 695000, image: "https://medianewbuild.com/file/hh-media-bucket/developments_v2/82064372/media/images/1.jpg" },
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
          .map((property: any) => {
            const image = property.image || parseImages(property.images)[0]
            return {
              name: property.titre_en || property.titre || property.title || property.ref || "Property",
              location: [property.town || property.ville, property.province || property.region].filter(Boolean).join(", "),
              price: numericPrice(property.price || property.prix),
              image,
            }
          })
          .filter((property: VillaCard) => property.image && property.price >= 500000 && property.price <= 2000000)

        // Deduplicate by location — remote source sometimes returns same development twice
        const seenLocations = new Set<string>()
        const deduped = mapped.filter((v: VillaCard) => {
          if (!v.location || seenLocations.has(v.location)) return false
          seenLocations.add(v.location)
          return true
        })

        // Supplement with verified fallback entries if fewer than 3 unique locations
        let result: VillaCard[] = deduped.slice(0, 3)
        if (result.length < 3) {
          for (const fb of fallbackVillas) {
            if (result.length >= 3) break
            if (!seenLocations.has(fb.location)) {
              result.push(fb)
              seenLocations.add(fb.location)
            }
          }
        }

        if (mounted && result.length) setRemoteVillas(result)
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
        <div className="mb-12 max-w-xl">
          <h2 className="text-3xl font-black text-[#080B1D] md:text-4xl">Real listings, presented with clarity.</h2>
          <p className="mt-4 text-sm leading-[1.85] text-slate-500">Live catalogue from agencies on DATAhome — real property data, real imagery.</p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {villas.map((villa) => (
            <article
              key={`${villa.name}-${villa.price}`}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={villa.image}
                  alt={villa.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-extrabold text-[#080B1D]">{villa.name}</h3>
                  <p className="shrink-0 text-base font-black tabular-nums text-[#080B1D]">{formatPrice(villa.price)}</p>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#18A1CE]" />
                  {villa.location}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
