'use client'

import { useState, useEffect } from 'react'
import { Property } from '@/types'
import { TrendingUp, Eye, Heart, Clock } from 'lucide-react'
import PropertyCard from './PropertyCard'

interface TrendingPropertiesProps {
  properties: Property[]
}

type TrendingType = 'viewed' | 'saved' | 'recent'

export default function TrendingProperties({ properties }: TrendingPropertiesProps) {
  const [activeTab, setActiveTab] = useState<TrendingType>('viewed')
  const [trendingProperties, setTrendingProperties] = useState<Property[]>([])

  useEffect(() => {
    // Mock trending data - in real app, this would come from analytics
    const getTrending = (type: TrendingType) => {
      switch (type) {
        case 'viewed':
          return [...properties]
            .sort((a, b) => b.views - a.views)
            .slice(0, 8)
        case 'saved':
          // Mock saved count - in real app, this would be actual save counts
          return [...properties]
            .map(p => ({ ...p, savedCount: Math.floor(Math.random() * 50) + 1 }))
            .sort((a, b) => (b as any).savedCount - (a as any).savedCount)
            .slice(0, 8)
        case 'recent':
          return [...properties]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 8)
        default:
          return properties.slice(0, 8)
      }
    }

    setTrendingProperties(getTrending(activeTab))
  }, [activeTab, properties])

  const tabs = [
    {
      id: 'viewed' as TrendingType,
      label: 'Most Viewed',
      icon: Eye,
      description: 'Popular properties this week'
    },
    {
      id: 'saved' as TrendingType,
      label: 'Most Saved',
      icon: Heart,
      description: 'Properties users love'
    },
    {
      id: 'recent' as TrendingType,
      label: 'Recently Added',
      icon: Clock,
      description: 'New listings'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-keja-text mb-2">Trending Now</h2>
        <p className="text-gray-600">See what&apos;s hot in the Kenyan property market</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl transition ${
                activeTab === tab.id
                  ? 'bg-keja-green text-white shadow-keja'
                  : 'bg-keja-gray text-keja-text hover:bg-keja-green-light'
              }`}
            >
              <Icon className="w-5 h-5" />
              <div className="text-left">
                <p className="font-semibold">{tab.label}</p>
                <p className="text-sm opacity-80">{tab.description}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingProperties.map((property, index) => (
          <div key={property.id} className="relative">
            {/* Trending Badge */}
            <div className="absolute -top-2 -left-2 z-10 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
              {index + 1}
            </div>

            <PropertyCard property={property} />

            {/* Trending Stats */}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              {activeTab === 'viewed' && (
                <div className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  <span>{property.views}</span>
                </div>
              )}
              {activeTab === 'saved' && (
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>{Math.floor(Math.random() * 50) + 1}</span>
                </div>
              )}
              {activeTab === 'recent' && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>New</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Trending Insights */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-keja p-6">
        <div className="flex items-start gap-4">
          <TrendingUp className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-orange-900 mb-2">Market Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-orange-800">Most Popular Areas</p>
                <p className="text-orange-700">Westlands, Kilimani, Karen</p>
              </div>
              <div>
                <p className="font-semibold text-orange-800">Average Property Price</p>
                <p className="text-orange-700">KES 12.5M (up 8% this month)</p>
              </div>
              <div>
                <p className="font-semibold text-orange-800">Most Searched Type</p>
                <p className="text-orange-700">2-3 Bedroom Apartments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}