import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">Sena Sea</h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Premium wild-caught Alaskan seafood delivered fresh to your door.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collections/salmon" className="hover:text-secondary transition-colors">
                  Salmon
                </Link>
              </li>
              <li>
                <Link href="/collections/white-fish" className="hover:text-secondary transition-colors">
                  White Fish
                </Link>
              </li>
              <li>
                <Link href="/collections/shellfish" className="hover:text-secondary transition-colors">
                  Shellfish
                </Link>
              </li>
              <li>
                <Link href="/collections/seasonings" className="hover:text-secondary transition-colors">
                  Seasonings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-secondary transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-secondary transition-colors">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Sena Sea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
