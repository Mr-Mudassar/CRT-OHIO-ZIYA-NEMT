'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react'
import { MotionWrapper } from '@/components/shared/MotionWrapper'
import { BUSINESS_PHONE } from '@/lib/constants'

export function CTASection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/van-transport.jpg"
          alt="Medical transportation vehicle"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary-dark/95" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-sky/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <MotionWrapper variant="fadeUp">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Book Your{' '}
              <span className="text-accent">Ride?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10">
              Schedule your non-emergency medical transportation in just a few minutes.
              No account required.
            </p>
          </MotionWrapper>

          <MotionWrapper variant="fadeUp" delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="/book"
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4.5 bg-accent hover:bg-accent-dark text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5"
              >
                Book a Ride Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4.5 bg-white/10 hover:bg-white/20 text-white text-lg font-semibold rounded-2xl border border-white/20 transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                {BUSINESS_PHONE}
              </a>
            </div>
          </MotionWrapper>

          <MotionWrapper variant="fadeUp" delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                Medicaid Accepted
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Licensed & Insured
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-accent" />
                24/7 Dispatch
              </span>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
