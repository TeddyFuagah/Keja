import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phoneNumber, amount, bookingId } = body

    // Mock M-Pesa payment processing
    // In production, integrate with M-Pesa API

    // Simulate payment success
    const paymentResult = {
      success: true,
      transactionId: `MP${Date.now()}`,
      message: 'Payment processed successfully'
    }

    return NextResponse.json(paymentResult)
  } catch (error) {
    console.error('Error processing payment:', error)
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 })
  }
}