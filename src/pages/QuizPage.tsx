import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getSubject, getQuiz } from '../lib/registry'
import { recordQuiz } from '../lib/progress'
import type { MCQ } from '../lib/types'
import { Page, Card, Pill, Button } from '../components/ui'
import Markdown from '../components/Markdown'
import { Mascot } from '../components/Mascot'

const asSet = (a: number | number[]) => (Array.isArray(a) ? a : [a])
const eqSet = (a: number[], b: number[]) => a.length === b.length && a.every((x) => b.includes(x))

const CONFETTI_COLORS = ['var(--lime)', 'var(--grape)', 'var(--bubble)', 'var(--sun)', 'var(--sky)', 'var(--tang)']

function Confetti() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {Array.from({ length: 36 }).map((_, i) => (
        <span
          key={i}
          className="confetti-pc"
          style={{
            left: `${(i * 2.8) % 100}%`,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            animationDelay: `${(i % 9) * 0.09}s`,
            borderRadius: i % 2 ? 999 : 2,
          }}
        />
      ))}
    </div>
  )
}

function gradeFor(pct: number) {
  if (pct >= 90) return { g: 'A+', color: 'var(--lime)', tag: 'FLAWLESS' }
  if (pct >= 80) return { g: 'A', color: 'var(--lime)', tag: 'ACED IT' }
  if (pct >= 70) return { g: 'B', color: 'var(--sun)', tag: 'STRONG' }
  if (pct >= 50) return { g: 'C', color: 'var(--sun)', tag: 'SOLID' }
  return { g: 'D', color: 'var(--bubble)', tag: 'KEEP GRINDING' }
}

