import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { propertyId, guestId, checkInDate, checkOutDate, guests, totalAmount } = body

    const booking = await prisma.booking.create({
      data: {
        propertyId,
        guestId,
        hostId: body.hostId,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        guests: parseInt(guests),
        totalNights: Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)),
        nightlyRate: body.nightlyRate,
        totalAmount: parseFloat(totalAmount),
        status: 'pending'
      }
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}