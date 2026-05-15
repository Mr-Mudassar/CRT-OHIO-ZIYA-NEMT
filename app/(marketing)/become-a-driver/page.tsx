import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Clock,
  DollarSign,
  Heart,
  Shield,
  Car,
  Award,
  Users,
} from 'lucide-react'
import { generatePageMetadata, generateBreadcrumbJsonLd } from '@/lib/seo'
import { SITE_NAME, BUSINESS_PHONE, BUSINESS_EMAIL } from '@/lib/constants'

export const metadata: Metadata = generatePageMetadata({
  title: 'Become a Driver — Join the Care Ride Transportation Team',
  description:
    'Drive with Care Ride Transportation and make a meaningful difference. Competitive pay, flexible scheduling, and the opportunity to help patients access essential medical care across Southwest Ohio.',
  path: '/become-a-driver',
})

const BENEFITS = [
  {
    icon: DollarSign,
    title: 'Competitive Pay',
    description:
      'Earn competitive wages with opportunities for overtime. We value our drivers and compensate accordingly for the critical role you play in patient care.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description:
      'We offer multiple shift options to accommodate your lifestyle. Whether you prefer early mornings, daytime hours, or evening shifts, we can find a schedule that works for you.',
  },
  {
    icon: Heart,
    title: 'Meaningful Work',
    description:
      'Make a real difference in people\'s lives every day. Our drivers help patients access essential medical care, building genuine connections with the people they serve.',
  },
  {
    icon: Shield,
    title: 'Comprehensive Training',
    description:
      'Receive thorough training in passenger assistance, wheelchair securement, defensive driving, and medical sensitivity before your first ride. Ongoing professional development provided.',
  },
  {
    icon: Car,
    title: 'Well-Maintained Fleet',
    description:
      'Drive modern, well-maintained ADA-compliant vehicles that are regularly serviced and inspected. You will never have to worry about vehicle reliability on the job.',
  },
  {
    icon: Users,
    title: 'Supportive Team',
    description:
      'Join a team that values communication, safety, and mutual respect. Our dispatch team works closely with drivers to ensure smooth operations and prompt support when you need it.',
  },
]

const REQUIREMENTS = [
  'Valid Ohio driver\'s license (Class E or higher)',
  'Clean driving record (no major violations in the past 3 years)',
  'Pass a comprehensive background check',
  'Pass a drug screening',
  'Minimum 21 years of age',
  'CPR/First Aid certification (preferred; training available)',
  'Ability to assist passengers with mobility needs',
  'Professional, courteous, and patient demeanor',
  'Ability to follow GPS navigation and read maps',
  'Reliable personal transportation to reach the company facility',
]

export default function BecomeADriverPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Become a Driver', href: '/become-a-driver' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/van-transport.jpg" alt="Medical transportation driver career" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary-dark/90" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-6 border border-white/20">
              <Car className="h-4 w-4" />
              Now Hiring Drivers
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Join Our Team
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-4">
              Drive with {SITE_NAME} and make a meaningful difference in your community. Help
              patients across Southwest Ohio access the medical care they need with safe,
              reliable transportation.
            </p>
            <p className="text-white/60 mb-8">
              We are always looking for compassionate, responsible drivers to join our growing team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#apply"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors shadow-sm"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS_PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Drive With Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-heading mb-4">
              Why Drive With {SITE_NAME}?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are more than a transportation company -- we are a team of caring professionals
              who help people access essential medical care every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div key={benefit.title} className="bg-muted rounded-xl p-6 card-hover">
                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-heading mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What You'll Do */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-heading text-center mb-10">
              What You&apos;ll Do as a {SITE_NAME} Driver
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Transport patients safely to and from medical appointments, dialysis treatments, hospital visits, and other healthcare facilities',
                'Assist passengers with boarding, exiting, and securement — including wheelchair passengers and those with mobility limitations',
                'Maintain a clean, comfortable, and safe vehicle environment at all times',
                'Communicate professionally with passengers, medical facility staff, and our dispatch team',
                'Follow scheduled routes and use GPS navigation to ensure on-time arrivals',
                'Complete daily vehicle inspections and report any maintenance needs promptly',
                'Document trip details accurately for billing and compliance purposes',
                'Treat every passenger with respect, dignity, patience, and compassion',
              ].map((item) => (
                <div key={item} className="flex gap-3 bg-white p-4 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary text-sm font-medium rounded-full mb-4">
                <Award className="h-4 w-4" />
                Requirements
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-heading mb-4">
                What We Look For
              </h2>
              <p className="text-muted-foreground">
                Our passengers trust us with their health and safety. We look for drivers who
                meet these qualifications and share our commitment to patient care.
              </p>
            </div>
            <div className="space-y-3">
              {REQUIREMENTS.map((req) => (
                <div key={req} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section-padding bg-muted scroll-mt-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-heading mb-4">
                Apply to Drive With Us
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below to start the application process. Our hiring team will
                review your information and reach out within two business days. You can also email
                us at{' '}
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="text-primary font-medium hover:underline"
                >
                  {BUSINESS_EMAIL}
                </a>
                .
              </p>
            </div>

            <form className="bg-white rounded-xl p-6 md:p-8 shadow-[var(--shadow-card)] space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Full Name <span className="text-emergency">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your full legal name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email Address <span className="text-emergency">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Phone Number <span className="text-emergency">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="(513) 555-0100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="licenseNumber"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Ohio Driver&apos;s License Number <span className="text-emergency">*</span>
                  </label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    required
                    className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your license number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="yearsExperience"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Years of Driving Experience <span className="text-emergency">*</span>
                  </label>
                  <select
                    id="yearsExperience"
                    name="yearsExperience"
                    required
                    className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1 to 3 years</option>
                    <option value="3-5">3 to 5 years</option>
                    <option value="5-10">5 to 10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <fieldset>
                <legend className="block text-sm font-medium text-foreground mb-1.5">
                  Do you have CPR/First Aid certification? <span className="text-emergency">*</span>
                </legend>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasCprCert"
                      value="yes"
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasCprCert"
                      value="no"
                      className="w-4 h-4 text-primary border-border focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">No</span>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  CPR certification is preferred but not required. Training can be provided.
                </p>
              </fieldset>

              <div>
                <label
                  htmlFor="additionalNotes"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={4}
                  className="w-full px-4 py-2.5 border border-border rounded-lg text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Tell us about any relevant experience, certifications, or why you'd like to join our team..."
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors shadow-sm"
              >
                Submit Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <p className="text-xs text-muted-foreground">
                By submitting this application, you consent to a background check and driving
                record review as part of our hiring process. All information provided will be
                kept confidential.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold mb-4">
              Have Questions About Driving With Us?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              We are happy to answer any questions about the driver position, compensation,
              scheduling, or the application process. Reach out anytime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors shadow-sm w-full sm:w-auto"
              >
                <Phone className="mr-2 h-5 w-5" />
                {BUSINESS_PHONE}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white hover:bg-white/10 font-semibold rounded-lg transition-colors w-full sm:w-auto"
              >
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
