// Screen 3a — Camera Disarmed (default state)
// Tapping any chip arms the camera and transitions to 3b.

import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'

interface CameraDisarmedProps {
  onArm: (duration: string) => void
}

const CHIPS = ['Arm for 15 min', 'Arm for 1 hour', 'Arm until I turn off'] as const

// Pill toggle — OFF state visual
function ToggleOff() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {/* Track */}
      <div
        style={{
          width: 56,
          height: 30,
          borderRadius: 15,
          background: '#E0E0E0',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            top: 3,
            left: 3,
            width: 24,
            height: 24,
            borderRadius: 12,
            background: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          }}
        />
      </div>
      <span style={{ fontSize: 22, fontWeight: 800, color: '#AAAAAA', letterSpacing: '0.5px' }}>
        DISARMED
      </span>
    </div>
  )
}

export default function CameraDisarmed({ onArm }: CameraDisarmedProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>
      {/* Headline */}
      <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', padding: '16px 24px 0' }}>
        Hands-free camera
      </h1>

      {/* Hero — POV viewfinder */}
      <div style={{ padding: '14px 24px 0' }}>
        <HatchedPlaceholder
          label="POV viewfinder — camera looks outward from your mouth (not selfie)"
          height={210}
        />
      </div>

      {/* Status card */}
      <div
        style={{
          margin: '16px 24px 0',
          background: '#F5F5F5',
          border: '1px solid #E0E0E0',
          borderRadius: 14,
          padding: '18px 20px',
        }}
      >
        <ToggleOff />
      </div>

      {/* Mechanics text */}
      <div style={{ padding: '14px 24px 0' }}>
        <p style={{ fontSize: 13, color: '#666666', lineHeight: 1.55 }}>
          Arm the camera to capture hands-free.{' '}
          <strong style={{ color: '#1A1A1A', fontWeight: 600 }}>Triple-click your teeth</strong>{' '}
          for a photo. <strong style={{ color: '#1A1A1A', fontWeight: 600 }}>Press and hold (bite 2s)</strong>{' '}
          for video.
        </p>
      </div>

      {/* Duration chip row */}
      <div style={{ padding: '16px 24px 0' }}>
        <div style={{ fontSize: 11, color: '#999999', fontWeight: 600, letterSpacing: '0.5px', marginBottom: 10 }}>
          ARM FOR
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => onArm(chip)}
              style={{
                padding: '9px 14px',
                background: '#FFFFFF',
                border: '1px solid #C8C8C8',
                borderRadius: 20,
                fontSize: 13,
                color: '#1A1A1A',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
