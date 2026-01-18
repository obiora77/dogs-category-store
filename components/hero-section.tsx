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

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-500 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance">
            Find Your Perfect Dog Breed
          </h1>
          <p className="text-lg md:text-xl mb-8 md:mb-10 opacity-90 text-pretty">
            Browse our collection of amazing dog breeds and bring home your new best friend
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for breeds like Golden Retriever, Beagle..."
                  className="pl-12 pr-4 py-6 text-base bg-white text-gray-900 border-0 shadow-lg"
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
      </div>
    </div>
  )
}
