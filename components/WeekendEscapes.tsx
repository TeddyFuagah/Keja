'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Property } from '@/types'
import { Waves, Mountain, Building, Heart, MapPin, Star } from 'lucide-react'

interface WeekendEscapesProps {
  properties: Property[]
}

const ESCAPE_CATEGORIES = [
  {
    id: 'beach',
    name: 'Beach Houses',
    icon: Waves,
    description: 'Relaxing coastal getaways',
    color: 'bg-blue-500'
  },
  {
    id: 'mountain',
    name: 'Mountain Cabins',
    icon: Mountain,
    description: 'Scenic mountain retreats',
    color: 'bg-green-600'
  },
  {
    id: 'urban',
    name: 'City Apartments',
    icon: Building,
    description: 'Modern urban experiences',
    color: 'bg-purple-500'
  }
]

export default function WeekendEscapes({ properties }: WeekendEscapesProps) {
  const [activeCategory, setActiveCategory] = useState('beach')

  // Filter short-stay properties
  const shortStayProperties = properties.filter(p => p.category === 'short-stay')

  const getCategoryProperties = (category: string) => {
    // Mock categorization - in real app, this would be based on property tags/location
    switch (category) {
      case 'beach':
        return shortStayProperties.filter(p =>
          p.location.town.toLowerCase().includes('mombasa') ||
          p.location.town.toLowerCase().includes('malindi') ||
          p.title.toLowerCase().includes('beach')
        )
      case 'mountain':
        return shortStayProperties.filter(p =>
          p.location.town.toLowerCase().includes('nakuru') ||
          p.location.town.toLowerCase().includes('eldoret') ||
          p.title.toLowerCase().includes('cabin') ||
          p.title.toLowerCase().includes('mountain')
        )
      case 'urban':
        return shortStayProperties.filter(p =>
          p.location.town.toLowerCase().includes('nairobi') ||
          p.location.town.toLowerCase().includes('kisumu') ||
          p.title.toLowerCase().includes('apartment') ||
          p.title.toLowerCase().includes('penthouse')
        )
      default:
        return shortStayProperties
    }
  }

  const categoryProperties = getCategoryProperties(activeCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-keja-text mb-2">Weekend Escapes</h2>
        <p className="text-gray-600">Discover amazing short-stay experiences across Kenya</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-4">
        {ESCAPE_CATEGORIES.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition ${
                activeCategory === category.id
                  ? 'bg-keja-green text-white shadow-keja'
                  : 'bg-keja-gray text-keja-text hover:bg-keja-green-light'
              }`}
            >
              <div className={`p-2 rounded-lg ${category.color} text-white`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold">{category.name}</p>
                <p className="text-sm opacity-80">{category.description}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Properties Grid */}
      {categoryProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProperties.slice(0, 6).map((property) => (
            <div key={property.id} className="card overflow-hidden hover:shadow-keja-hover group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                {property.images.length > 0 && (
                  <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="badge bg-purple-500 text-white">
                    Short Stay
                  </span>
                </div>

                {/* Save Button */}
                <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-keja hover:bg-red-50 hover:text-red-600 transition">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>

                {/* Price Overlay */}
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded">
                  <p className="text-sm font-bold">
                    KES {property.price.toLocaleString()}/night
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-keja-text mb-2 line-clamp-2">
                  {property.title}
                </h3>

                <div className="flex items-center gap-1 mb-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-keja-green" />
                  <span>{property.location.estate}, {property.location.town}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.8 (24 reviews)</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    {property.propertyDetails.bedrooms} bed • {property.propertyDetails.bathrooms} bath
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {property.description}
                </p>

                <Link
                  href={`/properties/${property.id}`}
                  className="w-full btn-primary text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Waves className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No {ESCAPE_CATEGORIES.find(c => c.id === activeCategory)?.name.toLowerCase()} available
          </h3>
          <p className="text-gray-500 mb-6">
            Check back soon for new short-stay properties in this category.
          </p>
          <Link href="/properties?category=short-stay" className="btn-primary">
            View All Short Stays
          </Link>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-keja-green to-keja-green-dark text-white rounded-keja p-8 text-center">
        <h3 className="text-2xl font-bold mb-2">Ready for Your Next Escape?</h3>
        <p className="text-green-100 mb-6">
          Discover unique short-stay experiences and create unforgettable memories
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/properties?category=short-stay" className="btn-primary bg-white text-keja-green hover:bg-green-50">
            Explore All Escapes
          </Link>
          <Link href="/host" className="btn-outline border-white text-white hover:bg-white hover:text-keja-green">
            Become a Host
          </Link>
        </div>
      </div>
    </div>
  )
}