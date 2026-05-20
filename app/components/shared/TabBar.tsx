// TabBar — fixed 4-tab bottom bar, always flush to bottom of the PhoneFrame.
// Tab bar height: 83px (64px content + 19px home-indicator safe area).

export type Tab = 'tracking' | 'hygiene' | 'camera' | 'support'

interface TabBarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function ClockIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke={active ? '#1A1A1A' : '#AAAAAA'} strokeWidth="1.7" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12,7 12,12 15.5,14" />
    </svg>
  )
}

function ToothIcon({ active }: { active: boolean }) {
  const c = active ? '#1A1A1A' : '#AAAAAA'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {/* Simplified tooth: two roots, crown */}
      <path d="M9 3C6.5 3 5 5 5 7c0 1 .3 2 .6 3L7 18c.2 1 .7 2 2 2 .9 0 1.5-.6 2-.6.5 0 1.1.6 2 .6 1.3 0 1.8-1 2-2l1.4-8c.3-1 .6-2 .6-3 0-2-1.5-4-4-4-1.2 0-1.8.3-3 .3C10.8 3.3 10.2 3 9 3z" />
    </svg>
  )
}

function CameraIcon({ active }: { active: boolean }) {
  const c = active ? '#1A1A1A' : '#AAAAAA'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

function PersonIcon({ active }: { active: boolean }) {
  const c = active ? '#1A1A1A' : '#AAAAAA'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

// ── Tab bar ───────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; Icon: React.ComponentType<{ active: boolean }> }[] = [
  { id: 'tracking', label: 'Tracking', Icon: ClockIcon },
  { id: 'hygiene',  label: 'Hygiene',  Icon: ToothIcon },
  { id: 'camera',   label: 'Camera',   Icon: CameraIcon },
  { id: 'support',  label: 'Support',  Icon: PersonIcon },
]

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div
      style={{
        height: 83,
        flexShrink: 0,
        display: 'flex',
        borderTop: '1px solid #E0E0E0',
        background: '#FFFFFF',
      }}
    >
      {TABS.map(({ id, label, Icon }) => {
        const active = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: 10,
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: active ? '#1A1A1A' : '#AAAAAA',
              outline: 'none',
            }}
          >
            <Icon active={active} />
            <span
              style={{
                fontSize: 10,
                fontWeight: active ? 600 : 400,
                letterSpacing: '0.2px',
              }}
            >
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
