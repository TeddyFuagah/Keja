'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, User, Heart, Settings, LogOut } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <header className="sticky top-0 z-50 bg-keja-white border-b border-keja-border shadow-keja">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/keja-02.png"
              alt="KEJA"
              width={80}
              height={32}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/properties" className="text-keja-text hover:text-keja-green font-medium transition">
              Properties
            </Link>
            <Link href="/agents" className="text-keja-text hover:text-keja-green font-medium transition">
              Agents
            </Link>
            <Link href="/about" className="text-keja-text hover:text-keja-green font-medium transition">
              About
            </Link>
            <Link href="/contact" className="text-keja-text hover:text-keja-green font-medium transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 bg-keja-gray rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-keja-text hover:text-keja-green font-medium transition"
                >
                  <div className="w-8 h-8 bg-keja-green rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span>{session.user?.name || 'User'}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-keja shadow-keja border border-keja-border py-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-keja-text hover:bg-keja-gray"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/saved"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-keja-text hover:bg-keja-gray"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Heart className="w-4 h-4" />
                      Saved Properties
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-keja-text hover:bg-keja-gray"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-keja-text hover:text-keja-green font-medium transition">
                  Login
                </Link>
                <Link href="/auth/signup" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-keja-text" />
            ) : (
              <Menu className="w-6 h-6 text-keja-text" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link href="/properties" className="block text-keja-text hover:text-keja-green font-medium">
              Properties
            </Link>
            <Link href="/agents" className="block text-keja-text hover:text-keja-green font-medium">
              Agents
            </Link>
            <Link href="/about" className="block text-keja-text hover:text-keja-green font-medium">
              About
            </Link>
            <Link href="/contact" className="block text-keja-text hover:text-keja-green font-medium">
              Contact
            </Link>
            <div className="flex gap-2 pt-4">
              {session ? (
                <>
                  <Link href="/dashboard" className="btn-secondary text-sm flex-1 text-center">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="btn-primary text-sm flex-1 text-center bg-red-600 hover:bg-red-700"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="btn-secondary text-sm flex-1 text-center">
                    Login
                  </Link>
                  <Link href="/auth/signup" className="btn-primary text-sm flex-1 text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
