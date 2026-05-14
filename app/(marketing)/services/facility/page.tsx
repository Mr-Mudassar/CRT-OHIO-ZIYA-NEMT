import Link from 'next/link'
import {
  Building2,
  ArrowRight,
  Phone,
  ChevronRight,
  CheckCircle2,
  Users,
  Clock,
  FileText,
  Handshake,
} from 'lucide-react'
import { SITE_NAME, BUSINESS_PHONE, EMERGENCY_DISCLAIMER, SERVICES } from '@/lib/constants'
import {
  generatePageMetadata,
  generateServiceJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo'

const SERVICE = SERVICES.find((s) => s.slug === 'facility')!

export const metadata = generatePageMetadata({
  title: `Facility Transportation Services | ${SITE_NAME}`,
  description:
    'Reliable medical transportation for nursing homes, assisted living communities, and healthcare facilities. Individual and group transport with dedicated account management.',
  path: '/services/facility',
})

const RELATED_SERVICES = SERVICES.filter((s) =>
  ['wheelchair', 'hospital-discharge', 'recurring'].includes(s.slug)
)

export default function FacilityServicePage() {
  const serviceJsonLd = generateServiceJsonLd(
    SERVICE.title,
    'Reliable non-emergency medical transportation for nursing homes, assisted living communities, rehabilitation centers, and healthcare facilities across Ohio.',
    SERVICE.slug
  )
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Facility Transportation', href: '/services/facility' },
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
              <span className="text-foreground font-medium">Facility Transportation</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-hero section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mb-6">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Facility Transportation
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Dedicated medical transportation solutions for nursing homes, assisted living
              communities, rehabilitation centers, and healthcare facilities. We partner with
              your staff to ensure every resident gets to their appointments safely and on time.
            </p>
          </div>
        </div>
      </section>

      {/* What Is Facility Transportation */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">
              What Is Facility Transportation?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Facility transportation is a specialized NEMT service designed for healthcare
                facilities that need to coordinate reliable transportation for their residents and
                patients. Nursing homes, assisted living communities, skilled nursing facilities,
                group homes, and rehabilitation centers all face the ongoing challenge of getting
                their residents to off-site medical appointments, therapies, and procedures.
              </p>
              <p>
                Care Ride Transportation serves as a transportation partner for facilities, working
                directly with your activities coordinators, nursing staff, and administrative team
                to streamline the booking and scheduling process. We understand the complexities of
                facility operations: varying mobility levels among residents, the need for
                wheelchair-accessible vehicles, coordination with multiple appointment times, and
                the importance of maintaining detailed records for regulatory compliance.
              </p>
              <p>
                Our facility transportation service offers both individual and group transport
                options. Whether a single resident needs a ride to a specialist or multiple
                residents have appointments at the same medical complex, we configure our service to
                match your facility's needs. We also provide dedicated account management so your
                staff always has a direct line to our dispatch team, reducing the administrative
                burden of arranging transportation for your residents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities We Serve */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Facilities We Serve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Nursing homes and long-term care facilities',
              'Assisted living communities and senior living centers',
              'Skilled nursing and rehabilitation facilities',
              'Group homes and adult foster care residences',
              'Memory care and Alzheimer\'s care facilities',
              'Independent living communities with medical transport needs',
              'Dialysis centers coordinating patient rides',
              'Hospitals and health systems managing patient logistics',
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
            How Our Facility Partnership Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Onboarding Meeting',
                text: 'We meet with your team to understand your facility\'s transportation volume, resident needs, scheduling preferences, and billing requirements.',
              },
              {
                step: '2',
                title: 'Account Setup',
                text: 'Your facility receives a dedicated account with streamlined booking access, priority scheduling, and a direct contact at Care Ride.',
              },
              {
                step: '3',
                title: 'Easy Booking',
                text: 'Your staff books rides by phone or through our system. Provide the resident\'s name, appointment details, mobility needs, and we handle the rest.',
              },
              {
                step: '4',
                title: 'Reliable Execution',
                text: 'Our drivers arrive on time, assist residents with care, transport them safely, and return them to your facility after their appointments.',
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
            Why Facilities Choose Care Ride
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Handshake,
                title: 'Dedicated Account Management',
                text: 'Your facility gets a dedicated point of contact at Care Ride who understands your operations, residents, and scheduling patterns.',
              },
              {
                icon: Users,
                title: 'Individual and Group Transport',
                text: 'Whether you need one resident transported or a group heading to the same medical complex, we scale our service to your needs.',
              },
              {
                icon: FileText,
                title: 'Simplified Billing',
                text: 'We offer consolidated billing for facilities, making it easy to track transportation costs per resident and streamline your accounting.',
              },
              {
                icon: Clock,
                title: 'Reliability You Can Count On',
                text: 'Your staff does not have time to chase down late drivers. Our on-time commitment means fewer disruptions to your daily operations and fewer missed appointments.',
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
            Partner With Care Ride for Your Facility
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Let us handle transportation so your staff can focus on care. Contact us to discuss a
            facility partnership tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/partner"
              className="inline-flex items-center px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors shadow-lg"
            >
              Partner With Us
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
