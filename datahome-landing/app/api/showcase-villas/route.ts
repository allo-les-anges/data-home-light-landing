import { NextResponse } from "next/server"

const SOURCE_URL =
  "https://datahome.vercel.app/api/properties?lang=en&mode=listing&listingType=sale&minPrice=500000&maxPrice=2000000&limit=80"

function numericPrice(value: unknown) {
  if (typeof value === "number") return value
  if (!value) return 0
  return Number(String(value).replace(/[^\d.]/g, "")) || 0
}

function imageFromProperty(property: any) {
  const images = property?.images
  if (Array.isArray(images)) return images.find(Boolean) || null
  if (typeof images !== "string" || !images.trim()) return property?.image || null
  const value = images.trim()
  if (value.startsWith("{") && value.endsWith("}")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((url) => url.trim().replace(/^"|"$/g, ""))
      .find(Boolean) || null
  }
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.find(Boolean) || null : null
  } catch {
    return value.startsWith("http") ? value : null
  }
}

function pickVaried(properties: any[]) {
  const sorted = properties
    .map((property) => ({
      id: property.id,
      ref: property.ref,
      titre: property.titre || property.titre_en || property.titre_fr || property.ref,
      town: property.town || property.ville,
      province: property.province || property.region,
      region: property.region,
      price: numericPrice(property.price || property.prix),
      image: imageFromProperty(property),
    }))
    .filter((property) => property.price >= 500000 && property.price <= 2000000 && property.image)
    .sort((a, b) => a.price - b.price)

  const buckets = [
    [500000, 700000],
    [700000, 900000],
    [900000, 1200000],
    [1200000, 1500000],
    [1500000, 1750000],
    [1750000, 2000001],
  ]

  const picked: typeof sorted = []
  buckets.forEach(([min, max]) => {
    const found = sorted.find((property) => property.price >= min && property.price < max && !picked.includes(property))
    if (found) picked.push(found)
  })
  sorted.forEach((property) => {
    if (picked.length < 6 && !picked.includes(property)) picked.push(property)
  })

  return picked.slice(0, 6)
}

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return NextResponse.json({ properties: [] }, { status: 200 })
    }

    const data = await response.json()
    const properties = Array.isArray(data?.properties) ? data.properties : []

    return NextResponse.json({
      properties: pickVaried(properties),
    })
  } catch {
    return NextResponse.json({ properties: [] }, { status: 200 })
  }
}
