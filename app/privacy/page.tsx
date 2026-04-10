export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-keja-green to-keja-green-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
          <p className="text-gray-600 mb-4">
            KEJA (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the KEJA website and mobile application. This page informs you of our policies regarding 
            the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Information Collection and Use</h2>
          <p className="text-gray-600 mb-4">
            We collect several different types of information for various purposes to provide and improve our service to you.
          </p>

          <h3 className="text-xl font-bold mt-6 mb-3">Types of Data Collected:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Personal Data (name, email, phone number, address)</li>
            <li>Device Data (IP address, browser type, device type)</li>
            <li>Usage Data (pages visited, time spent, clicks)</li>
            <li>Location Data (with your consent)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Use of Data</h2>
          <p className="text-gray-600 mb-4">
            KEJA uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To allow you to participate in interactive features</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information for improvement</li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Security of Data</h2>
          <p className="text-gray-600 mb-4">
            The security of your data is important to us, but remember that no method of transmission over the Internet is 100% secure. 
            While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Kenya Data Protection Act Compliance</h2>
          <p className="text-gray-600 mb-4">
            KEJA is compliant with the Kenya Data Protection Act (2019). We respect your rights as outlined in the Act, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
            <li>Right to access your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-600 mt-4">
            Email: hello@keja.co.ke<br/>
            Phone: +254 711 111 111<br/>
            Address: Nairobi, Kenya
          </p>
        </div>
      </section>
    </div>
  )
}
