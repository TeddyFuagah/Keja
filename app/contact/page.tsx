'use client'

import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form:', formData)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-keja-green to-keja-green-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-green-100">We&apos;d love to hear from you. Get in touch with us.</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-keja-green flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Address</h3>
                  <p className="text-gray-600">Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-keja-green flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Phone</h3>
                  <a href="tel:+254717712702" className="text-keja-green hover:underline">
                    +254 717712702
                  </a>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-keja-green flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Email</h3>
                  <a href="mailto:hello@keja.co.ke" className="text-keja-green hover:underline">
                    hello@keja.co.ke
                  </a>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 text-keja-green flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">WhatsApp</h3>
                  <a href="https://wa.me/254717712702" className="text-keja-green hover:underline">
                    +254 717 712 702
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 card">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitted && (
                <div className="bg-keja-green-light text-keja-green-dark p-4 rounded-keja">
                  ✓ Thank you! We&apos;ll get back to you soon.
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-keja-text mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-keja-text mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="input-field"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-keja-text mb-2">Subject</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-keja-text mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
