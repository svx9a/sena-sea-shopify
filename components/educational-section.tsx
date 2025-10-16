import Image from "next/image"
import { Button } from "@/components/ui/button"

export function EducationalSection() {
  return (
    <>
      <section className="py-12 bg-gradient-to-b from-[#87CEEB] to-background border-t-0">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-8">
            <p className="text-primary font-bold text-sm tracking-wide uppercase">
              Sustainably Sourced From Pristine Waters
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center gap-2 text-primary">
              <span className="text-3xl drop-shadow-md">🎣</span>
              <span className="font-semibold">Three Generations</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="text-3xl drop-shadow-md">🐟</span>
              <span className="font-semibold">Wild Caught Daily</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="text-3xl drop-shadow-md">⚓</span>
              <span className="font-semibold">Family Tradition</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span className="text-3xl drop-shadow-md">🌊</span>
              <span className="font-semibold">Ocean to Table</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/fresh-black-cod-sablefish-with-ginger-and-vegetabl.jpg"
                alt="Wild Alaskan Seafood"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground text-balance">
                Wild Alaskan Seafood
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                From Ocean to Your Table - Experience the purest seafood from the pristine waters of Alaska. For three
                generations, the Chorfarmkung family has been bringing you the finest wild-caught seafood, harvested
                with traditional methods passed down through our family since 1965.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Every fish we catch tells a story of our commitment to sustainable fishing practices and respect for the
                ocean that has provided for our family for over 60 years.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
                Discover Our Heritage
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
