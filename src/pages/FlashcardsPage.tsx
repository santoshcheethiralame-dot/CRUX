import { useEffect, useMemo, useState, useCallback } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getSubject, getCards } from '../lib/registry'
import { Page, Button } from '../components/ui'
import Markdown from '../components/Markdown'
import { EmptyState } from './QuizPage'
import { Mascot } from '../components/Mascot'

export default function FlashcardsPage() {
  const { subject, unit } = useParams()
  const subjId = subject!
  const unitNum = Number(unit)
  const subj = getSubject(subjId)
  const cards = useMemo(() => getCards(subjId, unitNum), [subjId, unitNum])

  const [i, setI] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState<Set<string>>(new Set())
  const [reviewOnly, setReviewOnly] = useState(false)

  const deck = reviewOnly ? cards.filter((c) => !known.has(c.id)) : cards
  const c = deck[Math.min(i, Math.max(0, deck.length - 1))]

  const go = useCallback(
    (d: number) => {
      setFlipped(false)
      setI((x) => (deck.length ? (x + d + deck.length) % deck.length : 0))
    },
    [deck.length],
  )
  const rate = useCallback(
    (gotIt: boolean) => {
      if (!c) return
      setKnown((prev) => {
        const nx = new Set(prev)
        if (gotIt) nx.add(c.id)
        else nx.delete(c.id)
        return nx
      })
      setFlipped(false)
      // advancing: in reviewOnly the deck shrinks, so stay at same index (clamped)
      setI((x) => (reviewOnly && gotIt ? Math.min(x, Math.max(0, deck.length - 2)) : deck.length ? (x + 1) % deck.length : 0))
    },
    [c, deck.length, reviewOnly],
  )

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setFlipped((f) => !f) }
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key.toLowerCase() === 'k') rate(true)
      else if (e.key.toLowerCase() === 'r') rate(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, rate])

  if (!subj) return <Navigate to="/" replace />
  if (cards.length === 0) {
    return (
      <Page>
        <EmptyState title="No flashcards yet" body="Spaced-recall cards for this unit are on the way." back={`/s/${subjId}/u/${unitNum}`} />
      </Page>
    )
  }

  const knownCount = known.size
  const pct = Math.round((knownCount / cards.length) * 100)

  // all cards mastered (or review pile cleared)
  if (deck.length === 0) {
    return (
      <Page>
        <div className="nb p-10 text-center pat-host overflow-hidden" style={{ background: 'var(--lime)' }}>
          <div className="pat-layer pat-checker opacity-40" />
          <div className="flex justify-center relative z-10 mb-1"><div className="tilt-r2"><Mascot expr="happy" size={104} tone="var(--lime)" /></div></div>
          <div className="display-title text-4xl text-black">Deck cleared!</div>
          <p className="eyebrow text-black/70 mt-2">All {cards.length} cards marked as known.</p>
          <div className="flex gap-3 justify-center mt-6">
            <Button color="var(--grape)" onClick={() => { setKnown(new Set()); setReviewOnly(false); setI(0) }}>↻ Restart deck</Button>
            <Link to={`/s/${subjId}/u/${unitNum}`}><Button color="var(--panel)">Back to unit</Button></Link>
          </div>
        </div>
      </Page>
    )
  }

  return (
    <Page>
      <div className="flex items-center justify-between mb-3 gap-2">
        <Link to={`/s/${subjId}/u/${unitNum}`} className="eyebrow text-black hover:underline on-canvas">← Unit {unitNum}</Link>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setReviewOnly((v) => !v); setI(0); setFlipped(false) }}
            className={`eyebrow nb-sm px-2 py-1 nb-press ${reviewOnly ? 'bg-[var(--bubble)] text-black' : 'bg-[var(--panel)] text-black'}`}
            title="Study only cards you haven't marked known"
          >
            {reviewOnly ? '◉ review pile' : '○ review pile'}
          </button>
          <span className="eyebrow text-black nb-sm bg-[var(--sun)] px-2 py-1">{(i % deck.length) + 1} / {deck.length}</span>
        </div>
      </div>

      {/* mastery progress */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-3 nb-border bg-[var(--panel)] overflow-hidden" style={{ borderRadius: 999 }}>
          <div className="h-full bg-[var(--lime)] transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="eyebrow text-black/70 shrink-0">{knownCount}/{cards.length} known</span>
      </div>

      {/* 3D flip card */}
      <div className="flip-scene mb-5" style={{ cursor: 'pointer' }}>
        <div className={`flip-card ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped((f) => !f)} key={c.id}>
          <div className="flip-face nb pat-host overflow-hidden px-6 py-8 text-center" style={{ background: 'var(--grape)' }}>
            <div className="pat-layer pat-diag opacity-25" />
            <div className="relative">
              <div className="eyebrow text-black/70 mb-3 nb-sm bg-[var(--panel)] inline-block px-2 py-0.5">Question</div>
              <div className="font-display font-bold text-xl text-black"><Markdown>{c.front}</Markdown></div>
              <div className="eyebrow text-black/50 mt-4">tap / space to flip</div>
            </div>
          </div>
          <div className="flip-face flip-back nb pat-host overflow-hidden px-6 py-8 text-center" style={{ background: 'var(--lime)' }}>
            <div className="pat-layer pat-diag2 opacity-25" />
            <div className="relative">
              <div className="eyebrow text-black/70 mb-3 nb-sm bg-[var(--panel)] inline-block px-2 py-0.5">Answer</div>
              <div className="font-display font-bold text-lg text-black"><Markdown>{c.back}</Markdown></div>
            </div>
          </div>
        </div>
      </div>

      {/* rate */}
      <div className="flex gap-3 mb-3">
        <Button onClick={() => rate(false)} color="var(--bubble)" className="flex-1 py-2.5">↻ Review <span className="opacity-50 text-xs">(R)</span></Button>
        <Button onClick={() => rate(true)} color="var(--lime)" className="flex-1 py-2.5">✓ Got it <span className="opacity-50 text-xs">(K)</span></Button>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => go(-1)} color="var(--panel)" className="flex-1 py-2">← Prev</Button>
        <Button onClick={() => go(1)} color="var(--panel)" className="flex-1 py-2">Next →</Button>
      </div>
      <p className="eyebrow text-black/40 text-center mt-4 on-canvas">← → navigate · space flip · K known · R review</p>
    </Page>
  )
}
