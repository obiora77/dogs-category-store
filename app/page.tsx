"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { ShoppingCart, type CartItem } from "@/components/shopping-cart"
import { ProductCard } from "@/components/product-card"
import { useToast } from "@/hooks/use-toast"

interface DogBreed {
  name: string
  image_link: string
  good_with_children: number
  good_with_other_dogs: number
  shedding: number
  grooming: number
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

export default function DogsPage() {
  const [dogs, setDogs] = useState<DogBreed[]>([])
  const [filteredDogs, setFilteredDogs] = useState<DogBreed[]>([])
  const [loading, setLoading] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("")
  const { toast } = useToast()

  const fetchDogs = async (name?: string) => {
    setLoading(true)
    try {
      const url = name ? `/api/dogs?name=${encodeURIComponent(name)}` : "/api/dogs"
      const response = await fetch(url)
      const data = await response.json()

      if (Array.isArray(data)) {
        setDogs(data)
        setFilteredDogs(data)
      } else {
        setDogs([])
        setFilteredDogs([])
      }
    } catch (error) {
      console.error("Error fetching dogs:", error)
      setDogs([])
      setFilteredDogs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDogs()
  }, [])

  const handleCategoryClick = (filter: string) => {
    setActiveCategory(filter)
    if (!filter) {
      setFilteredDogs(dogs)
      return
    }

    const filtered = dogs.filter((dog) => {
      const avgWeight = (dog.max_weight_male + dog.max_weight_female) / 2
      const avgHeight = (dog.max_height_male + dog.max_height_female) / 2

      switch (filter) {
        case "small":
          return avgWeight < 25
        case "medium":
          return avgWeight >= 25 && avgWeight < 60
        case "large":
          return avgWeight >= 60
        case "working":
          return dog.energy >= 4
        case "family":
          return dog.good_with_children >= 4
        default:
          return true
      }
    })
    setFilteredDogs(filtered)
  }

  const handleSearch = (term: string) => {
    if (!term) {
      fetchDogs()
    } else {
      fetchDogs(term)
    }
    setActiveCategory("")
  }

  const calculatePrice = (dog: DogBreed) => {
    const basePrice = 50
    const energyPrice = dog.energy * 10
    const trainabilityPrice = dog.trainability * 15
    const childFriendlyPrice = dog.good_with_children * 8
    return basePrice + energyPrice + trainabilityPrice + childFriendlyPrice
  }

  const handleAddToCart = (dog: DogBreed) => {
    const price = calculatePrice(dog)
    const existingItem = cartItems.find((item) => item.id === dog.name)

    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === dog.name ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCartItems([
        ...cartItems,
        {
          id: dog.name,
          name: dog.name,
          image: dog.image_link || "/placeholder.svg",
          price,
          quantity: 1,
        },
      ])
    }

    toast({
      title: "Added to cart!",
      description: `${dog.name} has been added to your cart.`,
    })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(id)
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    })
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      <HeroSection onSearch={handleSearch} />

      <CategorySection onCategoryClick={handleCategoryClick} activeCategory={activeCategory} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
            <p className="mt-6 text-lg text-muted-foreground">Loading dog breeds...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground">Available Breeds</h2>
              <p className="text-muted-foreground mt-2 text-lg">
                {filteredDogs.length} {filteredDogs.length === 1 ? "breed" : "breeds"} available
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDogs.map((dog) => (
                <ProductCard
                  key={dog.name}
                  dog={dog}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}

        {!loading && filteredDogs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-muted-foreground text-xl">No dog breeds found. Try a different search or category.</p>
          </div>
        )}
      </div>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
    </div>
  )
}
