import SavedProperties from '@/components/SavedProperties'
import { Property } from '@/types'

// Mock data - in real app, this would come from database
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

export default function SavedPage() {
  return (
    <div className="min-h-screen bg-keja-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SavedProperties properties={MOCK_PROPERTIES} />
      </div>
    </div>
  )
}