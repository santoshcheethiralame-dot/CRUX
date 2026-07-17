---
subject: se
unit: 1
order: 6
slug: user-stories-xp-lean
title: User Stories (INVEST), Extreme Programming & Lean
summary: How agile captures requirements as user stories with the INVEST criteria and acceptance criteria; the values and twelve practices of Extreme Programming; and the principles of Lean software development.
minutes: 16
tags: [user-stories, INVEST, XP, extreme-programming, lean, agile]
---

# User Stories, Extreme Programming & Lean

## User stories — requirements, the agile way

Agile teams don't write a giant requirements document up front. They capture needs as **user stories**: short, plain-language descriptions of a feature told from the **user's** point of view. The standard template:

> **As a** `<type of user>`, **I want** `<some goal>`, **so that** `<some reason/benefit>`.

Example:
> *As a* **registered shopper**, *I want to* **save items to a wishlist**, *so that* **I can buy them later without searching again**.

The three parts force you to capture **who** wants it, **what** they want, and **why** (the value).

> [!INTUITION]
> A user story is **"a promise for a conversation,"** not a complete spec. It is a placeholder that reminds the team to discuss the detail with the customer when the story is built. Detail is added *just in time* via **acceptance criteria**.

### Acceptance criteria

Each story carries **acceptance criteria** — the conditions that must be true for the story to be accepted as "done." They make the story **testable** and define the boundaries. Often written as scenarios (*Given… When… Then…*).

### The 3 C's of a user story

- **Card** — the short written story (fits on an index card).
- **Conversation** — the discussion that fleshes out the detail.
- **Confirmation** — the acceptance criteria that confirm it's done.

## INVEST — what makes a *good* user story

A good user story satisfies the **INVEST** checklist (Bill Wake):

| Letter | Criterion | Meaning |
|---|---|---|
| **I** | **Independent** | Self-contained; can be built and delivered on its own, in any order. |
| **N** | **Negotiable** | Not a rigid contract — details are negotiated between team and customer. |
| **V** | **Valuable** | Delivers clear value to a user or customer. |
| **E** | **Estimable** | The team can size/estimate the effort to build it. |
| **S** | **Small** | Small enough to fit comfortably within one iteration/sprint. |
| **T** | **Testable** | Has acceptance criteria so you can verify it's done. |

> [!EXAM]
> **INVEST** = **I**ndependent, **N**egotiable, **V**aluable, **E**stimable, **S**mall, **T**estable. A frequent question: "give the qualities of a good user story." If a story is too big to estimate or test, **split it** ("epic" → smaller stories).

> [!NOTE]
> An **Epic** is a large user story that must be broken down into several smaller stories before it can be built. A **theme** groups related stories. Stories are sized in **story points** (relative effort), not hours.

## Extreme Programming (XP)

**Extreme Programming**, created by Kent Beck, is the most influential agile method on the **engineering** side. The name comes from taking known good practices to "extreme" levels — *if code review is good, review constantly (pair programming); if testing is good, test first (TDD).*

### XP values

**Communication, Simplicity, Feedback, Courage,** and **Respect.**

### The twelve XP practices

| # | Practice | Idea |
|---|---|---|
| 1 | **The Planning Game** | Customer & team plan releases/iterations together using stories. |
| 2 | **Small Releases** | Ship small, frequent releases of working software. |
| 3 | **Metaphor** | A shared simple story/system metaphor guides the design. |
| 4 | **Simple Design** | Do the simplest thing that works; no speculative complexity (**YAGNI** – "You Aren't Gonna Need It"). |
| 5 | **Test-Driven Development (TDD)** | Write the (failing) test *before* the code; code until it passes. |
| 6 | **Refactoring** | Continuously improve code structure without changing behaviour. |
| 7 | **Pair Programming** | Two developers, one machine — continuous review. |
| 8 | **Collective Ownership** | Anyone can change any code; no silos. |
| 9 | **Continuous Integration** | Integrate and test changes many times a day. |
| 10 | **Sustainable Pace** (40-hour week) | No habitual overtime; avoid burnout. |
| 11 | **On-site Customer** | A real customer is available full-time to answer questions. |
| 12 | **Coding Standards** | Everyone follows the same conventions so code is uniform. |

> [!EXAM]
> Pressman/Sommerville love XP. Know **TDD** (test *first*), **pair programming** (continuous review), **refactoring** (improve structure, same behaviour), **continuous integration**, and **on-site customer**. "Test-first development" and "pair programming" are the two most-asked.

[!TRAP] **Refactoring** changes the *internal structure* of code **without changing its external behaviour**. If behaviour changes, it's not refactoring — it's modification. This is a classic true/false trap.

## Lean software development

**Lean** adapts Toyota's manufacturing philosophy (the Poppendiecks brought it to software). Its goal: **maximise customer value while minimising waste.** Seven principles:

| Principle | Meaning |
|---|---|
| **Eliminate waste** | Remove anything that doesn't add customer value (extra features, waiting, hand-offs, defects, partially-done work). |
| **Amplify learning** | Use short iterations and feedback to learn fast. |
| **Decide as late as possible** | Keep options open; commit when you have the most information. |
| **Deliver as fast as possible** | Short cycle times; fast feedback. |
| **Empower the team** | Let the people doing the work make decisions. |
| **Build integrity in** | Quality (and conceptual + perceived integrity) is built in, not tested in. |
| **See the whole** | Optimise the *whole* value stream, not local parts. |

> [!INTUITION]
> The seven "**wastes**" of Lean software (the *Muda*): partially-done work, extra features, relearning, hand-offs, task switching, delays, and defects. Lean is the discipline of relentlessly removing these.

### Kanban (a Lean technique)

**Kanban** visualises work on a board (*To Do → In Progress → Done*) and **limits work-in-progress (WIP)** to expose bottlenecks and create flow. It is **pull-based** (start new work only when capacity frees up) and is commonly used alongside or instead of Scrum.

---

**Next:** the front of the lifecycle in depth — **Requirements Engineering** and how we *elicit* requirements.
