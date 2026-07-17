---
subject: dbms
unit: 3
order: 5
slug: closure
title: Closure — X⁺ and F⁺
summary: Computing the closure of an attribute set X⁺ (the workhorse algorithm for keys, equivalence, and normalization) and the closure of an FD set F⁺.
minutes: 11
tags: [closure, attribute-closure, fd-closure, algorithm]
---

# Closure — X⁺ and F⁺

## Closure of an attribute set (X⁺)

`X⁺` = the set of **all attributes functionally determined by X** under F. It's the single most-used computation in this unit — keys, equivalence, minimal cover, and normalization all rely on it.

```text
X⁺ := X;
repeat
    for each FD  Y → Z  in F:
        if  Y ⊆ X⁺  then  X⁺ := X⁺ ∪ Z;
until X⁺ stops changing;
```

> [!INTUITION]
> Start with X itself, then keep "firing" any FD whose **left side is already inside X⁺**, adding its right side. Repeat until nothing new appears. If `X⁺ = R` (all attributes), then **X is a superkey**.

> [!DERIVE]
> **R(A,B,C,D,E,F,G)**, F = {A→BC, BC→DE, D→F, CF→G}.
> - `D⁺ = {D}` → `{D, F}` (D→F). Nothing else fires. **D⁺ = {D, F}**.
> - `{B,C}⁺ = {B,C}` → `{B,C,D,E}` (BC→DE) → `{B,C,D,E,F}` (D→F) → `{B,C,D,E,F,G}` (CF→G). **BC⁺ = {B,C,D,E,F,G}**.

> [!EXAM]
> **Uses of X⁺:**
> 1. **Is X a superkey?** Compute X⁺; if it equals R, yes.
> 2. **Does `X → Y` hold?** Check whether `Y ⊆ X⁺`.
> 3. **Find candidate keys** and test **equivalence** of FD sets (next topics).

## Closure of an FD set (F⁺)

`F⁺` = the set of **all FDs logically implied by F**, obtained by repeatedly applying Armstrong's axioms. `X → Y` is **trivial** if `X ⊇ Y`, else **nontrivial**.

> [!NOTE]
> For a relation with **n** attributes there are at most $2^n \cdot 2^n = 2^{2^n}$ possible FDs (any subset on the left × any subset on the right). F⁺ is usually huge — which is exactly why we work with **attribute closures** and **minimal covers** instead of listing F⁺ directly.

> [!DERIVE]
> **Members of F⁺** for R=(A,B,C,G,H,I), F = {A→B, A→C, CG→H, CG→I, B→H}:
> - `A → H` (A→B, B→H, transitivity).
> - `CG → HI` (CG→H and CG→I, union — or augment + transitivity).
> - `AG → I` (augment A→C by G ⟹ AG→CG; with CG→I, transitivity).

## Why the closure interpretation matters
The closure of `{Course#, Instr_name}` not including `Classid` *tells you* that {Course#, Instr_name} is **not** a candidate key of that relation — different instructors can teach the same course as distinct classes. Closures reveal the keys and the redundancy hidden in a schema.

---

**Next:** comparing FD sets — **equivalence and cover**.
