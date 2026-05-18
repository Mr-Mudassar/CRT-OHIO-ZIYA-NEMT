import { NextResponse } from 'next/server'
import { driverApplicationSchema } from '@/lib/validations/driver-application'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const result = driverApplicationSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      )
    }

    // For now, log the application (in production, save to DB and send email)
    console.log('[Driver Application]', {
      name: result.data.fullName,
      email: result.data.email,
      phone: result.data.phone,
    })

    return NextResponse.json(
      { message: 'Application submitted successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Driver Application Error]', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    )
  }
}
