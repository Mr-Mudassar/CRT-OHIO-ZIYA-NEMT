'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="container-custom text-center py-20">
        <div className="max-w-lg mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emergency/10 mb-6">
            <AlertTriangle className="h-8 w-8 text-emergency" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-3">
            Something Went Wrong
          </h1>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            We apologize for the inconvenience. An unexpected error occurred. Please try again or
            contact us if the problem persists.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground hover:bg-white font-semibold rounded-lg transition-colors"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
