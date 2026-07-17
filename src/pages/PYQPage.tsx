import { useMemo, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getSubject, getPYQs } from '../lib/registry'
import { Page, Card } from '../components/ui'
import Markdown from '../components/Markdown'
import { EmptyState } from './QuizPage'

export default function PYQPage() {
  const { subject, unit } = useParams()
  const subjId = subject!
  const unitNum = Number(unit)
  const subj = getSubject(subjId)
  const items = useMemo(() => getPYQs(subjId, unitNum), [subjId, unitNum])

  const [year, setYear] = useState<string>('all')
  const [diff, setDiff] = useState<string>('all')
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const years = useMemo(() => [...new Set(items.map((p) => p.year).filter(Boolean))] as string[], [items])
  const diffs = useMemo(() => [...new Set(items.map((p) => p.difficulty).filter(Boolean))] as string[], [items])

  if (!subj) return <Navigate to="/" replace />
  if (items.length === 0) {
    return (
      <Page>
        <EmptyState title="No past-year questions yet" body="Drop the PYQs and they'll appear here with model answers, tagged by year and marks." back={`/s/${subjId}/u/${unitNum}`} />
      </Page>
    )
  }

  const filtered = items.filter((p) => (year === 'all' || p.year === year) && (diff === 'all' || p.difficulty === diff))
  const allOpen = filtered.length > 0 && filtered.every((p) => open[p.id])
  const toggleAll = () => {
    const nx = { ...open }
    filtered.forEach((p) => (nx[p.id] = !allOpen))
    setOpen(nx)
  }

  const DIFF_TONE: Record<string, string> = { easy: 'var(--mint)', medium: 'var(--sun)', hard: 'var(--bubble)' }

  return (
    <Page>
      <div className="flex items-center justify-between gap-2 mb-3">
        <Link to={`/s/${subjId}/u/${unitNum}`} className="eyebrow text-black hover:underline on-canvas">← Unit {unitNum}</Link>
        <button onClick={toggleAll} className="eyebrow nb-sm nb-press bg-black text-white px-2.5 py-1">
          {allOpen ? '🙈 Hide all answers' : '📖 Reveal all'}
        </button>
      </div>

      <h1 className="display-title text-2xl sm:text-3xl mb-4">
        <span className="bg-[var(--sky)] nb-border px-2 inline-block tilt-l2" style={{ boxShadow: '4px 4px 0 #000', borderRadius: 10 }}>Past-Year Questions</span>
      </h1>

      {/* Filters */}
      <div className="nb-sm bg-[var(--panel)] p-2.5 mb-5 space-y-2">
        <FilterRow label="YEAR" value={year} setValue={setYear} options={years} />
        {diffs.length > 0 && <FilterRow label="LEVEL" value={diff} setValue={setDiff} options={diffs} toneMap={DIFF_TONE} />}
        <div className="eyebrow text-black/50 pt-0.5">{filtered.length} of {items.length} questions</div>
      </div>

      <div className="space-y-4">
        {filtered.map((p) => (
          <Card key={p.id} className="relative">
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {p.year && <span className="sticker bg-[var(--grape)] px-2 py-0.5 font-mono2 font-bold text-[11px] text-black tilt-l2" style={{ transform: 'rotate(-2deg)' }}>{p.year}</span>}
              {p.marks != null && <span className="nb-border bg-[var(--sun)] px-2 py-0.5 font-mono2 font-bold text-[11px] text-black" style={{ borderWidth: 2, borderRadius: 999 }}>{p.marks} marks</span>}
              {p.difficulty && <span className="nb-border px-2 py-0.5 font-mono2 font-bold text-[11px] text-black" style={{ background: DIFF_TONE[p.difficulty] ?? 'var(--panel)', borderWidth: 2, borderRadius: 999 }}>{p.difficulty}</span>}
            </div>
            <div className="text-sm text-black font-medium">
              <Markdown>{p.q}</Markdown>
            </div>
            {p.answer && (
              <div className="mt-3">
                <button
                  onClick={() => setOpen((o) => ({ ...o, [p.id]: !o[p.id] }))}
                  className="eyebrow text-black nb-sm nb-press bg-[var(--lime)] px-2.5 py-1"
                >
                  {open[p.id] ? '🙈 Hide model answer' : '✍️ Show model answer'}
                </button>
                {open[p.id] && (
                  <div className="mt-3 pt-3 border-t-[3px] border-black border-dashed text-sm text-black reveal">
                    <div className="eyebrow text-black/50 mb-2">MODEL ANSWER</div>
                    <Markdown>{p.answer}</Markdown>
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="nb-sm bg-[var(--panel)] p-6 text-center eyebrow text-black/60">No questions match these filters.</div>
        )}
      </div>
    </Page>
  )
}

function FilterRow({
  label,
  value,
  setValue,
  options,
  toneMap,
}: {
  label: string
  value: string
  setValue: (v: string) => void
  options: string[]
  toneMap?: Record<string, string>
}) {
  const chip = (key: string, text: string, tone?: string) => {
    const active = value === key
    return (
      <button
        key={key}
        onClick={() => setValue(key)}
        className={`text-[11px] font-mono2 font-bold px-2 py-0.5 nb-border transition-transform hover:-translate-y-[1px] ${active ? 'text-white' : 'text-black'}`}
        style={{ background: active ? '#000' : tone ?? 'var(--panel)', borderWidth: 2, borderRadius: 999 }}
      >
        {text}
      </button>
    )
  }
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="eyebrow text-black/55 w-10 shrink-0">{label}</span>
      {chip('all', 'All')}
      {options.map((o) => chip(o, o, toneMap?.[o]))}
    </div>
  )
}
