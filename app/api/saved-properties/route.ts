import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, propertyId } = body

    // Check if already saved
    const existing = await prisma.collection.findFirst({
      where: {
        userId,
        properties: {
          contains: propertyId
        }
      }
    })

    if (existing) {
      return NextResponse.json({ message: 'Property already saved' })
    }

    // Add to user's saved properties
    const user = await prisma.user.findUnique({ where: { id: userId } })
    const savedProperties = JSON.parse(user?.savedProperties || '[]')
    savedProperties.push(propertyId)

    await prisma.user.update({
      where: { id: userId },
      data: { savedProperties: JSON.stringify(savedProperties) }
    })

    return NextResponse.json({ message: 'Property saved successfully' })
  } catch (error) {
    console.error('Error saving property:', error)
    return NextResponse.json({ error: 'Failed to save property' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    const savedPropertyIds = JSON.parse(user?.savedProperties || '[]')

    const properties = await prisma.property.findMany({
      where: {
        id: { in: savedPropertyIds }
      }
    })

    return NextResponse.json(properties)
  } catch (error) {
    console.error('Error fetching saved properties:', error)
    return NextResponse.json({ error: 'Failed to fetch saved properties' }, { status: 500 })
  }
}