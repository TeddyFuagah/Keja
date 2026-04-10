import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || 'buy'
    const location = searchParams.get('location')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const type = searchParams.get('type')
    const bedrooms = searchParams.get('bedrooms')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const where: any = {
      category,
      status: 'available'
    }

    if (location) {
      where.OR = [
        { location: { estate: { contains: location, mode: 'insensitive' } } },
        { location: { town: { contains: location, mode: 'insensitive' } } },
        { location: { county: { contains: location, mode: 'insensitive' } } }
      ]
    }

    if (minPrice) where.price = { ...where.price, gte: parseInt(minPrice) }
    if (maxPrice) where.price = { ...where.price, lte: parseInt(maxPrice) }
    if (type) where.type = type
    if (bedrooms) where.propertyDetails = { bedrooms: parseInt(bedrooms) }

    const skip = (page - 1) * limit

    const properties = await prisma.property.findMany({
      where,
      include: {
        agent: {
          select: { id: true, firstName: true, lastName: true, phone: true, whatsapp: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const property = await prisma.property.create({
      data: {
        ...body,
        location: JSON.stringify(body.location),
        images: JSON.stringify(body.images),
        amenities: JSON.stringify(body.amenities)
      }
    })
    return NextResponse.json(property)
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
  }
}