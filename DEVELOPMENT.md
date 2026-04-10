# KEJA Development Guide

## Quick Start

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager
- Git
- VS Code (recommended) with ESLint extension

### Installation Steps

1. **Clone & Setup**
   ```bash
   git clone <repository-url>
   cd keja-real-estate
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   Visit http://localhost:3000

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

### `src/app/` - Page Routes
- `page.tsx` - Homepage
- `properties/page.tsx` - Property listings
- `properties/[id]/page.tsx` - Property detail page
- `agents/page.tsx` - Agent directory
- `agencies/page.tsx` - Agency directory
- `dashboard/page.tsx` - Admin dashboard
- `auth/login/page.tsx` - Login page
- `auth/signup/page.tsx` - Signup page
- `about/page.tsx` - About page
- `contact/page.tsx` - Contact page
- `privacy/page.tsx` - Privacy policy
- `terms/page.tsx` - Terms of service

### `src/components/` - Reusable Components
- `Header.tsx` - Navigation header
- `Footer.tsx` - Footer with links
- `PropertyCard.tsx` - Single property listing card
- `PropertySearch.tsx` - Search and filter component
- `AgentCard.tsx` - Agent profile card
- `ContactAgentForm.tsx` - Contact inquiry form

### `src/types/` - TypeScript Definitions
- `index.ts` - All type definitions for the application

### `src/styles/` - Styling
- `globals.css` - Global styles and utility classes

## Component Usage Examples

### PropertyCard
```tsx
import PropertyCard from '@/components/PropertyCard'

<PropertyCard 
  property={propertyData}
  isFavorite={false}
  onFavorite={(id) => console.log(id)}
/>
```

### PropertySearch
```tsx
import PropertySearch from '@/components/PropertySearch'

<PropertySearch 
  onSearch={(filters) => console.log(filters)}
/>
```

### AgentCard
```tsx
import AgentCard from '@/components/AgentCard'

<AgentCard 
  agent={agentData}
  onContact={(agentId) => console.log(agentId)}
/>
```

### ContactAgentForm
```tsx
import ContactAgentForm from '@/components/ContactAgentForm'

<ContactAgentForm
  agentId="1"
  agentName="John Kariuki"
  agentPhone="+254712345678"
  agentWhatsapp="+254712345678"
/>
```

## Styling Guide

### Color System
```css
/* Primary Colors */
--keja-green: #10B981
--keja-green-dark: #059669
--keja-green-light: #D1FAE5

/* Neutral Colors */
--keja-white: #FFFFFF
--keja-gray: #F3F4F6
--keja-border: #E5E7EB
--keja-text: #1F2937
```

### Using Tailwind Classes
```tsx
// Buttons
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-outline">Outline Button</button>

// Cards
<div className="card">Card content</div>

// Inputs
<input className="input-field" />

// Badges
<span className="badge">Verified</span>

// Titles
<h1 className="section-title">Section Title</h1>
<p className="section-subtitle">Subtitle</p>
```

## Type Definitions

### Property Type
```typescript
interface Property {
  id: string
  title: string
  type: 'residential' | 'commercial' | 'land'
  category: 'buy' | 'rent' | 'lease'
  price: number
  monthlyRent?: number
  location: {
    estate: string
    town: string
    county: string
    coordinates: { latitude: number; longitude: number }
  }
  // ... more fields
}
```

### Agent Type
```typescript
interface Agent {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  whatsapp?: string
  verified: boolean
  // ... more fields
}
```

## Common Tasks

### Adding a New Page

1. Create file in `src/app/` directory
2. Use layout from `src/app/layout.tsx` automatically
3. Example:

```tsx
// src/app/my-page/page.tsx
export default function MyPage() {
  return (
    <div>
      <h1>My Page</h1>
    </div>
  )
}
```

### Creating a New Component

1. Create file in `src/components/`
2. Make it a client component if it uses hooks:

```tsx
// src/components/MyComponent.tsx
'use client'

import { useState } from 'react'

export default function MyComponent() {
  const [state, setState] = useState('')

  return <div>{state}</div>
}
```

### Adding Icons

We use Lucide React for icons:

```tsx
import { Home, Search, Heart, MapPin } from 'lucide-react'

<Home className="w-5 h-5 text-keja-green" />
```

### Linking to Pages

```tsx
import Link from 'next/link'

<Link href="/properties">Properties</Link>
<Link href="/properties/1">View Property</Link>
```

## API Integration Guide

### Setting Up API Calls

```tsx
'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function MyComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/properties')
        setData(response.data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

  return <div>{/* Render data */}</div>
}
```

### Creating API Routes

```typescript
// src/app/api/properties/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Handle GET request
  return NextResponse.json({ properties: [] })
}

export async function POST(request: NextRequest) {
  // Handle POST request
  const body = await request.json()
  return NextResponse.json({ success: true })
}
```

## Database Setup (When Ready)

### Prisma ORM

1. Install Prisma:
   ```bash
   npm install @prisma/client prisma
   npx prisma init
   ```

2. Define schema in `prisma/schema.prisma`

3. Create migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

## Testing

### Running Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## Best Practices

1. **Always use TypeScript** for type safety
2. **Use 'use client'** when you need browser APIs or state
3. **Keep components small** and focused
4. **Use Tailwind classes** instead of custom CSS
5. **Implement proper error handling** in async operations
6. **Use semantic HTML** for accessibility
7. **Optimize images** using Next.js Image component
8. **Follow naming conventions**:
   - Components: PascalCase
   - Functions/variables: camelCase
   - Constants: UPPER_SNAKE_CASE

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

### Build Errors
```bash
# Check type errors
npm run type-check

# Check linting errors
npm run lint --fix
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Lucide React Icons](https://lucide.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Submit pull request

## Support

For issues and questions:
- Email: hello@keja.co.ke
- WhatsApp: +254 711 111 111

---

**Happy coding! 🚀**
