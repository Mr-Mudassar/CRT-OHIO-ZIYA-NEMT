import type { Metadata } from 'next'
import Link from 'next/link'
import { CalendarCheck, ArrowLeft } from 'lucide-react'
import { generatePageMetadata } from '@/lib/seo'

export const metadata: Metadata = generatePageMetadata({
  title: 'Book a Ride',
  description: 'Book your non-emergency medical transportation ride with Care Ride Transportation. Easy online booking for Cincinnati, Mason, West Chester, and surrounding Ohio areas.',
  path: '/book',
})

export default function BookPage() {
  return (
    <div className="container-custom py-12 md:py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-6">
          <CalendarCheck className="h-10 w-10 text-accent" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
          Book Your Ride
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Our online booking system is coming soon! In the meantime, please call us or use the contact form to schedule your ride.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:5135550100"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Call to Book
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-colors text-lg"
          >
            Contact Us
          </Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
