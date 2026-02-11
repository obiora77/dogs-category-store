"use client"

import type React from "react"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface HeroSectionProps {
  onSearch: (term: string) => void
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const [showImage, setShowImage] = useState(false)

  return (
    <div className="relative bg-linear-to-br from-blue-600 via-cyan-500 to-teal-500 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left max-w-3xl mx-auto md:mx-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance">
              Find Your Perfect Dog Breed
            </h1>
            <p className="text-lg md:text-xl mb-8 md:mb-10 opacity-90 text-pretty">
              Browse our collection of amazing dog breeds and bring home your new best friend
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto md:mx-0">
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search for breeds like Golden Retriever, Beagle..."
                    className="pl-12 pr-4 py-5 text-base bg-white text-gray-900 border-0 shadow-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="px-8 bg-gray-900 hover:bg-gray-800 text-white shadow-lg">
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Swap panel */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
              <button
                className={`px-4 py-2 text-sm rounded-full transition-colors ${!showImage ? "bg-white text-gray-900" : "text-white/90"}`}
                onClick={() => setShowImage(false)}
                aria-pressed={!showImage}
              >
                Preview
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-full transition-colors ${showImage ? "bg-white text-gray-900" : "text-white/90"}`}
                onClick={() => setShowImage(true)}
                aria-pressed={showImage}
              >
                Image
              </button>
            </div>

            <div className="w-full max-w-sm">
              {showImage ? (
                <div className="overflow-hidden rounded-2xl shadow-2xl bg-white">
                  <img 
                    src="/happy-dogs-playing-in-park.jpg" 
                    alt="hero image" 
                  />
                </div>
              ) : (
                <div className="p-6 bg-white/10 rounded-2xl shadow-lg text-left">
                  <h3 className="text-xl font-semibold">Why PawShop?</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>• Curated breed profiles</li>
                    <li>• Personalized recommendations</li>
                    <li>• Trusted by thousands of families</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
