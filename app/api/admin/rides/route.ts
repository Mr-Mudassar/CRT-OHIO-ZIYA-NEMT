import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import type { RideStatus, Prisma } from '@prisma/client'

const VALID_STATUSES: RideStatus[] = [
  'NEW_REQUEST',
  'UNDER_REVIEW',
  'CONFIRMED',
  'DECLINED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW',
]

export async function GET(request: NextRequest) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const statusFilter = searchParams.get('status') as RideStatus | null
  const searchQuery = searchParams.get('q')

  const where: Prisma.RideWhereInput = {}

  if (statusFilter && VALID_STATUSES.includes(statusFilter)) {
    where.status = statusFilter
  }

  if (searchQuery) {
    where.passengerName = {
      contains: searchQuery,
      mode: 'insensitive',
    }
  }

  const rides = await db.ride.findMany({
    where,
    orderBy: { pickupDateTime: 'desc' },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      _count: {
        select: { communications: true },
      },
    },
  })

  return NextResponse.json({ rides })
}
