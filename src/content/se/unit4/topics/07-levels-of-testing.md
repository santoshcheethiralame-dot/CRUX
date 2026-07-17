---
subject: se
unit: 4
order: 7
slug: levels-of-testing
title: Levels of Testing & Integration
summary: The four levels of testing, what unit testing covers, integration strategies (big-bang, top-down, bottom-up, sandwich), incremental integration, and the role of stubs.
minutes: 13
tags: [unit-testing, integration, big-bang, top-down, sandwich, stubs]
---

# Levels of Testing & Integration

## The four levels

| Level | Focus | By whom |
|---|---|---|
| **Unit Testing** | Proper functioning of an **individual unit** | Programmers |
| **Integration Testing** | **Interface errors** between components (bugs unit tests miss) | Programmers |
| **System Testing** | Behaviour of the **entire** system; bugs not attributable to one component | QA (independent) |
| **Acceptance Testing** | Does the system meet the users' **needs**? | Providers / users / customers |

> [!INTUITION]
> Zoom levels mirror a building: **unit** = one brick · **integration** = bricks cemented together · **system** = the whole building · **acceptance** = the owner inspecting before moving in. *Example: Unit (`registerStudent()` alone) → Integration (`registerStudent() → saveToDatabase() → sendConfirmationEmail()`) → System (Login→Search→Register→Pay→Confirm) → Acceptance ("Can a student register for exactly 3 events/week?").*

## Unit testing

Tests the **smallest individually executable** units; written by **programmers**. Test cases cover: algorithms/logic, data structures, interfaces, **independent paths**, **boundary conditions**, and error handling. In an **OO** environment, tests are at the **class level** (using constructors/destructors).

## Integration testing

> [!NOTE]
> **Integration** = combining 2+ software units to get the expected results. New problems surface because modules that were **never together** are now combined. If done poorly, **all problems present at once** — a cascade of interdependencies that's hard to debug.

> [!EXAM]
> **Integration is where MOST bugs hide** — they appear at the *interfaces* between components, invisible to unit tests.

### Integration strategies

| Strategy | How it works | Needs |
|---|---|---|
| **Big-Bang (Phased)** | Build/test each unit separately, **combine all at once**, "hope for the best" | — (hard to isolate faults) |
| **Top-Down** | Start at outer **UI** layers, work inward | **Stubs** for lower levels |
| **Bottom-Up** | Start at **data/logic** layers, work outward | **Drivers** to call them |
| **Sandwich** | Connect top-level UI with crucial bottom components, **add middle layers incrementally** | Both — most common, agile |

**Which approach?** UI requirements clear → **top-down**; critical DB schema → **bottom-up**; most agile projects → **sandwich** (build a skeleton, iterate).

> [!INTUITION]
> **Incremental integration** (any of top-down/bottom-up/sandwich) keeps the system in a **working state**, makes errors **easier to isolate**, and is better for morale — unlike big-bang, where everything breaks together.

## Stubs

> [!NOTE]
> A **stub** is a **controllable replacement** for a software unit, used to simulate hard-to-control elements or components not yet built.

You need a stub when the other component: **doesn't exist yet**, is **hard to control** (3rd-party/DB/network), is **slow** (real DB calls), or has **side effects** (sends emails, charges cards).

> [!TRAP]
> *Example:* a `StubDatabase` returning fake data lets registration logic be tested in **isolation** with no risk of data corruption. **Key principle:** design the stub so you **minimize code changes** when you later remove it and plug in the real component.

---

**Next:** validating the whole product — **system & acceptance testing**.
