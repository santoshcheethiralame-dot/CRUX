/**
 * CRUX mascot — "Cruxbot", a blocky focus-bot. The crosshair eye echoes the Logo mark
 * ("zero in on the crux"). Self-contained sticker: black strokes + flat accent fills,
 * so it reads on any surface (light or dark canvas).
 *
 *  tone  — face fill (defaults to sun; pass a subject colour to theme it)
 *  expr  — 'focus' (default, determined), 'happy' (celebration), 'oops' (empty states)
 */
export function Mascot({
  size = 96,
  tone = 'var(--sun)',
  expr = 'focus',
}: {
  size?: number
  tone?: string
  expr?: 'focus' | 'happy' | 'oops'
}) {
  return (
    <svg viewBox="0 0 120 116" width={size} height={(size * 116) / 120} aria-hidden role="img">
      {/* hard offset shadow */}
      <rect x="26" y="36" width="76" height="64" rx="16" fill="#000" />

      {/* antenna + idea bulb */}
      <path d="M60 30V17" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="11" r="6" fill="var(--lime)" stroke="#000" strokeWidth="4" />
      <path d="M49 7l-4-4M71 7l4-4M60 1V-3" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />

      {/* head */}
      <rect x="20" y="30" width="76" height="64" rx="16" fill={tone} stroke="#000" strokeWidth="4" />

      {/* left eye — crosshair (the "focus" eye) */}
      <circle cx="44" cy="56" r="9.5" fill="#fff" stroke="#000" strokeWidth="3.5" />
      <path d="M44 48v16M36 56h16" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />

      {/* right eye — varies by mood */}
      {expr === 'happy' ? (
        <path d="M64 58q8 -9 16 0" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <>
          <circle cx="72" cy="56" r="9.5" fill="#fff" stroke="#000" strokeWidth="3.5" />
          <circle cx={expr === 'oops' ? 72 : 73.5} cy={expr === 'oops' ? 58 : 56} r="3.6" fill="#000" />
        </>
      )}

      {/* cheeks */}
      <rect x="27" y="66" width="9" height="6" rx="2" fill="var(--bubble)" stroke="#000" strokeWidth="2" />
      <rect x="84" y="66" width="9" height="6" rx="2" fill="var(--bubble)" stroke="#000" strokeWidth="2" />

      {/* mouth */}
      {expr === 'happy' ? (
        <path d="M47 78q13 14 26 0" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      ) : expr === 'oops' ? (
        <path d="M50 84q10 -10 20 0" fill="none" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <path d="M49 81h22" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      )}

      {/* feet */}
      <rect x="37" y="96" width="14" height="11" rx="3" fill="#000" />
      <rect x="65" y="96" width="14" height="11" rx="3" fill="#000" />
    </svg>
  )
}
