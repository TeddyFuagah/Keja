import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get basic stats for the homepage
    const [propertiesCount, usersCount, bookingsCount, agentsCount] = await Promise.all([
      prisma.property.count(),
      prisma.user.count(),
      prisma.booking.count(),
      prisma.user.count({ where: { role: 'agent' } })
    ]);

    return NextResponse.json({
      properties: propertiesCount,
      users: usersCount,
      bookings: bookingsCount,
      agents: agentsCount
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}