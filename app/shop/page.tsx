"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { CategorySection } from "@/components/category-section"
import { ProductCard } from "@/components/product-card"
import { ShoppingCart } from "@/components/shopping-cart"
import { Spinner } from "@/components/ui/spinner"
import { useCart } from "@/lib/cart-context"
import { DogBreed } from "@/lib/types"

interface Dog extends DogBreed {
  drooling: number
  coat_length: number
  good_with_strangers: number
  playfulness: number
  protectiveness: number
}

interface CartItem {
  dog: Dog
  quantity: number
  price: number
}

export default function ShopPage() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems, addToCart, updateQuantity, removeFromCart, cartItemCount } = useCart()

  useEffect(() => {
    fetchDogs()
  }, [])

  useEffect(() => {
    filterDogs()
  }, [dogs, selectedCategory, searchQuery])

  async function fetchDogs() {
    try {
      setLoading(true)
      const response = await fetch("/api/dogs")
      const data = await response.json()
      setDogs(data)
    } catch (error) {
      console.error("Error fetching dogs:", error)
    } finally {
      setLoading(false)
    }
  }

  function filterDogs() {
    let filtered = [...dogs]

    if (searchQuery) {
      filtered = filtered.filter((dog) => dog.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((dog) => {
        switch (selectedCategory) {
          case "small":
            return dog.max_weight_male <= 25
          case "medium":
            return dog.max_weight_male > 25 && dog.max_weight_male <= 50
          case "large":
            return dog.max_weight_male > 50
          case "family":
            return dog.good_with_children >= 4
          case "active":
            return dog.energy >= 4
          case "low-maintenance":
            return dog.grooming <= 2 && dog.shedding <= 2
          default:
            return true
        }
      })
    }

    setFilteredDogs(filtered)
  }

  function calculatePrice(dog: DogBreed): number {
    const basePrice = 299
    const energyBonus = dog.energy * 20
    const trainabilityBonus = dog.trainability * 15
    const familyBonus = dog.good_with_children * 10
    return basePrice + energyBonus + trainabilityBonus + familyBonus
  }

  const handleAddToCart = (dog: DogBreed) => {
    const price = calculatePrice(dog)
    addToCart({
      id: dog.name,
      name: dog.name,
      image: dog.image_link || "/placeholder.svg",
      price,
      quantity: 1,
    } as any)
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Shop All Breeds</h1>
          <p className="text-muted-foreground">Browse our complete collection of dog breeds</p>
        </div>

        <CategorySection
          activeCategory={selectedCategory}
          onCategoryClick={setSelectedCategory}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner className="w-12 h-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDogs.map((dog) => (
              <ProductCard key={dog.name} dog={dog} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}

        {!loading && filteredDogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No breeds found matching your criteria.</p>
          </div>
        )}

        {!loading && dogs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Unable to load dog breeds. Please try again later.</p>
          </div>
        )}
      </main>

      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
    </div>
  )
}
