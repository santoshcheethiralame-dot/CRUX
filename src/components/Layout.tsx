import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { getSubject } from '../lib/registry'
import { useRouteInfo } from '../lib/useRouteInfo'
import { Logo } from './Logo'

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const { subject } = useRouteInfo()
  const subj = subject ? getSubject(subject) : undefined

  // theme: restore + apply per-subject accent
  useEffect(() => {
    const isDark = localStorage.getItem('crux-theme') === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    setDark(isDark)
  }, [])
  useEffect(() => {
    document.documentElement.style.setProperty('--subject', subj?.color ?? 'var(--grape)')
  }, [subj?.color])

  function toggleTheme() {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('crux-theme', next ? 'dark' : 'light')
    setDark(next)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex items-center gap-3 px-4 h-16 border-b-[3px] border-black bg-[var(--bg-soft)] pat-host">
        <div className="pat-layer pat-diag opacity-40" />
        <button
          className="lg:hidden grid place-items-center w-10 h-10 nb-sm bg-[var(--lime)] text-black text-xl"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <Link to="/" className="flex items-center gap-2">
          <span className="grid place-items-center w-9 h-9 nb-sm bg-[var(--lime)]">
            <Logo size={22} />
          </span>
          <span className="font-display font-bold text-xl tracking-tight text-black">CRUX</span>
        </Link>
        {subj && (
          <>
            <span className="text-black/40 font-bold">/</span>
            <Link
              to={`/s/${subj.id}`}
              className="text-sm font-mono2 font-bold text-black flex items-center gap-1.5 px-2 py-1 nb-sm"
              style={{ background: subj.color }}
            >
              <span className="grid place-items-center w-5 h-5 text-[10px] bg-black text-white" style={{ borderRadius: 4 }}>{subj.icon}</span>
              {subj.name}
            </Link>
          </>
        )}
        <div className="ml-auto flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle night mode"
            title={dark ? 'Switch to day' : 'Switch to night-grind'}
            className="grid place-items-center w-9 h-9 nb-sm nb-press text-base"
            style={{ background: dark ? 'var(--sun)' : 'var(--panel)' }}
          >
            {dark ? '☀' : '☾'}
          </button>
          <span className="eyebrow text-black sticker bg-[var(--sun)] px-2.5 py-1 tilt-r hidden sm:inline-block">★ AIMING 10 GPA</span>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  )
}
