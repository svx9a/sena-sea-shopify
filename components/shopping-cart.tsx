"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  image: string
  kg: number
  pricePerKg: number
  totalPrice: number
}

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    // Load cart from localStorage
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      setCartItems(cart)
    }

    loadCart()

    // Listen for cart updates
    const handleCartUpdate = () => loadCart()
    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)

  const removeItem = (index: number) => {
    const newCart = cartItems.filter((_, i) => i !== index)
    localStorage.setItem("cart", JSON.stringify(newCart))
    setCartItems(newCart)
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const clearCart = () => {
    localStorage.setItem("cart", "[]")
    setCartItems([])
    window.dispatchEvent(new Event("cartUpdated"))
  }

  return (
    <>
      {/* Cart Button */}
      <button onClick={() => setIsOpen(true)} className="relative p-2 hover:bg-muted rounded-lg transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Slide-out Cart */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />

          {/* Cart Panel */}
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-serif text-2xl font-bold text-foreground">Your Basket</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Your basket is empty</p>
                  <p className="text-sm text-muted-foreground mt-2">Add some fresh seafood to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-4 bg-muted/30 p-4 rounded-lg">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.kg} KG × ${item.pricePerKg}/kg
                        </p>
                        <p className="text-lg font-bold text-primary mt-1">${item.totalPrice.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(index)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="font-semibold text-foreground">Total:</span>
                  <span className="font-bold text-2xl text-primary">${totalAmount}</span>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="lg">
                  Checkout
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={clearCart}>
                  Clear Basket
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
