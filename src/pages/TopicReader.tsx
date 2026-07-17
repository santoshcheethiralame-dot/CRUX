import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom'
import { getUnit, getTopic } from '../lib/registry'
import { isDone, toggleDone, setLastVisited } from '../lib/progress'
import { useProgress } from '../lib/useProgress'
import Markdown from '../components/Markdown'

type Heading = { id: string; text: string; level: number }
const CONFETTI_COLORS = ['var(--lime)', 'var(--grape)', 'var(--bubble)', 'var(--sun)', 'var(--sky)', 'var(--tang)']

function CompletionBurst() {
  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-0 overflow-visible pointer-events-none" aria-hidden>
      <div className="relative max-w-6xl mx-auto">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="confetti-pc"
            style={{
              left: `${(i * 2.5) % 100}%`,
              background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
              animationDelay: `${(i % 10) * 0.05}s`,
              borderRadius: i % 2 ? 999 : 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function TopicReader() {
  useProgress()
  const { subject, unit, slug } = useParams()
  const navigate = useNavigate()
  const subjId = subject!
  const unitNum = Number(unit)
  const u = getUnit(subjId, unitNum)
  const topic = getTopic(subjId, unitNum, slug!)

  const articleRef = useRef<HTMLDivElement>(null)
  const [toc, setToc] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [progress, setProgress] = useState(0)
  const [burst, setBurst] = useState(false)
  // memoize the heavy markdown so scroll-state re-renders don't re-create heading nodes
  const renderedBody = useMemo(() => <Markdown>{topic?.body ?? ''}</Markdown>, [topic?.body])

  const idx = u && topic ? u.topics.findIndex((t) => t.slug === topic.slug) : -1
  const prev = u && idx > 0 ? u.topics[idx - 1] : undefined
  const next = u && topic && idx < u.topics.length - 1 ? u.topics[idx + 1] : undefined
  const base = `/s/${subjId}/u/${unitNum}`

  useEffect(() => {
    if (topic) setLastVisited(subjId, unitNum, topic.slug)
    window.scrollTo(0, 0)
  }, [topic?.id])

  // build ToC from rendered headings (after markdown paints)
  useEffect(() => {
    if (!articleRef.current) return
    const els = [...articleRef.current.querySelectorAll('h2, h3')].filter((h) => h.id) as HTMLElement[]
    setToc(els.map((h) => ({ id: h.id, text: h.textContent || '', level: h.tagName === 'H3' ? 3 : 2 })))
    setActiveId(els[0]?.id || '')
  }, [topic?.id])

  // reading progress + scroll-spy (one handler, position-based = reliable)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0)
      // query live nodes each time (react-markdown can swap nodes between renders)
      const els = articleRef.current ? ([...articleRef.current.querySelectorAll('h2[id], h3[id]')] as HTMLElement[]) : []
      let cur = els[0]?.id || ''
      for (const h of els) {
        if (h.getBoundingClientRect().top <= 120) cur = h.id
        else break
      }
      setActiveId(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [topic?.id])

  // keyboard: ← / → to move between topics
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowLeft' && prev) navigate(`${base}/t/${prev.slug}`)
      else if (e.key === 'ArrowRight') navigate(next ? `${base}/t/${next.slug}` : `${base}/quiz`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev?.slug, next?.slug, base, navigate])

  if (!u || !topic) return <Navigate to={`/s/${subjId}/u/${unitNum}`} replace />
  const done = isDone(topic.id)

  function handleToggle() {
    const wasDone = isDone(topic!.id)
    toggleDone(topic!.id)
    if (!wasDone) {
      setBurst(true)
      setTimeout(() => setBurst(false), 1700)
    }
  }
  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {/* reading-progress bar pinned under the top bar */}
      <div className="fixed top-16 left-0 right-0 z-30 h-[6px] bg-[var(--bg-soft)] border-b-2 border-black">
        <div className="h-full progress-shine transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
      {burst && <CompletionBurst />}

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 py-8 fade-up">
        <div className="flex gap-8 xl:gap-14">
          {/* article column — fills the space between sidebar and ToC; inner wrapper caps & centres the prose */}
          <div className="flex-1 min-w-0">
          <div className="mx-auto w-full xl:max-w-4xl">
            <Link to={base} className="eyebrow text-black hover:underline on-canvas">← Unit {unitNum}</Link>

            <div className="flex items-start justify-between gap-4 mt-3 mb-5">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="eyebrow inline-block nb-sm bg-[var(--lime)] px-2 py-1">Topic {idx + 1} / {u.topics.length}</span>
                  {topic.minutes != null && (
                    <span className="eyebrow inline-block nb-sm bg-[var(--sky)] px-2 py-1">⏱ {topic.minutes} min read</span>
                  )}
                </div>
                {topic.tags && topic.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {topic.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-mono2 font-bold px-2 py-0.5 nb-border bg-[var(--panel)] text-black" style={{ borderWidth: 2, borderRadius: 999 }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={handleToggle}
                className={`shrink-0 nb-sm nb-press font-display font-bold text-sm px-3 py-2 text-black ${done ? 'bg-[var(--lime)]' : 'bg-[var(--panel)]'}`}
              >
                {done ? '✓ Completed' : 'Mark complete'}
              </button>
            </div>

            <div className="reading-sheet">
              <article ref={articleRef}>{renderedBody}</article>
            </div>

            {/* Prev / Next */}
            <div className="flex items-stretch gap-3 mt-12 pt-6 border-t-[3px] border-black">
              {prev ? (
                <Link to={`${base}/t/${prev.slug}`} className="flex-1 nb-sm nb-press bg-[var(--panel)] p-3">
                  <div className="eyebrow text-black/60">← Previous</div>
                  <div className="font-display font-bold text-sm text-black mt-0.5 line-clamp-1">{prev.title}</div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {next ? (
                <Link to={`${base}/t/${next.slug}`} className="flex-1 nb-sm nb-press bg-[var(--panel)] p-3 text-right">
                  <div className="eyebrow text-black/60">Next →</div>
                  <div className="font-display font-bold text-sm text-black mt-0.5 line-clamp-1">{next.title}</div>
                </Link>
              ) : (
                <Link to={`${base}/quiz`} className="flex-1 nb-sm nb-press bg-[var(--sun)] p-3 text-right">
                  <div className="eyebrow text-black/60">Finish with →</div>
                  <div className="font-display font-bold text-sm text-black mt-0.5">🎯 Take the Unit Quiz</div>
                </Link>
              )}
            </div>
          </div>
          </div>

          {/* table-of-contents rail (desktop only) */}
          {toc.length > 1 && (
            <aside className="hidden xl:block w-56 shrink-0">
              <div className="sticky top-28 toc-rail">
                <div className="eyebrow text-black/55 mb-2 px-1 flex items-center gap-2 on-canvas">
                  <span className="w-3 h-3 border-2 border-black" style={{ borderRadius: 3, background: 'var(--subject, var(--grape))' }} />
                  On this page
                </div>
                <nav className="space-y-0.5 border-l-[3px] border-black/15 pl-1">
                  {toc.map((h) => {
                    const active = h.id === activeId
                    return (
                      <button
                        key={h.id}
                        onClick={() => goTo(h.id)}
                        className={`block w-full text-left text-[13px] leading-snug py-1 transition-all ${
                          h.level === 3 ? 'pl-4' : 'pl-2'
                        } ${active ? 'toc-active font-display font-bold text-black' : 'text-black/55 hover:text-black'}`}
                        style={active ? { boxShadow: 'inset 3px 0 0 var(--subject, var(--grape))' } : undefined}
                      >
                        {h.text}
                      </button>
                    )
                  })}
                </nav>
                <div className="eyebrow text-black/35 mt-4 px-1 leading-relaxed on-canvas">← → keys to switch topics</div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  )
}
