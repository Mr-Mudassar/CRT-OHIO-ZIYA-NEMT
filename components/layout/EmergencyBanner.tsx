import { AlertTriangle } from 'lucide-react'
import { EMERGENCY_DISCLAIMER } from '@/lib/constants'

export function EmergencyBanner() {
  return (
    <div className="bg-emergency text-white text-center py-2 px-4 text-sm font-medium" role="alert">
      <div className="container-custom flex items-center justify-center gap-2">
        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{EMERGENCY_DISCLAIMER}</span>
      </div>
    </div>
  )
}
