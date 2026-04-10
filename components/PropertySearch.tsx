'use client'

import { Search, MapPin, Sliders, Home, Wind, Building, LandPlot, Briefcase } from 'lucide-react'
import { useState } from 'react'
import { PropertyFilters, PropertyCategory, PropertyType } from '@/types'

interface PropertySearchProps {
  onSearch?: (filters: PropertyFilters) => void
}

const CATEGORIES = [
  { value: 'buy', label: 'Buy Property', icon: Home },
  { value: 'rent', label: 'Rent Property', icon: Building },
  { value: 'short-stay', label: 'Short Stay', icon: Wind },
  { value: 'land', label: 'Land', icon: LandPlot },
  { value: 'commercial', label: 'Commercial Property', icon: Briefcase },
]

const ESTATES = {
  'Nairobi': ['Kilimani', 'Westlands', 'Lavington', 'Karen', 'Langata', 'Runda', 'Muthaiga', 'Upper Hill', 'CBD'],
  'Mombasa': ['Nyali', 'Tudor', 'Kizingoni', 'Bamburi', 'Likoni', 'Old Town'],
  'Kisumu': ['Nyamasaria', 'Milimani', 'Kericho Road', 'Lake View'],
}

const KENYA_COUNTIES = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Malindi', 'Kitale', 'Garissa', 'Kakamega',
  'Nyeri', 'Meru', 'Embu', 'Kirinyaga', 'Muranga', 'Kiambu', 'Machakos', 'Makueni', 'Kajiado', 'Taita Taveta',
  'Lamu', 'Tana River', 'Marsabit', 'Isiolo', 'Tharaka-Nithi', 'Kitui', 'Kwale',
  'Kilifi', 'Wajir', 'Mandera', 'Samburu', 'Turkana',
  'West Pokot', 'Baringo', 'Laikipia', 'Narok', 'Kericho', 'Bomet', 'Vihiga',
  'Bungoma', 'Busia', 'Siaya', 'Homa Bay', 'Migori', 'Kisii', 'Nyamira'
]

export default function PropertySearch({ onSearch }: PropertySearchProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState<PropertyFilters>({
    category: 'buy',
    type: 'residential',
  })
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [selectedCounty, setSelectedCounty] = useState('')

  const handleSearch = () => {
    onSearch?.(filters)
  }

  const estates = ESTATES[selectedCounty as keyof typeof ESTATES] || []

  return (
    <div className="bg-keja-green text-white rounded-keja p-6 sm:p-8 shadow-keja">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Find Your Perfect Property</h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.value}
              onClick={() => setFilters({ ...filters, category: cat.value as PropertyCategory })}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                filters.category === cat.value
                  ? 'bg-white text-keja-green'
                  : 'bg-keja-green-dark text-white hover:bg-keja-green-light'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Basic Search */}
      <div className="space-y-4">
        {/* Type and Search Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            className="input-field bg-white text-keja-text"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value as PropertyType })}
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="land">Land</option>
          </select>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="btn-outline border-white text-white hover:bg-keja-green-dark flex items-center justify-center gap-2"
          >
            <Sliders className="w-5 h-5" />
            <span>Filters</span>
          </button>

          <button
            onClick={handleSearch}
            className="btn-primary bg-white text-keja-green hover:bg-keja-gray flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>

        {/* Location Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            className="input-field bg-white text-keja-text"
            value={selectedCounty}
            onChange={(e) => {
              setSelectedCounty(e.target.value)
              setFilters({ ...filters, location: e.target.value })
            }}
          >
            <option value="">Select Location</option>
            {KENYA_COUNTIES.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>

          {filters.category === 'short-stay' ? (
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                className="input-field bg-white text-keja-text"
                value={checkInDate}
                onChange={(e) => {
                  setCheckInDate(e.target.value)
                  setFilters({ ...filters, checkInDate: new Date(e.target.value) })
                }}
                placeholder="Check-in"
              />
              <input
                type="date"
                className="input-field bg-white text-keja-text"
                value={checkOutDate}
                onChange={(e) => {
                  setCheckOutDate(e.target.value)
                  setFilters({ ...filters, checkOutDate: new Date(e.target.value) })
                }}
                placeholder="Check-out"
              />
            </div>
          ) : estates.length > 0 ? (
            <select
              className="input-field bg-white text-keja-text"
              onChange={(e) => setFilters({ ...filters, location: `${selectedCounty}, ${e.target.value}` })}
            >
              <option value="">Select Estate</option>
              {estates.map((estate) => (
                <option key={estate} value={estate}>
                  {estate}
                </option>
              ))}
            </select>
          ) : null}
        </div>

        {/* Guests for Short Stay */}
        {filters.category === 'short-stay' && (
          <div>
            <label className="block text-sm font-medium mb-2">Guests</label>
            <select
              className="input-field bg-white text-keja-text"
              value={guests}
              onChange={(e) => {
                setGuests(parseInt(e.target.value))
                setFilters({ ...filters, guests: parseInt(e.target.value) })
              }}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Toggle Advanced Filters */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-white hover:underline text-sm flex items-center gap-2"
        >
          <Sliders className="w-4 h-4" />
          {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        </button>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="space-y-4 pt-4 border-t border-white border-opacity-20">
            {/* Price Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Min Price (KES)</label>
                <input
                  type="number"
                  placeholder="0"
                  className="input-field bg-white text-keja-text"
                  onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) || undefined })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Price (KES)</label>
                <input
                  type="number"
                  placeholder="No limit"
                  className="input-field bg-white text-keja-text"
                  onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) || undefined })}
                />
              </div>
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Bedrooms</label>
                <select
                  className="input-field bg-white text-keja-text"
                  onChange={(e) => setFilters({ ...filters, bedrooms: parseInt(e.target.value) || undefined })}
                >
                  <option value="">Any</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bathrooms</label>
                <select
                  className="input-field bg-white text-keja-text"
                  onChange={(e) => setFilters({ ...filters, bathrooms: parseInt(e.target.value) || undefined })}
                >
                  <option value="">Any</option>
                  <option value="1">1 Bathroom</option>
                  <option value="2">2 Bathrooms</option>
                  <option value="3">3+ Bathrooms</option>
                </select>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-3">
              <label className="block text-sm font-medium">Amenities</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    onChange={(e) => setFilters({ ...filters, furnished: e.target.checked || undefined })}
                  />
                  <span>Furnished</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    onChange={(e) => setFilters({ ...filters, gatedCommunity: e.target.checked || undefined })}
                  />
                  <span>Gated Community</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    onChange={(e) => setFilters({ ...filters, parking: e.target.checked || undefined })}
                  />
                  <span>Parking</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    onChange={(e) => setFilters({ ...filters, powerBackup: e.target.checked || undefined })}
                  />
                  <span>Power Backup</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
