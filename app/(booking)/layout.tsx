import { Header } from '@/components/layout/Header'
import { EmergencyBanner } from '@/components/layout/EmergencyBanner'

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <EmergencyBanner />
      <Header />
      <main id="main-content" className="flex-1 bg-muted">
        {children}
      </main>
    </>
  )
}
