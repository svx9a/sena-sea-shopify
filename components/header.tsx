import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "@/components/shopping-cart"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl font-bold text-primary">Chorfarmkung</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            Our Story
          </Link>
          <Link href="/sustainability" className="text-sm font-medium hover:text-primary transition-colors">
            Sustainability
          </Link>
          <Link href="/recipes" className="text-sm font-medium hover:text-primary transition-colors">
            Recipes
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ShoppingCart />
        </div>
      </div>
    </header>
  )
}
