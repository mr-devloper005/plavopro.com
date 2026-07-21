import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#F3E8DF',
  '--slot4-page-text': '#452829',
  '--slot4-panel-bg': '#E8D1C5',
  '--slot4-surface-bg': '#F8F0EA',
  '--slot4-muted-text': '#766565',
  '--slot4-soft-muted-text': '#9A8480',
  '--slot4-accent': '#452829',
  '--slot4-accent-fill': '#452829',
  '--slot4-accent-soft': '#E8D1C5',
  '--slot4-on-accent': '#F3E8DF',
  '--slot4-dark-bg': '#171717',
  '--slot4-dark-text': '#F3E8DF',
  '--slot4-media-bg': '#DCC2B5',
  '--slot4-cream': '#F3E8DF',
  '--slot4-warm': '#E8D1C5',
  '--slot4-lavender': '#EEE0D7',
  '--slot4-gray': '#57595B',
  '--slot4-body-gradient': 'linear-gradient(180deg,#F3E8DF 0%,#F7EFE9 48%,#F3E8DF 100%)',
  '--editable-page-bg': '#F3E8DF',
  '--editable-page-text': '#452829',
  '--editable-container': '1540px',
  '--editable-border': 'rgba(69,40,41,.24)',
  '--editable-nav-bg': '#151617',
  '--editable-nav-text': '#F3E8DF',
  '--editable-nav-active': '#E8D1C5',
  '--editable-nav-active-text': '#452829',
  '--editable-cta-bg': '#E8D1C5',
  '--editable-cta-text': '#452829',
  '--editable-search-bg': '#F8F0EA',
  '--editable-footer-bg': '#151617',
  '--editable-footer-text': '#F3E8DF',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]', pageText: 'text-[var(--slot4-page-text)]', panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]', surfaceBg: 'bg-[var(--slot4-surface-bg)]', surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]', softMutedText: 'text-[var(--slot4-soft-muted-text)]', accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]', accentSoftBg: 'bg-[var(--slot4-accent-soft)]', accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]', darkBg: 'bg-[var(--slot4-dark-bg)]', darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]', creamBg: 'bg-[var(--slot4-cream)]', warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]', grayBg: 'bg-[var(--slot4-gray)]', border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/15', shadow: 'shadow-[0_10px_30px_rgba(69,40,41,.08)]', shadowStrong: 'shadow-[0_28px_70px_rgba(0,0,0,.22)]',
  overlay: 'bg-[linear-gradient(180deg,transparent,rgba(21,22,23,.88))]',
} as const

export const editableDesignContract = {
  shell: { page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`, section: 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-8', sectionY: 'py-16 sm:py-24' },
  layout: { safeGrid: 'grid gap-px md:grid-cols-2 xl:grid-cols-3', featureGrid: 'grid gap-10 lg:grid-cols-[1.15fr_.85fr]', rail: 'flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden', minRailCard: 'w-[280px] shrink-0 snap-start sm:w-[340px]' },
  type: { eyebrow: 'text-[11px] font-semibold uppercase tracking-[.25em]', heroTitle: 'text-5xl leading-[.92] tracking-[-.055em] sm:text-7xl lg:text-[7.5rem]', sectionTitle: 'text-4xl leading-[.95] tracking-[-.04em] sm:text-6xl', body: 'text-base leading-8' },
  surface: { card: `border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`, soft: `border ${editablePalette.border} ${editablePalette.panelBg}`, dark: `border ${editablePalette.darkBorder} ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}` },
  button: {
    primary: 'inline-flex items-center justify-center gap-2 bg-[var(--slot4-accent-fill)] px-6 py-3.5 text-xs font-bold uppercase tracking-[.15em] text-[var(--slot4-on-accent)] transition hover:-translate-y-0.5 hover:bg-[#57595B]',
    secondary: 'inline-flex items-center justify-center gap-2 border border-[var(--editable-border)] bg-transparent px-6 py-3.5 text-xs font-bold uppercase tracking-[.15em] transition hover:bg-[var(--slot4-panel-bg)]',
    accent: 'inline-flex items-center justify-center gap-2 bg-[var(--slot4-accent-soft)] px-6 py-3.5 text-xs font-bold uppercase tracking-[.15em] text-[var(--slot4-accent)] transition hover:bg-white',
  },
  media: { frame: `relative overflow-hidden ${editablePalette.mediaBg}`, ratio: 'aspect-[4/3]' },
  motion: { lift: 'transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(69,40,41,.16)]', fade: 'transition duration-300 hover:opacity-70' },
} as const

export const aiLayoutRules = [
  'Keep dynamic post fetching intact; do not replace posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
  'Prefer varied editorial modules over repeating one card style.',
] as const
