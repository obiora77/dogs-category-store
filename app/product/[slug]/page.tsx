"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { ShoppingCart, type CartItem } from "@/components/shopping-cart"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCartIcon, Star, ArrowLeft } from "lucide-react"

interface DogBreed {
  name: string
  image_link: string
  good_with_children: number
  good_with_other_dogs: number
  good_with_strangers: number
  shedding: number
  grooming: number
  trainability: number
  energy: number
  barking: number
  protectiveness: number
  playfulness: number
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

interface Review {
  id: string
  author: string
  rating: number
  comment: string
  date: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [dog, setDog] = useState<DogBreed | null>(null)
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ author: "", rating: 5, comment: "" })
  const [userRating, setUserRating] = useState(5)

  const slug = params.slug as string
  const breedName = slug.replace(/-/g, " ")

  useEffect(() => {
    const fetchDog = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/dogs?name=${encodeURIComponent(breedName)}`)
        const data = await response.json()

        if (Array.isArray(data) && data.length > 0) {
          setDog(data[0])
        } else {
          setDog(null)
        }
      } catch (error) {
        console.error("Error fetching dog:", error)
        setDog(null)
      } finally {
        setLoading(false)
      }
    }

    fetchDog()

    // Load mock reviews
    setReviews([
      {
        id: "1",
        author: "Sarah Johnson",
        rating: 5,
        comment: "Amazing breed! Very friendly and great with kids.",
        date: "2024-01-15",
      },
      {
        id: "2",
        author: "Mike Thompson",
        rating: 4,
        comment: "Highly energetic but wonderful companion. Requires lots of exercise.",
        date: "2024-01-10",
      },
    ])
  }, [breedName])

  const calculatePrice = (dog: DogBreed) => {
    const basePrice = 50
    const energyPrice = dog.energy * 10
    const trainabilityPrice = dog.trainability * 15
    const childFriendlyPrice = dog.good_with_children * 8
    return basePrice + energyPrice + trainabilityPrice + childFriendlyPrice
  }

  const handleAddToCart = () => {
    if (!dog) return

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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newReview.author || !newReview.comment) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    const review: Review = {
      id: Date.now().toString(),
      author: newReview.author,
      rating: userRating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
    }

    setReviews([review, ...reviews])
    setNewReview({ author: "", rating: 5, comment: "" })
    setUserRating(5)

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    })
  }

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
          <p className="mt-6 text-lg text-muted-foreground">Loading breed details...</p>
        </div>
      </div>
    )
  }

  if (!dog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🐕</div>
          <h1 className="text-2xl font-bold mb-4">Breed not found</h1>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const price = calculatePrice(dog)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Breeds
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden shadow-lg">
              {dog.image_link ? (
                <img src={dog.image_link || "/placeholder.svg"} alt={dog.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100">
                  <span className="text-9xl">🐕</span>
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="mb-4">
              <h1 className="text-4xl font-bold text-foreground mb-2">{dog.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">${price.toFixed(2)}</span>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Breed Characteristics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Good with children:</span>
                    <span className="font-medium text-yellow-500">{"★".repeat(dog.good_with_children)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Good with other dogs:</span>
                    <span className="font-medium text-yellow-500">{"★".repeat(dog.good_with_other_dogs)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Good with strangers:</span>
                    <span className="font-medium text-yellow-500">{"★".repeat(dog.good_with_strangers)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Energy level:</span>
                    <span className="font-medium text-yellow-500">{"★".repeat(dog.energy)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Trainability:</span>
                    <span className="font-medium text-yellow-500">{"★".repeat(dog.trainability)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Playfulness:</span>
                    <span className="font-medium text-yellow-500">{"★".repeat(dog.playfulness)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Barking:</span>
                    <span className="font-medium text-yellow-500">{"★".repeat(dog.barking)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Protectiveness:</span>
                    <span className="font-medium text-yellow-500">{"★".repeat(dog.protectiveness)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Shedding:</span>
                    <span className="font-medium text-yellow-500">{"★".repeat(dog.shedding)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Grooming:</span>
                    <span className="font-medium text-yellow-500">{"★".repeat(dog.grooming)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Physical Attributes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block mb-1">Height (Male):</span>
                    <span className="font-medium">
                      {dog.min_height_male} - {dog.max_height_male} inches
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Height (Female):</span>
                    <span className="font-medium">
                      {dog.min_height_female} - {dog.max_height_female} inches
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Weight (Male):</span>
                    <span className="font-medium">
                      {dog.min_weight_male} - {dog.max_weight_male} lbs
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block mb-1">Weight (Female):</span>
                    <span className="font-medium">
                      {dog.min_weight_female} - {dog.max_weight_female} lbs
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground block mb-1">Life Expectancy:</span>
                    <span className="font-medium">
                      {dog.min_life_expectancy} - {dog.max_life_expectancy} years
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Add to Cart - ${price.toFixed(2)}
            </Button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Review Form */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <Label htmlFor="author">Your Name</Label>
                    <Input
                      id="author"
                      value={newReview.author}
                      onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setUserRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-8 h-8 cursor-pointer transition-colors ${
                              star <= userRating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300 hover:text-yellow-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="comment">Your Review</Label>
                    <Textarea
                      id="comment"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Share your experience with this breed..."
                      rows={4}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{review.author}</h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No reviews yet. Be the first to review this breed!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, quantity) => {
          if (quantity === 0) {
            setCartItems(cartItems.filter((item) => item.id !== id))
          } else {
            setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
          }
        }}
        onRemove={(id) => setCartItems(cartItems.filter((item) => item.id !== id))}
      />
    </div>
  )
}
