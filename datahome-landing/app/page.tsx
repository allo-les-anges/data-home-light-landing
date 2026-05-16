import { Hero } from "@/components/sections/Hero"
import { PremiumDestinations } from "@/components/sections/PremiumDestinations"
import { VillasShowcase } from "@/components/sections/VillasShowcase"
import { Features } from "@/components/sections/Features"
import { Templates } from "@/components/sections/Templates"
import { Pricing } from "@/components/sections/Pricing"
import { Partners } from "@/components/sections/Partners"
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
      <Partners />
      <FAQ />
      <Contact />
    </>
  )
}
