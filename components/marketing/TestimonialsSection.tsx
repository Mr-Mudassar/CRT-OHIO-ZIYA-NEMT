'use client'

import { Star, Quote } from 'lucide-react'
import { MotionWrapper, StaggerContainer, StaggerItem } from '@/components/shared/MotionWrapper'

const TESTIMONIALS = [
  {
    name: 'Margaret T.',
    location: 'Cincinnati, OH',
    rating: 5,
    initials: 'MT',
    color: 'bg-primary',
    quote:
      'Care Ride has been a lifesaver for my dialysis appointments. The drivers are always on time and so kind. I feel safe every trip.',
  },
  {
    name: 'James R.',
    location: 'Mason, OH',
    rating: 5,
    initials: 'JR',
    color: 'bg-accent',
    quote:
      'After my hip surgery, I needed reliable wheelchair transportation. Care Ride made my recovery appointments stress-free. Highly recommend!',
  },
  {
    name: 'Sarah M.',
    location: 'West Chester, OH',
    rating: 5,
    initials: 'SM',
    color: 'bg-primary-sky',
    quote:
      'I book rides for my elderly mother regularly. The booking process is simple, and the drivers treat her with genuine care and respect.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary via-primary-dark to-[#052d52] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container-custom relative">
        <MotionWrapper variant="fadeUp" className="text-center mb-12 md:mb-16">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-accent uppercase tracking-wider mb-3 px-3 py-1 bg-white/10 rounded-full">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
            What Our Riders Say
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Real experiences from the people we are honored to serve.
          </p>
        </MotionWrapper>

        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <StaggerItem key={testimonial.name} variant="scaleUp">
              <div className="relative flex flex-col h-full p-7 md:p-8 bg-white/[0.08] backdrop-blur-sm rounded-3xl border border-white/10 hover:bg-white/[0.12] transition-colors duration-300">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-accent/40 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <blockquote className="text-white/90 leading-relaxed mb-6 flex-1 text-[15px]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className={`flex items-center justify-center w-11 h-11 ${testimonial.color} text-white font-semibold rounded-full text-sm shadow-lg`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{testimonial.name}</p>
                    <p className="text-xs text-white/50">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
