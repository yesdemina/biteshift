// Screen 2a — Hygiene Home

import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'
import { hygieneData } from '@/lib/mockData'

interface HygieneHomeProps {
  onStartScan: () => void
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

// Stat strip inside the summary card
function StatStrip() {
  const { clean, total, plaque, gumCare } = hygieneData
  return (
    <div
      style={{
        background: '#F5F5F5',
        border: '1px solid #E0E0E0',
        borderRadius: 12,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      {[
        { label: 'CLEAN',    value: `${clean}/${total}` },
        { label: 'PLAQUE',   value: String(plaque) },
        { label: 'GUM CARE', value: String(gumCare) },
      ].map(({ label, value }, i) => (
        <div
          key={label}
          style={{
            flex: 1,
            padding: '14px 0',
            textAlign: 'center',
            borderLeft: i === 0 ? 'none' : '1px solid #E0E0E0',
          }}
        >
          <div style={{ fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>{value}</div>
          <div style={{ fontSize: 10, color: '#999999', marginTop: 2, letterSpacing: '0.5px', fontWeight: 600 }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HygieneHome({ onStartScan }: HygieneHomeProps) {
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
        <Pill>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#999999',
              display: 'inline-block',
            }}
          />
          Last scan · {hygieneData.lastScanDaysAgo} days ago
        </Pill>
        <ThreeDotMenu />
      </div>

      {/* Headline */}
      <div style={{ padding: '14px 24px 0' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}>
          Your hygiene,<br />mapped
        </h1>
      </div>

      {/* Hero */}
      <div style={{ padding: '16px 24px 0' }}>
        <HatchedPlaceholder
          label="Last scan — 3D dental arch with color zones"
          height={220}
        />
      </div>

      {/* Stats */}
      <div style={{ padding: '16px 24px 0' }}>
        <StatStrip />
      </div>

      {/* Start scan CTA */}
      <div style={{ padding: '16px 24px 0' }}>
        <button
          onClick={onStartScan}
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
          }}
        >
          Start new scan
        </button>
      </div>

      {/* View history */}
      <div style={{ padding: '14px 24px 0', textAlign: 'center' }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            fontSize: 13,
            color: '#999999',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          View history
        </button>
      </div>
    </div>
  )
}
