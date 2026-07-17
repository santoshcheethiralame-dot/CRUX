/** CRUX crosshair mark — "zero in on the crux". Black strokes, sits inside a coloured tile. */
export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden>
      <circle cx="16" cy="16" r="8.5" fill="none" stroke="#000" strokeWidth="3" />
      <path
        d="M16 2.5v7M16 22.5v7M2.5 16h7M22.5 16h7"
        stroke="#000"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
