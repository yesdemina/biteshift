'use client'
// Screen 0b — Onboarding / Auth
// Collects name + password (wireframe only). "let's go" disabled until name ≥ 1 char.
// Saves name into app state and advances to Welcome (0c).

import { useState } from 'react'

interface OnboardingScreenProps {
  onSubmit: (name: string) => void
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  fontSize: 16,
  color: '#1A1A1A',
  background: '#FFFFFF',
  border: '1px solid #E0E0E0',
  borderRadius: 8,
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

export default function OnboardingScreen({ onSubmit }: OnboardingScreenProps) {
  const [name, setName]         = useState('')
  const [password, setPassword] = useState('')

  const canSubmit = name.trim().length > 0

  const handleSubmit = () => {
    if (canSubmit) onSubmit(name.trim())
  }

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
        padding: '0 40px',
        zIndex: 100,
      }}
    >
      {/* Headline */}
      <h1
        style={{
          fontSize: 40,
          fontWeight: 700,
          color: '#1A1A1A',
          letterSpacing: '-1.5px',
          marginBottom: 8,
          textAlign: 'center',
          fontFamily: 'inherit',
        }}
      >
        welcome
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 16,
          color: '#666666',
          marginBottom: 32,
          textAlign: 'center',
        }}
      >
        let&apos;s set you up
      </p>

      {/* Name field */}
      <div style={{ width: '100%', marginBottom: 12 }}>
        <input
          type="text"
          placeholder="your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoComplete="off"
          style={inputStyle}
        />
      </div>

      {/* Password field */}
      <div style={{ width: '100%', marginBottom: 24 }}>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          style={inputStyle}
        />
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        style={{
          width: '100%',
          padding: '14px 0',
          fontSize: 16,
          fontWeight: 600,
          fontFamily: 'inherit',
          letterSpacing: '-0.2px',
          background: canSubmit ? '#1A1A1A' : '#E0E0E0',
          color: canSubmit ? '#FFFFFF' : '#999999',
          border: 'none',
          borderRadius: 8,
          cursor: canSubmit ? 'pointer' : 'not-allowed',
          transition: 'background 0.15s, color 0.15s',
        }}
      >
        let&apos;s go
      </button>
    </div>
  )
}
