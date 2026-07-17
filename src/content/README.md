# Content authoring guide

This app is **content-driven**. Code is written once; everything below is just files you drop in.
Nothing here needs imports or registration beyond `subjects.ts`.

## Folder layout

```
content/
  subjects.ts                      # register subject + unit titles (only manual step)
  <subject>/
    unit<N>/
      topics/
        01-intro.md                # one markdown file per topic
        02-...md
      <subject>-u<N>.quiz.json      # MCQs   (optional)
      <subject>-u<N>.cards.json     # cards  (optional)
      <subject>-u<N>.pyq.json       # PYQs   (optional)
```

The registry auto-discovers `topics/*.md`, `*.quiz.json`, `*.cards.json`, `*.pyq.json`
via `import.meta.glob`. Sort order, grouping and titles all come from frontmatter / json fields.

## Topic markdown frontmatter (required keys: subject, unit, slug, title)

```md
---
subject: ml
unit: 1
order: 1
slug: introduction
title: Introduction to Machine Learning
summary: What ML is, Mitchell's <P,T,E>, the ML pipeline.
minutes: 12
tags: [definition, P-T-E, pipeline]
---

# Heading...
```

## Rich content features available in topic markdown

- **Tables, lists, GFM** — standard markdown.
- **Math** — inline `$...$` and block `$$...$$` (KaTeX). e.g. `$H(S)=-\sum p_i\log_2 p_i$`.
- **Callouts** — a blockquote whose first line is `[!TYPE]`:
  - `[!INTUITION]` 💡 plain-English intuition
  - `[!EXAM]` 🎯 what the exam asks / how to score
  - `[!TRAP]` ⚠️ common mistakes
  - `[!DERIVE]` 🧮 step-by-step derivation
  - `[!NOTE]` 📌 side note

```md
> [!EXAM]
> Be able to compute entropy and information gain by hand for a 4-row table.
```

## Quiz JSON (`*.quiz.json`)

```json
{
  "subject": "ml", "unit": 1, "title": "Unit 1 MCQs",
  "items": [
    {
      "id": "ml-u1-001",
      "topic": "decision-trees",
      "q": "Entropy of a pure node is:",
      "options": ["0", "1", "log2(n)", "undefined"],
      "answer": 0,
      "explain": "A pure node has $p=1$, so $-1\\log_2 1 = 0$.",
      "difficulty": "easy",
      "source": "slide"
    }
  ]
}
```
`answer` is an index, or an array of indices for select-all-that-apply.

## Flashcards JSON (`*.cards.json`)

```json
{ "subject": "ml", "unit": 1, "cards": [ { "id": "c1", "front": "...", "back": "..." } ] }
```

## PYQ JSON (`*.pyq.json`)

```json
{ "subject": "ml", "unit": 1, "items": [ { "id": "p1", "year": "2023 ESA", "marks": 6, "q": "...", "answer": "..." } ] }
```
