---
subject: se
unit: 1
order: 14
slug: testing-vv-terminology
title: Software Testing — V&V and Terminology
summary: Verification vs validation (Boehm's two questions), the precise error→defect→fault→failure chain, testing goals, and the levels of testing (unit, integration, system, acceptance).
minutes: 14
tags: [testing, verification, validation, defect, fault, failure, test-levels]
---

# Software Testing — V&V and Terminology

## Why test?

Testing is the primary technique to check that software meets its requirements and to **find defects before the customer does.** Two foundational truths (Dijkstra):

> *"Testing can show the **presence** of bugs, but **never** their absence."*

So the goal of testing is **not** to "prove the program correct" — it is to **expose failures** and build confidence. A **successful test** is one that **finds a defect**, not one that passes.

## Verification vs Validation (V&V)

Both are quality activities, but they answer **different questions** — Barry **Boehm's** famous formulation:

| | Question | Focus |
|---|---|---|
| **Verification** | *"Are we building the product **right**?"* | Conformance to **specification** — does it meet the documented requirements/design? |
| **Validation** | *"Are we building the **right** product?"* | Conformance to **user needs** — does it actually do what the customer wanted? |

> [!EXAM]
> Memorise Boehm's two lines exactly. **Verification = "building the product right"** (vs spec). **Validation = "building the right product"** (vs user needs). A product can pass verification (matches the spec) yet fail validation (the spec was wrong).

[!INTUITION] Verification is **internal** (does it match our documents?) and often **static** (reviews, inspections — no execution needed). Validation is **external** (does it satisfy the user?) and often **dynamic** (running the software, acceptance testing).

### Static vs dynamic V&V

- **Static** techniques — examine the artifact **without executing** it: reviews, walkthroughs, inspections, static analysis (SAST). Catch defects **early & cheaply**.
- **Dynamic** techniques — **execute** the software with test cases: unit/integration/system/acceptance testing.

## The terminology chain: error → defect/fault → failure

This precise chain is a guaranteed question. **Don't use these words loosely.**

| Term | Definition | Where it lives |
|---|---|---|
| **Error (mistake)** | A **human action** that produces an incorrect result — a developer's mistake. | In the person's head |
| **Defect / Fault / Bug** | The **manifestation of an error in the software** — the flawed line of code or design. | In the code/artifact |
| **Failure** | The **deviation of the delivered service from correct behaviour** when the defect is executed. | At runtime, observed by the user |

```
Human makes an  ERROR  →  which introduces a  DEFECT/FAULT (bug) in the code
                          →  which, when executed, may cause a  FAILURE
```

> [!TRAP]
> The exact mapping: a **person** commits an **error** → that puts a **defect/fault (bug)** in the **code** → executing the defect causes a **failure** at runtime. Note: a defect does **not always** cause a failure (the faulty code path may never run, or the state may mask it). Don't say "bug" when you mean "failure."

Related terms:
- **Reliability** — probability of failure-free operation over time.
- **Latent defect** — a defect not yet observed as a failure.

## The levels of testing

Testing is organised into levels, mirroring the **V-model** (Topic 3) — each development phase has a matching test level:

| Level | What is tested | By whom | Matches (V-model) |
|---|---|---|---|
| **Unit testing** | A single **component/module/function** in isolation. | Developers | Module design |
| **Integration testing** | The **interfaces & interactions** between combined modules. | Developers / testers | Architectural design |
| **System testing** | The **complete, integrated system** against the system requirements (functional + non-functional). | Independent test team | System requirements |
| **Acceptance testing** | The whole system against the **customer's** needs, in their environment. | Customer / users | Requirements |

> [!INTUITION]
> Zoom levels: **Unit** = one brick · **Integration** = the bricks cemented together · **System** = the whole building · **Acceptance** = the owner inspecting before they move in.

### Integration strategies (brief)
- **Big-bang** — integrate everything at once (hard to localise faults).
- **Top-down** — integrate from the top of the hierarchy down (needs **stubs**).
- **Bottom-up** — integrate from the leaves up (needs **drivers**).
- **Sandwich** — combine top-down and bottom-up.

### Acceptance testing flavours
- **Alpha testing** — at the developer's site, with the customer.
- **Beta testing** — at the customer's/users' site, in the real environment.
- **UAT** (User Acceptance Testing) — formal customer sign-off against acceptance criteria.

## Black-box vs white-box (testing approaches)

| | Black-box (functional) | White-box (structural) |
|---|---|---|
| Basis | **Specification** — inputs → expected outputs | **Internal code structure** / logic |
| Tester sees | Only the interface (not the code) | The source code & paths |
| Techniques | Equivalence partitioning, boundary-value analysis | Statement/branch/path coverage |
| Catches | Missing/wrong functionality | Untested logic paths, dead code |

> [!EXAM]
> **Black-box = test against the spec without seeing code** (e.g. boundary-value analysis). **White-box = test the internal logic/paths** (e.g. branch coverage). System & acceptance testing are mostly black-box; unit testing is often white-box.

---

**Next:** turning this into a plan — **test cases, test planning, and security validation**.
