'use client'

import { useState } from 'react'
import { MessageCircle, Phone, Calendar, Heart } from 'lucide-react'
import { Property } from '@/types'
import toast from 'react-hot-toast'

interface WhatsAppContactProps {
  property: Property
  agent?: {
    name: string
    phone: string
    whatsapp?: string
  }
  host?: {
    name: string
    phone: string
    whatsapp?: string
  }
}

export default function WhatsAppContact({ property, agent, host }: WhatsAppContactProps) {
  const [message, setMessage] = useState('')
  const [isSaved, setIsSaved] = useState(false)

  const contact = agent || host
  const contactType = agent ? 'agent' : 'host'

  const generateWhatsAppMessage = (type: 'inquiry' | 'viewing' | 'custom') => {
    const baseMessage = `Hi ${contact?.name}, I'm interested in the property "${property.title}" located in ${property.location.estate}, ${property.location.town}. `

    switch (type) {
      case 'inquiry':
        return baseMessage + 'Can you provide more details about this property?'
      case 'viewing':
        return baseMessage + 'I would like to schedule a viewing. What dates are available?'
      case 'custom':
        return message || baseMessage + 'Please contact me for more information.'
      default:
        return baseMessage
    }
  }

  const handleWhatsAppContact = (type: 'inquiry' | 'viewing' | 'custom') => {
    if (!contact?.whatsapp && !contact?.phone) {
      toast.error('Contact information not available')
      return
    }

    const whatsappNumber = contact.whatsapp || contact.phone
    const whatsappMessage = encodeURIComponent(generateWhatsAppMessage(type))
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

    window.open(whatsappUrl, '_blank')
    toast.success(`Opening WhatsApp to contact ${contact.name}`)
  }

  const handlePhoneCall = () => {
    if (!contact?.phone) {
      toast.error('Phone number not available')
      return
    }

    window.location.href = `tel:${contact.phone}`
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Removed from saved properties' : 'Added to saved properties!')
  }

  if (!contact) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-keja p-4">
        <p className="text-yellow-800 text-sm">
          Contact information will be available once the property is verified.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Contact Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-keja-text">Contact {contactType}</h3>
          <p className="text-sm text-gray-600">Get instant responses via WhatsApp</p>
        </div>
        <button
          onClick={handleSave}
          className={`p-2 rounded-full transition ${
            isSaved
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-keja-gray text-gray-600 hover:bg-keja-green-light hover:text-keja-green'
          }`}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Agent/Host Info */}
      <div className="bg-keja-gray rounded-keja p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-keja-green rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {contact.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-keja-text">{contact.name}</h4>
            <p className="text-sm text-gray-600 capitalize">{contactType}</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleWhatsAppContact('inquiry')}
            className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">WhatsApp</span>
          </button>

          <button
            onClick={handlePhoneCall}
            className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium">Call</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h4 className="font-semibold text-keja-text">Quick Actions</h4>

        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => handleWhatsAppContact('inquiry')}
            className="flex items-center gap-3 p-3 bg-white border border-keja-border rounded-lg hover:bg-keja-gray transition text-left"
          >
            <MessageCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-keja-text">Ask for Details</p>
              <p className="text-sm text-gray-600">Get more information about this property</p>
            </div>
          </button>

          <button
            onClick={() => handleWhatsAppContact('viewing')}
            className="flex items-center gap-3 p-3 bg-white border border-keja-border rounded-lg hover:bg-keja-gray transition text-left"
          >
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-keja-text">Schedule Viewing</p>
              <p className="text-sm text-gray-600">Book a time to visit this property</p>
            </div>
          </button>
        </div>
      </div>

      {/* Custom Message */}
      <div className="space-y-3">
        <h4 className="font-semibold text-keja-text">Send Custom Message</h4>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="input-field resize-none"
          rows={3}
        />
        <button
          onClick={() => handleWhatsAppContact('custom')}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition font-medium"
        >
          Send via WhatsApp
        </button>
      </div>

      {/* Response Time Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-keja p-3">
        <p className="text-blue-800 text-sm">
          <strong>💡 Tip:</strong> Most agents respond within 30 minutes during business hours.
          For urgent inquiries, try calling directly.
        </p>
      </div>
    </div>
  )
}