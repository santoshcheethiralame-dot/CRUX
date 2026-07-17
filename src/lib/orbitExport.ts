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
  sourcePath: string
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

/**
 * Only finished topics are exported. Orbit schedules REVIEWS of things you've
 * learned; handing it the untouched backlog would bury the planner in reviews
 * for material never opened.
 *
 * `now` is injected rather than read off the clock so this stays testable.
 */
export function buildOrbitPayload({ now = new Date() }: { now?: Date } = {}): OrbitPayload {
  const done = getDone()
  const stamp = now.toISOString()
  const out: OrbitSubject[] = []
  let cards = 0

  for (const subject of subjects) {
    const items: OrbitItem[] = []

    for (const unit of subject.units) {
      const finished = unit.topics.filter((t) => done[t.id])
      if (!finished.length) continue

      for (const topic of finished) {
        items.push({
          name: `U${unit.unit} · ${topic.title}`,
          // CRUX records when a topic was actually ticked off, so this is the
          // real date rather than "whenever the export ran".
          lastStudied: new Date(done[topic.id]).toISOString(),
          nextReview: stamp,
          easeFactor: 2.5,
          reviewCount: 0,
          comprehensionHistory: [],
          sourceApp: 'crux',
          sourcePath: `#/${subject.id}/u${unit.unit}/${topic.slug}`,
        })
      }

      // Flashcards for a unit you've started — question/answer is what SM-2
      // actually wants, and Orbit's StudyTopic already has both fields.
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
          sourcePath: `#/${subject.id}/u${unit.unit}/flashcards`,
        })
        cards += 1
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
          url: `${window.location.origin}${window.location.pathname}#/${subject.id}`,
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
