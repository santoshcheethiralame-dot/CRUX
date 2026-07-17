---
subject: se
unit: 3
order: 10
slug: test-cases-reliability
title: Test Cases, Reliability & Cyclomatic Complexity
summary: The anatomy and types of test cases, test suites, software reliability models (MTTF/MTBF), test prioritization, and computing cyclomatic complexity from a control flow graph.
minutes: 14
tags: [test-case, test-suite, reliability, MTTF, cyclomatic-complexity, CFG]
---

# Test Cases, Reliability & Cyclomatic Complexity

## Test cases

> [!NOTE]
> A **Test Case** is a documented set of conditions, steps and **expected results** to verify the system works as intended — a step-by-step guide giving a **Pass/Fail** verdict.

**Typical parameters:** Test Case ID · Test Scenario/Title · Description · Test Setup (prerequisites) · Test Steps · **Expected Result** · Actual Result · Comments.

### Types of test cases
| Type | Purpose | Example |
|---|---|---|
| **Positive** | Verify it does what it **should** | Valid login → access granted |
| **Negative** | Verify it does **not** do what it **shouldn't** | Invalid email → error message |
| **Destructive** | How much it handles before breaking | 1000 login attempts/sec |

> [!EXAM]
> Every test case **must have a predefined Expected Result** — without it you can't tell Pass from Fail. **Negative test cases** (verifying error handling) are as important as positive ones.

> [!NOTE]
> A **Test Suite** is a container of tests for execution & reporting (states: Active, In-Progress, Completed). Suites are organised by sprint/release/module and can hold any test type.

## Software reliability

> [!NOTE]
> **Software Reliability** = the **probability of failure-free operation** for a specified time in a specified environment.

| Model type | Purpose | Key metrics |
|---|---|---|
| **Predictive** | Estimate **future** reliability from design | **MTTF** (Mean Time To Failure) |
| **Assessment** | Measure **current** reliability from test data | **MTBF**, Failure Rate, Fault Density |

**Test prioritization** — test the most important first: highest-priority requirements (business value), most complex code, largest modules, most-frequently-modified modules (regression risk). *(The Test Case Prioritization Pyramid: Business-Critical → High-Complexity Code → Large Modules → Frequently-Changed.)*

## Cyclomatic Complexity

> [!NOTE]
> **Cyclomatic Complexity V(G)** is the number of **linearly independent paths** in a code section, computed from its **Control Flow Graph (CFG)** — where **nodes = statements** and **edges = control flow**.

$$V(G) = E - N + 2P$$

where **E** = edges, **N** = nodes, **P** = connected components. **Simple rule:** $V(G) = \text{(number of decisions)} + 1$.

| V(G) | Risk | Recommendation |
|---|---|---|
| **1–10** | Low | Simple, well-structured |
| **11–20** | Moderate | Complex — test thoroughly |
| **21–50** | High | Very complex — **refactor** |
| **>50** | Untestable | Must **redesign** |

> [!DERIVE]
> **Worked example:** a CFG with **E = 8, N = 7, P = 1**:
> $$V(G) = 8 - 7 + 2(1) = \mathbf{3}$$
> → **3 independent paths** to test. For code `if A≤10 print; else if B>C: A=B; else A=C`, the three paths are: **(1)** A≤10, **(2)** A>10 & B>C, **(3)** A>10 & B≤C — giving 3 test cases for 100% path coverage.

> [!EXAM]
> Memorise **V(G) = E − N + 2P** and the shortcut **= decisions + 1**. V(G) also equals the **minimum number of test cases** for full path coverage. A value **>10** means "complex, test thoroughly"; **>50** means "redesign."

> [!INTUITION]
> Cyclomatic complexity counts the **branch points** in your code. More `if`/`while`/`for`/`case` = more independent paths = more tests needed = harder to maintain. It turns "how complex is this function?" into a single number.

---

**Next:** the testing pyramid in practice — **the levels of testing**.
