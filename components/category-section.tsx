"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

const categories = [
  { name: "All Breeds", icon: "🐕", filter: "", href: "/products" },
  { name: "Small Dogs", icon: "🐶", filter: "small", href: "/category/small" },
  { name: "Medium Dogs", icon: "🦮", filter: "medium", href: "/category/medium" },
  { name: "Large Dogs", icon: "🐕‍🦺", filter: "large", href: "/category/large" },
  { name: "Working Dogs", icon: "🦴", filter: "working", href: "/category/working" },
  { name: "Family Friendly", icon: "❤️", filter: "family", href: "/category/family" },
]

interface CategorySectionProps {
  onCategoryClick: (filter: string) => void
  activeCategory: string
}

export function CategorySection({ onCategoryClick, activeCategory }: CategorySectionProps) {
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-3">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Button
                variant={activeCategory === category.filter ? "default" : "outline"}
                size="lg"
                onClick={() => onCategoryClick(category.filter)}
                className="flex items-center justify-center gap-2 min-w-35"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
