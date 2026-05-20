'use client'
/**
 * Biteshift — Lo-fi wireframe prototype (v2)
 *
 * App-level state:
 *   appScreen          — controls pre-auth flow vs main app
 *   userName           — set during onboarding; used in Welcome + Support greeting
 *   hasSeenCalibration — ensures 3-s auto-modal fires only once per session
 *   cameraArmed        — persists across tab switches
 *   showCalibration    — whether the calibration bottom-sheet is visible
 *   showFaceScan       — whether the face-scan progress overlay is visible
 *
 * Screen flow:
 *   Splash (0) → Onboarding (0b) → Welcome (0c) → Main app
 *                                 ↗ (if userName set already)
 */

import { useState, useEffect } from 'react'

// ── Shared ─────────────────────────────────────────────────────────────────────
import PhoneFrame        from '@/app/components/shared/PhoneFrame'
import StatusBar         from '@/app/components/shared/StatusBar'
import TabBar, { Tab }   from '@/app/components/shared/TabBar'

// ── Onboarding ─────────────────────────────────────────────────────────────────
import SplashScreen      from '@/app/components/onboarding/SplashScreen'
import OnboardingScreen  from '@/app/components/onboarding/OnboardingScreen'
import WelcomeScreen     from '@/app/components/onboarding/WelcomeScreen'

// ── Tracking (tab 1) ───────────────────────────────────────────────────────────
import TrackingHome      from '@/app/components/tracking/TrackingHome'
import CalibrationModal  from '@/app/components/tracking/CalibrationModal'
import FaceScanProgress  from '@/app/components/tracking/FaceScanProgress'

// ── Hygiene (tab 2) ────────────────────────────────────────────────────────────
import HygieneHome    from '@/app/components/hygiene/HygieneHome'
import ActiveScanning from '@/app/components/hygiene/ActiveScanning'
import ScanResult     from '@/app/components/hygiene/ScanResult'
import ToothDetail    from '@/app/components/hygiene/ToothDetail'

// ── Camera (tab 3) ─────────────────────────────────────────────────────────────
import CameraDisarmed from '@/app/components/camera/CameraDisarmed'
import CameraArmed    from '@/app/components/camera/CameraArmed'
import Drafts         from '@/app/components/camera/Drafts'

// ── Support (tab 4) ────────────────────────────────────────────────────────────
import SupportHome from '@/app/components/support/SupportHome'

// ── Types ──────────────────────────────────────────────────────────────────────

type AppScreen  = 'splash' | 'onboarding' | 'welcome' | 'main'
type HygieneSub = 'home' | 'scanning' | 'result' | 'detail'
type CameraSub  = 'disarmed' | 'armed' | 'drafts'

// ── Root component ─────────────────────────────────────────────────────────────

