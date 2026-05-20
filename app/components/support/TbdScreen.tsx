// Generic TBD placeholder — used for settings rows that aren't fully designed yet.

interface TbdScreenProps {
  title:  string
  onBack: () => void
}

export default function TbdScreen({ title, onBack }: TbdScreenProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>

      {/* Back */}
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
        {title.toLowerCase()}
      </h1>

      {/* Placeholder body */}
      <div
        style={{
          margin:       '24px 24px 0',
          background:   '#F5F5F5',
          border:       '1px solid #E0E0E0',
          borderRadius: 12,
          padding:      '32px 20px',
          textAlign:    'center',
        }}
      >
        <p style={{ fontSize: 14, color: '#999999', lineHeight: 1.5, margin: 0 }}>
          {title} settings coming soon.
        </p>
      </div>

    </div>
  )
}
