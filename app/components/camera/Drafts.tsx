'use client'
// Screen 3c — Drafts grid (and inline Draft Detail)
// Draft selection state is local to this component.

import { useState } from 'react'
import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'
import { drafts } from '@/lib/mockData'

// ── Draft Detail ──────────────────────────────────────────────────────────────

function DraftDetail({
  draftIndex,
  onBack,
}: {
  draftIndex: number
  onBack: () => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px 24px 0',
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#1A1A1A', fontSize: 15, padding: 0,
          }}
        >
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M7.5 1.5L2 7.5L7.5 13.5" stroke="#1A1A1A" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          Back
        </button>
        <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>
          Draft {draftIndex + 1}
        </span>
      </div>

      {/* Full-size preview */}
      <div style={{ padding: '16px 24px 0' }}>
        <HatchedPlaceholder
          label={`POV moment ${draftIndex + 1} — full preview`}
          height={290}
        />
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '20px 24px 0' }}>
        {['Save', 'Share', 'Add to timeline'].map((action) => (
          <button
            key={action}
            style={{
              width: '100%', height: 48,
              background: '#F5F5F5', border: '1px solid #E0E0E0',
              borderRadius: 12, fontSize: 15, fontWeight: 500,
              color: '#1A1A1A', cursor: 'pointer',
            }}
          >
            {action}
          </button>
        ))}
        <button
          style={{
            width: '100%', height: 48,
            background: '#FFFFFF', border: '1px solid #E0E0E0',
            borderRadius: 12, fontSize: 15, fontWeight: 400,
            color: '#AAAAAA', cursor: 'pointer',
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

// ── Drafts grid ───────────────────────────────────────────────────────────────

interface DraftsProps {
  onBack: () => void  // back to Armed screen
}

export default function Drafts({ onBack }: DraftsProps) {
  const [selectedDraft, setSelectedDraft] = useState<number | null>(null)

  // Show detail when a draft is tapped
  if (selectedDraft !== null) {
    return (
      <DraftDetail
        draftIndex={selectedDraft}
        onBack={() => setSelectedDraft(null)}
      />
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px 0',
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#1A1A1A', fontSize: 15, padding: 0,
          }}
        >
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
            <path d="M7.5 1.5L2 7.5L7.5 13.5" stroke="#1A1A1A" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          Back
        </button>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1A1A1A' }}>Drafts</h2>
        <div style={{ width: 46 }} /> {/* balances the back button */}
      </div>

      <p
        style={{
          fontSize: 13, color: '#999999',
          padding: '6px 24px 0', textAlign: 'center',
        }}
      >
        Review before saving or sharing
      </p>

      {/* 2-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          padding: '16px 24px 0',
        }}
      >
        {drafts.map((draft) => (
          <div
            key={draft.id}
            onClick={() => setSelectedDraft(draft.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedDraft(draft.id)}
            style={{ cursor: 'pointer' }}
          >
            <HatchedPlaceholder
              label={draft.label}
              height={148}
              style={{ borderRadius: 10 }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
