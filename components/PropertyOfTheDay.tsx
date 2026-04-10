'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Property } from '@/types'
import { Star, MapPin, Bed, Bath, Ruler, Heart, Share2, Eye } from 'lucide-react'
import toast from 'react-hot-toast'

interface PropertyOfTheDayProps {
  properties: Property[]
}

export default function PropertyOfTheDay({ properties }: PropertyOfTheDayProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  // Filter for featured/high-quality properties
  const featuredProperties = properties.filter(p =>
    p.featured || p.promoted || p.price > 10000000
  )

  const currentProperty = featuredProperties[currentIndex] || properties[0]

  useEffect(() => {
    // Auto-rotate every 10 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProperties.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [featuredProperties.length])

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Removed from saved properties' : 'Added to saved properties!')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentProperty.title,
        text: `Check out this amazing property: ${currentProperty.title}`,
        url: window.location.origin + `/properties/${currentProperty.id}`
      })
    } else {
      navigator.clipboard.writeText(window.location.origin + `/properties/${currentProperty.id}`)
      toast.success('Link copied to clipboard!')
    }
  }

  if (!currentProperty) return null

  const priceDisplay = currentProperty.category === 'buy'
    ? `KES ${currentProperty.price.toLocaleString()}`
    : currentProperty.category === 'rent'
    ? `KES ${currentProperty.monthlyRent?.toLocaleString()}/month`
    : `KES ${currentProperty.price.toLocaleString()}/night`

  return (
    <div className="bg-gradient-to-br from-keja-green to-keja-green-dark text-white rounded-keja overflow-hidden shadow-keja">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Property of the Day</h2>
            <p className="text-green-100">Discover amazing homes curated just for you</p>
          </div>
          <div className="flex gap-2">
            {featuredProperties.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image Section */}
        <div className="relative h-64 lg:h-80">
          {currentProperty.images.length > 0 && (
            <Image
              src={currentProperty.images[0]}
              alt={currentProperty.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}

          {/* Overlay Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleSave}
              className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-white transition"
            >
              <Heart
                className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="bg-white bg-opacity-90 rounded-full p-3 hover:bg-white transition"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {currentProperty.featured && (
              <span className="badge bg-yellow-400 text-yellow-900">Featured</span>
            )}
            {currentProperty.promoted && (
              <span className="badge bg-purple-500 text-white">Promoted</span>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span className={`badge text-white ${
              currentProperty.category === 'buy' ? 'bg-keja-green' :
              currentProperty.category === 'rent' ? 'bg-blue-500' :
              'bg-purple-500'
            }`}>
              {currentProperty.category.charAt(0).toUpperCase() + currentProperty.category.slice(1)}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col justify-between">
          {/* Property Info */}
          <div>
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{currentProperty.title}</h3>

            <div className="flex items-center gap-1 mb-3 text-green-100">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {currentProperty.location.estate}, {currentProperty.location.town}
              </span>
            </div>

            <div className="flex gap-4 mb-4 text-sm text-green-100">
              {currentProperty.propertyDetails.bedrooms > 0 && (
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  <span>{currentProperty.propertyDetails.bedrooms} bed</span>
                </div>
              )}
              {currentProperty.propertyDetails.bathrooms > 0 && (
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span>{currentProperty.propertyDetails.bathrooms} bath</span>
                </div>
              )}
              {currentProperty.propertyDetails.sizeSqft > 0 && (
                <div className="flex items-center gap-1">
                  <Ruler className="w-4 h-4" />
                  <span>{currentProperty.propertyDetails.sizeSqft.toLocaleString()} sqft</span>
                </div>
              )}
            </div>

            <p className="text-green-100 text-sm mb-4 line-clamp-3">
              {currentProperty.description}
            </p>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-200">Starting from</p>
              <p className="text-2xl font-bold">{priceDisplay}</p>
            </div>
            <div className="flex gap-3">
              <div className="text-center">
                <div className="flex items-center gap-1 text-green-100 text-sm">
                  <Eye className="w-4 h-4" />
                  <span>{currentProperty.views}</span>
                </div>
                <p className="text-xs text-green-200">Views</p>
              </div>
              <Link
                href={`/properties/${currentProperty.id}`}
                className="btn-primary bg-white text-keja-green hover:bg-green-50"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}