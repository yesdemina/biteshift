// Screen 2d — Tooth Detail
// "Got it" returns to Scan Result (2c).

import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'
import { toothData } from '@/lib/mockData'

interface ToothDetailProps {
  onBack: () => void
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

function InfoCard({
  tag,
  text,
}: {
  tag: string
  text: string
}) {
  return (
    <div
      style={{
        background: '#F5F5F5',
        border: '1px solid #E0E0E0',
        borderRadius: 12,
        padding: '14px 16px',
      }}
    >
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color: '#999999',
          letterSpacing: '0.6px',
          marginRight: 8,
        }}
      >
        {tag}
      </span>
      <span style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.4 }}>{text}</span>
    </div>
  )
}

export default function ToothDetail({ onBack }: ToothDetailProps) {
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
        {/* Centred pill */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'inline-flex',
            alignItems: 'center',
            background: '#F5F5F5',
            border: '1px solid #E0E0E0',
            borderRadius: 20,
            padding: '5px 12px',
            fontSize: 12,
            color: '#666666',
            fontWeight: 500,
            whiteSpace: 'nowrap',
          }}
        >
          {toothData.pill}
        </div>
        <div style={{ width: 28 }} />
      </div>

      {/* Headline */}
      <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', padding: '14px 24px 0' }}>
        {toothData.headline}
      </h1>

      {/* Hero */}
      <div style={{ padding: '14px 24px 0' }}>
        <HatchedPlaceholder
          label="Zoomed tooth visualization — highlighted plaque area"
          height={190}
        />
      </div>

      {/* Three info cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '16px 24px 0' }}>
        <InfoCard tag="ISSUE" text={toothData.issue} />
        <InfoCard tag="WHY"   text={toothData.why} />
        <InfoCard tag="FIX"   text={toothData.fix} />
      </div>

      {/* Got it */}
      <div style={{ padding: '20px 24px 0' }}>
        <button
          onClick={onBack}
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
          Got it
        </button>
      </div>
    </div>
  )
}
