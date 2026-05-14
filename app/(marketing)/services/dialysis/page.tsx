import Link from 'next/link'
import Image from 'next/image'
import {
  HeartPulse,
  ArrowRight,
  Phone,
  ChevronRight,
  CheckCircle2,
  CalendarCheck,
  Clock,
  Shield,
  Repeat,
} from 'lucide-react'
import { SITE_NAME, BUSINESS_PHONE, EMERGENCY_DISCLAIMER, SERVICES } from '@/lib/constants'
import {
  generatePageMetadata,
  generateServiceJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo'

const SERVICE = SERVICES.find((s) => s.slug === 'dialysis')!

export const metadata = generatePageMetadata({
  title: `Dialysis Transportation Services | ${SITE_NAME}`,
  description:
    'Reliable recurring transportation to and from dialysis centers, scheduled around your treatment times. Serving Cincinnati, Mason, West Chester, and surrounding Ohio areas.',
  path: '/services/dialysis',
})

const RELATED_SERVICES = SERVICES.filter((s) =>
  ['recurring', 'wheelchair', 'medical-appointments'].includes(s.slug)
)

export default function DialysisServicePage() {
  const serviceJsonLd = generateServiceJsonLd(
    SERVICE.title,
    'Reliable recurring transportation to and from dialysis centers, scheduled around your treatment times. Consistent drivers, on-time pickups, and compassionate service across Ohio.',
    SERVICE.slug
  )
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Dialysis Transportation', href: '/services/dialysis' },
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
              <span className="text-foreground font-medium">Dialysis Transportation</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero with Image Banner */}
      <section className="relative h-[320px] sm:h-[400px] lg:h-[450px] overflow-hidden">
        <Image
          src="/images/service-dialysis.jpg"
          alt="Reliable dialysis transportation services"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6">
                <HeartPulse className="h-7 w-7 text-white" />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Dialysis Transportation
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl drop-shadow-md">
                Reliable, recurring transportation to and from dialysis centers, scheduled around your
                treatment times. We understand that dialysis patients need consistency, punctuality,
                and compassionate care every single visit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Dialysis Transportation */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">
              What Is Dialysis Transportation?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Dialysis transportation is a specialized form of non-emergency medical
                transportation designed specifically for patients who require regular hemodialysis
                treatments. Most dialysis patients attend sessions three times per week, each
                lasting three to five hours, making reliable transportation not just a convenience
                but a medical necessity. Missing even a single dialysis session can lead to
                dangerous health complications.
              </p>
              <p>
                At Care Ride Transportation, we recognize the unique challenges that dialysis
                patients face. Treatments are physically taxing, and many patients feel fatigued,
                dizzy, or weak after their sessions. Our drivers are trained to understand these
                conditions and provide gentle, patient assistance before and after treatment. We
                coordinate pickup times with your dialysis center to ensure seamless transitions
                that do not leave you waiting when you are at your most vulnerable.
              </p>
              <p>
                Our dialysis transportation service is built on consistency. We work to assign you
                the same driver for your regular schedule so that you build a comfortable
                relationship with someone who knows your needs, your center, and your routine. This
                consistency reduces stress and gives both patients and their families peace of mind
                knowing that transportation is one less thing to worry about during treatment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Who Benefits from Dialysis Transportation?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Patients receiving hemodialysis treatments three or more times per week',
              'Individuals who are too fatigued after treatment to drive themselves safely',
              'Patients with end-stage renal disease (ESRD) managing ongoing treatments',
              'Seniors without family members available to provide regular transport',
              'Medicaid beneficiaries entitled to non-emergency medical transportation',
              'Wheelchair users needing accessible transport to dialysis appointments',
              'Patients who have lost their driving privileges due to medical conditions',
              'Caregivers seeking reliable transport solutions for their loved ones',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Set Your Schedule',
                text: 'Share your dialysis center name, treatment days, and session times. We build a recurring schedule tailored to your needs.',
              },
              {
                step: '2',
                title: 'Consistent Pickups',
                text: 'Your assigned driver arrives at the same time before each session, ready to assist you to the vehicle and ensure a smooth ride.',
              },
              {
                step: '3',
                title: 'Center Coordination',
                text: 'We work with your dialysis center to coordinate post-treatment pickups, adjusting for any delays in your session.',
              },
              {
                step: '4',
                title: 'Safe Ride Home',
                text: 'After treatment, your driver provides patient, gentle assistance getting you safely home when you need it most.',
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
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Why Choose Care Ride for Dialysis Transportation?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Repeat,
                title: 'Consistent Driver Assignment',
                text: 'We aim to assign the same driver to your recurring schedule so you ride with someone who knows you, your routine, and your center.',
              },
              {
                icon: CalendarCheck,
                title: 'Flexible Recurring Scheduling',
                text: 'Whether you need rides three times a week, every other day, or on a custom schedule, we build a plan that fits your treatment calendar.',
              },
              {
                icon: Clock,
                title: 'Post-Treatment Patience',
                text: 'Dialysis sessions can run long. Our drivers coordinate with your center and wait patiently so you never feel rushed after treatment.',
              },
              {
                icon: Shield,
                title: 'Safe Post-Dialysis Transport',
                text: 'Our drivers understand that patients may feel weak after treatment. They provide extra care with walking assistance, door support, and gentle handling.',
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
      <section className="section-padding">
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
            Book Your Dialysis Transportation
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Never miss a dialysis appointment again. Set up your recurring ride schedule today and
            let us handle the rest.
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
