"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { OceanWaves } from "@/components/ocean-waves"

export function Hero() {
  const [showStory, setShowStory] = useState(false)

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0077BE] via-[#42A5F5] to-[#87CEEB]">
        <OceanWaves />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-accent/80 via-accent/40 to-transparent" />

      <div className="relative container h-full flex flex-col justify-end pb-16 md:pb-24 px-4 md:px-6 z-10">
        <div className="max-w-2xl space-y-6">
          <div className="inline-block px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
            <span className="text-white font-semibold text-sm">THREE GENERATIONS STRONG</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance leading-tight drop-shadow-lg">
            Three Generations of Ocean Wisdom
          </h1>
          <p className="text-lg md:text-xl text-white/95 text-pretty leading-relaxed drop-shadow-md">
            From our family's boat to your table - since 1965
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
              onClick={() => setShowStory(!showStory)}
            >
              {showStory ? "CLOSE STORY" : "READ OUR STORY"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm shadow-lg"
            >
              SHOP SEAFOOD
            </Button>
          </div>
        </div>
      </div>

      {showStory && (
        <div className="absolute inset-0 bg-accent/95 overflow-y-auto z-20">
          <div className="container px-4 md:px-6 py-12">
            <button
              onClick={() => setShowStory(false)}
              className="absolute top-4 right-4 text-white hover:text-white/80 text-2xl"
            >
              ✕
            </button>

            <div className="max-w-4xl mx-auto space-y-12 text-white">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-12">
                The Chorfarmkung Family Story
              </h2>

              {/* Grandfather - 1960s */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="text-secondary font-bold text-sm">1960s - THE BEGINNING</div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold">Grandfather's First Boat</h3>
                  <p className="text-white/90 leading-relaxed">
                    It all started with one small wooden boat and a dream. Grandfather learned the traditional fishing
                    methods from his father, understanding the ocean's rhythms and respecting its bounty. He taught us
                    that sustainable fishing isn't just about today's catch - it's about preserving the ocean for future
                    generations.
                  </p>
                </div>
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/vintage-1960s-grandfather-fishing-boat-black-and-w.jpg"
                    alt="Grandfather fishing in the 1960s"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Father - 1990s */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden order-2 md:order-1">
                  <Image
                    src="/1990s-father-fishing-boat-modern-equipment.jpg"
                    alt="Father expanding the business in the 1990s"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4 order-1 md:order-2">
                  <div className="text-secondary font-bold text-sm">1990s - GROWTH</div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold">Father's Innovation</h3>
                  <p className="text-white/90 leading-relaxed">
                    Father modernized our operations while keeping grandfather's values at the heart. He introduced
                    better preservation techniques and built relationships with local communities. The business grew,
                    but we never forgot where we came from - every fish caught with respect, every customer treated like
                    family.
                  </p>
                </div>
              </div>

              {/* Current Generation */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="text-secondary font-bold text-sm">TODAY - TRADITION MEETS TECHNOLOGY</div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold">Our Promise to You</h3>
                  <p className="text-white/90 leading-relaxed">
                    Now we bring three generations of ocean wisdom directly to your table. Using modern technology to
                    connect with you, but never compromising on the traditional methods that make our seafood special.
                    Every order supports sustainable fishing and honors the legacy of those who came before us.
                  </p>
                </div>
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="/modern-fishing-boat-crew-family-business-sustainab.jpg"
                    alt="Current generation continuing the tradition"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
