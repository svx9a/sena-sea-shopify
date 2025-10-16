"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export function EmailPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("hasSeenEmailPopup")
      if (!hasSeenPopup) {
        setIsOpen(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("hasSeenEmailPopup", "true")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email submission
    console.log("Email submitted:", email)
    handleClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl bg-background rounded-lg overflow-hidden shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 text-foreground hover:bg-background/80"
          onClick={handleClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image src="/beautiful-spread-of-wild-alaskan-seafood-dishes-wi.jpg" alt="Alaskan Seafood" fill className="object-cover" />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Sign up for our VIP email list!
            </h2>

            <ul className="space-y-3 mb-8 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>be notified when CR King salmon is available</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>automatically be entered in our monthly drawing for a $50 gift card</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-secondary mt-1">•</span>
                <span>receive a FREE cookbook with family recipes.</span>
              </li>
            </ul>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12"
              />
              <Button type="submit" size="lg" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
