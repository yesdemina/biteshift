// Screen 1a — Tracking Home
// Shows treatment progress, AR hero placeholder, timeline scrubber, stat cards.

import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'
import { trackingData } from '@/lib/mockData'

// ── Sub-components ────────────────────────────────────────────────────────────

function ThreeDotMenu() {
  return (
    <button
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
      aria-label="More options"
    >
      <svg width="4" height="18" viewBox="0 0 4 18" fill="#999999">
        <circle cx="2" cy="2"  r="1.8" />
        <circle cx="2" cy="9"  r="1.8" />
        <circle cx="2" cy="16" r="1.8" />
      </svg>
    </button>
  )
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: '#F5F5F5',
        border: '1px solid #E0E0E0',
        borderRadius: 20,
        padding: '5px 12px',
        fontSize: 12,
        color: '#666666',
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  )
}

// ── Timeline scrubber ─────────────────────────────────────────────────────────

function TimelineScrubber() {
  return (
    <div style={{ padding: '0 24px', marginTop: 20 }}>
      {/* Track */}
      <div style={{ position: 'relative', height: 4, background: '#E0E0E0', borderRadius: 2 }}>
        {/* Filled portion up to "Today" dot */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: '50%',
            background: '#404040',
            borderRadius: 2,
          }}
        />
        {/* Day 0 dot — left */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#999999',
            border: '2px solid #FFFFFF',
          }}
        />
        {/* Today dot — center, large filled */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#1A1A1A',
            border: '2px solid #FFFFFF',
            boxShadow: '0 0 0 2px #1A1A1A',
          }}
        />
        {/* Forecast dot — right */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#CCCCCC',
            border: '2px solid #FFFFFF',
          }}
        />
      </div>

      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ fontSize: 11, color: '#999999' }}>Day 0</span>
        <span style={{ fontSize: 11, color: '#1A1A1A', fontWeight: 600 }}>Today</span>
        <span style={{ fontSize: 11, color: '#999999' }}>Forecast</span>
      </div>
    </div>
  )
}

// ── Stat cards row ────────────────────────────────────────────────────────────

function StatCard({
  label,
  bigNumber,
  caption,
  progressBar,
}: {
  label: string
  bigNumber: string
  caption: string
  progressBar?: number // 0–1
}) {
  return (
    <div
      style={{
        flex: 1,
        background: '#F5F5F5',
        border: '1px solid #E0E0E0',
        borderRadius: 12,
        padding: '14px 12px',
      }}
    >
      <div style={{ fontSize: 10, color: '#999999', fontWeight: 600, letterSpacing: '0.6px', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1 }}>
        {bigNumber}
      </div>
      <div style={{ fontSize: 11, color: '#666666', marginTop: 4, lineHeight: 1.3 }}>
        {caption}
      </div>
      {progressBar !== undefined && (
        <div style={{ marginTop: 10, height: 3, background: '#E0E0E0', borderRadius: 2 }}>
          <div
            style={{
              height: '100%',
              width: `${Math.round(progressBar * 100)}%`,
              background: '#404040',
              borderRadius: 2,
            }}
          />
        </div>
      )}
    </div>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function TrackingHome() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>
      {/* Top row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px 0',
        }}
      >
        <Pill>Day {trackingData.dayOfTreatment} of treatment</Pill>
        <ThreeDotMenu />
      </div>

      {/* Headline */}
      <div style={{ padding: '14px 24px 0' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}>
          Your smile,<br />in motion
        </h1>
      </div>

      {/* Hero */}
      <div style={{ padding: '16px 24px 0' }}>
        <HatchedPlaceholder
          label="User face photo + AR braces overlay — current state"
          height={252}
        />
      </div>

      {/* Timeline scrubber */}
      <TimelineScrubber />

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 12, padding: '20px 24px 0' }}>
        <StatCard
          label="THIS WEEK"
          bigNumber={trackingData.weeklyMovement}
          caption={trackingData.weeklyToothLabel}
        />
        <StatCard
          label="AI FORECAST"
          bigNumber={trackingData.forecastRange}
          caption="Until completion"
          progressBar={trackingData.forecastProgress}
        />
      </div>
    </div>
  )
}
