import { Link, useParams, Navigate } from 'react-router-dom'
import { getSubject, getUnit, unitStats } from '../lib/registry'
import { doneCount, getQuizBest } from '../lib/progress'
import { useProgress } from '../lib/useProgress'
import { Page, Card, ProgressBar, Pill } from '../components/ui'

export default function UnitView() {
  useProgress()
  const { subject, unit } = useParams()
  const subjId = subject!
  const unitNum = Number(unit)
  const subj = getSubject(subjId)
  const u = getUnit(subjId, unitNum)
  if (!subj || !u) return <Navigate to="/" replace />

  const stats = unitStats(subjId, unitNum)
  const done = doneCount(u.topics.map((t) => t.id))
  const best = getQuizBest(subjId, unitNum)
  const base = `/s/${subjId}/u/${unitNum}`

  return (
    <Page>
      <Link to={`/s/${subjId}`} className="eyebrow text-black hover:underline on-canvas">
        ← {subj.name}
      </Link>
      <h1 className="display-title text-4xl sm:text-5xl mt-3">
        <span className="bg-[var(--grape)] nb-border px-2 inline-block mb-2 text-3xl sm:text-4xl" style={{ boxShadow: '4px 4px 0 #000', borderRadius: 10 }}>
          Unit {unitNum}
        </span>
        <br />
        <span className="on-canvas">{u.title}</span>
      </h1>
      {u.subtitle && <p className="text-black/70 text-sm mt-2 on-canvas">{u.subtitle}</p>}

      <Card color="var(--sun)" className="mt-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-display font-bold text-black">Progress</span>
          <span className="eyebrow text-black">
            {done}/{u.topics.length} topics{best && ` · best ${best.score}/${best.total}`}
          </span>
        </div>
        <ProgressBar value={done} total={u.topics.length || 1} />
      </Card>

      {/* Practice shortcuts */}
      <div className="grid grid-cols-3 gap-3 mt-4 stagger">
        <Link to={`${base}/quiz`}>
          <Card color="var(--lime)" onClick={() => {}} className="text-center py-4 pat-host overflow-hidden">
            <div className="pat-layer pat-diag opacity-40" />
            <div className="font-display font-extrabold text-black text-2xl leading-none">{stats.quizzes}</div>
            <div className="eyebrow text-black mt-1.5">Quiz</div>
          </Card>
        </Link>
        <Link to={`${base}/cards`}>
          <Card color="var(--bubble)" onClick={() => {}} className="text-center py-4 pat-host overflow-hidden">
            <div className="pat-layer pat-dots opacity-40" />
            <div className="font-display font-extrabold text-black text-2xl leading-none">{stats.cards}</div>
            <div className="eyebrow text-black mt-1.5">Cards</div>
          </Card>
        </Link>
        <Link to={`${base}/pyq`}>
          <Card color="var(--sky)" onClick={() => {}} className="text-center py-4 pat-host overflow-hidden">
            <div className="pat-layer pat-grid opacity-40" />
            <div className="font-display font-extrabold text-black text-2xl leading-none">{stats.pyqs}</div>
            <div className="eyebrow text-black mt-1.5">PYQs</div>
          </Card>
        </Link>
      </div>

      <div className="eyebrow text-black mt-7 mb-3 inline-block nb-sm bg-[var(--mint)] px-2 py-1">Topics</div>
      <div className="space-y-2.5 stagger">
        {u.topics.map((t, i) => (
          <Link key={t.slug} to={`${base}/t/${t.slug}`}>
            <Card onClick={() => {}} className="flex items-center gap-3 py-3">
              <span className="grid place-items-center w-8 h-8 nb-sm bg-[var(--sun)] font-mono2 font-bold text-sm shrink-0">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-black text-sm">{t.title}</div>
                {t.summary && <div className="text-xs text-black/60 line-clamp-1 mt-0.5">{t.summary}</div>}
              </div>
              {t.minutes && <Pill tone="sun">{t.minutes}m</Pill>}
              <span className="font-display font-bold text-lg">→</span>
            </Card>
          </Link>
        ))}
        {u.topics.length === 0 && <p className="text-black/60 text-sm">No topics yet.</p>}
      </div>
    </Page>
  )
}
