"use client"

import { Navbar } from "@/components/navbar"
import { FAQAccordion } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"

export default function FAQPage() {
  const { cartItemCount } = useCart()

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar cartItemCount={cartItemCount} onCartClick={() => {}} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to your questions about PawShop, our dog breeds, services, and more.
          </p>
        </div>

        <FAQAccordion />
      </div>

      <Footer />
    </div>
  )
}
