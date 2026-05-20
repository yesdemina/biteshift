// Screen 1b — Calibration Prompt
// Bottom-sheet modal that slides up over 1a. Uses position:absolute (NOT
// position:fixed) so it stays contained inside the PhoneFrame.

import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'

interface CalibrationModalProps {
  onLater: () => void
  onScan: () => void
}

export default function CalibrationModal({ onLater, onScan }: CalibrationModalProps) {
  return (
    /* Dark overlay — absolute within PhoneFrame (position:relative) */
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.45)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* Tap backdrop to dismiss (same as "Later") */}
      <div
        style={{ position: 'absolute', inset: 0 }}
        onClick={onLater}
        aria-label="Dismiss modal"
      />

      {/* Bottom sheet */}
      <div
        style={{
          position: 'relative',
          background: '#FFFFFF',
          borderRadius: '24px 24px 0 0',
          padding: '32px 28px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            width: 36,
            height: 4,
            background: '#E0E0E0',
            borderRadius: 2,
            marginBottom: 24,
          }}
        />

        {/* Face-scan icon placeholder (small circle) */}
        <HatchedPlaceholder
          label="Face scan icon"
          circle
          width={72}
          height={72}
          style={{ marginBottom: 20 }}
        />

        {/* Headline */}
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#1A1A1A',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          Time to recalibrate
        </h2>

        {/* Body */}
        <p
          style={{
            fontSize: 14,
            color: '#666666',
            textAlign: 'center',
            lineHeight: 1.5,
            marginBottom: 28,
            maxWidth: 280,
          }}
        >
          Your teeth have moved noticeably. Let&apos;s scan your face to update
          the picture.
        </p>

        {/* Primary CTA */}
        <button
          onClick={onScan}
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
            marginBottom: 14,
          }}
        >
          Scan my face
        </button>

        {/* Secondary / dismiss */}
        <button
          onClick={onLater}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 14,
            color: '#999999',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Later
        </button>
      </div>
    </div>
  )
}
