import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock, Globe, ExternalLink } from 'lucide-react'
import {
  SITE_NAME,
  BUSINESS_PHONE,
  BUSINESS_EMAIL,
  BUSINESS_ADDRESS,
  BUSINESS_HOURS,
  EMERGENCY_DISCLAIMER,
  SERVICES,
  SERVICE_AREAS,
} from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.svg"
                alt={SITE_NAME}
                width={160}
                height={42}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Safe, reliable non-emergency medical transportation serving Cincinnati and surrounding Ohio communities.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Website"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Social Media"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm text-accent hover:text-accent-light transition-colors font-medium">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Service Areas', href: '/service-areas' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Partner With Us', href: '/partner' },
                { label: 'Become a Driver', href: '/become-a-driver' },
                { label: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                  className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  {BUSINESS_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                  {BUSINESS_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                {BUSINESS_ADDRESS}
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Clock className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span className="leading-relaxed">{BUSINESS_HOURS}</span>
              </li>
            </ul>

            {/* Service Areas */}
            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Serving</p>
              <p className="text-sm text-white/60">
                {SERVICE_AREAS.map((area) => area.name).join(' • ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Disclaimer */}
      <div className="border-t border-white/10 bg-primary-dark">
        <div className="container-custom py-3 text-center">
          <p className="text-sm text-emergency-light font-medium">{EMERGENCY_DISCLAIMER}</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-primary-dark">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-white/50 hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/50 hover:text-white/80 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/accessibility" className="text-xs text-white/50 hover:text-white/80 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
