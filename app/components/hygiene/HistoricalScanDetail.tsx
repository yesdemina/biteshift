// Screen 2f — Historical Scan Detail (read-only)
// Opened when user taps a row in Scan History (2e).
// Hero is NOT tappable. No actions. Back → 2e.

import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'
import { ScanHistoryEntry, hygieneData } from '@/lib/mockData'

interface HistoricalScanDetailProps {
  scan:   ScanHistoryEntry
  onBack: () => void
}

// ── Stat strip ────────────────────────────────────────────────────────────────

function StatStrip({ clean, total, plaque, gumCare }: {
  clean:   number
  total:   number
  plaque:  number
  gumCare: number
}) {
  const items = [
    { label: 'CLEAN',    value: `${clean}/${total}` },
    { label: 'PLAQUE',   value: String(plaque) },
    { label: 'GUM CARE', value: String(gumCare) },
  ]

  return (
    <div
      style={{
        background:   '#F5F5F5',
        border:       '1px solid #E0E0E0',
        borderRadius: 12,
        display:      'flex',
        overflow:     'hidden',
      }}
    >
      {items.map(({ label, value }, i) => (
        <div
          key={label}
          style={{
            flex:       1,
            padding:    '14px 0',
            textAlign:  'center',
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

// ── Screen ────────────────────────────────────────────────────────────────────

export default function HistoricalScanDetail({ scan, onBack }: HistoricalScanDetailProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>

      {/* Top row — back arrow */}
      <div style={{ padding: '16px 24px 0' }}>
        <button
          onClick={onBack}
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        6,
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            color:      '#1A1A1A',
            fontSize:   15,
            padding:    0,
          }}
        >
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M7.5 1.5L2 7.5L7.5 13.5" stroke="#1A1A1A" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          Back
        </button>
      </div>

      {/* Headline */}
      <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', padding: '14px 24px 0', lineHeight: 1.2 }}>
        scan from {scan.date.toLowerCase()}
      </h1>

      {/* Read-only banner pill */}
      <div style={{ padding: '10px 24px 0' }}>
        <div
          style={{
            background:   '#F5F5F5',
            border:       '1px solid #E0E0E0',
            borderRadius: 8,
            padding:      '8px 12px',
            fontSize:     12,
            color:        '#999999',
          }}
        >
          historical scan · read-only
        </div>
      </div>

      {/* Hero — not interactive */}
      <div style={{ padding: '14px 24px 0' }}>
        <HatchedPlaceholder
          label="3D dental arch — color-coded snapshot from this scan"
          height={190}
        />
      </div>

      {/* Stats */}
      <div style={{ padding: '14px 24px 0' }}>
        <StatStrip
          clean={scan.clean}
          total={scan.total}
          plaque={scan.plaque}
          gumCare={scan.gumCare}
        />
      </div>

      {/* Insight card */}
      <div style={{ padding: '12px 24px 0' }}>
        <div
          style={{
            background:   '#F5F5F5',
            border:       '1px solid #E0E0E0',
            borderRadius: 12,
            padding:      '14px 16px',
          }}
        >
          <div style={{ fontSize: 10, color: '#999999', fontWeight: 600, letterSpacing: '0.5px', marginBottom: 6 }}>
            FOCUS THIS WEEK
          </div>
          <p style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.45 }}>
            at the time: {hygieneData.insight.toLowerCase()}
          </p>
        </div>
      </div>

    </div>
  )
}
