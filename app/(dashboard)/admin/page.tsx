import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  CarIcon,
  AlertCircleIcon,
  CheckCircle2Icon,
  CheckCheckIcon,
  UsersIcon,
  ArrowRightIcon,
} from 'lucide-react'
import type { RideStatus } from '@prisma/client'

const STATUS_CONFIG: Record<
  RideStatus,
  { label: string; className: string }
> = {
  NEW_REQUEST: {
    label: 'New Request',
    className: 'bg-blue-100 text-blue-800',
  },
  UNDER_REVIEW: {
    label: 'Under Review',
    className: 'bg-yellow-100 text-yellow-800',
  },
  CONFIRMED: {
    label: 'Confirmed',
    className: 'bg-green-100 text-green-800',
  },
  DECLINED: {
    label: 'Declined',
    className: 'bg-red-100 text-red-800',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    className: 'bg-purple-100 text-purple-800',
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-gray-100 text-gray-800',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-orange-100 text-orange-800',
  },
  NO_SHOW: {
    label: 'No Show',
    className: 'bg-rose-100 text-rose-800',
  },
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date))
}

function formatPrice(price: unknown): string {
  if (price === null || price === undefined) return '--'
  const num = typeof price === 'object' && 'toNumber' in (price as object)
    ? (price as { toNumber(): number }).toNumber()
    : Number(price)
  return `$${num.toFixed(2)}`
}

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)

  const [
    totalRides,
    newRequests,
    confirmedToday,
    completedToday,
    activeUsers,
    recentRides,
  ] = await Promise.all([
    db.ride.count(),
    db.ride.count({ where: { status: 'NEW_REQUEST' } }),
    db.ride.count({
      where: {
        status: 'CONFIRMED',
        confirmedAt: { gte: startOfDay, lt: endOfDay },
      },
    }),
    db.ride.count({
      where: {
        status: 'COMPLETED',
        completedAt: { gte: startOfDay, lt: endOfDay },
      },
    }),
    db.user.count({ where: { isActive: true, role: 'USER' } }),
    db.ride.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { user: true },
    }),
  ])

  const stats = [
    {
      title: 'Total Rides',
      value: totalRides,
      icon: CarIcon,
      borderColor: 'border-l-blue-500',
      iconColor: 'text-blue-500',
    },
    {
      title: 'New Requests',
      value: newRequests,
      icon: AlertCircleIcon,
      borderColor: 'border-l-amber-500',
      iconColor: 'text-amber-500',
    },
    {
      title: 'Confirmed Today',
      value: confirmedToday,
      icon: CheckCircle2Icon,
      borderColor: 'border-l-green-500',
      iconColor: 'text-green-500',
    },
    {
      title: 'Completed Today',
      value: completedToday,
      icon: CheckCheckIcon,
      borderColor: 'border-l-gray-500',
      iconColor: 'text-gray-500',
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: UsersIcon,
      borderColor: 'border-l-purple-500',
      iconColor: 'text-purple-500',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of ride operations and activity.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/rides"
            className="inline-flex items-center gap-2 h-9 px-4 border border-border bg-white hover:bg-primary hover:text-white hover:border-primary text-sm font-medium rounded-lg transition-colors"
          >
            <CarIcon className="size-4" />
            All Rides
          </Link>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 h-9 px-4 border border-border bg-white hover:bg-primary hover:text-white hover:border-primary text-sm font-medium rounded-lg transition-colors"
          >
            <UsersIcon className="size-4" />
            Users
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className={`border-l-4 ${stat.borderColor}`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`size-5 ${stat.iconColor}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Rides Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Rides</CardTitle>
        </CardHeader>
        <CardContent>
          {recentRides.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No rides found.
            </p>
          ) : (
            <div className="overflow-x-auto -mx-6">
              <div className="inline-block min-w-full px-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Passenger</TableHead>
                      <TableHead className="hidden md:table-cell">Pickup</TableHead>
                      <TableHead className="hidden md:table-cell">Drop-off</TableHead>
                      <TableHead className="hidden lg:table-cell">Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden sm:table-cell">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRides.map((ride) => {
                      const statusConfig = STATUS_CONFIG[ride.status]
                      return (
                        <TableRow key={ride.id}>
                          <TableCell>
                            <Link
                              href={`/admin/rides/${ride.id}`}
                              className="text-primary font-medium underline-offset-4 hover:underline whitespace-nowrap"
                            >
                              {formatDate(ride.pickupDateTime)}
                            </Link>
                          </TableCell>
                          <TableCell className="font-medium">
                            {ride.passengerName}
                          </TableCell>
                          <TableCell
                            className="hidden md:table-cell max-w-50 truncate text-muted-foreground"
                            title={ride.pickupAddress}
                          >
                            {ride.pickupAddress}
                          </TableCell>
                          <TableCell
                            className="hidden md:table-cell max-w-50 truncate text-muted-foreground"
                            title={ride.dropoffAddress}
                          >
                            {ride.dropoffAddress}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell capitalize text-muted-foreground">
                            {ride.transportType}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={statusConfig.className}
                            >
                              {statusConfig.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell font-medium">
                            {formatPrice(ride.estimatedPrice)}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
