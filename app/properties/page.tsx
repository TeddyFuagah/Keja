'use client'

import { useState } from 'react'
import PropertyCard from '@/components/PropertyCard'
import PropertySearch from '@/components/PropertySearch'
import { Property, PropertyFilters } from '@/types'
import { GridIcon, ListIcon } from 'lucide-react'

// Mock data
const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Luxury 3-Bedroom House in Kilimani',
    description: 'Beautiful house with modern amenities',
    type: 'residential',
    category: 'buy',
    status: 'available',
    price: 45000000,
    monthlyRent: 250000,
    location: {
      estate: 'Kilimani',
      town: 'Nairobi',
      county: 'Nairobi',
      coordinates: { latitude: -1.2867, longitude: 36.7739 },
    },
    propertyDetails: {
      bedrooms: 3,
      bathrooms: 2,
      sizeSqft: 8500,
      furnished: true,
      parking: true,
      powerBackup: true,
      gatedCommunity: true,
    },
    images: ['https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=500&h=400&fit=crop'],
    agentId: '1',
    agencyId: '1',
    amenities: ['Pool', 'Garden', 'Gym'],
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 1234,
    featured: true,
    promoted: true,
  },
  {
    id: '2',
    title: 'Modern 2-Bedroom Apartment in Westlands',
    description: 'Spacious apartment in prime location',
    type: 'residential',
    category: 'rent',
    status: 'available',
    price: 25000000,
    monthlyRent: 120000,
    location: {
      estate: 'Westlands',
      town: 'Nairobi',
      county: 'Nairobi',
      coordinates: { latitude: -1.2697, longitude: 36.8156 },
    },
    propertyDetails: {
      bedrooms: 2,
      bathrooms: 2,
      sizeSqft: 5000,
      furnished: true,
      parking: true,
      powerBackup: false,
      gatedCommunity: true,
    },
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=400&fit=crop'],
    agentId: '1',
    agencyId: '1',
    amenities: ['Balcony', 'Laundry'],
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 856,
    featured: true,
    promoted: false,
  },
  {
    id: '3',
    title: 'Commercial Space in Nyali, Mombasa',
    description: 'Prime commercial space for business',
    type: 'commercial',
    category: 'rent',
    status: 'available',
    price: 15000000,
    monthlyRent: 80000,
    location: {
      estate: 'Nyali',
      town: 'Mombasa',
      county: 'Kilifi',
      coordinates: { latitude: -4.0435, longitude: 39.7622 },
    },
    propertyDetails: {
      bedrooms: 0,
      bathrooms: 2,
      sizeSqft: 3500,
      furnished: false,
      parking: true,
      powerBackup: true,
      gatedCommunity: false,
    },
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=400&fit=crop'],
    agentId: '2',
    agencyId: '2',
    amenities: ['Security', 'Parking'],
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 567,
    featured: false,
    promoted: true,
  },
  {
    id: '4',
    title: '1 Acre Residential Land in Karen',
    description: 'Prime land in exclusive Karen estate',
    type: 'land',
    category: 'buy',
    status: 'available',
    price: 35000000,
    location: {
      estate: 'Karen',
      town: 'Nairobi',
      county: 'Nairobi',
      coordinates: { latitude: -1.3348, longitude: 36.7124 },
    },
    propertyDetails: {
      bedrooms: 0,
      bathrooms: 0,
      sizeSqft: 43560,
      furnished: false,
      parking: false,
      powerBackup: false,
      gatedCommunity: true,
    },
    images: ['https://images.unsplash.com/photo-1500382017468-7049fae79e74?w=500&h=400&fit=crop'],
    agentId: '1',
    agencyId: '1',
    amenities: ['Gated Community', 'Security'],
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 423,
    featured: false,
    promoted: false,
  },
]

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(MOCK_PROPERTIES)
  const [sortBy, setSortBy] = useState('newest')

  const handleSearch = (filters: PropertyFilters) => {
    let results = MOCK_PROPERTIES

    // Apply filters
    if (filters.category) {
      results = results.filter(p => p.category === filters.category)
    }
    if (filters.type) {
      results = results.filter(p => p.type === filters.type)
    }
    if (filters.minPrice) {
      results = results.filter(p => p.price >= filters.minPrice)
    }
    if (filters.maxPrice) {
      results = results.filter(p => p.price <= filters.maxPrice)
    }

    setFilteredProperties(results)
  }

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return (
    <div className="min-h-screen">
      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PropertySearch onSearch={handleSearch} />
      </div>

      {/* Results Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-keja-text mb-2">Properties</h1>
            <p className="text-gray-600">Found {sortedProperties.length} properties</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex gap-2 bg-keja-gray p-1 rounded-keja">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-keja-green text-white' : 'text-gray-600'}`}
              >
                <GridIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-keja-green text-white' : 'text-gray-600'}`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid/List */}
        {sortedProperties.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }>
            {sortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No properties found matching your criteria.</p>
            <button
              onClick={() => setFilteredProperties(MOCK_PROPERTIES)}
              className="btn-primary"
            >
              View All Properties
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
