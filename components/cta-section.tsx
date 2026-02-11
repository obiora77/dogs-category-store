"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="bg-linear-to-r from-blue-600 to-cyan-500 text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Ready to Find Your Perfect Companion?
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Explore our comprehensive collection of dog breeds and discover which one is the perfect match for your lifestyle and family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto"
                >
                  Explore All Breeds
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-blue-100">Dog Breeds Catalogued</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-blue-100">Happy Families</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <p className="text-blue-100">Average Rating</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-blue-100">Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
