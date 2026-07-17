import { NavLink } from 'react-router-dom'
import { subjects, getSubject, getUnit, unitStats } from '../lib/registry'
import { isDone, doneCount } from '../lib/progress'
import { useProgress } from '../lib/useProgress'
import { useRouteInfo } from '../lib/useRouteInfo'

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  useProgress()
  const { subject, unit: unitNum, slug } = useRouteInfo()
  const subj = subject ? getSubject(subject) : undefined
  const u = subject && unitNum ? getUnit(subject, unitNum) : undefined
  const showUnitNav = !!u

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky top-16 z-20 h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-auto border-r-[3px] border-black p-3 bg-[var(--bg-soft)] pat-host transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pat-layer pat-dots-soft opacity-40" />
        {showUnitNav && subj && unitNum ? (
          <UnitNav subjectId={subj.id} unitNum={unitNum} activeSlug={slug} onNavigate={onClose} />
        ) : (
          <SubjectList />
        )}
      </aside>
    </>
  )
}

/** Tiny conic progress ring with a number in the hole. */
function Ring({ pct, color = 'var(--lime)' }: { pct: number; color?: string }) {
  return (
    <span className="ring w-9 h-9 shrink-0" style={{ ['--p' as string]: pct, ['--ring' as string]: color }}>
      <span className="ring-hole w-[26px] h-[26px] font-mono2 font-bold text-[10px] text-black">{pct}</span>
    </span>
  )
}

