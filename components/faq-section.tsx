"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "General",
    question: "What is PawShop?",
    answer:
      "PawShop is a comprehensive dog breed information and shopping platform. We help families find their perfect canine companion by providing detailed breed profiles, characteristics, and pricing information.",
  },
  {
    id: 2,
    category: "General",
    question: "How accurate is the breed information?",
    answer:
      "Our breed information is carefully curated from verified sources and updated regularly. Each profile includes temperament, health considerations, exercise needs, and compatibility with families and other pets.",
  },
  {
    id: 3,
    category: "Products",
    question: "What do I do after adding a breed to my cart?",
    answer:
      "After adding breeds to your cart, you can proceed to checkout. Enter your shipping and payment information, and our team will provide you with detailed information about connecting with reputable breeders and adoption resources.",
  },
  {
    id: 4,
    category: "Products",
    question: "Can I search for specific dog breeds?",
    answer:
      "Yes! You can use our search feature on the Products page to find specific breeds by name. We also offer filtering by size (small, medium, large), temperament (family-friendly, working dogs), and energy level.",
  },
  {
    id: 5,
    category: "Products",
    question: "Are the prices accurate?",
    answer:
      "Our pricing is based on average market values and includes consulting fees. Actual breeder prices may vary. Contact us at support@pawshop.com for specific pricing information and breeder recommendations.",
  },
  {
    id: 6,
    category: "Account & Checkout",
    question: "Do I need to create an account to shop?",
    answer:
      "Currently, you can browse and add items to your cart without an account. However, you will need to provide your information during checkout to complete your order.",
  },
  {
    id: 7,
    category: "Account & Checkout",
    question: "Is my payment information secure?",
    answer:
      "Yes, we use industry-standard encryption and secure payment gateways. Your payment information is never stored on our servers and is handled by trusted payment processors.",
  },
  {
    id: 8,
    category: "Account & Checkout",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) and digital payment methods. All transactions are secure and processed through encrypted channels.",
  },
  {
    id: 9,
    category: "Support",
    question: "How can I contact customer support?",
    answer:
      "You can reach our support team via email at support@pawshop.com or call us at +1 (555) 123-4567. We're available Monday-Friday, 9am-6pm and Saturday, 10am-4pm.",
  },
  {
    id: 10,
    category: "Support",
    question: "What's your return policy?",
    answer:
      "Since we provide breed information and consulting services, returns are handled on a case-by-case basis. Please contact our support team if you have concerns about your purchase.",
  },
  {
    id: 11,
    category: "Breeds",
    question: "How many dog breeds do you have?",
    answer:
      "We feature over 100 dog breeds in our catalog. Each breed has comprehensive information about temperament, exercise needs, health considerations, and pricing.",
  },
  {
    id: 12,
    category: "Breeds",
    question: "What's the best dog breed for families with children?",
    answer:
      "Several breeds are excellent with children including Golden Retrievers, Labrador Retrievers, and Beagles. Use our 'Family Friendly' filter to see breeds specifically suited for families with kids.",
  },
]

interface FAQSectionProps {
  limit?: number
  showViewAll?: boolean
}

export function FAQSection({ limit, showViewAll = true }: FAQSectionProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  
  const displayedItems = limit ? faqData.slice(0, limit) : faqData
  const categories = [...new Set(faqData.map((item) => item.category))]

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about PawShop and our services
          </p>
        </div>

        <div className="space-y-4">
          {displayedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <button
                onClick={() => toggleExpanded(item.id)}
                className="w-full text-left"
              >
                <CardHeader className="pb-3 hover:bg-muted/50 transition">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-foreground">{item.question}</CardTitle>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                        expandedId === item.id ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardHeader>
              </button>

              {expandedId === item.id && (
                <CardContent className="pt-0 pb-4">
                  <div className="border-t pt-4">
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {showViewAll && limit && displayedItems.length < faqData.length && (
          <div className="mt-8 text-center">
            <a
              href="/faq"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-medium"
            >
              View All FAQs
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export function FAQAccordion() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const categories = [...new Set(faqData.map((item) => item.category))]

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {categories.map((category) => (
        <div key={category} className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">{category}</h3>
          <div className="space-y-4">
            {faqData
              .filter((item) => item.category === category)
              .map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full text-left"
                  >
                    <CardHeader className="pb-3 hover:bg-muted/50 transition">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-lg text-foreground">{item.question}</CardTitle>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                            expandedId === item.id ? "transform rotate-180" : ""
                          }`}
                        />
                      </div>
                    </CardHeader>
                  </button>

                  {expandedId === item.id && (
                    <CardContent className="pt-0 pb-4">
                      <div className="border-t pt-4">
                        <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
