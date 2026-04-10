'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Ruler, Heart, Share2, Check, MessageCircle, Phone, MapIcon } from 'lucide-react'
import WhatsAppContact from '@/components/WhatsAppContact'
import SmartRecommendations from '@/components/SmartRecommendations'
import { Property } from '@/types'

// Mock property detail data
const PROPERTY_DETAIL = {
  id: '1',
  title: 'Luxury 3-Bedroom House in Kilimani',
  description: 'Beautiful house with modern amenities and premium finishes',
  type: 'residential',
  category: 'buy',
  status: 'available',
  price: 45000000,
  monthlyRent: 250000,
  depositAmount: 750000,
  location: {
    estate: 'Kilimani',
    town: 'Nairobi',
    county: 'Nairobi',
    coordinates: { latitude: -1.2867, longitude: 36.7739 },
    nearbyAmenities: {
      schools: ['Kilimani Primary', 'Nairobi Academy'],
      hospitals: ['Nairobi Hospital', 'MP Shah Hospital'],
      malls: ['Westgate Mall', 'Sarit Centre'],
      roads: ['Ngong Road', 'Argwings Kodhek Road'],
    },
  },
  propertyDetails: {
    bedrooms: 3,
    bathrooms: 2,
    sizeSqft: 8500,
    furnished: true,
    parking: true,
    powerBackup: true,
    gatedCommunity: true,
    waterReliability: 'excellent',
    securityType: '24/7 Gated with Guards',
  },
  images: [
    'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1565182999555-2142541e9c87?w=800&h=600&fit=crop',
  ],
  agentId: '1',
  agencyId: '1',
  amenities: ['Pool', 'Garden', 'Gym', 'Smart Home System', 'Jacuzzi', 'Home Cinema'],
  views: 1234,
  featured: true,
  promoted: true,
}

const AGENT_DATA = {
  id: '1',
  firstName: 'John',
  lastName: 'Kariuki',
  phone: '+254712345678',
  whatsapp: '+254712345678',
  verified: true,
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  ratings: 4.8,
  reviewsCount: 127,
}

