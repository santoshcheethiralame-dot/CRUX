---
subject: se
unit: 4
order: 13
slug: code-coverage
title: Code & Branch Coverage
summary: What code coverage measures, the structural metrics (statement, decision, condition coverage), conditions vs decisions with a worked example, and how much coverage is enough.
minutes: 13
tags: [code-coverage, statement-coverage, condition-coverage, decision-coverage, testing]
---

# Code & Branch Coverage

## What is code coverage?

> [!NOTE]
> **Code coverage** measures what **fraction of the code** under test is reached by existing tests. It's intuitive, widely used in industry, and well-tooled — but it is **not sufficient on its own to ensure correctness**.

## Structural coverage metrics

| Metric | Requirement |
|---|---|
| **Statement coverage** | Every **statement** is executed at least once |
| **Decision coverage** | Every **decision** takes **true and false** at least once |
| **Condition coverage** | Every **atomic condition** takes **true and false** at least once |

Key definitions:
- A **condition** is an **atomic** boolean expression — one that cannot be decomposed into simpler boolean expressions.
- A **decision** is a boolean expression **composed of conditions** joined by 0+ logical connectors (a decision with 0 connectors *is* a condition).

> [!EXAM]
> Strictness order to remember: **statement < decision < condition** (in general, condition coverage requires the most tests). Statement coverage = "every line ran"; decision = "every branch went both ways"; condition = "every *atomic* boolean went both ways."

## Worked example — `avgAbs(double... numbers)`

```java
public double avgAbs(double... numbers) {
    if (numbers == null || numbers.length == 0)        // conditions A, B
        throw new IllegalArgumentException("...");
    double sum = 0;
    for (int i = 0; i < numbers.length; ++i) {          // condition C
        double d = numbers[i];
        if (d < 0) sum -= d;                            // condition D
        else       sum += d;
    }
    return sum / numbers.length;
}
```

Conditions: **A** = `numbers==null`, **B** = `numbers.length==0`, **C** = `i<numbers.length`, **D** = `d<0`.

> [!DERIVE]
> **Condition coverage** needs each of A, B, C, D both **true and false**. **Decision coverage** (which here also achieves condition coverage) is met by just **3 tests**:
> - `avgAbs(null)` → A=true
> - `avgAbs()` (empty) → A=false, B=true
> - `avgAbs(-5, 3)` (mixed) → A=false, B=false, and **D both true and false in one call** (loop iterates twice)

## How much coverage is enough?

> [!TRAP]
> **100% is rarely the goal** — it's subject to the **law of diminishing returns**. The last 10% of coverage can need **50% more test code** because of rare edge cases, error conditions, and **dead code** (unreachable in practice).

> [!INTUITION]
> **Google aims for ~80% coverage**, documents exceptions, and focuses effort on **high-risk code** (security, payments, data), complex multi-condition logic, and widely-used public APIs. **Coverage is a guide to test adequacy, not a proof of correctness** — you can have 100% coverage and still have wrong outputs or missing requirements.

---

**Next:** the human dimension of software — **ethics: cases & algorithmic bias**.