export default function QuizPage() {
  const { subject, unit } = useParams()
  const subjId = subject!
  const unitNum = Number(unit)
  const subj = getSubject(subjId)
  const items = useMemo(() => getQuiz(subjId, unitNum), [subjId, unitNum])

  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number[]>([])
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!subj) return <Navigate to="/" replace />

  if (items.length === 0) {
    return (
      <Page>
        <EmptyState title="No quiz questions yet" body="MCQs for this unit drop in automatically when added." back={`/s/${subjId}/u/${unitNum}`} />
      </Page>
    )
  }

  const q: MCQ = items[i]
  const correct = asSet(q.answer)
  const multi = correct.length > 1
  const lastRight = checked && eqSet(picked, correct)

  function choose(idx: number) {
    if (checked) return
    if (multi) setPicked((p) => (p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx]))
    else setPicked([idx])
  }
  function check() {
    if (picked.length === 0) return
    if (eqSet(picked, correct)) {
      setScore((s) => s + 1)
      setStreak((s) => {
        const ns = s + 1
        setBest((b) => Math.max(b, ns))
        return ns
      })
    } else {
      setStreak(0)
    }
    setChecked(true)
  }
  function next() {
    if (i === items.length - 1) {
      recordQuiz(subjId, unitNum, score, items.length)
      setFinished(true)
    } else {
      setI((x) => x + 1)
      setPicked([])
      setChecked(false)
    }
  }
  function restart() {
    setI(0); setPicked([]); setChecked(false); setScore(0); setStreak(0); setBest(0); setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / items.length) * 100)
    const { g, color, tag } = gradeFor(pct)
    return (
      <Page>
        <Card color={color} className="text-center py-12 pat-host overflow-hidden relative">
          <div className="pat-layer pat-diag opacity-40" />
          {pct >= 70 && <Confetti />}
          <div className="flex justify-center relative z-10">
            <div className="tilt-l"><Mascot expr={pct >= 50 ? 'happy' : 'oops'} size={92} tone={color} /></div>
          </div>
          {/* grade stamp */}
          <div className="stamp inline-grid place-items-center w-28 h-28 nb-border bg-[var(--panel)] mb-2" style={{ boxShadow: '5px 5px 0 #000', borderRadius: 18, borderWidth: 4 }}>
            <span className="display-title text-6xl text-black">{g}</span>
          </div>
          <div className="eyebrow inline-block nb-sm bg-black text-white px-3 py-1 mb-4 mt-2">{tag}</div>
          <div className="display-title text-5xl text-black">{score} / {items.length}</div>
          <div className="eyebrow text-black mt-2">{pct}% correct · best streak {best} 🔥</div>
          <div className="flex gap-3 justify-center mt-7 relative z-10">
            <Button onClick={restart} color="var(--grape)">↻ Retry</Button>
            <Link to={`/s/${subjId}/u/${unitNum}`}>
              <Button color="var(--panel)">Back to unit</Button>
            </Link>
          </div>
        </Card>
      </Page>
    )
  }

  return (
    <Page>
      <div className="flex items-center justify-between mb-4 gap-2">
        <Link to={`/s/${subjId}/u/${unitNum}`} className="eyebrow text-black hover:underline on-canvas">← Unit {unitNum}</Link>
        <div className="flex items-center gap-2">
          {streak >= 2 && (
            <span className="eyebrow nb-sm bg-[var(--tang)] text-black px-2 py-1 punch" key={streak}>
              <span className="flame">🔥</span> {streak} streak
            </span>
          )}
          <span className="eyebrow text-black nb-sm bg-[var(--sun)] px-2 py-1">{i + 1}/{items.length} · ★ {score}</span>
        </div>
      </div>

      <div className="h-3 nb-border bg-[var(--panel)] overflow-hidden mb-5" style={{ borderRadius: 999 }}>
        <div className="h-full progress-shine transition-all" style={{ width: `${((i + (checked ? 1 : 0)) / items.length) * 100}%` }} />
      </div>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {q.difficulty && <Pill tone={q.difficulty === 'hard' ? 'pink' : q.difficulty === 'medium' ? 'sun' : 'accent'}>{q.difficulty}</Pill>}
        {q.source && <Pill>{q.source}</Pill>}
        {multi && <Pill tone="brand">select all</Pill>}
      </div>

      <div className="font-display font-bold text-lg text-black mb-4 on-canvas">
        <Markdown>{q.q}</Markdown>
      </div>

      <div className="space-y-2.5">
        {q.options.map((opt, idx) => {
          const isPicked = picked.includes(idx)
          const isCorrect = correct.includes(idx)
          let bg = 'var(--panel)'
          let extra = 'nb-press'
          if (checked) {
            extra = isCorrect ? 'pop' : isPicked ? 'shake' : ''
            if (isCorrect) bg = 'var(--lime)'
            else if (isPicked) bg = 'var(--danger)'
            else bg = 'var(--panel)'
          } else if (isPicked) {
            bg = 'var(--grape)'
          }
          return (
            <button
              key={idx}
              onClick={() => choose(idx)}
              disabled={checked}
              className={`w-full text-left nb-sm ${extra} p-3 flex items-start gap-3`}
              style={{ background: bg, opacity: checked && !isCorrect && !isPicked ? 0.6 : 1 }}
            >
              <span className="mt-px grid place-items-center w-7 h-7 nb-border bg-[var(--panel)] font-mono2 font-bold text-sm text-black shrink-0" style={{ borderWidth: 2, borderRadius: 7 }}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 text-sm text-black self-center">
                <Markdown>{opt}</Markdown>
              </span>
              {checked && isCorrect && <span className="font-bold text-black self-center text-lg">✓</span>}
              {checked && isPicked && !isCorrect && <span className="font-bold text-black self-center text-lg">✕</span>}
            </button>
          )
        })}
      </div>

      {checked && (
        <div className={`callout ${lastRight ? 'intuition' : 'trap'} mt-4 reveal`}>
          <div className="callout-title"><span>{lastRight ? '✅' : '❌'}</span> {lastRight ? 'Correct!' : 'Not quite'}{q.explain ? ' · why' : ''}</div>
          {q.explain && (
            <div className="callout-body text-sm text-black">
              <Markdown>{q.explain}</Markdown>
            </div>
          )}
        </div>
      )}

      <div className="mt-6">
        {!checked ? (
          <Button onClick={check} disabled={picked.length === 0} color="var(--lime)" className="w-full py-3 text-base">
            Check answer
          </Button>
        ) : (
          <Button onClick={next} color="var(--grape)" className="w-full py-3 text-base">
            {i === items.length - 1 ? 'See results →' : 'Next question →'}
          </Button>
        )}
      </div>
    </Page>
  )
}

export function EmptyState({ title, body, back }: { title: string; body: string; back: string }) {
  return (
    <Card color="var(--sky)" className="text-center py-14 pat-host overflow-hidden">
      <div className="pat-layer pat-checker opacity-40" />
      <div className="flex justify-center relative z-10"><div className="tilt-r"><Mascot expr="oops" size={88} /></div></div>
      <div className="display-title text-3xl text-black mt-2">{title}</div>
      <p className="text-black/70 text-sm mt-2 max-w-sm mx-auto">{body}</p>
      <Link to={back} className="inline-block mt-5 eyebrow text-black nb-sm bg-[var(--panel)] px-3 py-1.5">← Back</Link>
    </Card>
  )
}
