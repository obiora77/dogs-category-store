"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">PawShop</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted companion in finding the perfect dog breed for your lifestyle.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Dog Care Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Breed Guide
                </a>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <a href="mailto:support@pawshop.com" className="text-gray-400 hover:text-white transition text-sm">
                  support@pawshop.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition text-sm">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">123 Pet Street, San Francisco, CA 94102</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-700" />

        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2024 PawShop. All rights reserved. Made with ❤️ for dog lovers.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
