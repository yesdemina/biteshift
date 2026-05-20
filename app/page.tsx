'use client'
/**
 * Biteshift — Lo-fi wireframe prototype
 *
 * All navigation and state lives here. Screen components are pure (no local
 * nav state). The CalibrationModal auto-appears 3 s after app load via a
 * one-shot useEffect; it uses position:absolute (NOT position:fixed) so it
 * is bounded to the PhoneFrame.
 */

import { useState, useEffect } from 'react'

// ── Shared ────────────────────────────────────────────────────────────────────
import PhoneFrame         from '@/app/components/shared/PhoneFrame'
import StatusBar          from '@/app/components/shared/StatusBar'
import TabBar, { Tab }    from '@/app/components/shared/TabBar'
import HatchedPlaceholder from '@/app/components/shared/HatchedPlaceholder'

// ── Tracking (tab 1) ──────────────────────────────────────────────────────────
import TrackingHome      from '@/app/components/tracking/TrackingHome'
import CalibrationModal  from '@/app/components/tracking/CalibrationModal'

// ── Hygiene (tab 2) ───────────────────────────────────────────────────────────
import HygieneHome   from '@/app/components/hygiene/HygieneHome'
import ActiveScanning from '@/app/components/hygiene/ActiveScanning'
import ScanResult    from '@/app/components/hygiene/ScanResult'
import ToothDetail   from '@/app/components/hygiene/ToothDetail'

// ── Camera (tab 3) ────────────────────────────────────────────────────────────
import CameraDisarmed from '@/app/components/camera/CameraDisarmed'
import CameraArmed    from '@/app/components/camera/CameraArmed'
import Drafts         from '@/app/components/camera/Drafts'

// ── Support (tab 4) ───────────────────────────────────────────────────────────
import SupportHome from '@/app/components/support/SupportHome'

// ── Types ─────────────────────────────────────────────────────────────────────

type HygieneSub  = 'home' | 'scanning' | 'result' | 'detail'
type CameraSub   = 'disarmed' | 'armed' | 'drafts'
type TrackingSub = 'home' | 'face-scan'

// ── Face-scan placeholder (simple, inline) ────────────────────────────────────

function FaceScanPlaceholder({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '16px 24px', gap: 20 }}>
      <button
        onClick={onBack}
        style={{
          alignSelf: 'flex-start',
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
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A' }}>
        Face scan flow
      </h1>
      <HatchedPlaceholder
        label="Face scan flow (TBD) — full implementation pending"
        height={360}
      />
      <p style={{ fontSize: 14, color: '#999999', textAlign: 'center' }}>
        This flow is in progress. Tap Back to return.
      </p>
    </div>
  )
}

// ── Root component ────────────────────────────────────────────────────────────

export default function Home() {
  // ─ Global nav state ──────────────────────────────────────────────────────
  const [activeTab,   setActiveTab]   = useState<Tab>('tracking')
  const [hygieneSub,  setHygieneSub]  = useState<HygieneSub>('home')
  const [cameraSub,   setCameraSub]   = useState<CameraSub>('disarmed')
  const [trackingSub, setTrackingSub] = useState<TrackingSub>('home')
  const [cameraArmed, setCameraArmed] = useState(false)

  // ─ Calibration modal ─────────────────────────────────────────────────────
  const [showCalibration, setShowCalibration] = useState(false)

  // Fire once, 3 s after mount (spec: "After mount, show calibration modal after 3 seconds")
  useEffect(() => {
    const id = setTimeout(() => setShowCalibration(true), 3000)
    return () => clearTimeout(id)
  }, [])

  // ─ Tab switching ──────────────────────────────────────────────────────────
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    // Reset hygiene to home whenever the tab is tapped
    if (tab === 'hygiene') setHygieneSub('home')
    // Camera restores last armed/disarmed state
    if (tab === 'camera') setCameraSub(cameraArmed ? 'armed' : 'disarmed')
    // Reset tracking face-scan placeholder
    if (tab === 'tracking') setTrackingSub('home')
  }

  // ─ Tab bar visibility (hidden only during active scan 2b) ────────────────
  const showTabBar =
    !(activeTab === 'hygiene'  && hygieneSub  === 'scanning') &&
    !(activeTab === 'tracking' && trackingSub === 'face-scan')

  // ─ Screen content ─────────────────────────────────────────────────────────
  const renderContent = () => {
    // ── Tab 1: Tracking ──
    if (activeTab === 'tracking') {
      if (trackingSub === 'face-scan') {
        return <FaceScanPlaceholder onBack={() => setTrackingSub('home')} />
      }
      return <TrackingHome />
    }

    // ── Tab 2: Hygiene ──
    if (activeTab === 'hygiene') {
      if (hygieneSub === 'home') {
        return (
          <HygieneHome onStartScan={() => setHygieneSub('scanning')} />
        )
      }
      if (hygieneSub === 'scanning') {
        return (
          <ActiveScanning
            onClose={() => setHygieneSub('home')}
            onComplete={() => setHygieneSub('result')}
          />
        )
      }
      if (hygieneSub === 'result') {
        return (
          <ScanResult
            onBack={() => setHygieneSub('home')}
            onToothDetail={() => setHygieneSub('detail')}
          />
        )
      }
      if (hygieneSub === 'detail') {
        return <ToothDetail onBack={() => setHygieneSub('result')} />
      }
    }

    // ── Tab 3: Camera ──
    if (activeTab === 'camera') {
      if (cameraSub === 'disarmed') {
        return (
          <CameraDisarmed
            onArm={(_duration) => {
              setCameraArmed(true)
              setCameraSub('armed')
            }}
          />
        )
      }
      if (cameraSub === 'armed') {
        return (
          <CameraArmed
            onDisarm={() => {
              setCameraArmed(false)
              setCameraSub('disarmed')
            }}
            onViewDrafts={() => setCameraSub('drafts')}
          />
        )
      }
      if (cameraSub === 'drafts') {
        return <Drafts onBack={() => setCameraSub('armed')} />
      }
    }

    // ── Tab 4: Support ──
    if (activeTab === 'support') {
      return <SupportHome />
    }

    return null
  }

  // ─ Render ─────────────────────────────────────────────────────────────────
  return (
    <PhoneFrame>
      {/*
        Inner flex column:
          • StatusBar  — fixed height, never scrolls
          • Content    — flex:1, overflow-y:auto
          • TabBar     — fixed height, never scrolls (hidden for 2b / face-scan)
      */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <StatusBar />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {renderContent()}
        </div>
        {showTabBar && (
          <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </div>

      {/*
        CalibrationModal is position:absolute within PhoneFrame (position:relative),
        so it overlays everything including the tab bar, without breaking out of
        the phone frame (i.e. NOT position:fixed).
      */}
      {showCalibration && activeTab === 'tracking' && trackingSub === 'home' && (
        <CalibrationModal
          onLater={() => setShowCalibration(false)}
          onScan={() => {
            setShowCalibration(false)
            setTrackingSub('face-scan')
          }}
        />
      )}
    </PhoneFrame>
  )
}
