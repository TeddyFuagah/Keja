export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-keja-green to-keja-green-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">About KEJA</h1>
          <p className="text-lg text-green-100">Revolutionizing real estate in Kenya</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              KEJA is transforming how Kenyans buy, rent, and lease properties. We&apos;re building a transparent, trustworthy platform 
              that connects property seekers with verified agents and agencies.
            </p>
            <p className="text-gray-600">
              Our vision is to make real estate transactions in Kenya simple, fast, and secure for everyone.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Why KEJA?</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-keja-green rounded-full"></span>
                100% verified properties and agents
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-keja-green rounded-full"></span>
                Kenya Data Protection Act compliant
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-keja-green rounded-full"></span>
                WhatsApp-first communication
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-keja-green rounded-full"></span>
                Expert support and guidance
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-keja-gray rounded-keja p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-keja-green mb-2">2,847+</p>
              <p className="text-gray-600">Properties Listed</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-keja-green mb-2">456+</p>
              <p className="text-gray-600">Verified Agents</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-keja-green mb-2">1,200+</p>
              <p className="text-gray-600">Successful Transactions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
