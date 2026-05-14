import Link from 'next/link'
import {
  CalendarClock,
  ArrowRight,
  Phone,
  ChevronRight,
  CheckCircle2,
  CalendarCheck,
  Repeat,
  Shield,
  Users,
} from 'lucide-react'
import { SITE_NAME, BUSINESS_PHONE, EMERGENCY_DISCLAIMER, SERVICES } from '@/lib/constants'
import {
  generatePageMetadata,
  generateServiceJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo'

const SERVICE = SERVICES.find((s) => s.slug === 'recurring')!

export const metadata = generatePageMetadata({
  title: `Recurring Ride Transportation | ${SITE_NAME}`,
  description:
    'Scheduled recurring non-emergency medical transportation for regular treatments, therapy sessions, dialysis, and check-ups. Serving Cincinnati, Mason, West Chester, and surrounding Ohio areas.',
  path: '/services/recurring',
})

const RELATED_SERVICES = SERVICES.filter((s) =>
  ['dialysis', 'medical-appointments', 'facility'].includes(s.slug)
)

export default function RecurringServicePage() {
  const serviceJsonLd = generateServiceJsonLd(
    SERVICE.title,
    'Scheduled recurring non-emergency medical transportation for regular treatments, therapy sessions, dialysis, and routine check-ups across Ohio.',
    SERVICE.slug
  )
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Recurring Rides', href: '/services/recurring' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-muted border-b border-border">
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li><ChevronRight className="h-3.5 w-3.5" /></li>
            <li>
              <Link href="/services" className="hover:text-primary transition-colors">
                Services
              </Link>
            </li>
            <li><ChevronRight className="h-3.5 w-3.5" /></li>
            <li>
              <span className="text-foreground font-medium">Recurring Rides</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mb-6">
              <CalendarClock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Recurring Ride Transportation
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Set it and forget it. Our recurring ride service provides scheduled, automatic
              transportation for patients with regular medical appointments, therapy sessions,
              treatments, and check-ups. Book once, ride consistently.
            </p>
          </div>
        </div>
      </section>

      {/* What Are Recurring Rides */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">
              What Are Recurring Rides?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Recurring rides are pre-scheduled, repeating transportation arrangements designed
                for patients who need regular medical transport on a predictable schedule. Instead
                of booking a new ride every time you have an appointment, you set up your schedule
                once and we handle the rest. Your rides are automatically dispatched on your chosen
                days and times, eliminating the need to call or book online before each trip.
              </p>
              <p>
                This service is ideal for patients undergoing ongoing treatments such as dialysis,
                physical therapy, occupational therapy, chemotherapy, radiation treatment, behavioral
                health counseling, or any other regular medical appointment. Many chronic conditions
                require consistent, ongoing care, and missing appointments can set back treatment
                progress. Recurring rides remove the transportation barrier and ensure you stay on
                track with your care plan.
              </p>
              <p>
                Care Ride Transportation offers flexible recurring schedules including daily,
                weekly, multiple days per week (such as Monday-Wednesday-Friday for dialysis), and
                custom patterns that match your specific treatment calendar. If your schedule
                changes, we adapt with you. Need to skip a session, add an extra ride, or adjust
                your pickup time? Just let us know and we will update your schedule accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Recurring Schedules */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Common Recurring Ride Schedules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Dialysis appointments (typically 3 times per week)',
              'Physical therapy or rehabilitation sessions (2-5 times per week)',
              'Chemotherapy or radiation treatments on a set schedule',
              'Behavioral health and counseling appointments (weekly or bi-weekly)',
              'Occupational therapy sessions',
              'Wound care and post-surgical follow-up visits',
              'Chronic disease management appointments (monthly or bi-monthly)',
              'Regular specialist check-ups for ongoing conditions',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Options */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Flexible Scheduling Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Daily',
                text: 'For patients with daily treatment requirements. Same time, same route, every day.',
              },
              {
                title: 'Weekly',
                text: 'Once-a-week appointments with your preferred day and time locked in consistently.',
              },
              {
                title: 'Multiple Days',
                text: 'Choose specific days of the week, such as Mon/Wed/Fri for dialysis or Tue/Thu for therapy.',
              },
              {
                title: 'Custom Pattern',
                text: 'Bi-weekly, every third day, or any custom schedule that matches your treatment plan.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-border rounded-xl p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Set Your Schedule',
                text: 'Tell us your treatment days, appointment times, pickup address, and destination. We build your recurring schedule around your care plan.',
              },
              {
                step: '2',
                title: 'Automatic Dispatch',
                text: 'Your rides are automatically scheduled and dispatched. No need to call or book online before each appointment.',
              },
              {
                step: '3',
                title: 'Consistent Service',
                text: 'We work to assign the same driver for your regular rides, building familiarity and trust over time.',
              },
              {
                step: '4',
                title: 'Easy Modifications',
                text: 'Need to skip a ride, change a time, or pause your schedule? A quick call or message and we update your plan.',
              },
            ].map((item) => (
              <div key={item.step}>
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Care Ride */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Why Choose Care Ride for Recurring Rides?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Repeat,
                title: 'Set It and Forget It',
                text: 'Once your recurring schedule is set, your rides are automatically handled. No more calling to book before every appointment.',
              },
              {
                icon: Users,
                title: 'Same Driver Consistency',
                text: 'We prioritize assigning the same driver to your recurring schedule so you build a comfortable, trusting relationship over time.',
              },
              {
                icon: CalendarCheck,
                title: 'Flexible Modifications',
                text: 'Life happens. We make it easy to skip rides, add extra trips, change times, or pause and resume your schedule as needed.',
              },
              {
                icon: Shield,
                title: 'Never Miss Treatment',
                text: 'Consistent transportation means consistent care. Our recurring ride service helps ensure you never miss an important treatment or therapy session.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-border rounded-xl p-6 shadow-[var(--shadow-card)]"
              >
                <item.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Related Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {RELATED_SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white border border-border rounded-xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary section-padding">
        <div className="container-custom text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            Set Up Your Recurring Ride Schedule
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Stop worrying about how you will get to your next appointment. Set up your recurring
            ride schedule today and let us take care of the transportation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              Book a Ride Online
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
              className="inline-flex items-center px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/30"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call {BUSINESS_PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Emergency Disclaimer */}
      <div className="bg-emergency-light py-3">
        <div className="container-custom text-center">
          <p className="text-sm text-emergency font-medium">{EMERGENCY_DISCLAIMER}</p>
        </div>
      </div>
    </>
  )
}
