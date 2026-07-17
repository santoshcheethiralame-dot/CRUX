---
subject: se
unit: 1
order: 3
slug: sdlc-models
title: The SDLC & Process Models (Waterfall, V, Incremental, Spiral)
summary: The software process, its four core activities, and the classic plan-driven lifecycle models — waterfall, V-model, incremental, iterative and Boehm's spiral — with when to use each.
minutes: 18
tags: [SDLC, waterfall, v-model, incremental, spiral, process-models]
---

# The SDLC & Process Models

## The software process

A **software process** is a structured set of activities required to develop a software system. The **Software Development Life Cycle (SDLC)** is the framework describing those activities and their order. Whatever the model, four **fundamental activities** are always present:

| Activity | Question it answers |
|---|---|
| **1. Specification** | What should the system do, and what are its constraints? |
| **2. Design & Implementation** | How is the system organised, and how is it built? |
| **3. Validation** | Does it do what the customer wants? |
| **4. Evolution** | How does it change as needs change? |

A **process model** is an abstract representation of a process — it presents one *view* of how to arrange these activities. Models split into two families:

- **Plan-driven** processes — all activities are planned in advance and progress is measured against the plan (this topic).
- **Agile** processes — planning is incremental and the plan flexes as the project unfolds (Topics 5–6).

> [!NOTE]
> Most real projects are **a blend** of both. There is no universally "best" model — you choose based on the type of system, the stability of requirements, and the risks.

## A generic SDLC — the seven phases

The classic textbook SDLC names the phases that *every* model rearranges:

1. **Requirement gathering & analysis** — understand and document what is needed.
2. **Feasibility study** — is it technically/economically/legally viable?
3. **Design** — architecture and detailed design.
4. **Coding / Implementation** — build it.
5. **Testing** — verify and validate.
6. **Deployment** — release to users.
7. **Maintenance** — fix, adapt and enhance after release.

## Model 1 — The Waterfall Model

The oldest model (Royce, 1970). Phases flow **strictly downward** like a waterfall; each phase must finish (and be signed off) before the next begins.

```
Requirements
   ↓
Design
   ↓
Implementation
   ↓
Testing (Verification)
   ↓
Deployment & Maintenance
```

**Key property:** each phase produces a **frozen, documented deliverable** that becomes the input to the next. It is a **plan-driven, document-driven** model.

**Advantages**
- Simple to understand and manage; clear milestones and deliverables.
- Works well when **requirements are well-understood and stable**.
- Good for large teams and rigorous documentation/auditing.

**Disadvantages**
- **Inflexible** — accommodating change is very expensive once a phase is signed off.
- A **working product appears only late**, so mistakes in early phases surface late and cost the most to fix.
- The customer sees nothing until the end — high risk of building the wrong thing.

> [!EXAM]
> Waterfall is best when **requirements are stable and well-understood** (e.g. some embedded/safety systems, or a re-implementation of a known system). It is *worst* when requirements are likely to change.

> [!TRAP]
> "Waterfall has no testing until the end" — careful: testing is a *phase*, but each phase has verification (reviews). The real weakness is that **executable software** and *system* testing come late.

## Model 2 — The V-Model (Verification & Validation)

An extension of waterfall that bends the line into a **V** to emphasise **testing**. The left (descending) arm is decomposition/definition; the right (ascending) arm is integration/testing. **Each development phase is paired with its corresponding test phase**, and the test cases are designed *during* the matching development phase (not after coding).

```
Requirements  ───────────────►  Acceptance Testing
   Analysis  ─────────────►  System Testing
      Design  ───────►  Integration Testing
     HL/Module ──►  Unit Testing
                  Coding
```

| Left arm (build) | Right arm (test that level) |
|---|---|
| Requirements | Acceptance testing |
| System/architectural design | System testing |
| Detailed/component design | Integration testing |
| Module/unit design | Unit testing |

**Strength:** testing is planned **early and in parallel** with development; defects are caught at the right level. **Weakness:** like waterfall, it is **rigid** and assumes stable requirements.

> [!INTUITION]
> The V-model's message: *the way you will test something should be decided at the same time you decide how to build it.* Write the acceptance test the moment you write the requirement.

## Model 3 — Incremental development

Build the system in **increments** (slices of functionality). Each increment delivers **working, usable software**; later increments add capability. Combines specification, development and validation, and **interleaves** them.

```
[Outline spec] → Increment 1 (spec→build→validate→deliver)
              → Increment 2 (spec→build→validate→deliver)
              → Increment 3 ...
```

**Advantages**
- **Reduced cost of change** — less rework than redoing a whole waterfall.
- **Easier to get customer feedback** on each working increment.
- **Faster delivery** of useful software (the most important features can come first).

**Disadvantages**
- The process is **not visible** to managers (fewer formal documents per increment).
- System **structure can degrade** as increments are added unless effort/money is spent on refactoring.

> [!NOTE]
> **Incremental** = deliver in slices, each slice is "complete" for its scope. **Iterative** = build a rough version of the *whole*, then refine it over repeated passes. Real agile processes are **both** incremental *and* iterative.

## Model 4 — Iterative development

Develop an initial implementation, **expose it to user comment, and refine it through many versions** until an adequate system is built. Activities are **interleaved**, not separated. Prototyping is a classic iterative technique: build a quick prototype to clarify requirements, then evolve or discard it.

## Model 5 — The Spiral Model (Boehm, 1986) — *risk-driven*

Boehm's spiral represents the process as a **spiral** rather than a sequence. Each loop of the spiral is one **phase/iteration**, and crucially each loop is organised around **risk**. A loop has **four quadrants**:

| Quadrant | Activity |
|---|---|
| **1. Determine objectives** | Set objectives, alternatives, and constraints for this loop |
| **2. Identify & resolve risks** | **Risk assessment** — analyse risks; build prototypes/simulations to reduce key risks |
| **3. Development & test** | Develop and verify the next-level product |
| **4. Plan the next iteration** | Review results and plan the next loop |

> [!EXAM]
> The spiral model's distinguishing feature is **explicit, iterative risk management** — *"risk is explicitly assessed and resolved throughout the process."* Each loop = decide objectives → **assess/resolve risk** → develop & test → plan next loop. It suits **large, expensive, high-risk** projects.

**Advantages:** risk is addressed early and continuously; combines the strengths of waterfall (structure) and prototyping (feedback). **Disadvantages:** complex to manage; requires **risk-assessment expertise**; can be costly; overkill for small projects.

## Choosing a model — quick guide

| Use… | When… |
|---|---|
| **Waterfall / V-model** | Requirements stable & well-understood; heavy documentation/audit needs (safety, contracts) |
| **Incremental / Iterative** | Requirements likely to evolve; want early delivery & feedback |
| **Spiral** | Large, costly, high-risk projects where risk must be managed continuously |
| **Agile** (next topics) | Volatile requirements, small-to-medium business systems, need fast & frequent delivery |

---

**Next:** the *other* lifecycles a product passes through — product/management/security life cycles, the **Secure SDLC**, and the **4 Ps**.
