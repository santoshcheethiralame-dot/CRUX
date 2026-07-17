---
subject: dbms
unit: 3
order: 6
slug: equivalence
title: Equivalence of FD Sets
summary: When one FD set covers another, when two FD sets are equivalent (E⁺ = F⁺), and the closure-based procedure to check it, with a worked example.
minutes: 9
tags: [equivalence, cover, fd-sets, closure]
---

# Equivalence of FD Sets

Two different FD sets can describe the **same** constraints. We compare them with closures.

## Cover and equivalence

> [!NOTE]
> - **F covers E** if every FD in E can be inferred from F (i.e. every FD of E is in `F⁺`).
> - **F and E are equivalent** (`E⁺ = F⁺`) if **F covers E AND E covers F**.

## The test — "does F cover E?"

For each FD `X → Y` in **E**, compute `X⁺` **using F**, and check that `Y ⊆ X⁺`. If this holds for every FD in E, then **F covers E**.

Three possible cases between sets F and G:
- **Case 1:** F covers G (F ⊇ G)
- **Case 2:** G covers F (G ⊇ F)
- **Case 3:** both — F = G (equivalent)

> [!INTUITION]
> You don't compare the FD sets symbol-by-symbol — they may *look* different yet imply the same things. Instead, ask: "can F reproduce every rule of G, and can G reproduce every rule of F?" Closure under each set is how you answer.

## Worked example

> [!DERIVE]
> Show **F = G** where `F = {A→C, AC→D, E→AD, E→H}` and `G = {A→CD, E→AH}`.
>
> **F covers G?** (compute closures of G's left sides using F)
> - `A⁺ = {A,C,D}` ⊇ {C,D} ✓ (covers A→CD)
> - `E⁺ = {A,C,D,E,H}` ⊇ {A,H} ✓ (covers E→AH)
> → **F covers G.**
>
> **G covers F?** (compute closures of F's left sides using G)
> - `A⁺ = {A,C,D}` ⊇ C ✓; `AC⁺ = {A,C,D}` ⊇ D ✓; `E⁺ = {A,C,D,E,H}` ⊇ {A,D,H} ✓
> → **G covers F.**
>
> Both hold ⟹ **F = G** (equivalent). *(This is GATE-classic and appears in the lecture practice set.)*

> [!EXAM]
> To check equivalence you compute closures **both ways**. A common shortcut error is checking only one direction — F covering G does **not** imply G covers F. You need both for equivalence.

---

**Next:** the smallest equivalent FD set — **minimal cover**.
