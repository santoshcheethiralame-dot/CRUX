---
subject: se
unit: 2
order: 9
slug: cohesion-coupling-security
title: Cohesion, Coupling, Modularity & Security
summary: Separation of concerns and modularity, the seven cohesion levels and six coupling types (weakest to strongest), and security by design with trust boundaries.
minutes: 14
tags: [cohesion, coupling, modularity, separation-of-concerns, security, trust-boundary]
---

# Cohesion, Coupling, Modularity & Security

## Core architecture principles

- **Separation of concerns** — divide functionality into distinct components with clear responsibilities and minimal overlap.
- **High cohesion** — components with strong internal relationships and a unified purpose *(good)*.
- **Low coupling** — minimal dependencies between components *(good)*.
- **Modularity** — **decomposability** (split into independent parts), **composability** (recombine them), and **localised change impact** (changes don't ripple).

> [!INTUITION]
> The golden rule of modular design: **high cohesion, low coupling.** A module should do *one thing well* (cohesion) and **depend on as little as possible** (coupling). This makes systems easier to understand, test, change and reuse.

## Cohesion levels (weakest → strongest)

How well the elements *inside* a module belong together:

| Level | Meaning |
|---|---|
| **Coincidental** | Arbitrary grouping, no meaningful relationship — **worst** |
| **Logical** | Logically related but independent (e.g. a bundle of I/O utilities) |
| **Temporal** | Activated at the same time (e.g. system-initialisation routines) |
| **Procedural** | Executed in a specific sequence |
| **Communicational** | Operate on the same data / contribute to the same output |
| **Sequential** | One element's **output is the next's input** |
| **Functional** | All elements contribute to a **single well-defined function** — **best** |

## Coupling types (loosest → tightest)

How strongly two modules *depend* on each other:

| Type | Meaning |
|---|---|
| **Data** | Communicate via simple data parameters — **loosest (best)** |
| **Stamp** | Share a composite data structure but use only a subset |
| **Control** | One module directs another via control flags/status codes |
| **External** | Communicate through an external medium (files, DB, network) |
| **Common** | Share **global** data — side effects, hidden dependencies |
| **Content** | One module **modifies another's internals** — **tightest (worst)** |

> [!EXAM]
> Order matters. Cohesion **best = Functional**, worst = Coincidental. Coupling **best = Data**, worst = Content. Mnemonic: you want **functional cohesion** and **data coupling**. *Common coupling* = shared globals (a classic "what kind of coupling is this?" question).

> [!TRAP]
> High cohesion and low coupling usually go **together**, but they are **different axes**. A module can be highly cohesive yet tightly coupled to others (or vice-versa). Always check both.

## Security by design

> [!NOTE]
> **Security by design** integrates protection mechanisms into the architecture **from inception**, rather than bolting security on at the end ("shift left").

**Key techniques:** input-validation layers at boundaries · secure communication (**TLS/mTLS**) · **trust boundaries** · asset protection (data at rest, in transit, in processing).

### Trust boundaries

> [!NOTE]
> A **trust boundary** is an architectural line separating components with **different security assumptions and access levels**.

- **Within** a boundary — components are mutually trusted; minimal controls between them.
- **Across** a boundary — require **authentication, authorization, and secure communication**.

*Example:* in a **hospital patient-data system**, doctors and patients sit **inside** the trust boundary for patient data, while administrative staff sit **outside** it with limited rights.

**Security architecture review:** component-isolation assessment · API-security validation (authn, rate-limiting, input validation) · encryption verification · **secure-by-default** configuration.

> [!INTUITION]
> A trust boundary is like a **building's secure door**: people already inside move freely, but anyone crossing the door must show ID (authenticate) and be granted access (authorize). Draw the boundaries first, then put controls on every crossing.

---

**Next:** the modern distributed style — **microservices architecture**.
