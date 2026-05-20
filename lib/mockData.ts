// ─── Biteshift Mock Data ────────────────────────────────────────────────────
// All data is static / client-side only. No backend.

// Tab 1 — Tracking
export const trackingData = {
  dayOfTreatment: 142,
  totalDays: 730,
  weeklyMovement: '0.4 mm',
  weeklyToothLabel: 'Lower right canine moved',
  forecastRange: '7–9 mo',
  forecastProgress: 0.38, // 38% through the forecast window
}

// Tab 2 — Hygiene
export const hygieneData = {
  lastScanDaysAgo: 6,
  clean: 11,
  total: 14,
  plaque: 2,
  gumCare: 1,
  insight:
    'Focus on brushing the inner side of your lower right canines this week',
}

// Tab 2 — Tooth Detail
export const toothData = {
  pill: 'Lower right canine #27',
  headline: 'Plaque buildup',
  issue: 'Light plaque on inner surface',
  why: 'Hard to reach due to bracket position',
  fix: 'Use interdental brush, 2x daily for 1 week',
}

// Tab 3 — Camera Drafts
export interface Draft {
  id: number
  label: string
}
export const drafts: Draft[] = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  label: 'POV moment',
}))

// Tab 4 — Support
export interface ReminderCard {
  id: string
  text: string
  action: string
}
export const reminderCards: ReminderCard[] = [
  { id: 'tip', text: 'Your scanner tip is 3 months old — reorder?', action: 'Order' },
  { id: 'brush', text: 'Toothbrush older than 3 months — time to refresh', action: 'Shop' },
  { id: 'checkup', text: 'Orthodontist check-up in 2 weeks', action: 'Remind me' },
]

export const supplies = [
  { id: 'tips', label: 'Scanner tips' },
  { id: 'brackets', label: 'Brackets care kit' },
  { id: 'cleaning', label: 'Cleaning brushes' },
]
