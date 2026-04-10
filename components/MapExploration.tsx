'use client'

import { useState, useEffect, useRef } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { Property } from '@/types'
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react'

interface MapExplorationProps {
  properties: Property[]
  onPropertySelect?: (property: Property) => void
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

// Google Maps Marker Component
function Marker({ property, onClick }: { property: Property; onClick: () => void }) {
  const markerRef = useRef<google.maps.Marker | null>(null)
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)

  useEffect(() => {
    if (!markerRef.current) {
      const marker = new google.maps.Marker({
        position: {
          lat: property.location.coordinates.latitude,
          lng: property.location.coordinates.longitude
        },
        title: property.title,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#10B981" stroke="white" stroke-width="3"/>
              <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">K</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 40)
        }
      })

      marker.addListener('click', onClick)
      markerRef.current = marker
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null)
      }
    }
  }, [property, onClick])

  return null
}

// Google Maps Component
function GoogleMap({ properties, onPropertySelect }: MapExplorationProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<google.maps.Map | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [mapCenter, setMapCenter] = useState({ lat: -1.2867, lng: 36.7739 }) // Nairobi coordinates
  const [mapZoom, setMapZoom] = useState(12)

  useEffect(() => {
    if (mapRef.current && !googleMapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: mapZoom,
        styles: [
          {
            featureType: 'poi',
            stylers: [{ visibility: 'off' }]
          }
        ]
      })

      googleMapRef.current = map
    }
  }, [mapCenter, mapZoom])

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property)
    onPropertySelect?.(property)

    if (googleMapRef.current) {
      googleMapRef.current.setCenter({
        lat: property.location.coordinates.latitude,
        lng: property.location.coordinates.longitude
      })
      googleMapRef.current.setZoom(15)
    }
  }

  const handleZoomIn = () => {
    if (googleMapRef.current) {
      const currentZoom = googleMapRef.current.getZoom()
      if (currentZoom !== undefined) {
        googleMapRef.current.setZoom(currentZoom + 1)
        setMapZoom(currentZoom + 1)
      }
    }
  }

  const handleZoomOut = () => {
    if (googleMapRef.current) {
      const currentZoom = googleMapRef.current.getZoom()
      if (currentZoom !== undefined) {
        googleMapRef.current.setZoom(currentZoom - 1)
        setMapZoom(currentZoom - 1)
      }
    }
  }

  const handleCenterOnNairobi = () => {
    const nairobiCenter = { lat: -1.2867, lng: 36.7739 }
    if (googleMapRef.current) {
      googleMapRef.current.setCenter(nairobiCenter)
      googleMapRef.current.setZoom(12)
    }
    setMapCenter(nairobiCenter)
    setMapZoom(12)
  }

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-keja-text">Explore Properties on Map</h3>
          <p className="text-gray-600">Click on markers to see property details</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 bg-keja-white border border-keja-border rounded hover:bg-keja-gray transition"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 bg-keja-white border border-keja-border rounded hover:bg-keja-gray transition"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleCenterOnNairobi}
            className="p-2 bg-keja-white border border-keja-border rounded hover:bg-keja-gray transition"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-96 rounded-keja overflow-hidden border border-keja-border relative">
        <div ref={mapRef} className="w-full h-full" />
        {properties.map((property) => (
          <Marker
            key={property.id}
            property={property}
            onClick={() => handleMarkerClick(property)}
          />
        ))}
      </div>

      {/* Selected Property Info */}
      {selectedProperty && (
        <div className="bg-keja-white border border-keja-border rounded-keja p-4">
          <h4 className="font-bold text-keja-text mb-2">{selectedProperty.title}</h4>
          <p className="text-gray-600 text-sm mb-2">
            {selectedProperty.location.estate}, {selectedProperty.location.town}
          </p>
          <p className="text-keja-green font-bold">
            KES {selectedProperty.price.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}

// Loading Component
function LoadingComponent() {
  return (
    <div className="h-96 bg-keja-gray rounded-keja flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-12 h-12 text-keja-green mx-auto mb-4 animate-pulse" />
        <p className="text-keja-text">Loading Google Maps...</p>
      </div>
    </div>
  )
}

// Error Component
function ErrorComponent() {
  return (
    <div className="h-96 bg-red-50 rounded-keja flex items-center justify-center">
      <div className="text-center">
        <MapPin className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 font-semibold">Failed to load map</p>
        <p className="text-red-500 text-sm">Please check your internet connection</p>
      </div>
    </div>
  )
}

// Main Component
export default function MapExploration({ properties, onPropertySelect }: MapExplorationProps) {
  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <LoadingComponent />
      case Status.FAILURE:
        return <ErrorComponent />
      case Status.SUCCESS:
        return <GoogleMap properties={properties} onPropertySelect={onPropertySelect} />
    }
  }

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="h-96 bg-yellow-50 rounded-keja flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-yellow-600 font-semibold">Google Maps API Key Required</p>
          <p className="text-yellow-500 text-sm">Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables</p>
        </div>
      </div>
    )
  }

  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render} />
  )
}