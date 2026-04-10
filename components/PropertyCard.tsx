'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Bed, Bath, Ruler, Check } from 'lucide-react'
import { Property } from '@/types'
import { useState } from 'react'

interface PropertyCardProps {
  property: Property
  onFavorite?: (id: string) => void
  isFavorite?: boolean
}

export default function PropertyCard({ property, onFavorite, isFavorite = false }: PropertyCardProps) {
  const [saved, setSaved] = useState(isFavorite)

  const handleFavorite = () => {
    setSaved(!saved)
    onFavorite?.(property.id)
  }

  const priceDisplay = property.category === 'buy'
    ? `KES ${property.price.toLocaleString()}`
    : `KES ${property.monthlyRent?.toLocaleString()}/month`

  return (
    <div className="card overflow-hidden hover:shadow-keja-hover group">
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-keja-gray">
        {property.images.length > 0 && (
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {property.featured && (
            <span className="badge bg-keja-green text-white">Featured</span>
          )}
          {property.promoted && (
            <span className="badge bg-yellow-400 text-yellow-900">Promoted</span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 left-3 bg-white rounded-full p-2 shadow-keja hover:bg-keja-green hover:text-white transition"
        >
          <Heart
            className={`w-5 h-5 ${saved ? 'fill-current text-keja-green' : 'text-gray-600'}`}
          />
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`badge text-white ${
            property.category === 'buy' ? 'bg-keja-green' :
            property.category === 'rent' ? 'bg-blue-500' :
            'bg-purple-500'
          }`}>
            {property.category.charAt(0).toUpperCase() + property.category.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-bold text-lg text-keja-text mb-2 line-clamp-2 hover:text-keja-green">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-start gap-1 mb-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-keja-green flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{property.location.estate}, {property.location.town}</p>
            <p className="text-xs">{property.location.county}</p>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex gap-4 mb-4 text-sm text-gray-600">
          {property.propertyDetails.bedrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-keja-green" />
              <span>{property.propertyDetails.bedrooms}</span>
            </div>
          )}
          {property.propertyDetails.bathrooms > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4 text-keja-green" />
              <span>{property.propertyDetails.bathrooms}</span>
            </div>
          )}
          {property.propertyDetails.sizeSqft > 0 && (
            <div className="flex items-center gap-1">
              <Ruler className="w-4 h-4 text-keja-green" />
              <span>{property.propertyDetails.sizeSqft.toLocaleString()} sqft</span>
            </div>
          )}
        </div>

        {/* Features */}
        {(property.propertyDetails.gatedCommunity || property.propertyDetails.parking || property.propertyDetails.powerBackup) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {property.propertyDetails.gatedCommunity && (
              <div className="flex items-center gap-1 text-xs text-keja-green bg-keja-green-light px-2 py-1 rounded">
                <Check className="w-3 h-3" />
                Gated
              </div>
            )}
            {property.propertyDetails.parking && (
              <div className="flex items-center gap-1 text-xs text-keja-green bg-keja-green-light px-2 py-1 rounded">
                <Check className="w-3 h-3" />
                Parking
              </div>
            )}
            {property.propertyDetails.powerBackup && (
              <div className="flex items-center gap-1 text-xs text-keja-green bg-keja-green-light px-2 py-1 rounded">
                <Check className="w-3 h-3" />
                Backup Power
              </div>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Price and CTA */}
        <div className="flex justify-between items-center pt-4 border-t border-keja-border">
          <div>
            <p className="text-xs text-gray-500">Price</p>
            <p className="text-xl font-bold text-keja-green">{priceDisplay}</p>
          </div>
          <Link href={`/properties/${property.id}`} className="btn-primary text-sm px-4 py-2">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
