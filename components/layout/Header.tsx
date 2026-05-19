'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Menu, X, ChevronDown, Phone, ArrowRight, LogIn, UserPlus, Mail, UserCircle } from 'lucide-react'
import { NAV_LINKS, BUSINESS_PHONE, BUSINESS_EMAIL } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session, status } = useSession()
  const lastScrollY = useRef(0)

  const isLoggedIn = !!session?.user
  const isAdmin = session?.user?.role === 'ADMIN'
  const accountHref = isAdmin ? '/admin' : '/account'

  const handleScroll = useCallback(() => {
    const y = window.scrollY
    // Hysteresis: need to scroll past 60px to hide, back below 10px to show
    if (!scrolled && y > 60) {
      setScrolled(true)
    } else if (scrolled && y < 10) {
      setScrolled(false)
    }
    lastScrollY.current = y
  }, [scrolled])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <header className="sticky top-0 z-50">
      {/* Top Utility Bar — uses transform to avoid layout shift */}
      <div
        className={cn(
          'bg-primary text-white transition-transform duration-300 ease-in-out',
          scrolled ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-10 text-sm">
            {/* Left: Contact Info */}
            <div className="flex items-center gap-4">
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="font-medium">{BUSINESS_PHONE}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_EMAIL}`}
                className="hidden sm:flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{BUSINESS_EMAIL}</span>
              </a>
            </div>

            {/* Right: Auth Links — fixed min-height to prevent shift during session load */}
            <div className="flex items-center gap-1 min-h-8">
              {status === 'loading' ? (
                <div className="w-24" />
              ) : isLoggedIn ? (
                <Link
                  href={accountHref}
                  className="flex items-center gap-1.5 px-3 py-1 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors font-medium"
                >
                  <UserCircle className="h-3.5 w-3.5" />
                  My Account
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 px-3 py-1 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors font-medium"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    Login
                  </Link>
                  <span className="text-white/30">|</span>
                  <Link
                    href="/register"
                    className="flex items-center gap-1.5 px-3 py-1 text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-colors font-medium"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar — also shifts up with the utility bar */}
      <div
        className={cn(
          'bg-white transition-all duration-300 ease-in-out',
          scrolled
            ? 'shadow-md -translate-y-10'
            : 'shadow-(--shadow-navbar) translate-y-0'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src="/CRTOhio-logo.png"
                alt="Care Ride Transportation"
                width={140}
                height={100}
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
                        className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-primary/80 hover:text-primary rounded-lg transition-all duration-200 hover:bg-primary/5"
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
                      className="px-3 py-2 text-sm font-semibold text-primary/80 hover:text-primary rounded-lg transition-all duration-200 hover:bg-primary/5"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side: CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/book"
                className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Book a Ride
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-primary/70 hover:text-primary hover:bg-muted rounded-lg transition-colors"
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
              mobileOpen ? 'max-h-[700px] pb-4' : 'max-h-0'
            )}
          >
            <nav className="flex flex-col gap-1 pt-3 border-t border-border" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  {'children' in link && link.children ? (
                    <>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-primary/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
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
                      className="block px-4 py-3 text-sm font-semibold text-primary/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile footer actions */}
              <div className="flex flex-col gap-2 px-3 pt-3 mt-1 border-t border-border/60">
                {isLoggedIn ? (
                  <Link
                    href={accountHref}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors"
                  >
                    <UserCircle className="h-4 w-4" />
                    My Account
                  </Link>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-primary border-2 border-primary/20 rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors"
                    >
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Link>
                  </div>
                )}
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
                  className="flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-xl transition-colors shadow-md"
                >
                  Book a Ride
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
