---
subject: se
unit: 2
order: 7
slug: software-architecture
title: Software Architecture — Views, Abstraction & Importance
summary: Architectural views and abstraction (the city-map analogy), the Therac-25 case study, what architecture is and why it matters, architecture vs design, and the zipper model.
minutes: 15
tags: [architecture, views, abstraction, therac-25, arch-vs-design, zipper]
---

# Software Architecture — Views, Abstraction & Importance

## Views & abstraction — the city-map analogy

Software architecture uses **multiple views** to represent different aspects of a complex system — just as the **same city** can be mapped many different ways for different purposes.

> [!INTUITION]
> **City-map analogy:** the *same* city of Bengaluru can be shown divided by **pincodes**, by **BBMP wards** (municipal), by **BESCOM divisions** (electricity), by **BWSSB divisions** (water), or by **state-assembly demarcations** (political). Each map is a **view** — it serves a different stakeholder and hides irrelevant detail. No single map is "the" city; together they tell the whole story.

**Abstracted views** convey **specific information** for a **well-defined purpose**: show only what's necessary, abstract away unnecessary detail, use legends/annotations to remove ambiguity. **Purpose of views:** focus on specific stakeholder concerns, hide complexity for an audience, enable specialised analysis, support cross-role communication.

## Case study — Therac-25

The **Therac-25** was a computer-controlled radiation-therapy machine that relied on **software controls instead of hardware safety interlocks** — and delivered fatal radiation overdoses.

**Architectural failures:**
- **Tight coupling** — UI, control logic and machine control **shared global memory**; UI actions could affect safety systems.
- **Race conditions** — fast operator input created unsafe states.
- **Legacy code reuse** — Therac-6/20 code reused without redesign for the reduced hardware safety.
- **Lack of fault isolation** — no boundaries to stop errors propagating.
- **Poor observability** — no logging/diagnostics, so faults were nearly impossible to diagnose.

> [!EXAM]
> Therac-25 lessons: **separation of concerns** (isolate safety-critical functions), **fail-safe design**, **defensive programming** (validate at boundaries), **redundancy**. It shows architecture decisions directly cause life-or-death quality outcomes.

## What is software architecture?

> [!NOTE]
> **Software architecture** is the **high-level structure** of a system: its major **components**, their **relationships**, and **interaction patterns**. It is the **blueprint** guiding development and constraining implementation.

**Components of architecture:** **Elements** (components with roles), **Relationships** (connections/interactions), **External interfaces** (to hardware, external systems, users), and **multiple perspectives** (views).

**Why architecture matters:**
- **Communication** — common vocabulary for stakeholder discussion.
- **Design-decision documentation** — captures rationale and constraints.
- **Quality-attribute achievement** — architecture decisions drive performance, security, maintainability, scalability.
- **Complexity management**, **change management** (localised impact, stable interfaces), and **effort-estimation support**.

## Architecture vs Design

| | **Architecture (system-level)** | **Design (component-level)** |
|---|---|---|
| Concern | Overall structure & organisation | Implementing a feature inside a component |
| Sample questions | How does it scale to millions of users? How do subsystems communicate? System-wide security? Deployment? | How is *this* feature coded? Which algorithms/data structures? How is the UI laid out? |

> [!TRAP]
> Some decisions **span both** levels. E.g. **encryption-algorithm choice** is a system-wide *security architecture* decision *and* needs detailed *implementation design* in specific components. *"How do I add a menu item?"* = design; *"How is security implemented across the system?"* = architecture.

## Architecture across development models

- **Waterfall** — architecture defined comprehensively **up front**.
- **Agile** — architecture **emerges iteratively** with refinement.
- **The Zipper Model** — **balances** up-front planning with iterative refinement: architectural decisions are validated and adjusted from implementation experience.

> [!INTUITION]
> **Every system has an architecture — whether documented or not.** Undocumented architecture evolves organically and rots into technical debt. Documenting it enables communication, analysis, maintenance and decision traceability.

---

**Next:** the reusable blueprints — **common architectural patterns**.
