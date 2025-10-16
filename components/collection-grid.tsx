import Image from "next/image"
import Link from "next/link"
import type { ShopifyCollection } from "@/lib/shopify/types"

interface CollectionGridProps {
  collections: ShopifyCollection[]
}

export function CollectionGrid({ collections }: CollectionGridProps) {
  // Default collections if none provided
  const defaultCollections = [
    { id: "1", title: "Shop Salmon", handle: "salmon", description: "Premium wild-caught salmon", image: null },
    { id: "2", title: "Shop White Fish", handle: "white-fish", description: "Fresh halibut and cod", image: null },
    { id: "3", title: "Shop Shellfish", handle: "shellfish", description: "Crab, shrimp, and more", image: null },
    { id: "4", title: "Shop Seasonings", handle: "seasonings", description: "Perfect seafood spices", image: null },
  ]

  const displayCollections = collections.length > 0 ? collections : defaultCollections

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">COLLECTION LIST</h2>
          <div className="w-16 h-0.5 bg-secondary mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCollections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-muted"
            >
              <div className="absolute inset-0">
                {collection.image ? (
                  <Image
                    src={collection.image.url || "/placeholder.svg"}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <Image
                    src={`/.jpg?height=600&width=450&query=${collection.title.toLowerCase()}`}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="relative h-full flex items-end p-6">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white">{collection.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
