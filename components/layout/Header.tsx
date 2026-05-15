'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone, ArrowRight } from 'lucide-react'
import { NAV_LINKS, BUSINESS_PHONE } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-md'
          : 'bg-white shadow-[var(--shadow-navbar)]'
      )}
    >
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
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <div key={link.href} className="relative group">
                {'children' in link && link.children ? (
                  <>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-heading/80 hover:text-primary rounded-lg transition-all duration-200 hover:bg-primary/5"
                    >
                      {link.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    </Link>
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                      <div className="bg-white rounded-xl shadow-xl border border-border/60 py-2 min-w-[260px] overflow-hidden">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:text-primary hover:bg-muted/80 transition-all duration-200"
                          >
                            <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="px-3.5 py-2 text-sm font-semibold text-heading/80 hover:text-primary rounded-lg transition-all duration-200 hover:bg-primary/5"
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
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                <Phone className="h-4 w-4" />
              </div>
              <span>{BUSINESS_PHONE}</span>
            </a>
            <Link
              href="/book"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5"
            >
              Book a Ride
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-heading/70 hover:text-heading hover:bg-muted rounded-lg transition-colors"
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
          <nav className="flex flex-col gap-1 pt-3 border-t border-border" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <div key={link.href}>
                {'children' in link && link.children ? (
                  <>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-heading/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      {link.label}
                      <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', servicesOpen && 'rotate-180')} />
                    </button>
                    <div className={cn('overflow-hidden transition-all duration-300', servicesOpen ? 'max-h-96' : 'max-h-0')}>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block pl-8 pr-4 py-2.5 text-sm text-foreground/70 hover:text-primary transition-colors"
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
                    className="block px-4 py-3 text-sm font-semibold text-heading/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-2 px-3 pt-3 mt-1 border-t border-border/60">
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-primary border-2 border-primary/20 rounded-xl hover:bg-primary/5 transition-colors"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS_PHONE}
              </a>
              <Link
                href="/book"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 py-3 bg-accent hover:bg-accent-dark text-white text-sm font-bold rounded-xl transition-colors shadow-md"
              >
                Book a Ride
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
