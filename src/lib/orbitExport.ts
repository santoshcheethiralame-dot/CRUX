// ============================================================================
//  ORBIT BRIDGE (export side)  —  hand finished material to Orbit's scheduler.
//
//  CRUX is a content library; Orbit (~/OneDrive/Documents/orbitv2) owns SM-2,
//  readiness and the planner. Rather than growing a second forgetting curve in
//  here, we export what's been finished and let the real engine schedule it.
//
//  Separate origins can't share storage, so the handoff is a JSON file:
//      CRUX  --export-->  crux-study-items.json  --import-->  Orbit
//
//  SAFETY — Orbit's "Import backup" is a RESTORE: it clears every table before
//  writing. It guards with `!imported.version || !imported.data`, so this
//  envelope deliberately uses NEITHER key (it uses `kind`) and is rejected
//  before that transaction can open. Do not add a `version` or `data` key.
//  Orbit's additive path is Settings -> Data -> Import study items.
//
//  Two things flow, because Orbit models both:
//    - a finished TOPIC          -> a review item (name only)
//    - a FLASHCARD from that unit -> a review item with question/answer
//  The flashcards are the better fit: SM-2 was designed for exactly that shape.
// ============================================================================
import { subjects, getCards } from './registry'
import { getDone } from './progress'

export const ENVELOPE_KIND = 'study-items/v1'

interface OrbitItem {
  name: string
  lastStudied: string
  nextReview: string
  easeFactor: number
  reviewCount: number
  comprehensionHistory: number[]
  question?: string
  answer?: string
  sourceApp: 'crux'
  // Estimated minutes for this topic (already scaled — see TIME_SCALE in
  // registry.ts). Orbit uses it to size a study block and to split a block
  // across the topics it covers, so the two apps agree on how long work takes.
  estimatedMinutes?: number
  // Absolute URL back to this exact page in CRUX, so Orbit can render a working
  // "open in CRUX" link during review. Uses the app's real HashRouter routes
  // (/s/:subject/u/:unit/t/:slug and .../cards) — see src/App.tsx.
  sourceUrl: string
}

interface OrbitSubject {
  name: string
  code: string
  credits: number
  difficulty: number
  resources: { id: string; title: string; url: string; type: string; priority: string }[]
  items: OrbitItem[]
}

export interface OrbitPayload {
  kind: typeof ENVELOPE_KIND
  source: 'crux'
  exportedAt: string
  subjects: OrbitSubject[]
  counts: { subjects: number; items: number; cards: number }
}

// When `includeAll`, unfinished topics come over too — but staggered, so they
// don't all land "due now" and flood the review queue. This many surface per
// day, in curriculum order, turning the backlog into a paced study plan.
const NEW_PER_DAY = 8
const DAY_MS = 86_400_000

/**
 * Build the study-items payload for Orbit.
 *
 * Default (`includeAll` false): only FINISHED topics — Orbit schedules reviews
 * of what you've learned, so the untouched backlog is left out.
 *
 * `includeAll` true: the whole curriculum. Finished topics are due now;
 * unfinished ones are dripped in at NEW_PER_DAY per day (a study plan, not a
 * flood). Flashcards still ride along only for units you've actually started.
 *
 * `now` is injected rather than read off the clock so this stays testable.
 */
export function buildOrbitPayload(
  { now = new Date(), includeAll = false }: { now?: Date; includeAll?: boolean } = {},
): OrbitPayload {
  const done = getDone()
  const stamp = now.toISOString()
  const out: OrbitSubject[] = []
  let cards = 0

  // Global across the whole export, so the daily new-item load is capped
  // overall — not per subject.
  let newIdx = 0
  const staggeredReview = () =>
    new Date(now.getTime() + Math.floor(newIdx++ / NEW_PER_DAY) * DAY_MS).toISOString()

  // CRUX is a HashRouter app, so a link back is origin + path + #/route.
  // This resolves to localhost in dev and the deployed URL in production —
  // wherever CRUX is actually being served from.
  const base = `${window.location.origin}${window.location.pathname}`

  for (const subject of subjects) {
    const items: OrbitItem[] = []

    for (const unit of subject.units) {
      const finished = unit.topics.filter((t) => done[t.id])
      const unitStarted = finished.length > 0

      for (const topic of finished) {
        items.push({
          name: `U${unit.unit} · ${topic.title}`,
          // CRUX records when a topic was actually ticked off, so this is the
          // real date rather than "whenever the export ran".
          lastStudied: new Date(done[topic.id]).toISOString(),
          nextReview: stamp, // finished → due for review now
          easeFactor: 2.5,
          reviewCount: 0,
          comprehensionHistory: [],
          estimatedMinutes: topic.minutes,
          sourceApp: 'crux',
          sourceUrl: `${base}#/s/${subject.id}/u/${unit.unit}/t/${topic.slug}`,
        })
      }

      if (includeAll) {
        for (const topic of unit.topics.filter((t) => !done[t.id])) {
          items.push({
            name: `U${unit.unit} · ${topic.title}`,
            lastStudied: stamp,
            nextReview: staggeredReview(), // never studied → dripped into the plan
            easeFactor: 2.5,
            reviewCount: 0,
            comprehensionHistory: [],
            estimatedMinutes: topic.minutes,
            sourceApp: 'crux',
            sourceUrl: `${base}#/s/${subject.id}/u/${unit.unit}/t/${topic.slug}`,
          })
        }
      }

      // Flashcards for a unit you've started — question/answer is what SM-2
      // actually wants, and Orbit's StudyTopic already has both fields. Kept to
      // started units even under includeAll, so a fresh subject isn't a wall of
      // hundreds of cards for material never opened.
      if (unitStarted) {
        for (const card of getCards(subject.id, unit.unit)) {
          items.push({
            name: `U${unit.unit} · ${card.front.slice(0, 70)}`,
            lastStudied: stamp,
            nextReview: stamp,
            easeFactor: 2.5,
            reviewCount: 0,
            comprehensionHistory: [],
            question: card.front,
            answer: card.back,
            sourceApp: 'crux',
            sourceUrl: `${base}#/s/${subject.id}/u/${unit.unit}/cards`,
          })
          cards += 1
        }
      }
    }

    if (!items.length) continue

    out.push({
      // The real PES code, so this lands on the subject you already track in
      // Orbit instead of creating a parallel one. Orbit merges on `code`.
      name: subject.name,
      code: subject.code ?? `CRUX-${subject.id.toUpperCase()}`,
      credits: 0,
      difficulty: 3,
      resources: [
        {
          id: `crux-${subject.id}`,
          title: `Open ${subject.name} in CRUX`,
          url: `${base}#/s/${subject.id}`,
          type: 'link',
          priority: 'required',
        },
      ],
      items,
    })
  }

  return {
    kind: ENVELOPE_KIND, // NOT version/data — see the safety note above
    source: 'crux',
    exportedAt: stamp,
    subjects: out,
    counts: {
      subjects: out.length,
      items: out.reduce((n, s) => n + s.items.length, 0),
      cards,
    },
  }
}

export function downloadOrbitPayload(payload: OrbitPayload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `crux-study-items-${payload.exportedAt.split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}
