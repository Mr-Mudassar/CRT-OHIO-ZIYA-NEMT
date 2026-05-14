import Link from 'next/link'
import { Home, ArrowLeft, Phone } from 'lucide-react'
import { BUSINESS_PHONE } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="container-custom text-center py-20">
        <div className="max-w-lg mx-auto">
          {/* 404 Number */}
          <p className="text-8xl md:text-9xl font-bold text-primary/10 font-heading mb-2">404</p>

          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-3">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or
            doesn&apos;t exist. Let us help you get where you need to go.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground hover:bg-white font-semibold rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Contact Us
            </Link>
          </div>

          {/* Phone */}
          <p className="mt-8 text-sm text-muted-foreground">
            Need immediate help?{' '}
            <a href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`} className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              <Phone className="h-3.5 w-3.5" />
              Call {BUSINESS_PHONE}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
