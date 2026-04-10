'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, Users, Star, MapPin } from 'lucide-react'

// Mock agencies data
const MOCK_AGENCIES = [
  {
    id: '1',
    name: 'Premium Properties Kenya',
    location: 'Nairobi',
    verified: true,
    ratings: 4.8,
    reviewsCount: 245,
    agentsCount: 28,
    description: 'Leading real estate company in Kenya with expertise in luxury properties.',
    logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop',
    propertiesCount: 342,
  },
  {
    id: '2',
    name: 'Coastal Real Estate Solutions',
    location: 'Mombasa',
    verified: true,
    ratings: 4.7,
    reviewsCount: 189,
    agentsCount: 15,
    description: 'Specialists in coastal and beach property transactions.',
    logo: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=200&h=200&fit=crop',
    propertiesCount: 156,
  },
  {
    id: '3',
    name: 'Eastlands Property Group',
    location: 'Nairobi',
    verified: true,
    ratings: 4.6,
    reviewsCount: 167,
    agentsCount: 22,
    description: 'Expert in residential and commercial properties across Kenya.',
    logo: 'https://images.unsplash.com/photo-1560439129-b45ea9a28f00?w=200&h=200&fit=crop',
    propertiesCount: 287,
  },
]

export default function AgenciesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')

  const filteredAgencies = MOCK_AGENCIES.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = selectedLocation === 'all' || agency.location === selectedLocation
    return matchesSearch && matchesLocation
  })

  const locations = ['all', ...new Set(MOCK_AGENCIES.map(a => a.location))]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-keja-green to-keja-green-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Real Estate Agencies</h1>
          <p className="text-lg text-green-100">Discover verified and trusted agencies across Kenya</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search agencies..."
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="input-field"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>
        </div>

        {/* Agencies Grid */}
        {filteredAgencies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgencies.map((agency) => (
              <Link key={agency.id} href={`/agencies/${agency.id}`}>
                <div className="card hover:shadow-keja-hover cursor-pointer h-full">
                  {/* Logo */}
                  <div className="w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden bg-keja-gray">
                    {agency.logo && (
                      <img src={agency.logo} alt={agency.name} className="w-full h-full object-cover" />
                    )}
                  </div>

                  {/* Name and Verification */}
                  <h3 className="text-lg font-bold text-center mb-2">
                    {agency.name}
                    {agency.verified && (
                      <span className="text-keja-green ml-1">✓</span>
                    )}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{agency.location}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < Math.floor(agency.ratings) ? 'text-yellow-400' : 'text-gray-300'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({agency.reviewsCount})</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-keja-border mb-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-keja-green">{agency.agentsCount}</p>
                      <p className="text-xs text-gray-600">Agents</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-keja-green">{agency.propertiesCount}</p>
                      <p className="text-xs text-gray-600">Properties</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {agency.description}
                  </p>

                  {/* CTA */}
                  <button className="btn-primary w-full text-sm">
                    View Agency
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No agencies found.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedLocation('all')
              }}
              className="btn-primary"
            >
              View All Agencies
            </button>
          </div>
        )}
      </section>

      {/* Benefits Section */}
      <section className="bg-keja-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose a KEJA Agency?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <Building2 className="w-12 h-12 text-keja-green mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Professional & Verified</h3>
              <p className="text-gray-600">All agencies on KEJA are verified and meet high standards.</p>
            </div>
            <div className="card text-center">
              <Users className="w-12 h-12 text-keja-green mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Expert Teams</h3>
              <p className="text-gray-600">Access to experienced and knowledgeable agents.</p>
            </div>
            <div className="card text-center">
              <Star className="w-12 h-12 text-keja-green mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Trusted & Rated</h3>
              <p className="text-gray-600">Real reviews from satisfied clients and transactions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
