// StatusBar — iOS-style top bar: time left, signal/wifi/battery right.
// Height: 44px. Always white background.

export default function StatusBar() {
  return (
    <div
      style={{
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        flexShrink: 0,
        background: '#FFFFFF',
      }}
    >
      {/* Time */}
      <span style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', letterSpacing: '-0.3px' }}>
        9:41
      </span>

      {/* Signal, WiFi, Battery */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Signal bars */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0"  y="7" width="3" height="5" rx="0.5" fill="#1A1A1A" />
          <rect x="4"  y="5" width="3" height="7" rx="0.5" fill="#1A1A1A" />
          <rect x="8"  y="3" width="3" height="9" rx="0.5" fill="#1A1A1A" />
          <rect x="12" y="0" width="3" height="12" rx="0.5" fill="#1A1A1A" />
        </svg>

        {/* WiFi arc */}
        <svg width="16" height="13" viewBox="0 0 16 13" fill="none">
          <circle cx="8" cy="11" r="1.5" fill="#1A1A1A" />
          <path
            d="M4.5 8C5.5 7 6.7 6.4 8 6.4c1.3 0 2.5.6 3.5 1.6"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M2 5.2C3.7 3.5 5.7 2.5 8 2.5c2.3 0 4.3 1 6 2.7"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 24,
              height: 12,
              border: '1.5px solid #1A1A1A',
              borderRadius: 3,
              padding: '1.5px',
              display: 'flex',
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                flex: 1,
                background: '#1A1A1A',
                borderRadius: 1.5,
                width: '75%',
              }}
            />
          </div>
          <div
            style={{
              width: 2,
              height: 5,
              background: '#1A1A1A',
              borderRadius: '0 1px 1px 0',
              marginLeft: 1,
            }}
          />
        </div>
      </div>
    </div>
  )
}
