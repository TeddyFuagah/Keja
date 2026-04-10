'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement login logic
    console.log('Login:', formData)
  }

  return (
    <div className="min-h-screen bg-keja-gray flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-keja-green mb-2">KEJA</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-keja-text mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  className="input-field pl-10"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-keja-text mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  className="input-field pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-keja-green hover:text-keja-green-dark">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-keja-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-keja-white text-gray-600">Or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-keja-green font-semibold hover:text-keja-green-dark">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
