'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { NAV_LINKS, BUSINESS_PHONE } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[var(--shadow-navbar)]">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/CRTOhio-logo.png"
              alt="Care Ride Transportation"
              width={180}
              height={60}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <div key={link.href} className="relative group">
                {'children' in link && link.children ? (
                  <>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md transition-colors"
                    >
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                    </Link>
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-lg shadow-lg border border-border py-2 min-w-[240px]">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-muted transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>{BUSINESS_PHONE}</span>
            </a>
            <Link
              href="/book"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
            >
              Book a Ride
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground/70 hover:text-foreground rounded-md"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            mobileOpen ? 'max-h-[600px] pb-4' : 'max-h-0'
          )}
        >
          <nav className="flex flex-col gap-1 pt-2 border-t border-border" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                {'children' in link && link.children ? (
                  <>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-md"
                    >
                      {link.label}
                      <ChevronDown className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')} />
                    </button>
                    <div className={cn('overflow-hidden transition-all', servicesOpen ? 'max-h-96' : 'max-h-0')}>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block pl-6 pr-3 py-2 text-sm text-foreground/60 hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-primary rounded-md"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 px-3 pt-2">
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-primary border border-primary rounded-lg"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS_PHONE}
              </a>
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Book a Ride
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
