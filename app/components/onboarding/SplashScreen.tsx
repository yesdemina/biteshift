'use client'
// Screen 0 — Splash
// Full-bleed white; "shift happens" centered; no status bar, no tab bar.
// Auto-advances after 2.5 s: → Onboarding (no userName) or Tracking (has userName).

import { useEffect } from 'react'

interface SplashScreenProps {
  hasUser: boolean          // if true, skip onboarding and go straight to main app
  onComplete: () => void    // called after 2.5 s
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const id = setTimeout(onComplete, 2500)
    return () => clearTimeout(id)
  }, [onComplete])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <span
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: '#1A1A1A',
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
            userSelect: 'none',
          }}
        >
          biteshift
        </span>
        <span
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#1A1A1A',
            letterSpacing: '-2.5px',
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
            userSelect: 'none',
          }}
        >
          shift happens
        </span>
      </div>
    </div>
  )
}
