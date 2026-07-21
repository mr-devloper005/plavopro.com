import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const base = {
  dark: false,
  fontDisplay: "'Newsreader', Georgia, serif",
  fontBody: "'Manrope', system-ui, sans-serif",
  bg: '#F3E8DF',
  surface: '#F8F0EA',
  raised: '#E8D1C5',
  text: '#452829',
  muted: '#766565',
  line: 'rgba(69,40,41,.24)',
  accent: '#452829',
  accentSoft: '#E8D1C5',
  onAccent: '#F3E8DF',
  glow: 'rgba(232,209,197,.55)',
  radius: '0rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Journal', note: 'Longer reads, practical notes, and considered points of view.' },
  listing: { ...base, kicker: 'Directory', note: 'Find businesses and useful points of contact.' },
  classified: { ...base, kicker: 'Exchange', note: 'Fresh offers and opportunities, ready to inspect.' },
  image: { ...base, kicker: 'Visual index', note: 'A visual feed of details, work, and inspiration.' },
  sbm: { ...base, kicker: 'Resource index', note: 'Curated references and links worth keeping close.' },
  pdf: { ...base, kicker: 'Library', note: 'Downloadable guides, reports, and useful references.' },
  profile: { ...base, kicker: 'People index', note: 'Meet the people and businesses behind useful work.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
