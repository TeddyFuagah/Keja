'use client'

import { useState } from 'react'
import { Mail, Phone, MessageCircle, Calendar } from 'lucide-react'

interface ContactAgentFormProps {
  agentId: string
  agentName: string
  agentPhone?: string
  agentWhatsapp?: string
}

export default function ContactAgentForm({
  agentId,
  agentName,
  agentPhone,
  agentWhatsapp,
}: ContactAgentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'information' as 'viewing' | 'information' | 'offer',
    preferredContact: 'whatsapp' as 'whatsapp' | 'call' | 'email',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Send to backend API
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'information',
        preferredContact: 'whatsapp',
        message: '',
      })
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h3 className="text-xl font-bold text-keja-text mb-4">Contact {agentName}</h3>

      {submitted && (
        <div className="bg-keja-green-light text-keja-green-dark p-4 rounded-keja">
          ✓ Your inquiry has been sent successfully!
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-keja-text mb-2">Your Name</label>
        <input
          type="text"
          required
          className="input-field"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-keja-text mb-2">Email</label>
        <input
          type="email"
          required
          className="input-field"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-keja-text mb-2">Phone</label>
        <input
          type="tel"
          required
          className="input-field"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+254..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-keja-text mb-2">Inquiry Type</label>
        <select
          className="input-field"
          value={formData.inquiryType}
          onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value as any })}
        >
          <option value="information">More Information</option>
          <option value="viewing">Schedule Viewing</option>
          <option value="offer">Make an Offer</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-keja-text mb-2">Preferred Contact Method</label>
        <select
          className="input-field"
          value={formData.preferredContact}
          onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as any })}
        >
          {agentWhatsapp && <option value="whatsapp">WhatsApp</option>}
          {agentPhone && <option value="call">Call</option>}
          <option value="email">Email</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-keja-text mb-2">Message</label>
        <textarea
          className="input-field resize-none"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell the agent more about your inquiry..."
        ></textarea>
      </div>

      <button type="submit" className="btn-primary w-full">
        Send Inquiry
      </button>

      {/* Quick Contact Options */}
      {(agentWhatsapp || agentPhone) && (
        <div className="pt-4 border-t border-keja-border">
          <p className="text-sm text-gray-600 mb-3">Or contact directly:</p>
          <div className="space-y-2">
            {agentWhatsapp && (
              <a
                href={`https://wa.me/${agentWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            )}
            {agentPhone && (
              <a
                href={`tel:${agentPhone}`}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
            )}
          </div>
        </div>
      )}
    </form>
  )
}