export default function Home() {
  // ── Pre-auth flow state ────────────────────────────────────────────────────
  const [appScreen, setAppScreen] = useState<AppScreen>('splash')
  const [userName,  setUserName]  = useState('')

  // ── Main-app nav state ─────────────────────────────────────────────────────
  const [activeTab,  setActiveTab]  = useState<Tab>('tracking')
  const [hygieneSub, setHygieneSub] = useState<HygieneSub>('home')
  const [cameraSub,  setCameraSub]  = useState<CameraSub>('disarmed')
  const [cameraArmed, setCameraArmed] = useState(false)

  // ── Overlay / modal state ──────────────────────────────────────────────────
  const [showCalibration,    setShowCalibration]    = useState(false)
  const [hasSeenCalibration, setHasSeenCalibration] = useState(false)
  const [showFaceScan,       setShowFaceScan]       = useState(false)

  // ── Calibration modal: fires once, 3 s after entering main Tracking tab ───
  useEffect(() => {
    if (
      appScreen === 'main' &&
      activeTab === 'tracking' &&
      !hasSeenCalibration &&
      !showFaceScan
    ) {
      const id = setTimeout(() => {
        setShowCalibration(true)
        setHasSeenCalibration(true)
      }, 3000)
      return () => clearTimeout(id)
    }
  }, [appScreen, activeTab, hasSeenCalibration, showFaceScan])

  // ── Pre-auth handlers ──────────────────────────────────────────────────────

  // Splash completes → always go to Onboarding (session-only, no localStorage)
  const handleSplashComplete = () => setAppScreen('onboarding')

  // Onboarding submit → save name, advance to Welcome
  const handleOnboardingSubmit = (name: string) => {
    setUserName(name)
    setAppScreen('welcome')
  }

  // Welcome completes → enter main app
  const handleWelcomeComplete = () => setAppScreen('main')

  // ── Tab switching ──────────────────────────────────────────────────────────
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    if (tab === 'hygiene') setHygieneSub('home')
    if (tab === 'camera')  setCameraSub(cameraArmed ? 'armed' : 'disarmed')
  }

  // ── Face scan handlers ─────────────────────────────────────────────────────
  const handleScanMyFace = () => {
    setShowCalibration(false)
    setShowFaceScan(true)
  }

  const handleFaceScanComplete = () => {
    setShowFaceScan(false)
    // Land on clean Tracking Home — no modal
  }

  // ── Camera arm / disarm ────────────────────────────────────────────────────
  const handleArm = (_duration: string) => {
    setCameraArmed(true)
    setCameraSub('armed')
  }
  const handleDisarm = () => {
    setCameraArmed(false)
    setCameraSub('disarmed')
  }

  // ── Tab bar: hidden during active scan and face scan overlay ───────────────
  const showTabBar =
    appScreen === 'main' &&
    !(activeTab === 'hygiene' && hygieneSub === 'scanning')

  // ── Main screen content ────────────────────────────────────────────────────
  const renderContent = () => {
    // Tab 1 — Tracking
    if (activeTab === 'tracking') {
      return <TrackingHome />
    }

    // Tab 2 — Hygiene
    if (activeTab === 'hygiene') {
      if (hygieneSub === 'home')     return <HygieneHome onStartScan={() => setHygieneSub('scanning')} />
      if (hygieneSub === 'scanning') return (
        <ActiveScanning
          onClose={() => setHygieneSub('home')}
          onComplete={() => setHygieneSub('result')}
        />
      )
      if (hygieneSub === 'result')   return (
        <ScanResult
          onBack={() => setHygieneSub('home')}
          onToothDetail={() => setHygieneSub('detail')}
        />
      )
      if (hygieneSub === 'detail')   return <ToothDetail onBack={() => setHygieneSub('result')} />
    }

    // Tab 3 — Camera
    if (activeTab === 'camera') {
      if (cameraSub === 'disarmed') return <CameraDisarmed onArm={handleArm} />
      if (cameraSub === 'armed')    return (
        <CameraArmed
          onDisarm={handleDisarm}
          onViewDrafts={() => setCameraSub('drafts')}
        />
      )
      if (cameraSub === 'drafts')   return <Drafts onBack={() => setCameraSub('armed')} />
    }

    // Tab 4 — Support
    if (activeTab === 'support') {
      return <SupportHome userName={userName} />
    }

    return null
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <PhoneFrame>
      {/* ── Pre-auth screens (full-bleed, absolute, cover the phone frame) ── */}
      {appScreen === 'splash' && (
        <SplashScreen hasUser={!!userName} onComplete={handleSplashComplete} />
      )}
      {appScreen === 'onboarding' && (
        <OnboardingScreen onSubmit={handleOnboardingSubmit} />
      )}
      {appScreen === 'welcome' && (
        <WelcomeScreen userName={userName} onComplete={handleWelcomeComplete} />
      )}

      {/* ── Main app ── */}
      {appScreen === 'main' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <StatusBar />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {renderContent()}
          </div>
          {showTabBar && (
            <TabBar activeTab={activeTab} onTabChange={handleTabChange} />
          )}
        </div>
      )}

      {/*
        ── Absolute overlays — rendered on top of everything, z-index 50+.
           position:absolute within PhoneFrame (position:relative).
           NOT position:fixed — stays bounded to the 390×844 frame.
      */}

      {/* Calibration bottom sheet (1b) */}
      {appScreen === 'main' &&
        showCalibration &&
        activeTab === 'tracking' && (
          <CalibrationModal
            onLater={() => setShowCalibration(false)}
            onScan={handleScanMyFace}
          />
        )}

      {/* Face scan progress (4-second bar) — covers status bar + tab bar */}
      {showFaceScan && (
        <FaceScanProgress onComplete={handleFaceScanComplete} />
      )}
    </PhoneFrame>
  )
}
