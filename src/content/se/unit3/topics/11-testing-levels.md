---
subject: se
unit: 3
order: 11
slug: testing-levels
title: Levels of Testing — Unit to Acceptance
summary: Inspections vs testing, the three stages (development, release, user), development testing (unit/component/system/interface), regression, release testing, and user testing (alpha/beta/acceptance).
minutes: 15
tags: [unit-testing, integration, system-testing, regression, release, acceptance]
---

# Levels of Testing — Unit to Acceptance

## Inspections vs testing

| | **Inspections (Static)** | **Testing (Dynamic)** |
|---|---|---|
| Concern | Analyse the static representation to find problems | Exercise & observe behaviour |
| Execution | **None** — done before the system runs | Run with test data |
| Method | Peer reviews, walkthroughs, **Fagan inspections** | Execute the system |

> [!EXAM]
> **Inspections = static verification** (no execution); **testing = dynamic verification** (execution). Inspection advantages: errors don't **mask** each other; **incomplete** systems can be inspected (no test harness needed); they can also check standards, portability, maintainability. Reviews detect **60–90%** of defects.

## The three stages of testing

**Development testing** (during development) → **Release testing** (separate team, complete version) → **User testing** (users in their own environment).

## Development testing

| Level | Focus |
|---|---|
| **Unit Testing** | Individual functions/classes in **isolation** (a *defect-testing* process — aims to find bugs) |
| **Component Testing** | Composite components — test the **interface** behaviour |
| **System Testing** | Integrated components — **component interactions** and emergent properties |

- **Unit testing:** isolate the unit (mock dependencies) → define test cases → execute & verify → report defects. **Object-class testing** must exercise **all operations** and **all states**; **inheritance** makes it harder (test data isn't localised — it's spread across parent classes; test overridden methods separately).
- **Automated testing** (e.g. **JUnit**): `@Test` annotate, use **assertions** (`assertEquals(expected, actual)`), run via IDE/CLI — repeatable, fast, essential for regression.

### Interface testing
Detects faults between modules:
- **Interface misuse** — caller uses the interface wrongly (e.g. parameters in the wrong order).
- **Interface misunderstanding** — caller makes wrong assumptions about the called component.
- **Timing errors** — components run at different speeds → out-of-date data.

> [!INTUITION]
> Interface-testing guidelines: test parameters at the **extreme ends** of their ranges, **always test pointers with null**, design tests to **make the component fail**, and stress message-passing systems. Most integration bugs hide at the *boundaries between modules*, not inside them.

## Regression testing

> [!NOTE]
> **Regression testing** checks that changes have **not broken** previously working code. **Golden rule:** re-run **all** tests on every change; tests **must pass before the change is committed**.

It's expensive but critical → **automate** it (manual is too slow and error-prone).

## Release testing

> [!NOTE]
> **Release testing** tests a release intended for use **outside** the dev team. Goal: **convince the customer the system is good enough** — *not* to find bugs. It is **black-box**, specification-based.

| Aspect | **System Testing** | **Release Testing** |
|---|---|---|
| Team | Development team | **Separate** team |
| Objective | Find defects | Validate readiness for external use |
| Outcome | Bug reports | **Go/No-Go** decision |

## User testing

Even with system + release testing, the **user's environment can't be replicated** in a lab (real network, load, hardware, data volume).

| Type | Who | Where / When |
|---|---|---|
| **Alpha** | Internal/friendly users **with the dev team** | Developer's site, **before beta** |
| **Beta** | External volunteer users experiment & report | Real environment, **pre-release** |
| **Acceptance** | **Client/customer** decides to accept | Customer environment, **final gate** |

> [!EXAM]
> **Alpha = at the developer's site with the team; Beta = at the user's site in the real world; Acceptance = the customer's formal go/no-go.** A classic ordering question.

**Acceptance testing process:** define criteria → plan → derive tests (from use cases) → run (customer env) → **negotiate** results → accept/reject.

> [!INTUITION]
> **In Agile**, acceptance testing isn't a separate phase: the customer is **embedded**, acceptance criteria live in each **user story**, automated acceptance tests (**Cucumber, FitNesse**) run in CI, and the **Definition of Done** includes sign-off. (Challenge: is the embedded user truly representative of all stakeholders?)

---

**Next:** beyond functional bugs — **performance, soak & chaos testing**.
