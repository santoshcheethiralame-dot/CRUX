// Build print-ready B&W HTML (one file per unit) from the topic markdown.
//
//   node tools/print-notes.mjs [--compact]
//
// Renders through the same remark/rehype stack the app uses, so the output
// matches what you read on screen — then swaps the screen styling for a print
// sheet: black on white, no colour, callouts told apart by border style and a
// label instead of a tint and an emoji.
//
// --compact  runs topics on continuously instead of starting each on a new page.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import { visit } from 'unist-util-visit'
import { toHtml } from 'hast-util-to-html'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// Default is continuous flow — topics run on, separated by a rule, so no page
// is left half empty. `--pagebreak` puts each topic on a fresh page instead.
const PAGEBREAK = process.argv.includes('--pagebreak')
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7)
const OUT = path.join(ROOT, 'print-out', PAGEBREAK ? 'pagebreak' : 'dense')

const ALL_UNITS = [
  ['ml', 1, 'Machine Learning'],
  ['ml', 2, 'Machine Learning'],
  ['dbms', 1, 'Database Management Systems'],
  ['dbms', 2, 'Database Management Systems'],
  ['erp', 1, 'Enterprise Resource Planning'],
  ['erp', 2, 'Enterprise Resource Planning'],
  ['se', 1, 'Software Engineering'],
  ['se', 2, 'Software Engineering'],
  ['arvr', 1, 'Augmented & Virtual Reality'],
  ['arvr', 2, 'Augmented & Virtual Reality'],
]
const UNITS = only ? ALL_UNITS.filter(([s]) => only.split(',').includes(s)) : ALL_UNITS

const CALLOUT = {
  INTUITION: 'Intuition',
  EXAM: 'Exam Focus',
  TRAP: 'Common Trap',
  NOTE: 'Note',
  DERIVE: 'Derivation',
}

// Turn `> [!EXAM] ...` blockquotes into labelled divs, mirroring Markdown.tsx.
function rehypeCallouts() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'blockquote') return
      const firstP = node.children.find((c) => c.type === 'element' && c.tagName === 'p')
      if (!firstP) return
      const firstText = firstP.children[0]
      if (!firstText || firstText.type !== 'text') return
      const m = /^\[!(\w+)\]\s?/.exec(firstText.value)
      if (!m) return
      const type = m[1].toUpperCase()
      if (!CALLOUT[type]) return

      firstText.value = firstText.value.slice(m[0].length)
      const body = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()))
      node.tagName = 'div'
      node.properties = { className: ['callout', 'c-' + type.toLowerCase()] }
      node.children = [
        {
          type: 'element',
          tagName: 'div',
          properties: { className: ['callout-label'] },
          children: [{ type: 'text', value: CALLOUT[type] }],
        },
        { type: 'element', tagName: 'div', properties: { className: ['callout-body'] }, children: body },
      ]
    })
  }
}

// Emoji print as grey blobs (or tofu) on a mono laser printer. Strip the
// decorative ones; keep the warning sign as a text marker since several
// callouts lean on it to mark a trap mid-sentence.
function deEmoji(md) {
  return md
    .replace(/⚠️️?/g, '**!** ')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2190}-\u{21FF}]/gu, (ch) =>
      ({ '→': '→', '←': '←', '↔': '↔', '↑': '↑', '↓': '↓' }[ch] ?? '')
    )
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype)
  .use(rehypeKatex, { throwOnError: false, strict: false, output: 'html' })
  .use(rehypeCallouts)

function readTopics(subject, unit) {
  const dir = path.join(ROOT, 'src', 'content', subject, `unit${unit}`, 'topics')
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8')
      const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(raw)
      const meta = Object.fromEntries(
        (fm ? fm[1] : '').split(/\r?\n/).map((l) => {
          const i = l.indexOf(':')
          return i < 0 ? ['', ''] : [l.slice(0, i).trim(), l.slice(i + 1).trim()]
        })
      )
      return { order: Number(meta.order), title: meta.title || f, body: raw.slice(fm ? fm[0].length : 0) }
    })
    .sort((a, b) => a.order - b.order)
}

const katexCss = fs.readFileSync(path.join(ROOT, 'node_modules/katex/dist/katex.min.css'), 'utf8')
const fontsUrl = 'file:///' + path.join(ROOT, 'node_modules/katex/dist/fonts/').replace(/\\/g, '/')

