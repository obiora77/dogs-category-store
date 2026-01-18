"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Dog {
  name: string
  image_link: string
  energy: number
  good_with_children: number
  good_with_other_dogs: number
  trainability: number
  min_life_expectancy: number
  max_life_expectancy: number
}

interface ProductCardProps {
  dog: Dog
  onAddToCart: (dog: Dog) => void
}

export function ProductCard({ dog, onAddToCart }: ProductCardProps) {
  if (!dog || !dog.name) {
    return null
  }

  const name = dog.name || "Unknown Breed"
  const image = dog.image_link || ""
  const energy = dog.energy || 0
  const goodWithChildren = dog.good_with_children || 0
  const goodWithOtherDogs = dog.good_with_other_dogs || 0
  const trainability = dog.trainability || 0
  const lifeExpectancy = dog.max_life_expectancy ? `${dog.min_life_expectancy}-${dog.max_life_expectancy}` : "Unknown"

  const basePrice = 299
  const energyBonus = (energy || 0) * 20
  const trainabilityBonus = (trainability || 0) * 15
  const familyBonus = (goodWithChildren || 0) * 10
  const price = basePrice + energyBonus + trainabilityBonus + familyBonus

  const slug = name.toLowerCase().replace(/\s+/g, "-")

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <Link href={`/product/${slug}`} className="block">
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          {image ? (
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100">
              <span className="text-6xl">🐕</span>
            </div>
          )}
          <Badge className="absolute top-3 right-3 bg-primary text-white text-base px-3 py-1 shadow-lg">
            ${price.toFixed(2)}
          </Badge>
        </div>
      </Link>
      <CardHeader className="pb-3">
        <Link href={`/product/${slug}`} className="hover:text-primary transition-colors">
          <CardTitle className="text-xl">{name}</CardTitle>
        </Link>
        <CardDescription className="text-sm">Life expectancy: {lifeExpectancy} years</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-2 text-sm mb-4 flex-1">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Good with children:</span>
            <span className="font-medium text-yellow-500">{"★".repeat(goodWithChildren)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Good with other dogs:</span>
            <span className="font-medium text-yellow-500">{"★".repeat(goodWithOtherDogs)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Energy level:</span>
            <span className="font-medium text-yellow-500">{"★".repeat(energy)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Trainability:</span>
            <span className="font-medium text-yellow-500">{"★".repeat(trainability)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1" onClick={() => onAddToCart(dog)}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Link href={`/product/${slug}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
