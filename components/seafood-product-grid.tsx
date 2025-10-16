import { ProductCard } from "@/components/product-card"

const seafoodProducts = [
  {
    id: "1",
    name: "Red Snapper",
    image: "/fresh-red-snapper-fish.jpg",
    pricePerKg: 45,
    story:
      "Grandfather's favorite catch - he taught us the best spots where the snapper gather at dawn. Using traditional line fishing methods passed down through generations, we ensure each fish is caught with care and respect for the ocean.",
    generation: "Since 1965",
  },
  {
    id: "2",
    name: "Wild Salmon",
    image: "/fresh-wild-salmon-fillet.jpg",
    pricePerKg: 52,
    story:
      "Father perfected the art of salmon fishing in the cold Alaskan waters. His secret? Patience and understanding the salmon's migration patterns. Every fillet tells a story of early mornings and respect for nature's rhythms.",
    generation: "Since 1990",
  },
  {
    id: "3",
    name: "King Prawns",
    image: "/fresh-king-prawns-seafood.jpg",
    pricePerKg: 38,
    story:
      "These prawns come from the pristine waters grandfather first explored. We use sustainable trapping methods that protect the ocean floor and ensure only the finest prawns make it to your table. Sweet, succulent, and caught with pride.",
    generation: "Since 1965",
  },
  {
    id: "4",
    name: "Sea Bass",
    image: "/fresh-sea-bass-whole-fish.jpg",
    pricePerKg: 48,
    story:
      "A family favorite for special occasions. Father taught us that sea bass requires gentle handling from ocean to plate. Each fish is individually selected for quality, ensuring you receive the same premium catch we serve our own family.",
    generation: "Since 1990",
  },
  {
    id: "5",
    name: "Lobster",
    image: "/fresh-lobster-seafood.jpg",
    pricePerKg: 65,
    story:
      "The crown jewel of our catch. Using grandfather's traditional pot methods, we harvest lobster sustainably from rocky coastal waters. Each lobster is a testament to three generations of expertise and our commitment to ocean stewardship.",
    generation: "Since 1965",
  },
  {
    id: "6",
    name: "Halibut",
    image: "/fresh-halibut-fish-fillet.jpg",
    pricePerKg: 42,
    story:
      "Caught in the deep waters where father learned his craft. Halibut fishing requires skill and patience - qualities passed down through our family. The result is firm, flaky white fish that's perfect for any recipe.",
    generation: "Since 1990",
  },
]

export function SeafoodProductGrid() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">Our Family's Catch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Every fish has a story. Every story honors our heritage.
          </p>
          <div className="w-16 h-0.5 bg-secondary mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seafoodProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
