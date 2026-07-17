---
subject: se
unit: 3
order: 9
slug: test-design-techniques
title: Test Design — Black/White Box, EP, BVA & Pairwise
summary: Specification-based (black-box) vs structural (white-box) testing, equivalence partitioning, boundary value analysis with worked examples, and pairwise (combinatorial) testing.
minutes: 14
tags: [black-box, white-box, equivalence-partitioning, boundary-value, pairwise]
---

# Test Design — Black/White Box, EP, BVA & Pairwise

## The three families of test design

| Technique | Derives tests from | Examples |
|---|---|---|
| **Opportunistic / Exploratory** | Little planning | Add some unit tests ad hoc |
| **Specification-Based (Black Box)** | The **specification** | Boundary value analysis, equivalence classes, combinatorial, random/fuzz |
| **Structural (White Box)** | The **implementation** (code paths) | Line coverage, branch coverage |

> [!EXAM]
> **Black box = test against the spec without seeing code** (no implementation bias, robust to code changes, enables writing tests *before* code). **White box = test the internal code paths** (line/branch coverage). Both are needed.

> [!NOTE]
> **Why not just test everything?** Exhaustive testing is impossible. The key problem is choosing a suite **small enough** to finish in useful time yet **large enough** to give useful validation — so we use **heuristics** like EP and BVA.

## Equivalence Partitioning (EP)

> [!NOTE]
> **Equivalence Partitioning** divides the input domain into **classes that the system treats the same way**. *"If one input in a group works, all should work; if one fails, all should fail."* Test **one representative per class**.

Classes derive from use cases, input ranges, error conditions, and fault models (requires domain knowledge).

> [!INTUITION]
> For an *Age 18–65* rule, EP gives three classes: **<18**, **18–65**, **>65**. Instead of testing every age, test **one** value from each class — say 10, 40, 80. Huge reduction, same coverage of behaviours.

## Boundary Value Analysis (BVA)

> [!NOTE]
> **BVA** focuses on the **boundaries** of input domains, because **errors cluster at the edges**, not in the middle. Test the **min**, the **max**, and values **just outside** each boundary.

**Worked examples:**

| Problem | Valid range | Test values (invalid·min·max·invalid) |
|---|---|---|
| Printer copies (1–100) | 1..100 | **0**, 1, 100, **101** |
| Password length (8–15) | 8..15 | **7**, 8, 15, **16** |
| Year of birth (2000–2022) | 2000..2022 | **1999**, 2000, 2022, **2023** |

> [!EXAM]
> For a range `[min, max]`, BVA tests **min−1, min, max, max+1** (and often a nominal middle value). For *Age 18–65*: test **17, 18, 64, 65, 66**. This is a very common "write the test cases" question.

## Pairwise (Combinatorial) Testing

> [!NOTE]
> **Key insight:** some defects only appear from an **interaction** between parameters. **Pairwise testing** ensures every **pair** of parameter values is covered by at least one test case — catching **50–90% of defects** with far fewer tests than exhaustive.

**Approach:** identify parameters → list each one's values → generate all **pairs** → select the **minimal test set** covering every pair once.

*Interaction examples:* a bug for *senior citizens on weekends* (2-way), or *seniors on weekends during peak hours* (3-way).

| Benefits | Limitations |
|---|---|
| Far fewer tests than exhaustive | Misses 3-way+ interactions |
| Catches most interaction bugs (50–90%) | Ignores parameter dependencies |
| Good coverage at low cost | Needs good value selection |

> [!INTUITION]
> Pairwise works because most bugs are triggered by **one or two** factors interacting, not five at once. Covering all *pairs* (rather than all *combinations*) collapses a combinatorial explosion into a small, high-value test set.

---

**Next:** documenting and prioritising tests — **test cases, reliability & cyclomatic complexity**.