function SubjectList() {
  return (
    <div className="space-y-2.5">
      <div className="eyebrow text-black/70 px-1 py-1">All subjects</div>
      {subjects.map((s) => {
        const ids = s.units.flatMap((u) => u.topics.map((t) => t.id))
        const done = doneCount(ids)
        const total = ids.length
        const pct = total ? Math.round((done / total) * 100) : 0
        const ready = total > 0
        return (
          <NavLink
            key={s.id}
            to={`/s/${s.id}`}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-2.5 py-2 nb-sm transition-transform ${
                isActive ? 'bg-black text-white' : 'bg-[var(--panel)] text-black hover:-translate-y-[2px] hover:translate-x-[1px]'
              } ${ready ? '' : 'opacity-55'}`
            }
          >
            <span
              className="grid place-items-center w-8 h-8 text-[11px] font-mono2 font-extrabold text-black border-2 border-black shrink-0"
              style={{ background: s.color, borderRadius: 7 }}
            >
              {s.icon}
            </span>
            <span className="flex-1 min-w-0">
              <span className="font-display font-bold text-sm leading-tight block truncate">{s.name}</span>
              <span className="eyebrow opacity-60 text-[10px]">{ready ? `${s.units.length} units` : 'soon'}</span>
            </span>
            {ready && <Ring pct={pct} color={s.color} />}
          </NavLink>
        )
      })}
    </div>
  )
}

function UnitNav({
  subjectId,
  unitNum,
  activeSlug,
  onNavigate,
}: {
  subjectId: string
  unitNum: number
  activeSlug?: string
  onNavigate: () => void
}) {
  const subj = getSubject(subjectId)!
  const u = getUnit(subjectId, unitNum)!
  const stats = unitStats(subjectId, unitNum)
  const base = `/s/${subjectId}/u/${unitNum}`
  const done = doneCount(u.topics.map((t) => t.id))
  const pct = u.topics.length ? Math.round((done / u.topics.length) * 100) : 0

  return (
    <div>
      <NavLink to={`/s/${subjectId}`} className="eyebrow text-black/60 hover:underline inline-flex items-center gap-1 mb-2">
        ← All subjects
      </NavLink>

      {/* Unit header card with progress ring */}
      <div className="nb-sm p-2.5 mb-2 flex items-center gap-2.5" style={{ background: subj.color }}>
        <Ring pct={pct} color="var(--panel)" />
        <div className="min-w-0">
          <div className="eyebrow text-black/70">Unit {unitNum}</div>
          <div className="font-display font-bold text-sm text-black leading-tight line-clamp-2">{u.title}</div>
        </div>
      </div>

      {/* Unit switcher pips */}
      <div className="flex items-center gap-1.5 mb-3 px-0.5">
        <span className="eyebrow text-black/55 mr-0.5">UNIT</span>
        {subj.units.map((un) => {
          const active = un.unit === unitNum
          const built = un.topics.length > 0
          return (
            <NavLink
              key={un.unit}
              to={`/s/${subjectId}/u/${un.unit}`}
              onClick={onNavigate}
              title={`Unit ${un.unit}: ${un.title}`}
              className={`grid place-items-center w-7 h-7 nb-border font-mono2 font-bold text-[12px] transition-transform hover:-translate-y-[2px] ${
                active ? 'bg-black text-white' : built ? 'bg-[var(--panel)] text-black' : 'bg-transparent text-black/40'
              }`}
              style={{ borderWidth: 2, borderRadius: 7 }}
            >
              {un.unit}
            </NavLink>
          )
        })}
      </div>

      <div className="eyebrow text-black/70 px-1 mb-1.5">Topics · {done}/{u.topics.length}</div>
      <nav className="space-y-1.5">
        {u.topics.map((t, i) => {
          const active = t.slug === activeSlug
          const isDoneTopic = isDone(t.id)
          return (
            <NavLink
              key={t.slug}
              to={`${base}/t/${t.slug}`}
              onClick={onNavigate}
              className={`group flex items-start gap-2 px-2.5 py-1.5 text-sm leading-snug nb-sm transition-transform ${
                active ? 'bg-black text-white' : 'bg-[var(--panel)] text-black hover:-translate-y-[2px] hover:translate-x-[1px]'
              }`}
            >
              <span
                className={`mt-px grid place-items-center w-5 h-5 text-[10px] font-bold shrink-0 border-2 border-black ${
                  isDoneTopic ? 'bg-[var(--lime)] text-black' : active ? 'bg-white/20 text-transparent' : 'bg-[var(--panel)] text-transparent'
                }`}
                style={{ borderRadius: 5 }}
              >
                ✓
              </span>
              <span className="font-display">
                <span className={active ? 'text-white/55' : 'text-black/40'}>{i + 1}.</span> {t.title}
              </span>
            </NavLink>
          )
        })}
      </nav>

      <div className="eyebrow text-black/70 px-1 mt-4 mb-1.5">Practice</div>
      <div className="space-y-1.5">
        <PracticeLink to={`${base}/quiz`} swatch="var(--lime)" label="MCQ Quiz" n={stats.quizzes} onNavigate={onNavigate} />
        <PracticeLink to={`${base}/cards`} swatch="var(--bubble)" label="Flashcards" n={stats.cards} onNavigate={onNavigate} />
        <PracticeLink to={`${base}/pyq`} swatch="var(--sky)" label="PYQs" n={stats.pyqs} onNavigate={onNavigate} />
      </div>
    </div>
  )
}

function PracticeLink({ to, swatch, label, n, onNavigate }: { to: string; swatch: string; label: string; n: number; onNavigate: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center justify-between px-2.5 py-2 text-sm font-display font-semibold nb-sm transition-transform ${
          isActive ? 'bg-black text-white' : 'bg-[var(--panel)] text-black hover:-translate-y-[2px] hover:translate-x-[1px]'
        }`
      }
    >
      <span className="flex items-center gap-2">
        <span className="w-4 h-4 border-2 border-black shrink-0" style={{ background: swatch, borderRadius: 4 }} />
        {label}
      </span>
      <span className="text-[11px] font-mono2 font-bold px-1.5 border-2 border-black bg-[var(--sun)] text-black" style={{ borderRadius: 999 }}>
        {n}
      </span>
    </NavLink>
  )
}
