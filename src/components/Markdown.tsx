import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { ReactNode } from 'react'

const CALLOUT_META: Record<string, { cls: string; label: string; icon: string }> = {
  INTUITION: { cls: 'intuition', label: 'Intuition', icon: '💡' },
  EXAM: { cls: 'exam', label: 'Exam Focus', icon: '🎯' },
  TRAP: { cls: 'trap', label: 'Common Trap', icon: '⚠️' },
  NOTE: { cls: 'note', label: 'Note', icon: '📌' },
  DERIVE: { cls: 'derive', label: 'Derivation', icon: '🧮' },
}

// Extract leading "[!TYPE]" marker from a blockquote's first text node.
function readCallout(children: ReactNode): { type: keyof typeof CALLOUT_META; rest: ReactNode } | null {
  const arr = Array.isArray(children) ? children : [children]
  // Find first paragraph element
  for (let i = 0; i < arr.length; i++) {
    const node: any = arr[i]
    if (node?.type === 'p' || node?.props?.node?.tagName === 'p') {
      const pChildren = node.props.children
      const first = Array.isArray(pChildren) ? pChildren[0] : pChildren
      if (typeof first === 'string') {
        const m = /^\[!(\w+)\]\s?/.exec(first)
        if (m && CALLOUT_META[m[1].toUpperCase()]) {
          const type = m[1].toUpperCase() as keyof typeof CALLOUT_META
          const trimmed = first.slice(m[0].length)
          const newP = {
            ...node,
            props: {
              ...node.props,
              children: Array.isArray(pChildren) ? [trimmed, ...pChildren.slice(1)] : trimmed,
            },
          }
          const rest = [...arr.slice(0, i), newP, ...arr.slice(i + 1)]
          return { type, rest }
        }
      }
    }
  }
  return null
}

/** Flatten a React children tree to plain text (for heading slugs). */
function nodeText(node: ReactNode): string {
  if (node == null || node === false) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeText).join('')
  if (typeof node === 'object' && 'props' in (node as any)) return nodeText((node as any).props?.children)
  return ''
}
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60)

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: false }]]}
        components={{
          h2: ({ children }) => <h2 id={slugify(nodeText(children))}>{children}</h2>,
          h3: ({ children }) => <h3 id={slugify(nodeText(children))}>{children}</h3>,
          table({ children }) {
            return (
              <div className="table-wrap">
                <table>{children}</table>
              </div>
            )
          },
          blockquote({ children }) {
            const callout = readCallout(children)
            if (callout) {
              const meta = CALLOUT_META[callout.type]
              return (
                <div className={`callout ${meta.cls}`}>
                  <div className="callout-title">
                    <span>{meta.icon}</span>
                    {meta.label}
                  </div>
                  <div className="callout-body">{callout.rest}</div>
                </div>
              )
            }
            return <blockquote>{children}</blockquote>
          },
          a({ href, children }) {
            const external = href?.startsWith('http')
            return (
              <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
                {children}
              </a>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
