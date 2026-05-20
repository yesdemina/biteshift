// Screen 2c — Scan Result
// Tapping the hero advances to Tooth Detail (2d).

import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'
import { hygieneData } from '@/lib/mockData'

interface ScanResultProps {
  onBack: () => void
  onToothDetail: () => void
}

function BackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      onClick={onBack}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#1A1A1A',
        fontSize: 15,
        padding: 0,
      }}
    >
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
        <path d="M7.5 1.5L2 7.5L7.5 13.5" stroke="#1A1A1A" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      Back
    </button>
  )
}

function Pill({ dot, children }: { dot?: boolean; children: React.ReactNode }) {
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
      {dot && (
        <span
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#404040', display: 'inline-block' }}
        />
      )}
      {children}
    </div>
  )
}

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

export default function ScanResult({ onBack, onToothDetail }: ScanResultProps) {
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
        <BackButton onBack={onBack} />
        <Pill dot>Scan complete · just now</Pill>
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
      </div>

      {/* Headline */}
      <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', padding: '14px 24px 0' }}>
        Here&apos;s what I see
      </h1>

      {/* Small success animation placeholder */}
      <div style={{ padding: '12px 24px 0', display: 'flex', justifyContent: 'center' }}>
        <HatchedPlaceholder
          label="Success animation"
          circle
          width={56}
          height={56}
        />
      </div>

      {/* Hero — tappable, leads to tooth detail */}
      <div style={{ padding: '12px 24px 0' }}>
        <div
          onClick={onToothDetail}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onToothDetail()}
          style={{ cursor: 'pointer' }}
          title="Tap to see tooth detail"
        >
          <HatchedPlaceholder
            label="3D dental arch — tap to zoom into a tooth (color-coded: clean / plaque / gum care)"
            height={190}
            style={{ borderColor: '#C0C0C0' }}
          />
        </div>
        <p style={{ fontSize: 11, color: '#AAAAAA', textAlign: 'center', marginTop: 6 }}>
          Tap arch to inspect a tooth →
        </p>
      </div>

      {/* Stats */}
      <div style={{ padding: '14px 24px 0' }}>
        <StatStrip />
      </div>

      {/* Insight card */}
      <div style={{ padding: '12px 24px 0' }}>
        <div
          style={{
            background: '#F5F5F5',
            border: '1px solid #E0E0E0',
            borderRadius: 12,
            padding: '14px 16px',
          }}
        >
          <div style={{ fontSize: 10, color: '#999999', fontWeight: 600, letterSpacing: '0.5px', marginBottom: 6 }}>
            FOCUS THIS WEEK
          </div>
          <p style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.45 }}>
            {hygieneData.insight}
          </p>
        </div>
      </div>
    </div>
  )
}