export default function PropertyDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [saved, setSaved] = useState(false)

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="card mb-8 overflow-hidden">
              <div className="relative h-96 bg-keja-gray">
                {PROPERTY_DETAIL.images.length > 0 && (
                  <Image
                    src={PROPERTY_DETAIL.images[selectedImage]}
                    alt={PROPERTY_DETAIL.title}
                    fill
                    className="object-cover"
                  />
                )}
                {/* Badges */}
                <div className="absolute top-4 left-4 space-x-2">
                  {PROPERTY_DETAIL.featured && (
                    <span className="badge bg-keja-green text-white">Featured</span>
                  )}
                  {PROPERTY_DETAIL.promoted && (
                    <span className="badge bg-yellow-400 text-yellow-900">Promoted</span>
                  )}
                </div>
                {/* Actions */}
                <div className="absolute top-4 right-4 space-x-2">
                  <button
                    onClick={() => setSaved(!saved)}
                    className="bg-white rounded-full p-2 shadow-keja hover:bg-keja-green hover:text-white transition"
                  >
                    <Heart className={`w-5 h-5 ${saved ? 'fill-current text-keja-green' : 'text-gray-600'}`} />
                  </button>
                  <button className="bg-white rounded-full p-2 shadow-keja hover:bg-keja-green hover:text-white transition">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              {PROPERTY_DETAIL.images.length > 1 && (
                <div className="flex gap-3 p-4 overflow-x-auto">
                  {PROPERTY_DETAIL.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-24 h-20 rounded-keja overflow-hidden border-2 ${
                        selectedImage === index ? 'border-keja-green' : 'border-keja-border'
                      }`}
                    >
                      <Image
                        src={image}
                        alt="Thumbnail"
                        width={100}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title and Price */}
            <div className="card mb-8">
              <h1 className="text-3xl font-bold text-keja-text mb-2">{PROPERTY_DETAIL.title}</h1>
              <div className="flex items-center gap-2 text-keja-green mb-4">
                <MapPin className="w-5 h-5" />
                <span className="font-medium">{PROPERTY_DETAIL.location.estate}, {PROPERTY_DETAIL.location.town}</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 mb-1">Price</p>
                  <p className="text-4xl font-bold text-keja-green">
                    KES {PROPERTY_DETAIL.price.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 mb-1">Views</p>
                  <p className="text-2xl font-bold text-keja-text">{PROPERTY_DETAIL.views}</p>
                </div>
              </div>
            </div>

            {/* Property Features */}
            <div className="card mb-8">
              <h2 className="text-2xl font-bold mb-6">Property Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <Bed className="w-8 h-8 text-keja-green mx-auto mb-2" />
                  <p className="text-2xl font-bold text-keja-text">{PROPERTY_DETAIL.propertyDetails.bedrooms}</p>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                </div>
                <div className="text-center">
                  <Bath className="w-8 h-8 text-keja-green mx-auto mb-2" />
                  <p className="text-2xl font-bold text-keja-text">{PROPERTY_DETAIL.propertyDetails.bathrooms}</p>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                </div>
                <div className="text-center">
                  <Ruler className="w-8 h-8 text-keja-green mx-auto mb-2" />
                  <p className="text-2xl font-bold text-keja-text">{(PROPERTY_DETAIL.propertyDetails.sizeSqft / 1000).toFixed(1)}k</p>
                  <p className="text-sm text-gray-600">Sq Ft</p>
                </div>
                <div className="text-center">
                  <Check className="w-8 h-8 text-keja-green mx-auto mb-2" />
                  <p className="text-lg font-bold text-keja-text">{PROPERTY_DETAIL.propertyDetails.furnished ? 'Yes' : 'No'}</p>
                  <p className="text-sm text-gray-600">Furnished</p>
                </div>
              </div>

              {/* Amenities & Features */}
              <div>
                <h3 className="font-bold mb-4">Amenities & Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {PROPERTY_DETAIL.propertyDetails.gatedCommunity && (
                    <div className="flex items-center gap-2 p-2 bg-keja-green-light rounded-keja">
                      <Check className="w-5 h-5 text-keja-green" />
                      <span className="text-sm">Gated Community</span>
                    </div>
                  )}
                  {PROPERTY_DETAIL.propertyDetails.parking && (
                    <div className="flex items-center gap-2 p-2 bg-keja-green-light rounded-keja">
                      <Check className="w-5 h-5 text-keja-green" />
                      <span className="text-sm">Parking</span>
                    </div>
                  )}
                  {PROPERTY_DETAIL.propertyDetails.powerBackup && (
                    <div className="flex items-center gap-2 p-2 bg-keja-green-light rounded-keja">
                      <Check className="w-5 h-5 text-keja-green" />
                      <span className="text-sm">Power Backup</span>
                    </div>
                  )}
                  {PROPERTY_DETAIL.propertyDetails.waterReliability && (
                    <div className="flex items-center gap-2 p-2 bg-keja-green-light rounded-keja">
                      <Check className="w-5 h-5 text-keja-green" />
                      <span className="text-sm capitalize">Water: {PROPERTY_DETAIL.propertyDetails.waterReliability}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="card mb-8">
              <h2 className="text-2xl font-bold mb-4">Premium Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {PROPERTY_DETAIL.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-keja-gray rounded-keja">
                    <Check className="w-5 h-5 text-keja-green flex-shrink-0" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Amenities */}
            <div className="card mb-8">
              <h2 className="text-2xl font-bold mb-4">Nearby Amenities</h2>
              <div className="space-y-4">
                {PROPERTY_DETAIL.location.nearbyAmenities?.schools && (
                  <div>
                    <h3 className="font-bold mb-2">Schools</h3>
                    <ul className="space-y-1">
                      {PROPERTY_DETAIL.location.nearbyAmenities.schools.map((school, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                          <Check className="w-4 h-4 text-keja-green" /> {school}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {PROPERTY_DETAIL.location.nearbyAmenities?.hospitals && (
                  <div>
                    <h3 className="font-bold mb-2">Hospitals</h3>
                    <ul className="space-y-1">
                      {PROPERTY_DETAIL.location.nearbyAmenities.hospitals.map((hospital, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                          <Check className="w-4 h-4 text-keja-green" /> {hospital}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {PROPERTY_DETAIL.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                This premium property offers the perfect blend of luxury and comfort. Located in the heart of Kilimani, 
                one of Nairobi&apos;s most prestigious neighborhoods, this home features state-of-the-art amenities and modern design.
                Perfect for families and professionals seeking a high-quality lifestyle.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* WhatsApp Contact */}
            <div className="card mb-8">
              <WhatsAppContact
                property={PROPERTY_DETAIL}
                agent={{
                  name: `${AGENT_DATA.firstName} ${AGENT_DATA.lastName}`,
                  phone: AGENT_DATA.phone,
                  whatsapp: AGENT_DATA.whatsapp
                }}
              />
            </div>
          </div>
        </div>

        {/* Smart Recommendations */}
        <div className="mt-12">
          <SmartRecommendations
            currentProperty={PROPERTY_DETAIL}
            allProperties={[]} // In real app, pass all properties
          />
        </div>
      </div>
    </div>
  )
}
