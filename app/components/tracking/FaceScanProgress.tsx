'use client'
// Face Scan Progress — replaces old placeholder screen.
// Full-screen white overlay; animated progress bar fills over 4 s;
// auto-navigates back to Tracking Home when done. No back button.

import { useState, useEffect, useRef } from 'react'

interface FaceScanProgressProps {
  onComplete: () => void  // called when progress reaches 100 %
}

const DURATION_MS = 4000
const TICK_MS     = 40    // ~25 fps — smooth enough for a bar

export default function FaceScanProgress({ onComplete }: FaceScanProgressProps) {
  const [progress, setProgress] = useState(0)           // 0–100
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let elapsed = 0

    const id = setInterval(() => {
      elapsed += TICK_MS
      const pct = Math.min(100, (elapsed / DURATION_MS) * 100)
      setProgress(pct)

      if (elapsed >= DURATION_MS) {
        clearInterval(id)
        // Brief pause so user sees 100 % before advancing
        setTimeout(() => onCompleteRef.current(), 250)
      }
    }, TICK_MS)

    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        zIndex: 60,
      }}
    >
      {/* Label */}
      <span
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: '#1A1A1A',
          letterSpacing: '-0.8px',
          fontFamily: 'inherit',
        }}
      >
        scanning your face
      </span>

      {/* Progress track */}
      <div
        style={{
          width: 280,
          height: 6,
          background: '#E0E0E0',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#404040',
            borderRadius: 3,
            transition: `width ${TICK_MS}ms linear`,
          }}
        />
      </div>
    </div>
  )
}
