"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { ProductCard } from "@/components/product-card"
import { ShoppingCart } from "@/components/shopping-cart"
import { Footer } from "@/components/footer"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"
import { DogBreed } from "@/lib/types"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

function CategoryPageContent({ categoryName, categoryFilter, description }: any) {
  const [dogs, setDogs] = useState<DogBreed[]>([])
  const [filteredDogs, setFilteredDogs] = useState<DogBreed[]>([])
  const [loading, setLoading] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { toast } = useToast()
  const { cartItems, addToCart, updateQuantity, removeFromCart, cartItemCount } = useCart()

  const fetchDogs = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/dogs")
      const data = await response.json()
      if (Array.isArray(data)) {
        setDogs(data)
      } else {
        setDogs([])
      }
    } catch (error) {
      console.error("Error fetching dogs:", error)
      setDogs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDogs()
  }, [])

  useEffect(() => {
    filterDogsByCategory()
  }, [dogs])

  const filterDogsByCategory = () => {
    const filtered = dogs.filter((dog) => {
      const avgWeight = (dog.max_weight_male + dog.max_weight_female) / 2

      switch (categoryFilter) {
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

  const calculatePrice = (dog: DogBreed) => {
    const basePrice = 50
    const energyPrice = dog.energy * 10
    const trainabilityPrice = dog.trainability * 15
    const childFriendlyPrice = dog.good_with_children * 8
    return basePrice + energyPrice + trainabilityPrice + childFriendlyPrice
  }

  const handleAddToCart = (dog: DogBreed) => {
    const price = calculatePrice(dog)
    addToCart({
      id: dog.name,
      name: dog.name,
      image: dog.image_link || "/placeholder.svg",
      price,
      quantity: 1,
    })

    toast({
      title: "Added to cart!",
      description: `${dog.name} has been added to your cart.`,
    })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity)
  }

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id)
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    })
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="inline-flex items-center text-primary hover:underline mb-8">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">{categoryName}</h1>
          <p className="text-muted-foreground text-lg mb-4">{description}</p>
          <p className="text-muted-foreground text-lg">
            {filteredDogs.length} {filteredDogs.length === 1 ? "breed" : "breeds"} available
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
            <p className="mt-6 text-lg text-muted-foreground">Loading dog breeds...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredDogs.map((dog) => (
              <ProductCard
                key={dog.name}
                dog={dog}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        {!loading && filteredDogs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-muted-foreground text-xl">No dog breeds found in this category.</p>
          </div>
        )}
      </div>

      <Footer />

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

export default function FamilyDogsPage() {
  return (
    <CategoryPageContent
      categoryName="Family Friendly Dogs"
      categoryFilter="family"
      description="Great with children and loving. Discover dog breeds perfect for families with kids."
    />
  )
}
