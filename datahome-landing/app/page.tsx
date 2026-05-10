import { Hero } from "@/components/sections/Hero"
import { VillasShowcase } from "@/components/sections/VillasShowcase"
import { Features } from "@/components/sections/Features"
import { Templates } from "@/components/sections/Templates"
import { Pricing } from "@/components/sections/Pricing"
import { FAQ } from "@/components/sections/FAQ"

export default function Page() {
  return (
    <>
      <Hero />
      <VillasShowcase />
      <Features />
      <Templates />
      <Pricing />
      <FAQ />
    </>
  )
}
