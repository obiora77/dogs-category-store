# PawShop - Dog Breed E-Commerce Store

A modern, interactive Next.js web application that helps dog lovers discover and explore different dog breeds with detailed information and characteristics. Built with React, TypeScript, and Tailwind CSS.

## 🐕 Overview

PawShop is a comprehensive dog breed marketplace and information platform that allows users to browse 100+ dog breeds, filter by category, search in real-time, and learn detailed characteristics about each breed including temperament, physical attributes, energy levels, and compatibility with families.

## ✨ Key Features

- **Browse Dog Breeds** — Explore 100+ dog breeds with comprehensive profiles
- **Category Filtering** — Filter breeds by size (Small, Medium, Large) and purpose (Working, Family)
- **Real-Time Search** — Search across breed names and attributes instantly
- **Detailed Breed Profiles** — View all characteristics including:
  - Temperament ratings (good with children, strangers, other dogs)
  - Behavioral traits (energy, trainability, playfulness, barking, protectiveness)
  - Grooming & shedding requirements
  - Physical measurements (height, weight ranges)
  - Life expectancy
- **Interactive Hero Section** — Swap between preview and image display
- **Customer Reviews** — Read and write breed reviews with star ratings
- **Shopping Cart** — Persistent cart that saves across page navigation using localStorage
- **Responsive Design** — Mobile-friendly interface with Tailwind CSS
- **Testimonials Carousel** — Auto-scrolling marquee showcasing customer reviews
- **FAQ Section** — Comprehensive frequently asked questions accessible from multiple pages

## 🛠 Technology Stack

- **Frontend**: Next.js 14+, React 18+, TypeScript
- **Styling**: Tailwind CSS with custom theme
- **State Management**: React Context API with localStorage persistence
- **UI Components**: Custom shadcn/ui components (Card, Button, Input, Textarea, etc.)
- **API**: Integration with dog breed API with mock data fallback
- **Icons**: Lucide React icons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/obiora77/dogs-category-store.git
cd dogs-category-store
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to explore the application.

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Featured breeds, hero section with swap, category showcase |
| All Products | `/products` | Full catalog with real-time search and filtering |
| Category | `/category/[category]` | Filtered breed listings by size/purpose |
| Product Detail | `/product/[slug]` | Comprehensive breed info, reviews, and add to cart |
| Shop | `/shop` | Shopping interface |
| About | `/about` | About PawShop information |
| Contact | `/contact` | Contact form and FAQ section |
| FAQ | `/faq` | Full FAQ accordion |
| Checkout | `/checkout` | Checkout process |

## 📁 Project Structure

```
├── app/
│   ├── api/dogs/route.ts          # API endpoint for dog breeds
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Home page
│   ├── about/page.tsx             # About page
│   ├── contact/page.tsx           # Contact page
│   ├── shop/page.tsx              # Shop page
│   ├── products/page.tsx          # All products page
│   ├── product/[slug]/page.tsx    # Product detail page
│   ├── category/[category]/page.tsx # Category pages
│   ├── faq/page.tsx               # FAQ page
│   └── checkout/page.tsx          # Checkout page
├── components/
│   ├── hero-section.tsx           # Hero with swap toggle
│   ├── category-section.tsx       # Category filter section
│   ├── product-card.tsx           # Product card component
│   ├── shopping-cart.tsx          # Cart sidebar
│   ├── testimonials.tsx           # Marquee testimonials
│   ├── footer.tsx                 # Footer navigation
│   ├── faq-section.tsx            # FAQ accordion component
│   ├── navbar.tsx                 # Navigation bar
│   ├── theme-provider.tsx         # Theme context provider
│   ├── providers.tsx              # App providers wrapper
│   └── ui/                        # Shadcn UI components
├── hooks/
│   └── use-toast.ts               # Toast notification hook
├── lib/
│   ├── types.ts                   # TypeScript type definitions
│   ├── cart-context.tsx           # Global cart state with localStorage
│   └── utils.ts                   # Utility functions
└── public/                        # Static assets
```

## 🎯 Features in Detail

### Hero Section with Swap
- Interactive toggle between "Preview" and "Image" states
- Displays illustrative SVG or preview card
- Responsive design with search integration

### Shopping Cart Persistence
- Global cart state using React Context
- Automatic localStorage sync
- Cart items persist across page navigation and browser refresh

### Real-Time Search
- Instant filtering across 100+ breeds
- Search by breed name
- Clear button to reset search
- Result count display

### Comprehensive Product Details
- 10+ breed characteristics with star ratings
- Physical attributes (height, weight, life expectancy)
- Customer reviews with rating system
- Add to cart with dynamic pricing

### Testimonials Carousel
- Auto-scrolling marquee animation
- Continuous loop with duplicate items
- Responsive card layout
- Customer initials in styled avatars

### Responsive Design
- Mobile-first approach
- Tailwind CSS responsive utilities
- Touch-friendly interface
- Optimized for all screen sizes

## 🔧 Build & Deployment

Build the project:
```bash
npm run build
```

Start production server:
```bash
npm run start
```

## 📦 Dependencies

Key packages used:
- `next` — React framework for production
- `react` — JavaScript library for UI
- `typescript` — Type safety
- `tailwindcss` — Utility-first CSS framework
- `lucide-react` — Icon library
- `shadcn/ui` — UI component library

## 🎨 Customization

### Theme Colors
Edit `globals.css` or Tailwind config in `tailwind.config.ts` to customize colors, spacing, and other design tokens.

### Breed Data
Modify `app/api/dogs/route.ts` to change the dog breed data source or add more mock breeds.

### FAQ Content
Edit `components/faq-section.tsx` to update FAQ questions and answers.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Created with ❤️ for dog lovers everywhere.

---

**Perfect for dog lovers looking to make informed decisions about choosing the right breed for their lifestyle!**
