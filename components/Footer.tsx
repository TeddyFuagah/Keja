'use client'

import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-keja-text text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-keja-green">KEJA</h3>
            <p className="text-gray-300 text-sm mb-4">
              Kenya&apos;s modern real estate platform connecting buyers, renters, and sellers with verified agents and agencies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-keja-green transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-keja-green transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-keja-green transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-keja-green transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Platform</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/properties" className="hover:text-keja-green transition">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-keja-green transition">
                  Find Agents
                </Link>
              </li>
              <li>
                <Link href="/agencies" className="hover:text-keja-green transition">
                  Agencies
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-keja-green transition">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Company</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link href="/about" className="hover:text-keja-green transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-keja-green transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-keja-green transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-keja-green transition">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Contact</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-keja-green flex-shrink-0 mt-0.5" />
                <span>Nairobi, Kenya</span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-keja-green flex-shrink-0" />
                <a href="tel:+254711111111" className="hover:text-keja-green transition">
                  +254 711 111 111
                </a>
              </div>
              <div className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-keja-green flex-shrink-0" />
                <a href="mailto:hello@keja.co.ke" className="hover:text-keja-green transition">
                  hello@keja.co.ke
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="border-t border-gray-700 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} KEJA. All rights reserved.
            </div>
            <div className="flex justify-center gap-6 text-gray-400 text-sm">
              <Link href="/privacy" className="hover:text-keja-green transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-keja-green transition">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-keja-green transition">
                Cookie Policy
              </Link>
            </div>
            <div className="text-gray-400 text-sm text-right">
              Kenya Data Protection Act Compliant
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
