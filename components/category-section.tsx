"use client"

import { Button } from "@/components/ui/button"

const categories = [
  { name: "All Breeds", icon: "🐕", filter: "" },
  { name: "Small Dogs", icon: "🐶", filter: "small" },
  { name: "Medium Dogs", icon: "🦮", filter: "medium" },
  { name: "Large Dogs", icon: "🐕‍🦺", filter: "large" },
  { name: "Working Dogs", icon: "🦴", filter: "working" },
  { name: "Family Friendly", icon: "❤️", filter: "family" },
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
            <Button
              key={category.name}
              variant={activeCategory === category.filter ? "default" : "outline"}
              size="lg"
              onClick={() => onCategoryClick(category.filter)}
              className="flex items-center justify-center gap-2 min-w-[140px]"
            >
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
