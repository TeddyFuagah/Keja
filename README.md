# KEJA - Modern Real Estate Platform for Kenya

![KEJA Logo](./public/logo.svg)

A modern, professional real estate web platform inspired by Zillow.com and Realtor.com, fully adapted for the Kenyan real estate market. KEJA is mobile-first, fast, and user-friendly, designed for users in Kenya searching for houses, apartments, land, and commercial properties for sale or rent.

## 🌟 Features

### Core Features
- **Advanced Property Listings**: Buy, Rent, Lease categories with Residential, Commercial, and Land options
- **Smart Search & Filters**: Location (estate, town, county), price range, bedrooms, bathrooms, furnished/unfurnished, amenities
- **Map-Based Search**: Interactive map view with properties pinned on map
- **Verified Agents & Agencies**: Agent profiles, agency pages, verification badges, reviews & ratings
- **Lead & Inquiry System**: Contact forms, schedule property viewings, save favorites
- **WhatsApp-First Communication**: Direct WhatsApp integration for seamless communication

### Admin & Agent Dashboards
- **Agent Dashboard**: Add, edit, and manage listings
- **Admin Dashboard**: Approve listings, verify agents, view analytics
- **Performance Analytics**: Views and leads tracking

### Kenya-Specific Features
- Estate-based locations (Kilimani, Runda, Nyali, CBD, etc.)
- Deposit and rent breakdown
- Water reliability indicators
- Security and gated community tags
- Kenya Data Protection Act compliance

## 🎨 Design System

### Colors
- **Primary Green**: `#10B981` (Trust, growth, nature)
- **Dark Green**: `#059669` (Authority, stability)
- **Light Green**: `#D1FAE5` (Accessibility, approachability)
- **White**: `#FFFFFF` (Clarity, simplicity)
- **Gray**: `#F3F4F6`, `#E5E7EB`, `#1F2937` (Text, borders, backgrounds)

### Typography
- **Font Family**: Inter (Clean, modern, professional)
- **Hierarchy**: Bold, clear typography for readability on mobile

### Components
- **Cards**: Used for property listings and feature cards
- **Buttons**: Primary, Secondary, and Outline variants
- **Badges**: For verification status, featured/promoted tags
- **Forms**: Accessible, mobile-friendly input fields

## 📱 Pages

### User-Facing Pages
- **Homepage** (`/`): Hero section with search, featured properties, and trust indicators
- **Properties Listing** (`/properties`): Grid/list view with advanced filters
- **Property Detail** (`/properties/[id]`): Full property information, images, agent contact
- **Agents Directory** (`/agents`): Verified agents with ratings and reviews
- **Agency Pages** (`/agencies/[id]`): Agency profiles and listings
- **About** (`/about`): Company information
- **Contact** (`/contact`): Contact form and support

### Authentication Pages
- **Login** (`/auth/login`): Sign in with email and password
- **Signup** (`/auth/signup`): Register as buyer, agent, or agency

### Admin Pages
- **Admin Dashboard** (`/dashboard`): Analytics, pending verifications, management
- **Property Management**: Approve/reject listings
- **Agent Verification**: Review and verify agents

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React with SSR/SSG)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Images**: Next.js Image optimization
- **State Management**: React Hooks
- **Forms**: React Hook Form

### Backend (Ready for API Integration)
- **Framework**: Next.js API Routes
- **Database**: PostgreSQL (with Prisma ORM - when needed)
- **Authentication**: JWT/Sessions
- **File Storage**: Cloudinary or S3 (for property images)

### Libraries
- **axios**: HTTP client
- **zod**: Schema validation
- **date-fns**: Date formatting
- **clsx**: Class name utilities
- **recharts**: Analytics charts

## 📋 Project Structure

```
keja-real-estate/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Root layout
│   │   ├── properties/        # Property pages
│   │   │   ├── page.tsx       # Listings
│   │   │   └── [id]/page.tsx  # Property detail
│   │   ├── agents/page.tsx    # Agents directory
│   │   ├── dashboard/page.tsx # Admin dashboard
│   │   ├── auth/              # Authentication
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── components/            # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── PropertyCard.tsx
│   │   ├── PropertySearch.tsx
│   │   ├── AgentCard.tsx
│   │   └── ContactAgentForm.tsx
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css        # Global styles & utilities
│   └── lib/                   # Utilities and helpers
├── public/                    # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/keja-real-estate.git
   cd keja-real-estate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📚 Component Documentation

### PropertyCard
Displays a single property listing with image, details, and action buttons.

```tsx
<PropertyCard property={propertyData} isFavorite={false} onFavorite={handleFavorite} />
```

### PropertySearch
Advanced search and filter component for properties.

```tsx
<PropertySearch onSearch={handleSearch} />
```

### AgentCard
Displays agent profile with ratings, reviews, and contact options.

```tsx
<AgentCard agent={agentData} onContact={handleContact} />
```

### ContactAgentForm
Form for users to inquire about properties or schedule viewings.

```tsx
<ContactAgentForm 
  agentId="1" 
  agentName="John Kariuki"
  agentPhone="+254712345678"
  agentWhatsapp="+254712345678"
/>
```

## 🔐 Data Privacy & Compliance

- Kenya Data Protection Act compliant
- GDPR-ready for future expansion
- Secure authentication with password hashing
- Privacy policy included
- Terms of service available

## 📊 Mock Data

The platform includes comprehensive mock data for:
- Properties (residential, commercial, land)
- Agents with ratings and reviews
- Agencies
- Users and interactions

Replace with real API calls when backend is ready.

## 🎯 Future Enhancements

- [ ] Real-time map integration (Google Maps, Mapbox)
- [ ] Advanced analytics dashboard
- [ ] Video property tours
- [ ] AI-powered property recommendations
- [ ] Virtual property tours (3D)
- [ ] Mobile app (React Native)
- [ ] Payment integration (M-Pesa, Stripe)
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Advanced search with machine learning
- [ ] Mortgage calculator
- [ ] Property comparison tool

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email hello@keja.co.ke or WhatsApp +254 711 111 111

## 🙏 Acknowledgments

- Inspired by Zillow.com and Realtor.com
- Built with Next.js, React, and Tailwind CSS
- Icons from Lucide React
- Designed for the Kenyan real estate market

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Made with ❤️ for Kenya's Real Estate Market**
