// Screen 2e — Scan History
// Full scrollable list of past scans, newest first.
// Tapping a row → opens Historical Scan Detail (2f).

import { scanHistory, ScanHistoryEntry, DotType } from '@/lib/mockData'

interface ScanHistoryProps {
  onBack:       () => void
  onSelectScan: (scan: ScanHistoryEntry) => void
}

// ── Status dot ────────────────────────────────────────────────────────────────

function StatusDot({ type }: { type: DotType }) {
  const base: React.CSSProperties = {
    width:     12,
    height:    12,
    borderRadius: '50%',
    flexShrink: 0,
  }

  if (type === 'filled') {
    return <div style={{ ...base, background: '#404040' }} />
  }
  if (type === 'outline') {
    return <div style={{ ...base, border: '1.5px solid #404040', boxSizing: 'border-box' }} />
  }
  // half — left side filled, right side white, full border
  return (
    <div
      style={{
        ...base,
        background: 'linear-gradient(to right, #404040 50%, #FFFFFF 50%)',
        border:     '1.5px solid #404040',
        boxSizing:  'border-box',
      }}
    />
  )
}

// ── History row ───────────────────────────────────────────────────────────────

function HistoryRow({
  entry,
  onSelect,
}: {
  entry:    ScanHistoryEntry
  onSelect: () => void
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      style={{
        display:      'flex',
        alignItems:   'center',
        background:   '#FFFFFF',
        border:       '1px solid #E0E0E0',
        borderRadius: 12,
        padding:      '12px 16px',
        marginBottom: 8,
        cursor:       'pointer',
        gap:          12,
      }}
    >
      {/* Left — date */}
      <div style={{ minWidth: 84, flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>{entry.date}</div>
      </div>

      {/* Center — inline stats */}
      <div style={{ flex: 1, fontSize: 12, color: '#666666', lineHeight: 1.35 }}>
        {entry.stats}
      </div>

      {/* Right — status dot */}
      <StatusDot type={entry.dotType} />
    </div>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function ScanHistory({ onBack, onSelectScan }: ScanHistoryProps) {
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
      <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', padding: '14px 24px 0' }}>
        scan history
      </h1>

      {/* Summary card */}
      <div style={{ padding: '4px 24px 0' }}>
        <div
          style={{
            background:   '#F5F5F5',
            border:       '1px solid #E0E0E0',
            borderRadius: 12,
            padding:      '14px 16px',
          }}
        >
          <div style={{ fontSize: 12, color: '#999999', marginBottom: 6 }}>
            12 scans · last 3 months
          </div>
          <div style={{ fontSize: 18, fontWeight: 500, color: '#1A1A1A' }}>
            hygiene is improving
          </div>
        </div>
      </div>

      {/* History list */}
      <div style={{ padding: '16px 24px 0' }}>
        {scanHistory.map((entry) => (
          <HistoryRow
            key={entry.id}
            entry={entry}
            onSelect={() => onSelectScan(entry)}
          />
        ))}
      </div>

    </div>
  )
}
