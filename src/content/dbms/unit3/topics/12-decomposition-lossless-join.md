---
subject: dbms
unit: 3
order: 12
slug: decomposition-lossless-join
title: Lossless Join & Dependency Preservation
summary: The two desirable decomposition properties — non-additive (lossless) join via the NJB test, and dependency preservation — and why losslessness is non-negotiable.
minutes: 11
tags: [lossless-join, njb, dependency-preservation, decomposition, spurious-tuples]
---

# Lossless Join & Dependency Preservation

A good decomposition needs **two** properties beyond the normal form itself.

> [!NOTE]
> 1. **Non-additive (lossless) join** — joining the pieces reproduces **exactly** R, with **no spurious tuples**. **Critical — must always hold.**
> 2. **Dependency preservation** — every FD can be enforced within a single decomposed relation (no cross-table join needed to check it). **Desirable, sometimes sacrificed.**

> [!EXAM]
> **If you must choose, losslessness wins** (Elmasri 15.11). A lossy decomposition corrupts data (you can't recover the original), whereas losing dependency preservation only means some constraints need a join to check. Dependency preservation is guaranteed achievable **up to 3NF**; **BCNF (and 4NF/5NF) may lose a dependency**.

## The NJB test (non-additive join, binary decomposition)

> [!NOTE]
> A binary decomposition `D = {R1, R2}` of R is **lossless** with respect to F **iff at least one** of these holds (is in F⁺):
> $$(R_1 \cap R_2) \to (R_1 - R_2) \qquad\text{OR}\qquad (R_1 \cap R_2) \to (R_2 - R_1)$$
> In words: the **shared attributes must be a (super)key of at least one of the two pieces**.

> [!INTUITION]
> Split a table, later join it back on the shared column. If that shared column **uniquely identifies** rows in one piece, the join lines them up correctly → lossless. If the shared column is **not** a key of either piece, the join mixes unrelated rows → **spurious tuples**.

## Applying NJB to TEACH

`TEACH(Student, Course, Instructor)`, FDs `{Student,Course}→Instructor`, `Instructor→Course`. The three binary decompositions:

| D | Pieces | Shared | Test | Lossless? |
|---|---|---|---|---|
| D1 | (Student,Instructor),(Student,Course) | Student | Student → Instructor? Student → Course? | ✗ neither |
| D2 | (Course,Instructor),(Course,Student) | Course | Course → Instructor? Course → Student? | ✗ neither |
| **D3** | (Instructor,Course),(Instructor,Student) | Instructor | **Instructor → Course ✓** | ✓ |

Only **D3** is non-additive — and it's exactly what the BCNF algorithm produces.

## Worked NJB

> [!DERIVE]
> **REFRIG(M,Y,P,MP,C)**, F = {M→MP, MY→P, MP→C}, CK = **MY**. Decompose into `R1(M,Y,P)`, `R2(M,MP,C)`. Shared = **M**. Test: `M → (R2−R1) = {MP,C}`? `M⁺ = {M,MP,C}` ⊇ {MP,C} ✓. **Lossless.** (Elmasri 15.21.)

## Two failure modes of bad decomposition
- **Spurious tuples** (lossy join) — joining gives *more* rows than the original (Guideline 4 violation).
- **Lost dependencies** — an FD spans two pieces and can't be enforced without rejoining.

A 3NF synthesis can achieve **both** properties; BCNF decomposition guarantees **only** losslessness.

---

**Next:** beyond FDs — **higher normal forms (4NF & 5NF)**.
