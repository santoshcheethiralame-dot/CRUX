---
subject: se
unit: 1
order: 5
slug: agile-scrum
title: Agile Development & Scrum
summary: Agile as a philosophy rather than a process, the four manifesto trade-offs and the agile principles, then Scrum in full — its three roles, four artifacts, four ceremonies, and the estimating vocabulary of story points, velocity and capacity.
minutes: 14
tags: [agile, manifesto, scrum, sprint, product-backlog, burndown, story-points, velocity, standup, retrospective]
---

# Agile Development & Scrum

## Agile is a philosophy, not a process

> [!NOTE]
> **Agile is an umbrella term used to describe a variety of methods.** Agile methods encourage:
>
> 1. **Continual realignment of development goals with the needs and expectations of the customer**
> 2. **Reducing massive planning overhead to allow fast reactions to change**
>
> Named methods under the umbrella include **FDD (Feature Driven Development)** and **DSDM (Dynamic System Development Method)**.

> [!EXAM]
> **"Agile is not a process. It is a set of values or philosophy."**
>
> **The five Agile keywords:** **Rapid · Iterative · Cooperative · Quality driven · Adaptable**

> [!TRAP]
> That distinction is examined and routinely fumbled. **Scrum is a process; Agile is the set of values Scrum embodies.** Saying "we use Agile" is like saying "we use ethics" — the question is *which* method implements it.
>
> This also explains why the manifesto is written as **preferences** rather than rules.

---

## The Agile manifesto

> [!EXAM]
> Four trade-offs, each of the form *"we value the left more"*:
>
> | We value… | over… |
> |---|---|
> | **Individuals and interactions** | **Process and tools** |
> | **Working software** | **Comprehensive documentation** |
> | **Customer collaboration** | **Contract negotiation** |
> | **Responding to change** | **Following a plan** |
>
> And the crucial qualifier, which the deck prints beneath:
>
> > **"While there is value in the items on the right, we value the items on the left more."**

> [!TRAP]
> **That qualifier is the most misquoted sentence in software engineering.** The manifesto does **not** say documentation is worthless or that plans are bad — it says that when the two conflict, prefer the left.
>
> "We're agile so we don't write documentation" is a misreading, and an exam answer that omits the qualifier is incomplete.

---

## Agile principles

> [!NOTE]
> | Principle | What it means |
> |---|---|
> | **Customer involvement** | Customers should be **closely involved throughout the development process**. Their role is to **provide and prioritize new system requirements** and to **evaluate the iterations** of the system |
> | **Incremental delivery** | The software is developed **in increments**, with the customer **specifying the requirements to be included in each increment** |
> | **People not process** | The **skills of the development team should be recognized and exploited**. Team members should be **left to develop their own ways of working without prescriptive processes** |
> | **Embrace change** | **Expect the system requirements to change**, and so **design the system to accommodate these changes** |
> | **Maintain simplicity** | Focus on simplicity **in both the software being developed and in the development process**. Wherever possible, **actively work to eliminate complexity** |

> [!INTUITION]
> Look at **"embrace change"** against the previous topic. The legacy models were listed as **predictive** — they assume you can plan the whole thing up front, and treat change as a disruption to be controlled.
>
> Agile inverts the assumption: **change is not a failure of planning, it is the normal condition.** Once you accept that, short iterations and continual customer contact stop being nice-to-haves and become the only rational design.

The **Agile methodology cycle** as the deck draws it: **Plan → Design → Develop → Test → Deploy → Review →** *(back round)* **→ Launch**.

---

## Scrum

### The three roles

> [!EXAM]
> | Role | Responsibilities |
> |---|---|
> | **Scrum Team** | **Cross-functional, 5–9 people**. **There are no set project roles within the team.** Defines tasks and assignments. **Self-organizing and self-managing.** Maintains the **Sprint Backlog**. Conducts the **Sprint Review** |
> | **Product Owner (PO)** | **Accountable for product success.** **Defines all product features.** Responsible for **prioritizing product features**. Maintains the **Product Backlog**. Ensures the team is **working on the highest-valued features** |
> | **Scrum Master (SM)** | Holds the **daily 15-minute team meeting**. **Removes obstacles.** **Shields the team from external interference.** Maintains the **Sprint Burndown Chart**. Conducts the **Sprint Retrospective**. **Is a facilitator, not a manager** |

> [!TRAP]
> **"Is a facilitator not a manager"** is the single most examined line about the Scrum Master, and the most misunderstood role in practice. The SM does **not** assign work, set deadlines, or conduct appraisals — the team is **self-organizing**.
>
> The other pairing to keep straight: **the PO decides *what* gets built and in what order; the team decides *how* and *how much* fits in a sprint.** Neither may overrule the other on the other's side of that line.

### The four artifacts

> [!EXAM]
> | Artifact | Detail |
> |---|---|
> | **Product Backlog (PB)** | **List of all desired product features.** Can contain **bugs and non-functional items**. **PO is responsible for prioritizing.** **Items can be added by anyone at any time.** Each item should have a **business value** assigned. **Maintained by the Product Owner** |
> | **Sprint Backlog (SB)** | The **to-do list for the sprint** (items also known as *Backlog items*). **Created by the Scrum Team.** **Product Owner has defined these as highest priority** |
> | **Burndown Chart (BC)** | **Chart showing how much work remains in a Sprint.** **Calculated in hours remaining.** **Maintained by the Scrum Master daily** |
> | **Release Backlog (RB)** | **Same as the Product Backlog** — may involve **one or more sprints** depending on the determined **release date** |
>
> And the definition that governs all of them:
>
> > **"DONE" = Potentially Shippable!**

