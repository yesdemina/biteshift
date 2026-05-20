'use client'
// Screen 2b — Active Scanning
// No tab bar. Progress bar auto-fills over ~6 seconds then calls onComplete.

import { useState, useEffect, useRef } from 'react'
import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'

interface ActiveScanningProps {
  onClose: () => void
  onComplete: () => void
}

export default function ActiveScanning({ onClose, onComplete }: ActiveScanningProps) {
  const [progress, setProgress] = useState(0) // 0–100
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    // Animate progress 0 → 100 over ~6 seconds (60 steps × 100ms)
    let current = 0
    const STEPS = 60
    const INTERVAL_MS = 100

    const id = setInterval(() => {
      current += 1
      setProgress(Math.min((current / STEPS) * 100, 100))
      if (current >= STEPS) {
        clearInterval(id)
        // Brief pause then advance
        setTimeout(() => onCompleteRef.current(), 400)
      }
    }, INTERVAL_MS)

    return () => clearInterval(id)
  }, [])

  // Elapsed time display: 0:00 → 1:00 proportionally
  const elapsedSeconds = Math.round((progress / 100) * 60)
  const timeLabel = `0:${String(elapsedSeconds).padStart(2, '0')}`

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '0 24px',
      }}
    >
      {/* Close button row */}
      <div style={{ paddingTop: 14, paddingBottom: 4 }}>
        <button
          onClick={onClose}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#F5F5F5',
            border: '1px solid #E0E0E0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 18,
            color: '#1A1A1A',
          }}
          aria-label="Close scanner"
        >
          ✕
        </button>
      </div>

      {/* Headline */}
      <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', marginTop: 12 }}>
        Hold steady
      </h1>

      {/* Large hero circle — scanner preview */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <HatchedPlaceholder
          label="Live scanner preview"
          circle
          width={280}
          height={280}
        />
      </div>

      {/* Subtitle */}
      <p style={{ fontSize: 14, color: '#666666', textAlign: 'center', marginBottom: 16 }}>
        Move slowly along your upper arch
      </p>

      {/* Progress bar + time */}
      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 8,
            fontSize: 12,
            color: '#999999',
          }}
        >
          <span>{timeLabel}</span>
          <span>1:00</span>
        </div>
        <div
          style={{
            height: 4,
            background: '#E0E0E0',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: '#1A1A1A',
              borderRadius: 2,
              transition: 'width 80ms linear',
            }}
          />
        </div>
      </div>
    </div>
  )
}
