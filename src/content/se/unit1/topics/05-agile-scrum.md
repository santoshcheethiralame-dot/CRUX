---
subject: se
unit: 1
order: 5
slug: agile-scrum
title: Agile Development & Scrum
summary: Why agile arose, the four values and twelve principles of the Agile Manifesto, plan-driven vs agile, and the Scrum framework — roles, artifacts and ceremonies.
minutes: 18
tags: [agile, manifesto, scrum, sprint, ceremonies, roles]
---

# Agile Development & Scrum

## Why agile?

Plan-driven models (waterfall/V) assume requirements can be **frozen** up front. For most modern business systems that assumption is false — requirements change as the business and market change. The **overhead of plan-driven development** (heavy documentation, rigid sign-offs, slow change) made it unsuitable for fast-moving software. **Agile methods** emerged in the late 1990s to deliver software **rapidly and incrementally**, embracing change rather than resisting it.

Core idea: **iterative + incremental** delivery in short cycles, with **continuous customer involvement** and **working software** as the primary measure of progress.

## The Agile Manifesto (2001)

In 2001, seventeen practitioners published the **Manifesto for Agile Software Development**. It states **four values** — each prefers the left over the right (*"while there is value in the items on the right, we value the items on the left more"*):

| We value… | …over… |
|---|---|
| **Individuals and interactions** | processes and tools |
| **Working software** | comprehensive documentation |
| **Customer collaboration** | contract negotiation |
| **Responding to change** | following a plan |

> [!EXAM]
> Memorise the **four values** verbatim — it is a guaranteed question. Trick: each line is "**X over Y**"; the *X* side is the agile value. Note it does **not** say "no documentation/plans" — it says *prefer* the left.

### The twelve principles (themes you should recognise)

You don't need all twelve word-for-word, but know the recurring themes:

- **Satisfy the customer** through *early and continuous delivery* of valuable software.
- **Welcome changing requirements**, even late in development.
- **Deliver working software frequently** (weeks, not months).
- **Business people and developers** work together daily.
- Build projects around **motivated individuals**; trust them.
- **Face-to-face conversation** is the best form of communication.
- **Working software** is the primary measure of progress.
- **Sustainable pace** — maintain a constant rhythm indefinitely.
- Continuous attention to **technical excellence and good design**.
- **Simplicity** — maximise the work *not* done.
- **Self-organising teams** produce the best architectures and designs.
- **Reflect and adjust** at regular intervals (retrospectives).

## Plan-driven vs Agile — the contrast

| | Plan-driven | Agile |
|---|---|---|
| Planning | All up front | Incremental, each iteration |
| Requirements | Frozen early | Welcomed to change throughout |
| Primary deliverable | Documents at each phase | Working software each iteration |
| Customer | Mostly at start & end | Continuous involvement |
| Best for | Stable, safety-critical, large, regulated | Volatile requirements, small–medium business systems |
| Risk if misused | Builds the wrong thing slowly | Poor fit for safety-critical/large distributed teams |

> [!TRAP]
> Agile is **not** "no process / just hack." It is a *disciplined* process with its own ceremonies, roles and rules. And it is **not always better** — for large, safety-critical or heavily-regulated systems, plan-driven (or a hybrid) is often more appropriate.

## Scrum — the most popular agile framework

**Scrum** is an agile *management* framework (it says little about engineering practices — that's XP's job, next topic). Work proceeds in fixed-length iterations called **Sprints** (typically **2–4 weeks**), each producing a potentially shippable increment.

### The three roles

| Role | Responsibility |
|---|---|
| **Product Owner** | Owns and prioritises the **Product Backlog**; represents the customer/business; decides *what* gets built and in what order. |
| **Scrum Master** | A *servant-leader / facilitator*. Removes impediments, coaches the team, protects it from distractions, ensures the process is followed. **Not** a project manager who assigns work. |
| **Development Team** | A small (≈5–9), **cross-functional, self-organising** team that builds the increment and decides *how* to do the work. |

### The three artifacts

| Artifact | What it is |
|---|---|
| **Product Backlog** | The ordered master list of *everything* that might be needed — features, fixes, requirements (often as user stories). Owned by the Product Owner. |
| **Sprint Backlog** | The subset of backlog items the team commits to **this sprint**, plus the plan to deliver them. |
| **Increment** | The sum of all completed backlog items — a **potentially shippable** product at sprint's end ("Done"). |

### The ceremonies (events)

| Ceremony | When | Purpose |
|---|---|---|
| **Sprint Planning** | Start of sprint | Select & plan the work for the sprint (build the Sprint Backlog). |
| **Daily Scrum (Stand-up)** | Every day, ~15 min | Sync: *what I did, what I'll do, any blockers.* Keeps the team aligned. |
| **Sprint Review** | End of sprint | Demo the increment to stakeholders; get feedback; adapt the backlog. |
| **Sprint Retrospective** | End of sprint | The team inspects *itself* — what went well, what to improve next sprint. |

> [!INTUITION]
> Review = *inspect the **product*** (did we build the right thing?). Retrospective = *inspect the **process/team*** (how can we work better?). Students mix these up constantly — keep "product vs process" in mind.

### Supporting concepts

- **Burndown chart** — a graph of remaining work vs time; tracks whether the sprint is on pace.
- **Velocity** — how much work (story points) a team completes per sprint; used to forecast.
- **Definition of Done (DoD)** — the shared checklist an item must meet to be called "done" (coded, tested, reviewed, documented).
- **Timeboxing** — every event has a fixed maximum duration.

> [!EXAM]
> Common Scrum questions: the **3 roles**, **3 artifacts**, **4 ceremonies**; "the Scrum Master is a *facilitator/servant-leader*, not a boss"; "the Product Owner prioritises the backlog"; a sprint is **2–4 weeks** and yields a **potentially shippable increment**.

---

**Next:** how requirements are written in agile (**user stories & INVEST**) and the engineering practices of **XP** and **Lean**.