> [!INTUITION]
> Notice the ownership split is deliberate and total. **PO owns the Product Backlog** (what and why). **The team owns the Sprint Backlog** (how). **The SM owns the Burndown** (visibility).
>
> Nobody owns two of the three, which is what stops the classic failure where the person deciding scope is also the person reporting progress.

### The four ceremonies

> [!EXAM]
> | Ceremony | Timing | Purpose |
> |---|---|---|
> | **Sprint planning** | **30–60 min, biweekly** | **What features can be delivered this Sprint?** (from the product backlog) · **What tasks are needed to deliver them?** (build the sprint backlog) |
> | **Daily standup / Daily Scrum** | **15 min, daily** | **What did I accomplish yesterday? · What am I planning to work on today? · Are there any blockers preventing me from making progress?** |
> | **Sprint review** | **30–60 min, biweekly** | **Demo of working software to the product owner.** **Functionality not "done" is not shown.** Feedback generated — PB may be reprioritized |
> | **Sprint retrospective** | **30–60 min, biweekly** | **Reflect on what went well and what could have gone better.** **Identify specific actions to improve processes and teamwork in the next sprint** |

> [!TRAP]
> **Review and retrospective are different meetings and are constantly confused.**
>
> - **Review** looks at **the product** — demo working software, get feedback, attended by PO and stakeholders.
> - **Retrospective** looks at **the process** — how did we work, what should we change. Attendees are the SM and team; **the PO is optional**.
>
> Mnemonic: **review the product, retrospect on the team.**

> [!INTUITION]
> The three standup questions are carefully chosen and worth reading as a design. Two report state; **the third — "are there any blockers?" — is the one that generates action**, because it is the SM's cue to go remove an obstacle.
>
> Note also what the standup is *not*: it is **not a status report to a manager**. Team members **report to each other, not to the Scrum Master** — it exists so the team can **synchronize their work**.

### Process flow

**Sprint Planning → Product Backlog → Sprint Backlog → Sprint** *(with Daily Scrum inside)* **→ Shippable Product → Sprint Retrospective**

### Tools

> [!NOTE]
> **Task Board** — a **whiteboard containing the team's sprint goals, backlog items, tasks, tasks in progress, "DONE" items and the daily Sprint Burndown chart.** Scrum meetings are **best held around the task board**, and it must be **visible to everyone**.

---

## The estimating vocabulary

> [!EXAM]
> | Term | Definition |
> |---|---|
> | **Story points** | **A simple way to initially estimate the level of effort expected to develop.** A **relative measure of feature difficulty**. Usually scored on a scale of **1–10** — 1 = very easy, 10 = very difficult. *Example: "Send to a Friend" = 2; "Shopping Cart" = 9* |
> | **Business value** | Each user story in the Product Backlog **should have a corresponding business value assigned**. Typically **L, M, H** (Low, Medium, High). **PO prioritizes backlog items by highest value** |
> | **Team capacity** | **Capacity = # Teammates × (Productive Hrs × Sprint Days)**. *Example: team size 4, productive hrs 5, sprint length 30 days → 4 × (5 × 30) = **600 hours***. **Account for vacation time during the sprint** |
> | **Velocity** | **The rate at which a team converts items to "DONE" in a single Sprint** — usually calculated in **story points** |
> | **Time box** | **A period of time to finish a task. The end date is set and cannot be changed** |

> [!INTUITION]
> **Story points are relative, not absolute** — that is their whole purpose. Humans are poor at estimating *"how many hours will this take?"* but reasonably good at *"is this bigger or smaller than that one?"*
>
> Velocity then does the conversion for you. After a few sprints you know the team completes roughly *N* points per sprint, so points become a schedule **without anyone having to estimate hours**. This is also why **velocity is meaningless across teams** — the point scale is calibrated to one team's sense of relative size.

> [!TRAP]
> **Time box: "the end date is set and cannot be changed."** When a sprint runs out of time, **the scope is reduced, not the deadline extended.** Undelivered items go back to the Product Backlog.
>
> That is the opposite of how deadlines usually behave, and it is what makes velocity a stable measurement rather than a moving target.

### Two more from the glossary

> [!NOTE]
> - **Chickens** — people who are **not committed to the project and are not accountable for deliverables**.
> - **Pigs** — people who are **accountable for the project's success**.
> - **Single Wringable Neck** — **the Product Owner**.

---

## The FAQ

> [!EXAM]
> The deck's own cheat-sheet answers:
>
> | Question | Answer |
> |---|---|
> | **Who decides when a Release happens?** | **At the end of any given Sprint the PO can initiate a Release** |
> | **Who is responsible for managing the teams?** | **The teams are responsible for managing themselves** |
> | **What is the length of a task?** | **Tasks should take no longer than 16 hours.** If longer, **the task should be broken down further** |
> | **Who manages obstacles?** | **Primary responsibility is the Scrum Master.** However, **teams must learn to resolve their own issues**; if not able, escalate to SM |
> | **What are the two biggest challenges in Scrum?** | **Teams not self-managing**, and **Scrum Master managing not leading** |

> [!INTUITION]
> Both stated challenges are the **same failure from two sides** — the team not taking ownership and the SM taking it instead. They reinforce each other: an SM who directs creates a team that waits to be directed.
>
> The deck's summary of what Scrum buys you is worth keeping: **Visibility + Flexibility = Scrum.**

---

**Next:** the format those backlog items are written in, and two more agile methods — **user stories, XP & Lean**.
