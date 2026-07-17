---
subject: dbms
unit: 3
order: 7
slug: minimal-cover
title: Minimal Cover (Canonical Cover)
summary: The minimal/canonical cover — a smallest equivalent FD set — its three conditions, the extraneous-attribute idea, the algorithm, and a fully worked example.
minutes: 12
tags: [minimal-cover, canonical-cover, extraneous-attribute, redundancy]
---

# Minimal Cover (Canonical Cover)

Just as closure *expands* F to F⁺, a **minimal cover** *shrinks* F to a smallest equivalent set Fc. An attribute is **extraneous** in an FD if removing it doesn't change the closure.

## The three minimality conditions

> [!NOTE]
> A set of FDs is **minimal** if:
> 1. Every FD has a **single attribute on the RHS** (canonical form).
> 2. No FD `X → A` can be replaced by `Y → A` for a proper subset Y of X — **no extraneous LHS attribute**.
> 3. No FD can be **removed** while keeping equivalence — **no redundant FD**.
>
> A **minimal cover** of F is a minimal set equivalent to F.

## The algorithm

```text
1. Canonical form: split every RHS.   X → A1A2…An  ⟹  X→A1, …, X→An
2. Remove extraneous LHS attributes:  for each X→A and each B in X,
      if replacing X→A by (X−B)→A keeps equivalence, do it.
3. Remove redundant FDs:  for each X→A, if F−{X→A} still gives A ∈ X⁺, drop it.
```

> [!TRAP]
> **Order matters: RHS-split → LHS-reduce → remove-redundant.** And when checking redundancy or extraneousness, compute the closure **using the current (already-reduced) set**, not the original. Doing steps out of order can give a non-minimal result.

## Worked example

> [!DERIVE]
> **E = {B→A, D→A, AB→D}.** Find the minimal cover.
> - **Step 1** (canonical): already single-attribute RHS.
> - **Step 2** (extraneous LHS in AB→D): is A or B extraneous? Since `B→A`, augment by B ⟹ `B→AB`; with `AB→D`, transitivity ⟹ `B→D`. So A is extraneous — replace `AB→D` by **`B→D`**. Now {B→A, D→A, B→D}.
> - **Step 3** (redundant FD): `B→D` and `D→A` give `B→A` by transitivity, so **`B→A` is redundant** — drop it.
> - **Minimal cover = {B→D, D→A}.**

> [!EXAM]
> **The minimal cover is not unique.** A given F can have **several** minimal covers depending on the order of reductions (Elmasri Review 15.5, Silberschatz 7.14). Example: F = {X→YZ, Y→XZ, Z→XY} yields more than one canonical cover. So "*a*" minimal cover, never "*the*".

## Redundancy check via closure (alternate method)
To test if `X → A` is redundant: compute `X⁺` **with** the FD and **without** it. If both give the same closure (A appears either way), the FD is redundant. Same idea for an extraneous attribute B in `X → A`: if `(X−B)⁺` already contains A using the rest of F, then B is extraneous.

---

**Next:** finding all the keys — **candidate keys & superkey counting**.
