'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Heart, Plus, FolderOpen, Edit, Trash2 } from 'lucide-react'
import PropertyCard from './PropertyCard'
import { Property } from '@/types'
import toast from 'react-hot-toast'

interface SavedPropertiesProps {
  properties: Property[]
}

interface Collection {
  id: string
  name: string
  description?: string
  properties: string[]
  isPublic: boolean
}

export default function SavedProperties({ properties }: SavedPropertiesProps) {
  const { data: session } = useSession()
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      name: 'Dream House',
      description: 'My perfect family home',
      properties: ['1', '2'],
      isPublic: false
    },
    {
      id: '2',
      name: 'Investment Properties',
      description: 'Properties for long-term investment',
      properties: ['3'],
      isPublic: false
    }
  ])
  const [activeCollection, setActiveCollection] = useState<string>('all')
  const [showCreateCollection, setShowCreateCollection] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState('')
  const [newCollectionDesc, setNewCollectionDesc] = useState('')

  // Mock saved properties - in real app, this would come from user's saved list
  const savedPropertyIds = ['1', '2', '3', '4']
  const savedProperties = properties.filter(p => savedPropertyIds.includes(p.id))

  const filteredProperties = activeCollection === 'all'
    ? savedProperties
    : savedProperties.filter(p => collections.find(c => c.id === activeCollection)?.properties.includes(p.id))

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return

    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newCollectionName,
      description: newCollectionDesc,
      properties: [],
      isPublic: false
    }

    setCollections([...collections, newCollection])
    setNewCollectionName('')
    setNewCollectionDesc('')
    setShowCreateCollection(false)
    toast.success('Collection created!')
  }

  const handleSaveToCollection = (propertyId: string, collectionId: string) => {
    setCollections(collections.map(c =>
      c.id === collectionId
        ? { ...c, properties: [...c.properties, propertyId] }
        : c
    ))
    toast.success('Property added to collection!')
  }

  if (!session) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Sign in to save properties</h3>
        <p className="text-gray-500 mb-6">Create collections and keep track of your favorite homes</p>
        <a href="/auth/login" className="btn-primary">Sign In</a>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-keja-text">My Dream Homes</h1>
          <p className="text-gray-600 mt-1">Organize and save your favorite properties</p>
        </div>
        <button
          onClick={() => setShowCreateCollection(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Collection
        </button>
      </div>

      {/* Collections Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCollection('all')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeCollection === 'all'
              ? 'bg-keja-green text-white'
              : 'bg-keja-gray text-keja-text hover:bg-keja-green-light'
          }`}
        >
          All Saved ({savedProperties.length})
        </button>
        {collections.map(collection => (
          <button
            key={collection.id}
            onClick={() => setActiveCollection(collection.id)}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
              activeCollection === collection.id
                ? 'bg-keja-green text-white'
                : 'bg-keja-gray text-keja-text hover:bg-keja-green-light'
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            {collection.name} ({collection.properties.length})
          </button>
        ))}
      </div>

      {/* Properties Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="relative">
              <PropertyCard property={property} isFavorite={true} />
              {/* Collection Actions */}
              <div className="absolute top-2 right-12 flex gap-1">
                <div className="relative group">
                  <button className="bg-white rounded-full p-2 shadow-keja hover:bg-keja-green hover:text-white transition">
                    <Plus className="w-4 h-4 text-keja-green" />
                  </button>
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-keja shadow-keja border border-keja-border py-2 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    {collections.map(collection => (
                      <button
                        key={collection.id}
                        onClick={() => handleSaveToCollection(property.id, collection.id)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-keja-gray"
                      >
                        Add to {collection.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {activeCollection === 'all' ? 'No saved properties yet' : 'No properties in this collection'}
          </h3>
          <p className="text-gray-500 mb-6">
            {activeCollection === 'all'
              ? 'Start browsing and save properties you love'
              : 'Add properties to this collection'
            }
          </p>
          <a href="/properties" className="btn-primary">Browse Properties</a>
        </div>
      )}

      {/* Create Collection Modal */}
      {showCreateCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-keja p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Create New Collection</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Collection Name</label>
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Dream House, Investment Properties"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description (Optional)</label>
                <textarea
                  value={newCollectionDesc}
                  onChange={(e) => setNewCollectionDesc(e.target.value)}
                  className="input-field"
                  rows={3}
                  placeholder="Describe this collection..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateCollection(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCollection}
                className="btn-primary flex-1"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}