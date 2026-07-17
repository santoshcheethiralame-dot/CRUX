# CRUX

*Ace every concept.* A rigorous, exam-tuned study app — built to chase a **10 GPA at PES**. Five subjects × four units each, with deeply-explained notes, interactive MCQ quizzes, flashcards, and past-year questions. Neobrutalist UI (patterns, bold colour blocks, hard shadows).

> Currently live: **Machine Learning (CS352A)** — all 4 units · **Software Engineering (UE23CS341A)** — all 4 units (61 topics, 274 MCQs, 197 flashcards, 66 PYQs) · **Database Management Systems (UE23CS351A)** — all 4 units (60 topics, 333 MCQs incl. textbook exercises, 222 flashcards, 54 PYQs from real PES ESA papers): U1 Intro & SQL, U2 Advanced SQL, U3 Design Concepts & Normalization, U4 Next-Gen Data Management (transactions, concurrency, NoSQL, Redis, Neo4j, vector DBs).

## Run it

```bash
npm install      # first time only
npm run dev      # http://localhost:5173
```

## Build / deploy (static)

```bash
npm run build    # outputs ./dist  (fully static, base='./')
npm run preview  # preview the production build locally
```

`dist/` is a static site — drop it on **GitHub Pages, Vercel, Netlify**, or any static host. It uses `HashRouter`, so deep links work on any host with no server config.

## Architecture (why adding content is cheap)

The app is **content-driven**. The React code is written once; all study material lives in data files that are **auto-discovered** at load (`import.meta.glob`). To add a unit you drop files in — no code changes (except registering a new subject/unit title once in `subjects.ts`).

```
src/
  content/
    subjects.ts                 # ← the ONLY manual registration (subject + unit titles)
    README.md                   # full authoring contract (frontmatter, callouts, JSON schemas)
    ml/unit1/
      topics/01-….md … 14-….md  # one markdown file per topic (frontmatter + body)
      ml-u1.quiz.json           # MCQs
      ml-u1.cards.json          # flashcards
      ml-u1.pyq.json            # past-year questions (add later)
  lib/        registry · frontmatter · progress · types   (the engine)
  components/ Layout · Sidebar · Markdown · ui
  pages/      Home · Subject · Unit · Topic · Quiz · Flashcards · PYQ
```

### Authoring features
- **KaTeX math** — `$inline$` and `$$block$$`.
- **Callouts** — blockquote starting with `[!INTUITION]`, `[!EXAM]`, `[!TRAP]`, `[!DERIVE]`, `[!NOTE]`.
- **GFM tables**, code blocks, etc.
- See [`src/content/README.md`](src/content/README.md) for the full contract.

## Adding the next unit / subject (recipe)

1. (New subject only) add an entry to `src/content/subjects.ts`.
2. Create `src/content/<subject>/unit<N>/topics/` and add `NN-slug.md` files with frontmatter.
3. (Optional) add `<subject>-u<N>.quiz.json`, `.cards.json`, `.pyq.json`.
4. Done — it appears automatically.

## Stack
Vite · React 18 · TypeScript · Tailwind v4 · react-markdown · remark-math · rehype-katex.
