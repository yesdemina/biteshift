// Screen 4a — Support Home
// Headline personalised to "hi, {name}" (falls back to "hi there").
// Subtitle "Gentle reminders, no pressure" removed per spec.

import { reminderCards, supplies } from '@/lib/mockData'

interface SupportHomeProps {
  userName:  string
  onProfile: () => void
}

function ChevronRight() {
  return (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
      <path
        d="M1.5 1.5L6.5 6.5L1.5 11.5"
        stroke="#AAAAAA"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function SupportHome({ userName, onProfile }: SupportHomeProps) {
  const greeting = userName.trim() ? `hi, ${userName.trim()}` : 'hi there'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>
      {/* Personalised headline + profile icon */}
      <div
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '16px 24px 0',
        }}
      >
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.5px', margin: 0 }}>
          {greeting}
        </h1>
        <button
          onClick={onProfile}
          aria-label="Profile"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, flexShrink: 0 }}
        >
          {/* Person silhouette — matches tab bar line weight */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#1A1A1A" strokeWidth="1.6" />
            <path
              d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
              stroke="#1A1A1A"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Reminder cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          padding: '18px 24px 0',
        }}
      >
        {reminderCards.map((card) => (
          <div
            key={card.id}
            style={{
              background: '#F5F5F5',
              border: '1px solid #E0E0E0',
              borderRadius: 12,
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <p style={{ fontSize: 13, color: '#444444', lineHeight: 1.45, flex: 1 }}>
              {card.text}
            </p>
            <button
              style={{
                background: 'none',
                border: '1px solid #C8C8C8',
                borderRadius: 20,
                padding: '5px 12px',
                fontSize: 12,
                color: '#1A1A1A',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {card.action}
            </button>
          </div>
        ))}
      </div>

      {/* Supplies section */}
      <div style={{ padding: '24px 24px 0' }}>
        <div
          style={{
            fontSize: 11,
            color: '#999999',
            fontWeight: 700,
            letterSpacing: '0.7px',
            marginBottom: 10,
          }}
        >
          SUPPLIES
        </div>
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E0E0E0',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {supplies.map((item, i) => (
            <button
              key={item.id}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '15px 16px',
                background: 'none',
                border: 'none',
                borderTop: i === 0 ? 'none' : '1px solid #E0E0E0',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: 15, color: '#1A1A1A' }}>{item.label}</span>
              <ChevronRight />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
