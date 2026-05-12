import { Hero } from "@/components/sections/Hero"
import { VillasShowcase } from "@/components/sections/VillasShowcase"
import { PremiumDestinations } from "@/components/sections/PremiumDestinations"
import { Features } from "@/components/sections/Features"
import { Templates } from "@/components/sections/Templates"
import { Pricing } from "@/components/sections/Pricing"
import { FAQ } from "@/components/sections/FAQ"
import { Contact } from "@/components/sections/Contact"

export default function Page() {
  return (
    <>
      <Hero />
      <PremiumDestinations />
      <VillasShowcase />
      <Features />
      <Templates />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  )
}
