import Link from 'next/link'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  MessageSquare,
} from 'lucide-react'
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'
import {
  SITE_NAME,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  EMERGENCY_DISCLAIMER,
} from '@/lib/constants'

export const metadata = generatePageMetadata({
  title: 'Contact Us',
  description: `Get in touch with ${SITE_NAME}. Call us, email us, or fill out our contact form. We are here to help with your non-emergency medical transportation needs in Ohio.`,
  path: '/contact',
})

const BREADCRUMBS = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
]

const CONTACT_INFO = [
  {
    icon: <Phone className="h-5 w-5" />,
    label: 'Phone',
    value: BUSINESS_PHONE,
    href: `tel:${BUSINESS_PHONE.replace(/\D/g, '')}`,
    description: 'Call us for immediate assistance',
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: 'Email',
    value: BUSINESS_EMAIL,
    href: `mailto:${BUSINESS_EMAIL}`,
    description: 'Send us a message anytime',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Location',
    value: BUSINESS_ADDRESS,
    href: undefined,
    description: 'Serving Greater Cincinnati & Southwest Ohio',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: 'Business Hours',
    value: BUSINESS_HOURS,
    href: undefined,
    description: 'Dispatch available during business hours',
  },
]

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Booking Question',
  'Insurance & Billing',
  'Service Area Question',
  'Partnership Inquiry',
  'Feedback or Complaint',
  'Other',
]

export default function ContactPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(BREADCRUMBS)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ===== BREADCRUMB ===== */}
      <nav aria-label="Breadcrumb" className="bg-muted border-b border-border">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            {BREADCRUMBS.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-border" aria-hidden="true">
                    /
                  </span>
                )}
                {index === BREADCRUMBS.length - 1 ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/city-road.jpg"
            alt="Cincinnati city road representing our service area"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary/90 to-primary-dark/90" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Have a question about our services or need help booking a ride?
            We are here to help. Reach out to us using the form below or contact us directly.
          </p>
        </div>
      </section>

      {/* ===== CONTACT FORM + INFO ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and our team will get back to you within one business day.
                </p>
                <form className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Full Name <span className="text-emergency">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>

                  {/* Email + Phone row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Email Address <span className="text-emergency">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-medium text-foreground mb-1.5"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        name="phone"
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Subject <span className="text-emergency">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      defaultValue=""
                      className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none"
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      {SUBJECT_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Message <span className="text-emergency">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-y min-h-[120px]"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-colors shadow-sm"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>

                  <p className="text-xs text-muted-foreground">
                    By submitting this form, you agree to our{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    . We will never share your information with third parties.
                  </p>
                </form>
              </div>

              {/* Contact Info Sidebar */}
              <div className="lg:col-span-2">
                <div className="sticky top-28">
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Prefer to reach out directly? Here is how you can contact us.
                  </p>

                  <div className="space-y-6 mb-10">
                    {CONTACT_INFO.map((info) => (
                      <div key={info.label} className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary-light text-primary rounded-xl shrink-0">
                          {info.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground mb-0.5">
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-primary font-medium hover:text-primary-dark transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-foreground font-medium">{info.value}</p>
                          )}
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Emergency Notice */}
                  <div className="bg-emergency-light border border-emergency/20 rounded-xl p-5">
                    <p className="text-sm font-semibold text-emergency mb-1">
                      Medical Emergency?
                    </p>
                    <p className="text-sm text-foreground">
                      {EMERGENCY_DISCLAIMER}
                    </p>
                  </div>

                  {/* Quick Book CTA */}
                  <div className="mt-8 bg-muted rounded-xl p-6 text-center">
                    <p className="font-semibold text-foreground mb-2">
                      Need a ride instead?
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Skip the form and book your medical transportation directly.
                    </p>
                    <Link
                      href="/book"
                      className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-colors"
                    >
                      Book a Ride
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MAP PLACEHOLDER ===== */}
      <section className="bg-white pb-16 md:pb-24">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              Our Service Area
            </h2>
            <div className="aspect-[16/6] md:aspect-[16/5] bg-muted rounded-2xl border border-border flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-primary/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium mb-1">
                  Google Maps Integration Coming Soon
                </p>
                <p className="text-sm text-muted-foreground">
                  Serving Cincinnati, Mason, West Chester, Liberty Township, Hamilton, Middletown, and surrounding areas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="gradient-primary py-16 md:py-20">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your Ride?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Schedule your non-emergency medical transportation in just a few minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-dark text-white text-lg font-semibold rounded-xl transition-colors shadow-lg"
            >
              Book a Ride Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-semibold rounded-xl border border-white/20 transition-colors"
            >
              <Phone className="h-5 w-5" />
              {BUSINESS_PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
