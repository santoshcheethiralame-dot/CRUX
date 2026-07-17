---
subject: se
unit: 2
order: 3
slug: estimation-cocomo
title: Estimation — WBS, COCOMO & Function Points
summary: Work breakdown structures, the COCOMO algorithmic cost model (organic/semi-detached/embedded, the three model types, formulas and a worked example), function points and other techniques.
minutes: 16
tags: [estimation, WBS, COCOMO, function-points, effort, KLOC]
---

# Estimation — WBS, COCOMO & Function Points

## Work Breakdown Structure (WBS)

> [!NOTE]
> A **Work Breakdown Structure (WBS)** is a **description of the work** to be done — a systematic, hierarchical decomposition of a project into manageable components. It is the **foundation** for estimation and scheduling.

**WBS principles:**
- **Hierarchical decomposition** — from project level down to **work-package** level.
- **The 100% rule** — the WBS captures **all** the scope (nothing missing, nothing extra).
- **Mutually exclusive** components — no overlap between items.
- **Appropriate level** of decomposition — small enough to manage and control.

## COCOMO — the Constructive Cost Model

> [!NOTE]
> **COCOMO** (Boehm) is an **algorithmic / regression cost model** that estimates a project from its **size in Lines of Code (KLOC)**. Its key outputs are **Effort** (labour, in **person-months**) and **Schedule/Time** (in months).

### Project categories
COCOMO first classifies the project, which sets the constants:

| Category | Description | Example |
|---|---|---|
| **Organic** | Small team, **well-understood/familiar** problem, stable environment | Inventory management system |
| **Semi-detached** | Medium size & complexity, **mixed** experience | Operating system, DBMS |
| **Embedded** | **Highest** complexity, tight constraints, innovative; large experienced team | ATM software |

### The three COCOMO models
By increasing accuracy: **1. Basic → 2. Intermediate → 3. Detailed.** The Basic model uses size alone; Intermediate and Detailed add **cost drivers** (reliability, complexity, team capability, etc.).

### Basic COCOMO formulas

$$\text{Effort } (E) = a \times (\text{KLOC})^{b} \quad \text{person-months}$$
$$\text{Time } (T) = c \times (E)^{d} \quad \text{months}$$
$$\text{Persons required} = \frac{E}{T}$$

**Constants for the Basic model:**

| Project type | $a$ | $b$ | $c$ | $d$ |
|---|---|---|---|---|
| **Organic** | 2.4 | 1.05 | 2.5 | 0.38 |
| **Semi-detached** | 3.0 | 1.12 | 2.5 | 0.35 |
| **Embedded** | 3.6 | 1.20 | 2.5 | 0.32 |

> [!DERIVE]
> **Worked example — a 10 KLOC organic project:**
> - Effort $= 2.4 \times (10)^{1.05} = 2.4 \times 11.22 \approx \mathbf{25.4}$ **person-months**
> - Time $= 2.5 \times (25.4)^{0.38} = 2.5 \times 3.25 \approx \mathbf{8.1}$ **months**
> - Team size $= 25.4 / 8.1 \approx \mathbf{3.1}$ **persons**

> [!EXAM]
> Know the **organic constants (2.4, 1.05, 2.5, 0.38)** and be ready to plug into $E = a\,(\text{KLOC})^b$. Note all three categories share **c = 2.5**; only $a, b, d$ change. Effort is in **person-months**.

> [!TRAP]
> COCOMO is **size-driven** — it needs an estimate of KLOC up front, which is itself hard to predict early. That's its main weakness: garbage-in (bad KLOC) → garbage-out (bad effort).

## Other estimation techniques

| Technique | Idea |
|---|---|
| **Function Point Analysis (FPA)** | Sizes a project by its **functional requirements** — inputs, outputs, inquiries, files, interfaces. **Language-independent** (unlike LOC). |
| **Analogical estimation** | Uses **historical data** from similar past projects (needs a project database + similarity judgement). |
| **Expert judgment** | Leverages **experienced practitioners'** knowledge, often combined with other techniques for validation. |

> [!INTUITION]
> **LOC vs Function Points:** LOC is easy to count but **language-dependent** (1 Python line ≠ 1 assembly line). Function points measure *functionality delivered*, so they compare fairly across languages — but they're harder to count.

---

**Next:** turning estimates into a timeline — **scheduling, Gantt charts and the critical path**.
