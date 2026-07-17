---
subject: se
unit: 3
order: 4
slug: coding-standards
title: Coding Standards — Defensive, Secure & Testable Programming
summary: Standards vs guidelines, defensive programming (Murphy's Law), the five secure-programming principles, testable-programming techniques, and construction quality metrics.
minutes: 13
tags: [coding-standards, defensive-programming, secure-programming, testable, metrics]
---

# Coding Standards — Defensive, Secure & Testable Programming

> [!NOTE]
> **Standards** = **mandatory** rules that must be followed. **Guidelines** = **recommended** best practices. Together they ensure uniformity, readability and maintainability across a codebase.

## Defensive Programming

> [!NOTE]
> **Defensive programming** is guided by **Murphy's Law**: *"If anything can go wrong, it will."* It anticipates and handles potential errors, invalid inputs and unexpected conditions — including **redundant checks** of system state and **explicitly testing implicit assumptions**.

## Secure Programming — the 5 principles

| # | Principle | Meaning |
|---|---|---|
| **1** | **Validate input** | All input from untrusted sources must be validated |
| **2** | **Heed compiler warnings** | Compile at the **highest warning level** and eliminate all warnings |
| **3** | **Default Deny** | Base access on **explicit permission**, not lack of restriction |
| **4** | **Least Privilege** | Every process runs with the **minimum privileges**, for the shortest time |
| **5** | **Sanitize data** sent to other systems | Sanitize data passed to shells/databases to prevent **injection attacks** |

> [!EXAM]
> Know the five secure-coding principles. The two most-tested: **Default Deny** (deny by default, allow by explicit permission) and **Least Privilege** (minimum rights, shortest time). Sanitizing input to subsystems prevents **SQL/command injection**.

> [!TRAP]
> "Bad" code red flags: command injection via `system()`, buffer overflows (`strcat`, `sprintf`), no null/length checks, mutating input parameters (state corruption), and **silent failures**. "Good" code prefers **safe APIs** (`snprintf` over `sprintf`, `unlink` over `system("rm")`), validates inputs, avoids side effects, and signals failures via return codes/exceptions.

## Testable Programming techniques

Designing software that is **easy to test**:

| Technique | What it does |
|---|---|
| **Assertions** | Identify out-of-range / inappropriate values |
| **Test Points** | Methods to set/retrieve a module's status & variables for testing |
| **Scaffolding** | Code written **solely** to support unit/integration testing (emulates a feature) |
| **Test Harness** | Stubs + drivers + test data to **automate** test execution |
| **Test Stubs** | Temporary replacements for a called module, returning **fixed values** (top-down testing) |
| **Instrumenting** | Execution logging/messages ("I got here") to visualise the flow |

> [!INTUITION]
> **Stub vs driver:** a **stub** stands in for a *lower-level* module that a component *calls* (top-down testing); a **driver** stands in for a *higher-level* module that *calls* the component (bottom-up testing). **Scaffolding** is the throwaway code that holds it all together for a test.

## Managing construction — quality metrics

Two perspectives:
- **Progress tracking** ("Proceeding as planned?") — measures: effort, completion rate; metric: **LoC per effort-day**.
- **Technical quality** — measures: LoC, defects found, complexity; metric: **Errors per KLoC**.

**Agile quality metrics:** **Sprint Burndown** (story points remaining over a sprint) · **Team Velocity** · **Throughput** (value-added output) · **Cycle Time** (work-begin → completion).

---

**Next:** the single most effective defect-detection practice — **code reviews & static analysis**.
