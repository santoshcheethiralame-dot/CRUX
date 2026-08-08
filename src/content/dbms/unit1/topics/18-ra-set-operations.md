---
subject: dbms
unit: 1
order: 18
slug: ra-set-operations
title: Relational Algebra — Set Operations & Division
summary: Union-compatibility and the set operations union, intersection and set-difference, their algebraic properties, and the division operator for "for all" queries.
minutes: 12
tags: [relational-algebra, union, intersection, set-difference, division]
---

# Relational Algebra — Set Operations & Division

## Union-compatibility

> [!EXAM]
> The set operations are **binary** and require the two relations to be **union-compatible**:
> 1. **Same arity** (same number of attributes), **and**
> 2. **Compatible domains** (the *i*-th attribute of both must have the same type).

## The three set operations

> [!NOTE]
> | Operation | Notation | Result |
> |---|---|---|
> | **Union** | `r ∪ s` | tuples in **r or s or both** (duplicates removed) |
> | **Intersection** | `r ∩ s` | tuples in **both** r and s |
> | **Set difference** | `r − s` | tuples in **r but not in s** |

**Worked examples** (Account schema — frequent exam pattern):
```text
-- Customers who have a bank account OR a loan:
∏ cust_name (Depositor)  ∪  ∏ cust_name (Borrower)

-- Customers with an account but NO loan:
∏ cust_name (Depositor)  −  ∏ cust_name (Borrower)

-- Courses taught in Fall 2017 AND Spring 2018:
∏ course_id (σ sem='Fall'  ∧ year=2017 (section))  ∩  ∏ course_id (σ sem='Spring' ∧ year=2018 (section))
```

## Algebraic properties

> [!NOTE]
> - **Union and intersection** are **commutative** *and* **associative** (so they extend to any number of relations): `R ∪ S = S ∪ R`, `(R ∪ S) ∪ T = R ∪ (S ∪ T)`.
> - **Set difference is NOT commutative**: in general `R − S ≠ S − R`.

> [!INTUITION]
> Intersection is redundant — it can be rewritten with set difference: **`r ∩ s = r − (r − s)`**. Only union, difference, select, project, rename and Cartesian product are the *primitive* operators; intersection, join and division are derived from them.

## Division — ÷ (the "for all" operator)

> [!NOTE]
> **R(Z) ÷ S(X)** (where X ⊆ Z, and Y = Z − X) returns a relation **T(Y)** containing a tuple *t* **only if** *t* appears in R **paired with *every* tuple of S**.

> [!EXAM]
> **Division answers "for all" queries.** *"Find sailors who reserved **every** boat"* = `(∏ sid, bid (Reserves)) ÷ (∏ bid (Boats))` — a sailor is in the result only if they have a reservation for *every* bid in Boats. Whenever a query says **"all" / "every"**, think **division**.

---

**Next:** joining relations and summarising them — **Cartesian product, joins, aggregates & grouping**.
