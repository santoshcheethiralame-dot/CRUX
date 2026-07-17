import type { ReactNode } from 'react'

export function Page({ children }: { children: ReactNode }) {
  return <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 fade-up">{children}</div>
}

/** Big chunky section title with a coloured highlight block. */
export function SectionTitle({ children, color = 'var(--sun)' }: { children: ReactNode; color?: string }) {
  return (
    <h2 className="display-title text-[1.9rem] sm:text-[2.4rem] my-1">
      <span className="inline-block px-2 nb-border" style={{ background: color, boxShadow: '4px 4px 0 #000', borderRadius: 10 }}>
        {children}
      </span>
    </h2>
  )
}

export function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = total ? Math.round((value / total) * 100) : 0
  return (
    <div className="w-full h-4 nb-border bg-[var(--panel)] overflow-hidden" style={{ borderRadius: 999 }}>
      <div
        className={`h-full transition-all duration-500 ${pct > 0 ? 'progress-shine' : ''}`}
        style={{ width: `${pct}%`, borderRight: pct > 0 && pct < 100 ? '3px solid #000' : 'none' }}
      />
    </div>
  )
}

const TONES: Record<string, string> = {
  default: 'var(--panel)',
  brand: 'var(--grape)',
  accent: 'var(--lime)',
  pink: 'var(--bubble)',
  sun: 'var(--sun)',
  sky: 'var(--sky)',
}

export function Pill({ children, tone = 'default' }: { children: ReactNode; tone?: keyof typeof TONES }) {
  return (
    <span
      className="inline-flex items-center text-[11px] font-mono2 font-bold px-2 py-0.5 nb-border text-black"
      style={{ background: TONES[tone] ?? TONES.default, borderRadius: 999, borderWidth: 2 }}
    >
      {children}
    </span>
  )
}

export function Card({
  children,
  className = '',
  onClick,
  color = 'var(--panel)',
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  color?: string
}) {
  return (
    <div
      onClick={onClick}
      className={`nb ${onClick ? 'nb-press cursor-pointer' : ''} p-4 ${className}`}
      style={{ background: color }}
    >
      {children}
    </div>
  )
}

/** Neobrutalist button. */
export function Button({
  children,
  onClick,
  color = 'var(--lime)',
  className = '',
  disabled,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  color?: string
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`nb-sm ${disabled ? 'opacity-50' : 'nb-press'} font-display font-bold text-black px-4 py-2 ${className}`}
      style={{ background: color }}
    >
      {children}
    </button>
  )
}
