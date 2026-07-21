'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, Search, UserRound, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState(true)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').map((task) => ({ label: task.label, href: task.route })), [])

  const links = [{ label: 'Discover', href: '/' }, ...navItems, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }]

  return (
    <header className="sticky top-0 z-50 bg-[var(--slot4-page-bg)] text-[var(--editable-nav-text)]">
      {notice ? (
        <div className="relative flex min-h-10 items-center justify-center bg-[#452829] px-12 text-center text-[11px] font-semibold uppercase tracking-[.15em] text-[#F3E8DF] sm:text-xs">
          <Link href="/signup" className="group inline-flex items-center gap-2">Join the Plavo directory <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></Link>
          <button onClick={() => setNotice(false)} aria-label="Dismiss announcement" className="absolute right-4 p-1 text-[#F3E8DF]/80 hover:text-white"><X className="h-5 w-5" /></button>
        </div>
      ) : null}

      <nav className="mx-3 my-3 flex min-h-[82px] items-center gap-4 border border-white/10 bg-[#151617] px-4 sm:mx-6 sm:px-5 lg:gap-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 pr-2 sm:pr-6">
          <img src="/favicon.png?v=20260413" alt={`${SITE_CONFIG.name} logo`} className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16" />
          <span className="editable-display text-2xl font-medium tracking-[-.03em] text-[#F3E8DF]">{SITE_CONFIG.name}</span>
        </Link>

        <div className="hidden flex-1 items-stretch justify-center lg:flex">
          {links.slice(0, 5).map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(`${item.href}/`))
            return (
              <Link key={item.href} href={item.href} className={`group flex items-center gap-3 px-4 py-3 text-sm font-semibold transition ${active ? 'text-[#E8D1C5]' : 'text-[#F3E8DF] hover:text-[#E8D1C5]'}`}>
                {item.label}
                <span className={`flex h-8 w-8 items-center justify-center border transition ${active ? 'border-[#E8D1C5] bg-[#452829]' : 'border-white/15 bg-[#2B2D2F] group-hover:border-[#E8D1C5]/70'}`}><span className="text-xl font-light leading-none">+</span></span>
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <form action="/search" className="hidden border border-white/15 bg-[#202224] xl:flex">
            <input name="q" type="search" placeholder="Search the index" className="w-40 bg-transparent px-4 py-3 text-xs text-[#F3E8DF] outline-none placeholder:text-[#F3E8DF]/45 focus:w-52" />
            <button aria-label="Search" className="border-l border-white/15 px-3 text-[#E8D1C5]"><Search className="h-4 w-4" /></button>
          </form>
          {session ? (
            <button onClick={logout} className="hidden border border-[#E8D1C5]/35 px-4 py-3 text-xs font-semibold uppercase tracking-[.12em] sm:block">Logout</button>
          ) : (
            <Link href="/login" className="hidden p-3 text-[#E8D1C5] sm:block" aria-label="Log in"><UserRound className="h-5 w-5" /></Link>
          )}
          <Link href={session ? '/create' : '/signup'} className="hidden bg-[#E8D1C5] px-5 py-4 text-sm font-bold text-[#452829] transition hover:bg-[#F3E8DF] sm:block">{session ? 'Create' : 'Get started'}</Link>
          <button onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" className="border border-white/15 p-3 lg:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>

      {open ? (
        <div className="mx-3 border border-white/10 bg-[#151617] p-4 sm:mx-6 lg:hidden">
          <form action="/search" className="mb-4 flex border border-white/15">
            <input name="q" type="search" placeholder="Search the index" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none" />
            <button className="px-4"><Search className="h-4 w-4" /></button>
          </form>
          <div className="grid sm:grid-cols-2">
            {links.map((item, index) => <Link key={`${item.href}-${index}`} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/10 px-3 py-4 text-sm font-semibold"><span>{item.label}</span><span className="text-[#E8D1C5]">↗</span></Link>)}
          </div>
        </div>
      ) : null}
    </header>
  )
}
