// Lightweight localStorage-backed progress + a tiny pub/sub so the UI re-renders.
const KEY = 'study-os:v1'

interface Store {
  done: Record<string, number> // topicId -> completedAt (ms)
  quizBest: Record<string, { score: number; total: number; at: number }> // `${subject}/u${unit}` -> best
  lastVisited?: { subject: string; unit: number; slug: string }
}

function read(): Store {
  try {
    return { done: {}, quizBest: {}, ...JSON.parse(localStorage.getItem(KEY) || '{}') }
  } catch {
    return { done: {}, quizBest: {} }
  }
}

let store = read()
const subs = new Set<() => void>()
function emit() {
  localStorage.setItem(KEY, JSON.stringify(store))
  subs.forEach((f) => f())
}

export function subscribe(fn: () => void) {
  subs.add(fn)
  return () => subs.delete(fn)
}

export const isDone = (topicId: string) => !!store.done[topicId]

/** topicId -> completedAt (ms). Read-only snapshot; used by the Orbit export. */
export const getDone = (): Readonly<Record<string, number>> => ({ ...store.done })

export function toggleDone(topicId: string) {
  if (store.done[topicId]) delete store.done[topicId]
  else store.done[topicId] = Date.now()
  emit()
}

export function setDone(topicId: string, done: boolean) {
  if (done) store.done[topicId] = Date.now()
  else delete store.done[topicId]
  emit()
}

export function doneCount(topicIds: string[]) {
  return topicIds.filter((id) => store.done[id]).length
}

export function recordQuiz(subject: string, unit: number, score: number, total: number) {
  const k = `${subject}/u${unit}`
  const prev = store.quizBest[k]
  if (!prev || score / total > prev.score / prev.total) {
    store.quizBest[k] = { score, total, at: Date.now() }
    emit()
  }
}

export const getQuizBest = (subject: string, unit: number) => store.quizBest[`${subject}/u${unit}`]

export function setLastVisited(subject: string, unit: number, slug: string) {
  store.lastVisited = { subject, unit, slug }
  emit()
}
export const getLastVisited = () => store.lastVisited
