'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useGoogleMaps } from './GoogleMapsProvider'

type AddressResult = {
  address: string
  lat: number
  lng: number
}

type Props = {
  value: string
  onChange: (value: string) => void
  onSelect: (result: AddressResult) => void
  placeholder?: string
  id?: string
  disabled?: boolean
  'aria-invalid'?: boolean
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = 'Enter address',
  id,
  disabled,
  'aria-invalid': ariaInvalid,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const { isLoaded } = useGoogleMaps()
  // Keep latest callbacks in refs to avoid stale closures
  const onChangeRef = useRef(onChange)
  const onSelectRef = useRef(onSelect)
  onChangeRef.current = onChange
  onSelectRef.current = onSelect

  // Sync input DOM value when value prop changes (e.g., re-mounting with saved data)
  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value
    }
  }, [value])

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeRef.current(e.target.value)
  }, [])

  // Initialize Google Places Autocomplete once
  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'us' },
      fields: ['formatted_address', 'geometry'],
      types: ['address'],
    })

    // Bias to Ohio area
    const ohioBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(38.4, -84.8),
      new google.maps.LatLng(41.9, -80.5)
    )
    autocomplete.setBounds(ohioBounds)

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.formatted_address && place.geometry?.location) {
        const result: AddressResult = {
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
        // Update the input DOM value explicitly
        if (inputRef.current) {
          inputRef.current.value = result.address
        }
        onChangeRef.current(result.address)
        onSelectRef.current(result)
      }
    })

    autocompleteRef.current = autocomplete

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
        autocompleteRef.current = null
      }
    }
  }, [isLoaded])

  return (
    <input
      ref={inputRef}
      defaultValue={value}
      onChange={handleInput}
      placeholder={placeholder}
      id={id}
      disabled={disabled}
      aria-invalid={ariaInvalid}
      autoComplete="off"
      className="h-11 w-full min-w-0 rounded-lg border border-input bg-white px-3.5 py-2.5 text-sm transition-all outline-none placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-primary/10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-muted/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
    />
  )
}
