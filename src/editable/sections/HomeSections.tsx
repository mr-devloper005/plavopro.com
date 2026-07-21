import Link from 'next/link'
import { ArrowDown, ArrowRight, ArrowUpRight, Bookmark, Search, Sparkles, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }
const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-8'

function allPosts(posts: SitePost[], sections: HomeTimeSection[]) {
  const seen = new Set<string>()
  return [...posts, ...sections.flatMap((section) => section.posts)].filter((post) => {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function taskLabel(task: TaskKey) { return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Stories' }

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const feed = allPosts(posts, timeSections)
  const lead = feed[0]
  const image = lead ? getEditablePostImage(lead) : ''
  return (
    <section className="relative overflow-hidden bg-[#151617] text-[#F3E8DF]">
      {image ? <img src={image} alt="" className="absolute inset-y-0 right-0 hidden h-full w-[46%] object-cover opacity-25 grayscale lg:block" /> : null}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_48%,rgba(232,209,197,.18),transparent_32%),linear-gradient(90deg,#151617_0%,#151617_58%,rgba(21,22,23,.55)_100%)]" />
      <div className="hairline-grid relative min-h-[650px] sm:min-h-[760px]">
        <div className={`${container} flex min-h-[650px] flex-col justify-between py-10 sm:min-h-[760px] sm:py-16`}>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[.24em] text-[#E8D1C5]/70"><span className="h-2 w-2 bg-[#E8D1C5]" /> Independent discovery system <span className="hidden h-px w-16 bg-[#E8D1C5]/30 sm:block" /></div>
          <div className="relative z-10 max-w-6xl">
            <p className="tech-label mb-5 text-[11px] text-[#E8D1C5]">Ideas / resources / people</p>
            <h1 className="editable-display text-[clamp(4.1rem,11vw,10.5rem)] font-normal leading-[.78] tracking-[-.065em]">Build your<br /><span className="text-[#E8D1C5]">next move.</span></h1>
            <div className="mt-10 flex flex-col gap-7 border-t border-white/15 pt-7 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-base leading-7 text-white/65 sm:text-lg">A focused index of useful resources and standout profiles, made for people building businesses with intent.</p>
              <div className="flex flex-wrap gap-3">
                <Link href={primaryRoute} className="inline-flex items-center gap-3 bg-[#E8D1C5] px-6 py-4 text-xs font-bold uppercase tracking-[.12em] text-[#452829]">Explore {taskLabel(primaryTask)} <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/profile" className="inline-flex items-center gap-3 border border-white/25 px-6 py-4 text-xs font-bold uppercase tracking-[.12em] text-white">Meet the people <UserRound className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[.2em] text-white/40"><span>{String(feed.length).padStart(2, '0')} fresh entries</span><span className="inline-flex items-center gap-2">Scroll to inspect <ArrowDown className="h-4 w-4" /></span></div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const feed = allPosts(posts, timeSections).slice(0, 7)
  return (
    <section className="border-b border-[var(--editable-border)] bg-[#F3E8DF] py-12 sm:py-16">
      <div className={container}>
        <div className="grid gap-8 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div><p className="tech-label text-[10px] text-[#766565]">01 / Current signals</p><h2 className="editable-display mt-4 text-5xl leading-[.9] sm:text-6xl">Worth opening<br /><em className="font-normal">right now.</em></h2></div>
          <form action="/search" className="flex border-b border-[#452829] py-3">
            <Search className="h-5 w-5 shrink-0" /><input name="q" placeholder="Search by idea, person, or category" className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-[#766565]" /><button className="text-xs font-bold uppercase tracking-[.12em]">Search</button>
          </form>
        </div>
        {feed.length ? (
          <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {feed.map((post, index) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={`group relative min-h-[390px] shrink-0 snap-start overflow-hidden border border-[#452829]/20 ${index === 0 ? 'w-[85vw] sm:w-[620px]' : 'w-[76vw] sm:w-[340px]'}`}>
                <img src={getEditablePostImage(post)} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,22,23,.04),rgba(21,22,23,.9))]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8"><span className="tech-label text-[9px] text-[#E8D1C5]">{String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}</span><h3 className={`editable-display mt-3 leading-[.98] ${index === 0 ? 'text-4xl sm:text-5xl' : 'text-3xl'}`}>{post.title || 'Untitled entry'}</h3><p className="mt-4 line-clamp-2 max-w-xl text-sm leading-6 text-white/65">{getEditableExcerpt(post, 130) || 'Open this entry to explore the full details.'}</p></div>
              </Link>
            ))}
          </div>
        ) : <div className="mt-10 border border-dashed border-[#452829]/30 px-6 py-14 text-center text-[#766565]">New entries will appear here as they are published.</div>}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const feed = allPosts(posts, timeSections)
  const lead = feed[1] || feed[0]
  const compact = feed.slice(2, 6)
  return (
    <section className="bg-[#E8D1C5] py-16 sm:py-24">
      <div className={container}>
        <div className="flex items-end justify-between gap-5 border-b border-[#452829]/30 pb-5"><div><p className="tech-label text-[10px] text-[#766565]">02 / Field notes</p><h2 className="editable-display mt-3 text-5xl leading-none sm:text-7xl">Ideas in practice.</h2></div><Link href={primaryRoute} className="hidden items-center gap-2 text-xs font-bold uppercase tracking-[.12em] sm:flex">View the index <ArrowUpRight className="h-4 w-4" /></Link></div>
        <div className="mt-8 grid gap-px bg-[#452829]/25 lg:grid-cols-[1.15fr_.85fr]">
          {lead ? <Link href={postHref(primaryTask, lead, primaryRoute)} className="group bg-[#151617] p-5 text-[#F3E8DF] sm:p-8"><div className="relative aspect-[16/10] overflow-hidden"><img src={getEditablePostImage(lead)} alt="" className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105" /><span className="tech-label absolute left-4 top-4 bg-[#E8D1C5] px-3 py-2 text-[9px] text-[#452829]">Featured study</span></div><h3 className="editable-display mt-7 text-4xl leading-[.95] sm:text-6xl">{lead.title}</h3><p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">{getEditableExcerpt(lead, 190) || 'Read the full entry for context, details, and useful links.'}</p></Link> : null}
          <div className="grid gap-px bg-[#452829]/25 sm:grid-cols-2 lg:grid-cols-1">
            {compact.map((post, index) => <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group flex min-h-[160px] gap-5 bg-[#F3E8DF] p-5 sm:p-6"><span className="tech-label text-[10px] text-[#9A8480]">{String(index + 3).padStart(2, '0')}</span><div className="flex min-w-0 flex-1 flex-col"><p className="tech-label text-[9px] text-[#766565]">{getEditableCategory(post)}</p><h3 className="editable-display mt-2 line-clamp-2 text-2xl leading-[1] sm:text-3xl">{post.title}</h3><span className="mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-bold uppercase tracking-[.12em]">Inspect <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span></div></Link>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const fallback = [{ key: 'index', eyebrow: 'Deep index', title: 'From the collection', description: 'More useful entries selected from across the archive.', task: primaryTask, posts: posts.slice(5), href: primaryRoute }]
  const sections = timeSections.length ? timeSections : fallback
  return (
    <section className="bg-[#F3E8DF] py-16 sm:py-24">
      <div className={container}>
        {sections.map((section, sectionIndex) => {
          const items = section.posts.slice(0, 5)
          if (!items.length) return null
          return <div key={section.key} className={sectionIndex ? 'mt-20 border-t border-[#452829]/25 pt-16' : ''}>
            <div className="grid gap-5 sm:grid-cols-[.55fr_1.45fr]"><p className="tech-label text-[10px] text-[#766565]">0{sectionIndex + 3} / {section.eyebrow}</p><div><h2 className="editable-display text-4xl leading-none sm:text-6xl">{section.title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-[#766565]">{section.description}</p></div></div>
            <div className="mt-9 divide-y divide-[#452829]/20 border-y border-[#452829]/20">
              {items.map((post, index) => <Link key={post.id || post.slug} href={postHref(section.task, post, section.href)} className="group grid gap-4 py-5 sm:grid-cols-[60px_1fr_160px_24px] sm:items-center"><span className="tech-label text-[10px] text-[#9A8480]">{String(index + 1).padStart(2, '0')}</span><h3 className="editable-display text-2xl leading-tight sm:text-3xl">{post.title || 'Untitled entry'}</h3><span className="tech-label text-[9px] text-[#766565]">{getEditableCategory(post)}</span><ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>)}
            </div>
          </div>
        })}
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="relative overflow-hidden bg-[#452829] px-5 py-20 text-[#F3E8DF] sm:px-8 sm:py-28">
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#E8D1C5]/20" /><div className="absolute -right-4 -top-4 h-44 w-44 rounded-full border border-[#E8D1C5]/20" />
      <div className="relative mx-auto grid max-w-[var(--editable-container)] gap-12 lg:grid-cols-[1.4fr_.6fr] lg:items-end">
        <div><p className="tech-label text-[10px] text-[#E8D1C5]/70"><Sparkles className="mr-2 inline h-3.5 w-3.5" />Your place in the index</p><h2 className="editable-display mt-6 max-w-5xl text-6xl leading-[.82] tracking-[-.055em] sm:text-8xl lg:text-[8rem]">Useful work<br />deserves a signal.</h2></div>
        <div><p className="text-base leading-8 text-white/65">Create a profile, share a resource, or save something worth returning to.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/signup" className="inline-flex items-center gap-2 bg-[#E8D1C5] px-6 py-4 text-xs font-bold uppercase tracking-[.12em] text-[#452829]">Get started <ArrowRight className="h-4 w-4" /></Link><Link href="/sbm" className="inline-flex items-center gap-2 border border-white/25 px-6 py-4 text-xs font-bold uppercase tracking-[.12em]">Browse resources <Bookmark className="h-4 w-4" /></Link></div></div>
      </div>
    </section>
  )
}
