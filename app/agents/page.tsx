'use client'

import { useState } from 'react'
import AgentCard from '@/components/AgentCard'
import { Agent } from '@/types'
import { Search } from 'lucide-react'

// Mock data
const MOCK_AGENTS: Agent[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Kariuki',
    email: 'john@example.com',
    phone: '+254712345678',
    whatsapp: '+254712345678',
    verified: true,
    verificationDate: new Date(),
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    bio: 'Experienced real estate agent specializing in luxury properties in Nairobi. Over 10 years in the industry.',
    agencyId: '1',
    ratings: 4.8,
    reviewsCount: 127,
    propertiesCount: 34,
    yearsExperience: 10,
    languages: ['English', 'Swahili'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    firstName: 'Mary',
    lastName: 'Omondi',
    email: 'mary@example.com',
    phone: '+254723456789',
    whatsapp: '+254723456789',
    verified: true,
    verificationDate: new Date(),
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    bio: 'Specialist in residential apartments and family homes. Strong track record in coastal regions.',
    agencyId: '2',
    ratings: 4.9,
    reviewsCount: 156,
    propertiesCount: 42,
    yearsExperience: 12,
    languages: ['English', 'Swahili', 'Arabic'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    firstName: 'Rashid',
    lastName: 'Hassan',
    email: 'rashid@example.com',
    phone: '+254734567890',
    whatsapp: '+254734567890',
    verified: true,
    verificationDate: new Date(),
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    bio: 'Commercial property expert with focus on retail and office spaces across Kenya.',
    agencyId: '1',
    ratings: 4.7,
    reviewsCount: 98,
    propertiesCount: 28,
    yearsExperience: 8,
    languages: ['English', 'Swahili'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVerification, setSelectedVerification] = useState<'all' | 'verified'>('all')

  const filteredAgents = MOCK_AGENTS.filter(agent => {
    const matchesSearch = agent.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          agent.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesVerification = selectedVerification === 'all' || (selectedVerification === 'verified' && agent.verified)
    return matchesSearch && matchesVerification
  })

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-keja-green to-keja-green-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Find a Real Estate Agent</h1>
          <p className="text-lg text-green-100">Connect with verified and experienced agents across Kenya</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Search Bar */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by agent name..."
                className="input-field pl-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filter */}
          <select
            className="input-field"
            value={selectedVerification}
            onChange={(e) => setSelectedVerification(e.target.value as any)}
          >
            <option value="all">All Agents</option>
            <option value="verified">Verified Only</option>
          </select>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-8">
          Showing {filteredAgents.length} agent{filteredAgents.length !== 1 ? 's' : ''}
        </p>

        {/* Agents Grid */}
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No agents found matching your search.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedVerification('all')
              }}
              className="btn-primary"
            >
              View All Agents
            </button>
          </div>
        )}
      </section>

      {/* Why Choose Section */}
      <section className="bg-keja-gray py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Benefits of Working with KEJA Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <h3 className="text-lg font-bold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">All agents are verified and screened for quality and professionalism.</p>
            </div>
            <div className="card text-center">
              <h3 className="text-lg font-bold mb-2">Local Expertise</h3>
              <p className="text-gray-600">Agents have deep knowledge of local markets and neighborhoods.</p>
            </div>
            <div className="card text-center">
              <h3 className="text-lg font-bold mb-2">Quick Response</h3>
              <p className="text-gray-600">Direct WhatsApp communication for fast and convenient inquiries.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
