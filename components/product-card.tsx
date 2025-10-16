"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductCardProps {
  id: string
  name: string
  image: string
  pricePerKg: number
  story: string
  generation: string
}

export function ProductCard({ id, name, image, pricePerKg, story, generation }: ProductCardProps) {
  const [selectedKg, setSelectedKg] = useState("1")
  const [showStory, setShowStory] = useState(false)

  const kgOptions = ["0.5", "1", "2", "5"]
  const totalPrice = (pricePerKg * Number.parseFloat(selectedKg)).toFixed(2)

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    // Add new item
    cart.push({
      id,
      name,
      image,
      kg: Number.parseFloat(selectedKg),
      pricePerKg,
      totalPrice: Number.parseFloat(totalPrice),
    })

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Dispatch custom event to update cart counter
    window.dispatchEvent(new Event("cartUpdated"))

    // Show confirmation
    alert(`Added ${selectedKg}kg of ${name} to cart!`)
  }

  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-foreground mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground italic">{generation}</p>
        </div>

        {/* Story Snippet */}
        <div>
          <p className="text-sm text-foreground/80 leading-relaxed">{showStory ? story : `${story.slice(0, 60)}...`}</p>
          <button
            onClick={() => setShowStory(!showStory)}
            className="text-primary text-sm font-medium hover:underline mt-1"
          >
            {showStory ? "Show less" : "Read full story"}
          </button>
        </div>

        {/* KG Selector and Price */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-foreground">Weight:</label>
            <Select value={selectedKg} onValueChange={setSelectedKg}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {kgOptions.map((kg) => (
                  <SelectItem key={kg} value={kg}>
                    {kg} KG
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Price per kg: ${pricePerKg}</div>
              <div className="text-2xl font-bold text-primary">${totalPrice}</div>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          size="lg"
        >
          Add to Basket
        </Button>
      </div>
    </div>
  )
}
