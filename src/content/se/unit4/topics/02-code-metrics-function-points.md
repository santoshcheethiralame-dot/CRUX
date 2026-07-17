---
subject: se
unit: 4
order: 2
slug: code-metrics-function-points
title: Code Metrics & Function Points
summary: Code-complexity metrics (LOC, Halstead, cyclomatic, OO), measurement for decision-making, function point analysis with a worked example, and product-related test measures.
minutes: 14
tags: [metrics, halstead, function-points, defect-density, MTBF, complexity]
---

# Code Metrics & Function Points

## Code-complexity metrics

| Metric | Idea |
|---|---|
| **Lines of Code (LOC)** | Easy to measure — but **normalize**: ignore comments/blank lines, ignore lines < 2 chars, pretty-print first, count **logical** statements; also normalize **by language** |
| **Halstead Volume** | Based on counts of **distinct operators & operands** — estimates program size and effort |
| **Cyclomatic Complexity** | Number of linearly independent paths = $E - N + 2P$ (= decisions + 1), from the control flow graph |
| **Object-Oriented metrics** | Methods per class · **Depth of Inheritance Tree** · number of child classes · **Coupling between Object Classes** · calls to methods in unrelated classes |

> [!INTUITION]
> **LOC** is cheap but crude (and language-dependent). **Halstead** and **cyclomatic complexity** try to capture *real* difficulty; **OO metrics** (depth of inheritance, coupling) capture design quality. No single number is enough — use several.

## Measurement for decision-making

Metrics inform decisions: fund the project? more testing? fast/secure enough? which feature? developer bonus? reliable estimates?
- **Trend analysis** — track a metric over time to see direction.
- **Benchmarking against standards** — monitor many projects/modules, derive a **typical value**, and **report deviations**.

## Function Points

> [!NOTE]
> **Function Points (FP)** measure an application's size by its **functional view** — counting inputs, outputs, queries and files, adjusted for complexity. Originally from **IBM**, FP measures **functionality delivered to the end user**, so it is **language-independent** (unlike LOC).

The **five components**:

| Component | Abbrev | What it counts | Example |
|---|---|---|---|
| **External Inputs** | EI | Data-input screens | Registration form |
| **External Outputs** | EO | Reports, displays | Event calendar view |
| **External Inquiries** | EQ | User queries | Search events |
| **Internal Logical Files** | ILF | Database tables | Events table, Users table |
| **External Interface Files** | EIF | Shared data sources | Google Calendar API |

Each count is multiplied by a **complexity weight** (Low / Average / High) and summed.

> [!DERIVE]
> **Worked example:**
> EI 5 × 7 = 35 · EO 3 × 5 = 15 · EQ 2 × 3 = 6 · ILF 4 × 4 = 16 · EIF 1 × 3 = 3
> **Total = 75 FP.** At an industry productivity of **~10 FP per person-month**, that's roughly a **7–8 month** project for one developer.

> [!EXAM]
> Know the **five FP components (EI, EO, EQ, ILF, EIF)** and the method: **count × weight, summed**. FP's headline advantage over LOC: it measures **delivered functionality** and is **language-independent**, derivable early from the specification.

## Product-related test measures

| Metric | Description |
|---|---|
| **SLOC** | Size in lines of code |
| **Fault Density** | Faults found ÷ program size |
| **MTBF** | **Mean Time Between Failures** — statistical probability of failure |
| **Failure Rate** | The **inverse** of MTBF |
| **Defect Distribution** | % of defects attributed to each SDLC phase |
| **Defect Density of Modules** | Faults in a module ÷ total faults in the product |
| **Defect Leakage** | Test efficiency = (defects in UAT ÷ defects before UAT) × 100 |

> [!INTUITION]
> Judging Autonomous-Vehicle software shows why you need *several* metrics: **code coverage** (how much code ran), **model accuracy** (e.g. 90% object recognition), **failure rate** (crashes per million miles), and **mileage** (distance driven autonomously). No single number captures "is it safe?"

---

**Next:** why metrics can mislead — **the pitfalls & Goodhart's law**.
