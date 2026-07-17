---
subject: dbms
unit: 3
order: 4
slug: inference-rules
title: Inference Rules (Armstrong's Axioms)
summary: Armstrong's three axioms (reflexive, augmentation, transitive) — sound and complete — plus the derived decomposition, union, and pseudo-transitivity rules, with worked derivations.
minutes: 12
tags: [armstrong-axioms, inference-rules, soundness, completeness]
---

# Inference Rules (Armstrong's Axioms)

An FD `X → Y` is **inferred from** a set F if it holds in every relation state satisfying F. We derive new FDs using **Armstrong's axioms**.

## The three axioms

| Rule | Statement | Example |
|---|---|---|
| **IR1 Reflexive** | If `Y ⊆ X` then `X → Y` | gives all trivial FDs |
| **IR2 Augmentation** | If `X → Y` then `XZ → YZ` | `Ssn → Ename` ⟹ `Ssn,Bdate → Ename,Bdate` |
| **IR3 Transitive** | If `X → Y` and `Y → Z` then `X → Z` | `Ssn → Dnumber`, `Dnumber → Dname` ⟹ `Ssn → Dname` |

> [!EXAM]
> Armstrong's axioms are **sound** (they generate only FDs that actually hold) and **complete** (they can generate *every* FD that holds). This is why repeatedly applying IR1–IR3 yields the entire closure F⁺.

## Derived (convenience) rules

All follow from IR1–IR3 (completeness):

| Rule | Statement |
|---|---|
| **Decomposition** | If `X → YZ` then `X → Y` and `X → Z` (split the **RHS**) |
| **Union / Additive** | If `X → Y` and `X → Z` then `X → YZ` (combine — **same LHS** only) |
| **Pseudo-transitivity** | If `X → Y` and `WY → Z` then `WX → Z` |

> [!TRAP]
> You may split or combine on the **right-hand side**, but **never** the left.
> - `XY → A` does **NOT** imply `X → A` or `Y → A`.
> - `X → A` and `Y → B` do **NOT** give `XY → AB`.
> - Union needs the **same** LHS: `X → A` and `X → B` ⟹ `X → AB`. ✓

> [!INTUITION]
> A handy proof to remember (Silberschatz 7.4 — soundness of the **union** rule): from `X → Y`, augment by X to get `X → XY`; from `X → Z`, augment by Y to get `XY → YZ`; transitivity gives `X → YZ`. The derived rules are conveniences, not new power.

## Worked derivations

> [!DERIVE]
> **F = {A→B, BC→D}, derive AC → D:** augment `A→B` by C ⟹ `AC → BC`; with `BC → D`, transitivity ⟹ **AC → D**.
>
> **F = {A→BC, B→D, C→E}, derive A → DE:** decompose `A→BC` ⟹ `A→B`, `A→C`; transitivity with `B→D` and `C→E` ⟹ `A→D`, `A→E`; union ⟹ **A → DE**.
>
> **F = {A→B, C→D, BD→E}, derive AC → E:** `AC→BC` (aug A→B) and `AC→AD` (aug C→D); decompose ⟹ `AC→B`, `AC→D`; union ⟹ `AC→BD`; with `BD→E` ⟹ **AC → E**.

> [!NOTE]
> An unsound "rule" to avoid (Silberschatz 7.26): "if `α→β` and `γ→β` then `α→γ`" is **false** — two determinants of the same attribute need not determine each other. Always verify a proposed rule via Armstrong's axioms or a counterexample.

---

**Next:** computing all consequences — **closure of attribute sets and FD sets**.
