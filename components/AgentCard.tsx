'use client'

import { Star, Phone, MessageCircle, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Agent } from '@/types'

interface AgentCardProps {
  agent: Agent
  onContact?: (agentId: string) => void
}

export default function AgentCard({ agent, onContact }: AgentCardProps) {
  return (
    <div className="card text-center hover:shadow-keja-hover">
      {/* Profile Image */}
      {agent.profileImage && (
        <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
          <Image
            src={agent.profileImage}
            alt={agent.firstName}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Name and Verification */}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-keja-text">
          {agent.firstName} {agent.lastName}
          {agent.verified && (
            <span className="text-keja-green ml-1">✓</span>
          )}
        </h3>
        {agent.yearsExperience > 0 && (
          <p className="text-sm text-gray-600">{agent.yearsExperience} years experience</p>
        )}
      </div>

      {/* Rating */}
      <div className="flex justify-center items-center gap-2 mb-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(agent.ratings) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">({agent.reviewsCount})</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4 py-3 border-y border-keja-border">
        <div>
          <p className="text-sm font-bold text-keja-green">{agent.propertiesCount}</p>
          <p className="text-xs text-gray-600">Properties</p>
        </div>
        <div>
          <p className="text-sm font-bold text-keja-green">{agent.reviewsCount}</p>
          <p className="text-xs text-gray-600">Reviews</p>
        </div>
      </div>

      {/* Bio */}
      {agent.bio && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {agent.bio}
        </p>
      )}

      {/* Contact Buttons */}
      <div className="space-y-2">
        {agent.whatsapp && (
          <a
            href={`https://wa.me/${agent.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full flex items-center justify-center gap-2 text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        )}
        {agent.phone && (
          <a
            href={`tel:${agent.phone}`}
            className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
        )}
      </div>
    </div>
  )
}
