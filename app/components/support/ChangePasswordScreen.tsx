'use client'
// Screen 4c — Change Password
// Form-only; no real auth. Toast on submit → navigate back to Profile.

import { useState, useEffect, useRef } from 'react'

interface ChangePasswordScreenProps {
  onBack: () => void   // → Profile (4b)
}

const inputStyle: React.CSSProperties = {
  width:       '100%',
  padding:     '12px 14px',
  fontSize:    16,
  color:       '#1A1A1A',
  background:  '#FFFFFF',
  border:      '1px solid #E0E0E0',
  borderRadius: 8,
  outline:     'none',
  fontFamily:  'inherit',
  boxSizing:   'border-box',
}

const labelStyle: React.CSSProperties = {
  fontSize:     13,
  color:        '#666666',
  marginBottom: 6,
  display:      'block',
}

export default function ChangePasswordScreen({ onBack }: ChangePasswordScreenProps) {
  const [newPw,     setNewPw]     = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [toast,     setToast]     = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const canSubmit = newPw.length >= 1 && confirmPw.length >= 1 && newPw === confirmPw

  const handleSubmit = () => {
    if (!canSubmit) return
    setToast(true)
    timerRef.current = setTimeout(() => {
      setToast(false)
      onBack()
    }, 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 32 }}>

      {/* Toast */}
      {toast && (
        <div
          style={{
            background:   '#F5F5F5',
            border:       '1px solid #E0E0E0',
            borderRadius: 8,
            margin:       '12px 24px 0',
            padding:      '10px 16px',
            fontSize:     13,
            color:        '#1A1A1A',
            textAlign:    'center',
            fontWeight:   500,
          }}
        >
          password updated
        </div>
      )}

      {/* Back */}
      <div style={{ padding: toast ? '12px 24px 0' : '16px 24px 0' }}>
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
        change password
      </h1>

      {/* Subtitle */}
      <p style={{ fontSize: 14, color: '#666666', padding: '6px 24px 0', lineHeight: 1.45, marginBottom: 0 }}>
        create a new password for your account
      </p>

      {/* Form */}
      <div style={{ padding: '28px 24px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* New password */}
        <div>
          <label style={labelStyle}>new password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            style={inputStyle}
          />
        </div>

        {/* Confirm password */}
        <div>
          <label style={labelStyle}>confirm new password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            style={inputStyle}
          />
        </div>

        {/* Helper */}
        <p style={{ fontSize: 12, color: '#999999', margin: 0 }}>
          8 characters minimum
        </p>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width:        '100%',
            padding:      '14px 0',
            fontSize:     16,
            fontWeight:   600,
            fontFamily:   'inherit',
            background:   canSubmit ? '#1A1A1A' : '#E0E0E0',
            color:        canSubmit ? '#FFFFFF' : '#999999',
            border:       'none',
            borderRadius: 8,
            cursor:       canSubmit ? 'pointer' : 'not-allowed',
            transition:   'background 0.15s, color 0.15s',
            marginTop:    8,
          }}
        >
          Update password
        </button>

      </div>
    </div>
  )
}
