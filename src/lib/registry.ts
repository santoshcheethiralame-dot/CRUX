// ============================================================================
//  CONTENT REGISTRY  —  builds the subject → unit → topic tree at load time by
//  globbing all .md topic files and .json assessment files. No manual imports;
//  drop a file in the right folder with correct frontmatter and it appears.
// ============================================================================
import { parseFrontmatter } from './frontmatter'
import type { Subject, Topic, Unit, QuizSet, CardSet, PYQSet, MCQ, Flashcard, PYQ } from './types'
import { SUBJECTS, type SubjectMeta } from '../content/subjects'

// ---- Glob raw markdown topic files ----
const rawTopics = import.meta.glob('../content/**/topics/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// ---- Glob assessment JSON ----
const quizFiles = import.meta.glob('../content/**/*.quiz.json', { import: 'default', eager: true }) as Record<string, QuizSet>
const cardFiles = import.meta.glob('../content/**/*.cards.json', { import: 'default', eager: true }) as Record<string, CardSet>
const pyqFiles = import.meta.glob('../content/**/*.pyq.json', { import: 'default', eager: true }) as Record<string, PYQSet>

/**
 * Frontmatter `minutes` is a reading estimate, and reading is not studying —
 * in practice a topic takes about twice as long once you are actually working
 * through it. Scale once here so the reader, the unit list and the Orbit export
 * all quote the same realistic number, instead of editing every content file.
 */
const TIME_SCALE = 2

function buildTopics(): Topic[] {
  const topics: Topic[] = []
  for (const [path, raw] of Object.entries(rawTopics)) {
    const { data, body } = parseFrontmatter(raw)
    if (!data.subject || data.unit === undefined || !data.slug || !data.title) {
      console.warn(`[registry] topic missing frontmatter: ${path}`)
      continue
    }
    const subject = String(data.subject)
    const unit = Number(data.unit)
    const slug = String(data.slug)
    topics.push({
      subject,
      unit,
      order: Number(data.order ?? 999),
      slug,
      title: String(data.title),
      summary: data.summary ? String(data.summary) : undefined,
      minutes: data.minutes !== undefined
        ? Math.round(Number(data.minutes) * TIME_SCALE)
        : undefined,
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : undefined,
      id: `${subject}/u${unit}/${slug}`,
      body: body.trim(),
    })
  }
  return topics
}

const allTopics = buildTopics()

function unitFromMeta(meta: SubjectMeta, unit: number, title: string, subtitle?: string): Unit {
  const topics = allTopics
    .filter((t) => t.subject === meta.id && t.unit === unit)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
  return { subject: meta.id, unit, title, subtitle, topics }
}

export const subjects: Subject[] = SUBJECTS.map((meta) => ({
  id: meta.id,
  name: meta.name,
  code: meta.code,
  color: meta.color,
  icon: meta.icon,
  description: meta.description,
  units: meta.units.map((u) => unitFromMeta(meta, u.unit, u.title, u.subtitle)),
}))

// ---- Lookup helpers ----
export const getSubject = (id: string) => subjects.find((s) => s.id === id)
export const getUnit = (subjectId: string, unit: number) => getSubject(subjectId)?.units.find((u) => u.unit === unit)
export const getTopic = (subjectId: string, unit: number, slug: string) =>
  getUnit(subjectId, unit)?.topics.find((t) => t.slug === slug)

export function getQuiz(subjectId: string, unit: number): MCQ[] {
  return Object.values(quizFiles)
    .filter((q) => q.subject === subjectId && q.unit === unit)
    .flatMap((q) => q.items ?? [])
}

export function getCards(subjectId: string, unit: number): Flashcard[] {
  return Object.values(cardFiles)
    .filter((c) => c.subject === subjectId && c.unit === unit)
    .flatMap((c) => c.cards ?? [])
}

export function getPYQs(subjectId: string, unit: number): PYQ[] {
  return Object.values(pyqFiles)
    .filter((p) => p.subject === subjectId && p.unit === unit)
    .flatMap((p) => p.items ?? [])
}

/** Aggregate counts for dashboards/progress. */
export function unitStats(subjectId: string, unit: number) {
  return {
    topics: getUnit(subjectId, unit)?.topics.length ?? 0,
    quizzes: getQuiz(subjectId, unit).length,
    cards: getCards(subjectId, unit).length,
    pyqs: getPYQs(subjectId, unit).length,
  }
}
