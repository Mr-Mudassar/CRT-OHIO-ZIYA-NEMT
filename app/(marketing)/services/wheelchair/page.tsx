import Link from 'next/link'
import Image from 'next/image'
import {
  Accessibility,
  ArrowRight,
  Phone,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Wrench,
  HeartHandshake,
} from 'lucide-react'
import { SITE_NAME, BUSINESS_PHONE, EMERGENCY_DISCLAIMER, SERVICES } from '@/lib/constants'
import {
  generatePageMetadata,
  generateServiceJsonLd,
  generateBreadcrumbJsonLd,
} from '@/lib/seo'

const SERVICE = SERVICES.find((s) => s.slug === 'wheelchair')!

export const metadata = generatePageMetadata({
  title: `Wheelchair Accessible Transportation | ${SITE_NAME}`,
  description:
    'ADA-compliant wheelchair transportation with hydraulic ramps, secure tie-down systems, and trained drivers. Serving Cincinnati, Mason, West Chester, and surrounding Ohio areas.',
  path: '/services/wheelchair',
})

const RELATED_SERVICES = SERVICES.filter((s) =>
  ['ambulatory', 'dialysis', 'facility'].includes(s.slug)
)

export default function WheelchairServicePage() {
  const serviceJsonLd = generateServiceJsonLd(
    SERVICE.title,
    'ADA-compliant wheelchair accessible transportation with hydraulic ramps, secure tie-down systems, and specially trained drivers for safe medical transport across Ohio.',
    SERVICE.slug
  )
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Wheelchair Transportation', href: '/services/wheelchair' },
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
              <span className="text-foreground font-medium">Wheelchair Transportation</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero with Image Banner */}
      <section className="relative h-[320px] sm:h-[400px] lg:h-[450px] overflow-hidden">
        <Image
          src="/images/wheelchair-care.jpg"
          alt="Wheelchair accessible transportation with professional care"
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
                <Accessibility className="h-7 w-7 text-white" />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Wheelchair Accessible Transportation
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl drop-shadow-md">
                ADA-compliant vehicles equipped with hydraulic wheelchair ramps and secure tie-down
                systems. Our trained drivers ensure safe, comfortable transport for passengers using
                manual or powered wheelchairs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Wheelchair Transportation */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6">
              What Is Wheelchair Accessible Transportation?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Wheelchair accessible transportation is a specialized non-emergency medical
                transportation service designed for individuals who use wheelchairs, whether manual
                or powered. Our vehicles are specifically outfitted with hydraulic ramps or lifts,
                wheelchair securement systems, and spacious interiors that allow passengers to ride
                safely and comfortably without leaving their wheelchair.
              </p>
              <p>
                Every vehicle in our wheelchair-accessible fleet meets or exceeds ADA (Americans
                with Disabilities Act) requirements. This means wide doorways, slip-resistant ramp
                surfaces, four-point tie-down systems that secure the wheelchair during transit, and
                shoulder-lap belt restraints for passengers. Our drivers are trained in proper
                wheelchair securement procedures and passenger assistance techniques, ensuring your
                safety from door to door.
              </p>
              <p>
                We understand that wheelchair users often face significant barriers to accessing
                healthcare. Long wait times for paratransit, unreliable scheduling, and vehicles
                that are not properly equipped can all prevent patients from keeping critical medical
                appointments. Care Ride Transportation eliminates these barriers by providing
                dependable, on-time wheelchair transport that you can count on, ride after ride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Who Benefits from Wheelchair Transportation?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Individuals who use manual wheelchairs for daily mobility',
              'Patients with powered or motorized wheelchairs and scooters',
              'Seniors with limited mobility who require wheelchair assistance',
              'Patients recovering from surgery or injury who temporarily use a wheelchair',
              'Individuals with spinal cord injuries, multiple sclerosis, or cerebral palsy',
              'Dialysis patients who need wheelchair transport multiple times per week',
              'Residents of nursing homes and assisted living facilities',
              'Veterans and individuals covered by Medicaid transportation benefits',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Features */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-8">
            Our Wheelchair Vehicle Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Hydraulic Ramps & Lifts',
                text: 'Our vehicles feature powered ramps or lifts with non-slip surfaces for safe, smooth boarding from any surface.',
              },
              {
                title: 'Four-Point Tie-Downs',
                text: 'Industry-standard securement systems lock the wheelchair firmly in place, preventing any movement during transit.',
              },
              {
                title: 'Shoulder-Lap Belts',
                text: 'Passenger restraint systems provide additional security and meet all federal safety requirements for wheelchair transport.',
              },
              {
                title: 'Climate-Controlled Interior',
                text: 'Heated and air-conditioned cabins keep passengers comfortable regardless of the weather or season.',
              },
              {
                title: 'Spacious Cabin Design',
                text: 'Extra interior clearance accommodates all standard and powered wheelchair sizes with room for companion seating.',
              },
              {
                title: 'Regular Safety Inspections',
                text: 'All vehicles undergo routine mechanical inspections and equipment checks to ensure reliable, safe operation.',
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
                title: 'Book Your Ride',
                text: 'Let us know you need wheelchair transport. Share your wheelchair type (manual or powered) and any additional needs such as ramp access or stair assistance.',
              },
              {
                step: '2',
                title: 'Driver Arrives Prepared',
                text: 'Your driver arrives with the correct vehicle, deploys the ramp, and assists you aboard. The wheelchair is secured with four-point tie-downs.',
              },
              {
                step: '3',
                title: 'Comfortable Transit',
                text: 'Ride in a climate-controlled, smooth-ride vehicle. Your driver chooses routes optimized for comfort and on-time arrival.',
              },
              {
                step: '4',
                title: 'Door-to-Door Service',
                text: 'At your destination, the driver assists with de-boarding and ensures you are safely at the entrance before departing.',
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
            Why Choose Care Ride for Wheelchair Transportation?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'ADA-Certified Fleet',
                text: 'Every wheelchair vehicle in our fleet meets ADA compliance standards with properly maintained ramps, lifts, and securement systems.',
              },
              {
                icon: Wrench,
                title: 'Trained Securement Specialists',
                text: 'Our drivers are certified in wheelchair tie-down procedures and passenger assistance, ensuring maximum safety during every ride.',
              },
              {
                icon: Clock,
                title: 'Reliable Scheduling',
                text: 'We understand that wheelchair users cannot afford missed appointments. Our scheduling system ensures on-time pickups and reliable service.',
              },
              {
                icon: HeartHandshake,
                title: 'Respectful, Dignified Service',
                text: 'We treat every passenger with respect and dignity. Our team understands the importance of patient, compassionate care during transport.',
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
            Book Your Wheelchair Accessible Ride
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            We make wheelchair transportation easy and stress-free. Book your ride online or call us
            to discuss your accessibility needs.
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
