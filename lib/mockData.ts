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

// Tab 2 — Scan History (Screen 2e / 2f)
export type DotType = 'filled' | 'half' | 'outline'

export interface ScanHistoryEntry {
  id:      number
  date:    string   // human-readable relative label
  stats:   string   // full inline stats string
  dotType: DotType
  clean:   number
  total:   number
  plaque:  number
  gumCare: number
}

export const scanHistory: ScanHistoryEntry[] = [
  { id: 0, date: 'Today',        stats: '11/14 clean · 2 plaque · 1 gum care', dotType: 'half',    clean: 11, total: 14, plaque: 2, gumCare: 1 },
  { id: 1, date: '6 days ago',   stats: '12/14 clean · 1 plaque · 1 gum care', dotType: 'half',    clean: 12, total: 14, plaque: 1, gumCare: 1 },
  { id: 2, date: '2 weeks ago',  stats: '10/14 clean · 3 plaque · 1 gum care', dotType: 'outline', clean: 10, total: 14, plaque: 3, gumCare: 1 },
  { id: 3, date: '3 weeks ago',  stats: '11/14 clean · 2 plaque · 1 gum care', dotType: 'half',    clean: 11, total: 14, plaque: 2, gumCare: 1 },
  { id: 4, date: '1 month ago',  stats: '13/14 clean · 1 plaque · 0 gum care', dotType: 'filled',  clean: 13, total: 14, plaque: 1, gumCare: 0 },
  { id: 5, date: '5 weeks ago',  stats: '12/14 clean · 2 plaque · 0 gum care', dotType: 'half',    clean: 12, total: 14, plaque: 2, gumCare: 0 },
  { id: 6, date: '6 weeks ago',  stats: '10/14 clean · 3 plaque · 1 gum care', dotType: 'outline', clean: 10, total: 14, plaque: 3, gumCare: 1 },
  { id: 7, date: '2 months ago', stats: '9/14 clean · 4 plaque · 1 gum care',  dotType: 'outline', clean:  9, total: 14, plaque: 4, gumCare: 1 },
  { id: 8, date: '10 weeks ago', stats: '11/14 clean · 2 plaque · 1 gum care', dotType: 'half',    clean: 11, total: 14, plaque: 2, gumCare: 1 },
  { id: 9, date: '3 months ago', stats: '10/14 clean · 3 plaque · 1 gum care', dotType: 'outline', clean: 10, total: 14, plaque: 3, gumCare: 1 },
]

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
