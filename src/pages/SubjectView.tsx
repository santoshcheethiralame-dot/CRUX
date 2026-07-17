import { Link, useParams, Navigate } from 'react-router-dom'
import { getSubject, unitStats } from '../lib/registry'
import { doneCount } from '../lib/progress'
import { useProgress } from '../lib/useProgress'
import { Page, Card, ProgressBar, Pill, SectionTitle } from '../components/ui'

const UNIT_COLORS = ['var(--lime)', 'var(--sky)', 'var(--bubble)', 'var(--sun)']

export default function SubjectView() {
  useProgress()
  const { subject } = useParams()
  const subj = subject ? getSubject(subject) : undefined
  if (!subj) return <Navigate to="/" replace />

  return (
    <Page>
      <div className="mb-7 flex items-start gap-3">
        <span className="grid place-items-center w-14 h-14 nb-sm text-3xl shrink-0" style={{ background: subj.color }}>
          {subj.icon}
        </span>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="display-title t-xl on-canvas">{subj.name}</h1>
            {subj.code && <Pill tone="brand">{subj.code}</Pill>}
          </div>
          <p className="text-black/70 text-sm mt-1 max-w-xl on-canvas">{subj.description}</p>
        </div>
      </div>

      <SectionTitle color="var(--grape)">Units</SectionTitle>

      <div className="space-y-3 mt-4">
        {subj.units.map((u, i) => {
          const stats = unitStats(subj.id, u.unit)
          const done = doneCount(u.topics.map((t) => t.id))
          const ready = u.topics.length > 0
          const color = ready ? UNIT_COLORS[i % UNIT_COLORS.length] : 'var(--panel)'
          const Inner = (
            <Card color={color} onClick={ready ? () => {} : undefined} className={ready ? '' : 'opacity-70'}>
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-11 h-11 nb-sm bg-[var(--panel)] font-display font-bold shrink-0">
                  U{u.unit}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display font-bold text-black leading-tight">{u.title}</h2>
                  {u.subtitle && <p className="text-xs text-black/65 mt-0.5 line-clamp-1">{u.subtitle}</p>}
                </div>
                {ready ? <span className="font-display font-bold text-xl">→</span> : <Pill>soon</Pill>}
              </div>
              {ready && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1">
                    <ProgressBar value={done} total={u.topics.length} />
                  </div>
                  <span className="eyebrow text-black whitespace-nowrap">
                    {done}/{u.topics.length} · {stats.quizzes} MCQ
                  </span>
                </div>
              )}
            </Card>
          )
          return ready ? (
            <Link key={u.unit} to={`/s/${subj.id}/u/${u.unit}`}>
              {Inner}
            </Link>
          ) : (
            <div key={u.unit}>{Inner}</div>
          )
        })}
      </div>
    </Page>
  )
}
