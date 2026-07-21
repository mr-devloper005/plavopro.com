'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const tasks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  const { session, logout } = useEditableLocalAuthSession()
  return (
    <footer className="overflow-hidden bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="border-b border-white/15 bg-[#452829] px-5 py-7">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="editable-display max-w-3xl text-3xl leading-none sm:text-4xl">Make your next useful connection.</p>
          <Link href="/signup" className="inline-flex w-fit items-center gap-3 bg-[#E8D1C5] px-6 py-4 text-xs font-bold uppercase tracking-[.15em] text-[#452829]">Start a profile <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <div className="hairline-grid mx-auto grid max-w-[var(--editable-container)] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.6fr_.7fr_.7fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-4">
            <img src="/favicon.png?v=20260413" alt={`${SITE_CONFIG.name} logo`} className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24" />
            <span className="editable-display text-5xl font-medium">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#F3E8DF]/60">{globalContent.footer?.description || 'A considered directory of ideas, resources, businesses, and people worth knowing.'}</p>
          <p className="tech-label mt-10 text-[10px] text-[#E8D1C5]/60">plavopro.com / independent index</p>
        </div>
        <div>
          <h3 className="tech-label text-[10px] text-[#E8D1C5]">Explore</h3>
          <div className="mt-5 grid gap-3">{tasks.map((task) => <Link key={task.key} href={task.route} className="group flex items-center justify-between border-b border-white/10 pb-3 text-sm text-white/70 hover:text-white"><span>{task.label}</span><ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" /></Link>)}</div>
        </div>
        <div>
          <h3 className="tech-label text-[10px] text-[#E8D1C5]">Information</h3>
          <div className="mt-5 grid gap-3">
            <Link href="/about">About</Link><Link href="/contact">Contact</Link>
            {session ? <><Link href="/create">Create</Link><button onClick={logout} className="text-left">Logout</button></> : <><Link href="/login">Login</Link><Link href="/signup">Sign up</Link></>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-white/15 px-5 py-5 text-[10px] uppercase tracking-[.16em] text-white/45 sm:flex-row sm:justify-between sm:px-8">
        <span>© {new Date().getFullYear()} {SITE_CONFIG.name}</span><span>Built for useful discovery</span>
      </div>
    </footer>
  )
}
