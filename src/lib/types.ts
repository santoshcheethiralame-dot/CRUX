// ----- Core domain types for the whole study app -----
// The app is content-driven: subjects -> units -> topics, plus quizzes/flashcards/pyqs.
// Adding new material = dropping new .md / .json files (see content/README).

export type Difficulty = 'easy' | 'medium' | 'hard'

/** Frontmatter every topic .md file must declare. */
export interface TopicFrontmatter {
  subject: string // subject id, e.g. "ml"
  unit: number // unit number, e.g. 1
  order: number // sort order within the unit
  slug: string // url-safe id, unique within unit, e.g. "decision-trees"
  title: string // display title
  summary?: string // one-line description for cards/sidebar
  minutes?: number // estimated read time
  tags?: string[] // e.g. ["ID3","entropy"]
}

export interface Topic extends TopicFrontmatter {
  id: string // `${subject}/u${unit}/${slug}`
  body: string // markdown content (frontmatter stripped)
}

export interface Unit {
  subject: string
  unit: number
  title: string
  subtitle?: string
  topics: Topic[]
}

export interface Subject {
  id: string // "ml"
  name: string // "Machine Learning"
  code?: string // "CS352A"
  color: string // accent hex
  icon?: string // emoji or short label
  description?: string
  units: Unit[]
}

// ----- Assessment content -----

export interface MCQ {
  id: string
  topic?: string // topic slug this question maps to
  q: string // question (markdown/katex ok)
  options: string[] // answer options (markdown/katex ok)
  answer: number | number[] // index/indices of correct option(s)
  explain?: string // explanation shown after answering
  difficulty?: Difficulty
  source?: 'slide' | 'pyq' | 'original' | 'textbook'
}

export interface QuizSet {
  subject: string
  unit: number
  title?: string
  items: MCQ[]
}

export interface Flashcard {
  id: string
  topic?: string
  front: string
  back: string
  difficulty?: Difficulty
}

export interface CardSet {
  subject: string
  unit: number
  title?: string
  cards: Flashcard[]
}

export interface PYQ {
  id: string
  topic?: string
  year?: string // "2023 ESA", "2022 ISA-1" etc.
  marks?: number
  q: string
  answer?: string // model answer (markdown/katex)
  difficulty?: Difficulty
}

export interface PYQSet {
  subject: string
  unit: number
  title?: string
  items: PYQ[]
}
