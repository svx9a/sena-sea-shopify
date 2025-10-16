import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { OceanGlobe } from "@/components/ocean-globe"
import { FloatingFish } from "@/components/floating-fish"
import { SeafoodProductGrid } from "@/components/seafood-product-grid"
import { EducationalSection } from "@/components/educational-section"
import { EmailPopup } from "@/components/email-popup"
import { Footer } from "@/components/footer"

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <OceanGlobe />
      <section className="relative bg-gradient-to-b from-background to-[#E3F2FD] py-8">
        <FloatingFish />
      </section>
      <SeafoodProductGrid />
      <EducationalSection />
      <Footer />
      <EmailPopup />
    </main>
  )
}
