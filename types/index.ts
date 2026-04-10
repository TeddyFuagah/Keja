// Type definitions
export type PropertyType = 'residential' | 'commercial' | 'land' | 'industrial'
export type PropertyCategory = 'buy' | 'rent' | 'short-stay' | 'land' | 'commercial'
export type PropertyStatus = 'available' | 'sold' | 'rented' | 'pending' | 'off-market'

export interface ShortStayDetails {
  nightlyRate: number
  weeklyRate?: number
  monthlyRate?: number
  cleaningFee?: number
  maxGuests: number
  minNights: number
  maxNights?: number
  instantBooking: boolean
  availability: {
    startDate: Date
    endDate: Date
    blockedDates: Date[]
  }
  checkInTime: string
  checkOutTime: string
  cancellationPolicy: 'flexible' | 'moderate' | 'strict'
  houseRules?: string[]
}

export interface Property {
  id: string
  title: string
  description: string
  type: PropertyType
  category: PropertyCategory
  status: PropertyStatus
  price: number
  monthlyRent?: number
  depositAmount?: number
  shortStayDetails?: ShortStayDetails
  location: {
    estate: string
    town: string
    county: string
    coordinates: {
      latitude: number
      longitude: number
    }
    nearbyAmenities?: {
      schools?: string[]
      hospitals?: string[]
      malls?: string[]
      roads?: string[]
    }
  }
  propertyDetails: {
    bedrooms: number
    bathrooms: number
    sizeSqft: number
    furnished: boolean
    parking: boolean
    waterReliability?: 'excellent' | 'good' | 'fair' | 'poor'
    powerBackup: boolean
    gatedCommunity: boolean
    securityType?: string
  }
  images: string[]
  videos?: string[]
  agentId?: string
  agencyId?: string
  hostId?: string // For short-stay properties
  amenities: string[]
  createdAt: Date
  updatedAt: Date
  views: number
  featured: boolean
  promoted: boolean
}

// Host Types (for short-stay properties)
export interface Host {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  whatsapp?: string
  verified: boolean
  verificationDate?: Date
  profileImage?: string
  bio?: string
  responseRate?: number
  responseTime?: string
  ratings: number
  reviewsCount: number
  propertiesCount: number
  languages: string[]
  createdAt: Date
  updatedAt: Date
}

// Agent Types
export interface Agent {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  whatsapp?: string
  verified: boolean
  verificationDate?: Date
  profileImage?: string
  bio?: string
  agencyId: string
  ratings: number
  reviewsCount: number
  propertiesCount: number
  yearsExperience: number
  languages: string[]
  createdAt: Date
  updatedAt: Date
}

// Agency Types
export interface Agency {
  id: string
  name: string
  email: string
  phone: string
  website?: string
  location: string
  logo?: string
  verified: boolean
  verificationDate?: Date
  ratings: number
  reviewsCount: number
  agentsCount: number
  description?: string
  createdAt: Date
  updatedAt: Date
}

// Booking Types
export interface Booking {
  id: string
  propertyId: string
  guestId: string
  hostId: string
  checkInDate: Date
  checkOutDate: Date
  guests: number
  totalNights: number
  nightlyRate: number
  cleaningFee: number
  serviceFee: number
  totalAmount: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  paymentStatus: 'pending' | 'paid' | 'refunded'
  specialRequests?: string
  createdAt: Date
  updatedAt: Date
}

// User Types
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  profileImage?: string
  role: 'buyer' | 'agent' | 'agency' | 'host' | 'admin'
  agentId?: string
  agencyId?: string
  savedProperties: string[]
  createdAt: Date
  updatedAt: Date
}

// Lead/Inquiry Types
export interface PropertyInquiry {
  id: string
  propertyId: string
  userId: string
  agentId: string
  inquiryType: 'viewing' | 'information' | 'offer'
  message?: string
  preferredContactMethod: 'whatsapp' | 'call' | 'email'
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'closed'
  viewingScheduledDate?: Date
  createdAt: Date
  updatedAt: Date
}

// Review Types
export interface Review {
  id: string
  targetId: string // Agent, Agency, Property, or Host ID
  targetType: 'agent' | 'agency' | 'property' | 'host'
  userId: string
  rating: number // 1-5
  comment: string
  verified: boolean
  createdAt: Date
  updatedAt: Date
}

// Search Filter Types
export interface PropertyFilters {
  category?: PropertyCategory
  type?: PropertyType
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  furnished?: boolean
  gatedCommunity?: boolean
  parking?: boolean
  waterReliability?: string
  location?: string
  checkInDate?: Date
  checkOutDate?: Date
  guests?: number
  amenities?: string[]
}

// Search Filter Types
export interface PropertyFilters {
  category?: PropertyCategory
  type?: PropertyType
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  furnished?: boolean
  gatedCommunity?: boolean
  parking?: boolean
  waterReliability?: string
  location?: string
  checkInDate?: Date
  checkOutDate?: Date
  guests?: number
  amenities?: string[]
  powerBackup?: boolean
  estates?: string[]
  towns?: string[]
  counties?: string[]
  searchRadius?: number // in km
}

// Admin Types
export interface AdminDashboardStats {
  totalProperties: number
  totalUsers: number
  totalAgents: number
  totalAgencies: number
  totalInquiries: number
  revenueThisMonth: number
  pendingVerifications: number
}
