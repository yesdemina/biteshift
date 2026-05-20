'use client'
// Screen 1a — Tracking Home
// Timeline scrubber "Today" dot is now a draggable handle (pointer events + setPointerCapture).

import { useState, useRef } from 'react'
import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'
import { trackingData } from '@/lib/mockData'

// ── Shared micro-components ───────────────────────────────────────────────────

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: '#F5F5F5',
        border: '1px solid #E0E0E0',
        borderRadius: 20,
        padding: '5px 12px',
        fontSize: 12,
        color: '#666666',
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  )
}

// ── Draggable timeline scrubber ───────────────────────────────────────────────

function TimelineScrubber() {
  // todayPct = how far along the track the "Today" handle sits (0 = Day 0, 100 = Forecast)
  const [todayPct, setTodayPct]   = useState(50)
  const [dragging, setDragging]   = useState(false)
  const isDragging                = useRef(false)   // ref for sync reads inside handlers
  const trackRef                  = useRef<HTMLDivElement>(null)

  /** Convert a clientX pixel position into a clamped 0-100 percentage. */
  const pctFromClientX = (clientX: number): number => {
    if (!trackRef.current) return todayPct
    const { left, width } = trackRef.current.getBoundingClientRect()
    return Math.max(0, Math.min(100, ((clientX - left) / width) * 100))
  }

  return (
    <div style={{ padding: '0 24px', marginTop: 20 }}>
      {/* ── Track ── */}
      <div
        ref={trackRef}
        style={{
          position: 'relative',
          height: 4,
          background: '#E0E0E0',
          borderRadius: 2,
          // Allow clicking anywhere on track to jump the handle
          cursor: 'pointer',
        }}
        onClick={(e) => {
          // Only move on direct track click, not when the click comes from the handle
          if ((e.target as HTMLElement) === trackRef.current) {
            setTodayPct(pctFromClientX(e.clientX))
          }
        }}
      >
        {/* Filled segment — left edge → Today handle */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${todayPct}%`,
            background: '#404040',
            borderRadius: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Day 0 dot (left, static, small) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#999999',
            border: '2px solid #FFFFFF',
            pointerEvents: 'none',
          }}
        />

        {/* Today — draggable handle */}
        <div
          style={{
            position: 'absolute',
            left: `${todayPct}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: '#1A1A1A',
            border: '3px solid #FFFFFF',
            boxShadow: '0 0 0 2px #1A1A1A',
            cursor: dragging ? 'grabbing' : 'grab',
            touchAction: 'none',     // prevent scroll hijack on mobile
            userSelect: 'none',
            zIndex: 2,
            transition: dragging ? 'none' : 'left 0.3s ease',
          }}
          onPointerDown={(e) => {
            e.preventDefault()
            e.currentTarget.setPointerCapture(e.pointerId)
            isDragging.current = true
            setDragging(true)
          }}
          onPointerMove={(e) => {
            if (!isDragging.current) return
            setTodayPct(pctFromClientX(e.clientX))
          }}
          onPointerUp={(e) => {
            e.currentTarget.releasePointerCapture(e.pointerId)
            isDragging.current = false
            setDragging(false)
          }}
          onPointerCancel={() => {
            isDragging.current = false
            setDragging(false)
          }}
        />

        {/* Forecast dot (right, static, small) */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#CCCCCC',
            border: '2px solid #FFFFFF',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Labels ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ fontSize: 11, color: '#999999' }}>Day 0</span>
        <span
          onClick={() => setTodayPct(50)}
          style={{ fontSize: 11, color: '#1A1A1A', fontWeight: 600, cursor: 'pointer', userSelect: 'none' }}
          title="Tap to reset to today"
        >
          Today
        </span>
        <span style={{ fontSize: 11, color: '#999999' }}>Forecast</span>
      </div>
    </div>
  )
}

// ── Stat cards ────────────────────────────────────────────────────────────────

function StatCard({
  label,
  bigNumber,
  caption,
  progressBar,
}: {
  label: string
  bigNumber: string
  caption: string
  progressBar?: number
}) {
  return (
    <div
      style={{
        flex: 1,
        background: '#F5F5F5',
        border: '1px solid #E0E0E0',
        borderRadius: 12,
        padding: '14px 12px',
      }}
    >
      <div style={{ fontSize: 10, color: '#999999', fontWeight: 600, letterSpacing: '0.6px', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1 }}>
        {bigNumber}
      </div>
      <div style={{ fontSize: 11, color: '#666666', marginTop: 4, lineHeight: 1.3 }}>
        {caption}
      </div>
      {progressBar !== undefined && (
        <div style={{ marginTop: 10, height: 3, background: '#E0E0E0', borderRadius: 2 }}>
          <div
            style={{
              height: '100%',
              width: `${Math.round(progressBar * 100)}%`,
              background: '#404040',
              borderRadius: 2,
            }}
          />
        </div>
      )}
    </div>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function TrackingHome() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 24 }}>
      {/* Top row */}
      <div style={{ padding: '16px 24px 0' }}>
        <Pill>Day {trackingData.dayOfTreatment} of treatment</Pill>
      </div>

      {/* Headline */}
      <div style={{ padding: '14px 24px 0' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}>
          Your smile,<br />in motion
        </h1>
      </div>

      {/* Hero */}
      <div style={{ padding: '16px 24px 0' }}>
        <HatchedPlaceholder
          label="User face photo + AR braces overlay — current state"
          height={252}
        />
      </div>

      {/* Draggable timeline */}
      <TimelineScrubber />

      {/* Stat cards */}
      <div style={{ display: 'flex', gap: 12, padding: '20px 24px 0' }}>
        <StatCard
          label="THIS WEEK"
          bigNumber={trackingData.weeklyMovement}
          caption={trackingData.weeklyToothLabel}
        />
        <StatCard
          label="AI FORECAST"
          bigNumber={trackingData.forecastRange}
          caption="Until completion"
          progressBar={trackingData.forecastProgress}
        />
      </div>
    </div>
  )
}
