// Screen 4b — Profile
// Avatar, name, email, settings rows, sign-out.

interface ProfileScreenProps {
  userName:         string
  onBack:           () => void
  onChangePassword: () => void
  onTbd:            (title: string) => void
  onSignOut:        () => void
}

// ── Chevron ───────────────────────────────────────────────────────────────────

function ChevronRight() {
  return (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1.5 1.5L6.5 6.5L1.5 11.5" stroke="#AAAAAA" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

// ── Avatar ────────────────────────────────────────────────────────────────────

function Avatar({ userName }: { userName: string }) {
  const letter = userName.trim() ? userName.trim()[0].toUpperCase() : '?'
  return (
    <div
      style={{
        width:          64,
        height:         64,
        borderRadius:   '50%',
        background:     '#E0E0E0',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        flexShrink:     0,
      }}
    >
      <span style={{ fontSize: 28, fontWeight: 700, color: '#666666', userSelect: 'none' }}>
        {letter}
      </span>
    </div>
  )
}

// ── Settings row ──────────────────────────────────────────────────────────────

function SettingsRow({
  label,
  onPress,
  first = false,
}: {
  label:   string
  onPress: () => void
  first?:  boolean
}) {
  return (
    <button
      onClick={onPress}
      style={{
        width:          '100%',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '14px 16px',
        background:     '#FFFFFF',
        border:         'none',
        borderTop:      first ? 'none' : '1px solid #E0E0E0',
        cursor:         'pointer',
        textAlign:      'left',
        fontFamily:     'inherit',
      }}
    >
      <span style={{ fontSize: 15, color: '#1A1A1A' }}>{label}</span>
      <ChevronRight />
    </button>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────

const SETTINGS_ROWS = [
  'Change password',
  'Notifications',
  'Linked devices',
  'Treatment plan',
  'Help & support',
] as const

export default function ProfileScreen({
  userName,
  onBack,
  onChangePassword,
  onTbd,
  onSignOut,
}: ProfileScreenProps) {
  const displayName = userName.trim() || 'anonymous'

  const handleRow = (label: string) => {
    if (label === 'Change password') { onChangePassword(); return }
    onTbd(label)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 32 }}>

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
        profile
      </h1>

      {/* Profile header card */}
      <div style={{ padding: '12px 24px 0' }}>
        <div
          style={{
            background:     '#F5F5F5',
            border:         '1px solid #E0E0E0',
            borderRadius:   12,
            padding:        '20px 16px',
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            gap:            10,
          }}
        >
          <Avatar userName={userName} />
          <div style={{ fontSize: 18, fontWeight: 500, color: '#1A1A1A' }}>{displayName}</div>
          <div style={{ fontSize: 13, color: '#666666' }}>you@biteshift.app</div>
        </div>
      </div>

      {/* Settings list */}
      <div style={{ padding: '24px 24px 0' }}>
        <div
          style={{
            border:       '1px solid #E0E0E0',
            borderRadius: 12,
            overflow:     'hidden',
            background:   '#FFFFFF',
          }}
        >
          {SETTINGS_ROWS.map((label, i) => (
            <SettingsRow
              key={label}
              label={label}
              first={i === 0}
              onPress={() => handleRow(label)}
            />
          ))}
        </div>
      </div>

      {/* Sign out */}
      <div style={{ padding: '32px 24px 0', textAlign: 'center' }}>
        <button
          onClick={onSignOut}
          style={{
            background:  'none',
            border:      'none',
            fontSize:    15,
            color:       '#404040',
            cursor:      'pointer',
            fontFamily:  'inherit',
            fontWeight:  500,
          }}
        >
          Sign out
        </button>
      </div>

    </div>
  )
}
