"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart } from "@/components/shopping-cart"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { Award, Heart, Shield, Users } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function AboutPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { cartItems, updateQuantity, removeFromCart, cartItemCount } = useCart()

  const values = [
    {
      icon: Heart,
      title: "Passion for Pets",
      description:
        "We believe every dog deserves a loving home. Our mission is to connect families with their perfect furry companion.",
    },
    {
      icon: Shield,
      title: "Trusted Information",
      description:
        "All breed information is carefully curated and verified to help you make informed decisions about dog ownership.",
    },
    {
      icon: Award,
      title: "Quality Products",
      description:
        "We partner with reputable breeders and provide comprehensive breed profiles to ensure happy, healthy matches.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of dog lovers who trust PawShop for reliable breed information and genuine reviews.",
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About PawShop</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted companion in finding the perfect dog breed for your lifestyle
          </p>
        </div>

        <div className="mb-16">
          <Card className="overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2">
                  <img
                    src="/happy-dogs-playing-in-park.jpg"
                    alt="Happy dogs"
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
                  <p className="text-muted-foreground mb-4">
                    Founded in 2024, PawShop was born from a simple idea: making it easier for families to find their
                    perfect canine companion. We understand that choosing a dog breed is a significant decision that
                    impacts your entire family.
                  </p>
                  <p className="text-muted-foreground">
                    Our platform combines comprehensive breed information with real customer reviews, helping you make
                    an informed choice. We've helped thousands of families discover breeds that match their lifestyle,
                    energy levels, and living situations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <FAQSection limit={4} showViewAll={true} />

      <Footer />

      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cartItems} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
    </div>
  )
}
