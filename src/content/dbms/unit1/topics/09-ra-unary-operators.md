---
subject: dbms
unit: 1
order: 9
slug: ra-unary-operators
title: Relational Algebra — Unary Operators
summary: Relational algebra as a procedural, closed query language; the unary operators select (σ), project (∏), rename (ρ); composition; and the assignment operator.
minutes: 14
tags: [relational-algebra, select, project, rename, sigma, pi]
---

# Relational Algebra — Unary Operators

> [!NOTE]
> **Relational algebra** is a **procedural** query language: each operation takes one or two relations and produces a **new relation** (the algebra is **"closed"** — every result is itself a relation, so operations can be **composed**). A sequence of operations is a **relational-algebra expression**.

**Operators:** Unary — **Select σ, Project ∏, Rename ρ** · Binary — **Union ∪, Intersection ∩, Set-difference −, Cartesian product ×, Join ⋈** (and Division ÷).

> [!INTUITION]
> We'll use the classic **Sailors–Boats–Reserves** schema throughout:
> - **Sailors**(sid, sname, rating, age)
> - **Boats**(bid, bname, color)
> - **Reserves**(sid, bid, day)
> — sailors reserve boats on given days.

## Select — σ (horizontal: filters **rows**)

> [!NOTE]
> Notation: **σ_p(r)** — keeps the tuples of `r` that satisfy predicate **p** (the *selection condition*).

- Comparisons: `= ≠ > ≥ < ≤`, combined with `∧ (and)`, `∨ (or)`, `¬ (not)`.
- The result has the **same schema** as the input; σ is **commutative**; a cascade of selects can be applied in any order.
- |result| ≤ |R| (a horizontal partition).

```text
σ rating > 7 (Sailors)                         -- sailors with rating above 7
σ color = 'red' ∧ bname = 'interlake' (Boats)   -- red interlake boats
```

## Project — ∏ (vertical: keeps **columns**)

> [!NOTE]
> Notation: **∏_{A₁,A₂,…,Aₖ}(r)** — keeps only the listed attributes, discards the rest, and **removes duplicate tuples** (relations are sets).

```text
∏ sname, rating (Sailors)     -- only the name and rating columns
```

> [!TRAP]
> **Project removes duplicates** because a relation is a *set*. `∏ rating (Sailors)` returns each distinct rating **once**, even if many sailors share it. |result| ≤ |R| (equal only if the projection list includes a key).

## Composition & Assignment

Because every result is a relation, operations **compose**:

```text
∏ sname ( σ rating > 7 (Sailors) )    -- names of sailors with rating above 7
```

> [!NOTE]
> The **assignment** operator **←** names intermediate results, turning a query into a step-by-step program:
> ```text
> HighRated ← σ rating > 7 (Sailors)
> Result    ← ∏ sname (HighRated)
> ```

## Rename — ρ

> [!NOTE]
> **ρ** renames a relation and/or its attributes (essential for set operations and **self-joins**). Forms:
> - **ρ_S(B₁,…,Bₙ)(R)** — rename relation to `S` **and** attributes to `B₁…Bₙ`
> - **ρ_S(R)** — rename relation only
> - **ρ_{Old→New}(R)** — rename an attribute, e.g. `ρ_{City→Location}(Customers)`

> [!EXAM]
> **σ filters rows, ∏ selects columns (and dedups), ρ renames.** A query like *"names and departments of employees who joined before 2020"* = **∏_{Name, Department}( σ_{JoiningYear < 2020}(Employees) )** — select first (rows), then project (columns).

---

**Next:** combining whole relations — **set operations & division**.
