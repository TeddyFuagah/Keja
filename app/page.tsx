import PropertySearch from '@/components/PropertySearch'
import PersonalizedFeed from '@/components/PersonalizedFeed'
import PropertyOfTheDay from '@/components/PropertyOfTheDay'
import TrendingProperties from '@/components/TrendingProperties'
import WeekendEscapes from '@/components/WeekendEscapes'
import MapExploration from '@/components/MapExploration'
import { Property } from '@/types'
import Link from 'next/link'
import { TrendingUp, Shield, Clock, Users } from 'lucide-react'

// Mock data for featured properties
const FEATURED_PROPERTIES: Property[] = [
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
    id: '4',
    title: 'Cozy Studio in Westlands - Short Stay',
    description: 'Perfect for business travelers or short visits',
    type: 'residential',
    category: 'short-stay',
    status: 'available',
    price: 5000,
    location: {
      estate: 'Westlands',
      town: 'Nairobi',
      county: 'Nairobi',
      coordinates: { latitude: -1.2697, longitude: 36.8156 },
    },
    propertyDetails: {
      bedrooms: 1,
      bathrooms: 1,
      sizeSqft: 300,
      furnished: true,
      parking: false,
      powerBackup: true,
      gatedCommunity: true,
    },
    shortStayDetails: {
      nightlyRate: 5000,
      cleaningFee: 1000,
      maxGuests: 2,
      minNights: 1,
      instantBooking: true,
      availability: {
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        blockedDates: [],
      },
      checkInTime: '14:00',
      checkOutTime: '11:00',
      cancellationPolicy: 'flexible',
    },
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop'],
    hostId: '1',
    amenities: ['WiFi', 'Kitchen', 'TV'],
    createdAt: new Date(),
    updatedAt: new Date(),
    views: 234,
    featured: true,
    promoted: false,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-keja-green to-keja-green-dark text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Find Your Perfect Property in Kenya
              </h1>
              <p className="text-lg text-green-100 mb-6">
                Buy, rent, or lease residential, commercial, and land properties from verified agents and agencies across Kenya.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5" />
                  <span>100% Verified Properties & Agents</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span>Fast, Transparent Process</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5" />
                  <span>Trusted by Thousands</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-10 rounded-keja p-8 backdrop-blur-sm">
                <p className="text-sm text-green-100 mb-4">Premium Properties Available</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Properties Listed</span>
                    <span className="text-2xl font-bold">2,847+</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white border-opacity-20">
                    <span>Verified Agents</span>
                    <span className="text-2xl font-bold">456+</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white border-opacity-20">
                    <span>Successful Transactions</span>
                    <span className="text-2xl font-bold">1,200+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12 relative z-10">
        <PropertySearch />
      </section>

      {/* Personalized Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PersonalizedFeed allProperties={FEATURED_PROPERTIES} />
      </section>

      {/* Property of the Day */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-keja-gray">
        <PropertyOfTheDay properties={FEATURED_PROPERTIES} />
      </section>

      {/* Trending Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TrendingProperties properties={FEATURED_PROPERTIES} />
      </section>

      {/* Map Exploration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-keja-gray">
        <div className="mb-8">
          <h2 className="section-title text-center">Explore on Map</h2>
          <p className="section-subtitle text-center">Discover properties in your preferred locations</p>
        </div>
        <MapExploration properties={FEATURED_PROPERTIES} />
      </section>

      {/* Weekend Escapes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <WeekendEscapes properties={FEATURED_PROPERTIES} />
      </section>

      {/* Trust & Safety Section */}
      <section className="bg-keja-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Why Choose KEJA?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="bg-keja-green-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-keja-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                All properties are verified and authentic. We maintain strict quality standards to protect our users.
              </p>
            </div>

            <div className="card text-center">
              <div className="bg-keja-green-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-keja-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Deals</h3>
              <p className="text-gray-600">
                Access exclusive properties and negotiate directly with verified agents for the best prices.
              </p>
            </div>

            <div className="card text-center">
              <div className="bg-keja-green-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-keja-green" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Connect with experienced agents who understand the Kenyan real estate market intimately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-keja-green text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Property?</h2>
          <p className="text-lg text-green-100 mb-8">
            Join thousands of satisfied customers who found their perfect property on KEJA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="btn-primary bg-white text-keja-green hover:bg-keja-gray">
              Browse Properties
            </Link>
            <Link href="/agents" className="btn-outline border-white text-white hover:bg-keja-green-dark">
              Find Agents
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
