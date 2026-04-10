'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import PropertyCard from './PropertyCard'
import { Property } from '@/types'
import { TrendingUp, Heart, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

interface PersonalizedFeedProps {
  allProperties: Property[]
}

export default function PersonalizedFeed({ allProperties }: PersonalizedFeedProps) {
  const { data: session } = useSession()
  const [personalizedProperties, setPersonalizedProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      // Simulate personalized algorithm
      // In real app, this would come from user's search history, saved properties, etc.
      const personalized = allProperties
        .filter(p => p.category === 'buy' || p.category === 'rent')
        .sort(() => Math.random() - 0.5)
        .slice(0, 12)
      setPersonalizedProperties(personalized)
    } else {
      // Show featured properties for non-logged users
      const featured = allProperties.filter(p => p.featured).slice(0, 12)
      setPersonalizedProperties(featured)
    }
    setLoading(false)
  }, [session, allProperties])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-48 bg-keja-gray rounded-t-keja"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-keja-gray rounded w-3/4"></div>
              <div className="h-4 bg-keja-gray rounded w-1/2"></div>
              <div className="h-6 bg-keja-gray rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-keja-text mb-2">
            {session ? 'Your Personalized Feed' : 'Featured Properties'}
          </h2>
          <p className="text-gray-600">
            {session
              ? 'Properties tailored to your interests and search history'
              : 'Handpicked premium properties across Kenya'
            }
          </p>
        </div>
        <Link href="/properties" className="btn-outline">
          View All
        </Link>
      </div>

      {/* Quick Stats for logged-in users */}
      {session && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card text-center">
            <div className="bg-keja-green-light w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-keja-green" />
            </div>
            <p className="text-2xl font-bold text-keja-green">12</p>
            <p className="text-sm text-gray-600">Saved Properties</p>
          </div>
          <div className="card text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600">3</p>
            <p className="text-sm text-gray-600">Searched Areas</p>
          </div>
          <div className="card text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-600">8</p>
            <p className="text-sm text-gray-600">Price Alerts</p>
          </div>
          <div className="card text-center">
            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-orange-600">5</p>
            <p className="text-sm text-gray-600">Recent Views</p>
          </div>
        </div>
      )}

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personalizedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <button className="btn-primary">
          Load More Properties
        </button>
      </div>
    </div>
  )
}