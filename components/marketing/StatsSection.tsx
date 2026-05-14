'use client'

import { Shield, MapPin, Clock, Heart } from 'lucide-react'
import { CountUp } from '@/components/shared/CountUp'
import { MotionWrapper } from '@/components/shared/MotionWrapper'

const STATS = [
  {
    icon: <Heart className="h-7 w-7" />,
    value: 10000,
    suffix: '+',
    label: 'Happy Riders Served',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: <Clock className="h-7 w-7" />,
    value: 98,
    suffix: '%',
    label: 'On-Time Arrival Rate',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: <MapPin className="h-7 w-7" />,
    value: 6,
    suffix: '+',
    label: 'Cities Covered',
    color: 'text-primary-sky',
    bg: 'bg-primary-sky/10',
  },
  {
    icon: <Shield className="h-7 w-7" />,
    value: 5,
    suffix: '+',
    label: 'Years of Experience',
    color: 'text-accent-dark',
    bg: 'bg-accent-dark/10',
  },
]

export function StatsSection() {
  return (
    <section className="relative -mt-1 py-10 md:py-14 bg-white z-10">
      <div className="container-custom">
        <MotionWrapper variant="fadeUp">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className="relative group text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50/50 border border-border/60 hover:border-primary/20 hover:shadow-lg transition-all duration-500"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2 + index * 0.3} />
                </div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  )
}
