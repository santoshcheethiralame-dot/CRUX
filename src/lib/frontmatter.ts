// Tiny zero-dependency YAML-ish frontmatter parser.
// Supports the small subset we need: strings, numbers, booleans, and inline arrays.
// Avoids pulling gray-matter (which needs Buffer polyfills in the browser).

export function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw)
  if (!match) return { data: {}, body: raw }

  const data: Record<string, unknown> = {}
  const lines = match[1].split(/\r?\n/)
  for (const line of lines) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    data[key] = coerce(value)
  }
  return { data, body: raw.slice(match[0].length) }
}

function coerce(value: string): unknown {
  if (value === '') return ''
  // inline array: [a, b, c]
  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim()
    if (!inner) return []
    return inner.split(',').map((s) => stripQuotes(s.trim()))
  }
  if (value === 'true') return true
  if (value === 'false') return false
  // number
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value)
  return stripQuotes(value)
}

function stripQuotes(s: string): string {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1)
  }
  return s
}
