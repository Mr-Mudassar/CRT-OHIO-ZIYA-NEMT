'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, ShieldCheck, Clock, Users, Star } from 'lucide-react'
import { FloatingElement } from '@/components/shared/FloatingElement'
import { BUSINESS_PHONE } from '@/lib/constants'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f0f7ff] via-white to-[#e6f9f0] min-h-[90vh] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-10 right-1/3 w-64 h-64 rounded-full bg-primary-sky/5 blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        {/* Decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0A4D8C 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      <div className="container-custom relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-primary text-sm font-semibold rounded-full border border-primary/10 shadow-sm mb-6"
            >
              <ShieldCheck className="h-4 w-4" />
              Trusted NEMT Provider in Ohio
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-6"
            >
              Safe & Reliable{' '}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-sky">
                  Medical Transportation
                </span>
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-3 bg-accent/20 -z-0 rounded"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.6, ease: 'easeOut' }}
                  style={{ originX: 0 }}
                />
              </span>{' '}
              You Can Trust
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg"
            >
              Providing compassionate non-emergency medical transportation across Cincinnati,
              Mason, West Chester, and surrounding Ohio communities. Medicaid accepted.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <Link
                href="/book"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5"
              >
                Book a Ride
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${BUSINESS_PHONE.replace(/\D/g, '')}`}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-primary text-lg font-semibold rounded-2xl border-2 border-primary/15 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                Call Us Now
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-6 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <span className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 border-2 border-white text-[10px] font-bold text-primary">
                      {['JM', 'SR', 'ML', 'TP'][i]}
                    </span>
                  ))}
                </span>
                <span className="font-medium ml-1">500+ rides monthly</span>
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">4.9</span>
                <span>rating</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Right visual - Hero image with floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main hero image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero-medical.jpg"
                  alt="Professional medical transportation service - caring healthcare worker assisting a patient"
                  width={600}
                  height={450}
                  className="w-full h-[500px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              </div>

              {/* Floating stat card - top right */}
              <FloatingElement duration={5} yOffset={10} className="absolute -top-4 -right-4">
                <div className="bg-white rounded-2xl shadow-xl border border-border/50 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-xl">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">On-Time Rate</p>
                      <p className="text-lg font-bold text-foreground">98.5%</p>
                    </div>
                  </div>
                </div>
              </FloatingElement>

              {/* Floating stat card - bottom left */}
              <FloatingElement duration={6} delay={1} yOffset={8} className="absolute -bottom-6 -left-6">
                <div className="bg-white rounded-2xl shadow-xl border border-border/50 p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Happy Riders</p>
                      <p className="text-lg font-bold text-foreground">10,000+</p>
                    </div>
                  </div>
                </div>
              </FloatingElement>

              {/* Floating rating card - mid right */}
              <FloatingElement duration={4} delay={2} yOffset={6} className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                <div className="bg-white rounded-2xl shadow-xl border border-border/50 px-4 py-3 backdrop-blur-sm">
                  <div className="flex items-center gap-1 mb-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">Excellent Service</p>
                </div>
              </FloatingElement>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <path d="M0 80L1440 80L1440 30C1440 30 1320 0 1080 15C840 30 720 55 480 40C240 25 120 5 0 15L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
