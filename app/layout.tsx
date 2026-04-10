import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KEJA - Find Your Dream Property in Kenya',
  description:
    'KEJA is a modern real estate platform for buying, renting, and leasing properties in Kenya. Find houses, apartments, land, and commercial properties with verified agents.',
  keywords:
    'real estate Kenya, property for sale, property for rent, apartments, houses, land, Nairobi, Mombasa',
  openGraph: {
    title: 'KEJA - Modern Real Estate Platform for Kenya',
    description: 'Find your perfect property in Kenya with KEJA',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/logo/keja-01.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo/keja-01.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/logo/keja-01.png',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <ServiceWorkerRegistration />
        </Providers>
      </body>
    </html>
  )
}
