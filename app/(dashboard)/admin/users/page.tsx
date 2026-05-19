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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowLeftIcon, SearchIcon, FilterIcon, XIcon } from 'lucide-react'
import { Pagination } from '@/components/shared/Pagination'
import type { Prisma } from '@prisma/client'

const ITEMS_PER_PAGE = 10

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/login')
  }

  const params = await searchParams
  const searchQuery = params.q || ''
  const currentPage = Math.max(1, parseInt(params.page || '1', 10) || 1)

  const where: Prisma.UserWhereInput = { role: 'USER' }

  if (searchQuery) {
    where.OR = [
      { name: { contains: searchQuery, mode: 'insensitive' } },
      { email: { contains: searchQuery, mode: 'insensitive' } },
      { phone: { contains: searchQuery, mode: 'insensitive' } },
    ]
  }

  const [users, totalCount] = await Promise.all([
    db.user.findMany({
      where,
      include: {
        _count: {
          select: { rides: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    db.user.count({ where }),
  ])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const paginationParams: Record<string, string> = {}
  if (searchQuery) paginationParams.q = searchQuery

  const hasFilters = !!searchQuery

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin"
          className="flex items-center justify-center size-9 rounded-lg border border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-colors"
        >
          <ArrowLeftIcon className="size-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-heading">Users</h1>
          <p className="text-sm text-muted-foreground">
            {totalCount} user{totalCount !== 1 ? 's' : ''} registered
          </p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-5 pb-5">
          <form method="GET" className="flex flex-col gap-4 sm:flex-row sm:items-end">
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
                  placeholder="Search name, email, or phone..."
                  defaultValue={searchQuery}
                  className="h-10 w-full rounded-lg border border-border bg-white pl-10 pr-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 h-10 px-5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors"
              >
                <FilterIcon className="size-4" />
                Search
              </button>
              {hasFilters && (
                <Link
                  href="/admin/users"
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

      <Card>
        <CardHeader>
          <CardTitle>Registered Users</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              {hasFilters ? 'No users match your search.' : 'No users registered yet.'}
            </p>
          ) : (
            <>
              <div className="overflow-x-auto -mx-6">
                <div className="inline-block min-w-full px-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="hidden sm:table-cell">Phone</TableHead>
                        <TableHead className="hidden sm:table-cell">Rides</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.name || '--'}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {user.email}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground">
                            {user.phone || '--'}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {user._count.rides}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-block size-2 rounded-full ${
                                  user.isActive ? 'bg-green-500' : 'bg-red-500'
                                }`}
                              />
                              <span className="text-sm">
                                {user.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {formatDate(user.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalCount}
                basePath="/admin/users"
                searchParams={paginationParams}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
