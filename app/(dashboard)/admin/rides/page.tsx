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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SearchIcon, ArrowLeftIcon, FilterIcon, XIcon } from 'lucide-react'
import { Pagination } from '@/components/shared/Pagination'
import type { RideStatus, Prisma } from '@prisma/client'

const ITEMS_PER_PAGE = 10

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

const ALL_STATUSES = Object.keys(STATUS_CONFIG) as RideStatus[]

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
  const num =
    typeof price === 'object' && 'toNumber' in (price as object)
      ? (price as { toNumber(): number }).toNumber()
      : Number(price)
  return `$${num.toFixed(2)}`
}

export default async function AdminRidesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>
}) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const params = await searchParams
  const statusFilter = params.status as RideStatus | undefined
  const searchQuery = params.q || ''
  const currentPage = Math.max(1, parseInt(params.page || '1', 10) || 1)

  const where: Prisma.RideWhereInput = {}

  if (statusFilter && ALL_STATUSES.includes(statusFilter)) {
    where.status = statusFilter
  }

  if (searchQuery) {
    where.OR = [
      { passengerName: { contains: searchQuery, mode: 'insensitive' } },
      { passengerEmail: { contains: searchQuery, mode: 'insensitive' } },
      { pickupAddress: { contains: searchQuery, mode: 'insensitive' } },
      { dropoffAddress: { contains: searchQuery, mode: 'insensitive' } },
      { publicId: { contains: searchQuery, mode: 'insensitive' } },
    ]
  }

  const [rides, totalCount] = await Promise.all([
    db.ride.findMany({
      where,
      orderBy: { pickupDateTime: 'desc' },
      include: { user: true },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.ride.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  // Build search params for pagination links
  const paginationParams: Record<string, string> = {}
  if (statusFilter) paginationParams.status = statusFilter
  if (searchQuery) paginationParams.q = searchQuery

  const hasFilters = !!(statusFilter || searchQuery)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center justify-center size-9 rounded-lg border border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-heading">All Rides</h1>
            <p className="text-sm text-muted-foreground">
              {totalCount} ride{totalCount !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <form method="GET" className="flex flex-col gap-4 sm:flex-row sm:items-end">
            {/* Status Filter */}
            <div className="flex flex-col gap-1.5 sm:w-48">
              <label
                htmlFor="status"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                defaultValue={statusFilter || ''}
                className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option value="">All Statuses</option>
                {ALL_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_CONFIG[s].label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex flex-1 flex-col gap-1.5">
              <label
                htmlFor="q"
                className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Search
              </label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="q"
                  name="q"
                  type="text"
                  placeholder="Search name, email, address, or ID..."
                  defaultValue={searchQuery}
                  className="h-10 w-full rounded-lg border border-border bg-white pl-10 pr-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 h-10 px-5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors"
              >
                <FilterIcon className="size-4" />
                Filter
              </button>
              {hasFilters && (
                <Link
                  href="/admin/rides"
                  className="inline-flex items-center gap-2 h-10 px-4 border border-border bg-white hover:bg-primary hover:text-white hover:border-primary text-sm font-medium rounded-lg transition-colors"
                >
                  <XIcon className="size-4" />
                  Clear
                </Link>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Rides Table */}
      <Card>
        <CardHeader>
          <CardTitle>Rides</CardTitle>
        </CardHeader>
        <CardContent>
          {rides.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No rides match your filters.
            </p>
          ) : (
            <>
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
                        <TableHead className="hidden lg:table-cell">Payer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden sm:table-cell">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rides.map((ride) => {
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
                              className="hidden md:table-cell max-w-[180px] truncate text-muted-foreground"
                              title={ride.pickupAddress}
                            >
                              {ride.pickupAddress}
                            </TableCell>
                            <TableCell
                              className="hidden md:table-cell max-w-[180px] truncate text-muted-foreground"
                              title={ride.dropoffAddress}
                            >
                              {ride.dropoffAddress}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell capitalize text-muted-foreground">
                              {ride.transportType}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell capitalize text-muted-foreground">
                              {ride.payerType.replace('_', ' ')}
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

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalCount}
                basePath="/admin/rides"
                searchParams={paginationParams}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