const SHEET = `
@page { size: A4; margin: 11mm 10mm 11mm 10mm; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body {
  margin: 0; background: #fff; color: #000;
  font-family: "Segoe UI", "Inter", system-ui, sans-serif;
  font-size: 9.2pt; line-height: 1.28;
  text-rendering: optimizeLegibility;
  hyphens: auto;
}
.unit-head { border-bottom: 2.5pt solid #000; padding-bottom: 5pt; margin-bottom: 11pt; }
.unit-head .sub { font-size: 8pt; letter-spacing: .14em; text-transform: uppercase; }
.unit-head h1 { font-size: 17pt; margin: 3pt 0 0; letter-spacing: -.01em; }
.toc { font-size: 8.6pt; margin-bottom: 12pt; columns: 2; column-gap: 14pt; }
.toc div { break-inside: avoid; margin-bottom: 1.5pt; }

.topic { ${PAGEBREAK ? 'break-before: page;' : 'margin-top: 11pt;'} }
.topic:first-of-type { break-before: auto; margin-top: 0; }
h1.t { font-size: 11.8pt; margin: 0 0 5pt; padding-bottom: 2.5pt; border-bottom: 1.2pt solid #000; break-after: avoid; }
h1.t .n { font-variant-numeric: tabular-nums; margin-right: 5pt; }
/* A body-level "# " inside a topic is a major section, not a new topic — it must
   not outrank the topic title above it. */
h1:not(.t) { font-size: 10.7pt; margin: 9pt 0 3pt; padding-bottom: 1.5pt;
             border-bottom: .5pt solid #666; break-after: avoid; }
h2 { font-size: 10.2pt; margin: 8pt 0 3pt; break-after: avoid; }
h3 { font-size: 9.5pt; margin: 6pt 0 2.5pt; break-after: avoid; }
p { margin: 0 0 3.6pt; orphans: 2; widows: 2; }
strong { font-weight: 700; }
em { font-style: italic; }
ul, ol { margin: 0 0 5pt; padding-left: 15pt; }
li { margin-bottom: 1.6pt; }
li > p { margin-bottom: 2pt; }
code { font-family: "Cascadia Mono", Consolas, monospace; font-size: 8.6pt;
       background: #eee; padding: .5pt 2pt; border-radius: 2pt; }
/* Diagrams must never wrap or shrink unevenly — a wrapped box-drawing line is
   unreadable. Fixed size, no wrap, keep the whole block on one page. */
pre { background: #f6f6f6; border: .5pt solid #999; padding: 3.5pt 5pt;
      font-size: 7.9pt; line-height: 1.18; white-space: pre; overflow: hidden;
      break-inside: avoid; margin: 0 0 4.5pt; }
pre code { font-variant-ligatures: none; }
pre code { background: none; padding: 0; }
hr { border: 0; border-top: .6pt solid #aaa; margin: 8pt 0; }
a { color: #000; text-decoration: none; }

table { width: 100%; border-collapse: collapse; font-size: 8.4pt; margin: 0 0 6pt; }
th, td { border: .5pt solid #555; padding: 2.4pt 4pt; text-align: left; vertical-align: top; }
th { background: #e4e4e4; font-weight: 700; }
tr { break-inside: avoid; }
thead { display: table-header-group; }

.callout { border-left: 2.5pt solid #000; padding: 3pt 0 1.5pt 6pt; margin: 0 0 4.5pt; }
.callout-label { font-size: 7.2pt; font-weight: 700; letter-spacing: .11em;
                 text-transform: uppercase; margin-bottom: 2pt; break-after: avoid; }
.callout-body > *:last-child { margin-bottom: 0; }
/* Told apart by border treatment, not colour. */
.c-exam      { border-left-style: solid; }
.c-trap      { border-left-style: double; border-left-width: 4pt; }
.c-intuition { border-left-style: dashed; }
.c-derive    { border-left-style: dotted; border-left-width: 3.5pt; }
.c-note      { border-left-width: 1pt; }
.c-exam .callout-label::before      { content: "\\25A0\\2002"; }
.c-trap .callout-label::before      { content: "\\25B2\\2002"; }
.c-intuition .callout-label::before { content: "\\25CB\\2002"; }
.c-derive .callout-label::before    { content: "\\25C7\\2002"; }
.c-note .callout-label::before      { content: "\\2014\\2002"; }

blockquote { margin: 0 0 5pt; padding-left: 7pt; border-left: .8pt solid #888; font-style: italic; }
.katex-display { margin: 5pt 0; break-inside: avoid; }
.katex { font-size: 1em; }
img { max-width: 100%; }
`

fs.mkdirSync(OUT, { recursive: true })
const manifest = []

for (const [subject, unit, subjectName] of UNITS) {
  const topics = readTopics(subject, unit)
  const parts = []

  for (const t of topics) {
    const hast = await processor.run(processor.parse(deEmoji(t.body)))
    let html = toHtml(hast)
    // The body's own `# Title` duplicates the frontmatter title; drop it and
    // use a numbered heading instead.
    html = html.replace(/^\s*<h1>[\s\S]*?<\/h1>/, '')
    parts.push(
      `<section class="topic"><h1 class="t"><span class="n">${t.order}.</span>${escapeHtml(t.title)}</h1>${html}</section>`
    )
  }

  const toc = topics
    .map((t) => `<div>${t.order}. ${escapeHtml(t.title)}</div>`)
    .join('')

  const doc = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${escapeHtml(subjectName)} — Unit ${unit}</title>
<style>${katexCss.replace(/fonts\//g, fontsUrl)}</style>
<style>${SHEET}</style>
</head><body>
<div class="unit-head"><div class="sub">${escapeHtml(subjectName)}</div><h1>Unit ${unit}</h1></div>
<div class="toc">${toc}</div>
${parts.join('\n')}
</body></html>`

  const file = path.join(OUT, `${subject}-unit${unit}.html`)
  fs.writeFileSync(file, doc, 'utf8')
  manifest.push({ subject, unit, subjectName, topics: topics.length, file })
  console.log(`  ${subject} u${unit}  ${String(topics.length).padStart(2)} topics  ->  ${path.basename(file)}`)
}

fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2))
console.log(`\n${manifest.length} files in ${OUT}`)

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
}
