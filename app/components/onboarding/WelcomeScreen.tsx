'use client'
// Screen 0c — Welcome
// Personalised "hi, {name}" greeting; auto-advances to Tracking Home after 2 s.

import { useEffect } from 'react'

interface WelcomeScreenProps {
  userName: string
  onComplete: () => void
}

export default function WelcomeScreen({ userName, onComplete }: WelcomeScreenProps) {
  useEffect(() => {
    const id = setTimeout(onComplete, 2000)
    return () => clearTimeout(id)
  }, [onComplete])

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
        gap: 10,
        zIndex: 100,
      }}
    >
      <h1
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: '#1A1A1A',
          letterSpacing: '-1.5px',
          textAlign: 'center',
          fontFamily: 'inherit',
        }}
      >
        hi, {userName}
      </h1>
      <p style={{ fontSize: 16, color: '#666666', textAlign: 'center' }}>
        your smile journey starts now
      </p>
    </div>
  )
}
