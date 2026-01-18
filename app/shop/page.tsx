"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { CategorySection } from "@/components/category-section"
import { ProductCard } from "@/components/product-card"
import { ShoppingCart } from "@/components/shopping-cart"
import { Spinner } from "@/components/ui/spinner"

interface Dog {
  name: string
  image_link: string
  good_with_children: number
  good_with_other_dogs: number
  shedding: number
  grooming: number
  drooling: number
  coat_length: number
  good_with_strangers: number
  playfulness: number
  protectiveness: number
  trainability: number
  energy: number
  barking: number
  min_life_expectancy: number
  max_life_expectancy: number
  max_height_male: number
  max_height_female: number
  max_weight_male: number
  max_weight_female: number
  min_height_male: number
  min_height_female: number
  min_weight_male: number
  min_weight_female: number
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
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

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

  function addToCart(dog: Dog) {
    const price = calculatePrice(dog)
    const existingItem = cart.find((item) => item.dog.name === dog.name)

    if (existingItem) {
      setCart(cart.map((item) => (item.dog.name === dog.name ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { dog, quantity: 1, price }])
    }
  }

  function calculatePrice(dog: Dog): number {
    const basePrice = 299
    const energyBonus = dog.energy * 20
    const trainabilityBonus = dog.trainability * 15
    const familyBonus = dog.good_with_children * 10
    return basePrice + energyBonus + trainabilityBonus + familyBonus
  }

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Shop All Breeds</h1>
          <p className="text-muted-foreground">Browse our complete collection of dog breeds</p>
        </div>

        <CategorySection
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onSearch={setSearchQuery}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner className="w-12 h-12" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDogs.map((dog) => (
              <ProductCard key={dog.name} dog={dog} onAddToCart={addToCart} />
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

      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} setCart={setCart} />
    </div>
  )
}
