'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Property } from '@/types'
import { TrendingUp, MapPin, Star } from 'lucide-react'
import PropertyCard from './PropertyCard'

interface SmartRecommendationsProps {
  currentProperty: Property
  allProperties: Property[]
  title?: string
}

export default function SmartRecommendations({
  currentProperty,
  allProperties,
  title = "You May Also Like"
}: SmartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Smart recommendation algorithm
    const getRecommendations = () => {
      const similarProperties = allProperties
        .filter(p => p.id !== currentProperty.id)
        .map(property => {
          let score = 0

          // Same location (highest weight)
          if (property.location.town === currentProperty.location.town) score += 30
          if (property.location.estate === currentProperty.location.estate) score += 20

          // Similar price range (±20%)
          const priceDiff = Math.abs(property.price - currentProperty.price) / currentProperty.price
          if (priceDiff <= 0.2) score += 25

          // Same property type
          if (property.type === currentProperty.type) score += 15

          // Same category
          if (property.category === currentProperty.category) score += 10

          // Similar bedroom count
          if (Math.abs(property.propertyDetails.bedrooms - currentProperty.propertyDetails.bedrooms) <= 1) {
            score += 10
          }

          // Same amenities (partial match)
          const commonAmenities = property.amenities.filter(a =>
            currentProperty.amenities.includes(a)
          ).length
          score += commonAmenities * 2

          return { property, score }
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map(item => item.property)

      setRecommendations(similarProperties)
      setLoading(false)
    }

    getRecommendations()
  }, [currentProperty, allProperties])

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-keja-text">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-32 bg-keja-gray rounded-t-keja"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-keja-gray rounded w-3/4"></div>
                <div className="h-4 bg-keja-gray rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-keja-green" />
        <h3 className="text-xl font-bold text-keja-text">{title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Recommendation Reasons */}
      <div className="bg-keja-gray rounded-keja p-4">
        <h4 className="font-semibold text-keja-text mb-3">Why these recommendations?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-keja-green" />
            <span>Similar location</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-keja-green" />
            <span>Comparable price</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-keja-green" />
            <span>Same property type</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Link href="/properties" className="btn-outline">
          View All Properties
        </Link>
      </div>
    </div>
  )
}