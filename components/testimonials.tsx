"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Dog Owner & Pet Blogger",
    image: "SJ",
    content:
      "PawShop helped me find the perfect Golden Retriever for my family! The breed information was incredibly detailed and accurate. My kids absolutely love our new companion!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "First-Time Dog Owner",
    image: "MC",
    content:
      "I was overwhelmed with so many breed options, but the categorization and filtering on PawShop made it so easy. Found a Labrador that fits my lifestyle perfectly. Highly recommended!",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Family of Four",
    image: "ER",
    content:
      "The family-friendly filter was a game-changer for us. We found a breed that's perfect with our three kids. The customer support team was also incredibly helpful throughout the process.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Park",
    role: "Active Lifestyle Enthusiast",
    image: "DP",
    content:
      "As someone with an active lifestyle, the energy level filtering helped me find the perfect Border Collie. PawShop's detailed breed profiles are invaluable. Best platform for dog breed selection!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by Dog Lovers Everywhere
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy families who have found their perfect furry companion through PawShop
          </p>
        </div>

        {/* Testimonials Marquee */}
        <div className="overflow-hidden">
          <div
            className="flex gap-6 items-stretch marquee-track"
            style={{ animation: "marquee 16s linear infinite" }}
          >
            {testimonials.concat(testimonials).map((testimonial, idx) => (
              <div key={idx} className="w-64 flex-none">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: Math.round(testimonial.rating) }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-4">{testimonial.content}</p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">{testimonial.image}</div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                        <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <style>{`\n          @keyframes marquee {\n            0% { transform: translateX(0%); }\n            100% { transform: translateX(-50%); }\n          }\n          .marquee-track { will-change: transform; }\n        `}</style>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
            <p className="text-muted-foreground">5-Star Reviews</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
            <p className="text-muted-foreground">Happy Families</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
            <p className="text-muted-foreground">Breed Profiles</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9★</div>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}
