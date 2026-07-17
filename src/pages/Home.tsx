import { useState } from 'react'
import { Link } from 'react-router-dom'
import { subjects, unitStats } from '../lib/registry'
import { doneCount, getLastVisited } from '../lib/progress'
import { useProgress } from '../lib/useProgress'
import { buildOrbitPayload, downloadOrbitPayload } from '../lib/orbitExport'
import { Page, ProgressBar, Pill } from '../components/ui'
import { Mascot } from '../components/Mascot'

const SUBJECT_COLORS = ['var(--grape)', 'var(--sky)', 'var(--bubble)', 'var(--tang)', 'var(--mint)']
const SUBJECT_PATTERNS = ['pat-grid', 'pat-diag', 'pat-dots', 'pat-checker', 'pat-cross']

export default function Home() {
  useProgress()
  const last = getLastVisited()

  // ---- global library stats (celebrate the content) ----
  const allTopicIds = subjects.flatMap((s) => s.units.flatMap((u) => u.topics.map((t) => t.id)))
  const totals = subjects.reduce(
    (a, s) => {
      s.units.forEach((u) => {
        const st = unitStats(s.id, u.unit)
        a.topics += st.topics
        a.mcqs += st.quizzes
        a.cards += st.cards
        a.pyqs += st.pyqs
      })
      return a
    },
    { topics: 0, mcqs: 0, cards: 0, pyqs: 0 },
  )
  const doneTopics = doneCount(allTopicIds)
  const pct = totals.topics ? Math.round((doneTopics / totals.topics) * 100) : 0

  const STATS = [
    { n: totals.topics, label: 'Topics', color: 'var(--grape)', tilt: 'tilt-l2' },
    { n: totals.mcqs, label: 'MCQs', color: 'var(--lime)', tilt: 'tilt-r2' },
    { n: totals.cards, label: 'Flashcards', color: 'var(--bubble)', tilt: 'tilt-l2' },
    { n: totals.pyqs, label: 'PYQs', color: 'var(--sky)', tilt: 'tilt-r2' },
    { n: `${pct}%`, label: 'Complete', color: 'var(--sun)', tilt: 'tilt-l2' },
  ]

  const ticker = '★ ACE EVERY CONCEPT ★ NO FLUFF ★ EXAM-TUNED ★ 10 GPA OR BUST ★ PES SEM 5 ★ THE CRUX OF EVERYTHING ★'

  return (
    <Page>
      {/* ============ HERO ============ */}
      <div className="nb nb-pop-color mb-8 pat-host overflow-hidden" style={{ background: 'var(--grape)', ['--pop' as string]: 'var(--sun)' }}>
        <div className="pat-layer pat-diag opacity-50" />
        <div className="p-6 sm:p-9 relative">
          {/* Cruxbot peeking from the corner */}
          <div className="hidden md:block absolute right-4 lg:right-9 bottom-1 tilt-r2 pointer-events-none select-none">
            <Mascot expr="focus" size={150} tone="var(--sun)" />
          </div>
          <div className="flex items-start justify-between gap-3">
            <span className="eyebrow inline-block nb-sm bg-[var(--lime)] px-2.5 py-1 tilt-l">★ PES · 10 GPA OR BUST</span>
            <span className="sticker bg-[var(--sun)] px-2.5 py-1 font-mono2 font-bold text-[11px] text-black hidden sm:block">SEM&nbsp;5</span>
          </div>
          <h1 className="display-title text-6xl sm:text-7xl text-black text-pop mt-4 leading-[0.85]">
            CR
            <span className="bg-[var(--sun)] nb-border px-1 inline-block tilt-r" style={{ boxShadow: '4px 4px 0 #000', borderRadius: 12 }}>U</span>
            X
          </h1>
          <p className="font-display font-medium text-black/85 mt-4 text-lg max-w-xl">
            The <span className="mark-lime font-bold">crux</span> of every concept — rigorous, exam-tuned notes built for a perfect score. Five subjects, four units each, zero fluff.
          </p>
        </div>
        {/* scrolling ticker footer */}
        <div className="marquee border-t-[3px] border-black bg-black text-[var(--lime)] py-1.5 font-mono2 font-bold text-xs tracking-wider">
          <span className="marquee-track">{ticker}&nbsp;&nbsp;&nbsp;{ticker}</span>
        </div>
      </div>

      {/* ============ GLOBAL STATS STRIP ============ */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8 stagger">
        {STATS.map((s) => (
          <div key={s.label} className={`nb p-3 text-center ${s.tilt} punch`} style={{ background: s.color }}>
            <div className="stat-num text-3xl sm:text-4xl text-black">{s.n}</div>
            <div className="eyebrow text-black/70 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ============ CONTINUE ============ */}
      {last && (
        <Link to={`/s/${last.subject}/u/${last.unit}/t/${last.slug}`} className="block mb-8">
          <div className="nb nb-press p-4 flex items-center gap-3 pat-host overflow-hidden" style={{ background: 'var(--sun)' }}>
            <div className="pat-layer pat-diag2 opacity-30" />
            <span className="grid place-items-center w-11 h-11 nb-sm bg-black text-[var(--sun)] font-display font-bold text-xl shrink-0">▸</span>
            <div className="flex-1">
              <div className="eyebrow text-black/70">Jump back in</div>
              <div className="font-display font-bold text-black text-lg leading-tight">{last.subject.toUpperCase()} · Unit {last.unit}</div>
            </div>
            <span className="font-display font-bold text-2xl">→</span>
          </div>
        </Link>
      )}

      {/* ============ SUBJECTS ============ */}
      <div className="flex items-center gap-2 mb-4">
        <span className="eyebrow nb-sm bg-black text-white px-2.5 py-1">Your subjects</span>
        <span className="flex-1 h-[3px] bg-black/15 rounded-full canvas-rule" />
        <span className="eyebrow text-black/50 on-canvas">{subjects.length} live</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 stagger">
        {subjects.map((s, i) => {
          const totalTopics = s.units.reduce((a, u) => a + u.topics.length, 0)
          const done = doneCount(s.units.flatMap((u) => u.topics.map((t) => t.id)))
          const ready = totalTopics > 0
          const builtUnits = s.units.filter((u) => u.topics.length > 0).length
          const color = SUBJECT_COLORS[i % SUBJECT_COLORS.length]
          const pat = SUBJECT_PATTERNS[i % SUBJECT_PATTERNS.length]
          const spct = ready ? Math.round((done / totalTopics) * 100) : 0
          return (
            <Link key={s.id} to={`/s/${s.id}`} className={`block ${ready ? '' : 'pointer-events-none opacity-60'}`}>
              <div className="nb nb-press-pop p-5 h-full relative" style={{ background: color, ['--pop' as string]: '#000' }}>
                {/* status sticker */}
                {builtUnits === 4 && (
                  <span className="sticker absolute -top-2.5 -right-2 bg-[var(--lime)] px-2 py-0.5 font-mono2 font-bold text-[10px] text-black z-10">
                    ★ FULLY LOADED
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <span className={`grid place-items-center w-14 h-14 nb-border bg-[var(--panel)] font-display font-extrabold text-xl text-black shrink-0 ${pat}`} style={{ boxShadow: '3px 3px 0 #000', borderRadius: 12 }}>
                    {s.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-display font-bold text-black text-xl leading-tight">{s.name}</h2>
                      {s.code && <Pill>{s.code}</Pill>}
                    </div>
                    <p className="text-xs text-black/70 mt-1 line-clamp-2">{s.description}</p>
                  </div>
                </div>

                {/* unit pips */}
                <div className="flex items-center gap-1.5 mt-4">
                  <span className="eyebrow text-black/60 mr-1">UNITS</span>
                  {s.units.map((u) => (
                    <span
                      key={u.unit}
                      title={`Unit ${u.unit}: ${u.title}`}
                      className="grid place-items-center w-6 h-6 nb-border font-mono2 font-bold text-[11px] text-black"
                      style={{ background: u.topics.length > 0 ? 'var(--panel)' : 'transparent', borderWidth: 2, borderRadius: 6, opacity: u.topics.length > 0 ? 1 : 0.4 }}
                    >
                      {u.unit}
                    </span>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between eyebrow text-black/70 mb-1.5">
                    <span>{ready ? `${done}/${totalTopics} topics done` : 'Coming soon'}</span>
                    <span>{ready ? `${spct}%` : ''}</span>
                  </div>
                  <ProgressBar value={done} total={totalTopics || 1} />
                </div>
              </div>
            </Link>
          )
        })}

        {/* playful mystery placeholders */}
        {Array.from({ length: Math.max(0, 5 - subjects.length) }).map((_, i) => (
          <div
            key={`ph-${i}`}
            className="grid place-items-center min-h-[170px] border-[3px] border-dashed border-black/40 opacity-70 pat-dots-soft tilt-r2"
            style={{ borderRadius: 14 }}
          >
            <div className="text-center text-black/50">
              <div className="text-4xl mb-1 font-display font-bold">?</div>
              <div className="eyebrow">Subject slot {subjects.length + i + 1}</div>
              <div className="text-[10px] font-mono2 mt-1 text-black/40">drop content to unlock</div>
            </div>
          </div>
        ))}
      </div>

      {/* ============ ORBIT BRIDGE ============ */}
      <OrbitHandoff />
    </Page>
  )
}

/**
 * Send finished topics + flashcards to Orbit, which owns the spaced repetition.
 * CRUX knows what you've studied; Orbit decides when it comes back.
 */
function OrbitHandoff() {
  const [note, setNote] = useState<string | null>(null)

  return (
    <div
      className="nb mt-8 p-5 sm:p-6 pat-host overflow-hidden"
      style={{ background: 'var(--panel)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-xl">
          <span className="eyebrow inline-block nb-sm bg-[var(--sky)] px-2.5 py-1 tilt-l">
            Orbit
          </span>
          <p className="mt-3 text-sm text-black/70 leading-relaxed">
            Hand your finished topics and flashcards to <b>Orbit</b> and let it schedule the reviews —
            it owns the forgetting curve, this app owns the material. Adds only; anything Orbit already
            tracks keeps its place, so re-run it whenever.
          </p>
        </div>
        <button
          onClick={() => {
            const payload = buildOrbitPayload()
            if (!payload.counts.items) {
              setNote('Nothing finished yet — tick some topics off first.')
              return
            }
            downloadOrbitPayload(payload)
            setNote(
              `${payload.counts.items} items (${payload.counts.cards} flashcards) across ${payload.counts.subjects} subjects. In Orbit: Settings → Data → Import study items.`,
            )
          }}
          className="nb-sm shrink-0 px-5 py-3 font-bold text-sm text-black"
          style={{ background: 'var(--lime)' }}
        >
          Export to Orbit ↗
        </button>
      </div>
      {note && <p className="mt-3 font-mono2 text-[11px] text-black/60">{note}</p>}
    </div>
  )
}
