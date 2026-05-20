// Screen 3b — Camera Armed
// "Disarm now" → 3a.  "View Drafts" → 3c.

import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'

interface CameraArmedProps {
  onDisarm: () => void
  onViewDrafts: () => void
}

// Toggle — ON state
function ToggleOn() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 56,
          height: 30,
          borderRadius: 15,
          background: '#404040',
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 3,
            right: 3,
            width: 24,
            height: 24,
            borderRadius: 12,
            background: '#FFFFFF',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }}
        />
      </div>
      <span style={{ fontSize: 22, fontWeight: 800, color: '#1A1A1A', letterSpacing: '0.5px' }}>
        ARMED
      </span>
    </div>
  )
}

function MechanicRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
      <div
        style={{
          width: 32,
          height: 32,
          background: '#F5F5F5',
          border: '1px solid #E0E0E0',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span style={{ fontSize: 13, color: '#444444' }}>{text}</span>
    </div>
  )
}

export default function CameraArmed({ onDisarm, onViewDrafts }: CameraArmedProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>
      {/* Headline */}
      <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', padding: '16px 24px 0' }}>
        Camera armed
      </h1>

      {/* Hero */}
      <div style={{ padding: '14px 24px 0' }}>
        <HatchedPlaceholder
          label="POV viewfinder — live"
          height={185}
        />
      </div>

      {/* Status card */}
      <div
        style={{
          margin: '14px 24px 0',
          background: '#F5F5F5',
          border: '1px solid #E0E0E0',
          borderRadius: 14,
          padding: '18px 20px',
        }}
      >
        <ToggleOn />
        <p style={{ fontSize: 12, color: '#999999', marginTop: 10 }}>
          Auto-off in{' '}
          <span style={{ fontWeight: 600, color: '#666666', fontVariantNumeric: 'tabular-nums' }}>
            58:42
          </span>
        </p>
      </div>

      {/* Mechanics */}
      <div style={{ padding: '14px 24px 0' }}>
        <div style={{ fontSize: 11, color: '#999999', fontWeight: 600, letterSpacing: '0.5px', marginBottom: 4 }}>
          HOW IT WORKS
        </div>
        <div style={{ borderTop: '1px solid #E0E0E0' }}>
          <MechanicRow
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="#666" strokeWidth="1.3" />
                <circle cx="5" cy="8" r="1.2" fill="#666" />
                <circle cx="8" cy="8" r="1.2" fill="#666" />
                <circle cx="11" cy="8" r="1.2" fill="#666" />
              </svg>
            }
            text="Triple-click teeth → Photo"
          />
          <div style={{ height: 1, background: '#E0E0E0' }} />
          <MechanicRow
            icon={
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="5" width="12" height="7" rx="2" stroke="#666" strokeWidth="1.3" />
                <circle cx="8" cy="8.5" r="2" fill="#666" />
              </svg>
            }
            text="Bite & hold 2s → Video"
          />
        </div>
      </div>

      {/* Note */}
      <p style={{ fontSize: 12, color: '#AAAAAA', padding: '8px 24px 0', lineHeight: 1.4 }}>
        Captures go to Drafts for you to review before saving or sharing.
      </p>

      {/* Disarm */}
      <div style={{ padding: '18px 24px 0' }}>
        <button
          onClick={onDisarm}
          style={{
            width: '100%',
            height: 52,
            background: '#1A1A1A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 12,
          }}
        >
          Disarm now
        </button>
        <button
          onClick={onViewDrafts}
          style={{
            width: '100%',
            height: 44,
            background: '#FFFFFF',
            color: '#1A1A1A',
            border: '1px solid #C8C8C8',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          View Drafts
        </button>
      </div>
    </div>
  )
}
